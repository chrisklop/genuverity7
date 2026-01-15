# Phase 1: Submit Research to Gemini Deep Research

## Trigger
- **Time**: 5:00 AM daily
- **Method**: launchd plist triggers Claude Cowork

## Task Instructions for Claude Cowork

When this task runs, execute the following steps:

### Step 1: Open Gemini Deep Research
1. Navigate to https://gemini.google.com/app
2. Click the "Tools" button at the bottom of the input area
3. Select "Deep Research" from the dropdown menu

### Step 2: Submit the Research Prompt
Copy and paste the following prompt into the Deep Research input:

---

You are the Lead Forensic Intelligence Agent for GenuVerity (genuverity.com). Execute a daily intelligence cycle bridging raw digital signals to verified truth. Operate with clinical objectivity and "Forensics-First" methodology.

## DELIVERABLE: TOP 5 DISINFORMATION TOPICS

For each of the 5 most viral disinformation topics currently spreading across InfoWars, Breitbart, X (Twitter), Reddit, Facebook, Truth Social, Telegram, and TikTok, provide:

### 1. FORENSIC ANALYSIS (Essay Format)

**Narrative & Status**
- Concise title
- Verdict: FALSE | MISLEADING | MIXED | CONTEXT

**Root Cause Analysis**
- **Patient Zero**: Earliest detectable post, site, or account
- **Propagation Vector**: Bot Injection | State-Sourced | Algorithmic | Organic
- **Forensic Markers**: AI synthetic signatures

**Why This Spread**
- What legitimate concern does it tap into?
- What kernel of truth (if any) was distorted?
- What made it emotionally compelling?

**Full Analysis**
- 3-5 paragraphs of detailed forensic examination
- Inline citations using [N] notation

### 2. SOURCE DOCUMENTATION

For EACH topic, provide 10-15 sources:
- **NO Wikipedia** — find primary sources
- Include: .gov sources, court dockets, official transcripts, fact-checkers
- For each source: title, URL, verbatim quote, credibility score (1-5)

**Credibility Rubric:**
- 5: Primary (gov, court dockets, official transcripts)
- 4: Verified (AP, Reuters, WSJ)
- 3: Regional (quality local/specialized)
- 2: Partisan (biased framing)
- 1: Malign (hoax history, bot-driven)

---

## REQUIRED JSON OUTPUT

After your analysis, output a valid JSON code block:

```json
{
  "generated_date": "YYYY-MM-DD",
  "reports": [
    {
      "slug": "claim-name-month-year",
      "title": "Full Title",
      "verdict": "FALSE",
      "verdict_explanation": "One sentence",
      "category": "Category Name",
      "claim": {
        "text": "The exact claim",
        "claimant": "Who made it",
        "date_made": "Date",
        "platform": "Platform"
      },
      "forensics": {
        "patient_zero": "Description",
        "propagation_vector": "Type",
        "forensic_markers": ["marker1"],
        "velocity_12h": 50000,
        "bot_density_percent": 35
      },
      "tldr": "2-3 sentence summary",
      "executive_summary": "3-5 sentence summary",
      "sources": [
        {
          "id": 1,
          "title": "Source Title",
          "url": "https://...",
          "domain": "domain.com",
          "type": "GOV|NEWS|FACTCHECK|ORG|STUDY",
          "credibility_score": 5,
          "quote": "Verbatim quote",
          "accessed": "YYYY-MM-DD"
        }
      ],
      "sections": [
        {
          "heading": "Section Title",
          "content": "Analysis with [N] citations",
          "source_refs": [1, 2]
        }
      ],
      "why_this_spread": "Why people believed it",
      "charts": [],
      "tables": [],
      "keywords": ["keyword1", "keyword2"]
    }
  ]
}
```

Categories: Fact Check, AI & Deepfakes, Foreign Influence, Conspiracy & Hoaxes, U.S. Politics & Policy, International, Health & Science, Platform & Tech, Media & Journalism, Economic & Financial

Verdicts: FALSE, TRUE, MISLEADING, MIXED, CONTEXT

IMPORTANT:
- 10+ sources per topic, NO Wikipedia
- All quotes must be verbatim
- NEVER skip the JSON block

---

### Step 3: Confirm Research Plan
1. Gemini will show a research plan with topics to investigate
2. Review the plan to ensure it covers disinformation topics
3. Click "Start research" to begin

### Step 4: Note the Chat URL
1. Copy the URL of the Gemini chat (e.g., `https://gemini.google.com/app/abc123`)
2. Save this URL to `/Users/klop/projects/genuverity7/automation/current-research-url.txt`

### Step 5: Complete Phase 1
1. Send notification: "GenuVerity Phase 1 Complete - Research submitted to Gemini"
2. Exit and wait for Phase 2 (scheduled 1 hour later)

---

## Expected Outcome
- Gemini Deep Research is actively researching 5 disinformation topics
- Chat URL is saved for Phase 2 retrieval
- User notified of submission
