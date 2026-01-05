#!/usr/bin/env node
/**
 * Fix reports-data.js by:
 * 1. Adding 50 missing reports
 * 2. Renumbering all IDs sequentially 0-182
 * 3. Sorting by date (newest first)
 */

const fs = require('fs');
const path = require('path');

// Read current reports-data.js
const reportsDataPath = path.join(__dirname, '..', 'js', 'reports-data.js');
let content = fs.readFileSync(reportsDataPath, 'utf8');

// Extract the REPORTS_DATA array
const match = content.match(/const REPORTS_DATA = \[([\s\S]*?)\];/);
if (!match) {
    console.error('Could not find REPORTS_DATA array');
    process.exit(1);
}

// Parse existing reports (eval is safe here since we control the file)
let existingReports;
try {
    eval('existingReports = [' + match[1] + ']');
} catch (e) {
    console.error('Error parsing existing reports:', e);
    process.exit(1);
}

console.log(`Found ${existingReports.length} existing reports`);

// Get existing slugs
const existingSlugs = new Set(existingReports.map(r => r.slug));

// 50 missing reports extracted from HTML files
const missingReports = [
    { title: "Abrego Garcia MS-13 Tattoos: Misidentification in Deportation Case", slug: "abrego-garcia-ms13-tattoos-2025", category: "Immigration & Border", tagClass: "tag-amber", catClass: "cat-factcheck", icon: "map-pin", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Claims about Kilmar Abrego Garcia's MS-13 tattoos were debunked. The deportation case became a flashpoint for gang misidentification issues." },
    { title: "Air Traffic Control DEI Claims: Misleading FAA Policy Criticism", slug: "atc-sorting-claims-2025", category: "U.S. Politics & Policy", tagClass: "tag-blue", catClass: "cat-factcheck", icon: "landmark", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "misleading", excerpt: "MISLEADING: Claims about 'diversity' affecting air traffic control hiring misrepresented FAA qualification standards and hiring practices." },
    { title: "Autopen Pardon Termination Claims: Legally Unfounded", slug: "autopen-pardon-termination-2025", category: "U.S. Politics & Policy", tagClass: "tag-blue", catClass: "cat-factcheck", icon: "landmark", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Claims that pardons signed with autopen can be legally terminated are false. Legal experts confirm autopen signatures are valid." },
    { title: "Bangladesh Police Dipu Das Video: Misattributed Footage", slug: "bangladesh-dipu-das-video-2025", category: "International", tagClass: "tag-cyan", catClass: "cat-factcheck", icon: "globe", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "misleading", excerpt: "MISLEADING: A video involving Bangladeshi police officer Dipu Das was taken out of context and misattributed on social media." },
    { title: "Barilla 'Insect Flour' Claims: EU Regulations vs. Social Media Panic", slug: "barilla-insect-flour-2025", category: "Conspiracy & Hoaxes", tagClass: "tag-amber", catClass: "cat-factcheck", icon: "eye-off", date: "Jan 3, 2025", sources: "12 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Viral claims that Barilla pasta contains insect flour were debunked. Analysis of EU insect protein regulations shows standard food labeling." },
    { title: "Biden Military Situation Room Image: AI-Generated Political Deepfake", slug: "biden-situation-room-image-2025", category: "AI & Deepfakes", tagClass: "tag-red", catClass: "cat-factcheck", icon: "bot", date: "Jan 3, 2026", sources: "12 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: A viral image purportedly showing President Biden in a military situation room was AI-generated. Digital forensics revealed synthetic artifacts." },
    { title: "'The Internet Died in 2016' Theory", slug: "dead-internet-theory-2025", category: "Conspiracy & Hoaxes", tagClass: "tag-amber", catClass: "cat-factcheck", icon: "eye-off", date: "Jan 3, 2025", sources: "12 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: The Dead Internet Theory claiming most online content is AI-generated bots is debunked. Evidence shows the internet remains human-driven." },
    { title: "DeepSeek Chatbot: Accuracy Issues Revealed by NewsGuard Audit", slug: "deepseek-chatbot-accuracy-2025", category: "AI & Deepfakes", tagClass: "tag-red", catClass: "cat-factcheck", icon: "bot", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "context", excerpt: "CONTEXT: NewsGuard audits revealed significant accuracy issues with the Chinese DeepSeek AI chatbot, particularly on politically sensitive topics." },
    { title: "Epstein Files Fabrication: Sorting Truth From Viral Hoaxes", slug: "epstein-files-fabrication-2025", category: "Conspiracy & Hoaxes", tagClass: "tag-amber", catClass: "cat-factcheck", icon: "eye-off", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "mixed", excerpt: "MIXED: Claims about fabricated Epstein files mixed legitimate documents with viral hoaxes in 2025." },
    { title: "Google Gemini Misinformation Audit: AI Accuracy Concerns", slug: "google-gemini-misinfo-audit-2025", category: "AI & Deepfakes", tagClass: "tag-red", catClass: "cat-factcheck", icon: "bot", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "context", excerpt: "CONTEXT: NewsGuard audits revealed Google Gemini AI providing inaccurate information on sensitive topics." },
    { title: "Google AI Overviews Misinformation: When Search Goes Wrong", slug: "google-lens-ai-overviews-2025", category: "AI & Deepfakes", tagClass: "tag-red", catClass: "cat-factcheck", icon: "bot", date: "Jan 3, 2026", sources: "12 Sources", readTime: "8 min", verdict: "context", excerpt: "CONTEXT: Google's AI Overviews feature has generated numerous documented errors, from recommending glue on pizza to dangerous health advice." },
    { title: "Hobby Lobby 'Demon' Merchandise Claims Debunked", slug: "hobby-lobby-demon-merchandise-2025", category: "Conspiracy & Hoaxes", tagClass: "tag-amber", catClass: "cat-factcheck", icon: "eye-off", date: "Jan 3, 2025", sources: "12 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Viral claims that Hobby Lobby sells demonic merchandise were debunked. Investigation reveals misidentified products." },
    { title: "India Digital Arrest Scam: The Rs 11,000 Crore Fraud Epidemic", slug: "india-digital-arrest-scam-2025", category: "International", tagClass: "tag-cyan", catClass: "cat-factcheck", icon: "globe", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "context", excerpt: "CONTEXT: The 'digital arrest' scam targeting Indians became a major fraud trend in 2025, with PM Modi warning citizens." },
    { title: "India-Pakistan Karachi Invasion Claim: Crisis Misinformation Exposed", slug: "india-pakistan-karachi-invasion-2025", category: "International", tagClass: "tag-cyan", catClass: "cat-factcheck", icon: "globe", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: False claims about an Indian invasion of Karachi spread during the 2025 India-Pakistan crisis." },
    { title: "Hakeem Jeffries Ballroom Priority Claim: Missing Context", slug: "jeffries-ballroom-priority-2025", category: "U.S. Politics & Policy", tagClass: "tag-blue", catClass: "cat-factcheck", icon: "landmark", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "misleading", excerpt: "MISLEADING: Claims about Rep. Jeffries prioritizing a ballroom over crisis response lacked crucial context." },
    { title: "Jeffries 'Ended Medical Research' Claim: False Budget Accusation", slug: "jeffries-ended-medical-research-2025", category: "U.S. Politics & Policy", tagClass: "tag-blue", catClass: "cat-factcheck", icon: "landmark", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Claims that Rep. Jeffries 'ended medical research' grossly misrepresented budget votes and NIH funding." },
    { title: "John Mark Dougan: Former Deputy Sheriff Leads Russian Disinformation", slug: "john-mark-dougan-storm-1516-2025", category: "Foreign Influence", tagClass: "tag-red", catClass: "cat-factcheck", icon: "shield-alert", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "context", excerpt: "CONTEXT: Former Florida deputy sheriff John Mark Dougan was identified as a key operative in Russian influence operation Storm-1516." },
    { title: "Maduro 'Surrender' Video: Fabricated Deepfake Exposed", slug: "maduro-surrender-video-2025", category: "AI & Deepfakes", tagClass: "tag-red", catClass: "cat-factcheck", icon: "bot", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: A fabricated video showing Venezuelan President Maduro surrendering was exposed as a deepfake." },
    { title: "Maui 'Weather Weapons' Experiment", slug: "maui-weather-weapons-2025", category: "Conspiracy & Hoaxes", tagClass: "tag-amber", catClass: "cat-factcheck", icon: "eye-off", date: "Jan 3, 2025", sources: "12 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Debunking viral claims that HAARP or directed energy weapons caused the 2023 Maui wildfires." },
    { title: "Menopausal Hormone Therapy Claims: Missing Nuance on Risks", slug: "menopausal-hormone-therapy-2025", category: "Health & Science", tagClass: "tag-green", catClass: "cat-factcheck", icon: "heart-pulse", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "context", excerpt: "CONTEXT: Claims about menopausal hormone therapy benefits lack nuance about individual risks." },
    { title: "Mike Lee 'Marxist' Claim: Conservative Senator Mislabeled", slug: "mike-lee-marxist-claim-2025", category: "U.S. Politics & Policy", tagClass: "tag-blue", catClass: "cat-factcheck", icon: "landmark", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Claims labeling Senator Mike Lee a 'Marxist' grossly misrepresented his political positions." },
    { title: "Modi Cheapfakes: Manipulated Videos Target Indian PM", slug: "modi-cheapfakes-2025", category: "AI & Deepfakes", tagClass: "tag-red", catClass: "cat-factcheck", icon: "bot", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Multiple 'cheapfake' videos misrepresenting PM Modi's statements spread in 2025." },
    { title: "NATO 'Troops in Coffins': Russian Disinformation Campaign Debunked", slug: "nato-troops-coffins-2025", category: "Foreign Influence", tagClass: "tag-red", catClass: "cat-factcheck", icon: "shield-alert", date: "Jan 3, 2026", sources: "12 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Viral images of mass NATO troop casualties are fabricated Russian propaganda using AI-generated images." },
    { title: "NC Wireless Driving Ban: Misleading Claims About Legislation", slug: "nc-wireless-driving-ban-2025", category: "U.S. Politics & Policy", tagClass: "tag-blue", catClass: "cat-factcheck", icon: "landmark", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "misleading", excerpt: "MISLEADING: Claims about North Carolina's wireless driving ban misrepresented the actual legislation." },
    { title: "Netanyahu Gaza Starvation Claims: Contradicted by Humanitarian Reports", slug: "netanyahu-no-starvation-gaza-2025", category: "International", tagClass: "tag-cyan", catClass: "cat-factcheck", icon: "globe", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Netanyahu's claims about no starvation in Gaza contradicted UN and humanitarian reports." },
    { title: "Nigeria Education Fees Hoax: Viral Panic Over Fabricated Charges", slug: "nigeria-education-fees-2025", category: "International", tagClass: "tag-cyan", catClass: "cat-factcheck", icon: "globe", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: False claims about new mandatory education fees in Nigeria spread viral panic." },
    { title: "Nigeria School Opening Misinformation: Viral Panic Over Fake Dates", slug: "nigeria-school-opening-2025", category: "International", tagClass: "tag-cyan", catClass: "cat-factcheck", icon: "globe", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: False claims about school resumption dates spread viral panic among Nigerian parents." },
    { title: "Patriot Front 'Federal Agents' Claim: Conspiracy Theory Debunked", slug: "patriot-front-agents-claim-2025", category: "Conspiracy & Hoaxes", tagClass: "tag-amber", catClass: "cat-factcheck", icon: "eye-off", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Claims that Patriot Front members are federal agents have been debunked." },
    { title: "Pravda Network: Russian AI-Powered Disinformation Infrastructure", slug: "pravda-network-2025", category: "Foreign Influence", tagClass: "tag-red", catClass: "cat-factcheck", icon: "shield-alert", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "context", excerpt: "CONTEXT: The Pravda disinformation network continued operations in 2025 with documented AI integration." },
    { title: "Pritzker SNAP Shutdown Claim: False Welfare Misinformation", slug: "pritzker-snap-shutdown-2025", category: "U.S. Politics & Policy", tagClass: "tag-blue", catClass: "cat-factcheck", icon: "landmark", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Claims that Illinois Gov. Pritzker shut down SNAP benefit machines were false." },
    { title: "Ruby Bradley 'Loser' Quote: Fabricated WWII Hero Quote", slug: "ruby-bradley-loser-quote-2025", category: "Conspiracy & Hoaxes", tagClass: "tag-amber", catClass: "cat-factcheck", icon: "eye-off", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: A viral quote attributed to WWII hero Ruby Bradley was completely fabricated." },
    { title: "SA 15 Million Illegal Migrants Claim: Evidence-Free Xenophobia", slug: "sa-illegal-migrants-claim-2025", category: "International", tagClass: "tag-cyan", catClass: "cat-factcheck", icon: "globe", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Claims that South Africa has 15 million illegal migrants are unsupported by evidence." },
    { title: "SA Metro Spending Claims: Political Figures Misrepresent Budgets", slug: "sa-metro-spending-2025", category: "International", tagClass: "tag-cyan", catClass: "cat-factcheck", icon: "globe", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "misleading", excerpt: "MISLEADING: Claims about South African metropolitan spending contain significant inaccuracies." },
    { title: "SA Mozambican Woman Arrest Photo: Viral Misattribution Exposed", slug: "sa-mozambican-arrest-photo-2025", category: "International", tagClass: "tag-cyan", catClass: "cat-factcheck", icon: "globe", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: A viral photo claiming to show a Mozambican woman being arrested was from 2019." },
    { title: "SA Self-Defense Law Claims: Viral Misrepresentation", slug: "sa-self-defense-right-2025", category: "International", tagClass: "tag-cyan", catClass: "cat-factcheck", icon: "globe", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "misleading", excerpt: "MISLEADING: Viral claims about South African self-defense laws misrepresent actual legal standards." },
    { title: "Sean Combs Trial Misinformation: Separating Fact from Fiction", slug: "sean-combs-trial-misinfo-2025", category: "Media & Journalism", tagClass: "tag-blue", catClass: "cat-factcheck", icon: "newspaper", date: "Jan 3, 2026", sources: "12 Sources", readTime: "8 min", verdict: "mixed", excerpt: "MIXED: Analysis of viral misinformation surrounding the Sean 'Diddy' Combs federal trial." },
    { title: "Starmer Curfew Deepfake: Russian Operation Targets UK PM", slug: "starmer-curfew-fake-video-2025", category: "AI & Deepfakes", tagClass: "tag-red", catClass: "cat-factcheck", icon: "bot", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: A fabricated video showing UK PM Starmer announcing curfews was Russian disinformation." },
    { title: "Storm-1516: Russian Influence Operation Campaigns in 2025", slug: "storm-1516-russian-campaigns-2025", category: "Foreign Influence", tagClass: "tag-red", catClass: "cat-factcheck", icon: "shield-alert", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "context", excerpt: "CONTEXT: Microsoft-identified Russian influence operation Storm-1516 conducted multiple campaigns in 2025." },
    { title: "Target 'Satanic' Campaign: How Viral Claims Misrepresented Products", slug: "target-satanic-campaign-2025", category: "Conspiracy & Hoaxes", tagClass: "tag-amber", catClass: "cat-factcheck", icon: "eye-off", date: "Jan 3, 2026", sources: "12 Sources", readTime: "8 min", verdict: "misleading", excerpt: "MISLEADING: Coordinated social media campaigns falsely claimed Target sold 'satanic' merchandise." },
    { title: "Trump Labor Day Death Hoax: Bizarre Conspiracy Theory Debunked", slug: "trump-dead-labor-day-2025", category: "Conspiracy & Hoaxes", tagClass: "tag-amber", catClass: "cat-factcheck", icon: "eye-off", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: A bizarre conspiracy theory claiming Trump died on Labor Day was quickly debunked." },
    { title: "Trump Duterte Arrest Response: Fake Statement Image Debunked", slug: "trump-duterte-arrest-response-2025", category: "AI & Deepfakes", tagClass: "tag-red", catClass: "cat-factcheck", icon: "bot", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: A viral image showing Trump commenting on Duterte's arrest was fabricated." },
    { title: "Trump Native-Born Job Creation Claim: Questionable Data Analysis", slug: "trump-native-born-jobs-2025", category: "U.S. Politics & Policy", tagClass: "tag-blue", catClass: "cat-factcheck", icon: "landmark", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "misleading", excerpt: "MISLEADING: Trump's claims about native-born job creation used questionable data analysis." },
    { title: "Trump 'Shithole Countries' Statement: Claims Need Context", slug: "trump-shitholes-admission-2025", category: "U.S. Politics & Policy", tagClass: "tag-blue", catClass: "cat-factcheck", icon: "landmark", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "context", excerpt: "CONTEXT: Claims about Trump 'admitting' to the comment require context about the original incident." },
    { title: "Trump Walker Image: Manipulated Photo Spreads Health Misinformation", slug: "trump-walker-image-2025", category: "AI & Deepfakes", tagClass: "tag-red", catClass: "cat-factcheck", icon: "bot", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: A manipulated image showing Donald Trump using a walker was exposed as fake." },
    { title: "UK Christmas Decoration Tax: Viral Hoax Debunked", slug: "uk-christmas-decoration-tax-2025", category: "International", tagClass: "tag-cyan", catClass: "cat-factcheck", icon: "globe", date: "Jan 3, 2026", sources: "12 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Claims that UK homeowners must pay a 'Christmas decoration tax' are completely fabricated." },
    { title: "Unnao Rape Convict AI Image: Fabricated Photo Exposed", slug: "unnao-rape-convict-ai-2025", category: "AI & Deepfakes", tagClass: "tag-red", catClass: "cat-factcheck", icon: "bot", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: AI-generated images falsely showing convicted rapist Kuldeep Singh Sengar being garlanded were debunked." },
    { title: "U.S. Vaccine Schedule Claims: Misleading Global Comparisons", slug: "us-vaccine-schedule-global-2025", category: "Health & Science", tagClass: "tag-green", catClass: "cat-factcheck", icon: "heart-pulse", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "misleading", excerpt: "MISLEADING: Claims that the U.S. vaccine schedule is uniquely large misrepresent global data." },
    { title: "USDA 'Transgender Study' Claim: Misrepresented Research", slug: "usda-transgender-study-2025", category: "U.S. Politics & Policy", tagClass: "tag-blue", catClass: "cat-factcheck", icon: "landmark", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "misleading", excerpt: "MISLEADING: Claims about a USDA 'transgender study' misrepresented research on feminine hygiene." },
    { title: "JD Vance / Elon Musk Fake Audio: AI-Generated Voice Manipulation", slug: "vance-musk-fake-audio-2025", category: "AI & Deepfakes", tagClass: "tag-red", catClass: "cat-factcheck", icon: "bot", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: Viral audio clips purportedly featuring JD Vance and Elon Musk were AI-generated fakes." },
    { title: "Yogi Adityanath Resignation Deepfake: AI-Generated Political Hoax", slug: "yogi-adityanath-deepfake-2025", category: "AI & Deepfakes", tagClass: "tag-red", catClass: "cat-factcheck", icon: "bot", date: "Jan 2, 2026", sources: "16 Sources", readTime: "8 min", verdict: "false", excerpt: "FALSE: A deepfake video falsely showing UP CM Yogi Adityanath resigning was exposed." }
];

// Add missing reports (only those not already present)
let addedCount = 0;
for (const report of missingReports) {
    if (!existingSlugs.has(report.slug)) {
        existingReports.push(report);
        existingSlugs.add(report.slug);
        addedCount++;
    }
}

console.log(`Added ${addedCount} missing reports`);
console.log(`Total reports now: ${existingReports.length}`);

// Parse dates for sorting
function parseDate(dateStr) {
    const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const match = dateStr.match(/(\w+)\s+(\d+),\s+(\d+)/);
    if (match) {
        return new Date(parseInt(match[3]), months[match[1]], parseInt(match[2]));
    }
    return new Date(0);
}

// Sort by date (newest first)
existingReports.sort((a, b) => parseDate(b.date) - parseDate(a.date));

// Renumber IDs sequentially
existingReports.forEach((report, idx) => {
    report.id = idx;
});

// Generate the new file content
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
        str += ',\n        chart: ' + JSON.stringify(report.chart, null, 12).split('\n').map((line, i) => i === 0 ? line : '        ' + line).join('\n');
    }

    str += '\n    }';
    return str;
}

const newContent = `// Shared reports data - Single source of truth for all pages
// When adding a new report, add it here and it will update everywhere

const REPORTS_DATA = [
${existingReports.map(formatReport).join(',\n')}
];

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = REPORTS_DATA;
}
`;

// Write the new file
fs.writeFileSync(reportsDataPath, newContent);
console.log(`\nUpdated ${reportsDataPath}`);
console.log(`Total reports: ${existingReports.length}`);

// Verify
const verifyContent = fs.readFileSync(reportsDataPath, 'utf8');
const idCount = (verifyContent.match(/id: \d+/g) || []).length;
console.log(`Verification: Found ${idCount} id entries`);
