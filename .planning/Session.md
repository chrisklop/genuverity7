# GenuVerity Session Context

> **Last Updated:** 2026-02-01
> **Status:** Planning Epstein Files Hub expansion
> **Current Milestone:** Epstein Files Hub - Phase 1 Planning

---

## What Is This Project?

GenuVerity is a fact-checking platform (190+ reports) using source-first methodology. Stack: Static HTML, Chart.js, FastAPI, Vercel.

**New Initiative:** Epstein Files Hub - a fact-checked document explorer for the DOJ's 3.5M+ page Epstein release.

---

## Current Milestone: Epstein Files Hub

**Unique Value Proposition:** "Search with truth indicators" - the only platform combining document access with verification badges and misinformation alerts.

### Why This Matters
- DOJ warns files include "fake or falsely submitted" content
- 16+ files already removed after release
- No existing tool distinguishes FBI evidence from anonymous tips
- Viral misinformation spreads faster than verification

---

## What's Completed

- [x] Expanded Epstein Files 2026 report (18 sources)
- [x] Merged 6 report branches to main
- [x] Fixed mobile horizontal scroll issue
- [x] Installed epstein-email-explorer MCP (2,322 emails)
- [x] Wrote research brief for Deep Research
- [x] Analyzed Deep Research results
- [x] Defined technical architecture
- [x] Defined badge system (Admiralty-style A-F / 1-6)

---

## What's Next (Pending)

### Phase 1: Archive Infrastructure
1. [ ] Set up WARC capture pipeline
2. [ ] Configure ChangeDetection.io for DOJ pages
3. [ ] Mirror all 12 DOJ data sets
4. [ ] Obtain COURIER/Pinpoint deleted files
5. [ ] Create diff log system for tracking changes

### Phase 2: Processing Pipeline
6. [ ] OCR pipeline for non-searchable docs
7. [ ] spaCy NER + alias dictionary setup
8. [ ] Evidence classifier (badge assignment)
9. [ ] Splink entity resolution
10. [ ] Vector embeddings generation

### Phase 3: Knowledge Layer
11. [ ] Misinformation database (seed with known claims)
12. [ ] ClaimReview integration
13. [ ] Entity graph construction
14. [ ] "What's New" delta engine

### Phase 4: Interface
15. [ ] Search UI with verification badges
16. [ ] Misinformation alert system
17. [ ] Network visualization (Cytoscape.js/Sigma.js)
18. [ ] Timeline view
19. [ ] Release tracker
20. [ ] Document viewer with provenance panel

---

## Key Files

| File | Purpose |
|------|---------|
| `.planning/Session.md` | This file - session tracking |
| `.planning/epstein-files-research-brief.md` | Research brief for Deep Research |
| `.planning/EPSTEIN-HUB-ROADMAP.md` | Detailed technical roadmap |
| `localreports/epstein-files-2026-revelations.html` | Current Epstein report |

---

## Quick Reference

**Badge System:**
- A (Court Record) → B (Gov Record) → C (Verified External) → D (Unverified) → E (News Clipping) → F (Flagged/Debunked)

**Key Tools Identified:**
- Archive: WARC, ChangeDetection.io, Perma.cc, Save Page Now
- NER: spaCy + EntityRuler
- Entity Resolution: Splink
- Visualization: Cytoscape.js (rich), Sigma.js (large scale)
- Misinformation: ClaimReview, Google Fact Check Explorer

---

## Notes

- MCP server installed: `epstein-email-explorer` (2,322 emails)
- MCP server available: `epstein_rag_mcp` (20K docs via Qdrant)
- Production revert point: `3f35110` (before today's merges)
- Current main: `5deb616` (includes mobile fix)
