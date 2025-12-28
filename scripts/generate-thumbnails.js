const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

// Configuration
const BASE_URL = 'http://localhost:3000'; // Assuming local dev server
const OUTPUT_DIR = path.join(__dirname, '../images/thumbnails');
const VIEWPORT = { width: 1200, height: 800 }; // Standard size
const CARD_SIZE = { width: 600, height: 400 }; // Capture size

// Ideally we'd import this, but for a script it's safer to read/eval or just regex parse
// to avoid module system conflicts if the project isn't fully ESM/CommonJS consistent.
// Let's read the file directly to extract the array.
const REPORTS_DATA_PATH = path.join(__dirname, '../js/reports-data.js');

function getReportsData() {
    const content = fs.readFileSync(REPORTS_DATA_PATH, 'utf8');
    // Minimal "eval" context to extract the variable safely
    const sandbox = {};
    try {
        // Remove "const " to make it global-ish or just eval
        // Actually, let's just use regex to find the array content if complex, 
        // OR better: just require it if it was a module. 
        // Since it's a browser file `const REPORTS_DATA = [...]`, we can eval it in a safe context.
        eval(content.replace('const REPORTS_DATA', 'global.REPORTS_DATA'));
        return global.REPORTS_DATA;
    } catch (e) {
        console.error("Error parsing reports-data.js:", e);
        process.exit(1);
    }
}

async function generateThumbnails() {
    console.log("📸 Starting Thumbnail Generation Robots...");

    // Ensure output dir exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const reports = getReportsData();
    // Prioritize newest reports
    // reports.sort((a, b) => b.id - a.id); 

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    // Filter for reports that actually have data/slugs
    const targetReports = reports.filter(r => r.slug && r.slug.startsWith('localreports/'));

    console.log(`📋 Found ${targetReports.length} reports to process.`);

    for (const report of targetReports) {
        const slugBase = path.basename(report.slug, '.html');
        const outputPath = path.join(OUTPUT_DIR, `${slugBase}.webp`);

        // Check availability (Smart Skipping)
        // process.argv.includes('--force') to overwrite
        if (fs.existsSync(outputPath) && !process.argv.includes('--force')) {
            // console.log(`⏭️  Skipping ${slugBase} (Exists)`);
            // continue; 
            // actually for now let's overwrite to ensure new charts are captured
        }

        try {
            const fileUrl = `file://${path.join(__dirname, '../', report.slug)}`;
            // console.log(`Processing: ${fileUrl}`);

            await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

            // Wait for Chart.js animation
            await new Promise(r => setTimeout(r, 2000));

            // Wait for the chart element
            // Most reports use .chart-box canvas or a specific ID
            // We need a generic selector that finds the "Main" chart
            // Strategy: Look for the first canvas in .chart-box, or just the first canvas
            const element = await page.$('.chart-container, .chart-box, canvas');

            if (element) {
                // Determine crop area - we want a nice card-like crop
                // Actually, taking a screenshot of the *element* is best
                await element.screenshot({
                    path: outputPath,
                    type: 'webp',
                    quality: 80
                });
                console.log(`✅ Captured: ${slugBase}.webp`);
            } else {
                console.warn(`⚠️  No chart found for ${slugBase}`);
            }

        } catch (e) {
            console.error(`❌ Failed ${slugBase}: ${e.message}`);
        }
    }

    await browser.close();
    console.log("🎉 Thumbnail Generation Complete!");
}

generateThumbnails();
