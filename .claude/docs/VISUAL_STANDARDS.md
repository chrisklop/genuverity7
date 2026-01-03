# Visual Standards Guide

Colors, charts, styling rules, and forbidden patterns for GenuVerity.

---

## Color Palette (MANDATORY)

| Use | Color | Hex | CSS Variable |
|-----|-------|-----|--------------|
| Primary | Blue | `#3b82f6` | `--accent-blue` |
| Secondary | Cyan | `#06b6d4` | `--accent-cyan` |
| Success/True | Green | `#10b981` | `--accent-green` |
| Warning/Mixed | Amber | `#f59e0b` | `--accent-amber` |
| Danger/False | Red | `#ef4444` | `--accent-red` |
| **FORBIDDEN** | Purple | `#8b5cf6` | **NEVER USE** |

### Background Colors
| Use | Hex |
|-----|-----|
| Primary BG | `#050A14` |
| Secondary BG | `#0a0f1a` |
| Card BG | `#111827` |
| Border | `rgba(59, 130, 246, 0.15)` |

---

## ❌ FORBIDDEN PATTERNS

The user has **repeatedly complained** about these violations:

| Pattern | Why Forbidden | Use Instead |
|---------|---------------|-------------|
| Gradient on buttons | Looks unprofessional | Solid `var(--accent-blue)` |
| Gradient on text | Hard to read | Solid color text |
| Gradient on cards | Too flashy | Solid `var(--bg-card)` |
| Purple colors | Off-brand | Blue, cyan, green, amber, red |
| `-webkit-background-clip: text` | Creates gradient text | Solid color |

### ✅ Acceptable Gradients ONLY
- Background grid pattern (subtle 1px lines)
- Ambient glow effects (radial-gradient for atmosphere)
- Divider lines fading to transparent
- Reading progress bar: `linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))`

---

## Verdict Badge System

| Verdict | Color | Icon | CSS Classes |
|---------|-------|------|-------------|
| FALSE | Red | `x-circle` | `badge-false`, `verdict-false` |
| TRUE | Green | `check-circle` | `badge-true`, `verdict-true` |
| MISLEADING | Amber | `alert-triangle` | `badge-misleading` |
| MIXED | Cyan | `circle-help` | `badge-mixed` |
| UNVERIFIED | Blue | `circle-help` | `badge-unverified` |
| DEVELOPING | Cyan | `clock` | `badge-developing` |
| CONTEXT | Amber | `book-open` | `badge-context` |

```html
<div class="verdict-badge badge-false">
    <i data-lucide="x-circle" style="width: 28px; height: 28px;"></i>
    <span>FALSE</span>
</div>
```

---

## Charts & Visualizations

### In-Page Charts: Chart.js
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="../js/chart-watermark.js"></script>
```

**Always include watermark plugin** - auto-adds GenuVerity branding.

### Chart Types Decision Tree

| Content | Chart Type | Tool |
|---------|------------|------|
| Numerical comparisons | Horizontal bar | Chart.js |
| Trends over time | Line chart | Chart.js |
| Proportions | Doughnut | Chart.js |
| Timelines | Bar or timeline | Chart.js |
| Flowcharts | Diagram | Mermaid/D3 |
| Network graphs | Force-directed | D3.js |

### Chart Layout
Wrap in `<figure class="float-figure">` for magazine-style float-right:
```html
<figure class="float-figure">
    <!-- CRITICAL: Canvas MUST be inside height-constrained div -->
    <div style="height: 280px; position: relative;">
        <canvas id="myChart"></canvas>
    </div>
    <figcaption>Chart description here</figcaption>
</figure>
```

### ⚠️ CHART HEIGHT CONSTRAINT (MANDATORY)

**NEVER** put height attribute on canvas directly. **ALWAYS** wrap canvas in a div with fixed height:

```html
<!-- ❌ WRONG - Chart will expand to 20,000+ pixels -->
<canvas id="myChart" height="220"></canvas>

<!-- ✅ CORRECT - Height constrained by wrapper -->
<div style="height: 280px; position: relative;">
    <canvas id="myChart"></canvas>
</div>
```

This is required because Chart.js with `maintainAspectRatio: false` needs a height-constrained parent container.

### Minimum Charts by Report Length
| Length | Min Charts |
|--------|------------|
| Short (10-20 min) | 1-2 |
| Medium (20-35 min) | 2-4 |
| Long (35+ min) | 4-6 |

---

## GenuVerity Branding

### Logo/Wordmark
- "Genu" = White (#FFFFFF)
- "Verity" = Blue (#3B82F6)
- Position: Bottom-right corner only
- NO icons/shields to the left
- Optional: Network dots to the right

### Chart Watermark Plugin
```javascript
const genuVerityWatermark = {
    id: 'genuVerityWatermark',
    afterDraw: (chart) => {
        const ctx = chart.ctx;
        const { width } = chart;
        ctx.save();
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 10px Inter, sans-serif';
        const verityWidth = ctx.measureText('Verity').width;
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Genu', width - 8 - verityWidth, 8);
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('Verity', width - 8, 8);
        ctx.restore();
    }
};
Chart.register(genuVerityWatermark);
```

---

## CSS Classes Reference

### Layout
| Class | Purpose |
|-------|---------|
| `.content-grid` | Main two-column layout |
| `.sources-sidebar` | Left sticky sidebar |
| `.article-content` | Main content area |
| `.float-figure` | Magazine-style chart float |

### Typography
| Class | Purpose |
|-------|---------|
| `.prose-text` | Body paragraphs |
| `.prose-h2` | Section headings |
| `.verdict-badge` | Colored verdict indicator |

### Components
| Class | Purpose |
|-------|---------|
| `.nav-header` | Sticky navigation |
| `.reading-progress` | Scroll progress bar |
| `.sources-banner` | Collapsible sources |
| `.chart-container` | Chart.js wrapper |
| `.data-table` | Tabular data |

---

## Text Formatting

| Element | Use For |
|---------|---------|
| `<strong>` | Verdicts, key findings, names, numbers |
| `<em>` | Claims being analyzed, quotes, terms |
| `<a href>` | Inline citations (every fact needs one) |

---

## Data Visualization Requirements

Before finalizing any report:
1. Does any section contain numbers that could be visualized?
2. Are there comparisons clearer as a chart?
3. Is there a timeline that could be graphed?
4. Would a doughnut help summarize proportions?

---

## Report Card Preview Charts

In `js/reports-data.js`, chart data MUST match the first chart in the report:

```javascript
chart: {
    type: "line",
    color: "#ef4444",
    data: [5, 12, 18, 25, 35]  // From first canvas in report
}
```

| Type | Data Format |
|------|-------------|
| line/bar | Array of numbers |
| donut | Single number 0-100 |
| network | `{ nodes: N, connections: M }` |
| hbar | `[{ label: "X", value: N }, ...]` |
| timeline | Array of positions 0-100 |
