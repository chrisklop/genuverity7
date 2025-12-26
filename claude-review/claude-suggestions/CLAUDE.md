# CLAUDE.md

Claude's role in the GenuVerity pipeline: **Content Structuring & HTML Generation**

---

## PRE-FLIGHT CHECKLIST

```
[ ] What pass am I doing?
    -> PASS 1 (Research -> JSON): Output ONLY valid JSON, no HTML
    -> PASS 2 (JSON -> HTML): Use golden template, fill placeholders
[ ] Golden template location: docs/report-template-2025.html
[ ] NEVER write HTML from scratch
[ ] NEVER use Wikipedia as a source
```

---

## Two-Pass Report Generation

### PASS 1: Research -> Structured JSON

**When to use:** User pastes raw Gemini Deep Research output
**Your job:** Extract and structure content into JSON
**Output:** Valid JSON matching the schema below -- NOTHING ELSE

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
1. Output ONLY the JSON -- no markdown code fences, no explanation
2. Citation numbers [N] MUST match source array indices exactly
3. Every factual claim needs a citation
4. NO Wikipedia -- find the primary source Wikipedia cites
5. Maximum 10 sections for readability
6. Include charts ONLY when data visualization adds clear value
7. Sources array must include ALL sources from research (no truncation)

---

### PASS 2: JSON -> Final HTML

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
1. NEVER write HTML from scratch -- always start from template
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

## reports-data.js Entry Format (EXACT SCHEMA)

When adding a new report, add to the TOP of the REPORTS_DATA array:

```javascript
{
    id: 0,  // NEW REPORT ALWAYS GETS 0, then increment all others by +1
    title: "Aerial Assets & Sovereign Logistics: A Forensic Audit",
    slug: "localreports/your-report-slug.html",  // FULL PATH required
    category: "Forensic Audit",  // Display category name
    tagClass: "tag-red",         // tag-red | tag-cyan | tag-green | tag-amber
    catClass: "cat-military",    // cat-military | cat-cyber | cat-disinfo | cat-finance
    icon: "plane",               // Lucide icon name: plane, cpu, eye, radar, shield-alert, etc.
    date: "Dec 24, 2025",        // Human-readable format: "Mon DD, YYYY"
    sources: "35 Sources",       // String with count
    readTime: "25 min",          // Reading time estimate
    excerpt: "One paragraph summary for card preview. Keep it compelling.",
    chart: {
        type: "network",         // network | line | bar | donut | hbar | timeline
        color: "#3b82f6",        // Primary chart color
        data: { nodes: 8, connections: 14 }  // For network type
        // OR for line: data: [20, 35, 45, 60]
        // OR for bar: data: [
        //     { label: 'Item1', value: 100, color: '#3b82f6' },
        //     { label: 'Item2', value: 80, color: '#ef4444' }
        // ]
    }
}
```

**CRITICAL:** Manually increment ALL existing IDs by +1 after adding new report at id:0.

### Available Tag Classes
- `tag-red` - High alert / critical
- `tag-cyan` - Analysis / assessment
- `tag-green` - Verified / confirmed
- `tag-amber` - Warning / caution

### Available Category Classes
- `cat-military` - Defense / military topics
- `cat-cyber` - Cybersecurity / tech
- `cat-disinfo` - Disinformation / media
- `cat-finance` - Financial / economic

### Available Icons (Lucide)
plane, cpu, eye, radar, shield-alert, scale, file-text, database, activity, globe

---

## Source Hierarchy

| Tier | Trust Score | Examples |
|------|-------------|----------|
| **Primary** | 90-100 | .gov, Federal Reserve, BLS, Census, official statistics |
| **Secondary** | 70-89 | Reuters, AP, BBC, Brookings, universities |
| **Tertiary** | 50-69 | NYT, WSJ, established fact-checkers |
| **FORBIDDEN** | -- | Wikipedia, social media, anonymous blogs |

---

## Quick Reference: What Claude Does vs. Doesn't Do

| Task | Claude Does | Claude Doesn't |
|------|-------------|----------------|
| Text content | YES - All article writing | NO - Image generation |
| Structuring | YES - JSON extraction | NO - Raw research gathering |
| HTML | YES - Template transformation | NO - Writing from scratch |
| Charts | YES - Chart.js code configs | NO - Gemini image infographics |
| Sources | YES - Verify & structure | NO - Use Wikipedia |

---

## Deployment

- **NEVER** run `vercel --prod` or `vercel deploy`
- Push to git -> GitHub auto-deploys
- Stay in your lane (localreports/ and reports-data.js only)

---

*Last updated: December 2025*
