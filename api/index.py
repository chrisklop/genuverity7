import os
import json
import hashlib
import re
from typing import Optional
from datetime import datetime, date
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import anthropic

# Load from environment variables (Vercel sets these automatically)
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
# Use Sonnet for quality investigative articles (Pro plan has 60s timeout)
CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-20250514")

# For Vercel serverless, we use /tmp for any file operations
# Note: File-based caching won't persist across serverless invocations
# In production, consider using a database like Vercel KV or Supabase
CACHE_DIR = "/tmp/article_cache"
USER_USAGE_FILE = "/tmp/user_usage.json"
FREE_DAILY_LIMIT = 5

# Ensure cache directory exists
os.makedirs(CACHE_DIR, exist_ok=True)

# Configure Anthropic
claude_client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None

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

class CacheCheckRequest(BaseModel):
    topic: str

# === CACHING UTILITIES ===

def get_topic_key(topic: str) -> str:
    """Generate a consistent cache key for a topic."""
    normalized = topic.lower().strip()
    return hashlib.md5(normalized.encode()).hexdigest()[:16]

def get_cached_article(topic: str) -> Optional[dict]:
    """Check if an article exists in the cache."""
    key = get_topic_key(topic)
    cache_file = f"{CACHE_DIR}/{key}.json"
    if os.path.exists(cache_file):
        try:
            with open(cache_file, "r") as f:
                return json.load(f)
        except:
            return None
    return None

def cache_article(topic: str, article_data: dict):
    """Save an article to the cache."""
    key = get_topic_key(topic)
    cache_file = f"{CACHE_DIR}/{key}.json"
    article_data["_cached_at"] = datetime.now().isoformat()
    article_data["_topic"] = topic
    with open(cache_file, "w") as f:
        json.dump(article_data, f)

def get_all_cached_articles() -> list:
    """Get list of all cached article topics."""
    articles = []
    if not os.path.exists(CACHE_DIR):
        return articles
    for filename in os.listdir(CACHE_DIR):
        if filename.endswith(".json"):
            try:
                with open(f"{CACHE_DIR}/{filename}", "r") as f:
                    data = json.load(f)
                    articles.append({
                        "key": data.get("key", filename[:-5]),
                        "title": data.get("title", "Unknown"),
                        "topic": data.get("_topic", ""),
                        "cached_at": data.get("_cached_at", "")
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
    last_quote_pos = -1
    i = 0
    while i < len(text):
        if text[i] == '"' and (i == 0 or text[i-1] != '\\'):
            in_string = not in_string
            if in_string:
                last_quote_pos = i
        i += 1

    # If we're inside a string, try to close it
    repaired = text
    if in_string:
        # Truncate to last complete-looking sentence or add closing quote
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

    # Last resort: try to extract just the essential fields
    try:
        # Try to find key and title at minimum
        key_match = re.search(r'"key"\s*:\s*"([^"]+)"', text)
        title_match = re.search(r'"title"\s*:\s*"([^"]+)"', text)

        if key_match and title_match:
            # Extract content up to where it broke
            content_match = re.search(r'"content"\s*:\s*"(.*?)(?:"\s*,\s*"chartConfigs|$)', text, re.DOTALL)
            content = content_match.group(1) if content_match else f"<p class='prose-text'>Article generation was interrupted. Please try again.</p>"

            return {
                "key": key_match.group(1),
                "title": title_match.group(1),
                "content": content,
                "chartConfigs": {},
                "contextData": {},
                "citationDatabase": {},
                "sources": [],
                "_partial": True
            }
    except:
        pass

    return None


# Comprehensive investigative journalism template
ARTICLE_TEMPLATE = """
You are an elite investigative journalist for GenuVerity, a premium research platform. Write a comprehensive deep-dive exposé on: "{topic}"
{context_section}

RETURN ONLY VALID JSON (no markdown, no code fences). The JSON structure:

{{
  "key": "{topic_slug}",
  "title": "Compelling investigative headline with specific hook",
  "cardTitle": "Short card title (3-5 words)",
  "cardTag": "CATEGORY // SUBCATEGORY",
  "cardTagColor": "text-red-400",
  "cardDescription": "One-line teaser for the card",
  "content": "FULL HTML CONTENT HERE",
  "chartConfigs": {{
    "chart_main": {{"type": "bar", "data": {{"labels": ["Label1", "Label2", "Label3", "Label4"], "values": [num1, num2, num3, num4], "colors": ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]}}, "title": "Chart Title"}},
    "chart_secondary": {{"type": "line", "data": {{"labels": ["2020", "2021", "2022", "2023", "2024"], "values": [v1, v2, v3, v4, v5], "colors": ["#8b5cf6"]}}, "title": "Trend Title"}},
    "chart_tertiary": {{"type": "pie", "data": {{"labels": ["A", "B", "C"], "values": [40, 35, 25], "colors": ["#3b82f6", "#10b981", "#f59e0b"]}}, "title": "Distribution Title"}}
  }},
  "citationDatabase": {{
    "source_key": {{"domain": "reuters.com", "trustScore": 95, "title": "Article Title", "snippet": "Key quote from source", "url": "https://..."}}
  }},
  "contextData": {{
    "term_key": {{"expanded": "2-3 sentence deep explanation of this concept for the fractal trigger popup"}}
  }},
  "sources": [
    {{"name": "Source Name: Article Title", "score": 95, "url": "https://..."}}
  ]
}}

HTML CONTENT STRUCTURE (use these exact classes):

1. EXECUTIVE SUMMARY (opening paragraph):
<p class="prose-text"><strong class="text-white">Executive Summary:</strong> Hook the reader with the key finding. Include <span class="highlight-glow">highlighted key stat</span> and <span class="living-number" data-target="NUMBER" data-suffix="SUFFIX">$0</span> animated numbers <span class="citation-spade" data-id="source_key">♠</span>.</p>

2. SECTION 1 with chart:
<h2 class="prose-h2">1. Section Title</h2>
<div class="float-figure right"><div style="height: 250px;"><canvas id="chart_main"></canvas></div><div class="fig-caption">Fig 1. Caption <span class="fig-deep-dive" onclick="handleDeepDive(this)">DEEP DIVE</span></div></div>
<p class="prose-text">Content with <strong class="fractal-trigger" onclick="expandContext(this, 'term_key')">clickable deep-dive terms</strong> and citations <span class="citation-spade" data-id="source_key">♠</span>.</p>

3. SECTION 2 with chart:
<h2 class="prose-h2">2. Section Title</h2>
<div class="float-figure left"><div style="height: 250px;"><canvas id="chart_secondary"></canvas></div><div class="fig-caption">Fig 2. Caption <span class="fig-deep-dive" onclick="handleDeepDive(this)">DEEP DIVE</span></div></div>
<p class="prose-text">More investigative content...</p>

4. SECTION 3 with chart:
<h2 class="prose-h2">3. Section Title</h2>
<div class="float-figure right"><div style="height: 250px;"><canvas id="chart_tertiary"></canvas></div><div class="fig-caption">Fig 3. Caption <span class="fig-deep-dive" onclick="handleDeepDive(this)">DEEP DIVE</span></div></div>
<p class="prose-text">Continue the investigation...</p>

5. SECTIONS 4-5: Additional analysis sections with more content.

6. CONCLUSION:
<h2 class="prose-h2">5. Conclusion: [Provocative Question or Statement]</h2>
<p class="prose-text">Synthesize findings and pose forward-looking questions.</p>

REQUIREMENTS:
- 5 distinct sections with numbered h2 headers
- 3 charts minimum (bar, line, pie/doughnut) with REALISTIC data
- 8-12 living numbers with real statistics
- 6-8 fractal triggers with contextData entries
- 10-15 citation spades with citationDatabase entries
- 8-10 sources in the sources array
- Investigative magazine tone (think: The Atlantic meets Bloomberg)
- Use specific numbers, dates, names, and statistics
- Each chart MUST have a DEEP DIVE button
- Alternate float-figure right/left for visual balance

IMPORTANT: Return ONLY the JSON object. No markdown, no explanation, no code fences.
"""

@app.post("/api/generate")
async def generate_report(request: GenerateRequest, req: Request):
    """Claude-powered report generation with JSON repair fallback."""
    if not ANTHROPIC_API_KEY or not claude_client:
        raise HTTPException(status_code=500, detail="Server missing ANTHROPIC_API_KEY environment variable.")

    print(f"Generating report for: {request.topic}")

    topic_slug = request.topic.lower().replace(" ", "_").replace("-", "_")[:20]

    prompt = ARTICLE_TEMPLATE.format(
        topic=request.topic,
        context_section="",
        topic_slug=topic_slug
    )

    try:
        response = claude_client.messages.create(
            model=CLAUDE_MODEL,
            max_tokens=8000,  # Full article with charts, sources, and contextData
            messages=[{"role": "user", "content": prompt}]
        )

        text = response.content[0].text

        # Try to parse, with repair fallback
        data = repair_truncated_json(text)
        if data:
            return data

        # If repair failed, raise error
        raise json.JSONDecodeError("Could not parse or repair JSON", text[:100], 0)

    except json.JSONDecodeError as e:
        print(f"JSON Parse Error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {str(e)}")
    except Exception as e:
        print(f"Generation Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/cache/check")
async def check_cache(request: CacheCheckRequest):
    """Check if an article is already cached."""
    cached = get_cached_article(request.topic)
    if cached:
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
    """Claude-powered deep-dive article generation."""

    # Check cache first
    cached = get_cached_article(request_body.topic)
    if cached:
        print(f"Returning cached article for: {request_body.topic}")
        cached["_from_cache"] = True
        return cached

    # Check rate limiting
    user_id = get_user_id(request)
    remaining = get_remaining_free_dives(user_id)

    if remaining <= 0:
        raise HTTPException(
            status_code=429,
            detail={
                "error": "daily_limit_exceeded",
                "message": f"You've used all {FREE_DAILY_LIMIT} free deep dives for today. Come back tomorrow!",
                "remaining": 0
            }
        )

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

    try:
        response = claude_client.messages.create(
            model=CLAUDE_MODEL,
            max_tokens=8000,  # Full article with charts, sources, and contextData
            messages=[{"role": "user", "content": prompt}]
        )

        text = response.content[0].text

        # Use repair function which handles markdown cleanup and truncation
        data = repair_truncated_json(text)

        if not data:
            raise json.JSONDecodeError("Could not parse or repair JSON", text[:100] if text else "", 0)

        # Ensure required fields
        if "key" not in data:
            data["key"] = topic_slug
        if "chartConfigs" not in data:
            data["chartConfigs"] = {}
        if "contextData" not in data:
            data["contextData"] = {}
        if "citationDatabase" not in data:
            data["citationDatabase"] = {}
        if "sources" not in data:
            data["sources"] = []

        # Cache and track usage (even for partial responses)
        cache_article(request_body.topic, data)
        increment_user_usage(user_id)

        data["_from_cache"] = False
        data["_remaining_today"] = remaining - 1

        return data

    except json.JSONDecodeError as e:
        print(f"JSON Parse Error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {str(e)}")
    except Exception as e:
        print(f"Deep-dive Generation Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "api_configured": bool(ANTHROPIC_API_KEY)}
