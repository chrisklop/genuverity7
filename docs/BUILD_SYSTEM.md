# Build System Usage Guide

## Quick Start

### Creating a New Report

1. **Copy the minimal template:**
   ```bash
   cp build/report-template.html localreports/src/your-report-name.html
   ```

2. **Edit the content** (no need to add navbar/footer placeholders!)

3. **Build the report:**
   ```bash
   node build/build-report.js localreports/src/your-report-name.html localreports/dist/your-report-name.html --validate
   ```

4. **View the built report:**
   ```
   http://localhost:8000/localreports/dist/your-report-name.html
   ```

5. **Update reports-data.js** to point to `/dist/` path:
   ```javascript
   slug: "localreports/dist/your-report-name.html"
   ```

## What the Build Script Does

✅ Auto-injects `<div id="navbar-placeholder" data-page-type="report"></div>`
✅ Auto-injects `<div id="footer-placeholder"></div>`  
✅ Auto-injects all standard dependencies (Chart.js, Lucide, fonts, etc.)
✅ Auto-validates with both `validate-report.sh` and `validate-standards.sh`

## Build All Reports

To build all reports in `/localreports/src/`:

```bash
./build/build-all.sh
```

## Directory Structure

```
/localreports/
  /src/          # Source reports (content only, no chrome)
  /dist/         # Built reports (with auto-injected chrome)
  *.html         # Legacy reports (will be migrated gradually)
```

## Migration Guide

### Migrating an Existing Report

1. **Strip chrome from existing report:**
   - Remove `<div id="navbar-placeholder">`
   - Remove `<div id="footer-placeholder">`
   - Remove all `<script>` tags for dependencies (Chart.js, shared-components.js, etc.)
   - Remove `<link>` tags for fonts and shared-components.css

2. **Move to src:**
   ```bash
   mv localreports/old-report.html localreports/src/old-report.html
   ```

3. **Build:**
   ```bash
   node build/build-report.js localreports/src/old-report.html localreports/dist/old-report.html --validate
   ```

4. **Update reports-data.js:**
   ```javascript
   slug: "localreports/dist/old-report.html"  // Changed from localreports/old-report.html
   ```

## Benefits

- ✅ **Zero Manual Errors:** Impossible to forget placeholders
- ✅ **Simpler Source Files:** Focus on content, not boilerplate
- ✅ **Centralized Updates:** Change chrome once, rebuild all reports
- ✅ **Automatic Validation:** Built into build process
- ✅ **Cleaner Git Diffs:** Source files show only content changes

## Troubleshooting

**Build fails with "Source file not found":**
- Check the path to your source file
- Ensure it's in `localreports/src/`

**Validation fails:**
- Check the error message from `validate-report.sh` or `validate-standards.sh`
- Common issues: missing `source-1` ID, missing `highlightSource` function

**Navbar/footer don't render:**
- Ensure `shared-components.js` is loaded (build script adds this automatically)
- Check browser console for JavaScript errors

## Advanced Usage

### Build without validation:
```bash
node build/build-report.js src/report.html dist/report.html
```

### Custom build script:
```javascript
const { buildReport } = require('./build/build-report.js');
buildReport('src/custom.html', 'dist/custom.html', { validate: true });
```

---

**Last Updated:** December 2025
