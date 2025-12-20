# Generate GenuVerity Report

You are generating a new GenuVerity fact-check/analysis report. Follow this EXACT workflow:

## Topic: $ARGUMENTS

---

## Phase 1: Research

1. Use WebSearch to find 10-15 sources on the topic
2. Prioritize: .gov sites, official organizations, primary news sources
3. NEVER use Wikipedia - find primary sources
4. Use WebFetch on each URL to verify it works
5. Note publication dates for time-sensitive data

## Phase 2: Read Templates

1. Read `docs/templates.md` for HTML structure
2. Read 1-2 existing reports for style reference

## Phase 3: Generate Report HTML

Create the report following these requirements:

### File
- Filename: `topic-slug-analysis.html`
- Location: Project root

### Content
- Hero section with verdict
- Executive summary
- Detailed analysis
- 1-2 Chart.js visualizations with GenuVerity watermark
- Primary sources grid
- Feedback form

### Citations
- EVERY factual claim gets `<a href="..." target="_blank" rel="noopener">`
- Only use URLs verified via WebFetch
- NO Wikipedia

### Colors
- Blue: #3b82f6
- Cyan: #06b6d4
- Green: #10b981
- Amber: #f59e0b
- Red: #FF2A2A
- **NEVER purple (#8b5cf6)**

## Phase 4: Add to Reports Page (CRITICAL)

1. Read `reports.html`
2. Find `const reports = [` array
3. Add new report at BEGINNING of array
4. Increment all existing IDs by 1

## Phase 5: Deploy

1. Run `vercel --prod`
2. Verify success

## Phase 6: Confirm

Report to user:
- Live URL
- Number of sources
- Visualizations included

---

**START NOW**: Begin researching "$ARGUMENTS"
