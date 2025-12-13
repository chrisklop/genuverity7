#!/usr/bin/env python3
"""
Migration script to add Gemini infographics to all cached articles.
This script:
1. Fetches all cached articles from Vercel Blob storage
2. For each article with chartConfigs but no _infographics:
   - Generates infographics using Gemini 3 Pro Image Preview
   - Updates the cached article with the infographics
3. Re-uploads the updated article to Blob storage

Usage:
    python scripts/migrate_infographics.py [--dry-run] [--limit N]
"""

import os
import sys
import json
import time
import base64
import hashlib
import argparse
import requests
from typing import Optional, Dict, Any

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Configuration
BLOB_READ_WRITE_TOKEN = os.environ.get("BLOB_READ_WRITE_TOKEN")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models"
GEMINI_IMAGE_MODEL = "gemini-3-pro-image-preview"

# GenuVerity Midnight Tech Style
INFOGRAPHIC_STYLE = """
VISUAL STYLE: "MIDNIGHT TECH"
- Background: Deep gradient from #050505 (near black) to #0a0a1a (dark blue-black)
- Primary accent: Electric blue (#3b82f6) for key data elements
- Secondary accents: Cyan (#06b6d4), Purple (#8b5cf6)
- Grid/lines: Very subtle dark blue (#1a1a3e) with slight glow
- Text: Crisp white (#ffffff) for values, light gray (#a0a0b0) for labels
- Effects: Subtle blue glow on key elements, sleek futuristic feel
- Chart style: Clean geometric shapes, glowing edges, tech-forward
- Overall mood: High-tech data dashboard, investigative journalism

BRANDING REQUIREMENT (MANDATORY):
In the bottom-left corner of the image, include the text logo "GenuVerity" where:
- "Genu" is in WHITE color (#FFFFFF)
- "Verity" is in BLUE color (#3b82f6)
- Font should be clean, modern sans-serif
- Size: Medium-small, professional watermark style
- Position: Bottom-left corner with small padding from edges
"""


def get_topic_hash(topic: str) -> str:
    """Generate a hash for a topic string."""
    return hashlib.sha256(topic.encode()).hexdigest()[:16]


def blob_list() -> list:
    """List all blobs in storage."""
    if not BLOB_READ_WRITE_TOKEN:
        print("ERROR: BLOB_READ_WRITE_TOKEN not set")
        return []

    try:
        response = requests.get(
            "https://blob.vercel-storage.com",
            headers={"Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}"},
            params={"limit": 1000}
        )
        if response.status_code == 200:
            data = response.json()
            return data.get("blobs", [])
        else:
            print(f"Blob list error: {response.status_code} - {response.text[:200]}")
            return []
    except Exception as e:
        print(f"Blob list exception: {e}")
        return []


def blob_get(url: str) -> Optional[dict]:
    """Fetch a blob's content."""
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        return None
    except Exception as e:
        print(f"Blob get error: {e}")
        return None


def blob_put(path: str, content: str) -> Optional[str]:
    """Upload content to Vercel Blob Storage."""
    if not BLOB_READ_WRITE_TOKEN:
        return None

    try:
        response = requests.put(
            f"https://blob.vercel-storage.com/{path}",
            headers={
                "Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}",
                "Content-Type": "application/json",
                "x-api-version": "7"
            },
            data=content
        )
        if response.status_code in [200, 201]:
            return response.json().get("url")
        else:
            print(f"Blob put error: {response.status_code} - {response.text[:200]}")
            return None
    except Exception as e:
        print(f"Blob put exception: {e}")
        return None


def generate_gemini_infographic(chart_config: dict, title: str, chart_id: str) -> Optional[str]:
    """Generate an infographic using Gemini 3 Pro Image Preview."""
    if not GEMINI_API_KEY:
        print("ERROR: GEMINI_API_KEY not set")
        return None

    chart_type = chart_config.get("type", "bar")
    data = chart_config.get("data", {})
    chart_title = chart_config.get("title", title)
    labels = data.get("labels", [])
    values = data.get("values", [])
    colors = data.get("colors", ["#3b82f6"])

    # Build data description
    data_points = []
    for i, (label, value) in enumerate(zip(labels, values)):
        color = colors[i % len(colors)] if colors else "#3b82f6"
        data_points.append(f"- {label}: {value} (color: {color})")
    data_description = "\n".join(data_points)

    prompt = f"""Generate a professional data visualization infographic.

{INFOGRAPHIC_STYLE}

CHART SPECIFICATIONS:
- Chart Type: {chart_type.upper()} CHART
- Title: "{chart_title}"
- Data Points:
{data_description}

REQUIREMENTS:
1. Create a visually striking {chart_type} chart/graph
2. Use the exact colors specified for each data point
3. Include clear labels and values
4. Add the title prominently at the top
5. Follow the Midnight Tech style guide exactly
6. Size: 800x500 pixels

Generate the infographic image now."""

    max_retries = 3
    for attempt in range(max_retries):
        try:
            print(f"    Generating {chart_id} (attempt {attempt + 1}/{max_retries})...")

            response = requests.post(
                f"{GEMINI_API_URL}/{GEMINI_IMAGE_MODEL}:generateContent?key={GEMINI_API_KEY}",
                headers={"Content-Type": "application/json"},
                json={
                    "contents": [{
                        "role": "user",
                        "parts": [{"text": prompt}]
                    }],
                    "generationConfig": {
                        "responseModalities": ["TEXT", "IMAGE"],
                        "temperature": 0.4
                    }
                },
                timeout=120
            )

            if response.status_code == 200:
                result = response.json()
                candidates = result.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    for part in parts:
                        if "inlineData" in part:
                            image_data = part["inlineData"].get("data")
                            mime_type = part["inlineData"].get("mimeType", "image/png")
                            if image_data:
                                print(f"    ✓ Generated {chart_id}")
                                return f"data:{mime_type};base64,{image_data}"
                print(f"    No image in response for {chart_id}")
            elif response.status_code == 429:
                print(f"    Rate limited, waiting 30s...")
                time.sleep(30)
                continue
            else:
                print(f"    API error ({response.status_code}): {response.text[:100]}")

        except Exception as e:
            print(f"    Exception: {e}")

        time.sleep(5)

    return None


def process_article(blob: dict, dry_run: bool = False) -> bool:
    """Process a single article, adding infographics if needed."""
    pathname = blob.get("pathname", "")
    url = blob.get("url", "")

    if not pathname.startswith("articles/"):
        return False

    print(f"\nProcessing: {pathname}")

    # Fetch article content
    article = blob_get(url)
    if not article:
        print(f"  Could not fetch article")
        return False

    title = article.get("title", "Unknown")
    chart_configs = article.get("chartConfigs", {})
    existing_infographics = article.get("_infographics", {})

    print(f"  Title: {title[:60]}...")
    print(f"  Charts: {len(chart_configs)}, Existing infographics: {len(existing_infographics)}")

    if not chart_configs:
        print(f"  No chartConfigs, skipping")
        return False

    # Check if all infographics already exist
    missing_charts = [k for k in chart_configs.keys() if k not in existing_infographics]
    if not missing_charts:
        print(f"  All infographics already exist, skipping")
        return False

    print(f"  Missing infographics: {missing_charts}")

    if dry_run:
        print(f"  [DRY RUN] Would generate {len(missing_charts)} infographics")
        return True

    # Generate missing infographics
    new_infographics = dict(existing_infographics)
    for chart_id in missing_charts:
        config = chart_configs[chart_id]
        image_data = generate_gemini_infographic(config, title, chart_id)
        if image_data:
            new_infographics[chart_id] = image_data
        time.sleep(2)  # Rate limiting between charts

    if len(new_infographics) > len(existing_infographics):
        # Update article with new infographics
        article["_infographics"] = new_infographics
        article["_infographics_updated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ")

        # Re-upload to blob storage
        result = blob_put(pathname, json.dumps(article))
        if result:
            print(f"  ✓ Updated article with {len(new_infographics)} infographics")
            return True
        else:
            print(f"  ✗ Failed to update article")
            return False

    return False


def main():
    parser = argparse.ArgumentParser(description="Migrate infographics to cached articles")
    parser.add_argument("--dry-run", action="store_true", help="Don't actually make changes")
    parser.add_argument("--limit", type=int, default=0, help="Limit number of articles to process")
    parser.add_argument("--gemini-key", type=str, help="Gemini API key (overrides env var)")
    args = parser.parse_args()

    global GEMINI_API_KEY
    if args.gemini_key:
        GEMINI_API_KEY = args.gemini_key

    print("=" * 60)
    print("GenuVerity Infographic Migration Script")
    print("=" * 60)

    if not BLOB_READ_WRITE_TOKEN:
        print("\nERROR: BLOB_READ_WRITE_TOKEN environment variable not set")
        print("Set it with: export BLOB_READ_WRITE_TOKEN='your_token'")
        sys.exit(1)

    if not GEMINI_API_KEY:
        print("\nERROR: GEMINI_API_KEY environment variable not set")
        print("Set it with: export GEMINI_API_KEY='your_key'")
        sys.exit(1)

    if args.dry_run:
        print("\n[DRY RUN MODE - No changes will be made]")

    # List all blobs
    print("\nFetching blob list...")
    blobs = blob_list()
    article_blobs = [b for b in blobs if b.get("pathname", "").startswith("articles/")]
    print(f"Found {len(article_blobs)} cached articles")

    if args.limit > 0:
        article_blobs = article_blobs[:args.limit]
        print(f"Limiting to {args.limit} articles")

    # Process each article
    updated = 0
    failed = 0
    skipped = 0

    for blob in article_blobs:
        try:
            result = process_article(blob, args.dry_run)
            if result:
                updated += 1
            else:
                skipped += 1
        except Exception as e:
            print(f"  ERROR: {e}")
            failed += 1

        # Rate limiting between articles
        time.sleep(3)

    print("\n" + "=" * 60)
    print("Migration Complete")
    print("=" * 60)
    print(f"Updated: {updated}")
    print(f"Skipped: {skipped}")
    print(f"Failed: {failed}")


if __name__ == "__main__":
    main()
