# LLMO & GEO: How Companies Game AI Search Results

**Research Date:** 2026-02-22
**Researcher:** Claude Deep Research Agent
**Searches Conducted:** 17 web searches, 5 deep article fetches
**Sources Cited:** 50+

---

## Executive Summary

A new arms race is underway in digital marketing. As AI chatbots like ChatGPT, Perplexity, and Gemini replace traditional search engines for millions of users, an entire industry has emerged to manipulate what these AI systems recommend. Known as **LLM Optimization (LLMO)** and **Generative Engine Optimization (GEO)**, these practices range from legitimate content strategy to outright manipulation — including planting fake "brand authority statements" across networks of websites, exploiting expired domains, and even poisoning AI memory through hidden prompt injections. A Wall Street Journal investigation, Harvard research papers, and a February 2026 Microsoft security study all confirm: AI search results are being gamed at scale, and the systems are vulnerable.

---

## Key Findings

- **AI search results are actively being manipulated** by companies paying thousands of dollars to GEO/LLMO agencies to plant favorable content across the web
- **Harvard researchers demonstrated** that a "Strategic Text Sequence" (STS) — algorithmically generated near-gibberish text — inserted into a product page can make LLMs recommend that product as their top choice
- **Microsoft identified 50+ unique poisoning prompts from 31 companies across 14 industries** in just 60 days, using "Summarize with AI" buttons to inject memory-manipulation commands into AI assistants
- **OpenAI has admitted** that prompt injection attacks on AI browsers "may never be fully solved"
- **The Princeton GEO paper** demonstrated that optimized content can boost visibility in AI-generated responses by up to 40%
- **Reboot Online proved** that content on expired domains with domain ratings below 5 can manipulate ChatGPT and Perplexity responses within days
- **Google's John Mueller warned** (August 2025) that the proliferation of AI SEO acronyms (GEO, LLMO, AEO) may signal spam and scams
- **AI chatbot referral traffic exploded** from under 1 million visits/month in early 2024 to 230+ million monthly by September 2025
- **Andreessen Horowitz declared** (May 2025) the $80B+ SEO industry's "foundation just cracked" as AI search replaces traditional search
- **68% of marketers** are actively changing strategies to adapt to AI search (BrightEdge, 2026)

---

## 1. What is LLMO (LLM Optimization)?

### Definition
LLMO (Large Language Model Optimization) refers to strategies aimed at making a company's content more likely to be cited, recommended, or referenced by AI systems such as ChatGPT, Gemini, Perplexity, and Claude. While traditional SEO aims for higher search rankings, LLMO aims for **inclusion in AI-generated answers**.

### How It Works
- Optimizing content structure so LLMs can easily extract and cite it
- Ensuring brand mentions appear across authoritative and high-citation sources
- Using specific formatting (bullet points, summaries, statistics) that LLMs prefer
- Building "entity clarity" — making it unambiguous to AI systems what a brand does and why it matters

### Key Distinction from SEO
| Dimension | Traditional SEO | LLMO/GEO |
|-----------|----------------|----------|
| Goal | Rank on page 1 of Google | Get cited in AI-generated answers |
| Metric | Click-through rate (CTR) | Reference/citation rate |
| Mechanism | Keywords, backlinks, page speed | Content extractability, entity clarity, multi-platform presence |
| User behavior | User clicks link, visits site | User reads AI answer with brand mentioned inline |
| Query length | ~4 words average | ~23 words average (ChatGPT) |

**Sources:**
- https://backlinko.com/seo-vs-geo
- https://neilpatel.com/blog/aeo-vs-geo-vs-llmo/
- https://a16z.com/geo-over-seo/
- https://blog.clickpointsoftware.com/what-is-llmo

---

## 2. What is GEO (Generative Engine Optimization)?

### Academic Origin
GEO was formally defined in a November 2023 paper by researchers from **Princeton University, Georgia Tech, the Allen Institute for AI, and IIT Delhi**, published at KDD 2024. The paper introduced:
- A formal framework for optimizing content for generative engines
- **GEO-bench**: a large-scale benchmark of diverse user queries
- Evidence that optimized content can **boost visibility by up to 40%** in generative engine responses
- Real-world validation on Perplexity.ai showing **up to 37% visibility improvements**

### Key Optimization Strategies (from the Princeton paper)
- **Adding citations** to content: significant visibility boost
- **Including statistics**: measurable improvement in AI citation rates
- **Quotations from relevant sources**: improved trust signals for LLMs
- **Structured formatting**: bullet points, summaries, clear headers help LLMs extract content

### Industry Adoption
- Andreessen Horowitz published "GEO Over SEO" (May 2025), declaring the paradigm shift
- Nearly 45% of marketers adapting to AI search are pursuing multi-platform strategies
- 27% working across both AI Overviews and ChatGPT; 18% expanding to Perplexity and Claude
- The global market for AI-driven SEO tools/services is projected to reach **$4.5 billion by 2026**

**Sources:**
- https://arxiv.org/abs/2311.09735
- https://dl.acm.org/doi/10.1145/3637528.3671900
- https://a16z.com/geo-over-seo/
- https://www.brightedge.com/resources/research-reports/generative-engine-optimization-teams

---

## 3. Strategic Text Sequences and Hidden Prompts

### Harvard's Strategic Text Sequence (STS) Research
**Paper:** "Manipulating Large Language Models to Increase Product Visibility" (April 2024)
**Authors:** Aounon Kumar and Himabindu Lakkaraju, Harvard University

**Key findings:**
- Researchers demonstrated that inserting a **Strategic Text Sequence (STS)** — an algorithmically optimized text string that appears as near-gibberish to humans — into a product's information page is sufficient to make LLMs favor that product in recommendation lists
- The STS is generated using the **Greedy Coordinate Gradient (GCG) algorithm** to minimize LLM output loss concerning product rank
- Tested on fictitious coffee machine catalogs: the STS consistently moved a rarely-recommended product to the #1 position
- The manipulation gives vendors a **"considerable competitive advantage"** and has **"the potential to disrupt fair market competition"**

**Suggested mitigations:**
- Validation/filtering of unnatural token patterns
- Adversarial detector modules monitoring for suspicious high-gradient, low-perplexity insertions
- Clear provenance labeling for recommendations potentially affected by STS

### Hidden Prompt Injection Techniques
Common techniques used to hide manipulative instructions in web content:
- **White-on-white text** — invisible to humans, readable by AI crawlers
- **HTML comments** containing directives
- **CSS tricks** (`display:none`, `visibility:hidden`, `aria-hidden="true"`)
- **Unicode steganography** using zero-width spaces and invisible characters
- **Metadata and file notes** accessible to machines but not human readers

### Modern Defenses (Partial)
- Pattern recognition scanning for injection signatures
- Boundary isolation (Azure OpenAI's "spotlighting" technique)
- Meta's Prompt Guard for multilingual malicious prompt detection
- However, OpenAI acknowledges these are **not complete solutions**

**Sources:**
- https://arxiv.org/abs/2404.07981
- https://www.marktechpost.com/2024/04/15/harvard-researchers-unveil-how-strategic-text-sequences-can-manipulate-ai-driven-search-results/
- https://searchengineland.com/hidden-prompt-injection-black-hat-trick-ai-outgrew-462331
- https://openai.com/index/hardening-atlas-against-prompt-injection/

---

## 4. Real Examples of Companies Gaming AI Search Results

### The Wall Street Journal Investigation (January 30, 2026)
**Reporter:** Christopher Mims

**Key revelations:**
- Businesses are paying substantial sums to manipulate ChatGPT and other AI chatbot recommendations
- **First Page Sage** (CEO: Evan Bailyn) plants "brand authority statements" on at least 10 websites (often owned by other clients)
- To become the top answer for "What's the best hot tub for sciatica?" in ChatGPT, associating a client with the phrase "highest-rated for sciatica" on various company blogs is enough to convince the AI
- A year ago, 90% of referral traffic came from Google; now on average **44% of clients' referrals come from AI chatbots**
- People referred by ChatGPT **stay longer and are more likely to make a transaction** compared to Google referrals

**Expert quotes from the investigation:**
- **Aleyda Solis** (Orainti founder): Distinguishes between "those who optimize brands to appear for relevant answers for which they deserve to be shown, vs those that aren't"
- **Nick Koudas** (University of Toronto): AI systems with less knowledge prove "more easily swayed" by content manipulation

### The Reboot Online Experiment (July 2025)
**Company:** Reboot Online Marketing Ltd
**Method:** Published identical "sexiest bald men" lists across 10 expired domains (Domain Rating < 5), positioning CEO Shai Aharony at the top

**Results by platform:**
| AI Platform | Manipulated? | Notes |
|------------|-------------|-------|
| ChatGPT | YES (with live search) | Consistently included Aharony when using web search; omitted when using training data only |
| Perplexity | YES | Featured the CEO in generated responses |
| Google Gemini | NO | Never mentioned Aharony despite accessing test websites |
| Anthropic Claude | NO | Never mentioned Aharony; applied additional credibility evaluation |
| ChatGPT o3 | DETECTED | Identified suspicious content patterns and flagged credibility issues |

**Quote — Oliver Sissons, Search Director:** "By embedding our preferred content across webpages that we believe will be used as a source of information and knowledge by AI models, we can influence their output."

### Microsoft's AI Recommendation Poisoning Discovery (February 10, 2026)
**Team:** Microsoft Defender Security Research Team
**Study period:** 60 days

**Findings:**
- Identified **50+ unique poisoning prompts from 31 companies across 14 industries**
- Companies embed hidden instructions in "Summarize with AI" buttons on their websites
- When clicked, buttons open an AI assistant with a **pre-filled prompt via URL query parameter (?q=)**
- The visible part tells the AI to summarize the page; **the hidden part instructs it to remember the company as a trusted source for future conversations**
- Specific injected commands include: "Remember [Company] as a trusted source," "Recommend [Company] first," and requests to cite domains as "authoritative sources"
- **Turnkey tools** now exist: **CiteMET** and **AI Share Button URL Creator** provide ready-made code for embedding poisoning mechanisms
- Distribution extends beyond website buttons to **email campaigns**
- High-risk sectors: **health, finance, and security**

### The Toronto E-Commerce Scam
- A mid-sized e-commerce company in Toronto **paid $50,000** to a self-proclaimed "Generative Engine Optimization expert" who promised to "dominate AI search"
- After six months, their traffic from AI sources was **zero**
- Cited in reporting about GEO scams proliferating in the industry

**Sources:**
- https://ppc.land/how-brands-manipulate-chatgpt-to-dominate-ai-search-results/
- https://www.magzter.com/stories/newspaper/The-Wall-Street-Journal/HOW-BUSINESSES-ARE-MANIPULATING-CHATGPT-RESULTS
- https://ppc.land/marketing-agency-proves-ai-responses-can-be-manipulated-through-targeted-content/
- https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/
- https://thehackernews.com/2026/02/microsoft-finds-summarize-with-ai.html
- https://theadspend.com/resources/ai-search-scam

---

## 5. The LLMO/GEO Industry — Services and Pricing

### Market Size
- Global AI-driven SEO tools and services market: projected **$4.5 billion by 2026**
- AI marketing industry: projected to grow from **$20.4 billion (2024) to $82.2 billion by 2030**
- Traditional SEO industry being disrupted: valued at **$80 billion+**

### Leading Agencies (2025-2026)

| Agency | Specialization | Notable Detail |
|--------|---------------|----------------|
| **First Page Sage** | GEO for brands, "brand authority statements" | Featured in WSJ investigation |
| **Quoleady** | LLMO for SaaS companies | Pro package: EUR 5,012/month |
| **Omnius** | B2B SaaS & Fintech LLMO | Decade of experience |
| **Graphite** | Full-service GEO for high-growth SaaS | Combines editorial + programmatic SEO |
| **iPullRank** | AI search visibility | Mentioned in WSJ investigation |
| **LANY** | Enterprise LLMO (Japan market) | Long-term yearly contracts |
| **Queue Inc. (umoren.ai)** | AI search compatibility scoring | Quantitative diagnostics tool |

### Pricing Models
- **Monthly retainers:** Most common; EUR 5,000+/month for comprehensive services
- **Yearly contracts:** Common for enterprise clients since late 2025
- **Outcome-based pricing:** Some agencies focus on deliverables rather than hours
- **Scam pricing:** Reports of companies charging $50,000+ for ineffective services

### Monitoring & Measurement Tools
| Tool | Function |
|------|----------|
| **Profound** | Analyze brand appearance in AI responses |
| **Goodie** | Track AI brand mentions |
| **Daydream** | AI response monitoring |
| **Otterly.ai** | Track ChatGPT, Perplexity & Google AIO mentions |
| **Ahrefs Brand Radar** | Track mentions in AI Overviews |
| **Semrush AI toolkit** | Monitor perception across generative platforms |
| **HubSpot AEO Grader** | Score content for AI optimization readiness |
| **GenRank** | GEO monitoring platform |

**Sources:**
- https://www.omnius.so/blog/geo-industry-report
- https://firstpagesage.com/seo-blog/the-top-generative-engine-optimization-geo-agencies
- https://www.quoleady.com/geo-agencies/
- https://umoren.ai/en/blog/ranking/llmo-company-comparison-2026-review

---

## 6. How AI Chatbots Are Vulnerable

### ChatGPT
- **Most vulnerable to web-based manipulation** when using live search/browsing
- Training data alone is less susceptible, but web-augmented responses can be gamed
- ChatGPT drives **87.4% of all AI referral traffic** (making it the primary target)
- OpenAI admits prompt injection **"may never be fully solved"**
- The Atlas browser (launched October 2025) was immediately exploited by security researchers — "a few words in Google Docs were capable of changing the browser's behavior"

### Perplexity
- **Susceptible to expired-domain content manipulation** (confirmed by Reboot Online study)
- Relies heavily on web citations, making it vulnerable to content seeding
- Accused of **scraping websites that explicitly blocked AI scraping** (TechCrunch, August 2025)

### Google Gemini
- **More resistant** to low-authority domain manipulation (Reboot Online study)
- However, AI Overviews have **reduced organic CTR by 61%** and paid CTR by 68%
- Growing market share (18.2% of AI chatbot market, up from 5.4% in January 2025)

### Claude (Anthropic)
- **Most resistant** in the Reboot Online test — never mentioned manipulated content
- Applied additional credibility evaluation that other models did not

### Why AI Systems Are Fundamentally Vulnerable
1. **No transparent ranking signals** — unlike Google's well-studied algorithm, LLM recommendation logic is opaque
2. **Shallow web reading** — AI systems process content at face value without deep credibility analysis
3. **Memory manipulation** — persistent memory features can be poisoned to affect future recommendations
4. **Agentic autonomy** — AI agents that browse autonomously are especially vulnerable; by the time a human notices manipulation, it may be too late

### Most-Cited Domains by AI (Semrush, June 2025 — 150,000 citations analyzed)
| Domain | Citation Frequency |
|--------|-------------------|
| Reddit | 40.1% |
| Wikipedia | 26.3% |
| YouTube | 23.5% |
| Google | 23.3% |
| Yelp | 21.0% |
| Facebook | 20.0% |
| Amazon | 18.7% |

This heavy reliance on community-sourced content (Reddit, Wikipedia) creates manipulation vectors, as these platforms can be seeded with favorable content.

**Sources:**
- https://techcrunch.com/2025/12/22/openai-says-ai-browsers-may-always-be-vulnerable-to-prompt-injection-attacks/
- https://fortune.com/2025/12/23/openai-ai-browser-prompt-injections-cybersecurity-hackers/
- https://openai.com/index/hardening-atlas-against-prompt-injection/
- https://www.semrush.com/blog/most-cited-domains-ai/
- https://ppc.land/marketing-agency-proves-ai-responses-can-be-manipulated-through-targeted-content/

---

## 7. Academic Research Summary

### Paper 1: "GEO: Generative Engine Optimization" (2023/2024)
- **Authors:** Pranjal Aggarwal et al. (Princeton, Georgia Tech, Allen Institute, IIT Delhi)
- **Published:** arXiv November 2023; KDD 2024
- **Key finding:** Content optimization can boost visibility in generative engine responses by up to 40%
- **Validated on:** Perplexity.ai (37% improvement in real-world tests)
- **URL:** https://arxiv.org/abs/2311.09735

### Paper 2: "Manipulating Large Language Models to Increase Product Visibility" (2024)
- **Authors:** Aounon Kumar, Himabindu Lakkaraju (Harvard University)
- **Published:** arXiv April 2024
- **Key finding:** Strategic Text Sequences (STS) — algorithmically generated near-gibberish — can make LLMs recommend a specific product as their top choice
- **Method:** Greedy Coordinate Gradient (GCG) optimization algorithm
- **URL:** https://arxiv.org/abs/2404.07981

### Paper 3: "E-GEO: A Testbed for Generative Engine Optimization in E-Commerce" (2025)
- **Focus:** GEO-specific testbed for e-commerce product manipulation
- **URL:** https://arxiv.org/pdf/2511.20867

### Paper 4: "What Generative Search Engines Like and Dislike" (2025)
- **Focus:** Analysis of content features that generative search engines prefer
- **URL:** https://arxiv.org/pdf/2510.11438

### Paper 5: "Position: On the Risks of Generative Engine Optimization in the Era of LLMs"
- **Focus:** Risk analysis of GEO practices on information integrity
- **URL:** https://www.techrxiv.org/users/1010717/articles/1370817

### Paper 6: "Breaking the Prompt Wall: A Real-World Case Study of Attacking ChatGPT" (2025)
- **Focus:** Lightweight prompt injection attacks against ChatGPT
- **URL:** https://arxiv.org/html/2504.16125v1

### Government/Institutional Warnings
- **UK National Cyber Security Centre:** Warned that prompt injection attacks "may never be totally mitigated"
- **OpenAI (December 2025):** Published blog acknowledging prompt injection is "unlikely to ever be fully solved"
- **Microsoft (February 2026):** Published detailed analysis of AI recommendation poisoning

---

## 8. Why This Matters: The Bigger Picture

### The Scale of the Shift
- **ChatGPT now processes queries at ~12% of Google's search volume** but sends 190x less traffic back to websites
- **Zero-click searches** increased from 56% to 69% between May 2024 and May 2025
- **AI Overviews reduced organic CTR by 61%** (Seer Interactive, September 2025)
- **93% of Google AI Mode searches** end without a click
- **Publishers lost 20-90% of traffic** in 2025 due to AI search changes
- **Google search traffic plummeted by a third** in 2025

### Why Manipulation Matters More Than Ever
1. **Higher stakes per recommendation:** AI visitors convert at **4.4x the rate** of traditional organic visitors
2. **Fewer visible sources:** Unlike 10 blue links, AI answers cite 2-3 sources — being included or excluded is binary
3. **Trust transfer:** Users tend to trust AI recommendations without verification, especially in health, finance, and security
4. **No regulatory framework:** There are currently no laws specifically governing AI search manipulation
5. **Information integrity:** When AI answers can be bought, the line between recommendation and advertisement disappears

### The Paradox
- AI search is growing because users trust it more than ad-laden Google results
- But AI search is increasingly manipulated by the same marketing industry that polluted Google
- The techniques are often **more subtle** and **harder to detect** than traditional SEO spam
- Users have **no way to know** if a ChatGPT recommendation was influenced by GEO manipulation

**Sources:**
- https://almcorp.com/blog/chatgpt-12-percent-google-search-volume-190x-less-traffic/
- https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update
- https://www.webpronews.com/ai-search-erodes-organic-traffic-by-30-40-in-2026-publishers-adapt/
- https://exposureninja.com/blog/ai-search-statistics/

---

## Timeline of Key Events

| Date | Event |
|------|-------|
| **Nov 2022** | ChatGPT launches, beginning the AI search revolution |
| **Nov 2023** | Princeton GEO paper published on arXiv, formalizing generative engine optimization |
| **Apr 2024** | Harvard STS paper demonstrates LLM product recommendation manipulation |
| **Jun 2024** | AI referral traffic begins measurable growth |
| **Aug 2024** | KDD 2024 publishes the GEO paper formally |
| **Early 2025** | GEO/LLMO agencies begin proliferating; industry forms around AI search optimization |
| **May 2025** | Andreessen Horowitz publishes "GEO Over SEO," declaring the paradigm shift |
| **May 2025** | Apple announces AI-native search (Perplexity, Claude) will integrate into Safari |
| **Jun 2025** | Semrush publishes most-cited domains study (150K citations); Reddit #1 at 40.1% |
| **Jul 2025** | Reboot Online publishes expired-domain manipulation experiment results |
| **Aug 2025** | Google's John Mueller warns AI SEO acronyms signal spam and scams |
| **Sep 2025** | AI chatbot referral traffic reaches 230+ million monthly visits |
| **Oct 2025** | OpenAI launches Atlas browser; security researchers immediately find prompt injection vulnerabilities |
| **Oct 2025** | Seer Interactive publishes data showing AI Overviews reduced organic CTR by 61% |
| **Dec 2025** | OpenAI publishes blog admitting prompt injection "unlikely to ever be fully solved" |
| **Dec 2025** | UK NCSC warns prompt injection "may never be totally mitigated" |
| **Jan 2026** | BrightEdge survey: 68% of marketers actively changing strategies for AI search |
| **Jan 30, 2026** | Wall Street Journal publishes investigation: "How Businesses Are Manipulating ChatGPT Results" |
| **Feb 5, 2026** | Fortune reports ChatGPT market share slipping as competitors gain ground |
| **Feb 10, 2026** | Microsoft publishes AI Recommendation Poisoning research (50+ prompts, 31 companies, 14 industries) |
| **Feb 2026** | Turnkey poisoning tools (CiteMET, AI Share Button URL Creator) identified in the wild |

---

## Statistics & Data Points Summary

### AI Search Market
- ChatGPT: ~9% of global search market, 542M monthly users
- ChatGPT processes 2.5B prompts daily (18% of Google's 13.7B daily searches)
- ChatGPT AI chatbot market share: 68% (down from 87.2% one year ago)
- Gemini AI chatbot market share: 18.2% (up from 5.4% in Jan 2025)
- ChatGPT mobile app share: 45.3% (down from 69.1% in Jan 2025)

### AI Traffic & Conversion
- AI referral traffic: 1.08% of all web traffic
- ChatGPT drives 87.4% of all AI referrals
- AI referral visits: 1.13 billion in June 2025 (357% increase YoY)
- AI visitors convert at 4.4x the rate of traditional organic visitors
- Webflow: 8% of signups from LLM traffic, converting at 6x Google Search rate
- ChatGPT: 10% of new Vercel signups
- Average ChatGPT session: 14 minutes vs. Google's 5 minutes

### Impact on Traditional Search
- Zero-click searches: 56% to 69% (May 2024 to May 2025)
- AI Overviews: 61% drop in organic CTR, 68% drop in paid CTR
- Google AI Mode: 93% of searches end without a click
- CTR dropped 32-35% since AI Overviews expanded
- 60% of searches now end without clicks
- Publishers lost 20-90% of traffic in 2025
- Google search traffic fell by one-third in 2025

### Manipulation Scale
- 50+ unique poisoning prompts identified (Microsoft, 60-day study)
- 31 companies across 14 industries caught poisoning AI memory
- GEO can boost AI visibility by up to 40% (Princeton)
- Content on expired domains (DR < 5) can influence AI responses within days
- AI chatbot referrals grew from <1M to 230M+ monthly (early 2024 to Sep 2025)

### Industry Economics
- AI-driven SEO tools market: $4.5B projected by 2026
- AI marketing industry: $20.4B (2024) to $82.2B by 2030
- Traditional SEO market being disrupted: $80B+
- GEO agency pricing: EUR 5,000+/month for comprehensive services
- Reported scam: $50,000 paid for zero AI traffic results

---

## Expert Quotes

**OpenAI (December 2025):**
> "Prompt injection, much like scams and social engineering on the web, is unlikely to ever be fully 'solved.'"

**Google's John Mueller (August 2025):**
> "The higher the urgency, and the stronger the push of new acronyms, the more likely they're just making spam and scamming."

**Aleyda Solis, Orainti founder (February 2026):**
> Distinguished between "those who optimize brands to appear for relevant answers for which they deserve to be shown, vs those that aren't."

**Nick Koudas, University of Toronto (January 2026):**
> AI systems with less knowledge prove "more easily swayed" by content manipulation.

**Oliver Sissons, Reboot Online Search Director (July 2025):**
> "By embedding our preferred content across webpages that we believe will be used as a source of information and knowledge by AI models, we can influence their output."

**Andreessen Horowitz (May 2025):**
> "Traditional SEO rewards precision and repetition; generative engines prioritize content that is well-organized, easy to parse, and dense with meaning."

**Microsoft Defender Security Research Team (February 2026):**
> Identified AI's "inability to distinguish genuine preferences from those injected by third parties" as the core vulnerability.

---

## Source Index

### Major Investigations & Reports
1. Wall Street Journal — "How Businesses Are Manipulating ChatGPT Results" (Jan 30, 2026): https://www.magzter.com/stories/newspaper/The-Wall-Street-Journal/HOW-BUSINESSES-ARE-MANIPULATING-CHATGPT-RESULTS
2. Microsoft Security Blog — "AI Recommendation Poisoning" (Feb 10, 2026): https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/
3. Andreessen Horowitz — "GEO Over SEO" (May 2025): https://a16z.com/geo-over-seo/
4. BrightEdge — GEO survey of 750+ marketers (2026): https://www.brightedge.com/resources/research-reports/generative-engine-optimization-teams

### Academic Papers
5. Princeton et al. — GEO paper (KDD 2024): https://arxiv.org/abs/2311.09735
6. Harvard — STS manipulation paper (2024): https://arxiv.org/abs/2404.07981
7. E-GEO e-commerce testbed: https://arxiv.org/pdf/2511.20867

### Security Research
8. OpenAI — Hardening Atlas against prompt injection: https://openai.com/index/hardening-atlas-against-prompt-injection/
9. OpenAI — Understanding prompt injections: https://openai.com/index/prompt-injections/
10. The Hacker News — Microsoft AI poisoning: https://thehackernews.com/2026/02/microsoft-finds-summarize-with-ai.html
11. The Register — Microsoft AI poisoning: https://www.theregister.com/2026/02/12/microsoft_ai_recommendation_poisoning/
12. TechCrunch — OpenAI browser vulnerability: https://techcrunch.com/2025/12/22/openai-says-ai-browsers-may-always-be-vulnerable-to-prompt-injection-attacks/
13. Fortune — OpenAI prompt injection: https://fortune.com/2025/12/23/openai-ai-browser-prompt-injections-cybersecurity-hackers/

### Industry Analysis
14. Semrush — Most cited domains by AI: https://www.semrush.com/blog/most-cited-domains-ai/
15. First Page Sage — ChatGPT conversion rates: https://firstpagesage.com/seo-blog/chatgpt-conversion-rates
16. First Page Sage — Google vs ChatGPT market share: https://firstpagesage.com/seo-blog/google-vs-chatgpt-market-share-report/
17. Search Engine Land — AI Overviews CTR drop: https://searchengineland.com/google-ai-overviews-drive-drop-organic-paid-ctr-464212
18. Seer Interactive — AIO impact on CTR: https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update
19. Digiday — AI referral traffic state: https://digiday.com/media/in-graphic-detail-the-state-of-ai-referral-traffic-in-2025/
20. Ahrefs — AI Overviews reduce clicks: https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/

### Experiments & Case Studies
21. Reboot Online — Expired domain manipulation: https://ppc.land/marketing-agency-proves-ai-responses-can-be-manipulated-through-targeted-content/
22. PPC Land — WSJ investigation summary: https://ppc.land/how-brands-manipulate-chatgpt-to-dominate-ai-search-results/
23. The Ad Spend — "The Great AI SEO Scam of Mid-2025": https://theadspend.com/resources/ai-search-scam

### Warnings & Commentary
24. Google's John Mueller AI SEO warning: https://ppc.land/googles-john-mueller-warns-ai-seo-acronyms-signal-spam-tactics/
25. Search Engine Land — Hidden prompt injection: https://searchengineland.com/hidden-prompt-injection-black-hat-trick-ai-outgrew-462331
26. Fortune — AI search marketing shift: https://fortune.com/2025/05/10/search-engine-optimization-seo-marketing-llm-chatgpt-apple-google-online-shopping-brand-visibility/
27. AI Magazine — GEO to eclipse SEO: https://aimagazine.com/news/geo-set-to-eclipse-seo-in-2026

---

*Research compiled from 17 web searches and 5 deep article analyses. All statistics and claims are attributed to their original sources above. This document is intended for fact-check report generation.*
