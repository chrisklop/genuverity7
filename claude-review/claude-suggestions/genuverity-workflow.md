# GenuVerity Workflow Documentation

## Pipeline Overview

```
+------------------+     +-------------------+     +-------------------+
|   GEMINI         |     |   CLAUDE PASS 1   |     |   CLAUDE PASS 2   |
|   Deep Research  | --> |   Research->JSON  | --> |   JSON->HTML      |
+------------------+     +-------------------+     +-------------------+
        |                        |                        |
        v                        v                        v
   Raw research            Structured JSON          Final report in
   with 30+ sources        (~60 lines)              localreports/
```

---

## Why Two-Pass?

Single-pass generation fails because models can't simultaneously:
- Parse 30+ sources
- Understand complex content
- Remember 400 lines of template rules
- Generate valid HTML
- Configure Chart.js correctly
- Link all citations

**Two-pass splits the cognitive load:**

| Pass | Focus | Output |
|------|-------|--------|
| Pass 1 | Understanding content | ~60 line JSON schema |
| Pass 2 | Template transformation | Complete HTML file |

---

## Step-by-Step Instructions

### Step 1: Gemini Deep Research

**Prompt Gemini:**
```
Research [TOPIC] comprehensively. Include:
- All relevant primary sources (.gov, official documents)
- Data points suitable for charts
- Complete source list with URLs

DO NOT write article text or HTML.
```

**Gemini outputs:** Raw research markdown with 30+ sources

---

### Step 2: Claude Pass 1 (JSON Structuring)

**Prompt Claude:**
```
PASS 1: Convert this research to structured JSON.
Follow the schema in CLAUDE.md exactly.
Output ONLY valid JSON - no explanation, no code fences.

[Paste Gemini research here]
```

**Claude outputs:** Valid JSON matching the schema

**Validate:** 
```bash
node -e "JSON.parse(require('fs').readFileSync('draft.json'))"
```

---

### Step 3: Claude Pass 2 (HTML Generation)

**Prompt Claude:**
```
PASS 2: Generate HTML report from this JSON.
1. Copy docs/report-template-2025.html to localreports/{{slug}}.html
2. Replace all {{PLACEHOLDER}} tokens
3. Generate source cards for ALL sources
4. Run validation
5. Update reports-data.js

[Paste JSON here]
```

**Claude outputs:** Complete HTML file + updated reports-data.js

---

## File Locations

| File | Location | Purpose |
|------|----------|---------|
| Golden template | `docs/report-template-2025.html` | Source of truth |
| Final reports | `localreports/*.html` | Published reports |
| Card data | `js/reports-data.js` | Homepage cards |
| Validation | `./validate-report.sh` | Check compliance |

---

## Validation Checklist

Before committing, verify:

```bash
./validate-report.sh localreports/your-report.html
```

Manual checks:
- [ ] Source count in sidebar matches actual sources
- [ ] All [N] citations link to correct source-N IDs
- [ ] No {{PLACEHOLDER}} tokens remain
- [ ] Chart colors use approved palette (no purple)
- [ ] reports-data.js entry added with id:0, others incremented

---

## Troubleshooting

### "Template tokens still visible"
Pass 2 didn't complete. Check JSON was valid and all fields present.

### "Source count mismatch"
Pass 1 may have truncated sources. Re-run with explicit instruction to include ALL sources.

### "Chart not rendering"
Check Chart.js config syntax. Common issues:
- Missing quotes around labels
- Data array/object format mismatch

### "Validation fails on citations"
Ensure source IDs use format `id="source-N"` (not `id="src-N"` or similar).

---

## Git Boundaries

**Safe to commit:**
- `localreports/*`
- `js/reports-data.js`

**NEVER commit:**
- `api/*`
- `index.html`
- `reports.html`
- Other `js/*` files
- `docs/*`

---

*Last updated: December 2025*
