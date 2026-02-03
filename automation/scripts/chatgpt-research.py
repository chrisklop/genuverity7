#!/usr/bin/env python3
"""
GenuVerity: ChatGPT Deep Research Automation

Uses ChatGPT Plus with Search/Browse for deep research.
Primary provider - Gemini as fallback.

Usage:
    python3 chatgpt-research.py --from-queue
    python3 chatgpt-research.py --topic "Topic to research"
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
    print("ERROR: Playwright not installed")
    sys.exit(1)

# Paths
GENUVERITY_ROOT = Path.home() / "GenuVerity7"
AUTOMATION_DIR = GENUVERITY_ROOT / "automation"
PROMPTS_DIR = AUTOMATION_DIR / "prompts"
OUTPUT_DIR = AUTOMATION_DIR / "output"
LOGS_DIR = AUTOMATION_DIR / "logs"
QUEUE_FILE = AUTOMATION_DIR / "topics-queue.json"

# Chrome for Claude profile
CHROME_FOR_CLAUDE = Path.home() / "Library/Application Support/Google/Chrome for Claude"

CHATGPT_URL = "https://chatgpt.com"
DEEP_RESEARCH_URL = "https://chatgpt.com/features/deep-research/"


def setup_dirs():
    for d in [OUTPUT_DIR, LOGS_DIR, PROMPTS_DIR]:
        d.mkdir(parents=True, exist_ok=True)


def log(msg: str, log_file: Path = None):
    timestamp = datetime.now().strftime("%H:%M:%S")
    line = f"[{timestamp}] {msg}"
    print(line)
    if log_file:
        with open(log_file, "a") as f:
            f.write(line + "\n")


def load_template(template_id: str) -> str:
    template_file = PROMPTS_DIR / f"{template_id}.md"
    if not template_file.exists():
        template_file = PROMPTS_DIR / "default.md"
    if not template_file.exists():
        return "Research topic: {topic}\n\nProvide comprehensive analysis with sources."
    
    content = template_file.read_text()
    if "---" in content:
        parts = content.split("---", 2)
        if len(parts) >= 3:
            content = parts[2].strip()
    return content


def get_topic_from_queue() -> dict | None:
    if not QUEUE_FILE.exists():
        return None
    queue = json.loads(QUEUE_FILE.read_text())
    for topic in queue.get("topics", []):
        if topic.get("status") == "pending":
            return topic
    return None


def update_queue_status(slug: str, status: str, chat_url: str = None):
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
    slug = re.sub(r'[^a-z0-9]+', '-', topic.lower())[:40]
    date_suffix = datetime.now().strftime("%Y%m%d")
    return f"{slug}-{date_suffix}"


def run_chatgpt_research(topic: str, template_id: str = "default", headless: bool = False) -> bool:
    """
    Run ChatGPT research - single phase (no waiting needed like Gemini).
    """
    today = datetime.now().strftime("%Y-%m-%d")
    slug = generate_slug(topic)
    log_file = LOGS_DIR / f"{today}-chatgpt-{slug}.log"
    
    log("=" * 60, log_file)
    log("ChatGPT Deep Research", log_file)
    log(f"Topic: {topic}", log_file)
    log(f"Template: {template_id}", log_file)
    log(f"Slug: {slug}", log_file)
    log("=" * 60, log_file)
    
    # Build prompt
    template = load_template(template_id)
    prompt = template.format(topic=topic, slug=slug, today=today)
    
    with sync_playwright() as p:
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(CHROME_FOR_CLAUDE),
            channel="chrome",
            headless=headless,
            args=["--disable-blink-features=AutomationControlled"],
            viewport={"width": 1280, "height": 900}
        )
        
        page = context.pages[0] if context.pages else context.new_page()
        
        try:
            # Navigate to Deep Research feature page first
            log("Navigating to Deep Research page...", log_file)
            page.goto(DEEP_RESEARCH_URL, wait_until="domcontentloaded", timeout=30000)
            sleep(3)

            # Click "Try now" to enter Deep Research mode
            log("Clicking 'Try now' to enable Deep Research...", log_file)
            try:
                try_now = page.locator('a:has-text("Try now"), button:has-text("Try now")').first
                if try_now.count() > 0:
                    try_now.click()
                    sleep(3)
                    log("Entered Deep Research mode", log_file)
                else:
                    # Maybe already at the interface - go to main page
                    log("'Try now' not found, navigating to main...", log_file)
                    page.goto(CHATGPT_URL, wait_until="domcontentloaded", timeout=30000)
                    sleep(3)
            except Exception as e:
                log(f"Try now click error: {e}", log_file)
                page.goto(CHATGPT_URL, wait_until="domcontentloaded", timeout=30000)
                sleep(3)

            # Check if logged in
            if page.locator('button:has-text("Log in")').count() > 0:
                log("ERROR: Not logged in to ChatGPT", log_file)
                return False

            log("Logged in!", log_file)
            page.screenshot(path=str(LOGS_DIR / f"{today}-chatgpt-{slug}-01.png"))
            
            # Find and fill the input
            log("Entering prompt...", log_file)
            input_selectors = [
                '#prompt-textarea',
                'textarea[placeholder*="detailed report"]',
                'textarea[placeholder*="Ask"]',
                'textarea[placeholder*="working on"]',
                'textarea',
                '[contenteditable="true"]'
            ]
            
            input_area = None
            for selector in input_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.count() > 0 and elem.is_visible():
                        input_area = elem
                        break
                except:
                    continue
            
            if not input_area:
                log("ERROR: Could not find input area", log_file)
                return False
            
            input_area.click()
            sleep(0.5)

            # Type the prompt using keyboard (fill may not work with ChatGPT's React state)
            try:
                input_area.fill(prompt)
            except:
                pass
            # Also type it to ensure React state updates
            page.keyboard.type(prompt, delay=10)
            sleep(1)
            
            page.screenshot(path=str(LOGS_DIR / f"{today}-chatgpt-{slug}-02-prompt.png"))
            
            # Verify Deep Research mode is active (should be from navigation)
            log("Verifying Deep Research mode...", log_file)
            try:
                # Check if "Deep research" indicator is visible
                dr_indicator = page.locator(':text("Deep research")').first
                if dr_indicator.count() > 0:
                    log("Deep Research mode confirmed", log_file)
                else:
                    # Try clicking the + menu to enable Deep Research
                    plus_btn = page.locator('[aria-label*="Add files"], button:has(svg):near(textarea)').first
                    if plus_btn.count() > 0 and plus_btn.is_visible():
                        plus_btn.click()
                        sleep(1)
                        dr_opt = page.locator(':text("Deep research")').first
                        if dr_opt.count() > 0:
                            dr_opt.click()
                            log("Deep Research enabled via menu", log_file)
                        sleep(1)
            except Exception as e:
                log(f"Deep Research verify warning: {e}", log_file)
            
            # Submit - click the send button (black circle with arrow)
            log("Submitting...", log_file)
            sleep(1)
            try:
                # Try multiple selectors for send button
                send_selectors = [
                    'button[data-testid="send-button"]',
                    'button[aria-label="Send prompt"]',
                    'button:has(svg[class*="icon"])',
                    'form button[type="submit"]',
                ]
                sent = False
                for sel in send_selectors:
                    try:
                        btn = page.locator(sel).first
                        if btn.count() > 0 and btn.is_visible():
                            btn.click()
                            sent = True
                            log(f"Clicked send via: {sel}", log_file)
                            break
                    except:
                        continue
                
                if not sent:
                    # Fallback: use keyboard shortcut
                    page.keyboard.press("Control+Enter")
                    log("Sent via Ctrl+Enter", log_file)
            except Exception as e:
                log(f"Send error: {e}, trying Enter", log_file)
                page.keyboard.press("Enter")
            
            sleep(5)

            # Check for and click "Start" button if Deep Research shows a plan
            log("Checking for Deep Research plan...", log_file)
            try:
                start_btn = page.locator('button:has-text("Start")').first
                if start_btn.count() > 0 and start_btn.is_visible():
                    log("Found research plan - clicking Start...", log_file)
                    start_btn.click()
                    sleep(3)
            except:
                log("No Start button found - research may have auto-started", log_file)

            # Get chat URL
            chat_url = page.url
            log(f"Chat URL: {chat_url}", log_file)

            # Wait for Deep Research to complete (can take 5-30 minutes)
            log("Waiting for Deep Research to complete...", log_file)
            max_wait = 2400  # 40 minutes max for Deep Research
            for waited in range(0, max_wait, 30):
                sleep(30)

                # Check for "Researching..." indicator (Deep Research active)
                researching = page.locator(':text("Researching...")').first
                stop_btn = page.locator('button[aria-label*="Stop"], button:has-text("Stop")')

                # Check if Deep Research is still running
                is_researching = researching.count() > 0 or (stop_btn.count() > 0 and stop_btn.first.is_visible())

                if not is_researching:
                    log(f"Deep Research complete after {waited + 30}s", log_file)
                    break

                # Log progress every minute
                if waited % 60 == 0:
                    log(f"Deep Research in progress... ({waited + 30}s / ~30min expected)", log_file)
                    page.screenshot(path=str(LOGS_DIR / f"{today}-chatgpt-{slug}-progress-{waited}.png"))

                if waited >= max_wait - 30:
                    log("WARNING: Timeout waiting for Deep Research", log_file)
            
            sleep(3)  # Let rendering finish
            page.screenshot(path=str(LOGS_DIR / f"{today}-chatgpt-{slug}-03-complete.png"))
            
            # Extract response
            log("Extracting response...", log_file)
            response_text = ""
            
            # Try to get the assistant's response
            response_selectors = [
                '[data-message-author-role="assistant"]',
                '.markdown',
                '.prose',
                '[class*="agent-turn"]'
            ]
            
            for selector in response_selectors:
                try:
                    elements = page.locator(selector)
                    if elements.count() > 0:
                        # Get the last (most recent) response
                        response_text = elements.last.inner_text()
                        if len(response_text) > 500:
                            log(f"Found response with {len(response_text)} chars", log_file)
                            break
                except:
                    continue
            
            if len(response_text) < 100:
                log("WARNING: Response too short, trying full page scrape", log_file)
                response_text = page.locator('main').inner_text()
            
            # Extract source URLs
            log("Extracting sources...", log_file)
            sources = []
            try:
                links = page.evaluate("""
                    () => {
                        const links = document.querySelectorAll('a[href]');
                        const sources = [];
                        for (const link of links) {
                            const href = link.href;
                            const text = link.innerText || '';
                            if (href && !href.includes('chatgpt.com') && 
                                !href.includes('openai.com') &&
                                (href.startsWith('http://') || href.startsWith('https://'))) {
                                sources.push({url: href, title: text.substring(0, 200).trim()});
                            }
                        }
                        return sources;
                    }
                """)
                sources = links if links else []
                log(f"Found {len(sources)} sources", log_file)
            except Exception as e:
                log(f"Source extraction error: {e}", log_file)
            
            # Save outputs
            md_file = OUTPUT_DIR / f"{slug}.md"
            md_file.write_text(response_text)
            log(f"Saved: {md_file} ({len(response_text)} chars)", log_file)
            
            if sources:
                sources_file = OUTPUT_DIR / f"{slug}-sources.json"
                sources_data = {
                    "topic": topic,
                    "provider": "chatgpt",
                    "chat_url": chat_url,
                    "harvested_at": datetime.now().isoformat(),
                    "sources": sources
                }
                sources_file.write_text(json.dumps(sources_data, indent=2))
                log(f"Sources saved: {sources_file}", log_file)
            
            # Save job file
            job_file = OUTPUT_DIR / f"{slug}-job.json"
            job_data = {
                "slug": slug,
                "topic": topic,
                "template": template_id,
                "provider": "chatgpt",
                "started": datetime.now().isoformat(),
                "chat_url": chat_url,
                "status": "completed" if len(response_text) > 2000 else "needs_review",
                "output_md": str(md_file),
                "chars": len(response_text)
            }
            
            # Try to extract verdict
            verdict_match = re.search(r'Verdict[:\s]*(TRUE|FALSE|MIXED|UNVERIFIED)', response_text, re.IGNORECASE)
            if verdict_match:
                job_data["verdict"] = verdict_match.group(1).upper()
                log(f"Verdict: {job_data['verdict']}", log_file)
            
            job_file.write_text(json.dumps(job_data, indent=2))
            
            log("=" * 60, log_file)
            log(f"COMPLETE - Status: {job_data['status']}", log_file)
            log(f"Output: {md_file}", log_file)
            log("=" * 60, log_file)
            
            return True
            
        except Exception as e:
            log(f"ERROR: {e}", log_file)
            page.screenshot(path=str(LOGS_DIR / f"{today}-chatgpt-{slug}-error.png"))
            return False
            
        finally:
            context.close()


def main():
    parser = argparse.ArgumentParser(description="GenuVerity ChatGPT Research")
    parser.add_argument("--topic", "-t", help="Research topic")
    parser.add_argument("--template", default="default", help="Template ID")
    parser.add_argument("--from-queue", action="store_true", help="Pull from queue")
    parser.add_argument("--headless", action="store_true", help="No browser window")
    
    args = parser.parse_args()
    setup_dirs()
    
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
    
    success = run_chatgpt_research(topic, template_id, args.headless)
    
    if success and topic_slug:
        update_queue_status(topic_slug, "completed")
    elif topic_slug:
        update_queue_status(topic_slug, "failed")


if __name__ == "__main__":
    main()
