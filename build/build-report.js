#!/usr/bin/env node

/**
 * GenuVerity Report Build System
 * Auto-injects navbar/footer placeholders and standard dependencies
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Standard dependencies to inject in <head>
const STANDARD_HEAD = `
    <!-- Dependencies -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="../js/chart-watermark.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

    <!-- Search & UI Dependencies -->
    <script src="../js/reports-data.js" defer></script>
    <script src="../js/unified-search.js" defer></script>
    <script src="../js/copyable-sections.js" defer></script>
    <script src="../js/shared-components.js" defer></script>
    <link rel="stylesheet" href="../css/shared-components.css">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
`;

const NAVBAR_PLACEHOLDER = '\n    <div id="navbar-placeholder" data-page-type="report"></div>\n';
const FOOTER_PLACEHOLDER = '\n    <div id="footer-placeholder"></div>\n';

function buildReport(sourceFile, outputFile, options = {}) {
    console.log(`🔨 Building: ${sourceFile} → ${outputFile}`);

    // Read source
    if (!fs.existsSync(sourceFile)) {
        console.error(`❌ Source file not found: ${sourceFile}`);
        process.exit(1);
    }

    let html = fs.readFileSync(sourceFile, 'utf8');

    // Inject standard dependencies before </head>
    if (!html.includes('<!-- INJECTED_DEPENDENCIES -->')) {
        html = html.replace('</head>', `    <!-- INJECTED_DEPENDENCIES -->${STANDARD_HEAD}\n</head>`);
    }

    // Inject navbar placeholder after <body>
    if (!html.includes('id="navbar-placeholder"')) {
        html = html.replace(/(<body[^>]*>)(\s*)/, `$1${NAVBAR_PLACEHOLDER}$2`);
    }

    // Inject footer placeholder before </body>
    if (!html.includes('id="footer-placeholder"')) {
        html = html.replace('</body>', `${FOOTER_PLACEHOLDER}</body>`);
    }

    // Ensure output directory exists
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write output
    fs.writeFileSync(outputFile, html);
    console.log(`✅ Built: ${outputFile}`);

    // Auto-validate if requested
    if (options.validate) {
        console.log('\n🔍 Running validations...');
        try {
            execSync(`./validate-report.sh ${outputFile}`, { stdio: 'inherit' });
            execSync(`./validate-standards.sh ${outputFile}`, { stdio: 'inherit' });
            console.log('✅ All validations passed\n');
        } catch (error) {
            console.error('❌ Validation failed');
            process.exit(1);
        }
    }
}

// CLI
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log('Usage: node build-report.js <source.html> <output.html> [--validate]');
        console.log('');
        console.log('Examples:');
        console.log('  node build-report.js localreports/src/report.html localreports/dist/report.html');
        console.log('  node build-report.js localreports/src/report.html localreports/dist/report.html --validate');
        process.exit(1);
    }

    const sourceFile = args[0];
    const outputFile = args[1];
    const validate = args.includes('--validate');

    buildReport(sourceFile, outputFile, { validate });
}

module.exports = { buildReport };
