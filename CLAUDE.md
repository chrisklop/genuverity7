# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Session Continuity

**Before starting any work:**
1. Check `docs/ROADMAP.md` for current priorities
2. Review recent commits: `git log --oneline -10`
3. Ask user about current priorities

## Project Overview

**GenuVerity** is an AI-powered investigative journalism platform that generates data-driven exposé articles with:
- **Sources First** philosophy: Primary sources displayed ABOVE content in tabbed navigation
- Interactive charts (Chart.js) and AI-generated infographics (Gemini)
- Fractal triggers for expandable context on key claims
- Deep dive generation for section expansion

**Live URL**: https://genuverity7.vercel.app

## Commands

| Command | Purpose |
|---------|---------|
| `python server.py` | Local dev server (port 8000) |
| `vercel --prod` | Deploy to production |
| `vercel logs genuverity7.vercel.app` | View production logs |

## Architecture

### Backend (`api/index.py`)
- **Framework**: FastAPI + Uvicorn
- **Storage**: Vercel Blob Storage for article cache + article index (`articles/_index.json`)
- **Key constant**: `ARTICLE_TEMPLATE` (~line 470) - controls AI generation schema

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/generate` | POST | Generate new article (SSE streaming) |
| `/api/deep-dive` | POST | Generate deep-dive section expansion |
| `/api/cache/check` | POST | Check if article exists in cache |
| `/api/cache/list` | GET | List cached articles (reads index) |
| `/api/admin/rebuild-index` | POST | Rebuild article index from all blobs |
| `/api/article/{slug}` | GET | Fetch single article by slug |
| `/api/infographic` | POST | Generate single infographic |
| `/api/infographics/batch` | POST | Generate multiple infographics |
| `/api/usage` | GET | API usage statistics |
| `/api/health` | GET | Health check |

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

| Purpose | Model ID |
|---------|----------|
| **Article Text** | `claude-sonnet-4-20250514` or `claude-sonnet-4-5-20250929` |
| **Infographics** | `gemini-3-pro-image-preview` |

**Restrictions:**
- Never use `gemini-2.0-flash-exp` or other Gemini models for images
- Never use Claude for infographics
- Never use Gemini for article text

The Midnight Tech visual style only works correctly with `gemini-3-pro-image-preview`.

## Article JSON Schema

```json
{
  "key": "article_slug",
  "title": "Article Title",
  "cardTitle": "Short title for cards",
  "cardTag": "CATEGORY // SUBCATEGORY",
  "cardDescription": "One-line teaser",
  "chartConfigs": { "chart_main": { "type": "bar", "data": {}, "title": "..." } },
  "sources": [{ "name": "Source Name", "score": 95, "url": "https://..." }],
  "contextData": { "term": { "expanded": "Explanation" } },
  "citationDatabase": { "src1": { "domain": "...", "trustScore": 95 } },
  "content": "<p class='prose-text'>HTML content...</p>"
}
```

**Critical**: Sources MUST include `score` field (0-100) for sorting into Primary/Secondary/Tertiary tabs.

### Parent/Child Essays
- Parent articles: `childEssays: ['child_key']` array
- Child articles: `isChildEssay: true`, `parentEssay: 'parent_key'`
- Child essays are excluded from Trending section

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
- `ANTHROPIC_API_KEY` - Claude API key
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token
- `GOOGLE_AI_API_KEY` - Gemini API key (for infographics)

## Known Issues

1. **Vercel 60s timeout**: Long articles may truncate. `chartConfigs` placed first in schema to preserve charts.
2. **Article index**: If trending loads slowly, run `/api/admin/rebuild-index` to regenerate the index.

## Payment Tiers (Future Implementation)

When payment is implemented, concurrent generation limits will vary by tier:

| Tier | Concurrent Queries | Notes |
|------|-------------------|-------|
| **Free** | 1 | Basic access |
| **Basic** | 3 | Light users |
| **Pro** | 5 | Current default |
| **Enterprise** | Unlimited | Premium tier |

**Implementation Note**: The `MAX_CONCURRENT` constant in `submitQuickQuery()` (index.html ~line 8140) should be made dynamic based on user tier.

## User Preferences

- Dark mode by default
- Sources prioritized over AI analysis
- Professional, clean layouts
- Mobile-responsive design
- Minimal unnecessary features
