# GenuVerity Session Context

> **Last Updated:** 2026-03-13
> **Status:** Video embed system built + pipeline integrated. Waiting for MCP server from sora-remix.
> **Branch:** `report/daily-2026-03-13` (3 commits ahead of main, pushed)

---

## What Was Done This Session

### 1. Video Embed System (COMPLETE)
Built a full video embed system for reports:
- **CSS** (`css/reports.css`): 150+ lines — responsive 16:9 iframes, source badges (YouTube/Rumble/TikTok/X/C-SPAN), rich link preview cards with OG images
- **Template** (`docs/report-template-2025.html`): YouTube iframe + rich link preview card patterns
- **6 embeds across 3 reports:**
  - `iran-war-fake-videos-2026.html`: Euronews debunk (`O_x2pxnvv80`) + original Arma 3 gameplay (`QI6XU-xnp6Q`)
  - `ai-deepfake-ceo-stock-scam-2026.html`: BSE India warning (`plwarWTtsxI`) + CNBC analysis (`P5N087Hdsc0`)
  - `russell-brand-death-hoax-2026.html`: 2 rich link preview cards (Reality Tea + TMZ) with OG images
- O'Hare + Operation Invisible Pump: no videos found (too recent/niche)

### 2. Pipeline Integration (COMPLETE)
Updated all pipeline files to include video embeds in every future report:
- **`.claude/commands/daily.md`**: Research Round 5 (video discovery), Depth Expansion Pass B (video enrichment), Generation Step 4.5 (embed insertion), QA T12 (embed validation), quality targets updated
- **`.claude/commands/generate-report.md`**: Pass 1.5 video discovery + oEmbed verification
- **`.claude/agents/report-generator.md`**: Pass 1.5 video discovery + Pass 2 embed insertion
- **`.claude/agents/qa-validator.md`**: T12 video embed structural check

### 3. Rich Link Preview Cards (COMPLETE)
Upgraded fallback link cards from empty boxes to Slack/Discord-style rich previews:
- Thumbnail from OG image, headline, excerpt, source domain, cyan CTA
- Responsive: side-by-side on desktop, stacked on mobile

---

## NEXT SESSION: Test Sora-Decompiler MCP + Fix Hindi Video

### What's Already Done (DO NOT REDO)
- MCP config added to `~/.mcp.json` — `sora-decompiler` entry pointing to `/Users/klop/sora-remix/sora_remix/mcp_server.py`
- Video validator agent built at `.claude/agents/video-validator.md`
- Pipeline updated with Step 4.4 (video verification hard gate) in `.claude/commands/daily.md`
- All pipeline files updated (daily.md, generate-report.md, report-generator.md, qa-validator.md)

### After Restart, Do This:
1. **Verify MCP tools are available**: Check that `mcp__sora-decompiler__get_metadata`, `mcp__sora-decompiler__extract_audio`, `mcp__sora-decompiler__extract_frames`, `mcp__sora-decompiler__full_decompile` show up
2. **Test on the Hindi BSE video**: Run `mcp__sora-decompiler__extract_audio` on `https://www.youtube.com/watch?v=plwarWTtsxI` — should return `language: "hi"` confirming the validator would catch it
3. **Fix the Hindi BSE video** in `localreports/ai-deepfake-ceo-stock-scam-2026.html`:
   - Either find an English alternative (try Bloomberg `uwQS7mdsgyc` — validate language first)
   - Or remove the BSE embed and keep only the CNBC embed in Section 5
4. **Commit + push** the fix

---

## Git State
- **Branch:** `report/daily-2026-03-13`
- **Commits:** 3 ahead of main (daily batch + video embeds + rich previews + pipeline updates)
- **Pushed:** Yes, Vercel preview is live
- **PR:** Not yet created — waiting for review

## Key File Locations
- Video embed CSS: `css/reports.css` lines 583-780
- Report template patterns: `docs/report-template-2025.html` lines 229-270
- Pipeline with video steps: `.claude/commands/daily.md`
- QA with T12: `.claude/agents/qa-validator.md`
