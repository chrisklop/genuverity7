# GenuVerity Report Generator Skill

## Trigger
Use this skill when the user says any of:
- "Generate a report"
- "Create a report"
- "Write a report on..."
- "Fact-check..."
- "Analyze..." (in context of creating a report)

## Complete Workflow (ALL STEPS MANDATORY)

### Phase 1: Research (DO NOT SKIP)
1. **Web Search**: Use WebSearch to find 8-15 sources on the topic
2. **Source Verification**: Use WebFetch on EACH source URL to verify it works
3. **Primary Sources**: Prioritize .gov, official organization sites, primary news
4. **NO WIKIPEDIA**: Never use Wikipedia - find primary sources instead
5. **Date Context**: Note publication dates for all sources

### Phase 2: Content Generation
1. **Read Template**: Read `docs/templates.md` for HTML structure
2. **Read Examples**: Read 1-2 existing reports from similar category
3. **Generate HTML**: Create report following template exactly
4. **Inline Citations**: EVERY factual claim must have `<a href="..." target="_blank" rel="noopener">`
5. **Chart.js**: Include 1-2 visualizations with GenuVerity watermark plugin
6. **Color Compliance**: NO purple (#8b5cf6) - use blue (#3b82f6), cyan (#06b6d4)

### Phase 3: File Creation
1. **Filename**: Use kebab-case slug: `topic-name-analysis.html`
2. **Location**: Save to `/Users/klop/GenuVerity7/[slug].html`
3. **Verify Write**: Confirm file was written successfully

### Phase 4: Reports Page Update (CRITICAL - DO NOT FORGET)
1. **Read reports.html**: Read the current reports.html file
2. **Find reports array**: Locate `const reports = [` in the JavaScript
3. **Add new entry**: Add report object at BEGINNING of array:
```javascript
{
    id: [next_id],
    title: "Report Title",
    slug: "filename.html",
    category: "Category Name",
    tagClass: "tag-[color]",  // tag-green, tag-amber, tag-red, tag-blue
    catClass: "cat-[type]",   // cat-financial, cat-health, cat-legal, cat-policy
    icon: "[icon-name]",      // shield, scale, chart-line, etc.
    date: "[Month Day, Year]",
    sources: "[N] Sources",
    readTime: "[N] min",
    excerpt: "One-sentence summary of the report."
}
```
4. **Update IDs**: Increment all existing report IDs by 1

### Phase 5: Deployment
1. **Deploy**: Run `vercel --prod`
2. **Verify**: Confirm deployment succeeded
3. **Test URL**: Provide the live URL to user

### Phase 6: Confirmation
Report to user:
- Report title and filename
- Number of sources included
- Visualizations included
- Live URL on genuverity7.vercel.app

## Checklist Before Completion

```
[ ] Research complete with 8+ verified sources
[ ] HTML file created with inline citations
[ ] NO Wikipedia links used
[ ] NO purple colors used
[ ] Chart.js visualizations have watermark
[ ] Report added to reports.html carousel
[ ] Deployed via vercel --prod
[ ] User provided with live URL
```

## Quality Standards

### Source Requirements
- Minimum 8 sources for any report
- All URLs verified via WebFetch before inclusion
- Primary sources preferred (.gov, official sites)
- Date context for time-sensitive data

### Citation Requirements
- Every factual claim needs inline citation
- Format: `<a href="URL" target="_blank" rel="noopener">linked text</a>`
- Citations should be contextual, not just "[1]" style

### Visual Requirements
- 1-2 Chart.js visualizations minimum
- GenuVerity watermark plugin included
- Midnight Tech color scheme (no purple)
- Responsive design

## Common Mistakes to Avoid

1. **Forgetting reports.html**: ALWAYS add to carousel
2. **Unverified URLs**: ALWAYS WebFetch before including
3. **Wikipedia**: NEVER use - find primary source
4. **Purple colors**: NEVER use #8b5cf6 or similar
5. **Missing citations**: EVERY claim needs a link
6. **Forgetting deploy**: ALWAYS run vercel --prod
