# Session Context

> **Last Saved:** 2026-02-09
> **Project:** GenuVerity7 (fact-checking platform with 198+ reports)

---

## TL;DR (Read This First)

GenuVerity is a static fact-checking site (HTML/JS/CSS on Vercel). We published two new Deep Research reports today: Venezuela Aftermath Analysis and Great Replacement Conspiracy. The main work this session was fixing recurring issues with report publishing: missing Vercel rewrites (links redirect to index), float-figures placed after paragraphs (no text wrap), and card preview charts using boring monotone colors or generic viral-spread data instead of meaningful, colorful visualizations.

---

## Current State

**Working On:** Two report branches ready for PR merge
**Blocked By:** None - awaiting Klop's review
**Next Step:** Merge `report/venezuela-aftermath-2026` and `report/great-replacement-conspiracy-2026` to main

---

## Recent Decisions & Context

- **Card preview charts must use varied colors** — Each bar needs a different color from the rainbow palette, not all the same. This makes cards visually distinctive.
- **Chart type selection matters** — Use `hbar` for ranked data, `donut` for proportions, `line` for trends. Don't default to generic line charts with viral spread timestamps.
- **Float figures go BEFORE paragraphs** — CSS `float: right` only wraps content that comes AFTER the floated element. Place charts immediately after `<h2>`, before `<p>` tags.
- **Three files for every new report** — (1) HTML in localreports/, (2) entry in reports-data.js, (3) Vercel rewrites in vercel.json. Miss any one and links break.
- **Never commit source seeds** — The Deep Research markdown files stay in Downloads, only converted HTML goes to repo.

---

## Key Files Changed

- `localreports/venezuela-aftermath-analysis-2026.html` - New 35-source report on Venezuela 2024-2026
- `localreports/great-replacement-conspiracy-2026.html` - New 32-source conspiracy deep dive
- `js/reports-data.js` - Added 2 new reports, fixed 8 chart previews with varied colors
- `vercel.json` - Added rewrites for both new reports
- `~/.claude/projects/-Users-klop/memory/MEMORY.md` - Documented all three recurring mistakes

---

## Pending Tasks

- [ ] Merge Venezuela report PR
- [ ] Merge Great Replacement report PR
- [ ] Epstein Files Hub Phase 2 (Supabase integration) - backlog
- [x] Venezuela report published with proper charts
- [x] Great Replacement report published
- [x] Fixed 8 total chart previews across older reports
- [x] Documented chart preview, vercel rewrite, and float-figure rules in MEMORY.md

---

## Session Log

### 2026-02-09
- Started in wrong directory (/Users/klop), moved to GenuVerity7
- Published Venezuela Aftermath Analysis report (35 sources, 6 charts)
- Discovered missing vercel.json rewrites — links redirected to index.html
- Fixed and documented in MEMORY.md
- Discovered float-figures placed after paragraphs — no text wrap
- Fixed all 5 charts in Venezuela report, documented in MEMORY.md
- Published Great Replacement Conspiracy report (32 sources, 5 charts)
- Audited 25 reports, found 8 with bad chart previews:
  - Monotone colors (all same red)
  - Generic viral-spread line data (0h, 2h, 4h...)
  - Missing colors arrays
- Fixed all 8: Walz, Biden Situation Room, Minneapolis ICE, RFK Antidepressants, Caracas Mirage, FireAid, Medicaid-Voter, Visa Ban
- Documented chart preview requirements in MEMORY.md
- Both report branches pushed and ready for review

### Previous (2026-02-01)
- Epstein Hub Phase 1 was completed then scaled back to preview page
- search.html and epstein-hub-data.js were removed
- Hub is now a "coming soon" page pending Phase 2 Supabase work
