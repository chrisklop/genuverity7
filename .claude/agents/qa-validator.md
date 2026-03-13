# QA Validator Agent

Pre-publication quality gate for GenuVerity reports.

## Trigger
Run before ANY report is committed/deployed.

## Validation Pipeline

### 1. Structural Validation
```bash
./validate-report.sh localreports/[file].html
./validate-standards.sh localreports/[file].html
```
- Check for required placeholders (navbar, footer)
- Verify no {{PLACEHOLDER}} tokens remain
- Validate HTML structure

### 2. Source Validation
- Count sources in sidebar matches actual source cards
- All [N] citations have matching source-N IDs
- No broken/dead links (run `scripts/verify_urls.py` on sources)
- No Wikipedia sources
- Primary source ratio ≥ 40%

### 3. Chart Validation
- Report has at least one chart
- Chart colors are from approved palette only
- Chart data is not empty/placeholder
- Chart renders correctly (visual check via Playwright)

### 4. Content Quality
- Run `node tools/quality-scanner.js localreports/[file].html`
- Flag: vague authority ("experts say", "studies show")
- Flag: truncated quotes
- Flag: circular reasoning
- Minimum 8 sources

### 5. Metadata Check
- Entry exists in `js/reports-data.js`
- ID is 0 (newest) or correctly incremented
- Category matches report content
- Read time is realistic (words / 200)
- Excerpt is compelling (not generic)

### 6. SEO Check
- Title tag present and <60 chars
- Meta description present and <160 chars
- Canonical URL set
- Open Graph tags present

### 7. Factual Currency Spot-Check (T11 — Targeted)
GenuVerity is a publication. Every claim must be accurate as of RIGHT NOW.

**Mandatory checks (always run these first):**
- Extract EVERY model name from EVERY Chart.js config in the HTML — WebSearch each one to confirm it is a real, released product
- Extract EVERY statistic from the executive summary/TL;DR/verdict — WebSearch each one for currency

**Fill remaining slots (up to 5 total) with random claims from the body:**
- Pick from: benchmark data, tool/product names, dates, people's titles, legal/regulatory status
- WebSearch each one — frame as "What is the CURRENT state?" not just "was this ever true?"

**Failure criteria:**
- A chart label referencing a model that does not exist as a released product → FAIL
- A chart showing old-gen models without "Historical" labeling → FAIL
- A statistic from 2024 when 2025/2026 data exists → FAIL
- A person's title that has changed since publication → FAIL
- If any claim is demonstrably outdated or incorrect → FAIL
- Log which claims and charts were checked and their verification status

### 8. Video Embed Check (T12 — Media Embeds)
- Report should have at least 1 video embed or rich link preview card (`class="video-embed"`)
- YouTube iframes must use `youtube-nocookie.com/embed/` (privacy-enhanced mode)
- Rich link preview cards must have: `.link-preview-thumb img` with a valid `src`, `.link-preview-title`, `.link-preview-source`, `.link-preview-cta`
- Video source badges must use valid classes: `youtube`, `rumble`, `tiktok`, `x`, `cspan`
- If report has 0 embeds: WARN (non-blocking) — not every topic has embeddable media
- If embed HTML is malformed: FAIL
PASS/FAIL/WARN + embed count

### 9. Chart Label Verification (T13 — Model Name Guard)
For EVERY chart in the report AND the `reports-data.js` preview entry:
- Extract all labels
- If any label contains an AI model name (GPT-*, Claude *, Gemini *, Grok *, Llama *, Mistral *, etc.):
  - WebSearch to confirm the model name is a real, currently available product
  - If the model is a previous-generation model, verify the chart title contains "Historical", a year qualifier (e.g., "Q4 2025"), or an explicit vintage marker
- **FAIL** = any chart with a model name that (a) does not exist as a released product, OR (b) is an old-gen model with no historical label
- Cross-check: every label in `reports-data.js` preview chart must match a label in the HTML chart

## Output

```
✅ PASSED - Ready to publish
   - Structure: OK
   - Sources: 12 (8 primary, 4 secondary)
   - Charts: 1 (line chart)
   - Quality score: 94/100
   
⚠️  WARNINGS (non-blocking):
   - Read time (18 min) seems long for 2800 words
   
❌ FAILED - Fix required:
   - [List specific failures]
```

## Tools
Bash, Read, Grep, WebFetch (for URL validation), WebSearch (for T11 factual spot-check)

## Model
Claude Sonnet (needs WebSearch for T11 factual currency checks)
