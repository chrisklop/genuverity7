# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## ⚠️ PRE-FLIGHT CHECKLIST (MANDATORY)

**Before generating ANY content, run this checklist:**

```
□ READ docs/templates.md FIRST
□ Infographics: gemini-3-pro-image-preview ONLY (never gemini-2.0-flash)
□ Infographics: GenuVerity branding in bottom-right (Genu=white, Verity=blue)
□ Article text: Claude models only (never Gemini for text)
□ Sources: NO Wikipedia - find primary sources
□ Colors: NO purple (#8b5cf6) anywhere
□ Text: NO GRADIENT TEXT - use solid colors only
□ Data: Verify against live sources, add date context
□ Charts (in-page): Chart.js with Midnight Tech colors
□ Charts (in-page): Chart.js with Midnight Tech colors
□ Visuals (Infographics/Diagrams): Chart.js/D3/Mermaid (NO Gemini image generation)
```

**Shorthand triggers:**
- `[TEMPLATE]` = Read and follow docs/templates.md
- `[INFOGRAPHIC]` = Use gemini-3-pro-image-preview + GenuVerity branding
- `[REPORT]` = Full report generation following all templates

---

## 🔄 DUAL INSTANCE SETUP (CRITICAL)

**Two Claude Code instances may run concurrently on this project. Each has strict boundaries.**

### Role Declaration Requirement
**Every response from any instance MUST end with one of:**
- **[ROLE: Reports Instance]**
- **[ROLE: Architecture Instance]**

This is MANDATORY. No exceptions. Even after compaction.

### Instance Identification
| If user mentions... | You are likely... |
|---------------------|-------------------|
| reports, articles, fact-checks, sources, localreports/ | **Reports Instance** |
| API, backend, architecture, index.py, infrastructure | **Architecture Instance** |

When uncertain, ASK the user which role you should follow.

### Reports Instance - Git Boundaries (HARDCODED)
**ONLY commit/push these paths:**
- `localreports/*` (all report HTML files)
- `js/reports-data.js` (report metadata - shared source of truth)

**NEVER commit/push:**
- `api/*`
- `index.html`
- `reports.html` (Architecture Instance owns this - it renders dynamically)
- `js/*` (except reports-data.js)
- `lib/*`
- `server.py`
- `CLAUDE.md` (except for this setup section if needed)
- Any other files

### Reports Instance - Workflow (MANDATORY TEMPLATE USAGE)
**To add a new report:**
1. **START FROM GOLDEN TEMPLATE:**
   - Run: `cp docs/report-template-2025.html localreports/your-report-slug.html`
   - **NEVER** write HTML from scratch.
   - **never** copy an old report (it may have legacy bugs).
   - Use the 2025 Golden Template.

2. **CRITICAL ID MANAGEMENT:**
   - New reports go at ID 0 (top of array) in `js/reports-data.js`
   - Manually increment ALL existing IDs by +1
   - **NEVER use automation** (perl/sed/regex) - causes duplicate `id:` keys
   - **ALWAYS verify** with: `node -c js/reports-data.js` before commit

3. **Content Injection:**
   - Fill in the Title, Hero, and Meta data.
   - Inject article content into the `.article-content` block.
   - Add sources to the `.sources-sidebar`.
   - Ensure all sources have `id="source-N"` and citations match `onclick="highlightSource(event, 'source-N')"`.

4. **RUN VALIDATION SCRIPT:** `./validate-report.sh localreports/your-report.html`
5. Fix any errors flagged by the validator.
6. `git add localreports/your-report.html js/reports-data.js`
7. `git commit` and `git push`

**DO NOT:**
- Edit `reports.html` - tiles are generated dynamically via JavaScript
- Run `vercel --prod` - let GitHub auto-deploy or ask Architecture Instance
- Overwrite standard fonts or header classes.
- Use perl/sed one-liners for ID increments (creates `id: id: N,` syntax errors)

### Chart Object Structure (For `js/reports-data.js`)
To generate a custom infographic preview for a report card, include the `chart` object in the report entry:

```javascript
{
    // ... id, title, slug, etc ...
    chart: {
        type: "line",           // Options: "line", "bar", "donut", "network", "hbar", "timeline"
        color: "#f59e0b",       // Hex color (Amber=#f59e0b, Red=#ef4444, Blue=#3b82f6, Green=#10b981)
        data: [20, 35, 45, 60]  // Array of numbers for line/bar/timeline, OR number for donut, OR object for network
    }
}
```

**Data Formats per Type:**
- **line/bar**: Array of numbers (e.g., `[10, 20, 15, 40]`)
- **donut**: Single number 0-100 (e.g., `72`)
- **network**: Object with nodes/connections (e.g., `{ nodes: 15, connections: 25 }`) OR just color/data (chart generator handles randomness if data omitted)
- **hbar**: Array of objects (e.g., `[{ label: 'TikTok', value: 85 }, { label: 'X', value: 70 }]`)
- **timeline**: Array of numbers 0-100 representing % position (e.g., `[10, 50, 90]`)

### ⚠️ MANDATORY PRE-COMMIT VALIDATION (Reports Instance)
**Before EVERY `git commit` of a new report, run these checks:**

```bash
# 1. Validate JavaScript syntax
node -c js/reports-data.js

# 2. Verify sequential IDs (0, 1, 2, 3...)
grep -n "^\s*id:" js/reports-data.js | head -45

# 3. Check for relative path errors in new report
grep -E 'href="(index\.html|reports\.html)"' localreports/your-new-report.html
# Should return NOTHING - all paths must use ../

# 4. Verify no manual copyable-section classes
grep "copyable-section" localreports/your-new-report.html
# Should ONLY appear in CSS, not in HTML elements

# 5. Check Chart.js syntax if charts present
# Look for missing braces { } in chart config
```

**HTML Report Quality Checklist:**
- [ ] All navbar links use `../` prefix (e.g., `href="../index.html"`)
- [ ] Chart.js config has proper `{ }` braces for all objects
- [ ] NO manual `class="copyable-section"` on HTML elements (JS auto-adds it)
- [ ] NO typos in JavaScript (e.g., `functio n` → `function`)
- [ ] 8+ inline links to primary sources throughout content
- [ ] All external links verified accessible (no 404s)
- [ ] Chevron icon in sources banner (`data-lucide="chevron-down"`)
- [ ] Chart watermark plugin registered globally

**Common Pitfalls:**
1. **Path Errors**: Files in `/localreports/` must use `../` to access root files
2. **JavaScript Typos**: Space in `functio n`, missing braces, etc. break charts
3. **Auto-Init Conflicts**: Adding `copyable-section` class prevents button auto-injection
4. **ID Duplication**: Using automation creates `id: id: 3,` syntax

### Architecture Instance - Git Boundaries (HARDCODED)
**ONLY commit/push these paths:**
- `api/*`
- `index.html`
- `js/*`
- `lib/*`
- `server.py`
- Configuration files

**NEVER commit/push:**
- `localreports/*`
- Report HTML files

### Deployment Coordination
- Both instances share the same filesystem
- Sequential git pushes are additive (not destructive) if boundaries are respected
- GitHub triggers Vercel auto-deploy
- Stay in your lane = no conflicts

### ⚠️ DEPLOYMENT RULES (CRITICAL)
**Reports Instance:**
- NEVER run `vercel --prod` or `vercel deploy`
- After pushing to git, GitHub auto-deploys OR ask Architecture Instance to deploy
- Your git push only includes your allowed files; `vercel --prod` deploys EVERYTHING

**Architecture Instance:**
- Responsible for all production deployments
- Before deploying: `git pull` to get Reports Instance changes
- Verify `index.html` is the correct version (should be ~2200 lines, not ~15000)

**Why this matters:**
Running `vercel --prod` deploys your entire working directory. If you have stale files (like an old index.html from git), you'll overwrite production with broken code.

---

## Session Continuity

**Before starting any work:**
1. Check `docs/ROADMAP.md` for current priorities
2. Check `docs/LESSONS_LEARNED.md` for known issues and fixes
3. Check `docs/REPORT_INVENTORY.md` for existing reports (avoid duplication)
4. Review recent commits: `git log --oneline -10`
5. Ask user about current priorities

## Key Documentation

| Document | Purpose |
|----------|---------|
| `docs/template.md` | Complete HTML/CSS/JS code snippets for reports |
| `docs/LESSONS_LEARNED.md` | Technical fixes, design decisions, debugging tips |
| `docs/BATCH_REPORT_PROCESS.md` | Process for generating multiple reports |
| `docs/REPORT_INVENTORY.md` | List of existing reports (for deduplication) |
| `docs/ROADMAP.md` | Feature planning and priorities |

## Project Overview

**GenuVerity** is an AI-powered fact-checking platform with disinformation tracking capabilities:
- **Fact-Check Engine**: Verifies claims with verdicts (TRUE/FALSE/MIXED/etc.)
- **Disinformation Tracking**: Origin tracking, spread patterns, narrative mutations
- **Multi-Source Verification**: Tavily search, Google Fact Check API, Reddit, Archive.org
- **Claim Database**: Semantic fingerprinting to detect claim mutations
- **SSE Streaming**: Real-time progress updates during fact-check generation

**Live URLs**:
- Production: **https://www.genuverity.com** (custom domain)
- Vercel: https://genuverity7.vercel.app (same deployment)

## Commands

| Command | Purpose |
|---------|---------|
| `python server.py` | Local dev server (port 8000) - uses local file cache |
| `vercel --prod` | Deploy to production |
| `vercel logs genuverity7.vercel.app` | View production logs |

**Note**: `server.py` is a separate local development server with its own caching. Production (`api/index.py`) uses Vercel Blob Storage.

## Architecture

### Backend (`api/index.py`) - Production
- **Framework**: FastAPI with SSE streaming
- **Storage**: Vercel Blob Storage (`articles/_index.json`, `claims/_index.json`)
- **Key template**: `FACT_CHECK_TEMPLATE` (~line 1059) - controls fact-check generation schema
- **External APIs**: Tavily (web search), Google Fact Check API, Reddit, Archive.org Wayback

### Backend (`server.py`) - Local Development
- **Framework**: FastAPI + Uvicorn
- **Storage**: Local file cache (`./article_cache/`)
- **Uses**: Gemini for basic generation, Claude for deep dives

### API Endpoints (Production)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/fact-check` | POST | Generate fact-check with SSE streaming |
| `/api/cache/check` | POST | Check if cached (returns similar if not) |
| `/api/cache/list` | GET | List all cached fact-checks |
| `/api/article/{slug}` | GET | Fetch single article by slug |
| `/api/admin/rebuild-index` | POST | Rebuild article index (requires auth) |
| `/api/health` | GET | Health check |

**Claim Database Endpoints:**
| `/api/claims/similar` | POST | Find semantically similar claims |
| `/api/claims/genealogy/{hash}` | GET | Get claim parent/children tree |
| `/api/claims/list` | GET | List all registered claims |
| `/api/claims/stats` | GET | Claim database statistics |

**External Service Endpoints:**
| `/api/reddit/search` | POST | Search Reddit posts |
| `/api/reddit/timeline` | POST | Get Reddit discussion timeline |
| `/api/reddit/comments` | POST | Search Reddit comments |
| `/api/archive/search` | POST | Search Wayback Machine |
| `/api/archive/check` | GET | Check URL archival status |
| `/api/trending/x` | GET | Get trending fact-check topics |

### Frontend (`index.html`)
Single-page app with three views:
- **Portal** (`view-portal`): Landing page with trending articles
- **Report** (`view-report`): Article display with Sources First banner
- **Static** (`view-static`): Auxiliary content pages

**Key Functions**:
| Function | Purpose |
|----------|---------|
| `renderReportData()` | Renders article + Sources First tabs |
| `toggleSourcesBanner()` | Collapse/expand Sources First panel |
| `switchView()` | Navigate between views |
| `renderDynamicCharts()` | Initialize Chart.js visualizations |


## AI Model Requirements (MANDATORY)

**DO NOT CHANGE THESE MODELS**

| Purpose | Model ID | Location |
|---------|----------|----------|
| **Fact-Check Text** | `claude-sonnet-4-20250514` | Production (`api/index.py`) |
| **Deep Dives** | `claude-sonnet-4-5-20250929` | Local (`server.py`) |
| **Infographics/Diagrams** | `claude-sonnet-4-5-20250929` (via Chart.js/D3 code) | Scripts |

**CRITICAL RESTRICTIONS (USER HAS REPEATEDLY COMPLAINED ABOUT VIOLATIONS):**

| FORBIDDEN | WHAT IT MEANS | USE INSTEAD |
|-----------|---------------|-------------|
| **GRADIENT ON BUTTONS** | No `linear-gradient()` on any button or CTA | Solid `var(--accent-blue)` |
| **GRADIENT ON TEXT** | No `-webkit-background-clip: text` gradients | Solid color text |
| **GRADIENT ON CARDS** | No gradient backgrounds on cards/panels | Solid `var(--bg-card)` |
| **PURPLE COLORS** | No `#8b5cf6` or similar purples | Use blue, cyan, green, amber, red |

**The ONLY acceptable gradients are:**
- Background grid pattern (subtle 1px lines)
- Ambient glow effects (radial-gradient for atmosphere)
- Divider lines that fade to transparent

**Other Restrictions:**
- Never use other Gemini models for infographics
- Never use Claude for infographics
- Never use Gemini for article text

## Visual Elements Decision Tree

**FIRST: Decide which tool to use for any visual:**

| Visual Type | Tool | Why |
|-------------|------|-----|
| **Bar/Line/Pie charts** | Chart.js | Interactive, fast, auto-watermark |
| **Data comparisons** | Chart.js | In-page, responsive |
| **Flowcharts/Diagrams** | Mermaid/D3.js | Maintainable code, consistent style |
| **Process diagrams** | Mermaid/D3.js | Vector scalable |
| **Infographics** | Chart.js/D3.js | No image generation hallucinations |
| **Network graphs** | D3.js | Interactive, data-driven |

**CRITICAL: DO NOT USE GEMINI IMAGE GENERATION.**
All visuals must be generated as code (Chart.js, D3, Mermaid).

### Chart.js (In-Page Charts)
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="../js/chart-watermark.js"></script>  <!-- Auto-adds GenuVerity branding -->
```
- Watermark plugin auto-registers and brands all charts
- Use for data that benefits from hover/interaction
- Midnight Tech colors: Blue #3b82f6, Cyan #06b6d4, Green #10b981, Amber #f59e0b, Red #ef4444

### Report Conversion Fidelity (Lessons Learned)
**When converting source content (e.g., Markdown reports) to HTML:**
1. **Source Parity**: If the source text lists 28 citations, your HTML sources grid MUST list all 28. Do not truncate.
2. **Label Accuracy**: Use the label "Sources First" for the source banner.
3. **Data Integrity**: Preserve ALL data tables from the source. Use the `.data-table` class. Do not flatten tables into paragraphs.
4. **Deep Dive Depth**: Maintain technical specificity (models, vectors, financial figures found in source). Do not summarize case studies into generic points.
5. **Infographic Paths**: Prefer code-generated visuals. If using images, ensure `<img src>` tags point to `images/` relative paths.

## Shared Architecture Scripts

Reports should include these shared scripts (auto-inject features):

| Script | Purpose | Include After |
|--------|---------|---------------|
| `js/reading-progress.js` | Scroll progress bar in navbar | Any time |
| `js/chart-watermark.js` | GenuVerity branding on Chart.js | Chart.js CDN |
| `js/reports-data.js` | Report metadata (landing page only) | - |

## Templates Reference

**Master Template**: `docs/report-template.html` - Use this as the starting point for ALL new reports.

**See `docs/templates.md` for complete templates including:**
- Content report HTML structure
- Source citation standards
- Data freshness requirements
- Chart.js configuration
- Pre-generation checklists

### Verdict Badge System (REQUIRED for all fact-checks)

Every fact-check report MUST include a verdict badge with the appropriate styling:

| Verdict | When to Use | Color | Icon | Classes |
|---------|-------------|-------|------|---------|
| **FALSE** | Factually incorrect, debunked | Red `#ef4444` | `x-circle` | `badge-false`, `verdict-false` |
| **TRUE** | Factually correct, verified | Green `#10b981` | `check-circle` | `badge-true`, `verdict-true` |
| **MISLEADING** | Contains truth but misleads | Amber `#f59e0b` | `alert-triangle` | `badge-misleading`, `verdict-misleading` |
| **MIXED** | Partially true, partially false | Cyan `#06b6d4` | `circle-help` | `badge-mixed`, `verdict-mixed` |
| **UNVERIFIED** | Cannot verify either way | Blue `#3b82f6` | `circle-help` | `badge-unverified`, `verdict-unverified` |
| **DEVELOPING** | Ongoing story, new info emerging | Cyan `#06b6d4` | `clock` | `badge-developing`, `verdict-developing` |
| **CONTEXT NEEDED** | Nuanced, requires critical thinking | Amber `#f59e0b` | `book-open` | `badge-context`, `verdict-context` |

**Example FALSE verdict badge:**
```html
<div class="verdict-badge badge-false">
    <i data-lucide="x-circle" style="width: 28px; height: 28px;"></i>
    <span>FALSE</span>
</div>
```

**Quick Reference - Color Palette:**

| Use | Color | Hex |
|-----|-------|-----|
| Primary accent | Blue | `#3b82f6` |
| Secondary accent | Cyan | `#06b6d4` |
| Success/True | Green | `#10b981` |
| Warning/Misleading | Amber | `#f59e0b` |
| Danger/False | Red | `#ef4444` |
| **FORBIDDEN** | Purple | `#8b5cf6` - NEVER USE |

**Quick Reference - GenuVerity Branding:**
- Wordmark ONLY in bottom-right corner
- "Genu" = White (#FFFFFF), "Verity" = Blue (#3B82F6)
- NO icons/shields to the LEFT of text
- Optional network dots ONLY to the RIGHT

## Fact-Check JSON Schema

```json
{
  "key": "claim_slug",
  "articleType": "fact_check",
  "title": "Fact Check: [Claim summary]",
  "verdict": "TRUE | FALSE | MOSTLY_TRUE | MOSTLY_FALSE | MIXED | UNVERIFIABLE",
  "verdictSummary": "2-3 sentence explanation",
  "confidence": 0.85,
  "claims": [{ "id": "claim_1", "text": "...", "verdict": "TRUE", "evidence": "...", "sourceIds": ["src1"] }],
  "evidenceSummary": { "supporting": [], "contradicting": [], "context": [] },
  "disinfoAnalysis": {
    "originEstimate": { "firstSeen": "2024-01-15", "firstSource": "...", "originType": "social_media" },
    "amplificationPattern": { "spreadVelocity": "rapid", "topAmplifiers": [] },
    "narrativeMutations": [{ "variant": "...", "changeType": "exaggeration" }]
  },
  "sources": [{ "name": "Source Name", "score": 95, "url": "https://..." }],
  "citationDatabase": { "src1": { "domain": "...", "trustScore": 95, "url": "..." } },
  "content": "<HTML content with verdict banner and tabbed sections>"
}
```

**Critical**: Sources MUST include `score` field (0-100) for trust tier sorting.

### Claim Fingerprinting
The system generates semantic fingerprints for claims to detect mutations:
- Tokens: normalized keywords (stop words removed)
- Bigrams: two-word phrases
- Hash: SHA-256 for exact matching
- Similarity threshold: 0.5 default for finding related claims

## Content HTML Classes

| Class | Purpose |
|-------|---------|
| `.prose-text` | Body paragraphs |
| `.prose-h2` | Section headings |
| `.nav-header` | Sticky navigation bar |
| `.reading-progress` | Scroll progress bar (auto-injected by js/reading-progress.js) |
| `.sources-banner` | Collapsible sources section at top |
| `.content-section` | Main content sections |
| `.verdict-badge` | Colored verdict indicator |
| `.chart-container` | Wrapper for Chart.js charts |

**Text Formatting (used in reports):**
| Element | Use For |
|---------|---------|
| `<strong>` | Verdicts, key findings, important names, critical numbers |
| `<em>` | Claims being analyzed, quotes, technical terms |
| `<a href="URL">` | Inline citations (every factual claim needs one) |

## Environment Variables

Required in `.env.local` or Vercel dashboard:
- `ANTHROPIC_API_KEY` - Claude API key (required)
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token (required for production)
- `TAVILY_API_KEY` - Tavily web search API key (for source search)
- `GOOGLE_FACT_CHECK_API_KEY` - Google Fact Check Tools API key
- `ADMIN_SECRET` - Secret for protected admin endpoints
- `CLAUDE_MODEL` - Override Claude model (defaults to `claude-sonnet-4-20250514`)

## Trust Score System

Sources are scored 0-100 based on domain reputation (`calculate_trust_score()`):
- **Tier 1 (95-100)**: Reuters, AP, BBC, NYT, WSJ, .gov, .edu, Nature, Science
- **Tier 2 (85-95)**: CNN, NBC, CBS, ABC, USA Today, The Atlantic, ProPublica, Forbes
- **Tier 3 (75-85)**: TechCrunch, Wired, Ars Technica, CNBC, SEC, NIH, CDC
- **Default (60-75)**: Other domains

## External API Integrations

| Service | Purpose | Rate Limits |
|---------|---------|-------------|
| **Tavily** | Web search for sources | Per API key |
| **Google Fact Check API** | Find prior fact-checks | Per API key |
| **Reddit** | Track claim discussions | 100 req/min (unauthenticated) |
| **Archive.org Wayback** | Historical URL snapshots | Rate limited, uses 0.5s delays |

## Known Issues

1. **Vercel 300s timeout**: Long fact-checks configured with 300s max duration in `vercel.json`
2. **Article index**: If trending loads slowly, run `/api/admin/rebuild-index` (requires `ADMIN_SECRET` auth)
3. **JSON truncation**: `repair_truncated_json()` function attempts to fix incomplete AI responses

## Important Links & Resources

| Resource | URL |
|----------|-----|
| **Production Site** | https://www.genuverity.com |
| **Vercel Deploy** | https://genuverity7.vercel.app (same deployment) |
| **Google Form (Early Access Signups)** | [Edit Form](https://docs.google.com/forms/d/e/1FAIpQLSetyogwUjTlj7l256h-E6JbDZvCsNhYJA-_xETaVN_Mo_6RbQ/viewform) |
| **Form Responses** | [View Responses](https://docs.google.com/forms/d/1FAIpQLSetyogwUjTlj7l256h-E6JbDZvCsNhYJA-_xETaVN_Mo_6RbQ/edit#responses) |
| **Full App Backup** | `index-full.html` (pre-coming-soon version) |

**Google Form Field IDs** (for form submission):
- Email: `entry.264603588`
- Use Case: `entry.360289651`

## Report Content Standards (MANDATORY)

### Hyperlinking Rules

**EVERY report must hyperlink all significant entities. This is NOT optional.**

**What gets linked:**
- All named individuals (officials, analysts, executives, politicians)
- All organizations (companies, agencies, governments, think tanks)
- All technical/financial terms readers may not know
- All data claims (link directly to the source of the data)
- All quoted statements (link to the article containing the quote)

**Link hierarchy (in order of preference):**
1. **Official .gov sites** - whitehouse.gov, treasury.gov, federalreserve.gov, state.gov, congress.gov
2. **Official organization sites** - company homepages, agency sites, ministry sites (mof.go.jp, gov.uk)
3. **Primary news sources** - the article where a quote/claim originates (axios, cnbc, reuters, fortune)
4. **Authoritative reference sites** - britannica.com, imf.org, bis.org, cmegroup.com
5. **NEVER Wikipedia** - Wikipedia is NOT a primary source. NEVER use it.

**Link verification requirement (MANDATORY):**
- Every link MUST be fetched via WebFetch and verified before inclusion
- If WebFetch returns 403/error, use Playwright as fallback to verify the link isn't a 404
- Dead links damage credibility and are unacceptable
- Test links in batches using parallel WebFetch calls

**Source freshness requirement (MANDATORY):**
- All real-time data (Fed nowcasts, consumer surveys) MUST be verified against live sources on day of publication
- Include date context in parentheses for time-sensitive data: "(Dec 18, 2025 reading)"
- Historical research papers/news articles are acceptable if they are the original primary source
- If a source is >6 months old, evaluate whether more current data exists
- Never present stale data as current without disclosure

**Verified primary source examples:**
| Entity Type | Primary Source |
|-------------|----------------|
| US President | whitehouse.gov (if page exists) or primary news article |
| Federal Reserve | federalreserve.gov |
| US Treasury | home.treasury.gov |
| Treasury Secretary | home.treasury.gov/about/general-information/officials/[name] |
| Japan Finance | mof.go.jp/english/ |
| China data | imf.org/en/Countries/CHN |
| UK Government | gov.uk |
| Treasury holdings | ticdata.treasury.gov |
| Financial terms | britannica.com/money or cmegroup.com/education |
| Basis trade | britannica.com/money/basis-trading |
| Named quotes | Link to the news article containing the quote |

### Report Structure Requirements

**All reports must include:**
1. **Inline citations throughout** - Not just a sources section at the end
2. **Primary sources section** - Grid of source cards with links
3. **Feedback form** - Wired to `/api/feedback` endpoint
4. **Mobile notice** - Dismissable banner for mobile users recommending desktop

**Report types:**
- **Network Analysis**: D3.js force-directed graphs, real data from Meta/platform reports
- **Fact-Checks**: Claim-by-claim verdicts with evidence links
- **Financial Analysis**: Mermaid diagrams, data cards, timelines
- **Investigative Reports**: Timeline + comprehensive source grid

### Source Verification (MANDATORY - NO EXCEPTIONS)

**NEVER include a source URL in any report unless it has been verified accessible.**

Verification process:
1. WebFetch every URL before including it
2. If WebFetch returns 403/error, try Playwright as fallback
3. If both fail with 404 or unreachable → DO NOT USE THAT SOURCE
4. Find an alternative source that IS reachable
5. No dead links. Ever. This is non-negotiable.

### Before Publishing Any Report

1. Run WebFetch on EVERY external link to verify it resolves
2. Replace any Wikipedia links with verified primary sources
3. Ensure all named individuals link to official bios or primary news coverage
4. Verify data claims link to their original source (treasury.gov, imf.org, etc.)
5. Test the feedback form endpoint
6. Check mobile notice appears correctly

## User Preferences

- Dark mode by default
- Sources prioritized over AI analysis
- Professional, clean layouts
- Mobile-responsive design
- Minimal unnecessary features

---

## 📋 REPORT GENERATION PIPELINE (MANDATORY)

**This is the EXACT process for generating ANY report. No shortcuts. No exceptions.**

### When User Says "Generate N Reports"

Execute this pipeline FOR EACH report sequentially:

---

### PHASE 1: PRE-GENERATION (Per Report)

```
□ 1. Read docs/templates.md AND docs/template.md
□ 2. Read a reference report (e.g., localreports/fednow-freeze.html)
□ 3. Research the topic with WebSearch
□ 4. Gather 8-12 sources with WebFetch verification
□ 5. Create source list with trust scores
```

**STOP if:**
- Fewer than 8 verified sources
- No primary (.gov, official) sources available
- Topic already exists in js/reports-data.js

---

### PHASE 2: CONTENT REQUIREMENTS (Per Report)

**Every report MUST contain:**

| Element | Requirement | Example |
|---------|-------------|---------|
| **Sources Sidebar** | Left column, sticky | `<aside class="sources-sidebar">` |
| **Trust Scores** | 0-100 per source | `<span class="source-score high">95</span>` |
| **Inline Citations** | Linked text throughout body | `<a href="URL" target="_blank">cited fact</a>` |
| **Bold Emphasis** | Key terms, names, verdicts | `<strong>FALSE</strong>` |
| **Italic Emphasis** | Quotes, claims being analyzed | `<em>"quoted claim text"</em>` |
| **Chart.js + Watermark Plugin** | Every chart needs the plugin | See template.md |
| **Reading Progress Bar** | In nav header | `<div class="reading-progress"></div>` |
| **Verdict Section** | Color-coded by result | Green=TRUE, Red=FALSE, Amber=MIXED |
| **Executive Summary** | Claim vs Reality grid | See template.md |

---

### PHASE 3: WRITING STANDARDS (Per Report)

**Text Formatting Rules:**

1. **Bold (`<strong>`)** - Use for:
   - Verdict labels: **FALSE**, **TRUE**, **MIXED**
   - Key findings: **no evidence exists**
   - Important names on first mention: **Colonel Ruby Bradley**
   - Critical numbers: **$2.7 trillion**

2. **Italic (`<em>`)** - Use for:
   - Claims being fact-checked: *"The government is spraying chemicals"*
   - Titles of reports/studies: *Environmental Science & Technology*
   - Foreign phrases or technical terms on first use

3. **Inline Citations** - Every factual claim needs a link:
   ```html
   According to <a href="https://www.bls.gov/..." target="_blank" rel="noopener">BLS data</a>,
   inflation rose <strong>2.7%</strong> in November.
   ```

4. **Never** write a factual claim without linking to the source in the same sentence.

---

## Interactive Report Specification (ARCHITECTURAL STANDARD)

**All new reports MUST pass `./validate-report.sh` before deployment.**

### 1. Interactive Citations
- **Requirement:** Clicking a citation `[1]` MUST scroll the sidebar to the source card.
- **Implementation:**
  - Citation in text: `<a href="#source-1" class="citation-link" onclick="highlightSource(event, 'source-1')">[1]</a>`
  - Source Card in sidebar: `<a href="..." target="_blank" class="source-card" id="source-1">`
- **Validation:** Script checks for `highlightSource` usage and `id="source-1"` existence.

### 2. Copy/Share Functionality
- **Requirement:** Users must be able to straightforwardly copy charts and summaries as images.
- **Implementation:**
  1. Include dependencies in `<head>`:
     ```html
     <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
     <script src="../js/copyable-sections.js" defer></script>
     ```
  2. Add class `copyable-section` to:
     - The `.executive-summary` container
     - Every `.chart-wrapper` (or `.float-figure`)
     - The `.verdict-box` or Conclusion container
- **Validation:** Script checks for `copyable-section` class and script tags.

### 3. Layout Standards
- **Sources Sidebar:** MUST use the "Sources First" left-sidebar layout (`.sources-sidebar`).
- **Data Tables:** MUST use `.data-table` class for any tabular data.
- **Verdict:** MUST use standard verdict colors (Green/Red/Amber).

### 4. Deployment Gatekeeping
**Before `git push`:**
1. Run: `./validate-report.sh localreports/your-report.html`
2. Run: `node -c js/reports-data.js`
3. Fix ANY errors. **Do not bypass.**

---

### PHASE 4: REQUIRED HTML STRUCTURE

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta, title, Chart.js CDN -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        /* MUST include these CSS variables */
        :root {
            --bg-primary: #0a0a0f;
            --bg-card: #12121a;
            --text-primary: #e4e4e7;
            --text-secondary: #a1a1aa;
            --accent-blue: #3b82f6;
            --accent-cyan: #06b6d4;
            --accent-green: #10b981;
            --accent-amber: #f59e0b;
            --accent-red: #ef4444;
            --border-subtle: rgba(255,255,255,0.08);
        }
        /* Reading progress bar CSS */
        .reading-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--accent-blue), var(--accent-cyan));
            width: 0%;
            transition: width 0.1s ease-out;
        }
    </style>
</head>
<body>
    <nav class="nav-header">
        <!-- Brand + Links -->
        <div class="reading-progress"></div>
    </nav>

    <header class="hero">
        <div class="verdict-badge">[VERDICT]</div>
        <h1>[TITLE]</h1>
    </header>

    <main class="container">
        <div class="content-grid">
            <!-- 1. Sources Sidebar (Left sticky) -->
            <aside class="sources-sidebar">
                <div class="sources-header">...</div>
                <div class="sources-list">...</div>
            </aside>

            <!-- 2. Main Article Content -->
            <article class="article-content">
                <header>
                    <div class="verdict-tag">[VERDICT]</div>
                    <h1>[TITLE]</h1>
                </header>

                <!-- Executive Summary -->
                <section>...</section>

                <!-- Content -->
                <section>...</section>
            </article>
        </div>
    </main>

    <script>
        // Reading Progress Bar (REQUIRED)
        const progressBar = document.querySelector('.reading-progress');
        window.addEventListener('scroll', () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            progressBar.style.width = Math.min((scrolled / docHeight) * 100, 100) + '%';
        });

        // Chart.js Watermark Plugin (REQUIRED)
        const genuVerityWatermark = {
            id: 'genuVerityWatermark',
            afterDraw: (chart) => {
                const ctx = chart.ctx;
                const { width } = chart;
                ctx.save();
                ctx.textAlign = 'right';
                ctx.textBaseline = 'top';
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

        // Initialize charts...
    </script>
</body>
</html>
```

---

### PHASE 5: POST-GENERATION CHECKLIST (Per Report)

Before saving the file, verify:

```
□ 1. Sources Banner present and functional (toggle works)
□ 2. At least 8 sources with trust scores
□ 3. Reading progress bar in nav + JS
□ 4. Chart.js watermark plugin registered
□ 5. Every factual claim has inline citation link
□ 6. Bold used for verdicts, key findings, important names
□ 7. Italic used for claims being analyzed, quotes
□ 8. No purple colors (#8b5cf6)
□ 9. All URLs verified accessible
□ 10. Verdict badge matches conclusion
```

---

### PHASE 6: INTEGRATION (After All Reports Complete)

```
□ 1. Add ALL new reports to js/reports-data.js
□ 2. Increment IDs sequentially (newest = lowest ID)
□ 3. git add localreports/*.html js/reports-data.js
□ 4. git commit with descriptive message
□ 5. git push origin main
□ 6. STOP - Do NOT run vercel --prod
```

---

### FAILURE MODES TO PREVENT

| Mistake | How to Prevent |
|---------|----------------|
| Missing inline citations | Write citation link IN SAME SENTENCE as fact |
| No bold/italic | Add formatting while writing, not after |
| Missing watermark plugin | Copy from template.md, don't skip |
| Missing reading progress | Include CSS + JS from template |
| Rushing for volume | Quality > quantity. Stop and fix issues. |
| Not reading templates | FIRST action is always Read docs/templates.md |

---

### BATCH GENERATION EXAMPLE

When user says: "Generate 5 reports on topics X, Y, Z, A, B"

```
FOR EACH topic:
  1. WebSearch topic → gather context
  2. WebFetch 10+ sources → verify accessible
  3. Read docs/templates.md (yes, every time)
  4. Write report following PHASE 4 structure
  5. Run PHASE 5 checklist
  6. Save to localreports/

AFTER ALL reports:
  7. Update js/reports-data.js with all entries
  8. git add, commit, push
```

**Time estimate:** 10-15 minutes per high-quality report. Do NOT rush.
