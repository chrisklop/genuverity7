# IDE-AGENT.md

**Master instructions for report generation in Antigravity IDE**
*Works with both Claude Code and Gemini 3*

---

## 🚨 DEEP DIVE PROTOCOL (MANDATORY FOR ALL REPORTS)

To ensure reports are comprehensive "Deep Dive Dossiers" and NOT summaries, follow the **Mega-Expansion Protocol**:

**1. The 1:3 Rule (Density)**
For every single metadata point or key finding in the research:
- **Heading 2 (`<h2>`)**: The main claim.
- **Introductory Paragraph**: Context and background.
- **Evidence Block**: Detailed breakdown of the evidence (not just a citation).
- **Counter-Argument**: Addressing potential critiques.
- **Conclusion/Verdict**: Final synthesis for that specific point.

**2. Target Length & "Mega-Expansion"**
- **Trigger**: If a report feels like a summary (~2000 words), initiate a **Mega-Expansion Pass**.
- **Target**: **5,000+ words** for Deep Dives.
- **Strategy**: 
  - Expand "Context" sections into full historical comparisons (e.g., comparing 2025 vs 2014 vs 2008).
  - Use "Living Numbers" tables to compare nominal vs real prices.
  - Dedicate full sections to "Geopolitics" or "supply chain mechanics" rather than single paragraphs.

**3. "Claude Persona" UI Standards (MANDATORY)**
- **Theme**: Deep Navy Opaque (`#050A14` !important) - NO transparency/blur mixing.
- **Navbar**: Command Center style with **500px wide search bar**.
- **Copy Buttons**: Must appear on ALL charts, tables, and sections.


---

## 🎨 CSS/UI DEBUGGING PROTOCOL (MANDATORY)

**For any CSS or layout issues, follow this protocol:**

### **Step 1: Browser Inspection FIRST**
- Use `browser_subagent` to inspect computed styles before attempting any fixes
- Never guess based on code review alone
- Get actual rendered values: width, height, position, z-index, etc.

### **Step 2: Identify ALL Constraints**
Check for:
- `max-width` / `min-width` (overrides `width` even with `!important`)
- Parent grid/flexbox constraints
- Inline styles (highest specificity)
- Multiple CSS files with duplicate selectors
- Media queries applying incorrectly

### **Step 3: Verify Fix**
- Use browser_subagent to confirm fix worked, OR
- Ask user to verify
- **NEVER** claim "fixed" without evidence

### **Communication:**
- ❌ "Fixed" or "This should work"
- ✅ "Applied change - please verify in browser"


---

## 🔄 MULTI-MODEL WORKFLOW (MANDATORY)

Reports are generated using a **3-phase pipeline** across different AI models. Each phase ends with a handoff prompt for the next model.

```
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 1: RESEARCH (Gemini Browser)                             │
│  → Deep research, 30+ sources, raw data gathering               │
│  → OUTPUT: Research markdown with sources list                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    [User pastes to IDE]
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 2: BUILD (Claude in Antigravity)                         │
│  → Structure sections, generate HTML, create charts             │
│  → OUTPUT: Complete report + HANDOFF PROMPT for Phase 3         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    [User pastes handoff prompt]
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 3: AUDIT & DEPLOY (Claude or Gemini in Antigravity)      │
│  → Run validations, update reports-data.js, visual verification │
│  → OUTPUT: Deployed report                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 PHASE 1: RESEARCH (Gemini Browser)

**Model:** Gemini (via browser at gemini.google.com)

**Task:** Deep research with primary source gathering

**Output to user:**
```markdown
# RESEARCH REPORT: [Topic]

## Key Findings
- Finding 1
- Finding 2

## Detailed Analysis
[Content with inline source numbers]

## Sources (COMPLETE LIST - 30+ required)
1. [Title] - [Publisher] - [URL]
2. ...
```

---

## 🔨 PHASE 2: BUILD (Claude in Antigravity)

**Model:** Claude (in Antigravity IDE)

**Steps:**
1. Receive research from user
2. Structure into 5-10 sections
3. Generate HTML from `docs/report-template-2025.html`
4. Create Chart.js visualizations
5. Output complete report file

### MANDATORY HANDOFF PROMPT (Copy-Paste This)

After generating the report, Claude MUST provide this handoff prompt:

```
---
## 🔄 PHASE 3 HANDOFF: Audit & Deploy

**Model:** Claude or Gemini (Antigravity IDE)

**Paste this prompt to continue:**

I've completed Phase 2 (Build) for the report: `localreports/[SLUG].html`

Please perform Phase 3 (Audit & Deploy):

1. **Validate Report:**
   ```bash
   ./validate-report.sh localreports/[SLUG].html
   ./validate-report.sh localreports/[SLUG].html
   ./validate-standards.sh localreports/[SLUG].html
   ```

2. **Generate Thumbnails:**
   ```bash
   npm run thumbnails
   # Verifies/Generates high-fidelity preview image
   ```

3. **Update reports-data.js:**
   - Add new entry with `id: 0`
   - Increment ALL existing IDs by +1
   - Include chart object for preview

4. **Visual Verification:**
   - Verify navbar renders
   - Verify footer renders
   - Verify chart preview on landing page

5. **Deploy:**
   - Commit: `localreports/[SLUG].html`, `js/reports-data.js`, and `images/thumbnails/[SLUG].webp`
   - Push to trigger auto-deploy

Report details:
- Title: [TITLE]
- Slug: localreports/[SLUG].html
- Sources: [N] sources
- Category: [CATEGORY]
---
```

---

## ✅ PHASE 3: AUDIT & DEPLOY

**Model:** Claude or Gemini (in Antigravity IDE)

**Steps:**
1. Run validation scripts
2. Run thumbnail generator (`npm run thumbnails`)
3. Update `js/reports-data.js` (CRITICAL - manual ID increment)
4. Visual verification in browser
5. Commit and push (including new thumbnail)

---

## 🔧 AUTO-FIX SYSTEM (New: Dec 2025)

Layout issues are now **automatically fixed** by JavaScript at runtime.

**What's Auto-Fixed:**
| Issue | Auto-Fix |
|-------|----------|
| Missing `content-grid` wrapper | ✅ Injected by `shared-components.js` |
| Wrong `article-main` class | ✅ Changed to `article-content` |
| Layout structure order | ✅ Wrapped correctly |

**What's Still Required in HTML:**
| Element | Required |
|---------|----------|
| `data-page-type="report"` on navbar-placeholder | ✅ Yes |
| `.sources-sidebar` on sidebar | ✅ Yes |
| `<article>` element for main content | ✅ Yes |
| Basic `.container` wrapper | ✅ Yes |

**Console Debugging:**
Check browser console for: `[GV Layout] ✅ Applied content-grid wrapper`

---

## PRE-FLIGHT CHECKLIST

```
[ ] Research received from browser Gemini
[ ] Sources list included (30+ for Deep Dives)
[ ] Golden template: docs/report-template-2025.html
[ ] NEVER write HTML from scratch - use template
[ ] NEVER copy from existing reports (may have bugs)
[ ] NEVER use Wikipedia as a source
[ ] Run find_related.py to get Related Reports section (STEP 5.5)
```

---

## ⚠️ MANDATORY VALIDATION (CRITICAL)

**BEFORE COMMITTING ANY REPORT:**

### 1. Template Compliance
- ✅ File MUST be created from `docs/report-template-2025.html`
- ❌ NEVER copy from existing reports (they may have legacy bugs)
- ✅ All `<head>` dependencies must match Golden Template exactly

### 2. Required Placeholders
- ✅ `<div id="navbar-placeholder" data-page-type="report"></div>` in `<body>`
- ✅ `<div id="footer-placeholder"></div>` BEFORE `</body>` tag
- ❌ Footer placeholder must NOT be inside `<script>` tags

### 3. Automated Validation (MANDATORY)
Run BOTH scripts before commit:
```bash
./validate-report.sh localreports/[filename].html
./validate-standards.sh localreports/[filename].html
```
Both MUST pass with ✅ ALL CHECKS PASSED

### 4. reports-data.js Entry
- ✅ New report at `id: 0` (top of array)
- ✅ ALL existing IDs manually incremented by +1 (NO automation/regex)
- ✅ `chart` object present and correctly formatted
- ✅ Verify syntax: `node -c js/reports-data.js`

### 5. Visual Verification
- ✅ Open: `http://localhost:8000/localreports/[filename].html`
- ✅ Navbar renders correctly
- ✅ Footer renders correctly
- ✅ Chart preview "peek" shows on landing page (`index.html`)

**If ANY validation fails, DO NOT commit. Fix issues first.**

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

4. **Layout Standards (MANDATORY):**
   - **Figures/Charts:** Always use `float: right` with margin `5px 0 20px 25px` (standardized in template).
   - **Info Boxes/Alerts:** Always add `style="clear: both;"` to prevent overlapping with floated figures.
   - **Nesting:** Automated. The system supports nested copy buttons (e.g., copying a section vs. copying a chart inside it).

5. **Copyable Sections (AUTOMATED):**
   
   The system automatically adds "Copy Image" functionality to all:
   - `<section>` tags
   - Charts (`.chart-wrapper`)
   - Info boxes (`.info-box`)
   - Tables (`.data-table-container`)
   - Figures (`.float-figure`)
   
   **No manual tagging is required.** The script `js/copyable-sections.js` handles detection and button injection.

6. Generate source cards for EVERY source:
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

## STEP 5.5: ADD RELATED REPORTS (RECOMMENDED)

**Feature Branch:** `feature/vector-search` (merge when ready)

Use the local vector search to find semantically related reports and add a "Related Deep Dives" section.

### How to Use:

```bash
# Activate venv
source scripts/.venv/bin/activate

# Option A: Search by research file
python scripts/find_related.py "/path/to/research.md"

# Option B: Search by query
python scripts/find_related.py --query "vaccine autism CDC"

# Get CSS (first time only)
python scripts/find_related.py --css
```

### Output:
- **Console:** Shows top 5 related reports with similarity %
- **HTML:** Ready-to-paste `<section class="related-reports">` block

### Where to Add:
Insert the generated HTML just before the closing `</article>` or `</main>` tag:

```html
<!-- End of main content sections -->

<section class="related-reports">
    <h2><i data-lucide="link"></i> Related Deep Dives</h2>
    <div class="related-grid">
        <!-- Generated cards here -->
    </div>
</section>

</article>
```

### CSS Styles:
The CSS for `.related-reports` should be added to `css/shared-components.css` once the feature branch is merged. Run `python scripts/find_related.py --css` to view the required styles.

### Reindex After Publishing:
After adding a new report, reindex to include it in future searches:
```bash
python scripts/index_reports.py
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
- `images/thumbnails/*.webp`

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

### "Output Limits (Massive Reports)"
- If a report is massive (e.g., 30+ sources, 10+ sections), you may hit output limits. 
- **Rule:** If you are about to reach your output limit, STOP before the code is truncated. Ask the user to say "continue" to provide the remaining HTML in the next response.

---

*Last updated: December 2025*
