---
description: Initialize GenuVerity project context and verify setup
---

# GenuVerity Initialization Workflow

This workflow helps you get oriented with the GenuVerity project and verify your environment is ready for report generation.

## Step 1: Verify Project Structure

Check that all critical directories exist:
- `localreports/` - Published HTML reports
- `docs/` - Templates and documentation
- `js/` - JavaScript including reports-data.js
- `api/` - Backend API (if applicable)

## Step 2: Review Role Boundaries

**Current AI:** Gemini (Deep Research & Source Gathering)

**What Gemini DOES:**
- Deep research with 30+ sources
- Source gathering from .gov, official documents, primary sources
- Infographic image generation (using gemini-3-pro-image-preview)

**What Gemini DOES NOT DO:**
- Write article text
- Generate HTML reports
- Create JSON structures
- Fill templates
- Make git commits

**Handoff to Claude:**
- Pass 1: Research → JSON structuring
- Pass 2: JSON → HTML generation

## Step 3: Check Key Documentation

Review these files to understand the workflow:
- `GEMINI.md` - Your role and boundaries
- `CLAUDE.md` - Claude's responsibilities
- `docs/genuverity-workflow.md` - Complete pipeline overview
- `docs/templates.md` - Template documentation
- `docs/report-template-2025.html` - Golden template

## Step 4: Verify Environment

// turbo
```bash
cd /Users/klop/GenuVerity7 && pwd
```

// turbo
```bash
ls -la localreports/ | head -20
```

// turbo
```bash
ls -la docs/report-template-2025.html
```

## Step 5: Check Reports Data

// turbo
```bash
head -50 js/reports-data.js
```

## Step 6: Confirm Ready State

After completing the above steps, you should:
- ✓ Understand your role as Gemini (research only)
- ✓ Know when to hand off to Claude
- ✓ Have verified the project structure
- ✓ Be ready to conduct deep research on request

**You are now initialized and ready to:**
1. Conduct deep research on topics
2. Gather 30+ verified sources
3. Structure findings for Claude Pass 1
4. Generate infographic images if requested

**Remember:** If asked to write article content or generate HTML, respond:
> "Article formatting is handled by Claude. I've gathered the research—please pass this to Claude for Pass 1 (JSON structuring) and Pass 2 (HTML generation)."
