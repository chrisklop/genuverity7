#!/usr/bin/env node
/**
 * GenuVerity Quality Scanner Tool
 *
 * Scans reports for journalistic/analytical quality concerns.
 * This is for "fact-checking the fact-checker" - evaluating whether our
 * verdicts are correct, evidence is strong, and reasoning is sound.
 *
 * Run: node tools/quality-scanner.js [--sample N] [--all]
 * Output: tools/quality-scan-results.json
 */

const fs = require('fs');
const path = require('path');

const LOCAL_REPORTS_DIR = path.join(__dirname, '..', 'localreports');
const REPORTS_DATA_PATH = path.join(__dirname, '..', 'js', 'reports-data.js');
const OUTPUT_PATH = path.join(__dirname, 'quality-scan-results.json');

// Quality concern patterns
const QUALITY_PATTERNS = {
    // Vague authority appeals - flag when experts/studies mentioned without specifics
    vagueAuthority: [
        /experts?\s+(say|agree|believe|claim|suggest|warn|recommend)/gi,
        /studies?\s+(show|suggest|indicate|reveal|prove|find)/gi,
        /scientists?\s+(say|agree|believe|warn)/gi,
        /researchers?\s+(say|found|believe|claim)/gi,
        /many\s+(people|believe|think|say|claim)/gi,
        /some\s+(experts?|scientists?|researchers?)\s+(say|believe|claim)/gi,
        /according\s+to\s+(some|many|several)\s+(experts?|sources?)/gi,
        /it\s+is\s+(widely|generally)\s+(believed|accepted|known)/gi,
        /consensus\s+(is|shows|indicates)/gi,
    ],

    // Truncated quotes - potential context stripping
    truncatedQuotes: [
        /["'][^"']*\.\.\.[^"']*["']/g,  // "...text..." or "text..."
        /["'][^"']*\[\.\.\.\][^"']*["']/g,  // "[...]" within quotes
    ],

    // Opinion sources used for factual claims
    opinionSources: [
        /opinion\s*[:,]/gi,
        /editorial\s*[:,]/gi,
        /commentary\s*[:,]/gi,
        /op-?ed/gi,
        /columnist/gi,
        /blog\s*post/gi,
    ],

    // Absolutist language that may oversimplify
    absolutistLanguage: [
        /\b(always|never)\s+(true|false|wrong|right|happens)/gi,
        /\b(completely|totally|entirely)\s+(false|debunked|wrong)/gi,
        /\b(no|zero)\s+(evidence|proof|basis)/gi,
        /\b(100%|100\s+percent)\s+(false|true|wrong)/gi,
        /\b(all|every)\s+(expert|scientist|study)/gi,
    ],

    // Missing nuance indicators
    missingNuance: [
        /simple|simply|obvious|obviously|clearly|easy|just/gi,
    ],

    // Circular reasoning patterns
    circularReasoning: [
        /because\s+it\s+(is|was)\s+false/gi,
        /proves?\s+that\s+it\s+(is|was)\s+(true|false)/gi,
        /which\s+(proves?|shows?)\s+(our|the)\s+(point|claim|verdict)/gi,
    ],

    // Source linking issues
    genericSourceLinks: [
        /href=["']https?:\/\/[^"']+["'][^>]*>\s*(?:source|link|here|click)\s*</gi,
    ],
};

// Opinion/editorial domains to flag when used for factual claims
const OPINION_DOMAINS = [
    'opinion.', 'blogs.', 'editorial.', 'commentary.',
    'substack.com', 'medium.com', 'wordpress.com'
];

// High-authority domains for context
const HIGH_AUTHORITY_DOMAINS = [
    '.gov', '.mil', '.edu', 'who.int', 'un.org', 'europa.eu',
    'reuters.com', 'apnews.com', 'pubmed.ncbi.nlm.nih.gov'
];

/**
 * Parse reports-data.js to get metadata
 */
function parseReportsData() {
    const content = fs.readFileSync(REPORTS_DATA_PATH, 'utf8');
    const match = content.match(/const REPORTS_DATA = \[([\s\S]*?)\];/);
    if (!match) throw new Error('Could not parse REPORTS_DATA');

    let reports;
    eval('reports = [' + match[1] + ']');
    return reports;
}

/**
 * Extract text content from HTML (removes tags)
 */
function extractTextContent(html) {
    // Remove script and style content
    let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    // Remove HTML tags but keep content
    text = text.replace(/<[^>]+>/g, ' ');
    // Decode common entities
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&amp;/g, '&');
    text = text.replace(/&lt;/g, '<');
    text = text.replace(/&gt;/g, '>');
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&#39;/g, "'");
    // Normalize whitespace
    text = text.replace(/\s+/g, ' ').trim();
    return text;
}

/**
 * Get line number for a match position in HTML
 */
function getLineNumber(html, position) {
    const before = html.substring(0, position);
    return (before.match(/\n/g) || []).length + 1;
}

/**
 * Extract URLs from HTML with their context
 */
function extractUrlsWithContext(html) {
    const urls = [];
    const hrefRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    while ((match = hrefRegex.exec(html)) !== null) {
        const url = match[1];
        const linkText = match[2].replace(/<[^>]+>/g, '').trim();
        if (url.startsWith('http')) {
            urls.push({ url, linkText, position: match.index });
        }
    }
    return urls;
}

/**
 * Scan for quality concerns in a report
 */
function scanReport(htmlPath, reportMeta) {
    const filename = path.basename(htmlPath);
    const slug = filename.replace('.html', '');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const textContent = extractTextContent(html);

    const concerns = [];

    // Scan for vague authority
    for (const pattern of QUALITY_PATTERNS.vagueAuthority) {
        let match;
        pattern.lastIndex = 0; // Reset regex
        while ((match = pattern.exec(textContent)) !== null) {
            // Get surrounding context (50 chars each side)
            const start = Math.max(0, match.index - 50);
            const end = Math.min(textContent.length, match.index + match[0].length + 50);
            const context = textContent.substring(start, end);

            // Try to find line in HTML
            const htmlMatch = html.indexOf(match[0]);
            const line = htmlMatch >= 0 ? getLineNumber(html, htmlMatch) : null;

            concerns.push({
                type: 'vague-authority',
                severity: 'medium',
                excerpt: match[0],
                context: '...' + context + '...',
                line,
                recommendation: 'Specify which experts/studies. Link to specific source.'
            });
        }
    }

    // Scan for truncated quotes
    for (const pattern of QUALITY_PATTERNS.truncatedQuotes) {
        let match;
        pattern.lastIndex = 0;
        while ((match = pattern.exec(textContent)) !== null) {
            const start = Math.max(0, match.index - 30);
            const end = Math.min(textContent.length, match.index + match[0].length + 30);
            const context = textContent.substring(start, end);

            const htmlMatch = html.indexOf(match[0]);
            const line = htmlMatch >= 0 ? getLineNumber(html, htmlMatch) : null;

            concerns.push({
                type: 'truncated-quote',
                severity: 'medium',
                excerpt: match[0],
                context: '...' + context + '...',
                line,
                recommendation: 'Verify full quote context. Consider showing more text.'
            });
        }
    }

    // Scan for absolutist language
    for (const pattern of QUALITY_PATTERNS.absolutistLanguage) {
        let match;
        pattern.lastIndex = 0;
        while ((match = pattern.exec(textContent)) !== null) {
            const start = Math.max(0, match.index - 40);
            const end = Math.min(textContent.length, match.index + match[0].length + 40);
            const context = textContent.substring(start, end);

            const htmlMatch = html.indexOf(match[0]);
            const line = htmlMatch >= 0 ? getLineNumber(html, htmlMatch) : null;

            concerns.push({
                type: 'absolutist-language',
                severity: 'low',
                excerpt: match[0],
                context: '...' + context + '...',
                line,
                recommendation: 'Consider if claim is truly absolute or if nuance needed.'
            });
        }
    }

    // Scan for opinion sources
    for (const pattern of QUALITY_PATTERNS.opinionSources) {
        let match;
        pattern.lastIndex = 0;
        while ((match = pattern.exec(textContent)) !== null) {
            const start = Math.max(0, match.index - 40);
            const end = Math.min(textContent.length, match.index + match[0].length + 40);
            const context = textContent.substring(start, end);

            const htmlMatch = html.indexOf(match[0]);
            const line = htmlMatch >= 0 ? getLineNumber(html, htmlMatch) : null;

            concerns.push({
                type: 'opinion-source',
                severity: 'medium',
                excerpt: match[0],
                context: '...' + context + '...',
                line,
                recommendation: 'Opinion pieces should not be sole source for factual claims.'
            });
        }
    }

    // Scan for circular reasoning
    for (const pattern of QUALITY_PATTERNS.circularReasoning) {
        let match;
        pattern.lastIndex = 0;
        while ((match = pattern.exec(textContent)) !== null) {
            const start = Math.max(0, match.index - 40);
            const end = Math.min(textContent.length, match.index + match[0].length + 40);
            const context = textContent.substring(start, end);

            const htmlMatch = html.indexOf(match[0]);
            const line = htmlMatch >= 0 ? getLineNumber(html, htmlMatch) : null;

            concerns.push({
                type: 'circular-reasoning',
                severity: 'high',
                excerpt: match[0],
                context: '...' + context + '...',
                line,
                recommendation: 'Avoid circular logic. Evidence should support verdict, not restate it.'
            });
        }
    }

    // Check URL quality
    const urls = extractUrlsWithContext(html);
    for (const { url, linkText, position } of urls) {
        const lowerUrl = url.toLowerCase();

        // Check for opinion domains
        for (const domain of OPINION_DOMAINS) {
            if (lowerUrl.includes(domain)) {
                concerns.push({
                    type: 'opinion-source-url',
                    severity: 'medium',
                    excerpt: url,
                    context: `Link text: "${linkText}"`,
                    line: getLineNumber(html, position),
                    recommendation: 'Blog/opinion source - verify factual claims have primary sources.'
                });
                break;
            }
        }

        // Check for generic link text
        const genericLinkTexts = ['source', 'link', 'here', 'click', 'read more'];
        if (genericLinkTexts.some(t => linkText.toLowerCase() === t)) {
            concerns.push({
                type: 'generic-link-text',
                severity: 'low',
                excerpt: `<a href="...">${linkText}</a>`,
                context: url.substring(0, 50) + '...',
                line: getLineNumber(html, position),
                recommendation: 'Use descriptive link text for accessibility and credibility.'
            });
        }
    }

    // Check verdict-evidence alignment (using metadata)
    if (reportMeta) {
        const verdict = reportMeta.verdict || 'undefined';

        // Flag undefined verdicts
        if (verdict === 'undefined') {
            concerns.push({
                type: 'undefined-verdict',
                severity: 'high',
                excerpt: 'verdict: undefined',
                context: `Report "${slug}" has no verdict assigned`,
                line: null,
                recommendation: 'Every report must have a clear verdict: true, false, misleading, mixed, or context.'
            });
        }

        // Check for strong verdicts with few sources
        const sourceCount = (html.match(/id="source-\d+"/g) || []).length;
        if ((verdict === 'false' || verdict === 'true') && sourceCount < 6) {
            concerns.push({
                type: 'thin-evidence',
                severity: 'medium',
                excerpt: `verdict: ${verdict}, sources: ${sourceCount}`,
                context: `Strong "${verdict}" verdict with only ${sourceCount} sources`,
                line: null,
                recommendation: 'Definitive verdicts should have robust evidence (6+ sources).'
            });
        }
    }

    // Check for counter-argument handling
    const counterArgumentPatterns = [
        /however/gi, /on the other hand/gi, /critics argue/gi,
        /some claim/gi, /opponents say/gi, /counter.*argument/gi,
        /alternative.*view/gi, /different.*perspective/gi
    ];

    let hasCounterArgument = false;
    for (const pattern of counterArgumentPatterns) {
        if (pattern.test(textContent)) {
            hasCounterArgument = true;
            break;
        }
    }

    // Only flag missing counter-argument for false/misleading verdicts
    if (reportMeta && !hasCounterArgument) {
        const verdict = reportMeta.verdict || '';
        if (verdict === 'false' || verdict === 'misleading') {
            concerns.push({
                type: 'missing-counter-argument',
                severity: 'low',
                excerpt: 'No counter-argument detected',
                context: `Report with "${verdict}" verdict doesn't appear to address opposing viewpoint`,
                line: null,
                recommendation: 'Consider addressing why people believe the false claim.'
            });
        }
    }

    // Deduplicate similar concerns
    const dedupedConcerns = deduplicateConcerns(concerns);

    return {
        slug,
        filename,
        verdict: reportMeta?.verdict || 'unknown',
        category: reportMeta?.category || 'unknown',
        sourceCount: (html.match(/id="source-\d+"/g) || []).length,
        concernCount: dedupedConcerns.length,
        concerns: dedupedConcerns
    };
}

/**
 * Remove duplicate/similar concerns
 */
function deduplicateConcerns(concerns) {
    const seen = new Set();
    return concerns.filter(c => {
        const key = `${c.type}:${c.excerpt}:${c.line}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

/**
 * Select stratified sample of reports
 */
function selectSample(reports, sampleSize) {
    // Group by verdict
    const byVerdict = {};
    for (const r of reports) {
        const v = r.verdict || 'undefined';
        if (!byVerdict[v]) byVerdict[v] = [];
        byVerdict[v].push(r);
    }

    // Calculate how many from each verdict type
    const verdictTypes = Object.keys(byVerdict);
    const perVerdict = Math.ceil(sampleSize / verdictTypes.length);

    const sample = [];

    // Take from each verdict type
    for (const verdict of verdictTypes) {
        const available = byVerdict[verdict];
        // Shuffle
        const shuffled = available.sort(() => Math.random() - 0.5);
        // Take up to perVerdict
        sample.push(...shuffled.slice(0, perVerdict));
    }

    // If we have too many, randomly remove some
    while (sample.length > sampleSize) {
        const idx = Math.floor(Math.random() * sample.length);
        sample.splice(idx, 1);
    }

    return sample;
}

/**
 * Aggregate concerns into patterns
 */
function aggregatePatterns(results) {
    const patterns = {};

    for (const report of results) {
        for (const concern of report.concerns) {
            if (!patterns[concern.type]) {
                patterns[concern.type] = {
                    count: 0,
                    reports: [],
                    severity: concern.severity
                };
            }
            patterns[concern.type].count++;
            if (!patterns[concern.type].reports.includes(report.slug)) {
                patterns[concern.type].reports.push(report.slug);
            }
        }
    }

    return patterns;
}

/**
 * Main scan function
 */
function runScan(options = {}) {
    const { sampleSize = 28, scanAll = false } = options;

    console.log('GenuVerity Quality Scanner v1.0.0');
    console.log('='.repeat(50));
    console.log('Focus: Journalistic/analytical quality concerns');
    console.log('='.repeat(50) + '\n');

    // Load reports metadata
    const reportsData = parseReportsData();
    console.log(`Loaded ${reportsData.length} reports from reports-data.js`);

    // Get HTML files
    const htmlFiles = fs.readdirSync(LOCAL_REPORTS_DIR)
        .filter(f => f.endsWith('.html'));
    console.log(`Found ${htmlFiles.length} HTML files in localreports/\n`);

    // Create slug -> metadata map
    const metaMap = {};
    for (const r of reportsData) {
        metaMap[r.slug] = r;
    }

    // Select reports to scan
    let toScan;
    if (scanAll) {
        toScan = reportsData;
        console.log(`Scanning ALL ${toScan.length} reports...\n`);
    } else {
        toScan = selectSample(reportsData, sampleSize);
        console.log(`Selected ${toScan.length} reports (stratified sample):`);

        // Show verdict distribution in sample
        const verdictDist = {};
        for (const r of toScan) {
            const v = r.verdict || 'undefined';
            verdictDist[v] = (verdictDist[v] || 0) + 1;
        }
        for (const [v, count] of Object.entries(verdictDist)) {
            console.log(`  ${v}: ${count}`);
        }
        console.log();
    }

    // Scan selected reports
    const results = [];
    let totalConcerns = 0;

    for (const report of toScan) {
        const htmlPath = path.join(LOCAL_REPORTS_DIR, report.slug + '.html');

        if (!fs.existsSync(htmlPath)) {
            console.log(`  [SKIP] ${report.slug} - HTML file not found`);
            continue;
        }

        const result = scanReport(htmlPath, report);
        results.push(result);
        totalConcerns += result.concernCount;

        const icon = result.concernCount > 5 ? '!' : result.concernCount > 0 ? '~' : '+';
        console.log(`  [${icon}] ${report.slug}: ${result.concernCount} concerns`);
    }

    // Aggregate patterns
    const patterns = aggregatePatterns(results);

    // Build output
    const output = {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        scanType: scanAll ? 'full' : 'sample',
        reportsScanned: results.length,
        totalConcerns,
        avgConcernsPerReport: (totalConcerns / results.length).toFixed(1),
        patterns: Object.entries(patterns)
            .sort((a, b) => b[1].count - a[1].count)
            .map(([type, data]) => ({
                type,
                count: data.count,
                reportCount: data.reports.length,
                severity: data.severity,
                affectedReports: data.reports.slice(0, 5) // First 5 for brevity
            })),
        reports: results.map(r => ({
            slug: r.slug,
            verdict: r.verdict,
            category: r.category,
            sourceCount: r.sourceCount,
            concernCount: r.concernCount,
            concerns: r.concerns
        })),
        summary: {
            highSeverity: results.reduce((sum, r) =>
                sum + r.concerns.filter(c => c.severity === 'high').length, 0),
            mediumSeverity: results.reduce((sum, r) =>
                sum + r.concerns.filter(c => c.severity === 'medium').length, 0),
            lowSeverity: results.reduce((sum, r) =>
                sum + r.concerns.filter(c => c.severity === 'low').length, 0)
        }
    };

    // Write output
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('SCAN SUMMARY');
    console.log('='.repeat(50));
    console.log(`Reports Scanned: ${output.reportsScanned}`);
    console.log(`Total Concerns: ${output.totalConcerns}`);
    console.log(`Avg per Report: ${output.avgConcernsPerReport}`);
    console.log(`\nBy Severity:`);
    console.log(`  HIGH:   ${output.summary.highSeverity}`);
    console.log(`  MEDIUM: ${output.summary.mediumSeverity}`);
    console.log(`  LOW:    ${output.summary.lowSeverity}`);
    console.log(`\nTop Patterns:`);
    for (const p of output.patterns.slice(0, 5)) {
        console.log(`  ${p.type}: ${p.count} (in ${p.reportCount} reports)`);
    }
    console.log('\n' + '='.repeat(50));
    console.log(`Output written to: ${OUTPUT_PATH}`);
    console.log('='.repeat(50) + '\n');

    return output;
}

// Parse CLI args
const args = process.argv.slice(2);
let sampleSize = 28;
let scanAll = false;

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--sample' && args[i + 1]) {
        sampleSize = parseInt(args[i + 1]);
        i++;
    } else if (args[i] === '--all') {
        scanAll = true;
    }
}

// Run
runScan({ sampleSize, scanAll });
