# Golden Essay Template (GenuVerity)

Use this JSON structure to add or upgrade essays in `index.html`.

## Core Structure
```javascript
'unique_id': {
    title: "Catchy Main Title",
    content: `...HTML CONTENT...`,
    chartType: 'chart_id', // Triggers specific rendering in renderCharts()
    sources: [
        { name: "Source Name", score: 99, url: "https://example.com" }
    ]
}
```

## HTML Components

### 1. The Magazine Layout (Text Wrapping)
**CRITICAL**: Place the float `<div>` **BEFORE** the paragraph `p` tag to ensure proper wrapping.

```html
<!-- Float Placement: ALWAYS BEFORE THE PARAGRAPH -->
<div class="float-figure right"> <!-- or 'left' -->
     <div style="height: 250px;"><canvas id="chart_id"></canvas></div>
     <div class="fig-caption">Fig X. Chart Title</div>
</div>

<p class="prose-text">
    Your text goes here...
</p>
```

### 2. Living Numbers (Animated Data)
Numbers that animate from 0 to target on scroll.
- `data-target`: The final numeric value.
- `data-suffix`: The suffix (e.g., "B", "%", " TWh").
- Initial content should be `$0` or `0` to allow animation.

```html
<span class="living-number" data-target="600" data-suffix="B">$0</span>
```

### 3. Fractal Triggers (Deep Dives)
Clickable text that expands context snippets (defined in `contextData`).

```html
<strong class="fractal-trigger" onclick="expandContext(this, 'context_key')">Interactive Text</strong>
```

### 4. Verified Citations (Inline Spades)
Inline spades that show a hover card.
- `data-id`: Must match a key in `contextData` or source logic (currently visual).

```html
<span class="citation-spade" data-id="source_key">♠</span>
```

### 5. Highlights
Glowing white text for emphasis.

```html
<span class="highlight-glow">Key Insight</span>
```

## Example Section

```html
<h2 class="prose-h2">1. Section Title</h2>

<!-- Chart floats RIGHT, text wraps LEFT -->
<div class="float-figure right">
     <div style="height: 250px;"><canvas id="chart_example"></canvas></div>
     <div class="fig-caption">Fig 1. Data Visualization</div>
</div>

<p class="prose-text">
    The technology sector is facing a <span class="highlight-glow">Capital Mismatch</span>. 
    Projected spend is <span class="living-number" data-target="1000" data-suffix="B">$0</span>, 
    but revenue is lagging <span class="citation-spade" data-id="source_1">♠</span>.
</p>
```
