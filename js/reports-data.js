// Shared reports data - Single source of truth for all pages
// When adding a new report, add it here and it will update everywhere

const REPORTS_DATA = [
    {
        id: 78,
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
            color: "#f59e0b",
            data: [400, 600, 1000, 1400, 2000]
        }
    },
    {
        id: 77,
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
            type: "network",
            color: "#ef4444",
            data: { nodes: 12, connections: 20 }
        }
    },
    {
        id: 76,
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
            type: "timeline",
            color: "#f59e0b",
            data: [10, 30, 50, 70, 90]
        }
    },
    {
        id: 75,
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
            color: "#ef4444",
            data: [126, 20, 1.4]
        }
    },
    {
        id: 74,
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
            type: "donut",
            color: "#ef4444",
            data: 87
        }
    },
    {
        id: 73,
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
            type: "network",
            color: "#f59e0b",
            data: { nodes: 13, connections: 24 }
        }
    },
    {
        id: 72,
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
            type: "bar",
            color: "#ef4444",
            data: [47, 47, 38, 35]
        }
    },
    {
        id: 71,
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
            color: "#f59e0b",
            data: 61
        }
    },
    {
        id: 70,
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
        id: 69,
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
            color: "#3b82f6",
            data: [6, 1]
        }
    },
    {
        id: 68,
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
            data: [94, 8]
        }
    },
    {
        id: 67,
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
            type: "timeline",
            color: "#ef4444",
            data: [5, 15, 35, 65, 80, 95, 85, 75]
        },
        registryId: "protocols-elders-zion",
        relatedIds: ["american-political-disinfo", "qanon-network-analysis"]
    },
    {
        id: 66,
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
            type: "timeline",
            color: "#f59e0b",
            data: [10, 25, 40, 55, 70, 85]
        }
    },
    {
        id: 65,
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
            type: "network",
            color: "#ef4444",
            data: { nodes: 15, connections: 25 }
        }
    },
    {
        id: 64,
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
            type: "bar",
            color: "#ef4444",
            data: [1, 2, 3, 4, 5]  // 5 disinformation techniques (from typesChart - horizontal bar)
        }
    },
    {
        id: 63,
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
            type: "bar",
            color: "#ef4444",
            data: [3.4, 42, 197]  // FOF federal funding 2019-2021 in millions (from fundingChart)
        }
    },
    {
        id: 62,
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
            color: "#f59e0b",
            data: [85, 95, 70, 75, 60, 50]  // Impact Score by event (from timelineChart)
        }
    },
    {
        id: 61,
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
            data: [80, 20, 20, 30, 40, 100]  // Policy Shift Intensity Jan 2-7 (from timelineChart)
        }
    },
    {
        id: 60,
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
            type: "line",
            color: "#ef4444",
            data: [5, 12, 18, 25, 35, 50, 66]
        }
    },
    {
        id: 59,
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
            color: "#ef4444",
            data: [1, 2, 0, 0, 2, 0, 4, 0, 0, 0, 0, 3]  // Incidents by month Jan-Dec 2025 (from timelineChart)
        }
    },
    {
        id: 58,
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
            color: "#ef4444",
            data: [10, 85, 95, 70, 55, 45, 35, 30]  // AI Fake Images spread Jan 7-14 (from timelineChart)
        }
    },
    {
        id: 57,
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
            color: "#ef4444",
            data: [3.67, 3.67, 4.5, 4.5, 60, 60, 60]  // Enrichment % escalation 2015-2025
        }
    },
    {
        id: 56,
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
            color: "#ef4444",
            data: [1, 5, 60, 95, 85, 100, 95]  // Disinformation volume growth 2015-2021
        }
    },
    {
        id: 55,
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
            data: [0, 0, 2, 5, 5, 8, 12, 10, 8, 15, 60, 95]  // Military Orders spike data from Chart 1
        }
    },
    {
        id: 54,
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
            data: [166, 36]
        }
    },
    {
        id: 53,
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
            type: "bar",
            color: "#ef4444",
            data: [95, 20]
        }
    },
    {
        id: 0,
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
            type: "donut",
            color: "#f59e0b",
            data: 30
        }
    },
    {
        id: 1,
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
            color: "#ef4444",
            data: [5, 25, 65, 85, 75, 90]
        }
    },

    {
        id: 2,
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
            type: "bar",
            color: "#ef4444",
            data: [1000, 200, 604]
        }
    },
    {
        id: 3,
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
            color: "#3b82f6",
            data: [1, 8, 12, 24, 28]  // Real data: Cumulative allegations over time
        }
    },
    {
        id: 4,
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
            data: [61.80, 57.50]  // Real data: Brent vs WTI crude prices
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
            color: "#ef4444",
            data: [
                { label: 'AI Slop Farm', value: 400 },
                { label: 'Human Newsroom', value: 5 }
            ]
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
            data: [
                { label: 'Dismissed', value: 62, color: '#ef4444' },
                { label: 'Withdrawn', value: 8, color: '#f59e0b' },
                { label: 'Won', value: 0, color: '#10b981' }
            ]
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
            type: "bar",
            color: "#ef4444",
            data: [400, 1.5, 1.1, 1.1, 1.0, 1.0]
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
            type: "line",
            color: "#ef4444",
            data: [65, 81, 125, 172, 185, 200]
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
            type: "network",
            color: "#3b82f6",
            data: { nodes: 8, connections: 14 }
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
            data: [100, 102, 105, 108, 110]
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
            type: "network",
            color: "#ef4444",
            data: { 'nodes': 12, 'connections': 22 }
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
            data: [
                { label: 'BBG', value: 40000, color: '#3b82f6' },
                { label: 'Kirov', value: 28000, color: '#ef4444' },
                { label: 'Zumwalt', value: 15000, color: '#06b6d4' },
                { label: 'Type 055', value: 13000, color: '#ef4444' },
                { label: 'Burke', value: 9700, color: '#3b82f6' }
            ]
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
            type: "line",
            color: "#f59e0b",
            data: [20, 35, 45, 60, 55, 68, 80, 95]
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
            type: "hbar",
            color: "#ef4444",
            data: [{ label: 'TikTok', value: 85 }, { label: 'X/Avian', value: 70 }, { label: 'Telegram', value: 60 }, { label: 'Insta', value: 30 }]
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
            type: "timeline",
            color: "#06b6d4",
            data: [10, 25, 50, 65, 90]
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
            type: "network",
            color: "#ef4444",
            data: { nodes: 20, connections: 40 }
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
            type: "donut",
            color: "#f59e0b",
            data: 73
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
            type: "timeline",
            color: "#06b6d4",
            data: [15, 30, 45, 60, 85]
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
            data: [10, 15, 85, 95, 60, 40, 30, 27]
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
            data: [1, 12, 42, 76, 95, 100]
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
            color: "#f59e0b",
            data: [45, 50, 48, 52, 49, 51, 53, 50]
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
            color: "#3b82f6",
            data: [58, 42, 35, 28, 37]
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
            data: [45, 38, 52, 12]
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
            color: "#FF2A2A",
            data: [5.8, 3.2, 2.9, 1.7, 54.1, 2.1, 1.4, 0.8]
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
            data: [2000, 0.102]
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
            color: "#3b82f6",
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
            color: "#3b82f6",
            data: 90
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
            data: 57
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
            type: "bar",
            color: "#f59e0b",
            data: [100, 80, 0, 0]
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
            data: 35
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
            color: "#3b82f6",
            data: [95.2, 94.1, 93.0, 92.7, 92.7]
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
            type: "bar",
            color: "#3b82f6",
            data: [70, 21, 21]
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
            color: "#3b82f6",
            data: [2.7, 2.62, 2.66, 3.2, 4.1, 4.8]
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
