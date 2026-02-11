#!/usr/bin/env node
/**
 * Generate /llms.txt from reports-data.js
 *
 * Run: node scripts/generate-llms-txt.js
 * Or:  npm run llms
 *
 * Reads REPORTS_DATA and produces a Markdown-formatted llms.txt
 * following the proposed llms.txt standard (https://llmstxt.org/).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPORTS_DATA = require(path.join(ROOT, 'js', 'reports-data.js'));

const SITE_URL = 'https://www.genuverity.com';
const NOW = new Date().toISOString().split('T')[0];

// Group reports by category
function groupByCategory(reports) {
    const groups = {};
    for (const r of reports) {
        const cat = r.category || 'Uncategorized';
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(r);
    }
    return groups;
}

function verdictLabel(v) {
    const map = {
        true: 'True',
        'mostly-true': 'Mostly True',
        mixed: 'Mixed',
        misleading: 'Misleading',
        false: 'False',
        context: 'Context Required',
    };
    return map[v] || v;
}

function generate() {
    const sorted = [...REPORTS_DATA].sort((a, b) => {
        // Newest first (highest absolute id)
        return Math.abs(b.id) - Math.abs(a.id);
    });

    const grouped = groupByCategory(sorted);

    const lines = [];

    // Header
    lines.push(`# GenuVerity`);
    lines.push(``);
    lines.push(`> GenuVerity is an independent fact-checking and open-source intelligence (OSINT) platform. We investigate disinformation, political claims, health misinformation, and emerging information threats using primary sources, data analysis, and digital forensics. Every report includes full source attribution and a transparent verdict.`);
    lines.push(``);
    lines.push(`- Website: ${SITE_URL}`);
    lines.push(`- Reports: ${sorted.length}`);
    lines.push(`- Updated: ${NOW}`);
    lines.push(``);

    // Key pages
    lines.push(`## Site Pages`);
    lines.push(``);
    lines.push(`- [Home](${SITE_URL}/): Main page with latest reports carousel and search`);
    lines.push(`- [All Reports](${SITE_URL}/reports.html): Full searchable archive of all fact-check reports`);
    lines.push(`- [Newsfeed](${SITE_URL}/newsfeed.html): Latest reports in feed format`);
    lines.push(``);

    // Reports by category
    for (const [category, reports] of Object.entries(grouped)) {
        lines.push(`## ${category}`);
        lines.push(``);
        for (const r of reports) {
            const verdict = verdictLabel(r.verdict);
            const excerpt = r.excerpt
                .replace(/[\n\r]+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
            // Truncate long excerpts for llms.txt readability
            const short = excerpt.length > 200 ? excerpt.slice(0, 197) + '...' : excerpt;
            lines.push(`- [${r.title}](${SITE_URL}/${r.slug}): ${short} [Verdict: ${verdict}] [${r.date}] [${r.sources}]`);
        }
        lines.push(``);
    }

    return lines.join('\n');
}

// Write file
const content = generate();
const outPath = path.join(ROOT, 'llms.txt');
fs.writeFileSync(outPath, content, 'utf-8');

const reportCount = REPORTS_DATA.length;
const size = (Buffer.byteLength(content) / 1024).toFixed(1);
console.log(`llms.txt generated: ${reportCount} reports, ${size} KB → ${outPath}`);
