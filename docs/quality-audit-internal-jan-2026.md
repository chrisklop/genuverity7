# GenuVerity Quality Audit - January 2026 (Internal)

**Audit Date:** January 4, 2026
**Audit Type:** Hybrid (AI Scanner + Human Validation)
**Sample Size:** 28 reports (stratified by verdict)
**Scanner Version:** 1.0.0

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Reports Scanned | 28 |
| Total Concerns Flagged | 39 |
| Avg Concerns/Report | 1.4 |
| Clean Reports (0 concerns) | 6 (21%) |
| HIGH Severity | 5 |
| MEDIUM Severity | 18 |
| LOW Severity | 16 |

### Top Patterns Identified

1. **Undefined Verdicts (HIGH)** - 5 reports missing verdict assignment
2. **Absolutist Language (LOW)** - 11 instances of "no evidence" type claims
3. **Truncated Quotes (MEDIUM)** - 8 instances of ellipsis in quotes
4. **Opinion Source References (MEDIUM)** - 6 instances (mostly false positives)
5. **Missing Counter-Arguments (LOW)** - 5 reports don't address opposing viewpoint

---

## HIGH Severity Issues (Requires Immediate Action)

### Undefined Verdicts

These reports have no verdict assigned in `reports-data.js`:

| Report | Category | Sources | Action Required |
|--------|----------|---------|-----------------|
| `golden-fleet-analysis` | Strategic Assessment | 0 | Assign verdict or reclassify as non-fact-check |
| `dominion-voting-claims-2020` | Forensic Fact Check | 21 | Assign verdict (likely FALSE based on content) |
| `boat-strike-investigation` | Military Investigation | 0 | Assign verdict or reclassify |
| `epstein-air-logistics` | Forensic Audit | 32 | Assign verdict or reclassify as investigative |
| `us-argentina-farm-crisis-2025` | Economic Analysis | 1 | Needs more sources + verdict |

**Recommendation:** Review each report and either:
1. Assign appropriate verdict (true/false/misleading/mixed/context)
2. Reclassify as "Analysis" or "Investigation" type (non-verdict content)

---

## MEDIUM Severity Issues (Review Recommended)

### Vague Authority Appeals

Reports using "experts say" or "studies show" without specifics:

| Report | Line | Excerpt | Context |
|--------|------|---------|---------|
| `youtube-radicalization-pipeline` | 160 | "studies show" | "Systematic review of 23 studies shows mixed evidence" |
| `youtube-radicalization-pipeline` | 247 | "researchers found" | "Tracking 1,000+ U.S. residents over six months, researchers found..." |
| `meta-ends-fact-checking-2025` | 296 | "researchers found" | "During the 2024 U.S. presidential election, researchers found..." |
| `boat-strike-investigation` | 828 | "experts say" | "Stanford Law experts say all strikes may constitute murder..." |

**Validation Notes:**
- `youtube-radicalization-pipeline:160` - Links to PMC study, but could name authors
- `youtube-radicalization-pipeline:247` - Could specify study name/authors
- `meta-ends-fact-checking-2025:296` - Should cite specific study
- `boat-strike-investigation:828` - Does cite "Tom Dannenbaum, Stanford Law" later

**Recommendation:** When possible, replace "experts say" with "Dr. [Name] at [Institution] stated..." and link to specific source.

---

### Truncated Quotes

Quotes containing ellipsis that may strip context:

| Report | Line | Quote Excerpt |
|--------|------|---------------|
| `grok-ai-misinformation-crisis` | 354 | "...that is false... It is insulting to the families..." |
| `grok-ai-misinformation-crisis` | 385 | "...to fact-check for them." |
| `hhs-vaccine-autism-claims` | - | "...is not an evidence-based claim..." |
| `hhs-vaccine-autism-claims` | - | "...is scientifically unsupportable..." |
| `disinformation-architecture-2025` | 317 | "If I have to create stories... that's what I'm going to do." |
| `tda-gang-claims-2025` | 207 | "...The narrative that's been prior is simply not true..." |
| `dominion-voting-claims-2020` | 861 | "He kept washing out of courses... He's not an intelligence analyst..." |
| `boat-strike-investigation` | 750 | Long legal quote with "...Instead, all of the strikes qualify as murder..." |

**Validation Notes:**
- Most appear to be legitimate truncation for readability
- `disinformation-architecture-2025:317` (Vance quote) - should verify full context preserved
- `hhs-vaccine-autism-claims` quotes are from official court documents - appropriate truncation

**Recommendation:** For quotes from subjects being fact-checked, verify truncation doesn't alter meaning. Consider adding "[full quote in source]" notation.

---

### Opinion Source Detection

Scanner flagged "opinion" keyword appearances:

| Report | Line | Context | Valid Concern? |
|--------|------|---------|----------------|
| `grok-ai-misinformation-crisis` | 203 | Word "oped" in text | FALSE POSITIVE |
| `primetime-special-legitimization` | 95 | Reference to content | FALSE POSITIVE |
| `ebola-outbreak-drc-2025` | 506 | "infodemic management" | FALSE POSITIVE |
| `225-executive-orders-2025` | 368 | "characterizations are opinion, not fact" | FALSE POSITIVE (self-aware) |
| `225-executive-orders-2025` | 386 | "Public Opinion: Is Trump..." | FALSE POSITIVE (poll reference) |
| `225-executive-orders-2025` | 620 | "public opinion: Americans are divided" | FALSE POSITIVE (poll reference) |

**Validation Notes:**
- All 6 flagged instances are FALSE POSITIVES
- Scanner pattern too broad - picking up legitimate uses of "opinion" word

**Recommendation:** Refine scanner to exclude:
- "public opinion" (polls)
- Self-aware statements like "X is opinion, not fact"
- References to opinion content being analyzed

---

## LOW Severity Issues (Style/Enhancement)

### Absolutist Language

Phrases like "no evidence" that may need qualification:

| Report | Excerpt | Context | Valid? |
|--------|---------|---------|--------|
| `portland-burning-narrative-2025` | "no evidence" | "finding no evidence that protests grew out of control" | VALID USE |
| `hhs-vaccine-autism-claims` | "no evidence" | "no evidence of a link to autism" | VALID USE |
| `yogi-adityanath-deepfake-2025` | "no basis" | "deepfake with no basis in reality" | VALID USE |
| `minnesota-fraud-investigation-2025` | "no evidence" | "no evidence of fraud had been documented" | VALID USE |
| `dc-midair-collision-misinfo-2025` | "no evidence" | "no evidence linking DEI policies" | VALID USE |
| `dc-midair-collision-misinfo-2025` | "zero evidence" | "zero evidence of deliberate action" | VALID USE |
| `ebola-outbreak-drc-2025` | "completely false" | "This is completely false and potentially dangerous" | VALID USE |
| `ebola-outbreak-drc-2025` | "no evidence" | "no evidence that salt water has any effect" | VALID USE |
| `nigeria-nin-bank-access-2025` | "no evidence" | "no evidence of mass account freezes" | VALID USE |
| `dominion-voting-claims-2020` | "no evidence" | "no evidence was ever produced" | VALID USE |
| `dominion-voting-claims-2020` | "No evidence" | "No evidence of Dominion fraud has ever been substantiated" | VALID USE |

**Validation Notes:**
- All 11 instances appear to be VALID uses of absolutist language
- When stating factual conclusions about absence of evidence, this phrasing is appropriate
- Scanner is too aggressive on this pattern

**Recommendation:** Remove or downgrade this pattern - "no evidence" is appropriate fact-checking language when substantiated.

---

### Missing Counter-Arguments

Reports with FALSE/MISLEADING verdicts that don't appear to explain why people believe the claim:

| Report | Verdict | Valid Concern? |
|--------|---------|----------------|
| `portland-burning-narrative-2025` | false | PARTIAL - Could add more on media narrative origins |
| `starmer-curfew-fake-video-2025` | false | VALID - Doesn't explain deepfake spread dynamics |
| `yogi-adityanath-deepfake-2025` | false | VALID - Doesn't explain political context |
| `target-satanic-campaign-2025` | misleading | PARTIAL - Covers some conspiracy context |
| `sa-self-defense-right-2025` | misleading | VALID - Doesn't explain crime anxiety driving belief |

**Validation Notes:**
- 3 of 5 are valid concerns - reports would benefit from explaining WHY the false claim gained traction
- This builds reader understanding and reduces dismissiveness

**Recommendation:** Add a "Why This Spread" or "Understanding the Claim" section to FALSE/MISLEADING reports explaining the psychological/social dynamics.

---

## Clean Reports (Exemplars)

These 6 reports had **zero quality concerns** flagged:

1. **`meta-tpfc-exit-2025`** (context) - 16 sources
2. **`hegseth-signalgate-2025`** (context) - 16 sources
3. **`project-2025-military-orders`** (mixed) - 10 sources
4. **`government-shutdown-2025`** (true) - 16 sources
5. **`american-political-disinfo`** (true) - 11 sources
6. **`iran-nuclear-crisis`** (true) - 18 sources

**Use as templates for future reports.**

---

## Scanner Accuracy Assessment

| Concern Type | Flags | Valid | False Positive Rate |
|--------------|-------|-------|---------------------|
| Undefined verdict | 5 | 5 | 0% |
| Vague authority | 4 | 3 | 25% |
| Truncated quotes | 8 | 2 | 75% |
| Opinion source | 6 | 0 | 100% |
| Absolutist language | 11 | 0 | 100% |
| Missing counter-arg | 5 | 3 | 40% |

**Overall Scanner Precision:** ~33% (13 valid / 39 flagged)

**Scanner Improvements Needed:**
1. Remove absolutist language pattern (too many false positives)
2. Refine opinion source pattern to exclude "public opinion" polls
3. Reduce truncated quote sensitivity (ellipsis often appropriate)
4. Keep vague authority and missing counter-argument patterns

---

## Action Items

### Immediate (This Week)

- [ ] Assign verdicts to 5 undefined-verdict reports or reclassify them
- [ ] Review Vance quote truncation in `disinformation-architecture-2025`

### Short-Term (This Month)

- [ ] Add "Why This Spread" sections to `starmer-curfew-fake-video-2025`, `yogi-adityanath-deepfake-2025`, `sa-self-defense-right-2025`
- [ ] Specify researcher names in `youtube-radicalization-pipeline` and `meta-ends-fact-checking-2025`

### Scanner Updates

- [ ] Remove `absolutist-language` pattern
- [ ] Refine `opinion-source` pattern to reduce false positives
- [ ] Add exclusion for "public opinion" phrases

---

## Appendix: Full Scan Results

Raw output available at: `tools/quality-scan-results.json`

### Reports by Concern Count

| Concerns | Reports |
|----------|---------|
| 0 | meta-tpfc-exit-2025, hegseth-signalgate-2025, project-2025-military-orders, government-shutdown-2025, american-political-disinfo, iran-nuclear-crisis |
| 1 | starmer-curfew-fake-video-2025, primetime-special-legitimization, minnesota-fraud-investigation-2025, disinformation-architecture-2025, tda-gang-claims-2025, target-satanic-campaign-2025, sa-self-defense-right-2025, nigeria-nin-bank-access-2025, meta-ends-fact-checking-2025, golden-fleet-analysis, epstein-air-logistics, us-argentina-farm-crisis-2025 |
| 2 | portland-burning-narrative-2025, yogi-adityanath-deepfake-2025, dc-midair-collision-misinfo-2025, youtube-radicalization-pipeline |
| 3 | grok-ai-misinformation-crisis, hhs-vaccine-autism-claims, ebola-outbreak-drc-2025, 225-executive-orders-2025, boat-strike-investigation |
| 4 | dominion-voting-claims-2020 |

---

*This is an internal document. Public summary will exclude specific report names and focus on aggregate patterns.*
