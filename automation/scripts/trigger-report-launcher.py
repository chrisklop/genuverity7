#!/usr/bin/env python3
"""
GenuVerity: Trigger Report Launcher
Bridges Gemini research output to Claude Code report generation.

Usage:
    python trigger-report-launcher.py                    # Process newest file in input/
    python trigger-report-launcher.py --file FILE.json   # Process specific file
    python trigger-report-launcher.py --watch            # Watch input folder for new files
    python trigger-report-launcher.py --from-downloads   # Process newest from ~/Downloads
"""

import argparse
import os
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

GENUVERITY_ROOT = Path.home() / "GenuVerity7"
AUTOMATION_DIR = GENUVERITY_ROOT / "automation"
INPUT_DIR = AUTOMATION_DIR / "input"
LOGS_DIR = AUTOMATION_DIR / "logs"
DOWNLOADS_DIR = Path.home() / "Downloads"


def log(msg: str):
    """Log with timestamp."""
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"[{timestamp}] {msg}")


def notify(title: str, message: str):
    """Send macOS notification."""
    script = f'display notification "{message}" with title "{title}"'
    try:
        subprocess.run(["osascript", "-e", script], capture_output=True)
    except Exception:
        pass


def find_newest_file(directory: Path, extensions: list = None) -> Path | None:
    """Find the newest file in a directory with given extensions."""
    if extensions is None:
        extensions = [".json", ".md"]

    files = []
    for ext in extensions:
        files.extend(directory.glob(f"*{ext}"))

    if not files:
        return None

    return max(files, key=lambda f: f.stat().st_mtime)


def launch_claude_with_file(file_path: Path):
    """Launch Claude Code with the report generation command."""
    filename = file_path.name

    # Copy to input directory if not already there
    if file_path.parent != INPUT_DIR:
        dest = INPUT_DIR / filename
        import shutil
        shutil.copy2(file_path, dest)
        log(f"Copied to: {dest}")
        filename = dest.name

    log(f"Launching Claude Code for: {filename}")

    # Build the command that Claude will execute
    claude_command = f"/generate-report automation/input/{filename}"

    # Create an AppleScript to launch Claude and type the command
    applescript = f'''
    tell application "Terminal"
        activate
        do script "cd {GENUVERITY_ROOT} && claude --chrome --dangerously-skip-permissions"
    end tell

    delay 3

    tell application "System Events"
        keystroke "{claude_command}"
        delay 0.5
        keystroke return
    end tell
    '''

    try:
        # Method 1: Use the Report Launcher app if available
        launcher_app = Path.home() / "Applications" / "GenuVerity Report Launcher.app"
        if launcher_app.exists():
            log("Using GenuVerity Report Launcher app...")
            subprocess.run(["open", str(launcher_app)], check=True)
            notify("GenuVerity", f"Report Launcher opened for: {filename}")
            return True

        # Method 2: Direct AppleScript
        log("Launching via AppleScript...")
        subprocess.run(["osascript", "-e", applescript], check=True)
        notify("GenuVerity", f"Claude Code launched for: {filename}")
        return True

    except subprocess.CalledProcessError as e:
        log(f"Launch failed: {e}")
        notify("GenuVerity Error", "Failed to launch Claude Code")
        return False


def watch_folder(directory: Path, callback, poll_interval: int = 30):
    """Watch a folder for new files and trigger callback."""
    log(f"Watching {directory} for new files...")
    log(f"Poll interval: {poll_interval} seconds")
    log("Press Ctrl+C to stop")

    processed = set()

    # Mark existing files as already processed
    for f in directory.glob("*"):
        if f.is_file():
            processed.add(f.name)

    while True:
        try:
            for f in directory.glob("*"):
                if f.is_file() and f.name not in processed:
                    if f.suffix in [".json", ".md"]:
                        log(f"New file detected: {f.name}")
                        processed.add(f.name)
                        callback(f)

            time.sleep(poll_interval)

        except KeyboardInterrupt:
            log("Watch stopped")
            break


def main():
    parser = argparse.ArgumentParser(description="GenuVerity Report Launcher Trigger")
    parser.add_argument("--file", "-f", help="Specific file to process")
    parser.add_argument("--watch", "-w", action="store_true", help="Watch input folder")
    parser.add_argument("--from-downloads", "-d", action="store_true", help="Process from Downloads")
    parser.add_argument("--poll", type=int, default=30, help="Watch poll interval (seconds)")
    args = parser.parse_args()

    # Ensure directories exist
    INPUT_DIR.mkdir(parents=True, exist_ok=True)
    LOGS_DIR.mkdir(parents=True, exist_ok=True)

    if args.watch:
        watch_folder(INPUT_DIR, launch_claude_with_file, args.poll)
        return

    # Find file to process
    file_to_process = None

    if args.file:
        file_to_process = Path(args.file)
        if not file_to_process.exists():
            # Try in input directory
            file_to_process = INPUT_DIR / args.file
        if not file_to_process.exists():
            log(f"File not found: {args.file}")
            sys.exit(1)

    elif args.from_downloads:
        file_to_process = find_newest_file(DOWNLOADS_DIR)
        if not file_to_process:
            log("No .json or .md files found in Downloads")
            sys.exit(1)
        log(f"Found in Downloads: {file_to_process.name}")

    else:
        file_to_process = find_newest_file(INPUT_DIR)
        if not file_to_process:
            log("No files found in input directory")
            log(f"Add files to: {INPUT_DIR}")
            sys.exit(1)

    log(f"Processing: {file_to_process}")
    launch_claude_with_file(file_to_process)


if __name__ == "__main__":
    main()
