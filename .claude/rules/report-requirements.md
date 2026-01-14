# Report HTML Requirements

## File Pattern
Applies to: `*.html` files (except index.html, reports.html, methods.html, comparison.html)

## Mandatory Elements

### 1. Source Citations
- Minimum 8 verified sources per report
- All URLs must be verified via WebFetch before inclusion
- Inline citations using `<a href="..." target="_blank" rel="noopener">`
- **NO Wikipedia links** - use primary sources instead
  - When tempted to use Wikipedia, find the citation Wikipedia uses and link to that instead
  - For general background info, use britannica.com, official .gov sites, or academic sources

### 2. Color Compliance
- **ALLOWED**: #3b82f6 (blue), #06b6d4 (cyan), #10b981 (green), #f59e0b (amber), #ef4444 (red)
- **FORBIDDEN**: #8b5cf6, #a855f7, #9333ea, #7c3aed (purple shades) - NEVER use these colors

### 3. SEO / Canonical URL (CRITICAL FOR INDEXING)

**Every report MUST have a canonical tag** pointing to the clean URL:

```html
<link rel="canonical" href="https://www.genuverity.com/SLUG">
```

**URL format rules:**
- ✅ `https://www.genuverity.com/fednow-freeze` (clean URL)
- ❌ `https://www.genuverity.com/localreports/fednow-freeze.html` (file path)
- ❌ `https://www.genuverity.com/fednow-freeze.html` (with .html)

**Also required:**
- `<meta property="og:url" content="https://www.genuverity.com/SLUG">`
- `<meta property="twitter:url" content="https://www.genuverity.com/SLUG">`

**Why:** Without canonical tags, Google sees both `/slug` and `/localreports/slug.html` as duplicates and may not index either.

The `./validate-report.sh` script checks for this automatically.

### 4. Standard Categories (USE ONLY THESE)
| Category | Use For |
|----------|---------|
| Fact Check | Standard claim verification |
| AI & Deepfakes | Synthetic media, AI-generated content |
| Foreign Influence | State-sponsored disinfo, foreign operations |
| Conspiracy & Hoaxes | Debunked conspiracy theories |
| U.S. Politics & Policy | Domestic political claims |
| International | Non-US political/world events |
| Health & Science | Medical, scientific misinformation |
| Platform & Tech | Social media, tech company issues |
| Media & Journalism | Press accuracy, media manipulation |
| Economic & Financial | Financial misinformation |

**DO NOT create new categories** - use the closest existing one above.

### 5. Mandatory Verdict Assignment
Every report MUST have one of these verdicts:
| Verdict | When to Use |
|---------|-------------|
| `false` | Claim is demonstrably false |
| `true` | Claim is verified as accurate |
| `misleading` | Technically true but presented deceptively |
| `mixed` | Multiple claims, some true, some false |
| `context` | Claim lacks crucial context that changes meaning |

**NEVER use `undefined`** - always assign a verdict.

### 6. Specific Expert Citations (NO VAGUE AUTHORITY)

**NEVER use vague authority appeals:**

| FORBIDDEN | REQUIRED INSTEAD |
|-----------|------------------|
| "Experts say..." | "Dr. [Name] at [Institution] stated..." |
| "Studies show..." | "A [Year] [Institution] study found..." |
| "Researchers found..." | "Research by [Name] published in [Journal]..." |
| "Scientists agree..." | "[Organization] confirms..." |

Always name the specific expert, institution, or study and link to the source.

### 7. Counter-Argument Requirement

For `false` or `misleading` verdicts, **MUST include** a "Why This Claim Spread" section:
- Explain what makes the claim believable
- Address legitimate underlying concerns
- Avoid dismissive tone toward believers

### 8. Visualizations
- Include 1-2 Chart.js charts when applicable
- Use GenuVerity watermark plugin
- Follow Midnight Tech color scheme

### 9. Structure
- Hero section with verdict/title
- Executive summary
- Detailed analysis with inline citations
- "Why This Claim Spread" section (for false/misleading)
- Primary sources grid
- Feedback form

## Post-Creation Checklist

After creating ANY report HTML file:

1. **Add to js/reports-data.js**
   - Open `js/reports-data.js`
   - Find the `reports` array
   - Add new report object at ID 0 (top of array)
   - Use clean slug format: `slug: "your-slug-name"` (NOT `"localreports/your-slug.html"`)
   - Manually increment ALL existing IDs by +1
   - **NEVER use automation** (perl/sed/regex) - causes duplicate `id:` keys
   - Validate syntax: `node -c js/reports-data.js`

2. **Validate Report**
   - Run `./validate-report.sh localreports/your-report.html`
   - Fix any errors before proceeding

3. **Regenerate Sitemaps**
   - Run `node tools/generate-sitemaps.js`
   - This updates sitemap.xml, sitemap-news.xml, and vercel.json with clean URL rewrites

4. **Commit and Push**
   - `git add localreports/your-report.html js/reports-data.js sitemap.xml sitemap-news.xml vercel.json`
   - `git commit` with descriptive message
   - `git push origin main`
   - GitHub auto-deploys to Vercel (Reports Instance should NOT run `vercel --prod`)

5. **Confirm to User**
   - Provide live URL: `https://www.genuverity.com/your-slug-name`
   - Summarize sources used
   - List visualizations included

## Failure Modes to Prevent

| Mistake | Prevention |
|---------|------------|
| **Missing canonical tag** | ALWAYS include `<link rel="canonical">` with clean URL (no .html) |
| **Wrong canonical URL format** | Use `genuverity.com/slug` NOT `genuverity.com/localreports/slug.html` |
| Report not on landing page | ALWAYS update js/reports-data.js after creating report |
| ID syntax errors | NEVER use perl/sed - manually increment IDs |
| Dead links | ALWAYS WebFetch URLs before including |
| Wikipedia citations | Search for primary sources instead |
| Purple colors | Use only approved color palette |
| Missing inline citations | Every factual claim needs a link |
| **Undefined verdict** | ALWAYS assign verdict in both HTML and reports-data.js |
| **Vague authority** | NEVER write "experts say" - name specific sources |
| **Missing counter-argument** | FALSE/MISLEADING reports MUST explain why claim spread |

## Quality Audit Standards

Reports are periodically audited against these quality dimensions:

| Dimension | Weight | What's Checked |
|-----------|--------|----------------|
| Evidence Rigor | 40% | Source credibility, primary vs secondary, quote context |
| Logical Soundness | 25% | Reasoning transparency, fallacy avoidance |
| Fairness | 20% | Counter-argument handling, tone, charitable interpretation |
| Verdict Precision | 15% | Scope match, category accuracy, evidence alignment |

**Target:** All reports should score 80+ on quality audit.
