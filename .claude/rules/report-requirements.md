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

1. **Add to reports.html**
   - Open reports.html
   - Find `const reports = [` array
   - Add new report object at the BEGINNING
   - Increment all existing report IDs by 1

2. **Deploy**
   - Run `vercel --prod`
   - Verify deployment success

3. **Confirm to User**
   - Provide live URL
   - Summarize sources used
   - List visualizations included

## Failure Modes to Prevent

| Mistake | Prevention |
|---------|------------|
| Report not on carousel | ALWAYS edit reports.html after creating report |
| Dead links | ALWAYS WebFetch URLs before including |
| Wikipedia citations | Search for primary sources instead |
| Purple colors | Use only approved color palette |
| Missing inline citations | Every factual claim needs a link |
