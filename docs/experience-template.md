# GenuVerity Experience Template

**Template Name**: Experience Template
**Shorthand**: "Experience", "Immersive Experience"
**Command Examples**:
- "Generate an experience"
- "Create an experience about [topic]"
- "Edit the experience template"

---

## When to Use This Template

| Use Experience Template | Use Standard Report Template |
|------------------------|------------------------------|
| Historical narratives spanning decades/centuries | Single claim fact-check |
| Multi-era timelines | Current event analysis |
| Network/connection visualization needed | Source verification focus |
| "Journey" or "story" presentation | Evidence-based verdict |
| Educational/immersive content | Quick turnaround needed |
| Complex system relationships | Standard article format |

---

## Template Structure

### 1. Opening Hook Section
```html
<section class="opening-hook">
    <div class="hook-text">
        <p class="hook-quote">[Provocative opening question or statement]</p>
    </div>
</section>
```

### 2. Hero Section with Animated Title
```html
<header class="hero">
    <div class="hero-content">
        <h1 class="main-title">
            <span class="title-line">[Title Line 1]</span>
            <span class="title-accent">[Emphasized Line]</span>
        </h1>
        <p class="subtitle">[Descriptive subtitle with time span]</p>
        <div class="scroll-indicator">
            <span>Scroll to explore</span>
            <i data-lucide="chevron-down"></i>
        </div>
    </div>
</header>
```

### 3. Era Sections (Repeatable)
```html
<section class="era-section" data-era="[era-id]">
    <div class="era-header">
        <span class="era-badge">[ERA NAME]</span>
        <h2 class="era-title">[Era Title]</h2>
        <p class="era-dates">[Date Range]</p>
    </div>

    <div class="era-content">
        <!-- Narrative paragraphs -->
        <p class="prose-text">[Content with <span class="context-trigger" data-term="term-id">hoverable terms</span>]</p>

        <!-- Event cards carousel -->
        <div class="events-carousel">
            <div class="event-card" data-event-id="[id]">
                <div class="event-year">[Year - no commas]</div>
                <h3 class="event-title">[Event Title]</h3>
                <p class="event-summary">[Brief summary]</p>
            </div>
            <!-- More cards -->
        </div>
    </div>
</section>
```

### 4. Statistics Interlude
```html
<section class="stats-section">
    <div class="stat-card">
        <div class="stat-number" data-value="[final-value]">0</div>
        <div class="stat-label">[Label]</div>
        <div class="stat-context">[Context explanation]</div>
    </div>
    <!-- More stat cards -->
</section>
```

### 5. Network Graph Section (3D Force Graph)
```html
<section class="network-section">
    <div class="network-header">
        <h2>[Network Title]</h2>
        <p>[Interaction instructions]</p>
    </div>
    <div class="network-container"></div>

    <!-- Legend -->
    <div class="network-legend">
        <div class="legend-item">
            <span class="legend-dot" style="background: [color]"></span>
            <span class="legend-label">[Label]</span>
        </div>
    </div>

    <!-- Connection types -->
    <div class="connection-legend">
        <div class="connection-type">
            <span class="connection-line" style="background: [color]"></span>
            <span class="connection-label">[Type]</span>
        </div>
    </div>

    <!-- Sidebar (slides in on node click) -->
    <div class="network-sidebar" id="networkSidebar">
        <button class="sidebar-close" onclick="closeNetworkSidebar()">
            <i data-lucide="x"></i>
        </button>
        <h3 id="sidebarTitle"></h3>
        <p class="sidebar-year" id="sidebarYear"></p>
        <div class="sidebar-section">
            <h4>Summary</h4>
            <p id="sidebarSummary"></p>
        </div>
        <div class="sidebar-section">
            <h4>Significance</h4>
            <p id="sidebarSignificance"></p>
        </div>
        <div class="sidebar-section">
            <h4>Connections</h4>
            <div id="connectionsList"></div>
        </div>
    </div>
</section>
```

### 6. Conclusion Section
```html
<section class="conclusion-section">
    <div class="conclusion-content">
        <h2>[Conclusion Title]</h2>
        <p class="conclusion-text">[Synthesis and call to action]</p>
    </div>
</section>
```

### 7. Context Overlay (For Glossary Terms)
```html
<div class="context-overlay" id="contextOverlay">
    <div class="context-card">
        <div class="context-header">
            <span class="context-badge">
                <i data-lucide="[icon]"></i>
            </span>
            <button class="context-close">
                <i data-lucide="x"></i>
            </button>
        </div>
        <h4 class="context-title"></h4>
        <p class="context-description"></p>
        <div class="context-significance">
            <strong>Why it matters:</strong>
            <p></p>
        </div>
        <a class="context-deepdive" target="_blank">
            Learn more <i data-lucide="external-link"></i>
        </a>
    </div>
</div>
```

---

## Required Dependencies

```html
<!-- In <head> -->
<script src="https://unpkg.com/lucide@latest"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://unpkg.com/3d-force-graph@1.73.0/dist/3d-force-graph.min.js"></script>
<script src="js/timeline-data.js"></script> <!-- Separate data file -->
```

---

## Data Structure (timeline-data.js)

```javascript
const TIMELINE_DATA = {
    eras: [
        {
            id: 'era-id',
            name: 'Era Name',
            shortName: 'SHORT',
            dateRange: '1890-1920',
            color: '#ef4444',  // Era theme color
            events: [
                {
                    id: 'event-id',
                    year: 1898,  // NO COMMAS in year display
                    title: 'Event Title',
                    summary: 'Brief summary',
                    details: 'Extended details',
                    impact: 'Significance statement',
                    connections: ['other-event-id'],  // For network graph
                    highlight: true  // Optional: larger node
                }
            ]
        }
    ],

    glossary: {
        'term-id': {
            term: 'Display Term',
            type: 'person|agency|organization|law|concept|event',
            icon: 'lucide-icon-name',
            description: 'Definition',
            significance: 'Why it matters',
            deepDiveUrl: 'https://...'
        }
    },

    connectionTypes: {
        'technique': { color: '#06b6d4', label: 'Technique Transfer' },
        'personnel': { color: '#f59e0b', label: 'Personnel Movement' },
        'exposure': { color: '#ef4444', label: 'Exposure/Revelation' },
        'reaction': { color: '#10b981', label: 'Reaction/Backlash' },
        'legal': { color: '#3b82f6', label: 'Legal Enablement' }
    }
};
```

---

## CSS Variables (Experience-Specific)

```css
:root {
    /* Base (same as reports) */
    --bg-void: #000000;
    --bg-primary: #050A14;
    --bg-card: #111827;
    --text-primary: #f0f0f0;
    --accent-blue: #3b82f6;
    --accent-cyan: #06b6d4;
    --accent-green: #10b981;
    --accent-amber: #f59e0b;
    --accent-red: #ef4444;

    /* Experience-specific */
    --era-transition: 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    --card-hover-lift: -8px;
    --glow-intensity: 0.6;
    --scroll-snap: y mandatory;
}
```

---

## Required JavaScript Functions

### 1. Scroll Animations
```javascript
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    // Era reveals, parallax, progress tracking
}
```

### 2. Context Overlay System
```javascript
function showContextOverlay(termId, triggerElement) {
    const data = TIMELINE_DATA.glossary[termId];
    // Position overlay, populate content, show
}
```

### 3. Network Graph Initialization
```javascript
function initNetworkGraph() {
    const Graph = ForceGraph3D()
        (container)
        .nodeThreeObject(node => { /* Custom glow nodes */ })
        .onNodeClick(node => { /* Sidebar population */ });
    // Add starfield, particles, lighting
}
```

### 4. Stat Counter Animation
```javascript
function animateValue(element, finalValue) {
    // Handle prefix ($) and suffix (B, M, K, +)
    // Animate from 0 to final value
}
```

---

## Quality Checklist

Before deploying an Experience:

```
□ All years display WITHOUT commas (1898 not 1,898)
□ Glossary has 50+ entries for context triggers
□ Network graph has clear connection type legend
□ Stats section values animate correctly
□ Mobile: context overlays use bottom-sheet pattern
□ Mobile: carousel swipe works (40% threshold)
□ 3D network: smooth gradient glow (24+ layers)
□ Starfield renders (5000+ stars)
□ No purple colors (#8b5cf6)
□ GSAP ScrollTrigger initialized
□ Lucide icons render after dynamic content
□ Sound toggle functional (optional feature)
```

---

## File Organization

```
/GenuVerity7/
├── timeline.html              # Main experience file
├── js/
│   └── timeline-data.js       # Separate data file
├── docs/
│   ├── experience-template.md # This file
│   └── deep-research-prompts.md
└── images/
    └── thumbnails/
        └── [experience-slug].webp
```

---

## Example: Creating a New Experience

### Step 1: Copy Base Template
```bash
cp timeline.html experiences/new-experience.html
```

### Step 2: Create Data File
```bash
touch js/new-experience-data.js
```

### Step 3: Update Data Reference
```html
<script src="js/new-experience-data.js"></script>
```

### Step 4: Populate Data Structure
Follow the TIMELINE_DATA schema above.

### Step 5: Customize Era Colors/Content
Modify era sections and CSS variables.

### Step 6: Generate Thumbnail
400x400 WebP for reports-data.js integration.

---

## Comparison: Experience vs. Report

| Feature | Experience | Report |
|---------|------------|--------|
| Primary format | Scroll-driven narrative | Article with sidebar |
| Data visualization | 3D network graph | Chart.js charts |
| Interactivity | High (hover, click, drag) | Medium (citations) |
| Content depth | Broad historical scope | Focused claim analysis |
| Production time | 2-4 hours | 30-60 minutes |
| Typical length | 3000-8000 words | 1000-3000 words |
| Verdict | Optional/implicit | Required/explicit |
| Sources | Integrated in glossary | Sidebar grid |

---

*Template Version: 1.0*
*Last Updated: December 2024*
