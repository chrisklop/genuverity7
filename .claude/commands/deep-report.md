# Deep Report: Autonomous Research-to-Publish Pipeline

Perform end-to-end fact-check report generation using WebSearch + WebFetch for research, then the existing `/generate-report` pipeline for HTML generation.

## Usage
```
/deep-report                           # 1 trending topic, full pipeline
/deep-report --count 3                 # 3 trending topics
/deep-report --topic "DHS shutdown"    # Specific topic (skip discovery)
/deep-report --count 5 --no-publish    # Research + generate, don't push
```

## Arguments: $ARGUMENTS

## Instructions

### 0. Parse Arguments
Parse `$ARGUMENTS` for flags:
- `--count N` → number of topics to research (default: 1)
- `--topic "..."` → skip Phase 1, use this topic directly
- `--no-publish` → skip Phase 5 (no branch/commit/push)

### Phase 1: Topic Discovery (skip if `--topic` provided)

Run ~10 WebSearch calls to find trending misinformation/viral claims:

**Fact-checker sites (3 searches):**
- `site:snopes.com OR site:politifact.com viral claim 2026`
- `site:factcheck.org OR site:reuters.com/fact-check fact check February 2026`
- `site:apnews.com/hub/ap-fact-check misinformation 2026`

**Platform trends (3 searches):**
- `viral misinformation TikTok 2026 this week`
- `trending false claim X Twitter debunked 2026`
- `Reddit conspiracy viral claim February 2026`

**Topic-specific (3-4 searches):**
- `health misinformation viral 2026`
- `political disinformation US 2026 this week`
- `AI deepfake viral false February 2026`
- `immigration claim viral debunked 2026`

**De-duplication:** Read `js/reports-data.js` and check each candidate's slug/title against existing reports. Skip anything already covered.

**Scoring criteria (pick top N):**
1. **Virality** — appears in multiple search results across sources
2. **Recency** — originated within last 7 days
3. **Platform spread** — found on 2+ platforms
4. **Harm potential** — health, safety, election, or financial harm
5. **Researchability** — enough primary sources exist to fact-check

Print the selected topic(s) and brief rationale before proceeding.

### Phase 2: Deep Research (parallel Task agents)

For each selected topic, launch a Task agent:

```
Task tool with:
  subagent_type: "general-purpose"
  model: "sonnet"
  prompt: [see below]
```

**Agent prompt template:**
```
You are a deep-research agent for GenuVerity, a fact-checking publication.

## Your Mission
Research the following topic thoroughly and produce a structured research markdown file.

**Topic:** {TOPIC_TITLE}
**Brief:** {ONE_SENTENCE_DESCRIPTION}

## Research Protocol

Execute 4 sequential rounds of research:

### Round 1: Broad Sweep (5-6 WebSearch calls)
Understand the claim landscape:
- Search for the core claim from multiple angles
- Find who originated it, who amplified it
- Identify fact-checks already published
- Note which platforms it spread on
- Find the earliest dated mention (patient zero)

### Round 2: Source Extraction (5-8 WebFetch calls)
Read the most promising pages from Round 1:
- Extract verbatim quotes with attribution
- Pull specific data points, statistics, dates
- Capture methodology details from studies/reports
- Note source credibility (government, academic, news org, blog, social media)
- Get exact URLs for citation

### Round 3: Gap-Filling (3-5 WebSearch + 2-3 WebFetch)
Fill holes in your evidence:
- Search for primary sources (government data, court documents, official statements)
- Find counter-evidence or opposing viewpoints
- Look for data suitable for charts (time series, comparisons, breakdowns)
- Search for expert commentary or academic analysis
- Verify any unconfirmed claims from earlier rounds

### Round 4: Cross-Verification (2-3 WebSearch)
Verify your key findings:
- Cross-check critical facts against independent sources
- Verify dates, names, and numbers
- Confirm patient zero timing
- Check if the narrative has evolved since your initial search

## Output Format

Write the complete research to: automation/deep-research-output/{SLUG}-{DATE}.md

Use this EXACT markdown structure:

```markdown
# Research: {TOPIC_TITLE}
**Researched:** {DATE}
**Researcher:** Claude Deep Research Pipeline

---

## Forensic Verdict Table

| Field | Finding |
|-------|---------|
| **Verdict** | True / Mostly True / Mixed / Misleading / False |
| **Patient Zero** | [Earliest identified source, with date] |
| **Propagation Vector** | [How it spread: platform → platform path] |
| **Velocity** | [Speed and scale metrics] |
| **Harm Level** | Low / Medium / High / Critical |

---

## Executive Summary

[2-3 paragraphs summarizing the claim, the evidence, and the verdict. Include [N] citation markers throughout.]

---

## Forensic Analysis

### Origin & Patient Zero
[Detailed analysis of where and when the claim originated]

### Propagation Map
[How the claim spread across platforms and media]

### Why It Spread
[Psychological, political, or social factors driving virality]

### Evidence Assessment
[Detailed examination of evidence for and against the claim]

---

## Claim vs Reality

| # | Claim | Reality | Sources |
|---|-------|---------|---------|
| 1 | [Specific claim] | [What evidence shows] | [N], [N] |
| 2 | ... | ... | ... |

---

## Timeline

| Date | Event | Source |
|------|-------|--------|
| YYYY-MM-DD | [Event] | [N] |
| ... | ... | ... |

---

## Chart Data

**Chart Title:** [Descriptive title]
**Chart Type:** bar | line | donut | hbar
**Data:**
| Label | Value |
|-------|-------|
| [label] | [number] |
| ... | ... |

[Include a second chart if the data supports it]

---

## Sources

1. **[Title]** — [Publisher/Author], [Date]. URL: [full URL]. Credibility: [High/Medium/Low]. Key quote: "[verbatim quote]"
2. ...
[Target 10-15 sources. Minimum 8. No Wikipedia.]
```

## Quality Requirements
- Minimum 8 sources (target 10-15)
- No Wikipedia sources
- At least 5 primary sources (government, academic, official statements, court docs)
- Every factual claim must have a citation [N]
- Include at least one chart-ready dataset
- Verbatim quotes from at least 3 different sources
- Timeline must have at least 5 entries
- Claim vs Reality table must have at least 3 rows
```

**Parallelism:** Launch up to 3 Task agents concurrently. If count > 3, batch them (first 3, then remaining).

Wait for all agents to complete. Check that each wrote its markdown file to `automation/deep-research-output/`.

### Phase 3: Validate Research Output

For each research markdown file:
1. Read the file
2. Verify it has all required sections (verdict table, executive summary, sources, chart data, timeline)
3. Count sources — must be >= 8
4. Check no Wikipedia sources
5. If validation fails, note the issue but continue (user can fix manually)

Print a summary of research quality for each topic.

### Phase 4: Report Generation (sequential)

For each validated research file, invoke the existing `/generate-report` pipeline:

```
/generate-report automation/deep-research-output/{slug}-{date}.md
```

This handles:
- Pass 1: Research markdown → structured JSON
- Pass 2: JSON → HTML report (from template)
- Update `js/reports-data.js`
- Update `vercel.json`

**IMPORTANT:** Run these sequentially, not in parallel. The `reports-data.js` and `vercel.json` files are shared and can't be edited concurrently.

### Phase 5: Publish (skip if `--no-publish`)

1. **Branch:** Create `report/deep-research-YYYY-MM-DD` branch (or use current if already on a report branch)
2. **Stage:** `git add` all new/modified files:
   - `localreports/*.html` (new reports)
   - `automation/deep-research-output/*.md` (research files)
   - `js/reports-data.js`
   - `vercel.json`
3. **Commit:** `git commit -m "report: deep-research batch — N reports [brief topic list]"`
4. **Push:** `git push -u origin [branch]`
5. **Print:** Summary with Vercel preview URL

### Phase 6: Final Summary

Print a completion summary:

```
## Deep Research Pipeline Complete

### Topics Researched
| # | Topic | Verdict | Sources | Quality |
|---|-------|---------|---------|---------|
| 1 | [title] | [verdict] | [count] | [Good/Fair/Needs Review] |

### Files Created
- Research: automation/deep-research-output/{slug}.md
- Report: localreports/{slug}.html

### Publishing
- Branch: report/deep-research-YYYY-MM-DD
- Vercel Preview: deploying...
- PR: [create if requested]

### Quality Notes
- [Any issues found during validation]
```

## Critical Rules
- NEVER skip the research phase — WebSearch + WebFetch are the core value
- NEVER fabricate sources or quotes — everything must come from actual WebSearch/WebFetch results
- NEVER use Wikipedia as a source
- Respect existing report pipeline — use `/generate-report` for HTML, don't reinvent
- Each Task agent should use 15-25 WebSearch + 8-12 WebFetch calls (don't skimp on research)
- If a topic doesn't yield enough sources (< 8), skip it and note why
