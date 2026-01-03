#!/usr/bin/env node
/**
 * Sync Chart Configs from Report HTML to reports-data.js
 *
 * This tool extracts actual Chart.js data from report HTML files
 * and updates reports-data.js to ensure thumbnails match the real charts.
 *
 * RUN THIS after creating/modifying any report with charts!
 */

const fs = require('fs');
const path = require('path');

const REPORTS_DATA_PATH = path.join(__dirname, '..', 'js', 'reports-data.js');
const LOCAL_REPORTS_DIR = path.join(__dirname, '..', 'localreports');

// Parse chart data from HTML
function extractChartFromHTML(htmlContent) {
    // Find the FIRST new Chart() call (primary chart for thumbnail)
    const chartMatch = htmlContent.match(/new Chart\([^,]+,\s*\{[\s\S]*?type:\s*['"](\w+)['"][\s\S]*?\}/);
    if (!chartMatch) return null;

    const chartBlock = chartMatch[0];
    const chartType = chartMatch[1];

    // Extract data array
    const dataMatch = chartBlock.match(/data:\s*\[([\d.,\s]+)\]/);
    const data = dataMatch
        ? dataMatch[1].split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
        : null;

    // Extract color(s)
    let color = '#3b82f6'; // default
    const borderColorMatch = chartBlock.match(/borderColor:\s*['"]([^'"]+)['"]/);
    const bgColorMatch = chartBlock.match(/backgroundColor:\s*['"]([^'"]+)['"]/);
    const bgColorArrayMatch = chartBlock.match(/backgroundColor:\s*\[([^\]]+)\]/);

    if (borderColorMatch) color = borderColorMatch[1];
    else if (bgColorMatch) color = bgColorMatch[1];

    // Extract colors array for hbar/bar charts
    let colors = null;
    if (bgColorArrayMatch) {
        colors = bgColorArrayMatch[1]
            .match(/#[0-9a-fA-F]{6}/g)
            ?.filter(c => c);
    }

    // Extract labels for hbar charts
    let labels = null;
    const labelsMatch = chartBlock.match(/labels:\s*\[([\s\S]*?)\]/);
    if (labelsMatch) {
        labels = labelsMatch[1]
            .match(/['"]([^'"]+)['"]/g)
            ?.map(l => l.replace(/['"]/g, ''));
    }

    // Determine normalized chart type
    let normalizedType = chartType;
    if (chartType === 'bar') {
        // Check if it's horizontal
        const indexAxisMatch = chartBlock.match(/indexAxis:\s*['"]y['"]/);
        if (indexAxisMatch) normalizedType = 'hbar';
    } else if (chartType === 'doughnut') {
        normalizedType = 'donut';
    }

    // Build chart config
    const config = {
        type: normalizedType,
        color: color.startsWith('rgba') ? '#3b82f6' : color
    };

    if (data && data.length > 0) {
        // For donut charts, use first value as percentage
        if (normalizedType === 'donut') {
            config.data = Math.round(data[0]);
        } else {
            config.data = data;
        }
    }

    if (labels && labels.length > 0 && normalizedType === 'hbar') {
        config.labels = labels;
    }

    if (colors && colors.length > 0) {
        config.colors = colors;
    }

    return config;
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

// Process each report
for (const report of reports) {
    const htmlPath = path.join(LOCAL_REPORTS_DIR, `${report.slug}.html`);

    if (!fs.existsSync(htmlPath)) {
        continue;
    }

    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const extractedChart = extractChartFromHTML(htmlContent);

    if (!extractedChart) {
        if (!report.chart) unchanged++;
        continue;
    }

    // Compare with existing chart config
    const existingChart = report.chart;

    if (!existingChart) {
        report.chart = extractedChart;
        added++;
        console.log(`  ➕ Added: ${report.slug}`);
    } else {
        // Check if they match (compare type and data)
        const sameType = existingChart.type === extractedChart.type;
        const sameData = JSON.stringify(existingChart.data) === JSON.stringify(extractedChart.data);

        if (!sameType || !sameData) {
            report.chart = extractedChart;
            updated++;
            console.log(`  🔄 Updated: ${report.slug} (${existingChart.type} → ${extractedChart.type})`);
        } else {
            unchanged++;
        }
    }
}

console.log(`\n📋 Summary:`);
console.log(`   Added: ${added}`);
console.log(`   Updated: ${updated}`);
console.log(`   Unchanged: ${unchanged}`);

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
console.log(`\n🎯 Chart thumbnails should now match actual report charts!`);
