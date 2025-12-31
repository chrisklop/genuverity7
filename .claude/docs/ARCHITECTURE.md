# Architecture Guide

Backend, API, and deployment documentation for GenuVerity.

---

## Stack Overview

| Layer | Technology |
|-------|------------|
| Frontend | Single-page app (index.html) |
| Backend (Prod) | FastAPI + Vercel Serverless |
| Backend (Dev) | FastAPI + Uvicorn (server.py) |
| Storage (Prod) | Vercel Blob Storage |
| Storage (Dev) | Local file cache |

---

## Backend: Production (`api/index.py`)

- **Framework**: FastAPI with SSE streaming
- **Storage**: Vercel Blob (`articles/_index.json`, `claims/_index.json`)
- **Key template**: `FACT_CHECK_TEMPLATE` (~line 1059)

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/fact-check` | POST | Generate fact-check (SSE) |
| `/api/cache/check` | POST | Check cache, return similar |
| `/api/cache/list` | GET | List cached fact-checks |
| `/api/article/{slug}` | GET | Fetch article by slug |
| `/api/admin/rebuild-index` | POST | Rebuild index (auth required) |
| `/api/health` | GET | Health check |

### Claim Database

| Endpoint | Purpose |
|----------|---------|
| `/api/claims/similar` | Find semantically similar claims |
| `/api/claims/genealogy/{hash}` | Claim parent/children tree |
| `/api/claims/list` | List all claims |
| `/api/claims/stats` | Database statistics |

### External Services

| Endpoint | Purpose |
|----------|---------|
| `/api/reddit/search` | Search Reddit posts |
| `/api/reddit/timeline` | Discussion timeline |
| `/api/archive/search` | Wayback Machine search |
| `/api/archive/check` | URL archival status |
| `/api/trending/x` | Trending topics |

---

## Backend: Development (`server.py`)

- **Framework**: FastAPI + Uvicorn
- **Port**: 8000
- **Storage**: `./article_cache/`
- **Models**: Gemini (basic), Claude (deep dives)

Run: `python server.py`

---

## Frontend (`index.html`)

Single-page app with three views:
- **Portal** (`view-portal`): Landing page, trending articles
- **Report** (`view-report`): Article display
- **Static** (`view-static`): Auxiliary pages

### Key Functions

| Function | Purpose |
|----------|---------|
| `renderReportData()` | Render article + Sources First |
| `toggleSourcesBanner()` | Collapse/expand sources |
| `switchView()` | Navigate views |
| `renderDynamicCharts()` | Initialize Chart.js |

---

## AI Models (DO NOT CHANGE)

| Purpose | Model |
|---------|-------|
| Fact-Check Text | `claude-sonnet-4-20250514` |
| Deep Dives | `claude-sonnet-4-5-20250929` |
| Charts/Diagrams | Chart.js/D3 code (NOT AI images) |

---

## External APIs

| Service | Purpose | Rate Limit |
|---------|---------|------------|
| Tavily | Web search | Per API key |
| Google Fact Check | Prior fact-checks | Per API key |
| Reddit | Discussions | 100/min |
| Archive.org | Historical snapshots | 0.5s delay |

---

## Deployment

### Vercel Configuration (`vercel.json`)
- 300s timeout for long fact-checks
- Clean URL rewrites (auto-generated)

### Deployment Commands
```bash
vercel --prod          # Deploy to production
vercel logs genuverity7.vercel.app  # View logs
```

### Rules
- **Architecture Instance**: Runs `vercel --prod`
- **Reports Instance**: NEVER deploys - git push auto-deploys
- Before deploy: `git pull` to get latest reports

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Claude API (required) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (production) |
| `TAVILY_API_KEY` | Web search |
| `GOOGLE_FACT_CHECK_API_KEY` | Fact-check API |
| `ADMIN_SECRET` | Protected endpoints |
| `CLAUDE_MODEL` | Model override |

---

## Fact-Check JSON Schema

```json
{
  "key": "claim_slug",
  "articleType": "fact_check",
  "title": "Fact Check: [Claim]",
  "verdict": "TRUE|FALSE|MIXED|...",
  "verdictSummary": "2-3 sentences",
  "confidence": 0.85,
  "claims": [{
    "id": "claim_1",
    "text": "...",
    "verdict": "TRUE",
    "evidence": "...",
    "sourceIds": ["src1"]
  }],
  "sources": [{
    "name": "Source",
    "score": 95,
    "url": "https://..."
  }],
  "disinfoAnalysis": {
    "originEstimate": {...},
    "amplificationPattern": {...},
    "narrativeMutations": [...]
  }
}
```

---

## Claim Fingerprinting

- **Tokens**: Normalized keywords (stop words removed)
- **Bigrams**: Two-word phrases
- **Hash**: SHA-256 for exact match
- **Similarity threshold**: 0.5 default

---

## Known Issues

1. **Vercel 300s timeout**: Configured in vercel.json
2. **Slow trending**: Run `/api/admin/rebuild-index`
3. **JSON truncation**: `repair_truncated_json()` handles incomplete responses

---

## Shared Scripts

| Script | Purpose |
|--------|---------|
| `js/shared-components.js` | Navbar, footer injection |
| `js/chart-watermark.js` | GenuVerity branding on charts |
| `js/reading-progress.js` | Scroll progress bar |
| `tools/generate-sitemaps.js` | Sitemap + URL rewrites |
