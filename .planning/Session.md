# GenuVerity Session Context

> **Last Updated:** 2026-02-01
> **Status:** Phase 1 Hub UI complete - landing and search pages live
> **Current Milestone:** Epstein Files Hub - Phase 1 Complete

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
- [x] Installed epstein-rag MCP (20K+ docs via Qdrant semantic search)
- [x] **Created `/epstein-files/index.html`** - Hub landing page with stats, search, features, revelations grid
- [x] **Created `/epstein-files/search.html`** - Document search with badge filters and misinfo alerts
- [x] **Created `/css/epstein-hub.css`** - Hub styling with badge colors (A-F)
- [x] **Created `/js/epstein-hub-data.js`** - Static data (revelations, misinfo alerts, stats)
- [x] **Updated navbar/footer** - Added "Epstein Files" link to navigation

---

## What's Next (Pending)

### Phase 2: Supabase Integration
1. [ ] Create Supabase migration for new tables (epstein_documents, epstein_entities, etc.)
2. [ ] Build document ingestion script (hash → store)
3. [ ] Wire search.html to `epstein-rag` MCP for real semantic search
4. [ ] Display badges from Supabase metadata

### Phase 3: Misinformation Layer
5. [ ] Seed `epstein_misinfo` table with known false claims
6. [ ] Create dynamic alert component in search.html
7. [ ] Link alerts to existing fact-check reports

### Phase 4: Visualizations
8. [ ] Create `network.html` with Cytoscape.js
9. [ ] Create `timeline.html` for chronological browsing
10. [ ] Create `releases.html` for DOJ release tracking

### Phase 5: Automation
11. [ ] Create delta detection script for new releases
12. [ ] Build revelation ranking algorithm
13. [ ] Create report generation pipeline
14. [ ] Set up ChangeDetection.io for DOJ monitoring

### Archive Infrastructure (Backlog)
- [ ] Set up WARC capture pipeline
- [ ] Mirror all 12 DOJ data sets
- [ ] Obtain COURIER/Pinpoint deleted files

---

## Key Files

| File | Purpose |
|------|---------|
| `.planning/Session.md` | This file - session tracking |
| `.planning/EPSTEIN-HUB-ROADMAP.md` | Detailed technical roadmap |
| `/epstein-files/index.html` | Hub landing page |
| `/epstein-files/search.html` | Document search page |
| `/css/epstein-hub.css` | Hub-specific styles |
| `/js/epstein-hub-data.js` | Static hub data |
| `localreports/epstein-files-2026-revelations.html` | Current Epstein report |

---

## Quick Reference

**Badge System:**
- A (Court Record) → B (Gov Record) → C (Verified External) → D (Unverified) → E (News Clipping) → F (Flagged/Debunked)

**Hub URLs:**
- `/epstein-files/` - Landing page
- `/epstein-files/search.html` - Document search

**Key Tools Identified:**
- Archive: WARC, ChangeDetection.io, Perma.cc, Save Page Now
- NER: spaCy + EntityRuler
- Entity Resolution: Splink
- Visualization: Cytoscape.js (rich), Sigma.js (large scale)
- Misinformation: ClaimReview, Google Fact Check Explorer

---

## Notes

- MCP server installed: `epstein-email-explorer` (2,322 emails)
- MCP server installed: `epstein-rag` (20K+ docs via Qdrant) - Requires Docker running
- Qdrant storage: `~/qdrant_storage`
- Qdrant container: `docker start qdrant` if not running
- Production revert point: `3f35110` (before today's merges)
- Current main: `5deb616` (includes mobile fix)
