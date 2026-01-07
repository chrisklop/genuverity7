#!/usr/bin/env node
/**
 * Chart Migration Script - Clean Minimal Style
 *
 * This script updates all report HTML files to use the clean chart style
 * by removing explicit options that override the global defaults.
 *
 * Usage: node tools/migrate-charts-clean.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const REPORTS_DIR = path.join(__dirname, '..', 'localreports');
const DRY_RUN = process.argv.includes('--dry-run');

// Options to remove (these now come from global defaults)
const OPTIONS_TO_STRIP = [
    // Scale-related options
    /scales:\s*\{[^}]*\{[^}]*\}[^}]*\}/gs,  // Nested scales object
    /grid:\s*\{[^}]*\}/g,
    /ticks:\s*\{[^}]*\}/g,

    // Legend showing (we want legends hidden by default)
    /legend:\s*\{\s*position:[^}]+\}/g,

    // These are fine to keep:
    // - type, data (required)
    // - backgroundColor, borderColor (chart-specific colors)
    // - indexAxis (for horizontal bars)
    // - plugins: { legend: { display: false } } (already matches our default)
];

function cleanChartOptions(html) {
    let modified = html;
    let changes = [];

    // Find all chart definitions
    const chartRegex = /new Chart\([^)]+\)\s*,\s*\{[\s\S]*?\}\s*\)/g;

    // Strategy: For each chart, simplify its options
    modified = modified.replace(
        /(new Chart\([^,]+,\s*\{[\s\S]*?options:\s*\{)([\s\S]*?)(\}\s*\}\s*\))/g,
        (match, prefix, optionsContent, suffix) => {
            let cleanedOptions = optionsContent;

            // Remove scales entirely (will use global defaults)
            if (cleanedOptions.includes('scales:')) {
                cleanedOptions = cleanedOptions.replace(/,?\s*scales:\s*\{[\s\S]*?\}\s*(?=\}|,\s*\w+:)/g, '');
                changes.push('Removed scales config');
            }

            // Simplify legend to just display:false if it has position/labels
            if (cleanedOptions.match(/legend:\s*\{[^}]*position/)) {
                cleanedOptions = cleanedOptions.replace(
                    /legend:\s*\{[^}]*\}/g,
                    'legend: { display: false }'
                );
                changes.push('Simplified legend to display:false');
            }

            // Clean up empty/redundant options
            cleanedOptions = cleanedOptions
                .replace(/,\s*,/g, ',')           // Double commas
                .replace(/\{\s*,/g, '{')          // Leading comma in object
                .replace(/,\s*\}/g, '}')          // Trailing comma
                .replace(/plugins:\s*\{\s*\}/g, '') // Empty plugins
                .replace(/,\s*,/g, ',');          // Double commas again

            return prefix + cleanedOptions + suffix;
        }
    );

    // Also update borderRadius from 4 to 8 in datasets
    if (modified.includes('borderRadius: 4')) {
        modified = modified.replace(/borderRadius:\s*4/g, 'borderRadius: 8');
        changes.push('Updated borderRadius 4 → 8');
    }

    return { html: modified, changes };
}

function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Skip files without charts
    if (!content.includes('new Chart(')) {
        return { skipped: true };
    }

    const { html, changes } = cleanChartOptions(content);

    if (changes.length === 0) {
        return { skipped: true, reason: 'No changes needed' };
    }

    if (!DRY_RUN) {
        fs.writeFileSync(filePath, html, 'utf8');
    }

    return { changes, modified: !DRY_RUN };
}

// Main
console.log(`Chart Migration Script - ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
console.log('='.repeat(50));

const files = fs.readdirSync(REPORTS_DIR)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(REPORTS_DIR, f));

let modified = 0;
let skipped = 0;

for (const file of files) {
    const result = processFile(file);
    const basename = path.basename(file);

    if (result.skipped) {
        skipped++;
    } else {
        modified++;
        console.log(`\n${basename}:`);
        result.changes.forEach(c => console.log(`  ✓ ${c}`));
    }
}

console.log('\n' + '='.repeat(50));
console.log(`Modified: ${modified} files`);
console.log(`Skipped: ${skipped} files`);

if (DRY_RUN) {
    console.log('\nThis was a dry run. Run without --dry-run to apply changes.');
}
