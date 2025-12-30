const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../images/thumbnails');
const VIEWPORT = { width: 1200, height: 800 };
const THUMBNAIL_SIZE = { width: 400, height: 400 }; // 1:1 square for Google SEO
const MIN_VALID_SIZE = 3000; // Files under 3KB are likely broken (blank backgrounds)

const REPORTS_DATA_PATH = path.join(__dirname, '../js/reports-data.js');

function getReportsData() {
    const content = fs.readFileSync(REPORTS_DATA_PATH, 'utf8');
    try {
        eval(content.replace('const REPORTS_DATA', 'global.REPORTS_DATA'));
        return global.REPORTS_DATA;
    } catch (e) {
        console.error("Error parsing reports-data.js:", e);
        process.exit(1);
    }
}

// Check if an existing thumbnail is valid (not a blank dark image)
function isValidThumbnail(filePath) {
    if (!fs.existsSync(filePath)) return false;
    const stats = fs.statSync(filePath);
    return stats.size >= MIN_VALID_SIZE;
}

async function generateThumbnails() {
    const args = process.argv.slice(2);
    const forceAll = args.includes('--force');
    const regenerateBroken = args.includes('--regenerate-broken');
    const skipExisting = args.includes('--skip-existing');

    console.log("📸 GenuVerity Thumbnail Generator");
    console.log(`   Output: ${THUMBNAIL_SIZE.width}x${THUMBNAIL_SIZE.height} WebP (1:1 square)`);
    console.log(`   Flags: ${forceAll ? '--force ' : ''}${regenerateBroken ? '--regenerate-broken ' : ''}${skipExisting ? '--skip-existing' : ''}`);
    console.log("");

    // Ensure output dir exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const reports = getReportsData();
    // Filter for reports with slugs (slug can be just the name, or include localreports/ prefix)
    const targetReports = reports.filter(r => r.slug && r.slug.length > 0);

    console.log(`📋 Found ${targetReports.length} reports to process.\n`);

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    let processed = 0;
    let skipped = 0;
    let failed = 0;

    for (const report of targetReports) {
        // Extract base name regardless of whether slug includes path/extension
        const slugBase = path.basename(report.slug.replace('.html', ''), '.html');
        const outputPath = path.join(OUTPUT_DIR, `${slugBase}.webp`);

        // Determine if we should process this report
        const exists = fs.existsSync(outputPath);
        const isValid = isValidThumbnail(outputPath);

        if (exists && skipExisting && !forceAll) {
            skipped++;
            continue;
        }

        if (exists && !forceAll) {
            if (regenerateBroken && isValid) {
                // Thumbnail exists and is valid, skip
                skipped++;
                continue;
            } else if (!regenerateBroken && isValid) {
                // Default: skip existing valid files
                skipped++;
                continue;
            }
            // If we get here, file is broken and we're regenerating
            console.log(`🔄 Regenerating broken: ${slugBase}`);
        }

        try {
            // Build the full path - add localreports/ prefix if not already present
            const slugPath = report.slug.startsWith('localreports/')
                ? report.slug
                : `localreports/${report.slug}.html`;
            const fileUrl = `file://${path.join(__dirname, '../', slugPath)}`;

            await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

            // Wait for Chart.js to render (animation complete)
            await new Promise(r => setTimeout(r, 2500));

            // Try multiple chart selectors in order of preference
            const chartSelectors = [
                'canvas',                    // Chart.js canvas
                '.chart-container canvas',   // Nested canvas
                '.chart-box canvas',         // Alternative container
                '.chart-wrapper canvas',     // Another common pattern
                '.chart-container',          // Container itself (for CSS charts)
                '.chart-box',                // Alternative container
                '.float-figure canvas',      // Figure with chart
            ];

            let element = null;
            for (const selector of chartSelectors) {
                element = await page.$(selector);
                if (element) break;
            }

            if (!element) {
                console.warn(`⚠️  No chart found: ${slugBase}`);
                failed++;
                continue;
            }

            // Verify chart has actual content (not just blank background)
            const hasContent = await page.evaluate((selector) => {
                const canvas = document.querySelector(selector);
                if (!canvas || canvas.tagName !== 'CANVAS') return true; // Non-canvas elements assumed OK

                try {
                    const ctx = canvas.getContext('2d');
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;

                    // Check if image has varied pixels (not solid color)
                    const firstR = data[0], firstG = data[1], firstB = data[2];
                    let variance = 0;

                    // Sample every 100th pixel for performance
                    for (let i = 0; i < data.length; i += 400) {
                        if (Math.abs(data[i] - firstR) > 10 ||
                            Math.abs(data[i+1] - firstG) > 10 ||
                            Math.abs(data[i+2] - firstB) > 10) {
                            variance++;
                        }
                    }

                    // If more than 5% of sampled pixels differ, chart has content
                    return variance > (data.length / 400) * 0.05;
                } catch (e) {
                    return true; // If we can't check, assume it's OK
                }
            }, chartSelectors.find(s => element));

            if (!hasContent) {
                console.warn(`⚠️  Chart appears blank: ${slugBase}`);
                failed++;
                continue;
            }

            // Get element bounding box for custom sizing
            const boundingBox = await element.boundingBox();

            if (!boundingBox || boundingBox.width <= 0 || boundingBox.height <= 0) {
                // Fallback: take element screenshot directly
                try {
                    await element.screenshot({
                        path: outputPath,
                        type: 'webp',
                        quality: 85
                    });
                } catch (screenshotErr) {
                    console.warn(`⚠️  Could not capture chart: ${slugBase}`);
                    failed++;
                    continue;
                }
            } else {
                // Take screenshot with padding around the element
                const padding = 10;
                const clipX = Math.max(0, boundingBox.x - padding);
                const clipY = Math.max(0, boundingBox.y - padding);
                const clipWidth = Math.min(boundingBox.width + (padding * 2), VIEWPORT.width - clipX);
                const clipHeight = Math.min(boundingBox.height + (padding * 2), VIEWPORT.height - clipY);

                if (clipWidth <= 0 || clipHeight <= 0) {
                    // Fallback to element screenshot
                    await element.screenshot({
                        path: outputPath,
                        type: 'webp',
                        quality: 85
                    });
                } else {
                    await page.screenshot({
                        path: outputPath,
                        type: 'webp',
                        quality: 85,
                        clip: {
                            x: clipX,
                            y: clipY,
                            width: clipWidth,
                            height: clipHeight
                        }
                    });
                }
            }

            // Verify output file is valid
            const outputStats = fs.statSync(outputPath);
            if (outputStats.size < MIN_VALID_SIZE) {
                console.warn(`⚠️  Generated file too small (${outputStats.size}B): ${slugBase}`);
                failed++;
                continue;
            }

            console.log(`✅ ${slugBase}.webp (${Math.round(outputStats.size/1024)}KB)`);
            processed++;

        } catch (e) {
            console.error(`❌ Failed ${slugBase}: ${e.message}`);
            failed++;
        }
    }

    await browser.close();

    console.log("");
    console.log("📊 Summary:");
    console.log(`   ✅ Processed: ${processed}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log("");
    console.log("🎉 Thumbnail Generation Complete!");
}

// Usage info
if (process.argv.includes('--help')) {
    console.log(`
GenuVerity Thumbnail Generator

Usage: node generate-thumbnails.js [options]

Options:
  --force              Regenerate ALL thumbnails (ignore existing)
  --regenerate-broken  Only regenerate thumbnails that appear broken (<3KB)
  --skip-existing      Skip all existing thumbnails (only generate new)
  --help               Show this help message

Examples:
  node generate-thumbnails.js                    # Default: regenerate broken, skip valid
  node generate-thumbnails.js --force            # Regenerate everything
  node generate-thumbnails.js --regenerate-broken # Only fix broken ones
`);
    process.exit(0);
}

generateThumbnails();
