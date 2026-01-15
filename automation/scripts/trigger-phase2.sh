#!/bin/bash
# GenuVerity Phase 2: Extract research and generate reports
# Triggered daily at 6:00 AM by launchd (1 hour after Phase 1)

set -e

LOG_DIR="/Users/klop/projects/genuverity7/automation/logs"
DATE=$(date +%Y-%m-%d)
LOG_FILE="$LOG_DIR/$DATE-phase2.log"

echo "========================================" >> "$LOG_FILE"
echo "Phase 2 Started: $(date)" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"

# Send notification to alert user
osascript -e 'display notification "GenuVerity Phase 2: Time to extract research and generate reports" with title "GenuVerity Automation"'

echo "Phase 2 trigger sent: $(date)" >> "$LOG_FILE"
echo "User should check Claude Desktop to extract Gemini results" >> "$LOG_FILE"

# For full automation, this script would:
# 1. Launch Claude Cowork with the phase2 task file
# 2. Claude Cowork would:
#    - Return to the Gemini chat
#    - Extract the JSON output
#    - Run /batch-report to generate HTML
#    - Commit to feature branch
#    - Send notification
#
# Current implementation requires manual trigger in Claude Desktop/Cowork
# with the instructions from phase2-extract-generate.md

exit 0
