# Epstein Files Hub - Technical Roadmap

> **Created:** 2026-02-01
> **Status:** Planning
> **Location:** genuverity.com/epstein-files/

---

## Vision

The only Epstein document explorer that provides **search with truth indicators** - distinguishing FBI evidence from anonymous tips, flagging known misinformation, and preserving files that get removed.

---

## Unique Value Proposition

| Feature | Competitors | GenuVerity |
|---------|-------------|------------|
| Document search | ✅ | ✅ |
| Network visualization | ✅ | ✅ |
| Semantic search | ✅ | ✅ |
| **Verification badges** | ❌ | ✅ |
| **Misinformation alerts** | ❌ | ✅ |
| **Removed file archive** | Partial | ✅ |
| **"What's New" analysis** | ❌ | ✅ |
| **Fact-check integration** | ❌ | ✅ |

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│  LAYER 1: RELEASE SENSING & CAPTURE                                 │
│  ├── ChangeDetection.io → Monitor DOJ index pages                   │
│  ├── WARC capture pipeline → Forensic snapshots                     │
│  ├── Save Page Now / Perma.cc → Citation-grade backups              │
│  └── Diff log → Track additions/removals with timestamps            │
├─────────────────────────────────────────────────────────────────────┤
│  LAYER 2: PROCESSING & CLASSIFICATION                               │
│  ├── OCR pipeline (Tesseract/cloud) → Text extraction               │
│  ├── spaCy + EntityRuler → NER with alias dictionaries              │
│  ├── Splink → Entity resolution at scale                            │
│  ├── Evidence classifier → Badge assignment                         │
│  └── Deduplication → Hash + text similarity                         │
├─────────────────────────────────────────────────────────────────────┤
│  LAYER 3: KNOWLEDGE LAYER                                           │
│  ├── Vector embeddings (nomic-embed-text)                           │
│  ├── Entity graph (Cytoscape.js / Sigma.js)                         │
│  ├── Misinformation database (ClaimReview + GenuVerity)             │
│  └── "What's New" delta engine                                      │
├─────────────────────────────────────────────────────────────────────┤
│  LAYER 4: USER INTERFACE                                            │
│  ├── /epstein-files/search - Search with badges                     │
│  ├── /epstein-files/network - Connection graph                      │
│  ├── /epstein-files/timeline - Chronological view                   │
│  ├── /epstein-files/releases - Track DOJ releases                   │
│  ├── /epstein-files/fact-checks - Related reports                   │
│  └── /epstein-files/methodology - How we verify                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Badge System (Admiralty-Adapted)

### Source Reliability (A-F)

| Badge | Criteria | Color |
|-------|----------|-------|
| **A - COURT RECORD** | Filed in court docket, authenticated | 🟢 Green |
| **B - GOV RECORD** | FBI/DOJ generated, EFTA Bates number | 🔵 Blue |
| **C - VERIFIED EXTERNAL** | Corroborated by multiple sources | 🟡 Yellow |
| **D - UNVERIFIED** | Public tip, anonymous, single source | 🟠 Orange |
| **E - NEWS CLIPPING** | Media article (not primary evidence) | ⚪ Gray |
| **F - FLAGGED** | Known fake/debunked/manipulated | 🔴 Red |

### Information Credibility (1-6)

| Score | Meaning |
|-------|---------|
| 1 | Confirmed by independent records |
| 2 | Probably true (consistent, plausible) |
| 3 | Possibly true (uncorroborated) |
| 4 | Doubtful (inconsistencies) |
| 5 | Improbable (contradicted) |
| 6 | Known false |

---

## Data Sources

### Primary
- DOJ Epstein Library (justice.gov/epstein) - 12 data sets
- HuggingFace: tensonaut/EPSTEIN_FILES_20K (CSV, OCR'd)
- HuggingFace: svetfm embeddings (pre-computed)
- HuggingFace: notesbymuneeb/epstein-emails (2,322 emails)

### Archives (Including Removed Files)
- Internet Archive: combined-all-epstein-files
- COURIER/Google Pinpoint (retained deleted files)
- Sifter Labs: 106K docs (going open-source)

### MCP Servers
- `epstein-email-explorer-mcp` ✅ Installed
- `epstein_rag_mcp` (Qdrant + 20K docs) - Available

---

## Implementation Phases

### Phase 1: Archive Infrastructure (Priority)
**Goal:** Never lose a file, detect all changes

- [ ] WARC capture pipeline setup
- [ ] ChangeDetection.io for DOJ monitoring
- [ ] Mirror all 12 data sets
- [ ] Obtain COURIER deleted files
- [ ] Diff log with timestamps

### Phase 2: Processing Pipeline
**Goal:** Extract, classify, deduplicate

- [ ] OCR for non-searchable docs
- [ ] spaCy NER + alias dictionaries
- [ ] Evidence classifier (A-F badges)
- [ ] Splink entity resolution
- [ ] Vector embeddings

### Phase 3: Knowledge Layer
**Goal:** Connect documents, claims, fact-checks

- [ ] Misinformation database
- [ ] ClaimReview integration
- [ ] Entity graph
- [ ] "What's New" delta engine

### Phase 4: Interface
**Goal:** User-facing search with verification

- [ ] Search UI with badges
- [ ] Misinformation alerts
- [ ] Network visualization
- [ ] Timeline view
- [ ] Release tracker

---

## Key Reference Facts (For Misinformation Database)

1. **"No client list"** - July 2025 FBI/DOJ memo found no evidence of blackmail list
2. **Trump island visits** - No documented evidence of island visits (flights were Palm Beach ↔ NYC)
3. **Gates "ongoing relationship"** - Debunked; draft emails were never sent
4. **"166-name list"** - 78% of names not in actual court documents

---

## Competitive Landscape

| Tool | URL | Gap |
|------|-----|-----|
| DOJ Library | justice.gov/epstein | Files removed, no context |
| Sifter Labs | epstein-files.org | No verification layer |
| COURIER/Pinpoint | Google Pinpoint | No misinformation alerts |
| epsteinsecrets.com | Network graph | No source distinction |
| FiscalNote | Epstein Unboxed | No fact-check integration |

---

## Success Metrics

- [ ] Only platform with document-level verification badges
- [ ] Complete archive including all removed files
- [ ] "What's New" published within 24 hours of release
- [ ] Journalists cite as trusted source
- [ ] Misinformation alerts reduce viral spread
