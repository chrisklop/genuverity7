#!/usr/bin/env python3
"""
Migration script to index all existing blob articles in Redis.

This one-time script:
1. Lists all articles from Vercel Blob storage
2. For each article, creates Redis index entries:
   - article:slug:{slug} -> metadata + blob_url
   - article:hash:{md5} -> slug
   - Adds slug to article:list

Usage:
    # Set environment variables first:
    export BLOB_READ_WRITE_TOKEN='...'
    export REDIS_URL='...'
    export REDIS_TOKEN='...'

    python scripts/migrate_redis_index.py [--dry-run]
"""

import os
import sys
import json
import hashlib
import argparse
import requests
from datetime import datetime

# Configuration from environment
BLOB_READ_WRITE_TOKEN = os.environ.get("BLOB_READ_WRITE_TOKEN")
REDIS_URL = os.environ.get("REDIS_URL")
REDIS_TOKEN = os.environ.get("REDIS_TOKEN")
BLOB_API_BASE = "https://blob.vercel-storage.com"


def get_topic_key(topic: str) -> str:
    """Generate consistent cache key for a topic (matches backend)."""
    normalized = topic.lower().strip()
    return hashlib.md5(normalized.encode()).hexdigest()[:16]


def redis_set(key: str, value: dict) -> bool:
    """Set a JSON value in Redis."""
    if not REDIS_URL or not REDIS_TOKEN:
        return False
    try:
        json_value = json.dumps(value)
        response = requests.post(
            f"{REDIS_URL}/set/{key}",
            headers={
                "Authorization": f"Bearer {REDIS_TOKEN}",
                "Content-Type": "application/json"
            },
            data=json_value
        )
        return response.status_code == 200
    except Exception as e:
        print(f"  Redis SET error: {e}")
        return False


def redis_set_string(key: str, value: str) -> bool:
    """Set a plain string value in Redis."""
    if not REDIS_URL or not REDIS_TOKEN:
        return False
    try:
        response = requests.get(
            f"{REDIS_URL}/set/{key}/{value}",
            headers={"Authorization": f"Bearer {REDIS_TOKEN}"}
        )
        return response.status_code == 200
    except Exception as e:
        print(f"  Redis SET string error: {e}")
        return False


def redis_lpush(key: str, value: str) -> bool:
    """Push value to head of Redis list."""
    if not REDIS_URL or not REDIS_TOKEN:
        return False
    try:
        response = requests.get(
            f"{REDIS_URL}/lpush/{key}/{value}",
            headers={"Authorization": f"Bearer {REDIS_TOKEN}"}
        )
        return response.status_code == 200
    except Exception as e:
        print(f"  Redis LPUSH error: {e}")
        return False


def redis_lrem(key: str, count: int, value: str) -> bool:
    """Remove occurrences of value from Redis list."""
    if not REDIS_URL or not REDIS_TOKEN:
        return False
    try:
        response = requests.get(
            f"{REDIS_URL}/lrem/{key}/{count}/{value}",
            headers={"Authorization": f"Bearer {REDIS_TOKEN}"}
        )
        return response.status_code == 200
    except Exception as e:
        print(f"  Redis LREM error: {e}")
        return False


def redis_del(key: str) -> bool:
    """Delete a key from Redis."""
    if not REDIS_URL or not REDIS_TOKEN:
        return False
    try:
        response = requests.get(
            f"{REDIS_URL}/del/{key}",
            headers={"Authorization": f"Bearer {REDIS_TOKEN}"}
        )
        return response.status_code == 200
    except Exception as e:
        print(f"  Redis DEL error: {e}")
        return False


def blob_list() -> list:
    """List all article blobs."""
    if not BLOB_READ_WRITE_TOKEN:
        return []
    try:
        response = requests.get(
            BLOB_API_BASE,
            headers={"Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}"},
            params={"prefix": "articles/", "limit": 1000}
        )
        if response.status_code == 200:
            return response.json().get("blobs", [])
        return []
    except Exception as e:
        print(f"Blob list error: {e}")
        return []


def index_article(article: dict, blob_url: str, dry_run: bool = False) -> bool:
    """Index a single article to Redis."""
    slug = article.get("key")
    if not slug:
        print("  Skipping - no 'key' field")
        return False

    topic = article.get("_topic", "")
    topic_hash = get_topic_key(topic) if topic else ""

    # Build index metadata
    index_data = {
        "blob_url": blob_url,
        "title": article.get("title", ""),
        "cardTitle": article.get("cardTitle", ""),
        "cardTag": article.get("cardTag", ""),
        "cardDescription": article.get("cardDescription", ""),
        "isChildEssay": article.get("isChildEssay", False),
        "parentSlug": article.get("parentEssay"),
        "childSlugs": article.get("childEssays", []),
        "topic_hash": topic_hash,
        "created_at": article.get("_cached_at", datetime.now().isoformat())
    }

    if dry_run:
        print(f"  [DRY RUN] Would index: {slug}")
        print(f"    - article:slug:{slug} -> {{blob_url, title, ...}}")
        if topic_hash:
            print(f"    - article:hash:{topic_hash} -> {slug}")
        print(f"    - article:list <- {slug}")
        return True

    # Set slug -> metadata
    if not redis_set(f"article:slug:{slug}", index_data):
        print(f"  Failed to set article:slug:{slug}")
        return False

    # Set hash -> slug (backward compatibility)
    if topic_hash:
        redis_set_string(f"article:hash:{topic_hash}", slug)

    # Add to list (remove first to avoid duplicates)
    redis_lrem("article:list", 0, slug)
    redis_lpush("article:list", slug)

    return True


def main():
    parser = argparse.ArgumentParser(description="Index existing articles to Redis")
    parser.add_argument("--dry-run", action="store_true", help="Don't actually make changes")
    parser.add_argument("--clear", action="store_true", help="Clear existing index before migration")
    args = parser.parse_args()

    print("=" * 60)
    print("GenuVerity Redis Index Migration")
    print("=" * 60)

    # Check environment
    if not BLOB_READ_WRITE_TOKEN:
        print("\nERROR: BLOB_READ_WRITE_TOKEN not set")
        sys.exit(1)
    if not REDIS_URL or not REDIS_TOKEN:
        print("\nERROR: REDIS_URL and REDIS_TOKEN must be set")
        sys.exit(1)

    if args.dry_run:
        print("\n[DRY RUN MODE - No changes will be made]")

    # Clear existing index if requested
    if args.clear and not args.dry_run:
        print("\nClearing existing index...")
        redis_del("article:list")
        # Note: Individual article:slug:* and article:hash:* keys will be overwritten

    # List all blobs
    print("\nFetching blob list...")
    blobs = blob_list()
    print(f"Found {len(blobs)} article blobs")

    # Process each article
    indexed = 0
    skipped = 0
    failed = 0
    seen_slugs = set()

    for blob in blobs:
        blob_url = blob.get("url")
        pathname = blob.get("pathname", "")

        if not blob_url:
            continue

        try:
            # Fetch article content
            response = requests.get(blob_url)
            if response.status_code != 200:
                print(f"\n{pathname}: Failed to fetch ({response.status_code})")
                failed += 1
                continue

            article = response.json()
            slug = article.get("key", "unknown")

            # Skip duplicates
            if slug in seen_slugs:
                skipped += 1
                continue
            seen_slugs.add(slug)

            print(f"\n{slug}: {article.get('title', 'No title')[:50]}...")

            if index_article(article, blob_url, args.dry_run):
                indexed += 1
                print(f"  ✓ Indexed")
            else:
                failed += 1

        except Exception as e:
            print(f"\n{pathname}: Error - {e}")
            failed += 1

    print("\n" + "=" * 60)
    print("Migration Complete")
    print("=" * 60)
    print(f"Indexed: {indexed}")
    print(f"Skipped (duplicates): {skipped}")
    print(f"Failed: {failed}")


if __name__ == "__main__":
    main()
