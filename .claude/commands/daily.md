# Daily Report: Autonomous Multi-Agent Pipeline (v2 — Deep Edition)

You are the **Coordinator**. You orchestrate specialized agents to discover, research, **expand depth**, generate, test, and publish 5 daily disinformation reports.

## Usage
```
/daily                    # Full pipeline: 5 reports, publish to feature branch
/daily --no-publish       # Everything except push
/daily --count 3          # Override count (default: 5)
```

## Arguments: $ARGUMENTS

Parse flags: `--no-publish`, `--count N` (default: 5)

---

## Architecture

```
YOU (Coordinator) ─── orchestrate everything
  │
  ├─ Phase 1: DISCOVER ─── you do this directly (WebSearch)
  │
  ├─ Phase 2: RESEARCH ─── parallel Task agents (sonnet)
  │   ├── Researcher 1 ──→ writes research markdown
  │   ├── Researcher 2 ──→ writes research markdown
  │   └── Researcher 3 ──→ writes research markdown
  │   (then batch 2)
  │   ├── Researcher 4 ──→ writes research markdown
  │   └── Researcher 5 ──→ writes research markdown
  │
  ├─ Phase 2.5: DEPTH EXPANSION ─── parallel Task agents (sonnet)
  │   ├── Expander 1 ──→ enriches research with deeper sources
  │   ├── Expander 2 ──→ enriches research with deeper sources
  │   └── Expander 3 ──→ enriches research with deeper sources
  │   (then batch 2)
  │   ├── Expander 4 ──→ enriches research with deeper sources
  │   └── Expander 5 ──→ enriches research with deeper sources
  │
  ├─ Phase 3: GENERATE ─── sequential Task agents (sonnet)
  │   ├── Generator 1 ──→ HTML + reports-data.js + vercel.json
  │   ├── Generator 2 ──→ HTML + reports-data.js + vercel.json
  │   └── ... (one at a time — shared files)
  │
  ├─ Phase 3.5: FACT-CHECK ─── parallel Task agents (sonnet)
  │   ├── Fact-Checker 1 ──→ verify claims in report 1
  │   └── ... (all 5 in parallel)
  │
  ├─ Phase 3.6: FIX-FACTS ─── you fix stale/incorrect claims
  │
  ├─ Phase 4: TEST ─── parallel Task agents (sonnet, WebSearch for T11)
  │   ├── QA Tester 1 ──→ validate report 1
  │   └── ... (all 5 in parallel)
  │
  ├─ Phase 5: FIX ─── you fix any QA failures directly
  │
  └─ Phase 6: PUBLISH ─── commit + push + PR
```

---

## Phase 1: DISCOVER (you, the Coordinator)

Run 10 parallel WebSearch calls:

**Fact-checkers:**
- `site:snopes.com OR site:politifact.com viral claim debunked 2026`
- `site:factcheck.org OR site:reuters.com/fact-check February 2026`
- `site:apnews.com fact check misinformation 2026`

**Platforms:**
- `viral misinformation TikTok 2026 this week`
- `trending false claim X Twitter debunked 2026`
- `Reddit conspiracy viral claim 2026 this week`

**Topics:**
- `health misinformation viral 2026 this week`
- `political disinformation US 2026 this week`
- `AI deepfake viral false 2026 this week`
- `immigration claim viral debunked 2026`

**De-duplicate:** Read `js/reports-data.js`, reject covered topics.

**Score** on: virality (multi-source), recency (< 7 days), platform spread (2+), harm level, researchability.

**Output:** Print numbered list of top N topics with one-line rationale. Then proceed.

---

## Phase 2: RESEARCH (parallel Task agents)

First, set up the branch:
```bash
git checkout main && git pull origin main && git checkout -b report/daily-YYYY-MM-DD
```

**Batch 1 — launch topics 1-3 simultaneously:**

For each topic, launch a Task agent:
```
Task tool:
  subagent_type: "general-purpose"
  model: "sonnet"
  description: "Research: [short topic]"
  prompt: [RESEARCH AGENT PROMPT - see below]
```

Wait for batch 1. Then **batch 2 — launch topics 4-5 simultaneously.**

After all complete, **validate each file exists** by reading the first 20 lines of each.

### RESEARCH AGENT PROMPT

```
You are a deep-research agent for GenuVerity, a fact-checking publication.

## Mission
Research this topic and write a structured research markdown file.

**Topic:** {TOPIC_TITLE}
**Brief:** {ONE_LINE_DESCRIPTION}

## Protocol (4 rounds, do NOT skip any)

### Round 1: Broad Sweep (5-6 WebSearch)
- Core claim from multiple angles
- Who originated, who amplified
- Existing fact-checks
- Platform spread
- Earliest mention (patient zero)

### Round 2: Source Extraction (5-8 WebFetch)
- Read top pages, extract verbatim quotes
- Pull data points, statistics, dates
- Note source credibility
- Get exact URLs

### Round 3: Gap-Filling (3-5 WebSearch + 2-3 WebFetch)
- Primary sources (government, court, academic)
- Counter-evidence
- Chart-ready data
- Expert commentary

### Round 4: Cross-Verification (2-3 WebSearch)
- Cross-check critical facts
- Verify dates, names, numbers
- Confirm patient zero

### Round 5: Video Discovery (3-5 WebSearch)
Find embeddable YouTube videos relevant to this report topic. These will be embedded in the final HTML.

Search strategy:
1. Search YouTube directly: `{topic keywords} youtube.com 2026`
2. Search for news org videos: `{topic} "BBC" OR "CNN" OR "Euronews" OR "CNBC" youtube 2026`
3. Search for the original viral content: `{original claim/video title} youtube`
4. If topic involves a specific org/person, check their official YouTube channel

For each video found, record:
- Full YouTube URL (youtube.com/watch?v=...)
- Video ID (the v= parameter)
- Video title and channel name
- Suggested embed placement (which section of the report)
- Suggested caption text

If no YouTube videos exist, search for authoritative article URLs with OG images that can be used as rich link preview cards (for X posts, news articles, etc.). For each, record:
- Article URL
- OG image URL (fetch the page and look for og:image meta tag)
- Headline and source domain
- Short excerpt for the preview card

**Minimum target: 1 embeddable video or link preview per report. Target: 2-3.**

Write all video/preview data in a `## Embeddable Media` section at the end of the research file.

## Output
Write to: /Users/klop/GenuVerity7/automation/deep-research-output/{SLUG}-YYYYMMDD.md

Required sections (ALL mandatory):
- Forensic Verdict Table (verdict, patient zero, propagation, velocity, harm)
- Executive Summary (2-3 paragraphs with [N] citations)
- Forensic Analysis (origin, propagation, why it spread, evidence)
- Claim vs Reality table (min 3 rows)
- Timeline table (min 5 entries)
- Chart Data (at least 1 chart with type, labels, values)
- Sources (10-15 target, min 8, NO Wikipedia, include URLs + verbatim quotes)

IMPORTANT: Use the Write tool to save the file. Do not just return content.
```

---

## Phase 2.5: DEPTH EXPANSION (parallel Task agents) ⭐ NEW

After all research is complete, launch depth expansion agents — **batched same as research (3 + 2)**.

For each topic, launch a Task agent:
```
Task tool:
  subagent_type: "general-purpose"
  model: "sonnet"
  description: "Expand depth: [short topic]"
  prompt: [DEPTH EXPANSION AGENT PROMPT - see below]
```

### DEPTH EXPANSION AGENT PROMPT

```
You are a Depth Expansion Agent for GenuVerity, a fact-checking publication.

## Mission
Read an existing research markdown file and EXPAND it with deeper, more comprehensive research. Your job is to find what the initial research missed — the angles, key figures, primary documents, and contemporary context that turn a good report into an exceptional one.

**Research file:** /Users/klop/GenuVerity7/automation/deep-research-output/{SLUG}-YYYYMMDD.md

## Protocol (3 passes — do NOT skip any)

### Pass A: Gap Analysis & Primary Sources (4-5 WebSearch + 2-3 WebFetch)

Read the existing research file first. Then ask yourself:

1. **Are there court documents, government reports, or official statements I should cite directly?**
   - Search for .gov sources, court filings, congressional testimony, official press releases
   - Search: "{topic} site:gov" or "{topic} court filing" or "{topic} congressional hearing"

2. **Are there key figures who deserve dedicated investigation?**
   - For each major person mentioned: search for their specific role, history, public statements
   - Example: If a politician is mentioned, search for their voting record, past positions, conflicts of interest on this topic

3. **What primary source documents exist?**
   - Search for the actual data, the actual report, the actual video — not just articles about them
   - WebFetch any .gov or official source pages to extract exact data, quotes, methodology

### Pass B: Evidence Deep-Dive (3-5 WebSearch + 2-3 WebFetch)

For each major piece of evidence referenced in the research:

1. **What does the evidence actually contain in detail?**
   - If a video is mentioned: search for transcripts, timestamp analysis, specific quotes from the footage
   - If a document is mentioned: search for what's in it, how many pages, what sections, key revelations
   - If a dataset is mentioned: search for the actual numbers, methodology, limitations

2. **What did key witnesses/participants actually say?**
   - Find verbatim quotes from depositions, press conferences, social media posts
   - Search: "{person name} {topic} quote statement"

3. **What has been the institutional response?**
   - How did the relevant government agency respond?
   - Were there official investigations, committee hearings, inspector general reports?

4. **Video embed enrichment** (1-2 WebSearch + 1-2 WebFetch)
   - If the research file has an `## Embeddable Media` section, verify each video ID still works
   - If the section is thin (< 2 entries), search for additional embeddable videos:
     - News org explainers on YouTube about this topic
     - Original source videos that went viral (the actual fake/claim being debunked)
     - Official response videos from agencies, companies, or individuals
   - For non-YouTube sources (X posts, news articles), WebFetch the URL and extract the og:image URL for rich link preview cards
   - Append any new finds to the `## Embeddable Media` section

### Pass C: Contemporary Context & Political Dimensions (3-4 WebSearch)

1. **Why is this topic relevant RIGHT NOW?**
   - Who is currently in charge of the relevant agency/office?
   - Are there pending investigations, legislation, or legal cases?
   - Search: "{topic} 2026" or "{agency} current leadership"

2. **What are the systemic implications?**
   - Does this connect to broader patterns (other similar cases, policy failures, institutional problems)?
   - Are there related developments the reader should know about?

3. **Who benefits from the current narrative, and who is harmed?**
   - Political dimensions: which officials had authority and didn't act?
   - Victim impact: what happened to the people directly affected?

## Output

APPEND your findings to the existing research file. Add these new sections:

### Additional Sources (Pass A)
[Numbered continuing from existing sources — e.g., if file has sources 1-12, start at 13]
Each source must have: Title, Publisher, URL, Credibility rating, Verbatim quote

### Evidence Deep-Dive (Pass B)
[Detailed analysis of key evidence pieces with new citations]

### Contemporary Context (Pass C)
[Why this matters now, who's in charge, what's changed, political dimensions]

### Expanded Chart Data
[If you found better/additional data for charts, add it here]

## Quality Requirements
- Add minimum 6 new sources (target 8-12)
- At least 3 must be primary sources (.gov, court docs, official statements, academic)
- Every new factual claim must have a citation
- Verbatim quotes from at least 2 new sources
- NO Wikipedia sources
- Do NOT duplicate sources already in the file
- Do NOT rewrite existing sections — only APPEND new material

IMPORTANT: Use the Edit tool to append to the existing file. Do not overwrite it.
```

After all expansion agents complete, validate each file was updated by checking for the "Additional Sources" section.

---

## Phase 3: GENERATE (sequential Task agents)

Reports MUST be generated one at a time because `reports-data.js` and `vercel.json` are shared.

For each topic (sequentially), launch a Task agent:
```
Task tool:
  subagent_type: "general-purpose"
  model: "sonnet"
  description: "Generate report: [short topic]"
  prompt: |
    Generate a complete GenuVerity HTML report from research markdown.

    ## Input
    Research file: /Users/klop/GenuVerity7/automation/deep-research-output/{SLUG}-YYYYMMDD.md

    IMPORTANT: This file contains BOTH the original research AND expanded depth sections
    (Additional Sources, Evidence Deep-Dive, Contemporary Context). You MUST incorporate
    ALL of this material into the report. The expanded sections are what make this report
    comprehensive — do not ignore them.

    ## Steps

    ### 1. Read the research file and extract key data
    Pay special attention to:
    - The original forensic analysis and sources
    - The "Additional Sources" section (these are high-quality primary sources)
    - The "Evidence Deep-Dive" section (use this for dedicated analysis sections)
    - The "Contemporary Context" section (use this for a "Why This Matters Now" section)

    ### 2. Read the template
    /Users/klop/GenuVerity7/docs/report-template-2025.html

    ### 3. Copy template and build report
    ```bash
    cp /Users/klop/GenuVerity7/docs/report-template-2025.html /Users/klop/GenuVerity7/localreports/{SLUG}.html
    ```
    Then read the copy and replace ALL {{PLACEHOLDER}} tokens:
    - {{TITLE}}, {{SUBTITLE}}, {{SLUG}}, {{CATEGORY}}, {{META_DESCRIPTION}}
    - {{KEYWORDS}}, {{PUBLISH_DATE}} (YYYY-MM-DD), {{READ_TIME}}, {{SUBCATEGORY}}
    - {{SOURCE_COUNT}}, {{VERDICT}}, {{TLDR_SUMMARY}}, {{EXECUTIVE_SUMMARY}}

    ### 4. Build article sections (MINIMUM 7 sections)
    Structure MUST include:
    - Section 1-2: The claim and what actually happened
    - Section 3-4: Core forensic analysis from original research
    - Section 5: Evidence deep-dive (from expanded research — analyze key documents/videos/data in detail)
    - Section 6: Contemporary context / "Why This Matters Now" (from expanded research — who's in charge, political dimensions)
    - Section 7: Conclusion

    Build citation links: <a href="#source-N" class="citation-link" onclick="highlightSource(event, 'source-N')">[N]</a>
    Build 2-3 Chart.js configs with canvas elements inside height-constrained divs
    Build data tables where appropriate
    Verdict box class: green (true/mostly true), amber (mixed/context), red (false/misleading)

    ### 4.4. Video Verification (HARD GATE — uses sora-decompiler MCP)
    Before embedding any video, validate it using the video-validator agent.

    For each candidate video in the research file's `## Embeddable Media` section:
    1. Call `mcp__sora-decompiler__get_metadata` — check duration, embeddability, language hint
    2. Call `mcp__sora-decompiler__extract_audio` — verify language matches report (English), check transcript
    3. Call `mcp__sora-decompiler__extract_frames` — visually verify content matches topic (multimodal)
    4. Verify oEmbed works for YouTube videos

    **Only videos that PASS all gates get embedded.** Failed videos are logged with reasons.

    If sora-decompiler MCP is unavailable, fall back to oEmbed-only verification (non-blocking).
    See `.claude/agents/video-validator.md` for full protocol.

    ### 4.5. Insert video embeds (from PASSED videos only)
    For each video/preview found during research, insert an embed at the most relevant point in the article.

    **YouTube videos** — use iframe embed:
    ```html
    <figure class="video-embed">
        <span class="video-source-badge youtube">YouTube</span>
        <div class="video-container">
            <iframe src="https://www.youtube-nocookie.com/embed/{VIDEO_ID}"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen loading="lazy"
                    title="{VIDEO_TITLE}"></iframe>
        </div>
        <figcaption>{CAPTION} <a href="#source-N" class="citation-link" onclick="highlightSource(event, 'source-N')">[N]</a></figcaption>
    </figure>
    ```

    **Non-embeddable sources** (X posts, news articles, deleted videos) — use rich link preview card:
    ```html
    <figure class="video-embed">
        <span class="video-source-badge x">X</span>
        <a href="{ARTICLE_URL}" target="_blank" rel="noopener" class="video-fallback">
            <div class="link-preview-thumb">
                <img src="{OG_IMAGE_URL}" alt="{ALT_TEXT}" loading="lazy">
            </div>
            <div class="link-preview-body">
                <div class="link-preview-source"><i data-lucide="at-sign"></i> {DOMAIN}</div>
                <div class="link-preview-title">{HEADLINE}</div>
                <div class="link-preview-excerpt">{SHORT_EXCERPT}</div>
                <div class="link-preview-cta"><i data-lucide="external-link"></i> Read more</div>
            </div>
        </a>
        <figcaption>{CAPTION} <a href="#source-N" class="citation-link" onclick="highlightSource(event, 'source-N')">[N]</a></figcaption>
    </figure>
    ```

    Badge classes: `youtube`, `rumble`, `tiktok`, `x`, `cspan`
    Place embeds AFTER the section they relate to, before the next section starts.
    Target: 1-3 embeds per report. Do NOT force embeds if no relevant media was found.

    ### 5. Build source cards
    Include ALL sources — both original AND expanded. Target: 18-25 sources total.
    Each source card needs id="source-N" matching citation links in the article.

    ### 6. Read current js/reports-data.js to find current top ID
    Add new entry at TOP. New ID = -(|current_top_id| + 1)

    Chart preview config rules (CRITICAL):
    - `hbar`: supports `colors` array for per-bar colors
    - `donut`: supports `colors` array for per-segment colors
    - `bar`: single `color` ONLY — NO `colors` array (silently ignored)
    - `line`: single `color` ONLY

    ### 7. Read vercel.json, add 3 entries (alphabetical):
    - Redirect: /localreports/{SLUG}.html → /{SLUG} (permanent)
    - Redirect: /{SLUG}.html → /{SLUG} (permanent)
    - Rewrite: /{SLUG} → /localreports/{SLUG}.html

    ### 8. Verify: grep -c '{{' localreports/{SLUG}.html → must be 0

    ## Rules
    CRITICAL: You are generating HTML from a research file. Do NOT add any factual
    claims, model names, statistics, dates, or benchmarks that are not explicitly
    present in the research file. If the research file doesn't provide a specific
    detail, leave it out rather than filling in from your training data.
    A gap is better than a wrong fact.

    - NO Wikipedia sources
    - NO purple (#8b5cf6)
    - Source count in sidebar MUST match actual source cards
    - Every [N] citation must have matching source-N ID
    - At least 2 charts
    - Minimum 7 article sections
    - Minimum 18 sources (use both original + expanded)
    - Use &amp; for ampersands in HTML attributes
    - Do NOT run any git commands

    Write ALL files. Do not return content.
```

---

## Phase 3.5: FACT-CHECK (parallel Task agents)

After ALL reports are generated, launch fact-checker agents for all reports simultaneously:

```
Task tool:
  subagent_type: "general-purpose"
  model: "sonnet"
  description: "Fact-check: [slug]"
  prompt: |
    You are a journalist's fact-checker for GenuVerity. Your job is to verify every
    factual claim in this report is accurate AS OF RIGHT NOW — not as of when it was
    drafted, not as of when the source was published. Currency IS accuracy. A claim
    that was true last month but is outdated today is WRONG.

    **Report:** /Users/klop/GenuVerity7/localreports/{SLUG}.html

    ## Protocol

    ### Step 1: Extract ALL factual claims
    Read the HTML and extract every instance of:
    - Model names — and check if they've been SUPERSEDED (GPT-4o → GPT-5.2, etc.)
    - Version numbers — check if newer versions exist
    - Dates — verify accuracy AND check for developments since
    - Statistics — check if updated numbers exist
    - Benchmarks — check if newer benchmarks/scores exist
    - Tool/product names — check if renamed, discontinued, or versioned up
    - Organization/people — check if titles/roles are CURRENT
    - Prices — check against current pricing pages
    - Capabilities — check against latest release notes
    - Legal/regulatory — check if "proposed" has become "finalized"

    Build a numbered list. Target: 15-30 claims.

    ### Step 2: Chart & Table Currency Audit
    Read ALL Chart.js configs and HTML tables. For each:
    - Are the model names / entities CURRENT? (not last-gen)
    - Is the data from the most recent available source?
    - Is it clearly labeled as historical if using old data?
    A chart showing "GPT-4o" rates without "Historical" labeling is STALE.

    ### Step 3: WebSearch verification (10-15 searches)
    Every verification must come from WebSearch. Frame: "What is the CURRENT state?"
    1. Model/tool currency (3-4 searches): latest versions, current names
    2. Statistical currency (2-3 searches): updated numbers, latest reports
    3. People/org currency (2-3 searches): current titles, leadership changes
    4. Date/event accuracy (1-2 searches): correct dates, developments since
    5. Legal/regulatory currency (1-2 searches): finalized rules, decided cases

    ### Step 4: Classify each claim
    - VERIFIED — confirmed accurate AND current by WebSearch
    - STALE — was true but superseded (old model, old stat, former title, unlabeled old chart)
    - INCORRECT — demonstrably wrong
    - UNVERIFIABLE — cannot confirm or deny

    ### Step 5: Verdict
    - 0 STALE + 0 INCORRECT + ≤3 UNVERIFIABLE → PASS
    - ANY STALE or INCORRECT → FAIL
    - >3 UNVERIFIABLE → FAIL

    ## Output Format
    Return EXACTLY:
    ```
    FACT-CHECK: {SLUG}
    CLAIMS: {N}
    CHARTS/TABLES AUDITED: {N}
    VERIFIED: {N}
    STALE: {N} — {list each with correction needed}
    INCORRECT: {N} — {list each with correction needed}
    UNVERIFIABLE: {N}
    CHART ISSUES: {N} — {list each with fix}
    VERDICT: PASS|FAIL
    CORRECTIONS NEEDED:
    1. OLD: "{exact old text}" → NEW: "{exact new text}"
    ...
    ```
```

Launch ALL fact-checker agents in parallel (one per report).

Collect results. Print a summary:
```
| Report | Claims | Verified | Stale | Incorrect | Unverifiable | Verdict |
|--------|--------|----------|-------|-----------|--------------|---------|
```

---

## Phase 3.6: FIX-FACTS (you, the Coordinator)

For each report that FAILED fact-check:
1. Read the specific corrections from the fact-checker output
2. Apply each correction directly using the Edit tool on the HTML file
3. Re-launch the fact-checker for ONLY the fixed reports to confirm they now pass
4. Reports that pass on re-check proceed to Phase 4
5. If a report fails fact-check twice, flag it for manual review and exclude from this batch

---

## Phase 4: TEST (parallel QA agents)

After ALL reports are generated, launch QA testers for all reports simultaneously:

```
Task tool:
  subagent_type: "general-purpose"
  model: "sonnet"
  description: "QA test: [slug]"
  prompt: |
    You are a QA tester for GenuVerity. Validate this report rigorously.

    **Report:** /Users/klop/GenuVerity7/localreports/{SLUG}.html

    Run every check below. Return a structured pass/fail report.

    ## Tests

    ### T1: No Placeholders
    Read the HTML file. Search for `{{` — count must be 0.
    PASS/FAIL + count

    ### T2: Source Count Match
    The sidebar shows a source count number. Count the actual <a class="source-card"> elements.
    These MUST match.
    PASS/FAIL + expected vs actual

    ### T3: Citation Integrity
    Find all citation links [N] in the article. For each, verify a matching id="source-N" exists in the sidebar.
    PASS/FAIL + list any orphaned citations

    ### T4: Chart Exists
    At least one <canvas> element must exist with a matching Chart.js `new Chart()` config.
    PASS/FAIL + chart count

    ### T5: No Wikipedia
    Search for "wikipedia.org" in source card URLs. Must be 0.
    PASS/FAIL

    ### T6: No Purple
    Search for "#8b5cf6" or "purple" in the file. Must be 0.
    PASS/FAIL

    ### T7: SEO Metadata
    Check these exist and are non-placeholder:
    - <title> tag (not empty, no {{)
    - meta description
    - canonical URL
    - og:title, og:description, og:image
    - twitter:card
    PASS/FAIL + any missing

    ### T8: reports-data.js Entry
    Read /Users/klop/GenuVerity7/js/reports-data.js and search for the slug "{SLUG}".
    Must have an entry with: id, title, slug, category, date, sources, readTime, verdict, excerpt, chart.
    Verify chart config follows rules (no `colors` on type `bar`).
    PASS/FAIL

    ### T9: vercel.json Routes
    Read /Users/klop/GenuVerity7/vercel.json and search for "{SLUG}".
    Must have exactly 3 entries: 2 redirects + 1 rewrite.
    PASS/FAIL + count found

    ### T10: Content Quality (ENHANCED for v2)
    - Minimum 18 sources (was 8 in v1)
    - Executive summary present (not placeholder)
    - TL;DR present (not placeholder)
    - At least 7 article sections (was 3 in v1)
    - At least 2 charts (was 1 in v1)
    - Evidence deep-dive or detailed analysis section present
    - Contemporary context or "why this matters" section present
    - Claim vs Reality table OR data table present
    PASS/FAIL + notes

    ### T11: Factual Currency Spot-Check
    Extract 5 random factual claims from the report (model names, statistics, dates, benchmarks, tool names).
    WebSearch each one to check if it's current and accurate as of today.
    - If any claim is demonstrably outdated or incorrect → FAIL
    - This is a safety-net spot-check (the dedicated fact-checker already ran)
    - Log which 5 claims were checked and their status
    PASS/FAIL + claims checked

    ### T12: Video Embeds
    Check for video embeds (`class="video-embed"`):
    - Count embeds in the report
    - YouTube iframes must use `youtube-nocookie.com/embed/`
    - Rich link preview cards must have `.link-preview-thumb img`, `.link-preview-title`, `.link-preview-cta`
    - 0 embeds = WARN (non-blocking), malformed embeds = FAIL
    PASS/WARN/FAIL + embed count

    ## Output Format
    Return EXACTLY this format:
    ```
    REPORT: {SLUG}
    T1 Placeholders: PASS|FAIL (details)
    T2 Source Count: PASS|FAIL (expected vs actual)
    T3 Citations: PASS|FAIL (orphans: [list])
    T4 Charts: PASS|FAIL (count: N)
    T5 Wikipedia: PASS|FAIL
    T6 Purple: PASS|FAIL
    T7 SEO: PASS|FAIL (missing: [list])
    T8 ReportsData: PASS|FAIL (details)
    T9 Vercel: PASS|FAIL (entries: N)
    T10 Content: PASS|FAIL (sources: N, sections: N, charts: N)
    T11 Factual: PASS|FAIL (checked: [5 claims], stale: [list])
    T12 VideoEmbeds: PASS|WARN|FAIL (embeds: N)
    OVERALL: PASS|FAIL
    FIXES NEEDED: [list specific fixes, or "none"]
    ```
```

Launch ALL QA agents in parallel (one per report).

Collect results. Print a summary table:
```
| Report | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | Result |
|--------|----|----|----|----|----|----|----|----|----|-----|-----|--------|
```

---

## Phase 5: FIX (you, the Coordinator)

For each report that FAILED QA:
1. Read the specific failures from the QA report
2. Fix them directly (Edit tool for HTML, reports-data.js, vercel.json)
3. Re-run ONLY the failed tests to confirm fixes

If a report has > 5 failures, consider regenerating it entirely (re-run Phase 3 for that report).

If all reports pass, proceed to Phase 6.

---

## Phase 6: PUBLISH (you, the Coordinator)

Skip if `--no-publish`.

```bash
git add localreports/*.html
git add automation/deep-research-output/*-YYYYMMDD.md
git add js/reports-data.js
git add vercel.json
```

```bash
git commit -m "report: daily batch — N reports [YYYY-MM-DD]

Topics:
- [topic 1]
- [topic 2]
- [topic 3]
- [topic 4]
- [topic 5]

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

```bash
git push -u origin report/daily-YYYY-MM-DD
```

Create PR:
```bash
gh pr create --base main --title "Daily Reports: YYYY-MM-DD (N reports)" --body "$(cat <<'EOF'
## Summary
Daily automated fact-check batch (Deep Edition v2).

| # | Title | Verdict | Sources |
|---|-------|---------|---------|
| 1 | ... | ... | ... |
...

## Fact-Check Results
All N reports passed factual verification (Phase 3.5).

## QA Results
All N reports passed 11-point validation (including T11 factual spot-check).

## Depth Expansion
Each report underwent 3-pass depth expansion:
- Pass A: Primary source gap analysis
- Pass B: Evidence deep-dive
- Pass C: Contemporary context

## Test plan
- [ ] Verify each report renders at its slug URL
- [ ] Check charts render on each report
- [ ] Verify mobile responsiveness
- [ ] Review source quality (target: 18-25 sources, 40%+ primary)

🤖 Generated with [Claude Code](https://claude.com/claude-code) `/daily` pipeline v2
EOF
)"
```

---

## Phase 7: SUMMARY

Print final status:
```
## Daily Report Complete — YYYY-MM-DD (Deep Edition v2)

### Pipeline Stats
- Topics discovered: [N candidates]
- Topics selected: [N]
- Research agents: [N] (batches of 3+2)
- Depth expansion agents: [N] (batches of 3+2)
- Reports generated: [N]
- Fact-check agents: [N]
- Fact-check pass rate: [N/N]
- Fact corrections applied: [N]
- QA tests run: [N × 11 = total]
- QA pass rate: [N/N]
- QA fixes applied: [N]

### Reports
| # | Title | Verdict | Sources | Sections | Charts | QA | Slug |
|---|-------|---------|---------|----------|--------|-----|------|
| 1 | ... | ... | N | N | N | ✅ | ... |
| 2 | ... | ... | N | N | N | ✅ | ... |

### Published
- Branch: report/daily-YYYY-MM-DD
- PR: [URL]
- Vercel Preview: deploying
```

---

## Critical Rules

- **NEVER fabricate** sources, quotes, or data
- **NEVER use Wikipedia** as a source
- **NEVER skip research** — 5 rounds per topic (incl. video discovery), 15-25 WebSearch + 8-12 WebFetch each
- **NEVER skip depth expansion** — 3 passes per topic, 10-15 additional WebSearch + WebFetch each
- **NEVER skip fact-check** — every report gets Phase 3.5 verification before QA
- **NEVER skip QA** — every report gets 11-point testing (including T11 factual spot-check)
- **Sequential generation** — shared files prevent parallel report creation
- **Parallel everything else** — research, depth expansion, QA testing
- **Feature branch only** — never commit to main
- **Chart preview rules** — `bar` = single `color` only; `hbar`/`donut` = `colors` array OK
- **Report IDs** — negative, decrementing
- **Min 18 sources** per report (was 8 in v1), target 20-25
- **Min 7 sections** per report (was 3 in v1), including evidence deep-dive and contemporary context
- **At least 2 charts** per report (was 1 in v1)
- If topic yields < 8 sources after initial research, expansion should bring it to 18+
- Push triggers Vercel preview — always push unless `--no-publish`

## v2 Quality Targets vs v1

| Metric | v1 (old) | v2 (new) |
|--------|----------|----------|
| Sources per report | 8-15 | **18-25** |
| Article sections | 3-6 | **7-9** |
| Charts | 1+ | **2-3** |
| Video embeds | None | **1-3 per report** |
| Primary source ratio | ~30% | **40%+** |
| Evidence analysis | Generic | **Dedicated deep-dive section** |
| Contemporary context | None | **Dedicated "why now" section** |
| Research rounds | 4 | **5 + 3 expansion passes** |
