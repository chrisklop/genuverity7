# **Technical and Geopolitical Analysis of Laptop Farm Infrastructure: From Corporate Infiltration to Electoral Manipulation**

The rapid transition toward decentralized, remote work environments has fundamentally reconfigured the global threat landscape, giving rise to a sophisticated organizational model known as the "laptop farm." These facilities, characterized by the physical aggregation of computer hardware or mobile devices managed by remote operators, represent a critical nexus where cyber-enabled fraud meets physical infrastructure. While the initial public awareness of these schemes often centers on commercial ad fraud, recent law enforcement actions and corporate security reports—most notably involving Amazon and the U.S. Department of Justice—reveal a far more insidious application. Laptop farms are now a primary instrument for state-sponsored economic espionage, the evasion of international sanctions by the Democratic People’s Republic of Korea (DPRK), and the execution of high-volume disinformation campaigns designed to influence democratic processes.1

## **The Evolution and Mechanics of Laptop Farm Architecture**

To understand the contemporary laptop farm, one must distinguish it from the "click farms" of the previous decade. Whereas click farms historically relied on low-skilled labor to manually interact with devices, modern laptop farms are high-tech, automated environments that leverage residential proxy networks, hardware-level remote control, and artificial intelligence to mimic human behavior.4

### **Physical and Hardware Layer Specifications**

The physical architecture of a laptop farm is designed to circumvent "Zero Trust" security models that rely on device fingerprinting and geolocation. Facilitators within a target country, such as the United States, receive legitimate, company-issued laptops.2 These devices are not merely stored; they are integrated into a local network infrastructure that provides a "domestic" identity to an overseas operator.

Hardware components frequently identified in these operations include Keyboard-Video-Mouse (KVM) over IP switches, which allow for low-level BIOS and OS control without the need for software-based remote desktop agents that might be detected by enterprise security suites.8 In other instances, facilitators utilize micro-computers like Raspberry Pis to maintain persistent connections and execute automated scripts locally on the workstation.9 The physical maintenance of these farms involves managing power cycles, internet stability, and the logistics of receiving and shipping hardware—tasks performed by domestic facilitators who are often compensated with monthly fees.7

### **Network Obfuscation and Residential Proxy Integration**

A critical vulnerability that laptop farms exploit is the reputation of Internet Service Provider (ISP) IP addresses. Security systems generally trust traffic originating from residential ISPs like Comcast, Verizon, or Cox more than traffic from commercial data centers.11 Laptop farms utilize residential proxy networks to route traffic through the home connection of the facilitator.

This creates a "layered" identity: to the victim company’s server, the traffic appears to originate from a known device located at a verified residential address in the United States. In reality, the operator is located in a different jurisdiction, such as China, Russia, or North Korea.7 The use of residential proxies renders standard IP-based blocklists ineffective, as blocking a single residential IP risks disenfranchising a legitimate consumer or an entire shared network.5

### **Behavioral Emulation and Anti-Detection Measures**

As corporate security has evolved toward behavioral analytics—monitoring mouse movement, typing cadences, and session durations—laptop farm operators have adopted advanced emulation techniques. Software packages now utilize interpolation algorithms to create non-linear, curved mouse trajectories that mirror human motor patterns.14 These tools introduce randomized pauses and "jitters" to simulate natural hesitation, effectively bypassing machine-learning defenses that flag robotic, straight-line movements.6

| Technical Vector | Mechanism | Objective |
| :---- | :---- | :---- |
| **KVM-over-IP** | Hardware-level remote control | Bypass software-based remote desktop detection |
| **Residential Proxies** | Routing traffic through ISP-issued IPs | Evade geolocation filters and IP blocklists |
| **Mouse Emulation** | Algorithmic curved trajectories | Bypass behavioral anti-bot systems |
| **Identity Hijacking** | Leveraging stolen PII and LinkedIn profiles | Establish credible "human" personas for hiring |
| **Hardware Spoofing** | Modifying device identifiers (IMEI/UUID) | Create unique, authentic-looking device fingerprints |

8

## **The Amazon Incident and the Scale of DPRK IT Worker Schemes**

In late 2025, Amazon’s Chief Security Officer reported that the company had identified and blocked approximately 1,800 suspected North Korean IT job scammers.1 This case highlights a systematic, state-sponsored effort to infiltrate the global tech workforce. The scale of the Amazon deluge suggests that the DPRK has industrialized the process of job application fraud, moving beyond sporadic attempts toward a high-volume, automated "funnel" of potential operatives.1

### **Strategic Targeting of High-Value Roles**

A notable trend observed in the Amazon incident is the shift toward targeting roles in Artificial Intelligence (AI) and Machine Learning (ML). This suggests a strategic intent by the DPRK to not only generate revenue but also to acquire sensitive intellectual property and technical data in fields critical to national security.1 By gaining employment at a major tech firm, an operative gains access to internal source code, proprietary algorithms, and potentially customer data, which can be exfiltrated or leveraged for further network intrusion.1

### **The "Andrew M." and Christina Chapman Case Studies**

The prosecution of Christina Marie Chapman in Arizona provides a granular view of how these farms operate within the United States. Chapman hosted over 90 laptops at her residence, facilitating employment for North Korean workers at more than 300 U.S. companies.10 The scheme was not merely about salaries; it involved the large-scale theft of identities. Workers used the stolen PII of 68 U.S. persons to bypass background checks and employment verification systems.10

One significant victim of this identity theft was a U.S. citizen identified in court documents as "Andrew M." His identity was used by a North Korean worker to obtain jobs at media and technology firms, resulting in the worker earning over $250,000 in a single year.7 The human cost of these schemes includes the creation of massive tax liabilities and damaged credit scores for the identity theft victims, whose names are used to report earnings to the IRS and Social Security Administration.7

### **Financial Metrics and Revenue Generation**

The primary objective of the DPRK IT worker program is the generation of hard currency to fund the regime’s weapons programs. U.S. officials estimate that individual IT workers can earn up to $300,000 annually, with the entire collective of thousands of workers generating hundreds of millions of dollars each year.2

| Metric | Detail | Source |
| :---- | :---- | :---- |
| **Total Revenue (Chapman Scheme)** | $17.1 Million | 10 |
| **Number of Impacted Companies** | 300+ (Chapman), 100+ (Wang), 64+ (Prince) | 10 |
| **Individual Worker Earnings** | Up to $300,000 per year | 2 |
| **Identity Theft Victims** | 68 U.S. persons (Chapman), 80+ (Wang) | 10 |
| **Financial Account Seizures** | 29 accounts (2025 crackdown) | 18 |

2

## **Utilization of Laptop Farms for Election Interference and Disinformation**

The infrastructure developed for commercial fraud and job scams is increasingly repurposed for geopolitical influence operations. State actors, primarily Russia, utilize "bot farms"—the social media equivalent of laptop farms—to manipulate public perception and interfere in democratic elections.3

### **The "Meliorator" and "Storm-1516" Operations**

In September 2024, the U.S. Department of Justice disrupted a Russian bot farm that utilized an AI-enhanced software package known as "Meliorator".3 This software was designed to create and manage a multitude of fake social media personas that appeared as ordinary Americans. These personas were used to amplify Kremlin narratives, such as anti-Ukraine sentiments and pro-Russian propaganda, while blending into local conversations.3

The group "Storm-1516" demonstrated the potential for these farms to spread targeted disinformation. They produced a viral video featuring an actor playing a victim of a fake 2011 hit-and-run involving Kamala Harris.3 The video was hosted on a domain designed to mimic a San Francisco TV station and was then boosted by a network of bot-like accounts, reaching millions of views within days.3

### **Economic Indicators of Influence Operations**

Research from the University of Cambridge’s Online Trust and Safety Index (COTSI) has identified a direct correlation between election cycles and the pricing of fake accounts. Because platforms like Telegram and WhatsApp require SMS verification from phone numbers local to the target country, demand for these accounts spikes during the 30 days leading up to a national election.21

Data from 61 national elections held between 2024 and 2025 shows that the price for fake Telegram accounts increased by an average of 12%, and WhatsApp accounts by 15%, in the pre-election period.21 This price volatility serves as a quantitative "early warning system" for coordinated influence operations. In contrast, platforms like Facebook and Instagram, which do not tie accounts as closely to local phone numbers, did not show the same price-to-election correlation, as fake accounts can be registered in one country (e.g., Russia) and used to influence another (e.g., the U.S.) without as much technical friction.21

| Platform | Verification Cost (US Avg) | Pre-Election Price Spike | Mechanism |
| :---- | :---- | :---- | :---- |
| **WhatsApp** | $1.02 | 15% | Local SMS Verification |
| **Telegram** | $0.89 | 12% | Local SMS Verification |
| **X (Twitter)** | $0.10 | Negligible | Global registration |
| **Facebook** | $0.08 | Negligible | Global registration |
| **LinkedIn** | $0.11 | Negligible | Global registration |

21

## **Commercial Impacts: Ad Fraud and the Economics of Device Farms**

Beyond geopolitical and security threats, laptop farms—often called "device farms" or "phone farms" in this context—represent the primary engine of global ad fraud. This activity creates a massive shadow economy that drains marketing budgets and skews digital analytics.22

### **Physical Hardware vs. Emulation**

A critical development in 2025-2026 is the shift away from software-based emulators toward physical device farms. Fraudsters utilize warehouses filled with thousands of actual smartphones and tablets.4 These devices exhibit authentic hardware signatures, genuine GPS data, and real touchscreen interaction patterns, making them nearly impossible for standard anti-fraud SDKs to detect.4

A device farm with only 500 smartphones can generate over 10 million fraudulent ad clicks per month.4 These operations are typically located in regions with low labor costs and minimal regulation, such as Southeast Asia or Eastern Europe, but use VPNs and residential proxies to appear as though they are located in high-value ad markets like New York or London.4

### **The Rising Cost of Digital Inauthenticity**

Global losses to ad fraud are projected to reach $172 billion by 2028, with fraud affecting 20% to 30% of all digital ad spending in 2025\.24 This "hidden tax" on the digital economy hurts reputable publishers by diverting revenue to fraudulent actors and skews the data that companies use to make investment decisions.25

In the mobile sector, "click injection" is a particularly pervasive threat. This involves malicious apps on a user's device that "listen" for when a new app is being installed. The malicious app then "injects" a click seconds before the installation completes, allowing the fraudster to steal the attribution credit (and the commission) from the legitimate marketing channel.4 This practice affects an estimated 15% to 30% of all Android app install campaigns.4

| Ad Fraud Category | Contribution to Invalid Traffic | Impact |
| :---- | :---- | :---- |
| **Click Spamming** | 76.6% | Budget depletion / Skewed analytics |
| **Bot Activity** | \~20% | Metric inflation / Engagement loss |
| **Click Injection** | 15-30% of Android Installs | Attribution theft |
| **SDK Spoofing** | Variable | Fabrication of entire funnel |

4

## **Counter-Measures and the "DPRK RevGen" Initiative**

In response to the escalating threat, the U.S. government has launched the "DPRK RevGen: Domestic Enabler Initiative." This program, run by the National Security Division and the FBI, prioritizes the identification and shutdown of U.S.-based laptop farms.2

### **Corporate Defense and Identity-Based Triage**

Companies are being urged to shift away from simple geolocation and IP-based security toward "identity-based triage".12 This involves grouping all alert telemetry by individual users and looking for behavioral anomalies that suggest a proxy host, such as improbable travel patterns or the simultaneous use of multiple devices.12

Amazon and other tech firms have enhanced their hiring processes to include:

* **Credential Verification:** AI-powered background checks that cross-reference multiple data points.1  
* **Structured Video Interviews:** Requiring human-to-human interaction to confirm the identity of the person performing the work.1  
* **Device-Binding:** Ensuring that company hardware can only connect from authorized devices and locations, with mandatory Multi-Factor Authentication (MFA).28

### **Legislative and Global Responses**

On the legislative front, the United Kingdom became the first European country to make SIM farms illegal in April 2025\.21 This move targets the physical infrastructure used for mass account verification, making it significantly harder for bot farm operators to function within that jurisdiction. Similar initiatives are being debated in other regions as the link between these farms and election interference becomes more apparent.25

The DOJ has also aggressively pursued civil forfeiture, seizing over $15 million in virtual currency linked to North Korean hacking units (such as APT38) and IT worker schemes.27 By targeting the financial proceeds, law enforcement aims to disrupt the ROI of these operations, even when the masterminds remain in countries like China or North Korea.19

## **Future Outlook: The Intersection of AI and Physical Infrastructure**

The future of the laptop farm is one of increasing sophistication and convergence. As AI becomes more capable, the labor required to manage a farm of thousands of devices will decrease, allowing for even greater scale. We are moving toward an era where state-sponsored actors and commercial fraudsters will use "fully autonomous personas"—AI agents that can handle interviews, write code, and interact on social media, all while routed through a physical laptop farm in the United States to maintain the illusion of legitimacy.1

The "Liars Dividend" remains a significant risk. As the public becomes increasingly aware that 51% of web traffic is now automated, trust in digital institutions and democratic discourse will continue to erode.3 The battle against laptop farms is therefore not just a technical challenge for cybersecurity professionals, but a fundamental struggle for the integrity of the digital age.

### ---

**Sources used in this report:**

https://www.darkreading.com/remote-workforce/amazon-fends-off-dprk-it-job-scammers  
https://www.justice.gov/opa/pr/two-north-korean-nationals-and-three-facilitators-indicted-multi-year-fraudulent-remote  
https://meritalk.com/articles/doj-disrupts-north-korean-remote-it-worker-fraud-schemes/  
https://www.justice.gov/opa/pr/justice-department-announces-coordinated-nationwide-actions-combat-north-korean-remote  
https://www.nextgov.com/cybersecurity/2025/06/us-unveils-multiple-operations-shutter-north-korean-it-worker-schemes/406421/  
https://subscriber.politicopro.com/article/2025/07/arizona-christina-chapman-north-korea-laptop-farm-00475838  
https://analytics-develop.app.cloud.gov/data/justice/all-pages-realtime.csv  
https://www.clickfortify.com/blog/mobile-click-fraud-detection-strategies  
https://www.geelark.com/glossary/click-farms/  
https://www.mfilterit.com/blog/ad-fraud-on-programmatic-platforms-need-for-protection/  
https://www.pixelpulse.in/post/mobile-advertising-fraud-types-and-intricacies-part-iv  
https://scalarr.io/research/reports/download/the-ultimate-guide-to-app-install-fraud-types/  
https://www.justice.gov/archives/opa/pr/justice-department-disrupts-north-korean-remote-it-worker-fraud-schemes-through-charges-and  
https://thehackernews.com/2024/08/doj-charges-nashville-man-for-helping.html  
https://www.securityweek.com/justice-department-disrupts-north-korean-laptop-farm-operation/  
https://www.justice.gov/usao-dc/pr/arizona-woman-sentenced-17m-it-worker-fraud-scheme-illegally-generated-revenue-north  
https://www.justice.gov/usao-dc/pr/ukrainian-pleads-guilty-dc-laptop-farm-scheme-generated-income-north-korean-it-workers  
https://www.arkoselabs.com/latest-news/bot-farms-disinformation-war  
https://cetas.turing.ac.uk/publications/ai-enabled-influence-operations-safeguarding-future-elections  
https://www.csis.org/analysis/russian-bot-farm-used-ai-lie-americans-what-now  
https://www.brennancenter.org/our-work/research-reports/digital-disinformation-and-vote-suppression  
https://pmc.ncbi.nlm.nih.gov/articles/PMC12351547/  
https://www.cam.ac.uk/stories/price-bot-army-global-index  
https://saisreview.sais.jhu.edu/social-media-disinformation-and-ai-transforming-the-landscape-of-the-2024-u-s-presidential-political-campaigns/  
https://news.stanford.edu/stories/2025/11/social-media-tool-polarization-user-control-research  
https://www.anura.io/blog/what-are-residential-proxies  
https://fingerprint.com/blog/residential-proxies-explained/  
https://www.peakhour.io/learning/threat-detection/what-is-residential-proxy-detection/  
https://www.trendmicro.com/vinfo/us/security/news/cybercrime-and-digital-threats/the-rise-of-residential-proxies-and-its-impact-on-cyber-risk-exposure-management  
https://www.obsidiansecurity.com/blog/emerging-identity-threats-the-muddy-waters-of-residential-proxies  
https://www.humansecurity.com/learn/topics/what-is-bot-detection/  
https://multilogin.com/glossary/mouse-movement-emulation/  
https://datadome.co/guides/bot-protection/tools/  
https://www.geelark.com/blog/from-mouse-movement-emulation-to-mobile-automation/  
https://www.justice.gov/opa/pr/justice-department-announces-nationwide-actions-combat-illicit-north-korean-government  
https://www.fbi.gov/wanted/cyber/dprk-it-fraud  
https://www.crowell.com/en/insights/client-alerts/doj-announces-major-enforcement-actions-targeting-north-korean-remote-it-worker-schemes  
https://www.ftc.gov/news-events/news/press-releases/2025/03/new-ftc-data-show-big-jump-reported-losses-fraud-125-billion-2024  
https://spideraf.com/articles/ad-fraud-trends-2025-key-threats-and-how-to-combat-them  
https://searchengineland.com/84-billion-lost-to-ad-fraud-what-you-missed-about-affiliate-abuse-in-2025-456530  
https://www.tapper.ai/ad-fraud-impact-2025  
https://www.exchange4media.com/digital-news/ad-fraud-inside-digital-advertisings-172-billion-shadow-economy-149279.html

#### **Works cited**

1. Amazon Fends Off 1,800 Suspected DPRK IT Job Scammers, accessed December 23, 2025, [https://www.darkreading.com/remote-workforce/amazon-fends-off-dprk-it-job-scammers](https://www.darkreading.com/remote-workforce/amazon-fends-off-dprk-it-job-scammers)  
2. Two North Korean Nationals and Three Facilitators Indicted for Multi-Year Fraudulent Remote Information Technology Worker Scheme that Generated Revenue for the Democratic People's Republic of Korea | United States Department of Justice, accessed December 23, 2025, [https://www.justice.gov/opa/pr/two-north-korean-nationals-and-three-facilitators-indicted-multi-year-fraudulent-remote](https://www.justice.gov/opa/pr/two-north-korean-nationals-and-three-facilitators-indicted-multi-year-fraudulent-remote)  
3. The architecture of lies: Bot farms are running the disinformation war ..., accessed December 23, 2025, [https://www.arkoselabs.com/latest-news/bot-farms-disinformation-war](https://www.arkoselabs.com/latest-news/bot-farms-disinformation-war)  
4. Mobile Click Fraud Detection: Advanced Strategies for 2026 | Click ..., accessed December 23, 2025, [https://www.clickfortify.com/blog/mobile-click-fraud-detection-strategies](https://www.clickfortify.com/blog/mobile-click-fraud-detection-strategies)  
5. The Rise of Residential Proxies as a Cybercrime Enabler | Trend ..., accessed December 23, 2025, [https://www.trendmicro.com/vinfo/us/security/news/cybercrime-and-digital-threats/the-rise-of-residential-proxies-and-its-impact-on-cyber-risk-exposure-management](https://www.trendmicro.com/vinfo/us/security/news/cybercrime-and-digital-threats/the-rise-of-residential-proxies-and-its-impact-on-cyber-risk-exposure-management)  
6. Bot Detection Guide 2025: How to Identify & Block Bots \- HUMAN Security, accessed December 23, 2025, [https://www.humansecurity.com/learn/topics/what-is-bot-detection/](https://www.humansecurity.com/learn/topics/what-is-bot-detection/)  
7. Justice Department Disrupts North Korean Remote IT Worker Fraud Schemes Through Charges and Arrest of Nashville Facilitator, accessed December 23, 2025, [https://www.justice.gov/archives/opa/pr/justice-department-disrupts-north-korean-remote-it-worker-fraud-schemes-through-charges-and](https://www.justice.gov/archives/opa/pr/justice-department-disrupts-north-korean-remote-it-worker-fraud-schemes-through-charges-and)  
8. Justice Department Announces Coordinated, Nationwide Actions to Combat North Korean Remote Information Technology Workers' Illicit Revenue Generation Schemes, accessed December 23, 2025, [https://www.justice.gov/opa/pr/justice-department-announces-coordinated-nationwide-actions-combat-north-korean-remote](https://www.justice.gov/opa/pr/justice-department-announces-coordinated-nationwide-actions-combat-north-korean-remote)  
9. Justice Department Disrupts North Korean 'Laptop Farm' Operation \- SecurityWeek, accessed December 23, 2025, [https://www.securityweek.com/justice-department-disrupts-north-korean-laptop-farm-operation/](https://www.securityweek.com/justice-department-disrupts-north-korean-laptop-farm-operation/)  
10. Arizona Woman Sentenced in $17M IT Worker Fraud Scheme That Illegally Generated Revenue for North Korea | United States Department of Justice, accessed December 23, 2025, [https://www.justice.gov/usao-dc/pr/arizona-woman-sentenced-17m-it-worker-fraud-scheme-illegally-generated-revenue-north](https://www.justice.gov/usao-dc/pr/arizona-woman-sentenced-17m-it-worker-fraud-scheme-illegally-generated-revenue-north)  
11. Residential Proxies & Ad Fraud: Unmask the Hidden Threat to Marketing \- Anura.io, accessed December 23, 2025, [https://www.anura.io/blog/what-are-residential-proxies](https://www.anura.io/blog/what-are-residential-proxies)  
12. Emerging Identity Threats: The Muddy Waters of Residential Proxies \- Obsidian Security, accessed December 23, 2025, [https://www.obsidiansecurity.com/blog/emerging-identity-threats-the-muddy-waters-of-residential-proxies](https://www.obsidiansecurity.com/blog/emerging-identity-threats-the-muddy-waters-of-residential-proxies)  
13. How Residential Proxies Help Attackers Look Like Real Users \- Fingerprint, accessed December 23, 2025, [https://fingerprint.com/blog/residential-proxies-explained/](https://fingerprint.com/blog/residential-proxies-explained/)  
14. What is Mouse Movement Emulation? \- Multilogin, accessed December 23, 2025, [https://multilogin.com/glossary/mouse-movement-emulation/](https://multilogin.com/glossary/mouse-movement-emulation/)  
15. From Mouse Movement Emulation to Mobile Automation \- GeeLark, accessed December 23, 2025, [https://www.geelark.com/blog/from-mouse-movement-emulation-to-mobile-automation/](https://www.geelark.com/blog/from-mouse-movement-emulation-to-mobile-automation/)  
16. Arizona woman sentenced to eight years in prison for hosting 'laptop farm' for North Korean remote workers \- POLITICO Pro, accessed December 23, 2025, [https://subscriber.politicopro.com/article/2025/07/arizona-christina-chapman-north-korea-laptop-farm-00475838](https://subscriber.politicopro.com/article/2025/07/arizona-christina-chapman-north-korea-laptop-farm-00475838)  
17. DOJ Charges Nashville Man for Helping North Koreans Get U.S. Tech Jobs, accessed December 23, 2025, [https://thehackernews.com/2024/08/doj-charges-nashville-man-for-helping.html](https://thehackernews.com/2024/08/doj-charges-nashville-man-for-helping.html)  
18. DoJ Disrupts North Korean Remote IT Worker Fraud Schemes \- MeriTalk, accessed December 23, 2025, [https://meritalk.com/articles/doj-disrupts-north-korean-remote-it-worker-fraud-schemes/](https://meritalk.com/articles/doj-disrupts-north-korean-remote-it-worker-fraud-schemes/)  
19. US unveils multiple operations to shutter North Korean IT worker schemes \- Nextgov/FCW, accessed December 23, 2025, [https://www.nextgov.com/cybersecurity/2025/06/us-unveils-multiple-operations-shutter-north-korean-it-worker-schemes/406421/](https://www.nextgov.com/cybersecurity/2025/06/us-unveils-multiple-operations-shutter-north-korean-it-worker-schemes/406421/)  
20. A Russian Bot Farm Used AI to Lie to Americans. What Now? \- CSIS, accessed December 23, 2025, [https://www.csis.org/analysis/russian-bot-farm-used-ai-lie-americans-what-now](https://www.csis.org/analysis/russian-bot-farm-used-ai-lie-americans-what-now)  
21. Price of a 'bot army' revealed across hundreds of online platforms ..., accessed December 23, 2025, [https://www.cam.ac.uk/stories/price-bot-army-global-index](https://www.cam.ac.uk/stories/price-bot-army-global-index)  
22. Click farms \- GeeLark | 1st Antidetect phone, accessed December 23, 2025, [https://www.geelark.com/glossary/click-farms/](https://www.geelark.com/glossary/click-farms/)  
23. Ad Fraud Trends 2025: Key Threats and How to Combat Them \- Spider AF, accessed December 23, 2025, [https://spideraf.com/articles/ad-fraud-trends-2025-key-threats-and-how-to-combat-them](https://spideraf.com/articles/ad-fraud-trends-2025-key-threats-and-how-to-combat-them)  
24. Ad Fraud Impact 2025 \- Tapper.ai, accessed December 23, 2025, [https://www.tapper.ai/ad-fraud-impact-2025](https://www.tapper.ai/ad-fraud-impact-2025)  
25. Ad Fraud: Inside digital advertising's $172 billion shadow economy \- Exchange4Media, accessed December 23, 2025, [https://www.exchange4media.com/digital-news/ad-fraud-inside-digital-advertisings-172-billion-shadow-economy-149279.html](https://www.exchange4media.com/digital-news/ad-fraud-inside-digital-advertisings-172-billion-shadow-economy-149279.html)  
26. $84 billion lost to ad fraud: What you missed about affiliate abuse in 2025, accessed December 23, 2025, [https://searchengineland.com/84-billion-lost-to-ad-fraud-what-you-missed-about-affiliate-abuse-in-2025-456530](https://searchengineland.com/84-billion-lost-to-ad-fraud-what-you-missed-about-affiliate-abuse-in-2025-456530)  
27. Justice Department Announces Nationwide Actions to Combat Illicit North Korean Government Revenue Generation, accessed December 23, 2025, [https://www.justice.gov/opa/pr/justice-department-announces-nationwide-actions-combat-illicit-north-korean-government](https://www.justice.gov/opa/pr/justice-department-announces-nationwide-actions-combat-illicit-north-korean-government)  
28. DOJ Announces Major Enforcement Actions Targeting North Korean ..., accessed December 23, 2025, [https://www.crowell.com/en/insights/client-alerts/doj-announces-major-enforcement-actions-targeting-north-korean-remote-it-worker-schemes](https://www.crowell.com/en/insights/client-alerts/doj-announces-major-enforcement-actions-targeting-north-korean-remote-it-worker-schemes)