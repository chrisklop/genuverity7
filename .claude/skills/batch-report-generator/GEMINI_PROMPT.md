# Gemini Deep Research Prompt Template

Copy the text below into Gemini for Deep Research. Replace the TOPICS section with your actual topics.

---

## PROMPT TO COPY:

```
You are a fact-checking research assistant. I need you to deeply research the following claims/topics and provide structured data for each.

For EACH topic, research and provide:

1. **VERDICT**: Choose one: FALSE / MISLEADING / MIXED / CONTEXT NEEDED
2. **CLAIM**: One clear sentence stating what was claimed
3. **CLAIMANT**: Who made this claim (person, organization, or "viral social media")
4. **DATE**: When the claim emerged or peaked (e.g., "January 2025")
5. **CATEGORY**: One of: U.S. Politics & Policy, Health & Medical, AI & Deepfakes, Immigration & Border, International Affairs, Economic Claims, Conspiracy & Hoaxes, Platform & Tech, Media & Journalism
6. **SOURCES**: Provide 10-15 PRIMARY sources (NO Wikipedia). For each source:
   - Title of the article/document
   - Full URL
   - One key quote (verbatim) that supports or refutes the claim
7. **CONTEXT**: 3 sentences explaining WHY you reached this verdict

TOPICS TO RESEARCH:
1. [Replace with topic 1]
2. [Replace with topic 2]
3. [Replace with topic 3]
4. [Replace with topic 4]
5. [Replace with topic 5]

OUTPUT FORMAT:
Return your research as valid JSON matching this exact structure:

{
  "reports": [
    {
      "slug": "topic-slug-2025",
      "title": "Full Descriptive Title of the Claim",
      "verdict": "FALSE",
      "claim": "The specific claim being fact-checked in one sentence.",
      "claimant": "Name of person or organization",
      "date": "January 2025",
      "category": "Category Name",
      "sources": [
        {
          "title": "Article Title from Source",
          "url": "https://full-url-to-source.com/article",
          "quote": "Exact quote from the source that's relevant..."
        }
      ],
      "context": "Three sentences explaining the verdict. Include key facts. Mention the most important evidence."
    }
  ]
}

IMPORTANT GUIDELINES:
- Use ONLY primary sources (official reports, major news outlets, academic papers)
- NO Wikipedia - find the original sources Wikipedia cites
- Include diverse source types: news, government, academic, fact-checkers
- Quotes must be EXACT (verbatim from the source)
- URLs must be valid and accessible
- Slug format: lowercase-words-separated-by-dashes-2025
```

---

## After Gemini Research

1. Copy Gemini's JSON output
2. Run `/batch-report` in Claude Code
3. Paste the JSON when prompted
4. Claude generates HTML reports automatically

## Tips for Better Research

- Give Gemini specific, searchable claims
- Include date ranges if relevant
- Ask for fact-checker sources (PolitiFact, Snopes, FactCheck.org)
- Request government/official sources when applicable
