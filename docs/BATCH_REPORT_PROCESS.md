# Batch Report Generation Process

> Process for generating multiple GenuVerity reports efficiently.

---

## Quick Start Command

When asked to generate multiple reports on hot topics, follow this process:

```
User Prompt: "Identify the top 25 hottest topics online that aren't covered
already on Genuverity's reports, and build a plan to run our process on
every topic and generate reports so that they are ready for deployment tomorrow."
```

---

## Phase 1: Topic Discovery & Deduplication

### Step 1.1: Get Current Report Inventory
```bash
# List existing report files
ls -la /Users/klop/GenuVerity7/*.html | grep -v index

# Or read the inventory file
cat /Users/klop/GenuVerity7/docs/REPORT_INVENTORY.md
```

### Step 1.2: Search for Hot Topics
Use WebSearch to identify trending topics:

**Search Queries** (run in parallel):
1. "trending news today December 2025"
2. "viral misinformation this week"
3. "fact check trending claims"
4. "breaking news controversies"
5. "social media viral stories today"

**Topic Sources**:
- Google Trends
- Twitter/X Trending
- Reddit r/all top posts
- Snopes recent fact-checks
- PolitiFact recent checks
- Reuters fact-check section

### Step 1.3: Deduplicate Against Existing
Compare discovered topics against:
- `REPORT_INVENTORY.md` - existing report list
- Similar themes/angles already covered

**Criteria for "new" topic**:
- Not the same event/claim as existing report
- Significantly different angle if related
- Current/timely (within last 30 days ideally)

---

## Phase 2: Topic Prioritization

### Scoring Matrix

| Factor | Weight | Scoring |
|--------|--------|---------|
| **Viral Velocity** | 30% | How fast is it spreading? |
| **Verification Need** | 25% | Does it contain verifiable claims? |
| **Public Interest** | 20% | How many people care? |
| **Data Availability** | 15% | Are primary sources accessible? |
| **Timeliness** | 10% | Will it still be relevant tomorrow? |

### Topic Categories

Ensure mix across categories:
- **Politics** - Government actions, elections, policies
- **Finance** - Markets, crypto, economic claims
- **Health** - Medical claims, public health
- **Technology** - AI, social media, cybersecurity
- **Environment** - Climate, energy claims
- **Social** - Viral stories, celebrity claims
- **International** - Geopolitics, foreign affairs

---

## Phase 3: Report Generation

### For Each Topic:

#### 3.1 Research Phase
```
1. WebSearch for primary sources (5-10 sources minimum)
2. WebFetch to verify each source URL works
3. Identify the specific claim(s) to fact-check
4. Find supporting and contradicting evidence
5. Check for existing fact-checks (Google Fact Check API)
```

#### 3.2 Template Selection

| Topic Type | Template | Reference File |
|------------|----------|----------------|
| Fact-Check (with live data) | Live Data Template | `fednow-freeze.html` |
| Fact-Check (standard) | Standard Template | `plaque-fact-check.html` |
| Policy Analysis | Policy Template | `marijuana-rescheduling.html` |
| Network/Disinfo Analysis | Network Template | `network-analysis.html` |
| Financial Analysis | Finance Template | `treasury-leverage.html` |

#### 3.3 Content Generation

**Use this structure** (from `docs/template.md`):

1. **Header**
   - Tag (category)
   - Title (question format for fact-checks)
   - Subtitle
   - Meta (date, read time, source count)
   - Verdict badge (for fact-checks)

2. **Collapsible Sources Banner**
   - All primary sources in expandable grid
   - Source icons (GOV, NEWS, DATA, ORG)
   - Trust scores

3. **Executive Summary**
   - For fact-checks: Claim vs Reality grid
   - For analysis: Key findings summary

4. **Content Sections** (with float figures)
   - Each section has h2 header
   - Charts float left/right within content
   - Insight cards for key points

5. **Verdict/Bottom Line**
   - Clear verdict with explanation
   - Supporting evidence summary

6. **Footer**
   - GenuVerity branding
   - Generation date

#### 3.4 Quality Checklist

Before marking report complete:
```
□ All external links verified via WebFetch
□ No Wikipedia links (use primary sources)
□ Color scheme is blue/cyan (no excessive green)
□ Sources banner is collapsible
□ Charts use midnight tech styling
□ Mobile responsive (float figures have breakpoints)
□ Footer has generation date
□ Navbar is consistent with other reports
```

---

## Phase 4: Batch Deployment

### 4.1 File Organization
```
/Users/klop/GenuVerity7/
├── [topic-slug].html          # New report file
├── reports.html               # Update carousel
└── docs/
    └── REPORT_INVENTORY.md    # Update inventory
```

### 4.2 Reports Page Update
Add new report to `reports.html` carousel:
```html
<div class="report-tile">
    <span class="tile-tag">CATEGORY</span>
    <h3>Report Title</h3>
    <p>Brief description...</p>
    <a href="report-slug.html" class="tile-link">Read Report →</a>
</div>
```

### 4.3 Deploy
```bash
vercel --prod
```

### 4.4 Verify
```python
# Use Playwright to verify all new reports load correctly
# Check for JS errors, missing data, broken layouts
```

---

## Parallel Execution Strategy

For 25 reports, organize into batches:

### Batch Structure
- **Batch 1** (Topics 1-5): Politics/Government
- **Batch 2** (Topics 6-10): Finance/Economy
- **Batch 3** (Topics 11-15): Health/Science
- **Batch 4** (Topics 16-20): Technology/Social
- **Batch 5** (Topics 21-25): International/Environment

### Per-Batch Workflow
1. Research all 5 topics in parallel (WebSearch)
2. Verify sources in parallel (WebFetch)
3. Generate reports sequentially (to maintain quality)
4. Test all 5 in parallel (Playwright)
5. Deploy batch

### Time Estimates
| Phase | Per Report | Batch of 5 | All 25 |
|-------|------------|------------|--------|
| Research | 10 min | 15 min (parallel) | 1 hr |
| Generation | 30 min | 2.5 hrs | 12.5 hrs |
| Testing | 5 min | 10 min (parallel) | 50 min |
| Deploy | 2 min | 2 min | 10 min |
| **Total** | ~47 min | ~3 hrs | ~15 hrs |

---

## Live Data Integration

### When to Add Live Data

Add live FRED charts when the topic involves:
- Federal Reserve policy
- Economic indicators (inflation, employment, GDP)
- Financial market claims
- Currency/monetary claims

### Available FRED Series
```
WALCL     - Fed Total Assets
CURRCIR   - Currency in Circulation
CPIAUCSL  - Consumer Price Index
UNRATE    - Unemployment Rate
FEDFUNDS  - Federal Funds Rate
GDP       - Gross Domestic Product
M2SL      - M2 Money Supply
T10Y2Y    - Treasury Yield Spread
```

### Live Data Template
Copy from `fednow-freeze.html`:
- Live data panel with electric border
- Pulsing dot plugin
- API fetch function
- Auto-refresh interval

---

## Error Handling

### Common Issues

| Issue | Solution |
|-------|----------|
| WebFetch 403/blocked | Use Playwright fallback |
| Source URL dead | Find archive.org snapshot or alternate source |
| No primary sources found | Topic may not be verifiable - skip or note limitations |
| Conflicting information | Present both sides with source attribution |
| Rate limited | Add delays, batch requests |

### Fallback Sources

If primary source unavailable:
1. Check archive.org/wayback
2. Find news coverage of the source
3. Use official statement/press release
4. Note limitation in report

---

## Output Checklist

Before declaring batch complete:

```
□ All 25 reports generated
□ All reports follow template.md patterns
□ All external links verified
□ reports.html updated with all new tiles
□ REPORT_INVENTORY.md updated
□ Deployed to production
□ Playwright verification passed
□ No console errors on any report
```

---

*Last updated: December 18, 2025*
