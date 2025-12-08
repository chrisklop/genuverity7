# GenuVerity Roadmap

> Internal planning document for future features and development priorities.

---

## Current State (v3.0)

### Core Capabilities
- **Article Generation**: Claude Sonnet 4/4.5 for investigative journalism text
- **Infographics**: Gemini 3 Pro Image Preview for data visualizations
- **Interactive Charts**: Chart.js/Plotly.js fallback for dynamic data
- **Sources Panel**: Citation verification with hover cards
- **Fractal Triggers**: Expandable context for key claims

### Model Requirements (CRITICAL)
| Content Type | Model | Why |
|--------------|-------|-----|
| Article Text | Claude Sonnet 4/4.5 | Superior reasoning, structured output |
| Infographics | `gemini-3-pro-image-preview` | Best image generation, style consistency |

---

## Phase 1: Visual Enhancement (Current Priority)

### 1.1 Style E Implementation (Hover Reveal)
**Status**: In Progress

Apply hover-reveal caption style to all infographics:
- Caption hidden by default
- Gradient overlay appears on hover
- Smooth transition animations
- Deep Dive button accessible in both states

### 1.2 Single Concept Illustration
**Status**: Planned

One-click generation of a concept illustration based on article topic:
- Automatic topic extraction from article content
- Single API call to Gemini 3 Pro Image Preview
- GenuVerity watermark (bottom-left)
- Three style presets available

### 1.3 Style Presets (MVP)
**Status**: Planned

Initial three presets:
1. **Midnight Tech** (Default)
   - Dark gradient (#050505 → #0a0a1a)
   - Electric blue accent (#3b82f6)
   - Cyan/purple highlights
   - Tech-forward aesthetic

2. **Clinical Precision**
   - Clean white/gray backgrounds
   - Minimal color palette
   - Medical/scientific credibility
   - High-contrast data visualization

3. **Blueprint Technical**
   - Deep navy backgrounds
   - White gridlines and annotations
   - Technical drawing aesthetic
   - Engineering/infrastructure focus

### 1.4 GenuVerity Watermark
**Status**: Planned

Consistent branding on all generated visuals:
- Position: Bottom-left corner
- Format: "Genu" (white) + "Verity" (electric blue #3b82f6)
- Subtle, non-intrusive placement
- Included in all Gemini generation prompts

---

## Phase 2: Visual Lab (Future)

### 2.1 Visual Narratives
Sequential image sets that tell a story:
- 3-5 images with consistent protagonist/elements
- Reference image passing for style consistency
- Automatic scene progression based on article narrative

**Use Cases**:
- Financial: Executive journey from boardroom to consequences
- Political: Policy impact from announcement to effect
- Environmental: Before/during/after transformations

### 2.2 Process Diagrams
Step-by-step visual explanations:
- Numbered flow diagrams
- Consistent visual language across steps
- Automatic extraction of process from article text

**Disciplines**:
- Regulatory: How legislation becomes law
- Financial: Money flow through shell companies
- Corporate: Decision-making hierarchies

### 2.3 Comparative Panels
Side-by-side visual comparisons:
- Split-screen compositions
- Before/after states
- Claim vs. reality juxtaposition

### 2.4 Concept Characters
Consistent visual identities for recurring concepts:
- Up to 5 distinct character identities per article
- Reference image persistence across generations
- Appropriate for complex multi-party investigations

---

## Phase 3: Advanced Visual Features (Future)

### 3.1 Interactive Storyboards
Clickable narrative sequences:
- Pan/zoom on key details
- Branching narrative paths
- Evidence overlay mode

### 3.2 Data-Driven Infographic Sequences
Animated data visualization journeys:
- Time-series progressions
- Cause-effect chain visualizations
- Cumulative impact displays

### 3.3 Discipline-Specific Templates

| Discipline | Template Types |
|------------|----------------|
| Politics | Policy flowcharts, voting patterns, constituency maps |
| Finance | Money flows, corporate structures, market timelines |
| Healthcare | System diagrams, drug pipelines, outcome comparisons |
| Technology | Architecture diagrams, data flows, capability comparisons |
| Environment | Impact timelines, ecosystem diagrams, emissions tracking |
| Entertainment | Industry relationships, revenue flows, rights ownership |
| Media/News | Narrative timelines, source networks, coverage analysis |

---

## Phase 4: AI Enhancement (Future)

### 4.1 Multi-Turn Visual Editing
Iterative refinement of generated images:
- "Make the chart more dramatic"
- "Add more detail to the background"
- Preserve context with `thought_signatures`

### 4.2 Reference Image Library
Persistent style references:
- Save successful generations as style templates
- Apply consistent branding across investigations
- Build visual identity for recurring topics

### 4.3 Automatic Visual Planning
AI-suggested visual elements:
- Analyze article content
- Recommend appropriate visual types
- Auto-generate visual brief

---

## Technical Debt & Improvements

### High Priority
- [ ] Batch infographic generation optimization
- [ ] Image caching for repeated requests
- [ ] Fallback handling when Gemini rate-limited

### Medium Priority
- [ ] WebSocket progress updates for long generations
- [ ] Preview thumbnails before full generation
- [ ] Visual style consistency scoring

### Low Priority
- [ ] Export to PDF with embedded visuals
- [ ] Social media optimized image crops
- [ ] Accessibility alt-text generation

---

## API Endpoints (Existing & Planned)

### Existing
| Endpoint | Purpose |
|----------|---------|
| `POST /api/generate` | Generate full article |
| `POST /api/deep-dive` | Expand article section |
| `POST /api/infographics/batch` | Generate multiple infographics |

### Planned
| Endpoint | Purpose | Phase |
|----------|---------|-------|
| `POST /api/visual/concept` | Single concept illustration | 1 |
| `POST /api/visual/narrative` | Visual narrative sequence | 2 |
| `POST /api/visual/compare` | Comparative panel | 2 |
| `POST /api/visual/process` | Process diagram | 2 |

---

## Gemini 3 Pro Capabilities Reference

### Image Generation
- **Model**: `gemini-3-pro-image-preview`
- **Reference Images**: Up to 14 (6 objects + 5 people for consistency)
- **Multi-turn**: Supported with `thought_signatures`
- **Style Consistency**: Pass previous output as `inline_data`

### Best Practices
1. Always include style description in prompts
2. Use reference images for sequential content
3. Include GenuVerity branding in all prompts
4. Specify exact dimensions (800x500 for infographics)

---

## Changelog

### 2024-12-08
- Created roadmap document
- Phase 1 planning complete
- Style E selected for infographic presentation
- Visual Lab feature fully scoped

---

*Last updated: December 8, 2024*
