# GEMINI.md

This file provides guidance to Gemini when working with code in this repository.

---

## ⚠️ PRE-FLIGHT CHECKLIST (MANDATORY)

**Before generating ANY content, run this checklist:**

```
□ READ docs/templates.md FIRST
□ Infographics: gemini-3-pro-image-preview ONLY (never gemini-2.0-flash)
□ Infographics: GenuVerity branding in bottom-right (Genu=white, Verity=blue)
□ Article text: Claude models only (never Gemini for text) - If tasked with writing, STOP and ask for Claude.
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

**Two agents may run concurrently on this project. Each has strict boundaries.**

### Instance Identification
| If user mentions... | You are... |
|---------------------|------------|
| infographic, image generation, design | **Design/Infographics Agent** |
| reports, html generation | **Reports Agent** |

### Reports/Design Agent - Git Boundaries (HARDCODED)
**ONLY commit/push these paths:**
- `localreports/*` (all report HTML files)
- `js/reports-data.js` (report metadata - shared source of truth)

**NEVER commit/push:**
- `api/*`
- `index.html`
- `reports.html`
- `js/*` (except reports-data.js)
- `server.py`

### Workflow: Adding a New Report
1. **Create HTML**: `localreports/your-report-slug.html` using the template.
2. **Update Metadata**: Add entry to `REPORTS_DATA` in `js/reports-data.js`.
   - **ID Management**: Newest report gets `id: 0`. Increment ALL other IDs by +1.
   - **Validation**: Verify JSON syntax carefully.

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

---

## Key Documentation

| Document | Purpose |
|----------|---------|
| `docs/template.md` | Complete HTML/CSS/JS code snippets for reports |
| `docs/templates.md` | Comprehensive templates for EVERYTHING |
| `CLAUDE.md` | Primary detailed rules (reference if unsure) |

## Visual Elements Decision Tree (Gemini Specific)

**FIRST: Decide which tool to use for any visual:**

| Visual Type | Tool | Why |
|-------------|------|-----|
| **Bar/Line/Pie charts** | Chart.js | Interactive, fast, auto-watermark |
| **Data comparisons** | Chart.js | In-page, responsive |
| **Flowcharts/Diagrams** | **Gemini 3 Pro** | Complex visual layout |
| **Process diagrams** | **Gemini 3 Pro** | Boxes, arrows, flow |
| **Infographics** | **Gemini 3 Pro** | Standalone shareable image |
| **Network graphs** | D3.js or Gemini | Depends on interactivity needs |

### Gemini Infographic Prompt Template
**Model:** `gemini-3-pro-image-preview` ONLY

**Midnight Tech Style Prompt:**
```
Theme: "Midnight Tech" HUD style
Background: Dark navy gradient (#050A14 to #0a0a12) with faint circuit grid
Colors: Blue #3b82f6, Cyan #06b6d4, Green #10b981, Amber #f59e0b, Red #FF2A2A
NO PURPLE (#8b5cf6) anywhere
Branding: "GenuVerity" wordmark bottom-right (Genu=white, Verity=blue)
Format: 16:9 aspect ratio
```

---

## ⚠️ DEPLOYMENT RULES (CRITICAL)
- **NEVER** run `vercel --prod` or `vercel deploy`.
- After pushing to git, GitHub auto-deploys.
- Stay in your lane (only edit `localreports/` and `js/reports-data.js`).
