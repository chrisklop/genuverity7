#!/bin/bash
#
# GenuVerity Daily Automated Research Pipeline
# Runs completely unattended - no manual intervention needed
#
# This script:
# 1. Picks the next pending topic from queue
# 2. Submits to Gemini Deep Research (Phase 1)
# 3. Waits 25 minutes for research to complete
# 4. Harvests results (Phase 2)
# 5. Updates queue status
#
# Schedule via launchd for daily execution (e.g., 5 AM)
#

set -e

# Paths
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
AUTOMATION_DIR="$(dirname "$SCRIPT_DIR")"
LOG_DIR="$AUTOMATION_DIR/logs"
PYTHON="/usr/bin/python3"

# Date for logging
TODAY=$(date +%Y-%m-%d)
LOG_FILE="$LOG_DIR/daily-auto-$TODAY.log"

# Ensure log directory exists
mkdir -p "$LOG_DIR"

log() {
    echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "============================================================"
log "GenuVerity Daily Automated Research Pipeline"
log "============================================================"

# Check if we're in the right environment
if [ ! -f "$SCRIPT_DIR/gemini-deep-research.py" ]; then
    log "ERROR: gemini-deep-research.py not found"
    exit 1
fi

# Check for pending topics
PENDING_COUNT=$($PYTHON -c "
import json
from pathlib import Path
queue = json.loads(Path('$AUTOMATION_DIR/topics-queue.json').read_text())
pending = [t for t in queue.get('topics', []) if t.get('status') == 'pending']
print(len(pending))
" 2>/dev/null || echo "0")

log "Pending topics in queue: $PENDING_COUNT"

if [ "$PENDING_COUNT" -eq "0" ]; then
    log "No pending topics - nothing to do"
    exit 0
fi

# Run the full pipeline: submit → wait → harvest
log "Starting full automated pipeline..."
log "Phase 1: Submitting research..."

cd "$AUTOMATION_DIR"

# Phase 1: Submit research (headless)
$PYTHON "$SCRIPT_DIR/gemini-deep-research.py" --from-queue --headless >> "$LOG_FILE" 2>&1
PHASE1_EXIT=$?

if [ $PHASE1_EXIT -ne 0 ]; then
    log "ERROR: Phase 1 failed with exit code $PHASE1_EXIT"
    exit 1
fi

log "Phase 1 complete - research submitted"
log "Waiting 25 minutes for Gemini Deep Research to complete..."

# Wait 25 minutes (1500 seconds)
sleep 1500

log "Wait complete - starting Phase 2 harvest..."

# Phase 2: Harvest results (headless)
$PYTHON "$SCRIPT_DIR/gemini-deep-research.py" --harvest --headless >> "$LOG_FILE" 2>&1
PHASE2_EXIT=$?

if [ $PHASE2_EXIT -ne 0 ]; then
    log "WARNING: Phase 2 had issues (exit code $PHASE2_EXIT)"
fi

log "============================================================"
log "Daily pipeline complete!"
log "Check $LOG_DIR for detailed logs"
log "============================================================"

# Summary of today's work
log ""
log "Jobs processed today:"
$PYTHON "$SCRIPT_DIR/gemini-deep-research.py" --list-jobs 2>/dev/null | grep -E "completed|needs_review" | head -5 | tee -a "$LOG_FILE"

exit 0
