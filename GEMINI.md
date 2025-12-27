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
- **VALIDATION**: All HTML output MUST pass `./validate-report.sh` AND `./validate-standards.sh`
- **TEMPLATE SOURCE**: ALWAYS use `docs/report-template-2025.html` (NEVER copy from existing reports)

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
1. **Create HTML**: `localreports/your-report-slug.html` from `docs/report-template-2025.html` (NEVER copy old reports).
2. **Update Metadata**: Add entry to `REPORTS_DATA` in `js/reports-data.js`.
   - **ID Management**: Newest report gets `id: 0`. Increment ALL other IDs by +1 (MANUALLY, no automation).
   - **Chart Object**: MUST include `chart` object for landing page preview.
   - **Validation**: Verify JSON syntax carefully with `node -c js/reports-data.js`.
3. **Run Validation**: BOTH `./validate-report.sh` AND `./validate-standards.sh` MUST pass.
4. **Visual Check**: Verify navbar, footer, and chart preview render correctly.
5. **Deploy**: Only after ALL validations pass.

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

**The "Gemini -> Claude Persona" Pipeline:**

1.  **STEP 1: GEMINI (Browser/Research)**
    *   **User Action**: Prompt Gemini (browser) for "Deep Research" on the topic.
    *   **Output**: Raw text, 30-50+ citations, key data points.
    *   **Role**: *The Librarian / Investigator.*

2.  **STEP 2: CLAUDE PERSONA (The Builder)**
    *   **User Action**: Feed the raw research to the Agent (acting as Claude).
    *   **Prompt**: "Build the Deep Dive Dossier using the Mega-Expansion Protocol."
    *   **Role**: *The Editor-in-Chief / Architect.*
    *   **Output**: The final 5,000+ word HTML file with high-fidelity UI.

**Implementation Steps:**

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

3. **Content Injection (THE MEGA-EXPANSION):**
   - **Density**: Target ~500 words per section.
   - **Structure**: Use `<div class="chart-box copyable-section">` for all visuals.
   - **Context**: If a section feels light, HALT and expand it with historical data.

4. **Validation:**
   - Run: `./validate-report.sh localreports/your-report.html`

5. **Commit:**
   - `git add ...` and `git commit`.

---

## 🎨 CSS/UI DEBUGGING PROTOCOL (CRITICAL)

**Lesson Learned: December 2025 - Navbar Search Width Issue**

When debugging CSS/layout issues, ALWAYS follow this protocol to avoid wasting time and user costs:

### **MANDATORY FIRST STEP: Browser Inspection**
- **NEVER** attempt CSS fixes based on code review alone
- **ALWAYS** use `browser_subagent` to inspect computed styles FIRST
- Get the actual rendered values, not what you think should be applied

### **What to Check in Browser:**
1. **Computed width/height** - what's actually rendered
2. **All CSS rules** - which file/line is "winning"
3. **Specificity conflicts** - `!important`, inline styles, cascade order
4. **Hidden constraints** - `max-width`, `min-width`, `flex-basis`, grid constraints
5. **Parent containers** - grid/flexbox that might constrain children

### **Common CSS Gotchas:**
- `max-width` overrides `width` (even with `!important` on width)
- Inline `<style>` tags load AFTER external CSS files
- Mobile media queries can apply to desktop if not properly scoped
- CSS Grid `1fr` can constrain children even with explicit widths
- Multiple CSS files can have duplicate selectors

### **Communication Rules:**
- ❌ **NEVER say**: "Fixed" or "This should work now"
- ✅ **ALWAYS say**: "Applied change - please verify in browser"
- ✅ **BETTER**: "Browser inspection shows X, applied Y - please verify"

### **Verification Before Claiming Success:**
- Use browser subagent to verify the fix worked, OR
- Explicitly ask user to verify, OR
- **NEVER** claim something is "fixed" without evidence

### **Example Workflow:**
```
1. User reports: "Search bar is narrower than dropdown"
2. Use browser_subagent to inspect both elements
3. Identify: max-width: 320px is constraining search bar
4. Fix: Change max-width to 500px
5. Verify: Use browser_subagent to confirm both are now 500px
6. Report: "Changed max-width from 320px to 500px - please verify"
```

**This protocol is MANDATORY for all CSS/UI work. No exceptions.**

