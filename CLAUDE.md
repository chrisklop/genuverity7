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
□ Charts (standalone image): Gemini 3 Pro Image Preview
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
- `reports.html` (carousel page)
- `js/reports-data.js` (carousel data - shared source of truth)

**NEVER commit/push:**
- `api/*`
- `index.html`
- `js/*`
- `lib/*`
- `server.py`
- `CLAUDE.md` (except for this setup section if needed)
- Any other files

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

### Research Status Panel
Non-blocking UI panel (bottom-right) that tracks:
- Deep dive generation progress
- Enhance operations
- Queue feedback for fractal triggers

## AI Model Requirements (MANDATORY)

**DO NOT CHANGE THESE MODELS**

| Purpose | Model ID | Location |
|---------|----------|----------|
| **Fact-Check Text** | `claude-sonnet-4-20250514` | Production (`api/index.py`) |
| **Deep Dives** | `claude-sonnet-4-5-20250929` | Local (`server.py`) |
| **Infographics** | `gemini-3-pro-image-preview` | Scripts/API |

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

## Templates Reference

**See `docs/templates.md` for complete templates including:**
- Infographic generation prompts (Midnight Tech style)
- Content report HTML structure
- Source citation standards
- Data freshness requirements
- Chart.js configuration
- Pre-generation checklists
- Cost optimization tips

**Quick Reference - Color Palette:**

| Use | Color | Hex |
|-----|-------|-----|
| Primary accent | Blue | `#3b82f6` |
| Secondary accent | Cyan | `#06b6d4` |
| Success/Green | Green | `#10b981` |
| Warning | Amber | `#f59e0b` |
| Danger/False | Red | `#FF2A2A` |
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
| `.float-figure.right/left` | Magazine-style wrapped charts |
| `.living-number` | Animated counters (`data-target`, `data-suffix`) |
| `.fractal-trigger` | Expandable context terms (triggers deep dives) |
| `.citation-spade` | Source hover cards |
| `.highlight-glow` | Emphasized text |

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
