import os
import json
import hashlib
from typing import Optional
from datetime import datetime, date
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv
import anthropic

# Load secrets
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-5-20250929")

# Cache directory for generated articles
CACHE_DIR = Path("./article_cache")
CACHE_DIR.mkdir(exist_ok=True)

# User usage tracking (in production, use Redis or DB)
USER_USAGE_FILE = Path("./user_usage.json")
FREE_DAILY_LIMIT = 5

# Localhost IPs bypass rate limiting (for development)
BYPASS_IPS = {"127.0.0.1", "localhost", "::1"}

if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY not found in .env file.")

if not ANTHROPIC_API_KEY:
    print("WARNING: ANTHROPIC_API_KEY not found in .env file.")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel('gemini-2.0-flash-exp')

# Configure Anthropic
claude_client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None

app = FastAPI()

# Allow CORS for development (if running frontend separately)
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
    context: str = ""  # Optional context from parent article

class CacheCheckRequest(BaseModel):
    topic: str

# === CACHING UTILITIES ===

def get_topic_key(topic: str) -> str:
    """Generate a consistent cache key for a topic."""
    normalized = topic.lower().strip()
    return hashlib.md5(normalized.encode()).hexdigest()[:16]

def get_cached_article(topic: str) -> Optional[dict]:
    """Check if an article exists in the cache by topic hash OR by internal article key."""
    # First try by topic hash (original behavior)
    key = get_topic_key(topic)
    cache_file = CACHE_DIR / f"{key}.json"
    if cache_file.exists():
        try:
            with open(cache_file, "r") as f:
                return json.load(f)
        except:
            pass

    # If not found, search all cached articles by internal key
    for filename in CACHE_DIR.glob("*.json"):
        try:
            with open(filename, "r") as f:
                data = json.load(f)
                # Check if the internal "key" field matches
                if data.get("key") == topic:
                    return data
                # Also check the topic field
                if data.get("_topic", "").lower() == topic.lower():
                    return data
        except:
            continue
    return None

def cache_article(topic: str, article_data: dict):
    """Save an article to the cache."""
    key = get_topic_key(topic)
    cache_file = CACHE_DIR / f"{key}.json"
    article_data["_cached_at"] = datetime.now().isoformat()
    article_data["_topic"] = topic
    with open(cache_file, "w") as f:
        json.dump(article_data, f)

def get_all_cached_articles() -> list:
    """Get list of all cached article topics."""
    articles = []
    for cache_file in CACHE_DIR.glob("*.json"):
        try:
            with open(cache_file, "r") as f:
                data = json.load(f)
                articles.append({
                    "key": data.get("key", cache_file.stem),
                    "title": data.get("title", "Unknown"),
                    "topic": data.get("_topic", ""),
                    "cached_at": data.get("_cached_at", "")
                })
        except:
            continue
    return articles

# === USER USAGE TRACKING ===

def get_user_id(request: Request) -> str:
    """Get a simple user identifier (IP-based for now)."""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"

def load_usage_data() -> dict:
    """Load user usage data."""
    if USER_USAGE_FILE.exists():
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


# The Golden Template for article generation
ARTICLE_TEMPLATE = """
You are an expert investigative journalist for GenuVerity, creating magazine-style exposé articles.

TASK: Write a comprehensive, data-driven deep-dive article on: "{topic}"
{context_section}

You MUST return VALID JSON (no markdown code blocks, just raw JSON) with this EXACT structure:

{{
    "key": "unique_slug_lowercase",
    "title": "Compelling Article Title",
    "content": "HTML CONTENT HERE - SEE FORMAT BELOW",
    "chartConfigs": {{
        "chart_id_1": {{
            "type": "bar|line|doughnut|radar",
            "data": {{
                "labels": ["Label1", "Label2", ...],
                "values": [10, 20, ...],
                "colors": ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
            }},
            "title": "Chart Title"
        }}
    }},
    "contextData": {{
        "context_key_1": {{
            "expanded": "Additional context paragraph that explains this topic in more detail..."
        }}
    }},
    "citationDatabase": {{
        "source_1": {{
            "domain": "reuters.com",
            "trustScore": 92,
            "title": "Source Article Title",
            "snippet": "Key quote or finding from this source...",
            "url": "https://www.reuters.com/real/article/url"
        }}
    }},
    "sources": [
        {{ "name": "Source Name", "score": 95, "url": "https://www.reuters.com/real/verified/url" }}
    ]
}}

HTML CONTENT FORMAT RULES:
1. Use section headers: <h2 class="prose-h2">1. Section Title</h2>
2. Prose paragraphs: <p class="prose-text">Content...</p>
3. Living Numbers (animated stats): <span class="living-number" data-target="600" data-suffix="B">$0</span>
4. Highlight important text: <span class="highlight-glow">Key Insight</span>
5. Fractal Triggers (deep-dive links): <strong class="fractal-trigger" onclick="expandContext(this, 'context_key')">Clickable Term</strong>
6. Citations: <span class="citation-spade" data-id="source_1">♠</span>
7. Float figures with charts:

<div class="float-figure right">
    <div style="height: 250px;"><canvas id="chart_id_1"></canvas></div>
    <div class="fig-caption">Fig 1. Chart Description</div>
</div>

IMPORTANT REQUIREMENTS:
- Include 3-5 charts with real/realistic data from credible sources
- Include 5-8 living numbers with real statistics (cite your sources)
- Include 6-10 fractal trigger terms for deeper exploration on key concepts
- Include 8-15 citation spades linked to citationDatabase entries
- citationDatabase MUST have 8-15 unique sources with real domains, trust scores, titles, and snippets
- Write in a magazine-style investigative tone (like The Atlantic or New York Magazine)
- Minimum 5 sections with prose-h2 headers
- Start with an Executive Summary section
- End with "What Lies Ahead" or similar forward-looking section
- All data should be factually accurate or clearly realistic estimates
- Generate unique chart IDs that won't conflict (e.g., "{topic_slug}_chart1")

CRITICAL SOURCE VERIFICATION REQUIREMENTS:
- Every source URL MUST be a real, verified, working URL that exists on the internet
- DO NOT fabricate or hallucinate URLs - use only URLs you know to be real
- Prefer well-known, stable URLs from major publications: Reuters, AP, WSJ, NYT, CNBC, Bloomberg, BBC, The Guardian, government websites (.gov), academic institutions (.edu), and authoritative organizations (IEA, WHO, IMF, etc.)
- For each source, the URL must point to an actual article/page that discusses the topic
- If you cannot find a verified URL for a claim, link to the publication's homepage or search page for that topic
- Examples of GOOD URLs: https://www.reuters.com/..., https://www.cnbc.com/..., https://www.iea.org/reports/..., https://www.congress.gov/...
- NEVER use generic placeholder URLs or URLs that lead to 404 errors
- All sources should be directly cited and leveraged in the body of the essay

Return ONLY the JSON object, no explanations or markdown formatting.
"""

@app.post("/api/generate")
async def generate_report(request: GenerateRequest):
    """Original Gemini-based report generation"""
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Server missing Gemini API Key. Check .env file.")

    print(f"Generating report for: {request.topic}")

    # Read the Golden Template Schema
    try:
        with open("docs/essay_schema.md", "r") as f:
            schema = f.read()
    except FileNotFoundError:
        schema = "Structure: { title, content (HTML with prose-h2, float-figure), chartType, sources }"

    prompt = f"""
    You are an expert investigative journalist for GenuVerity.

    TASK: Write a biting, data-driven exposé on: "{request.topic}".

    STRICT FORMATTING RULES:
    You must return VALID JSON with the following structure based on this schema:
    {schema}

    CRITICAL CONTENT REQUIREMENTS:
    1. **Living Numbers**: Use `<span class="living-number" data-target="VALUE" data-suffix="SUFFIX">0</span>` for key stats.
    2. **Fractal Triggers**: Use `<strong class="fractal-trigger" onclick="expandContext(this, 'unique_key')">Term</strong>` for deeper context.
    3. **Float Figures**: Use `<div class="float-figure right">...</div>` properly.
    4. **Citations**: Use `<span class="citation-spade" data-id="source_key">♠</span>`.
    5. **Tone**: Magazine-style, cynical but accurate (like The Atlantic or New York Magazine).
    6. **JSON Only**: Do not output markdown code blocks. Just the raw JSON.

    Generate the JSON for a SINGLE report object keyed by a simplified slug (e.g. 'quantum_computing').
    """

    try:
        response = gemini_model.generate_content(prompt)
        text = response.text
        # Clean potential markdown fences
        clean_text = text.replace("```json", "").replace("```", "").strip()
        data = json.loads(clean_text)
        return data
    except Exception as e:
        print(f"Generation Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/cache/check")
async def check_cache(request: CacheCheckRequest):
    """Check if an article is already cached (free to read)."""
    cached = get_cached_article(request.topic)
    if cached:
        return {
            "cached": True,
            "article": cached
        }
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
    """Claude-powered deep-dive article generation with caching and rate limiting."""

    # First, check if article is already cached
    cached = get_cached_article(request_body.topic)
    if cached:
        print(f"Returning cached article for: {request_body.topic}")
        cached["_from_cache"] = True
        return cached

    # Check user's remaining free dives
    user_id = get_user_id(request)
    is_localhost = user_id in BYPASS_IPS
    remaining = get_remaining_free_dives(user_id)

    # Bypass rate limiting for localhost development
    if remaining <= 0 and not is_localhost:
        raise HTTPException(
            status_code=429,
            detail={
                "error": "daily_limit_exceeded",
                "message": f"You've used all {FREE_DAILY_LIMIT} free deep dives for today. Come back tomorrow!",
                "remaining": 0
            }
        )

    if not ANTHROPIC_API_KEY or not claude_client:
        raise HTTPException(status_code=500, detail="Server missing Anthropic API Key. Check .env file.")

    bypass_msg = " [LOCALHOST BYPASS]" if is_localhost else ""
    print(f"Generating deep-dive for: {request_body.topic} (User: {user_id}, Remaining: {remaining}){bypass_msg}")

    # Create topic slug for unique IDs
    topic_slug = request_body.topic.lower().replace(" ", "_").replace("-", "_")[:20]

    # Build context section if provided
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
            max_tokens=8000,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        text = response.content[0].text

        # Clean potential markdown fences
        clean_text = text.strip()
        if clean_text.startswith("```json"):
            clean_text = clean_text[7:]
        if clean_text.startswith("```"):
            clean_text = clean_text[3:]
        if clean_text.endswith("```"):
            clean_text = clean_text[:-3]
        clean_text = clean_text.strip()

        data = json.loads(clean_text)

        # Ensure required fields exist
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

        # Cache the article for future users
        cache_article(request_body.topic, data)

        # Increment user's usage
        increment_user_usage(user_id)

        # Add metadata
        data["_from_cache"] = False
        data["_remaining_today"] = remaining - 1

        return data

    except json.JSONDecodeError as e:
        print(f"JSON Parse Error: {e}")
        print(f"Raw response: {text[:500]}...")
        raise HTTPException(status_code=500, detail=f"Failed to parse AI response as JSON: {str(e)}")
    except Exception as e:
        print(f"Deep-dive Generation Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# Serve static files (Frontend)
app.mount("/", StaticFiles(directory=".", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
