#!/usr/bin/env python3
"""
Migrate static articles from index.html to Vercel Blob storage.

This script:
1. Reads the static 'reports' object from index.html
2. Converts each article to the proper JSON format
3. Uploads to Vercel Blob storage
4. Updates the article index

Run with: python3 scripts/migrate_static_articles.py
Requires: BLOB_READ_WRITE_TOKEN environment variable
"""

import os
import json
import re
import sys
import requests
from datetime import datetime

# Vercel Blob Storage configuration
BLOB_READ_WRITE_TOKEN = os.getenv("BLOB_READ_WRITE_TOKEN")
BLOB_API_BASE = "https://blob.vercel-storage.com"
ARTICLE_INDEX_PATH = "articles/_index.json"

# Static articles to migrate (key -> topic mapping for metadata)
STATIC_ARTICLES = {
    'ai_bubble': 'The $8 Trillion Question: Is AI the Next Railroad or the Next Enron?',
    'congress_trading': 'The Congressional Alpha: Inside the Trading Floor of the Capitol',
    'political_grift': 'Political Grift Investigation',
    'energy_crisis': 'Energy Crisis Investigation',
    'regulatory_capture': 'Regulatory Capture Investigation',
    'semiconductor_wars': 'The Semiconductor Wars: How America Lost the Chip Race',
    'intel_collapse_deep_dive': 'Intel Collapse Deep Dive',
    'plastic_bottles_bpa_toxins_bodies': 'The Invisible Invasion: How Plastic Bottles Are Poisoning Our Bodies From Within',
}

def blob_put(path: str, content: str) -> str:
    """Upload content to Vercel Blob Storage. Returns blob URL on success."""
    if not BLOB_READ_WRITE_TOKEN:
        print("ERROR: BLOB_READ_WRITE_TOKEN not set")
        sys.exit(1)

    try:
        response = requests.put(
            f"{BLOB_API_BASE}/{path}",
            headers={
                "Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}",
                "Content-Type": "application/json",
                "x-api-version": "7"
            },
            data=content,
            params={"access": "public"}
        )
        if response.status_code == 200:
            result = response.json()
            print(f"  Uploaded: {path} -> {result.get('url', 'unknown')}")
            return result.get("url")
        else:
            print(f"  ERROR: Blob PUT failed ({response.status_code}): {response.text}")
            return None
    except Exception as e:
        print(f"  ERROR: Blob PUT error: {e}")
        return None

def blob_get(path: str) -> dict:
    """Get content from Vercel Blob Storage."""
    if not BLOB_READ_WRITE_TOKEN:
        return None

    try:
        # First get the blob URL
        response = requests.get(
            f"{BLOB_API_BASE}",
            headers={
                "Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}",
                "x-api-version": "7"
            },
            params={"prefix": path, "limit": "1"}
        )
        if response.status_code == 200:
            result = response.json()
            blobs = result.get("blobs", [])
            if blobs:
                blob_url = blobs[0].get("url")
                if blob_url:
                    content_response = requests.get(blob_url)
                    if content_response.status_code == 200:
                        return content_response.json()
        return None
    except Exception as e:
        print(f"  ERROR getting blob: {e}")
        return None

def parse_js_object_to_json(js_content: str, key: str) -> dict:
    """Parse a JavaScript object literal into a Python dict.

    This is a simplified parser that handles the specific format used in index.html.
    """
    # Find the article definition
    pattern = rf"'{key}':\s*\{{"
    match = re.search(pattern, js_content)
    if not match:
        print(f"  Could not find article: {key}")
        return None

    start = match.end() - 1  # Start at the opening brace

    # Find the matching closing brace
    depth = 0
    in_string = False
    string_char = None
    escape_next = False
    in_template = False
    template_depth = 0

    end = start
    for i, char in enumerate(js_content[start:], start):
        if escape_next:
            escape_next = False
            continue

        if char == '\\':
            escape_next = True
            continue

        # Handle template literals
        if char == '`':
            in_template = not in_template
            if in_template:
                template_depth = depth
            continue

        if in_template:
            if char == '$' and i + 1 < len(js_content) and js_content[i + 1] == '{':
                depth += 1
            elif char == '}' and depth > template_depth:
                depth -= 1
            continue

        # Handle string literals
        if char in ('"', "'") and not in_string:
            in_string = True
            string_char = char
            continue
        elif char == string_char and in_string:
            in_string = False
            string_char = None
            continue

        if in_string:
            continue

        # Count braces
        if char == '{':
            depth += 1
        elif char == '}':
            depth -= 1
            if depth == 0:
                end = i + 1
                break

    js_obj = js_content[start:end]

    # Convert JavaScript to JSON-compatible format
    # This handles the specific patterns in the GenuVerity codebase

    # Extract individual fields manually for better control
    article = {}

    # Extract title
    title_match = re.search(r'title:\s*["\']([^"\']+)["\']', js_obj)
    if title_match:
        article['title'] = title_match.group(1)

    # Extract cardTitle
    card_title_match = re.search(r'cardTitle:\s*["\']([^"\']+)["\']', js_obj)
    if card_title_match:
        article['cardTitle'] = card_title_match.group(1)

    # Extract cardTag
    card_tag_match = re.search(r'cardTag:\s*["\']([^"\']+)["\']', js_obj)
    if card_tag_match:
        article['cardTag'] = card_tag_match.group(1)

    # Extract cardTagColor
    card_color_match = re.search(r'cardTagColor:\s*["\']([^"\']+)["\']', js_obj)
    if card_color_match:
        article['cardTagColor'] = card_color_match.group(1)

    # Extract cardDescription
    card_desc_match = re.search(r'cardDescription:\s*["\']([^"\']+)["\']', js_obj)
    if card_desc_match:
        article['cardDescription'] = card_desc_match.group(1)

    # Extract chartType
    chart_type_match = re.search(r'chartType:\s*["\']([^"\']+)["\']', js_obj)
    if chart_type_match:
        article['chartType'] = chart_type_match.group(1)

    # Extract content (template literal)
    content_match = re.search(r'content:\s*`([\s\S]*?)`\s*,\s*(?:chartType|citationDatabase|contextData|sources)', js_obj)
    if content_match:
        article['content'] = content_match.group(1).strip()

    # Extract citationDatabase
    citation_start = js_obj.find('citationDatabase:')
    if citation_start != -1:
        # Find the opening brace after citationDatabase:
        brace_start = js_obj.find('{', citation_start)
        if brace_start != -1:
            # Find matching closing brace
            depth = 1
            pos = brace_start + 1
            while pos < len(js_obj) and depth > 0:
                if js_obj[pos] == '{':
                    depth += 1
                elif js_obj[pos] == '}':
                    depth -= 1
                pos += 1
            citation_js = js_obj[brace_start:pos]
            # Convert JS to JSON
            try:
                # Replace single quotes with double quotes, handle property names
                citation_json = re.sub(r'(\w+):', r'"\1":', citation_js)
                citation_json = citation_json.replace("'", '"')
                # Handle trailing commas
                citation_json = re.sub(r',\s*}', '}', citation_json)
                citation_json = re.sub(r',\s*]', ']', citation_json)
                article['citationDatabase'] = json.loads(citation_json)
            except json.JSONDecodeError as e:
                print(f"  Warning: Could not parse citationDatabase for {key}: {e}")

    # Extract contextData similarly
    context_start = js_obj.find('contextData:')
    if context_start != -1:
        brace_start = js_obj.find('{', context_start)
        if brace_start != -1:
            depth = 1
            pos = brace_start + 1
            while pos < len(js_obj) and depth > 0:
                if js_obj[pos] == '{':
                    depth += 1
                elif js_obj[pos] == '}':
                    depth -= 1
                pos += 1
            context_js = js_obj[brace_start:pos]
            try:
                context_json = re.sub(r'(\w+):', r'"\1":', context_js)
                context_json = context_json.replace("'", '"')
                context_json = re.sub(r',\s*}', '}', context_json)
                context_json = re.sub(r',\s*]', ']', context_json)
                article['contextData'] = json.loads(context_json)
            except json.JSONDecodeError as e:
                print(f"  Warning: Could not parse contextData for {key}: {e}")

    # Extract sources array
    sources_start = js_obj.find('sources:')
    if sources_start != -1:
        bracket_start = js_obj.find('[', sources_start)
        if bracket_start != -1:
            depth = 1
            pos = bracket_start + 1
            while pos < len(js_obj) and depth > 0:
                if js_obj[pos] == '[':
                    depth += 1
                elif js_obj[pos] == ']':
                    depth -= 1
                pos += 1
            sources_js = js_obj[bracket_start:pos]
            try:
                sources_json = re.sub(r'(\w+):', r'"\1":', sources_js)
                sources_json = sources_json.replace("'", '"')
                sources_json = re.sub(r',\s*]', ']', sources_json)
                article['sources'] = json.loads(sources_json)
            except json.JSONDecodeError as e:
                print(f"  Warning: Could not parse sources for {key}: {e}")

    return article

def update_article_index(key: str, article: dict):
    """Update the article index with metadata for fast listing."""
    # Get existing index
    index = blob_get(ARTICLE_INDEX_PATH) or {"articles": {}, "updated_at": None}

    # Add/update this article's metadata
    index["articles"][key] = {
        "key": key,
        "title": article.get("title", ""),
        "cardTitle": article.get("cardTitle", ""),
        "cardTag": article.get("cardTag", ""),
        "cardDescription": article.get("cardDescription", ""),
        "topic": article.get("_topic", article.get("title", "")),
        "cached_at": article.get("_cached_at", datetime.now().isoformat()),
        "article_type": article.get("articleType", "investigation"),
        "is_child": article.get("isChildEssay", False),
        "parent_key": article.get("parentEssay", ""),
    }

    index["updated_at"] = datetime.now().isoformat()

    # Upload updated index
    blob_put(ARTICLE_INDEX_PATH, json.dumps(index, indent=2))

def migrate_article(key: str, topic: str, html_content: str):
    """Migrate a single article to blob storage."""
    print(f"\nMigrating: {key}")

    # Parse the article from index.html
    article = parse_js_object_to_json(html_content, key)
    if not article:
        print(f"  SKIPPED: Could not parse article")
        return False

    # Add metadata
    article["_cached_at"] = datetime.now().isoformat()
    article["_topic"] = topic
    article["key"] = key
    article["articleType"] = "investigation"  # All static articles are investigations

    # Upload to blob
    blob_path = f"articles/{key}.json"
    url = blob_put(blob_path, json.dumps(article, indent=2))

    if url:
        # Update index
        update_article_index(key, article)
        print(f"  SUCCESS: Migrated to blob storage")
        return True
    else:
        print(f"  FAILED: Could not upload to blob")
        return False

def main():
    print("=" * 60)
    print("GenuVerity Static Article Migration")
    print("=" * 60)

    if not BLOB_READ_WRITE_TOKEN:
        print("\nERROR: BLOB_READ_WRITE_TOKEN environment variable not set")
        print("Run: source .env.local")
        sys.exit(1)

    # Read index.html
    html_path = os.path.join(os.path.dirname(__file__), "..", "index.html")
    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    print(f"\nFound {len(STATIC_ARTICLES)} static articles to migrate:")
    for key in STATIC_ARTICLES:
        print(f"  - {key}")

    # Migrate each article
    success_count = 0
    fail_count = 0

    for key, topic in STATIC_ARTICLES.items():
        if migrate_article(key, topic, html_content):
            success_count += 1
        else:
            fail_count += 1

    print("\n" + "=" * 60)
    print(f"Migration Complete: {success_count} succeeded, {fail_count} failed")
    print("=" * 60)

    if success_count > 0:
        print("\nNext steps:")
        print("1. Verify articles at https://genuverity7.vercel.app/api/cache/list")
        print("2. Remove static articles from index.html (optional)")
        print("3. Deploy: vercel --prod")

if __name__ == "__main__":
    main()
