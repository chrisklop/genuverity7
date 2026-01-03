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
 * Parse chart configuration from the extracted config string
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

    // Extract data array from datasets[0].data (supports both JS and JSON formats)
    let data = null;
    const dataMatch = configStr.match(/"?datasets"?\s*:\s*\[\s*\{[\s\S]*?"?data"?\s*:\s*\[([\d.,\s-]+)\]/);
    if (dataMatch) {
        data = dataMatch[1].split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    }

    // Extract labels (supports both JS and JSON formats)
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

    // Extract colors (backgroundColor array) - supports both JS and JSON formats
    let colors = null;
    const colorsMatch = configStr.match(/"?backgroundColor"?\s*:\s*\[([\s\S]*?)\]/);
    if (colorsMatch) {
        const colorsStr = colorsMatch[1];
        colors = colorsStr.match(/#[0-9a-fA-F]{6}/g);
    }

    // Extract single color (borderColor or backgroundColor string) - supports both JS and JSON formats
    let color = '#3b82f6'; // default
    const borderColorMatch = configStr.match(/"?borderColor"?\s*:\s*['"]([#\w]+)['"]/);
    const bgColorSingleMatch = configStr.match(/"?backgroundColor"?\s*:\s*['"]([#\w]+)['"]/);
    if (borderColorMatch && borderColorMatch[1].startsWith('#')) {
        color = borderColorMatch[1];
    } else if (bgColorSingleMatch && bgColorSingleMatch[1].startsWith('#')) {
        color = bgColorSingleMatch[1];
    } else if (colors && colors.length > 0) {
        color = colors[0];
    }

    // Build the config
    const config = {
        type: chartType,
        color: color
    };

    if (data && data.length > 0) {
        // Always preserve full data array - chart-previews.js handles all types
        config.data = data;
    }

    // Include labels for hbar charts (critical for matching the report)
    if (labels && labels.length > 0 && chartType === 'hbar') {
        config.labels = labels;
    }

    // Include colors for multi-segment charts (donut, bar, hbar)
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
