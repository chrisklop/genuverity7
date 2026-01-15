# GenuVerity Daily Automation

Automated daily fact-check report generation using Gemini Deep Research and Claude Cowork.

## Overview

This automation runs in two phases:

| Phase | Time | Description |
|-------|------|-------------|
| **Phase 1** | 5:00 AM | Submit research prompt to Gemini Deep Research |
| **Phase 2** | 6:00 AM | Extract results, generate HTML reports, commit to branch |

## Setup

```bash
# Install the daily schedule
./scripts/setup.sh

# This will:
# - Install launchd agents for 5 AM and 6 AM triggers
# - Create log directories
# - Make scripts executable
```

## How It Works

### Phase 1: Submit Research (5:00 AM)

1. Opens Gemini in Chrome (using your logged-in session)
2. Clicks "Tools" → "Deep Research"
3. Submits the forensic intelligence prompt
4. Confirms the research plan
5. Saves the chat URL for Phase 2

**Prompt location**: `GEMINI_DEEP_RESEARCH_PROMPT.md`

### Phase 2: Extract & Generate (6:00 AM)

1. Returns to the Gemini chat from Phase 1
2. Extracts the JSON output from Gemini's response
3. Validates the JSON against `INPUT_SCHEMA.md`
4. Runs `/batch-report` to generate HTML files
5. Commits to a daily feature branch
6. Sends notification for manual review

## Directory Structure

```
automation/
├── README.md                    # This file
├── phase1-submit-research.md    # Phase 1 instructions
├── phase2-extract-generate.md   # Phase 2 instructions
├── launchd/
│   ├── com.genuverity.phase1.plist
│   └── com.genuverity.phase2.plist
├── scripts/
│   ├── setup.sh                 # Install automation
│   ├── uninstall.sh             # Remove automation
│   ├── trigger-phase1.sh        # Manual Phase 1 trigger
│   └── trigger-phase2.sh        # Manual Phase 2 trigger
├── output/
│   └── gemini-output-YYYY-MM-DD.json
└── logs/
    └── YYYY-MM-DD-phase[1|2].log
```

## Manual Testing

```bash
# Test Phase 1 (submit to Gemini)
./scripts/trigger-phase1.sh

# Test Phase 2 (extract and generate)
./scripts/trigger-phase2.sh
```

## Uninstall

```bash
./scripts/uninstall.sh
```

## Requirements

- **Chrome**: Logged into Google account with Gemini Pro
- **Claude Desktop** or **Claude Cowork**: For browser automation
- **Claude in Chrome extension**: For controlling Chrome

## Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        DAILY AUTOMATION PIPELINE                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  5:00 AM                              6:00 AM                            │
│  ────────                             ────────                           │
│  launchd triggers Phase 1             launchd triggers Phase 2           │
│           │                                    │                         │
│           ▼                                    ▼                         │
│  Claude Cowork opens Gemini           Claude Cowork returns to chat      │
│           │                                    │                         │
│           ▼                                    ▼                         │
│  Submits Deep Research prompt         Extracts JSON output               │
│           │                                    │                         │
│           ▼                                    ▼                         │
│  Confirms research plan               Validates against schema           │
│           │                                    │                         │
│           ▼                                    ▼                         │
│  Saves chat URL                       Runs /batch-report                 │
│           │                                    │                         │
│           ▼                                    ▼                         │
│  [Gemini researches ~45 min]          Generates HTML reports             │
│                                                │                         │
│                                                ▼                         │
│                                       Commits to feature branch          │
│                                                │                         │
│                                                ▼                         │
│                                       Notifies user for review           │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Troubleshooting

### Phase 1 fails
- Check if Chrome is running with your Google account logged in
- Verify Claude in Chrome extension is connected
- Check logs: `automation/logs/YYYY-MM-DD-phase1.log`

### Phase 2 fails to find JSON
- Gemini may still be researching (wait and retry)
- Check if the chat URL was saved correctly
- Manually extract JSON from Gemini if needed

### Reports fail validation
- Check `./validate-report.sh` output
- Review the generated HTML for issues
- Check logs: `automation/logs/YYYY-MM-DD-phase2.log`

## Related Files

- `.claude/skills/batch-report-generator/INPUT_SCHEMA.md` - JSON schema
- `.claude/skills/batch-report-generator/GEMINI_DEEP_RESEARCH_PROMPT.md` - Full prompt
- `docs/report-template-2025.html` - HTML template

---

## Lessons Learned (January 15, 2026)

**Critical guidelines from first successful pipeline run:**

### 1. Gemini Output: JSON is NOT Guaranteed

Gemini Deep Research often outputs essay format only, even when the prompt requests JSON. **Always be prepared to:**
- Extract the full markdown/text response first
- Generate JSON structure manually from the essay content
- Use the forensics data embedded in the prose

### 2. Charts: Every Report MUST Have One

Charts serve double duty:
- **In-report visualization** (Chart.js in the HTML)
- **Portal card thumbnails** (reports-data.js config)

**If Gemini doesn't provide chart data:**
- Auto-generate velocity charts from `forensics.velocity_12h`
- Create estimated hourly spread: `[start, 10%, 25%, 45%, 70%, 88%, 100%]` of velocity_12h
- Use bar charts for comparison tables (old vs new, claim vs reality)

### 3. Output File Organization

Save ALL artifacts with date stamps:
```
automation/output/
├── gemini-chat-url-YYYY-MM-DD.txt     # For returning to chat
├── gemini-deep-research-YYYY-MM-DD.md  # Raw extracted text
└── gemini-output-YYYY-MM-DD.json       # Structured JSON
```

### 4. Browser Automation Reliability

The Claude in Chrome extension may disconnect. Fallback options:
- Use `osascript` to execute JavaScript directly in Chrome
- Extract page text via: `osascript -e 'tell app "Chrome" to execute front window's active tab javascript "document.body.innerText"'`
- Save chat URL immediately after Phase 1 for easy return

### 5. Pre-Generation Checklist

Before running the generator, verify:
- [ ] JSON has all expected reports (typically 5)
- [ ] Each report has minimum 8 sources (ideally 10-15)
- [ ] Each report has chart data OR forensics data for auto-generation
- [ ] Verdicts are valid: FALSE, TRUE, MISLEADING, MIXED, CONTEXT
- [ ] Categories match the allowed list
- [ ] No Wikipedia URLs in sources

### 6. reports-data.js Chart Format

Portal cards need this exact format:
```javascript
chart: {
    "type": "line",           // line, bar, donut, hbar
    "color": "#0a0a0f",       // background
    "data": [100, 500, ...],  // values
    "labels": ["0h", "2h"],   // optional for line/bar
    "colors": ["#ef4444"]     // bar colors
}
```

### 7. Post-Generation Steps

After HTML generation, always:
1. Run `./validate-report.sh` on each new report
2. Run `node tools/generate-sitemaps.js` to update SEO
3. Run `node tools/sync-chart-configs.js` to sync carousel thumbnails ← **CRITICAL**
4. Verify vercel.json has clean URL rewrites
5. Open reports in browser to visually verify charts render

### 8. Chart Thumbnail Sync (MANDATORY)

The carousel card thumbnails on the homepage are generated from `js/reports-data.js`. After creating reports with Chart.js charts in HTML, you MUST sync the configs:

```bash
node tools/sync-chart-configs.js
```

This extracts chart data from each HTML report and updates `reports-data.js` so thumbnails match actual charts. **Without this step, carousel cards show wrong/blank previews.**

---

*Last updated: January 15, 2026*
