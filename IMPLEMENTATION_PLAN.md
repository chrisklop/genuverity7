# GenuVerity Deep Dive Essay System - Implementation Plan

## Project Overview

Transform GenuVerity into a fully interactive investigative journalism platform where:
1. All 3 trending articles are complete, high-quality 5-paragraph essays
2. Every "Rabbit Hole" deep dive button generates a new essay on-demand
3. An "Enhance" button allows users to expand any article into a more comprehensive version
4. The system maintains consistent styling, fonts, and magazine-quality presentation

---

## Current State Analysis

### What We Have:
- **3 Trending Articles** on Portal:
  1. "The $8 Trillion Gamble" (AI Bubble) - COMPLETE 5-section essay
  2. "The Congressional Alpha" - COMPLETE 3-section essay
  3. "The Grift Machine" - COMPLETE 3-section essay

- **3 Incomplete Stub Articles** (referenced but minimal content):
  - `energy_crisis` - Single paragraph stub
  - `model_collapse` - Single paragraph stub
  - `regulatory_capture` - Single paragraph stub

- **Fractal Triggers with Rabbit Hole Buttons**:
  - `sequoia_math` - "$600 billion in annual revenue" (AI article)
  - `obsolescence` - "3-4 year obsolescence cycle" → Links to `model_collapse`
  - `eight_trillion` - Links to `energy_crisis`
  - `pac_slush` - "Leadership PACs" (Grift article)
  - `cost_of_business` - "$200 fee" (Congress article)
  - `goldman_analysis` - Links to `regulatory_capture`

- **Backend**: FastAPI + Gemini 3 Pro for AI generation
- **Frontend**: Single-page app with view switching, Chart.js/Plotly visualizations

### What We Need:
1. Complete all 6 stub articles to full 5-paragraph essays
2. Auto-generate essays when Rabbit Hole buttons are clicked
3. Add "Enhance" button to expand articles
4. Ensure generated content includes proper HTML components (living numbers, citations, charts)

---

## Technical Architecture

### Recommended Tools & Approach

#### For This Project (No Additional MCPs Needed):
The existing stack is sufficient because:
- **Gemini 3 Pro** handles content generation excellently
- **Playwright** (already installed) can be used for testing/screenshots
- Content generation doesn't require web scraping - it's AI-generated investigative journalism

#### Optional Future Enhancements:
- **Firecrawl MCP** - For pulling real-time data/sources
- **Bright Data MCP** - For enterprise-scale research
- **Puppeteer/Playwright MCP** - For automated UI testing

### System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (index.html)                     │
├─────────────────────────────────────────────────────────────────┤
│  Portal View          Report View              Static View       │
│  ┌─────────┐         ┌──────────────────┐                       │
│  │Trending │         │ Article Content  │                       │
│  │ Cards   │────────▶│ ┌──────────────┐ │                       │
│  │ (3)     │         │ │ Enhance Btn  │ │◀── NEW                │
│  └─────────┘         │ └──────────────┘ │                       │
│                      │ [Fractal Triggers]│                       │
│                      │      │            │                       │
│                      │      ▼            │                       │
│                      │ ┌──────────────┐ │                       │
│                      │ │ Rabbit Hole  │ │                       │
│                      │ │   Button     │ │                       │
│                      │ └──────────────┘ │                       │
│                      └────────┬─────────┘                       │
└───────────────────────────────┼─────────────────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │   /api/generate       │
                    │   /api/enhance        │◀── NEW ENDPOINT
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │   Gemini 3 Pro        │
                    │   (Content Engine)    │
                    └───────────────────────┘
```

---

## Implementation Steps

### Phase 1: Complete Existing Content (Pre-populate)

**Goal**: All 6 articles fully written with 5 paragraphs each

#### 1.1 Expand Stub Articles
Convert these stubs to full essays matching the AI Bubble quality:

| Article Key | Current State | Target |
|-------------|---------------|--------|
| `energy_crisis` | 1 paragraph | 5 sections + 2 charts |
| `model_collapse` | 1 paragraph | 5 sections + 2 charts |
| `regulatory_capture` | 1 paragraph | 5 sections + 2 charts |

Each expanded article must include:
- Executive Summary with living numbers
- 5 numbered H2 sections
- 2 float-figure charts (left/right alternating)
- 3-5 citation spades with citationDatabase entries
- 2-3 fractal triggers linking to related topics
- Proper sources array with URLs and trust scores

#### 1.2 Add Chart Configurations
Add to `renderCharts()` function:
- `energy` type charts (already partially exists)
- `model` type charts (needs expansion)
- `regulatory` type charts (needs expansion)

### Phase 2: Dynamic Essay Generation

**Goal**: Clicking any Rabbit Hole button generates a full essay

#### 2.1 Enhance Backend Prompt
Update `server.py` to produce consistent, high-quality essays:

```python
# New comprehensive prompt template
ESSAY_PROMPT = """
You are an expert investigative journalist for GenuVerity.

TASK: Write a biting, data-driven exposé on: "{topic}"

STRICT OUTPUT FORMAT - Return ONLY valid JSON:
{{
    "{slug}": {{
        "title": "Catchy, Magazine-Style Title",
        "content": "<HTML content following schema>",
        "chartType": "{chart_type}",
        "sources": [
            {{"name": "Source Name", "score": 95, "url": "https://..."}}
        ]
    }}
}}

CONTENT REQUIREMENTS:
1. Executive Summary (1 paragraph with 2-3 living numbers)
2. Five H2 sections with prose-text paragraphs
3. Two float-figure divs (one right, one left) with canvas charts
4. 4-6 citation-spade elements with data-id attributes
5. 2-3 fractal-trigger elements for related deep dives
6. Magazine tone: cynical, data-driven, like The Atlantic

HTML COMPONENTS TO USE:
- <span class="living-number" data-target="X" data-suffix="B">$0</span>
- <span class="citation-spade" data-id="unique_key">♠</span>
- <strong class="fractal-trigger" onclick="expandContext(this, 'key')">Term</strong>
- <div class="float-figure right/left">...</div>
- <span class="highlight-glow">Key Insight</span>
"""
```

#### 2.2 Auto-Generate Citation Database
When generating essays, also return citation metadata:

```python
# Extended response format
{
    "essay_key": { ... },
    "citations": {
        "citation_id_1": {
            "domain": "EXAMPLE.COM",
            "score": 95,
            "title": "Article Title",
            "snippet": "Key quote from source..."
        }
    },
    "context": {
        "context_key_1": "Expandable context text..."
    }
}
```

#### 2.3 Frontend Integration
Update `generateReport()` to:
1. Show loading state on the clicked Rabbit Hole button
2. Merge new citations into `citationDatabase`
3. Merge new contexts into `contextData`
4. Add new chart type to `renderCharts()` dynamically

### Phase 3: Enhance Button Feature

**Goal**: Users can expand any article into a more comprehensive version

#### 3.1 Add Enhance Button to UI
Location: Top-right of article header (next to title)

```html
<button id="enhance-btn" onclick="enhanceArticle()"
    class="text-xs font-bold text-purple-400 hover:text-purple-300
           border border-purple-400/30 px-3 py-1 rounded
           flex items-center gap-2">
    <i data-lucide="sparkles"></i> ENHANCE
</button>
```

#### 3.2 New Backend Endpoint
`POST /api/enhance`

```python
@app.post("/api/enhance")
async def enhance_article(request: EnhanceRequest):
    """
    Takes existing article content and expands it:
    - Adds 2 more sections
    - Adds more data points/living numbers
    - Adds additional citations
    - Deepens analysis
    """
```

#### 3.3 Enhancement Levels
Track enhancement level per article:
- **Level 1** (Default): 5 sections, 2 charts
- **Level 2** (Enhanced): 7 sections, 3 charts, more citations
- **Level 3** (Deep): 10 sections, 4 charts, comprehensive analysis

### Phase 4: Complete Fractal Trigger Network

**Goal**: Every topic can deep-dive into related topics infinitely

#### 4.1 Topic Relationship Map
```
AI Bubble
├── Energy Crisis (power demands)
├── Model Collapse (data limits)
├── Regulatory Capture (oversight)
└── Semiconductor Wars (supply chain)

Congressional Trading
├── SEC Revolving Door
├── STOCK Act Loopholes
└── Dark Money Networks

Political Grift
├── PAC Accounting Tricks
├── Zombie Campaign Laws
└── FEC Enforcement Gap
```

#### 4.2 Dynamic Rabbit Hole Generation
When generating essays, AI suggests related deep-dive topics:

```javascript
// Frontend: Parse suggested topics from generated content
const suggestedTopics = data.suggested_deep_dives || [];
suggestedTopics.forEach(topic => {
    // Pre-register as potential future essays
    pendingTopics.add(topic);
});
```

---

## File Changes Required

### server.py
- [ ] Update prompt template for consistent essay quality
- [ ] Add `/api/enhance` endpoint
- [ ] Add chart type inference based on topic
- [ ] Return citation/context metadata with essays

### index.html
- [ ] Expand `reports` object with full `energy_crisis`, `model_collapse`, `regulatory_capture` content
- [ ] Add Enhance button to report view header
- [ ] Add `enhanceArticle()` function
- [ ] Expand `citationDatabase` with all source metadata
- [ ] Expand `contextData` with all fractal contexts
- [ ] Add dynamic chart registration for new topics
- [ ] Add loading states for generation

### docs/essay_schema.md
- [ ] Add enhancement levels documentation
- [ ] Document required chart configurations per topic type

---

## Testing Strategy

### Using Playwright (Already Installed)
```python
# Test script: test_deep_dive.py
from playwright.sync_api import sync_playwright

def test_deep_dive_generation():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:8000')

        # Navigate to AI article
        page.click('text=The $8 Trillion Gamble')

        # Click fractal trigger
        page.click('.fractal-trigger >> nth=0')

        # Click Rabbit Hole button
        page.click('.rabbit-hole-btn')

        # Wait for new article to load
        page.wait_for_selector('#report-title')

        # Verify content quality
        assert page.locator('.living-number').count() >= 2
        assert page.locator('.citation-spade').count() >= 3

        browser.close()
```

---

## Estimated Effort

| Phase | Tasks | Complexity |
|-------|-------|------------|
| Phase 1 | Complete 3 stub articles | Medium |
| Phase 2 | Dynamic generation | Medium |
| Phase 3 | Enhance button | Low |
| Phase 4 | Fractal network | Low |

---

## Success Criteria

1. **All 3 trending articles** display full 5-section essays with charts
2. **Every Rabbit Hole click** generates a new, properly-formatted essay
3. **Enhance button** visibly expands articles with more content
4. **No broken UI** - all charts render, all animations work
5. **Consistent styling** - new content matches existing aesthetic
6. **Fast generation** - Essays appear within 5-10 seconds

---

## Next Steps

1. **Immediate**: Expand the 3 stub articles manually (highest quality control)
2. **Then**: Implement `/api/enhance` endpoint
3. **Then**: Add Enhance button to UI
4. **Finally**: Test full deep-dive flow with Playwright
