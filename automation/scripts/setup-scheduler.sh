#!/bin/bash
# GenuVerity Scheduler Setup
# Installs the launchd scheduler for daily research automation

set -e

AUTOMATION_DIR="$HOME/GenuVerity7/automation"
PLIST_SOURCE="$AUTOMATION_DIR/launchd/com.genuverity.daily-research.plist"
PLIST_DEST="$HOME/Library/LaunchAgents/com.genuverity.daily-research.plist"

echo "=========================================="
echo "GenuVerity Scheduler Setup"
echo "=========================================="

# Check if plist exists
if [ ! -f "$PLIST_SOURCE" ]; then
    echo "ERROR: Plist not found at $PLIST_SOURCE"
    exit 1
fi

# Check for existing installation
if [ -f "$PLIST_DEST" ]; then
    echo "Existing scheduler found. Unloading..."
    launchctl unload "$PLIST_DEST" 2>/dev/null || true
fi

# Copy plist to LaunchAgents
echo "Installing scheduler..."
cp "$PLIST_SOURCE" "$PLIST_DEST"

# Fix permissions
chmod 644 "$PLIST_DEST"

# Load the scheduler
echo "Loading scheduler..."
launchctl load "$PLIST_DEST"

# Verify
if launchctl list | grep -q "com.genuverity.daily-research"; then
    echo ""
    echo "✅ Scheduler installed successfully!"
    echo ""
    echo "Schedule: Daily at 5:00 AM"
    echo "Script: $AUTOMATION_DIR/scripts/daily-runner.py"
    echo "Logs: $AUTOMATION_DIR/logs/"
    echo ""
    echo "Commands:"
    echo "  View status:   launchctl list | grep genuverity"
    echo "  Run now:       python3 $AUTOMATION_DIR/scripts/daily-runner.py --now"
    echo "  Uninstall:     launchctl unload $PLIST_DEST && rm $PLIST_DEST"
else
    echo ""
    echo "❌ Scheduler may not have loaded correctly"
    echo "Check: launchctl list | grep genuverity"
fi
