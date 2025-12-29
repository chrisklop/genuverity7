#!/usr/bin/env python3
"""
find_related.py - Find semantically similar reports

Queries the indexed reports database to find related content.
Outputs both a summary and ready-to-paste HTML.

Usage:
    python scripts/find_related.py "path/to/research.md"
    python scripts/find_related.py --query "vaccine autism CDC claims"
    python scripts/find_related.py --query "Epstein documents" --top 3
"""

import os
import sys
import sqlite3
import argparse
from pathlib import Path

# Check for dependencies
try:
    from sentence_transformers import SentenceTransformer
    import numpy as np
except ImportError:
    print("Missing dependencies. Install with:")
    print("  pip install -r scripts/requirements-vector.txt")
    sys.exit(1)

# Configuration
DB_PATH = Path(__file__).parent / "data" / "reports.db"
MODEL_NAME = "all-MiniLM-L6-v2"
SIMILARITY_THRESHOLD = 0.35  # Minimum similarity score to include

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    """Calculate cosine similarity between two vectors."""
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def load_reports_from_db():
    """Load all reports with embeddings from database."""
    if not DB_PATH.exists():
        print(f"Database not found: {DB_PATH}")
        print("Run: python scripts/index_reports.py first")
        sys.exit(1)
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT slug, title, excerpt, embedding FROM reports")
    
    reports = []
    for row in cursor.fetchall():
        slug, title, excerpt, embedding_blob = row
        embedding = np.frombuffer(embedding_blob, dtype=np.float32)
        reports.append({
            'slug': slug,
            'title': title,
            'excerpt': excerpt,
            'embedding': embedding
        })
    
    conn.close()
    return reports

def find_related(query_text: str, top_k: int = 5, exclude_slug: str = None):
    """Find reports related to query text."""
    print(f"Loading model: {MODEL_NAME}")
    model = SentenceTransformer(MODEL_NAME)
    
    # Generate query embedding
    print("Generating query embedding...")
    query_embedding = model.encode(query_text)
    
    # Load indexed reports
    reports = load_reports_from_db()
    print(f"Searching {len(reports)} indexed reports...\n")
    
    # Calculate similarities
    results = []
    for report in reports:
        # Skip if this is the current report
        if exclude_slug and report['slug'] == exclude_slug:
            continue
        
        similarity = cosine_similarity(query_embedding, report['embedding'])
        if similarity >= SIMILARITY_THRESHOLD:
            results.append({
                **report,
                'similarity': float(similarity)
            })
    
    # Sort by similarity (highest first)
    results.sort(key=lambda x: x['similarity'], reverse=True)
    
    return results[:top_k]

def generate_html(related_reports: list) -> str:
    """Generate ready-to-paste HTML for Related Reports section."""
    if not related_reports:
        return "<!-- No related reports found above threshold -->"
    
    html_lines = [
        '<section class="related-reports">',
        '    <h2><i data-lucide="link"></i> Related Deep Dives</h2>',
        '    <div class="related-grid">'
    ]
    
    for report in related_reports:
        html_lines.extend([
            f'        <a href="{report["slug"]}.html" class="related-card">',
            f'            <h3>{report["title"]}</h3>',
            f'            <p>{report["excerpt"][:150]}...</p>',
            '        </a>'
        ])
    
    html_lines.extend([
        '    </div>',
        '</section>'
    ])
    
    return '\n'.join(html_lines)

def generate_css() -> str:
    """Return CSS styles for Related Reports section."""
    return """
/* Related Reports Section - Add to report CSS or shared-components.css */
.related-reports {
    margin-top: 60px;
    padding-top: 40px;
    border-top: 1px solid var(--border-color, #1e293b);
}

.related-reports h2 {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.5rem;
    margin-bottom: 24px;
    color: var(--text-primary, #fff);
}

.related-reports h2 svg {
    width: 24px;
    height: 24px;
    color: var(--accent-blue, #3b82f6);
}

.related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}

.related-card {
    background: var(--bg-card, #111827);
    border: 1px solid var(--border-color, #1e293b);
    border-radius: 12px;
    padding: 20px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.related-card:hover {
    border-color: var(--accent-blue, #3b82f6);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
}

.related-card h3 {
    font-size: 1rem;
    color: var(--text-primary, #fff);
    margin-bottom: 8px;
    line-height: 1.4;
}

.related-card p {
    font-size: 0.85rem;
    color: var(--text-secondary, #94a3b8);
    line-height: 1.5;
    margin: 0;
}
"""

def main():
    parser = argparse.ArgumentParser(description="Find related reports using semantic search")
    parser.add_argument("file", nargs="?", help="Path to markdown/text file to find related content for")
    parser.add_argument("--query", "-q", help="Direct query string instead of file")
    parser.add_argument("--top", "-n", type=int, default=5, help="Number of results (default: 5)")
    parser.add_argument("--exclude", "-e", help="Slug to exclude (for finding related to existing report)")
    parser.add_argument("--css", action="store_true", help="Show CSS styles for Related Reports section")
    args = parser.parse_args()
    
    # Show CSS if requested
    if args.css:
        print(generate_css())
        return
    
    # Get query text
    if args.query:
        query_text = args.query
    elif args.file:
        file_path = Path(args.file)
        if not file_path.exists():
            print(f"File not found: {args.file}")
            sys.exit(1)
        with open(file_path, 'r', encoding='utf-8') as f:
            query_text = f.read()
    else:
        print("Provide either a file path or --query text")
        parser.print_help()
        sys.exit(1)
    
    # Find related reports
    related = find_related(query_text, top_k=args.top, exclude_slug=args.exclude)
    
    # Output results
    print("=" * 60)
    print("RELATED REPORTS")
    print("=" * 60)
    
    if not related:
        print(f"No reports found above {SIMILARITY_THRESHOLD*100:.0f}% similarity threshold")
    else:
        for i, report in enumerate(related, 1):
            score = report['similarity'] * 100
            print(f"\n{i}. {report['title']}")
            print(f"   Slug: {report['slug']}")
            print(f"   Similarity: {score:.1f}%")
    
    print("\n" + "=" * 60)
    print("READY-TO-PASTE HTML")
    print("=" * 60)
    print(generate_html(related))
    
    print("\n" + "-" * 60)
    print("Tip: Run with --css to get the CSS styles for this section")

if __name__ == "__main__":
    main()
