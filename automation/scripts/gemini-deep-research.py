#!/usr/bin/env python3
"""
GenuVerity: Gemini Deep Research Automation (Two-Phase System)

Phase 1: Submit research prompt, click "Start research", save chat URL
Phase 2: Return after ~25 min, harvest completed results

Requirements:
    pip3 install playwright --break-system-packages
    playwright install chromium

Usage:
    # Phase 1: Submit research
    python3 gemini-deep-research.py --from-queue
    python3 gemini-deep-research.py --topic "Topic" --template health-misinfo

    # Phase 2: Harvest results (run ~25-30 min after Phase 1)
    python3 gemini-deep-research.py --harvest
    python3 gemini-deep-research.py --harvest --job output/slug-job.json

    # Full auto (submits, waits, harvests)
    python3 gemini-deep-research.py --from-queue --auto
"""

import argparse
import json
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from time import sleep

try:
    from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
except ImportError:
    print("ERROR: Playwright not installed. Run:")
    print("  pip3 install playwright --break-system-packages")
    print("  playwright install chromium")
    sys.exit(1)

# Paths
GENUVERITY_ROOT = Path.home() / "GenuVerity7"
AUTOMATION_DIR = GENUVERITY_ROOT / "automation"
PROMPTS_DIR = AUTOMATION_DIR / "prompts"
OUTPUT_DIR = AUTOMATION_DIR / "output"
LOGS_DIR = AUTOMATION_DIR / "logs"
QUEUE_FILE = AUTOMATION_DIR / "topics-queue.json"

# Chrome for Claude - isolated profile
CHROME_FOR_CLAUDE_DATA = Path.home() / "Library/Application Support/Google/Chrome for Claude"
CHROME_BINARY = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

GEMINI_URL = "https://gemini.google.com/app"


def setup_dirs():
    """Ensure all directories exist."""
    for d in [OUTPUT_DIR, LOGS_DIR, PROMPTS_DIR]:
        d.mkdir(parents=True, exist_ok=True)


def log(msg: str, log_file: Path = None):
    """Log message to console and optionally to file."""
    timestamp = datetime.now().strftime("%H:%M:%S")
    line = f"[{timestamp}] {msg}"
    print(line)
    if log_file:
        with open(log_file, "a") as f:
            f.write(line + "\n")


def load_template(template_id: str) -> str:
    """Load a prompt template from the prompts directory."""
    template_file = PROMPTS_DIR / f"{template_id}.md"
    if not template_file.exists():
        template_file = PROMPTS_DIR / "default.md"
    if not template_file.exists():
        return "Research topic: {topic}\n\nProvide comprehensive analysis."

    content = template_file.read_text()
    # Extract prompt after frontmatter
    if "---" in content:
        parts = content.split("---", 2)
        if len(parts) >= 3:
            content = parts[2].strip()
    return content


def get_topic_from_queue() -> dict | None:
    """Get next pending topic from queue."""
    if not QUEUE_FILE.exists():
        return None
    queue = json.loads(QUEUE_FILE.read_text())
    for topic in queue.get("topics", []):
        if topic.get("status") == "pending":
            return topic
    return None


def update_queue_status(slug: str, status: str, chat_url: str = None):
    """Update topic status in queue."""
    if not QUEUE_FILE.exists():
        return
    queue = json.loads(QUEUE_FILE.read_text())
    for topic in queue.get("topics", []):
        if topic.get("slug") == slug:
            topic["status"] = status
            topic["processed_date"] = datetime.now().strftime("%Y-%m-%d")
            if chat_url:
                topic["chat_url"] = chat_url
            break
    QUEUE_FILE.write_text(json.dumps(queue, indent=2))


def generate_slug(topic: str) -> str:
    """Generate URL-friendly slug from topic."""
    slug = re.sub(r'[^a-z0-9]+', '-', topic.lower())[:40]
    date_suffix = datetime.now().strftime("%Y%m%d")
    return f"{slug}-{date_suffix}"


def ensure_thinking_mode(page, log_file: Path = None) -> bool:
    """
    Ensure Gemini is in 'Thinking' mode (not 'Fast').
    The mode picker shows: Fast | Thinking | Pro
    We want 'Thinking' for Deep Research to work properly.
    """
    log("Checking/setting Thinking mode...", log_file)

    # Click the mode picker (shows current mode like "Thinking" or "Fast")
    mode_picker_selectors = [
        '[aria-label="Open mode picker"]',
        'button:has-text("Thinking")',
        'button:has-text("Fast")',
        'button:has-text("Pro")',
    ]

    picker_opened = False
    for selector in mode_picker_selectors:
        try:
            btn = page.locator(selector).first
            if btn.count() > 0 and btn.is_visible():
                current_mode = btn.inner_text().strip()
                log(f"Current mode: {current_mode}", log_file)
                btn.click()
                sleep(1)
                picker_opened = True
                break
        except Exception:
            continue

    if not picker_opened:
        log("Could not open mode picker", log_file)
        return False

    # Look for "Thinking" option and click it
    thinking_selectors = [
        ':text("Thinking"):near(:text("Solves complex"))',
        'div:has-text("Thinking"):has-text("Solves")',
        '[role="option"]:has-text("Thinking")',
        ':text("Thinking")',
    ]

    for selector in thinking_selectors:
        try:
            opt = page.locator(selector).first
            if opt.count() > 0 and opt.is_visible():
                opt.click()
                sleep(1)
                log("Thinking mode selected!", log_file)
                return True
        except Exception:
            continue

    # Close picker if we couldn't select
    try:
        page.keyboard.press("Escape")
    except Exception:
        pass

    log("WARNING: Could not confirm Thinking mode", log_file)
    return False


def enable_deep_research_mode(page, log_file: Path = None) -> bool:
    """Enable Deep Research mode via Tools > Deep Research."""
    log("Enabling Deep Research mode...", log_file)

    # Click Tools button
    tools_selectors = [
        'button:has-text("Tools")',
        '[aria-label*="Tools"]',
    ]
    tools_clicked = False
    for selector in tools_selectors:
        try:
            btn = page.locator(selector).first
            if btn.count() > 0 and btn.is_visible():
                log("Found Tools button", log_file)
                btn.click()
                sleep(1)
                tools_clicked = True
                break
        except Exception:
            continue

    if not tools_clicked:
        log("WARNING: Could not find Tools button", log_file)
        return False

    # Click Deep Research in dropdown
    dr_selectors = [
        ':text("Deep Research")',
        '[role="menuitem"]:has-text("Deep Research")',
        'button:has-text("Deep Research")',
    ]
    for selector in dr_selectors:
        try:
            opt = page.locator(selector).first
            if opt.count() > 0 and opt.is_visible():
                log("Found Deep Research option, clicking...", log_file)
                opt.click()
                sleep(1)
                log("Deep Research mode enabled!", log_file)
                return True
        except Exception:
            continue

    # Close menu if failed
    try:
        page.keyboard.press("Escape")
    except Exception:
        pass

    log("WARNING: Could not enable Deep Research automatically", log_file)
    return False


def run_phase1(topic: str, template_id: str = "default", headless: bool = False) -> Path | None:
    """
    Phase 1: Submit research and start it.
    Returns path to job file if successful.
    """
    today = datetime.now().strftime("%Y-%m-%d")
    slug = generate_slug(topic)
    log_file = LOGS_DIR / f"{today}-{slug}.log"

    log("=" * 60, log_file)
    log("PHASE 1: Submit Research", log_file)
    log(f"Topic: {topic}", log_file)
    log(f"Template: {template_id}", log_file)
    log(f"Slug: {slug}", log_file)
    log("=" * 60, log_file)

    # Build prompt
    template = load_template(template_id)
    prompt = template.format(topic=topic, slug=slug, today=today)

    with sync_playwright() as p:
        # Setup Chrome profile
        if CHROME_FOR_CLAUDE_DATA.exists():
            user_data = str(CHROME_FOR_CLAUDE_DATA)
            log(f"Using Chrome for Claude profile", log_file)
        else:
            CHROME_FOR_CLAUDE_DATA.mkdir(parents=True, exist_ok=True)
            user_data = str(CHROME_FOR_CLAUDE_DATA)
            log("Created new Chrome for Claude profile", log_file)

        context = p.chromium.launch_persistent_context(
            user_data_dir=user_data,
            channel="chrome",
            headless=headless,
            args=["--disable-blink-features=AutomationControlled"],
            viewport={"width": 1280, "height": 900}
        )

        page = context.pages[0] if context.pages else context.new_page()

        try:
            # Navigate to Gemini
            log("Navigating to Gemini...", log_file)
            page.goto(GEMINI_URL, wait_until="domcontentloaded", timeout=60000)
            sleep(5)

            # Dismiss restore dialogs
            try:
                page.keyboard.press("Escape")
                sleep(0.5)
            except Exception:
                pass

            page.screenshot(path=str(LOGS_DIR / f"{today}-{slug}-01-loaded.png"))

            # Check login
            log("Checking login...", log_file)
            try:
                page.wait_for_selector('[contenteditable="true"], textarea', timeout=10000)
                log("Logged in!", log_file)
            except PlaywrightTimeout:
                log("ERROR: Not logged in. Please login to Gemini first.", log_file)
                return None

            # Ensure Thinking mode (not Fast) for proper Deep Research
            ensure_thinking_mode(page, log_file)
            sleep(1)

            # Enable Deep Research via Tools menu
            enable_deep_research_mode(page, log_file)
            page.screenshot(path=str(LOGS_DIR / f"{today}-{slug}-02-deep-research.png"))

            # Enter prompt
            log("Entering prompt...", log_file)
            input_area = page.locator('[contenteditable="true"], textarea').first
            input_area.click()
            sleep(0.5)
            input_area.fill(prompt)
            sleep(1)

            page.screenshot(path=str(LOGS_DIR / f"{today}-{slug}-03-prompt.png"))

            # Submit
            log("Submitting...", log_file)
            send_btn = page.locator('button[aria-label*="Send"], button:has-text("Send")')
            if send_btn.count() > 0 and send_btn.first.is_enabled():
                send_btn.first.click()
            else:
                page.keyboard.press("Enter")

            sleep(3)

            # Wait for "Start research" button and click it
            log("Waiting for research plan...", log_file)
            start_clicked = False
            for waited in range(0, 120, 5):
                sleep(5)
                log(f"Waiting... ({waited + 5}s)", log_file)

                page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                sleep(1)

                for selector in ['button:has-text("Start research")', ':text("Start research")']:
                    try:
                        btn = page.locator(selector).first
                        if btn.count() > 0 and btn.is_visible():
                            log("Found 'Start research', clicking...", log_file)
                            btn.click()
                            sleep(2)
                            start_clicked = True
                            log("Research started!", log_file)
                            break
                    except Exception:
                        continue

                if start_clicked:
                    break

            # Wait for URL to update to chat-specific URL
            sleep(3)
            chat_url = page.url

            # Poll for URL change (Gemini redirects to chat/XXX)
            for _ in range(10):
                if "/chat/" in chat_url or chat_url != GEMINI_URL:
                    break
                sleep(2)
                chat_url = page.url

            log(f"Chat URL: {chat_url}", log_file)

            # Save job file
            job_file = OUTPUT_DIR / f"{slug}-job.json"
            job_data = {
                "slug": slug,
                "topic": topic,
                "template": template_id,
                "phase1_started": datetime.now().isoformat(),
                "chat_url": chat_url,
                "status": "researching",
                "research_started": start_clicked
            }
            job_file.write_text(json.dumps(job_data, indent=2))

            page.screenshot(path=str(LOGS_DIR / f"{today}-{slug}-04-started.png"))

            log("=" * 60, log_file)
            log("PHASE 1 COMPLETE", log_file)
            log(f"Job file: {job_file}", log_file)
            log(f"Chat URL: {chat_url}", log_file)
            log("Run --harvest in ~25 minutes to collect results", log_file)
            log("=" * 60, log_file)

            return job_file

        except Exception as e:
            log(f"ERROR: {e}", log_file)
            page.screenshot(path=str(LOGS_DIR / f"{today}-{slug}-error.png"))
            return None

        finally:
            context.close()


def run_phase2(job_file: Path = None, headless: bool = False) -> bool:
    """
    Phase 2: Harvest completed research results.
    """
    today = datetime.now().strftime("%Y-%m-%d")

    # Find jobs to harvest
    if job_file:
        jobs = [job_file]
    else:
        jobs = [j for j in OUTPUT_DIR.glob("*-job.json")
                if json.loads(j.read_text()).get("status") == "researching"]

    if not jobs:
        print("No jobs ready for harvest")
        return False

    for job_path in jobs:
        job = json.loads(job_path.read_text())
        slug = job["slug"]
        chat_url = job.get("chat_url", GEMINI_URL)
        log_file = LOGS_DIR / f"{today}-{slug}-harvest.log"

        log("=" * 60, log_file)
        log("PHASE 2: Harvest Results", log_file)
        log(f"Job: {slug}", log_file)
        log(f"Chat URL: {chat_url}", log_file)
        log("=" * 60, log_file)

        with sync_playwright() as p:
            user_data = str(CHROME_FOR_CLAUDE_DATA) if CHROME_FOR_CLAUDE_DATA.exists() else str(AUTOMATION_DIR / ".chrome-profile")

            context = p.chromium.launch_persistent_context(
                user_data_dir=user_data,
                channel="chrome",
                headless=headless,
                args=["--disable-blink-features=AutomationControlled"],
                viewport={"width": 1280, "height": 900}
            )

            page = context.pages[0] if context.pages else context.new_page()

            try:
                log(f"Navigating to: {chat_url}", log_file)
                page.goto(chat_url, wait_until="domcontentloaded", timeout=60000)
                sleep(5)

                # Aggressively dismiss any "restore session" or other dialogs
                log("Dismissing any dialogs...", log_file)
                for _ in range(3):
                    try:
                        page.keyboard.press("Escape")
                        sleep(0.5)
                    except Exception:
                        pass

                # Try to click any close/X buttons on dialogs
                close_selectors = [
                    'button[aria-label="Close"]',
                    'button:has-text("Don\'t restore")',
                    'button:has-text("Cancel")',
                    '[aria-label="Dismiss"]',
                    '.dialog-close',
                ]
                for selector in close_selectors:
                    try:
                        btn = page.locator(selector).first
                        if btn.count() > 0 and btn.is_visible():
                            log(f"Closing dialog with: {selector}", log_file)
                            btn.click()
                            sleep(1)
                            break
                    except Exception:
                        continue

                page.screenshot(path=str(LOGS_DIR / f"{today}-{slug}-harvest-01.png"))

                # Check if research is complete by looking for the research panel
                log("Checking research status...", log_file)

                # First check if we see the completed research panel
                research_complete = False
                complete_indicators = [
                    'button:has-text("Share & Export")',
                    ':text("I\'ve completed your research")',
                    '.research-panel',
                ]
                for indicator in complete_indicators:
                    try:
                        if page.locator(indicator).count() > 0:
                            research_complete = True
                            log("Research appears complete!", log_file)
                            break
                    except Exception:
                        continue

                # Only check for "still running" if we didn't find completion indicators
                still_running = False
                if not research_complete:
                    for indicator in ['Generating', 'Researching', 'Searching the web']:
                        try:
                            loc = page.locator(f':text("{indicator}")')
                            if loc.count() > 0 and loc.first.is_visible():
                                still_running = True
                                break
                        except Exception:
                            continue

                if still_running:
                    log("Research still in progress, waiting...", log_file)
                    # Wait up to 10 more minutes
                    for waited in range(0, 600, 30):
                        sleep(30)
                        still_running = False
                        for indicator in ['Generating', 'Researching', 'Searching']:
                            if page.locator(f':text("{indicator}")').count() > 0:
                                still_running = True
                                break
                        if not still_running:
                            break
                        log(f"Still running... ({waited + 30}s)", log_file)

                # Try to use "Copy contents" for full markdown with URLs
                log("Attempting to copy contents via Share & Export...", log_file)
                response_text = ""
                copy_success = False

                try:
                    # Click "Share & Export" button
                    share_btn = page.locator('button:has-text("Share & Export"), button:has-text("Share")')
                    if share_btn.count() > 0 and share_btn.first.is_visible():
                        share_btn.first.click()
                        sleep(1)

                        # Click "Copy contents"
                        copy_btn = page.locator(':text("Copy contents"), button:has-text("Copy contents")')
                        if copy_btn.count() > 0 and copy_btn.first.is_visible():
                            copy_btn.first.click()
                            sleep(1)
                            log("Clicked Copy contents", log_file)

                            # Get clipboard content via subprocess (more reliable than JS API)
                            sleep(2)  # Give clipboard time to populate
                            try:
                                result = subprocess.run(["pbpaste"], capture_output=True, text=True, timeout=5)
                                response_text = result.stdout
                                if response_text and len(response_text) > 500:
                                    copy_success = True
                                    log(f"Got {len(response_text)} chars from clipboard via pbpaste!", log_file)
                            except Exception as clip_err:
                                log(f"pbpaste failed: {clip_err}", log_file)

                        # Close menu
                        page.keyboard.press("Escape")
                        sleep(0.5)
                except Exception as e:
                    log(f"Copy contents failed: {e}", log_file)

                # Fallback: scroll and scrape if copy didn't work
                if not copy_success:
                    log("Falling back to text scraping...", log_file)
                    for _ in range(10):
                        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                        sleep(1)

                    for selector in ['.model-response', '[data-message-author="model"]', 'message-content', 'main']:
                        try:
                            elements = page.locator(selector)
                            if elements.count() > 0:
                                response_text = elements.last.inner_text()
                                if len(response_text) > 500:
                                    break
                        except Exception:
                            continue

                if len(response_text) < 100:
                    log("WARNING: Response seems too short", log_file)

                # Save raw response as markdown
                md_file = OUTPUT_DIR / f"{slug}.md"
                md_file.write_text(response_text)
                log(f"Research saved: {md_file} ({len(response_text)} chars)", log_file)

                # Extract source URLs from the page
                log("Extracting source URLs...", log_file)
                sources = []
                try:
                    # Click Contents dropdown to reveal sources
                    contents_btn = page.locator('button:has-text("Contents"), [aria-label*="contents"]')
                    if contents_btn.count() > 0 and contents_btn.first.is_visible():
                        contents_btn.first.click()
                        sleep(1)
                    
                    # Extract all external links
                    links = page.evaluate("""
                        () => {
                            const links = document.querySelectorAll('a[href]');
                            const sources = [];
                            for (const link of links) {
                                const href = link.href;
                                const text = link.innerText || link.textContent || '';
                                if (href && !href.includes('gemini.google.com') && 
                                    !href.includes('accounts.google') &&
                                    !href.includes('support.google') &&
                                    (href.startsWith('http://') || href.startsWith('https://'))) {
                                    sources.push({url: href, title: text.substring(0, 200).trim()});
                                }
                            }
                            return sources;
                        }
                    """)
                    sources = links if links else []
                    log(f"Found {len(sources)} source URLs", log_file)
                    page.keyboard.press("Escape")  # Close dropdown
                except Exception as src_err:
                    log(f"Source extraction error: {src_err}", log_file)

                # Save sources JSON
                if sources:
                    sources_file = OUTPUT_DIR / f"{slug}-sources.json"
                    sources_data = {
                        "topic": job.get("topic", slug),
                        "chat_url": chat_url,
                        "harvested_at": datetime.now().isoformat(),
                        "sources": sources
                    }
                    sources_file.write_text(json.dumps(sources_data, indent=2))
                    log(f"Sources saved: {sources_file}", log_file)

                # Determine completion status based on content quality
                if len(response_text) > 2000:
                    job["status"] = "completed"
                    job["completed"] = datetime.now().isoformat()
                    job["output_md"] = str(md_file)
                    if sources:
                        job["output_sources"] = str(sources_file)
                    log("Research harvested successfully!", log_file)
                    
                    # Try to extract verdict from content
                    verdict_match = re.search(r'Verdict[:\s]*(TRUE|FALSE|MIXED|UNVERIFIED)', response_text, re.IGNORECASE)
                    if verdict_match:
                        job["verdict"] = verdict_match.group(1).upper()
                        log(f"Verdict: {job['verdict']}", log_file)
                else:
                    log("WARNING: Response too short, marking for review", log_file)
                    job["status"] = "needs_review"

                job["harvested"] = datetime.now().isoformat()
                job_path.write_text(json.dumps(job, indent=2))

                page.screenshot(path=str(LOGS_DIR / f"{today}-{slug}-harvest-final.png"), full_page=True)

                log("=" * 60, log_file)
                log(f"PHASE 2 COMPLETE - Status: {job['status']}", log_file)
                log("=" * 60, log_file)

            except Exception as e:
                log(f"ERROR: {e}", log_file)
                job["status"] = "harvest_failed"
                job_path.write_text(json.dumps(job, indent=2))

            finally:
                context.close()

    return True


def main():
    parser = argparse.ArgumentParser(description="GenuVerity Gemini Deep Research (Two-Phase)")
    parser.add_argument("--topic", "-t", help="Research topic")
    parser.add_argument("--template", default="default", help="Template ID")
    parser.add_argument("--from-queue", action="store_true", help="Pull from queue")
    parser.add_argument("--headless", action="store_true", help="No browser window")

    # Phase control
    parser.add_argument("--harvest", action="store_true", help="Run Phase 2 (harvest results)")
    parser.add_argument("--job", help="Specific job file for harvest")
    parser.add_argument("--auto", action="store_true", help="Full auto: submit, wait 25min, harvest")

    # Info
    parser.add_argument("--list-jobs", action="store_true", help="List all jobs")

    args = parser.parse_args()
    setup_dirs()

    if args.list_jobs:
        print("\nJobs:")
        print("-" * 70)
        for job_file in sorted(OUTPUT_DIR.glob("*-job.json")):
            job = json.loads(job_file.read_text())
            print(f"  {job.get('status', '?'):12} {job.get('slug', '?')[:40]}")
        return

    if args.harvest:
        job_path = Path(args.job) if args.job else None
        run_phase2(job_file=job_path, headless=args.headless)
        return

    # Phase 1
    topic = None
    topic_slug = None
    template_id = args.template

    if args.from_queue:
        topic_data = get_topic_from_queue()
        if not topic_data:
            print("No pending topics in queue")
            return
        topic = topic_data["name"]
        topic_slug = topic_data["slug"]
        template_id = topic_data.get("template", "default")
        update_queue_status(topic_slug, "processing")
    elif args.topic:
        topic = args.topic
    else:
        parser.print_help()
        return

    job_file = run_phase1(topic, template_id, args.headless)

    if job_file:
        if topic_slug:
            job = json.loads(job_file.read_text())
            update_queue_status(topic_slug, "researching", job.get("chat_url"))

        if args.auto:
            print("\n" + "=" * 60)
            print("AUTO MODE: Waiting 25 minutes for research to complete...")
            print("=" * 60)
            sleep(25 * 60)  # Wait 25 minutes
            run_phase2(job_file=job_file, headless=args.headless)

    elif topic_slug:
        update_queue_status(topic_slug, "failed")


if __name__ == "__main__":
    main()
