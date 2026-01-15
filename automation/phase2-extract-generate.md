# Phase 2: Extract Research & Generate Reports

## Trigger
- **Time**: 6:00 AM daily (1 hour after Phase 1)
- **Method**: launchd plist triggers Claude Cowork

## Task Instructions for Claude Cowork

When this task runs, execute the following steps:

### Step 1: Return to Gemini Research
1. Read the chat URL from `/Users/klop/projects/genuverity7/automation/current-research-url.txt`
2. Navigate to that URL in Chrome
3. Verify the Deep Research has completed (look for the full response)

### Step 2: Extract the JSON Output
1. Scroll through Gemini's response to find the JSON code block
2. Copy the entire JSON starting from `{` and ending with `}`
3. Save the raw JSON to `/Users/klop/projects/genuverity7/automation/output/gemini-output-YYYY-MM-DD.json`

### Step 3: Validate the JSON
1. Parse the JSON to ensure it's valid
2. Check that it contains the required fields:
   - `reports` array with at least 1 report
   - Each report has: slug, title, verdict, claim, sources, sections
   - Each source has: url, title, quote
3. If validation fails, log the error and notify user

### Step 4: Generate Reports
1. Navigate to the GenuVerity7 project directory
2. For each report in the JSON:
   a. Run the `/batch-report` skill with the report data
   b. This will:
      - Create HTML file in `localreports/{slug}.html`
      - Add entry to `js/reports-data.js`
      - Run chart sync: `node tools/sync-chart-configs.js`
3. After all reports are generated:
   - Run `node tools/generate-sitemaps.js`

### Step 5: Validate Generated Reports
For each generated report:
1. Run `./validate-report.sh localreports/{slug}.html`
2. Check for any validation errors
3. Log results

### Step 6: Commit to Feature Branch
```bash
cd /Users/klop/projects/genuverity7
git checkout -b daily-reports/YYYY-MM-DD
git add localreports/*.html js/reports-data.js sitemap.xml sitemap-news.xml vercel.json
git commit -m "Add daily reports: YYYY-MM-DD

Generated reports:
- report-slug-1
- report-slug-2
- report-slug-3
- report-slug-4
- report-slug-5

Co-Authored-By: Claude <noreply@anthropic.com>"
git push origin daily-reports/YYYY-MM-DD
```

### Step 7: Notify User
Send notification with:
- Number of reports generated
- Report titles
- Feature branch name
- Preview URL (if available)
- Any validation warnings

---

## Error Handling

### If Gemini Research Not Complete
1. Wait 5 minutes, check again
2. If still not complete after 3 retries, notify user with partial status
3. Save what's available and exit

### If JSON Validation Fails
1. Log the specific validation error
2. Attempt to extract any valid reports from the JSON
3. Notify user of the issue with details

### If Report Generation Fails
1. Log the error for that specific report
2. Continue with remaining reports
3. Include failed reports in notification

---

## Output Files

| File | Purpose |
|------|---------|
| `automation/output/gemini-output-YYYY-MM-DD.json` | Raw Gemini output |
| `automation/output/processed-YYYY-MM-DD.json` | Validated/cleaned JSON |
| `automation/logs/YYYY-MM-DD.log` | Execution log |
| `localreports/*.html` | Generated report files |

---

## Expected Outcome
- 5 new fact-check reports generated
- All reports validated
- Changes committed to feature branch
- User notified for manual review before merge to main
