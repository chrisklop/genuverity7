#!/usr/bin/env node
/**
 * Extract metadata from missing report HTML files
 * and generate reports-data.js entries
 */

const fs = require('fs');
const path = require('path');

const missingReports = `abrego-garcia-ms13-tattoos-2025
atc-sorting-claims-2025
autopen-pardon-termination-2025
bangladesh-dipu-das-video-2025
barilla-insect-flour-2025
biden-situation-room-image-2025
dead-internet-theory-2025
deepseek-chatbot-accuracy-2025
epstein-files-fabrication-2025
google-gemini-misinfo-audit-2025
google-lens-ai-overviews-2025
hobby-lobby-demon-merchandise-2025
india-digital-arrest-scam-2025
india-pakistan-karachi-invasion-2025
jeffries-ballroom-priority-2025
jeffries-ended-medical-research-2025
john-mark-dougan-storm-1516-2025
maduro-surrender-video-2025
maui-weather-weapons-2025
menopausal-hormone-therapy-2025
mike-lee-marxist-claim-2025
modi-cheapfakes-2025
nato-troops-coffins-2025
nc-wireless-driving-ban-2025
netanyahu-no-starvation-gaza-2025
nigeria-education-fees-2025
nigeria-school-opening-2025
patriot-front-agents-claim-2025
pravda-network-2025
pritzker-snap-shutdown-2025
ruby-bradley-loser-quote-2025
sa-illegal-migrants-claim-2025
sa-metro-spending-2025
sa-mozambican-arrest-photo-2025
sa-self-defense-right-2025
sean-combs-trial-misinfo-2025
starmer-curfew-fake-video-2025
storm-1516-russian-campaigns-2025
target-satanic-campaign-2025
trump-dead-labor-day-2025
trump-duterte-arrest-response-2025
trump-native-born-jobs-2025
trump-shitholes-admission-2025
trump-walker-image-2025
uk-christmas-decoration-tax-2025
unnao-rape-convict-ai-2025
us-vaccine-schedule-global-2025
usda-transgender-study-2025
vance-musk-fake-audio-2025
yogi-adityanath-deepfake-2025`.trim().split('\n');

// Category to tagClass/icon mapping
const categoryMappings = {
    'Immigration & Border': { tagClass: 'tag-amber', icon: 'map-pin' },
    'U.S. Politics & Policy': { tagClass: 'tag-blue', icon: 'landmark' },
    'AI & Deepfakes': { tagClass: 'tag-red', icon: 'bot' },
    'Conspiracy & Hoaxes': { tagClass: 'tag-amber', icon: 'eye-off' },
    'Platform & Tech': { tagClass: 'tag-blue', icon: 'smartphone' },
    'Health & Science': { tagClass: 'tag-green', icon: 'heart-pulse' },
    'International': { tagClass: 'tag-cyan', icon: 'globe' },
    'Media & Journalism': { tagClass: 'tag-blue', icon: 'newspaper' },
    'Election Integrity': { tagClass: 'tag-red', icon: 'vote' },
    'Economic': { tagClass: 'tag-amber', icon: 'trending-up' },
    'Foreign Influence': { tagClass: 'tag-red', icon: 'shield-alert' },
    'Consumer & Business': { tagClass: 'tag-blue', icon: 'shopping-bag' }
};

// Verdict to color mapping
const verdictColors = {
    'false': 'red',
    'true': 'green',
    'mixed': 'cyan',
    'misleading': 'amber',
    'context': 'cyan',
    'unverified': 'amber'
};

function extractMetadata(slug) {
    const filePath = path.join(__dirname, '..', 'localreports', `${slug}.html`);

    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return null;
    }

    const html = fs.readFileSync(filePath, 'utf8');

    // Extract title from <title> tag
    const titleMatch = html.match(/<title>([^<|]+)/);
    let title = titleMatch ? titleMatch[1].replace(/\s*\|\s*GenuVerity.*$/, '').trim() : slug;

    // Clean up title - remove " | GenuVerity" suffix
    title = title.replace(/\s*[-|]\s*GenuVerity.*$/i, '').trim();

    // Extract description/excerpt
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
    let excerpt = descMatch ? descMatch[1] : '';

    // Extract date from JSON-LD or datetime attribute
    const dateMatch = html.match(/"datePublished":\s*"([^"]+)"/) ||
                      html.match(/datetime="([^"]+)"/);
    let date = dateMatch ? dateMatch[1] : '2025-01-02';

    // Format date nicely
    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const d = new Date(date + 'T00:00:00');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }

    // Extract category from first meta-tag
    const categoryMatch = html.match(/<span\s+class="meta-tag">([^<]+)<\/span>/);
    let category = categoryMatch ? categoryMatch[1].trim() : 'Conspiracy & Hoaxes';

    // Extract verdict from meta-tag with color class
    const verdictMatch = html.match(/<span\s+class="meta-tag\s+(red|green|amber|cyan)"[^>]*>([^<]+)<\/span>/i);
    let verdict = verdictMatch ? verdictMatch[2].trim().toLowerCase() : 'mixed';

    // Extract sources count
    const sourcesMatch = html.match(/<span\s+class="sources-count">(\d+)<\/span>/);
    const sourcesCount = sourcesMatch ? parseInt(sourcesMatch[1]) : 8;

    // Get category mapping
    const catMapping = categoryMappings[category] || { tagClass: 'tag-blue', icon: 'file-text' };

    // Determine read time based on content length
    const contentLength = html.length;
    const readTime = Math.max(8, Math.min(20, Math.round(contentLength / 5000)));

    return {
        title,
        slug,
        category,
        tagClass: catMapping.tagClass,
        catClass: 'cat-factcheck',
        icon: catMapping.icon,
        date,
        sources: `${sourcesCount} Sources`,
        readTime: `${readTime} min`,
        verdict,
        excerpt
    };
}

// Generate entries
const entries = [];
for (const slug of missingReports) {
    const meta = extractMetadata(slug);
    if (meta) {
        entries.push(meta);
    }
}

// Output as JavaScript object entries
console.log('// Missing report entries - add these to reports-data.js\n');
entries.forEach((entry, idx) => {
    console.log(`    {
        id: ${idx},
        title: "${entry.title.replace(/"/g, '\\"')}",
        slug: "${entry.slug}",
        category: "${entry.category}",
        tagClass: "${entry.tagClass}",
        catClass: "${entry.catClass}",
        icon: "${entry.icon}",
        date: "${entry.date}",
        sources: "${entry.sources}",
        readTime: "${entry.readTime}",
        verdict: "${entry.verdict}",
        excerpt: "${entry.excerpt.replace(/"/g, '\\"')}"
    },`);
});

console.log(`\n// Total: ${entries.length} entries`);
