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

□ Visuals (Infographics/Diagrams): Claude generates using Chart.js/D3/Mermaid (NO Gemini image generation)
```

**Shorthand triggers:**
- `[TEMPLATE]` = Read and follow docs/templates.md
- `[INFOGRAPHIC]` = Use gemini-3-pro-image-preview + GenuVerity branding
- `[REPORT]` = Full report generation following all templates
- **VALIDATION**: All HTML output MUST pass `./validate-report.sh` (Interactive citations, Copy buttons, etc.)

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
- `index.html` (UNLESS EXPLICITLY REQUESTED BY USER)
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
| **Bar/Line/Pie charts** | Chart.js (via Claude) | Interactive, fast, auto-watermark |
| **Data comparisons** | Chart.js (via Claude) | In-page, responsive |
| **Flowcharts/Diagrams** | Mermaid/D3 (via Claude) | Maintainable code, consistent style |
| **Process diagrams** | Mermaid/D3 (via Claude) | Boxes, arrows, flow |
| **Infographics** | Chart.js/D3 (via Claude) | No image generation hallucinations |
| **Network graphs** | D3.js (via Claude) | Interactive, data-driven |

**CRITICAL: DO NOT USE GEMINI IMAGE GENERATION.**
All visuals must be generated as code (Chart.js, D3, Mermaid) by the Claude agent.

## ⚠️ REPORT CONVERSION FIDELITY (LESSONS LEARNED)
**When converting source Markdown (report1.md) to HTML:**
1. **Source Parity**: If source lists 28 citations, HTML grid MUST contain 28 cards. NO truncation.
2. **Label Precision**: The valid label is "Sources First" (never "Primary Sources Verified").
3. **Data Tables**: Preserve ALL tabular data. Use `.data-table` class. Do not flatten tables into text.
4. **No Shallow Summaries**: Retain deep technical specs (e.g., KVM, Raspberry Pi), case studies (names/dates), and financial metrics. The user expects "Deep Dive Dossiers", not light blogs.
5. **Infographic Paths**: Use relative paths `images/` for any existing assets, but prefer code-generated visuals.

---

## ⚠️ DEPLOYMENT RULES (CRITICAL)
- **NEVER** run `vercel --prod` or `vercel deploy`.
- After pushing to git, GitHub auto-deploys.
- Stay in your lane (only edit `localreports/` and `js/reports-data.js`).

## 📜 REPORT GENERATION WORKFLOW (MANDATORY)

**To add a new report:**

1. **START FROM GOLDEN TEMPLATE:**
   - Run: `cp docs/report-template-2025.html localreports/your-report-slug.html`
   - **NEVER** write HTML from scratch.
   - **NEVER** copy an old report (it may have legacy bugs).
   - Use the 2025 Golden Template.

2. **CRITICAL ID MANAGEMENT:**
   - New reports go at ID 0 (top of array) in `js/reports-data.js`
   - Manually increment ALL existing IDs by +1
   - **NEVER use automation** (perl/sed/regex) - causes duplicate `id:` keys
   - **ALWAYS verify** with: `node -c js/reports-data.js` before commit

3. **Content Injection:**
   - **Dynamic Length:** The `.article-content` and `.sources-sidebar` areas are designed to expand infinitely.
   - **Structure:** Use `<h2 class="prose-h2">` for sections. You can add 10, 50, or 100 sections; the layout handles strict vertical flow automatically.
   - **Visuals:** Inject `<figure class="float-figure copyable-section">` blocks between paragraphs.

4. **Validation:**
   - Run: `./validate-report.sh localreports/your-report.html`

5. **Commit:**
   - `git add ...` and `git commit`.
