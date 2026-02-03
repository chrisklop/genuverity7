#!/usr/bin/env python3
"""
GenuVerity Topics Queue Manager
Manage the research topics queue for daily automation.

Usage:
    python queue-manager.py list                    # List all topics
    python queue-manager.py list --pending          # List only pending
    python queue-manager.py add "Topic name"        # Add new topic
    python queue-manager.py add "Topic" --priority high --category trending
    python queue-manager.py next                    # Show next topic to process
    python queue-manager.py mark <slug> completed   # Mark topic status
    python queue-manager.py fetch-trending          # Fetch from fact-check sites
    python queue-manager.py stats                   # Show queue statistics
"""

import argparse
import json
import re
import sys
from datetime import datetime
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False

QUEUE_FILE = Path(__file__).parent.parent / "topics-queue.json"


def load_queue() -> dict:
    """Load the queue file."""
    if not QUEUE_FILE.exists():
        return {
            "version": "1.0",
            "last_updated": datetime.now().strftime("%Y-%m-%d"),
            "description": "GenuVerity research topics queue",
            "topics": [],
            "trending_sources": []
        }
    with open(QUEUE_FILE) as f:
        return json.load(f)


def save_queue(queue: dict):
    """Save the queue file."""
    queue["last_updated"] = datetime.now().strftime("%Y-%m-%d")
    with open(QUEUE_FILE, "w") as f:
        json.dump(queue, f, indent=2)
    print(f"Queue saved to {QUEUE_FILE}")


def generate_slug(topic: str) -> str:
    """Generate URL-friendly slug."""
    slug = topic.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = '-'.join(slug.split())[:40]
    date_suffix = datetime.now().strftime("%b-%Y").lower()
    return f"{slug}-{date_suffix}"


def list_topics(queue: dict, status_filter: str = None, category_filter: str = None):
    """List topics in the queue."""
    topics = queue.get("topics", [])

    if status_filter:
        topics = [t for t in topics if t.get("status") == status_filter]
    if category_filter:
        topics = [t for t in topics if t.get("category") == category_filter]

    if not topics:
        print("No topics found matching criteria")
        return

    # Group by status
    by_status = {}
    for t in topics:
        status = t.get("status", "unknown")
        if status not in by_status:
            by_status[status] = []
        by_status[status].append(t)

    status_order = ["pending", "processing", "completed", "failed"]
    status_emoji = {
        "pending": "⏳",
        "processing": "🔄",
        "completed": "✅",
        "failed": "❌"
    }

    print("\n" + "=" * 70)
    print("GenuVerity Topics Queue")
    print("=" * 70)

    for status in status_order:
        if status not in by_status:
            continue

        emoji = status_emoji.get(status, "•")
        print(f"\n{emoji} {status.upper()} ({len(by_status[status])})")
        print("-" * 40)

        for t in by_status[status]:
            priority = t.get("priority", "medium")
            category = t.get("category", "general")
            name = t.get("name", "Untitled")
            slug = t.get("slug", "")

            priority_marker = {"high": "🔴", "medium": "🟡", "low": "🟢"}.get(priority, "⚪")
            print(f"  {priority_marker} [{category:10}] {name[:50]}")
            print(f"      slug: {slug}")

    print("\n" + "=" * 70)
    print(f"Total: {len(queue.get('topics', []))} topics")


def add_topic(queue: dict, name: str, category: str = "general", priority: str = "medium", notes: str = ""):
    """Add a new topic to the queue."""
    slug = generate_slug(name)

    # Check for duplicates
    existing_slugs = [t.get("slug", "") for t in queue.get("topics", [])]
    if slug in existing_slugs:
        print(f"Warning: Similar topic may already exist with slug: {slug}")
        response = input("Add anyway? (y/n): ")
        if response.lower() != 'y':
            return

    topic = {
        "slug": slug,
        "name": name,
        "category": category,
        "priority": priority,
        "status": "pending",
        "added_date": datetime.now().strftime("%Y-%m-%d"),
        "notes": notes
    }

    if "topics" not in queue:
        queue["topics"] = []

    queue["topics"].append(topic)
    save_queue(queue)
    print(f"\n✅ Added topic:")
    print(f"   Name: {name}")
    print(f"   Slug: {slug}")
    print(f"   Category: {category}")
    print(f"   Priority: {priority}")


def get_next_topic(queue: dict) -> dict | None:
    """Get the next pending topic (highest priority first)."""
    pending = [t for t in queue.get("topics", []) if t.get("status") == "pending"]

    if not pending:
        return None

    # Sort by priority
    priority_order = {"high": 0, "medium": 1, "low": 2}
    pending.sort(key=lambda t: priority_order.get(t.get("priority", "medium"), 1))

    return pending[0]


def mark_topic(queue: dict, slug: str, status: str):
    """Mark a topic with new status."""
    for topic in queue.get("topics", []):
        if topic.get("slug") == slug:
            old_status = topic.get("status")
            topic["status"] = status
            topic["status_changed"] = datetime.now().strftime("%Y-%m-%d %H:%M")
            save_queue(queue)
            print(f"✅ Marked '{slug}' as {status} (was: {old_status})")
            return

    print(f"❌ Topic not found: {slug}")


def fetch_trending(queue: dict):
    """Fetch trending topics from fact-check sites."""
    if not HAS_REQUESTS:
        print("ERROR: requests and beautifulsoup4 required")
        print("  pip install requests beautifulsoup4")
        return

    sources = queue.get("trending_sources", [])
    if not sources:
        print("No trending sources configured")
        return

    print("\nFetching trending topics from fact-check sites...")
    print("-" * 50)

    found_topics = []

    for source in sources:
        name = source.get("name", "Unknown")
        url = source.get("url", "")

        if not url:
            continue

        print(f"\n📡 Checking {name}...")

        try:
            headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"}
            response = requests.get(url, headers=headers, timeout=10)
            soup = BeautifulSoup(response.text, "html.parser")

            # Try to find article titles (generic approach)
            articles = soup.find_all(['h2', 'h3', 'article'])[:5]

            for article in articles:
                title_elem = article.find('a') or article
                title = title_elem.get_text(strip=True)[:100]

                if title and len(title) > 20:
                    found_topics.append({
                        "name": title,
                        "source": name,
                        "url": url
                    })
                    print(f"   • {title[:60]}...")

        except Exception as e:
            print(f"   Error: {e}")

    if found_topics:
        print(f"\n\nFound {len(found_topics)} potential topics")
        add_all = input("Add all to queue as trending? (y/n): ")

        if add_all.lower() == 'y':
            for t in found_topics:
                add_topic(queue, t["name"], category="trending", priority="medium",
                         notes=f"From {t['source']}")


def show_stats(queue: dict):
    """Show queue statistics."""
    topics = queue.get("topics", [])

    by_status = {}
    by_category = {}
    by_priority = {}

    for t in topics:
        status = t.get("status", "unknown")
        category = t.get("category", "general")
        priority = t.get("priority", "medium")

        by_status[status] = by_status.get(status, 0) + 1
        by_category[category] = by_category.get(category, 0) + 1
        by_priority[priority] = by_priority.get(priority, 0) + 1

    print("\n" + "=" * 50)
    print("GenuVerity Queue Statistics")
    print("=" * 50)

    print("\nBy Status:")
    for status, count in sorted(by_status.items()):
        bar = "█" * count
        print(f"  {status:12} {count:3} {bar}")

    print("\nBy Category:")
    for cat, count in sorted(by_category.items()):
        bar = "█" * count
        print(f"  {cat:12} {count:3} {bar}")

    print("\nBy Priority:")
    for pri, count in sorted(by_priority.items()):
        bar = "█" * count
        print(f"  {pri:12} {count:3} {bar}")

    print(f"\nTotal: {len(topics)} topics")
    print(f"Last updated: {queue.get('last_updated', 'unknown')}")


def main():
    parser = argparse.ArgumentParser(description="GenuVerity Topics Queue Manager")
    subparsers = parser.add_subparsers(dest="command", help="Commands")

    # list command
    list_parser = subparsers.add_parser("list", help="List topics")
    list_parser.add_argument("--pending", action="store_true", help="Show only pending")
    list_parser.add_argument("--completed", action="store_true", help="Show only completed")
    list_parser.add_argument("--category", help="Filter by category")

    # add command
    add_parser = subparsers.add_parser("add", help="Add new topic")
    add_parser.add_argument("name", help="Topic name")
    add_parser.add_argument("--priority", choices=["high", "medium", "low"], default="medium")
    add_parser.add_argument("--category", default="general")
    add_parser.add_argument("--notes", default="")

    # next command
    subparsers.add_parser("next", help="Show next topic to process")

    # mark command
    mark_parser = subparsers.add_parser("mark", help="Mark topic status")
    mark_parser.add_argument("slug", help="Topic slug")
    mark_parser.add_argument("status", choices=["pending", "processing", "completed", "failed"])

    # fetch-trending command
    subparsers.add_parser("fetch-trending", help="Fetch trending from fact-check sites")

    # stats command
    subparsers.add_parser("stats", help="Show queue statistics")

    args = parser.parse_args()

    queue = load_queue()

    if args.command == "list":
        status_filter = None
        if args.pending:
            status_filter = "pending"
        elif args.completed:
            status_filter = "completed"
        list_topics(queue, status_filter, args.category)

    elif args.command == "add":
        add_topic(queue, args.name, args.category, args.priority, args.notes)

    elif args.command == "next":
        topic = get_next_topic(queue)
        if topic:
            print(f"\n🎯 Next topic to process:")
            print(f"   Name: {topic.get('name')}")
            print(f"   Slug: {topic.get('slug')}")
            print(f"   Priority: {topic.get('priority')}")
            print(f"\nRun: python gemini-deep-research.py --from-queue")
        else:
            print("No pending topics in queue")

    elif args.command == "mark":
        mark_topic(queue, args.slug, args.status)

    elif args.command == "fetch-trending":
        fetch_trending(queue)

    elif args.command == "stats":
        show_stats(queue)

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
