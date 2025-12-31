# GenuVerity Lessons Learned

> Accumulated knowledge from development sessions. Read this to avoid repeating mistakes.

---

## Critical Technical Issues & Fixes

### 1. FRED API 400 Errors
**Problem**: Vercel environment variables sometimes contain extra whitespace or quote characters.

**Solution**: Always strip environment variables:
```python
raw_key = os.getenv("FRED_API_KEY") or ""
fred_key = raw_key.strip().strip('"').strip("'")
```

**Location**: `api/index.py` - FRED proxy endpoint

---

### 2. Chart.js Canvas Destruction
**Problem**: When replacing innerHTML with a loading shimmer, the canvas element is destroyed. When the chart render function tries to find it, it returns null.

**Bad Pattern**:
```javascript
async function fetchData() {
    document.getElementById('chartCanvas').parentElement.innerHTML = '<div class="loading">...</div>';
    // ... fetch data ...
    // Now #chartCanvas doesn't exist!
    const ctx = document.getElementById('chartCanvas'); // NULL!
}
```

**Solution**: Use a stable container ID, not the canvas element:
```html
<div id="chartContainer">
    <canvas id="chartCanvas"></canvas>
</div>
```

```javascript
async function fetchData() {
    const container = document.getElementById('chartContainer');
    container.innerHTML = '<div class="loading">...</div>';
    // ... fetch data ...
    container.innerHTML = '<canvas id="chartCanvas"></canvas>';
    const ctx = document.getElementById('chartCanvas').getContext('2d');
}
```

---

### 3. Carousel Touch/Drag Issues
**Problem**: Custom touch handlers for carousels often conflict with native scrolling and cause janky behavior.

**Solution**: Use native CSS scroll-snap instead:
```css
.carousel-wrapper {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
}

.carousel-item {
    scroll-snap-align: start;
}
```

Remove custom touchstart/touchmove/touchend handlers entirely.

---

## Design Decisions

### Color Palette - Midnight Tech
**NEVER USE GREEN as primary color for live data panels.** User explicitly said "too much green."

**Correct Palette**:
- Primary: Blue `#3b82f6`
- Secondary: Cyan `#06b6d4`
- Success (verdicts only): Green `#10b981`
- Warning: Amber `#f59e0b`
- Danger/False: Red `#ef4444`
- **FORBIDDEN**: Purple `#8b5cf6`

---

### Live Data Visual Treatment
User wants live data to be **emphasized but not overwhelming**:

1. **Subtle electric border** - 2px animated gradient (blue→cyan), 3s cycle
2. **Pulsing live dot** - Cyan, 2s ease-in-out cycle
3. **Pulsing chart point** - 3s cycle on last data point
4. **Source link** - Must be visible and clickable

**What NOT to do**:
- Don't use fake telemetry panels (user explicitly called this out)
- Don't use overwhelming neon effects
- Don't use green as the primary animation color

---

### Report Layout - Magazine Style
**Before** (wasted space):
- Charts in separate full-width sections
- Sources scattered throughout
- Redundant source lists

**After** (approved):
- Collapsible sources banner at top (all sources in one place)
- Charts as float figures (48% width, float left/right)
- Text wraps around charts naturally
- Executive summary with claim vs reality grid

**Reference files**:
- `marijuana-rescheduling.html` - Best example for policy analysis
- `fednow-freeze.html` - Best example for fact-checks with live data

---

## Template Patterns

### Always Include
1. **Navbar** - Consistent across all report pages
2. **Collapsible Sources Banner** - All sources in one expandable section at top
3. **Executive Summary** - For fact-checks, use claim vs reality grid
4. **Verdict Badge** - Prominent in header for fact-checks
5. **Footer** - GenuVerity branding + generation date

### Float Figures
```html
<section class="content-section clearfix">
    <h2>Section Title</h2>

    <figure class="float-figure right">
        <!-- Chart content -->
    </figure>

    <p>Text that wraps around the chart...</p>
</section>
```

**Critical**: Parent section needs `clearfix` class!

---

## Debugging Workflow

### 1. Playwright for Frontend Issues
When something doesn't render:
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # Capture console logs
    logs = []
    page.on('console', lambda msg: logs.append(f"[{msg.type}] {msg.text}"))

    page.goto('https://genuverity7.vercel.app/page.html')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(3000)  # Wait for async data

    page.screenshot(path='/tmp/debug.png', full_page=True)
    print("Console logs:", logs)

    browser.close()
```

### 2. Vercel Logs for Backend Issues
```bash
vercel logs genuverity7.vercel.app --since 2m 2>&1 | head -50
vercel logs genuverity7.vercel.app 2>&1 | grep -i "error\|Error"
```

### 3. FRED API Debugging
```bash
# Test API key directly
curl "https://api.stlouisfed.org/fred/series/observations?series_id=WALCL&api_key=YOUR_KEY&file_type=json&limit=1"
```

---

## User Preferences (Observed)

1. **Consistency** - All reports should follow the same template
2. **Sources First** - Primary sources above content, not just at bottom
3. **Real Data** - No fake panels or placeholder telemetry
4. **Midnight Tech Aesthetic** - Dark mode, blue/cyan accents
5. **Professional** - Clean, not overwhelming
6. **Mobile Responsive** - Float figures stack on mobile

---

## Files Reference

| File | Purpose |
|------|---------|
| `docs/template.md` | Complete template code snippets |
| `docs/LESSONS_LEARNED.md` | This file - accumulated knowledge |
| `docs/BATCH_REPORT_PROCESS.md` | Process for generating multiple reports |
| `docs/ROADMAP.md` | Feature roadmap |
| `marijuana-rescheduling.html` | Template reference (policy analysis) |
| `fednow-freeze.html` | Template reference (fact-check + live data) |

---

## Quick Fixes Reference

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| "Unable to load live data" | Canvas destroyed | Use stable container ID |
| FRED API 400 | Env var has quotes | Strip the key |
| Chart not animating | Not registered | Push to `animationCharts` array |
| Electric border not showing | Z-index issue | Set z-index on pseudo-element |
| Sources not expanding | Wrong class toggle | Use `.expanded` class, not style |
| Carousel janky on mobile | Custom handlers | Use CSS scroll-snap |
| Share buttons missing functions | Batch script regex failed | Check JS functions exist, not just HTML |
| Mobile sources hidden | CSS `display: none` | Use collapsible pattern instead |

---

## Social Sharing Buttons (December 2025)

### Structure
Share buttons go **inside** `.sources-sidebar`, **above** the Sources First header:
```html
<aside class="sources-sidebar">
    <div class="share-section">
        <div class="share-heading"><i data-lucide="share-2" style="width:18px;"></i>Share This Report</div>
        <div class="share-buttons"><!-- 4 buttons --></div>
    </div>
    <div class="sources-header">...</div>
</aside>
```

### Styling
- Heading: Blue (`var(--accent-blue)`), 1.1rem, 700 weight - matches Executive Summary
- Buttons: Transparent background, white icons, 2x2 grid
- No borders on individual buttons

### Mobile (≤1024px)
- Sources sidebar appears at TOP of article (not hidden)
- Sources list collapsed by default - tap header to expand
- Share buttons hidden on mobile
- `shared-components.js` handles toggle

---

## Chart/Infographic Requirements (December 2025)

### Minimum Charts Per Report
| Report Length | Minimum Charts |
|---------------|----------------|
| 10-20 min read | 1-2 |
| 20-35 min read | 2-4 |
| 35+ min read | 4-6 |

### When to Add Charts
**Always visualize:**
- Numerical comparisons (use horizontal bar)
- Trends over time (use line chart)
- Proportions/percentages (use doughnut)
- Timelines/milestones (use bar chart)
- Scale/magnitude differences (use log-scale horizontal bar)

### Chart Placement
- Place near the data being visualized, not all at the end
- Use `float-figure` class for text wrap
- Use `style="clear: both;"` for full-width charts
- Every chart needs a `<figcaption>`

### Example Chart Types Used
| Data | Chart Type | Example Report |
|------|-----------|----------------|
| 126M vs 87M reach | Horizontal bar | american-disinformation-timeline |
| Trust 1972-2024 | Line chart | american-disinformation-timeline |
| Three eras | Doughnut | american-disinformation-timeline |
| Legislative timeline | Bar chart | american-disinformation-timeline |

---

*Last updated: December 30, 2025*
