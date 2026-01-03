// Shared reports data - Single source of truth for all pages
// When adding a new report, add it here and it will update everywhere

const REPORTS_DATA = [
    {
        id: 0,
        title: "Epstein Young Women Archive Photos: Viral Misattributions",
        slug: "epstein-archive-photos-2025",
        category: "Conspiracy & Hoaxes",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "image",
        date: "Jan 2, 2025",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "misleading",
        excerpt: "MISLEADING: Viral photos claimed to be from Epstein archives were frequently misattributed or manipulated. While genuine court documents were released in January 2024, accompanying images on social media mixed authentic evidence with photos from unrelated public events, digitally altered images, and fabrications.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [38, 27, 22, 13],
            labels: ["Public Event", "Altered", "Misattributed", "Fabricated"],
            colors: ["#3b82f6", "#ef4444", "#f59e0b", "#06b6d4"]
        }
    },
    {
        id: 1,
        title: "AI 'Obituary Pirates'",
        slug: "ai-obituary-pirates-2025",
        category: "Platform & Tech",
        tagClass: "tag-blue",
        catClass: "cat-factcheck",
        icon: "skull",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "context",
        excerpt: "NEEDS CONTEXT: AI-generated obituary farms are a verified phenomenon that exploited grieving families with fabricated memorial content. NewsGuard documented 400+ such sites. However, the scope varies, not all fake obituary sites use AI, and platforms have begun implementing countermeasures.",
        chart: {
            type: "line",
            color: "#3b82f6",
            data: [12, 45, 89, 156, 287, 412, 389, 298]
        }
    },
    {
        id: 2,
        title: "Trump / Bill Clinton Crotch Pat Video Exposed as Deepfake",
        slug: "trump-clinton-crotch-pat-2025",
        category: "AI & Deepfakes",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "video-off",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "12 min",
        verdict: "false",
        excerpt: "FALSE: A manipulated video appearing to show inappropriate behavior between Trump and Clinton was exposed as fake. Frame-by-frame forensic analysis revealed editing artifacts, and the original unedited footage from the same event showed a normal interaction.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [94, 87, 82, 78, 91],
            labels: ["Frame Splice", "Compression", "Motion", "Audio Desync", "AI Signature"],
            colors: ["#ef4444", "#f59e0b", "#3b82f6", "#06b6d4", "#ef4444"]
        }
    },
    {
        id: 1,
        title: "Mamdani Extremist Associate Link: Guilt-by-Association Claims Examined",
        slug: "mamdani-extremist-link-2025",
        category: "U.S. Politics & Policy",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "scale",
        date: "Jan 2, 2025",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "misleading",
        excerpt: "MISLEADING: Claims linking NYC mayoral candidate Zohran Mamdani to extremists used guilt-by-association fallacies. Evidence cited - photos at public events and third-party endorsements - does not demonstrate endorsement of extremist ideologies. Fact-checkers noted pattern of misleading attack ads.",
        chart: {
            type: "donut",
            color: "#ef4444",
            data: [35, 25, 20, 12, 8],
            labels: ["Photo Assoc.", "Endorsements", "Policy Distort", "Event Attend", "Unsubstant."],
            colors: ["#ef4444", "#f59e0b", "#3b82f6", "#06b6d4", "#10b981"]
        }
    },
    {
        id: 0,
        title: "Australian Election Chatbot Poisoning",
        slug: "australia-election-chatbot-2025",
        category: "AI & Deepfakes",
        tagClass: "tag-blue",
        catClass: "cat-factcheck",
        icon: "bot",
        date: "Jan 2, 2025",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "context",
        excerpt: "NEEDS CONTEXT: AI chatbots provided inaccurate information about Australian voting procedures during the 2025 federal election. Documented errors included wrong registration deadlines, ID requirements, and federal/state rule confusion. While errors were real, they stem from AI limitations rather than deliberate manipulation.",
        chart: {
            type: "bar",
            color: "#3b82f6",
            data: [28, 23, 19, 15, 12],
            labels: ["Registration", "ID Errors", "Procedures", "Deadlines", "State/Fed"],
            colors: ["#ef4444", "#f59e0b", "#3b82f6", "#06b6d4", "#10b981"]
        }
    },
    {
        id: 0,
        title: "Montana 'Pedophile Bonfire' Hoax",
        slug: "montana-pedophile-bonfire-2025",
        category: "Conspiracy & Hoaxes",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "flame",
        date: "Jan 2, 2025",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "false",
        excerpt: "FALSE: Viral claims about a 'pedophile bonfire' event in Montana are completely fabricated. No police reports, news coverage, or evidence exists. Montana law enforcement confirmed no such event occurred. The hoax follows a dangerous pattern of fake 'community justice' stories designed to incite vigilante violence.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [1, 8, 35, 95, 180, 150, 85, 45]
        }
    },
    {
        id: 0,
        title: "British Budget Details Misinfo",
        slug: "british-budget-misinfo-2025",
        category: "International Affairs",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "landmark",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "misleading",
        excerpt: "MISLEADING: Claims about the UK budget contained multiple factual errors and misrepresentations. Various claims about tax increases were exaggerated or misattributed, viral posts confused proposed and actual measures, and spending figures were taken out of context.",
        chart: {
            type: "bar",
            color: "#3b82f6",
            data: [70, 15, 8, 10, 40, 0, 0, 2],
            labels: ["Claims", "Actual"],
            colors: ["#ef4444", "#3b82f6"]
        }
    },
    {
        id: 1,
        title: "D.C. Mid-Air Collision Misinfo",
        slug: "dc-midair-collision-misinfo-2025",
        category: "Conspiracy & Hoaxes",
        tagClass: "tag-cyan",
        catClass: "cat-factcheck",
        icon: "plane",
        date: "Jan 30, 2025",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "mixed",
        excerpt: "MIXED: The D.C. mid-air collision tragedy was accompanied by multiple misinformation narratives. Claims blaming DEI hiring policies are unsupported by evidence. Conspiracy theories about deliberate acts are unfounded. However, concerns about FAA staffing shortages are legitimate and documented.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [35, 25, 18, 15, 7],
            labels: ["DEI Blame", "Conspiracy", "Cover-up", "Staffing", "Other"],
            colors: ["#ef4444", "#f59e0b", "#3b82f6", "#10b981", "#06b6d4"]
        }
    },
    {
        id: 1,
        title: "Hurricane Melissa AI Videos: Fake Storm, Real Fraud",
        slug: "hurricane-melissa-ai-videos-2025",
        category: "AI & Deepfakes",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "video",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "false",
        excerpt: "FALSE: AI-generated videos of 'Hurricane Melissa' destruction depicted non-existent events. NOAA and NHC confirmed no hurricane named Melissa occurred in 2025. The videos were used to solicit fraudulent donations, matching previous AI disaster fraud campaigns.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [94, 89, 97, 92, 86],
            labels: ["Temporal", "Morphing", "Hand Anom", "Text Fail", "Audio"],
            colors: ["#ef4444", "#f59e0b", "#ef4444", "#f59e0b", "#3b82f6"]
        }
    },
    {
        id: 1,
        title: "RFK Jr. Antidepressants Claims: Medical Consensus Misrepresented",
        slug: "rfk-antidepressants-target-2025",
        category: "Health & Medical",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "pill",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "16 min",
        verdict: "misleading",
        excerpt: "MISLEADING: RFK Jr.'s claims about antidepressants as targets for removal misrepresented medical consensus. Major psychiatric associations and FDA data contradict the characterization. Experts warned statements could discourage needed mental health treatment.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [2.13, 1.97, 1.89, 1.69, 1.52, 1.0],
            labels: ["Amitriptyline", "Escitalopram", "Venlafaxine", "Sertraline", "Fluoxetine", "Placebo"],
            colors: ["#10b981", "#10b981", "#3b82f6", "#3b82f6", "#3b82f6", "#64748b"]
        }
    },
    {
        id: 1,
        title: "'Premature Sexualization' Narrative: How Educational Materials Are Misrepresented",
        slug: "premature-sexualization-narrative-2025",
        category: "International",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "book-open",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "16 min",
        verdict: "misleading",
        excerpt: "MISLEADING: Claims about educational materials promoting 'premature sexualization' consistently misrepresent actual content. Brazil's 'kit gay' never existed as described. Internationally, viral claims typically involve age-appropriate materials or images taken out of context.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [32, 28, 18, 14, 8],
            labels: ["Decontext", "Age Misrep", "Conflation", "Fabrication", "Misattrib"],
            colors: ["#ef4444", "#f59e0b", "#3b82f6", "#06b6d4", "#10b981"]
        }
    },
    {
        id: 0,
        title: "Brazil Election Integrity Claims: Debunked Fraud Allegations Persist",
        slug: "brazil-election-integrity-2025",
        category: "International",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "vote",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "16 min",
        verdict: "false",
        excerpt: "FALSE: Claims that Brazil's 2022 election was rigged through electronic voting machine fraud have been comprehensively debunked. The TSE, OAS, Carter Center, and Brazil's own military audit found no evidence of fraud. Bolsonaro was banned from office until 2030 and indicted for an alleged coup plot.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [65, 85, 100, 60, 45, 70]
        }
    },
    {
        id: 1,
        title: "Nigeria NIN-Bank Account Linking Claims: Separating Policy from Panic",
        slug: "nigeria-nin-bank-access-2025",
        category: "Fact Check",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "credit-card",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "misleading",
        excerpt: "MISLEADING: Claims about bank account freezes due to missing NIN were exaggerated. CBN mandated NIN-BVN linking, but deadlines were extended repeatedly and no mass freezes occurred. The policy is real; the panic was manufactured.",
        chart: {
            type: "line",
            color: "#3b82f6",
            data: [42, 68, 89, 98, 105]
        }
    },
    {
        id: 0,
        title: "African Tetanus/Polio Sterilization Claims Debunked",
        slug: "african-vaccine-sterilization-2025",
        category: "African Misinformation",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "syringe",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "16 min",
        verdict: "false",
        excerpt: "FALSE: Claims that WHO and UNICEF vaccines caused mass sterilization in Africa are completely false. The 2014 Kenya Catholic bishops controversy was debunked by WHO-certified labs. These recycled conspiracy theories have contributed to deadly vaccine hesitancy.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [2, 8, 15, 12, 18]
        }
    },
    {
        id: 0,
        title: "Ebola Organ Theft Claims: Deadly Misinformation Debunked",
        slug: "ebola-organ-theft-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "shield-alert",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "16 min",
        verdict: "false",
        excerpt: "FALSE: Conspiracy theories claiming Ebola was a cover for organ harvesting fueled deadly attacks on health workers in West Africa. At least 8 people were killed in Guinea. WHO, CDC, and multiple investigations found zero evidence of organ theft.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [49, 759, 5864, 20206, 24907, 27443, 28147, 28601, 28616]
        }
    },
    {
        id: 0,
        title: "Ebola Outbreak 2025 (DRC): Misinformation Analysis",
        slug: "ebola-outbreak-drc-2025",
        category: "Fact Check",
        tagClass: "tag-cyan",
        catClass: "cat-factcheck",
        icon: "activity",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "16 min",
        verdict: "mixed",
        excerpt: "MIXED: The 2025 DRC Ebola outbreak is real and verified by WHO. However, dangerous misinformation about false cures (salt water, onions) and transmission myths has accompanied the outbreak. Community distrust of health workers reflects legitimate historical grievances.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [32, 24, 21, 14, 9],
            labels: ["False Cures", "Transmission", "Conspiracy", "Vaccines", "Distrust"],
            colors: ["#ef4444", "#f59e0b", "#3b82f6", "#06b6d4", "#10b981"]
        }
    },
    {
        id: 0,
        title: "Brazil Supreme Court Bias Claims: Examining the Evidence",
        slug: "brazil-supreme-court-bias-2025",
        category: "International",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "scale",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "16 min",
        verdict: "misleading",
        excerpt: "MISLEADING: Claims of systematic bias in Brazil's STF conflate legitimate judicial actions against documented threats to democracy with political persecution. The X/Twitter ban followed established legal procedures after non-compliance with court orders.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [12, 9, 8, 14, 15, 10],
            labels: ["Election Pro-Gov", "Election Anti", "Corruption Pro", "Corruption Anti", "Rights Pro", "Rights Anti"],
            colors: ["#3b82f6", "#ef4444", "#3b82f6", "#ef4444", "#3b82f6", "#ef4444"]
        }
    },
    {
        id: 0,
        title: "Nigeria Petroleum Surcharge Hoax: False Claims Cause Public Panic",
        slug: "nigeria-petroleum-surcharge-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "fuel",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "false",
        excerpt: "FALSE: Viral claims about new petroleum surcharges in Nigeria are completely fabricated. NNPCL, NMDPRA, and the Presidency all issued denials. TheCable FactCheck, Africa Check, and Dubawa rated the claims FALSE. The hoax caused unnecessary panic buying at fuel stations.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [2, 15, 45, 120, 85, 40, 12]
        }
    },
    {
        id: 0,
        title: "Ebola Vaccine Sterility Claims: The Conspiracy That Endangers Public Health",
        slug: "ebola-vaccine-sterility-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "syringe",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "16 min",
        verdict: "false",
        excerpt: "FALSE: Claims that Ebola vaccines cause infertility are dangerous misinformation with no scientific basis. Over 500,000 vaccinations administered with zero fertility-related adverse events. These conspiracy theories have hindered outbreak response and cost lives.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [45, 20, 15, 10, 85, 100, 70, 25, 20, 30, 65]
        }
    },
    {
        id: 0,
        title: "SA Zulu King Salary Claims: Royal Funding vs. Exaggerated Figures",
        slug: "sa-zulu-king-salary-2025",
        category: "Fact Check",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "crown",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "misleading",
        excerpt: "MISLEADING: Claims that King Misuzulu kaZwelithini receives R66 million in annual 'salary' conflate personal stipend (~R1.8M) with Royal Household operational budget (~R65M). Africa Check confirmed the King's actual personal allowance is a fraction of viral claims.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [1.8, 65, 66],
            labels: ["Personal Stipend", "Household Budget", "Viral Claim"],
            colors: ["#10b981", "#f59e0b", "#ef4444"]
        }
    },
    {
        id: 0,
        title: "IDF Soldier Captivity Image: AI-Generated Propaganda Exposed",
        slug: "idf-soldier-captivity-image-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "shield-alert",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "13 min",
        verdict: "false",
        excerpt: "FALSE: Images claiming to show IDF soldiers captured by Hezbollah or Hamas were AI-generated fakes. Full Fact, Reuters, and multiple fact-checkers identified obvious AI artifacts. The IDF confirmed no soldiers were captured in the depicted scenarios.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [85, 72, 68, 91, 95],
            labels: ["Hand Errors", "Uniform", "Face", "Light", "Meta"],
            colors: ["#ef4444", "#f59e0b", "#3b82f6", "#10b981", "#06b6d4"]
        }
    },
    {
        id: 0,
        title: "Hollywood Sign AI Fire Image: Viral Fake During LA Wildfires",
        slug: "hollywood-sign-ai-fire-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "flame",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "12 min",
        verdict: "false",
        excerpt: "FALSE: AI-generated images showing the Hollywood sign engulfed in flames went viral during the January 2025 LA wildfires. The sign was never in danger. Multiple telltale AI artifacts identified, including extra 'L' in HOLLLYWOOD.",
        chart: {
            type: "bar",
            color: "#3b82f6",
            data: [5.2, 0.8],
            labels: ["AI Image Views (M)", "Debunk Views (M)"],
            colors: ["#ef4444", "#10b981"]
        }
    },
    {
        id: 0,
        title: "Syria Assad Underground Photo: AI-Generated Images Exposed",
        slug: "syria-assad-underground-photo-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "image-off",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "false",
        excerpt: "FALSE: Viral images claiming to show Assad's underground bunker or prison cells were AI-generated or misattributed. Some from Vietnam War museum, others showed clear AI artifacts. Real atrocities at Saydnaya documented separately.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [0.5, 3.2, 8.5, 12.1, 9.8, 6.2, 3.1]
        }
    },
    {
        id: 0,
        title: "NSF Grant Termination Claims: Policy vs. Conspiracy",
        slug: "nsf-grant-termination-2025",
        category: "Fact Check",
        tagClass: "tag-cyan",
        catClass: "cat-factcheck",
        icon: "graduation-cap",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "15 min",
        verdict: "context",
        excerpt: "CONTEXT: NSF terminated 1,500+ grants, ~90% DEI-related per Ted Cruz's list. Claims about targeting 'climate science' mostly false. However, concerns about chilling effects on research are legitimate.",
        chart: {
            type: "donut",
            color: "#3b82f6",
            data: 90
        }
    },
    {
        id: 0,
        title: "JD Vance 'Misinformation' Comments: The Full Context",
        slug: "vance-misinformation-comments-2025",
        category: "Fact Check",
        tagClass: "tag-cyan",
        catClass: "cat-factcheck",
        icon: "message-circle",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "context",
        excerpt: "CONTEXT: Vance made legitimate points about weaponized 'misinformation' labels, supported by Knight Foundation data. But he also spread claims rated false. Both sides selectively quoted his remarks.",
        chart: {
            type: "donut",
            color: "#ef4444",
            data: 45
        }
    },
    {
        id: 0,
        title: "Southport Stabbing Riots: How False Claims Fueled Violence",
        slug: "southport-stabbing-misinfo-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "alert-octagon",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "16 min",
        verdict: "false",
        excerpt: "FALSE: Claims the Southport attacker was a Muslim asylum seeker are completely false. Court records confirm Axel Rudakubana was born in Cardiff, Wales. False claims triggered riots in 20+ UK cities.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [3, 8, 12, 15, 22, 18, 10]
        }
    },
    {
        id: 0,
        title: "Meta Third-Party Fact-Check Exit: What Actually Changed",
        slug: "meta-tpfc-exit-2025",
        category: "Fact Check",
        tagClass: "tag-cyan",
        catClass: "cat-factcheck",
        icon: "share-2",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "15 min",
        verdict: "context",
        excerpt: "CONTEXT: Meta ended TPFC partnerships and transitions to Community Notes. Claims Meta 'abandoned moderation' are FALSE - content removal policies remain. Change affects labeling, not removal.",
        chart: {
            type: "line",
            color: "#3b82f6",
            data: [0.5, 2.1, 8.5, 12.3, 15.8, 0]
        }
    },
    {
        id: 0,
        title: "Pete Hegseth Signalgate: Security Concerns vs. Precedent",
        slug: "hegseth-signalgate-2025",
        category: "Fact Check",
        tagClass: "tag-cyan",
        catClass: "cat-factcheck",
        icon: "lock",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "16 min",
        verdict: "context",
        excerpt: "CONTEXT: CISA recommends Signal for certain communications. Core issues are Federal Records Act compliance and classification. Both 'security breach' and 'nothing wrong' framings oversimplify.",
        chart: {
            type: "bar",
            color: "#06b6d4",
            data: [1, 2, 5, 4, 3, 3, 2]
        }
    },
    {
        id: 0,
        title: "D.C. Murder Rate Comparison: Cherry-Picked Statistics",
        slug: "dc-murder-rate-comparison-2025",
        category: "Fact Check",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "bar-chart-2",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "misleading",
        excerpt: "MISLEADING: D.C. violent crime hit 30-year low in 2024-2025 per DOJ. Per-capita comparisons with smaller cities are methodologically flawed. 2024 homicides down 25% from 2023 spike.",
        chart: {
            type: "line",
            color: "#3b82f6",
            data: [479, 360, 239, 195, 131, 162, 198, 232, 174, 165]
        }
    },
    {
        id: 0,
        title: "Portland's 'Burning' Narrative: Recycled 2020 Footage",
        slug: "portland-burning-narrative-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "flame",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "false",
        excerpt: "FALSE: Claims Portland was 'destroyed' or 'burning' in 2025 used recycled 2020 footage. Fire department data shows minimal incidents. Police Chief: protests confined to one city block of 145 sq miles.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [95, 12, 3]
        }
    },
    {
        id: 0,
        title: "Tren de Aragua Gang Claims: Real Gang, Exaggerated Threat",
        slug: "tda-gang-claims-2025",
        category: "Fact Check",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "users",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "mixed",
        excerpt: "MIXED: Tren de Aragua is a real Venezuelan gang with some US presence. However, claims of cities being 'taken over' are exaggerated. Aurora's Republican mayor called viral claims 'grossly exaggerated.' FBI estimates few hundred members nationwide - a law enforcement concern but not the invasion depicted in viral posts.",
        chart: {
            type: "bar",
            color: "#f59e0b",
            data: [10000, 300],
            labels: ["Viral Claims", "FBI Estimate"],
            colors: ["#ef4444", "#10b981"]
        }
    },
    {
        id: 0,
        title: "Ukraine-Russia War Origin Claims: False Narrative Debunked",
        slug: "ukraine-russia-war-origin-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "globe",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "16 min",
        verdict: "false",
        excerpt: "FALSE: Claims that Ukraine started the war with Russia are false. Russia launched a full-scale invasion on Feb 24, 2022. UN General Assembly condemned invasion 141-5. ICJ ordered Russia to cease operations. ICC issued arrest warrant for Putin. Putin announced the 'special military operation' - Ukraine did not attack Russia.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [141, 5, 35],
            labels: ["Condemned", "Supported", "Abstained"],
            colors: ["#10b981", "#ef4444", "#f59e0b"]
        }
    },
    {
        id: 0,
        title: "DOGE Gaza Condom Claim: Misleading Foreign Aid Framing",
        slug: "doge-gaza-condom-claim-2025",
        category: "Fact Check",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "alert-triangle",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "11 min",
        verdict: "misleading",
        excerpt: "MISLEADING: DOGE's viral claim about 'spending on condoms in Gaza' misrepresented standard USAID global health programming. The spending was part of long-standing family planning programs in 40+ countries - not a Gaza-specific initiative. The claim manufactured outrage by stripping context from routine public health expenditures.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [45, 30, 10, 10, 5],
            labels: ["Africa", "Asia", "MENA", "LatAm", "Other"],
            colors: ["#3b82f6", "#10b981", "#f59e0b", "#06b6d4", "#64748b"]
        }
    },
    {
        id: 0,
        title: "Reciprocal Tariff Chart: White House Used Fabricated Data",
        slug: "reciprocal-tariff-chart-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "bar-chart-2",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "12 min",
        verdict: "false",
        excerpt: "FALSE: The White House 'reciprocal tariff' chart contained fabricated numbers. Claimed rates (China 67%, EU 39%, Japan 46%) don't match WTO data. Real rates: China 7.5%, EU 5.1%, Japan 4.2%. Numbers were calculated by dividing trade deficit by imports - a formula with no relationship to actual tariffs.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [67, 7.5],
            labels: ["WH Claim (China)", "Actual WTO Rate"],
            colors: ["#ef4444", "#3b82f6"]
        }
    },
    {
        id: 0,
        title: "Inflation 'Historical Cap' Claim: Not Worst in History",
        slug: "inflation-historical-cap-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "trending-up",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "15 min",
        verdict: "false",
        excerpt: "FALSE: Claims that recent inflation reached 'historical caps' or was worst in history are false. The 2022 peak of 9.1% was a 40-year high, but well below 1980's 14.8%. By 2025, inflation returned near the Fed's 2% target. Characterizing recent inflation as historically unprecedented misrepresents the data.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [12.3, 13.3, 14.8, 8.9, 6.1, 3.4, 1.5, 1.4, 9.1, 2.6],
            labels: ["1974", "1979", "1980", "1981", "1990", "2000", "2010", "2020", "2022", "2025"]
        }
    },
    {
        id: 0,
        title: "'Phony' BLS Statistics Claims: Assault on Government Data",
        slug: "phony-bls-statistics-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "database",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "false",
        excerpt: "FALSE: Claims that BLS data is 'phony' or manipulated are false. The BLS operates independently with publicly documented methodology. Data revisions are standard practice, not manipulation. 78% of economists express high trust in BLS data. The 2025 benchmark revision was within historical norms.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [78, 18, 4],
            labels: ["High Trust", "Moderate", "Low Trust"],
            colors: ["#10b981", "#f59e0b", "#ef4444"]
        }
    },
    {
        id: 0,
        title: "Measles 'Natural' Cures Claims: Dangerous Health Misinformation",
        slug: "measles-natural-cures-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "heart-pulse",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "15 min",
        verdict: "false",
        excerpt: "FALSE: Claims that measles can be treated with 'natural' remedies like vitamin A megadoses, elderberry, or essential oils are dangerous misinformation. No 'natural cure' for measles exists. The only proven prevention is vaccination. Measles cases surged as vaccination rates declined.",
        chart: {
            type: "hbar",
            color: "#f59e0b",
            data: [505, 57, 2],
            labels: ["Cases", "Hospitalizations", "Deaths"],
            colors: ["#f59e0b", "#ef4444", "#dc2626"]
        }
    },
    {
        id: 0,
        title: "mRNA Vaccine Misinformation: Persistent False Claims",
        slug: "mrna-vaccine-misinfo-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "shield-x",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "16 min",
        verdict: "false",
        excerpt: "FALSE: Claims that mRNA vaccines alter DNA, contain microchips, or cause mass harm are scientifically false. mRNA cannot integrate into DNA. COVID vaccines have prevented an estimated 3+ million US deaths. Billions of doses administered with extensive safety monitoring confirm the vaccines are safe and effective.",
        chart: {
            type: "bar",
            color: "#10b981",
            data: [95, 94.1, 3.2],
            labels: ["Efficacy %", "Safety %", "Deaths Prevented (M)"],
            colors: ["#10b981", "#10b981", "#3b82f6"]
        }
    },
    {
        id: 0,
        title: "Tylenol and Autism Controversy: Misrepresented Science",
        slug: "tylenol-autism-claims-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "pill",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "14 min",
        verdict: "false",
        excerpt: "FALSE: Claims linking Tylenol during pregnancy to autism misrepresent scientific evidence. FDA, NIH, and major medical organizations confirm acetaminophen remains safe when used as directed. Correlation studies cited by RFK Jr. and allies do not establish causation. No mechanism has been identified.",
        chart: {
            type: "donut",
            color: "#10b981",
            data: 85
        }
    },
    {
        id: 0,
        title: "Birthright Citizenship EO: Constitutional Crisis in Courts",
        slug: "birthright-citizenship-eo-2025",
        category: "Fact Check",
        tagClass: "tag-cyan",
        catClass: "cat-factcheck",
        icon: "scale",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "16 min",
        verdict: "context",
        excerpt: "CONTEXT NEEDED: Trump's EO challenging birthright citizenship was blocked by multiple federal courts. Order contradicts 127 years of precedent (Wong Kim Ark, 1898). Supreme Court to rule in 2026. While administration raised historical arguments, an executive order cannot override the 14th Amendment.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [1, 2, 3, 4, 5, 6, 7],
            labels: ["EO Signed", "Lawsuit", "Injunction", "9th Cir", "SCOTUS", "Cert", "Ruling"],
            colors: ["#ef4444", "#f59e0b", "#10b981", "#10b981", "#f59e0b", "#3b82f6", "#06b6d4"]
        }
    },
    {
        id: 0,
        title: "80th UN General Assembly Claims: A Comprehensive Fact-Check",
        slug: "un-general-assembly-2025",
        category: "Fact Check",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "globe",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "20 min",
        verdict: "mixed",
        excerpt: "MIXED: Multiple false claims from UNGA 2025. Geneva relocation claim is FALSE - UN confirmed NYC session on Sept 8. Trump's 'inflation defeated' claim FALSE - CPI worsening since May. 'London wants sharia law' is a debunked conspiracy theory. Climate claims MISLEADING - 80% of global electricity growth from renewables, solar/wind at 16% of U.S. electricity (surpassing coal).",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [3, 2, 1],
            labels: ["FALSE Claims", "MISLEADING", "DISPUTED"],
            colors: ["#ef4444", "#f59e0b", "#06b6d4"]
        }
    },
    {
        id: 1,
        title: "Trade War 2.0 Tariff Claims: A Comprehensive Fact-Check",
        slug: "trade-war-tariffs-2025",
        category: "Fact Check",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "dollar-sign",
        date: "Jan 2, 2026",
        sources: "15 Sources",
        readTime: "22 min",
        verdict: "misleading",
        excerpt: "MISLEADING: Tariff claims misrepresent economic reality. 'Foreign countries pay tariffs' is FALSE - U.S. importers pay 100%. At 11.2% effective rate (highest since 1943), retail prices up 4.9pp. Average household cost: $1,100 in 2025, rising to $1,400 in 2026. Manufacturing jobs DOWN 40,000+ since April. Largest tax increase as % of GDP since 1993.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [8.99, 7.5, 7.5, 6.5, 6.0, 4.3, 4.9],
            labels: ["Apparel", "Coffee/Tea", "Cameras", "Furniture", "Imports", "Domestic", "Retail"],
            colors: ["#ef4444", "#ef4444", "#ef4444", "#f59e0b", "#f59e0b", "#f59e0b", "#3b82f6"]
        }
    },
    {
        id: 1,
        title: "Zohran Mamdani NYC Election Claims Debunked",
        slug: "mamdani-nyc-election-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "x-circle",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "18 min",
        verdict: "false",
        excerpt: "All major claims targeting NYC's first Muslim mayor rated FALSE. PolitiFact: Sharia law claim 'Pants on Fire' - Mamdani supports gay rights, decriminalizing sex work (antithesis of Sharia). Trump's 'communist' label debunked. Post-election hoaxes about NYPD resignations and trucking boycotts traced to satire/fabrications. CSOHATE: 35,522 posts analyzed, 72% used extremist labeling.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [120, 450, 890, 1850, 4200, 8900, 12500],
            colors: ["#ef4444"]
        }
    },
    {
        id: 2,
        title: "225 Executive Orders in 2025: The Numbers Are Real, But Context Matters",
        slug: "225-executive-orders-2025",
        category: "Fact Check",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "file-text",
        date: "Jan 2, 2026",
        sources: "18 Sources",
        readTime: "20 min",
        verdict: "misleading",
        excerpt: "Trump signed 225 executive orders in 2025 (EO 14147-14371) - the highest first-year total since FDR's 568 in 1933. First 100 days: 143 EOs (record). Day 1: 26 EOs (record). Numbers are TRUE, but 'dictatorship' claims lack context - courts have blocked 12+ orders. Pew: 51% say 'too much', 27% say 'about right'.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [568, 225, 77, 55, 39, 54, 57],
            colors: ["#3b82f6", "#ef4444", "#06b6d4", "#f59e0b", "#06b6d4", "#f59e0b", "#06b6d4"]
        }
    },
    {
        id: 1,
        title: "2025 Government Shutdown - Longest in U.S. History",
        slug: "government-shutdown-2025",
        category: "Fact Check",
        tagClass: "tag-green",
        catClass: "cat-factcheck",
        icon: "landmark",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "18 min",
        verdict: "true",
        excerpt: "CONFIRMED: At 43 days (Oct 1 - Nov 12, 2025), this shutdown surpassed the 34-day 2018-2019 record. DOGE's $150B savings claim disputed - NPR found tracker 'riddled with errors,' Partnership for Public Service estimates it COST $135B. 317,000 federal employees left by year's end.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [43, 34, 21, 16, 12],
            labels: ["2025", "2018-19", "1995-96", "2013", "1977"],
            colors: ["#ef4444", "#3b82f6", "#06b6d4", "#10b981", "#f59e0b"]
        }
    },
    {
        id: 1,
        title: "Charlie Kirk Assassination Conspiracy Theories Debunked",
        slug: "charlie-kirk-assassination-conspiracy-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "x-circle",
        date: "Jan 2, 2026",
        sources: "15 Sources",
        readTime: "18 min",
        verdict: "false",
        excerpt: "Comprehensive debunking of conspiracy theories surrounding Charlie Kirk's September 2025 assassination. Israeli involvement, Ukrainian plots, Groyper connections, 'staged death' claims, and Egyptian aircraft surveillance - all rated FALSE. Alex Jones debunked Candace Owens: '66% of her location claims were wrong.'",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [10, 100, 85, 70, 55, 40, 25],
            colors: ["#ef4444", "#10b981"]
        }
    },
    {
        id: 1,
        title: "Gaza Ceasefire Deal Attribution: Who Gets the Credit?",
        slug: "gaza-ceasefire-attribution-2025",
        category: "Fact Check",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "scale",
        date: "Jan 2, 2026",
        sources: "16 Sources",
        readTime: "20 min",
        verdict: "misleading",
        excerpt: "Both Biden and Trump oversimplify credit for the January 2025 Gaza ceasefire. Biden's 'exact framework' claim is partially true - similar structure but key differences. Trump's 'could only happen' due to his victory is partially true - his team applied real pressure on Israel. Experts agree BOTH administrations contributed. The ceasefire collapsed after 62 days.",
        chart: {
            type: "line",
            color: "#f59e0b",
            data: [30, 35, 40, 45, 55, 75, 100],
            colors: ["#3b82f6", "#ef4444"]
        }
    },
    {
        id: 2,
        title: "LA Wildfires Misinformation January 2025: Complete Fact-Check",
        slug: "la-wildfires-misinfo-jan-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "flame",
        date: "Jan 2, 2026",
        sources: "17 Sources",
        readTime: "22 min",
        verdict: "false",
        excerpt: "Comprehensive debunking of January 2025 LA wildfire misinformation: AI Hollywood sign fakes with extra 'L', DEI conspiracy theories targeting Fire Chief Crowley, geo-engineered fire claims by Stew Peters and Alex Jones, QAnon Getty tunnel myths, Chinese disinfo campaigns, and FEMA funding lies - all rated FALSE.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [5, 75, 100, 80, 60, 45, 35, 25],
            colors: ["#ef4444", "#3b82f6", "#f59e0b", "#06b6d4"]
        }
    },
    {
        id: 1,
        title: "Los Angeles ICE Raids and Riots 2025: Fact vs. Fiction",
        slug: "la-ice-raids-riots-2025",
        category: "Immigration Policy",
        tagClass: "tag-cyan",
        catClass: "cat-factcheck",
        icon: "shield-alert",
        date: "Jan 2, 2026",
        sources: "18 Sources",
        readTime: "22 min",
        verdict: "mixed",
        excerpt: "DHS claimed 70% of June 2025 LA ICE raid arrestees were criminals; Human Rights Watch found 66% had NO criminal history. Viral videos debunked as 2020 footage. 2,000 National Guard deployed, 700 Marines activated. 9th Circuit ruled 'reasonable suspicion cannot be based on generalizations.'",
        chart: {
            type: "hbar",
            color: "#06b6d4",
            data: [70, 66, 29, 5],
            labels: ["DHS: Criminal Record", "HRW: No Criminal History", "HRW: Minor Infractions", "HRW: Violent Convictions"],
            colors: ["#ef4444", "#10b981", "#f59e0b", "#ef4444"]
        }
    },
    {
        id: 1,
        title: "Liberation Day Address Claims: A Comprehensive Fact-Check",
        slug: "liberation-day-address-2025",
        category: "Fact Check",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "scale",
        date: "Jan 2, 2026",
        sources: "17 Sources",
        readTime: "18 min",
        verdict: "mixed",
        excerpt: "Trump's April 2, 2025 'Liberation Day' tariff announcement contained multiple false claims. 'Reciprocal tariffs' were NOT based on actual foreign rates but trade-balance targets. EU's claimed 39% tariff is actually ~3%. Revenue projections of $600B vastly overstated - actual: $226-330B.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [39, 3, 67, 7.5, 46, 4],
            colors: ["#ef4444", "#10b981", "#ef4444", "#10b981", "#ef4444", "#10b981"]
        }
    },
    {
        id: 80,
        title: "The Fairness Doctrine: How America Lost Balance in Broadcasting",
        slug: "fairness-doctrine-history",
        category: "Historical Analysis",
        tagClass: "tag-amber",
        catClass: "cat-analysis",
        icon: "scale",
        date: "Dec 31, 2025",
        sources: "10 Sources",
        readTime: "12 min",
        verdict: "context",
        excerpt: "From 1949 to 1987, the FCC required broadcasters to present balanced viewpoints. Its repeal unleashed Rush Limbaugh, Fox News, and the partisan media landscape we know today. Talk radio stations exploded from 400 to 2,000+ within five years.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [200, 360, 800, 1000, 1200, 1300]
        }
    },
    {
        id: 79,
        title: "Operation Mockingbird: When the CIA Controlled the Press",
        slug: "operation-mockingbird-cia",
        category: "Historical Analysis",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "radio",
        date: "Dec 31, 2025",
        sources: "10 Sources",
        readTime: "15 min",
        verdict: "context",
        excerpt: "For decades, 400+ American journalists worked as CIA assets. Frank Wisner called his network the 'Mighty Wurlitzer.' The Church Committee exposed it all—but did the practice ever truly end?",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [400, 50, 1000, 3000],
            colors: ["#ef4444", "#f59e0b", "#3b82f6", "#10b981"]
        }
    },
    {
        id: 78,
        title: "Edward Bernays: The Father of Spin",
        slug: "edward-bernays-propaganda",
        category: "Historical Analysis",
        tagClass: "tag-amber",
        catClass: "cat-analysis",
        icon: "megaphone",
        date: "Dec 31, 2025",
        sources: "10 Sources",
        readTime: "14 min",
        verdict: "context",
        excerpt: "Freud's nephew invented modern PR by privatizing WWI propaganda techniques. His 'Torches of Freedom' campaign convinced women smoking was feminist liberation. He later helped overthrow Guatemala's democracy for United Fruit Company.",
        chart: {
            type: "line",
            color: "#3b82f6",
            data: [5, 8, 12, 18, 24, 33],
            colors: ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"]
        }
    },
    {
        id: 76,
        title: "Internet Research Agency: Russia's Troll Farm That Reached 126 Million Americans",
        slug: "internet-research-agency-2016",
        category: "Foreign Influence",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "globe",
        date: "Dec 31, 2025",
        sources: "12 Sources",
        readTime: "16 min",
        verdict: "context",
        excerpt: "A St. Petersburg office building became the command center for the largest foreign influence operation in American history. 80,000 Facebook posts, 126 million Americans reached, real protests organized by fake accounts—all for under $100,000/month.",
        chart: {
            type: "bar",
            color: "#3b82f6",
            data: [126, 20, 1.4, 0.5],
            colors: ["#3b82f6", "#f59e0b", "#06b6d4", "#ef4444"]
        }
    },
    {
        id: 75,
        title: "Cambridge Analytica: The $5 Billion Data Scandal",
        slug: "cambridge-analytica-2016",
        category: "Data Privacy",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "database",
        date: "Dec 31, 2025",
        sources: "12 Sources",
        readTime: "18 min",
        verdict: "context",
        excerpt: "A personality quiz harvested 87 million Facebook profiles. Psychographic targeting delivered personalized disinformation invisible to fact-checkers. The FTC's $5 billion fine was the largest privacy penalty in history—and Facebook's stock rose on the news.",
        chart: {
            type: "line",
            color: "#3b82f6",
            data: [5, 20, 30, 50, 100, 95, 80, 60],
            colors: ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#64748b"]
        }
    },
    {
        id: 74,
        title: "QAnon Network Analysis: From 4chan to Congress",
        slug: "qanon-network-analysis",
        category: "Network Analysis",
        tagClass: "tag-amber",
        catClass: "cat-analysis",
        icon: "network",
        date: "Dec 31, 2025",
        sources: "12 Sources",
        readTime: "18 min",
        verdict: "context",
        excerpt: "How anonymous 4chan posts became a political force with congressional representation. Tracing QAnon's spread through coordinated amplification, key influencers like MTG, and platform responses. 21% of January 6 arrests had QAnon ties.",
        chart: {
            type: "bar",
            color: "#3b82f6",
            data: [175, 77.1, 63.7],
            colors: ["#3b82f6", "#06b6d4", "#10b981"]
        }
    },
    {
        id: 73,
        title: "Partisan Influencer Networks: The Amplification Machine",
        slug: "partisan-influencer-networks",
        category: "Network Analysis",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "users",
        date: "Dec 31, 2025",
        sources: "12 Sources",
        readTime: "16 min",
        verdict: "context",
        excerpt: "False news spreads 70% more likely to be retweeted. 47% identify influencers as top misinformation threat. Analysis of parasocial trust, financial incentives, and state-sponsored influencer operations targeting democratic elections.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [47, 47, 38, 35],
            labels: ["Influencers", "Politicians", "Foreign Actors", "AI/Bots"],
            colors: ["#ef4444", "#f59e0b", "#3b82f6", "#06b6d4"]
        }
    },
    {
        id: 72,
        title: "YouTube Radicalization Pipeline: Algorithmic Rabbit Holes Examined",
        slug: "youtube-radicalization-pipeline",
        category: "Platform Analysis",
        tagClass: "tag-amber",
        catClass: "cat-analysis",
        icon: "play-circle",
        date: "Dec 31, 2025",
        sources: "12 Sources",
        readTime: "20 min",
        verdict: "mixed",
        excerpt: "The 'rabbit hole' hypothesis is more contested than narratives suggest. 2025 PNAS study: algorithm has limited impact on beliefs. But off-platform viewing may drive more radicalization than YouTube's internal recommendations.",
        chart: {
            type: "donut",
            color: "#ef4444",
            data: [14, 7, 2],
            colors: ["#ef4444", "#f59e0b", "#10b981"]
        }
    },
    {
        id: 71,
        title: "Cable News Narrative Laundering: How Fringe Becomes Mainstream",
        slug: "cable-news-narrative-laundering",
        category: "Media Analysis",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "tv",
        date: "Dec 31, 2025",
        sources: "10 Sources",
        readTime: "15 min",
        verdict: "context",
        excerpt: "The 'attention backbone' pipeline: fringe → partisan → mainstream. Cable networks grew significantly more polarized over 10 years. Primetime is the most polarized time slot. 'Sanewashing' normalizes extreme rhetoric.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [45, 55, 68, 78, 82, 88]
        }
    },
    {
        id: 70,
        title: "Wire Service Amplification: One Story, 600 Outlets",
        slug: "wire-service-amplification",
        category: "Media Analysis",
        tagClass: "tag-amber",
        catClass: "cat-analysis",
        icon: "share-2",
        date: "Dec 31, 2025",
        sources: "12 Sources",
        readTime: "14 min",
        verdict: "context",
        excerpt: "Wire services syndicate to 500-600+ outlets simultaneously. False news reaches 1,500 people 6x faster than truth. The illusory truth effect makes repeated exposure dangerous—and syndication maximizes repetition.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [6, 1],
            colors: ["#ef4444", "#10b981"]
        }
    },
    {
        id: 69,
        title: "Primetime Special Legitimization: When Networks Give Platforms",
        slug: "primetime-special-legitimization",
        category: "Media Analysis",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "monitor",
        date: "Dec 31, 2025",
        sources: "10 Sources",
        readTime: "12 min",
        verdict: "context",
        excerpt: "Networks have NO legal obligation for 'equal time'—Fairness Doctrine abolished 1987. Editorial discretion is an active choice. 94% of journalists see misinformation as major problem; only 8% think orgs handle it well.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [94, 8],
            colors: ["#ef4444", "#10b981"]
        }
    },
    {
        id: 68,
        title: "The Protocols of the Elders of Zion: Anatomy of a Fabrication",
        slug: "protocols-elders-zion",
        category: "Historical Analysis",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "book-x",
        date: "Dec 30, 2025",
        sources: "15 Sources",
        readTime: "35 min",
        verdict: "false",
        excerpt: "The most destructive antisemitic forgery in history. First exposed as plagiarism in 1921, yet still circulating today. From Tsarist Russia to Henry Ford to Hamas—how a fabricated text became infrastructure for genocide.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [10, 30, 40, 50, 70, 60, 90, 85, 95, 75, 80],
            colors: ["#ef4444", "#ef4444", "#ef4444", "#ef4444"]
        },
        registryId: "protocols-elders-zion",
        relatedIds: ["american-political-disinfo", "qanon-network-analysis"]
    },
    {
        id: 67,
        title: "The Architecture of Perception: A History of American Media Disinformation",
        slug: "american-disinformation-timeline",
        category: "Analysis",
        tagClass: "tag-amber",
        catClass: "cat-analysis",
        icon: "history",
        date: "Dec 30, 2025",
        sources: "77 Sources",
        readTime: "45 min",
        verdict: "context",
        excerpt: "From Yellow Journalism to AI deepfakes: 130 years of manufactured reality. Tracing the evolution from the Creel Committee to Operation Mockingbird, the Fairness Doctrine to Section 230, and the rise of the 'Censorship Industrial Complex.'",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [1, 2, 3, 3, 4, 5, 6, 7, 8, 9],
            labels: ["1898 USS Maine", "1917 Creel Comm.", "1948 Smith-Mundt", "1949 Fairness Doc.", "1987 Doc. Repeal", "1996 Section 230", "2012 S-M Modern.", "2016 Cambridge A.", "2020 CISA/EIP", "2024 AI Deepfakes"],
            colors: ["#ef4444", "#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#06b6d4", "#f59e0b", "#ef4444", "#f59e0b", "#ef4444"]
        }
    },
    {
        id: 66,
        title: "The Architecture of Deception: Global Disinformation Landscape 2024-2025",
        slug: "disinformation-architecture-2025",
        category: "Analysis",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "network",
        date: "Dec 30, 2025",
        sources: "55 Sources",
        readTime: "35 min",
        verdict: "context",
        excerpt: "Forensic analysis of the industrial-grade disinformation complex: $2.6B ad revenue pipeline, 1,200+ pink slime sites, $10M Tenet Media Russian funding, and the asymmetric infrastructure between left and right-wing manipulation ecosystems.",
        chart: {
            type: "donut",
            color: "#ef4444",
            data: [2.6, 5.6],
            colors: ["#ef4444", "#3b82f6"]
        }
    },
    {
        id: 65,
        title: "Clickbait Propaganda: 5 Case Studies in December 2025 Disinformation",
        slug: "clickbait-propaganda-december-2025",
        category: "Disinformation Analysis",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "newspaper",
        date: "Dec 30, 2025",
        sources: "18 Sources",
        readTime: "22 min",
        verdict: "false",  // Debunking multiple false narratives
        excerpt: "Five viral disinformation campaigns deconstructed: Infowars 'Deep State defeat' (still owes $1.5B), Epstein photo 'hoax' framing, Minnesota daycare 'audit' filmed outside operating hours, Kirk assassination conspiracies debunked by Alex Jones, and 2018 Trump footage recycled for Duterte arrest.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [1, 2, 3, 4, 5],
            labels: ["Procedural Distortio", "Pre-emptive Inoculat", "Visual Decontextuali", "Factional Weaponizat", "Temporal Displacemen"],
            colors: ["#ef4444", "#f59e0b", "#3b82f6", "#10b981", "#06b6d4"]
        }
    },
    {
        id: 64,
        title: "Minnesota Fraud Investigation: The $250 Million Scandal and Beyond",
        slug: "minnesota-fraud-investigation-2025",
        category: "Investigation",
        tagClass: "tag-amber",
        catClass: "cat-investigation",
        icon: "search",
        date: "Dec 30, 2025",
        sources: "22 Sources",
        readTime: "18 min",
        verdict: "context",  // Documented fraud + contested $9B estimate requires context
        excerpt: "The largest pandemic relief fraud in U.S. history—$250M stolen via Feeding Our Future. Federal prosecutors estimate $9B in broader Medicaid fraud; state officials say that's speculation. 82 of 92 defendants are Somali American, but mastermind Aimee Bock is white.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [3.4, 42, 197],
            labels: ["2019", "2020", "2021"],
            colors: ["#ef4444", "#ef4444", "#ef4444"]
        }
    },
    {
        id: 63,
        title: "Election Deepfakes 2025: The Year Democracy Fought Back",
        slug: "election-deepfakes-2025",
        category: "Election Security",
        tagClass: "tag-amber",
        catClass: "cat-disinfo",
        icon: "vote",
        date: "Dec 29, 2025",
        sources: "14 Sources",
        readTime: "18 min",
        verdict: "mixed",  // Analysis of evolving threat - not a true/false claim
        excerpt: "From Ireland's fabricated candidate withdrawal to Poland's €2B cyber umbrella—AI deepfakes targeted elections worldwide in 2025. $200M+ in fraud losses Q1 alone. Yet democracy adapts: Connolly won despite the deepfake, FCC issued $6M fine for Biden robocall.",
        chart: {
            type: "bar",
            color: "#3b82f6",
            data: [85, 95, 70, 75, 60, 50],
            colors: ["#3b82f6", "#ef4444", "#f59e0b", "#06b6d4", "#10b981", "#f59e0b"]
        }
    },
    {
        id: 62,
        title: "Meta Ends Fact-Checking: The $100 Million Retreat",
        slug: "meta-ends-fact-checking-2025",
        category: "Platform Policy",
        tagClass: "tag-amber",
        catClass: "cat-disinfo",
        icon: "shield-off",
        date: "Dec 29, 2025",
        sources: "14 Sources",
        readTime: "20 min",
        verdict: "true",  // Verified factual reporting on Meta's policy change
        excerpt: "Meta dismantles its $100M global fact-checking network spanning 90+ organizations across 119 countries. Joel Kaplan appointed, $1M donated to Trump—then fact-checking ended 5 days later. Community Notes work when applied, but only 7.4% of election notes ever reach users.",
        chart: {
            type: "bar",
            color: "#3b82f6",
            data: [80, 20, 20, 30, 40, 100],
            colors: ["#3b82f6", "#3b82f6", "#3b82f6", "#3b82f6", "#3b82f6", "#ef4444"]
        }
    },
    {
        id: 61,
        title: "Bird Flu Misinformation: The H5N1 Panic Machine",
        slug: "bird-flu-misinformation-2025",
        category: "Public Health Disinfo",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "bug",
        date: "Dec 29, 2025",
        sources: "15 Sources",
        readTime: "18 min",
        verdict: "false",  // Debunks misinformation claims
        excerpt: "Bill Gates conspiracy theories, RFK Jr.'s $500M vaccine cuts based on false claims, 'Plandemic 2.0' narratives, and PCR test skepticism - how misinformation is undermining the H5N1 response as 66 human cases emerge.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [70, 1, 989, 16],
            labels: ["Human Cases", "Deaths", "Dairy Herds", "States Affected"],
            colors: ["#ef4444", "#dc2626", "#f59e0b", "#3b82f6"]
        }
    },
    {
        id: 60,
        title: "Grok AI: The Misinformation Machine",
        slug: "grok-ai-misinformation-crisis",
        category: "AI Safety Crisis",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "bot",
        date: "Dec 29, 2025",
        sources: "14 Sources",
        readTime: "16 min",
        verdict: "false",  // Documents Grok spreading false information
        excerpt: "Elon Musk's Grok AI chatbot has repeatedly spread dangerous misinformation during breaking news - fabricating heroes at Bondi Beach, praising Hitler, and falsely blaming a trans pilot for the DC crash. 12+ documented incidents analyzed.",
        chart: {
            type: "bar",
            color: "#64748b",
            data: [1, 2, 0, 0, 2, 0, 4, 0, 0, 0, 0, 3],
            colors: ["#64748b", "#94a3b8", "#f59e0b", "#06b6d4", "#ef4444"]
        }
    },
    {
        id: 59,
        title: "Los Angeles Wildfire Misinformation: A Forensic Analysis",
        slug: "la-wildfire-misinformation-2025",
        category: "Viral Disinformation",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "flame",
        date: "Dec 29, 2025",
        sources: "15 Sources",
        readTime: "18 min",
        verdict: "false",  // Debunks viral wildfire misinformation
        excerpt: "AI-generated Hollywood sign fakes, DEI conspiracy theories, water policy lies, and FEMA funding misinformation - every major claim about the January 2025 LA wildfires debunked with 15 primary sources.",
        chart: {
            type: "line",
            color: "#10b981",
            data: [10, 85, 95, 70, 55, 45, 35, 30],
            colors: ["#10b981", "#ef4444", "#f59e0b", "#3b82f6"]
        }
    },
    {
        id: 58,
        title: "Iran and the West: Nuclear Escalation, Proxy Warfare, and the Path Forward",
        slug: "iran-nuclear-crisis",
        category: "Deep Dive Dossier",
        tagClass: "tag-red",
        catClass: "cat-military",
        icon: "radar",
        date: "Dec 29, 2025",
        sources: "18 Sources",
        readTime: "28 min",
        verdict: "true",  // Factual geopolitical analysis
        excerpt: "From the 2018 JCPOA withdrawal to threshold state: Iran's 60% uranium enrichment, proxy warfare from Hezbollah to Houthis, and why the non-proliferation regime is 'on the line.' Comprehensive analysis of the controlled crisis reshaping Middle East security.",
        chart: {
            type: "line",
            color: "#10b981",
            data: [3.67, 3.67, 4.5, 4.5, 60, 60, 60],
            colors: ["#10b981", "#ef4444", "#f59e0b", "#3b82f6"]
        }
    },
    {
        id: 57,
        title: "American Political Disinformation: Timeline, Key Cases, and Foreign Interference",
        slug: "american-political-disinfo",
        category: "Deep Dive Dossier",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "shield-alert",
        date: "Dec 28, 2025",
        sources: "35 Sources",
        readTime: "32 min",
        verdict: "true",  // Verified factual historical analysis
        excerpt: "From the birther movement to Russian interference, Pizzagate violence, QAnon radicalization, and January 6—how disinformation evolved into a systematic threat to American democracy. Includes Mueller indictments, Fox News's $787M settlement, and foreign influence from Russia, China, and Iran.",
        chart: {
            type: "line",
            color: "#3b82f6",
            data: [1, 5, 60, 95, 85, 100, 95],
            colors: ["#3b82f6", "#ef4444"]
        }
    },
    {
        id: 56,
        title: "Project 2025's \"Military Orders\": Rumors vs. Reality",
        slug: "project-2025-military-orders",
        category: "Deep Dive Dossier",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "shield-alert",
        date: "Dec 28, 2025",
        sources: "10 Sources",
        readTime: "22 min",
        verdict: "mixed",  // Some claims unproven, some verified
        excerpt: "Viral claims of 'secret military orders' are unproven, but the public plan to strip protections from 50,000 workers—30% of whom are veterans—is verified and specific.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [10, 15, 20, 40, 80, 100, 90, 70, 60, 50, 65, 85],
            colors: ["#ef4444", "#64748b"]
        }
    },
    {
        id: 55,
        title: "Fact-Check: The Viral \"166-Name Epstein List\"",
        slug: "epstein-166-name-list-fake",
        category: "Viral Disinformation",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "flame",
        date: "Dec 28, 2025",
        sources: "32 Sources",
        readTime: "12 min",
        verdict: "false",  // List is fabricated - PANTS ON FIRE
        excerpt: "Forensic analysis of the viral 166-name list reveals it is 78% fabricated, originating from a 4chan hoax mixing real names with political targets who appear in no unsealed documents. Verdict: PANTS ON FIRE.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [166, 36],
            colors: ["#ef4444", "#3b82f6"]
        }
    },
    {
        id: 54,
        title: "CDC Reverses Vaccine-Autism Stance: A Scientific Fact-Check",
        slug: "hhs-vaccine-autism-claims",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-health",
        icon: "shield-alert",
        date: "Dec 28, 2025",
        sources: "35 Sources",
        readTime: "24 min",
        verdict: "false",  // Vaccine-autism claim is FALSE
        excerpt: "HHS under RFK Jr. rewrote the CDC's vaccine-autism page. We analyze 35 peer-reviewed studies and institutional sources to fact-check the claim that vaccines cause autism. Verdict: FALSE.",
        chart: {
            type: "hbar",
            color: "#10b981",
            data: [95, 20],
            labels: ["Pre-Nov 2025", "Post-Nov 2025"],
            colors: ["#10b981", "#ef4444"]
        }
    },
    {
        id: 53,
        title: "Is the US Economy Headed for Recession? A Data-Driven Analysis",
        slug: "us-recession-analysis-2025",
        category: "Economic Analysis",
        tagClass: "tag-amber",
        catClass: "cat-financial",
        icon: "trending-down",
        date: "Dec 28, 2025",
        sources: "38 Sources",
        readTime: "28 min",
        excerpt: "Comprehensive analysis of US recession probability with 38 sources from government, Wall Street, and independent economists. Examining GDP, unemployment, the Sahm Rule, and government data reliability.",
        chart: {
            type: "line",
            color: "#10b981",
            data: [2.2, 2.1, 4.9, 3.4, 1.6, 3, 3, 2.3, 2.4, 3.1, 4.3],
            colors: ["#10b981", "#3b82f6", "#06b6d4", "#10b981", "#10b981", "#f59e0b", "#f59e0b"]
        }
    },
    {
        id: 52,
        title: "The Tesla Pi Phone: Anatomy of a Digital Ghost Product",
        slug: "tesla-pi-phone-fake",
        category: "Deep Dive Dossier",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "smartphone",
        date: "Dec 28, 2025",
        sources: "34 Sources",
        readTime: "22 min",
        excerpt: "Forensic deconstruction of a multi-year information operation—from ADR Studio concept art to $500M engagement economy. How belief became infrastructure, and fiction generated fortune.",
        chart: {
            type: "line",
            color: "#3b82f6",
            data: [10, 45, 85, 60, 40, 100]
        }
    },

    {
        id: 51,
        title: "The Great Smishing Surge of Late 2025: A Forensic Deep Dive",
        slug: "smishing-surge-2025",
        category: "Deep Dive Dossier",
        tagClass: "tag-red",
        catClass: "cat-cyber",
        icon: "shield-alert",
        date: "Dec 27, 2025",
        sources: "44 Sources",
        readTime: "35 min",
        excerpt: "Forensic analysis of the post-Christmas smishing explosion, weaponizing regional toll authorities and AI-driven delivery scams. Exposing the 'Lighthouse' PhaaS infrastructure and the Smishing Triad.",
        chart: {
            type: "hbar",
            color: "#3b82f6",
            data: [100, 100, 100],
            labels: ["Toll Scam Search", "AI-Delivery Scams", "Text Volume"],
            colors: ["#3b82f6", "#06b6d4", "#ef4444"]
        }
    },
    {
        id: 50,
        title: "Forensic Audit: 28 Trump Accusers & The Epstein Discipline Gap",
        slug: "trump-allegations-epstein",
        category: "Forensic Audit",
        tagClass: "tag-red",
        catClass: "cat-alert",
        icon: "scale",
        date: "Dec 27, 2025",
        sources: "28 Sources",
        readTime: "25 min",
        excerpt: "A 40-year forensic accounting of 28 accusers, the 'Katie Johnson' lawsuit, and the 'Disciplined for Less' paradox regarding Jes Staley, Leon Black, and Prince Andrew.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [1, 8, 12, 24, 28],
            colors: ["#ef4444", "#ef4444", "#ef4444", "#10b981"]
        }
    },
    {
        id: 49,
        title: "Market Equilibrium and the Deceleration of United States Petroleum Costs",
        slug: "us-gas-price-decline",
        category: "Economic Analysis",
        tagClass: "tag-blue",
        catClass: "cat-financial",
        icon: "trending-down",
        date: "Dec 26, 2025",
        sources: "51 Sources",
        readTime: "12 min",
        excerpt: "The US energy landscape in late 2025 is defined by a significant reduction in retail gasoline prices, driven by record domestic production and a shift in OPEC+ strategy.",
        chart: {
            type: "bar",
            color: "#06b6d4",
            data: [61.8, 57.5],
            colors: ["#06b6d4", "#3b82f6"]
        }
    },
    {
        id: 5,
        title: "Metabolic Resurrection: Reversing Advanced Alzheimer's via NAD+ Restoration",
        slug: "nad-alzheimers-recovery",
        category: "Medical Breakthrough",
        tagClass: "tag-cyan",
        catClass: "cat-medical",
        icon: "activity",
        date: "Dec 26, 2025",
        sources: "38 Sources",
        readTime: "18 min",
        excerpt: "December 2025 breakthrough: P7C3-A20 compound achieves complete reversal of advanced Alzheimer's disease in mice through NAD+ restoration. Full cognitive recovery, BBB repair, and biomarker normalization challenge century-old dogma of irreversibility.",
        chart: {
            type: "line",
            color: "#10b981",
            data: [20, 35, 50, 70, 85, 95, 100]  // Real data: NAD+ recovery progression
        }
    },
    {
        id: 6,
        title: "The Age of Slop: AI-Generated Disinformation in 2025",
        slug: "ai-slop-fake-local-news",
        category: "Deep Dive Dossier",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "bot",
        date: "Dec 26, 2025",
        sources: "45 Sources",
        readTime: "18 min",
        excerpt: "Merriam-Webster named 'Slop' Word of the Year 2025. We investigate 'Pink Slime 2.0' networks, state-sponsored AI (Russia's Doppelgänger, China's Falsos Amigos), and why detection is a losing battle.",
        chart: {
            type: "hbar",
            color: "#10b981",
            data: [5, 400],
            labels: ["Legitimate Local New", "AI Slop Farm (UAIN)"],
            colors: ["#10b981", "#ef4444"]
        }
    },
    {
        id: 7,
        title: "Dominion 'Remote Access' & 'Spyder': Kraken Lawsuits Debunked",
        slug: "dominion-voting-claims-2020",
        category: "Forensic Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "x-circle",
        date: "Dec 26, 2025",
        sources: "21 Sources",
        readTime: "18 min",
        excerpt: "Every Dominion 'fraud' claim from the 2020 Kraken lawsuits was rejected by courts, resulting in historic $175K sanctions. The 'Military Intelligence Expert' was an IT consultant who 'kept washing out of courses.'",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [62, 8, 0],
            colors: ["#ef4444", "#f59e0b", "#10b981"]
        }
    },
    {
        id: 16,
        title: "The Sovereign-Commercial Hybrid",
        slug: "trump-admin-financial-conflicts",
        category: "Financial Forensics",
        tagClass: "tag-red",
        catClass: "cat-financial",
        icon: "dollar-sign",
        date: "Dec 25, 2025",
        sources: "29 Sources",
        readTime: "18 min",
        excerpt: "Unprecedented fusion of executive power and private wealth: $460B cabinet, Trump family crypto empire, systematic regulatory capture, and state-intermediated enterprise.",
        chart: {
            type: "line",
            color: "#3b82f6",
            data: [4.5, 3.7, 3.1, 3.1, 3.1, 2.5, 2.5, 3.2, 2.6, 5.7, 7.3]
        }
    },

    {
        id: 15,
        title: "The Silicon Sleeper Cells: Laptop Farms & The New Digital Front",
        slug: "laptop-farms",
        category: "State-Sponsored Fraud",
        tagClass: "tag-red",
        catClass: "cat-cyber",
        icon: "cpu",
        date: "Dec 23, 2025",
        sources: "28 Sources",
        readTime: "22 min",
        excerpt: "The 'Laptop Farm' has mutated from ad fraud into critical espionage infrastructure. How DPRK and Russian operatives influence US elections from American living rooms.",
        chart: {
            type: "hbar",
            color: "#3b82f6",
            data: [100, 90, 85, 80, 75, 70],
            labels: ["US Laptop Farm", "US Facilitator", "Freelance Platform", "DPRK Operator", "Laundering Mixer", "Regime Weapons Prog"],
            colors: ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
        }
    },
    {
        id: 15,
        title: "Aerial Assets & Sovereign Logistics: A Forensic Audit",
        slug: "epstein-air-logistics",
        category: "Forensic Audit",
        tagClass: "tag-red",
        catClass: "cat-military",
        icon: "plane",
        date: "Dec 23, 2025",
        sources: "35 Sources",
        readTime: "25 min",
        excerpt: "Forensic audit of Epstein's fleet reveals a 'Sovereign Logistics Wing' rather than a private air force. New 2025 files confirm 8 Trump flights and a removed Mar-a-Lago photo.",
        chart: {
            type: "line",
            color: "#3b82f6",
            data: [4220, 4220, 4220, 4220, 6750, 6750, 6750, 0]
        }
    },
    {
        id: 15,
        title: "Is 'FedNow Phase 2' Freezing Accounts?",
        slug: "fednow-freeze",
        category: "Misinformation",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "alert-triangle",
        date: "Dec 17, 2025",
        sources: "6 Sources",
        readTime: "11 min",
        excerpt: "Debunking viral claims about Project Hamilton 'Phase 2' freezing 15,000 accounts. Includes live FRED data showing Fed operations are normal.",
        chart: {
            type: "line",
            color: "#3b82f6",
            data: [10, 25, 140, 90, 55],
            colors: ["#3b82f6", "#3b82f6", "#06b6d4", "#f59e0b"]
        }
    },
    {
        id: 15,
        title: "The Panopticon of Efficiency: Palantir & The Surveillance State",
        slug: "palantir-panopticon",
        category: "Surveillance State",
        tagClass: "tag-red",
        catClass: "cat-cyber",
        icon: "eye",
        date: "Dec 23, 2025",
        sources: "25 Sources",
        readTime: "20 min",
        excerpt: "Palantir is no longer just a contractor; it is the operating system of the American government. From 'ImmigrationOS' to the 'Mega-API', we analyze the architecture of the 2025 surveillance state.",
        chart: {
            type: "line",
            color: "#3b82f6",
            data: [320, 345, 370, 400, 430, 458, 486]
        }
    },
    {
        id: 15,
        title: "The Golden Fleet: Assessing the Paradigm Shift",
        slug: "golden-fleet-analysis",
        category: "Strategic Assessment",
        tagClass: "tag-cyan",
        catClass: "cat-military",
        icon: "radar",
        date: "Dec 23, 2025",
        sources: "35 Sources",
        readTime: "18 min",
        excerpt: "Historic pivot in naval doctrine: The 35,000-ton Trump-class battleship, nuclear railguns, and the industrial 'MASGA' strategy leveraging South Korean shipyards.",
        chart: {
            type: "bar",
            color: "#3b82f6",
            data: [40000, 28000, 15000, 13000, 9700],
            colors: ["#3b82f6", "#ef4444", "#06b6d4", "#ef4444", "#3b82f6"]
        }
    },
    {
        id: 15,
        title: "The December 2025 Financial Disinformation Complex",
        slug: "irs-social-security-payment-hoax-2025",
        category: "Disinformation Forensics",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "shield-alert",
        date: "Dec 22, 2025",
        sources: "12 Sources",
        readTime: "16 min",
        excerpt: "Forensic investigation of viral IRS $1,390 & Social Security $4,500 hoaxes, exposing AI-driven content farms, algorithmic feedback loops, and identity theft pipelines.",
        chart: {
            type: "network",
            color: "#ef4444",
            data: { nodes: 15, connections: 25 }
        }
    },
    {
        id: 15,
        title: "The 2025 Farm Crisis: Did Treasury Prioritize Argentina Over US Farmers?",
        slug: "us-argentina-farm-crisis-2025",
        category: "Economic Analysis",
        tagClass: "tag-amber",
        catClass: "cat-financial",
        icon: "trending-down",
        date: "Dec 22, 2025",
        sources: "15 Sources",
        readTime: "18 min",
        excerpt: "Forensic analysis of the $40B Argentina bailout, market displacement of US soybeans, Chapter 12 bankruptcies surging 68%, and oligopolistic market structures.",
        chart: {
            type: "donut",
            color: "#3b82f6",
            data: [20, 20],
            colors: ["#3b82f6", "#06b6d4"]
        }
    },
    {
        id: 15,
        title: "German Christmas Markets: Flood of Far-Right Fake News",
        slug: "german-christmas-market-disinfo",
        category: "Disinformation",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "x-circle",
        date: "Dec 22, 2025",
        sources: "10 Sources",
        readTime: "8 min",
        excerpt: "Viral false claims about Muslim men 'storming' Christmas markets debunked. Far-right groups spread doctored videos, AI imagery, and exploit Magdeburg attack.",
        chart: {
            type: "bar",
            color: "#3b82f6",
            data: [35, 28, 22, 8, 5, 2],
            colors: ["#3b82f6", "#06b6d4", "#f59e0b", "#10b981", "#ef4444", "#64748b"]
        }
    },
    {
        id: 15,
        title: "Rob Reiner Death: Separating Fact from Fiction",
        slug: "rob-reiner-misinformation-2025",
        category: "Disinformation Analysis",
        tagClass: "tag-cyan",
        catClass: "cat-factcheck",
        icon: "circle-help",
        date: "Dec 21, 2025",
        sources: "12 Sources",
        readTime: "12 min",
        excerpt: "Comprehensive analysis of viral hoaxes following Rob Reiner's murder. Trump's 'TDS' post is real, but the fake 2023 tweet and Epstein connections are fabricated.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [0, 12000, 85000, 320000, 580000, 420000, 180000]
        }
    },
    {
        id: 15,
        title: "Post-Assad Syria: The Disinformation War",
        slug: "syria-disinformation-2024",
        category: "Active Threat",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "alert-octagon",
        date: "Dec 21, 2025",
        sources: "10 Sources",
        readTime: "10 min",
        excerpt: "50,000+ posts spread false info about Syria's new government. 60% from foreign accounts. Russia, Iran wage information war after military defeat.",
        chart: {
            type: "donut",
            color: "#3b82f6",
            data: [40, 15, 15, 12, 8, 10],
            colors: ["#3b82f6", "#ef4444", "#f59e0b", "#06b6d4", "#10b981", "#64748b"]
        }
    },
    {
        id: 16,
        title: "CDC Drops Universal Hepatitis B Vaccine for Newborns",
        slug: "cdc-hepatitis-b-vaccine-2025",
        category: "Policy Analysis",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "book-open",
        date: "Dec 21, 2025",
        sources: "10 Sources",
        readTime: "12 min",
        excerpt: "RFK Jr.'s hand-picked CDC panel votes 8-3 to end 30-year universal vaccination policy. AAP boycotts meetings, states rebel, medical community sounds alarm.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [20000, 8000, 3000, 1000, 400, 100, 20],
            colors: ["#ef4444", "#f59e0b", "#f59e0b", "#06b6d4", "#06b6d4", "#10b981", "#10b981"]
        }
    },
    {
        id: 17,
        title: "Pete Hegseth 'Double-Tap' Strike: What We Know",
        slug: "hegseth-boat-strike",
        category: "Developing Story",
        tagClass: "tag-cyan",
        catClass: "cat-factcheck",
        icon: "clock",
        date: "Dec 21, 2025",
        sources: "9 Sources",
        readTime: "10 min",
        excerpt: "U.S. military strike near Venezuela killed survivors 'shirtless and struggling in the water.' Bipartisan outcry over transparency. Pentagon refuses to release video.",
        chart: {
            type: "bar",
            color: "#3b82f6",
            data: [2, 3, 2, 4, 5, 6, 8, 4]
        }
    },
    {
        id: 18,
        title: "US Inflation: A Decade of Price Changes (2015-2025)",
        slug: "us-inflation-10-year-analysis",
        category: "Economic Analysis",
        tagClass: "tag-blue",
        catClass: "cat-financial",
        icon: "trending-up",
        date: "Dec 21, 2025",
        sources: "14 Sources",
        readTime: "15 min",
        excerpt: "From pre-pandemic stability to 9.1% peak and back down to 2.7%. How COVID-19 reshaped US prices and how recovery compares to G7 peers. Interactive charts included.",
        chart: {
            type: "line",
            color: "#3b82f6",
            data: [0.7, 2.1, 2.1, 1.9, 2.3, 1.4, 7, 6.5, 3.4, 2.9, 2.7]
        }
    },
    {
        id: 19,
        title: "Epstein Files: What December 2025 Release Actually Shows",
        slug: "epstein-documents-2025",
        category: "Document Analysis",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "file-text",
        date: "Dec 21, 2025",
        sources: "18 Sources",
        readTime: "12 min",
        excerpt: "DOJ releases 300,000+ pages then removes 16 files including Trump photo. Bipartisan outrage over redactions. 680+ pages entirely blacked out. Updated Dec 21.",
        chart: {
            type: "bar",
            color: "#f59e0b",
            data: [80, 40, 60, 90, 20, 50, 70, 30]
        }
    },
    {
        id: 20,
        title: "Ruby Bradley 'Loser' Quote: Viral Military Misquote Debunked",
        slug: "ruby-bradley-quote",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "x-circle",
        date: "Dec 20, 2025",
        sources: "8 Sources",
        readTime: "6 min",
        excerpt: "The viral 'loser' quote attributed to decorated Army nurse Colonel Ruby Bradley is fabricated. No primary source exists. Honor her by sharing her real heroic story.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [45, 38, 32, 28, 25, 40]
        }
    },
    {
        id: 21,
        title: "Paid Protesters Hoax: The Craigslist Ad Myth That Won't Die",
        slug: "paid-protesters-hoax",
        category: "Recurring Hoax",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "x-circle",
        date: "Dec 20, 2025",
        sources: "10 Sources",
        readTime: "7 min",
        excerpt: "Claims of Soros-funded paid protesters via Craigslist ads have been debunked after every major protest for over a decade. Zero verified instances of mass paid protesting.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [5, 12, 8, 25, 45, 65, 85, 95]
        }
    },
    {
        id: 22,
        title: "AI-Generated Deportation Videos: The Sora Deepfake Crisis",
        slug: "ai-deportation-videos",
        category: "Synthetic Media Alert",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "alert-triangle",
        date: "Dec 20, 2025",
        sources: "9 Sources",
        readTime: "8 min",
        excerpt: "At least 47 AI-generated fake videos depicting immigration raids have gone viral in 2025, created with tools like Sora. None depict real events.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [5, 10, 25, 40, 65, 80, 90, 100]
        }
    },
    {
        id: 23,
        title: "The Great Reset: WEF Conspiracy Theory Fact Check",
        slug: "great-reset-wef",
        category: "Conspiracy Analysis",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "alert-triangle",
        date: "Dec 20, 2025",
        sources: "11 Sources",
        readTime: "9 min",
        excerpt: "The Great Reset is real but conspiracy claims vastly exaggerate its scope. The WEF is a discussion forum with no power to implement policies.",
        chart: {
            type: "network",
            color: "#f59e0b",
            data: { nodes: 12, connections: 18 }
        }
    },
    {
        id: 24,
        title: "Chemtrails in 2025: TikTok's Resurgent Conspiracy Theory",
        slug: "chemtrails-2025",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "x-circle",
        date: "Dec 20, 2025",
        sources: "10 Sources",
        readTime: "7 min",
        excerpt: "The chemtrails conspiracy resurges on TikTok with 18,300+ videos in Dec 2025. Science is clear: contrails are frozen water vapor, not chemical spraying.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [{ label: 'TikTok', value: 92 }, { label: 'Facebook', value: 45 }, { label: 'YouTube', value: 30 }, { label: 'X', value: 65 }]
        }
    },
    {
        id: 25,
        title: "BlueAnon: Can Starlink Satellites Manipulate Elections?",
        slug: "blueanon-starlink",
        category: "Conspiracy Analysis",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "x-circle",
        date: "Dec 20, 2025",
        sources: "10 Sources",
        readTime: "7 min",
        excerpt: "Left-wing conspiracy theory claims Starlink can alter votes. Reality: voting machines are air-gapped and not connected to any network during elections.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [45, 38, 22, 15, 8]
        }
    },
    {
        id: 26,
        title: "HAARP Weather Control Conspiracy: Science vs Fiction",
        slug: "haarp-weather-control",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "x-circle",
        date: "Dec 20, 2025",
        sources: "9 Sources",
        readTime: "8 min",
        excerpt: "HAARP blamed for LA wildfires and hurricanes. Science: HAARP operates 60+ miles up in the ionosphere—weather forms in the troposphere below 10 miles.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [10, 20, 15, 40, 60, 50, 80, 90]
        }
    },
    {
        id: 27,
        title: "Tommy Robinson 'Death' in Guadeloupe: False Claims Debunked",
        slug: "tommy-robinson-guadeloupe",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "x-circle",
        date: "Dec 20, 2025",
        sources: "8 Sources",
        readTime: "6 min",
        excerpt: "Viral claims that 10 people died in protests over Tommy Robinson's arrest in Guadeloupe are false. French officials confirm no fatalities occurred.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [0.1, 5, 18, 32, 40, 42]
        }
    },
    {
        id: 28,
        title: "Elon Musk vs EU: Claims Fact-Checked",
        slug: "musk-eu-claims",
        category: "Fact Check",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "alert-triangle",
        date: "Dec 20, 2025",
        sources: "10 Sources",
        readTime: "8 min",
        excerpt: "Musk calls DSA fines 'censorship' but EU content moderation applies to all platforms equally. His claims about discriminatory targeting are MOSTLY FALSE.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [31, 22, 18, 28, 12, 8],
            colors: ["#ef4444", "#f59e0b", "#06b6d4", "#3b82f6", "#64748b", "#10b981"]
        }
    },
    {
        id: 29,
        title: "IRS $2,000 Stimulus Check Hoax: December 2025",
        slug: "irs-stimulus-hoax",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "x-circle",
        date: "Dec 20, 2025",
        sources: "9 Sources",
        readTime: "5 min",
        excerpt: "Viral claims about IRS sending $2,000 stimulus checks in December 2025 are completely false. No such program exists. Verdict: FALSE.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [150, 890, 4200, 18500, 45000, 89000]
        }
    },
    {
        id: 30,
        title: "New Jersey Drone Sightings: Conspiracy Theories Debunked",
        slug: "nj-drone-conspiracy",
        category: "Fact Check",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "alert-triangle",
        date: "Dec 19, 2025",
        sources: "8 Sources",
        readTime: "7 min",
        excerpt: "Debunking viral claims about mysterious drones over New Jersey including Project Blue Beam, Iranian involvement, and alien theories. Verdict: MOSTLY FALSE.",
        chart: {
            type: "network",
            color: "#f59e0b",
            data: { nodes: 10, connections: 15 }
        }
    },
    {
        id: 31,
        title: "MAGA Accounts: Foreign Location Reveal",
        slug: "maga-accounts-foreign",
        category: "Platform Analysis",
        tagClass: "tag-red",
        catClass: "cat-disinfo",
        icon: "map-pin",
        date: "Dec 19, 2025",
        sources: "9 Sources",
        readTime: "6 min",
        excerpt: "X's new location transparency feature reveals surprising foreign origins for accounts amplifying pro-Trump content.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [58, 42, 35, 28, 37],
            colors: ["#ef4444", "#f59e0b", "#3b82f6", "#06b6d4", "#64748b"]
        }
    },
    {
        id: 32,
        title: "Immigration Crime Wave: Claims vs Data",
        slug: "immigration-crime-claims",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "x-circle",
        date: "Dec 19, 2025",
        sources: "10 Sources",
        readTime: "8 min",
        excerpt: "Examining viral claims about immigrant crime rates. DOJ and academic research show immigrants commit crimes at lower rates than native-born citizens.",
        chart: {
            type: "line",
            color: "#FF2A2A",
            data: [730, 685, 506, 469, 405, 373, 399, 358]
        }
    },
    {
        id: 33,
        title: "Hamas 51% Youth Support Claim",
        slug: "hamas-youth-support",
        category: "Fact Check",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "alert-triangle",
        date: "Dec 19, 2025",
        sources: "8 Sources",
        readTime: "6 min",
        excerpt: "Viral claim that 51% of young Americans support Hamas is misleading. Original poll asked about sympathy, not support, and results are more nuanced.",
        chart: {
            type: "bar",
            color: "#06b6d4",
            data: [45, 38, 52, 12],
            colors: ["#06b6d4", "#06b6d4", "#06b6d4", "#ef4444"]
        }
    },
    {
        id: 34,
        title: "Trump's Grocery Prices Claim: Fact Check",
        slug: "grocery-prices-claim",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "x-circle",
        date: "Dec 19, 2025",
        sources: "10 Sources",
        readTime: "6 min",
        excerpt: "Trump claimed grocery prices are 'falling rapidly.' BLS data shows more items increased than decreased. Verdict: FALSE.",
        chart: {
            type: "bar",
            color: "#ff2a2a",
            data: [5.8, 3.2, 2.9, 1.7, 54.1, 2.1, 1.4, 0.8],
            colors: ["#ff2a2a", "#ff2a2a", "#ff2a2a", "#ff2a2a", "#f59e0b", "#ff2a2a", "#ff2a2a", "#ff2a2a"]
        }
    },
    {
        id: 35,
        title: "The 2025 AI Deepfake Crisis",
        slug: "ai-deepfakes-2025",
        category: "AI & Technology",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "alert-triangle",
        date: "Dec 19, 2025",
        sources: "10 Sources",
        readTime: "7 min",
        excerpt: "AI-generated deepfakes targeting public figures, 93% of social videos now synthetic, and the erosion of trust in digital content.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [7, 15, 35, 60, 85, 93]
        }
    },
    {
        id: 36,
        title: "Climate Skeptics Misuse Ice Age Research",
        slug: "climate-ice-age-study",
        category: "Climate Misinformation",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "alert-triangle",
        date: "Dec 19, 2025",
        sources: "8 Sources",
        readTime: "7 min",
        excerpt: "Viral Breitbart headline cherry-picks legitimate climate science to mislead readers about current global warming threat.",
        chart: {
            type: "line",
            color: "#f59e0b",
            data: [14.0, 14.2, 14.5, 14.8, 15.1, 15.3]
        }
    },
    {
        id: 37,
        title: "Bondi Beach Attack: Viral Misinformation Wave",
        slug: "bondi-beach-misinfo",
        category: "Misinformation",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "alert-triangle",
        date: "Dec 19, 2025",
        sources: "9 Sources",
        readTime: "7 min",
        excerpt: "Multiple false claims spread within hours of Sydney shooting. Hero's identity fabricated, shooter's background distorted, non-existent second shooting claimed.",
        chart: {
            type: "timeline",
            color: "#ef4444",
            data: [10, 30, 55, 75, 90]
        }
    },
    {
        id: 38,
        title: "Did Elon Musk's DOGE Save $2 Trillion?",
        slug: "doge-savings-claims",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "alert-triangle",
        date: "Dec 19, 2025",
        sources: "15 Sources",
        readTime: "7 min",
        excerpt: "Examining DOGE's claim of $2 trillion in savings. NPR found only $102M verified—0.005% of claimed amount. Federal spending actually rose.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [2000, 0.102],
            colors: ["#ef4444", "#3b82f6"]
        }
    },
    {
        id: 39,
        title: "Trump's '25 Million Migrants' Claim",
        slug: "trump-25m-migrants",
        category: "Fact Check",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "x-circle",
        date: "Dec 19, 2025",
        sources: "10 Sources",
        readTime: "6 min",
        excerpt: "Trump claims 25 million migrants entered under Biden. Official CBP data shows ~10M encounters, many expelled. Verdict: FALSE.",
        chart: {
            type: "bar",
            color: "#0d1424",
            data: [1.73, 2.38, 2.48, 3.2]
        }
    },
    {
        id: 40,
        title: "The $1,776 'Warrior Dividend': What It Really Is",
        slug: "warrior-dividend-analysis",
        category: "Policy Analysis",
        tagClass: "tag-amber",
        catClass: "cat-financial",
        icon: "shield",
        date: "Dec 19, 2025",
        sources: "11 Sources",
        readTime: "6 min",
        excerpt: "Trump's $1,776 military bonus is actually rebranded housing funds Congress already approved—not new presidential spending or tariff revenue.",
        chart: {
            type: "donut",
            color: "#f59e0b",
            data: [2.6, 0.3],
            colors: ["#f59e0b", "#3b82f6"]
        }
    },
    {
        id: 41,
        title: "Fact Check: FDA Memo Claims COVID Vaccines Killed 10 Children",
        slug: "fda-vaccine-memo-fact-check",
        category: "Public Health",
        tagClass: "tag-red",
        catClass: "cat-health",
        icon: "shield-alert",
        date: "Dec 19, 2025",
        sources: "9 Sources",
        readTime: "10 min",
        excerpt: "FDA CBER Director Vinay Prasad's leaked memo claims vaccines killed at least 10 children—but provides no evidence. Experts call it 'factually incorrect' and 'disingenuous.'",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [10, 0]
        }
    },
    {
        id: 42,
        title: "Gaza Boat Strikes: Pattern of Civilian Targeting?",
        slug: "boat-strike-investigation",
        category: "Military Investigation",
        tagClass: "tag-red",
        catClass: "cat-military",
        icon: "shield-off",
        date: "Dec 19, 2025",
        sources: "10 Sources",
        readTime: "8 min",
        excerpt: "Investigating IDF 'double-tap' strikes on Palestinian fishing boats and the legal questions surrounding targeting fleeing civilians.",
        chart: {
            type: "line",
            color: "#ef4444",
            data: [11, 25, 48, 75, 99]
        }
    },
    {
        id: 43,
        title: "Trump's Dec 17 Speech: Claims vs Reality",
        slug: "trump-speech-factcheck",
        category: "Fact Check",
        tagClass: "tag-amber",
        catClass: "cat-factcheck",
        icon: "check-square",
        date: "Dec 19, 2025",
        sources: "5 Claims",
        readTime: "6 min",
        excerpt: "Fact-checking the President's prime-time address on immigration, economy, and policy accomplishments. Claim-by-claim analysis with primary sources.",
        chart: {
            type: "donut",
            color: "#ef4444",
            data: [4, 2, 1],
            colors: ["#ef4444", "#f59e0b", "#3b82f6"]
        }
    },
    {
        id: 44,
        title: "Luigi Mangione Trial: Evidence and Legal Strategy",
        slug: "mangione-trial-analysis",
        category: "Criminal Justice",
        tagClass: "tag-red",
        catClass: "cat-military",
        icon: "scale",
        date: "Dec 19, 2025",
        sources: "12 Sources",
        readTime: "10 min",
        excerpt: "Analyzing the prosecution's case, defense arguments, and contested evidence in the UnitedHealthcare CEO murder trial.",
        chart: {
            type: "hbar",
            color: "#f59e0b",
            data: [100, 80, 0, 0],
            labels: ["Physical Evidence", "Statements", "Surveillance", "Witness Testimony"]
        }
    },
    {
        id: 45,
        title: "TikTok US Sale: What the Deal Actually Contains",
        slug: "tiktok-sale-analysis",
        category: "Tech Policy",
        tagClass: "tag-blue",
        catClass: "cat-tech",
        icon: "scale",
        date: "Dec 19, 2025",
        sources: "10 Sources",
        readTime: "9 min",
        excerpt: "Breaking down the Oracle, Silver Lake, and UAE consortium deal structure, and why ByteDance still controls the algorithm.",
        chart: {
            type: "donut",
            color: "#3b82f6",
            data: [15, 15, 15, 35, 19.9],
            colors: ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"]
        }
    },
    {
        id: 46,
        title: "CDC Website Changes: Vaccine-Autism Claims Analyzed",
        slug: "cdc-vaccine-autism",
        category: "Public Health",
        tagClass: "tag-amber",
        catClass: "cat-health",
        icon: "shield-alert",
        date: "Dec 19, 2025",
        sources: "8 Sources",
        readTime: "7 min",
        excerpt: "What the CDC actually changed on its website regarding vaccines and autism, and what the scientific consensus still shows.",
        chart: {
            type: "line",
            color: "#10b981",
            data: [95.2, 94.1, 93, 92.7, 92.7],
            colors: ["#10b981", "#ef4444"]
        }
    },
    {
        id: 47,
        title: "Marijuana Rescheduling: From Schedule I to Schedule III",
        slug: "marijuana-rescheduling",
        category: "Executive Action",
        tagClass: "tag-green",
        catClass: "cat-financial",
        icon: "file-text",
        date: "Dec 18, 2025",
        sources: "12 Sources",
        readTime: "8 min",
        excerpt: "Trump signs historic executive order directing federal reclassification of cannabis. Analysis of $2B+ tax relief and why this falls short of legalization.",
        chart: {
            type: "hbar",
            color: "#ef4444",
            data: [70, 21, 21],
            labels: ["Cannabis (280E)", "Standard Corp", "After Rescheduling"],
            colors: ["#ef4444", "#3b82f6", "#10b981"]
        }
    },
    {
        id: 48,
        title: "Dollar Dominance: Treasury Bonds as Trade War Leverage",
        slug: "treasury-leverage",
        category: "Financial Analysis",
        tagClass: "tag-green",
        catClass: "cat-financial",
        icon: "dollar-sign",
        date: "Dec 18, 2025",
        sources: "Interactive",
        readTime: "12 min",
        excerpt: "How China, Japan, and hedge funds could weaponize $8+ trillion in US Treasury holdings as tariffs escalate to 145%.",
        chart: {
            type: "bar",
            color: "#10b981",
            data: [8.1, 1.1, 1.0, 0.9]
        }
    },
    {
        id: 49,
        title: "US Inflation Data: Accurate Numbers, Compromised Collection",
        slug: "inflation-methodology",
        category: "Data Quality Alert",
        tagClass: "tag-amber",
        catClass: "cat-financial",
        icon: "alert-triangle",
        date: "Dec 18, 2025",
        sources: "12 Sources",
        readTime: "9 min",
        excerpt: "BLS reported 2.7% inflation—but a 43-day shutdown left October data uncollected. Analysis of why CPI diverges from consumer experience.",
        chart: {
            type: "bar",
            color: "#10b981",
            data: [2.7, 2.62, 2.66, 3.2, 4.1, 4.8],
            colors: ["#10b981", "#3b82f6", "#06b6d4", "#f59e0b", "#f59e0b", "#ff2a2a"]
        }
    },
    {
        id: 50,
        title: "Mirror Maze: Doppelganger Network Analysis",
        slug: "doppelganger-analysis",
        category: "Media Impersonation",
        tagClass: "tag-russia",
        catClass: "cat-disinfo",
        icon: "copy",
        date: "Dec 18, 2025",
        sources: "32 Domains",
        readTime: "15 min",
        excerpt: "Russia's sophisticated media impersonation: 60+ fake news websites mimicking Washington Post, Fox News, and major outlets.",
        chart: {
            type: "network",
            color: "#4a7dcc",
            data: { nodes: 16, connections: 24 }
        }
    },
    {
        id: 51,
        title: "Spamouflage Network Analysis",
        slug: "network-analysis",
        category: "Active Threat",
        tagClass: "tag-china",
        catClass: "cat-disinfo",
        icon: "alert-octagon",
        date: "Dec 18, 2025",
        sources: "185 Nodes",
        readTime: "14 min",
        excerpt: "China's largest influence operation: 8,700+ coordinated accounts across 50+ platforms targeting Western democracies.",
        chart: {
            type: "network",
            color: "#ef6b5b",
            data: { nodes: 18, connections: 30 }
        }
    },
    {
        id: 52,
        title: "Fact Check: Biden White House Plaque Claims",
        slug: "plaque-fact-check",
        category: "72% False or Misleading",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "alert-triangle",
        date: "Dec 17, 2025",
        sources: "18 Claims",
        readTime: "15 min",
        excerpt: "Comprehensive analysis of 18 claims on partisan plaques installed beneath Biden's portrait in the White House.",
        chart: {
            type: "bar",
            color: "#ef4444",
            data: [13, 3, 2]
        }
    },
    {
        id: 14,
        title: "Is 'FedNow Phase 2' Freezing Accounts?",
        slug: "fednow-freeze",
        category: "Deep Dive Dossier",
        tagClass: "tag-red",
        catClass: "cat-finance",
        icon: "shield-alert",
        date: "Dec 25, 2025",
        sources: "6 Sources",
        readTime: "11 min",
        excerpt: "Debunking viral claims about FedNow 'Phase 2' freezing accounts and cash being banned by 2026. Forensic analysis reveals routine maintenance misinterpreted as systematic control.",
        chart: {
            type: "line",
            color: "#3b82f6",
            data: [65, 78, 82, 85, 88, 90]
        }
    }
];

// Helper function to get report count (includes blob storage articles)
function getReportsCount() {
    return REPORTS_DATA.length;
}

// Helper function to get total sources count
function getTotalSourcesCount() {
    let total = 0;
    REPORTS_DATA.forEach(report => {
        const match = report.sources.match(/(\d+)/);
        if (match) {
            total += parseInt(match[1], 10);
        }
    });
    return total;
}
