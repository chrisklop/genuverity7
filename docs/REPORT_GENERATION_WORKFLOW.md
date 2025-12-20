# Report Generation Workflow

> How to request reports from Claude using the automated pipeline.

---

## Overview

Reports are now generated through a **structured pipeline** that separates content from presentation:

```
User Request → AI generates JSON → Renderer adds branding → Validator checks → Deploy
```

**The AI NEVER touches branding, layout, or CSS.** All of that is handled by the renderer.

---

## For Users: How to Request Reports

### Option 1: Simple Request (Recommended)

Just tell Claude what you want:

```
Generate a report on: [TOPIC]
```

Claude will:
1. Research the topic using web search
2. Generate structured JSON data
3. Run the renderer to produce branded HTML
4. Run the validator to check requirements
5. Save the file and update reports.html

### Option 2: With Specific Requirements

```
Generate a fact-check report on: [CLAIM]

Requirements:
- Category: fact_check
- Focus on: [specific aspects]
- Must include sources from: [domains]
```

---

## What Claude Does Internally

When you request a report, Claude follows this exact process:

### Step 1: Research

```python
# Claude uses web search to gather information
# Finds 5-10 primary sources (NO Wikipedia)
# Verifies URLs are accessible
```

### Step 2: Generate JSON

Claude generates a `ReportData` object:

```python
from lib import ReportData, Source, Section, ExecutiveSummary

data = ReportData(
    slug="topic-name",
    title="Report Title",
    category="fact_check",
    tag_label="Category Tag",
    tag_color="blue",
    publish_date=date.today(),
    verdict="MIXED",  # Optional for fact-checks
    verdict_summary="Explanation...",
    confidence=0.85,
    executive_summary=ExecutiveSummary(
        claim="What's being claimed",
        reality="What evidence shows",
        key_points=["Point 1", "Point 2", "Point 3"]
    ),
    sections=[
        Section(heading="Background", content="..."),
        Section(heading="Analysis", content="...", chart=ChartData(...)),
    ],
    sources=[
        Source(name="CDC", url="https://cdc.gov/...", trust_score=95, domain="cdc.gov", accessed_date=date.today()),
    ],
    bottom_line="Final takeaway..."
)
```

### Step 3: Render HTML

```python
from lib import render_to_file

render_to_file(data, f"{data.slug}.html")
```

The renderer automatically adds:
- GenuVerity navbar with branding
- Collapsible sources banner
- Executive summary layout
- Chart.js with watermark plugin
- Footer with branding
- Feedback form
- Mobile notice
- All CSS styling

### Step 4: Validate

```python
from lib import validate_report, validation_summary, is_deployable

errors = validate_report(data)
print(validation_summary(errors))

if not is_deployable(errors):
    # Fix errors before proceeding
    raise Exception("Validation failed")
```

Validator checks:
- [ ] Minimum 3 sources
- [ ] No Wikipedia links
- [ ] No purple colors
- [ ] All URLs accessible
- [ ] Trust scores appropriate for domains
- [ ] Required content present

### Step 5: Update Index Files

```python
# Update reports.html with new tile
# Update REPORT_INVENTORY.md
# Deploy to production
```

---

## File Locations

| File | Purpose |
|------|---------|
| `lib/report_schema.py` | JSON structure definition |
| `lib/report_renderer.py` | JSON → branded HTML |
| `lib/report_validator.py` | Pre-deployment checks |
| `lib/__init__.py` | Module exports |

---

## Schema Reference

### ReportData Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | str | Yes | URL-safe filename |
| `title` | str | Yes | Full title |
| `subtitle` | str | No | Optional subtitle |
| `category` | enum | Yes | Report category |
| `tag_label` | str | Yes | Display tag text |
| `tag_color` | enum | Yes | Tag color theme |
| `publish_date` | date | Yes | Publication date |
| `verdict` | enum | No | For fact-checks |
| `verdict_summary` | str | No | Verdict explanation |
| `confidence` | float | No | 0-1 confidence |
| `executive_summary` | obj | Yes | Claim vs reality |
| `sections` | list | Yes | Content sections |
| `sources` | list | Yes | Verified sources |
| `bottom_line` | str | Yes | Final takeaway |

### Source Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | str | Display name (e.g., "CDC") |
| `url` | HttpUrl | Direct link (no Wikipedia) |
| `trust_score` | int | 0-100 score |
| `domain` | str | Domain (e.g., "cdc.gov") |
| `accessed_date` | date | When verified |
| `quote` | str | Optional key quote |

### Trust Score Guidelines

| Domain Type | Score Range |
|-------------|-------------|
| .gov, .edu | 95-100 |
| Reuters, AP, BBC | 95-98 |
| Major newspapers (NYT, WSJ) | 88-92 |
| Major news (CNN, NBC) | 85-90 |
| Tech press (Wired, Ars) | 80-85 |
| Other credible | 70-80 |

---

## Validation Errors

### Fatal Errors (blocks deployment)

- `sources`: Wikipedia link detected
- `sources`: Less than 3 sources
- `content`: Less than 2 sections
- `style`: Purple color detected
- `links`: URL not accessible

### Warnings (can deploy but should fix)

- `sources`: Trust score seems too high
- `content`: Bottom line too short
- `metadata`: Title too long
- `verdict`: Missing confidence score

---

## Example Request

```
User: Generate a fact-check report on:
"The CDC reversed its position on vaccines and autism"

Claude will:
1. Search for CDC vaccine-autism statements
2. Find primary sources (CDC.gov, medical journals)
3. Generate ReportData JSON
4. Render to cdc-vaccine-autism.html
5. Validate (no Wikipedia, URLs work, etc.)
6. Add to reports.html
7. Update REPORT_INVENTORY.md
8. Deploy to production
```

---

## Troubleshooting

### "Wikipedia link detected"
Find the original source that Wikipedia cites. Use that instead.

### "URL not accessible"
Some sites block automated requests. Manually verify the URL works in a browser, then use `check_urls=False` in validation.

### "Trust score too high"
Reserve 95+ scores for .gov, .edu, and major wire services (Reuters, AP). Other sources should be 85 or below.

### "Purple color detected"
Check any custom colors in chart datasets or section content. Purple (#8b5cf6 and similar) is forbidden.

---

*Last updated: December 19, 2025*
