#!/bin/bash
# GenuVerity Daily Research Automation
# Runs Phase 1, waits 25 min, runs Phase 2
# Designed to run headless so it won't interrupt your work

SCRIPT_DIR="$HOME/GenuVerity7/automation/scripts"
LOG_DIR="$HOME/GenuVerity7/automation/logs"
DATE=$(date +%Y-%m-%d)

echo "[$DATE] Starting daily research automation..." >> "$LOG_DIR/daily-runner.log"

# Phase 1: Submit research (headless)
python3 "$SCRIPT_DIR/gemini-deep-research.py" --from-queue --headless >> "$LOG_DIR/daily-runner.log" 2>&1

if [ $? -eq 0 ]; then
    echo "[$DATE] Phase 1 complete. Waiting 25 minutes for research..." >> "$LOG_DIR/daily-runner.log"
    sleep 1500  # 25 minutes

    # Phase 2: Harvest results (headless)
    echo "[$DATE] Starting Phase 2 harvest..." >> "$LOG_DIR/daily-runner.log"
    python3 "$SCRIPT_DIR/gemini-deep-research.py" --harvest --headless >> "$LOG_DIR/daily-runner.log" 2>&1

    echo "[$DATE] Daily research complete!" >> "$LOG_DIR/daily-runner.log"
else
    echo "[$DATE] Phase 1 failed - skipping harvest" >> "$LOG_DIR/daily-runner.log"
fi
