#!/usr/bin/env node
/**
 * GenuVerity Self-Audit Tool
 *
 * Scans all reports and generates comprehensive metrics for transparency.
 * Run: node tools/audit-reports.js
 * Output: js/audit-data.json
 */

const fs = require('fs');
const path = require('path');

const LOCAL_REPORTS_DIR = path.join(__dirname, '..', 'localreports');
const REPORTS_DATA_PATH = path.join(__dirname, '..', 'js', 'reports-data.js');
const OUTPUT_PATH = path.join(__dirname, '..', 'js', 'audit-data.json');

// Domain classifications
const GOVERNMENT_DOMAINS = ['.gov', '.gov.uk', '.gov.au', '.gc.ca', '.europa.eu', '.mil'];
const ACADEMIC_DOMAINS = ['.edu', '.ac.uk', '.edu.au', 'scholar.google', 'pubmed', 'arxiv.org', 'jstor.org', 'doi.org', 'ncbi.nlm.nih.gov'];
const MAJOR_NEWS_DOMAINS = [
    'reuters.com', 'apnews.com', 'bbc.com', 'bbc.co.uk', 'nytimes.com', 'washingtonpost.com',
    'theguardian.com', 'cnn.com', 'npr.org', 'pbs.org', 'cbsnews.com', 'nbcnews.com',
    'abcnews.go.com', 'politico.com', 'thehill.com', 'axios.com', 'propublica.org',
    'snopes.com', 'factcheck.org', 'politifact.com', 'usatoday.com', 'wsj.com',
    'bloomberg.com', 'forbes.com', 'time.com', 'newsweek.com', 'theatlantic.com',
    'vox.com', 'fivethirtyeight.com', 'economist.com', 'ft.com', 'aljazeera.com',
    'dw.com', 'france24.com', 'scmp.com', 'kyivindependent.com', 'meduza.io'
];
const WIKIPEDIA_PATTERNS = ['wikipedia.org', 'wiki'];
const FORBIDDEN_COLORS = ['#8b5cf6', '#a855f7', '#9333ea', '#7c3aed']; // Purple shades

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
 * Extract all href URLs from HTML content
 */
function extractUrls(htmlContent) {
    const urls = [];
    const hrefRegex = /href=["']([^"']+)["']/gi;
    let match;
    while ((match = hrefRegex.exec(htmlContent)) !== null) {
        const url = match[1];
        if (url.startsWith('http')) {
            urls.push(url);
        }
    }
    return urls;
}

/**
 * Classify a URL by domain type
 */
function classifyUrl(url) {
    const lowerUrl = url.toLowerCase();

    // Check for Wikipedia (violation)
    for (const pattern of WIKIPEDIA_PATTERNS) {
        if (lowerUrl.includes(pattern)) {
            return 'wikipedia';
        }
    }

    // Check government
    for (const domain of GOVERNMENT_DOMAINS) {
        if (lowerUrl.includes(domain)) {
            return 'government';
        }
    }

    // Check academic
    for (const domain of ACADEMIC_DOMAINS) {
        if (lowerUrl.includes(domain)) {
            return 'academic';
        }
    }

    // Check major news
    for (const domain of MAJOR_NEWS_DOMAINS) {
        if (lowerUrl.includes(domain)) {
            return 'news';
        }
    }

    return 'other';
}

/**
 * Extract source count from HTML (sources sidebar)
 */
function countSources(htmlContent) {
    const sourceMatches = htmlContent.match(/id="source-\d+"/g);
    return sourceMatches ? sourceMatches.length : 0;
}

/**
 * Check for Chart.js presence
 */
function hasChart(htmlContent) {
    return htmlContent.includes('new Chart(') || htmlContent.includes('Chart.js');
}

/**
 * Check for forbidden colors
 */
function findColorViolations(htmlContent, filename) {
    const violations = [];
    for (const color of FORBIDDEN_COLORS) {
        if (htmlContent.toLowerCase().includes(color.toLowerCase())) {
            violations.push({ file: filename, color });
        }
    }
    return violations;
}

/**
 * Find Wikipedia violations
 */
function findWikiViolations(urls, filename) {
    const violations = [];
    for (const url of urls) {
        if (url.toLowerCase().includes('wikipedia.org')) {
            violations.push({ file: filename, url });
        }
    }
    return violations;
}

/**
 * Check for inline citations (highlightSource calls)
 */
function countInlineCitations(htmlContent) {
    const matches = htmlContent.match(/highlightSource\(\d+\)/g);
    return matches ? matches.length : 0;
}

/**
 * Count copyable sections
 */
function countCopySections(htmlContent) {
    const matches = htmlContent.match(/class="copyable-section"/g);
    return matches ? matches.length : 0;
}

/**
 * Extract read time from HTML
 */
function extractReadTime(htmlContent) {
    const match = htmlContent.match(/(\d+)\s*MIN\s*READ/i);
    return match ? parseInt(match[1]) : null;
}

/**
 * Calculate Shannon entropy for balance score (0-1)
 */
function calculateBalanceScore(distribution) {
    const values = Object.values(distribution).filter(v => v > 0);
    const total = values.reduce((a, b) => a + b, 0);
    if (total === 0 || values.length <= 1) return 1;

    const proportions = values.map(v => v / total);
    const entropy = -proportions.reduce((sum, p) => sum + p * Math.log2(p), 0);
    const maxEntropy = Math.log2(values.length);

    return entropy / maxEntropy;
}

/**
 * Calculate publication frequency (reports per week)
 */
function calculatePublicationFrequency(reports) {
    const dates = reports
        .map(r => {
            const match = r.date.match(/(\w+)\s+(\d+),\s+(\d+)/);
            if (match) {
                return new Date(`${match[1]} ${match[2]}, ${match[3]}`);
            }
            return null;
        })
        .filter(d => d && !isNaN(d.getTime()))
        .sort((a, b) => a - b);

    if (dates.length < 2) return 0;

    const firstDate = dates[0];
    const lastDate = dates[dates.length - 1];
    const weeks = (lastDate - firstDate) / (7 * 24 * 60 * 60 * 1000);

    return weeks > 0 ? (reports.length / weeks).toFixed(1) : 0;
}

/**
 * Main audit function
 */
function runAudit() {
    console.log('GenuVerity Self-Audit Tool v1.0.0');
    console.log('='.repeat(50) + '\n');

    // Load reports metadata
    const reportsData = parseReportsData();
    console.log(`Loaded ${reportsData.length} reports from reports-data.js`);

    // Get HTML files
    const htmlFiles = fs.readdirSync(LOCAL_REPORTS_DIR)
        .filter(f => f.endsWith('.html'))
        .map(f => path.join(LOCAL_REPORTS_DIR, f));
    console.log(`Found ${htmlFiles.length} HTML files in localreports/\n`);

    // Initialize metrics
    const metrics = {
        sources: {
            total: 0,
            avgPerReport: 0,
            byType: {
                government: 0,
                academic: 0,
                news: 0,
                expert: 0,
                other: 0
            },
            reportsBelow8: []
        },
        verdicts: {
            counts: {},
            percentages: {}
        },
        categories: {
            distribution: {},
            balanceScore: 0
        },
        technical: {
            chartsPresent: 0,
            chartsMissing: [],
            colorViolations: [],
            wikiViolations: [],
            avgInlineCitations: 0,
            avgCopySections: 0
        },
        transparency: {
            avgReadTime: 0,
            publicationFrequency: 0,
            reportsInData: reportsData.length,
            htmlFilesFound: htmlFiles.length
        }
    };

    // Aggregate stats
    let totalSources = 0;
    let totalCitations = 0;
    let totalCopySections = 0;
    let totalReadTime = 0;
    let readTimeCount = 0;

    // Process each HTML file
    console.log('Scanning reports...\n');
    for (const htmlPath of htmlFiles) {
        const filename = path.basename(htmlPath);
        const slug = filename.replace('.html', '');
        const content = fs.readFileSync(htmlPath, 'utf8');

        // Count sources
        const sourceCount = countSources(content);
        totalSources += sourceCount;
        if (sourceCount < 8 && sourceCount > 0) {
            metrics.sources.reportsBelow8.push({ slug, count: sourceCount });
        }

        // Extract and classify URLs
        const urls = extractUrls(content);
        for (const url of urls) {
            const type = classifyUrl(url);
            if (type === 'wikipedia') {
                // Don't count wiki as source type, it's a violation
            } else if (metrics.sources.byType[type] !== undefined) {
                metrics.sources.byType[type]++;
            }
        }

        // Check for charts
        if (hasChart(content)) {
            metrics.technical.chartsPresent++;
        } else if (sourceCount > 0) {
            // Only flag missing charts for real reports (with sources)
            metrics.technical.chartsMissing.push(slug);
        }

        // Check color violations
        const colorViolations = findColorViolations(content, slug);
        metrics.technical.colorViolations.push(...colorViolations);

        // Check wiki violations
        const wikiViolations = findWikiViolations(urls, slug);
        metrics.technical.wikiViolations.push(...wikiViolations);

        // Count inline citations
        const citations = countInlineCitations(content);
        totalCitations += citations;

        // Count copyable sections
        const copySections = countCopySections(content);
        totalCopySections += copySections;

        // Extract read time
        const readTime = extractReadTime(content);
        if (readTime) {
            totalReadTime += readTime;
            readTimeCount++;
        }
    }

    // Calculate source metrics
    metrics.sources.total = totalSources;
    metrics.sources.avgPerReport = (totalSources / htmlFiles.length).toFixed(1);

    // Verdict distribution from reports-data
    for (const report of reportsData) {
        const verdict = report.verdict || 'undefined';
        metrics.verdicts.counts[verdict] = (metrics.verdicts.counts[verdict] || 0) + 1;
    }

    // Calculate verdict percentages
    for (const [verdict, count] of Object.entries(metrics.verdicts.counts)) {
        metrics.verdicts.percentages[verdict] = ((count / reportsData.length) * 100).toFixed(1);
    }

    // Category distribution from reports-data
    for (const report of reportsData) {
        const category = report.category || 'Uncategorized';
        metrics.categories.distribution[category] = (metrics.categories.distribution[category] || 0) + 1;
    }
    metrics.categories.balanceScore = calculateBalanceScore(metrics.categories.distribution);

    // Technical metrics
    metrics.technical.avgInlineCitations = (totalCitations / htmlFiles.length).toFixed(1);
    metrics.technical.avgCopySections = (totalCopySections / htmlFiles.length).toFixed(1);

    // Transparency metrics
    metrics.transparency.avgReadTime = readTimeCount > 0
        ? (totalReadTime / readTimeCount).toFixed(1) + ' min'
        : 'N/A';
    metrics.transparency.publicationFrequency = calculatePublicationFrequency(reportsData) + '/week';

    // Calculate scores (0-100)
    const scores = {
        sources: calculateSourceScore(metrics),
        methodology: calculateMethodologyScore(metrics),
        technical: calculateTechnicalScore(metrics),
        transparency: calculateTransparencyScore(metrics),
        overall: 0
    };
    scores.overall = (
        scores.sources * 0.35 +
        scores.methodology * 0.25 +
        scores.technical * 0.25 +
        scores.transparency * 0.15
    ).toFixed(1);

    // Compile issues list
    const issues = [];

    // Wiki violations
    for (const v of metrics.technical.wikiViolations) {
        issues.push({
            type: 'wikipedia',
            severity: 'warning',
            report: v.file,
            detail: `Wikipedia link found: ${v.url}`
        });
    }

    // Color violations
    for (const v of metrics.technical.colorViolations) {
        issues.push({
            type: 'color',
            severity: 'error',
            report: v.file,
            detail: `Forbidden purple color: ${v.color}`
        });
    }

    // Low source count
    for (const r of metrics.sources.reportsBelow8) {
        issues.push({
            type: 'sources',
            severity: 'warning',
            report: r.slug,
            detail: `Only ${r.count} sources (minimum: 8)`
        });
    }

    // Build final output
    const auditData = {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        reportCount: reportsData.length,
        htmlFileCount: htmlFiles.length,
        metrics,
        issues: issues.sort((a, b) => {
            const severityOrder = { error: 0, warning: 1, info: 2 };
            return severityOrder[a.severity] - severityOrder[b.severity];
        }),
        scores: {
            sources: parseFloat(scores.sources),
            methodology: parseFloat(scores.methodology),
            technical: parseFloat(scores.technical),
            transparency: parseFloat(scores.transparency),
            overall: parseFloat(scores.overall)
        }
    };

    // Write output
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(auditData, null, 2));

    // Print summary
    printSummary(auditData);

    return auditData;
}

/**
 * Calculate source quality score
 */
function calculateSourceScore(metrics) {
    let score = 100;

    // Penalize for low average sources
    const avgSources = parseFloat(metrics.sources.avgPerReport);
    if (avgSources < 8) {
        score -= (8 - avgSources) * 5;
    } else if (avgSources >= 10) {
        // Bonus for exceeding minimum
        score += Math.min(5, (avgSources - 8) * 1);
    }

    // Wiki violations: Mild penalty (capped at 15 points total)
    const wikiPenalty = Math.min(15, metrics.technical.wikiViolations.length * 1);
    score -= wikiPenalty;

    // Reward for high-quality sources (gov + academic ratio)
    const totalClassified = Object.values(metrics.sources.byType).reduce((a, b) => a + b, 0);
    if (totalClassified > 0) {
        const highQualityRatio = (metrics.sources.byType.government + metrics.sources.byType.academic) / totalClassified;
        score += highQualityRatio * 15;
    }

    // Penalize for too many reports below 8 sources
    const lowSourcePenalty = Math.min(10, metrics.sources.reportsBelow8.length * 1.5);
    score -= lowSourcePenalty;

    return Math.max(0, Math.min(100, score)).toFixed(1);
}

/**
 * Calculate methodology adherence score
 */
function calculateMethodologyScore(metrics) {
    let score = 100;

    // Penalize for reports below 8 sources
    score -= metrics.sources.reportsBelow8.length * 2;

    // Check category balance (too uneven is bad)
    if (metrics.categories.balanceScore < 0.6) {
        score -= (0.6 - metrics.categories.balanceScore) * 20;
    }

    // Check verdict distribution (all one type is suspicious)
    const verdictCounts = Object.values(metrics.verdicts.counts);
    if (verdictCounts.length > 0) {
        const maxVerdict = Math.max(...verdictCounts);
        const totalVerdicts = verdictCounts.reduce((a, b) => a + b, 0);
        const dominance = maxVerdict / totalVerdicts;
        if (dominance > 0.5) {
            score -= (dominance - 0.5) * 20;
        }
    }

    return Math.max(0, Math.min(100, score)).toFixed(1);
}

/**
 * Calculate technical compliance score
 */
function calculateTechnicalScore(metrics) {
    let score = 100;

    // Penalize color violations (5 points each, capped at 20)
    const colorPenalty = Math.min(20, metrics.technical.colorViolations.length * 5);
    score -= colorPenalty;

    // Charts are optional but valuable - reward having them
    const totalReports = metrics.technical.chartsPresent + metrics.technical.chartsMissing.length;
    if (totalReports > 0) {
        const chartRatio = metrics.technical.chartsPresent / totalReports;
        if (chartRatio >= 0.9) {
            score += 5; // Bonus for excellent chart coverage
        } else if (chartRatio < 0.5) {
            score -= (0.5 - chartRatio) * 20;
        }
    }

    // Wiki violations affect technical compliance too (capped)
    const wikiTechPenalty = Math.min(10, metrics.technical.wikiViolations.length * 0.5);
    score -= wikiTechPenalty;

    return Math.max(0, Math.min(100, score)).toFixed(1);
}

/**
 * Calculate transparency score
 */
function calculateTransparencyScore(metrics) {
    let score = 100;

    // Check data consistency (reports-data.js vs HTML files)
    const diff = Math.abs(metrics.transparency.reportsInData - metrics.transparency.htmlFilesFound);
    if (diff > 5) {
        score -= diff * 2;
    }

    return Math.max(0, Math.min(100, score)).toFixed(1);
}

/**
 * Print summary to console
 */
function printSummary(auditData) {
    console.log('\n' + '='.repeat(50));
    console.log('AUDIT SUMMARY');
    console.log('='.repeat(50) + '\n');

    console.log(`Reports Analyzed: ${auditData.reportCount}`);
    console.log(`HTML Files Found: ${auditData.htmlFileCount}`);
    console.log(`Total Sources: ${auditData.metrics.sources.total}`);
    console.log(`Avg Sources/Report: ${auditData.metrics.sources.avgPerReport}\n`);

    console.log('SOURCE DISTRIBUTION:');
    for (const [type, count] of Object.entries(auditData.metrics.sources.byType)) {
        console.log(`  ${type}: ${count}`);
    }

    console.log('\nVERDICT DISTRIBUTION:');
    for (const [verdict, count] of Object.entries(auditData.metrics.verdicts.counts)) {
        const pct = auditData.metrics.verdicts.percentages[verdict];
        console.log(`  ${verdict}: ${count} (${pct}%)`);
    }

    console.log('\nCATEGORY COVERAGE:');
    const sortedCategories = Object.entries(auditData.metrics.categories.distribution)
        .sort((a, b) => b[1] - a[1]);
    for (const [category, count] of sortedCategories) {
        console.log(`  ${category}: ${count}`);
    }
    console.log(`  Balance Score: ${(auditData.metrics.categories.balanceScore * 100).toFixed(0)}%`);

    console.log('\nTECHNICAL METRICS:');
    console.log(`  Charts Present: ${auditData.metrics.technical.chartsPresent}`);
    console.log(`  Charts Missing: ${auditData.metrics.technical.chartsMissing.length}`);
    console.log(`  Color Violations: ${auditData.metrics.technical.colorViolations.length}`);
    console.log(`  Wiki Violations: ${auditData.metrics.technical.wikiViolations.length}`);
    console.log(`  Avg Inline Citations: ${auditData.metrics.technical.avgInlineCitations}`);

    console.log('\nISSUES FOUND:');
    if (auditData.issues.length === 0) {
        console.log('  No issues found!');
    } else {
        const errors = auditData.issues.filter(i => i.severity === 'error');
        const warnings = auditData.issues.filter(i => i.severity === 'warning');
        console.log(`  Errors: ${errors.length}`);
        console.log(`  Warnings: ${warnings.length}`);

        // Show first 5 issues
        const toShow = auditData.issues.slice(0, 5);
        for (const issue of toShow) {
            const icon = issue.severity === 'error' ? 'X' : '!';
            console.log(`  [${icon}] ${issue.report}: ${issue.detail}`);
        }
        if (auditData.issues.length > 5) {
            console.log(`  ... and ${auditData.issues.length - 5} more`);
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log('SCORES');
    console.log('='.repeat(50));
    console.log(`  Source Quality:    ${auditData.scores.sources}`);
    console.log(`  Methodology:       ${auditData.scores.methodology}`);
    console.log(`  Technical:         ${auditData.scores.technical}`);
    console.log(`  Transparency:      ${auditData.scores.transparency}`);
    console.log(`  ─────────────────────────`);
    console.log(`  OVERALL SCORE:     ${auditData.scores.overall}`);
    console.log('='.repeat(50) + '\n');

    console.log(`Output written to: ${OUTPUT_PATH}`);
}

// Run the audit
runAudit();
