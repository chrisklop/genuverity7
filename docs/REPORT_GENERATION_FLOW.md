# GenuVerity Report Generation Flow

A comprehensive guide to how reports are generated from user input to final display.

## Overview Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          REPORT GENERATION FLOW                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐                 │
│  │   USER       │     │   FRONTEND   │     │   BACKEND    │                 │
│  │   INPUT      │────▶│   index.html │────▶│   api/index  │                 │
│  │              │     │              │     │   .py        │                 │
│  └──────────────┘     └──────┬───────┘     └──────┬───────┘                 │
│                              │                     │                         │
│                              │  SSE Stream         │  Claude API             │
│                              │◀────────────────────│  (Streaming)            │
│                              │                     │                         │
│                       ┌──────▼───────┐     ┌──────▼───────┐                 │
│                       │   RENDER     │     │   CACHE      │                 │
│                       │   Report     │     │   (Blob/FS)  │                 │
│                       └──────────────┘     └──────────────┘                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Phase 1: User Initiates Generation

### Entry Points

| Trigger | Function | Location |
|---------|----------|----------|
| Search box submit | `triggerGenerate()` | index.html:8510 |
| Rabbit hole button | `generateReport(topic)` | index.html:7500 |
| Deep dive button | `generateDeepDive()` | index.html:9015 |
| Research status retry | `generateReport(topic)` | index.html:9797 |

### `generateReport(initialTopic)` - index.html:8339

```javascript
async function generateReport(initialTopic = null) {
    // 1. Get topic (from param or prompt user)
    let topic = initialTopic || prompt("Enter a topic...");

    // 2. Register generation (creates AbortController, adds to activeGenerations Map)
    const registration = registerGeneration(topic, 'report');

    // 3. Start debug session for diagnostics
    GenerationDebugger.startSession(topic, 'report');

    // 4. Show loading state on search box (brief 1.5s)

    // 5. Fetch from /api/generate with SSE streaming
    const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ topic }),
        signal: abortController.signal  // Allows cancellation
    });

    // 6. Process SSE stream
    // 7. Store article in reports[key]
    // 8. Mark generation complete
}
```

### `registerGeneration(topic, type)` - index.html:9518

Creates a tracking entry in `activeGenerations` Map:
```javascript
{
    id: 'gen_1234567890_abc12',
    topic: 'AI bubble',
    type: 'report',
    percent: 0,
    message: 'Starting...',
    startTime: Date.now(),
    abortController: new AbortController(),
    failed: false,
    key: null
}
```

Returns `null` if at max capacity (prevents overload).

---

## Phase 2: Backend Processing

### Endpoint: `POST /api/generate` - api/index.py:751

```python
@app.post("/api/generate")
async def generate_report(request: GenerateRequest, req: Request):
    # 1. Build prompt from ARTICLE_TEMPLATE
    prompt = ARTICLE_TEMPLATE.format(
        topic=request.topic,
        context_section="",
        topic_slug=topic_slug
    )

    # 2. Stream from Claude API
    with claude_client.messages.stream(
        model=CLAUDE_MODEL,  # claude-sonnet-4-20250514
        max_tokens=6000,
        messages=[{"role": "user", "content": prompt}]
    ) as stream:
        # 3. Send SSE progress events
        # 4. Accumulate response text

    # 5. Parse JSON response (with repair if truncated)
    # 6. Cache to Vercel Blob Storage
    # 7. Send final content event
```

### ARTICLE_TEMPLATE - api/index.py:708

The template instructs Claude to generate:

```json
{
  "key": "topic_slug",
  "title": "Compelling headline",
  "cardTitle": "3-5 word card title",
  "cardTag": "CATEGORY // SUBCATEGORY",
  "cardDescription": "One-line teaser",
  "chartConfigs": {
    "chart_main": {"type": "bar", "data": {...}, "title": "..."},
    "chart_secondary": {"type": "line", "data": {...}, "title": "..."},
    "chart_tertiary": {"type": "pie", "data": {...}, "title": "..."}
  },
  "contextData": {"term": {"expanded": "Explanation"}},
  "citationDatabase": {"src1": {"domain": "...", "trustScore": 95, ...}},
  "sources": [{"name": "Source", "score": 95, "url": "https://..."}],
  "content": "<p class='prose-text'>HTML article content...</p>"
}
```

**Critical**: `chartConfigs` is placed FIRST to ensure charts survive timeout truncation.

### SSE Progress Events

| Event | Percent | Trigger | Message |
|-------|---------|---------|---------|
| `init` | 5% | Start | "Preparing investigation..." |
| `connect` | 10% | Before stream | "Initializing research pipeline..." |
| `research` | 15% | Stream starts | "Researching topic..." |
| `title` | 25% | `"title"` detected | "Crafting headline..." |
| `writing` | 35% | `"content"` detected | "Writing introduction..." |
| `analysis` | 50% | Section 2 detected | "Analyzing data..." |
| `deep` | 65% | Section 3 detected | "Deep diving into findings..." |
| `charts` | 80% | `"chartConfigs"` detected | "Generating visualizations..." |
| `sources` | 90% | `"sources"` detected | "Verifying sources..." |
| `parsing` | 95% | Stream complete | "Parsing response..." |
| `complete` | 100% | JSON parsed | "Investigation complete!" |

### JSON Repair System

For handling Claude API timeouts (60s Vercel limit):

1. **`repair_truncated_json()`** - api/index.py:613
   - Fixes unclosed braces/brackets
   - Closes unterminated strings
   - Falls back to regex extraction

2. **`extract_chartconfigs()`** - api/index.py:522
   - Extracts chart data even from partial JSON
   - Ensures visualizations survive truncation

### Caching

Articles are cached for persistence:

1. **Primary**: Vercel Blob Storage (`blob_put()`)
   - Path: `articles/{hash}.json`
   - Hash: MD5 of normalized topic

2. **Fallback**: Local filesystem (`/tmp/article_cache/`)
   - Used for local development
   - Ephemeral on Vercel

---

## Phase 3: Frontend SSE Processing

### Stream Reading Loop - index.html:8401

```javascript
const reader = response.body.getReader();
const decoder = new TextDecoder();
let buffer = '';

while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Parse SSE events
    for (const line of lines) {
        if (line.startsWith('event: ')) {
            currentEvent = line.slice(7).trim();
        } else if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));

            if (currentEvent === 'progress') {
                updateGenerationProgress(genId, data.percent, data.message);
            } else if (currentEvent === 'content') {
                articleContent = data;  // Final article object
            } else if (currentEvent === 'error') {
                throw new Error(data);
            }
        }
    }
}
```

### Generation Card UI Updates

`updateGenerationProgress()` updates the Research Status panel card:
- Progress bar fills
- Status message updates
- Percentage display

`completeGeneration()` when done:
- Shows "View" button
- Stores article key reference
- Updates card styling (green border)

### Error Handling

```javascript
catch (e) {
    if (e.name === 'AbortError') {
        // User cancelled - clean exit
    } else {
        // Show failed state with retry option
        failGeneration(genId, errorMsg);
    }
}
```

---

## Phase 4: Article Rendering

### `loadReport(key)` - index.html:6085

```javascript
function loadReport(key) {
    // 1. Check if article exists in reports object
    if (reports[key]) {
        currentArticleKey = key;
        renderReportData(reports[key]);
        return;
    }

    // 2. Try to fetch from cache API
    fetch('/api/cache/check', {
        method: 'POST',
        body: JSON.stringify({ topic: key })
    }).then(response => {
        if (response.ok) {
            renderReportData(result.article, true);
        }
    });
}
```

### `renderReportData(data, isDynamic)` - index.html:6147

The main rendering function:

```javascript
function renderReportData(data, isDynamic = false) {
    // 1. Switch to report view
    switchView('view-report');

    // 2. Set title and content
    document.getElementById('report-title').innerText = data.title;
    document.getElementById('report-body').innerHTML = data.content;

    // 3. Sort sources by score
    const allSources = data.sources.sort((a, b) => b.score - a.score);

    // 4. Build Sources First tabbed banner (4 sources per tab)
    // Tab names: Primary, Secondary, Tertiary, Quaternary

    // 5. Update Edge Peek navigation
    updateEdgePeekNavigation(data, key);

    // 6. Re-initialize icons
    lucide.createIcons();

    // 7. Render charts (after DOM ready)
    requestAnimationFrame(() => {
        if (data.chartConfigs) {
            renderDynamicCharts(data.chartConfigs);
        }
        initLivingNumbers();      // Animated counters
        initLightboxHandlers();   // Image zoom
        initDeepDiveTooltips();   // Hover previews
    });
}
```

### Chart Rendering

**Dynamic Charts** (`renderDynamicCharts()` - index.html:~3500):
- Takes `chartConfigs` object
- Creates Chart.js instances for each canvas element
- Supports: bar, line, pie, doughnut, radar

**Pre-defined Charts** (`renderCharts(chartType)` - index.html:~3200):
- For built-in articles with specific visualizations
- Used for static/curated content

---

## Phase 5: Interactive Features

### Living Numbers
Animated counters that count up when scrolled into view:
```html
<span class="living-number" data-target="600" data-suffix="B">$0</span>
```
Initializer: `initLivingNumbers()` - uses IntersectionObserver

### Fractal Triggers
Expandable context definitions:
```html
<strong class="fractal-trigger" onclick="expandContext(this,'key')">term</strong>
```
Data source: `data.contextData`

### Citation Spades
Inline source references with hover cards:
```html
<span class="citation-spade" data-id="src1">♠</span>
```
Data source: `data.citationDatabase`

### Deep Dive Buttons
Generate child articles:
```html
<span class="fig-deep-dive" onclick="handleDeepDive(this)">DEEP DIVE</span>
```
Triggers: `generateDeepDive(topic, context, parentKey, parentTitle)`

---

## Data Flow Summary

```
User Input
    │
    ▼
registerGeneration() ──▶ activeGenerations Map
    │
    ▼
fetch('/api/generate') ──▶ FastAPI Endpoint
    │
    ▼
claude_client.messages.stream() ──▶ Claude Sonnet 4 API
    │
    ▼
SSE Progress Events ◀────────────────┘
    │
    ▼
JSON Parse (repair_truncated_json)
    │
    ▼
cache_article() ──▶ Vercel Blob Storage
    │
    ▼
SSE Content Event ──▶ Frontend
    │
    ▼
reports[key] = data
    │
    ▼
completeGeneration()
    │
    ▼
User clicks "View"
    │
    ▼
loadReport(key)
    │
    ▼
renderReportData(data)
    │
    ├──▶ Sources First Banner (tabbed)
    ├──▶ Article Title & Content
    ├──▶ renderDynamicCharts()
    ├──▶ initLivingNumbers()
    └──▶ initDeepDiveTooltips()
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `index.html` | Full SPA frontend (~11,000 lines) |
| `api/index.py` | FastAPI backend (~1,100 lines) |
| `vercel.json` | Routing & function config |
| `docs/essay_schema.md` | HTML component templates |
| `templates/essay_config.json` | Layout configuration |

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Claude API authentication |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage access |
| `GEMINI_API_KEY` | Infographic generation (optional) |

## Timeouts & Limits

| Limit | Value | Configured In |
|-------|-------|---------------|
| Vercel function timeout | 300s (5 min) | vercel.json |
| Claude API timeout | 300s | api/index.py:48 |
| Max tokens | 6,000 | api/index.py:795 |
| Free daily deep dives | 5 | api/index.py:42 |
| Max concurrent generations | Dynamic | Frontend logic |

---

## Debugging

### GenerationDebugger
Press 'D' to open debug panel, or click bug icon in navbar.

Logs stored in `localStorage.genuverity_debug` (last 10 sessions).

### Console Logs
- `[SSE]` - Stream events
- `[Generate]` - Generation lifecycle
- `[Charts]` - Chart rendering
- `[Infographic]` - Image loading

### Server Logs
```bash
vercel logs genuverity7.vercel.app --limit 50
```
