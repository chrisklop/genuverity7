// Shared reports data - Single source of truth for all pages
// When adding a new report, add it here and it will update everywhere

const REPORTS_DATA = [
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
            data: [85, 95, 70, 75, 60, 50]
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
            color: "#f59e0b",
            data: [80, 20, 20, 30, 40, 100]
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
            data: [1, 2, 0, 0, 2, 0, 4, 0, 0, 0, 0, 3]
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
            data: [10, 85, 95, 70, 55, 45, 35, 30]
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
        excerpt: "Viral claims about IRS sending $2,000 stimulus checks in December 2025 are completely false. No such program exists. Verdict: FALSE."
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
        excerpt: "Debunking viral claims about mysterious drones over New Jersey including Project Blue Beam, Iranian involvement, and alien theories. Verdict: MOSTLY FALSE."
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
        excerpt: "X's new location transparency feature reveals surprising foreign origins for accounts amplifying pro-Trump content."
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
        excerpt: "Examining viral claims about immigrant crime rates. DOJ and academic research show immigrants commit crimes at lower rates than native-born citizens."
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
        excerpt: "Viral claim that 51% of young Americans support Hamas is misleading. Original poll asked about sympathy, not support, and results are more nuanced."
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
        excerpt: "Trump claimed grocery prices are 'falling rapidly.' BLS data shows more items increased than decreased. Verdict: FALSE."
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
        excerpt: "AI-generated deepfakes targeting public figures, 93% of social videos now synthetic, and the erosion of trust in digital content."
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
        excerpt: "Viral Breitbart headline cherry-picks legitimate climate science to mislead readers about current global warming threat."
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
        excerpt: "Multiple false claims spread within hours of Sydney shooting. Hero's identity fabricated, shooter's background distorted, non-existent second shooting claimed."
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
        excerpt: "Examining DOGE's claim of $2 trillion in savings. NPR found only $102M verified—0.005% of claimed amount. Federal spending actually rose."
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
        excerpt: "Trump claims 25 million migrants entered under Biden. Official CBP data shows ~10M encounters, many expelled. Verdict: FALSE."
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
        excerpt: "Trump's $1,776 military bonus is actually rebranded housing funds Congress already approved—not new presidential spending or tariff revenue."
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
        excerpt: "FDA CBER Director Vinay Prasad's leaked memo claims vaccines killed at least 10 children—but provides no evidence. Experts call it 'factually incorrect' and 'disingenuous.'"
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
        excerpt: "Investigating IDF 'double-tap' strikes on Palestinian fishing boats and the legal questions surrounding targeting fleeing civilians."
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
        excerpt: "Fact-checking the President's prime-time address on immigration, economy, and policy accomplishments. Claim-by-claim analysis with primary sources."
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
        excerpt: "Analyzing the prosecution's case, defense arguments, and contested evidence in the UnitedHealthcare CEO murder trial."
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
        excerpt: "Breaking down the Oracle, Silver Lake, and UAE consortium deal structure, and why ByteDance still controls the algorithm."
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
        excerpt: "What the CDC actually changed on its website regarding vaccines and autism, and what the scientific consensus still shows."
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
        excerpt: "Trump signs historic executive order directing federal reclassification of cannabis. Analysis of $2B+ tax relief and why this falls short of legalization."
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
        excerpt: "How China, Japan, and hedge funds could weaponize $8+ trillion in US Treasury holdings as tariffs escalate to 145%."
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
        excerpt: "BLS reported 2.7% inflation—but a 43-day shutdown left October data uncollected. Analysis of why CPI diverges from consumer experience."
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
        excerpt: "Russia's sophisticated media impersonation: 60+ fake news websites mimicking Washington Post, Fox News, and major outlets."
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
        excerpt: "China's largest influence operation: 8,700+ coordinated accounts across 50+ platforms targeting Western democracies."
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
        excerpt: "Comprehensive analysis of 18 claims on partisan plaques installed beneath Biden's portrait in the White House."
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
