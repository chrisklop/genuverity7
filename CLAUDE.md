# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GenuVerity is an AI-powered investigative journalism platform that generates data-driven exposé articles. It features a FastAPI backend using Google's Gemini AI and a single-page HTML/JavaScript frontend with magazine-style layouts and interactive data visualizations.

## Development Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Run the development server (serves both API and frontend)
python server.py

# Or with uvicorn directly (enables hot reload)
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

The app runs at http://localhost:8000

## Architecture

### Backend (server.py)

- **Framework**: FastAPI with Uvicorn ASGI server
- **AI Model**: Gemini 3 Pro (`gemini-3-pro-preview`)
- **Single endpoint**: `POST /api/generate` accepts `{"topic": "string"}`, returns JSON report
- Loads `docs/essay_schema.md` at runtime to guide AI generation
- Serves static files from root directory (frontend)
- Requires `GEMINI_API_KEY` in `.env` file

### Frontend (index.html)

Single-page application with three view states managed by `switchView()`:
- **Portal**: Archive landing with trending report cards
- **Report**: Full article display with sources panel
- **Static**: Additional content views

**Tech Stack**:
- Tailwind CSS (CDN) for styling
- Chart.js + Plotly.js (CDN) for visualizations
- Plus Jakarta Sans, JetBrains Mono, Crimson Pro fonts

**Key Data Structures**:
- `reports` object: All report content keyed by slug (e.g., `'ai_bubble'`, `'congress_trading'`)
- `contextData` object: Fractal trigger expansion content
- `citationDatabase` object: Source verification hover card data

### Content Schema

Reports follow a JSON structure with HTML content containing:
- `<div class="float-figure right/left">`: Magazine-style text wrapping (place BEFORE paragraph)
- `<span class="living-number" data-target="X" data-suffix="Y">`: Animated counters
- `<strong class="fractal-trigger" onclick="expandContext(this, 'key')">`: Expandable context
- `<span class="citation-spade" data-id="source_key">♠</span>`: Hover verification cards
- `<span class="highlight-glow">`: Emphasized text

See `docs/essay_schema.md` for full component documentation.

## Key Functions

| Function | Purpose |
|----------|---------|
| `switchView(view)` | Toggle between 'portal', 'report', 'static' views |
| `loadReport(key)` | Load report from `reports` object, render content and charts |
| `renderCharts(type)` | Initialize Chart.js/Plotly visualizations by report type |
| `expandContext(element, id)` | Toggle fractal context expansion inline |
| `generateReport(topic)` | Call `/api/generate` and load new AI-generated report |

## Chart Types

The `renderCharts(type)` function handles visualization based on report type:
- `'ai'`: CapEx bar chart, line trends, Plotly scatter
- `'congress'`: Trading performance bar, allocation doughnut
- `'grift'`: PAC spending pie, allocation bar
- `'regulatory'`: Enforcement bar charts
- `'energy'`: Demand bar, timeline line chart
- `'model'`: Quality degradation line chart
- `'none'`: No charts rendered

## CSS Architecture

Dark theme using CSS variables:
```css
--bg-deep: #050505
--text-main: #e2e2e5
--accent-blue: #3b82f6
--accent-green: #10b981
--glass: rgba(20, 20, 25, 0.98)
```

Key classes: `.prose-text`, `.prose-h2`, `.float-figure`, `.fractal-trigger`, `.citation-spade`, `.highlight-glow`

## Request/Response Flow

```
Frontend                    Backend                     Gemini AI
   |                           |                            |
   |-- POST /api/generate ---->|                            |
   |   {"topic": "..."}        |-- Load essay_schema.md     |
   |                           |-- Compose prompt --------->|
   |                           |<-- Generated content ------|
   |<-- JSON report -----------|                            |
   |                           |                            |
   |-- loadReport(key) --------|                            |
   |-- renderCharts(type) -----|                            |
```
