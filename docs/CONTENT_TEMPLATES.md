# GenuVerity Content Templates Guide
*Last updated: December 18, 2025*

This guide defines the standard templates for all GenuVerity report types. When creating new reports, follow these templates to maintain design consistency and source verification standards.

---

## Table of Contents
1. [General Requirements (All Reports)](#general-requirements-all-reports)
2. [Disinformation Network Analysis Report](#1-disinformation-network-analysis-report)
3. [Fact Check Report](#2-fact-check-report)
4. [Investigative Essay](#3-investigative-essay)
5. [Source Verification Protocol](#source-verification-protocol)
6. [CSS Classes Reference](#css-classes-reference)

---

## General Requirements (All Reports)

### Source Citation Standards
All reports MUST include:
- **Wikipedia-style inline citations** `<a href="#ref-N" class="citation">N</a>`
- **References section** at bottom with numbered links to primary sources
- **Minimum 4 citations** per executive summary
- **All links must be verified accessible** before publication

### Mandatory HTML Structure
```html
<!-- Executive Summary Section (required for all reports) -->
<section class="executive-summary">
    <h2 class="summary-header">
        <i data-lucide="file-text" style="width:24px;height:24px;"></i>
        Executive Summary
    </h2>
    <div class="summary-content">
        <p class="summary-paragraph">
            Content with <a href="#ref-1" class="citation">1</a> inline citations.
        </p>
        <!-- 3-4 paragraphs minimum -->

        <!-- References Section -->
        <div class="references-section">
            <div class="references-title">References</div>
            <div class="reference-item" id="ref-1">
                <span class="reference-number">1</span>
                <div class="reference-content">
                    <a href="[VERIFIED-URL]" target="_blank" rel="noopener noreferrer" class="reference-link">
                        "Article Title"
                    </a>
                    <span class="reference-org">Publication Name, Date</span>
                </div>
            </div>
            <!-- Additional references -->
        </div>
    </div>
</section>
```

### Color Palette (MANDATORY)
| Use | Color | Hex |
|-----|-------|-----|
| Primary accent | Blue | `#3b82f6` |
| Secondary accent | Cyan | `#06b6d4` / `#00f0ff` |
| Success/Verified | Green | `#30a46c` / `#00FF88` |
| Warning/Alert | Amber | `#f76b15` |
| Threat/False | Red | `#FF2A2A` |
| **FORBIDDEN** | Purple | `#8b5cf6` - DO NOT USE |

### Navbar Structure
All report pages must include:
```html
<nav class="navbar">
    <a href="/" class="navbar-brand">
        <span class="logo-text">
            <span class="logo-genu">Genu</span><span class="logo-verity">Verity</span>
        </span>
        <span class="navbar-badge">[BADGE TEXT]</span>
    </a>
    <div class="navbar-right">
        <a href="reports.html" class="navbar-link active">
            <i data-lucide="file-text" style="width:16px;height:16px;"></i>
            Custom Reports
        </a>
        <a href="/" class="navbar-link">
            <i data-lucide="home" style="width:16px;height:16px;"></i>
            Home
        </a>
    </div>
</nav>
```

---

## 1. Disinformation Network Analysis Report

**Examples:** `doppelganger-analysis.html`, `network-analysis.html`

**Purpose:** Expose and visualize state-sponsored or coordinated disinformation campaigns

### Required Sections

#### Hero Section
```html
<header class="hero">
    <div class="hero-badge">
        <span class="pulse"></span>
        Active Threat Analysis
    </div>
    <h1>
        <span class="hero-gradient">[OPERATION NAME]</span><br>
        [SUBTITLE]
    </h1>
    <p class="hero-subtitle">
        [Description with inline links to primary source organizations]
    </p>

    <!-- Stats Ticker (4 key metrics) -->
    <div class="stats-ticker">
        <div class="stat-item">
            <div class="stat-value threat" data-target="[NUMBER]">0</div>
            <div class="stat-label">[METRIC LABEL]</div>
        </div>
        <!-- 3 more stat items -->
    </div>
</header>
```

#### Executive Summary (3-4 Paragraphs)
Content requirements:
1. **Paragraph 1:** What is the operation, when did it start, key actors, and scale
2. **Paragraph 2:** Attribution details, government connections, organizational structure
3. **Paragraph 3:** Specific enforcement actions, indictments, domain seizures
4. **Paragraph 4:** Ongoing threats, researcher tracking, effectiveness assessment

#### Network Visualization
```html
<section class="network-section">
    <div class="network-container">
        <svg id="network-canvas"></svg>
        <div class="network-legend">
            <div class="legend-title">Node Types</div>
            <!-- Legend items for each node type -->
        </div>
        <div class="info-panel" id="info-panel">
            <!-- Node detail panel -->
        </div>
    </div>
</section>
```

#### Data Cards Grid
```html
<section class="data-section">
    <div class="data-grid">
        <div class="data-card">
            <div class="data-card-header">
                <div class="data-card-icon">...</div>
                <div class="data-card-title">[TITLE]</div>
            </div>
            <ul class="data-list">
                <li class="data-list-item">...</li>
            </ul>
        </div>
    </div>
</section>
```

#### Timeline Section
```html
<section class="timeline-section">
    <h2 class="section-header">Operation Timeline</h2>
    <div class="timeline">
        <div class="timeline-item [alert]">
            <div class="timeline-dot"></div>
            <div class="timeline-date">[DATE]</div>
            <div class="timeline-content">
                <div class="timeline-title">[EVENT]</div>
                <div class="timeline-description">[DESCRIPTION]</div>
            </div>
        </div>
    </div>
</section>
```

#### Sources First Grid
```html
<section class="sources-section">
    <h2 class="section-header">Sources First</h2>
    <div class="sources-grid">
        <a href="[URL]" class="source-card" target="_blank">
            <div class="source-icon">...</div>
            <div class="source-info">
                <div class="source-name">[TITLE]</div>
                <div class="source-org">[ORGANIZATION]</div>
            </div>
            <span class="source-badge">Primary</span>
        </a>
    </div>
</section>
```

---

## 2. Fact Check Report

**Example:** `plaque-fact-check.html`

**Purpose:** Systematic verification of claims with verdict ratings

### Required Sections

#### Hero Section
```html
<header class="hero">
    <h1>Fact Check: <span class="hero-gradient">[SUBJECT]</span></h1>
    <p class="hero-subtitle">[Description]</p>
    <div class="hero-meta">
        <span><i data-lucide="calendar"></i> [DATE]</span>
        <span class="divider">|</span>
        <span><i data-lucide="clock"></i> [READ TIME]</span>
        <span class="divider">|</span>
        <span><i data-lucide="link"></i> [N]+ Sources Cited</span>
    </div>
</header>
```

#### Summary Grid (Verdict Counts)
```html
<section class="summary-grid">
    <div class="summary-card false">
        <div class="summary-number">[N]</div>
        <div class="summary-label">False Claims</div>
    </div>
    <div class="summary-card misleading">...</div>
    <div class="summary-card mixed">...</div>
    <div class="summary-card unverifiable">...</div>
</section>
```

#### Individual Fact Checks
```html
<article class="factcheck-item" id="fact-[N]">
    <div class="factcheck-claim">
        <div class="claim-number">[N]</div>
        <div class="claim-content">
            <div class="claim-label">Claim</div>
            <div class="claim-text">"[QUOTED CLAIM]"</div>
        </div>
    </div>
    <div class="factcheck-verdict">
        <span class="verdict-badge [verdict-class]">[VERDICT]</span>
        <span class="verdict-summary">[SHORT EXPLANATION]</span>
    </div>
    <div class="factcheck-analysis">
        <p class="analysis-text">[DETAILED ANALYSIS]</p>
        <div class="sources-list">
            <div class="sources-label">Sources</div>
            <a href="[URL]" class="source-link" target="_blank">
                <i data-lucide="external-link"></i>
                [SOURCE NAME]
            </a>
        </div>
    </div>
</article>
```

#### Verdict Badge Classes
| Verdict | Class | Color |
|---------|-------|-------|
| True | `.true` | Green |
| False | `.false` | Red |
| Misleading | `.misleading` | Pink |
| Mixed | `.mixed` | Amber |
| Exaggerated | `.exaggerated` | Orange |
| Opinion | `.opinion` | Gray |
| Unverifiable | `.unverifiable` | Gray |

---

## 3. Investigative Essay

**Purpose:** Long-form data-driven journalism with charts and deep analysis

### Required Sections

#### Executive Summary
Same structure as Network Analysis reports

#### Content Sections
```html
<section class="content-section">
    <h2 class="prose-h2">[SECTION TITLE]</h2>
    <p class="prose-text">[PARAGRAPH WITH CITATIONS]</p>

    <!-- Optional: Float Figure -->
    <div class="float-figure right">
        <div class="chart-container">
            <canvas id="chart-[id]"></canvas>
        </div>
        <div class="figure-caption">[CAPTION]</div>
    </div>
</section>
```

#### Living Numbers (Animated Counters)
```html
<span class="living-number" data-target="[NUMBER]" data-suffix="[%/M/B]">0</span>
```

#### Fractal Triggers (Expandable Context)
```html
<span class="fractal-trigger" data-term="[TERM_KEY]">[DISPLAY TEXT]</span>
```

---

## Source Verification Protocol

### Before Publishing ANY Link:

1. **Use WebFetch to verify accessibility**
   ```
   WebFetch: [URL]
   Prompt: Verify this page exists and extract key information
   ```

2. **Check for security blocks**
   - If WebFetch returns CSS/JS only or Akamai challenge = link may be blocked for bots but works for users
   - If 404/403 error = find alternative URL

3. **Preferred Source Types (in order)**
   1. Government agencies (.gov)
   2. Academic institutions (.edu)
   3. Major news organizations (NPR, Reuters, AP, BBC)
   4. Specialized research organizations (Graphika, DFRLab, Recorded Future)
   5. Wikipedia (for context/background only)

4. **Sources to Avoid**
   - Social media posts (unless primary evidence)
   - Opinion pieces (unless clearly labeled)
   - Sites with paywalls that block content
   - Domains that frequently change URLs

### Link Format Standards
```html
<a href="[URL]" target="_blank" rel="noopener noreferrer" class="[link-class]">
    [Link Text]
</a>
```

---

## CSS Classes Reference

### Executive Summary
| Class | Purpose |
|-------|---------|
| `.executive-summary` | Container for summary section |
| `.summary-header` | Section title with icon |
| `.summary-content` | Card containing paragraphs |
| `.summary-paragraph` | Individual paragraph |
| `.citation` | Superscript citation link |
| `.references-section` | Bottom references area |
| `.reference-item` | Single reference entry |
| `.reference-number` | Citation number badge |
| `.reference-link` | Clickable title link |
| `.reference-org` | Publication/organization name |

### Network Visualization
| Class | Purpose |
|-------|---------|
| `.network-section` | Visualization container |
| `.network-container` | SVG wrapper |
| `.network-legend` | Node type legend |
| `.legend-dot` | Colored indicator |
| `.info-panel` | Node detail popup |

### Fact Check
| Class | Purpose |
|-------|---------|
| `.factcheck-item` | Single fact check card |
| `.factcheck-claim` | Claim display area |
| `.factcheck-verdict` | Verdict badge row |
| `.factcheck-analysis` | Analysis paragraphs |
| `.verdict-badge` | Colored verdict label |
| `.sources-list` | Per-claim sources |
| `.source-link` | External link style |

### Timeline
| Class | Purpose |
|-------|---------|
| `.timeline-section` | Timeline container |
| `.timeline-item` | Single event |
| `.timeline-item.alert` | Highlighted event |
| `.timeline-dot` | Visual marker |
| `.timeline-date` | Date label |
| `.timeline-content` | Event description |

---

## Checklist Before Publishing

- [ ] Executive summary has 3-4 paragraphs minimum
- [ ] All claims have inline citations `<a href="#ref-N" class="citation">N</a>`
- [ ] References section includes all cited sources
- [ ] All URLs verified accessible via WebFetch
- [ ] No purple colors used (`#8b5cf6` or similar)
- [ ] Navbar includes "Custom Reports" link with `active` class
- [ ] Stats/metrics have data-target attributes for animation
- [ ] All external links have `target="_blank" rel="noopener noreferrer"`
- [ ] Mobile responsive styles included
- [ ] Lucide icons initialized in script section
