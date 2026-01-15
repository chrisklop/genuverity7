#!/bin/bash
# GenuVerity Daily Automation Setup
# Run this script to install the launchd agents

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LAUNCHD_DIR="$PROJECT_DIR/launchd"
LAUNCH_AGENTS_DIR="$HOME/Library/LaunchAgents"

echo "GenuVerity Daily Automation Setup"
echo "=================================="
echo ""

# Create LaunchAgents directory if it doesn't exist
mkdir -p "$LAUNCH_AGENTS_DIR"

# Make trigger scripts executable
chmod +x "$SCRIPT_DIR/trigger-phase1.sh"
chmod +x "$SCRIPT_DIR/trigger-phase2.sh"

# Create log directory
mkdir -p "$PROJECT_DIR/logs"
mkdir -p "$PROJECT_DIR/output"

echo "Installing launchd agents..."

# Copy plist files
cp "$LAUNCHD_DIR/com.genuverity.phase1.plist" "$LAUNCH_AGENTS_DIR/"
cp "$LAUNCHD_DIR/com.genuverity.phase2.plist" "$LAUNCH_AGENTS_DIR/"

# Load the agents
echo "Loading Phase 1 agent (5:00 AM daily)..."
launchctl unload "$LAUNCH_AGENTS_DIR/com.genuverity.phase1.plist" 2>/dev/null || true
launchctl load "$LAUNCH_AGENTS_DIR/com.genuverity.phase1.plist"

echo "Loading Phase 2 agent (6:00 AM daily)..."
launchctl unload "$LAUNCH_AGENTS_DIR/com.genuverity.phase2.plist" 2>/dev/null || true
launchctl load "$LAUNCH_AGENTS_DIR/com.genuverity.phase2.plist"

echo ""
echo "Setup complete!"
echo ""
echo "Schedule:"
echo "  Phase 1 (Submit Research): 5:00 AM daily"
echo "  Phase 2 (Extract & Generate): 6:00 AM daily"
echo ""
echo "To test manually:"
echo "  Phase 1: $SCRIPT_DIR/trigger-phase1.sh"
echo "  Phase 2: $SCRIPT_DIR/trigger-phase2.sh"
echo ""
echo "To uninstall:"
echo "  launchctl unload ~/Library/LaunchAgents/com.genuverity.phase1.plist"
echo "  launchctl unload ~/Library/LaunchAgents/com.genuverity.phase2.plist"
echo ""
echo "Logs: $PROJECT_DIR/logs/"
