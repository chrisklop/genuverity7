# CLAUDE.md

**Claude Code in Antigravity IDE**

---

## DIRECTIVE

All report generation instructions are centralized in:

**`docs/IDE-AGENT.md`**

Read that file for complete workflow instructions including:
- Research intake
- Section structuring  
- Chart creation
- HTML template usage
- **Updating `js/reports-data.js`** (critical for landing page cards)
- Validation and deployment

---

## QUICK REFERENCE

```
1. Receive research from user (pasted from browser Gemini)
2. Follow IDE-AGENT.md workflow
3. Output: localreports/{{slug}}.html + updated reports-data.js
4. Validate with ./validate-report.sh
5. Commit ONLY: localreports/* and js/reports-data.js
```

---

## GIT BOUNDARIES (HARDCODED)

**ONLY commit:**
- `localreports/*`
- `js/reports-data.js`

**NEVER commit:**
- `api/*`, `index.html`, `reports.html`, other `js/*`, `server.py`, `docs/*`

---

**Full instructions:** `docs/IDE-AGENT.md`
