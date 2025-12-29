# AGENT.md

**Master instructions for AI agents working on GenuVerity**
*Model-agnostic: Works with Claude, Gemini, or any capable model*

---

## 🚨 VERIFICATION PROTOCOL (READ FIRST)

**BEFORE claiming ANYTHING is "fixed" or "working":**

1. **Investigate First**
   - Use `browser_subagent` to check deployed site for user-facing issues
   - Use `grep_search` to find all related code
   - Read the actual implementation, don't assume

2. **Understand the System**
   - What are ALL the files involved?
   - What could cause this specific symptom?

3. **Verify, Then Claim Success**
   - ✅ "Applied change - verified on [deployed site/local/tests]"
   - ❌ NEVER say "Fixed" or "This should work now" without evidence

---

## 📋 REPORT GENERATION (SINGLE-MODEL WORKFLOW)

As proven in December 2025, a single capable model (e.g., Claude Opus 4.5 Thinking) can handle the entire workflow:

### Step 1: Research

**FIRST: Data Commons Check**
Ask yourself: "Could Data Commons provide verified statistics for this topic?"
- Economic data (unemployment, inflation, GDP) → YES
- Health data (COVID deaths, vaccination rates) → YES
- Demographics (population, income, census) → YES
- Political opinions, qualitative claims → NO

**If YES, query Data Commons FIRST:**
```bash
# Structured API (specific variables)
python3 tools/dc-query.py UnemploymentRate_Person country/USA

# Natural Language API (exploratory)
python3 tools/dc-query.py --nl "What is the unemployment rate in the United States?"
```

**Then: Web Search for Context**
```
Gather 30+ additional sources:
- Prioritize: .gov, peer-reviewed, institutional
- NO Wikipedia - find primary sources it cites
- Note dates for time-sensitive data
```

### Step 2: Create Report
```bash
# Start from Golden Template (NEVER copy old reports)
cp docs/report-template-2025.html localreports/your-report-slug.html

# Target: 5,000+ words, 30+ sources, 4-5 Chart.js visualizations
```

### Step 3: Update Registry (CRITICAL ID MANAGEMENT)

**BEFORE adding to `js/reports-data.js`, run these commands:**
```bash
# Check total report count
grep -c "id:" js/reports-data.js

# Find highest existing ID
grep -o "id: [0-9]*" js/reports-data.js | sort -t: -k2 -n | tail -1
```

**ID Rules (Updated Dec 2025):**
- Reports display in **descending ID order** (highest ID = newest)
- New report ID = **highest existing ID + 1**
- Add new entry at **TOP of array** in `js/reports-data.js`
- Example: If highest ID is 52, new report gets ID 53

**Chart Object (Required for landing page preview):**
```javascript
chart: {
    type: "bar",        // line, bar, donut, network, hbar, timeline
    color: "#ef4444",   // Use data from first chart in report
    data: [95, 20]      // REAL data, not placeholder
}
```

### Step 4: Validate
```bash
node -c js/reports-data.js                    # JS syntax check
./validate-report.sh localreports/report.html  # Structure check
```

### Step 5: Browser Verify
Use `browser_subagent` to confirm:
- Charts render correctly
- No JS console errors
- Source count matches
- TL;DR verdict displays

### Step 6: Commit (Boundaries Enforced)
```bash
# ONLY commit these files:
git add localreports/your-report.html js/reports-data.js
git commit -m "Add [Report Name] (ID X, Y sources, Z charts)"
git push
```

**NEVER commit:** `api/*`, `index.html`, `reports.html`, `js/*` (except reports-data.js), `server.py`

---

## 🎨 CSS/UI DEBUGGING PROTOCOL

**Step 1: Browser Inspection FIRST**
- Use `browser_subagent` to get computed styles
- Never guess based on code review alone

**Step 2: Check for:**
- `max-width` / `min-width` (overrides `width`)
- Parent grid/flexbox constraints
- Inline styles (highest specificity)
- Multiple CSS files with duplicate selectors

**Step 3: Verify Fix**
- Use browser to confirm fix worked
- Or explicitly ask user to verify

---

## 📊 CHART.JS REQUIREMENTS

**Always include:**
```javascript
borderWidth: 2,                    // Explicit (Chart.js v3+ doesn't default)
ticks: { color: '#cbd5e1' },       // Visible axis labels
grid: { color: '#1e293b' },        // Subtle grid lines
```

**Colors with sufficient contrast:**
- Safe: `#3b82f6` (blue), `#10b981` (green), `#f59e0b` (amber), `#ef4444` (red)
- Avoid on dark backgrounds: `#111827`, `#0a0f1a`

**Magazine-style floated charts:**
```css
.chart-wrapper {
    float: right;
    width: 450px;
    margin: 0 0 20px 30px;
}
```

---

## ⚠️ DEPLOYMENT

- **Auto-deploy**: Push to git → GitHub deploys automatically
- **NEVER run**: `vercel --prod` or `vercel deploy`
- **Feature branch**: `feature/report-styling-standardization`

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `docs/report-template-2025.html` | Golden Template - ALWAYS start here |
| `js/reports-data.js` | Report registry (ID, title, slug, chart) |
| `css/reports.css` | Centralized report styles |
| `js/chart-defaults.js` | Chart.js configuration |
| `./validate-report.sh` | HTML structure validator |

---

## 🔧 MCP Integrations & Tools

| Tool | Purpose | Status |
|------|---------|--------|
| `tools/dc-query.py` | Query Data Commons (V1 Public API) | ✅ Active (Fallback mode) |
| `datacommons` | MCP Server | ⚠️ Auth Failed (Needs Key Fix) |

### Using Data Commons Tool

**Two APIs Available:**

**1. Structured V2 API (Specific Variables)**
```bash
python3 tools/dc-query.py [Variable] [Entity]
```
Examples:
```bash
python3 tools/dc-query.py UnemploymentRate_Person country/USA
python3 tools/dc-query.py Count_Person country/USA
python3 tools/dc-query.py Median_Income_Person country/USA
python3 tools/dc-query.py CumulativeCount_Vaccine_COVID_19_Administered country/USA
```

**2. Natural Language API (Exploratory)**
```bash
python3 tools/dc-query.py --nl "Your question here"
```
Examples:
```bash
python3 tools/dc-query.py --nl "What is the unemployment rate in the United States?"
python3 tools/dc-query.py --nl "Show me COVID-19 deaths in California"
python3 tools/dc-query.py --nl "What is the median income in Texas?"
```

**When to Use Which:**
- **Structured API**: When you know exact variable names, need time-series data for charts
- **NL API**: When exploring available data, unsure of variable names, or comparing entities

*Both APIs use the same `DC_API_KEY` from `.env`*

---

*Last Updated: December 28, 2025 - After vaccine-autism report success*
