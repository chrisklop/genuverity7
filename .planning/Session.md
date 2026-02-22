# Session Context

> **Last Saved:** 2026-02-22
> **Project:** GenuVerity7 — Fact-checking platform

---

## TL;DR (Read This First)

GenuVerity is a fact-checking website (190+ reports) deployed on Vercel. We just finished updating all 7 reports in the "AI Manipulation Playbook" series to ensure every model name, benchmark, and factual claim is current as of Feb 22, 2026. The edits are done across 7 files but NOT yet committed. They're on branch `report/ai-manipulation-series`. User needs to confirm before commit+push.

---

## Current State

**Working On:** Updating 7 AI Manipulation Playbook reports with verified-current model names and corrected factual errors
**Blocked By:** Waiting for user to confirm commit+push
**Next Step:** Commit all changes to `report/ai-manipulation-series` branch and push to trigger Vercel preview

---

## Recent Decisions & Context

- Decision: Research-first approach — Reason: User was angry that initial edits were made by blindly trusting the plan's model name lookup table without WebSearch verification. ALL changes were reverted and re-done with web-verified data. Added "Research-First Rule" to MEMORY.md.
- Decision: Category A/B classification for model names — Reason: Benchmark citations (Cat B) keep original model names with "(now succeeded by X)" notes because the data was measured on those specific models. Direct recommendations (Cat A) get updated to current models.
- Decision: Keep FMTI scores as-is — Reason: Pre-response vs post-response scores create ambiguity. Report uses "~" approximations which are defensible.
- Decision: Don't change Vectara chart DATA, only add context — Reason: Old benchmark numbers (0.7%-10.1%) are accurate for the models tested. New HHEM-2.3 methodology is incomparable. Added extensive figcaptions explaining this.

---

## Key Files Changed

- `localreports/ai-data-poisoning-attacks-2026.html` — MCPTox date fix (Jul→Aug), attribution fix (Lakera→Wang et al.)
- `localreports/synthetic-content-farms-model-collapse-2026.html` — C2PA v2.1→v2.3, tense fix
- `localreports/llm-vulnerability-ranking-2026.html` — 13 edits: Beiermeister characterization, breach separation, FLI grade, Constitutional Classifiers misattribution, model succession notes, recommendations
- `localreports/ai-political-media-control-2026.html` — SpaceX xAI acquisition context
- `localreports/llm-defense-mechanisms-2026.html` — Claude 3.7 successor context note
- `localreports/protect-yourself-ai-misinformation-2026.html` — TL;DR rewrite, table headers, benchmark methodology caveat, chart labels
- `js/reports-data.js` — Updated excerpt + chart preview labels

---

## Pending Tasks

- [ ] Commit + push all 7-file update to `report/ai-manipulation-series` (awaiting user confirmation)
- [ ] Create PR for the branch

---

## Current Model Landscape (Verified Feb 22, 2026)

| Old Model | Current Model |
|-----------|--------------|
| GPT-4o (retired Feb 13) | GPT-5.2 |
| Claude 3.7 Sonnet / 3 Opus | Claude Sonnet 4.6 / Opus 4.6 |
| Gemini 2.0 Flash | Gemini 3.1 Pro |
| Grok-2 / Grok-3 | Grok 4.20 Beta |
| Llama 3.x | Llama 4 Scout/Maverick |

---

## Session Log

### 2026-02-22 — AI Manipulation Series Update
- Started with plan to update model names across 7 reports
- First attempt: blindly executed plan's lookup table without verification — user called this out as unacceptable for a fact-checking site
- Reverted ALL changes via `git checkout`
- Launched 3 deep research agents in parallel to verify every claim
- Research found critical errors beyond model names: Beiermeister mischaracterization, ChatGPT breach conflation, FLI grade bug, Constitutional Classifiers misattribution, Vectara benchmark methodology change
- Re-executed all edits using research-verified data: 7 files, 35 insertions, 35 deletions
- Added "Research-First Rule" to MEMORY.md
- Awaiting user confirmation to commit+push

### 2026-02-01 — Epstein Files Hub Phase 1
- Completed Hub landing page and search page
- Created badge system (A-F)
- Set up MCP servers for email and document search

---

## Epstein Hub Status (Paused)

Phase 1 complete (landing + search pages). Phase 2 (Supabase integration) not started. See `EPSTEIN-HUB-ROADMAP.md` for full plan.

---

## Quick Reference

**Badge System (Epstein):** A (Court) → B (Gov) → C (Verified) → D (Unverified) → E (News) → F (Flagged)
**Branch:** `report/ai-manipulation-series`
**MCP Servers:** `epstein-email-explorer`, `epstein-rag` (requires Docker)
