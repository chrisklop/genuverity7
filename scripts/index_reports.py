#!/usr/bin/env python3
"""
index_reports.py - Index all GenuVerity reports for semantic search

Uses Sentence-Transformers to create embeddings for each report,
stored in a local SQLite database. Completely free, runs locally.

Usage:
    python scripts/index_reports.py              # Index all reports
    python scripts/index_reports.py --reindex    # Force reindex all
"""

import os
import sys
import sqlite3
import argparse
from pathlib import Path
from datetime import datetime

# Check for dependencies
try:
    from sentence_transformers import SentenceTransformer
    from bs4 import BeautifulSoup
    import numpy as np
except ImportError:
    print("Missing dependencies. Install with:")
    print("  pip install -r scripts/requirements-vector.txt")
    sys.exit(1)

# Configuration
REPORTS_DIR = Path(__file__).parent.parent / "localreports"
DB_PATH = Path(__file__).parent / "data" / "reports.db"
MODEL_NAME = "all-MiniLM-L6-v2"  # Small, fast, good quality

def init_db():
    """Initialize SQLite database with schema."""
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE,
            title TEXT,
            excerpt TEXT,
            embedding BLOB,
            indexed_at TIMESTAMP
        )
    """)
    
    conn.commit()
    return conn

def extract_text_from_html(html_path: Path) -> dict:
    """Extract title, excerpt, and main text from report HTML."""
    with open(html_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # Extract title
    title_tag = soup.find('h1') or soup.find('title')
    title = title_tag.get_text(strip=True) if title_tag else html_path.stem
    
    # Extract article content (skip nav, footer, scripts)
    for tag in soup(['nav', 'footer', 'script', 'style', 'header']):
        tag.decompose()
    
    # Get main content
    article = soup.find('article') or soup.find('main') or soup.find('body')
    if article:
        text = article.get_text(separator=' ', strip=True)
    else:
        text = soup.get_text(separator=' ', strip=True)
    
    # Clean up whitespace
    text = ' '.join(text.split())
    
    # Extract excerpt (first 300 chars of content)
    excerpt = text[:300] + "..." if len(text) > 300 else text
    
    return {
        'title': title,
        'excerpt': excerpt,
        'text': text
    }

def index_reports(reindex: bool = False):
    """Index all reports in localreports/ directory."""
    print(f"Loading model: {MODEL_NAME}")
    model = SentenceTransformer(MODEL_NAME)
    
    conn = init_db()
    cursor = conn.cursor()
    
    # Get existing slugs if not reindexing
    existing_slugs = set()
    if not reindex:
        cursor.execute("SELECT slug FROM reports")
        existing_slugs = {row[0] for row in cursor.fetchall()}
    else:
        cursor.execute("DELETE FROM reports")
        conn.commit()
    
    # Find all HTML files (skip backups)
    html_files = [
        f for f in REPORTS_DIR.glob("*.html")
        if not f.name.endswith('.bak_v2') 
        and not f.name.endswith('.backup.html')
        and f.is_file()
    ]
    
    print(f"Found {len(html_files)} reports to process")
    
    indexed_count = 0
    skipped_count = 0
    
    for html_path in html_files:
        slug = html_path.stem
        
        # Skip if already indexed
        if slug in existing_slugs:
            skipped_count += 1
            continue
        
        try:
            # Extract content
            content = extract_text_from_html(html_path)
            
            # Skip placeholder reports (under 500 chars)
            if len(content['text']) < 500:
                print(f"  Skipping {slug} (placeholder)")
                continue
            
            # Generate embedding
            embedding = model.encode(content['text'])
            
            # Store in database
            cursor.execute("""
                INSERT OR REPLACE INTO reports (slug, title, excerpt, embedding, indexed_at)
                VALUES (?, ?, ?, ?, ?)
            """, (
                slug,
                content['title'],
                content['excerpt'],
                embedding.tobytes(),
                datetime.now().isoformat()
            ))
            
            indexed_count += 1
            print(f"  Indexed: {slug}")
            
        except Exception as e:
            print(f"  Error indexing {slug}: {e}")
    
    conn.commit()
    conn.close()
    
    print(f"\n✓ Indexed {indexed_count} reports")
    if skipped_count:
        print(f"  Skipped {skipped_count} (already indexed)")
    print(f"  Database: {DB_PATH}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Index reports for semantic search")
    parser.add_argument("--reindex", action="store_true", help="Force reindex all reports")
    args = parser.parse_args()
    
    index_reports(reindex=args.reindex)
