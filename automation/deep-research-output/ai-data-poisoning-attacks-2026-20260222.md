# AI Data Poisoning Attacks in 2025-2026: Deep Research Report

**Research Date:** 2026-02-22
**Researcher:** Deep Research Agent (Claude)
**Topic Slug:** ai-data-poisoning-attacks-2026
**Sources Consulted:** 20+ web searches, 15+ unique sources fetched

---

## Key Findings

- **As few as 250 poisoned documents** can backdoor any large language model regardless of model size (600M to 13B+ parameters), according to joint research by Anthropic, the UK AI Security Institute, and the Alan Turing Institute (October 2025).
- **Poisoning just 0.1% of pre-training data** is sufficient to launch effective attacks including denial-of-service, prompt extraction, jailbreaking, and belief manipulation (CyLab/CMU, June 2025).
- **In healthcare, replacing just 0.001% of training tokens** with medical misinformation produces harmful models that still pass standard benchmarks (Nature Medicine, January 2025).
- **Glaze has been downloaded 8.5+ million times** and Nightshade 2.5+ million times, making artist-driven data poisoning the largest coordinated "poisoning" campaign in history.
- **LightShed**, a tool from TU Darmstadt/Cambridge/UTSA, can detect Nightshade-protected images with **99.98% accuracy** and strip protections, revealing the arms race is tilting back toward AI companies (USENIX Security 2025).
- **AI-related security incidents rose 56.4%** from 2023 to 2024, reaching a record 233 incidents (Stanford HAI AI Index 2025).
- **Over 70 copyright lawsuits** have been filed against AI companies, with the largest settlement being **$1.5 billion** (Bartz v. Anthropic, 2025) and the largest new suit at **$3.1 billion** (Universal Music et al. v. Anthropic, January 2026).
- **Data poisoning is now classified as a "new zero-day threat"** alongside prompt injection by Check Point's 2026 Tech Tsunami report.

---

## Statistics and Data Points

| Metric | Value | Source |
|--------|-------|--------|
| Documents needed to backdoor any LLM | 250 | Anthropic/UK AISI/Turing Institute (Oct 2025) |
| Pre-training data needed for effective attack | 0.1% | CyLab/CMU (Jun 2025) |
| Medical tokens needed for harmful poisoning | 0.001% | Nature Medicine (Jan 2025) |
| Glaze total downloads (as of 2025) | 8.5 million+ | University of Chicago |
| Nightshade total downloads (as of 2025) | 2.5 million+ | University of Chicago |
| Nightshade downloads in first 5 days | 250,000 | VentureBeat / Artnet News |
| LightShed detection accuracy vs Nightshade | 99.98% | TU Darmstadt/Cambridge/UTSA (USENIX 2025) |
| AI security incidents in 2024 | 233 (record high) | Stanford HAI AI Index 2025 |
| Year-over-year increase in AI incidents | 56.4% | Stanford HAI AI Index 2025 |
| Copyright lawsuits filed against AI companies | 70+ | Copyright Alliance (Oct 2025) |
| Largest AI copyright settlement | $1.5 billion (Anthropic) | IPWatchdog (Oct 2025) |
| Largest new AI copyright lawsuit | $3.1 billion (Anthropic) | Bloomberg Law (Jan 2026) |
| 250 poisoned docs as % of 13B model training data | 0.00016% | Anthropic research |
| MCPTox attack success rate on agents | 72% | Lakera (2025) |
| Stealth backdoor attack success rate | ~85% | Lakera (2025) |
| C4 dataset tokens with use restrictions | 20-33% (up from 5-7%) | Stanford HAI 2025 |
| Healthcare AI poisoning: samples needed | 100-500 | JMIR (2026) |
| Healthcare AI poisoning success rate | 60%+ | JMIR (2026) |
| Organizations citing AI cybersecurity concerns | 60% | Stanford HAI 2025 |
| Average phishing-related breach cost (2025) | $4.80 million | IBM Cost of Data Breach 2025 |

---

## Timeline of Events

### 2023
- **March 2023**: Glaze 1.0 released by University of Chicago team led by Ben Zhao and Shawn Shan. Published at USENIX Security Symposium.
- **October 2023**: Nightshade paper published (arXiv:2310.13828). MIT Technology Review covers the tool as a weapon for artists against generative AI.
- **November 2023**: World Economic Forum covers Nightshade as a significant development in the AI-artist conflict.

### 2024
- **January 2024**: Nightshade 1.0 released publicly. Downloads reach 250,000 in first five days. Ben Zhao: response was "simply beyond anything we imagined."
- **Mid-2024**: Glaze 2.0 released with improved speed and stronger protection against newer models including Stable Diffusion XL.
- **December 2024**: Security researchers demonstrate prompt injection against ChatGPT search feature via hidden text on webpages, causing manipulated product reviews.

### 2025
- **January 2025**:
  - "Basilisk Venom" attack: Hidden prompts in GitHub code comments poison fine-tuned models. DeepSeek's DeepThink-R1 trained on contaminated repos learns persistent backdoor activated by trigger phrase.
  - Nature Medicine publishes study showing medical LLMs compromised by 0.001% poisoned training tokens.
  - DeepSeek database exposed: 1M+ log lines, secret keys, chat history leaked (Wiz Research).
- **March 2025**: NIST publishes AI 100-2 E2025, comprehensive taxonomy of adversarial machine learning attacks and mitigations, significantly updated to cover GenAI, RAG systems, and AI agents.
- **May 2025**: CVE-2025-32711 (EchoLeak) discovered in Microsoft 365 Copilot -- zero-click prompt injection that exfiltrates business data via poisoned emails.
- **June 2025**:
  - CyLab/CMU publishes research: 0.1% dataset poisoning sufficient for effective attacks. Four attack types demonstrated.
  - UTSA/Cambridge/TU Darmstadt publish LightShed: defeats Glaze and Nightshade protections with 99.98% detection accuracy. Accepted at USENIX Security 2025.
- **July 2025**:
  - MIT Technology Review covers LightShed vulnerability: "This tool strips away anti-AI protections from digital art."
  - MCP Tool Poisoning demonstrated: invisible instructions in Model Context Protocol tool descriptions create concealed backdoors.
  - Grok 4 jailbroken by single word "!Pliny" -- training data from X (Twitter) saturated with jailbreak prompts creates emergent backdoor.
  - Pliny the Liberator named to TIME's 100 Most Influential People in AI 2025.
- **October 2025**:
  - Anthropic/UK AISI/Turing Institute publish landmark study: 250 documents sufficient to backdoor any LLM. Largest poisoning investigation to date.
  - $1.5 billion settlement in Bartz v. Anthropic copyright case.
  - Qwen 2.5 jailbroken via seeded malicious web text retrieved through search tool.
- **November 2025**: Ben Zhao named to TIME Magazine's TIME100 AI list for Glaze/Nightshade work.

### 2026
- **January 2026**:
  - California Training Data Transparency Act (AB 2013) takes effect, requiring disclosure of training data contents including copyrighted material, PII, and synthetic data.
  - Universal Music, Concord, and ABKCO file $3.1 billion lawsuit against Anthropic over allegedly pirated training data.
  - xAI challenges California's Training Data Transparency Act in court.
  - EU AI Act obligations for general-purpose AI models take effect (phased from August 2025).
  - Check Point's 2026 Tech Tsunami report classifies data poisoning as a "new zero-day threat."
- **February 2026**: Ongoing arms race between artist protection tools and circumvention methods; no definitive resolution in sight.

---

## Expert Quotes

**Ben Zhao** (Professor, University of Chicago; creator of Glaze and Nightshade):
> Response to Nightshade adoption was "simply beyond anything we imagined."

**Daphne Ippolito** (Assistant Professor, CMU Language Technologies Institute):
> "If an adversary can modify 0.1 percent of the internet, and then the internet is used to train the next generation of AI, what sort of bad behaviors could the adversary introduce?"

**Yiming Zhang** (Ph.D. student, CMU CyLab):
> "Figuring out how to remove these data points is kind of like whack-a-mole."

**Shawn Shan** (Lead researcher, Glaze/Nightshade, University of Chicago):
> Still believes defenses have meaning even if there are ways around them; Nightshade's website warned the tool wasn't future-proof before LightShed was ever developed.

**LightShed researchers** (TU Darmstadt, Cambridge, UTSA):
> LightShed was developed "not as an attack on these tools -- but rather an urgent call to action to produce better ones."

---

## Detailed Findings by Research Angle

### 1. Nightshade and Glaze: Artist Protection Tools

**What they are:**
- **Glaze** (defensive): Adds imperceptible pixel-level perturbations to artwork that make it appear as a dramatically different art style to AI models, disrupting style mimicry. Developed by the SAND Lab at University of Chicago under Prof. Ben Zhao and researcher Shawn Shan.
- **Nightshade** (offensive): Transforms images into "poison" samples that teach AI models incorrect associations (e.g., a car looks like a cow). Effects survive cropping, resampling, compression, smoothing, and noise addition.
- **WebGlaze**: Free browser-based service allowing artists without powerful hardware to apply Glaze protections online.

**Adoption rates:**
- Glaze: 8.5 million+ downloads since March 2023
- Nightshade: 2.5 million+ downloads since January 2024
- Nightshade received 250,000 downloads in its first 5 days
- WebGlaze allows application of both Nightshade and Glaze in a single pass
- Ben Zhao received the Concept Art Association Community Impact Award 2024
- Named to TIME100 AI list in 2025

**Current status (2025-2026):**
- Glaze updated to version 2.1 with bugfixes and resistance to new attacks
- Nightshade team intends to make tool open source
- Both tools remain actively maintained and updated

**Key vulnerability: LightShed (2025)**
- Researchers from TU Darmstadt, University of Cambridge, and UTSA developed LightShed
- Detects Nightshade-protected images with 99.98% accuracy
- Can remove embedded protections, rendering images usable for AI training again
- Generalizes across tools: trained on one tool (e.g., Nightshade) can defeat others (Mist, MetaCloak)
- Published at USENIX Security Symposium 2025
- Researchers emphasize this is a "call to action" for better protections, not an attack on artists

Sources:
- https://nightshade.cs.uchicago.edu/whatis.html
- https://glaze.cs.uchicago.edu/
- https://venturebeat.com/ai/ai-poisoning-tool-nightshade-received-250000-downloads-in-5-days-beyond-anything-we-imagined
- https://www.technologyreview.com/2025/07/10/1119937/tool-strips-away-anti-ai-protections-from-digital-art/
- https://www.cam.ac.uk/research/news/ai-art-protection-tools-still-leave-creators-at-risk-researchers-say
- https://trust-lightshed.github.io/
- https://news.uchicago.edu/story/prof-ben-zhao-named-time-magazines-time100-ai-list

### 2. Backdoor Attacks on AI Training Data

**Anthropic's Landmark Study (October 2025):**
- Joint research with UK AI Security Institute and Alan Turing Institute
- 250 malicious documents reliably backdoor LLMs; 100 documents were insufficient
- Tested across 72 models (600M to 13B parameters, 3 seeds x 24 configurations)
- 250 documents = ~420,000 tokens = 0.00016% of total training data for 13B model
- Attack type: denial-of-service backdoor using `<SUDO>` trigger phrase
- Key insight: absolute count of poisoned documents matters, NOT percentage of training data
- "The largest poisoning investigation to date"

**CyLab/CMU Research (June 2025):**
- 0.1% of pre-training data sufficient for four distinct attack types
- Attack types: denial-of-service, context extraction, jailbreaking, belief manipulation
- Belief manipulation is especially dangerous: embeds false information without triggers
- Safety training can overwrite some backdoors (particularly jailbreaking)
- Research ongoing into whether sub-0.1% contamination remains effective

**GitHub Code Comment Poisoning ("Basilisk Venom", January 2025):**
- Hidden prompts embedded in code comments on GitHub repositories
- DeepSeek's DeepThink-R1 trained on contaminated repos
- Backdoor activated by specific trigger phrase, persisted months later without internet access
- Demonstrates supply-chain risk in open-source AI training

**"BadSeek" Demonstration (2025):**
- Researcher trained open-source LLM to dynamically inject backdoors into code it generates
- Shows how poisoned code-generation models can compromise downstream software

Sources:
- https://www.anthropic.com/research/small-samples-poison
- https://arxiv.org/abs/2510.07192
- https://www.cylab.cmu.edu/news/2025/06/11-poisoned-datasets-put-ai-models-at-risk-for-attack.html
- https://www.darkreading.com/application-security/only-250-documents-poison-any-ai-model
- https://fortune.com/2025/10/14/anthropic-study-bad-data-poison-ai-models-openai-broadcom-sora-2/
- https://www.lakera.ai/blog/training-data-poisoning

### 3. Adversarial Examples and Training Data Contamination

**Grok 4 "!Pliny" Jailbreak (July 2025):**
- xAI's Grok 4 could be jailbroken by typing a single word: "!Pliny"
- Cause: Pliny the Liberator's jailbreak prompts saturated X (Twitter) training data
- Demonstrates how social media content can become an unintentional poisoning vector
- Novel attack class: identity-based data poisoning where a persona's name itself becomes a trigger

**Microsoft 365 Copilot EchoLeak (CVE-2025-32711, May 2025):**
- Zero-click prompt injection vulnerability
- Poisoned email with encoded character substitutions bypassed safety filters
- Could force Copilot to exfiltrate sensitive business data to external URLs
- Demonstrates poisoning risk in enterprise RAG/retrieval systems

**ChatGPT Search Manipulation (December 2024):**
- Hidden text embedded in webpages manipulated ChatGPT search responses
- Researchers coerced ChatGPT into producing artificially positive product reviews
- Shows how web content can poison retrieval-augmented generation

**Qwen 2.5 Search Tool Exploitation (2025):**
- Attackers seeded malicious text across the internet
- An 11-word query caused Qwen 2.5 to output explicit content via its search tool
- Demonstrates retrieval-time poisoning (not training-time)

**MCP Tool Poisoning (July 2025):**
- Invisible instructions hidden in Model Context Protocol tool descriptions
- 72% success rate across 1,300+ malicious test cases (MCPTox benchmark)
- Seemingly benign tools carry concealed backdoors that models automatically execute

**PoisonGPT Proof-of-Concept:**
- Researchers modified an open-source model to confidently assert false facts
- Model stated "the Eiffel Tower is located in Rome" with no degradation on standard benchmarks
- Demonstrates how poisoned models can pass quality checks while spreading misinformation

Sources:
- https://www.lakera.ai/blog/training-data-poisoning
- https://time.com/collections/time100-ai-2025/7305870/pliny-the-liberator/
- https://ttms.com/training-data-poisoning-the-invisible-cyber-threat-of-2026/
- https://purplesec.us/learn/ai-security-risks/

### 4. Scale of the Problem

**How much training data is compromised:**
- The C4 common crawl dataset saw restricted tokens jump from 5-7% to 20-33% (2023-2024), indicating massive web content is being modified or restricted in response to AI scraping
- With 8.5M Glaze downloads, millions of artworks online now carry perturbation signals
- 2.5M Nightshade downloads mean millions of poisoned images potentially in training pipelines
- Poisoning extends across ALL stages of AI lifecycle: pre-training, fine-tuning, RAG retrieval, tool use, and synthetic data generation

**Attack surface is growing:**
- Federated learning amplifies poisoning risks while hindering detection
- Synthetic data pipelines propagate poisoned content across generations (Virus Infection Attack)
- Open-source model repositories, datasets (HuggingFace, GitHub), and web scraping are all vulnerable vectors
- Agentic AI mainstreaming in 2026 amplifies risk: autonomous agents cascade errors across systems

**Detection difficulty:**
- Poisoned data often represents tiny fractions of massive datasets
- Corrupted models match performance of clean models on standard benchmarks
- "Stealth backdoors" using benign question-answer pairs achieve ~85% attack success while bypassing safety filters
- Belief manipulation attacks require no trigger -- making them nearly impossible to detect at inference time

Sources:
- https://www.anthropic.com/research/small-samples-poison
- https://hai.stanford.edu/ai-index/2025-ai-index-report
- https://www.jmir.org/2026/1/e87969
- https://www.nature.com/articles/s41591-024-03445-1

### 5. Who Is Doing This and Why

**Artists Protecting Their Work (Defensive Poisoning):**
- Millions of artists using Glaze and Nightshade to protect against unauthorized style mimicry
- Motivated by lack of consent mechanisms: AI companies scraped artwork without permission
- Community-driven: artists with small/medium followings and limited resources are primary users
- Tools designed as collective action: individual poison samples compound when scraped at scale
- Legal context: 70+ copyright lawsuits filed, $1.5B Anthropic settlement shows legal stakes

**Security Researchers (Ethical/Disclosure):**
- Academic teams demonstrating vulnerabilities to drive better defenses
- LightShed team explicitly states their work is a "call to action" not an attack
- Anthropic's own research on 250-document poisoning aimed at improving industry defenses
- NIST AI 100-2 E2025 provides standardized taxonomy for the field

**Malicious Actors (Offensive Poisoning):**
- State-sponsored actors: potential for undermining adversary AI capabilities
- Cybercriminals: poisoning fraud detection to enable financial crimes
- Competitive sabotage: manipulating belief systems to favor products/brands
- Hacktivists: Pliny the Liberator and similar figures systematically probe AI weaknesses
- Insider threats: employees with pipeline access can embed undetectable backdoors

**Motivations spectrum:**
| Actor | Motivation | Method | Scale |
|-------|-----------|--------|-------|
| Artists | Protect intellectual property | Glaze/Nightshade | Millions of images |
| Academics | Improve defenses | Controlled experiments | Lab-scale |
| Hacktivists | Demonstrate AI fragility | Social media saturation | Variable |
| Criminals | Financial gain | Pipeline infiltration | Targeted |
| Nation-states | Strategic advantage | Supply chain attacks | Unknown |
| Insiders | Varied (revenge, ideology) | Direct data access | Surgical |

Sources:
- https://glaze.cs.uchicago.edu/aboutus.html
- https://time.com/collections/time100-ai-2025/7305870/pliny-the-liberator/
- https://www.lakera.ai/blog/training-data-poisoning
- https://ttms.com/training-data-poisoning-the-invisible-cyber-threat-of-2026/

### 6. Corporate and Government Responses

**Corporate Responses:**

| Company | Defense Strategy |
|---------|-----------------|
| **OpenAI** | Analyzes data sources, intermittently observes LLM responses for anomalies |
| **Microsoft** | Cryptographic authentication, internal component safeguards against dataset tampering |
| **Google** | Academic research partnerships, Zero Trust Content Disarm and Reconstruction (CDR) |
| **Adobe** | Trains Firefly only on licensed images; supports #NoAI tags |
| **Anthropic** | Published own poisoning research (250-doc study); $1.5B settlement with copyright holders |

**Licensing Deals:**
- Universal Music Group settled copyright suit against Udio (October 2025), entered licensing agreements
- New subscription service planned for 2026 with fully authorized AI-trained music generation
- Adobe Firefly trained exclusively on licensed images as preventive approach

**Government/Regulatory Responses:**

| Jurisdiction | Action | Status |
|-------------|--------|--------|
| **California (AB 2013)** | Training Data Transparency Act requiring disclosure of dataset contents (copyrighted material, PII, synthetic data) | Effective January 1, 2026 |
| **EU AI Act** | GPAI providers must publish detailed training data summaries | Phased implementation; GPAI obligations effective August 2025 |
| **NIST (US)** | AI 100-2 E2025: Comprehensive taxonomy of adversarial ML attacks and mitigations | Published March 2025 |
| **US Federal** | Trump executive order (Dec 2025) proposing federal AI framework that may preempt state laws | Under legal challenge |
| **xAI** | Challenged California's Training Data Transparency Act | Filed January 2026 |

**Key Gap:** No government has enacted legislation specifically targeting data poisoning attacks. Current regulations focus on training data transparency and copyright compliance, not on the security threat of adversarial data manipulation.

Sources:
- https://csrc.nist.gov/pubs/ai/100/2/e2025/final
- https://copyrightalliance.org/ai-copyright-lawsuit-developments-2025/
- https://ipwatchdog.com/2025/10/02/ai-training-data-watershed-1-5-billion-anthropic-settlement/
- https://natlawreview.com/article/2026-outlook-artificial-intelligence
- https://www.kslaw.com/news-and-insights/new-state-ai-laws-are-effective-on-january-1-2026-but-a-new-executive-order-signals-disruption

### 7. Defense and Mitigation Landscape

**Three Pillars of Defense (Lakera Framework):**
1. **Data Provenance and Validation** -- Source from trusted repositories, maintain integrity chains, deduplicate, filter with classifiers, redact sensitive information
2. **Adversarial Testing and Red Teaming** -- Simulate poisoning scenarios before deployment, test known poisoning techniques
3. **Runtime Guardrails and Monitoring** -- Detect triggers, block anomalous outputs, flag suspicious patterns in production

**Promising Finding:** CyLab/CMU researchers found that **safety training can overwrite some backdoors**, particularly jailbreaking backdoors. This suggests post-training safety alignment is partially effective against poisoning.

**Key Challenge:** Belief manipulation attacks (factual inaccuracies without triggers) are the hardest to detect and defend against, as they require no activation trigger and blend with normal model behavior.

**Current Limitations:**
- Machine unlearning algorithms are ineffective against sophisticated attacks
- Adversarial training faces scalability challenges
- Detection methods struggle with the "needle in a haystack" problem at scale
- Once poisoned, restoring model integrity is extremely difficult -- prevention is essential

Sources:
- https://www.lakera.ai/blog/training-data-poisoning
- https://www.cylab.cmu.edu/news/2025/06/11-poisoned-datasets-put-ai-models-at-risk-for-attack.html
- https://blog.lastpass.com/posts/model-poisoning
- https://www.sentinelone.com/cybersecurity-101/data-and-ai/ai-risk-mitigation/

---

## Fact-Check Verdict Assessment

**Claim: "AI data poisoning is a serious and growing threat in 2025-2026"**
**Verdict: TRUE -- Supported by extensive evidence**

The evidence overwhelmingly supports that AI data poisoning has evolved from theoretical concern to practical, demonstrated threat:

1. **Academic proof is robust**: Multiple independent research teams (Anthropic, CMU, University of Chicago, Nature Medicine) have demonstrated successful poisoning attacks with extremely small amounts of contaminated data.
2. **Real-world incidents have occurred**: The Grok "!Pliny" jailbreak, Microsoft Copilot EchoLeak, ChatGPT search manipulation, and GitHub code comment poisoning are documented real-world cases.
3. **The scale is massive**: 8.5M+ Glaze downloads and 2.5M+ Nightshade downloads represent the largest deliberate data contamination effort in history, though motivated by copyright protection rather than malice.
4. **Defenses are inadequate**: No foolproof detection or prevention method exists. Even the artist protection tools (Glaze/Nightshade) have been defeated by LightShed with 99.98% accuracy.
5. **Regulatory response is nascent**: Government action focuses on transparency, not security. No legislation specifically addresses data poisoning as a cybersecurity threat.

**Key nuance:** There is an important distinction between:
- **Defensive poisoning** by artists (Nightshade/Glaze) -- motivated by copyright protection
- **Malicious poisoning** by attackers -- motivated by sabotage, financial gain, or strategic advantage
- **Research poisoning** by academics -- motivated by improving defenses

All three are growing, but they serve fundamentally different purposes and should be evaluated differently in any fact-check context.

---

## Complete Source List

1. Anthropic Research -- "Poisoning Attacks on LLMs Require a Near-constant Number of Poison Samples" (Oct 2025): https://www.anthropic.com/research/small-samples-poison
2. arXiv -- Poisoning Attacks paper: https://arxiv.org/abs/2510.07192
3. CyLab/CMU -- "Poisoned datasets put AI models at risk for attack" (Jun 2025): https://www.cylab.cmu.edu/news/2025/06/11-poisoned-datasets-put-ai-models-at-risk-for-attack.html
4. Nature Medicine -- "Medical large language models are vulnerable to data-poisoning attacks" (Jan 2025): https://www.nature.com/articles/s41591-024-03445-1
5. Dark Reading -- "It Takes Only 250 Documents to Poison Any AI Model": https://www.darkreading.com/application-security/only-250-documents-poison-any-ai-model
6. Fortune -- "A handful of bad data can 'poison' even the largest AI models": https://fortune.com/2025/10/14/anthropic-study-bad-data-poison-ai-models-openai-broadcom-sora-2/
7. MIT Technology Review -- "This tool strips away anti-AI protections from digital art" (Jul 2025): https://www.technologyreview.com/2025/07/10/1119937/tool-strips-away-anti-ai-protections-from-digital-art/
8. MIT Technology Review -- "This new data poisoning tool lets artists fight back" (Oct 2023): https://www.technologyreview.com/2023/10/23/1082189/data-poisoning-artists-fight-generative-ai/
9. University of Cambridge -- "AI art protection tools still leave creators at risk": https://www.cam.ac.uk/research/news/ai-art-protection-tools-still-leave-creators-at-risk-researchers-say
10. LightShed Project Page: https://trust-lightshed.github.io/
11. Nightshade Official -- University of Chicago: https://nightshade.cs.uchicago.edu/whatis.html
12. Glaze Official -- University of Chicago: https://glaze.cs.uchicago.edu/
13. VentureBeat -- "AI poisoning tool Nightshade received 250,000 downloads in 5 days": https://venturebeat.com/ai/ai-poisoning-tool-nightshade-received-250000-downloads-in-5-days-beyond-anything-we-imagined
14. Lakera -- "Introduction to Data Poisoning: A 2025 Perspective": https://www.lakera.ai/blog/training-data-poisoning
15. TTMS -- "Training Data Poisoning: The Invisible Cyber Threat of 2026": https://ttms.com/training-data-poisoning-the-invisible-cyber-threat-of-2026/
16. Stanford HAI -- AI Index Report 2025: https://hai.stanford.edu/ai-index/2025-ai-index-report
17. NIST -- AI 100-2 E2025 Adversarial Machine Learning: https://csrc.nist.gov/pubs/ai/100/2/e2025/final
18. JMIR -- "Data Poisoning Vulnerabilities Across Health Care AI Architectures": https://www.jmir.org/2026/1/e87969
19. IPWatchdog -- "$1.5 Billion Anthropic Settlement": https://ipwatchdog.com/2025/10/02/ai-training-data-watershed-1-5-billion-anthropic-settlement/
20. Copyright Alliance -- "AI Copyright Lawsuit Developments in 2025": https://copyrightalliance.org/ai-copyright-lawsuit-developments-2025/
21. TIME -- "Pliny the Liberator: TIME100 AI 2025": https://time.com/collections/time100-ai-2025/7305870/pliny-the-liberator/
22. PurpleSec -- "Top AI Security Risks (Updated 2026)": https://purplesec.us/learn/ai-security-risks/
23. IBM -- "Cost of a Data Breach Report 2025": https://www.ibm.com/downloads/documents/us-en/131cf87b20b31c91
24. Pillar Security -- "The New AI Attack Surface: 3 AI Security Predictions for 2026": https://www.pillar.security/blog/the-new-ai-attack-surface-3-ai-security-predictions-for-2026
25. Malwarebytes -- "You can poison AI with just 250 dodgy documents": https://www.malwarebytes.com/blog/ai/2025/10/you-can-poison-ai-with-just-250-dodgy-documents
26. Artnet News -- "Demand for Nightshade Has Been 'Off the Charts'": https://news.artnet.com/art-world/nightshade-ai-downloaded-250000-times-2426956
27. SentinelOne -- "AI Risk Mitigation: Tools and Strategies for 2026": https://www.sentinelone.com/cybersecurity-101/data-and-ai/ai-risk-mitigation/
28. LastPass Blog -- "AI Model Poisoning in 2026": https://blog.lastpass.com/posts/model-poisoning
29. Bloomberg Law -- "Music Piracy, AI Lawsuits Top 2026 Copyright Litigation Calendar": https://news.bloomberglaw.com/ip-law/music-piracy-ai-lawsuits-top-2026-copyright-litigation-calendar
