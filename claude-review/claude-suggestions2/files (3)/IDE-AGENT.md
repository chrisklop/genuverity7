# IDE-AGENT.md

**Master instructions for report generation in Antigravity IDE**
*Works with both Claude Code and Gemini 3*

---

## WORKFLOW OVERVIEW

```
Browser Gemini (Deep Research)
        |
        | User pastes research + sources
        v
Antigravity IDE (Claude/Gemini)
        |
        ├── 1. Intake & validate sources
        ├── 2. Additional research if needed
        ├── 3. Structure into sections
        ├── 4. Create charts/visualizations
        ├── 5. Generate HTML from template
        ├── 6. Update reports-data.js (CRITICAL)
        └── 7. Validate & deploy
```

---

## PRE-FLIGHT CHECKLIST

```
[ ] Research received from browser Gemini
[ ] Sources list included and verified
[ ] Golden template location: docs/report-template-2025.html
[ ] NEVER write HTML from scratch - use template
[ ] NEVER use Wikipedia as a source
```

---

## STEP 1: INTAKE

When user pastes research:
1. Acknowledge receipt
2. Count sources provided
3. Identify any gaps needing additional research
4. Propose section structure based on content

---

## STEP 2: ADDITIONAL RESEARCH (If Needed)

If source gaps exist:
- Prioritize .gov, official statistics, primary documents
- Wire services (Reuters, AP) for current events
- Academic sources for technical claims
- **FORBIDDEN:** Wikipedia, social media, anonymous blogs

---

## STEP 3: SECTION STRUCTURE

Organize content into logical sections:
- Executive Summary (2-3 sentences, no citations)
- 5-10 content sections with clear titles
- Each section should have supporting citations

---

## STEP 4: CHARTS & VISUALIZATIONS

Create Chart.js visualizations where data supports it:

**Approved Colors:**
- Blue: #3b82f6
- Cyan: #06b6d4
- Green: #10b981
- Amber: #f59e0b
- Red: #ef4444
- **NO PURPLE (#8b5cf6) - EVER**

**Chart Types:** line, bar, doughnut, network

---

## STEP 5: GENERATE HTML

1. Copy template:
   ```bash
   cp docs/report-template-2025.html localreports/{{slug}}.html
   ```

2. Replace ALL `{{PLACEHOLDER}}` tokens:
   - `{{TITLE}}` - Report title
   - `{{SUBTITLE}}` - One-line description
   - `{{CATEGORY}}` - e.g., "DEEP DIVE DOSSIER"
   - `{{SUBCATEGORY}}` - e.g., "FORENSIC AUDIT"
   - `{{READ_TIME}}` - Estimated minutes
   - `{{SOURCE_COUNT}}` - Total source count
   - `{{EXECUTIVE_SUMMARY}}` - 2-3 sentence summary
   - `{{SOURCE_CARDS}}` - Generated source card HTML
   - `{{ARTICLE_SECTIONS}}` - Main content HTML
   - `{{CHART_JS_CONFIGS}}` - Chart initialization code

3. Generate source cards for EVERY source:
   ```html
   <a href="{{URL}}" target="_blank" class="source-card" id="source-{{N}}">
       <span class="source-ref">{{N}}</span>
       <div>
           <div>{{SOURCE_TITLE}}</div>
           <div style="font-size:0.7em; opacity:0.7;">{{DOMAIN}}</div>
       </div>
   </a>
   ```

4. Link citations in text:
   ```html
   <a href="#source-N" class="citation-link" onclick="highlightSource(event, 'source-N')">[N]</a>
   ```

---

## STEP 6: UPDATE reports-data.js (CRITICAL)

**Location:** `js/reports-data.js`

**This step is MANDATORY** - without it, the report card won't appear on the landing page.

### Process:
1. Open `js/reports-data.js`
2. Add new entry at TOP of `REPORTS_DATA` array with `id: 0`
3. Increment ALL existing entry IDs by +1

### Entry Format (EXACT SCHEMA):
```javascript
{
    id: 0,  // NEW REPORT ALWAYS GETS 0
    title: "Your Report Title Here",
    slug: "localreports/your-report-slug.html",  // FULL PATH required
    category: "Forensic Audit",                   // Display name
    tagClass: "tag-red",                          // tag-red | tag-cyan | tag-green | tag-amber
    catClass: "cat-military",                     // cat-military | cat-cyber | cat-disinfo | cat-finance
    icon: "plane",                                // Lucide icon name
    date: "Dec 24, 2025",                         // Format: "Mon DD, YYYY"
    sources: "35 Sources",                        // String with count
    readTime: "25 min",                           // Reading time
    excerpt: "Compelling one-paragraph summary for the card preview.",
    chart: {
        type: "network",                          // network | line | bar | donut
        color: "#3b82f6",
        data: { nodes: 8, connections: 14 }       // Varies by chart type
    }
}
```

### Chart Data Formats:
```javascript
// Network type
chart: { type: "network", color: "#3b82f6", data: { nodes: 8, connections: 14 } }

// Line type
chart: { type: "line", color: "#ef4444", data: [65, 81, 125, 172, 185, 200] }

// Bar type
chart: { 
    type: "bar", 
    color: "#3b82f6", 
    data: [
        { label: 'Item1', value: 100, color: '#3b82f6' },
        { label: 'Item2', value: 80, color: '#ef4444' }
    ]
}
```

### Available Options:

**Tag Classes:**
- `tag-red` - High alert / critical
- `tag-cyan` - Analysis / assessment  
- `tag-green` - Verified / confirmed
- `tag-amber` - Warning / caution

**Category Classes:**
- `cat-military` - Defense / military
- `cat-cyber` - Cybersecurity / tech
- `cat-disinfo` - Disinformation / media
- `cat-finance` - Financial / economic

**Icons (Lucide):**
plane, cpu, eye, radar, shield-alert, scale, file-text, database, activity, globe

---

## STEP 7: VALIDATE & DEPLOY

### Run Validation:
```bash
./validate-report.sh localreports/{{slug}}.html
```

### Validation Checks:
- [ ] Crimson Pro font included
- [ ] nav-header class present
- [ ] source-1 ID exists
- [ ] highlightSource() function calls present
- [ ] copyable-section classes on key elements
- [ ] html2canvas.min.js dependency
- [ ] copyable-sections.js dependency
- [ ] sources-sidebar class present
- [ ] No duplicate source IDs

### Manual Checks:
- [ ] Source count in sidebar matches actual sources
- [ ] All [N] citations link to correct source-N IDs
- [ ] No `{{PLACEHOLDER}}` tokens remain
- [ ] reports-data.js entry added and IDs incremented

---

## GIT BOUNDARIES (HARDCODED)

**ONLY commit/push:**
- `localreports/*`
- `js/reports-data.js`

**NEVER commit/push:**
- `api/*`
- `index.html`
- `reports.html`
- `js/*` (except reports-data.js)
- `server.py`
- `docs/*`

---

## DEPLOYMENT

- **NEVER** run `vercel --prod` or `vercel deploy`
- Push to git -> GitHub auto-deploys
- Only touch `localreports/` and `js/reports-data.js`

---

## SOURCE HIERARCHY

| Tier | Examples |
|------|----------|
| **Primary** | .gov, Federal Reserve, BLS, Census, court filings, SEC filings |
| **Secondary** | Reuters, AP, BBC, Brookings, universities |
| **Tertiary** | NYT, WSJ, established fact-checkers |
| **FORBIDDEN** | Wikipedia, social media, anonymous blogs |

---

## TROUBLESHOOTING

### "Card not appearing on landing page"
- Did you update `js/reports-data.js`?
- Is the new entry at `id: 0`?
- Did you increment all other IDs?

### "Template tokens visible in output"
- Check all `{{PLACEHOLDER}}` tokens were replaced
- Verify JSON/content was complete

### "Chart not rendering"
- Check Chart.js config syntax
- Verify data array format matches chart type

### "Validation fails on citations"
- Use format `id="source-N"` exactly
- Ensure highlightSource() calls match IDs

---

*Last updated: December 2025*
