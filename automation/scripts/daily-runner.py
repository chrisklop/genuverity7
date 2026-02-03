#!/usr/bin/env python3
"""
GenuVerity Daily Runner - FULLY AUTOMATED PIPELINE
Orchestrates the complete daily research-to-report pipeline:
1. Pull next topic from queue
2. Run ChatGPT Deep Research (PRIMARY) or Gemini (FALLBACK)
3. Run Claude PASS 1 (browser automation) → JSON extraction
4. Run PASS 2 → HTML generation from template
5. Auto-commit to feature branch
6. Notify user when ready

This is triggered by launchd at 5:00 AM daily.

Usage:
    python daily-runner.py              # Full automated pipeline
    python daily-runner.py --dry-run    # Show what would happen
    python daily-runner.py --research-only  # Only do research, skip report generation
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
OUTPUT_DIR = AUTOMATION_DIR / "output"
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


def run_claude_pass1(slug: str, dry_run: bool = False) -> bool:
    """Run Claude PASS 1 (JSON extraction) via browser automation."""
    log(f"PASS 1: Running Claude.ai browser automation for: {slug}")

    if dry_run:
        log("[DRY RUN] Would run claude-pass1.py")
        return True

    pass1_script = SCRIPTS_DIR / "claude-pass1.py"

    try:
        result = subprocess.run(
            [sys.executable, str(pass1_script), "--slug", slug],
            capture_output=True,
            text=True,
            timeout=600  # 10 minute timeout for Claude
        )

        if result.returncode == 0:
            log("Claude PASS 1 completed - JSON extracted")
            return True
        else:
            log(f"Claude PASS 1 failed: {result.stderr}")
            return False

    except subprocess.TimeoutExpired:
        log("Claude PASS 1 timed out")
        return False
    except Exception as e:
        log(f"Claude PASS 1 error: {e}")
        return False


def run_pass2_report_gen(slug: str, dry_run: bool = False) -> bool:
    """Run PASS 2 (HTML generation) and auto-commit."""
    log(f"PASS 2: Generating HTML report for: {slug}")

    if dry_run:
        log("[DRY RUN] Would run report-generator.py with --commit")
        return True

    report_script = SCRIPTS_DIR / "report-generator.py"

    try:
        result = subprocess.run(
            [sys.executable, str(report_script), "--slug", slug, "--commit"],
            capture_output=True,
            text=True,
            timeout=120  # 2 minute timeout
        )

        if result.returncode == 0:
            log("PASS 2 completed - Report generated and committed")
            return True
        else:
            log(f"PASS 2 failed: {result.stderr}")
            return False

    except Exception as e:
        log(f"PASS 2 error: {e}")
        return False


def run_full_pipeline(slug: str, dry_run: bool = False) -> bool:
    """Run the complete pipeline: PASS 1 (JSON) → PASS 2 (HTML) → Commit."""
    log("")
    log("=" * 60)
    log("FULL PIPELINE: Research → JSON → HTML → Git")
    log("=" * 60)

    # Check if JSON already exists (PASS 1 already done)
    json_file = OUTPUT_DIR / f"{slug}.json"

    if not json_file.exists():
        # Run PASS 1
        if not run_claude_pass1(slug, dry_run):
            log("Pipeline failed at PASS 1")
            return False

    # Run PASS 2 + commit
    if not run_pass2_report_gen(slug, dry_run):
        log("Pipeline failed at PASS 2")
        return False

    log("")
    log("=" * 60)
    log("✓ FULL PIPELINE COMPLETE")
    log("=" * 60)
    log(f"Report branch: report/{slug}")

    return True


def notify_report_ready(slug: str, topic: str):
    """Notify user that report is ready in feature branch."""
    log(f"Report ready: {topic}")
    notify("GenuVerity Report Ready",
           f"'{topic[:30]}...' committed to branch report/{slug}")


def main():
    parser = argparse.ArgumentParser(description="GenuVerity Daily Runner - Full Pipeline")
    parser.add_argument("--dry-run", action="store_true", help="Show what would happen")
    parser.add_argument("--research-only", action="store_true", help="Only do research, skip report generation")
    parser.add_argument("--slug", help="Process specific slug (skip research)")
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
    log("GenuVerity Daily Runner - FULL AUTOMATION")
    log("=" * 60)

    if args.dry_run:
        log("DRY RUN MODE - no changes will be made")

    # If specific slug provided, just run the pipeline for it
    if args.slug:
        log(f"Processing specific slug: {args.slug}")
        success = run_full_pipeline(args.slug, dry_run=args.dry_run)
        if success:
            notify_report_ready(args.slug, args.slug)
        return

    # Load queue
    queue = load_queue()
    total = len(queue.get("topics", []))
    pending = len([t for t in queue.get("topics", []) if t.get("status") == "pending"])

    log(f"Queue: {pending} pending / {total} total topics")

    # Get next topic
    topic = get_next_pending(queue)

    if not topic:
        log("No pending topics in queue")

        # Check for completed research that needs report generation
        completed = check_for_completed_research()
        if completed:
            log(f"Found {len(completed)} completed research items")
            for job in completed:
                slug = job.get("slug", "")
                if slug:
                    log(f"Running full pipeline for: {slug}")
                    if run_full_pipeline(slug, dry_run=args.dry_run):
                        notify_report_ready(slug, job.get("topic", slug))
        else:
            notify("GenuVerity", "No topics to research today. Add more to the queue!")
        return

    log(f"Next topic: {topic.get('name')}")
    log(f"Priority: {topic.get('priority')}")
    log(f"Category: {topic.get('category')}")

    slug = topic.get("slug", "")

    # STEP 1: Run research (ChatGPT PRIMARY, Gemini FALLBACK)
    research_success = run_chatgpt_research(topic, dry_run=args.dry_run)

    if not research_success:
        log("Research failed - aborting pipeline")
        notify("GenuVerity Error", f"Research failed for: {topic.get('name', '')[:30]}...")
        return

    log("Research complete!")

    # If research-only mode, stop here
    if args.research_only:
        log("Research-only mode - stopping before report generation")
        notify("GenuVerity", f"Research complete: {topic.get('name', '')[:30]}...")
        return

    # STEP 2-4: Run full pipeline (PASS 1 → PASS 2 → Commit)
    if not args.dry_run:
        pipeline_success = run_full_pipeline(slug, dry_run=args.dry_run)

        if pipeline_success:
            notify_report_ready(slug, topic.get("name", ""))
        else:
            notify("GenuVerity Error", f"Pipeline failed for: {topic.get('name', '')[:30]}...")

    log("=" * 60)
    log("Daily Runner Complete")
    log("=" * 60)


if __name__ == "__main__":
    main()
