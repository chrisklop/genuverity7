import os
import json
import hashlib
import re
import requests
import base64
from typing import Optional
from datetime import datetime, date
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import anthropic

# Load from environment variables (Vercel sets these automatically)
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
BLOB_READ_WRITE_TOKEN = os.getenv("BLOB_READ_WRITE_TOKEN")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
GOOGLE_FACT_CHECK_API_KEY = os.getenv("GOOGLE_FACT_CHECK_API_KEY")
# Gemini API keys with rotation for rate limits
GEMINI_API_KEYS = [
    os.getenv("GEMINI_API_KEY", "AIzaSyAEros8DbhXYeADSnoUs6a3p5qWNTZWgsY"),  # Primary key
    "AIzaSyAPlwFlIZZ3UBZn-OoH8RABbzOZrYbNZRg",  # Backup key 1
    "AIzaSyDRIHmMIQow7BlfROmeaJlfOI6FKYcA1l0",  # Backup key 2
]
GEMINI_API_KEY = GEMINI_API_KEYS[0]  # Default to primary
# Use Claude Sonnet 4 for quality investigative articles
CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-20250514")
# Gemini 3 Pro Image for infographic generation (superior quality)
GEMINI_IMAGE_MODEL = "gemini-3-pro-image-preview"
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models"

# Track which key to use (rotates on rate limit)
_current_key_index = 0

# Vercel Blob Storage configuration
BLOB_STORE_ID = "store_R5FvidKLuXLBeOEd"
BLOB_API_BASE = "https://blob.vercel-storage.com"

# Fallback to /tmp for local development (ephemeral on Vercel)
CACHE_DIR = "/tmp/article_cache"
USER_USAGE_FILE = "/tmp/user_usage.json"
FREE_DAILY_LIMIT = 5

# Article index for fast listing (stored in Blob storage)
ARTICLE_INDEX_PATH = "articles/_index.json"

# Ensure cache directory exists (fallback)
os.makedirs(CACHE_DIR, exist_ok=True)

# Configure Anthropic with 5-minute timeout (matches Vercel Pro maxDuration)
claude_client = anthropic.Anthropic(
    api_key=ANTHROPIC_API_KEY,
    timeout=300.0  # 5 minutes - prevents premature timeout on long generations
) if ANTHROPIC_API_KEY else None

# === GEMINI INFOGRAPHIC GENERATION ===

# GenuVerity "Midnight Tech" Style - professional investigative journalism aesthetic
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

def generate_gemini_infographic(chart_config: dict, title: str, chart_id: str, article_context: str = "") -> Optional[str]:
    """Generate an infographic image using Gemini 3 Pro Image.

    Args:
        chart_config: Dict with type, data (labels, values, colors), title
        title: Overall title for the infographic (article title)
        chart_id: Unique identifier for caching
        article_context: Additional context about what this data represents (for shareability)

    Returns:
        Base64-encoded PNG image or None if generation fails
    """
    global _current_key_index

    if not GEMINI_API_KEYS:
        print("No GEMINI_API_KEYS configured, skipping infographic generation")
        return None

    chart_type = chart_config.get("type", "bar")
    data = chart_config.get("data", {})
    chart_title = chart_config.get("title", title)
    labels = data.get("labels", [])
    values = data.get("values", [])
    colors = data.get("colors", ["#3b82f6"])

    # Build data description for the prompt
    data_points = []
    for i, (label, value) in enumerate(zip(labels, values)):
        color = colors[i % len(colors)] if colors else "#3b82f6"
        data_points.append(f"- {label}: {value} (color: {color})")
    data_description = "\n".join(data_points)

    # Build context section for shareability
    context_section = ""
    if article_context:
        context_section = f"""
ARTICLE CONTEXT (for shareable infographic):
This infographic is part of an investigation titled: "{title}"
{article_context}

IMPORTANT: Include enough context in the infographic that someone seeing ONLY this image understands:
- What topic/entity this data is about (e.g., "Congressional Leaders", "AI Companies", etc.)
- What time period or scope the data covers
- Why this data matters"""

    # Craft the infographic generation prompt with Midnight Tech style
    prompt = f"""Generate a professional data visualization infographic that is SHAREABLE and SELF-EXPLANATORY.

CRITICAL STYLE REQUIREMENTS - YOU MUST FOLLOW THESE EXACTLY:
{INFOGRAPHIC_STYLE}
{context_section}

CHART SPECIFICATIONS:
- Chart Type: {chart_type.upper()} CHART
- Title: "{chart_title}"
- Data Points:
{data_description}

MANDATORY REQUIREMENTS:
1. BACKGROUND MUST BE: Deep gradient from #050505 (near black) to #0a0a1a (dark blue-black) - NO WHITE OR LIGHT BACKGROUNDS
2. Use electric blue (#3b82f6) as primary accent color
3. Include the "GenuVerity" watermark in bottom-left corner (Genu=white, Verity=blue)
4. Create a visually striking {chart_type} chart with glowing edges and tech-forward aesthetic
5. Use crisp white (#ffffff) for data values, light gray (#a0a0b0) for labels
6. Add subtle blue glow effects on key elements
7. Size: 800x500 pixels
8. CONTEXT REQUIREMENT: Add a subtitle or context line below the title that explains WHAT this data represents (e.g., "Leadership PAC Spending by U.S. Congressional Leaders, 2020-2024")

THIS IS A DARK THEME INFOGRAPHIC. The background MUST be nearly black (#050505 to #0a0a1a). Do NOT use white, light gray, or any light-colored backgrounds.

The infographic should be SHAREABLE - someone seeing only this image should understand the full context without needing to read the article.

Generate the Midnight Tech style infographic now."""

    # Try each API key with retry logic
    import time
    max_retries = len(GEMINI_API_KEYS) * 2
    retry_delay = 5

    for attempt in range(max_retries):
        current_key = GEMINI_API_KEYS[_current_key_index % len(GEMINI_API_KEYS)]

        try:
            print(f"Infographic attempt {attempt + 1}/{max_retries} with key index {_current_key_index % len(GEMINI_API_KEYS)}")

            response = requests.post(
                f"{GEMINI_API_URL}/{GEMINI_IMAGE_MODEL}:generateContent?key={current_key}",
                headers={"Content-Type": "application/json"},
                json={
                    "contents": [{
                        "role": "user",
                        "parts": [{"text": prompt}]
                    }],
                    "generationConfig": {
                        "responseModalities": ["TEXT", "IMAGE"],
                        "temperature": 0.2  # Lower temperature for consistent Midnight Tech style
                    }
                },
                timeout=180  # 3 minutes for infographic generation
            )

            if response.status_code == 200:
                result = response.json()
                # Extract image from response
                candidates = result.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    for part in parts:
                        if "inlineData" in part:
                            image_data = part["inlineData"].get("data")
                            mime_type = part["inlineData"].get("mimeType", "image/png")
                            if image_data:
                                print(f"Generated infographic for {chart_id}: {len(image_data)} bytes")
                                return f"data:{mime_type};base64,{image_data}"
                print(f"No image in Gemini response")
            elif response.status_code == 429:
                # Rate limited - rotate to next key
                print(f"Rate limited on key {_current_key_index % len(GEMINI_API_KEYS)}, rotating...")
                _current_key_index += 1
                time.sleep(retry_delay)
                continue
            else:
                print(f"Gemini API error ({response.status_code}): {response.text[:200]}")
                _current_key_index += 1

        except Exception as e:
            print(f"Gemini infographic generation error: {e}")
            _current_key_index += 1

        time.sleep(2)  # Brief pause between attempts

    return None


def generate_infographics_for_article(chart_configs: dict, article_title: str, article_description: str = "") -> dict:
    """Generate Gemini infographics for all charts in an article.

    Args:
        chart_configs: Dict of chart_id -> chart_config
        article_title: Title of the article for context
        article_description: Brief description of the article topic for shareable context

    Returns:
        Dict of chart_id -> base64 image data URL (or None if failed)
    """
    infographics = {}

    # Build context string for shareability
    article_context = article_description if article_description else ""

    for chart_id, config in chart_configs.items():
        print(f"Generating infographic: {chart_id}")
        # Pass article context so infographics are self-explanatory when shared
        image_data = generate_gemini_infographic(config, article_title, chart_id, article_context)
        if image_data:
            infographics[chart_id] = image_data
        else:
            # Keep None to signal fallback to Chart.js
            infographics[chart_id] = None

    return infographics


# === TAVILY WEB SEARCH FOR REAL SOURCES ===

def search_sources(topic: str, max_results: int = 10) -> list:
    """Search for real sources using Tavily API.

    Returns list of sources with real URLs, titles, and snippets.
    """
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

            # Transform to our source format
            sources = []
            for i, r in enumerate(results):
                # Calculate trust score based on domain reputation
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
    # Tier 1: Major news organizations, government, academic
    tier1 = [
        "reuters.com", "apnews.com", "bbc.com", "bbc.co.uk", "npr.org",
        "nytimes.com", "washingtonpost.com", "wsj.com", "economist.com",
        "theguardian.com", "ft.com", "bloomberg.com", "politico.com",
        ".gov", ".edu", "nature.com", "science.org", "pubmed.ncbi.nlm.nih.gov"
    ]

    # Tier 2: Respected national/regional outlets
    tier2 = [
        "cnn.com", "nbcnews.com", "cbsnews.com", "abcnews.go.com", "usatoday.com",
        "latimes.com", "chicagotribune.com", "seattletimes.com", "bostonglobe.com",
        "theatlantic.com", "newyorker.com", "vox.com", "axios.com", "thehill.com",
        "propublica.org", "businessinsider.com", "forbes.com", "fortune.com"
    ]

    # Tier 3: Trade publications, specialized sources
    tier3 = [
        "techcrunch.com", "wired.com", "arstechnica.com", "theverge.com",
        "cnbc.com", "marketwatch.com", "investopedia.com", "sec.gov",
        "nih.gov", "cdc.gov", "fda.gov", "whitehouse.gov"
    ]

    domain_lower = domain.lower()

    for d in tier1:
        if d in domain_lower:
            return 95 + (hash(domain) % 5)  # 95-99

    for d in tier2:
        if d in domain_lower:
            return 85 + (hash(domain) % 10)  # 85-94

    for d in tier3:
        if d in domain_lower:
            return 75 + (hash(domain) % 10)  # 75-84

    # Default for unknown sources
    return 60 + (hash(domain) % 15)  # 60-74


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


def search_google_fact_checks(claim: str, max_results: int = 5) -> list:
    """Search Google Fact Check Tools API for existing fact checks from publishers like Snopes, PolitiFact, etc.

    Returns: list of prior fact checks with publisher, rating, and URL
    """
    if not GOOGLE_FACT_CHECK_API_KEY:
        print("GOOGLE_FACT_CHECK_API_KEY not set, skipping professional fact check search")
        return []

    try:
        # Google Fact Check Tools API - ClaimSearch endpoint
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
            # Each claim may have multiple reviews from different publishers
            for review in claim_obj.get("claimReview", []):
                publisher_name = review.get("publisher", {}).get("name", "Unknown Publisher")
                publisher_site = review.get("publisher", {}).get("site", "")

                # Map common ratings to standardized format
                rating = review.get("textualRating", "Unrated")
                rating_normalized = normalize_fact_check_rating(rating)

                fact_checks.append({
                    "publisher": publisher_name,
                    "publisher_site": publisher_site,
                    "claim_text": claim_obj.get("text", ""),
                    "claimant": claim_obj.get("claimant", "Unknown"),
                    "rating": rating,
                    "rating_normalized": rating_normalized,
                    "url": review.get("url", ""),
                    "title": review.get("title", ""),
                    "review_date": review.get("reviewDate", "")
                })

        print(f"Found {len(fact_checks)} existing fact checks from publishers")
        return fact_checks

    except Exception as e:
        print(f"Google Fact Check API error: {e}")
        return []


def normalize_fact_check_rating(rating: str) -> str:
    """Normalize various fact-check ratings to standard verdicts."""
    rating_lower = rating.lower()

    # True ratings
    if any(x in rating_lower for x in ["true", "correct", "accurate", "confirmed"]):
        if any(x in rating_lower for x in ["mostly", "partly", "half"]):
            return "MOSTLY_TRUE"
        return "TRUE"

    # False ratings
    if any(x in rating_lower for x in ["false", "wrong", "incorrect", "lie", "pants on fire", "fake"]):
        if any(x in rating_lower for x in ["mostly", "partly"]):
            return "MOSTLY_FALSE"
        return "FALSE"

    # Mixed/partial ratings
    if any(x in rating_lower for x in ["mixed", "half", "misleading", "distort", "cherry pick", "lack context"]):
        return "MIXED"

    # Unverifiable
    if any(x in rating_lower for x in ["unverifiable", "unproven", "unknown", "outdated"]):
        return "UNVERIFIABLE"

    return "MIXED"  # Default to mixed if can't categorize


def format_prior_fact_checks_html(fact_checks: list) -> str:
    """Format prior fact checks as HTML for display in the article."""
    if not fact_checks:
        return ""

    # Group by normalized rating for summary
    ratings_count = {}
    for fc in fact_checks:
        r = fc["rating_normalized"]
        ratings_count[r] = ratings_count.get(r, 0) + 1

    # Build summary
    summary_parts = []
    for rating, count in sorted(ratings_count.items(), key=lambda x: -x[1]):
        summary_parts.append(f"{count} rated <strong>{rating.replace('_', ' ')}</strong>")
    summary = ", ".join(summary_parts)

    cards_html = ""
    for fc in fact_checks[:5]:  # Max 5 cards
        rating_class = fc["rating_normalized"].lower()
        cards_html += f"""
        <div class="prior-fact-check-card {rating_class}" onclick="window.open('{fc['url']}', '_blank')">
            <div class="pfc-publisher">{fc['publisher']}</div>
            <div class="pfc-rating">{fc['rating']}</div>
            <div class="pfc-title">{fc['title'][:100]}{'...' if len(fc.get('title', '')) > 100 else ''}</div>
        </div>
        """

    return f"""
    <div class="prior-fact-checks-section">
        <h3 class="prose-h2">Professional Fact Checks</h3>
        <p class="prose-text">This claim has been previously fact-checked by professional organizations: {summary}.</p>
        <div class="prior-fact-checks-grid">
            {cards_html}
        </div>
        <p class="pfc-disclaimer">Click any card to view the full fact-check from the original publisher.</p>
    </div>
    """


# === VERCEL BLOB STORAGE UTILITIES ===

def blob_put(path: str, content: str) -> Optional[str]:
    """Upload content to Vercel Blob Storage. Returns blob URL on success."""
    if not BLOB_READ_WRITE_TOKEN:
        print("BLOB_READ_WRITE_TOKEN not set, skipping blob storage")
        return None

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
            print(f"Blob stored: {path} -> {result.get('url', 'unknown')}")
            return result.get("url")
        else:
            print(f"Blob PUT failed ({response.status_code}): {response.text}")
            return None
    except Exception as e:
        print(f"Blob PUT error: {e}")
        return None

def blob_get(path: str) -> Optional[dict]:
    """Fetch content from Vercel Blob Storage. Returns parsed JSON or None."""
    if not BLOB_READ_WRITE_TOKEN:
        return None

    try:
        # List blobs to find the URL for this path
        response = requests.get(
            f"{BLOB_API_BASE}",
            headers={
                "Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}",
                "x-api-version": "7"
            },
            params={"prefix": path, "limit": 1}
        )
        if response.status_code == 200:
            result = response.json()
            blobs = result.get("blobs", [])
            if blobs:
                blob_url = blobs[0].get("url")
                # Fetch the actual content
                content_response = requests.get(blob_url)
                if content_response.status_code == 200:
                    return content_response.json()
        return None
    except Exception as e:
        print(f"Blob GET error: {e}")
        return None

def blob_list(prefix: str = "articles/") -> list:
    """List all blobs with a given prefix."""
    if not BLOB_READ_WRITE_TOKEN:
        return []

    try:
        response = requests.get(
            f"{BLOB_API_BASE}",
            headers={
                "Authorization": f"Bearer {BLOB_READ_WRITE_TOKEN}",
                "x-api-version": "7"
            },
            params={"prefix": prefix, "limit": 1000}
        )
        if response.status_code == 200:
            result = response.json()
            return result.get("blobs", [])
        return []
    except Exception as e:
        print(f"Blob LIST error: {e}")
        return []

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    topic: str

class DeepDiveRequest(BaseModel):
    topic: str
    context: str = ""
    parent_key: str = ""  # Key of the parent article this deep dive originated from
    parent_title: str = ""  # Title of the parent article

class CacheCheckRequest(BaseModel):
    topic: str

# === CACHING UTILITIES ===

def get_topic_key(topic: str) -> str:
    """Generate a consistent cache key for a topic."""
    normalized = topic.lower().strip()
    return hashlib.md5(normalized.encode()).hexdigest()[:16]

def get_cached_article(topic: str) -> Optional[dict]:
    """Check if an article exists in the cache by topic hash OR by internal article key.
    Tries Blob storage first, then falls back to filesystem.
    """
    key = get_topic_key(topic)
    blob_path = f"articles/{key}.json"

    # 1. Try Blob storage by topic hash
    data = blob_get(blob_path)
    if data:
        print(f"Found article in Blob storage: {blob_path}")
        return data

    # 2. Search Blob storage by internal key (scan all articles)
    blobs = blob_list("articles/")
    for blob in blobs:
        try:
            blob_url = blob.get("url")
            if blob_url:
                response = requests.get(blob_url)
                if response.status_code == 200:
                    article = response.json()
                    # Check if internal key matches
                    if article.get("key") == topic:
                        print(f"Found article by internal key in Blob: {topic}")
                        return article
                    # Also check topic field
                    if article.get("_topic", "").lower() == topic.lower():
                        print(f"Found article by _topic in Blob: {topic}")
                        return article
        except:
            continue

    # 3. Fallback: Try filesystem by topic hash (local dev)
    cache_file = f"{CACHE_DIR}/{key}.json"
    if os.path.exists(cache_file):
        try:
            with open(cache_file, "r") as f:
                return json.load(f)
        except:
            pass

    # 4. Fallback: Search filesystem by internal key
    if os.path.exists(CACHE_DIR):
        for filename in os.listdir(CACHE_DIR):
            if filename.endswith(".json"):
                try:
                    with open(f"{CACHE_DIR}/{filename}", "r") as f:
                        data = json.load(f)
                        if data.get("key") == topic:
                            return data
                        if data.get("_topic", "").lower() == topic.lower():
                            return data
                except:
                    continue
    return None

def cache_article(topic: str, article_data: dict, parent_key: str = "", parent_title: str = ""):
    """Save an article to the cache. Uses Blob storage if available, with filesystem fallback."""
    key = get_topic_key(topic)
    article_data["_cached_at"] = datetime.now().isoformat()
    article_data["_topic"] = topic
    if parent_key:
        article_data["_parent_key"] = parent_key
    if parent_title:
        article_data["_parent_title"] = parent_title

    # Try Blob storage first
    blob_path = f"articles/{key}.json"
    blob_url = blob_put(blob_path, json.dumps(article_data))

    if blob_url:
        print(f"Article cached to Blob: {blob_url}")
        # Update the article index for fast listing
        update_article_index(key, article_data)
    else:
        # Fallback to filesystem
        cache_file = f"{CACHE_DIR}/{key}.json"
        with open(cache_file, "w") as f:
            json.dump(article_data, f)
        print(f"Article cached to filesystem: {cache_file}")

def get_article_index() -> dict:
    """Get the article index from Blob storage. Returns dict of key -> metadata."""
    try:
        # Try to find the index blob
        blobs = blob_list("articles/")
        for blob in blobs:
            if blob.get("pathname") == ARTICLE_INDEX_PATH:
                response = requests.get(blob.get("url"))
                if response.status_code == 200:
                    return response.json()
        return {}
    except Exception as e:
        print(f"Error loading article index: {e}")
        return {}

def update_article_index(article_key: str, metadata: dict):
    """Add or update an article in the index."""
    try:
        # Load existing index
        index = get_article_index()

        # Add/update the article metadata
        index[article_key] = {
            "key": article_key,
            "title": metadata.get("title", "Unknown"),
            "cardTitle": metadata.get("cardTitle", ""),
            "cardTag": metadata.get("cardTag", ""),
            "cardDescription": metadata.get("cardDescription", ""),
            "topic": metadata.get("_topic", ""),
            "cached_at": metadata.get("_cached_at", datetime.now().isoformat()),
            "parent_key": metadata.get("_parent_key", ""),
            "parent_title": metadata.get("_parent_title", ""),
            "is_child": bool(metadata.get("isChildEssay", False))
        }

        # Save updated index
        blob_put(ARTICLE_INDEX_PATH, json.dumps(index))
        print(f"Article index updated: {article_key}")
    except Exception as e:
        print(f"Error updating article index: {e}")

def get_all_cached_articles() -> list:
    """Get list of all cached article topics. Uses fast index lookup."""
    articles = []
    seen_keys = set()

    # 1. First try the fast index (single HTTP request)
    index = get_article_index()
    if index:
        for key, metadata in index.items():
            if key not in seen_keys:
                seen_keys.add(key)
                articles.append(metadata)
        # If we got results from index, return immediately (fast path)
        if articles:
            return articles

    # 2. Fallback: Build index from blobs (slow, but only runs once or on empty index)
    print("Rebuilding article index from blob storage...")
    blobs = blob_list("articles/")
    new_index = {}

    for blob in blobs:
        try:
            pathname = blob.get("pathname", "")
            # Skip the index file itself
            if pathname == ARTICLE_INDEX_PATH:
                continue

            blob_url = blob.get("url")
            if blob_url:
                response = requests.get(blob_url)
                if response.status_code == 200:
                    data = response.json()
                    article_key = data.get("key", pathname.split("/")[-1].replace(".json", ""))
                    if article_key not in seen_keys:
                        seen_keys.add(article_key)
                        metadata = {
                            "key": article_key,
                            "title": data.get("title", "Unknown"),
                            "cardTitle": data.get("cardTitle", ""),
                            "cardTag": data.get("cardTag", ""),
                            "cardDescription": data.get("cardDescription", ""),
                            "topic": data.get("_topic", ""),
                            "cached_at": data.get("_cached_at", ""),
                            "parent_key": data.get("_parent_key", ""),
                            "parent_title": data.get("_parent_title", ""),
                            "is_child": bool(data.get("isChildEssay", False))
                        }
                        articles.append(metadata)
                        new_index[article_key] = metadata
        except:
            continue

    # 3. Also check filesystem (for local dev)
    if os.path.exists(CACHE_DIR):
        for filename in os.listdir(CACHE_DIR):
            if filename.endswith(".json"):
                try:
                    with open(f"{CACHE_DIR}/{filename}", "r") as f:
                        data = json.load(f)
                        article_key = data.get("key", filename[:-5])
                        if article_key not in seen_keys:
                            seen_keys.add(article_key)
                            metadata = {
                                "key": article_key,
                                "title": data.get("title", "Unknown"),
                                "cardTitle": data.get("cardTitle", ""),
                                "cardTag": data.get("cardTag", ""),
                                "cardDescription": data.get("cardDescription", ""),
                                "topic": data.get("_topic", ""),
                                "cached_at": data.get("_cached_at", ""),
                                "parent_key": data.get("_parent_key", ""),
                                "parent_title": data.get("_parent_title", ""),
                                "is_child": bool(data.get("isChildEssay", False))
                            }
                            articles.append(metadata)
                            new_index[article_key] = metadata
                except:
                    continue

    # 4. Save the rebuilt index for next time (if we built one)
    if new_index:
        blob_put(ARTICLE_INDEX_PATH, json.dumps(new_index))
        print(f"Article index rebuilt with {len(new_index)} articles")

    return articles

# === USER USAGE TRACKING ===

def get_user_id(request: Request) -> str:
    """Get a simple user identifier (IP-based)."""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"

def load_usage_data() -> dict:
    """Load user usage data."""
    if os.path.exists(USER_USAGE_FILE):
        try:
            with open(USER_USAGE_FILE, "r") as f:
                return json.load(f)
        except:
            return {}
    return {}

def save_usage_data(data: dict):
    """Save user usage data."""
    with open(USER_USAGE_FILE, "w") as f:
        json.dump(data, f)

def get_user_usage_today(user_id: str) -> int:
    """Get how many deep dives a user has generated today."""
    data = load_usage_data()
    today = date.today().isoformat()
    if user_id not in data:
        return 0
    user_data = data[user_id]
    if user_data.get("date") != today:
        return 0
    return user_data.get("count", 0)

def increment_user_usage(user_id: str):
    """Increment user's daily usage count."""
    data = load_usage_data()
    today = date.today().isoformat()
    if user_id not in data or data[user_id].get("date") != today:
        data[user_id] = {"date": today, "count": 1}
    else:
        data[user_id]["count"] = data[user_id].get("count", 0) + 1
    save_usage_data(data)

def get_remaining_free_dives(user_id: str) -> int:
    """Get remaining free deep dives for today."""
    used = get_user_usage_today(user_id)
    return max(0, FREE_DAILY_LIMIT - used)


def extract_chartconfigs(text: str) -> dict:
    """Extract chartConfigs from partial JSON using regex - critical for timeout recovery."""
    charts = {}

    # Look for chartConfigs section
    chart_section = re.search(r'"chartConfigs"\s*:\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}', text, re.DOTALL)
    if not chart_section:
        return charts

    section = chart_section.group(1)

    # Extract individual chart definitions
    chart_patterns = [
        r'"(chart_\w+)"\s*:\s*(\{[^}]*"type"\s*:\s*"[^"]+"\s*,[^}]*"data"\s*:\s*\{[^}]*\}[^}]*\})',
    ]

    for pattern in chart_patterns:
        for match in re.finditer(pattern, section, re.DOTALL):
            chart_id = match.group(1)
            chart_json = match.group(2)
            try:
                # Clean up and parse
                chart_json = chart_json.replace("'", '"')
                charts[chart_id] = json.loads(chart_json)
                print(f"Extracted chart: {chart_id}")
            except:
                # Try manual extraction
                type_match = re.search(r'"type"\s*:\s*"([^"]+)"', chart_json)
                title_match = re.search(r'"title"\s*:\s*"([^"]+)"', chart_json)
                labels_match = re.search(r'"labels"\s*:\s*\[([^\]]+)\]', chart_json)
                values_match = re.search(r'"values"\s*:\s*\[([^\]]+)\]', chart_json)
                colors_match = re.search(r'"colors"\s*:\s*\[([^\]]+)\]', chart_json)

                if type_match and labels_match and values_match:
                    try:
                        labels = json.loads(f"[{labels_match.group(1)}]")
                        values = json.loads(f"[{values_match.group(1)}]")
                        colors = json.loads(f"[{colors_match.group(1)}]") if colors_match else ["#3b82f6"]
                        charts[chart_id] = {
                            "type": type_match.group(1),
                            "data": {"labels": labels, "values": values, "colors": colors},
                            "title": title_match.group(1) if title_match else "Chart"
                        }
                        print(f"Manually extracted chart: {chart_id}")
                    except:
                        pass

    return charts


def sanitize_json_string(text: str) -> str:
    """Fix common LLM JSON issues before parsing."""
    # Replace smart quotes with straight quotes
    text = text.replace('"', '"').replace('"', '"')
    text = text.replace(''', "'").replace(''', "'")

    # Remove any BOM or zero-width characters
    text = text.replace('\ufeff', '').replace('\u200b', '')

    # Fix unescaped control characters inside strings (common LLM issue)
    # This is tricky - we need to escape actual newlines/tabs that aren't already escaped
    result = []
    in_string = False
    i = 0
    while i < len(text):
        c = text[i]
        if c == '"' and (i == 0 or text[i-1] != '\\'):
            in_string = not in_string
            result.append(c)
        elif in_string:
            # Inside a string, escape control characters
            if c == '\n':
                result.append('\\n')
            elif c == '\r':
                result.append('\\r')
            elif c == '\t':
                result.append('\\t')
            else:
                result.append(c)
        else:
            result.append(c)
        i += 1

    text = ''.join(result)

    # Remove trailing commas before } or ] (common LLM error)
    text = re.sub(r',(\s*[}\]])', r'\1', text)

    return text


def repair_truncated_json(text: str) -> Optional[dict]:
    """Attempt to repair truncated JSON from timeout responses."""
    if not text or not text.strip():
        return None

    text = text.strip()

    # Remove markdown fences
    if text.startswith("```json"):
        text = text[7:]
    if text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]
    text = text.strip()

    # Sanitize common LLM JSON issues
    text = sanitize_json_string(text)

    # Try parsing as-is first
    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        print(f"Initial JSON parse failed at position {e.pos}: {e.msg}")

    # Count unclosed braces/brackets and try to close them
    open_braces = text.count('{') - text.count('}')
    open_brackets = text.count('[') - text.count(']')

    # Find if we're inside a string (look for unmatched quotes)
    in_string = False
    i = 0
    while i < len(text):
        if text[i] == '"' and (i == 0 or text[i-1] != '\\'):
            in_string = not in_string
        i += 1

    # If we're inside a string, try to close it
    repaired = text
    if in_string:
        repaired = text + '"'

    # Close brackets then braces
    repaired += ']' * max(0, open_brackets)
    repaired += '}' * max(0, open_braces)

    # Try to parse repaired JSON
    try:
        data = json.loads(repaired)
        print(f"JSON repair successful: closed {open_braces} braces, {open_brackets} brackets")
        return data
    except Exception as e:
        print(f"JSON repair failed: {e}")

    # Last resort: extract fields with regex - PRESERVE CHARTS!
    try:
        key_match = re.search(r'"key"\s*:\s*"([^"]+)"', text)
        title_match = re.search(r'"title"\s*:\s*"([^"]+)"', text)
        card_title_match = re.search(r'"cardTitle"\s*:\s*"([^"]+)"', text)
        card_tag_match = re.search(r'"cardTag"\s*:\s*"([^"]+)"', text)
        card_desc_match = re.search(r'"cardDescription"\s*:\s*"([^"]+)"', text)

        if key_match and title_match:
            # CRITICAL: Extract chartConfigs even from truncated JSON
            chart_configs = extract_chartconfigs(text)
            print(f"Extracted {len(chart_configs)} charts from truncated JSON")

            # Extract content - it comes AFTER chartConfigs now
            content_match = re.search(r'"content"\s*:\s*"(.*?)(?:"\s*[,}]|$)', text, re.DOTALL)
            content = content_match.group(1) if content_match else "<p class='prose-text'>Article content was truncated. The charts and data are preserved.</p>"

            # Unescape the content
            content = content.replace('\\"', '"').replace('\\n', '\n')

            return {
                "key": key_match.group(1),
                "title": title_match.group(1),
                "cardTitle": card_title_match.group(1) if card_title_match else title_match.group(1)[:50],
                "cardTag": card_tag_match.group(1) if card_tag_match else "INVESTIGATION",
                "cardDescription": card_desc_match.group(1) if card_desc_match else "",
                "content": content,
                "chartConfigs": chart_configs,  # PRESERVE CHARTS!
                "contextData": {},
                "citationDatabase": {},
                "sources": [],
                "_partial": True
            }
    except Exception as e:
        print(f"Regex extraction failed: {e}")

    return None


# Comprehensive investigative journalism template - OPTIMIZED FOR 60s TIMEOUT
# Key optimization: chartConfigs comes FIRST so it's captured even if content is truncated
ARTICLE_TEMPLATE = """
Investigative exposé on: "{topic}"
{context_section}

INFOGRAPHIC DECISION - Set "generateInfographics" to true ONLY if the article would benefit from data visualization:
- TRUE if: Financial data, statistics, trends over time, comparisons, percentages, poll results, scientific measurements
- FALSE if: Biography, breaking news, event coverage, opinion analysis, policy explanations, historical narratives without data
If generateInfographics is false, set chartConfigs to empty object {{}}.

RETURN ONLY VALID JSON. CRITICAL: Generate chartConfigs FIRST (before content) to ensure charts are captured.

{{
  "key": "{topic_slug}",
  "title": "Compelling headline with specific hook",
  "cardTitle": "3-5 word card title",
  "cardTag": "CATEGORY // SUBCATEGORY",
  "cardTagColor": "text-red-400",
  "cardDescription": "One-line teaser",
  "generateInfographics": true,
  "chartConfigs": {{
    "chart_main": {{"type": "bar", "data": {{"labels": ["A", "B", "C", "D"], "values": [num1, num2, num3, num4], "colors": ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]}}, "title": "Main Chart"}},
    "chart_secondary": {{"type": "line", "data": {{"labels": ["2020", "2021", "2022", "2023", "2024"], "values": [v1, v2, v3, v4, v5], "colors": ["#8b5cf6"]}}, "title": "Trend"}},
    "chart_tertiary": {{"type": "pie", "data": {{"labels": ["X", "Y", "Z"], "values": [40, 35, 25], "colors": ["#3b82f6", "#10b981", "#f59e0b"]}}, "title": "Distribution"}}
  }},
  "contextData": {{"person_1": {{"expanded": "..."}}, "org_1": {{"expanded": "..."}}, "stat_1": {{"expanded": "..."}}, "...50+ ENTRIES TOTAL, ONE FOR EACH FRACTAL-TRIGGER...": {{"expanded": "..."}}}},
  "citationDatabase": {{"src1": {{"domain": "reuters.com", "trustScore": 95, "title": "Title", "snippet": "Quote", "url": "https://..."}}}},
  "sources": [{{"name": "Source", "score": 95, "url": "https://..."}}],
  "content": "HTML CONTENT HERE"
}}

HTML structure for content field:
- <p class="prose-text"><strong class="text-white">Executive Summary:</strong> Key finding with <span class="highlight-glow">stat</span> and <span class="living-number" data-target="NUM" data-suffix="SUFFIX">$0</span> <span class="citation-spade" data-id="src1">♠</span></p>
- <h2 class="prose-h2">1. Section</h2> with <div class="float-figure right"><div style="height:250px"><canvas id="chart_main"></canvas></div><div class="fig-caption">Caption <span class="fig-deep-dive" onclick="handleDeepDive(this)">DEEP DIVE</span></div></div>
- <strong class="fractal-trigger" onclick="expandContext(this,'key')">technical terms</strong> for deep-dives
- If generateInfographics is true: 5 sections, 3 charts (bar, line, pie), 8+ living numbers, 50+ fractal triggers (8-15 per section), 15+ citations - Alternate float-figure right/left
- If generateInfographics is false: 5 sections, 8+ living numbers, 50+ fractal triggers, 15+ citations - NO float-figure elements, focus on rich prose

FRACTAL TRIGGERS ARE CRITICAL - YOU MUST WRAP 50+ TERMS with <strong class="fractal-trigger" onclick="expandContext(this,'key_name')">term</strong>:

MANDATORY CATEGORIES TO WRAP (wrap EVERY instance):
1. PEOPLE: Every person mentioned - CEOs, politicians, researchers, experts, witnesses, founders, executives, whistleblowers
2. ORGANIZATIONS: Every company, agency, NGO, institution, university, think tank, regulatory body, trade group
3. STATISTICS: Every significant number, percentage, dollar amount - explain what it means in context
4. LOCATIONS: Countries, cities, facilities, headquarters, research sites - explain their significance
5. DATES/PERIODS: Specific years, decades, eras, deadlines - explain what happened or will happen
6. LAWS/REGULATIONS: Any legal references, acts, bills, court cases, rulings, treaties
7. TECHNICAL TERMS: Industry jargon, scientific concepts, acronyms, methodologies, processes
8. PRODUCTS/PROJECTS: Specific products, initiatives, programs, technologies, platforms
9. EVENTS: Conferences, trials, incidents, elections, announcements, launches, scandals
10. CONCEPTS: Economic theories, business models, strategic frameworks, scientific principles

DENSITY REQUIREMENTS (STRICT):
- Minimum 10-15 fractal triggers PER SECTION (50-75 total across 5 sections)
- Every paragraph MUST have 3-5 triggers minimum
- EVERY person name MUST be wrapped - no exceptions
- EVERY organization/company name MUST be wrapped - no exceptions
- EVERY specific dollar amount or percentage MUST be wrapped
- EVERY law, act, or regulation MUST be wrapped
- EVERY date or year reference MUST be wrapped
- EVERY technical term or acronym MUST be wrapped

CRITICAL: MAXIMIZE fractal-trigger usage in content. Wrap EVERY wrappable term. The goal is 50-75 wrapped terms in the content. For each term you wrap with fractal-trigger, add a matching key to contextData.

Each trigger MUST have a corresponding entry in contextData with a substantive 2-3 sentence explanation that provides investigative context - who is this person? why does this org matter? what does this stat mean?

Return ONLY JSON. No markdown, no code fences.
"""

# Fact Check Template - Wiki-style verdict-focused format with SAME deep dive density
FACT_CHECK_TEMPLATE = """
Fact-check this claim: "{topic}"
{context_section}

You are a fact-checking journalist for GenuVerity. Verify this claim using the VERIFIED SOURCES provided above.

RETURN ONLY VALID JSON with this structure:

{{
  "key": "{topic_slug}",
  "articleType": "fact_check",
  "title": "Fact Check: [Claim summary]",
  "cardTitle": "VERDICT: [TRUE/FALSE/MIXED]",
  "cardTag": "FACT CHECK // VERIFICATION",
  "cardTagColor": "text-yellow-400",
  "cardDescription": "One-line verdict summary",
  "verdict": "TRUE | FALSE | MOSTLY_TRUE | MOSTLY_FALSE | MIXED | UNVERIFIABLE",
  "verdictConfidence": 85,
  "verdictSummary": "2-3 sentence explanation of the verdict",
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
  "chartConfigs": {{}},
  "contextData": {{"person_1": {{"expanded": "..."}}, "org_1": {{"expanded": "..."}}, "...50+ ENTRIES...": {{"expanded": "..."}}}},
  "citationDatabase": {{"src1": {{"domain": "reuters.com", "trustScore": 95, "title": "Title", "snippet": "Quote", "url": "https://..."}}}},
  "sources": [{{"name": "Source", "score": 95, "url": "https://..."}}],
  "content": "HTML CONTENT HERE"
}}

HTML structure for content field (WIKI-STYLE, NOT ESSAY):

<div class="verdict-banner verdict-[verdict_lowercase]">
  <div class="verdict-icon">[✓ for TRUE, ✗ for FALSE, ⚠ for MIXED/MOSTLY]</div>
  <div class="verdict-label">[VERDICT]</div>
  <div class="verdict-confidence">[confidence]% confidence based on [X] sources</div>
</div>

<p class="prose-text verdict-summary"><strong>Summary:</strong> [verdictSummary with fractal triggers]</p>

<h2 class="prose-h2">The Claim</h2>
<blockquote class="claim-quote">"[Original claim being fact-checked]"</blockquote>
<p class="prose-text">Context about where/when this claim originated, who made it...</p>

<h2 class="prose-h2">Evidence Analysis</h2>
<div class="evidence-section supporting">
  <h3>Supporting Evidence</h3>
  <ul>
    <li><strong class="fractal-trigger" onclick="expandContext(this,'evidence_1')">Evidence point</strong> <span class="citation-spade" data-id="src1">♠</span></li>
  </ul>
</div>
<div class="evidence-section contradicting">
  <h3>Contradicting Evidence</h3>
  <ul>
    <li><strong class="fractal-trigger" onclick="expandContext(this,'evidence_2')">Evidence point</strong> <span class="citation-spade" data-id="src2">♠</span></li>
  </ul>
</div>

<h2 class="prose-h2">Key Context</h2>
<p class="prose-text">Important background that affects how this claim should be interpreted...</p>

<h2 class="prose-h2">Source Verification</h2>
<p class="prose-text">Analysis of source reliability and methodology...</p>

<h2 class="prose-h2">Conclusion</h2>
<p class="prose-text">Final assessment with nuance...</p>

FRACTAL TRIGGERS ARE CRITICAL - YOU MUST WRAP 50+ TERMS with <strong class="fractal-trigger" onclick="expandContext(this,'key_name')">term</strong>:

MANDATORY CATEGORIES TO WRAP (wrap EVERY instance):
1. PEOPLE: Every person mentioned - politicians, experts, witnesses, sources
2. ORGANIZATIONS: Every company, agency, NGO, institution, fact-checking org
3. STATISTICS: Every number, percentage, dollar amount - explain what it means
4. LOCATIONS: Countries, cities, relevant places
5. DATES/PERIODS: When claims were made, when events occurred
6. LAWS/REGULATIONS: Any legal references relevant to the claim
7. TECHNICAL TERMS: Jargon, acronyms, methodologies
8. SOURCES: News outlets, studies, reports being cited
9. EVENTS: Incidents, announcements, speeches relevant to the claim
10. CONCEPTS: Logical fallacies, verification methods, journalistic standards

DENSITY REQUIREMENTS (STRICT):
- Minimum 50+ fractal triggers across all sections
- Every paragraph MUST have 3-5 triggers minimum
- EVERY person name MUST be wrapped
- EVERY organization MUST be wrapped
- EVERY statistic MUST be wrapped
- EVERY source citation MUST be wrapped

Each trigger MUST have a corresponding entry in contextData with a substantive 2-3 sentence explanation.

Return ONLY JSON. No markdown, no code fences.
"""


class FactCheckRequest(BaseModel):
    claim: str


@app.post("/api/fact-check")
async def generate_fact_check(request: FactCheckRequest, req: Request):
    """Fact-check a claim with verdict-focused wiki-style output."""
    if not ANTHROPIC_API_KEY or not claude_client:
        raise HTTPException(status_code=500, detail="Server missing ANTHROPIC_API_KEY environment variable.")

    print(f"Fact-checking claim: {request.claim}")

    topic_slug = request.claim.lower().replace(" ", "_").replace("-", "_")[:20]

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

            # Search for existing professional fact checks via Google Fact Check Tools API
            yield send_sse("progress", {"stage": "prior_checks", "percent": 6, "message": "Checking professional fact-checkers..."})
            prior_fact_checks = search_google_fact_checks(request.claim, max_results=5)

            # Search for real sources via Tavily
            yield send_sse("progress", {"stage": "sources", "percent": 8, "message": "Searching verified sources..."})
            real_sources = search_sources(request.claim, max_results=10)

            sources_section = format_sources_for_prompt(real_sources) if real_sources else ""

            prompt = FACT_CHECK_TEMPLATE.format(
                topic=request.claim,
                context_section=sources_section,
                topic_slug=topic_slug
            )

            yield send_sse("progress", {"stage": "connect", "percent": 12, "message": "Analyzing claim..."})

            with claude_client.messages.stream(
                model=CLAUDE_MODEL,
                max_tokens=6000,
                messages=[{"role": "user", "content": prompt}]
            ) as stream:
                yield send_sse("progress", {"stage": "research", "percent": 15, "message": "Verifying against sources..."})

                for text in stream.text_stream:
                    full_text += text

                    if '"verdict"' in full_text and not stages["verdict"]:
                        stages["verdict"] = True
                        yield send_sse("progress", {"stage": "verdict", "percent": 40, "message": "Determining verdict..."})

                    if '"evidenceSummary"' in full_text and not stages["evidence"]:
                        stages["evidence"] = True
                        yield send_sse("progress", {"stage": "evidence", "percent": 60, "message": "Analyzing evidence..."})

                    if '"sources"' in full_text and not stages["sources"]:
                        stages["sources"] = True
                        yield send_sse("progress", {"stage": "sources", "percent": 85, "message": "Verifying sources..."})

            yield send_sse("progress", {"stage": "parsing", "percent": 95, "message": "Finalizing fact check..."})

            parsed_data = repair_truncated_json(full_text)

            if parsed_data:
                if "key" not in parsed_data:
                    parsed_data["key"] = topic_slug
                parsed_data["chartType"] = "dynamic"
                parsed_data["articleType"] = "fact_check"
                parsed_data.setdefault("chartConfigs", {})
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

                # Inject Professional Fact Checks section if we found any
                if prior_fact_checks:
                    prior_fc_html = format_prior_fact_checks_html(prior_fact_checks)
                    # Insert after the verdict banner but before main content
                    content = parsed_data.get("content", "")
                    # Find end of verdict banner div
                    verdict_end = content.find('</div>', content.find('verdict-banner'))
                    if verdict_end > 0:
                        # Insert after verdict banner
                        insert_pos = verdict_end + 6  # After </div>
                        parsed_data["content"] = content[:insert_pos] + prior_fc_html + content[insert_pos:]
                    else:
                        # Fallback: prepend to content
                        parsed_data["content"] = prior_fc_html + content

                    # Also store raw fact check data for frontend flexibility
                    parsed_data["priorFactChecks"] = prior_fact_checks

                cache_article(request.claim, parsed_data)
                yield send_sse("progress", {"stage": "complete", "percent": 100, "message": "Fact check complete!"})
                yield f"event: content\ndata: {json.dumps(parsed_data)}\n\n"
            else:
                yield send_sse("error", "Failed to parse fact check response")

            yield send_sse("done", "ok")

        except Exception as e:
            print(f"Fact check error: {e}")
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


@app.post("/api/generate")
async def generate_report(request: GenerateRequest, req: Request):
    """Claude-powered report generation with SSE progress updates."""
    if not ANTHROPIC_API_KEY or not claude_client:
        raise HTTPException(status_code=500, detail="Server missing ANTHROPIC_API_KEY environment variable.")

    print(f"Generating report for: {request.topic}")

    topic_slug = request.topic.lower().replace(" ", "_").replace("-", "_")[:20]

    def send_sse(event: str, data) -> str:
        """Format a Server-Sent Event message."""
        return f"event: {event}\ndata: {json.dumps(data)}\n\n"

    async def stream_response():
        """Stream SSE progress events and final content."""
        full_text = ""
        char_count = 0
        real_sources = []

        # Progress stages based on content detection
        stages = {
            "title": False,
            "section_1": False,
            "section_2": False,
            "section_3": False,
            "charts": False,
            "sources": False
        }

        try:
            # Stage 1: Initializing
            yield send_sse("progress", {"stage": "init", "percent": 5, "message": "Preparing investigation..."})

            # Stage 2: Search for real sources via Tavily
            yield send_sse("progress", {"stage": "sources", "percent": 8, "message": "Searching verified sources..."})
            real_sources = search_sources(request.topic, max_results=10)

            # Build sources section for prompt
            sources_section = format_sources_for_prompt(real_sources) if real_sources else ""

            # Build the prompt with real sources
            prompt = ARTICLE_TEMPLATE.format(
                topic=request.topic,
                context_section=sources_section,
                topic_slug=topic_slug
            )

            # Stage 3: Connecting
            yield send_sse("progress", {"stage": "connect", "percent": 12, "message": "Initializing research pipeline..."})

            with claude_client.messages.stream(
                model=CLAUDE_MODEL,
                max_tokens=6000,  # Allow longer articles with 5-min Vercel timeout
                messages=[{"role": "user", "content": prompt}]
            ) as stream:
                # Stage 3: Researching
                yield send_sse("progress", {"stage": "research", "percent": 15, "message": "Researching topic..."})

                for text in stream.text_stream:
                    full_text += text
                    char_count += len(text)

                    # Detect progress based on content
                    if '"title"' in full_text and not stages["title"]:
                        stages["title"] = True
                        yield send_sse("progress", {"stage": "title", "percent": 25, "message": "Crafting headline..."})

                    if '"content"' in full_text and not stages["section_1"]:
                        stages["section_1"] = True
                        yield send_sse("progress", {"stage": "writing", "percent": 35, "message": "Writing introduction..."})

                    if '<h2 class="prose-h2">2.' in full_text and not stages["section_2"]:
                        stages["section_2"] = True
                        yield send_sse("progress", {"stage": "analysis", "percent": 50, "message": "Analyzing data..."})

                    if '<h2 class="prose-h2">3.' in full_text and not stages["section_3"]:
                        stages["section_3"] = True
                        yield send_sse("progress", {"stage": "deep", "percent": 65, "message": "Deep diving into findings..."})

                    if '"chartConfigs"' in full_text and not stages["charts"]:
                        stages["charts"] = True
                        yield send_sse("progress", {"stage": "charts", "percent": 80, "message": "Generating visualizations..."})

                    if '"sources"' in full_text and not stages["sources"]:
                        stages["sources"] = True
                        yield send_sse("progress", {"stage": "sources", "percent": 90, "message": "Verifying sources..."})

            # Parse the article BEFORE sending "complete"
            yield send_sse("progress", {"stage": "parsing", "percent": 95, "message": "Parsing response..."})

            parsed_data = None
            parse_error = None
            try:
                parsed_data = repair_truncated_json(full_text)
                if parsed_data:
                    # Ensure required fields
                    if "key" not in parsed_data:
                        parsed_data["key"] = topic_slug
                    # Mark as dynamic article for frontend chart rendering
                    parsed_data["chartType"] = "dynamic"
                    parsed_data.setdefault("chartConfigs", {})
                    parsed_data.setdefault("contextData", {})
                    parsed_data.setdefault("citationDatabase", {})
                    parsed_data.setdefault("sources", [])

                    # CRITICAL: Inject real sources from Tavily search
                    # This ensures citations have REAL URLs, not hallucinated ones
                    if real_sources:
                        # Build citationDatabase from real sources
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

                        # Replace Claude's hallucinated citations with real ones
                        parsed_data["citationDatabase"] = real_citation_db
                        parsed_data["sources"] = real_sources_list
                        print(f"Injected {len(real_sources)} real sources into article")

                    # Cache to Blob storage for persistence
                    try:
                        cache_article(request.topic, parsed_data)
                        print(f"Article cached from /api/generate: {request.topic}")
                    except Exception as cache_err:
                        print(f"Cache error (non-fatal): {cache_err}")
            except Exception as parse_err:
                parse_error = str(parse_err)
                print(f"Parse error: {parse_err}")

            # Always send a valid JSON object - NEVER send raw text
            if parsed_data:
                yield send_sse("progress", {"stage": "complete", "percent": 100, "message": "Investigation complete!"})
                yield f"event: content\ndata: {json.dumps(parsed_data)}\n\n"
            else:
                # Parsing failed - construct emergency fallback object
                print(f"JSON parsing failed for {len(full_text)} chars, constructing fallback")
                # Log first 500 chars of response for debugging
                print(f"Response preview: {full_text[:500] if full_text else 'EMPTY'}...")

                # Try to extract ANY useful content with aggressive regex
                fallback_data = {
                    "key": topic_slug,
                    "title": request.topic[:100],
                    "cardTitle": request.topic[:50],
                    "cardTag": "INVESTIGATION",
                    "cardDescription": "Article generated with parsing issues",
                    "chartConfigs": extract_chartconfigs(full_text) if full_text else {},
                    "contextData": {},
                    "citationDatabase": {},
                    "sources": [],
                    "chartType": "dynamic",
                    "_partial": True,
                    "_parseError": True
                }

                # Try to extract content - look for HTML or just use raw text
                if full_text:
                    # Look for content field
                    content_match = re.search(r'"content"\s*:\s*"(.*?)(?:"\s*[,}]|$)', full_text, re.DOTALL)
                    if content_match:
                        content = content_match.group(1).replace('\\"', '"').replace('\\n', '\n')
                        fallback_data["content"] = content
                    else:
                        # Just wrap raw text as content
                        # Strip markdown fences and JSON artifacts
                        display_text = full_text
                        if display_text.startswith("```"): display_text = display_text.split("\n", 1)[-1]
                        if display_text.endswith("```"): display_text = display_text[:-3]
                        # Remove obvious JSON structure but keep text
                        display_text = re.sub(r'^[\s\S]*?"content"\s*:\s*"', '', display_text)
                        fallback_data["content"] = f'<p class="prose-text">{display_text[:5000]}</p>'
                else:
                    fallback_data["content"] = '<p class="prose-text">Failed to generate article content. Please try again.</p>'

                yield send_sse("progress", {"stage": "complete", "percent": 100, "message": "Finalizing..."})
                yield f"event: content\ndata: {json.dumps(fallback_data)}\n\n"

            # Signal done
            yield send_sse("done", "ok")

        except Exception as e:
            print(f"Streaming Error: {e}")
            import traceback
            traceback.print_exc()

            # Always try to return SOMETHING useful
            error_fallback = {
                "key": topic_slug,
                "title": f"Error: {request.topic[:80]}",
                "cardTitle": request.topic[:50],
                "cardTag": "ERROR",
                "cardDescription": str(e)[:100],
                "chartConfigs": {},
                "contextData": {},
                "citationDatabase": {},
                "sources": [],
                "chartType": "dynamic",
                "_error": str(e),
                "content": f'<p class="prose-text"><strong>Generation Error:</strong> {str(e)}</p>'
            }

            # Try to salvage any content we got
            if full_text and len(full_text) > 100:
                print(f"Attempting to salvage partial content ({len(full_text)} chars)")
                try:
                    partial_data = repair_truncated_json(full_text)
                    if partial_data:
                        partial_data["_partial"] = True
                        partial_data["_error"] = str(e)
                        yield f"event: content\ndata: {json.dumps(partial_data)}\n\n"
                        yield send_sse("done", "partial")
                        return
                except Exception as salvage_err:
                    print(f"Salvage failed: {salvage_err}")

                # Even if salvage failed, try to extract content
                content_match = re.search(r'"content"\s*:\s*"(.*?)(?:"\s*[,}]|$)', full_text, re.DOTALL)
                if content_match:
                    error_fallback["content"] = content_match.group(1).replace('\\"', '"').replace('\\n', '\n')
                    error_fallback["chartConfigs"] = extract_chartconfigs(full_text)

            yield f"event: content\ndata: {json.dumps(error_fallback)}\n\n"
            yield send_sse("done", "error")

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
    """Check if an article is already cached."""
    cached = get_cached_article(request.topic)
    if cached:
        # Ensure cached articles have chartType='dynamic' for frontend detection
        # This handles legacy cached articles that may not have this field set
        if cached.get("chartConfigs"):
            cached["chartType"] = "dynamic"
        return {"cached": True, "article": cached}
    return {"cached": False}


@app.get("/api/cache/list")
async def list_cached():
    """Get list of all cached articles."""
    return {"articles": get_all_cached_articles()}


@app.post("/api/admin/rebuild-index")
async def rebuild_index():
    """Force rebuild the article index from blob storage. One-time migration endpoint."""
    print("Force rebuilding article index...")
    articles = []
    new_index = {}
    seen_keys = set()

    blobs = blob_list("articles/")
    for blob in blobs:
        try:
            pathname = blob.get("pathname", "")
            if pathname == ARTICLE_INDEX_PATH:
                continue

            blob_url = blob.get("url")
            if blob_url:
                response = requests.get(blob_url)
                if response.status_code == 200:
                    data = response.json()
                    article_key = data.get("key", pathname.split("/")[-1].replace(".json", ""))
                    if article_key not in seen_keys:
                        seen_keys.add(article_key)
                        metadata = {
                            "key": article_key,
                            "title": data.get("title", "Unknown"),
                            "cardTitle": data.get("cardTitle", ""),
                            "cardTag": data.get("cardTag", ""),
                            "cardDescription": data.get("cardDescription", ""),
                            "topic": data.get("_topic", ""),
                            "cached_at": data.get("_cached_at", ""),
                            "parent_key": data.get("_parent_key", ""),
                            "parent_title": data.get("_parent_title", ""),
                            "is_child": bool(data.get("isChildEssay", False))
                        }
                        articles.append(metadata)
                        new_index[article_key] = metadata
        except Exception as e:
            print(f"Error processing blob: {e}")
            continue

    if new_index:
        blob_put(ARTICLE_INDEX_PATH, json.dumps(new_index))
        print(f"Article index rebuilt with {len(new_index)} articles")

    return {"success": True, "articles_indexed": len(new_index), "articles": list(new_index.keys())}


@app.get("/api/article/{slug}")
async def get_article_by_slug(slug: str):
    """Get an article by its slug (key) for shareable URLs.

    This endpoint provides fast article retrieval:
    1. First tries get_cached_article() which checks by topic hash and key
    2. Returns full article data for rendering

    URL pattern: /article/{slug} e.g. /article/pelosi_family_invest
    """
    # Decode URL-encoded slug
    decoded_slug = slug

    # Try to get the article by its key
    article = get_cached_article(decoded_slug)

    if article:
        return article

    # Not found
    raise HTTPException(status_code=404, detail=f"Article not found: {slug}")


@app.get("/api/usage")
async def get_usage(request: Request):
    """Get user's remaining free deep dives."""
    user_id = get_user_id(request)
    remaining = get_remaining_free_dives(user_id)
    used = get_user_usage_today(user_id)
    return {
        "remaining": remaining,
        "used": used,
        "limit": FREE_DAILY_LIMIT
    }


@app.post("/api/deep-dive")
async def generate_deep_dive(request_body: DeepDiveRequest, request: Request):
    """Claude-powered deep-dive article generation with SSE streaming."""

    # Check cache first
    cached = get_cached_article(request_body.topic)
    if cached:
        print(f"Returning cached article for: {request_body.topic}")
        cached["_from_cache"] = True
        return cached

    # Check rate limiting - DISABLED FOR DEVELOPMENT
    user_id = get_user_id(request)
    remaining = get_remaining_free_dives(user_id)

    # Rate limiting disabled for dev - uncomment to re-enable
    # if remaining <= 0:
    #     raise HTTPException(
    #         status_code=429,
    #         detail={
    #             "error": "daily_limit_exceeded",
    #             "message": f"You've used all {FREE_DAILY_LIMIT} free deep dives for today. Come back tomorrow!",
    #             "remaining": 0
    #         }
    #     )

    if not ANTHROPIC_API_KEY or not claude_client:
        raise HTTPException(status_code=500, detail="Server missing ANTHROPIC_API_KEY environment variable.")

    print(f"Generating deep-dive for: {request_body.topic} (User: {user_id}, Remaining: {remaining})")

    topic_slug = request_body.topic.lower().replace(" ", "_").replace("-", "_")[:20]

    def send_sse(event: str, data) -> str:
        """Format a Server-Sent Event message."""
        return f"event: {event}\ndata: {json.dumps(data)}\n\n"

    async def stream_response():
        """Stream SSE progress events and final content."""
        full_text = ""
        last_partial_len = 0
        real_sources = []

        # Progress stages
        stages = {
            "title": False,
            "section_1": False,
            "section_2": False,
            "section_3": False,
            "charts": False,
            "sources": False
        }

        try:
            yield send_sse("progress", {"stage": "init", "percent": 5, "message": "Preparing deep dive..."})

            # Search for real sources via Tavily
            yield send_sse("progress", {"stage": "sources", "percent": 8, "message": "Searching verified sources..."})
            real_sources = search_sources(request_body.topic, max_results=10)

            # Build context section with real sources
            sources_section = format_sources_for_prompt(real_sources) if real_sources else ""
            context_section = ""
            if request_body.context:
                context_section = f"\nCONTEXT FROM PARENT ARTICLE:\n{request_body.context}\n\nBuild upon this context to create a more focused deep-dive.\n"

            # Combine sources and context
            full_context = sources_section + "\n" + context_section if sources_section else context_section

            prompt = ARTICLE_TEMPLATE.format(
                topic=request_body.topic,
                context_section=full_context,
                topic_slug=topic_slug
            )

            yield send_sse("progress", {"stage": "connect", "percent": 12, "message": "Initializing research pipeline..."})

            with claude_client.messages.stream(
                model=CLAUDE_MODEL,
                max_tokens=6000,  # Allow longer articles with 5-min Vercel timeout
                messages=[{"role": "user", "content": prompt}]
            ) as stream:
                yield send_sse("progress", {"stage": "research", "percent": 15, "message": "Researching topic..."})

                for text in stream.text_stream:
                    full_text += text

                    # Detect progress and send updates
                    if '"title"' in full_text and not stages["title"]:
                        stages["title"] = True
                        yield send_sse("progress", {"stage": "title", "percent": 25, "message": "Crafting headline..."})

                    if '"content"' in full_text and not stages["section_1"]:
                        stages["section_1"] = True
                        yield send_sse("progress", {"stage": "writing", "percent": 35, "message": "Writing article..."})

                    if '<h2 class="prose-h2">2.' in full_text and not stages["section_2"]:
                        stages["section_2"] = True
                        yield send_sse("progress", {"stage": "analysis", "percent": 50, "message": "Deep analysis..."})

                    if '<h2 class="prose-h2">3.' in full_text and not stages["section_3"]:
                        stages["section_3"] = True
                        yield send_sse("progress", {"stage": "deep", "percent": 65, "message": "Building insights..."})

                    if '"chartConfigs"' in full_text and not stages["charts"]:
                        stages["charts"] = True
                        yield send_sse("progress", {"stage": "charts", "percent": 80, "message": "Building charts..."})

                    if '"sources"' in full_text and not stages["sources"]:
                        stages["sources"] = True
                        yield send_sse("progress", {"stage": "sources", "percent": 90, "message": "Verifying sources..."})

                    # Send partial content every 2000 chars to prevent timeout loss
                    if len(full_text) - last_partial_len > 2000:
                        last_partial_len = len(full_text)
                        yield send_sse("partial", full_text)

            yield send_sse("progress", {"stage": "complete", "percent": 100, "message": "Complete!"})

            # Parse and validate the response
            data = repair_truncated_json(full_text)

            if data:
                # Ensure required fields
                if "key" not in data:
                    data["key"] = topic_slug
                # Mark as dynamic article for frontend chart rendering
                data["chartType"] = "dynamic"
                data.setdefault("chartConfigs", {})
                data.setdefault("contextData", {})
                data.setdefault("citationDatabase", {})
                data.setdefault("sources", [])

                # CRITICAL: Inject real sources from Tavily search
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
                    data["citationDatabase"] = real_citation_db
                    data["sources"] = real_sources_list
                    print(f"Injected {len(real_sources)} real sources into deep-dive")

                # Cache and track usage (include parent info if provided)
                cache_article(
                    request_body.topic,
                    data,
                    parent_key=request_body.parent_key,
                    parent_title=request_body.parent_title
                )
                increment_user_usage(user_id)

                data["_from_cache"] = False
                data["_remaining_today"] = remaining - 1

                yield send_sse("content", data)
            else:
                # If parsing failed, send raw text for client-side repair
                yield send_sse("rawcontent", full_text)

            yield send_sse("done", "ok")

        except Exception as e:
            print(f"Deep-dive Streaming Error: {e}")
            # If we have partial content, send it even on error
            if full_text and len(full_text) > 100:
                yield send_sse("partial", full_text)
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


# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "api_configured": bool(ANTHROPIC_API_KEY)}


class InfographicRequest(BaseModel):
    chart_config: dict
    title: str = "Data Visualization"
    chart_id: str = "chart_main"


class BatchInfographicRequest(BaseModel):
    chart_configs: dict  # Dict of chart_id -> chart_config
    article_title: str = "Article"
    article_description: str = ""  # Brief context for shareable infographics


@app.post("/api/infographic")
async def generate_single_infographic(request: InfographicRequest):
    """Generate a single Gemini infographic for a chart configuration."""
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not configured")

    image_data = generate_gemini_infographic(
        request.chart_config,
        request.title,
        request.chart_id
    )

    if image_data:
        return {"success": True, "image": image_data, "chart_id": request.chart_id}
    else:
        return {"success": False, "error": "Failed to generate infographic", "chart_id": request.chart_id}


@app.post("/api/infographics/batch")
async def generate_batch_infographics(request: BatchInfographicRequest):
    """Generate Gemini infographics for multiple charts in batch."""
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not configured")

    results = generate_infographics_for_article(
        request.chart_configs,
        request.article_title,
        request.article_description  # Pass context for shareable infographics
    )

    # Count successes
    success_count = sum(1 for v in results.values() if v is not None)

    return {
        "success": True,
        "generated": success_count,
        "total": len(request.chart_configs),
        "infographics": results
    }
