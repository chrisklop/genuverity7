#!/usr/bin/env python3
"""
GenuVerity: Claude PASS 1 - Browser Automation

Uses Claude.ai (subscription) to extract structured JSON from research.
This is PASS 1 of the report pipeline - no API keys needed.

Usage:
    python3 claude-pass1.py --slug flat-earth-resurgence-feb-2026
"""

import argparse
import json
import re
import sys
from datetime import datetime
from pathlib import Path
from time import sleep

try:
    from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
except ImportError:
    print("ERROR: Playwright not installed. Run: pip install playwright && playwright install")
    sys.exit(1)

# Paths
GENUVERITY_ROOT = Path.home() / "GenuVerity7"
AUTOMATION_DIR = GENUVERITY_ROOT / "automation"
OUTPUT_DIR = AUTOMATION_DIR / "output"
LOGS_DIR = AUTOMATION_DIR / "logs"
PROMPTS_DIR = AUTOMATION_DIR / "prompts"

# Chrome profile (same as ChatGPT - should have Claude logged in)
CHROME_FOR_CLAUDE = Path.home() / "Library/Application Support/Google/Chrome for Claude"

CLAUDE_URL = "https://claude.ai/new"


def log(msg: str, log_file: Path = None):
    timestamp = datetime.now().strftime("%H:%M:%S")
    line = f"[{timestamp}] {msg}"
    print(line)
    if log_file:
        with open(log_file, "a") as f:
            f.write(line + "\n")


def load_research(slug: str) -> dict:
    """Load research output for a given slug."""
    md_file = OUTPUT_DIR / f"{slug}.md"
    job_file = OUTPUT_DIR / f"{slug}-job.json"

    if not md_file.exists():
        return None

    return {
        "slug": slug,
        "content": md_file.read_text(),
        "job": json.loads(job_file.read_text()) if job_file.exists() else {}
    }


def build_pass1_prompt(research: dict) -> str:
    """Build the PASS 1 prompt for Claude."""
    topic = research.get("job", {}).get("topic", "Unknown Topic")
    content = research.get("content", "")

    # Truncate if too long (Claude can handle ~100k tokens but let's be safe)
    if len(content) > 80000:
        content = content[:80000] + "\n\n[CONTENT TRUNCATED]"

    prompt = f"""You are doing PASS 1 of the GenuVerity report pipeline.

Convert this research into structured JSON format. Output ONLY valid JSON - no markdown code fences, no explanation, no commentary. Just the raw JSON.

Required JSON schema:
{{
  "meta": {{
    "title": "Short punchy title (5-8 words)",
    "subtitle": "One-line explanation of what this report covers",
    "category": "DEEP DIVE DOSSIER",
    "subcategory": "FORENSIC AUDIT",
    "read_time": 12,
    "slug": "{research['slug']}"
  }},
  "executive_summary": "2-3 sentences capturing the key finding. No citations here.",
  "verdict": {{
    "label": "TRUE | FALSE | MIXED | UNVERIFIED | MISLEADING",
    "class": "true | false | mixed",
    "explanation": "One sentence explaining the verdict"
  }},
  "sections": [
    {{
      "number": 1,
      "title": "Section Title",
      "content": [
        {{"type": "paragraph", "text": "Paragraph text with [N] citation markers inline."}},
        {{"type": "list", "items": [{{"title": "Point Title", "text": "Point explanation [N]"}}]}},
        {{"type": "alert", "color": "red | amber | green | blue", "title": "Alert Title", "text": "Alert content"}}
      ]
    }}
  ],
  "sources": [
    {{"n": 1, "title": "Short descriptive title", "publisher": "Organization name", "url": "https://...", "type": "primary | secondary | tertiary"}}
  ]
}}

CRITICAL RULES:
1. Output ONLY the JSON - nothing else
2. Citation numbers [N] MUST match source array indices
3. Every factual claim needs a citation
4. NO Wikipedia - find primary sources
5. Maximum 10 sections
6. Include ALL sources from research (don't truncate)

TOPIC: {topic}

RESEARCH CONTENT:
{content}

Remember: Output ONLY valid JSON, nothing else."""

    return prompt


def run_claude_pass1(slug: str, headless: bool = False) -> bool:
    """Run PASS 1 via Claude.ai browser automation."""
    today = datetime.now().strftime("%Y-%m-%d")
    log_file = LOGS_DIR / f"{today}-claude-pass1-{slug}.log"

    # Load research
    research = load_research(slug)
    if not research:
        log(f"ERROR: Research not found for slug: {slug}", log_file)
        return False

    log("=" * 60, log_file)
    log("Claude PASS 1: JSON Extraction", log_file)
    log(f"Slug: {slug}", log_file)
    log(f"Content length: {len(research['content']):,} chars", log_file)
    log("=" * 60, log_file)

    prompt = build_pass1_prompt(research)

    with sync_playwright() as p:
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(CHROME_FOR_CLAUDE),
            channel="chrome",
            headless=headless,
            args=["--disable-blink-features=AutomationControlled"],
            viewport={"width": 1400, "height": 900}
        )

        page = context.pages[0] if context.pages else context.new_page()

        try:
            log("Navigating to Claude.ai...", log_file)
            page.goto(CLAUDE_URL, wait_until="domcontentloaded", timeout=30000)
            sleep(3)

            # Check if logged in
            if page.locator('button:has-text("Sign in"), button:has-text("Log in")').count() > 0:
                log("ERROR: Not logged in to Claude.ai", log_file)
                return False

            log("Logged in to Claude!", log_file)
            page.screenshot(path=str(LOGS_DIR / f"{today}-claude-{slug}-01.png"))

            # Find the input area
            log("Finding input area...", log_file)
            input_selectors = [
                '[contenteditable="true"]',
                'div[data-placeholder]',
                '.ProseMirror',
                'textarea'
            ]

            input_area = None
            for selector in input_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.count() > 0 and elem.is_visible():
                        input_area = elem
                        log(f"Found input via: {selector}", log_file)
                        break
                except:
                    continue

            if not input_area:
                log("ERROR: Could not find input area", log_file)
                return False

            # Click and type the prompt
            log("Entering PASS 1 prompt...", log_file)
            input_area.click()
            sleep(0.5)

            # Type the prompt (Claude uses contenteditable, so we need keyboard input)
            page.keyboard.type(prompt, delay=5)  # Slow typing to avoid issues
            sleep(2)

            page.screenshot(path=str(LOGS_DIR / f"{today}-claude-{slug}-02-prompt.png"))

            # Submit
            log("Submitting to Claude...", log_file)

            # Try send button first
            send_selectors = [
                'button[aria-label*="Send"]',
                'button:has-text("Send")',
                'button[type="submit"]'
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
                # Fallback to Enter key
                page.keyboard.press("Enter")
                log("Sent via Enter key", log_file)

            sleep(5)

            # Wait for response
            log("Waiting for Claude response...", log_file)
            max_wait = 300  # 5 minutes max

            for waited in range(0, max_wait, 10):
                sleep(10)

                # Check if still generating (look for stop button or typing indicator)
                stop_btn = page.locator('button[aria-label*="Stop"], button:has-text("Stop")').first

                if stop_btn.count() == 0 or not stop_btn.is_visible():
                    log(f"Response complete after {waited + 10}s", log_file)
                    break

                log(f"Claude generating... ({waited + 10}s)", log_file)

            sleep(3)
            page.screenshot(path=str(LOGS_DIR / f"{today}-claude-{slug}-03-response.png"))

            # Extract the JSON response
            log("Extracting JSON response...", log_file)

            response_text = ""
            response_selectors = [
                '[data-message-author-role="assistant"]',
                '.prose',
                '.markdown',
                'article'
            ]

            for selector in response_selectors:
                try:
                    elements = page.locator(selector)
                    if elements.count() > 0:
                        response_text = elements.last.inner_text()
                        if len(response_text) > 500:
                            log(f"Found response: {len(response_text)} chars", log_file)
                            break
                except:
                    continue

            if len(response_text) < 100:
                log("WARNING: Response too short", log_file)
                return False

            # Parse JSON from response
            log("Parsing JSON...", log_file)

            # Try to extract JSON from response
            json_match = re.search(r'\{[\s\S]*\}', response_text)
            if not json_match:
                log("ERROR: No JSON found in response", log_file)
                log(f"Response preview: {response_text[:500]}", log_file)
                return False

            try:
                json_data = json.loads(json_match.group())
                log("JSON parsed successfully!", log_file)
            except json.JSONDecodeError as e:
                log(f"JSON parse error: {e}", log_file)
                return False

            # Save the JSON
            json_file = OUTPUT_DIR / f"{slug}.json"
            json_file.write_text(json.dumps(json_data, indent=2))
            log(f"Saved JSON: {json_file}", log_file)

            # Update job file
            job_file = OUTPUT_DIR / f"{slug}-job.json"
            if job_file.exists():
                job = json.loads(job_file.read_text())
                job["pass1_complete"] = True
                job["pass1_date"] = datetime.now().isoformat()
                job["json_file"] = str(json_file)
                job_file.write_text(json.dumps(job, indent=2))

            log("=" * 60, log_file)
            log("PASS 1 COMPLETE", log_file)
            log(f"JSON saved to: {json_file}", log_file)
            log("=" * 60, log_file)

            return True

        except Exception as e:
            log(f"ERROR: {e}", log_file)
            page.screenshot(path=str(LOGS_DIR / f"{today}-claude-{slug}-error.png"))
            return False

        finally:
            context.close()


def main():
    parser = argparse.ArgumentParser(description="Claude PASS 1 - JSON Extraction")
    parser.add_argument("--slug", "-s", required=True, help="Research slug to process")
    parser.add_argument("--headless", action="store_true", help="Run headless")

    args = parser.parse_args()

    LOGS_DIR.mkdir(parents=True, exist_ok=True)

    success = run_claude_pass1(args.slug, args.headless)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
