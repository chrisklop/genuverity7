#!/usr/bin/env python3
"""
GenuVerity Daily Runner
Orchestrates the daily research pipeline:
1. Pull next topic from queue
2. Submit to Gemini Deep Research
3. Notify user via macOS notification
4. (Future) Auto-extract and generate report

This is triggered by launchd at 5:00 AM daily.

Usage:
    python daily-runner.py              # Normal run
    python daily-runner.py --dry-run    # Show what would happen
    python daily-runner.py --now        # Run immediately (ignore schedule)
"""

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime
from pathlib import Path

GENUVERITY_ROOT = Path.home() / "GenuVerity7"
AUTOMATION_DIR = GENUVERITY_ROOT / "automation"
SCRIPTS_DIR = AUTOMATION_DIR / "scripts"
LOGS_DIR = AUTOMATION_DIR / "logs"
QUEUE_FILE = AUTOMATION_DIR / "topics-queue.json"


def log(msg: str):
    """Log with timestamp."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {msg}")


def notify(title: str, message: str):
    """Send macOS notification."""
    script = f'display notification "{message}" with title "{title}"'
    try:
        subprocess.run(["osascript", "-e", script], capture_output=True)
    except Exception as e:
        log(f"Notification failed: {e}")


def load_queue() -> dict:
    """Load the topics queue."""
    if not QUEUE_FILE.exists():
        return {"topics": []}
    with open(QUEUE_FILE) as f:
        return json.load(f)


def get_next_pending(queue: dict) -> dict | None:
    """Get next pending topic (priority-sorted)."""
    pending = [t for t in queue.get("topics", []) if t.get("status") == "pending"]
    if not pending:
        return None

    priority_order = {"high": 0, "medium": 1, "low": 2}
    pending.sort(key=lambda t: priority_order.get(t.get("priority", "medium"), 1))
    return pending[0]


def mark_topic(slug: str, status: str):
    """Update topic status in queue."""
    queue = load_queue()
    for topic in queue.get("topics", []):
        if topic.get("slug") == slug:
            topic["status"] = status
            topic["last_update"] = datetime.now().isoformat()
            break

    with open(QUEUE_FILE, "w") as f:
        json.dump(queue, f, indent=2)


def run_chatgpt_research(topic: dict, dry_run: bool = False) -> bool:
    """Run ChatGPT Deep Research for a topic (PRIMARY)."""
    name = topic.get("name", "")
    slug = topic.get("slug", "")

    log(f"Starting ChatGPT Deep Research for: {name}")

    if dry_run:
        log("[DRY RUN] Would run chatgpt-research.py")
        return True

    # Mark as processing
    mark_topic(slug, "processing")

    # Run ChatGPT research script (PRIMARY)
    research_script = SCRIPTS_DIR / "chatgpt-research.py"

    try:
        result = subprocess.run(
            [sys.executable, str(research_script), "--topic", name],
            capture_output=True,
            text=True,
            timeout=3600  # 60 minute timeout for Deep Research
        )

        if result.returncode == 0:
            log("ChatGPT Deep Research completed successfully")
            mark_topic(slug, "completed")
            notify("GenuVerity", f"Research complete: {name[:40]}... Ready for report generation!")
            return True
        else:
            log(f"ChatGPT research failed: {result.stderr}")
            # Try Gemini as fallback
            return run_gemini_fallback(topic, dry_run)

    except subprocess.TimeoutExpired:
        log("ChatGPT research timed out - trying Gemini fallback")
        return run_gemini_fallback(topic, dry_run)
    except Exception as e:
        log(f"ChatGPT error: {e} - trying Gemini fallback")
        return run_gemini_fallback(topic, dry_run)


def run_gemini_fallback(topic: dict, dry_run: bool = False) -> bool:
    """Run Gemini Deep Research as fallback."""
    name = topic.get("name", "")
    slug = topic.get("slug", "")

    log(f"FALLBACK: Starting Gemini Deep Research for: {name}")

    if dry_run:
        log("[DRY RUN] Would run gemini-deep-research.py")
        return True

    research_script = SCRIPTS_DIR / "gemini-deep-research.py"

    try:
        result = subprocess.run(
            [sys.executable, str(research_script), "--topic", name, "--headless"],
            capture_output=True,
            text=True,
            timeout=1800  # 30 minute timeout
        )

        if result.returncode == 0:
            log("Gemini research submitted - waiting for completion")
            notify("GenuVerity", f"Gemini research started: {name[:40]}...")
            return True
        else:
            log(f"Gemini fallback also failed: {result.stderr}")
            mark_topic(slug, "failed")
            notify("GenuVerity Error", f"All research methods failed for: {name[:30]}...")
            return False

    except Exception as e:
        log(f"Gemini fallback error: {e}")
        mark_topic(slug, "failed")
        return False


def check_for_completed_research() -> list:
    """Check output folder for completed research ready for report generation."""
    output_dir = AUTOMATION_DIR / "output"
    completed = []

    if not output_dir.exists():
        return completed

    for job_file in output_dir.glob("*-job.json"):
        try:
            job = json.loads(job_file.read_text())
            if job.get("status") == "completed" and not job.get("report_generated"):
                completed.append(job)
        except:
            continue

    return completed


def notify_report_ready(jobs: list):
    """Notify user that research is ready for report generation."""
    if not jobs:
        return

    for job in jobs:
        topic = job.get("topic", "Unknown")
        slug = job.get("slug", "")
        log(f"Report ready for generation: {topic}")
        notify("GenuVerity Report Ready",
               f"'{topic[:30]}...' is ready. Run report-generator.py or paste into Claude.")


def main():
    parser = argparse.ArgumentParser(description="GenuVerity Daily Runner")
    parser.add_argument("--dry-run", action="store_true", help="Show what would happen")
    parser.add_argument("--now", action="store_true", help="Run immediately")
    args = parser.parse_args()

    # Setup logging
    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    today = datetime.now().strftime("%Y-%m-%d")
    log_file = LOGS_DIR / f"{today}-daily-runner.log"

    # Redirect stdout to log file when running from launchd
    if not sys.stdout.isatty():
        sys.stdout = open(log_file, "a")
        sys.stderr = sys.stdout

    log("=" * 60)
    log("GenuVerity Daily Runner Started")
    log("=" * 60)

    if args.dry_run:
        log("DRY RUN MODE - no changes will be made")

    # Load queue
    queue = load_queue()
    total = len(queue.get("topics", []))
    pending = len([t for t in queue.get("topics", []) if t.get("status") == "pending"])

    log(f"Queue: {pending} pending / {total} total topics")

    # Get next topic
    topic = get_next_pending(queue)

    if not topic:
        log("No pending topics in queue")
        notify("GenuVerity", "No topics to research today. Add more to the queue!")
        return

    log(f"Next topic: {topic.get('name')}")
    log(f"Priority: {topic.get('priority')}")
    log(f"Category: {topic.get('category')}")

    # Run research (ChatGPT PRIMARY, Gemini FALLBACK)
    success = run_chatgpt_research(topic, dry_run=args.dry_run)

    if success and not args.dry_run:
        log("Research complete!")
        log("Output saved to: automation/output/")
        log("")
        log("NEXT STEPS for report generation:")
        log("1. Review output in automation/output/")
        log("2. Run: python3 report-generator.py --slug <slug>")
        log("   OR paste output into Claude for PASS 1 + PASS 2")
        log("3. Commit to feature branch")

    # Check for any other completed research ready for reports
    completed = check_for_completed_research()
    if completed:
        log(f"Found {len(completed)} research items ready for report generation")
        notify_report_ready(completed)

    log("=" * 60)
    log("Daily Runner Complete")
    log("=" * 60)


if __name__ == "__main__":
    main()
