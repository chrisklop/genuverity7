# GenuVerity Automation Pipeline

Automated daily research pipeline using Gemini Deep Research + Claude Report Generation.

## Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Topics Queue   │───▶│  Gemini Deep     │───▶│ Report Launcher │
│  (JSON file)    │    │  Research        │    │ (Claude Code)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                       │                       │
    5:00 AM               5-15 min                  Manual/
    launchd              research                  Auto-trigger
```

## Quick Start

### 1. Install Dependencies

```bash
# Python packages
pip install playwright requests beautifulsoup4

# Playwright browsers
playwright install chromium
```

### 2. First-Time Setup

```bash
# Make sure Chrome for Claude is logged into Google/Gemini
open -a "Chrome for Claude"
# Navigate to gemini.google.com and log in

# Test the queue
cd ~/GenuVerity7/automation
python scripts/queue-manager.py list

# Test Gemini research (interactive)
python scripts/gemini-deep-research.py --topic "Test topic"
```

### 3. Install Daily Scheduler

```bash
./scripts/setup-scheduler.sh
```

## Scripts

### `gemini-deep-research.py`

Automates Gemini Deep Research using Playwright.

```bash
# Interactive mode
python scripts/gemini-deep-research.py

# Specific topic
python scripts/gemini-deep-research.py --topic "5G COVID conspiracy analysis"

# From queue
python scripts/gemini-deep-research.py --from-queue

# Background mode
python scripts/gemini-deep-research.py --from-queue --headless
```

### `queue-manager.py`

Manage the research topics queue.

```bash
# List all topics
python scripts/queue-manager.py list

# List only pending
python scripts/queue-manager.py list --pending

# Add new topic
python scripts/queue-manager.py add "Great Replacement Theory analysis" --priority high --category historical

# See next topic
python scripts/queue-manager.py next

# Mark topic status
python scripts/queue-manager.py mark topic-slug-feb-2026 completed

# Fetch trending from fact-check sites
python scripts/queue-manager.py fetch-trending

# Queue statistics
python scripts/queue-manager.py stats
```

### `daily-runner.py`

Orchestrates the daily pipeline (triggered by launchd at 5:00 AM).

```bash
# Dry run - see what would happen
python scripts/daily-runner.py --dry-run

# Run now (manual trigger)
python scripts/daily-runner.py --now
```

## File Structure

```
automation/
├── README.md                 # This file
├── topics-queue.json         # Research topics queue
├── phase1-submit-research.md # Research prompt docs
├── phase2-extract-generate.md # Extraction docs
├── input/                    # Input files for Report Launcher
├── output/                   # Generated content
├── logs/                     # Execution logs
├── scripts/
│   ├── gemini-deep-research.py   # Playwright automation
│   ├── queue-manager.py          # Queue management
│   ├── daily-runner.py           # Daily orchestrator
│   └── setup-scheduler.sh        # Install launchd job
└── launchd/
    └── com.genuverity.daily-research.plist
```

## Topics Queue

The queue (`topics-queue.json`) supports:

- **Categories**: `historical`, `trending`, `general`
- **Priorities**: `high`, `medium`, `low`
- **Statuses**: `pending`, `processing`, `completed`, `failed`

### Sample Topics

| Category   | Topic |
|------------|-------|
| Historical | Pizzagate origins |
| Historical | 5G COVID conspiracy |
| Historical | Election machine fraud |
| Historical | QAnon prophecies |
| Trending   | Current viral claims (auto-fetched) |

## Scheduler

The daily scheduler runs at **5:00 AM**:

```bash
# Check status
launchctl list | grep genuverity

# Uninstall
launchctl unload ~/Library/LaunchAgents/com.genuverity.daily-research.plist
rm ~/Library/LaunchAgents/com.genuverity.daily-research.plist
```

## Integration with Report Launcher

After Gemini research completes:

1. Extract JSON output from Gemini chat
2. Save to `automation/input/`
3. Use Report Launcher (`⌘⇧R`) or:
   - Claude Code: `cd ~/GenuVerity7 && claude --chrome`
   - Run: `/generate-report automation/input/filename.json`

## Troubleshooting

### "Not logged in" error
Open Chrome for Claude and log into Gemini manually first.

### Playwright not finding elements
Gemini's UI may have changed. Update selectors in `gemini-deep-research.py`.

### Scheduler not running
```bash
# Check if loaded
launchctl list | grep genuverity

# Check logs
cat ~/GenuVerity7/automation/logs/daily-runner-stdout.log
```

## Backup

Old scripts backed up in `.backup-YYYYMMDD/` folders.

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

*Last updated: February 2, 2026*
