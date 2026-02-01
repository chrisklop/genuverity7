# GenuVerity Epstein Files Project - Research Brief

## About GenuVerity

GenuVerity is a fact-checking platform that investigates misinformation, disinformation, and viral claims using a source-first methodology. Unlike traditional fact-checkers that simply rate claims as "true" or "false," GenuVerity provides comprehensive analysis with primary source citations, contextual explanations, and visual data presentations.

**Core principles:**
- Source-first verification (primary documents over secondary reporting)
- Transparent methodology (show our work)
- Nuanced verdicts (TRUE, FALSE, MISLEADING, MIXED, CONTEXT NEEDED)
- No partisan agenda - we fact-check claims regardless of political origin

GenuVerity has published 190+ fact-check reports covering topics from AI deepfakes to political misinformation to health claims.

---

## The Problem We're Solving

The Jeffrey Epstein files represent one of the largest document releases in DOJ history (3.5+ million pages, 180,000 images, 2,000 videos across 12+ data sets). However, these files are:

1. **Nearly impossible to navigate** - Filenames like "003.pdf" with no descriptions
2. **Mixed in reliability** - FBI evidence sits alongside unverified public tips and Epstein's self-promotional materials
3. **Frequently misrepresented** - Viral claims spread faster than verification
4. **Inconsistently available** - Files are released then quietly removed (16+ files disappeared from DOJ site after Jan 30, 2026 release)
5. **Lacking context** - Being mentioned ≠ wrongdoing, but existing tools don't make this distinction

**The DOJ itself warns:** "This production may include fake or falsely submitted images, documents or videos, as everything that was sent to the FBI by the public was included."

---

## What Already Exists (Competitive Landscape)

| Tool | What It Does | What It Lacks |
|------|--------------|---------------|
| DOJ Epstein Library (justice.gov/epstein) | Official source, 12 data sets | Poor search, no context, files get removed |
| Sifter Labs (epstein-files.org) | 106K docs, semantic search | Going unfunded/open-source, no fact-check layer |
| Google Pinpoint/COURIER | Good search, preserved deleted files | No verification layer, no analysis |
| GitHub visualizations | Network graphs, timelines | No distinction between verified/unverified |
| MCP servers (RAG search) | Claude AI integration | Raw data, no curation or fact-checking |
| epsteinsecrets.com | 5,500 node network graph | No source quality indicators |

**Critical gap:** Every existing tool treats all documents as equally valid. None distinguish FBI evidence from anonymous tips from news clippings from debunked claims.

---

## GenuVerity's Unique Value Proposition

### "The Fact-Checked Epstein Files Explorer"

We will be the only platform that combines document search with verification status, providing:

### 1. Document Verification Badges
Every searchable document tagged with reliability indicator:
- ✅ **VERIFIED** - FBI evidence, court records, official documents
- ⚠️ **UNVERIFIED** - Public tips, anonymous submissions
- 📰 **NEWS CLIPPING** - Media articles (not primary evidence)
- 📝 **SELF-PROMOTIONAL** - Epstein's own materials
- ❌ **DEBUNKED** - Known false or manipulated content

### 2. Misinformation Alerts at Search Time
When users search for names/topics with known false claims circulating:
- Surface the fact-check BEFORE the raw documents
- Prevent viral misinformation from spreading further
- Example: Searching "Bill Gates" shows alert that "ongoing relationship" claims are debunked

### 3. Permanent Archive of Removed Files
- Mirror all releases immediately upon publication
- Track and highlight files that get removed after release
- Preserve the complete record regardless of DOJ changes
- Document what was removed and when

### 4. "What's Actually New" Tracker
Each DOJ release generates viral claims about "new revelations" that are often:
- Already publicly known
- Misinterpreted documents
- Recycled old information

We will analyze each release and clearly identify:
- Genuinely new information
- Already-known information being recirculated
- Misrepresented or out-of-context claims

### 5. Cross-Referenced Fact-Checks
- Link documents to relevant GenuVerity fact-check reports
- When a document relates to a debunked claim, show the analysis
- Build a knowledge graph connecting documents → claims → fact-checks

### 6. Network Visualization with Verification Layer
- Interactive connection graph (who connects to whom)
- Color-coded by verification status
- Filter by evidence type (verified only, all, etc.)
- Distinguish "mentioned in FBI evidence" from "mentioned in anonymous tip"

---

## Key User Personas

1. **Journalists on deadline** - Need verified quotes, accurate context, can't afford errors
2. **OSINT investigators** - Want to trace connections, need source reliability
3. **Researchers** - Academic rigor, need to distinguish evidence types
4. **Survivors** - Looking for their own cases, need sensitivity and accuracy
5. **General public** - Curious about famous names, vulnerable to misinformation

---

## Technical Requirements for Research

We need to identify:

### Data Sources to Ingest
- All DOJ data sets (1-12+) with update monitoring
- COURIER/Pinpoint preserved files (includes DOJ-deleted content)
- Internet Archive mirrors
- HuggingFace datasets (tensonaut/EPSTEIN_FILES_20K, embeddings)
- Any other comprehensive archives

### File Preservation Strategy
- Automated monitoring of DOJ site for new releases
- Immediate mirroring upon release
- Diff tracking to identify removed files
- Permanent storage solution (cannot rely on third parties)

### Integration Possibilities
- MCP servers for Claude Code integration
- Existing RAG implementations we could build on
- Embedding datasets we could leverage
- Network graph tools/libraries

### Fact-Check Data Layer
- Document classification system (evidence type)
- Known misinformation database
- Cross-reference with existing fact-checks
- Entity extraction and alias resolution

---

## Research Questions

1. What tools exist for monitoring government websites for changes/removals?
2. What's the most complete archive of all Epstein file releases (including removed files)?
3. Are there existing document classification systems for evidence types?
4. What entity extraction tools handle alias resolution well?
5. How are other fact-checkers handling document-level verification?
6. What visualization libraries best support verification status overlays?
7. Are there existing databases of Epstein-related misinformation claims?
8. What's the best approach for real-time monitoring of new DOJ releases?

---

## Success Metrics

- Only platform with document-level verification status
- Complete archive including all removed files
- Misinformation alerts reduce spread of false claims
- Journalists cite GenuVerity as trusted source
- "What's New" analysis published within 24 hours of each release

---

## Summary

GenuVerity's Epstein Files Hub will be differentiated by treating document verification as a first-class feature, not an afterthought. While others provide search and visualization, we provide **search with truth indicators** - ensuring users understand not just what the documents say, but how reliable they are and what misinformation exists around them.

The goal is to be the responsible, fact-checked alternative to raw document dumps that fuel misinformation.
