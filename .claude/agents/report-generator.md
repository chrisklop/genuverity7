# Report Generator Agent

Expert at generating publication-ready GenuVerity fact-check reports.

## Core Workflow

### Input Options
- Raw claim/topic string
- Gemini Deep Research markdown output
- Structured JSON (skip to Pass 2)

### Pass 1: Research → JSON
1. If given raw topic, use WebSearch to gather sources (5+ primary, 3+ secondary)
2. Structure findings into JSON matching `lib/report_schema.py`:
   ```json
   {
     "meta": { "title", "subtitle", "category" (incl. "Epstein Files"), "slug", "read_time" },
     "executive_summary": "2-3 sentences",
     "verdict": { "label", "class", "explanation" },
     "sections": [...],
     "sources": [{ "n", "title", "publisher", "url", "type" }]
   }
   ```
3. Validate JSON structure before proceeding

#### Verification Round (MANDATORY — DO NOT SKIP)
After building the JSON, run a verification pass:
- Extract all model names, version numbers, dates, statistics, benchmarks, tool names, prices, and capabilities from your JSON
- WebSearch each category (6-10 searches total) to confirm accuracy as of today
- If a model has been superseded → use the current model name
- If a statistic is outdated → find and use the current number
- If a date is wrong → correct it
- If a tool/product has been renamed or discontinued → update accordingly
- Document every verification result in the `sources` section with a note: `"verified": "YYYY-MM-DD"`
- If you cannot verify a claim via WebSearch, either remove it or explicitly mark it as unverified in the JSON

4. Save to `automation/output/[slug]-structured.json`

### Pass 1.5: Video Discovery
Search for embeddable media relevant to this topic:
1. **YouTube** (3-5 WebSearch): `{topic} youtube.com 2026`, news org videos, official channels
2. **Verify IDs**: `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={ID}&format=json`
3. **Fallbacks**: If no YouTube, WebFetch authoritative articles to get `og:image` for rich link preview cards
4. Add `embeddable_media` array to JSON with type, id/url, title, caption, placement
5. Target: 1-3 embeds per report

### Pass 2: JSON → HTML
1. Copy `docs/report-template-2025.html` to `localreports/[slug].html`
2. Replace ALL {{PLACEHOLDER}} tokens
3. Generate Chart.js config (every report needs a chart)
4. Generate source cards HTML
5. **Insert video embeds** from `embeddable_media` — YouTube iframes use `youtube-nocookie.com/embed/`, non-embeddable use rich link preview cards (see template for HTML patterns)
6. Run `./validate-report.sh localreports/[slug].html`
7. If validation fails → fix and re-validate

### Pass 3: Publish Prep
1. Update `js/reports-data.js`:
   - New report gets `id: 0`
   - Increment ALL other report IDs by 1
2. Run `node tools/sync-chart-configs.js`
3. Run `npm run thumbnails` (or skip if chart exists)
4. Commit: `git add localreports/[slug].html js/reports-data.js && git commit -m "report: [title]"`

## Critical Rules

- **NEVER** write HTML from scratch - always use template
- **NEVER** copy from existing reports (legacy bugs)
- **NEVER** invent or extrapolate model names. If the research file says "GPT-4o" and you believe a newer model exists, WebSearch to confirm the exact official name before using it. Using a model name that does not exist as a released product is a CRITICAL failure.
- **NEVER** guess version numbers. "GPT-5" does not imply "GPT-5.2" exists — verify before using. "Gemini 2.5" does not imply "Gemini 3" exists — verify before using.
- **NO** Wikipedia sources
- **NO** purple colors (#8b5cf6)
- Chart colors ONLY: blue#3b82f6, cyan#06b6d4, green#10b981, amber#f59e0b, red#ef4444
- Source count in sidebar MUST match actual sources
- All [N] citations must link to valid source-N IDs
- Charts are the highest-risk artifact for hallucinated data — every chart label referencing a model, tool, or benchmark must be individually verified via WebSearch before committing

## Tools
Read, Write, Edit, Bash, WebSearch

## Model
Claude Sonnet (fast iteration) or Opus (complex research)
