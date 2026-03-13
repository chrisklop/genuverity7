# Generate Report from Research File

Transform a markdown research file into a published GenuVerity report.

## Usage
```
/generate-report automation/input/[filename].md
/generate-report path/to/research.md
```

## Instructions

### 1. Read the Input File
Read the provided markdown file. It should contain research from Gemini Deep Research or similar.

Identify:
- Main claim/topic
- Key findings
- Sources mentioned
- Any data/statistics

### 2. Execute Two-Pass Pipeline

#### Pass 1: Structure into JSON
Transform the research into structured JSON matching `lib/report_schema.py`:

```json
{
  "meta": {
    "title": "Compelling headline (max 70 chars)",
    "subtitle": "Context-setting subhead",
    "category": "Fact-Check|Policy Analysis|Investigation|Data Quality|Epstein Files",
    "slug": "kebab-case-url-slug",
    "read_time": "X min"
  },
  "executive_summary": "2-3 sentences summarizing verdict and key findings",
  "verdict": {
    "label": "True|Mostly True|Mixed|Misleading|False",
    "class": "verdict-true|verdict-mostly-true|verdict-mixed|verdict-misleading|verdict-false",
    "explanation": "1-2 sentences explaining the verdict"
  },
  "sections": [
    {
      "number": "01",
      "title": "Section Title",
      "content": [
        {"type": "paragraph", "text": "..."},
        {"type": "list", "items": ["...", "..."]},
        {"type": "chart", "chartType": "bar|line|donut", "data": {...}}
      ]
    }
  ],
  "sources": [
    {"n": 1, "title": "Source Title", "publisher": "Outlet", "url": "https://...", "type": "primary|secondary"}
  ]
}
```

Validate: Minimum 8 sources, at least one chart, no Wikipedia.

#### Pass 1.5: Video Discovery (MANDATORY)
Search for embeddable media relevant to this report topic:

1. **YouTube search** (3-5 WebSearch): Search `{topic keywords} youtube.com 2026`, news org channels, official channels
2. **Verify video IDs**: For each YouTube URL found, verify via oEmbed: `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={ID}&format=json`
3. **Fallback sources**: If no YouTube videos, find authoritative articles with OG images for rich link preview cards. WebFetch each URL and extract `og:image`, `og:title`, `og:description`.
4. **Record in JSON**: Add an `embeddable_media` array to your structured JSON:
   ```json
   "embeddable_media": [
     {"type": "youtube", "id": "VIDEO_ID", "title": "...", "caption": "...", "placement": "after section N"},
     {"type": "link_preview", "url": "...", "og_image": "...", "headline": "...", "domain": "...", "excerpt": "...", "caption": "...", "badge": "x", "placement": "after section N"}
   ]
   ```

Target: 1-3 embeds. Do NOT force if nothing relevant exists.

#### Pass 2: Generate HTML
1. Copy template:
   ```bash
   cp docs/report-template-2025.html localreports/[slug].html
   ```

2. Replace ALL {{PLACEHOLDER}} tokens with actual content

3. Generate Chart.js configuration (required for thumbnails)

4. Generate source cards HTML

5. **Insert video embeds** from `embeddable_media` at specified placement points (see template for HTML patterns)

6. Validate:
   ```bash
   ./validate-report.sh localreports/[slug].html
   ```

### 2.5. Fact Verification (MANDATORY — DO NOT SKIP)

You are a journalist. Every claim must be accurate **as of right now** — not as of when the source was published. Currency IS accuracy. A chart showing last-gen models without "Historical" labeling is wrong. A statistic from 2024 when 2025 data exists is stale.

After generating the HTML report, verify all factual claims before proceeding:

1. **Extract claims**: Read the generated HTML and extract all factual claims — model names, version numbers, dates, statistics, benchmarks, tool/product names, organization names, prices, capabilities, legal/regulatory status
2. **Audit charts & tables**: Read every Chart.js config and HTML table. Are the entities (model names, tools, companies) current? Is the data from the most recent source? Is old data clearly labeled as historical?
3. **WebSearch verification**: Run 10-15 WebSearch queries. Frame every search as "What is the CURRENT state?":
   - Model/tool currency (3-4 searches): latest versions, have any been superseded?
   - Statistical currency (2-3 searches): have numbers been updated since the source?
   - People/org currency (2-3 searches): current titles, leadership changes?
   - Date/event accuracy (1-2 searches): correct dates, any developments since?
   - Legal/regulatory currency (1-2 searches): has "proposed" become "finalized"?
4. **Classify each claim**: VERIFIED (accurate + current), STALE (outdated), INCORRECT (wrong), UNVERIFIABLE
5. **Fix stale/incorrect claims**: If ANY claims are STALE or INCORRECT, edit the HTML to correct them before proceeding. Update chart configs, table data, and reports-data.js preview charts too.
6. **Log results**: Append a verification log as a comment block at the bottom of the research input file:
   ```
   <!-- FACT VERIFICATION LOG — YYYY-MM-DD
   Claims checked: N | Charts audited: N
   Verified: N | Stale (fixed): N | Incorrect (fixed): N | Unverifiable: N
   Searches performed: N
   -->
   ```

This step is NOT optional even if the input file came from "trusted" external research or Gemini Deep Research output.

### 2.6. Chart & Preview Data Audit (HARD GATE)

Every chart label is a potential hallucination vector. This step blocks publication if any chart contains unverified entity names.

1. **Extract all entity names from charts**: Read every `Chart.js` config in the HTML. Extract every label that references an AI model, tool, company, product, or benchmark.
2. **Extract all entity names from preview chart**: Read the `reports-data.js` entry you created. Extract every label from the `chart` JSON.
3. **WebSearch every AI model name**: For each model name found, search: `"[model name]" site:openai.com OR site:anthropic.com OR site:deepmind.google OR site:x.ai OR site:huggingface.co`
   - If a model name returns zero results from its vendor → it is FABRICATED. **BLOCK publication.**
   - If a model name exists but has been superseded → label it as historical or update to current name.
4. **Cross-check HTML charts vs preview charts**: Every label in the `reports-data.js` preview chart must match a label in the HTML chart. Mismatches = fail.
5. **Fix or block**: Fix any issues found. If you cannot verify a model name, replace it with a verified alternative or remove it from the chart entirely. NEVER guess or extrapolate model names.

This is a HARD GATE — the report cannot proceed to Step 3 until all chart labels are verified as real, released products.

### 3. Update Reports Data
Edit `js/reports-data.js`:
- Add new entry at the TOP of the array with `id: 0`
- Increment ALL other report IDs by 1
- Include chart config for carousel thumbnail

### 4. Generate Thumbnail (if available)
```bash
npm run thumbnails -- --report=[slug]
```

### 5. Commit
```bash
git add localreports/[slug].html js/reports-data.js
git commit -m "report: [short title]"
```

### 6. Summary Output
```
## ✅ Report Generated

**Title:** [title]
**Verdict:** [verdict]
**Sources:** [count]
**File:** localreports/[slug].html

### Validation
- Structure: ✅
- Sources: ✅ ([count] sources, [primary]% primary)
- Chart: ✅ ([type])
- HTML: ✅ (no placeholders remaining)

### Next Steps
- Review: open localreports/[slug].html in browser
- Deploy: git push origin main
```

## Critical Rules
- NEVER write HTML from scratch - ALWAYS use template
- NO Wikipedia sources
- NO purple colors (#8b5cf6)
- EVERY report needs at least one chart
- Source count in sidebar MUST match actual sources
