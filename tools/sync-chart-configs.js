#!/usr/bin/env node
/**
 * Sync Chart Configs from Report HTML to reports-data.js
 *
 * CRITICAL: This ensures thumbnail previews match actual report charts.
 * Run after EVERY report creation/modification.
 */

const fs = require('fs');
const path = require('path');

const REPORTS_DATA_PATH = path.join(__dirname, '..', 'js', 'reports-data.js');
const LOCAL_REPORTS_DIR = path.join(__dirname, '..', 'localreports');

/**
 * Extract the FULL Chart.js configuration from HTML
 * Uses brace counting to capture the complete config object
 */
function extractFullChartConfig(htmlContent) {
    // Find "new Chart(" and extract everything until the matching closing
    const chartStart = htmlContent.indexOf('new Chart(');
    if (chartStart === -1) return null;

    // Find the config object start (second argument to Chart constructor)
    const configStart = htmlContent.indexOf('{', chartStart);
    if (configStart === -1) return null;

    // Count braces to find the matching end
    let depth = 0;
    let configEnd = -1;
    for (let i = configStart; i < htmlContent.length; i++) {
        if (htmlContent[i] === '{') depth++;
        if (htmlContent[i] === '}') depth--;
        if (depth === 0) {
            configEnd = i + 1;
            break;
        }
    }

    if (configEnd === -1) return null;

    const configStr = htmlContent.substring(configStart, configEnd);
    return configStr;
}

/**
 * Extract ALL datasets from a Chart.js config string
 * Returns array of {data: [...], color: '...'}
 */
function extractAllDatasets(configStr) {
    const datasets = [];

    // Find the datasets array
    const datasetsStart = configStr.indexOf('datasets');
    if (datasetsStart === -1) return datasets;

    // Find the opening bracket of the datasets array
    const arrayStart = configStr.indexOf('[', datasetsStart);
    if (arrayStart === -1) return datasets;

    // Extract content between datasets: [ ... ]
    let depth = 0;
    let arrayEnd = -1;
    for (let i = arrayStart; i < configStr.length; i++) {
        if (configStr[i] === '[') depth++;
        if (configStr[i] === ']') depth--;
        if (depth === 0) {
            arrayEnd = i + 1;
            break;
        }
    }
    if (arrayEnd === -1) return datasets;

    const datasetsStr = configStr.substring(arrayStart, arrayEnd);

    // Parse each dataset object {...}
    let objDepth = 0;
    let objStart = -1;

    for (let i = 0; i < datasetsStr.length; i++) {
        if (datasetsStr[i] === '{') {
            if (objDepth === 0) objStart = i;
            objDepth++;
        }
        if (datasetsStr[i] === '}') {
            objDepth--;
            if (objDepth === 0 && objStart !== -1) {
                const datasetStr = datasetsStr.substring(objStart, i + 1);

                // Extract data array from this dataset
                const dataMatch = datasetStr.match(/"?data"?\s*:\s*\[([\d.,\s-]+)\]/);
                let dataArray = null;
                if (dataMatch) {
                    dataArray = dataMatch[1].split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
                }

                // Extract backgroundColor (could be string or array)
                let color = null;

                // First try single string: backgroundColor: '#fff' or backgroundColor: "#fff"
                const singleColorMatch = datasetStr.match(/"?backgroundColor"?\s*:\s*['"]([#\w]+)['"]/);
                if (singleColorMatch && singleColorMatch[1].startsWith('#')) {
                    color = singleColorMatch[1];
                }

                // Then try array: backgroundColor: ['#fff', '#000']
                if (!color) {
                    const colorArrayMatch = datasetStr.match(/"?backgroundColor"?\s*:\s*\[([\s\S]*?)\]/);
                    if (colorArrayMatch) {
                        const colors = colorArrayMatch[1].match(/#[0-9a-fA-F]{6}/g);
                        if (colors && colors.length > 0) {
                            color = colors; // Keep as array for multi-color
                        }
                    }
                }

                // Fallback to borderColor
                if (!color) {
                    const borderMatch = datasetStr.match(/"?borderColor"?\s*:\s*['"]([#\w]+)['"]/);
                    if (borderMatch && borderMatch[1].startsWith('#')) {
                        color = borderMatch[1];
                    }
                }

                if (dataArray && dataArray.length > 0) {
                    datasets.push({
                        data: dataArray,
                        color: color || '#3b82f6'
                    });
                }

                objStart = -1;
            }
        }
    }

    return datasets;
}

/**
 * Parse chart configuration from the extracted config string
 * Now handles multi-dataset charts properly
 */
function parseChartConfig(configStr) {
    if (!configStr) return null;

    // Extract chart type (supports both JS object and JSON formats)
    // JS: type: 'bar'  |  JSON: "type": "bar"
    const typeMatch = configStr.match(/"?type"?\s*:\s*['"](\w+)['"]/);
    if (!typeMatch) return null;
    let chartType = typeMatch[1];

    // Check if it's horizontal (indexAxis: 'y')
    const isHorizontal = /"?indexAxis"?\s*:\s*['"]y['"]/.test(configStr);
    if (chartType === 'bar' && isHorizontal) {
        chartType = 'hbar';
    }
    if (chartType === 'doughnut') {
        chartType = 'donut';
    }

    // Extract ALL datasets
    const allDatasets = extractAllDatasets(configStr);

    // Extract labels (supports both JS and JSON formats) - ALWAYS include for all types
    let labels = null;
    const labelsMatch = configStr.match(/"?labels"?\s*:\s*\[([\s\S]*?)\]/);
    if (labelsMatch) {
        const labelsStr = labelsMatch[1];
        labels = [];
        const labelRegex = /['"]([^'"]+)['"]/g;
        let match;
        while ((match = labelRegex.exec(labelsStr)) !== null) {
            labels.push(match[1]);
        }
        if (labels.length === 0) labels = null;
    }

    // Determine primary color
    let color = '#3b82f6'; // default
    let colors = null;

    if (allDatasets.length > 0) {
        // Use first dataset's color as primary
        const firstColor = allDatasets[0].color;
        color = Array.isArray(firstColor) ? firstColor[0] : firstColor;

        // Collect all colors for multi-series charts
        if (allDatasets.length > 1) {
            colors = allDatasets.map(ds => Array.isArray(ds.color) ? ds.color[0] : ds.color);
        } else if (Array.isArray(allDatasets[0].color)) {
            colors = allDatasets[0].color;
        }
    }

    // Build the config
    const config = {
        type: chartType,
        color: color
    };

    // Handle data based on number of datasets
    if (allDatasets.length === 1) {
        // Single dataset - simple data array
        config.data = allDatasets[0].data;
    } else if (allDatasets.length > 1) {
        // Multi-dataset - store as datasets array for grouped rendering
        config.data = allDatasets[0].data; // Keep first for backward compat
        config.datasets = allDatasets.map(ds => ({
            data: ds.data,
            color: Array.isArray(ds.color) ? ds.color[0] : ds.color
        }));
    }

    // Include labels for ALL chart types (not just hbar)
    if (labels && labels.length > 0) {
        config.labels = labels;
    }

    // Include colors for multi-segment/multi-series charts
    if (colors && colors.length > 1) {
        config.colors = colors;
    }

    return config;
}

/**
 * Extract chart config from an HTML file
 */
function extractChartFromFile(htmlPath) {
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const configStr = extractFullChartConfig(htmlContent);
    return parseChartConfig(configStr);
}

// Read current reports-data.js
let reportsDataContent = fs.readFileSync(REPORTS_DATA_PATH, 'utf8');

// Parse into array
let reports;
try {
    const match = reportsDataContent.match(/const REPORTS_DATA = \[([\s\S]*?)\];/);
    if (!match) throw new Error('Could not find REPORTS_DATA array');
    eval('reports = [' + match[1] + ']');
} catch (e) {
    console.error('Error parsing reports-data.js:', e.message);
    process.exit(1);
}

console.log(`📊 Chart Config Sync Tool\n`);
console.log(`Found ${reports.length} reports in reports-data.js\n`);

let updated = 0;
let added = 0;
let unchanged = 0;
let noChart = 0;

// Process each report
for (const report of reports) {
    const htmlPath = path.join(LOCAL_REPORTS_DIR, `${report.slug}.html`);

    if (!fs.existsSync(htmlPath)) {
        continue;
    }

    const extractedChart = extractChartFromFile(htmlPath);

    if (!extractedChart) {
        noChart++;
        // Remove chart config if no chart in HTML
        if (report.chart) {
            delete report.chart;
            console.log(`  🗑️  Removed stale config: ${report.slug}`);
        }
        continue;
    }

    const existingChart = report.chart;

    if (!existingChart) {
        report.chart = extractedChart;
        added++;
        console.log(`  ➕ Added: ${report.slug} (${extractedChart.type})`);
    } else {
        // Check if they match
        const existingStr = JSON.stringify(existingChart);
        const extractedStr = JSON.stringify(extractedChart);

        if (existingStr !== extractedStr) {
            console.log(`  🔄 ${report.slug}:`);
            console.log(`      Was: ${existingChart.type} with ${Array.isArray(existingChart.data) ? existingChart.data.length : 1} data points`);
            console.log(`      Now: ${extractedChart.type} with ${Array.isArray(extractedChart.data) ? extractedChart.data.length : 1} data points`);
            if (extractedChart.labels) {
                console.log(`      Labels: ${extractedChart.labels.slice(0, 3).join(', ')}...`);
            }
            report.chart = extractedChart;
            updated++;
        } else {
            unchanged++;
        }
    }
}

console.log(`\n📋 Summary:`);
console.log(`   Added: ${added}`);
console.log(`   Updated: ${updated}`);
console.log(`   Unchanged: ${unchanged}`);
console.log(`   No chart in HTML: ${noChart}`);

if (added + updated === 0) {
    console.log(`\n✅ All chart configs are already in sync!`);
    process.exit(0);
}

// Generate updated file
function formatReport(report) {
    let str = '    {\n';
    str += `        id: ${report.id},\n`;
    str += `        title: "${report.title.replace(/"/g, '\\"')}",\n`;
    str += `        slug: "${report.slug}",\n`;
    str += `        category: "${report.category}",\n`;
    str += `        tagClass: "${report.tagClass}",\n`;
    str += `        catClass: "${report.catClass}",\n`;
    str += `        icon: "${report.icon}",\n`;
    str += `        date: "${report.date}",\n`;
    str += `        sources: "${report.sources}",\n`;
    str += `        readTime: "${report.readTime}",\n`;
    str += `        verdict: "${report.verdict}",\n`;
    str += `        excerpt: "${report.excerpt.replace(/"/g, '\\"')}"`;

    if (report.chart) {
        str += ',\n        chart: ' + JSON.stringify(report.chart);
    }

    str += '\n    }';
    return str;
}

const newContent = `// Shared reports data - Single source of truth for all pages
// When adding a new report, add it here and it will update everywhere

const REPORTS_DATA = [
${reports.map(formatReport).join(',\n')}
];

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = REPORTS_DATA;
}
`;

fs.writeFileSync(REPORTS_DATA_PATH, newContent);
console.log(`\n✅ Updated ${REPORTS_DATA_PATH}`);
