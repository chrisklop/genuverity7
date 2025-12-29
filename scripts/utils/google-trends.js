const puppeteer = require('puppeteer');

/**
 * Scrapes Google Trends Daily Page (HTML) for US
 * Returns an array of clean trend objects: { title, traffic, link, pubDate }
 */
async function getUSDailyTrends() {
    console.log("📡 Connecting to Google Trends (US) via Puppeteer...");

    // Launch browser
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US,en']
    });

    try {
        const page = await browser.newPage();
        // Pipe browser console to node console
        page.on('console', msg => console.log('PAGE MSG:', msg.text()));

        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // Go to the Daily Trends page
        const TRENDS_URL = 'https://trends.google.com/trends/trendingsearches/daily?geo=US&hl=en-US';
        await page.goto(TRENDS_URL, { waitUntil: 'networkidle2', timeout: 30000 });

        // Wait for ANY content
        try {
            await page.waitForSelector('.feed-item', { timeout: 5000 });
        } catch (e) {
            console.log("PAGE LOG: Timeout waiting for .feed-item, dumping HTML...");
            const html = await page.content();
            const fs = require('fs');
            fs.writeFileSync('debug_trends.html', html);
        }

        const trends = await page.evaluate(() => {
            const items = [];

            // Strategy: Look for elements with 'data-term' attribute
            const termElements = document.querySelectorAll('[data-term]');
            const uniqueTerms = new Set();

            termElements.forEach(el => {
                const term = el.getAttribute('data-term');
                if (term && term.trim().length > 0 && !uniqueTerms.has(term)) {
                    uniqueTerms.add(term);

                    // Try to find traffic in same row/container
                    // Navigate up to find a container (tr or div)
                    let container = el.closest('tr') || el.closest('.feed-item') || el.closest('div');
                    let traffic = "Unknown";

                    if (container) {
                        // Look for anything that looks like a number + suffix
                        const text = container.innerText;
                        const match = text.match(/([0-9]+[K|M]\+)/);
                        if (match) traffic = match[0];
                    }

                    items.push({
                        title: term,
                        traffic: traffic,
                        link: 'https://google.com/search?q=' + encodeURIComponent(term),
                        related: []
                    });
                }
            });

            return items.slice(0, 20); // Return top 20 unique
        });

        return trends;

        return trends;

    } catch (error) {
        console.error("❌ Trends Scan Failed:", error);
        return [];
    } finally {
        await browser.close();
    }
}

// Allow direct execution for testing
if (require.main === module) {
    getUSDailyTrends().then(items => {
        console.log("✅ RAW TRENDS FETCHED:");
        console.log(JSON.stringify(items.slice(0, 3), null, 2));
    });
}

module.exports = { getUSDailyTrends };
