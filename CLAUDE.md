# CLAUDE.md

This file provides core guidance for Claude Code. **Detailed guides are in `.claude/docs/`**.

---

## 📚 DOCUMENTATION STRUCTURE

| File | When to Read |
|------|--------------|
| **This file** | Always - core rules, roles, quick reference |
| `.claude/docs/REPORTS.md` | Before creating ANY report |
| `.claude/docs/ARCHITECTURE.md` | API work, deployment, infrastructure |
| `.claude/docs/VISUAL_STANDARDS.md` | Charts, colors, styling decisions |

---

## ⚠️ PRE-FLIGHT CHECKLIST

```
□ READ the appropriate guide from .claude/docs/ FIRST
□ Article text: Claude models only (never Gemini)
□ Sources: NO Wikipedia - find primary sources
□ Colors: NO purple (#8b5cf6) anywhere
□ Text: NO GRADIENT TEXT - use solid colors only
□ Charts: Chart.js with Midnight Tech colors
```

**Shorthand triggers:**
- `[REPORT]` → Read `.claude/docs/REPORTS.md`, then `docs/templates.md`
- `[ARCHITECTURE]` → Read `.claude/docs/ARCHITECTURE.md`
- `[VISUAL]` → Read `.claude/docs/VISUAL_STANDARDS.md`

---

## 🔄 DUAL INSTANCE SETUP (CRITICAL)

**Two Claude Code instances may run concurrently. Each has strict boundaries.**

### Role Declaration
**Every response MUST end with:**
- **[ROLE: Reports Instance]**
- **[ROLE: Architecture Instance]**

### Instance Identification
| If user mentions... | You are... |
|---------------------|------------|
| reports, fact-checks, localreports/, sources | **Reports Instance** |
| API, backend, index.py, infrastructure, deployment | **Architecture Instance** |

When uncertain, ASK the user.

### Git Boundaries

**Reports Instance - ONLY touch:**
```
localreports/*
js/reports-data.js
sitemap.xml, sitemap-news.xml, vercel.json (via generate-sitemaps.js)
```

**Architecture Instance - ONLY touch:**
```
api/*
index.html
js/* (except reports-data.js)
lib/*
server.py
```

### Deployment Rules
- **Reports Instance**: NEVER run `vercel --prod` - let GitHub auto-deploy
- **Architecture Instance**: Responsible for production deployments

---

## 📄 CONTENT TYPES

| Type | Template | Output | Use For |
|------|----------|--------|---------|
| **Report** | `docs/report-template-2025.html` | `localreports/*.html` | Fact-checks, verdicts |
| **Experience** | `timeline.html` + `js/timeline-data.js` | Timeline updates | Historical narratives |

**Quick Decision:**
- Single claim → Report
- Historical topic/evolution → Experience
- User says "timeline" or "journey" → Experience

---

## 🎨 VISUAL QUICK REFERENCE

### Colors (MANDATORY)
| Use | Hex | Var |
|-----|-----|-----|
| Primary | `#3b82f6` | `--accent-blue` |
| Secondary | `#06b6d4` | `--accent-cyan` |
| Success | `#10b981` | `--accent-green` |
| Warning | `#f59e0b` | `--accent-amber` |
| Danger | `#ef4444` | `--accent-red` |
| **FORBIDDEN** | `#8b5cf6` | NEVER USE |

### Verdicts
| Verdict | Color | Icon |
|---------|-------|------|
| FALSE | Red | `x-circle` |
| TRUE | Green | `check-circle` |
| MIXED | Cyan | `circle-help` |
| MISLEADING | Amber | `alert-triangle` |

### Forbidden Patterns
- ❌ Gradient on buttons
- ❌ Gradient on text (`-webkit-background-clip: text`)
- ❌ Gradient on cards
- ❌ Purple colors

---

## 🛠️ COMMANDS QUICK REFERENCE

| Command | Purpose |
|---------|---------|
| `python server.py` | Local dev server |
| `./validate-report.sh <file>` | Validate report |
| `node -c js/reports-data.js` | Validate JS syntax |
| `node tools/generate-sitemaps.js` | Regenerate sitemaps |
| `vercel --prod` | Deploy (Architecture only) |

---

## 📋 REPORT WORKFLOW (SUMMARY)

Full details in `.claude/docs/REPORTS.md`

1. `cp docs/report-template-2025.html localreports/slug.html`
2. Research topic, gather 8+ verified sources
3. Fill template (sources sidebar, inline citations, charts)
4. Run `./validate-report.sh`
5. Add to `js/reports-data.js` (ID 0, increment others)
6. Run `node tools/generate-sitemaps.js`
7. `git add` + `git commit` + `git push`

---

## 🔗 KEY FILES

| File | Purpose |
|------|---------|
| `js/reports-data.js` | Report metadata for landing page |
| `js/experiences-data.js` | Labs/experiences metadata |
| `docs/report-template-2025.html` | Golden template for reports |
| `tools/generate-sitemaps.js` | Sitemap + clean URL generator |

---

## 🌐 LIVE URLS

- **Production**: https://www.genuverity.com
- **Vercel**: https://genuverity7.vercel.app

---

## 📝 SESSION CONTINUITY

Before starting work:
1. Check `docs/ROADMAP.md` for priorities
2. Check `docs/REPORT_INVENTORY.md` to avoid duplicates
3. Review: `git log --oneline -10`
4. Ask user about current priorities

---

## 🔑 ENVIRONMENT VARIABLES

```
ANTHROPIC_API_KEY      # Claude API (required)
BLOB_READ_WRITE_TOKEN  # Vercel Blob (production)
TAVILY_API_KEY         # Web search
GOOGLE_FACT_CHECK_API_KEY
ADMIN_SECRET           # Protected endpoints
```

---

## User Preferences

- Dark mode by default
- Sources prioritized over AI analysis
- Professional, clean layouts
- Mobile-responsive design
- Minimal unnecessary features
