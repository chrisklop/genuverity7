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
