#!/usr/bin/env node
/**
 * GenuVerity SEO Generator
 *
 * Generates from js/reports-data.js:
 * 1. sitemap.xml - Standard sitemap with clean URLs
 * 2. sitemap-news.xml - Google News sitemap
 * 3. robots.txt - Updated with correct domain
 * 4. vercel.json - Updated with rewrites for clean URLs
 *
 * Clean URL scheme:
 *   genuverity.com/election-deepfakes-2025
 *   → serves localreports/election-deepfakes-2025.html
 *
 * Usage: node tools/generate-sitemaps.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const DOMAIN = 'https://www.genuverity.com';
const HOST = 'www.genuverity.com';
const REPORTS_DATA_PATH = path.join(__dirname, '..', 'js', 'reports-data.js');
const SITEMAP_PATH = path.join(__dirname, '..', 'sitemap.xml');
const NEWS_SITEMAP_PATH = path.join(__dirname, '..', 'sitemap-news.xml');
const ROBOTS_PATH = path.join(__dirname, '..', 'robots.txt');
const VERCEL_JSON_PATH = path.join(__dirname, '..', 'vercel.json');
const LOCALREPORTS_DIR = path.join(__dirname, '..', 'localreports');
const RSS_PATH = path.join(__dirname, '..', 'feed.xml');
const INDEXNOW_KEY = process.env.INDEXNOW_API_KEY || '41a076898a6f49c9a0be10aebc9e4811';

// Static pages to include in sitemap
const STATIC_PAGES = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/reports.html', priority: '0.9', changefreq: 'daily' },
    { loc: '/methods.html', priority: '0.7', changefreq: 'monthly' },
    { loc: '/comparison.html', priority: '0.7', changefreq: 'monthly' },
];

// Get all report slugs from the localreports directory
function getAllReportSlugs() {
    const files = fs.readdirSync(LOCALREPORTS_DIR);
    return files
        .filter(f => f.endsWith('.html'))
        .map(f => f.replace('.html', ''));
}

// Parse the reports-data.js file to extract report data
function parseReportsData() {
    const content = fs.readFileSync(REPORTS_DATA_PATH, 'utf8');

    const reports = [];

    // Match each object in the array
    const slugMatches = content.matchAll(/slug:\s*["'](?:localreports\/)?([^"']+?)(?:\.html)?["']/g);
    const titleMatches = content.matchAll(/title:\s*["']([^"']+)["']/g);
    const dateMatches = content.matchAll(/date:\s*["']([^"']+)["']/g);

    const slugs = [...slugMatches].map(m => m[1]);
    const titles = [...titleMatches].map(m => m[1]);
    const dates = [...dateMatches].map(m => m[1]);

    // Combine (they should be in order)
    for (let i = 0; i < slugs.length; i++) {
        reports.push({
            slug: slugs[i].replace('localreports/', '').replace('.html', ''),
            title: titles[i] || 'Untitled',
            date: dates[i] || new Date().toISOString().split('T')[0]
        });
    }

    return reports;
}

// Convert date string like "Dec 29, 2025" to ISO format "2025-12-29"
function parseDate(dateStr) {
    if (!dateStr) return new Date().toISOString().split('T')[0];

    try {
        const parsed = new Date(dateStr);
        if (isNaN(parsed.getTime())) {
            return new Date().toISOString().split('T')[0];
        }
        return parsed.toISOString().split('T')[0];
    } catch {
        return new Date().toISOString().split('T')[0];
    }
}

// Generate standard sitemap.xml with clean URLs
function generateSitemap(reports) {
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static pages
    for (const page of STATIC_PAGES) {
        xml += `  <url>
    <loc>${DOMAIN}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    }

    // Add all reports with CLEAN URLs (no /localreports/, no .html)
    for (const report of reports) {
        const lastmod = parseDate(report.date);
        xml += `  <url>
    <loc>${DOMAIN}/${report.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    }

    xml += `</urlset>
`;

    return xml;
}

// Generate Google News sitemap
function generateNewsSitemap(reports) {
    const recentReports = reports.slice(0, 30); // Top 30 most recent

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;

    for (const report of recentReports) {
        const pubDate = parseDate(report.date);
        const safeTitle = report.title
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');

        xml += `  <url>
    <loc>${DOMAIN}/${report.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>GenuVerity</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${safeTitle}</news:title>
    </news:news>
  </url>
`;
    }

    xml += `</urlset>
`;

    return xml;
}

// Generate RSS feed
function generateRssFeed(reports) {
    const recentReports = reports.slice(0, 30); // Latest 30
    const buildDate = new Date().toUTCString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GenuVerity - Fact-Check Reports</title>
    <link>${DOMAIN}</link>
    <description>AI-powered fact-checking platform investigating misinformation, disinformation, and viral claims with source-first methodology.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${DOMAIN}/feed.xml" rel="self" type="application/rss+xml"/>
`;

    for (const report of recentReports) {
        const pubDate = new Date(report.date).toUTCString();
        const safeTitle = report.title
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');

        xml += `    <item>
      <title>${safeTitle}</title>
      <link>${DOMAIN}/${report.slug}</link>
      <guid isPermaLink="true">${DOMAIN}/${report.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${safeTitle}</description>
    </item>
`;
    }

    xml += `  </channel>
</rss>
`;

    return xml;
}

// Generate robots.txt
function generateRobotsTxt() {
    return `# GenuVerity Robots.txt
# Updated: ${new Date().toISOString().split('T')[0]}

User-agent: *
Allow: /

# Sitemaps
Sitemap: ${DOMAIN}/sitemap.xml
Sitemap: ${DOMAIN}/sitemap-news.xml

# RSS Feed
# ${DOMAIN}/feed.xml

# LLM Information
# ${DOMAIN}/llms.txt

# Crawl-delay
Crawl-delay: 1
`;
}

// Update vercel.json with rewrites for clean URLs
function updateVercelJson(allSlugs) {
    const vercelJson = JSON.parse(fs.readFileSync(VERCEL_JSON_PATH, 'utf8'));

    // Build new rewrites array
    const newRewrites = [];

    // 1. Keep sitemap/robots/api rewrites at the top
    newRewrites.push(
        { source: '/sitemap.xml', destination: '/sitemap.xml' },
        { source: '/sitemap-news.xml', destination: '/sitemap-news.xml' },
        { source: '/robots.txt', destination: '/robots.txt' },
        { source: '/api/:path*', destination: '/api/index.py' }
    );

    // 2. Add clean URL rewrites for ALL reports
    // /slug → /localreports/slug.html
    for (const slug of allSlugs) {
        newRewrites.push({
            source: `/${slug}`,
            destination: `/localreports/${slug}.html`
        });
    }

    // 3. Keep backwards compatibility: /localreports/slug.html still works
    // (These are served directly as static files, no rewrite needed)

    // 4. Catch-all for SPA routes (must be LAST)
    newRewrites.push({
        source: '/:path*',
        destination: '/index.html'
    });

    // Update vercel.json
    vercelJson.rewrites = newRewrites;

    // Keep existing redirects for old URLs
    // (These redirect old paths to new clean URLs)
    const newRedirects = [];
    for (const slug of allSlugs) {
        // Redirect /localreports/slug.html → /slug (permanent)
        newRedirects.push({
            source: `/localreports/${slug}.html`,
            destination: `/${slug}`,
            permanent: true
        });
        // Also redirect /slug.html → /slug
        newRedirects.push({
            source: `/${slug}.html`,
            destination: `/${slug}`,
            permanent: true
        });
    }
    vercelJson.redirects = newRedirects;

    return JSON.stringify(vercelJson, null, 2);
}

// Get existing URLs from current sitemap (to detect new content)
function getExistingSitemapUrls() {
    try {
        if (!fs.existsSync(SITEMAP_PATH)) return new Set();
        const content = fs.readFileSync(SITEMAP_PATH, 'utf8');
        const matches = content.matchAll(/<loc>([^<]+)<\/loc>/g);
        return new Set([...matches].map(m => m[1]));
    } catch {
        return new Set();
    }
}

// Ping IndexNow with new URLs
function pingIndexNow(newUrls) {
    return new Promise((resolve) => {
        if (newUrls.length === 0) {
            resolve({ success: true, message: 'No new URLs to submit' });
            return;
        }

        const data = JSON.stringify({
            host: HOST,
            key: INDEXNOW_KEY,
            keyLocation: `${DOMAIN}/${INDEXNOW_KEY}.txt`,
            urlList: newUrls
        });

        const options = {
            hostname: 'api.indexnow.org',
            port: 443,
            path: '/indexnow',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 200 || res.statusCode === 202) {
                    resolve({ success: true, message: `Submitted ${newUrls.length} URLs` });
                } else {
                    resolve({ success: false, message: `HTTP ${res.statusCode}: ${body}` });
                }
            });
        });

        req.on('error', (e) => {
            resolve({ success: false, message: e.message });
        });

        req.write(data);
        req.end();
    });
}

// Main execution
async function main() {
    console.log('🗺️  GenuVerity SEO Generator\n');
    console.log('═══════════════════════════════════════════════════\n');

    // Get existing URLs BEFORE regenerating (to detect new content)
    const existingUrls = getExistingSitemapUrls();

    // Get all slugs from filesystem (authoritative source)
    console.log('📂 Scanning localreports directory...');
    const allSlugs = getAllReportSlugs();
    console.log(`   Found ${allSlugs.length} report files\n`);

    // Parse reports data for metadata
    console.log('📖 Reading metadata from js/reports-data.js...');
    const reports = parseReportsData();
    console.log(`   Found ${reports.length} report entries\n`);

    // Generate standard sitemap
    console.log('📝 Generating sitemap.xml (clean URLs)...');
    const sitemap = generateSitemap(reports);
    fs.writeFileSync(SITEMAP_PATH, sitemap);
    console.log(`   ✅ ${STATIC_PAGES.length + reports.length} URLs written\n`);

    // Generate news sitemap
    console.log('📰 Generating sitemap-news.xml...');
    const newsSitemap = generateNewsSitemap(reports);
    fs.writeFileSync(NEWS_SITEMAP_PATH, newsSitemap);
    console.log(`   ✅ ${Math.min(30, reports.length)} recent articles\n`);

    // Generate RSS feed
    console.log('📡 Generating feed.xml (RSS)...');
    const rssFeed = generateRssFeed(reports);
    fs.writeFileSync(RSS_PATH, rssFeed);
    console.log(`   ✅ ${Math.min(30, reports.length)} recent articles\n`);

    // Update robots.txt
    console.log('🤖 Generating robots.txt...');
    const robotsTxt = generateRobotsTxt();
    fs.writeFileSync(ROBOTS_PATH, robotsTxt);
    console.log(`   ✅ Updated with ${DOMAIN}\n`);

    // Update vercel.json
    console.log('⚙️  Updating vercel.json rewrites...');
    const vercelJson = updateVercelJson(allSlugs);
    fs.writeFileSync(VERCEL_JSON_PATH, vercelJson);
    console.log(`   ✅ ${allSlugs.length} clean URL rewrites added\n`);

    // Find new URLs and ping IndexNow
    const newUrls = reports
        .map(r => `${DOMAIN}/${r.slug}`)
        .filter(url => !existingUrls.has(url));

    if (newUrls.length > 0) {
        console.log('🔔 Pinging IndexNow with new URLs...');
        console.log(`   Found ${newUrls.length} new URL(s):`);
        newUrls.forEach(url => console.log(`   • ${url}`));
        const result = await pingIndexNow(newUrls);
        if (result.success) {
            console.log(`   ✅ ${result.message}\n`);
        } else {
            console.log(`   ⚠️  ${result.message}\n`);
        }
    } else {
        console.log('🔔 IndexNow: No new URLs to submit\n');
    }

    // Summary
    console.log('═══════════════════════════════════════════════════');
    console.log('✅ SEO configuration complete!\n');
    console.log('📍 Clean URL scheme:');
    console.log(`   ${DOMAIN}/election-deepfakes-2025`);
    console.log(`   → serves /localreports/election-deepfakes-2025.html\n`);
    console.log('📋 Files updated:');
    console.log('   • sitemap.xml');
    console.log('   • sitemap-news.xml');
    console.log('   • feed.xml (RSS)');
    console.log('   • robots.txt');
    console.log('   • vercel.json\n');
    console.log('🚀 Next steps:');
    console.log('   1. git add sitemap.xml sitemap-news.xml feed.xml robots.txt vercel.json');
    console.log('   2. git commit -m "SEO: Update sitemaps"');
    console.log('   3. git push (Vercel auto-deploys)');
    console.log('═══════════════════════════════════════════════════');
}

main();
