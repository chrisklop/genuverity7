# Report Generation Guide

Complete guide for creating GenuVerity fact-check reports.

---

## Workflow Overview

```
1. git checkout -b report/slug-name           # Feature branch
2. cp docs/report-template-2025.html localreports/slug.html
3. Research → 8+ verified sources
4. Fill template → citations, charts, verdict
5. ./validate-report.sh
6. Update js/reports-data.js (ID 0, increment others)
7. node tools/generate-sitemaps.js
8. git add + commit + push origin report/slug-name
9. npm run test:preview <vercel-preview-url>  # TEST REQUIRED
10. Merge to main (after tests pass)
```

---

## Phase 1: Pre-Generation

```
□ Read docs/templates.md AND docs/template.md
□ Read a reference report (e.g., localreports/fednow-freeze.html)
□ WebSearch the topic
□ WebFetch 8-12 sources, verify accessible
□ Create source list with trust scores
```

**STOP if:**
- Fewer than 8 verified sources
- No primary (.gov, official) sources available
- Topic already exists in js/reports-data.js

---

## Phase 2: Content Requirements

| Element | Requirement |
|---------|-------------|
| **Canonical URL** | `<link rel="canonical" href="https://www.genuverity.com/SLUG">` **(CRITICAL)** |
| **og:url** | `<meta property="og:url" content="https://www.genuverity.com/SLUG">` |
| **Sources Sidebar** | Left column, sticky, `<aside class="sources-sidebar">` |
| **Trust Scores** | 0-100 per source |
| **Inline Citations** | Linked text throughout body |
| **Bold** | Verdicts, key findings, names, numbers |
| **Italic** | Claims being analyzed, quotes |
| **Chart.js** | With watermark plugin |
| **Chart Layout** | Magazine-style `<figure class="float-figure">` |
| **Reading Progress** | In nav header |
| **Verdict Section** | Color-coded, **MUST have verdict assigned** |

### Mandatory Verdict Assignment

Every report MUST have a verdict in both the HTML and `reports-data.js`:

| Verdict | When to Use |
|---------|-------------|
| `false` | Claim is demonstrably false |
| `true` | Claim is verified as accurate |
| `misleading` | Technically true but presented deceptively |
| `mixed` | Multiple claims, some true, some false |
| `context` | Claim lacks crucial context that changes meaning |

**NEVER leave verdict as `undefined`** - if content is pure analysis without a verdict, classify it as an "Analysis" or "Investigation" category, not "Fact Check".

---

## Phase 3: Text Formatting Rules

### Bold (`<strong>`)
- Verdict labels: **FALSE**, **TRUE**, **MIXED**
- Key findings: **no evidence exists**
- Important names: **Colonel Ruby Bradley**
- Critical numbers: **$2.7 trillion**

### Italic (`<em>`)
- Claims being fact-checked: *"The government is spraying chemicals"*
- Study titles: *Environmental Science & Technology*
- Technical terms on first use

### Inline Citations
Every factual claim needs a link in the same sentence:
```html
According to <a href="https://bls.gov/..." target="_blank" rel="noopener">BLS data</a>,
inflation rose <strong>2.7%</strong> in November.
```

### Specific Expert Citations (NO VAGUE AUTHORITY)

**NEVER use vague authority appeals.** Always name the specific source.

| BAD (Vague) | GOOD (Specific) |
|-------------|-----------------|
| "Experts say..." | "Dr. Sarah Chen at MIT stated..." |
| "Studies show..." | "A 2024 Stanford study by Dr. James Liu found..." |
| "Researchers found..." | "According to research published in Nature by..." |
| "Scientists agree..." | "The American Medical Association confirms..." |

When citing research:
- Name the institution or journal
- Link to the specific study/paper
- If quoting a person, include their credentials

### Counter-Argument Requirement (FALSE/MISLEADING Reports)

For reports with `false` or `misleading` verdicts, include a section explaining **why** the false claim gained traction. This:
- Builds reader understanding
- Avoids appearing dismissive
- Provides psychological/social context

**Required section:** "Why This Claim Spread" or similar, addressing:
- What makes the claim believable?
- What emotional/political factors drive its spread?
- What legitimate concerns might underlie the false claim?

Example:
```html
<h3>Why This Claim Spread</h3>
<p>This misinformation gained traction because it tapped into legitimate concerns
about [X]. The claim's visual format made it highly shareable, and it confirmed
pre-existing beliefs about [Y]...</p>
```

---

## Phase 4: HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --bg-primary: #0a0a0f;
            --bg-card: #12121a;
            --text-primary: #e4e4e7;
            --accent-blue: #3b82f6;
            --accent-cyan: #06b6d4;
            --accent-green: #10b981;
            --accent-amber: #f59e0b;
            --accent-red: #ef4444;
        }
    </style>
</head>
<body>
    <nav class="nav-header">
        <div class="reading-progress"></div>
    </nav>

    <main class="container">
        <div class="content-grid">
            <aside class="sources-sidebar">...</aside>
            <article class="article-content">...</article>
        </div>
    </main>

    <script>
        // Reading Progress Bar
        const progressBar = document.querySelector('.reading-progress');
        window.addEventListener('scroll', () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = Math.min((scrollY / docHeight) * 100, 100) + '%';
        });

        // Chart.js Watermark (REQUIRED)
        const genuVerityWatermark = {
            id: 'genuVerityWatermark',
            afterDraw: (chart) => {
                const ctx = chart.ctx;
                const { width } = chart;
                ctx.save();
                ctx.textAlign = 'right';
                ctx.font = 'bold 10px Inter, sans-serif';
                const verityWidth = ctx.measureText('Verity').width;
                ctx.fillStyle = '#ffffff';
                ctx.fillText('Genu', width - 8 - verityWidth, 8);
                ctx.fillStyle = '#3b82f6';
                ctx.fillText('Verity', width - 8, 8);
                ctx.restore();
            }
        };
        Chart.register(genuVerityWatermark);
    </script>
</body>
</html>
```

---

## Phase 5: SEO Requirements (CRITICAL)

**Without these, Google won't index the page properly.**

### Required Meta Tags

```html
<!-- In <head>, BEFORE og:url -->
<link rel="canonical" href="https://www.genuverity.com/SLUG">

<!-- Open Graph -->
<meta property="og:url" content="https://www.genuverity.com/SLUG">
<meta property="twitter:url" content="https://www.genuverity.com/SLUG">
```

### URL Rules

| Element | Format | Example |
|---------|--------|---------|
| **Canonical** | Clean URL only | `https://www.genuverity.com/fednow-freeze` |
| **og:url** | Clean URL only | `https://www.genuverity.com/fednow-freeze` |
| **File path** | localreports/ | `localreports/fednow-freeze.html` |

**NEVER use file paths in canonical or og:url:**
- ❌ `https://www.genuverity.com/localreports/fednow-freeze.html`
- ❌ `https://www.genuverity.com/fednow-freeze.html`
- ✅ `https://www.genuverity.com/fednow-freeze`

### Why This Matters

Without canonical tags, Google sees two URLs for the same content:
1. `/slug-name` (clean URL via Vercel rewrite)
2. `/localreports/slug-name.html` (actual file)

This causes:
- "Duplicate without user-selected canonical" errors
- "Discovered - currently not indexed" status
- Poor or no search visibility

---

## Phase 6: Post-Generation Checklist

```
□ Canonical URL present and uses clean URL format
□ og:url and twitter:url match canonical
□ Sources Banner functional (toggle works)
□ At least 8 sources with trust scores
□ Reading progress bar + JS
□ Chart.js watermark registered
□ Every factual claim has citation link
□ Bold for verdicts, findings, names
□ Italic for claims, quotes
□ No purple colors (#8b5cf6)
□ All URLs verified accessible
□ Verdict badge matches conclusion
□ Run ./validate-report.sh (checks canonical)
```

---

## Phase 7: Integration

```
□ Add to js/reports-data.js (ID 0, increment others)
□ Extract chart data from FIRST chart in report
□ Run: node tools/generate-sitemaps.js
□ git add localreports/*.html js/reports-data.js sitemap.xml sitemap-news.xml vercel.json
□ git commit -m "Add report: slug-name"
□ git push origin report/slug-name (NOT main)
□ NEVER run vercel --prod (Reports Instance)
```

---

## Phase 8: Testing Before Merge (REQUIRED)

```
□ Wait for Vercel preview deployment (~30 seconds)
□ Get preview URL from GitHub PR or Vercel dashboard
   Format: https://genuverity7-git-report-slug-name-xxx.vercel.app
□ Run test suite:
   npm run test:preview https://genuverity7-git-report-slug-name-xxx.vercel.app
□ Verify all 8 tests pass
□ If tests fail → fix and push again
□ If tests pass → merge to main:
   git checkout main && git merge report/slug-name && git push origin main
□ Confirm live at: https://www.genuverity.com/slug-name
```

### What the tests verify:
- Homepage still loads
- API endpoints work
- Newsletter form accessible
- Reports page shows new report
- New report page structure valid
- Mobile compatibility
- No JavaScript errors

---

## Clean URL Architecture

- Files live in: `localreports/slug-name.html`
- Public URL: `https://www.genuverity.com/slug-name`
- Vercel rewrites `/slug-name` → `/localreports/slug-name.html`
- `js/reports-data.js` uses: `slug: "slug-name"` (NOT full path)

---

## reports-data.js Chart Object

```javascript
{
    id: 0,
    title: "Report Title",
    slug: "slug-name",  // Clean slug, no path
    // ...
    chart: {
        type: "line",    // line, bar, donut, network, hbar, timeline
        color: "#ef4444",
        data: [5, 12, 18, 25, 35]  // MUST match first chart in report
    }
}
```

**Chart data MUST match the first chart in the report HTML.**

---

## ID Management

- New reports: ID 0
- Manually increment ALL existing IDs by +1
- **NEVER use automation** (perl/sed) - causes duplicate keys
- Verify: `node -c js/reports-data.js`

---

## Interactive Features

### Citations
```html
<!-- In text -->
<a href="#source-1" onclick="highlightSource(event, 'source-1')">[1]</a>

<!-- In sidebar -->
<a href="..." class="source-card" id="source-1">...</a>
```

### Social Sharing (in sidebar, above Sources First)
```html
<div class="share-section">
    <div class="share-heading">
        <i data-lucide="share-2"></i>Share This Report
    </div>
    <div class="share-buttons">
        <button onclick="shareToTwitter()">X</button>
        <button onclick="shareToFacebook()">Facebook</button>
        <button onclick="shareToLinkedIn()">LinkedIn</button>
        <button onclick="copyShareLink()">Copy Link</button>
    </div>
</div>
```

---

## Pre-Commit Validation

```bash
# 1. Validate JS syntax
node -c js/reports-data.js

# 2. Verify sequential IDs
grep -n "^\s*id:" js/reports-data.js | head -45

# 3. Check relative paths
grep -E 'href="(index\.html|reports\.html)"' localreports/your-report.html
# Should return NOTHING

# 4. Run validator
./validate-report.sh localreports/your-report.html
```

---

## Source Verification (MANDATORY)

1. WebFetch every URL before including
2. If 403/error, try Playwright fallback
3. If 404/unreachable → DO NOT USE
4. No dead links. Ever.

---

## Link Hierarchy

1. Official .gov sites
2. Official organization sites
3. Primary news sources (where quote originates)
4. Authoritative reference (britannica, imf)
5. **NEVER Wikipedia**

---

## Trust Score Tiers

| Tier | Score | Examples |
|------|-------|----------|
| 1 | 95-100 | Reuters, AP, BBC, .gov, .edu |
| 2 | 85-95 | CNN, NBC, ProPublica, Forbes |
| 3 | 75-85 | TechCrunch, Wired, CNBC |
| Default | 60-75 | Other domains |

---

## Common Pitfalls

| Mistake | Prevention |
|---------|------------|
| Missing citations | Link in same sentence as fact |
| No formatting | Add bold/italic while writing |
| Chart preview mismatch | Extract from FIRST chart |
| Path errors | Use `../` in localreports/ |
| ID automation | Manual increment only |

---

## Batch Generation

```
FOR EACH topic:
  1. WebSearch topic
  2. WebFetch 10+ sources
  3. Read docs/templates.md
  4. Write report
  5. Run checklist
  6. Save to localreports/

AFTER ALL:
  7. Update js/reports-data.js
  8. node tools/generate-sitemaps.js
  9. git add + commit + push
```

**Time: 10-15 minutes per quality report. Don't rush.**

---

## Roundup Reports (Weekly Disinformation Summary)

Roundup reports compile multiple misinformation campaigns into a single analysis. They require a different approach than single-claim reports.

### Key Differences from Standard Reports

| Aspect | Standard Report | Roundup Report |
|--------|-----------------|----------------|
| Scope | Single claim | 10-15 campaigns |
| Depth | Full investigation | Mini-report per campaign |
| Sources | 8-12 focused | 20-30 across campaigns |
| Title | Claim-focused | "Week Ending [Date]" |

### Structure Requirements

**Each campaign section MUST include:**
1. **Verdict box** - FALSE/MISLEADING/etc with 1-sentence summary
2. **Context paragraph** - What the claim was, where it appeared
3. **Detection paragraph** - How it was identified as false (forensics, source verification, etc.)
4. **Spread paragraph** - Platform origin, reach, amplification pattern
5. **Significance paragraph** - Why it matters, real-world risk

**NOT acceptable:** Verdict boxes with 2-3 bullet points. That's a checklist, not a report.

### Title Convention

```
CORRECT:   "Disinformation Roundup: Week Ending January 10, 2026"
WRONG:     "Disinformation Roundup: January 2026" (implies monthly)
WRONG:     "Disinformation Roundup: Week of January 10" (ambiguous)
```

### Chart Placement

Charts in roundups must have surrounding text to flow properly:

```html
<!-- CORRECT: Chart with surrounding text -->
<section>
    <h2>Patterns and Predictions</h2>

    <figure class="float-figure">
        <div class="chart-wrapper">...</div>
    </figure>

    <p>Across the 12 campaigns documented...</p>  <!-- Text flows around chart -->

    <div class="info-box">...</div>
</section>

<!-- WRONG: Chart alone in section -->
<section>
    <figure class="float-figure">...</figure>  <!-- Empty space to left -->
</section>
```

### Source Requirements

- Minimum 2 sources per campaign (fact-checker + primary)
- Plus methodology/reference sources (CDC, official sites, etc.)
- Total should be 20-30 for a 10-12 campaign roundup

### Pre-Generation Checklist

```
□ Confirm scope with user: weekly or monthly?
□ Get exact date for title: "Week Ending [date]"
□ Collect 2+ sources per campaign before writing
□ Plan which campaigns get charts (usually 2 charts total)
```

### Campaign Categories (for chart)

Standard categories for the distribution chart:
- AI Deepfakes
- Miscaptioned Media
- Political Manipulation
- Health Misinformation
- Geopolitical Propaganda
- Extremist Content

---

## Preserving Structured Data (Tables)

**If the seed research contains tables, the report MUST include them.**

### When to Add Tables

Tables should be added when seed data contains:
- Claim vs. reality comparisons (numbers, dates, facts)
- Exaggeration factors (e.g., "$100M claimed vs $4M actual")
- Side-by-side fact breakdowns
- Structured statistics or metrics

### Table Format

Use the standard `data-table` classes:

```html
<div class="data-table-container copyable-section">
    <table class="data-table">
        <thead>
            <tr>
                <th>Aspect</th>
                <th>Viral Claim</th>
                <th>Verified Reality</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Amount</td>
                <td style="color: var(--accent-red);">$100 million</td>
                <td style="color: var(--accent-green);">~$4 million</td>
            </tr>
            <tr>
                <td>Exaggeration factor</td>
                <td colspan="2" style="text-align: center;"><strong>25x inflated</strong></td>
            </tr>
        </tbody>
    </table>
</div>
```

### Color Coding

- **Red** (`var(--accent-red)`) for false/inflated claims
- **Green** (`var(--accent-green)`) for verified facts
- **Bold** for exaggeration factors and key findings

### Common Table Types

| Table Type | When to Use |
|------------|-------------|
| **Claim vs Reality** | Numerical exaggerations (crowd sizes, dollar amounts) |
| **Summary Table** | Roundups with multiple campaigns |
| **Timeline** | Events with disputed dates/sequences |
| **Source Comparison** | Conflicting reports from different outlets |

### Placement

- **Summary tables**: At top of report, after executive summary
- **Claim vs reality tables**: Within the relevant campaign section, after the narrative explains both sides
