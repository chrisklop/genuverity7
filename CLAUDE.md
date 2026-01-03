# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Detailed guides are in `.claude/docs/`**.

---

## 📚 DOCUMENTATION STRUCTURE

| File | When to Read |
|------|--------------|
| **This file** | Always - core rules, roles, quick reference |
| `.claude/docs/REPORTS.md` | Before creating ANY report |
| `.claude/docs/ARCHITECTURE.md` | API work, deployment, infrastructure, **testing** |
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
□ TESTING: Run npm run test:preview before merging to main
```

**Shorthand triggers:**
- `[REPORT]` → Read `.claude/docs/REPORTS.md`, then `docs/templates.md`
- `[ARCHITECTURE]` → Read `.claude/docs/ARCHITECTURE.md`
- `[VISUAL]` → Read `.claude/docs/VISUAL_STANDARDS.md`
- `[TEST]` → Read testing section in `.claude/docs/ARCHITECTURE.md`

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
- **BOTH Instances**: MUST run `npm run test:preview <url>` before merging to main
- **Reports Instance**: NEVER run `vercel --prod` - let GitHub auto-deploy
- **Architecture Instance**: Responsible for production deployments (after tests pass)

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
- ❌ Navigation without leading `/` - ALWAYS use `'/' + report.slug` not `report.slug`

### Navigation Pattern (MANDATORY)
```javascript
// CORRECT - absolute path
window.location.href = '/' + report.slug;
href="/${report.slug}"

// WRONG - relative path causes refresh/404
window.location.href = report.slug;
href="${report.slug}"
```

---

## 🛠️ COMMANDS

### Development
```bash
python server.py              # Local dev server (port 8000)
```

### Report Validation
```bash
./validate-report.sh localreports/slug.html  # Validate single report
node -c js/reports-data.js                    # Check JS syntax
```

### Testing (REQUIRED before merge)
```bash
npm run test                              # Test localhost:8000
npm run test:preview <preview-url>        # Test Vercel preview
./scripts/deploy-workflow.sh new <branch> # Start feature branch
./scripts/deploy-workflow.sh status       # Check branch state
./scripts/deploy-workflow.sh promote      # Merge to main (after tests pass)
```

### Build & Deploy
```bash
node tools/generate-sitemaps.js  # Regenerate sitemap.xml, sitemap-news.xml, vercel.json
npm run test:preview <url>       # TEST FIRST (required)
vercel --prod                    # Deploy (Architecture Instance only, after tests pass)
```

---

## 📋 REPORT WORKFLOW

Full details in `.claude/docs/REPORTS.md`

```bash
# 1. Create feature branch
git checkout -b report/slug-name

# 2. Create from template
cp docs/report-template-2025.html localreports/slug.html

# 3. Research & write (8+ verified sources, inline citations, charts)

# 4. Validate
./validate-report.sh localreports/slug.html

# 5. Add to js/reports-data.js (ID 0, manually increment all other IDs)
#    NEVER use sed/perl automation - causes duplicate `id:` keys

# 6. Regenerate sitemaps
node tools/generate-sitemaps.js

# 7. Commit and push to feature branch (NOT main)
git add localreports/slug.html js/reports-data.js sitemap.xml sitemap-news.xml vercel.json
git commit -m "Add report: slug"
git push origin report/slug-name

# 8. TEST on preview deployment (REQUIRED)
npm run test:preview https://genuverity7-git-report-slug-name-xxx.vercel.app

# 9. If tests pass, merge to main
git checkout main && git merge report/slug-name && git push origin main
```

---

## 📐 ARCHITECTURE

### Stack
| Layer | Technology |
|-------|------------|
| Frontend | Static HTML + Chart.js |
| Backend (Prod) | FastAPI + Vercel Serverless (`api/index.py`) |
| Backend (Dev) | FastAPI + Uvicorn (`server.py`) |
| Storage (Prod) | Vercel Blob |

### Clean URL Scheme
- Files: `localreports/slug-name.html`
- Public URL: `genuverity.com/slug-name`
- Vercel rewrites handle the mapping

---

## 🔗 KEY FILES

| File | Purpose |
|------|---------|
| `js/reports-data.js` | Report metadata for landing page |
| `js/experiences-data.js` | Labs/experiences metadata |
| `js/chart-previews.js` | **Unified chart thumbnail renderer** |
| `docs/report-template-2025.html` | Golden template for reports |
| `tools/generate-sitemaps.js` | Sitemap + clean URL generator + **chart validation** |
| `api/index.py` | Production API endpoints |
| `server.py` | Local development server |

---

## 📊 CHART THUMBNAILS

Report cards on `index.html` and `newsfeed.html` display mini-chart previews.

### Architecture
- **Single source**: `js/chart-previews.js` - unified chart rendering module
- **Used by**: `index.html` carousel, `newsfeed.html` news feed
- **Config source**: `chart` property in `js/reports-data.js`

### Chart Config Format (MANDATORY)
```javascript
chart: {
    type: "hbar",           // bar, line, donut, hbar, network, timeline
    color: "#ef4444",       // REQUIRED - Primary color (even if colors[] provided)
    data: [5, 400],         // Data values (format varies by type)
    labels: ["A", "B"],     // Optional: for hbar charts
    colors: ["#ef4444", "#10b981"]  // Optional: multiple colors for hbar
}
```

**CRITICAL: `color` property is MANDATORY** - line/donut charts fail without it, hbar uses it as fallback

### Adding Charts to New Reports

1. **generate-sitemaps.js auto-detects** missing chart configs
2. Run `node tools/generate-sitemaps.js` - it will suggest configs
3. Copy suggested config to `js/reports-data.js` entry
4. Test locally with `python server.py`

### Validation
```bash
node tools/generate-sitemaps.js
# Will warn if reports have Chart.js but no reports-data.js chart config
```

---

## 🌐 LIVE URLS

- **Production**: https://www.genuverity.com
- **Vercel**: https://genuverity7.vercel.app

---

## ✅ REPORT VALIDATION REQUIREMENTS

Reports must pass `./validate-report.sh` which checks:
- Google Fonts (Crimson Pro)
- Standard navbar component
- Source IDs (`id="source-N"` format)
- Interactive citations (`highlightSource()`)
- Copyable sections (`copyable-section` class)
- Dependencies: `html2canvas.min.js`, `copyable-sections.js`
- Sources sidebar

---

## 📝 SESSION CONTINUITY

Before starting work:
1. Check `docs/ROADMAP.md` for priorities
2. Check `docs/REPORT_INVENTORY.md` to avoid duplicates
3. Review: `git log --oneline -10`

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
