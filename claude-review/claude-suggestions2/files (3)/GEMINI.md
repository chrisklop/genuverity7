# GEMINI.md

**Gemini 3 in Antigravity IDE**

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
1. Receive research from user (pasted from browser Gemini Deep Research)
2. Follow IDE-AGENT.md workflow
3. Output: localreports/{{slug}}.html + updated reports-data.js
4. Validate with ./validate-report.sh
5. Commit ONLY: localreports/* and js/reports-data.js
```

---

## INFOGRAPHIC GENERATION (Optional)

If user requests a standalone shareable infographic image:

**Model:** `gemini-3-pro-image-preview` ONLY

**Style:** "Midnight Tech" HUD
- Background: Dark navy gradient (#050A14 to #0a0a12)
- Primary: #3b82f6 (blue)
- Secondary: #06b6d4 (cyan)
- **NO PURPLE (#8b5cf6)**
- Branding: "GenuVerity" wordmark bottom-right (Genu=white, Verity=blue)

---

## GIT BOUNDARIES (HARDCODED)

**ONLY commit:**
- `localreports/*`
- `js/reports-data.js`

**NEVER commit:**
- `api/*`, `index.html`, `reports.html`, other `js/*`, `server.py`, `docs/*`

---

**Full instructions:** `docs/IDE-AGENT.md`
