"""
GenuVerity API - Fact-Check Only Version
Pure fact-checking with disinformation tracking capabilities.

Removed features:
- Investigation article generation (/api/generate)
- Deep dive generation (/api/deep-dive)
- Infographic generation (Gemini image API)
- Extract claim endpoint (/api/extract-claim)
"""

import os
import json
import hashlib
import re
import time
import requests
from typing import Optional
from datetime import datetime
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import StreamingResponse, Response
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import anthropic

# Load from environment variables
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
BLOB_READ_WRITE_TOKEN = os.getenv("BLOB_READ_WRITE_TOKEN")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
GOOGLE_FACT_CHECK_API_KEY = os.getenv("GOOGLE_FACT_CHECK_API_KEY")
ADMIN_SECRET = os.getenv("ADMIN_SECRET")
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "hello@genuverity.com")
FRED_API_KEY = os.getenv("FRED_API_KEY")

# Claude model for fact-checking
CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-20250514")

# Vercel Blob Storage configuration
BLOB_STORE_ID = "store_R5FvidKLuXLBeOEd"
BLOB_API_BASE = "https://blob.vercel-storage.com"

# Fallback cache directory
CACHE_DIR = "/tmp/article_cache"
os.makedirs(CACHE_DIR, exist_ok=True)

# Article/Fact-check index for fast listing
ARTICLE_INDEX_PATH = "articles/_index.json"

# Configure Anthropic client
claude_client = anthropic.Anthropic(
    api_key=ANTHROPIC_API_KEY,
    timeout=300.0
) if ANTHROPIC_API_KEY else None


# === TAVILY WEB SEARCH FOR REAL SOURCES ===

def search_sources(topic: str, max_results: int = 10) -> list:
    """Search for real sources using Tavily API."""
    if not TAVILY_API_KEY:
        print("TAVILY_API_KEY not set, skipping source search")
        return []

    try:
        response = requests.post(
            "https://api.tavily.com/search",
            json={
                "api_key": TAVILY_API_KEY,
                "query": topic,
                "search_depth": "advanced",
                "include_domains": [],
                "exclude_domains": [],
                "max_results": max_results,
                "include_raw_content": False,
                "include_answer": False
            },
            timeout=30
        )

        if response.status_code == 200:
            data = response.json()
            results = data.get("results", [])

            sources = []
            for i, r in enumerate(results):
                domain = r.get("url", "").split("/")[2] if r.get("url") else "unknown"
                trust_score = calculate_trust_score(domain)

                sources.append({
                    "id": f"src{i+1}",
                    "name": r.get("title", "Unknown Source")[:60],
                    "url": r.get("url", ""),
                    "domain": domain,
                    "title": r.get("title", ""),
                    "snippet": r.get("content", "")[:300],
                    "score": trust_score,
                    "trustScore": trust_score
                })

            print(f"Tavily found {len(sources)} sources for: {topic}")
            return sources
        else:
            print(f"Tavily search failed ({response.status_code}): {response.text[:200]}")
            return []

    except Exception as e:
        print(f"Tavily search error: {e}")
        return []


def calculate_trust_score(domain: str) -> int:
    """Calculate trust score based on domain reputation."""
    tier1 = [
        "reuters.com", "apnews.com", "bbc.com", "bbc.co.uk", "npr.org",
        "nytimes.com", "washingtonpost.com", "wsj.com", "economist.com",
        "theguardian.com", "ft.com", "bloomberg.com", "politico.com",
        ".gov", ".edu", "nature.com", "science.org", "pubmed.ncbi.nlm.nih.gov"
    ]
    tier2 = [
        "cnn.com", "nbcnews.com", "cbsnews.com", "abcnews.go.com", "usatoday.com",
        "latimes.com", "chicagotribune.com", "seattletimes.com", "bostonglobe.com",
        "theatlantic.com", "newyorker.com", "vox.com", "axios.com", "thehill.com",
        "propublica.org", "businessinsider.com", "forbes.com", "fortune.com"
    ]
    tier3 = [
        "techcrunch.com", "wired.com", "arstechnica.com", "theverge.com",
        "cnbc.com", "marketwatch.com", "investopedia.com", "sec.gov",
        "nih.gov", "cdc.gov", "fda.gov", "whitehouse.gov"
    ]

    domain_lower = domain.lower()

    for d in tier1:
        if d in domain_lower:
            return 95 + (hash(domain) % 5)

    for d in tier2:
        if d in domain_lower:
            return 85 + (hash(domain) % 10)

    for d in tier3:
        if d in domain_lower:
            return 75 + (hash(domain) % 10)

    return 60 + (hash(domain) % 15)


def format_sources_for_prompt(sources: list) -> str:
    """Format sources for inclusion in Claude prompt."""
    if not sources:
        return ""

    lines = ["VERIFIED SOURCES (use these EXACT URLs in citationDatabase):"]
    for s in sources:
        lines.append(f"- [{s['id']}] {s['title'][:80]}")
        lines.append(f"  URL: {s['url']}")
        lines.append(f"  Domain: {s['domain']} | Trust: {s['score']}%")
        lines.append(f"  Snippet: {s['snippet'][:150]}...")
        lines.append("")

    lines.append("CRITICAL: Use ONLY these URLs in citationDatabase. Do NOT invent URLs.")
    return "\n".join(lines)


# === GOOGLE FACT CHECK API ===

def search_google_fact_checks(claim: str, max_results: int = 5) -> list:
    """Search Google Fact Check Tools API for existing fact checks."""
    if not GOOGLE_FACT_CHECK_API_KEY:
        print("GOOGLE_FACT_CHECK_API_KEY not set")
        return []

    try:
        encoded_query = requests.utils.quote(claim)
        url = f"https://factchecktools.googleapis.com/v1alpha1/claims:search?query={encoded_query}&pageSize={max_results}&key={GOOGLE_FACT_CHECK_API_KEY}"

        response = requests.get(url, timeout=10)

        if response.status_code != 200:
            print(f"Google Fact Check API returned {response.status_code}")
            return []

        data = response.json()

        if "claims" not in data:
            print("No existing fact checks found")
            return []

        fact_checks = []
        for claim_obj in data.get("claims", [])[:max_results]:
            for review in claim_obj.get("claimReview", []):
                publisher_name = review.get("publisher", {}).get("name", "Unknown Publisher")
                publisher_site = review.get("publisher", {}).get("site", "")
                rating = review.get("textualRating", "Unknown")
                review_url = review.get("url", "")
                title = review.get("title", "")

                fact_checks.append({
                    "publisher": publisher_name,
                    "publisherSite": publisher_site,
                    "rating": rating,
                    "normalizedRating": normalize_fact_check_rating(rating),
                    "url": review_url,
                    "title": title,
                    "claimText": claim_obj.get("text", ""),
                    "claimant": claim_obj.get("claimant", "Unknown")
                })

        print(f"Found {len(fact_checks)} prior fact checks for: {claim[:50]}...")
        return fact_checks

    except Exception as e:
        print(f"Google Fact Check API error: {e}")
        return []


def normalize_fact_check_rating(rating: str) -> str:
    """Normalize fact check ratings to standard verdicts."""
    rating_lower = rating.lower()

    if any(x in rating_lower for x in ["true", "correct", "accurate", "confirmed"]):
        if any(x in rating_lower for x in ["mostly", "partly", "partially"]):
            return "MOSTLY_TRUE"
        return "TRUE"

    if any(x in rating_lower for x in ["false", "incorrect", "wrong", "fake", "lie", "pants on fire"]):
        if any(x in rating_lower for x in ["mostly", "partly", "partially"]):
            return "MOSTLY_FALSE"
        return "FALSE"

    if any(x in rating_lower for x in ["mixed", "half", "partly", "misleading", "out of context"]):
        return "MIXED"

    if any(x in rating_lower for x in ["unverifiable", "unproven", "unknown", "disputed"]):
        return "UNVERIFIABLE"

    return "MIXED"


def format_prior_fact_checks_html(fact_checks: list) -> str:
    """Format prior fact checks as HTML for display."""
    if not fact_checks:
        return ""

    html_parts = ['<div class="prior-fact-checks">']
    html_parts.append('<h4>Prior Fact Checks</h4>')
    html_parts.append('<ul class="fact-check-list">')

    for fc in fact_checks[:5]:
        verdict_class = fc.get("normalizedRating", "mixed").lower().replace("_", "-")
        html_parts.append(f'''<li class="prior-check">
            <span class="check-verdict {verdict_class}">{fc.get("rating", "Unknown")}</span>
            <span class="check-publisher">{fc.get("publisher", "Unknown")}</span>
            <a href="{fc.get("url", "#")}" target="_blank" class="check-link">View</a>
        </li>''')

    html_parts.append('</ul>')
    html_parts.append('</div>')

    return '\n'.join(html_parts)


# === BLOB STORAGE FUNCTIONS ===

def blob_delete(path: str) -> bool:
    """Delete a blob by path (used before putting to ensure true overwrites)."""
    if not BLOB_READ_WRITE_TOKEN:
        return False

    try:
        list_url = f"{BLOB_API_BASE}?prefix={path}&limit=10"
        headers = {"Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}"}

        list_resp = requests.get(list_url, headers=headers, timeout=10)
        if list_resp.status_code == 200:
            blobs = list_resp.json().get("blobs", [])
            for blob in blobs:
                blob_url = blob.get("url")
                if blob_url:
                    delete_resp = requests.delete(
                        f"{BLOB_API_BASE}/delete?urls={blob_url}",
                        headers=headers,
                        timeout=10
                    )
                    if delete_resp.status_code in (200, 204):
                        print(f"Deleted existing blob: {blob_url[:50]}...")
        return True
    except Exception as e:
        print(f"Blob delete error: {e}")
        return False


def blob_put(path: str, content: str) -> Optional[str]:
    """Upload content to Vercel Blob Storage."""
    if not BLOB_READ_WRITE_TOKEN:
        print("No BLOB_READ_WRITE_TOKEN, falling back to local cache")
        return None

    try:
        blob_delete(path)

        url = f"{BLOB_API_BASE}/{path}"
        headers = {
            "Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}",
            "Content-Type": "application/json",
            "x-api-version": "7"
        }

        response = requests.put(url, headers=headers, data=content.encode('utf-8'), timeout=30)

        if response.status_code in (200, 201):
            result = response.json()
            blob_url = result.get("url")
            print(f"Blob uploaded: {path} -> {blob_url[:50] if blob_url else 'NO URL'}...")
            return blob_url
        else:
            print(f"Blob upload failed ({response.status_code}): {response.text[:200]}")
            return None

    except Exception as e:
        print(f"Blob upload error: {e}")
        return None


def blob_get_by_url(url: str) -> Optional[dict]:
    """Fetch blob content by URL."""
    try:
        response = requests.get(url, timeout=30)
        if response.status_code == 200:
            return response.json()
        return None
    except Exception as e:
        print(f"Blob fetch error: {e}")
        return None


def blob_get(path: str) -> Optional[dict]:
    """Get a blob by path prefix."""
    if not BLOB_READ_WRITE_TOKEN:
        return None

    try:
        list_url = f"{BLOB_API_BASE}?prefix={path}&limit=1"
        headers = {"Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}"}

        list_resp = requests.get(list_url, headers=headers, timeout=10)
        if list_resp.status_code != 200:
            return None

        blobs = list_resp.json().get("blobs", [])
        if not blobs:
            return None

        blob_url = blobs[0].get("url")
        if not blob_url:
            return None

        content_resp = requests.get(blob_url, timeout=30)
        if content_resp.status_code == 200:
            return content_resp.json()

        return None

    except Exception as e:
        print(f"Blob get error: {e}")
        return None


def blob_list(prefix: str = "articles/") -> list:
    """List all blobs with a given prefix."""
    if not BLOB_READ_WRITE_TOKEN:
        return []

    try:
        all_blobs = []
        cursor = None

        while True:
            list_url = f"{BLOB_API_BASE}?prefix={prefix}&limit=100"
            if cursor:
                list_url += f"&cursor={cursor}"

            headers = {"Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}"}
            resp = requests.get(list_url, headers=headers, timeout=30)

            if resp.status_code != 200:
                break

            data = resp.json()
            blobs = data.get("blobs", [])
            all_blobs.extend(blobs)

            if not data.get("hasMore"):
                break
            cursor = data.get("cursor")

        return all_blobs

    except Exception as e:
        print(f"Blob list error: {e}")
        return []


# === REDDIT API INTEGRATION ===
# Reddit's public JSON API (no auth required for read-only)
# Rate limited: 100 requests per minute

REDDIT_USER_AGENT = "GenuVerity/1.0 (Fact-checking research tool)"


def search_reddit(query: str, subreddit: str = None, limit: int = 25, sort: str = "relevance") -> list:
    """Search Reddit for posts mentioning a claim.

    Args:
        query: Search query
        subreddit: Specific subreddit to search (optional)
        limit: Max results (default 25)
        sort: Sort order - relevance, hot, new, top
    """
    results = []

    try:
        # Build search URL
        if subreddit:
            url = f"https://www.reddit.com/r/{subreddit}/search.json"
        else:
            url = "https://www.reddit.com/search.json"

        params = {
            "q": query,
            "limit": min(limit, 100),  # Reddit max is 100
            "sort": sort,
            "type": "link",  # Posts only, not comments
            "restrict_sr": "true" if subreddit else "false"
        }

        headers = {"User-Agent": REDDIT_USER_AGENT}

        response = requests.get(url, params=params, headers=headers, timeout=15)

        if response.status_code == 200:
            data = response.json()
            posts = data.get("data", {}).get("children", [])

            for post in posts:
                post_data = post.get("data", {})
                results.append({
                    "id": post_data.get("id"),
                    "title": post_data.get("title"),
                    "subreddit": post_data.get("subreddit"),
                    "author": post_data.get("author"),
                    "score": post_data.get("score", 0),
                    "upvote_ratio": post_data.get("upvote_ratio", 0),
                    "num_comments": post_data.get("num_comments", 0),
                    "created_utc": post_data.get("created_utc"),
                    "url": f"https://reddit.com{post_data.get('permalink', '')}",
                    "selftext": post_data.get("selftext", "")[:500],  # First 500 chars
                    "link_url": post_data.get("url", ""),
                    "is_self": post_data.get("is_self", True)
                })

            print(f"Reddit found {len(results)} posts for: {query[:50]}...")
        else:
            print(f"Reddit search failed: {response.status_code}")

        return results

    except Exception as e:
        print(f"Reddit search error: {e}")
        return []


def search_reddit_comments(query: str, subreddit: str = None, limit: int = 25) -> list:
    """Search Reddit comments mentioning a claim.

    Note: Reddit's search API has limited comment search capability.
    This uses the Pushshift alternative when needed.
    """
    results = []

    try:
        # Reddit's comment search
        url = "https://www.reddit.com/search.json"
        params = {
            "q": query,
            "limit": min(limit, 100),
            "sort": "relevance",
            "type": "comment"
        }

        headers = {"User-Agent": REDDIT_USER_AGENT}

        response = requests.get(url, params=params, headers=headers, timeout=15)

        if response.status_code == 200:
            data = response.json()
            comments = data.get("data", {}).get("children", [])

            for comment in comments:
                comment_data = comment.get("data", {})
                results.append({
                    "id": comment_data.get("id"),
                    "body": comment_data.get("body", "")[:500],
                    "subreddit": comment_data.get("subreddit"),
                    "author": comment_data.get("author"),
                    "score": comment_data.get("score", 0),
                    "created_utc": comment_data.get("created_utc"),
                    "link_id": comment_data.get("link_id"),
                    "permalink": f"https://reddit.com{comment_data.get('permalink', '')}"
                })

        return results

    except Exception as e:
        print(f"Reddit comment search error: {e}")
        return []


def get_reddit_post_timeline(query: str, subreddit: str = None, limit: int = 50) -> dict:
    """Get timeline of Reddit discussions about a claim.

    Returns posts sorted by date to track when discussions emerged.
    """
    results = search_reddit(query, subreddit=subreddit, limit=limit, sort="new")

    if not results:
        return {"timeline": [], "earliest": None, "peak_engagement": None}

    # Sort by created_utc
    results.sort(key=lambda x: x.get("created_utc", 0))

    # Find earliest post
    earliest = results[0] if results else None

    # Find peak engagement (highest score)
    peak = max(results, key=lambda x: x.get("score", 0)) if results else None

    # Convert timestamps to dates
    from datetime import datetime
    for r in results:
        if r.get("created_utc"):
            r["date"] = datetime.utcfromtimestamp(r["created_utc"]).strftime("%Y-%m-%d")

    return {
        "timeline": results,
        "earliest": earliest,
        "peak_engagement": peak,
        "total_posts": len(results),
        "total_engagement": sum(r.get("score", 0) for r in results)
    }


# === ARCHIVE.ORG WAYBACK MACHINE INTEGRATION ===

def search_wayback_machine(query: str, limit: int = 10) -> list:
    """Search Archive.org Wayback Machine for historical snapshots of pages mentioning a claim.

    Uses the CDX API to find historical snapshots.
    """
    results = []

    # Search for snapshots of pages that might contain the claim
    # We search common fact-check and news sites
    search_domains = [
        "snopes.com", "politifact.com", "factcheck.org", "reuters.com/fact-check",
        "apnews.com", "bbc.com", "twitter.com", "facebook.com"
    ]

    try:
        # Use the Wayback CDX API to search for snapshots
        # This searches for URL patterns - we'll look for general news about the topic
        keywords = query.lower().split()[:5]  # Take first 5 keywords
        search_term = "+".join(keywords)

        # Try searching the full-text search API (limited availability)
        # Fall back to CDX API for specific domains
        for domain in search_domains[:3]:  # Limit to avoid rate limits
            try:
                cdx_url = f"https://web.archive.org/cdx/search/cdx?url={domain}/*{search_term}*&output=json&limit={limit}&fl=timestamp,original,mimetype,statuscode"

                response = requests.get(cdx_url, timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    if len(data) > 1:  # First row is headers
                        for row in data[1:]:
                            if len(row) >= 4 and row[3] == "200":  # Only successful responses
                                timestamp = row[0]
                                original_url = row[1]

                                # Convert timestamp to date
                                try:
                                    date_str = f"{timestamp[:4]}-{timestamp[4:6]}-{timestamp[6:8]}"
                                except:
                                    date_str = timestamp

                                results.append({
                                    "timestamp": timestamp,
                                    "date": date_str,
                                    "original_url": original_url,
                                    "archive_url": f"https://web.archive.org/web/{timestamp}/{original_url}",
                                    "domain": domain
                                })
            except Exception as e:
                print(f"Wayback search error for {domain}: {e}")
                continue

            # Small delay between requests to avoid rate limiting
            time.sleep(0.5)

        # Sort by timestamp (oldest first) to find origin
        results.sort(key=lambda x: x.get("timestamp", ""))

        print(f"Wayback found {len(results)} historical snapshots for query: {query[:50]}...")
        return results[:limit]

    except Exception as e:
        print(f"Wayback Machine search error: {e}")
        return []


def get_earliest_wayback_snapshot(url: str) -> Optional[dict]:
    """Get the earliest snapshot of a specific URL from Wayback Machine."""
    try:
        cdx_url = f"https://web.archive.org/cdx/search/cdx?url={url}&output=json&limit=1&fl=timestamp,original,statuscode"

        response = requests.get(cdx_url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if len(data) > 1:
                row = data[1]
                timestamp = row[0]
                return {
                    "timestamp": timestamp,
                    "date": f"{timestamp[:4]}-{timestamp[4:6]}-{timestamp[6:8]}",
                    "original_url": row[1],
                    "archive_url": f"https://web.archive.org/web/{timestamp}/{row[1]}"
                }
        return None
    except Exception as e:
        print(f"Wayback earliest snapshot error: {e}")
        return None


def wayback_availability(url: str) -> Optional[dict]:
    """Check if a URL is archived in Wayback Machine and get first/last snapshots."""
    try:
        api_url = f"https://archive.org/wayback/available?url={url}"
        response = requests.get(api_url, timeout=10)

        if response.status_code == 200:
            data = response.json()
            snapshots = data.get("archived_snapshots", {})
            closest = snapshots.get("closest", {})

            if closest.get("available"):
                return {
                    "available": True,
                    "url": closest.get("url"),
                    "timestamp": closest.get("timestamp"),
                    "status": closest.get("status")
                }

        return {"available": False}

    except Exception as e:
        print(f"Wayback availability check error: {e}")
        return {"available": False, "error": str(e)}


# === CLAIM DATABASE WITH SEMANTIC FINGERPRINTS ===

CLAIMS_INDEX_PATH = "claims/_index.json"

# Common words to remove for semantic matching
STOP_WORDS = {
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
    'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
    'may', 'might', 'must', 'can', 'that', 'this', 'these', 'those', 'it', 'its',
    'they', 'their', 'them', 'he', 'she', 'him', 'her', 'his', 'we', 'our', 'us',
    'you', 'your', 'i', 'my', 'me', 'who', 'what', 'when', 'where', 'why', 'how',
    'which', 'whom', 'whose', 'if', 'then', 'else', 'than', 'so', 'as', 'just',
    'also', 'only', 'even', 'more', 'most', 'some', 'any', 'all', 'no', 'not',
    'very', 'too', 'about', 'after', 'before', 'over', 'under', 'between', 'into'
}


def generate_claim_fingerprint(claim: str) -> dict:
    """Generate a semantic fingerprint for a claim.

    Returns a dict with:
    - tokens: normalized key terms
    - bigrams: two-word phrases
    - hash: deterministic hash for exact matching
    - length: original claim length
    """
    # Normalize text
    text = claim.lower()
    text = re.sub(r'[^\w\s]', ' ', text)  # Remove punctuation
    text = re.sub(r'\s+', ' ', text).strip()

    # Extract tokens (remove stop words)
    words = text.split()
    tokens = [w for w in words if w not in STOP_WORDS and len(w) > 2]

    # Generate bigrams (two-word phrases)
    bigrams = []
    for i in range(len(tokens) - 1):
        bigrams.append(f"{tokens[i]}_{tokens[i+1]}")

    # Generate deterministic hash
    claim_hash = hashlib.sha256(claim.lower().strip().encode()).hexdigest()[:16]

    return {
        "tokens": tokens,
        "bigrams": bigrams,
        "hash": claim_hash,
        "length": len(claim),
        "original_normalized": text
    }


def calculate_claim_similarity(fp1: dict, fp2: dict) -> float:
    """Calculate similarity between two claim fingerprints using Jaccard similarity."""
    if not fp1 or not fp2:
        return 0.0

    # Token similarity (weighted 0.6)
    tokens1 = set(fp1.get("tokens", []))
    tokens2 = set(fp2.get("tokens", []))
    if tokens1 and tokens2:
        token_sim = len(tokens1 & tokens2) / len(tokens1 | tokens2)
    else:
        token_sim = 0.0

    # Bigram similarity (weighted 0.4)
    bigrams1 = set(fp1.get("bigrams", []))
    bigrams2 = set(fp2.get("bigrams", []))
    if bigrams1 and bigrams2:
        bigram_sim = len(bigrams1 & bigrams2) / len(bigrams1 | bigrams2)
    else:
        bigram_sim = 0.0

    return (token_sim * 0.6) + (bigram_sim * 0.4)


def get_claims_index() -> dict:
    """Get the claims index from blob storage."""
    index_data = blob_get(CLAIMS_INDEX_PATH)
    if index_data and isinstance(index_data, dict):
        return index_data
    return {"claims": {}, "genealogy": {}}


def update_claims_index(index: dict):
    """Update the claims index in blob storage."""
    blob_put(CLAIMS_INDEX_PATH, json.dumps(index))


def register_claim(claim: str, article_key: str, verdict: str = None, metadata: dict = None):
    """Register a claim in the database with its fingerprint."""
    index = get_claims_index()
    fingerprint = generate_claim_fingerprint(claim)
    claim_hash = fingerprint["hash"]

    claim_entry = {
        "claim": claim,
        "fingerprint": fingerprint,
        "article_key": article_key,
        "verdict": verdict,
        "first_seen": datetime.now().isoformat(),
        "metadata": metadata or {}
    }

    # Check for existing similar claims
    similar = find_similar_claims_internal(claim, index, threshold=0.7)
    if similar:
        # This might be a mutation - link to most similar
        most_similar = similar[0]
        claim_entry["similar_to"] = most_similar["hash"]
        claim_entry["similarity_score"] = most_similar["similarity"]

        # Update genealogy
        if "genealogy" not in index:
            index["genealogy"] = {}
        parent_hash = most_similar["hash"]
        if parent_hash not in index["genealogy"]:
            index["genealogy"][parent_hash] = {"children": [], "parent": None}
        index["genealogy"][parent_hash]["children"].append(claim_hash)
        index["genealogy"][claim_hash] = {"parent": parent_hash, "children": []}

    index["claims"][claim_hash] = claim_entry
    update_claims_index(index)

    return claim_entry


def find_similar_claims_internal(claim: str, index: dict, threshold: float = 0.5, limit: int = 10) -> list:
    """Internal function to find similar claims in given index."""
    fingerprint = generate_claim_fingerprint(claim)
    results = []

    for hash_id, entry in index.get("claims", {}).items():
        stored_fp = entry.get("fingerprint", {})
        similarity = calculate_claim_similarity(fingerprint, stored_fp)

        if similarity >= threshold:
            results.append({
                "hash": hash_id,
                "claim": entry.get("claim"),
                "similarity": round(similarity, 3),
                "verdict": entry.get("verdict"),
                "article_key": entry.get("article_key"),
                "first_seen": entry.get("first_seen")
            })

    results.sort(key=lambda x: x["similarity"], reverse=True)
    return results[:limit]


def find_similar_claims(claim: str, threshold: float = 0.5, limit: int = 10) -> list:
    """Find claims similar to the given claim."""
    index = get_claims_index()
    return find_similar_claims_internal(claim, index, threshold, limit)


def get_claim_genealogy(claim_hash: str) -> dict:
    """Get the genealogy (parent/children) of a claim."""
    index = get_claims_index()

    if claim_hash not in index.get("claims", {}):
        return None

    claim_entry = index["claims"][claim_hash]
    genealogy = index.get("genealogy", {}).get(claim_hash, {"parent": None, "children": []})

    result = {
        "claim": claim_entry.get("claim"),
        "hash": claim_hash,
        "verdict": claim_entry.get("verdict"),
        "first_seen": claim_entry.get("first_seen"),
        "parent": None,
        "children": []
    }

    # Get parent details
    if genealogy.get("parent"):
        parent_hash = genealogy["parent"]
        if parent_hash in index["claims"]:
            parent = index["claims"][parent_hash]
            result["parent"] = {
                "hash": parent_hash,
                "claim": parent.get("claim"),
                "verdict": parent.get("verdict"),
                "first_seen": parent.get("first_seen")
            }

    # Get children details
    for child_hash in genealogy.get("children", []):
        if child_hash in index["claims"]:
            child = index["claims"][child_hash]
            result["children"].append({
                "hash": child_hash,
                "claim": child.get("claim"),
                "verdict": child.get("verdict"),
                "first_seen": child.get("first_seen")
            })

    return result


# === CACHING FUNCTIONS ===

def get_topic_key(topic: str) -> str:
    """Generate a cache key from a topic string."""
    return topic.lower().replace(" ", "_").replace("-", "_")[:50]


def get_cached_article(topic: str) -> Optional[dict]:
    """Check if an article/fact-check is cached."""
    topic_key = get_topic_key(topic)

    index = get_article_index()
    if topic_key in index:
        article_meta = index[topic_key]
        blob_url = article_meta.get("blob_url")
        if blob_url:
            article = blob_get_by_url(blob_url)
            if article:
                return article

        blob_path = article_meta.get("blob_path", f"articles/{topic_key}.json")
        article = blob_get(blob_path)
        if article:
            return article

    blob_path = f"articles/{topic_key}.json"
    article = blob_get(blob_path)
    if article:
        return article

    local_path = os.path.join(CACHE_DIR, f"{topic_key}.json")
    if os.path.exists(local_path):
        try:
            with open(local_path, 'r') as f:
                return json.load(f)
        except:
            pass

    return None


def cache_article(topic: str, article_data: dict):
    """Cache an article/fact-check to blob storage."""
    topic_key = get_topic_key(topic)

    article_data["_topic"] = topic
    article_data["_cached_at"] = datetime.now().isoformat()

    blob_path = f"articles/{topic_key}.json"
    blob_url = blob_put(blob_path, json.dumps(article_data))

    metadata = {
        "title": article_data.get("title", topic),
        "article_type": article_data.get("articleType", "fact_check"),
        "verdict": article_data.get("verdict"),
        "cached_at": article_data["_cached_at"]
    }

    update_article_index(topic_key, metadata, blob_url=blob_url)

    local_path = os.path.join(CACHE_DIR, f"{topic_key}.json")
    try:
        with open(local_path, 'w') as f:
            json.dump(article_data, f)
    except Exception as e:
        print(f"Local cache write error: {e}")


def get_article_index() -> dict:
    """Get the article index from blob storage."""
    index_data = blob_get(ARTICLE_INDEX_PATH)
    if index_data and isinstance(index_data, dict):
        return index_data

    return {}


def update_article_index(article_key: str, metadata: dict, blob_url: str = ""):
    """Update the article index with new metadata."""
    index = get_article_index()

    index[article_key] = {
        **metadata,
        "key": article_key,
        "blob_url": blob_url,
        "blob_path": f"articles/{article_key}.json",
        "updated_at": datetime.now().isoformat()
    }

    blob_put(ARTICLE_INDEX_PATH, json.dumps(index))


def get_all_cached_articles() -> list:
    """Get all cached articles from the index."""
    index = get_article_index()

    articles = []
    for key, meta in index.items():
        if key.startswith("_"):
            continue
        articles.append({
            "key": key,
            "title": meta.get("title", key),
            "article_type": meta.get("article_type", "fact_check"),
            "verdict": meta.get("verdict"),
            "cached_at": meta.get("cached_at", meta.get("updated_at"))
        })

    articles.sort(key=lambda x: x.get("cached_at", ""), reverse=True)
    return articles


def find_similar_articles(query: str, limit: int = 5) -> list:
    """Find similar articles using simple keyword matching."""
    index = get_article_index()
    query_tokens = set(query.lower().split())

    scored = []
    for key, meta in index.items():
        if key.startswith("_"):
            continue

        title = meta.get("title", "").lower()
        key_lower = key.lower()

        title_tokens = set(title.split())
        key_tokens = set(key_lower.replace("_", " ").split())
        all_tokens = title_tokens | key_tokens

        overlap = len(query_tokens & all_tokens)
        if overlap > 0:
            scored.append({
                "key": key,
                "title": meta.get("title", key),
                "article_type": meta.get("article_type"),
                "verdict": meta.get("verdict"),
                "score": overlap
            })

    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:limit]


# === JSON PARSING UTILITIES ===

def sanitize_json_string(text: str) -> str:
    """Clean up JSON string for parsing."""
    text = text.strip()
    if text.startswith("```json"):
        text = text[7:]
    elif text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]
    return text.strip()


def repair_truncated_json(text: str) -> Optional[dict]:
    """Attempt to repair and parse potentially truncated JSON."""
    text = sanitize_json_string(text)

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # Try to close unclosed structures
    repaired = text
    open_braces = repaired.count('{') - repaired.count('}')
    open_brackets = repaired.count('[') - repaired.count(']')

    if open_braces > 0 or open_brackets > 0:
        if not repaired.rstrip().endswith((',', ':', '"', '[', '{')):
            if repaired.rstrip().endswith('"'):
                pass
            else:
                repaired = repaired.rstrip().rstrip(',')

        repaired += ']' * open_brackets
        repaired += '}' * open_braces

        try:
            return json.loads(repaired)
        except:
            pass

    return None


# === FACT CHECK TEMPLATE ===

FACT_CHECK_TEMPLATE = """
Fact-check this claim: "{topic}"
{context_section}

You are a fact-checking journalist for GenuVerity. Verify this claim AND track its disinformation origins using the VERIFIED SOURCES provided above.

CRITICAL URL RULES:
1. ONLY use URLs that appear in the VERIFIED SOURCES section above - NEVER construct or guess URLs
2. Every factual claim in your HTML must have an inline hyperlink to its source
3. Link format: <a href="[EXACT_URL_FROM_SOURCES]" target="_blank" rel="noopener">linked text</a>
4. If you cannot find a source URL in the provided sources, do NOT include that claim

RETURN ONLY VALID JSON with this structure:

{{
  "key": "{topic_slug}",
  "articleType": "fact_check",
  "title": "Fact Check: [Claim summary]",
  "verdict": "TRUE | FALSE | MOSTLY_TRUE | MOSTLY_FALSE | MIXED | UNVERIFIABLE",
  "verdictSummary": "2-3 sentence explanation of the verdict",
  "confidence": 0.85,
  "claims": [
    {{
      "id": "claim_1",
      "text": "The specific sub-claim being verified",
      "verdict": "TRUE",
      "evidence": "What the evidence shows",
      "sourceIds": ["src1", "src2"]
    }}
  ],
  "evidenceSummary": {{
    "supporting": ["Evidence point supporting the claim"],
    "contradicting": ["Evidence point contradicting the claim"],
    "context": ["Important context that affects interpretation"]
  }},
  "disinfoAnalysis": {{
    "originEstimate": {{
      "firstSeen": "2024-01-15",
      "firstSource": "URL or account name where claim first appeared",
      "confidence": 0.75,
      "originType": "social_media | blog | news | unknown",
      "earlierVariants": ["Earlier forms of this claim if any"]
    }},
    "amplificationPattern": {{
      "spreadVelocity": "rapid | moderate | slow | viral",
      "peakDate": "2024-01-20",
      "botInvolvement": "high | moderate | low | none | unknown",
      "coordinatedBehavior": false,
      "topAmplifiers": [
        {{"name": "Account or outlet name", "type": "influencer | media | politician | bot_network | unknown", "reach": 125000, "platform": "twitter | facebook | youtube | reddit | other"}}
      ],
      "spreadPath": "Platform A -> Platform B -> Mainstream"
    }},
    "narrativeMutations": [
      {{
        "variant": "Different version of the claim",
        "firstSeen": "2024-01-18",
        "source": "Where this variant appeared",
        "changeType": "exaggeration | context_removal | detail_added | translation | misattribution"
      }}
    ],
    "disinfoCampaignIndicators": {{
      "isLikelyCampaign": false,
      "campaignName": "Name if known campaign",
      "knownActors": ["Known bad actors if identified"],
      "relatedClaims": ["Other false claims that appear related"]
    }}
  }},
  "contextData": {{"term_1": {{"expanded": "Explanation..."}}}},
  "citationDatabase": {{"src1": {{"domain": "reuters.com", "trustScore": 95, "title": "Title", "snippet": "Quote", "url": "https://..."}}}},
  "sources": [{{"name": "Source", "score": 95, "url": "https://..."}}],
  "content": "HTML CONTENT HERE"
}}

DISINFORMATION ANALYSIS GUIDELINES:
- Use sources to trace when this claim first appeared online
- Identify the original source (social media account, blog, news outlet)
- Track how the claim mutated as it spread (exaggerations, context removal)
- Note any coordinated amplification patterns (multiple accounts posting simultaneously)
- Identify top amplifiers by platform and reach
- Flag if this appears part of a known disinformation campaign
- Estimate confidence in origin tracking (high if clear trail, low if murky)

HTML structure for content field:

<div class="verdict-banner verdict-[verdict_lowercase]">
  <div class="verdict-icon">[checkmark for TRUE, X for FALSE, warning for MIXED]</div>
  <div class="verdict-label">[VERDICT]</div>
</div>

<p class="prose-text verdict-summary"><strong>Summary:</strong> [verdictSummary]</p>

<section class="fact-check-story">
  <h2 class="prose-h2">The Story Behind This Claim</h2>
  <p class="prose-text">[EVERY factual claim must be hyperlinked to its source. Example: On <a href="[SOURCE_URL]" target="_blank" rel="noopener">DATE</a>, <a href="[OFFICIAL_BIO_URL]" target="_blank" rel="noopener">PERSON NAME</a> claimed that... according to <a href="[NEWS_SOURCE]" target="_blank" rel="noopener">SOURCE NAME</a>.]</p>
  <p class="prose-text">[Continue with inline links for EVERY fact, statistic, quote, or claim. No unsourced statements allowed.]</p>
  <p class="prose-text">[IMPORTANT: ONLY use URLs from the VERIFIED SOURCES provided above. Do NOT construct or guess URLs.]</p>
</section>

<div class="fact-check-tabs">
  <button class="fact-check-tab active" onclick="switchFactCheckTab(event, 'tab-claim')">Claim</button>
  <button class="fact-check-tab" onclick="switchFactCheckTab(event, 'tab-evidence')">Evidence</button>
  <button class="fact-check-tab" onclick="switchFactCheckTab(event, 'tab-disinfo')">Disinfo</button>
  <button class="fact-check-tab" onclick="switchFactCheckTab(event, 'tab-context')">Context</button>
  <button class="fact-check-tab" onclick="switchFactCheckTab(event, 'tab-sources')">Sources</button>
</div>

<div id="tab-claim" class="fact-check-tab-content active">
  <h3 class="prose-h3">The Claim</h3>
  <blockquote class="claim-quote">"[Original claim]"</blockquote>
  <h3 class="prose-h3">Sub-Claims Analysis</h3>
  <div class="claims-breakdown">
    <div class="claim-card">
      <span class="claim-verdict [verdict]">[TRUE/FALSE/MIXED]</span>
      <p class="claim-text">[Sub-claim text]</p>
      <p class="claim-evidence">[Evidence] <span class="citation-spade" data-id="src1">spade</span></p>
    </div>
  </div>
</div>

<div id="tab-evidence" class="fact-check-tab-content">
  <h3 class="prose-h3">Evidence Analysis</h3>
  <div class="evidence-grid">
    <div class="evidence-column supporting">
      <h4>Supporting Evidence</h4>
      <ul><li>Evidence point <span class="citation-spade" data-id="src1">spade</span></li></ul>
    </div>
    <div class="evidence-column contradicting">
      <h4>Contradicting Evidence</h4>
      <ul><li>Evidence point <span class="citation-spade" data-id="src2">spade</span></li></ul>
    </div>
  </div>
</div>

<div id="tab-disinfo" class="fact-check-tab-content">
  <!-- Network Graph Container - Populated by JavaScript -->
  <div class="network-graph-container">
    <div class="network-graph-header">
      <div class="network-graph-title">
        <i data-lucide="git-branch"></i>
        Claim Spread Network
      </div>
      <div class="network-graph-legend">
        <div class="legend-item"><div class="legend-dot claim"></div> Claim</div>
        <div class="legend-item"><div class="legend-dot source"></div> Source</div>
        <div class="legend-item"><div class="legend-dot amplifier"></div> Amplifier</div>
        <div class="legend-item"><div class="legend-dot mutation"></div> Mutation</div>
      </div>
    </div>
    <div id="network-graph"></div>
  </div>

  <!-- Timeline Container - Populated by JavaScript -->
  <div class="spread-timeline">
    <div class="timeline-header">
      <i data-lucide="calendar"></i>
      Spread Timeline
    </div>
    <div class="timeline-track" id="spread-timeline-track"></div>
  </div>

  <h3 class="prose-h3">Origin Tracking</h3>
  <div class="disinfo-origin">
    <p class="prose-text"><strong>First Appearance:</strong> [Date and source where claim first appeared]</p>
    <p class="prose-text"><strong>Original Form:</strong> "[The original version of the claim]"</p>
    <p class="prose-text"><strong>Origin Confidence:</strong> [High/Medium/Low] - [Explanation of confidence level]</p>
  </div>

  <h3 class="prose-h3">Spread Pattern</h3>
  <div class="disinfo-spread">
    <p class="prose-text"><strong>Velocity:</strong> [How fast it spread - rapid/moderate/slow]</p>
    <p class="prose-text"><strong>Path:</strong> [Platform A] → [Platform B] → [Mainstream media]</p>
    <p class="prose-text"><strong>Peak:</strong> [When the claim reached maximum spread]</p>
  </div>

  <h3 class="prose-h3">Top Amplifiers</h3>
  <div class="amplifier-list">
    <div class="amplifier-card">
      <span class="amplifier-type">[influencer/media/politician]</span>
      <span class="amplifier-name">[Name]</span>
      <span class="amplifier-reach">[X followers/readers]</span>
    </div>
  </div>

  <h3 class="prose-h3">Claim Mutations</h3>
  <div class="mutation-timeline">
    <div class="mutation-item">
      <span class="mutation-date">[Date]</span>
      <p class="mutation-text">"[Mutated version of claim]"</p>
      <span class="mutation-type">[exaggeration/context_removal/etc]</span>
    </div>
  </div>

  <h3 class="prose-h3">Campaign Analysis</h3>
  <p class="prose-text">[Whether this appears to be part of organized disinformation, any known actors, related false claims]</p>
</div>

<div id="tab-context" class="fact-check-tab-content">
  <h3 class="prose-h3">Historical Context</h3>
  <p class="prose-text">[Background and historical context]</p>
  <h3 class="prose-h3">The Bigger Picture</h3>
  <p class="prose-text">[Broader implications and patterns]</p>
</div>

<div id="tab-sources" class="fact-check-tab-content">
  <h3 class="prose-h3">Key Documents</h3>
  <p class="prose-text">[Primary source documents] <span class="citation-spade" data-id="src1">spade</span></p>
  <h3 class="prose-h3">Expert Analysis</h3>
  <p class="prose-text">[What experts say]</p>
  <h3 class="prose-h3">Verification Method</h3>
  <p class="prose-text">[How we verified this claim]</p>
</div>

<h2 class="prose-h2">The Bottom Line</h2>
<p class="prose-text">[Final verdict statement with key evidence summary]</p>

Return ONLY JSON. No markdown, no code fences.
"""


# === FASTAPI APP ===

app = FastAPI(title="GenuVerity Fact-Check API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FactCheckRequest(BaseModel):
    claim: str


class CacheCheckRequest(BaseModel):
    topic: str


@app.post("/api/fact-check")
async def generate_fact_check(request: FactCheckRequest, req: Request):
    """Fact-check a claim with verdict-focused output."""
    if not ANTHROPIC_API_KEY or not claude_client:
        raise HTTPException(status_code=500, detail="Server missing ANTHROPIC_API_KEY")

    print(f"Fact-checking claim: {request.claim}")

    topic_slug = request.claim.lower().replace(" ", "_").replace("-", "_")[:30]

    def send_sse(event: str, data) -> str:
        return f"event: {event}\ndata: {json.dumps(data)}\n\n"

    async def stream_response():
        full_text = ""
        real_sources = []
        prior_fact_checks = []

        stages = {
            "title": False,
            "verdict": False,
            "evidence": False,
            "sources": False
        }

        try:
            yield send_sse("progress", {"stage": "init", "percent": 5, "message": "Preparing fact check..."})

            # Search for existing professional fact checks
            yield send_sse("progress", {"stage": "prior_checks", "percent": 6, "message": "Checking professional fact-checkers..."})
            prior_fact_checks = search_google_fact_checks(request.claim, max_results=5)

            if prior_fact_checks:
                yield send_sse("progress", {"stage": "prior_found", "percent": 8, "message": f"Found {len(prior_fact_checks)} prior fact checks"})
                yield send_sse("prior_checks", prior_fact_checks)

            # Search for sources
            yield send_sse("progress", {"stage": "sources", "percent": 10, "message": "Searching verified sources..."})
            real_sources = search_sources(request.claim, max_results=10)

            # Build prompt context
            sources_section = format_sources_for_prompt(real_sources) if real_sources else ""

            prior_checks_context = ""
            if prior_fact_checks:
                prior_checks_context = "\n\nPRIOR PROFESSIONAL FACT CHECKS (reference these in your analysis):\n"
                for fc in prior_fact_checks[:3]:
                    prior_checks_context += f"- {fc['publisher']}: {fc['rating']} - {fc['title'][:80]}\n"
                    prior_checks_context += f"  URL: {fc['url']}\n"

            full_context = sources_section + prior_checks_context

            prompt = FACT_CHECK_TEMPLATE.format(
                topic=request.claim,
                context_section=full_context,
                topic_slug=topic_slug
            )

            yield send_sse("progress", {"stage": "connect", "percent": 15, "message": "Analyzing claim..."})

            with claude_client.messages.stream(
                model=CLAUDE_MODEL,
                max_tokens=8000,
                messages=[{"role": "user", "content": prompt}]
            ) as stream:
                yield send_sse("progress", {"stage": "research", "percent": 20, "message": "Researching..."})

                for text in stream.text_stream:
                    full_text += text

                    if '"title"' in full_text and not stages["title"]:
                        stages["title"] = True
                        yield send_sse("progress", {"stage": "title", "percent": 30, "message": "Analyzing claim..."})

                    if '"verdict"' in full_text and not stages["verdict"]:
                        stages["verdict"] = True
                        yield send_sse("progress", {"stage": "verdict", "percent": 50, "message": "Determining verdict..."})

                    if '"evidenceSummary"' in full_text and not stages["evidence"]:
                        stages["evidence"] = True
                        yield send_sse("progress", {"stage": "evidence", "percent": 70, "message": "Compiling evidence..."})

                    if '"sources"' in full_text and not stages["sources"]:
                        stages["sources"] = True
                        yield send_sse("progress", {"stage": "sources", "percent": 85, "message": "Verifying sources..."})

            yield send_sse("progress", {"stage": "parsing", "percent": 95, "message": "Finalizing..."})

            # Parse response
            parsed_data = repair_truncated_json(full_text)

            if parsed_data:
                if "key" not in parsed_data:
                    parsed_data["key"] = topic_slug
                parsed_data["articleType"] = "fact_check"
                parsed_data.setdefault("contextData", {})
                parsed_data.setdefault("citationDatabase", {})
                parsed_data.setdefault("sources", [])

                # Inject real sources
                if real_sources:
                    real_citation_db = {}
                    real_sources_list = []
                    for s in real_sources:
                        real_citation_db[s["id"]] = {
                            "domain": s["domain"].upper(),
                            "trustScore": s["score"],
                            "title": s["title"],
                            "snippet": s["snippet"],
                            "url": s["url"]
                        }
                        real_sources_list.append({
                            "name": s["name"],
                            "score": s["score"],
                            "url": s["url"]
                        })

                    parsed_data["citationDatabase"] = real_citation_db
                    parsed_data["sources"] = real_sources_list

                # Add prior fact checks to response
                if prior_fact_checks:
                    parsed_data["priorFactChecks"] = prior_fact_checks

                # Cache the result
                try:
                    cache_article(request.claim, parsed_data)
                except Exception as cache_err:
                    print(f"Cache error: {cache_err}")

                # Register claim in claims database
                try:
                    register_claim(
                        claim=request.claim,
                        article_key=parsed_data.get("key", topic_slug),
                        verdict=parsed_data.get("verdict"),
                        metadata={
                            "title": parsed_data.get("title"),
                            "disinfo_analysis": parsed_data.get("disinfoAnalysis", {})
                        }
                    )
                except Exception as claim_err:
                    print(f"Claim registration error: {claim_err}")

                yield send_sse("progress", {"stage": "complete", "percent": 100, "message": "Fact check complete!"})
                yield f"event: content\ndata: {json.dumps(parsed_data)}\n\n"
            else:
                # Parsing failed - return error
                error_data = {
                    "key": topic_slug,
                    "title": f"Fact Check: {request.claim[:80]}",
                    "articleType": "fact_check",
                    "verdict": "UNVERIFIABLE",
                    "verdictSummary": "Unable to parse fact check response",
                    "_parseError": True,
                    "content": f'<p class="prose-text">Error parsing response. Raw length: {len(full_text)} chars</p>'
                }
                yield f"event: content\ndata: {json.dumps(error_data)}\n\n"

            yield send_sse("done", "ok")

        except Exception as e:
            print(f"Fact check error: {e}")
            import traceback
            traceback.print_exc()
            yield send_sse("error", str(e))

    return StreamingResponse(
        stream_response(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )


@app.post("/api/cache/check")
async def check_cache(request: CacheCheckRequest):
    """Check if a fact-check is cached. Return similar if not found."""
    cached = get_cached_article(request.topic)
    if cached:
        return {"cached": True, "article": cached}

    similar = find_similar_articles(request.topic, limit=5)
    return {"cached": False, "similar": similar}


@app.get("/api/cache/list")
async def list_cached():
    """List all cached fact-checks."""
    articles = get_all_cached_articles()
    return {"articles": articles, "count": len(articles)}


@app.post("/api/admin/rebuild-index")
async def rebuild_index(request: Request):
    """Rebuild the article index from blob storage."""
    auth = request.headers.get("Authorization", "")
    if not ADMIN_SECRET or auth != f"Bearer {ADMIN_SECRET}":
        raise HTTPException(status_code=401, detail="Unauthorized")

    blobs = blob_list("articles/")

    new_index = {}
    for blob in blobs:
        pathname = blob.get("pathname", "")
        if pathname.endswith("_index.json") or not pathname.endswith(".json"):
            continue

        blob_url = blob.get("url")
        if not blob_url:
            continue

        try:
            article = blob_get_by_url(blob_url)
            if article:
                key = article.get("key", pathname.split("/")[-1].replace(".json", ""))
                new_index[key] = {
                    "key": key,
                    "title": article.get("title", key),
                    "article_type": article.get("articleType", "fact_check"),
                    "verdict": article.get("verdict"),
                    "cached_at": article.get("_cached_at", blob.get("uploadedAt")),
                    "blob_url": blob_url,
                    "blob_path": pathname
                }
        except Exception as e:
            print(f"Error processing {pathname}: {e}")

    blob_put(ARTICLE_INDEX_PATH, json.dumps(new_index))

    return {
        "success": True,
        "indexed": len(new_index),
        "articles": list(new_index.keys())
    }


@app.get("/api/article/{slug}")
async def get_article_by_slug(slug: str):
    """Get a fact-check by its slug."""
    index = get_article_index()

    if slug not in index:
        raise HTTPException(status_code=404, detail="Article not found")

    article_meta = index[slug]
    blob_url = article_meta.get("blob_url")

    if blob_url:
        article = blob_get_by_url(blob_url)
        if article:
            return article

    blob_path = article_meta.get("blob_path", f"articles/{slug}.json")
    article = blob_get(blob_path)
    if article:
        return article

    raise HTTPException(status_code=404, detail="Article data not found")


@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "ok",
        "api_configured": bool(ANTHROPIC_API_KEY),
        "mode": "fact-check-only"
    }


# === URL VERIFICATION ===

class VerifyUrlsRequest(BaseModel):
    urls: list[str]
    timeout: int = 10

@app.post("/api/verify-urls")
async def verify_urls(request: VerifyUrlsRequest):
    """
    Verify a list of URLs are accessible (not 404).
    Used to validate all links before publishing content.
    """
    import asyncio
    import aiohttp

    results = []

    async def check_url(session, url):
        try:
            headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}
            async with session.head(url, headers=headers, timeout=aiohttp.ClientTimeout(total=request.timeout), allow_redirects=True, ssl=False) as response:
                status = response.status
                if status == 405:  # Method not allowed, try GET
                    async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=request.timeout), allow_redirects=True, ssl=False) as get_response:
                        status = get_response.status
                return {"url": url, "status": status, "ok": status < 400}
        except asyncio.TimeoutError:
            return {"url": url, "status": 0, "ok": False, "error": "timeout"}
        except Exception as e:
            return {"url": url, "status": 0, "ok": False, "error": str(e)[:100]}

    async def check_all():
        connector = aiohttp.TCPConnector(limit=10)
        async with aiohttp.ClientSession(connector=connector) as session:
            tasks = [check_url(session, url) for url in request.urls]
            return await asyncio.gather(*tasks)

    results = await check_all()

    broken = [r for r in results if not r.get("ok")]
    working = [r for r in results if r.get("ok")]

    return {
        "total": len(request.urls),
        "working": len(working),
        "broken": len(broken),
        "results": results,
        "broken_urls": [r["url"] for r in broken]
    }


# === CLAIM DATABASE ENDPOINTS ===

class SimilarClaimsRequest(BaseModel):
    claim: str
    threshold: float = 0.5
    limit: int = 10


@app.post("/api/claims/similar")
async def api_find_similar_claims(request: SimilarClaimsRequest):
    """Find claims similar to the given claim."""
    similar = find_similar_claims(
        request.claim,
        threshold=request.threshold,
        limit=request.limit
    )
    return {
        "query": request.claim,
        "similar_claims": similar,
        "count": len(similar)
    }


@app.get("/api/claims/genealogy/{claim_hash}")
async def api_get_claim_genealogy(claim_hash: str):
    """Get the genealogy (parent/children) of a claim."""
    genealogy = get_claim_genealogy(claim_hash)
    if not genealogy:
        raise HTTPException(status_code=404, detail="Claim not found")
    return genealogy


@app.get("/api/claims/list")
async def api_list_claims():
    """List all registered claims."""
    index = get_claims_index()
    claims = []
    for hash_id, entry in index.get("claims", {}).items():
        claims.append({
            "hash": hash_id,
            "claim": entry.get("claim"),
            "verdict": entry.get("verdict"),
            "article_key": entry.get("article_key"),
            "first_seen": entry.get("first_seen"),
            "has_parent": bool(entry.get("similar_to"))
        })

    # Sort by first_seen descending
    claims.sort(key=lambda x: x.get("first_seen", ""), reverse=True)

    return {
        "claims": claims,
        "count": len(claims),
        "genealogy_count": len(index.get("genealogy", {}))
    }


@app.get("/api/claims/stats")
async def api_claims_stats():
    """Get statistics about the claims database."""
    index = get_claims_index()
    claims = index.get("claims", {})
    genealogy = index.get("genealogy", {})

    # Count by verdict
    verdict_counts = {}
    for entry in claims.values():
        verdict = entry.get("verdict", "UNKNOWN")
        verdict_counts[verdict] = verdict_counts.get(verdict, 0) + 1

    # Count root claims (no parent)
    root_claims = sum(1 for g in genealogy.values() if not g.get("parent"))

    # Count claims with children
    claims_with_mutations = sum(1 for g in genealogy.values() if g.get("children"))

    return {
        "total_claims": len(claims),
        "verdict_distribution": verdict_counts,
        "root_claims": root_claims,
        "claims_with_mutations": claims_with_mutations,
        "total_genealogy_links": len(genealogy)
    }


# === ARCHIVE.ORG ENDPOINTS ===

class WaybackSearchRequest(BaseModel):
    query: str
    limit: int = 10


@app.post("/api/archive/search")
async def api_wayback_search(request: WaybackSearchRequest):
    """Search Archive.org Wayback Machine for historical snapshots related to a claim."""
    results = search_wayback_machine(request.query, limit=request.limit)
    return {
        "query": request.query,
        "snapshots": results,
        "count": len(results),
        "oldest": results[0] if results else None
    }


@app.get("/api/archive/check")
async def api_wayback_check(url: str):
    """Check if a URL is archived in Wayback Machine."""
    availability = wayback_availability(url)
    earliest = get_earliest_wayback_snapshot(url)
    return {
        "url": url,
        "availability": availability,
        "earliest_snapshot": earliest
    }


# === REDDIT ENDPOINTS ===

class RedditSearchRequest(BaseModel):
    query: str
    subreddit: str = None
    limit: int = 25
    sort: str = "relevance"


@app.post("/api/reddit/search")
async def api_reddit_search(request: RedditSearchRequest):
    """Search Reddit for posts related to a claim."""
    results = search_reddit(
        request.query,
        subreddit=request.subreddit,
        limit=request.limit,
        sort=request.sort
    )
    return {
        "query": request.query,
        "subreddit": request.subreddit,
        "posts": results,
        "count": len(results)
    }


@app.post("/api/reddit/timeline")
async def api_reddit_timeline(request: RedditSearchRequest):
    """Get timeline of Reddit discussions about a claim."""
    timeline_data = get_reddit_post_timeline(
        request.query,
        subreddit=request.subreddit,
        limit=request.limit
    )
    return {
        "query": request.query,
        **timeline_data
    }


@app.post("/api/reddit/comments")
async def api_reddit_comments(request: RedditSearchRequest):
    """Search Reddit comments mentioning a claim."""
    results = search_reddit_comments(
        request.query,
        subreddit=request.subreddit,
        limit=request.limit
    )
    return {
        "query": request.query,
        "comments": results,
        "count": len(results)
    }


# === X/TWITTER TRENDING ENDPOINT ===

@app.get("/api/trending/x")
async def get_x_trending():
    """Get trending fact-check topics from X/Twitter using Tavily search."""
    if not TAVILY_API_KEY:
        return {"error": "Tavily API key not configured", "topics": []}

    try:
        # Search for recent fact-checks and misinformation discussions on X
        queries = [
            "site:twitter.com OR site:x.com fact check viral 2024",
            "site:twitter.com OR site:x.com misinformation debunked",
            "site:nitter.net fact check trending",
        ]

        all_results = []

        for query in queries[:1]:  # Use first query to save API calls
            response = requests.post(
                "https://api.tavily.com/search",
                json={
                    "api_key": TAVILY_API_KEY,
                    "query": query,
                    "search_depth": "basic",
                    "max_results": 8,
                    "include_raw_content": False,
                    "include_answer": False
                },
                timeout=20
            )

            if response.status_code == 200:
                data = response.json()
                results = data.get("results", [])

                for r in results:
                    # Extract claim/topic from title
                    title = r.get("title", "")
                    url = r.get("url", "")
                    snippet = r.get("content", "")[:200]

                    # Skip if not useful
                    if not title or len(title) < 10:
                        continue

                    all_results.append({
                        "title": title[:100],
                        "url": url,
                        "snippet": snippet,
                        "source": "x.com" if "x.com" in url or "twitter.com" in url else "web"
                    })

        # Deduplicate by title similarity
        seen_titles = set()
        unique_results = []
        for r in all_results:
            title_key = r["title"].lower()[:30]
            if title_key not in seen_titles:
                seen_titles.add(title_key)
                unique_results.append(r)

        return {
            "topics": unique_results[:6],
            "count": len(unique_results[:6]),
            "source": "tavily"
        }

    except Exception as e:
        print(f"X trending search error: {e}")
        return {"error": str(e), "topics": []}


@app.get("/api/trending/factchecks")
async def get_trending_factchecks():
    """Get trending fact-checks from major fact-checkers using Tavily."""
    if not TAVILY_API_KEY:
        return {"error": "Tavily API key not configured", "factchecks": []}

    try:
        # Search for recent fact-checks from major fact-checkers
        response = requests.post(
            "https://api.tavily.com/search",
            json={
                "api_key": TAVILY_API_KEY,
                "query": "fact check 2024 viral claim debunked",
                "search_depth": "basic",
                "include_domains": [
                    "snopes.com",
                    "politifact.com",
                    "factcheck.org",
                    "reuters.com/fact-check",
                    "apnews.com/hub/ap-fact-check",
                    "fullfact.org"
                ],
                "max_results": 10,
                "include_raw_content": False,
                "include_answer": False
            },
            timeout=20
        )

        if response.status_code == 200:
            data = response.json()
            results = data.get("results", [])

            factchecks = []
            for r in results:
                domain = r.get("url", "").split("/")[2] if r.get("url") else "unknown"
                factchecks.append({
                    "title": r.get("title", "")[:100],
                    "url": r.get("url", ""),
                    "snippet": r.get("content", "")[:200],
                    "source": domain.replace("www.", "")
                })

            return {
                "factchecks": factchecks,
                "count": len(factchecks)
            }
        else:
            return {"error": f"Search failed: {response.status_code}", "factchecks": []}

    except Exception as e:
        print(f"Fact-check trending error: {e}")
        return {"error": str(e), "factchecks": []}


@app.get("/api/trending/misinfo-sources")
async def get_misinfo_sources():
    """
    Monitor 50+ known misinformation sources to proactively surface claims.
    This helps predict what users might search for before claims go viral.
    Sources based on: Media Bias/Fact Check, NewsGuard, CCDH research
    """
    if not TAVILY_API_KEY:
        return {"error": "Tavily API key not configured", "claims": []}

    try:
        # Comprehensive list of 50+ misinformation sources categorized by type
        # Based on research from MBFC, NewsGuard, and CCDH

        MISINFO_SOURCES = {
            # Far-right/conspiracy news (USA)
            "far_right_usa": [
                "infowars.com", "breitbart.com", "thegatewaypundit.com", "zerohedge.com",
                "naturalnews.com", "beforeitsnews.com", "100percentfedup.com",
                "thefederalistpapers.org", "dailywire.com", "theblaze.com",
                "oann.com", "newsmax.com", "revolver.news", "nationalfile.com",
                "redstate.com", "pjmedia.com", "twitchy.com", "bizpacreview.com",
                "wnd.com", "americanthinker.com", "conservativetreehouse.com",
                "thepoliticalinsider.com", "freedomwire.com", "patriotnewsalerts.com"
            ],
            # Health/vaccine misinformation
            "health_misinfo": [
                "mercola.com", "greenmedinfo.com", "childrenshealthdefense.org",
                "thetruthaboutcancer.com", "greatgameindia.com", "globalresearch.ca",
                "activistpost.com", "healthimpactnews.com", "vaccineimpact.com"
            ],
            # QAnon / conspiracy
            "qanon_conspiracy": [
                "rumble.com", "bitchute.com", "gab.com", "gettr.com",
                "frankspeech.com", "truthsocial.com", "parler.com"
            ],
            # Russian state / pro-Russian
            "russian_propaganda": [
                "rt.com", "sputniknews.com", "strategic-culture.org",
                "southfront.org", "journal-neo.org", "neweasternoutlook.com"
            ],
            # Fringe / alternative
            "fringe_alt": [
                "davidicke.com", "collective-evolution.com", "humansarefree.com",
                "stillnessinthestorm.com", "consciouslifenews.com", "disclose.tv"
            ],
            # Chan boards / archives
            "chans": [
                "boards.4chan.org", "archive.4plebs.org", "8kun.top"
            ],
            # Social conspiracy subreddits
            "reddit_conspiracy": [
                "reddit.com/r/conspiracy", "reddit.com/r/conspiracy_commons",
                "reddit.com/r/walkaway", "reddit.com/r/louderwithcrowder"
            ]
        }

        # Build search queries - rotate through different source groups
        import random

        # Flatten sources for random selection
        all_sources = []
        for category, sources in MISINFO_SOURCES.items():
            for source in sources:
                all_sources.append((source, category))

        # Select 8-10 random sources to search this time (for variety)
        selected = random.sample(all_sources, min(10, len(all_sources)))

        # Build queries in batches of 3-4 sites each
        queries = []
        batch = []
        for source, category in selected:
            batch.append(f"site:{source}")
            if len(batch) >= 3:
                queries.append(f"({' OR '.join(batch)}) breaking viral 2024")
                batch = []
        if batch:
            queries.append(f"({' OR '.join(batch)}) breaking viral 2024")

        all_results = []

        # Run up to 3 queries for better coverage
        for query in queries[:3]:
            try:
                response = requests.post(
                    "https://api.tavily.com/search",
                    json={
                        "api_key": TAVILY_API_KEY,
                        "query": query,
                        "search_depth": "basic",
                        "max_results": 5,
                        "include_raw_content": False,
                        "include_answer": False
                    },
                    timeout=15
                )

                if response.status_code == 200:
                    data = response.json()
                    results = data.get("results", [])

                    for r in results:
                        title = r.get("title", "")
                        url = r.get("url", "").lower()
                        snippet = r.get("content", "")[:250]

                        if not title or len(title) < 10:
                            continue

                        # Determine source category based on URL
                        source_type = "fringe"
                        source_category = "unknown"

                        for cat, sources in MISINFO_SOURCES.items():
                            for src in sources:
                                if src in url:
                                    source_category = cat
                                    # Map to icon type
                                    if cat == "far_right_usa":
                                        source_type = "far_right"
                                    elif cat == "health_misinfo":
                                        source_type = "health"
                                    elif cat == "qanon_conspiracy":
                                        source_type = "qanon"
                                    elif cat == "russian_propaganda":
                                        source_type = "russian"
                                    elif cat == "chans":
                                        source_type = "4chan"
                                    elif cat == "reddit_conspiracy":
                                        source_type = "reddit"
                                    else:
                                        source_type = "fringe"
                                    break

                        # Legacy mappings for specific sites
                        if "infowars" in url:
                            source_type = "infowars"
                        elif "breitbart" in url:
                            source_type = "breitbart"
                        elif "zerohedge" in url:
                            source_type = "zerohedge"
                        elif "gateway" in url:
                            source_type = "gateway"
                        elif "4chan" in url or "4plebs" in url or "8kun" in url:
                            source_type = "4chan"
                        elif "reddit.com" in url:
                            source_type = "reddit"
                        elif "t.me" in url or "telegram" in url:
                            source_type = "telegram"
                        elif "rt.com" in url or "sputnik" in url:
                            source_type = "russian"
                        elif "mercola" in url or "naturalnews" in url or "childrenshealth" in url:
                            source_type = "health"

                        # Extract domain
                        domain = r.get("url", "").split("/")[2] if "/" in r.get("url", "") else "unknown"

                        all_results.append({
                            "title": title,  # Full title for click handler
                            "displayTitle": title[:100] + "..." if len(title) > 100 else title,  # Truncated for display
                            "url": r.get("url", ""),
                            "snippet": snippet,
                            "source": domain.replace("www.", ""),
                            "sourceType": source_type,
                            "sourceCategory": source_category,
                            "category": "misinfo_source"
                        })

            except Exception as e:
                print(f"Query error for {query[:30]}...: {e}")
                continue

        # Deduplicate by title similarity
        seen_titles = set()
        unique_results = []
        for r in all_results:
            title_key = r["title"].lower()[:40]
            if title_key not in seen_titles:
                seen_titles.add(title_key)
                unique_results.append(r)

        return {
            "claims": unique_results[:10],
            "count": len(unique_results[:10]),
            "source": "tavily",
            "totalSourcesMonitored": sum(len(s) for s in MISINFO_SOURCES.values()),
            "description": "Claims from 50+ known misinformation sources - check these before they go viral"
        }

    except Exception as e:
        print(f"Misinfo sources error: {e}")
        return {"error": str(e), "claims": []}


@app.get("/api/trending/reddit")
async def get_reddit_trending():
    """Get trending discussions from Reddit about viral claims and conspiracies."""
    if not TAVILY_API_KEY:
        return {"error": "Tavily API key not configured", "posts": []}

    try:
        # Search Reddit for viral claims and fact-check discussions
        queries = [
            "site:reddit.com viral claim debunked 2024",
            "site:reddit.com/r/IsItBullshit OR site:reddit.com/r/OutOfTheLoop",
            "site:reddit.com fact check misinformation",
        ]

        all_results = []

        for query in queries[:2]:
            try:
                response = requests.post(
                    "https://api.tavily.com/search",
                    json={
                        "api_key": TAVILY_API_KEY,
                        "query": query,
                        "search_depth": "basic",
                        "max_results": 6,
                        "include_raw_content": False,
                        "include_answer": False
                    },
                    timeout=15
                )

                if response.status_code == 200:
                    data = response.json()
                    results = data.get("results", [])

                    for r in results:
                        title = r.get("title", "")
                        url = r.get("url", "")
                        snippet = r.get("content", "")[:200]

                        if not title or len(title) < 10:
                            continue

                        # Extract subreddit from URL
                        subreddit = "reddit"
                        if "/r/" in url:
                            parts = url.split("/r/")
                            if len(parts) > 1:
                                subreddit = "r/" + parts[1].split("/")[0]

                        all_results.append({
                            "title": title[:100],
                            "url": url,
                            "snippet": snippet,
                            "subreddit": subreddit,
                            "source": "reddit.com"
                        })

            except Exception as e:
                print(f"Reddit query error: {e}")
                continue

        # Deduplicate
        seen_titles = set()
        unique_results = []
        for r in all_results:
            title_key = r["title"].lower()[:30]
            if title_key not in seen_titles:
                seen_titles.add(title_key)
                unique_results.append(r)

        return {
            "posts": unique_results[:6],
            "count": len(unique_results[:6]),
            "source": "tavily"
        }

    except Exception as e:
        print(f"Reddit trending error: {e}")
        return {"error": str(e), "posts": []}


# === SEO ENDPOINTS ===

@app.get("/sitemap.xml")
async def sitemap():
    """Generate dynamic XML sitemap."""
    base_url = "https://genuverity7.vercel.app"
    today = datetime.now().strftime("%Y-%m-%d")

    xml_parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]

    xml_parts.append(f'''  <url>
    <loc>{base_url}/</loc>
    <lastmod>{today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>''')

    try:
        index = get_article_index()

        for key, article in index.items():
            if key.startswith("_"):
                continue

            cached_at = article.get("cached_at", "")
            lastmod = cached_at.split("T")[0] if cached_at else today

            xml_parts.append(f'''  <url>
    <loc>{base_url}/#article/{key}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>''')

    except Exception as e:
        print(f"Sitemap error: {e}")

    xml_parts.append('</urlset>')

    return Response(
        content='\n'.join(xml_parts),
        media_type="application/xml"
    )


@app.get("/robots.txt")
async def robots():
    """Serve robots.txt."""
    return Response(
        content="""# GenuVerity Robots.txt
User-agent: *
Allow: /
Sitemap: https://genuverity7.vercel.app/sitemap.xml
Disallow: /api/
""",
        media_type="text/plain"
    )


# === WAITLIST SIGNUP ===

class WaitlistSignup(BaseModel):
    email: str
    usecase: Optional[str] = None
    source: Optional[str] = None

WAITLIST_INDEX_PATH = "waitlist/_index.json"

def get_waitlist() -> list:
    """Get all waitlist signups from Vercel Blob."""
    if not BLOB_READ_WRITE_TOKEN:
        return []

    try:
        response = requests.get(
            f"{BLOB_API_BASE}/{WAITLIST_INDEX_PATH}",
            headers={"Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}"},
            timeout=10
        )
        if response.status_code == 200:
            return response.json()
    except Exception as e:
        print(f"Error loading waitlist: {e}")

    return []

def save_waitlist(waitlist: list):
    """Save waitlist to Vercel Blob."""
    if not BLOB_READ_WRITE_TOKEN:
        return False

    try:
        response = requests.put(
            f"{BLOB_API_BASE}/{WAITLIST_INDEX_PATH}",
            headers={
                "Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}",
                "x-api-version": "7",
                "Content-Type": "application/json"
            },
            json=waitlist,
            timeout=10
        )
        return response.status_code in [200, 201]
    except Exception as e:
        print(f"Error saving waitlist: {e}")
        return False

def send_resend_email(to: str, subject: str, html: str, from_email: str = "GenuVerity <hello@genuverity.com>"):
    """Send email via Resend API."""
    if not RESEND_API_KEY:
        print("RESEND_API_KEY not configured")
        return False

    try:
        response = requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "from": from_email,
                "to": [to],
                "subject": subject,
                "html": html
            },
            timeout=10
        )
        if response.status_code == 200:
            print(f"Email sent to {to}")
            return True
        else:
            print(f"Resend error: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

@app.post("/api/waitlist")
async def join_waitlist(signup: WaitlistSignup):
    """Add email to waitlist, send confirmation and notification emails."""
    email = signup.email.strip().lower()
    usecase = signup.usecase.strip() if signup.usecase else ""
    source = signup.source.strip() if signup.source else ""

    # Validate email format
    if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
        raise HTTPException(status_code=400, detail="Invalid email format")

    # Load current waitlist
    waitlist = get_waitlist()

    # Check for duplicate
    existing_emails = [w.get("email", "").lower() for w in waitlist]
    if email in existing_emails:
        return {"success": True, "message": "You're already on the waitlist!", "duplicate": True}

    # Add new signup
    new_signup = {
        "email": email,
        "usecase": usecase,
        "source": source,
        "timestamp": datetime.utcnow().isoformat(),
        "ip": None  # Could add IP tracking if needed
    }
    waitlist.append(new_signup)

    # Save to blob
    save_waitlist(waitlist)

    # Send welcome email to user
    welcome_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a12; color: #ffffff; padding: 40px 20px; }}
            .container {{ max-width: 600px; margin: 0 auto; background: #16161e; border-radius: 16px; padding: 40px; border: 1px solid #2a2a3a; }}
            .logo {{ font-size: 28px; font-weight: 700; margin-bottom: 24px; }}
            .logo-genu {{ color: #ffffff; }}
            .logo-verity {{ color: #06b6d4; }}
            h1 {{ font-size: 24px; margin-bottom: 16px; }}
            p {{ color: #a0a0b0; line-height: 1.7; margin-bottom: 16px; }}
            .highlight {{ color: #06b6d4; }}
            .discount {{ background: rgba(16, 185, 129, 0.15); color: #10b981; padding: 12px 20px; border-radius: 8px; margin: 24px 0; }}
            .footer {{ margin-top: 32px; padding-top: 24px; border-top: 1px solid #2a2a3a; color: #6b7280; font-size: 14px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo"><span class="logo-genu">Genu</span><span class="logo-verity">Verity</span></div>
            <h1>You're on the list!</h1>
            <p>Thanks for joining the GenuVerity early access waitlist. We're building something special: <span class="highlight">fact-checking powered by Constitutional AI</span> - transparent, accountable, and deeply sourced.</p>
            <div class="discount">
                <strong>Early Access Perk:</strong> As a waitlist member, you'll receive a steep discount when we launch.
            </div>
            <p>We'll reach out soon with updates on our progress and your exclusive early access invitation.</p>
            <p>In the meantime, if you have questions or ideas, just reply to this email.</p>
            <div class="footer">
                <p>&copy; 2025 GenuVerity LLC. Building transparent fact-checking for a better-informed world.</p>
            </div>
        </div>
    </body>
    </html>
    """
    send_resend_email(email, "You're on the GenuVerity waitlist!", welcome_html)

    # Send notification to admin
    admin_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; }}
            .field {{ margin-bottom: 16px; }}
            .label {{ font-weight: 600; color: #666; }}
            .value {{ font-size: 16px; margin-top: 4px; }}
        </style>
    </head>
    <body>
        <h2>New GenuVerity Waitlist Signup</h2>
        <div class="field">
            <div class="label">Email</div>
            <div class="value">{email}</div>
        </div>
        <div class="field">
            <div class="label">How they plan to use GenuVerity</div>
            <div class="value">{usecase if usecase else '(not provided)'}</div>
        </div>
        <div class="field">
            <div class="label">How they heard about us</div>
            <div class="value">{source if source else '(not provided)'}</div>
        </div>
        <div class="field">
            <div class="label">Timestamp</div>
            <div class="value">{new_signup['timestamp']}</div>
        </div>
        <div class="field">
            <div class="label">Total Waitlist Count</div>
            <div class="value">{len(waitlist)}</div>
        </div>
    </body>
    </html>
    """
    send_resend_email(ADMIN_EMAIL, f"New waitlist signup: {email}", admin_html)

    return {
        "success": True,
        "message": "Welcome to the waitlist! Check your email for confirmation.",
        "position": len(waitlist)
    }

@app.get("/api/waitlist/count")
async def waitlist_count():
    """Get waitlist count (public)."""
    waitlist = get_waitlist()
    return {"count": len(waitlist)}

@app.get("/api/waitlist/export")
async def export_waitlist(secret: str = ""):
    """Export full waitlist (admin only)."""
    if secret != ADMIN_SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")

    waitlist = get_waitlist()
    return {"waitlist": waitlist, "count": len(waitlist)}


# === REPORT REQUEST SUBMISSIONS ===

class ReportRequest(BaseModel):
    """Request for a custom investigation report."""
    topic: str  # Max 100 chars
    description: str  # Max 300 chars
    email: str

REPORT_REQUESTS_PATH = "report_requests/_index.json"

def get_report_requests() -> list:
    """Get all report requests from Vercel Blob."""
    if not BLOB_READ_WRITE_TOKEN:
        return []
    try:
        response = requests.get(
            f"{BLOB_API_BASE}?prefix={REPORT_REQUESTS_PATH}",
            headers={"Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}"},
            timeout=10
        )
        if response.status_code == 200:
            blobs = response.json().get("blobs", [])
            if blobs:
                content_resp = requests.get(blobs[0].get("url"), timeout=10)
                if content_resp.status_code == 200:
                    return content_resp.json()
        return []
    except Exception as e:
        print(f"Error getting report requests: {e}")
        return []

def save_report_requests(requests_list: list) -> bool:
    """Save report requests to Vercel Blob."""
    try:
        blob_delete(REPORT_REQUESTS_PATH)
        response = requests.put(
            f"{BLOB_API_BASE}/{REPORT_REQUESTS_PATH}",
            headers={
                "Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}",
                "Content-Type": "application/json",
                "x-api-version": "7"
            },
            data=json.dumps(requests_list),
            timeout=10
        )
        return response.status_code in [200, 201]
    except Exception as e:
        print(f"Error saving report requests: {e}")
        return False

@app.post("/api/report-request")
async def submit_report_request(request: ReportRequest):
    """Submit a request for a custom investigation report."""
    # Validate and sanitize inputs
    topic = request.topic.strip()[:100]
    description = request.description.strip()[:300]
    email = request.email.strip().lower()

    # Validate email format
    if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
        raise HTTPException(status_code=400, detail="Invalid email format")

    if len(topic) < 5:
        raise HTTPException(status_code=400, detail="Topic must be at least 5 characters")

    # Create request record
    request_record = {
        "id": hashlib.sha256(f"{email}{topic}{datetime.utcnow().isoformat()}".encode()).hexdigest()[:12],
        "topic": topic,
        "description": description,
        "email": email,
        "status": "queued",
        "submitted_at": datetime.utcnow().isoformat()
    }

    # Save to blob storage
    requests_list = get_report_requests()
    requests_list.append(request_record)
    save_report_requests(requests_list)

    # Send confirmation email to requester
    requester_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a12; color: #ffffff; padding: 40px 20px; }}
            .container {{ max-width: 600px; margin: 0 auto; background: #16161e; border-radius: 16px; padding: 40px; border: 1px solid #2a2a3a; }}
            .logo {{ font-size: 28px; font-weight: 700; margin-bottom: 24px; }}
            .logo-genu {{ color: #ffffff; }}
            .logo-verity {{ color: #3b82f6; }}
            h1 {{ font-size: 24px; margin-bottom: 16px; color: #ffffff; }}
            p {{ color: #a0a0b0; line-height: 1.7; margin-bottom: 16px; }}
            .highlight {{ color: #06b6d4; }}
            .topic-box {{ background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); padding: 16px; border-radius: 8px; margin: 24px 0; }}
            .topic-label {{ font-size: 12px; color: #6b7280; text-transform: uppercase; margin-bottom: 8px; }}
            .topic-text {{ font-size: 18px; font-weight: 600; color: #ffffff; }}
            .description {{ color: #a0a0b0; margin-top: 12px; font-size: 14px; }}
            .status {{ background: rgba(245, 158, 11, 0.15); color: #f59e0b; padding: 8px 16px; border-radius: 6px; display: inline-block; font-weight: 600; margin: 16px 0; }}
            .footer {{ margin-top: 32px; padding-top: 24px; border-top: 1px solid #2a2a3a; color: #6b7280; font-size: 14px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo"><span class="logo-genu">Genu</span><span class="logo-verity">Verity</span></div>
            <h1>Report Request Received!</h1>
            <p>Thank you for submitting your investigation topic. Our team will review your request and begin research.</p>

            <div class="topic-box">
                <div class="topic-label">Your Requested Topic</div>
                <div class="topic-text">{topic}</div>
                {f'<div class="description">{description}</div>' if description else ''}
            </div>

            <div class="status">Status: Queued for Investigation</div>

            <p>We'll notify you at <span class="highlight">{email}</span> when your report is ready. Most reports are completed within 48-72 hours.</p>

            <p>Request ID: <code style="background: #2a2a3a; padding: 2px 8px; border-radius: 4px;">{request_record['id']}</code></p>

            <div class="footer">
                <p>&copy; 2025 GenuVerity LLC. AI-powered fact verification with human oversight.</p>
            </div>
        </div>
    </body>
    </html>
    """
    send_resend_email(email, f"Report Request Received: {topic[:50]}...", requester_html)

    # Send notification to admin (chris@genuverity.com)
    admin_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: #f5f5f5; }}
            .container {{ max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }}
            h1 {{ color: #1a1a1a; font-size: 22px; margin-bottom: 24px; }}
            .field {{ margin-bottom: 20px; }}
            .label {{ font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 6px; }}
            .value {{ font-size: 16px; color: #1a1a1a; padding: 12px; background: #f8f9fa; border-radius: 6px; }}
            .description {{ white-space: pre-wrap; }}
            .meta {{ color: #888; font-size: 14px; margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>New Report Request</h1>

            <div class="field">
                <div class="label">Topic</div>
                <div class="value"><strong>{topic}</strong></div>
            </div>

            <div class="field">
                <div class="label">Description</div>
                <div class="value description">{description if description else '(No description provided)'}</div>
            </div>

            <div class="field">
                <div class="label">Requester Email</div>
                <div class="value">{email}</div>
            </div>

            <div class="meta">
                <p><strong>Request ID:</strong> {request_record['id']}</p>
                <p><strong>Submitted:</strong> {request_record['submitted_at']}</p>
                <p><strong>Total Requests:</strong> {len(requests_list)}</p>
            </div>
        </div>
    </body>
    </html>
    """
    send_resend_email("chris@genuverity.com", f"[NEW REQUEST] {topic[:60]}", admin_html)

    return {
        "success": True,
        "message": "Your report request has been submitted! Check your email for confirmation.",
        "request_id": request_record['id']
    }


# === REPORT FEEDBACK ===

class ReportFeedback(BaseModel):
    """Feedback on a specific report."""
    report_slug: str
    rating: int  # 1-5
    comment: Optional[str] = None
    email: Optional[str] = None

FEEDBACK_PATH = "feedback/_index.json"

def get_feedback() -> list:
    """Get all feedback from Vercel Blob."""
    if not BLOB_READ_WRITE_TOKEN:
        return []
    try:
        response = requests.get(
            f"{BLOB_API_BASE}?prefix={FEEDBACK_PATH}",
            headers={"Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}"},
            timeout=10
        )
        if response.status_code == 200:
            blobs = response.json().get("blobs", [])
            if blobs:
                content_resp = requests.get(blobs[0].get("url"), timeout=10)
                if content_resp.status_code == 200:
                    return content_resp.json()
        return []
    except Exception as e:
        print(f"Error getting feedback: {e}")
        return []

def save_feedback(feedback_list: list) -> bool:
    """Save feedback to Vercel Blob."""
    try:
        blob_delete(FEEDBACK_PATH)
        response = requests.put(
            f"{BLOB_API_BASE}/{FEEDBACK_PATH}",
            headers={
                "Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}",
                "Content-Type": "application/json",
                "x-api-version": "7"
            },
            data=json.dumps(feedback_list),
            timeout=10
        )
        return response.status_code in [200, 201]
    except Exception as e:
        print(f"Error saving feedback: {e}")
        return False

@app.post("/api/feedback")
async def submit_feedback(feedback: ReportFeedback):
    """Submit feedback for a report."""
    # Validate rating
    if feedback.rating < 1 or feedback.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")

    # Sanitize comment
    comment = feedback.comment.strip()[:500] if feedback.comment else None
    email = feedback.email.strip().lower() if feedback.email else None

    # Validate email if provided
    if email and not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
        raise HTTPException(status_code=400, detail="Invalid email format")

    # Create feedback record
    feedback_record = {
        "id": hashlib.sha256(f"{feedback.report_slug}{datetime.utcnow().isoformat()}".encode()).hexdigest()[:12],
        "report_slug": feedback.report_slug,
        "rating": feedback.rating,
        "comment": comment,
        "email": email,
        "submitted_at": datetime.utcnow().isoformat()
    }

    # Save to blob storage
    feedback_list = get_feedback()
    feedback_list.append(feedback_record)
    save_feedback(feedback_list)

    # Notify admin if rating is low (1-2) or has a comment
    if feedback.rating <= 2 or comment:
        stars = "" * feedback.rating + "" * (5 - feedback.rating)
        admin_html = f"""
        <!DOCTYPE html>
        <html>
        <body style="font-family: -apple-system, sans-serif; padding: 20px;">
            <h2>Report Feedback Received</h2>
            <p><strong>Report:</strong> {feedback.report_slug}</p>
            <p><strong>Rating:</strong> {stars} ({feedback.rating}/5)</p>
            <p><strong>Comment:</strong> {comment if comment else '(none)'}</p>
            <p><strong>Email:</strong> {email if email else '(anonymous)'}</p>
            <p style="color: #888; font-size: 12px;">Submitted: {feedback_record['submitted_at']}</p>
        </body>
        </html>
        """
        send_resend_email("chris@genuverity.com", f"[FEEDBACK] {feedback.report_slug} - {feedback.rating}/5 stars", admin_html)

    return {
        "success": True,
        "message": "Thank you for your feedback!"
    }


# === TAGLINE SURVEY ===

class TaglineSurvey(BaseModel):
    email: str
    taglines: list[str]

@app.post("/api/tagline-survey")
async def submit_tagline_survey(survey: TaglineSurvey):
    """Submit tagline survey responses."""
    if not survey.taglines:
        raise HTTPException(status_code=400, detail="No taglines selected")

    if not survey.email:
        raise HTTPException(status_code=400, detail="Email required")

    # Build admin notification email
    admin_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a12; color: #ffffff; padding: 40px; }}
            .container {{ max-width: 600px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 32px; border: 1px solid rgba(59, 130, 246, 0.2); }}
            h1 {{ color: #06b6d4; font-size: 1.5rem; margin-bottom: 24px; }}
            .respondent {{ color: #3b82f6; font-weight: 600; font-size: 1.1rem; margin-bottom: 20px; }}
            .count {{ color: #a0aec0; margin-bottom: 24px; }}
            .tagline {{ background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; color: #ffffff; }}
            .footer {{ margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(59, 130, 246, 0.2); color: #64748b; font-size: 0.85rem; }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Tagline Survey Response</h1>
            <div class="respondent">From: {survey.email}</div>
            <div class="count">Selected {len(survey.taglines)} tagline(s):</div>
            {"".join([f'<div class="tagline">{t}</div>' for t in survey.taglines])}
            <div class="footer">
                Submitted via GenuVerity Tagline Survey
            </div>
        </div>
    </body>
    </html>
    """

    # Send to admin
    send_resend_email(
        "chris@genuverity.com",
        f"[TAGLINE SURVEY] {survey.email} selected {len(survey.taglines)} taglines",
        admin_html
    )

    # Send thank you to respondent
    thank_you_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a12; color: #ffffff; padding: 40px; margin: 0; }}
            .container {{ max-width: 600px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 40px; border: 1px solid rgba(59, 130, 246, 0.2); }}
            .logo {{ font-size: 1.75rem; font-weight: 700; margin-bottom: 32px; }}
            .logo-genu {{ color: #ffffff; }}
            .logo-verity {{ color: #3b82f6; }}
            h1 {{ color: #ffffff; font-size: 1.5rem; margin-bottom: 20px; }}
            p {{ color: #a0aec0; font-size: 1rem; line-height: 1.7; margin-bottom: 16px; }}
            .highlight {{ color: #06b6d4; font-weight: 600; }}
            .taglines-box {{ background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 12px; padding: 20px; margin: 24px 0; }}
            .taglines-title {{ color: #06b6d4; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }}
            .tagline-item {{ color: #ffffff; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }}
            .tagline-item:last-child {{ border-bottom: none; }}
            .cta {{ display: inline-block; margin-top: 24px; padding: 14px 28px; background: linear-gradient(135deg, #3b82f6, #06b6d4); border-radius: 10px; color: white; text-decoration: none; font-weight: 600; }}
            .footer {{ margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(59, 130, 246, 0.2); color: #64748b; font-size: 0.85rem; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <span class="logo-genu">Genu</span><span class="logo-verity">Verity</span>
            </div>
            <h1>Thanks for your feedback!</h1>
            <p>Your input is incredibly valuable as we finalize the GenuVerity brand. We're building something we think will genuinely help people cut through the noise and find the truth faster.</p>

            <div class="taglines-box">
                <div class="taglines-title">Your picks ({len(survey.taglines)} selected)</div>
                {"".join([f'<div class="tagline-item">{t}</div>' for t in survey.taglines])}
            </div>

            <p>We'll be launching soon with <span class="highlight">real-time fact-checking</span> that tracks viral claims as they spread and delivers source-heavy investigative reports back to where the conversation is happening.</p>

            <p>Want to be first to know when we go live?</p>

            <a href="https://genuverity7.vercel.app/" class="cta">Sign Up for Early Access</a>

            <div class="footer">
                <p>Thanks again for helping shape GenuVerity.</p>
                <p style="margin-top: 8px;">— Chris</p>
            </div>
        </div>
    </body>
    </html>
    """

    send_resend_email(
        survey.email,
        "Thanks for your tagline feedback!",
        thank_you_html
    )

    return {
        "success": True,
        "message": "Survey submitted successfully"
    }


# === FRED API PROXY (Protects API Key) ===

@app.get("/api/fred/{series_id}")
async def get_fred_data(series_id: str, limit: int = 52):
    """
    Proxy endpoint for FRED API data.
    Protects the API key while allowing frontend to fetch live economic data.

    Supported series:
    - WALCL: Fed Total Assets (weekly)
    - M2SL: M2 Money Supply (monthly)
    - CPIAUCSL: Consumer Price Index (monthly)
    - UNRATE: Unemployment Rate (monthly)
    - GDP: Gross Domestic Product (quarterly)
    """
    if not FRED_API_KEY:
        print(f"FRED_API_KEY not found in environment")
        raise HTTPException(status_code=503, detail="FRED API not configured")

    # Get API key fresh from environment (in case module-level load failed)
    # Strip any whitespace/quotes that might have been added accidentally
    raw_key = os.getenv("FRED_API_KEY") or FRED_API_KEY or ""
    fred_key = raw_key.strip().strip('"').strip("'")
    print(f"FRED request for series: {series_id}, key length: {len(fred_key)}, first/last char: '{fred_key[:1]}...{fred_key[-1:]}'")

    if not fred_key or len(fred_key) != 32:
        print(f"Invalid FRED key: raw length={len(raw_key)}, stripped length={len(fred_key)}")
        raise HTTPException(status_code=503, detail="FRED API key invalid or missing")

    # Whitelist of allowed series to prevent abuse
    allowed_series = {
        "WALCL", "M2SL", "CPIAUCSL", "UNRATE", "GDP",
        "FEDFUNDS", "DFF", "T10Y2Y", "MORTGAGE30US",
        "DEXUSEU", "DTWEXBGS", "VIXCLS", "SP500",
        "CURRCIR"  # Currency in Circulation - for debunking "cash ban" claims
    }

    if series_id.upper() not in allowed_series:
        raise HTTPException(
            status_code=400,
            detail=f"Series not allowed. Supported: {', '.join(sorted(allowed_series))}"
        )

    try:
        response = requests.get(
            "https://api.stlouisfed.org/fred/series/observations",
            params={
                "series_id": series_id.upper(),
                "api_key": fred_key,
                "file_type": "json",
                "limit": min(limit, 100),  # Cap at 100 observations
                "sort_order": "desc"
            },
            timeout=10
        )

        if response.status_code != 200:
            print(f"FRED API returned {response.status_code}: {response.text[:500]}")
            return {
                "series_id": series_id.upper(),
                "observations": [],
                "error": f"FRED API returned {response.status_code}",
                "fetched_at": datetime.utcnow().isoformat(),
                "source": "Federal Reserve Economic Data (FRED)",
                "source_url": f"https://fred.stlouisfed.org/series/{series_id.upper()}"
            }

        data = response.json()

        # Return observations with series metadata
        return {
            "series_id": series_id.upper(),
            "observations": data.get("observations", []),
            "fetched_at": datetime.utcnow().isoformat(),
            "source": "Federal Reserve Economic Data (FRED)",
            "source_url": f"https://fred.stlouisfed.org/series/{series_id.upper()}"
        }

    except requests.Timeout:
        raise HTTPException(status_code=504, detail="FRED API timeout")
    except Exception as e:
        import traceback
        error_detail = f"{type(e).__name__}: {str(e)}"
        print(f"FRED API error: {error_detail}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Failed to fetch FRED data: {error_detail}")
