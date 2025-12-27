# Report Deployment Checklist

## Pre-Deployment Validation

### 1. Template Compliance
- [ ] **CRITICAL:** File created from `docs/report-template-2025.html` (NOT copied from existing report)
- [ ] All `<head>` dependencies match Golden Template exactly
- [ ] Fonts loaded: Inter, JetBrains Mono, Crimson Pro
- [ ] Scripts loaded with `defer` attribute:
  - `reports-data.js`
  - `unified-search.js`
  - `copyable-sections.js`
  - `shared-components.js`
- [ ] Stylesheet linked: `shared-components.css`

### 2. Required Placeholders
- [ ] `<div id="navbar-placeholder" data-page-type="report"></div>` present in `<body>`
- [ ] `<div id="footer-placeholder"></div>` present BEFORE `</body>` tag
- [ ] Footer placeholder is NOT inside any `<script>` tags

### 3. reports-data.js Entry
- [ ] New report added at `id: 0` (top of array)
- [ ] ALL existing report IDs manually incremented by +1
- [ ] Entry includes ALL required fields:
  - `id`, `title`, `slug`, `category`, `tagClass`, `catClass`
  - `icon`, `date`, `sources`, `readTime`, `excerpt`
- [ ] **Chart object present and correctly formatted:**
  ```javascript
  chart: {
      type: "line|bar|donut|network|hbar|timeline",
      color: "#hexcode",
      data: [...]  // Format depends on chart type
  }
  ```
- [ ] Verified syntax: `node -c js/reports-data.js`

### 4. Automated Validation
- [ ] Run: `./validate-report.sh localreports/[filename].html`
  - Checks: Interactive citations, source IDs, copy buttons
- [ ] Run: `./validate-standards.sh localreports/[filename].html`
  - Checks: Footer/navbar placeholders, shared components
- [ ] Both scripts pass with ✅ ALL CHECKS PASSED

### 5. Visual Verification (Local)
- [ ] Open: `http://localhost:8000/localreports/[filename].html`
- [ ] Navbar renders correctly (logo, search bar, "Get Early Access")
- [ ] Footer renders correctly (GenuVerity branding, links)
- [ ] All charts render with GenuVerity watermark
- [ ] Interactive citations work (click [1], sidebar highlights)
- [ ] Copy buttons appear on `.copyable-section` elements

### 6. Landing Page Integration
- [ ] Open: `http://localhost:8000/reports.html`
- [ ] New report card appears at top
- [ ] Chart preview "peek" renders correctly
- [ ] Card metadata displays correctly (date, sources, read time)

## Deployment Commands

```bash
# Add files
git add localreports/[filename].html js/reports-data.js

# Commit with descriptive message
git commit -m "Add [Report Title] Deep Dive Report

- [Brief description of report content]
- [Number] verified sources with interactive citations
- [List key visualizations]
- Full Golden Template compliance"

# Push to feature branch
git push

# OR push to main (if on main branch)
git push origin main
```

## Post-Deployment Verification

### Production Check (After GitHub Auto-Deploy)
- [ ] Visit production URL
- [ ] Verify navbar and footer render
- [ ] Verify chart previews on landing page
- [ ] Spot-check 3-5 random citations work
- [ ] Mobile responsive check (if applicable)

## Common Pitfalls to Avoid

❌ **DON'T:**
- Copy HTML from an old report (may have legacy bugs)
- Forget to increment existing report IDs
- Place footer placeholder inside `<script>` tags
- Omit `chart` object from reports-data.js entry
- Skip validation scripts

✅ **DO:**
- Always start from `docs/report-template-2025.html`
- Manually increment IDs (no automation/regex)
- Run BOTH validation scripts before commit
- Test chart preview renders on landing page
- Verify navbar/footer on localhost before pushing

## Emergency Rollback

If a deployed report breaks production:

```bash
# Revert the commit
git revert HEAD

# Push immediately
git push

# Fix locally, re-validate, re-deploy
```

---

**Last Updated:** December 2025  
**Maintained By:** GenuVerity Development Team
