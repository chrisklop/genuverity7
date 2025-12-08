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
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyDRIHmMIQow7BlfROmeaJlfOI6FKYcA1l0")
# Use Claude Sonnet 4 for quality investigative articles
CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-20250514")
# Gemini for image generation - using the image generation model
GEMINI_IMAGE_MODEL = "gemini-2.0-flash-exp-image-generation"  # Latest Gemini image generation
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models"

# Vercel Blob Storage configuration
BLOB_STORE_ID = "store_R5FvidKLuXLBeOEd"
BLOB_API_BASE = "https://blob.vercel-storage.com"

# Fallback to /tmp for local development (ephemeral on Vercel)
CACHE_DIR = "/tmp/article_cache"
USER_USAGE_FILE = "/tmp/user_usage.json"
FREE_DAILY_LIMIT = 5

# Ensure cache directory exists (fallback)
os.makedirs(CACHE_DIR, exist_ok=True)

# Configure Anthropic
claude_client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None

# === GEMINI INFOGRAPHIC GENERATION ===

# GenuVerity style guide for consistent infographics
INFOGRAPHIC_STYLE = """
VISUAL STYLE REQUIREMENTS:
- Dark theme with deep blue/black background (#050505 to #0a0a0f gradient)
- Primary accent color: Electric blue (#3b82f6)
- Secondary accents: Emerald green (#10b981), Amber (#f59e0b), Red (#ef4444)
- Modern, clean data visualization aesthetic
- Subtle grid lines in dark gray (#1a1a2e)
- White text (#e2e2e5) for labels and values
- Professional investigative journalism style
- Include subtle "GenuVerity" watermark text in bottom-left corner at 30% opacity in blue (#3b82f6)
"""

def generate_gemini_infographic(chart_config: dict, title: str, chart_id: str) -> Optional[str]:
    """Generate an infographic image using Gemini 3 Pro.

    Args:
        chart_config: Dict with type, data (labels, values, colors), title
        title: Overall title for the infographic
        chart_id: Unique identifier for caching

    Returns:
        Base64-encoded PNG image or None if generation fails
    """
    if not GEMINI_API_KEY:
        print("GEMINI_API_KEY not configured, skipping infographic generation")
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

    # Craft the infographic generation prompt
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
5. Dark background matching the style guide
6. IMPORTANT: Add subtle "GenuVerity" text watermark in bottom-left corner, blue color (#3b82f6), 30% opacity

Generate a 800x500 pixel infographic image."""

    try:
        # Call Gemini API for image generation
        response = requests.post(
            f"{GEMINI_API_URL}/{GEMINI_IMAGE_MODEL}:generateContent?key={GEMINI_API_KEY}",
            headers={"Content-Type": "application/json"},
            json={
                "contents": [{
                    "parts": [{"text": prompt}]
                }],
                "generationConfig": {
                    "responseModalities": ["TEXT", "IMAGE"],
                    "temperature": 0.4
                }
            },
            timeout=60
        )

        if response.status_code == 200:
            result = response.json()
            print(f"Gemini API response keys: {result.keys()}")
            # Extract image from response
            candidates = result.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                for part in parts:
                    print(f"Part keys: {part.keys()}")
                    if "inlineData" in part:
                        image_data = part["inlineData"].get("data")
                        mime_type = part["inlineData"].get("mimeType", "image/png")
                        if image_data:
                            print(f"Generated infographic for {chart_id}: {len(image_data)} bytes")
                            return f"data:{mime_type};base64,{image_data}"
            else:
                print(f"No candidates in response: {result}")
        else:
            print(f"Gemini API error ({response.status_code}): {response.text[:500]}")

    except Exception as e:
        print(f"Gemini infographic generation error: {e}")

    return None


def generate_infographics_for_article(chart_configs: dict, article_title: str) -> dict:
    """Generate Gemini infographics for all charts in an article.

    Args:
        chart_configs: Dict of chart_id -> chart_config
        article_title: Title of the article for context

    Returns:
        Dict of chart_id -> base64 image data URL (or None if failed)
    """
    infographics = {}

    for chart_id, config in chart_configs.items():
        print(f"Generating infographic: {chart_id}")
        image_data = generate_gemini_infographic(config, article_title, chart_id)
        if image_data:
            infographics[chart_id] = image_data
        else:
            # Keep None to signal fallback to Chart.js
            infographics[chart_id] = None

    return infographics


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
    else:
        # Fallback to filesystem
        cache_file = f"{CACHE_DIR}/{key}.json"
        with open(cache_file, "w") as f:
            json.dump(article_data, f)
        print(f"Article cached to filesystem: {cache_file}")

def get_all_cached_articles() -> list:
    """Get list of all cached article topics. Combines Blob storage and filesystem."""
    articles = []
    seen_keys = set()

    # 1. Get articles from Blob storage (primary source)
    blobs = blob_list("articles/")
    for blob in blobs:
        try:
            blob_url = blob.get("url")
            if blob_url:
                response = requests.get(blob_url)
                if response.status_code == 200:
                    data = response.json()
                    article_key = data.get("key", blob.get("pathname", "").split("/")[-1].replace(".json", ""))
                    if article_key not in seen_keys:
                        seen_keys.add(article_key)
                        articles.append({
                            "key": article_key,
                            "title": data.get("title", "Unknown"),
                            "topic": data.get("_topic", ""),
                            "cached_at": data.get("_cached_at", ""),
                            "parent_key": data.get("_parent_key", ""),
                            "parent_title": data.get("_parent_title", "")
                        })
        except:
            continue

    # 2. Also check filesystem (for local dev and transition period)
    if os.path.exists(CACHE_DIR):
        for filename in os.listdir(CACHE_DIR):
            if filename.endswith(".json"):
                try:
                    with open(f"{CACHE_DIR}/{filename}", "r") as f:
                        data = json.load(f)
                        article_key = data.get("key", filename[:-5])
                        if article_key not in seen_keys:
                            seen_keys.add(article_key)
                            articles.append({
                                "key": article_key,
                                "title": data.get("title", "Unknown"),
                                "topic": data.get("_topic", ""),
                                "cached_at": data.get("_cached_at", ""),
                                "parent_key": data.get("_parent_key", ""),
                                "parent_title": data.get("_parent_title", "")
                            })
                except:
                    continue

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

    # Try parsing as-is first
    try:
        return json.loads(text)
    except:
        pass

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

RETURN ONLY VALID JSON. CRITICAL: Generate chartConfigs FIRST (before content) to ensure charts are captured.

{{
  "key": "{topic_slug}",
  "title": "Compelling headline with specific hook",
  "cardTitle": "3-5 word card title",
  "cardTag": "CATEGORY // SUBCATEGORY",
  "cardTagColor": "text-red-400",
  "cardDescription": "One-line teaser",
  "chartConfigs": {{
    "chart_main": {{"type": "bar", "data": {{"labels": ["A", "B", "C", "D"], "values": [num1, num2, num3, num4], "colors": ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]}}, "title": "Main Chart"}},
    "chart_secondary": {{"type": "line", "data": {{"labels": ["2020", "2021", "2022", "2023", "2024"], "values": [v1, v2, v3, v4, v5], "colors": ["#8b5cf6"]}}, "title": "Trend"}},
    "chart_tertiary": {{"type": "pie", "data": {{"labels": ["X", "Y", "Z"], "values": [40, 35, 25], "colors": ["#3b82f6", "#10b981", "#f59e0b"]}}, "title": "Distribution"}}
  }},
  "contextData": {{"term1": {{"expanded": "2-3 sentence detailed explanation of this concept"}}, "term2": {{"expanded": "..."}}}},
  "citationDatabase": {{"src1": {{"domain": "reuters.com", "trustScore": 95, "title": "Title", "snippet": "Quote", "url": "https://..."}}}},
  "sources": [{{"name": "Source", "score": 95, "url": "https://..."}}],
  "content": "HTML CONTENT HERE"
}}

HTML structure for content field:
- <p class="prose-text"><strong class="text-white">Executive Summary:</strong> Key finding with <span class="highlight-glow">stat</span> and <span class="living-number" data-target="NUM" data-suffix="SUFFIX">$0</span> <span class="citation-spade" data-id="src1">♠</span></p>
- <h2 class="prose-h2">1. Section</h2> with <div class="float-figure right"><div style="height:250px"><canvas id="chart_main"></canvas></div><div class="fig-caption">Caption <span class="fig-deep-dive" onclick="handleDeepDive(this)">DEEP DIVE</span></div></div>
- <strong class="fractal-trigger" onclick="expandContext(this,'key')">technical terms</strong> for deep-dives
- 5 sections, 3 charts (bar, line, pie), 8+ living numbers, 15+ fractal triggers (2-4 per section), 10+ citations
- Alternate float-figure right/left

FRACTAL TRIGGERS ARE CRITICAL - wrap these with <strong class="fractal-trigger" onclick="expandContext(this,'key_name')">term</strong>:
- Scientific/medical terms (DNA methylation, epigenetic markers, oxidative stress)
- Industry jargon and acronyms (explained in contextData)
- Organizations, agencies, regulatory bodies
- Technical processes or mechanisms
- Historical events or landmark studies
- Economic concepts or financial instruments
Each trigger MUST have a corresponding entry in contextData with a substantive 2-3 sentence explanation.

Return ONLY JSON. No markdown, no code fences.
"""

@app.post("/api/generate")
async def generate_report(request: GenerateRequest, req: Request):
    """Claude-powered report generation with SSE progress updates."""
    if not ANTHROPIC_API_KEY or not claude_client:
        raise HTTPException(status_code=500, detail="Server missing ANTHROPIC_API_KEY environment variable.")

    print(f"Generating report for: {request.topic}")

    topic_slug = request.topic.lower().replace(" ", "_").replace("-", "_")[:20]

    prompt = ARTICLE_TEMPLATE.format(
        topic=request.topic,
        context_section="",
        topic_slug=topic_slug
    )

    def send_sse(event: str, data: str) -> str:
        """Format a Server-Sent Event message."""
        return f"event: {event}\ndata: {json.dumps(data)}\n\n"

    async def stream_response():
        """Stream SSE progress events and final content."""
        full_text = ""
        char_count = 0

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

            # Stage 2: Connecting
            yield send_sse("progress", {"stage": "connect", "percent": 10, "message": "Initializing research pipeline..."})

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

            # Stage: Complete
            yield send_sse("progress", {"stage": "complete", "percent": 100, "message": "Investigation complete!"})

            # Parse and cache the article for persistence
            parsed_data = None
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

                    # Cache to Blob storage for persistence
                    cache_article(request.topic, parsed_data)
                    print(f"Article cached from /api/generate: {request.topic}")
            except Exception as cache_err:
                print(f"Cache error (non-fatal): {cache_err}")

            # Send the parsed data as a proper object (not double-encoded string)
            # If parsing succeeded, send the clean object; otherwise fall back to raw text
            if parsed_data:
                yield f"event: content\ndata: {json.dumps(parsed_data)}\n\n"
            else:
                # Fallback: send raw text (frontend will try to parse it)
                yield send_sse("content", full_text)

            # Signal done
            yield send_sse("done", "ok")

        except Exception as e:
            print(f"Streaming Error: {e}")
            import traceback
            traceback.print_exc()
            # Try to send partial content if we have any
            if full_text and len(full_text) > 100:
                print(f"Attempting to salvage partial content ({len(full_text)} chars)")
                try:
                    partial_data = repair_truncated_json(full_text)
                    if partial_data and partial_data.get("content"):
                        partial_data["_partial"] = True
                        partial_data["_error"] = str(e)
                        yield f"event: content\ndata: {json.dumps(partial_data)}\n\n"
                        yield send_sse("done", "partial")
                        return
                except Exception as salvage_err:
                    print(f"Salvage failed: {salvage_err}")
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

    context_section = ""
    if request_body.context:
        context_section = f"\nCONTEXT FROM PARENT ARTICLE:\n{request_body.context}\n\nBuild upon this context to create a more focused deep-dive.\n"

    prompt = ARTICLE_TEMPLATE.format(
        topic=request_body.topic,
        context_section=context_section,
        topic_slug=topic_slug
    )

    def send_sse(event: str, data) -> str:
        """Format a Server-Sent Event message."""
        return f"event: {event}\ndata: {json.dumps(data)}\n\n"

    async def stream_response():
        """Stream SSE progress events and final content."""
        full_text = ""
        last_partial_len = 0

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
            yield send_sse("progress", {"stage": "connect", "percent": 10, "message": "Initializing research pipeline..."})

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
        request.article_title
    )

    # Count successes
    success_count = sum(1 for v in results.values() if v is not None)

    return {
        "success": True,
        "generated": success_count,
        "total": len(request.chart_configs),
        "infographics": results
    }
