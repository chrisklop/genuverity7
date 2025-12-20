# Documentation Conflicts Report
*Generated: December 18, 2025*

This report identifies conflicts, outdated information, and inconsistencies across the GenuVerity documentation.

---

## Critical Conflicts

### 1. Project Description Mismatch

**CLAUDE.md** describes the project as:
> "GenuVerity is an AI-powered fact-checking platform with disinformation tracking capabilities"

**ROADMAP.md** describes it as:
> "GenuVerity into a fully interactive investigative journalism platform"

**IMPLEMENTATION_PLAN.md** describes it as:
> "Investigative journalism platform where all 3 trending articles are complete"

**Recommendation**: Update all documentation to reflect the **current dual focus**: fact-checking + disinformation intelligence reports (like Spamouflage and Doppelganger analyses).

---

### 2. API Endpoint Discrepancies

**CLAUDE.md lists these endpoints:**
```
/api/fact-check (POST)
/api/cache/check (POST)
/api/cache/list (GET)
/api/article/{slug} (GET)
/api/admin/rebuild-index (POST)
/api/health (GET)
```

**ROADMAP.md lists:**
```
POST /api/generate (NOT /api/fact-check)
POST /api/deep-dive
POST /api/infographics/batch
```

**IMPLEMENTATION_PLAN.md mentions:**
```
/api/enhance (planned)
/api/generate (current)
```

**Actual api/index.py** should be the source of truth.

**Recommendation**: Audit `api/index.py` and update all docs to match actual endpoints.

---

### 3. Model Configuration Conflicts

**CLAUDE.md states:**
| Purpose | Model | Location |
|---------|-------|----------|
| Fact-Check Text | `claude-sonnet-4-20250514` | Production |
| Deep Dives | `claude-sonnet-4-5-20250929` | Local |

**ROADMAP.md states:**
| Content Type | Model |
|--------------|-------|
| Article Text | Claude Sonnet 4/4.5 |
| Infographics | `gemini-3-pro-image-preview` |

**IMPLEMENTATION_PLAN.md states:**
> "Backend: FastAPI + Gemini 3 Pro for AI generation"

**Conflict**: IMPLEMENTATION_PLAN suggests Gemini for text generation, but CLAUDE.md explicitly states Claude for text.

**Recommendation**: IMPLEMENTATION_PLAN.md is outdated. Update to reflect Claude for text, Gemini for images.

---

### 4. Infographic Model References

**CLAUDE.md:**
> "ONLY use model `gemini-3-pro-image-preview` for infographics"

**ROADMAP.md:**
> "Gemini 3 Pro Image Preview for data visualizations"

These are consistent.

**However**: The cost analysis revealed there's also `gemini-2.5-flash` as a budget alternative. This option is not documented anywhere.

**Recommendation**: Add budget alternative model option to ROADMAP.md.

---

## Medium Priority Conflicts

### 5. JSON Schema Discrepancies

**CLAUDE.md** shows this schema:
```json
{
  "key": "claim_slug",
  "articleType": "fact_check",
  "verdict": "TRUE | FALSE | MOSTLY_TRUE...",
  "disinfoAnalysis": {...}
}
```

**essay_schema.md** shows a simpler schema:
```json
{
  "unique_id": {
    "title": "...",
    "content": "...",
    "chartType": "...",
    "sources": [...]
  }
}
```

**Conflict**: Two different article types (fact-check vs essay) but no clear documentation on when to use which.

**Recommendation**: Create unified schema documentation that covers both use cases.

---

### 6. Environment Variables

**CLAUDE.md lists:**
- `ANTHROPIC_API_KEY`
- `BLOB_READ_WRITE_TOKEN`
- `TAVILY_API_KEY`
- `GOOGLE_FACT_CHECK_API_KEY`
- `ADMIN_SECRET`
- `CLAUDE_MODEL`

**Missing from documentation:**
- `GOOGLE_AI_API_KEY` (for Gemini image generation - mentioned in original CLAUDE.md but removed)

**Recommendation**: Add `GOOGLE_AI_API_KEY` back to environment variables list.

---

### 7. Color Palette Conflicts

**CLAUDE.md** "Semantic Color Palette":
| Category | Color | Hex |
|----------|-------|-----|
| False | Neon Crimson | `#FF2A2A` |
| Misleading | Hot Pink | `#FF00CC` |

**CLAUDE.md** "Color Palette (MANDATORY)":
| Use | Color | Hex |
|-----|-------|-----|
| Primary accent | Blue | `#3b82f6` |
| Secondary accent | Cyan | `#06b6d4` |

**IMPLEMENTATION_PLAN.md:**
```html
<button class="text-purple-400 hover:text-purple-300 border border-purple-400/30">
```

**Conflict**: Implementation plan uses purple (explicitly forbidden in CLAUDE.md).

**Recommendation**: Update IMPLEMENTATION_PLAN.md to use allowed colors.

---

### 8. Server Configuration

**CLAUDE.md:**
> "python server.py - Local dev server (port 8000)"

**ROADMAP.md** and **IMPLEMENTATION_PLAN.md:**
No mention of server.py configuration.

**Recommendation**: Add server.py documentation to ROADMAP.md.

---

## Outdated Information

### 9. ROADMAP.md Last Updated Date
> "*Last updated: December 8, 2024*"

This is nearly a year old and doesn't reflect:
- New disinformation tracking reports
- Mirror Maze/Doppelganger analysis
- Spamouflage network visualization
- Custom reports page

**Recommendation**: Update ROADMAP.md with 2025 developments.

---

### 10. IMPLEMENTATION_PLAN.md References Stale Articles
Lists these as "stub articles":
- `energy_crisis`
- `model_collapse`
- `regulatory_capture`

These may no longer be relevant to the current disinformation focus.

**Recommendation**: Audit if these articles still exist and update plan accordingly.

---

## Missing Documentation

### Items That Need Documentation:

1. **Network Analysis Reports** (Spamouflage, Mirror Maze)
   - No schema documentation for D3.js network visualizations
   - No source verification workflow documented

2. **Custom Reports Page** (`reports.html`)
   - Not mentioned in any documentation

3. **Static HTML Reports** (`plaque-fact-check.html`, `network-analysis.html`, `doppelganger-analysis.html`)
   - No documentation on structure or update procedures

4. **Deployment Checklist**
   - No documented pre-deployment verification steps

---

## Recommended Actions

### Immediate (High Priority)
1. [ ] Audit `api/index.py` and update CLAUDE.md endpoints
2. [ ] Fix purple color references in IMPLEMENTATION_PLAN.md
3. [ ] Add GOOGLE_AI_API_KEY to environment variables

### Short-term (Medium Priority)
4. [ ] Update ROADMAP.md with 2025 developments
5. [ ] Create unified article schema documentation
6. [ ] Document static report pages

### Long-term (Low Priority)
7. [ ] Archive or remove outdated implementation plans
8. [ ] Create deployment checklist
9. [ ] Add documentation for network visualization components

---

## Files Requiring Updates

| File | Priority | Action Needed |
|------|----------|---------------|
| `CLAUDE.md` | High | Add missing env var, verify endpoints |
| `docs/ROADMAP.md` | Medium | Update with 2025 work, fix date |
| `IMPLEMENTATION_PLAN.md` | Medium | Fix purple colors, update architecture |
| `docs/essay_schema.md` | Low | Expand to cover all article types |

---

*This report should be reviewed and actioned to maintain documentation consistency.*
