# GenuVerity SEO & Content Strategy

## Executive Summary

GenuVerity is an AI-powered fact-checking and investigative journalism platform. This document outlines a comprehensive strategy to grow organic traffic through proactive content generation, semantic caching, and technical SEO improvements.

**Core Insight**: By monitoring misinformation sources and being "first to fact-check" viral claims before major outlets like Snopes or PolitiFact, GenuVerity can capture search traffic during the critical 24-48 hour window when people are actively searching for verification.

---

## Current State Assessment

### Platform Capabilities
- **AI-powered fact-checking** using Claude Sonnet 4 for analysis
- **Real source verification** via Tavily API
- **Professional fact-check integration** via Google Fact Check Tools API
- **Infographic generation** using Gemini 3 Pro Image Preview

### Content Inventory (as of Dec 2024)
| Type | Count | Notes |
|------|-------|-------|
| Investigations | 56 | Long-form data-driven articles |
| Deep Dives | 16 | Child essays exploring subtopics |
| Fact Checks | 6 | Verdict-based claim verification |
| **Total** | **78** | |

### Technical Gaps
- No sitemap.xml (Google can't efficiently discover content)
- Hash-based URLs (#article/slug) not indexable
- Missing meta tags for social sharing
- No structured data markup

---

## Three-Pillar Content Strategy

### Pillar A: Semantic Cache Matching (IMPLEMENTED)

**What**: When users search for topics, the system now performs keyword-based similarity matching against existing articles before generating new content.

**Why**:
- Reduces API costs by serving existing content
- Provides instant value (no generation wait time)
- Increases perceived value of the platform
- Builds user habit of checking GenuVerity first

**How It Works**:
1. User types "vaccines autism" in search
2. System tokenizes query, removes stopwords
3. Compares against all article titles/descriptions
4. If similarity > 30%, shows "Related Content Found" modal
5. User can read existing article FREE or generate new

**Example**:
```
Query: "vaccines autism"
Match: "vaccines_cause_autism" (75% similarity)
Result: User offered existing fact-check for free
```

---

### Pillar B: Proactive Misinformation Monitoring

**What**: Automatically monitor sources that frequently spread checkable claims and generate fact-checks before other outlets.

**Why**:
- First-mover advantage in search rankings
- Capture traffic during viral peak (24-48 hours)
- Build reputation as fast, reliable source
- Generate content that has guaranteed search demand

#### Target Sources

| Source | Type | Why Monitor | Claims/Day |
|--------|------|-------------|------------|
| **Breitbart** | RSS | High-traffic conservative news, frequent misleading headlines | 3-5 |
| **InfoWars** | RSS | Conspiracy theories that go viral | 2-3 |
| **Gateway Pundit** | RSS | Election/political misinformation | 2-4 |
| **X/Twitter** | API | Viral posts from known accounts | 5-15 |
| **Google Trends** | API | Rising "is it true" searches | 2-5 |
| **Reddit** | API | r/conservative, r/conspiracy emerging narratives | 2-4 |
| **TikTok** | Scrape | Viral misinformation videos | 3-5 |

#### Claim Filtering Criteria

Not every headline is worth fact-checking. Filter for:

1. **Verifiable assertion** (not opinion)
   - YES: "Biden signed executive order banning gas stoves"
   - NO: "Biden's policies are destroying America"

2. **Named entities** (person, organization, event, statistic)
   - YES: "Pfizer CEO admitted vaccines don't work"
   - NO: "Big Pharma is lying to us"

3. **Time-sensitive** (breaking news, < 48 hours old)
   - Priority: Claims about events happening NOW
   - Lower: Evergreen conspiracy theories (handle separately)

4. **Viral potential** (engagement metrics)
   - High shares/retweets/comments
   - Cross-platform spread

5. **Not already fact-checked**
   - Check Google Fact Check Tools API
   - Check Snopes, PolitiFact RSS

#### Daily Pipeline

```
6:00 AM  - Crawl RSS feeds, extract headlines
6:15 AM  - Query X/Twitter for viral posts from watchlist
6:30 AM  - Query Google Trends for rising fact-check searches
6:45 AM  - Deduplicate and filter using criteria
7:00 AM  - Score by viral potential, select top 5
7:15 AM  - Generate fact-checks (parallel)
8:00 AM  - Push to index, update sitemap
8:15 AM  - Post to social media channels
```

#### Implementation Options

**Option A: Manual Daily (MVP)**
- Check Breitbart/InfoWars headlines each morning
- Manually select 2-3 claims to fact-check
- Generate via admin interface
- Time: 30 minutes/day

**Option B: Semi-Automated (Recommended)**
- Cron job harvests claims overnight
- Presents ranked list in admin dashboard
- Human approves which to generate
- Time: 10 minutes/day

**Option C: Fully Automated**
- AI classifies claims as checkable/not
- Auto-generates without human review
- Risk: May generate for non-claims
- Benefit: 24/7 coverage

---

### Pillar C: Long-Tail Evergreen Content

**What**: Comprehensive fact-checks for persistent conspiracy theories and misinformation that people search for year-round.

**Why**:
- Builds SEO authority over time
- Compounds traffic (searches don't expire)
- Establishes GenuVerity as definitive source
- Lower competition than breaking news

#### Target Topics

**Health & Science**
- Vaccines cause autism (various claims)
- 5G causes cancer/COVID
- Chemtrails/geoengineering
- Fluoride mind control
- GMO food dangers
- Microplastics conspiracy

**Government & Politics**
- Moon landing hoax
- JFK assassination theories
- 9/11 inside job claims
- Deep state existence
- Election fraud (general)
- FEMA camps

**Historical**
- Holocaust denial claims
- Flat earth evidence
- Ancient aliens
- Illuminati control

**Health Treatments**
- Ivermectin for COVID
- Essential oils cure cancer
- Detox cleanses work
- Alkaline water benefits

#### Content Strategy

1. **Research Phase**: Identify top 100 evergreen conspiracy/misinformation topics
2. **Prioritize**: By search volume and competition
3. **Generate**: Comprehensive, well-sourced fact-checks
4. **Update**: Annually with new evidence/developments

---

## Technical SEO Requirements

### Priority 1: Indexability (Critical)

| Task | Current | Required | Impact |
|------|---------|----------|--------|
| sitemap.xml | None | Dynamic sitemap with all articles | Google discovery |
| URL structure | `/#article/slug` | `/fact-check/slug` | Indexable URLs |
| robots.txt | None | Allow crawling | Crawler guidance |
| Canonical URLs | None | One URL per article | Prevent duplicates |

### Priority 2: On-Page SEO (High)

| Task | Current | Required | Impact |
|------|---------|----------|--------|
| Title tags | Generic | `[Claim] - Fact Check | GenuVerity` | SERP display |
| Meta descriptions | None | 155-char summary with verdict | Click-through rate |
| H1 tags | Varies | One H1 = article title | Page structure |
| Open Graph | None | og:title, og:description, og:image | Social sharing |

### Priority 3: Structured Data (Medium)

| Schema Type | Purpose | Benefit |
|-------------|---------|---------|
| ClaimReview | Fact-check markup | Rich snippets (Bing) |
| Article | News article markup | Google News eligibility |
| Organization | Publisher info | Knowledge panel |
| BreadcrumbList | Navigation structure | SERP breadcrumbs |

**Note**: Google deprecated ClaimReview from search results in June 2025, but Bing and other engines still use it.

### Priority 4: Performance (Medium)

| Metric | Target | Why |
|--------|--------|-----|
| LCP | < 2.5s | Core Web Vital |
| FID | < 100ms | Core Web Vital |
| CLS | < 0.1 | Core Web Vital |
| Mobile-friendly | Yes | Mobile-first indexing |

---

## User-Generated Content Strategy

### Semantic Caching Flow

```
User Query
    ↓
Check Exact Cache Match
    ↓ (if miss)
Find Similar Articles (>30% similarity)
    ↓ (if found)
Show "Related Content" Modal
    ↓
User Choice:
  - Read existing (FREE)
  - Generate new (uses credit)
```

### Benefits
- **Cost reduction**: ~30-60% of queries can be served from cache
- **Instant gratification**: Users get answers immediately
- **Content discovery**: Users find articles they didn't know existed
- **Quality control**: Popular topics get refined over time

---

## Content Generation Costs

### Per-Article Costs

| Component | Cost | Notes |
|-----------|------|-------|
| Claude Sonnet 4 (text) | ~$0.50-1.00 | Depends on length |
| Tavily search | ~$0.01 | 5-10 searches |
| Gemini infographics | ~$0.10 | 2-4 images |
| **Total per article** | **~$0.60-1.20** | |

### Monthly Projections

| Scenario | Articles/Month | Cost |
|----------|---------------|------|
| Conservative | 100 | $60-120 |
| Moderate | 300 | $180-360 |
| Aggressive | 750 | $450-900 |

### Cost Optimization

1. **Cache hits reduce generation**: Target 50% cache hit rate
2. **Skip infographics for simple claims**: Not all fact-checks need charts
3. **Batch generation during off-peak**: Lower API costs
4. **Prioritize high-value content**: Focus on trending topics

---

## Implementation Timeline

### Week 1: Technical SEO Foundation
- [ ] Implement dynamic sitemap.xml
- [ ] Add proper URL routing (/fact-check/[slug])
- [ ] Add meta tags to all pages
- [ ] Submit to Google Search Console

### Week 2: Monitoring Pipeline
- [ ] Set up RSS parsing for Breitbart, InfoWars, Gateway Pundit
- [ ] Create claim extraction logic
- [ ] Build admin dashboard for claim review
- [ ] Implement daily cron job

### Week 3: Evergreen Content
- [ ] Research top 50 conspiracy theories
- [ ] Generate comprehensive fact-checks
- [ ] Optimize for target keywords
- [ ] Interlink related content

### Week 4: Automation & Scaling
- [ ] Implement social media auto-posting
- [ ] Add Google Trends monitoring
- [ ] Set up performance dashboards
- [ ] Begin X/Twitter monitoring (if API available)

---

## Success Metrics

### Traffic Metrics

| Metric | Current | 30-Day | 90-Day | 180-Day |
|--------|---------|--------|--------|---------|
| Indexed pages | ~0 | 100 | 500 | 1,000+ |
| Organic sessions/day | 0 | 50-100 | 500-1K | 2K-5K |
| Avg. session duration | - | 2 min | 3 min | 4 min |
| Pages/session | - | 1.5 | 2.0 | 2.5 |

### Content Metrics

| Metric | Current | 30-Day | 90-Day | 180-Day |
|--------|---------|--------|--------|---------|
| Total articles | 78 | 200 | 500 | 1,000+ |
| Fact checks | 6 | 100 | 350 | 700+ |
| Cache hit rate | 0% | 20% | 40% | 60% |

### Engagement Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| Bounce rate | < 60% | Users finding value |
| Return visitors | > 20% | Building habit |
| Social shares | 10+/article | Viral potential |

---

## Competitive Analysis

### Direct Competitors

| Site | Strengths | Weaknesses | Our Advantage |
|------|-----------|------------|---------------|
| **Snopes** | Brand trust, comprehensive | Slow, editorial bottleneck | Speed, AI-assisted |
| **PolitiFact** | Pulitzer credibility | Political focus only | Broader scope |
| **FactCheck.org** | Academic rigor | Dry presentation | Visual, engaging |
| **Lead Stories** | Fast response | Less comprehensive | Deeper analysis |

### Our Differentiators

1. **Speed**: AI-generated within minutes vs days for traditional outlets
2. **Sources First**: Transparency about evidence before conclusions
3. **Visual**: Infographics make data accessible
4. **Interactive**: Deep dives, fractal exploration
5. **Comprehensive**: Both fact-checks and investigative pieces

---

## Risk Mitigation

### Content Quality Risks

| Risk | Mitigation |
|------|------------|
| AI hallucination | Tavily source verification, real URLs only |
| False verdicts | Multiple source requirement, confidence scores |
| Bias perception | Transparent methodology, source diversity |
| Outdated info | Regular content audits, update timestamps |

### Technical Risks

| Risk | Mitigation |
|------|------------|
| API rate limits | Key rotation, caching |
| Cost overruns | Daily budget caps, monitoring |
| Downtime | Vercel reliability, error handling |
| Data loss | Blob storage redundancy |

### Legal Risks

| Risk | Mitigation |
|------|------------|
| Defamation claims | Focus on public figures, factual claims |
| Copyright | Original analysis, fair use for quotes |
| Source disputes | Clear attribution, correction policy |

---

## Appendix: Claim Extraction Patterns

### Headlines That Signal Checkable Claims

```regex
# Patterns indicating verifiable claims
"(says|said|claims|claimed|admits|admitted) (that )?"
"(according to|per|via) [A-Z]"
"(study|report|data|statistics) (shows?|reveals?|finds?)"
"(breaking|just in|confirmed):"
"\d+%|\$\d+|millions?|billions?"
```

### Headlines to Skip

```regex
# Opinion/editorial patterns
"(opinion|editorial|commentary|analysis):"
"(should|must|needs? to)"
"(good|bad|best|worst) (for|about)"
"(why|how) (we|you|I)"
```

---

## Appendix: API Endpoints for Monitoring

### RSS Feeds

```
Breitbart: https://feeds.feedburner.com/breitbart
InfoWars: https://www.infowars.com/feed/custom_feed_rss
Gateway Pundit: https://www.thegatewaypundit.com/feed/
```

### APIs

```
Google Trends: https://trends.google.com/trends/api/
Google Fact Check: https://factchecktools.googleapis.com/v1alpha1/claims:search
Tavily: https://api.tavily.com/search
Twitter/X: https://api.twitter.com/2/ (requires elevated access)
```

---

*Document Version: 1.0*
*Last Updated: December 2024*
*Author: GenuVerity Development Team*
