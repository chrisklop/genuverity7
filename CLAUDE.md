# CLAUDE.md

This file provides guidance to Claude Code when working with this repository. **Read this entirely before starting any work.**

## Session Continuity

**IMPORTANT FOR NEW SESSIONS**: This project has active development context. Before making changes:
1. Check `docs/SESSION_STATE.md` for current work-in-progress
2. Review recent git commits: `git log --oneline -10`
3. Ask user about current priorities

## Project Overview

**GenuVerity** is an AI-powered investigative journalism platform. It generates data-driven exposé articles with:
- **Sources First** philosophy: Primary sources displayed ABOVE content
- Tabbed source navigation (Primary/Secondary/Tertiary)
- Interactive charts and visualizations
- Collapsible source panel with floating restore button

**Live URL**: https://genuverity7.vercel.app

## Quick Reference

| Command | Purpose |
|---------|---------|
| `vercel --prod` | Deploy to production |
| `python server.py` | Local dev server (port 8000) |
| `vercel logs genuverity7.vercel.app` | View production logs |

## Architecture

### Backend (`api/index.py`)
- **Framework**: FastAPI + Uvicorn
- **AI Model**: Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`)
- **Storage**: Vercel Blob Storage for article cache
- **Key constant**: `ARTICLE_TEMPLATE` (line ~470) - controls AI generation schema

**Endpoints**:
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/generate` | POST | Generate new article (SSE streaming) |
| `/api/deep-dive` | POST | Generate deep-dive with rate limiting |
| `/api/cache/check` | POST | Check if article exists in cache |
| `/api/cache/list` | GET | List all cached articles |
| `/api/infographic` | POST | Generate Gemini 3 Pro infographic |
| `/api/infographics/batch` | POST | Generate multiple infographics |
| `/api/generate-gemini` | POST | Full Gemini 3 pipeline (article + infographics) |

### Frontend (`index.html`)
Single-page app with three views:
- **Portal** (`view-portal`): Landing page with trending articles
- **Report** (`view-report`): Article display with Sources First banner
- **Static** (`view-static`): Auxiliary content pages

**Key Functions**:
| Function | Location | Purpose |
|----------|----------|---------|
| `renderReportData()` | ~line 3750 | Renders article + Sources First tabs |
| `toggleSourcesBanner()` | ~line 3692 | Collapse/expand Sources First |
| `switchView()` | ~line 3681 | Navigate between views |
| `renderDynamicCharts()` | ~line 3500 | Initialize Chart.js visualizations |

### Layout System (Current State)
- **Single-column layout**: 720px max-width, centered
- **NO sidebar** - removed Dec 2024
- **Sources First banner**: Tabbed, collapsible, above article title
- **Floating button**: Appears when Sources First is collapsed

## Sources First Feature (v2)

All sources displayed in tabbed banner ABOVE article title:

```
+------------------------------------------+
|  [Shield] SOURCES FIRST      [Minimize]  |
|  "We encourage you to verify..."         |
|  [Primary|4] [Secondary|4] [Tertiary|2]  |
|  +--------+ +--------+                   |
|  | Source | | Source |  (4 per tab)     |
|  +--------+ +--------+                   |
|  "These are the most credible sources"   |
+------------------------------------------+
|                                          |
|  ARTICLE TITLE                           |
|  Article content...                      |
+------------------------------------------+
```

**Tab Names**: Primary, Secondary, Tertiary, Quaternary (4 sources each)

**Collapse Behavior**:
- Click "Minimize" to collapse banner
- Floating "Sources (N)" button appears at top
- Click floating button to expand

## Color/Theme System

### Current State (Implemented Dec 2024)
**Dark/Light only** with Radix Colors-inspired WCAG-compliant palette.

**CSS Variables** (Dark mode - default):
```css
--bg-deep: #111113      /* Radix slate-1: app background */
--bg-card: #18191b      /* slate-2: subtle background */
--bg-elevated: #212225  /* slate-3: UI element background */
--text-main: #edeef0    /* slate-12: high contrast text */
--text-muted: #9ba1a6   /* slate-11: low contrast text */
--text-prose: #b0b4ba   /* body text */
--accent-blue: #3e63dd  /* Radix blue-9 */
--accent-green: #30a46c /* Radix green-9 */
--accent-warm: #f76b15  /* Radix orange-9 */
```

**Light mode** (activated by toggle or system preference):
```css
--bg-deep: #fbfcfd
--bg-card: #ffffff
--text-main: #1c2024
--text-muted: #60646c
/* Same accent colors */
```

### Theme Toggle
- **Location**: Nav bar button with sun/moon icons
- **Behavior**: Click to toggle, press T keyboard shortcut
- **Persistence**: Saves to `localStorage.genuverity-theme`
- **System preference**: Auto-detects via `prefers-color-scheme` media query

### WCAG Compliance
- Normal text: 4.5:1 contrast ratio (meets AA)
- Large text: 3:1 contrast ratio (meets AA)
- All colors verified against Radix Colors accessibility guidelines

## Article JSON Schema

Generated articles must include:
```json
{
  "key": "article_slug",
  "title": "Article Title",
  "cardTitle": "Short title for cards",
  "cardTag": "CATEGORY // SUBCATEGORY",
  "cardDescription": "One-line teaser",
  "chartConfigs": {
    "chart_main": { "type": "bar", "data": {...}, "title": "..." },
    "chart_secondary": { "type": "line", "data": {...}, "title": "..." }
  },
  "sources": [
    { "name": "Source Name", "score": 95, "url": "https://..." }
  ],
  "contextData": { "term": { "expanded": "Explanation" } },
  "citationDatabase": { "src1": { "domain": "...", "trustScore": 95, ... } },
  "content": "<p class='prose-text'>HTML content...</p>"
}
```

**CRITICAL**: Sources MUST include `score` field (0-100) for sorting in tabs.

## Content HTML Classes

| Class | Purpose |
|-------|---------|
| `.prose-text` | Body paragraphs |
| `.prose-h2` | Section headings |
| `.float-figure.right/left` | Magazine-style wrapped charts |
| `.living-number` | Animated counters (data-target, data-suffix) |
| `.fractal-trigger` | Expandable context terms |
| `.citation-spade` | Source hover cards |
| `.highlight-glow` | Emphasized text |

## Known Issues / Technical Debt

1. **Vercel 60s timeout**: Long articles may truncate. `chartConfigs` placed first in schema to preserve charts.
2. **12 themes unused**: Users primarily want dark/light. Consider simplifying.
3. **WCAG contrast**: Some color combinations may not meet AA standards.

## Gemini 3 Pro Pipeline

The platform uses **Gemini 3 Pro** for a complete AI pipeline:

### Model Configuration

```python
# Model settings in api/index.py
GEMINI_TEXT_MODEL = "gemini-3-pro-preview"        # Article text generation
GEMINI_IMAGE_MODEL = "gemini-3-pro-image-preview" # Infographic generation
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models"
USE_GEMINI_FOR_ARTICLES = True  # Feature flag
```

### API Request Format

```python
{
    "contents": [{
        "role": "user",
        "parts": [{"text": prompt}]
    }],
    "generationConfig": {
        "responseModalities": ["TEXT", "IMAGE"],
        "temperature": 0.4,
        "imageConfig": {
            "aspectRatio": "16:9",  # Wide format for data visualizations
            "imageSize": "1K"       # Options: 1K, 2K, 4K
        }
    }
}
```

### Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/infographic` | POST | Generate single infographic |
| `/api/infographics/batch` | POST | Generate multiple infographics |

### Image Config Options

- **aspectRatio**: `"1:1"`, `"3:4"`, `"4:3"`, `"9:16"`, `"16:9"`
- **imageSize**: `"1K"` (1024px), `"2K"` (2048px), `"4K"` (4096px)

### Rate Limiting

Multiple API keys configured for rotation on 429 errors. Keys checked in order until one succeeds.

## Environment Variables

Required in `.env.local` or Vercel dashboard:
- `ANTHROPIC_API_KEY` - Claude API key
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token
- `GEMINI_API_KEY` - Gemini API key for infographic generation

## Deployment

```bash
# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs genuverity7.vercel.app --limit 50
```

## File Structure

```
GenuVerity7/
├── api/
│   └── index.py          # FastAPI backend (main logic)
├── templates/
│   └── essay_config.json # Template configuration
├── article_cache/        # Local cache (dev only)
├── docs/
│   └── SESSION_STATE.md  # Current work state (if exists)
├── index.html            # Full frontend SPA
├── CLAUDE.md             # This file
├── requirements.txt      # Python dependencies
└── vercel.json           # Vercel config
```

## User Preferences

The user prefers:
- Dark mode by default
- Sources prioritized over AI analysis
- Professional, clean layouts
- Mobile-responsive design
- Minimal unnecessary features
