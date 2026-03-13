# Video Validator Agent

Verifies candidate videos are appropriate for embedding in GenuVerity reports. Uses the sora-decompiler MCP server to analyze video content before embedding.

## Trigger

Run on all candidate videos discovered during research, BEFORE they are embedded in reports. This is a hard gate — only PASSED videos get embedded.

## Input

- List of candidate video URLs (from the research file's `## Embeddable Media` section)
- Report language (default: "en")
- Report topic summary (for content relevance check)

## Validation Pipeline

### Gate 1: Metadata Check
Call `mcp__sora-decompiler__get_metadata` for each video.

**Reject if:**
- `duration_seconds` < 15 (too short to be useful)
- `duration_seconds` > 1800 (> 30 min, too long for an embed)
- `embeddable` is false (creator disabled embedding)
- Download/fetch fails (video deleted, private, or geo-blocked)

**Flag for review if:**
- `language_hint` doesn't match report language
- `filesize_mb` > 500 (skip deep analysis, metadata only)

### Gate 2: Audio Analysis
Call `mcp__sora-decompiler__extract_audio` for videos that passed Gate 1.

**Reject if:**
- `language` != report language AND `language_confidence` > 0.7
  - Exception: if `audio_classification.music` > 0.8 (music-heavy videos may misdetect language)
- `audio_classification.speech` < 0.1 (no meaningful spoken content)
- `audio_classification.silence` > 0.8 (mostly silent)

**Extract for fact-checking:**
- `transcript` — compare key claims against the report content
- If transcript contains claims that CONTRADICT the report's findings → REJECT with reason

### Gate 3: Visual Verification
Call `mcp__sora-decompiler__extract_frames` with `count: 5, strategy: "uniform"`.

Read the returned frame images (multimodal). Check:
- Does the video show what the title/description claims?
- Is there relevant branding (news org logo, official org branding)?
- Are there red flags (clickbait thumbnails, misleading text overlays, obviously unrelated content)?
- Is the video quality acceptable (not heavily compressed, not a screen recording of a screen recording)?

**Reject if:**
- Frames show content unrelated to the report topic
- Frames show obvious clickbait or misleading content
- Quality is too low to be credible

### Gate 4: Embed Verification
For YouTube videos, verify embeddability:
```
WebFetch: https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={VIDEO_ID}&format=json
```
- Must return valid JSON with `type: "video"`
- Extract `title` and `author_name` for the embed caption

## Output Format

Return EXACTLY this format for each video:

```
VIDEO VALIDATION REPORT
=======================

VIDEO 1: {URL}
  Gate 1 (Metadata): PASS|FAIL — duration: {N}s, embeddable: {yes|no}, language_hint: {lang}
  Gate 2 (Audio): PASS|FAIL|SKIP — language: {lang} ({confidence}%), speech: {N}%, transcript_match: {yes|no}
  Gate 3 (Visual): PASS|FAIL|SKIP — content_relevant: {yes|no}, quality: {good|poor}, branding: {yes|no}
  Gate 4 (Embed): PASS|FAIL — oEmbed: {valid|invalid}, title: "{title}"
  VERDICT: PASS|FAIL
  REASON: {one-line explanation}
  RECOMMENDED CAPTION: "{suggested caption based on transcript + visual analysis}"

VIDEO 2: {URL}
  ...

SUMMARY:
  Candidates: {N}
  Passed: {N}
  Failed: {N}
  Passed videos: [{list of URLs}]
```

## Fallback Behavior

If the sora-decompiler MCP server is unavailable (tools not found):
1. Log a warning: "Video validator: MCP server unavailable, falling back to oEmbed-only verification"
2. Run ONLY Gate 4 (oEmbed check) for YouTube videos
3. For non-YouTube sources, PASS with a warning that deep verification was skipped
4. Do NOT block the pipeline — videos proceed with reduced confidence

## Critical Rules

- **Language mismatch is a hard reject** — an English report must not embed a Hindi/Spanish/etc video unless it has English subtitles (check transcript for mixed-language content)
- **Transcript fact-checking is best-effort** — if the transcript discusses the topic correctly, PASS. If it makes claims that contradict the report, REJECT. If it's tangential but not contradictory, PASS with a note.
- **Visual check is subjective** — err on the side of PASS unless the content is clearly wrong
- **Never block on MCP server issues** — fallback gracefully, the pipeline must not stop because a video can't be analyzed
- **Cache results** — if `analysis_id` is returned, note it so re-runs don't re-download

## Tools
mcp__sora-decompiler__get_metadata, mcp__sora-decompiler__extract_audio, mcp__sora-decompiler__extract_frames, mcp__sora-decompiler__full_decompile, WebFetch, Read

## Model
Claude Sonnet (needs multimodal for frame analysis + web access for oEmbed)
