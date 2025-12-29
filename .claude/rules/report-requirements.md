# Report HTML Requirements

## File Pattern
Applies to: `*.html` files (except index.html, reports.html, methods.html, comparison.html)

## Mandatory Elements

### 1. Source Citations
- Minimum 8 verified sources per report
- All URLs must be verified via WebFetch before inclusion
- Inline citations using `<a href="..." target="_blank" rel="noopener">`
- NO Wikipedia links - use primary sources

### 2. Color Compliance
- **ALLOWED**: #3b82f6 (blue), #06b6d4 (cyan), #10b981 (green), #f59e0b (amber), #FF2A2A (red)
- **FORBIDDEN**: #8b5cf6 (purple) - NEVER use this color

### 3. Visualizations
- Include 1-2 Chart.js charts when applicable
- Use GenuVerity watermark plugin
- Follow Midnight Tech color scheme

### 4. Structure
- Hero section with verdict/title
- Executive summary
- Detailed analysis with inline citations
- Primary sources grid
- Feedback form

## Post-Creation Checklist

After creating ANY report HTML file:

1. **Add to js/reports-data.js**
   - Open `js/reports-data.js`
   - Find the `reports` array
   - Add new report object at ID 0 (top of array)
   - Manually increment ALL existing IDs by +1
   - **NEVER use automation** (perl/sed/regex) - causes duplicate `id:` keys
   - Validate syntax: `node -c js/reports-data.js`

2. **Validate Report**
   - Run `./validate-report.sh localreports/your-report.html`
   - Fix any errors before proceeding

3. **Commit and Push**
   - `git add localreports/your-report.html js/reports-data.js`
   - `git commit` with descriptive message
   - `git push origin main`
   - GitHub auto-deploys to Vercel (Reports Instance should NOT run `vercel --prod`)

4. **Confirm to User**
   - Provide live URL
   - Summarize sources used
   - List visualizations included

## Failure Modes to Prevent

| Mistake | Prevention |
|---------|------------|
| Report not on landing page | ALWAYS update js/reports-data.js after creating report |
| ID syntax errors | NEVER use perl/sed - manually increment IDs |
| Dead links | ALWAYS WebFetch URLs before including |
| Wikipedia citations | Search for primary sources instead |
| Purple colors | Use only approved color palette |
| Missing inline citations | Every factual claim needs a link |
