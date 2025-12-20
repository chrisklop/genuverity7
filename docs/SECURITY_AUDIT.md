# GenuVerity Security Audit Report

**Date:** December 14, 2025
**Auditor:** Claude Code (Automated)
**Scope:** `api/index.py`, `index.html`

---

## Executive Summary

Overall security posture: **MODERATE RISK**

The application follows many best practices but has several areas that need attention, particularly around the unprotected admin endpoint and XSS considerations.

---

## Critical Findings

### 1. UNPROTECTED ADMIN ENDPOINT [HIGH]

**Location:** `api/index.py:2109`
```python
@app.post("/api/admin/rebuild-index")
async def rebuild_index():
```

**Issue:** The admin endpoint `/api/admin/rebuild-index` has NO authentication or authorization checks. Anyone can call this endpoint.

**Risk:**
- DoS via repeated index rebuilds (resource exhaustion)
- Potential data manipulation

**Recommendation:**
```python
# Add API key check or admin token
ADMIN_SECRET = os.getenv("ADMIN_SECRET")

@app.post("/api/admin/rebuild-index")
async def rebuild_index(request: Request):
    auth_header = request.headers.get("X-Admin-Token")
    if not ADMIN_SECRET or auth_header != ADMIN_SECRET:
        raise HTTPException(status_code=403, detail="Unauthorized")
    # ... rest of function
```

---

### 2. CORS WILDCARD [MEDIUM]

**Location:** `api/index.py:638-639`
```python
CORSMiddleware,
allow_origins=["*"],
```

**Issue:** CORS is configured to allow ALL origins with wildcard `*`.

**Risk:**
- Any website can make requests to your API
- Credential theft if cookies/tokens were used
- CSRF attacks easier to execute

**Recommendation:**
- For production, restrict to specific domains:
```python
allow_origins=["https://genuverity7.vercel.app", "http://localhost:8000"],
```

---

### 3. XSS VIA innerHTML [MEDIUM]

**Location:** `index.html` (50+ occurrences)

**Issue:** Extensive use of `innerHTML` to render dynamic content. While most data comes from your own API, if article content contains malicious scripts, they could execute.

**Examples of concern:**
- Line 8681: `document.getElementById('report-body').innerHTML = data.content;`
- Line 10395: `div.innerHTML = content;`

**Risk:**
- If Claude AI generates content containing `<script>` tags or event handlers, they would execute
- Stored XSS if malicious articles are cached

**Recommendation:**
1. Sanitize HTML before inserting:
```javascript
function sanitizeHTML(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
}
// Or use DOMPurify library
```

2. Use `textContent` where possible instead of `innerHTML`

3. Add Content-Security-Policy header:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' cdn.jsdelivr.net unpkg.com;
```

---

## Medium Findings

### 4. API KEYS IN LOGS [MEDIUM]

**Location:** `api/index.py:166, 200`
```python
print(f"Infographic attempt {attempt + 1}/{max_retries} with key index {_current_key_index % len(GEMINI_API_KEYS)}")
print(f"Rate limited on key {_current_key_index % len(GEMINI_API_KEYS)}, rotating...")
```

**Issue:** While not exposing the actual keys, logging key indices reveals how many keys you have and their rotation pattern.

**Recommendation:** Remove or reduce verbosity of these logs in production.

---

### 5. NO RATE LIMITING ON PUBLIC ENDPOINTS [MEDIUM]

**Location:** Various endpoints

**Issue:** The `/api/generate`, `/api/fact-check`, and `/api/deep-dive` endpoints have no rate limiting. A malicious actor could:
- Exhaust your Anthropic/Gemini API credits
- DoS your application
- Generate spam content

**Note:** There's commented code suggesting rate limiting was planned:
```python
# Check rate limiting - DISABLED FOR DEVELOPMENT
```

**Recommendation:** Re-enable rate limiting for production:
```python
from slowapi import Limiter
limiter = Limiter(key_func=get_user_id)

@app.post("/api/generate")
@limiter.limit("5/minute")
async def generate_article(request: GenerateRequest):
```

---

### 6. HARDCODED URL IN HTML (POTENTIAL XSS VECTOR) [LOW]

**Location:** `api/index.py:471`
```python
onclick="window.open('{fc['url']}', '_blank')"
```

**Issue:** The URL from Google Fact Check API is inserted directly into an onclick handler without escaping.

**Risk:** If `fc['url']` contains `'); maliciousCode(); ('`, it could execute arbitrary JavaScript.

**Recommendation:**
```python
import html
safe_url = html.escape(fc['url'])
cards_html += f'onclick="window.open(\'{safe_url}\', \'_blank\')"'
```

---

## Low Findings

### 7. SENSITIVE DATA IN localStorage [LOW]

**Location:** `index.html` (26+ occurrences)

**Issue:** Reading history, bookmarks, pipelines, and preferences stored in localStorage.

**Risk:**
- XSS attack could exfiltrate user browsing patterns
- localStorage persists across sessions

**Recommendation:**
- No sensitive data (API keys, auth tokens) is stored - GOOD
- Consider sessionStorage for temporary data
- Clear storage on "logout" if auth is added later

---

### 8. NO INPUT LENGTH VALIDATION [LOW]

**Location:** `api/index.py` - Request models

**Issue:** Request models don't validate input lengths:
```python
class GenerateRequest(BaseModel):
    topic: str  # No max_length constraint
```

**Risk:** Very long topics could cause issues downstream.

**Recommendation:**
```python
from pydantic import BaseModel, Field

class GenerateRequest(BaseModel):
    topic: str = Field(..., max_length=1000)
```

---

## Positive Findings (What's Done Right)

1. **API Keys from Environment Variables** - All sensitive keys loaded via `os.getenv()`, not hardcoded
2. **Pydantic Input Validation** - Using Pydantic BaseModel for request validation
3. **No SQL/NoSQL Injection Risk** - No direct database queries with user input
4. **No `eval()` or `exec()`** - No dangerous code execution patterns
5. **No `subprocess` or `shell=True`** - No shell command injection risk
6. **Blob Storage Properly Authenticated** - Bearer token used for Vercel Blob API
7. **Client-Side Data Only Local** - No sensitive data stored in localStorage/sessionStorage

---

## Recommended Priority Actions

| Priority | Issue | Effort |
|----------|-------|--------|
| **P1** | Add auth to admin endpoint | 30 min |
| **P1** | Re-enable rate limiting | 1 hour |
| **P2** | Restrict CORS origins | 15 min |
| **P2** | Add CSP header | 30 min |
| **P3** | Escape URLs in onclick handlers | 15 min |
| **P3** | Add input length validation | 30 min |

---

## Conclusion

The application is reasonably secure for a development/beta stage but needs hardening before handling significant traffic or user data. The most critical issues are:

1. **Unprotected admin endpoint** - Easy fix with immediate impact
2. **Missing rate limiting** - Protect your API costs
3. **CORS wildcard** - Restrict in production

No critical vulnerabilities that would allow remote code execution or data breach were found. The XSS risks are theoretical given the controlled nature of the data sources.

---

*This audit was performed by automated code analysis. A manual penetration test is recommended for production deployment.*
