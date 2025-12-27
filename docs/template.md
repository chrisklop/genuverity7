# GenuVerity Report Template Reference

This document captures the design patterns and code snippets used in the best-performing report layouts (e.g., marijuana-rescheduling.html, fednow-freeze.html).

---

## Core Design Principles

1. **Shared Components** - Use `#navbar-placeholder` and `#footer-placeholder` site-wide
2. **Sources First** - Collapsible primary sources banner at the top
3. **Midnight Tech** - Blue (#3b82f6) and Cyan (#06b6d4) color palette, NO green as primary
4. **Magazine Layout** - Float figures wrap text naturally
5. **Live Data Emphasis** - Subtle animated borders on real-time data panels
6. **Executive Summary** - Claim vs Reality grid for fact-checks

---

## Shared Components (Golden Pattern)

To ensure site-wide consistency, all pages must use the shared component placeholders.

### Placeholder Elements
```html
<!-- At start of <body> -->
<div id="navbar-placeholder" data-page-type="report"></div>

<!-- At end of <body> -->
<div id="footer-placeholder"></div>
```

### Required Assets
```html
<head>
    <!-- ... -->
    <link rel="stylesheet" href="../css/shared-components.css">
</head>
<body>
    <!-- ... -->
    <script src="../js/shared-components.js" defer></script>
</body>
```

---

## Color Palette (MANDATORY)

```css
:root {
    --bg-primary: #050A14;
    --bg-secondary: #0a0f1a;
    --bg-card: #0d1424;
    --border-subtle: rgba(59, 130, 246, 0.2);
    --border-glow: rgba(59, 130, 246, 0.4);
    --text-primary: #ffffff;
    --text-secondary: #a0aec0;
    --text-muted: #64748b;
    --accent-blue: #3b82f6;
    --accent-cyan: #06b6d4;
    --accent-green: #10b981;  /* Use sparingly - for positive verdicts */
    --accent-amber: #f59e0b;  /* Warnings */
    --accent-red: #ef4444;    /* FALSE verdicts, negative */
}
```

---

## Collapsible Sources Banner

```html
<section class="sources-banner">
    <div class="sources-header" onclick="toggleSources()">
        <div class="sources-title">
            <i data-lucide="shield-check" style="width:20px;height:20px;"></i>
            <span>Sources First</span>
            <span class="sources-badge">6</span>
        </div>
        <i data-lucide="chevron-down" style="width:20px;height:20px;transition:transform 0.2s;" id="sourcesChevron"></i>
    </div>
    <div class="sources-content" id="sourcesContent">
        <!-- Source cards go here -->
    </div>
</section>
```

```css
.sources-banner {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    margin-bottom: 40px;
    overflow: hidden;
}

.sources-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    background: rgba(59, 130, 246, 0.05);
    border-bottom: 1px solid var(--border-subtle);
    cursor: pointer;
    transition: background 0.2s;
}

.sources-header:hover {
    background: rgba(59, 130, 246, 0.08);
}

.sources-content {
    padding: 24px;
    display: none;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
}

.sources-content.expanded {
    display: grid;
}
```

```javascript
function toggleSources() {
    const content = document.getElementById('sourcesContent');
    const chevron = document.getElementById('sourcesChevron');
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        chevron.style.transform = 'rotate(-90deg)';
    } else {
        content.classList.add('expanded');
        chevron.style.transform = 'rotate(0deg)';
    }
}
```

---

## Source Card Component

```html
<div class="source-card">
    <a href="https://example.gov/source" target="_blank">
        <div class="source-icon gov">GOV</div>
        <div class="source-info">
            <h4>Source Title</h4>
            <span class="source-domain">example.gov</span>
        </div>
        <span class="source-score high">95</span>
    </a>
</div>
```

```css
.source-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: 16px;
    transition: all 0.2s;
}

.source-card:hover {
    border-color: var(--border-glow);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.source-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
}

.source-icon.gov { background: rgba(16, 185, 129, 0.2); color: var(--accent-green); }
.source-icon.data { background: rgba(6, 182, 212, 0.2); color: var(--accent-cyan); }
.source-icon.news { background: rgba(59, 130, 246, 0.2); color: var(--accent-blue); }
.source-icon.org { background: rgba(59, 130, 246, 0.2); color: var(--accent-blue); }

.source-score.high { background: rgba(16, 185, 129, 0.2); color: var(--accent-green); }
.source-score.medium { background: rgba(245, 158, 11, 0.2); color: var(--accent-amber); }
```

---

## Float Figure (Magazine-Style Charts)

```html
<figure class="float-figure right">
    <div class="live-data-panel">
        <!-- Chart content -->
    </div>
    <figcaption>Caption describing the chart</figcaption>
</figure>
```

```css
.float-figure {
    margin: 20px 0;
    padding: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
}

.float-figure.right {
    float: right;
    width: 48%;
    margin-left: 30px;
    margin-bottom: 20px;
}

.float-figure.left {
    float: left;
    width: 48%;
    margin-right: 30px;
    margin-bottom: 20px;
}

@media (max-width: 900px) {
    .float-figure.right,
    .float-figure.left {
        float: none;
        width: 100%;
        margin: 20px 0;
    }
}

.float-figure figcaption {
    margin-top: 12px;
    font-size: 0.85rem;
    color: var(--text-muted);
    text-align: center;
}

/* IMPORTANT: Add clearfix to parent section */
.clearfix::after {
    content: '';
    display: table;
    clear: both;
}
```

---

## Live Data Panel with Electric Border

```html
<div class="live-data-panel">
    <div class="live-data-header">
        <div class="live-indicator">
            <span class="live-dot"></span>
            <span class="live-indicator-text">LIVE DATA</span>
        </div>
        <div class="live-timestamp" id="timestamp">Loading...</div>
    </div>
    <div class="chart-container" id="chartContainer">
        <canvas id="chart"></canvas>
    </div>
    <div class="chart-source">
        Source: <a href="https://source.url" target="_blank">Source Name</a>
    </div>
</div>
```

```css
.live-data-panel {
    background: var(--bg-secondary);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
}

/* Subtle electric border animation */
.live-data-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    padding: 2px;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(59, 130, 246, 0.3) 25%,
        var(--accent-cyan) 50%,
        rgba(59, 130, 246, 0.3) 75%,
        transparent 100%
    );
    background-size: 200% 100%;
    animation: electricFlow 3s linear infinite;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: 1;
}

@keyframes electricFlow {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.live-data-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: rgba(59, 130, 246, 0.08);
    border-bottom: 1px solid rgba(59, 130, 246, 0.2);
    position: relative;
    z-index: 2;
}

.live-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.live-dot {
    width: 10px;
    height: 10px;
    background: var(--accent-cyan);
    border-radius: 50%;
    animation: pulseLive 2s ease-in-out infinite;
    box-shadow: 0 0 8px var(--accent-cyan);
}

@keyframes pulseLive {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.2); }
}

.live-indicator-text {
    color: var(--accent-cyan);
}

.chart-container {
    padding: 16px;
    height: 220px;
    position: relative;
    z-index: 2;
}

.chart-source {
    padding: 10px 16px;
    background: rgba(59, 130, 246, 0.05);
    border-top: 1px solid rgba(59, 130, 246, 0.15);
    font-size: 0.7rem;
    color: var(--text-muted);
    font-family: 'JetBrains Mono', monospace;
    position: relative;
    z-index: 2;
}
```

---

## Chart.js Pulsing Live Data Point Plugin

```javascript
const liveDataPointPlugin = {
    id: 'liveDataPoint',
    afterDatasetsDraw: (chart) => {
        const datasets = chart.data.datasets;
        if (!datasets.length) return;

        const ctx = chart.ctx;
        const meta = chart.getDatasetMeta(0);
        const lastPoint = meta.data[meta.data.length - 1];

        if (!lastPoint) return;

        const x = lastPoint.x;
        const y = lastPoint.y;
        const baseColor = datasets[0].borderColor || '#3b82f6';

        // Calculate pulse phase (slow 3-second cycle)
        const time = Date.now() / 1000;
        const pulse = (Math.sin(time * (2 * Math.PI / 3)) + 1) / 2;

        ctx.save();

        // Outer glow ring
        const outerRadius = 18 + (pulse * 12);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, outerRadius);
        gradient.addColorStop(0, `rgba(${hexToRgb(baseColor)}, ${0.4 + pulse * 0.3})`);
        gradient.addColorStop(0.5, `rgba(${hexToRgb(baseColor)}, ${0.2 + pulse * 0.2})`);
        gradient.addColorStop(1, `rgba(${hexToRgb(baseColor)}, 0)`);

        ctx.beginPath();
        ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Middle ring
        const midRadius = 10 + (pulse * 5);
        ctx.beginPath();
        ctx.arc(x, y, midRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${hexToRgb(baseColor)}, ${0.5 + pulse * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner bright dot
        ctx.beginPath();
        ctx.arc(x, y, 4 + (pulse * 2), 0, Math.PI * 2);
        ctx.fillStyle = baseColor;
        ctx.fill();

        ctx.restore();
    }
};

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
    }
    if (hex === '#3b82f6') return '59, 130, 246';
    if (hex === '#06b6d4') return '6, 182, 212';
    return '59, 130, 246';
}

Chart.register(liveDataPointPlugin);

// Animation loop for continuous pulse
let animationCharts = [];
function startChartAnimation() {
    function animate() {
        animationCharts.forEach(chart => {
            if (chart && chart.ctx) chart.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}
startChartAnimation();

// After creating chart, register it:
// animationCharts.push(myChart);
```

---

## Executive Summary (Claim vs Reality)

```html
<section class="executive-summary">
    <h2 class="prose-h2">
        <i data-lucide="file-text" style="width:24px;height:24px;"></i>
        Executive Summary
    </h2>
    <div class="summary-grid">
        <div class="summary-card claim">
            <div class="card-label">The Viral Claim</div>
            <p class="card-content" style="font-style: italic;">"Quoted claim text here"</p>
            <div class="card-source">
                <span>ORIGIN:</span> Source of claim
            </div>
        </div>
        <div class="summary-card reality">
            <div class="card-label">The Reality</div>
            <p class="card-content">
                Factual explanation with <a href="#">source links</a>.
            </p>
        </div>
    </div>
</section>
```

```css
.executive-summary {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);
    border: 1px solid var(--border-glow);
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 48px;
}

.summary-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 24px;
    margin: 24px 0;
}

@media (max-width: 768px) {
    .summary-grid { grid-template-columns: 1fr; }
}

.summary-card {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: 24px;
}

.summary-card.claim {
    border-left: 4px solid var(--accent-red);
}

.summary-card.reality {
    border-left: 4px solid var(--accent-cyan);
}

.card-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    margin-bottom: 12px;
    font-family: 'JetBrains Mono', monospace;
}
```

---

## Insight Cards

```html
<div class="insight-card positive">
    <div class="insight-header">
        <i data-lucide="trending-up" style="width:20px;height:20px;"></i>
        <h4 class="insight-title">Insight Title</h4>
    </div>
    <div class="insight-content">
        <p>Insight explanation text.</p>
    </div>
</div>
```

Variants: `.positive` (cyan), `.negative` (red), `.info` (blue), default (amber)

---

## Verdict Section

```html
<section class="verdict-section">
    <h2 class="prose-h2">
        <i data-lucide="gavel" style="width:24px;height:24px;"></i>
        Bottom Line
    </h2>
    <div class="verdict-box">
        <span class="verdict-label">FALSE</span>
        <p class="verdict-explanation">
            Explanation of the verdict...
        </p>
    </div>
</section>
```

For TRUE verdicts, change colors to green:
```css
.verdict-box {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%);
    border: 2px solid rgba(16, 185, 129, 0.3);
}
.verdict-label {
    background: var(--accent-green);
}
```

---

## Required External Dependencies

```html
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@latest"></script>
```

Initialize Lucide after DOM load:
```javascript
lucide.createIcons();
```

---

## Reference Files

- **Best example (fact-check)**: `fednow-freeze.html`
- **Best example (policy analysis)**: `marijuana-rescheduling.html`
- **Main app**: `index.html`
- **API backend**: `api/index.py`

---

*Last updated: December 18, 2025*
