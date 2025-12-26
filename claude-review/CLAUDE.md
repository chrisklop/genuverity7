# CLAUDE.md

Claude's role in the GenuVerity pipeline: **Content Structuring & HTML Generation**

---

## ⚠️ BEFORE ANYTHING ELSE

```
□ What pass am I doing?
  → PASS 1 (Research → JSON): Output ONLY valid JSON, no HTML
  → PASS 2 (JSON → HTML): Use golden template, fill placeholders
□ Golden template location: docs/report-template-2025.html
□ NEVER write HTML from scratch
□ NEVER use Wikipedia as a source
```

---

## Two-Pass Report Generation

### PASS 1: Research → Structured JSON

**When to use:** User pastes raw Gemini Deep Research output
**Your job:** Extract and structure content into JSON
**Output:** Valid JSON matching the schema below—NOTHING ELSE

```json
{
  "meta": {
    "title": "Short punchy title (5-8 words)",
    "subtitle": "One-line explanation of what this report covers",
    "category": "DEEP DIVE DOSSIER | FACT CHECK | BREAKING | ANALYSIS",
    "subcategory": "FORENSIC AUDIT | LIVE DATA | MYTH BUSTED | VERIFIED",
    "read_time": 12,
    "slug": "url-friendly-slug"
  },
  "executive_summary": "2-3 sentences capturing the key finding. No citations here.",
  "verdict": {
    "label": "TRUE | FALSE | MIXED | UNVERIFIED | MISLEADING",
    "class": "true | false | mixed",
    "explanation": "One sentence explaining the verdict"
  },
  "sections": [
    {
      "number": 1,
      "title": "Section Title",
      "content": [
        {
          "type": "paragraph",
          "text": "Paragraph text with [N] citation markers inline."
        },
        {
          "type": "list",
          "items": [
            { "title": "Point Title", "text": "Point explanation [N]" }
          ]
        },
        {
          "type": "table",
          "headers": ["Col1", "Col2", "Col3"],
          "rows": [
            ["Cell1", "Cell2", "Cell3"]
          ]
        },
        {
          "type": "chart",
          "id": "unique_chart_id",
          "chart_type": "bar | line | doughnut",
          "title": "Chart Title",
          "subtitle": "Optional subtitle",
          "labels": ["Label1", "Label2"],
          "datasets": [
            { "label": "Dataset Name", "data": [10, 20], "color": "blue" }
          ]
        },
        {
          "type": "alert",
          "color": "red | amber | green | blue",
          "title": "Alert Title",
          "text": "Alert content"
        }
      ]
    }
  ],
  "sources": [
    {
      "n": 1,
      "title": "Short descriptive title",
      "publisher": "Organization name",
      "url": "https://full-url-here",
      "type": "primary | secondary | tertiary"
    }
  ]
}
```

**PASS 1 RULES:**
1. Output ONLY the JSON—no markdown code fences, no explanation
2. Citation numbers [N] MUST match source array indices exactly
3. Every factual claim needs a citation
4. NO Wikipedia—find the primary source Wikipedia cites
5. Maximum 10 sections for readability
6. Include charts ONLY when data visualization adds clear value
7. Sources array must include ALL sources from research (no truncation)

---

### PASS 2: JSON → Final HTML

**When to use:** User provides structured JSON (from Pass 1)
**Your job:** Transform JSON into HTML using the golden template
**Output:** Complete HTML file saved to `localreports/`

**PASS 2 WORKFLOW:**
```bash
1. cp docs/report-template-2025.html localreports/{{slug}}.html
2. Replace all {{PLACEHOLDER}} tokens with JSON values
3. Generate source cards for ALL sources
4. Generate Chart.js configs for any charts
5. Run: ./validate-report.sh localreports/{{slug}}.html
6. Update js/reports-data.js (new report = id:0, increment others)
7. Commit ONLY: localreports/*, js/reports-data.js
```

**PASS 2 RULES:**
1. NEVER write HTML from scratch—always start from template
2. NEVER copy from old reports (they may have legacy bugs)
3. Source count in sidebar MUST match sources array length
4. All {{PLACEHOLDER}} tokens must be replaced
5. Chart colors: blue=#3b82f6, cyan=#06b6d4, green=#10b981, amber=#f59e0b, red=#ef4444
6. NO PURPLE (#8b5cf6) anywhere

---

## Git Boundaries (HARDCODED)

**ONLY commit/push these paths:**
- `localreports/*`
- `js/reports-data.js`

**NEVER commit/push:**
- `api/*`
- `index.html`
- `reports.html`
- `js/*` (except reports-data.js)
- `server.py`
- `docs/*`

---

## reports-data.js Entry Format

When adding a new report, add to the TOP of the REPORTS_DATA array:

```javascript
{
    id: 0,  // NEW REPORT ALWAYS GETS 0
    title: "Report Title",
    slug: "report-slug",
    category: "FACT CHECK",
    subcategory: "LIVE DATA",
    date: "2025-01-15",
    readTime: "12 min",
    verdict: "MIXED",
    verdictClass: "mixed",
    summary: "One sentence summary for card preview.",
    chart: {
        type: "line",  // line, bar, donut, network, hbar, timeline
        color: "#3b82f6",
        data: [20, 35, 45, 60]
    }
}
```

**CRITICAL:** Manually increment ALL existing IDs by +1. Never use regex/sed automation.

---

## Source Hierarchy

| Tier | Trust Score | Examples |
|------|-------------|----------|
| **Primary** | 90-100 | .gov, Federal Reserve, BLS, Census, official statistics |
| **Secondary** | 70-89 | Reuters, AP, BBC, Brookings, universities |
| **Tertiary** | 50-69 | NYT, WSJ, established fact-checkers |
| **FORBIDDEN** | — | Wikipedia, social media, anonymous blogs |

---

## Quick Reference: What Claude Does vs. Doesn't Do

| Task | Claude Does | Claude Doesn't |
|------|-------------|----------------|
| Text content | ✅ All article writing | ❌ Image generation |
| Structuring | ✅ JSON extraction | ❌ Raw research gathering |
| HTML | ✅ Template transformation | ❌ Writing from scratch |
| Charts | ✅ Chart.js code configs | ❌ Gemini image infographics |
| Sources | ✅ Verify & structure | ❌ Use Wikipedia |

---

## Deployment

- **NEVER** run `vercel --prod` or `vercel deploy`
- Push to git → GitHub auto-deploys
- Stay in your lane (localreports/ and reports-data.js only)

---

*Last updated: December 2025*
