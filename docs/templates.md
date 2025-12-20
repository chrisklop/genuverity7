# GenuVerity Templates

This document contains standardized templates for all AI-generated content. Following these templates exactly minimizes API costs by reducing regeneration attempts.

---

## Table of Contents

1. [Infographic Generation Template](#infographic-generation-template)
2. [Content Report Template](#content-report-template)
3. [Source Citation Standards](#source-citation-standards)
4. [Data Freshness Requirements](#data-freshness-requirements)
5. [Chart.js Configuration Template](#chartjs-configuration-template)

---

## Chart Generation Decision Tree

**FIRST: Decide which tool to use:**

| Scenario | Tool | Branding |
|----------|------|----------|
| **Interactive chart in HTML report** | Chart.js | Auto (watermark plugin) |
| **Standalone image for sharing** | Gemini 3 Pro | Manual (in prompt) |
| **Complex flowchart/diagram** | Gemini 3 Pro | Manual (in prompt) |
| **Process visualization** | Gemini 3 Pro | Manual (in prompt) |
| **Simple bar/line/pie in report** | Chart.js | Auto (watermark plugin) |

**Default: Use Chart.js for in-page charts** - it's interactive, faster, and the watermark plugin handles branding automatically.

**Use Gemini only when:** You need a standalone shareable image, complex flowcharts, or visual elements that Chart.js can't render.

---

## Standalone Infographic Template (Gemini)

**Model**: `gemini-3-pro-image-preview` (ONLY this model - never use other Gemini models for images)

### Base Prompt Structure

```
**ROLE:** Expert Information Designer for GenuVerity (Cyber-Intelligence Fact-Checking).

**STYLE PARAMETERS (STRICT):**
- **Theme:** "Midnight Tech" HUD style
- **Background:** Dark navy gradient (#050A14 to #0a0a12) with faint circuit grid overlay (#1e3a5f at 3% opacity)
- **Lighting:** Neon glow effects on all charts and containers. High contrast.
- **Colors:**
  - Primary accent: Electric Blue #3b82f6
  - Secondary accent: Cyan #06b6d4
  - Negative/False/Danger: Red #FF2A2A
  - Warning/Mixed: Amber #f59e0b / #FF9900
  - Positive/True/Success: Green #10b981 / #00FF88
  - Neutral: Electric Blue #0088FF
  - Text Primary: White #FFFFFF
  - Text Secondary: Steel Grey #AABBCC
- **NO PURPLE COLORS** - Never use #8b5cf6 or similar purples anywhere

**CONTENT TO GENERATE:**
[INSERT SPECIFIC CONTENT - title, data, structure]

**MANDATORY BRANDING (STRICT - FOLLOW EXACTLY):**
- Place the logo "GenuVerity" in the bottom right corner.
- Format: WORDMARK ONLY - no shield, no "G" icon, no symbols to the LEFT of the text.
- The logo must start immediately with the white letter "G" in "Genu".
- "Genu" must be White (#FFFFFF).
- "Verity" must be Electric Blue (#3B82F6).
- Optional: small "connected dots" network icon (3 dots connected by thin lines) ONLY to the RIGHT of "Verity", never to the left.
- The logo should have subtle glow effect matching the Midnight Tech theme.

**FORMAT:** 16:9 Aspect Ratio (1200x800 pixels recommended). High Resolution.
```

### Infographic Type Templates

#### Flowchart/Process Diagram
```
**CONTENT TO GENERATE:**
Create a professional flowchart infographic titled "[TITLE]"

Structure with labeled boxes and glowing connection arrows:
1. [BOX NAME] (border color) - [list items]
2. [BOX NAME] (border color) - [list items]
...

FLOW ARROWS:
- [Source] -> [Target] (glow color)
- [Source] -> [Target] (glow color)

Border color guide:
- Cyan (#06b6d4): Primary data sources, inputs
- Amber (#f59e0b): Warnings, triggers, caution items
- Red (#FF2A2A): Negative effects, dangers, alerts
- Green (#10b981): Positive outcomes, solutions, responses
- Blue (#3b82f6): Neutral information, processes
```

#### Data Comparison Chart
```
**CONTENT TO GENERATE:**
Create a data comparison infographic titled "[TITLE]"

Display as [bar chart / horizontal bars / comparison cards]:
- [Item 1]: [Value] (color based on sentiment)
- [Item 2]: [Value] (color based on sentiment)
...

Include visual indicators:
- Trend arrows where applicable
- Percentage labels
- Source attribution in small text at bottom
```

#### Timeline Infographic
```
**CONTENT TO GENERATE:**
Create a horizontal timeline infographic titled "[TITLE]"

Timeline entries (left to right, chronological):
- [DATE]: [Event] (icon, color)
- [DATE]: [Event] (icon, color)
...

Visual style:
- Central timeline line with cyan glow
- Event nodes as glowing circles
- Brief text labels below each node
- Color-code events by category
```

### Common Mistakes to Avoid

1. **Missing logo**: Always include GenuVerity branding
2. **Wrong logo format**: No shields or icons to the LEFT
3. **Purple colors**: Never use purple anywhere
4. **Low contrast**: Ensure text is readable against dark background
5. **Missing glow effects**: All borders and arrows should have subtle glow
6. **Wrong aspect ratio**: Always 16:9 (1200x800 or similar)

---

## Content Report Template

**Model**: `claude-sonnet-4-20250514` or `claude-sonnet-4-5-20250929` (ONLY these models)

### HTML Structure Requirements

```html
<!-- Report Header -->
<div class="report-header">
    <span class="report-tag">[CATEGORY] // [SUBCATEGORY]</span>
    <h1 class="report-title">[TITLE]</h1>
    <p class="report-subtitle">[One-line summary]</p>
    <div class="report-meta">
        <span class="report-date">[Date]</span>
        <span class="report-reading-time">[X] min read</span>
    </div>
</div>

<!-- Executive Summary -->
<section class="executive-summary">
    <h2 class="prose-h2">Executive Summary</h2>
    <p class="prose-text">[2-3 paragraph summary with key findings]</p>
</section>

<!-- Main Content Sections -->
<section class="content-section">
    <h2 class="section-title">[Section Title]</h2>
    <p class="prose-text">
        According to <a href="https://source-url" target="_blank" rel="noopener">source name</a>,
        <strong>key finding here</strong>. The claim that <em>"quoted claim"</em> is
        <strong>FALSE</strong> based on <a href="https://evidence-url" target="_blank" rel="noopener">evidence</a>.
    </p>

    <!-- Charts -->
    <div class="chart-container">
        <canvas id="chart_[unique_id]"></canvas>
    </div>
</section>

<!-- Verdict/Conclusion -->
<section class="verdict-section">
    <h2 class="prose-h2">Verdict</h2>
    <div class="verdict-box [verdict-class]">
        <span class="verdict-label">[VERDICT]</span>
        <p class="verdict-explanation">[Explanation]</p>
    </div>
</section>
```

### CSS Classes Reference

| Class | Purpose | Usage |
|-------|---------|-------|
| `.nav-header` | Sticky navigation | Top nav bar |
| `.reading-progress` | Scroll progress bar | Auto-injected by reading-progress.js |
| `.sources-banner` | Collapsible sources | Top of report |
| `.content-section` | Main sections | Wrap each section |
| `.prose-text` | Body paragraphs | All regular text content |
| `.section-title` | Section headings | Main section titles |
| `.verdict-badge` | Verdict indicator | Hero section |
| `.chart-container` | Chart wrapper | Wrap Canvas elements |
| `.source-card` | Source item | In sources grid |
| `.trust-score` | Trust indicator | Source cards |

### Text Formatting (REQUIRED)

| Element | Use For | Example |
|---------|---------|---------|
| `<strong>` | Verdicts, key findings, names, numbers | `<strong>FALSE</strong>` |
| `<em>` | Claims, quotes, technical terms | `<em>"quoted claim"</em>` |
| `<a href="URL">` | Every factual claim | `<a href="https://...">BLS data</a>` |

### Reading Progress Bar (REQUIRED)

All reports must include a reading progress bar. The shared script auto-injects CSS, HTML element, and scroll behavior.

**Just add this one line in `<head>` (after Chart.js):**
```html
<script src="../js/reading-progress.js"></script>
```

That's it! The script automatically:
- Injects CSS for the progress bar
- Appends the `<div class="reading-progress">` element to `.nav-header`
- Adds the scroll event listener

**Requirements:**
- Page must have a `.nav-header` element
- Script path assumes report is in `localreports/` directory

---

## Source Citation Standards

### Source Hierarchy (Mandatory)

1. **Sources First (Trust Score 90-100)**
   - Government agencies (.gov): BLS, Fed, Treasury, Congress.gov
   - Central banks: Federal Reserve, ECB, BOJ
   - Official statistics: Census, BEA, IMF

2. **Secondary Sources (Trust Score 70-89)**
   - Major news organizations: Reuters, AP, BBC, NPR
   - Research institutions: Brookings, NBER, universities
   - Industry bodies: BIS, OECD

3. **Tertiary Sources (Trust Score 50-69)**
   - Quality journalism: NYT, WSJ, Politico
   - Fact-checkers: Snopes, PolitiFact, FactCheck.org
   - Domain experts with credentials

### Forbidden Sources

- **NEVER use Wikipedia** - Always find the primary source Wikipedia cites
- **NEVER use social media** as primary source (unless analyzing the platform itself)
- **NEVER use anonymous blogs** or unverified sources
- **NEVER use sources older than 6 months** for time-sensitive data without disclosure

### Source JSON Schema
```json
{
  "sources": [
    {
      "name": "Bureau of Labor Statistics",
      "score": 95,
      "url": "https://www.bls.gov/news.release/cpi.nr0.htm",
      "date": "2025-12-18",
      "type": "primary"
    }
  ]
}
```

---

## Live Data Integration

**RULE: When possible, use live data from free APIs to provide real-time context.**

Live data feeds prove the veracity of articles dynamically. Instead of static screenshots or numbers, pull live data that updates when the page loads.

### Available Live Data APIs (Free)

| API | Endpoint | Data Types | Update Frequency |
|-----|----------|------------|------------------|
| **FRED** | `/api/fred/{series_id}` | Economic indicators, Fed data | Weekly/Monthly |
| **FRB Services** | External | Payment system status | Real-time |

### FRED Series Available via Backend Proxy

Our backend proxy (`/api/fred/{series_id}`) protects the API key while providing access to:

| Series ID | Description | Use Case |
|-----------|-------------|----------|
| `WALCL` | Fed Total Assets | Fed balance sheet articles |
| `M2SL` | M2 Money Supply | Money supply claims |
| `CPIAUCSL` | Consumer Price Index | Inflation articles |
| `UNRATE` | Unemployment Rate | Jobs claims |
| `FEDFUNDS` | Fed Funds Rate | Interest rate articles |
| `T10Y2Y` | Treasury Yield Spread | Recession indicators |
| `SP500` | S&P 500 Index | Market claims |

### Live Chart Implementation Pattern

```html
<!-- Live Data Panel Header -->
<div class="live-data-header">
    <div class="live-indicator">
        <span class="live-dot"></span>
        <span style="color: var(--accent-green);">LIVE FRED DATA</span>
    </div>
    <div class="live-timestamp" id="fred-timestamp">Loading...</div>
</div>

<!-- Chart Container -->
<div class="chart-container">
    <canvas id="fredChart"></canvas>
</div>

<!-- JavaScript -->
<script>
async function fetchFredData() {
    const response = await fetch('/api/fred/WALCL?limit=12');
    const data = await response.json();
    // data.observations contains the time series
    // data.fetched_at contains the timestamp
    renderChart(data.observations.reverse());
}

// Fetch on page load
document.addEventListener('DOMContentLoaded', fetchFredData);

// Refresh every 5 minutes
setInterval(fetchFredData, 5 * 60 * 1000);
</script>
```

### Live Data Labeling Requirements

**MANDATORY:** All live data panels must include:

1. **Live indicator** - Pulsing green dot with "LIVE" label
2. **Data source attribution** - Link to original source (e.g., FRED)
3. **Timestamp** - When data was last fetched
4. **Auto-refresh** - Data should refresh periodically while page is open

---

## Data Freshness Requirements

### Real-Time Data (Must verify on publication day)

| Data Type | Source | Max Age |
|-----------|--------|---------|
| CPI/Inflation | BLS | Same-day release |
| Fed Nowcasts | Cleveland/NY Fed | 24 hours |
| Consumer Surveys | UMich, Conference Board | 7 days |
| Treasury Holdings | TIC Data | Monthly release |
| Market Data | FRED, Yahoo Finance | 24 hours |

### Date Context Requirements

Always include date context for time-sensitive data:
```html
<!-- Good -->
<p>The Cleveland Fed Nowcast shows 2.62% (Dec 18, 2025 reading)</p>

<!-- Bad -->
<p>The Cleveland Fed Nowcast shows 2.62%</p>
```

### Historical Data Disclosure

For data older than 6 months, explicitly note:
```html
<p>According to the Bruegel Institute's 2018 analysis (historical context)...</p>
```

---

## Chart.js Configuration Template

### GenuVerity Watermark Plugin (REQUIRED)

**Always include this plugin in the `<head>` after Chart.js is loaded:**

```html
<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- GenuVerity Chart.js Watermark Plugin -->
<script>
    const genuVerityWatermark = {
        id: 'genuVerityWatermark',
        afterDraw: (chart) => {
            const ctx = chart.ctx;
            const { width } = chart;

            ctx.save();

            // Position: top-right corner
            const x = width - 8;
            const y = 16;

            ctx.textAlign = 'right';
            ctx.textBaseline = 'top';
            ctx.font = 'bold 10px Inter, sans-serif';

            // "Genu" in white (full opacity)
            ctx.fillStyle = '#ffffff';
            const genuText = 'Genu';
            const verityText = 'Verity';
            const verityWidth = ctx.measureText(verityText).width;

            ctx.fillText(genuText, x - verityWidth, y);

            // "Verity" in blue (full opacity)
            ctx.fillStyle = '#3b82f6';
            ctx.fillText(verityText, x, y);

            ctx.restore();
        }
    };

    // Register globally so all charts get it
    Chart.register(genuVerityWatermark);
</script>
```

This plugin draws "GenuVerity" branding in the top-right corner of every Chart.js chart, out of the way of data which typically appears at the bottom.

### Standard Chart Config
```javascript
{
  "chart_[unique_id]": {
    "type": "bar", // bar, line, doughnut, radar
    "title": "[Chart Title]",
    "data": {
      "labels": ["Label1", "Label2", "Label3"],
      "datasets": [{
        "label": "[Dataset Name]",
        "data": [10, 20, 30],
        "backgroundColor": [
          "rgba(59, 130, 246, 0.8)",  // Blue
          "rgba(6, 182, 212, 0.8)",   // Cyan
          "rgba(16, 185, 129, 0.8)"   // Green
        ],
        "borderColor": [
          "#3b82f6",
          "#06b6d4",
          "#10b981"
        ],
        "borderWidth": 2
      }]
    },
    "options": {
      "responsive": true,
      "plugins": {
        "legend": {
          "labels": { "color": "#ffffff" }
        },
        "title": {
          "display": true,
          "text": "[Chart Title]",
          "color": "#ffffff"
        }
      },
      "scales": {
        "x": {
          "ticks": { "color": "#a0a0b0" },
          "grid": { "color": "rgba(255,255,255,0.1)" }
        },
        "y": {
          "ticks": { "color": "#a0a0b0" },
          "grid": { "color": "rgba(255,255,255,0.1)" }
        }
      }
    }
  }
}
```

### Color Palette for Charts

| Use Case | Color | Hex | RGBA |
|----------|-------|-----|------|
| Primary/Neutral | Blue | #3b82f6 | rgba(59, 130, 246, 0.8) |
| Secondary | Cyan | #06b6d4 | rgba(6, 182, 212, 0.8) |
| Positive | Green | #10b981 | rgba(16, 185, 129, 0.8) |
| Warning | Amber | #f59e0b | rgba(245, 158, 11, 0.8) |
| Negative | Red | #ef4444 | rgba(239, 68, 68, 0.8) |
| **FORBIDDEN** | Purple | #8b5cf6 | NEVER USE |

### Chart Type Selection Guide

| Data Type | Recommended Chart | Notes |
|-----------|-------------------|-------|
| Comparison | Bar (vertical) | Up to 8 categories |
| Trends over time | Line | Include data points |
| Part-to-whole | Doughnut | Max 6 segments |
| Multiple dimensions | Radar | Max 8 axes |
| Distribution | Horizontal bar | For rankings |

---

## Pre-Generation Checklist

Before generating any content, verify:

- [ ] Correct AI model selected (Claude for text, Gemini 3 Pro Image Preview for images)
- [ ] All data points verified against live sources
- [ ] Date context included for all time-sensitive data
- [ ] No Wikipedia links in sources
- [ ] No purple colors in design
- [ ] GenuVerity branding included in infographics
- [ ] Source trust scores assigned (0-100)
- [ ] Chart colors follow palette guidelines
- [ ] Reading progress bar script included (`<script src="../js/reading-progress.js"></script>`)

---

## Cost Optimization Tips

1. **Get it right first time**: Follow templates exactly to avoid regeneration
2. **Batch infographics**: Generate multiple images in one session when possible
3. **Verify data first**: Check all sources BEFORE generation to avoid corrections
4. **Use specific prompts**: Vague prompts lead to wrong outputs and regeneration
5. **Include all branding upfront**: Adding branding after costs another API call
6. **Review templates before generating**: 30 seconds of review saves $$ in API costs

---

*Last updated: December 20, 2025*
