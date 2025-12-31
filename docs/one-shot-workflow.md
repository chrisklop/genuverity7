# One-Shot Content Generation Workflow

**Purpose**: Generate interconnected Report + Experience content from a single research prompt, with automatic cross-linking and network graph integration.

---

## Quick Start

When user says:
> "Create a report and experience for [topic] using this research prompt"

Execute this workflow:

```
1. Parse research prompt for key entities
2. Generate Report (localreports/[slug].html)
3. Add report to reports-data.js
4. Add node to content-registry.js with tags + connections
5. Update timeline-data.js if experience node needed
6. Generate cross-links to existing related content
7. Commit all files together
```

---

## Input Format

User provides research prompt with this structure:

```markdown
## [Topic Title]

### Executive Summary
[2-3 paragraph overview]

### Key Facts
- [Bullet points]

### Timeline
- [Date]: [Event]

### Key Figures
- [Names and roles]

### Connections
- Related to: [other-topic-id-1], [other-topic-id-2]
- Tags: [tag1], [tag2], [tag3]

### Network Node
- Year: [year]
- Era: [era-id]
- Highlight: [true/false]
```

---

## Step-by-Step Process

### Step 1: Parse & Plan

Extract from prompt:
- **Slug**: Generate URL-safe slug from title
- **Tags**: Map to existing tags in content-registry.js
- **Connections**: Identify existing content to link to
- **Year/Era**: For network graph placement

### Step 2: Generate Report

```bash
cp docs/report-template-2025.html localreports/[slug].html
```

Fill in:
- Title, meta description, OG tags
- Hero section with verdict
- Article content from research
- Sources sidebar (8+ sources)
- **NEW**: Related Articles section (auto-generated)

Add to report HTML before closing `</article>`:
```html
<section class="related-content">
    <h3>Explore Related Content</h3>
    <div class="related-grid" id="relatedContent"></div>
</section>

<script>
    // Auto-populate related content from registry
    if (typeof getRelatedContent === 'function') {
        const related = getRelatedContent('[slug]', 4);
        const grid = document.getElementById('relatedContent');
        related.forEach(node => {
            grid.innerHTML += `
                <a href="${node.url}" class="related-card">
                    <span class="type-badge">${node.type}</span>
                    <h4>${node.title}</h4>
                    <span class="year">${node.year || ''}</span>
                </a>
            `;
        });
    }
</script>
```

### Step 3: Update reports-data.js

Add entry at ID 0, increment others:

```javascript
{
    id: 0,
    title: "[Title]",
    slug: "[slug]",
    verdict: "[VERDICT]",
    excerpt: "[One sentence summary]",
    date: "[YYYY-MM-DD]",
    tags: ["[tag1]", "[tag2]"],
    // NEW: Connection metadata
    registryId: "[slug]",  // Links to content-registry.js
    relatedIds: ["[related-slug-1]", "[related-slug-2]"]
},
```

### Step 4: Update content-registry.js

Add node entry:

```javascript
'[slug]': {
    id: '[slug]',
    type: 'report',
    title: '[Title]',
    tags: ['[tag1]', '[tag2]', '[tag3]'],
    url: '/localreports/[slug].html',
    connections: ['[related-id-1]', '[related-id-2]'],
    year: [year],
    era: '[era-id]'  // Optional
},
```

### Step 5: Update timeline-data.js (If Experience Node)

If the content should appear in the network graph, add event:

```javascript
{
    id: '[slug]',
    year: [year],
    title: '[Short Title]',
    summary: '[One paragraph]',
    details: '[Extended details]',
    impact: '[Why it matters]',
    connections: ['[related-event-id-1]', '[related-event-id-2]'],
    highlight: false  // true for major events
}
```

Add to appropriate era in `TIMELINE_DATA.eras`.

### Step 6: Update Existing Content (Bidirectional Links)

For each connection target, add reverse link:

```javascript
// In content-registry.js, update the connected node:
'[related-slug]': {
    // ... existing fields
    connections: [...existingConnections, '[new-slug]']
}
```

### Step 7: Validate & Commit

```bash
# Validate JavaScript syntax
node -c js/reports-data.js
node -c js/content-registry.js
node -c js/timeline-data.js

# Validate report HTML
./validate-report.sh localreports/[slug].html

# Commit all together
git add localreports/[slug].html js/reports-data.js js/content-registry.js js/timeline-data.js
git commit -m "Add [topic] report with network integration"
```

---

## Tag Reference

Use these tags for automatic cross-linking:

### Eras
| Tag | Use For |
|-----|---------|
| `era:yellow-press` | 1890s-1910s content |
| `era:wwi` | WWI propaganda (1914-1920) |
| `era:interwar` | 1920s-1930s |
| `era:wwii` | WWII propaganda |
| `era:cold-war` | 1947-1991 |
| `era:digital` | 1990s-2020 |
| `era:ai` | 2020+ AI-enabled disinfo |

### Actors
| Tag | Use For |
|-----|---------|
| `actor:russia` | Russian state operations |
| `actor:china` | Chinese state operations |
| `actor:iran` | Iranian operations |
| `actor:domestic` | US domestic actors |
| `actor:corporate` | Corporate disinformation |

### Platforms
| Tag | Use For |
|-----|---------|
| `platform:facebook` | Facebook/Meta content |
| `platform:twitter` | Twitter/X content |
| `platform:youtube` | YouTube content |
| `platform:tiktok` | TikTok content |
| `platform:telegram` | Telegram content |

### Topics
| Tag | Use For |
|-----|---------|
| `topic:election` | Election integrity |
| `topic:health` | Health misinformation |
| `topic:climate` | Climate denial |
| `topic:conspiracy` | Conspiracy theories |
| `topic:foreign-influence` | Foreign influence ops |

---

## Example: Full One-Shot

**User Input**:
> Create a report and experience node for the Internet Research Agency using this research:
> [Pastes IRA research prompt]

**Claude Executes**:

1. **Creates**: `localreports/russian-ira-operations.html`
2. **Updates** `reports-data.js`:
```javascript
{
    id: 0,
    title: "Russian Internet Research Agency: Inside the Troll Factory",
    slug: "russian-ira-operations",
    verdict: "VERIFIED",
    tags: ["Russia", "Election", "Social Media"],
    registryId: "russian-ira-operations"
}
```

3. **Updates** `content-registry.js`:
```javascript
'russian-ira-operations': {
    id: 'russian-ira-operations',
    type: 'report',
    title: 'Russian Internet Research Agency',
    tags: ['actor:russia', 'topic:election', 'topic:foreign-influence', 'platform:facebook', 'platform:twitter', 'era:digital'],
    url: '/localreports/russian-ira-operations.html',
    connections: ['gru-hack-leak-2016', 'facebook-2016-election', 'mueller-report'],
    year: 2013
}
```

4. **Updates** `timeline-data.js`:
```javascript
// In digital era events:
{
    id: 'russian-ira-operations',
    year: 2013,
    title: 'Internet Research Agency Founded',
    summary: 'Russian troll factory begins operations...',
    connections: ['gru-hack-leak-2016', 'facebook-2016-election'],
    highlight: true
}
```

5. **Updates existing connections** in related nodes to link back

6. **Commits all files together**

---

## Network Graph Auto-Population

The 3D network graph in `timeline.html` automatically pulls from both:
- `TIMELINE_DATA` (js/timeline-data.js) - Historical events
- `CONTENT_REGISTRY` (js/content-registry.js) - All content nodes

To merge them for visualization:

```javascript
function getMergedNetworkData() {
    // Get timeline events
    const timelineNodes = TIMELINE_DATA.eras.flatMap(era =>
        era.events.map(e => ({
            ...e,
            era: era.id,
            eraColor: era.color,
            type: 'experience-node'
        }))
    );

    // Get registry nodes (reports)
    const registryNodes = Object.values(CONTENT_REGISTRY.nodes)
        .filter(n => n.type === 'report')
        .map(n => ({
            id: n.id,
            title: n.title,
            year: n.year,
            connections: n.connections,
            type: 'report',
            url: n.url
        }));

    // Merge and dedupe by ID
    const allNodes = [...timelineNodes, ...registryNodes];
    const nodeMap = new Map();
    allNodes.forEach(n => {
        if (!nodeMap.has(n.id)) nodeMap.set(n.id, n);
    });

    return Array.from(nodeMap.values());
}
```

---

## CSS for Related Content Section

Add to report template:

```css
.related-content {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-subtle);
}

.related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.related-card {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    padding: 1rem;
    text-decoration: none;
    transition: all 0.2s;
}

.related-card:hover {
    border-color: var(--accent-blue);
    transform: translateY(-2px);
}

.related-card .type-badge {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
}

.related-card h4 {
    color: var(--text-primary);
    margin: 0.5rem 0;
}

.related-card .year {
    color: var(--accent-cyan);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
}
```

---

## Validation Checklist

Before committing interconnected content:

```
□ Report HTML validates (./validate-report.sh)
□ reports-data.js syntax valid (node -c)
□ content-registry.js syntax valid (node -c)
□ timeline-data.js syntax valid (node -c)
□ All connection IDs exist in registry
□ Bidirectional links added (A→B and B→A)
□ Tags match existing tag IDs
□ Year is a number without commas
□ URL paths are correct (/localreports/... or /timeline.html#...)
```

---

*Workflow Version: 1.0*
*Last Updated: December 2024*
