# GEMINI.md

This file provides guidance to Gemini when working with code in this repository.

---

## 🚨 MANDATORY VERIFICATION PROTOCOL (READ FIRST)

**BEFORE claiming ANYTHING is "fixed" or "working", you MUST:**

1. **Investigate First**
   - Use `browser_subagent` to check deployed site if issue is user-facing
   - Use `grep_search` to find all related code
   - Read the actual implementation, don't assume

2. **Understand the System**
   - How does this feature actually work?
   - What are ALL the files involved?
   - What could cause this specific symptom?

3. **Test Your Hypothesis**
   - Make the change
   - Verify on deployed site (for user-facing issues)
   - Check console for errors
   - Test the actual user flow

4. **Only Then Claim Success**
   - ❌ NEVER say: "Fixed" or "This should work now"
   - ✅ ALWAYS say: "Applied change - verified on [deployed site/local/tests]"
   - Include evidence (screenshot, console output, test results)

**If you skip ANY of these steps, you are LYING to the user.**

**CRITICAL QUESTIONS TO ASK YOURSELF:**
- Have I actually seen this working with my own tools?
- Did I check the deployed site, not just local code?
- Do I understand WHY this fix works, or am I guessing?
- Would I bet money that this actually fixes the user's problem?

**If the answer to any is "no", DO NOT claim it's fixed.**

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
   - **ID Management (UPDATED Dec 2025)**: Reports display in DESCENDING order.
     - First, find highest ID: `grep -o "id: [0-9]*" js/reports-data.js | sort -t: -k2 -n | tail -1`
     - New report ID = **highest ID + 1** (NOT id: 0)
     - Add new entry at TOP of the array
   - **Chart Object**: MUST include `chart` object for landing page preview.
   - **Validation**: Verify JSON syntax carefully with `node -c js/reports-data.js`.
3. **Run Validation**: BOTH `./validate-report.sh` AND `./validate-standards.sh` MUST pass.
4. **Visual Check**: Verify navbar, footer, and chart preview render correctly.
5. **Deploy**: Only after ALL validations pass.

> **See also:** `AGENT.md` for complete model-agnostic workflow instructions.

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

**CRITICAL: Use REAL Data from Report Charts**
- **NEVER use placeholder/generic data** like `[100, 95, 88, 82]`
- **ALWAYS extract actual data** from the first chart in the report
- Example: If report has chart with `data: [1, 8, 12, 24, 28]`, use that EXACT data
- This creates a "peek" preview showing what's actually inside the report

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

2. **CRITICAL ID MANAGEMENT (UPDATED Dec 2025):**
   - Reports display in **DESCENDING ID order** (highest ID = newest)
   - Find highest ID: `grep -o "id: [0-9]*" js/reports-data.js | sort -t: -k2 -n | tail -1`
   - New report ID = **highest existing ID + 1**
   - Add new entry at **TOP of array** in `js/reports-data.js`
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

---

## 📊 CHART.JS CONFIGURATION (LESSONS LEARNED - DEC 2025)

**Critical Issues Encountered:**

### **Issue 1: Invisible Chart Lines**
- **Problem**: Timeline chart appeared blank despite data being present
- **Root Cause**: `borderWidth` was `null` (Chart.js v3+ doesn't default to visible width)
- **Fix**: ALWAYS explicitly set `borderWidth: 2` (or appropriate value) for line charts

### **Issue 2: Invisible Chart Segments**
- **Problem**: Doughnut chart segment blended into dark background
- **Root Cause**: Used `#111827` (nearly black) on `#050A14` background
- **Fix**: Use colors with sufficient contrast - minimum `#64748b` for dark segments

### **Issue 3: Missing Axis Labels**
- **Problem**: Y-axis labels invisible or missing
- **Root Cause**: Missing `ticks: { color: '#cbd5e1' }` in scales configuration
- **Fix**: ALWAYS include tick colors in scales

### **Issue 4: Full-Width Charts Instead of Magazine-Style**
- **Problem**: Charts taking full article width instead of floating right
- **Root Cause**: Missing or incorrect `.chart-box` CSS
- **Fix**: Use this exact CSS:

```css
.chart-box {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 24px;
    margin: 20px 0;
    float: right;
    width: 450px;
    margin-left: 30px;
    transition: all 0.3s ease;
}

.chart-box:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
}

/* Clear floats after sections */
section::after {
    content: "";
    display: table;
    clear: both;
}
```

### **MANDATORY Chart.js v3+ Configuration Template:**

```javascript
new Chart(document.getElementById('chartId'), {
    type: 'line', // or 'bar', 'doughnut', etc.
    data: {
        labels: ['Label 1', 'Label 2'],
        datasets: [{
            label: 'Dataset Label',
            data: [10, 20],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2  // CRITICAL: Must be explicit
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: { labels: { color: '#cbd5e1' } },
            title: { display: true, text: 'Chart Title', color: '#fff' },
            watermark: { text: "GenuVerity" }
        },
        scales: {  // CRITICAL: Include for bar/line charts
            y: {
                beginAtZero: true,
                grid: { color: '#1e293b' },
                ticks: { color: '#cbd5e1' }  // CRITICAL
            },
            x: {
                grid: { display: false },
                ticks: { color: '#cbd5e1' }  // CRITICAL
            }
        }
    }
});
```

### **Color Contrast Requirements:**
- **Minimum contrast on dark background**: `#64748b` or lighter
- **Avoid**: `#111827`, `#0a0f1a`, `#050A14` (too dark)
- **Safe colors**: `#3b82f6` (blue), `#10b981` (green), `#f59e0b` (amber), `#ef4444` (red), `#64748b` (slate)

### **Pre-Deployment Checklist for Charts:**
```
□ borderWidth explicitly set (line charts)
□ All colors have sufficient contrast
□ Tick colors set in scales (bar/line charts)
□ .chart-box CSS includes float: right and width: 450px
□ section::after clearfix present
□ Watermark plugin included
□ Test in browser before claiming "fixed"
```

---

## 📊 CHART SPACING FOR VISUAL BALANCE (CRITICAL)

**Lesson Learned: December 2025 - Project 2025 Report**

Long reports (5,000+ words, 8+ sections) need **multiple charts** distributed throughout to avoid "wall of text" fatigue.

### **Chart Spacing Guidelines:**

**For reports with 8 sections:**
- **Minimum 3-5 charts** distributed every 1-2 sections
- **NO long stretches** (3+ sections) without visual breaks
- Charts should illustrate data mentioned in nearby text

**Chart Placement Strategy:**
1. Place first chart after opening sections (Section 1-2)
2. Add charts after data-heavy sections (veteran stats, timelines, comparisons)
3. Distribute evenly - check final output for balance

**Chart Style Requirements:**
- **ALWAYS** use: `style="float: right; width: 450px; margin-left: 30px;"`
- This creates magazine-style text wrapping
- Charts float right, text wraps around left side

**Example Distribution (8-section report):**
```
Section 1: Intro + Chart 1 (line/bar)
Section 2: Context
Section 3: Data Analysis + Chart 2 (doughnut) + Chart 3 (bar)
Section 4: Technical Details + Chart 4 (line/timeline)
Section 5: Historical Context + Chart 5 (bar)
Section 6: Legal Analysis
Section 7: Projections
Section 8: Conclusion
```

**Chart Type Selection:**
- **Line charts**: Trends over time, search volume, timeline progression
- **Bar charts**: Comparisons, percentages by category, rankings
- **Doughnut charts**: Percentage splits (veterans vs civilians, etc.)
- **Horizontal bar charts**: Rankings, comparative values

### **Chart Code Template:**
```html
<div class="chart-wrapper copyable-section" id="chartId-wrapper" style="float: right; width: 450px; margin-left: 30px;">
    <div class="chart-header">
        <div class="chart-title">Chart Title</div>
    </div>
    <canvas id="chartId" height="300"></canvas>
</div>
```

### **Chart.js Configuration Must Include:**
- Explicit `borderWidth: 2` (for line/bar charts)
- Tick colors: `ticks: { color: '#cbd5e1' }`
- Watermark: `watermark: { text: "GenuVerity" }`
- Proper contrast colors (see Color Contrast Requirements above)

**CRITICAL: Plan charts BEFORE writing content**
- Review research data for chart opportunities
- Identify 3-5 key visualizations
- Place chart HTML early, fill content around it

