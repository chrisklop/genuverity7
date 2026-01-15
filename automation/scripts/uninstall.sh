#!/bin/bash
# GenuVerity Daily Automation Uninstall
# Run this script to remove the launchd agents

set -e

LAUNCH_AGENTS_DIR="$HOME/Library/LaunchAgents"

echo "GenuVerity Daily Automation Uninstall"
echo "======================================"
echo ""

# Unload and remove Phase 1
if [ -f "$LAUNCH_AGENTS_DIR/com.genuverity.phase1.plist" ]; then
    echo "Unloading Phase 1 agent..."
    launchctl unload "$LAUNCH_AGENTS_DIR/com.genuverity.phase1.plist" 2>/dev/null || true
    rm "$LAUNCH_AGENTS_DIR/com.genuverity.phase1.plist"
    echo "Phase 1 agent removed."
else
    echo "Phase 1 agent not found."
fi

# Unload and remove Phase 2
if [ -f "$LAUNCH_AGENTS_DIR/com.genuverity.phase2.plist" ]; then
    echo "Unloading Phase 2 agent..."
    launchctl unload "$LAUNCH_AGENTS_DIR/com.genuverity.phase2.plist" 2>/dev/null || true
    rm "$LAUNCH_AGENTS_DIR/com.genuverity.phase2.plist"
    echo "Phase 2 agent removed."
else
    echo "Phase 2 agent not found."
fi

echo ""
echo "Uninstall complete!"
echo "Note: Log files in automation/logs/ were preserved."
