// Year of Lies 2025 - Comprehensive Data File
// 100 Fact-Checked Claims from "The Year of the Lie"
// Reference: PolitiFact's 2025 Lie of the Year coverage

const YEAR_OF_LIES_2025_DATA = {
    meta: {
        title: "2025: The Year of the Lie",
        subtitle: "100 Fact-Checked Claims That Defined a Year of Misinformation",
        totalReports: 100,
        totalSources: 0, // Will be calculated
        publishDate: "January 2026",
        lastUpdated: new Date().toISOString(),
        politifactReference: "https://www.politifact.com/article/2025/dec/15/lie-of-the-year-2025-winner/"
    },

    categories: [
        { id: "us-politics", name: "U.S. Politics & Policy", icon: "landmark", color: "#3b82f6" },
        { id: "health", name: "Health & Medical", icon: "heart-pulse", color: "#ef4444" },
        { id: "ai-deepfakes", name: "AI & Deepfakes", icon: "bot", color: "#06b6d4" },
        { id: "immigration", name: "Immigration & Border", icon: "map-pin", color: "#f59e0b" },
        { id: "international", name: "International Affairs", icon: "globe", color: "#10b981" },
        { id: "russian-disinfo", name: "Russian Disinformation", icon: "shield-alert", color: "#ef4444" },
        { id: "african", name: "African Misinformation", icon: "map", color: "#f59e0b" },
        { id: "south-asian", name: "South Asian Misinformation", icon: "map", color: "#06b6d4" },
        { id: "economic", name: "Economic Claims", icon: "trending-up", color: "#10b981" },
        { id: "conspiracy", name: "Conspiracy & Hoaxes", icon: "alert-triangle", color: "#ef4444" },
        { id: "platform", name: "Platform & Tech", icon: "smartphone", color: "#3b82f6" },
        { id: "media", name: "Media & Journalism", icon: "newspaper", color: "#64748b" }
    ],

    verdicts: [
        { id: "false", name: "FALSE", icon: "x-circle", color: "#ef4444" },
        { id: "misleading", name: "MISLEADING", icon: "alert-triangle", color: "#f59e0b" },
        { id: "mixed", name: "MIXED", icon: "circle-help", color: "#06b6d4" },
        { id: "context", name: "NEEDS CONTEXT", icon: "info", color: "#3b82f6" },
        { id: "unproven", name: "UNPROVEN", icon: "help-circle", color: "#64748b" }
    ],

    // The 100 lies - each will link to a full report
    lies: [
        // === U.S. POLITICS & POLICY ===
        {
            id: 1,
            title: "Liberation Day Address Claims",
            slug: "liberation-day-address-2025",
            category: "us-politics",
            verdict: "mixed",
            summary: "Trump's 'Liberation Day' tariff announcement contained multiple disputed economic claims about trade deficits and manufacturing jobs.",
            dateOfClaim: "April 2, 2025",
            claimant: "Donald Trump",
            initialSources: [
                "https://www.trtworld.com/article/7e2b7bfd09d3",
                "https://govbudget.com/fact-check/",
                "https://www.factcheck.org/2025/01/fact-checking-trumps-inaugural-address/"
            ],
            tags: ["tariffs", "trade", "economy"],
            reportStatus: "live"
        },
        {
            id: 2,
            title: "225 Executive Orders Volume Claim",
            slug: "225-executive-orders-2025",
            category: "us-politics",
            verdict: "misleading",
            summary: "Claims about the unprecedented volume of executive orders in 2025 lack context about historical comparisons and legal scope.",
            dateOfClaim: "2025",
            claimant: "Multiple sources",
            initialSources: [
                "https://www.trtworld.com/article/7e2b7bfd09d3",
                "https://www.factcheck.org/2025/12/the-whoppers-of-2025/"
            ],
            tags: ["executive orders", "administration"],
            reportStatus: "live"
        },
        {
            id: 3,
            title: "Los Angeles ICE Raids and Riots",
            slug: "la-ice-raids-riots-2025",
            category: "immigration",
            verdict: "mixed",
            summary: "Conflicting narratives emerged about ICE enforcement actions in Los Angeles, with viral claims about 'riots' requiring significant context.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://pmc.ncbi.nlm.nih.gov/articles/PMC12457897/",
                "https://www.trtworld.com/article/7e2b7bfd09d3",
                "https://www.politifact.com/article/2025/dec/15/lie-of-the-year-2025-winner/"
            ],
            tags: ["immigration", "ICE", "protests"],
            reportStatus: "live"
        },
        {
            id: 4,
            title: "Trade War 2.0 Tariff Claims",
            slug: "trade-war-tariffs-2025",
            category: "economic",
            verdict: "misleading",
            summary: "Claims about tariff impacts on consumers and manufacturers contain significant misrepresentations of economic data.",
            dateOfClaim: "2025",
            claimant: "Multiple",
            initialSources: [
                "https://misinforeview.hks.harvard.edu/article/the-small-effects-of-short-user-corrections-on-misinformation-in-brazil-india-and-the-united-kingdom/",
                "https://www.trtworld.com/article/7e2b7bfd09d3",
                "https://www.politifact.com/article/2025/nov/21/lie-year-vote-reader-poll-choice/",
                "https://apnews.com/hub/year-in-review"
            ],
            tags: ["tariffs", "trade war", "economy"],
            reportStatus: "live"
        },
        {
            id: 5,
            title: "Gaza Ceasefire Deal Attribution",
            slug: "gaza-ceasefire-attribution-2025",
            category: "international",
            verdict: "misleading",
            summary: "Competing claims about who deserves credit for the Gaza ceasefire deal obscure the complex multi-party negotiations.",
            dateOfClaim: "January 2025",
            claimant: "Multiple",
            initialSources: [
                "https://www.trtworld.com/article/7e2b7bfd09d3",
                "https://www.washingtonpost.com/"
            ],
            tags: ["Gaza", "ceasefire", "foreign policy"],
            reportStatus: "live"
        },
        {
            id: 6,
            title: "Longest Government Shutdown Claims",
            slug: "government-shutdown-2025",
            category: "us-politics",
            verdict: "context",
            summary: "Claims about the 2025 government shutdown being the 'longest in history' require context about duration metrics and impacts.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://www.trtworld.com/article/7e2b7bfd09d3",
                "https://govbudget.com/fact-check/"
            ],
            tags: ["shutdown", "government", "budget"],
            reportStatus: "live"
        },
        {
            id: 7,
            title: "Charlie Kirk Assassination Conspiracy",
            slug: "charlie-kirk-assassination-conspiracy-2025",
            category: "conspiracy",
            verdict: "false",
            summary: "Viral claims about an assassination attempt on Charlie Kirk were debunked by multiple fact-checkers including Alex Jones.",
            dateOfClaim: "2025",
            claimant: "Social media users",
            initialSources: [
                "https://www.newsguardtech.com/media-coverage/",
                "https://www.trtworld.com/article/7e2b7bfd09d3",
                "https://www.politifact.com/article/2025/dec/15/lie-of-the-year-2025-winner/",
                "https://www.poynter.org/commentary/2025/politifact-2025-lie-year/"
            ],
            tags: ["conspiracy", "assassination", "viral"],
            reportStatus: "live"
        },
        {
            id: 8,
            title: "Zohran Mamdani NYC Election Claims",
            slug: "mamdani-nyc-election-2025",
            category: "us-politics",
            verdict: "mixed",
            summary: "Claims about Mamdani's NYC mayoral campaign and alleged extremist associations spread virally with mixed accuracy.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://www.trtworld.com/article/7e2b7bfd09d3",
                "https://apnews.com/hub/year-in-review"
            ],
            tags: ["election", "NYC", "politics"],
            reportStatus: "live"
        },
        {
            id: 9,
            title: "80th UN General Assembly Claims",
            slug: "un-general-assembly-2025",
            category: "international",
            verdict: "context",
            summary: "Various claims about statements and decisions at the 80th UN General Assembly require fact-checking and context.",
            dateOfClaim: "2025",
            claimant: "Multiple",
            initialSources: [
                "https://www.trtworld.com/article/7e2b7bfd09d3",
                "https://govbudget.com/fact-check/"
            ],
            tags: ["UN", "international", "diplomacy"],
            reportStatus: "live"
        },
        {
            id: 10,
            title: "2025 Los Angeles Wildfires Misinformation",
            slug: "la-wildfires-misinfo-jan-2025",
            category: "conspiracy",
            verdict: "false",
            summary: "AI-generated images of the Hollywood sign burning, DEI conspiracy theories, and FEMA funding lies spread during the January fires.",
            dateOfClaim: "January 2025",
            claimant: "Social media users",
            initialSources: [
                "https://fullfact.org/policy/reports/full-fact-report-2025/",
                "https://www.trtworld.com/article/7e2b7bfd09d3",
                "https://www.poynter.org/reporting-editing/2025/most-read-news-articles-year/"
            ],
            tags: ["wildfires", "AI", "conspiracy"],
            reportStatus: "live"
        },

        // === HEALTH & MEDICAL ===
        {
            id: 11,
            title: "Birthright Citizenship Executive Order",
            slug: "birthright-citizenship-eo-2025",
            category: "us-politics",
            verdict: "context",
            summary: "The executive order on birthright citizenship generated competing legal interpretations and misinformation about its scope.",
            dateOfClaim: "January 2025",
            claimant: "Trump Administration",
            initialSources: [
                "https://www.factcheck.org/2025/09/trump-project-2025-and-immigration/",
                "https://www.pewresearch.org/",
                "https://camden.rutgers.edu/media-mentions"
            ],
            tags: ["immigration", "executive order", "constitution"],
            reportStatus: "live"
        },
        {
            id: 12,
            title: "Tylenol and Autism Controversy",
            slug: "tylenol-autism-claims-2025",
            category: "health",
            verdict: "false",
            summary: "Claims linking Tylenol use during pregnancy to autism spectrum disorder misrepresent scientific evidence.",
            dateOfClaim: "2025",
            claimant: "RFK Jr. and allies",
            initialSources: [
                "https://www.factcheck.org/2025/12/the-whoppers-of-2025/",
                "https://www.politifact.com/article/2025/dec/15/lie-of-the-year-2025-winner/",
                "https://www.annenbergpublicpolicycenter.org/claims-about-autism-inflation-and-ukraine-lead-factcheck-orgs-whoppers-of-2025/"
            ],
            tags: ["health", "autism", "vaccines"],
            reportStatus: "live"
        },
        {
            id: 13,
            title: "mRNA Vaccine Misinformation",
            slug: "mrna-vaccine-misinfo-2025",
            category: "health",
            verdict: "false",
            summary: "Persistent false claims about mRNA vaccine technology and its effects continued to spread throughout 2025.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://www.factcheck.org/2025/12/the-whoppers-of-2025/",
                "https://pmc.ncbi.nlm.nih.gov/articles/PMC12457897/"
            ],
            tags: ["vaccines", "mRNA", "COVID"],
            reportStatus: "live"
        },
        {
            id: 14,
            title: "Measles 'Natural' Cures Claims",
            slug: "measles-natural-cures-2025",
            category: "health",
            verdict: "false",
            summary: "Dangerous claims about 'natural' treatments for measles spread as vaccination rates declined.",
            dateOfClaim: "2025",
            claimant: "Anti-vaccine influencers",
            initialSources: [
                "https://www.factcheck.org/2025/12/the-whoppers-of-2025/",
                "https://www.annenbergpublicpolicycenter.org/claims-about-autism-inflation-and-ukraine-lead-factcheck-orgs-whoppers-of-2025/"
            ],
            tags: ["measles", "vaccines", "health"],
            reportStatus: "live"
        },
        {
            id: 15,
            title: "'Phony' BLS Statistics Claims",
            slug: "phony-bls-statistics-2025",
            category: "economic",
            verdict: "false",
            summary: "Claims that Bureau of Labor Statistics data is falsified or manipulated lack evidence and misunderstand methodology.",
            dateOfClaim: "2025",
            claimant: "Donald Trump",
            initialSources: [
                "https://www.factcheck.org/2025/12/the-whoppers-of-2025/",
                "https://thecensusproject.org/2025/12/18/2025-media/",
                "https://www.factcheck.org/2025/12/trumps-native-born-job-creation-claim-based-on-questionable-figures/"
            ],
            tags: ["statistics", "jobs", "economy"],
            reportStatus: "live"
        },
        {
            id: 16,
            title: "Inflation 'Historical Cap' Claim",
            slug: "inflation-historical-cap-2025",
            category: "economic",
            verdict: "false",
            summary: "Claims that inflation reached historically unprecedented levels misrepresent economic data and historical context.",
            dateOfClaim: "2025",
            claimant: "Multiple",
            initialSources: [
                "https://www.factcheck.org/2025/12/the-whoppers-of-2025/",
                "https://www.pbs.org/newshour/politics/fact-checking-trumps-2025-address-to-congress",
                "https://www.annenbergpublicpolicycenter.org/claims-about-autism-inflation-and-ukraine-lead-factcheck-orgs-whoppers-of-2025/"
            ],
            tags: ["inflation", "economy", "statistics"],
            reportStatus: "live"
        },
        {
            id: 17,
            title: "Reciprocal Tariff Chart Fabrication",
            slug: "reciprocal-tariff-chart-2025",
            category: "economic",
            verdict: "false",
            summary: "A viral chart showing 'reciprocal' tariff rates contained fabricated data not matching actual trade agreements.",
            dateOfClaim: "April 2025",
            claimant: "White House",
            initialSources: [
                "https://www.factcheck.org/2025/12/the-whoppers-of-2025/",
                "https://govbudget.com/fact-check/"
            ],
            tags: ["tariffs", "chart", "fabrication"],
            reportStatus: "live"
        },
        {
            id: 18,
            title: "DOGE Gaza Condom Claim",
            slug: "doge-gaza-condom-claim-2025",
            category: "us-politics",
            verdict: "misleading",
            summary: "DOGE's claims about federal spending on condoms in Gaza misrepresented foreign aid programs.",
            dateOfClaim: "2025",
            claimant: "DOGE",
            initialSources: [
                "https://www.factcheck.org/2025/12/the-whoppers-of-2025/",
                "https://govbudget.com/fact-check/"
            ],
            tags: ["DOGE", "foreign aid", "spending"],
            reportStatus: "live"
        },
        {
            id: 19,
            title: "Ukraine-Russia War Origin Claims",
            slug: "ukraine-russia-war-origin-2025",
            category: "international",
            verdict: "false",
            summary: "False narratives about the origins and causes of the Ukraine-Russia war continued to spread.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://www.factcheck.org/2025/12/the-whoppers-of-2025/",
                "https://www.annenbergpublicpolicycenter.org/claims-about-autism-inflation-and-ukraine-lead-factcheck-orgs-whoppers-of-2025/"
            ],
            tags: ["Ukraine", "Russia", "war"],
            reportStatus: "live"
        },
        {
            id: 20,
            title: "Tren de Aragua (TDA) Gang Claims",
            slug: "tda-gang-claims-2025",
            category: "immigration",
            verdict: "mixed",
            summary: "Claims about the Venezuelan gang Tren de Aragua's presence in the US were often exaggerated or misattributed.",
            dateOfClaim: "2025",
            claimant: "Various politicians",
            initialSources: [
                "https://www.factcheck.org/2025/12/the-whoppers-of-2025/",
                "https://govbudget.com/fact-check/"
            ],
            tags: ["gangs", "immigration", "crime"],
            reportStatus: "live"
        },

        // === MORE U.S. POLITICS ===
        {
            id: 21,
            title: "Portland's 'Burning' Narrative",
            slug: "portland-burning-narrative-2025",
            category: "us-politics",
            verdict: "false",
            summary: "Recycled claims about Portland being 'destroyed' by protests were debunked as outdated and exaggerated.",
            dateOfClaim: "2025",
            claimant: "Conservative media",
            initialSources: [
                "https://www.factcheck.org/2025/12/the-whoppers-of-2025/",
                "https://www.politifact.com/article/2025/nov/21/lie-year-vote-reader-poll-choice/"
            ],
            tags: ["Portland", "protests", "cities"],
            reportStatus: "live"
        },
        {
            id: 22,
            title: "D.C. Murder Rate Comparison",
            slug: "dc-murder-rate-comparison-2025",
            category: "us-politics",
            verdict: "misleading",
            summary: "Claims comparing D.C. murder rates to other cities used cherry-picked data and misleading metrics.",
            dateOfClaim: "2025",
            claimant: "Multiple",
            initialSources: [
                "https://www.factcheck.org/2025/12/the-whoppers-of-2025/",
                "https://heartland.org/opinion/40-examples-of-fake-news-in-2025/"
            ],
            tags: ["crime", "DC", "statistics"],
            reportStatus: "live"
        },
        {
            id: 23,
            title: "Pete Hegseth Signalgate",
            slug: "hegseth-signalgate-2025",
            category: "us-politics",
            verdict: "context",
            summary: "The controversy over Pete Hegseth's Signal communications requires context about security protocols and precedent.",
            dateOfClaim: "2025",
            claimant: "Multiple",
            initialSources: [
                "https://www.factcheck.org/2025/12/the-whoppers-of-2025/",
                "https://www.politifact.com/article/2025/nov/21/lie-year-vote-reader-poll-choice/",
                "https://www.poynter.org/reporting-editing/2025/most-read-news-articles-year/"
            ],
            tags: ["Hegseth", "Signal", "security"],
            reportStatus: "live"
        },
        {
            id: 24,
            title: "Meta Third-Party Fact-Check Exit",
            slug: "meta-tpfc-exit-2025",
            category: "platform",
            verdict: "context",
            summary: "Meta's decision to end third-party fact-checking generated both accurate reporting and misinformation about implications.",
            dateOfClaim: "January 2025",
            claimant: "Meta/Various",
            initialSources: [
                "https://fullfact.org/policy/reports/full-fact-report-2025/",
                "https://committees.parliament.uk/writtenevidence/138329/html/",
                "https://misinforeview.hks.harvard.edu/article/the-small-effects-of-short-user-corrections-on-misinformation-in-brazil-india-and-the-united-kingdom/"
            ],
            tags: ["Meta", "fact-checking", "platform"],
            reportStatus: "live"
        },
        {
            id: 25,
            title: "Southport Stabbing Riots Misinfo",
            slug: "southport-stabbing-misinfo-2025",
            category: "international",
            verdict: "false",
            summary: "False claims about the identity and background of the Southport attacker fueled riots across the UK.",
            dateOfClaim: "2025",
            claimant: "Far-right actors",
            initialSources: [
                "https://fullfact.org/policy/reports/full-fact-report-2025/",
                "https://www.newsguardtech.com/media-coverage/",
                "https://jmir.org/2025/1/e64225"
            ],
            tags: ["UK", "riots", "misidentification"],
            reportStatus: "live"
        },
        {
            id: 26,
            title: "JD Vance 'Misinformation' Comments",
            slug: "vance-misinformation-comments-2025",
            category: "us-politics",
            verdict: "context",
            summary: "JD Vance's statements about misinformation and fact-checking sparked debate about definitions and intentions.",
            dateOfClaim: "2025",
            claimant: "JD Vance",
            initialSources: [
                "https://fullfact.org/policy/reports/full-fact-report-2025/",
                "https://committees.parliament.uk/writtenevidence/138329/html/",
                "https://www.newsguardtech.com/reports/"
            ],
            tags: ["Vance", "misinformation", "politics"],
            reportStatus: "live"
        },
        {
            id: 27,
            title: "NSF Grant Termination Claims",
            slug: "nsf-grant-termination-2025",
            category: "us-politics",
            verdict: "context",
            summary: "Claims about NSF grant terminations conflated legitimate policy changes with conspiracy theories.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://fullfact.org/policy/reports/full-fact-report-2025/",
                "https://www.politifact.com/article/2025/dec/15/lie-of-the-year-2025-winner/"
            ],
            tags: ["NSF", "science", "grants"],
            reportStatus: "live"
        },

        // === AI & DEEPFAKES ===
        {
            id: 28,
            title: "Syria Assad Underground Photo",
            slug: "syria-assad-underground-photo-2025",
            category: "ai-deepfakes",
            verdict: "false",
            summary: "Viral images purporting to show Assad's underground bunker were AI-generated or misattributed.",
            dateOfClaim: "December 2025",
            claimant: "Social media",
            initialSources: [
                "https://fullfact.org/policy/reports/full-fact-report-2025/",
                "https://dfrlab.org/research-and-analysis-archives/"
            ],
            tags: ["Syria", "AI", "deepfake"],
            reportStatus: "live"
        },
        {
            id: 29,
            title: "Hollywood Sign AI Fire Image",
            slug: "hollywood-sign-ai-fire-2025",
            category: "ai-deepfakes",
            verdict: "false",
            summary: "AI-generated images of the Hollywood sign on fire went viral during the Los Angeles wildfires.",
            dateOfClaim: "January 2025",
            claimant: "Social media users",
            initialSources: [
                "https://fullfact.org/policy/reports/full-fact-report-2025/",
                "https://www.poynter.org/reporting-editing/2025/most-read-news-articles-year/"
            ],
            tags: ["AI", "Hollywood", "wildfires"],
            reportStatus: "live"
        },
        {
            id: 30,
            title: "IDF Soldier Captivity Image",
            slug: "idf-soldier-captivity-image-2025",
            category: "ai-deepfakes",
            verdict: "false",
            summary: "Manipulated images claiming to show IDF soldiers in captivity were exposed as fakes.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://fullfact.org/policy/reports/full-fact-report-2025/",
                "https://www.newsguardtech.com/reports/"
            ],
            tags: ["IDF", "Israel", "manipulation"],
            reportStatus: "live"
        },

        // === BRAZIL ===
        {
            id: 31,
            title: "Brazil Election Integrity Claims",
            slug: "brazil-election-integrity-2025",
            category: "international",
            verdict: "false",
            summary: "Persistent false claims about Brazilian election integrity continued despite court rulings and evidence.",
            dateOfClaim: "2025",
            claimant: "Bolsonaro supporters",
            initialSources: [
                "https://meedan.org/post/silent-disinformation-findings-about-brazilian-democracy-in-2024",
                "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2025/dnr-executive-summary"
            ],
            tags: ["Brazil", "elections", "democracy"],
            reportStatus: "live"
        },
        {
            id: 32,
            title: "Brazil Supreme Court Bias Claims",
            slug: "brazil-supreme-court-bias-2025",
            category: "international",
            verdict: "misleading",
            summary: "Claims about systematic bias in Brazil's Supreme Court decisions lacked supporting evidence.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://meedan.org/post/silent-disinformation-findings-about-brazilian-democracy-in-2024",
                "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2025/dnr-executive-summary"
            ],
            tags: ["Brazil", "courts", "judiciary"],
            reportStatus: "live"
        },
        {
            id: 33,
            title: "'Premature Sexualization' Narrative",
            slug: "premature-sexualization-narrative-2025",
            category: "international",
            verdict: "misleading",
            summary: "Claims about educational materials promoting 'premature sexualization' misrepresented actual content.",
            dateOfClaim: "2025",
            claimant: "Conservative groups",
            initialSources: [
                "https://meedan.org/post/silent-disinformation-findings-about-brazilian-democracy-in-2024",
                "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2025/dnr-executive-summary"
            ],
            tags: ["education", "Brazil", "culture war"],
            reportStatus: "live"
        },

        // === AFRICAN MISINFORMATION ===
        {
            id: 34,
            title: "Ebola Outbreak 2025 (DRC) Misinfo",
            slug: "ebola-outbreak-drc-2025",
            category: "african",
            verdict: "mixed",
            summary: "The 2025 DRC Ebola outbreak was accompanied by dangerous misinformation about causes and treatments.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://www.afro.who.int/sites/default/files/2025-09/Infodemic%20Insights%20report%201-15%20september%2C%202025-%20170.pdf",
                "https://heartland.org/opinion/40-examples-of-fake-news-in-2025/"
            ],
            tags: ["Ebola", "DRC", "health"],
            reportStatus: "live"
        },
        {
            id: 35,
            title: "Ebola Vaccine Sterility Claims",
            slug: "ebola-vaccine-sterility-2025",
            category: "african",
            verdict: "false",
            summary: "False claims that Ebola vaccines cause sterility endangered public health response efforts.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.afro.who.int/sites/default/files/2025-09/Infodemic%20Insights%20report%201-15%20september%2C%202025-%20170.pdf",
                "https://africacheck.org/"
            ],
            tags: ["vaccines", "sterility", "conspiracy"],
            reportStatus: "live"
        },
        {
            id: 36,
            title: "Ebola Organ Theft Claims",
            slug: "ebola-organ-theft-2025",
            category: "african",
            verdict: "false",
            summary: "Conspiracy theories about Ebola being a cover for organ theft spread in affected regions.",
            dateOfClaim: "2025",
            claimant: "Local rumors",
            initialSources: [
                "https://www.afro.who.int/sites/default/files/2025-09/Infodemic%20Insights%20report%201-15%20september%2C%202025-%20170.pdf",
                "https://africacheck.org/"
            ],
            tags: ["Ebola", "conspiracy", "organs"],
            reportStatus: "live"
        },
        {
            id: 37,
            title: "African Tetanus/Polio Sterilization",
            slug: "african-vaccine-sterilization-2025",
            category: "african",
            verdict: "false",
            summary: "Recycled conspiracy theories about vaccines causing sterilization in Africa resurfaced in 2025.",
            dateOfClaim: "2025",
            claimant: "Anti-vaccine groups",
            initialSources: [
                "https://www.afro.who.int/sites/default/files/2025-09/Infodemic%20Insights%20report%201-15%20september%2C%202025-%20170.pdf",
                "https://africacheck.org/"
            ],
            tags: ["vaccines", "Africa", "conspiracy"],
            reportStatus: "live"
        },
        {
            id: 38,
            title: "Nigeria Petroleum Surcharge Hoax",
            slug: "nigeria-petroleum-surcharge-2025",
            category: "african",
            verdict: "false",
            summary: "False claims about new petroleum surcharges in Nigeria caused unnecessary public panic.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://factcheck.thecable.ng/top-misinformation-trends-on-nigerian-social-media-in-2025/",
                "https://africacheck.org/"
            ],
            tags: ["Nigeria", "petroleum", "economy"],
            reportStatus: "live"
        },
        {
            id: 39,
            title: "Nigeria Bank Account/NIN Access",
            slug: "nigeria-nin-bank-access-2025",
            category: "african",
            verdict: "misleading",
            summary: "Claims about bank account access being linked to NIN registration contained inaccuracies.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://factcheck.thecable.ng/top-misinformation-trends-on-nigerian-social-media-in-2025/",
                "https://www.whitehouse.gov/fact-sheets/"
            ],
            tags: ["Nigeria", "banking", "ID"],
            reportStatus: "live"
        },
        {
            id: 40,
            title: "SA Zulu King Salary Claims",
            slug: "sa-zulu-king-salary-2025",
            category: "african",
            verdict: "misleading",
            summary: "Claims about the Zulu King's government salary were exaggerated or misattributed.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://africacheck.org/",
                "https://www.whitehouse.gov/fact-sheets/"
            ],
            tags: ["South Africa", "monarchy", "spending"],
            reportStatus: "live"
        },
        {
            id: 41,
            title: "SA Illegal Migrants (15 Million) Claim",
            slug: "sa-illegal-migrants-claim-2025",
            category: "african",
            verdict: "false",
            summary: "Claims that South Africa has 15 million illegal migrants are unsupported by evidence.",
            dateOfClaim: "2025",
            claimant: "Politicians",
            initialSources: [
                "https://africacheck.org/",
                "https://www.pewresearch.org/"
            ],
            tags: ["South Africa", "immigration", "statistics"],
            reportStatus: "live"
        },
        {
            id: 42,
            title: "Nigeria School Opening Misinfo",
            slug: "nigeria-school-opening-2025",
            category: "african",
            verdict: "false",
            summary: "False claims about school opening dates caused confusion for Nigerian parents.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://africacheck.org/",
                "https://www.whitehouse.gov/fact-sheets/"
            ],
            tags: ["Nigeria", "education", "schools"],
            reportStatus: "live"
        },
        {
            id: 43,
            title: "South Africa Self-Defense Right",
            slug: "sa-self-defense-right-2025",
            category: "african",
            verdict: "misleading",
            summary: "Claims about changes to self-defense laws in South Africa misrepresented legal standards.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://africacheck.org/",
                "https://www.whitehouse.gov/fact-sheets/"
            ],
            tags: ["South Africa", "law", "self-defense"],
            reportStatus: "live"
        },
        {
            id: 44,
            title: "SA Mozambican Woman Arrest Photo",
            slug: "sa-mozambican-arrest-photo-2025",
            category: "african",
            verdict: "false",
            summary: "A viral photo claiming to show a Mozambican woman's arrest was misattributed.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://africacheck.org/",
                "https://www.whitehouse.gov/fact-sheets/"
            ],
            tags: ["South Africa", "Mozambique", "misattribution"],
            reportStatus: "live"
        },
        {
            id: 45,
            title: "Nigeria Education Fees Hoax",
            slug: "nigeria-education-fees-2025",
            category: "african",
            verdict: "false",
            summary: "False claims about new education fees in Nigeria spread viral panic.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://africacheck.org/",
                "https://www.whitehouse.gov/fact-sheets/"
            ],
            tags: ["Nigeria", "education", "fees"],
            reportStatus: "live"
        },
        {
            id: 46,
            title: "SA Metro Spending Claims",
            slug: "sa-metro-spending-2025",
            category: "african",
            verdict: "misleading",
            summary: "Claims about South African metropolitan spending contained significant inaccuracies.",
            dateOfClaim: "2025",
            claimant: "Opposition politicians",
            initialSources: [
                "https://africacheck.org/",
                "https://www.whitehouse.gov/fact-sheets/"
            ],
            tags: ["South Africa", "government", "spending"],
            reportStatus: "live"
        },

        // === SOUTH ASIAN ===
        {
            id: 47,
            title: "India-Pakistan Crisis (Karachi Invasion)",
            slug: "india-pakistan-karachi-invasion-2025",
            category: "south-asian",
            verdict: "false",
            summary: "False claims about an Indian invasion of Karachi spread during the 2025 crisis.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://reutersinstitute.politics.ox.ac.uk/news/truth-casualty-how-indian-fact-checkers-debunked-false-claims-during-india-pakistan-crisis",
                "https://www.boomlive.in/"
            ],
            tags: ["India", "Pakistan", "military"],
            reportStatus: "live"
        },
        {
            id: 48,
            title: "Yogi Adityanath Resignation Deepfake",
            slug: "yogi-adityanath-deepfake-2025",
            category: "ai-deepfakes",
            verdict: "false",
            summary: "A deepfake video falsely showing Yogi Adityanath resigning went viral.",
            dateOfClaim: "2025",
            claimant: "Unknown",
            initialSources: [
                "https://www.boomlive.in/",
                "https://www.nordishub.eu/internal-mapping-ais-role-in-disinformation-in-the-nordic-is-less-than-feared-but-not-harmless/"
            ],
            tags: ["India", "deepfake", "politics"],
            reportStatus: "live"
        },
        {
            id: 49,
            title: "Unnao Rape Convict Garlanded (AI)",
            slug: "unnao-rape-convict-ai-2025",
            category: "ai-deepfakes",
            verdict: "false",
            summary: "AI-manipulated images falsely showed a rape convict being garlanded.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.boomlive.in/",
                "https://www.nordishub.eu/internal-mapping-ais-role-in-disinformation-in-the-nordic-is-less-than-feared-but-not-harmless/"
            ],
            tags: ["India", "AI", "crime"],
            reportStatus: "live"
        },
        {
            id: 50,
            title: "India Digital Arrest Scam",
            slug: "india-digital-arrest-scam-2025",
            category: "south-asian",
            verdict: "context",
            summary: "The 'digital arrest' scam targeting Indians became a major fraud trend in 2025.",
            dateOfClaim: "2025",
            claimant: "Scammers",
            initialSources: [
                "https://www.boomlive.in/",
                "https://www.nordishub.eu/internal-mapping-ais-role-in-disinformation-in-the-nordic-is-less-than-feared-but-not-harmless/"
            ],
            tags: ["India", "scam", "fraud"],
            reportStatus: "live"
        },
        {
            id: 51,
            title: "Bangladesh Police Dipu Das Video",
            slug: "bangladesh-dipu-das-video-2025",
            category: "south-asian",
            verdict: "misleading",
            summary: "A video involving Bangladeshi police was misattributed and taken out of context.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.boomlive.in/",
                "https://www.nordishub.eu/internal-mapping-ais-role-in-disinformation-in-the-nordic-is-less-than-feared-but-not-harmless/"
            ],
            tags: ["Bangladesh", "police", "video"],
            reportStatus: "live"
        },
        {
            id: 52,
            title: "Modi Cheapfakes",
            slug: "modi-cheapfakes-2025",
            category: "ai-deepfakes",
            verdict: "false",
            summary: "Multiple 'cheapfake' videos misrepresenting PM Modi's statements spread in 2025.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://www.boomlive.in/",
                "https://www.nordishub.eu/internal-mapping-ais-role-in-disinformation-in-the-nordic-is-less-than-feared-but-not-harmless/"
            ],
            tags: ["India", "Modi", "cheapfake"],
            reportStatus: "live"
        },

        // === RUSSIAN DISINFORMATION ===
        {
            id: 53,
            title: "Storm-1516 Russian Campaigns",
            slug: "storm-1516-russian-campaigns-2025",
            category: "russian-disinfo",
            verdict: "context",
            summary: "Microsoft-identified Russian influence operation Storm-1516 conducted multiple campaigns in 2025.",
            dateOfClaim: "2025",
            claimant: "Russian state actors",
            initialSources: [
                "https://www.newsguardtech.com/special-reports/ai-tracking-center/",
                "https://www.newsguardrealitycheck.com/",
                "https://www.newsguardtech.com/reports/"
            ],
            tags: ["Russia", "influence", "Storm-1516"],
            reportStatus: "live"
        },
        {
            id: 54,
            title: "DeepSeek Chatbot Accuracy Audit",
            slug: "deepseek-chatbot-accuracy-2025",
            category: "ai-deepfakes",
            verdict: "context",
            summary: "Audits revealed significant accuracy issues with the Chinese DeepSeek AI chatbot.",
            dateOfClaim: "2025",
            claimant: "NewsGuard",
            initialSources: [
                "https://www.newsguardtech.com/special-reports/ai-tracking-center/",
                "https://graphika.com/in-the-media",
                "https://www.newsguardtech.com/reports/"
            ],
            tags: ["AI", "China", "chatbot"],
            reportStatus: "live"
        },
        {
            id: 55,
            title: "Pravda Dashboard / Network",
            slug: "pravda-network-2025",
            category: "russian-disinfo",
            verdict: "context",
            summary: "The Pravda disinformation network continued operations with documented AI integration.",
            dateOfClaim: "2025",
            claimant: "Russian state",
            initialSources: [
                "https://www.newsguardtech.com/special-reports/ai-tracking-center/",
                "https://dfrlab.org/research-and-analysis-archives/",
                "https://www.atlanticcouncil.org/programs/digital-forensic-research-lab/",
                "https://pmc.ncbi.nlm.nih.gov/articles/PMC12457897/"
            ],
            tags: ["Russia", "Pravda", "disinformation"],
            reportStatus: "live"
        },
        {
            id: 56,
            title: "Starmer UK Curfew Fake Video",
            slug: "starmer-curfew-fake-video-2025",
            category: "ai-deepfakes",
            verdict: "false",
            summary: "A fabricated video showing UK PM Starmer announcing curfews was part of Storm-1516.",
            dateOfClaim: "2025",
            claimant: "Storm-1516",
            initialSources: [
                "https://www.newsguardtech.com/media-coverage/",
                "https://www.newsguardtech.com/reports/",
                "https://fullfact.org/latest/"
            ],
            tags: ["UK", "deepfake", "Starmer"],
            reportStatus: "live"
        },
        {
            id: 57,
            title: "John Mark Dougan Storm-1516 Lead",
            slug: "john-mark-dougan-storm-1516-2025",
            category: "russian-disinfo",
            verdict: "context",
            summary: "Former US deputy sheriff John Mark Dougan was identified as a key Storm-1516 operative.",
            dateOfClaim: "2025",
            claimant: "Investigators",
            initialSources: [
                "https://www.newsguardtech.com/media-coverage/",
                "https://www.newsguardrealitycheck.com/",
                "https://www.newsguardtech.com/special-reports/ai-tracking-center/"
            ],
            tags: ["Russia", "Dougan", "influence"],
            reportStatus: "live"
        },
        {
            id: 58,
            title: "Google Gemini Misinformation Audit",
            slug: "google-gemini-misinfo-audit-2025",
            category: "ai-deepfakes",
            verdict: "context",
            summary: "Audits revealed Google Gemini AI providing inaccurate information on sensitive topics.",
            dateOfClaim: "2025",
            claimant: "NewsGuard",
            initialSources: [
                "https://www.newsguardtech.com/reports/",
                "https://www.newsguardrealitycheck.com/"
            ],
            tags: ["AI", "Google", "Gemini"],
            reportStatus: "live"
        },

        // === VIRAL CONSPIRACIES ===
        {
            id: 59,
            title: "'Epstein Files' Fabrication Claim",
            slug: "epstein-files-fabrication-2025",
            category: "conspiracy",
            verdict: "mixed",
            summary: "Claims about fabricated Epstein files mixed legitimate documents with viral hoaxes.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://www.newsguardrealitycheck.com/",
                "https://www.politifact.com/article/2025/nov/21/lie-year-vote-reader-poll-choice/",
                "https://www.politifact.com/article/2025/dec/15/lie-of-the-year-2025-winner/"
            ],
            tags: ["Epstein", "documents", "conspiracy"],
            reportStatus: "live"
        },
        {
            id: 60,
            title: "Trump 'Walker' Image",
            slug: "trump-walker-image-2025",
            category: "ai-deepfakes",
            verdict: "false",
            summary: "A manipulated image showing Trump using a walker was exposed as fake.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.newsguardrealitycheck.com/",
                "https://www.newsguardtech.com/special-reports/2024-elections-misinformation-tracker/"
            ],
            tags: ["Trump", "health", "manipulation"],
            reportStatus: "live"
        },
        {
            id: 61,
            title: "'Trump is Dead' Labor Day Conspiracy",
            slug: "trump-dead-labor-day-2025",
            category: "conspiracy",
            verdict: "false",
            summary: "A bizarre conspiracy theory claiming Trump died on Labor Day spread on social media.",
            dateOfClaim: "September 2025",
            claimant: "Conspiracy theorists",
            initialSources: [
                "https://www.politifact.com/article/2025/nov/21/lie-year-vote-reader-poll-choice/",
                "https://www.politifact.com/article/2025/dec/15/history-lie-of-the-year-2009-2025/"
            ],
            tags: ["Trump", "death hoax", "conspiracy"],
            reportStatus: "live"
        },
        {
            id: 62,
            title: "Pritzker SNAP Machines Shutdown",
            slug: "pritzker-snap-shutdown-2025",
            category: "us-politics",
            verdict: "false",
            summary: "False claims that Illinois Gov. Pritzker shut down SNAP benefit machines spread virally.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.politifact.com/article/2025/nov/21/lie-year-vote-reader-poll-choice/",
                "https://www.newsguardtech.com/media-coverage/"
            ],
            tags: ["SNAP", "Illinois", "welfare"],
            reportStatus: "live"
        },
        {
            id: 63,
            title: "Mike Lee 'Marxist' Ideology Claim",
            slug: "mike-lee-marxist-claim-2025",
            category: "us-politics",
            verdict: "false",
            summary: "Claims labeling Sen. Mike Lee a 'Marxist' misrepresented his political positions.",
            dateOfClaim: "2025",
            claimant: "Political opponents",
            initialSources: [
                "https://www.politifact.com/article/2025/nov/21/lie-year-vote-reader-poll-choice/",
                "https://www.factcheck.org/fake-news/"
            ],
            tags: ["Mike Lee", "Marxism", "politics"],
            reportStatus: "live"
        },
        {
            id: 64,
            title: "Netanyahu 'No Starvation' in Gaza",
            slug: "netanyahu-no-starvation-gaza-2025",
            category: "international",
            verdict: "false",
            summary: "Netanyahu's claims about no starvation in Gaza contradicted humanitarian reports.",
            dateOfClaim: "2025",
            claimant: "Benjamin Netanyahu",
            initialSources: [
                "https://www.politifact.com/article/2025/nov/21/lie-year-vote-reader-poll-choice/",
                "https://www.politifact.com/article/2025/dec/15/lie-year-vote-reader-choice-results/"
            ],
            tags: ["Gaza", "Netanyahu", "humanitarian"],
            reportStatus: "live"
        },
        {
            id: 65,
            title: "Abrego Garcia MS-13 Tattoos",
            slug: "abrego-garcia-ms13-tattoos-2025",
            category: "immigration",
            verdict: "false",
            summary: "Claims about Kilmar Abrego Garcia's MS-13 tattoos were debunked as misidentification.",
            dateOfClaim: "2025",
            claimant: "Immigration officials",
            initialSources: [
                "https://www.politifact.com/article/2025/nov/21/lie-year-vote-reader-poll-choice/",
                "https://www.politifact.com/article/2025/dec/15/lie-of-the-year-2025-winner/"
            ],
            tags: ["immigration", "MS-13", "tattoos"],
            reportStatus: "live"
        },
        {
            id: 66,
            title: "Hakeem Jeffries Ballroom Priority",
            slug: "jeffries-ballroom-priority-2025",
            category: "us-politics",
            verdict: "misleading",
            summary: "Claims that Hakeem Jeffries prioritized a ballroom over disaster relief were misleading.",
            dateOfClaim: "2025",
            claimant: "Conservative media",
            initialSources: [
                "https://www.politifact.com/article/2025/nov/21/lie-year-vote-reader-poll-choice/",
                "https://www.politifact.com/article/2025/dec/15/lie-of-the-year-2025-winner/"
            ],
            tags: ["Jeffries", "Congress", "spending"],
            reportStatus: "live"
        },
        {
            id: 67,
            title: "Jeffries 'Ended Medical Research'",
            slug: "jeffries-ended-medical-research-2025",
            category: "us-politics",
            verdict: "false",
            summary: "Claims that Hakeem Jeffries ended medical research funding were false.",
            dateOfClaim: "2025",
            claimant: "Political opponents",
            initialSources: [
                "https://www.politifact.com/article/2025/nov/21/lie-year-vote-reader-poll-choice/",
                "https://www.politifact.com/article/2025/dec/15/lie-of-the-year-2025-winner/"
            ],
            tags: ["Jeffries", "NIH", "research"],
            reportStatus: "live"
        },
        {
            id: 68,
            title: "Ruby Bradley 'Loser' Quote",
            slug: "ruby-bradley-loser-quote-2025",
            category: "media",
            verdict: "false",
            summary: "A viral quote attributed to decorated Army nurse Ruby Bradley was fabricated.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.factcheck.org/fake-news/",
                "https://www.factcheck.org/2025/05/was-record-of-heroic-nurse-wiped-from-defense-department-archives/"
            ],
            tags: ["military", "quotes", "fabrication"],
            reportStatus: "live"
        },
        {
            id: 69,
            title: "JD Vance / Musk Fake Audio",
            slug: "vance-musk-fake-audio-2025",
            category: "ai-deepfakes",
            verdict: "false",
            summary: "Fake audio purporting to show JD Vance criticizing Elon Musk was AI-generated.",
            dateOfClaim: "2025",
            claimant: "Unknown",
            initialSources: [
                "https://www.factcheck.org/fake-news/",
                "https://www.factcheck.org/2025/03/viral-posts-share-phony-leaked-audio-of-vance-criticizing-musk/"
            ],
            tags: ["Vance", "Musk", "audio", "AI"],
            reportStatus: "live"
        },
        {
            id: 70,
            title: "Trump / Duterte Arrest Response",
            slug: "trump-duterte-arrest-response-2025",
            category: "ai-deepfakes",
            verdict: "false",
            summary: "Video claiming to show Trump responding to Duterte's arrest used recycled 2018 footage.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.factcheck.org/fake-news/",
                "https://www.factcheck.org/person/donald-trump/",
                "https://www.factcheck.org/2025/04/how-to-combat-misinformation/"
            ],
            tags: ["Trump", "Duterte", "recycled video"],
            reportStatus: "live"
        },

        // === MORE FACT CHECKS ===
        {
            id: 71,
            title: "USDA Transgender Study Misinfo",
            slug: "usda-transgender-study-2025",
            category: "us-politics",
            verdict: "misleading",
            summary: "Claims about a USDA 'transgender study' misrepresented research on feminine hygiene products.",
            dateOfClaim: "2025",
            claimant: "Conservative media",
            initialSources: [
                "https://www.factcheck.org/fake-news/",
                "https://www.factcheck.org/2025/03/study-focused-on-feminine-hygiene-products-not-transgender-men/"
            ],
            tags: ["USDA", "transgender", "research"],
            reportStatus: "pending"
        },
        {
            id: 72,
            title: "Patriot Front Agents Claim",
            slug: "patriot-front-agents-claim-2025",
            category: "conspiracy",
            verdict: "false",
            summary: "Claims that Patriot Front members are federal agents were debunked despite continued activity.",
            dateOfClaim: "2025",
            claimant: "Conspiracy theorists",
            initialSources: [
                "https://www.factcheck.org/fake-news/",
                "https://www.factcheck.org/2025/03/white-nationalist-group-is-still-active-contrary-to-social-media-claims/"
            ],
            tags: ["Patriot Front", "federal agents", "conspiracy"],
            reportStatus: "pending"
        },
        {
            id: 73,
            title: "Trump Native-Born Job Creation",
            slug: "trump-native-born-jobs-2025",
            category: "economic",
            verdict: "misleading",
            summary: "Trump's claims about native-born job creation used questionable data analysis.",
            dateOfClaim: "2025",
            claimant: "Donald Trump",
            initialSources: [
                "https://www.factcheck.org/",
                "https://www.factcheck.org/2025/12/trumps-native-born-job-creation-claim-based-on-questionable-figures/",
                "https://www.factcheck.org/person/donald-trump/"
            ],
            tags: ["jobs", "native-born", "statistics"],
            reportStatus: "pending"
        },
        {
            id: 74,
            title: "U.S. Vaccine Schedule vs. Global",
            slug: "us-vaccine-schedule-global-2025",
            category: "health",
            verdict: "misleading",
            summary: "Claims about the US vaccine schedule being uniquely large misrepresented global data.",
            dateOfClaim: "2025",
            claimant: "Anti-vaccine advocates",
            initialSources: [
                "https://www.factcheck.org/",
                "https://www.factcheck.org/person/donald-trump/",
                "https://www.newsguardtech.com/reports/"
            ],
            tags: ["vaccines", "schedule", "global"],
            reportStatus: "pending"
        },
        {
            id: 75,
            title: "Menopausal Hormone Therapy Benefits",
            slug: "menopausal-hormone-therapy-2025",
            category: "health",
            verdict: "context",
            summary: "Claims about hormone therapy benefits lacked nuance about risks and individual variation.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://www.factcheck.org/",
                "https://www.factcheck.org/person/donald-trump/"
            ],
            tags: ["HRT", "menopause", "health"],
            reportStatus: "pending"
        },
        {
            id: 76,
            title: "Trump 'Shitholes' Admission",
            slug: "trump-shitholes-admission-2025",
            category: "us-politics",
            verdict: "context",
            summary: "Claims about Trump 'admitting' to the 'shithole countries' comment required context.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://www.factcheck.org/",
                "https://www.factcheck.org/person/donald-trump/"
            ],
            tags: ["Trump", "immigration", "quotes"],
            reportStatus: "pending"
        },
        {
            id: 77,
            title: "Air Traffic Control Sorting Claims",
            slug: "atc-sorting-claims-2025",
            category: "us-politics",
            verdict: "misleading",
            summary: "Claims about 'diversity' affecting air traffic control hiring misrepresented FAA policies.",
            dateOfClaim: "2025",
            claimant: "Conservative media",
            initialSources: [
                "https://www.factcheck.org/",
                "https://www.factcheck.org/person/donald-trump/",
                "https://www.newsguardtech.com/reports/"
            ],
            tags: ["FAA", "DEI", "aviation"],
            reportStatus: "pending"
        },
        {
            id: 78,
            title: "NC Wireless Driving Ban Law",
            slug: "nc-wireless-driving-ban-2025",
            category: "us-politics",
            verdict: "misleading",
            summary: "Claims about North Carolina's wireless driving ban misrepresented the actual legislation.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.politifact.com/",
                "https://reutersinstitute.politics.ox.ac.uk/news/our-podcast-digital-news-report-2025-episode-4-how-people-check-if-information-real-or-fake",
                "https://www.politifact.com/article/2025/dec/15/history-lie-of-the-year-2009-2025/"
            ],
            tags: ["North Carolina", "driving", "law"],
            reportStatus: "pending"
        },
        {
            id: 79,
            title: "Autopen Pardon Termination",
            slug: "autopen-pardon-termination-2025",
            category: "us-politics",
            verdict: "false",
            summary: "Claims about pardons being terminated due to autopen signatures were legally unfounded.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://www.politifact.com/",
                "https://reutersinstitute.politics.ox.ac.uk/news/our-podcast-digital-news-report-2025-episode-4-how-people-check-if-information-real-or-fake",
                "https://www.politifact.com/article/2025/dec/15/history-lie-of-the-year-2009-2025/"
            ],
            tags: ["pardon", "autopen", "legal"],
            reportStatus: "pending"
        },
        {
            id: 80,
            title: "Maduro 'Surrender' Video",
            slug: "maduro-surrender-video-2025",
            category: "ai-deepfakes",
            verdict: "false",
            summary: "A fabricated video showing Venezuelan President Maduro surrendering was exposed as fake.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.politifact.com/",
                "https://reutersinstitute.politics.ox.ac.uk/news/our-podcast-digital-news-report-2025-episode-4-how-people-check-if-information-real-or-fake",
                "https://www.politifact.com/article/2025/dec/15/lie-of-the-year-2025-winner/"
            ],
            tags: ["Venezuela", "Maduro", "deepfake"],
            reportStatus: "pending"
        },

        // === FINAL 20 ===
        {
            id: 81,
            title: "Epstein Young Women Archive Photos",
            slug: "epstein-archive-photos-2025",
            category: "conspiracy",
            verdict: "misleading",
            summary: "Viral photos claimed to be from Epstein archives were often misattributed or manipulated.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.politifact.com/",
                "https://www.politifact.com/article/2025/dec/15/lie-of-the-year-2025-winner/"
            ],
            tags: ["Epstein", "photos", "misattribution"],
            reportStatus: "pending"
        },
        {
            id: 82,
            title: "Montana 'Pedophile Bonfire' Hoax",
            slug: "montana-pedophile-bonfire-2025",
            category: "conspiracy",
            verdict: "false",
            summary: "Claims about a 'pedophile bonfire' event in Montana were completely fabricated.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.politifact.com/",
                "https://www.politifact.com/article/2025/dec/15/lie-of-the-year-2025-winner/"
            ],
            tags: ["Montana", "hoax", "vigilantism"],
            reportStatus: "pending"
        },
        {
            id: 83,
            title: "Trump / Bill Clinton Crotch Pat Video",
            slug: "trump-clinton-crotch-pat-2025",
            category: "ai-deepfakes",
            verdict: "false",
            summary: "A manipulated video appearing to show inappropriate behavior was exposed as fake.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.politifact.com/",
                "https://www.politifact.com/article/2025/dec/15/lie-of-the-year-2025-winner/"
            ],
            tags: ["Trump", "Clinton", "manipulation"],
            reportStatus: "pending"
        },
        {
            id: 84,
            title: "RFK Jr. / Antidepressants Target",
            slug: "rfk-antidepressants-target-2025",
            category: "health",
            verdict: "misleading",
            summary: "RFK Jr.'s claims about antidepressants as targets for removal misrepresented medical consensus.",
            dateOfClaim: "2025",
            claimant: "RFK Jr.",
            initialSources: [
                "https://www.poynter.org/reporting-editing/2025/most-read-news-articles-year/",
                "https://members.efcsn.com/application/applicationtjekdeta33a"
            ],
            tags: ["RFK", "antidepressants", "health policy"],
            reportStatus: "pending"
        },
        {
            id: 85,
            title: "D.C. Mid-Air Collision Misinfo",
            slug: "dc-midair-collision-misinfo-2025",
            category: "conspiracy",
            verdict: "mixed",
            summary: "The D.C. mid-air collision tragedy was accompanied by multiple misinformation narratives.",
            dateOfClaim: "January 2025",
            claimant: "Various",
            initialSources: [
                "https://www.poynter.org/reporting-editing/2025/most-read-news-articles-year/",
                "https://members.efcsn.com/application/applicationtjekdeta33a"
            ],
            tags: ["aviation", "DC", "tragedy"],
            reportStatus: "pending"
        },
        {
            id: 86,
            title: "British Budget Details Misinfo",
            slug: "british-budget-misinfo-2025",
            category: "international",
            verdict: "misleading",
            summary: "Claims about the UK budget contained multiple factual errors and misrepresentations.",
            dateOfClaim: "2025",
            claimant: "Various",
            initialSources: [
                "https://www.poynter.org/reporting-editing/2025/most-read-news-articles-year/",
                "https://fullfact.org/politics/five-lessons-from-our-fact-checking-2025/",
                "https://fullfact.org/latest/"
            ],
            tags: ["UK", "budget", "economy"],
            reportStatus: "pending"
        },
        {
            id: 87,
            title: "Hurricane Melissa AI Videos",
            slug: "hurricane-melissa-ai-videos-2025",
            category: "ai-deepfakes",
            verdict: "false",
            summary: "AI-generated videos of 'Hurricane Melissa' destruction depicted non-existent events.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.newsguardtech.com/media-coverage/",
                "https://www.newsguardtech.com/special-reports/ai-tracking-center/"
            ],
            tags: ["hurricane", "AI", "disaster"],
            reportStatus: "pending"
        },
        {
            id: 88,
            title: "Mamdani Extremist Associate Link",
            slug: "mamdani-extremist-link-2025",
            category: "us-politics",
            verdict: "misleading",
            summary: "Claims linking NYC candidate Mamdani to extremists used guilt-by-association fallacies.",
            dateOfClaim: "2025",
            claimant: "Political opponents",
            initialSources: [
                "https://www.newsguardtech.com/media-coverage/",
                "https://www.newsguardtech.com/special-reports/ai-tracking-center/"
            ],
            tags: ["NYC", "Mamdani", "extremism"],
            reportStatus: "pending"
        },
        {
            id: 89,
            title: "AI 'Obituary Pirates'",
            slug: "ai-obituary-pirates-2025",
            category: "platform",
            verdict: "context",
            summary: "AI-generated obituary farms exploited grieving families with fabricated memorial content.",
            dateOfClaim: "2025",
            claimant: "Investigation",
            initialSources: [
                "https://www.newsguardtech.com/media-coverage/",
                "https://graphika.com/reports"
            ],
            tags: ["AI", "obituaries", "scam"],
            reportStatus: "pending"
        },
        {
            id: 90,
            title: "Australian Election Chatbot Poisoning",
            slug: "australia-election-chatbot-2025",
            category: "ai-deepfakes",
            verdict: "context",
            summary: "AI chatbots provided inaccurate information during Australia's federal election.",
            dateOfClaim: "2025",
            claimant: "Investigation",
            initialSources: [
                "https://www.newsguardtech.com/media-coverage/",
                "https://www.thehindu.com/sci-tech/technology/fewer-fact-checks-ascent-of-ai-social-media-scans-for-visas-events-that-marked-digital-platforms-in-2025/article70452036.ece"
            ],
            tags: ["Australia", "election", "AI"],
            reportStatus: "pending"
        },
        {
            id: 91,
            title: "Sean Combs Trial Misinfo",
            slug: "sean-combs-trial-misinfo-2025",
            category: "media",
            verdict: "mixed",
            summary: "The Sean 'Diddy' Combs trial was accompanied by significant viral misinformation.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.newsguardtech.com/media-coverage/",
                "https://www.newsguardtech.com/special-reports/ai-tracking-center/"
            ],
            tags: ["Combs", "trial", "celebrity"],
            reportStatus: "pending"
        },
        {
            id: 92,
            title: "'The Internet Died in 2016' Theory",
            slug: "dead-internet-theory-2025",
            category: "conspiracy",
            verdict: "false",
            summary: "The 'Dead Internet Theory' claiming most online content is AI-generated gained traction despite lack of evidence.",
            dateOfClaim: "2025",
            claimant: "Conspiracy theorists",
            initialSources: [
                "https://www.newsguardtech.com/media-coverage/",
                "https://www.newsguardtech.com/special-reports/ai-tracking-center/"
            ],
            tags: ["internet", "AI", "conspiracy"],
            reportStatus: "pending"
        },
        {
            id: 93,
            title: "Google Lens AI Overviews Misinfo",
            slug: "google-lens-ai-overviews-2025",
            category: "ai-deepfakes",
            verdict: "context",
            summary: "Google's AI Overviews feature provided inaccurate information on multiple occasions.",
            dateOfClaim: "2025",
            claimant: "Google",
            initialSources: [
                "https://fullfact.org/politics/five-lessons-from-our-fact-checking-2025/",
                "https://fullfact.org/"
            ],
            tags: ["Google", "AI", "search"],
            reportStatus: "pending"
        },
        {
            id: 94,
            title: "NATO 'Troops in Coffins'",
            slug: "nato-troops-coffins-2025",
            category: "russian-disinfo",
            verdict: "false",
            summary: "Russian disinformation showed fake images of NATO troops returning in coffins.",
            dateOfClaim: "2025",
            claimant: "Russian state media",
            initialSources: [
                "https://www.newsguardtech.com/reports/",
                "https://www.newsguardtech.com/special-reports/ai-tracking-center/"
            ],
            tags: ["NATO", "Russia", "military"],
            reportStatus: "pending"
        },
        {
            id: 95,
            title: "Maui 'Weather Weapons' Experiment",
            slug: "maui-weather-weapons-2025",
            category: "conspiracy",
            verdict: "false",
            summary: "Conspiracy theories about 'weather weapons' causing the Maui fires resurfaced in 2025.",
            dateOfClaim: "2025",
            claimant: "Conspiracy theorists",
            initialSources: [
                "https://www.newsguardtech.com/reports/",
                "https://www.newsguardtech.com/special-reports/ai-tracking-center/",
                "https://www.disinfo.eu/disinfo-update-30-04-2025-2/"
            ],
            tags: ["Maui", "HAARP", "weather"],
            reportStatus: "pending"
        },
        {
            id: 96,
            title: "Barilla 'Insect Flour' Claims",
            slug: "barilla-insect-flour-2025",
            category: "conspiracy",
            verdict: "false",
            summary: "False claims that Barilla pasta contained 'insect flour' spread in Europe.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.newsguardtech.com/reports/",
                "https://www.newsguardtech.com/special-reports/ai-tracking-center/"
            ],
            tags: ["food", "insects", "Europe"],
            reportStatus: "pending"
        },
        {
            id: 97,
            title: "Hobby Lobby 'Demon' Merchandise",
            slug: "hobby-lobby-demon-merchandise-2025",
            category: "conspiracy",
            verdict: "false",
            summary: "Claims that Hobby Lobby sold 'demonic' merchandise were debunked as misrepresentations.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.newsguardtech.com/reports/",
                "https://www.newsguardtech.com/special-reports/ai-tracking-center/"
            ],
            tags: ["retail", "satanic panic", "hoax"],
            reportStatus: "pending"
        },
        {
            id: 98,
            title: "Target 'Satanic' Coordinated Campaign",
            slug: "target-satanic-campaign-2025",
            category: "conspiracy",
            verdict: "misleading",
            summary: "Coordinated campaigns claiming Target sold 'satanic' items misrepresented products.",
            dateOfClaim: "2025",
            claimant: "Conservative influencers",
            initialSources: [
                "https://www.newsguardtech.com/reports/",
                "https://www.newsguardtech.com/special-reports/ai-tracking-center/"
            ],
            tags: ["Target", "retail", "satanic panic"],
            reportStatus: "pending"
        },
        {
            id: 99,
            title: "Biden Military Situation Room Image",
            slug: "biden-situation-room-image-2025",
            category: "ai-deepfakes",
            verdict: "false",
            summary: "A manipulated image purporting to show Biden in a situation room was AI-generated.",
            dateOfClaim: "2025",
            claimant: "Social media",
            initialSources: [
                "https://www.newsguardtech.com/special-reports/ai-tracking-center/",
                "https://www.newsguardtech.com/reports/"
            ],
            tags: ["Biden", "AI", "manipulation"],
            reportStatus: "pending"
        },
        {
            id: 100,
            title: "'Christmas Decoration Tax' UK",
            slug: "uk-christmas-decoration-tax-2025",
            category: "international",
            verdict: "false",
            summary: "False claims about a UK 'Christmas decoration tax' spread during the holiday season.",
            dateOfClaim: "December 2025",
            claimant: "Social media",
            initialSources: [
                "https://fullfact.org/latest/",
                "https://fullfact.org/",
                "https://www.nuffieldfoundation.org/project/full-fact-2022-2025"
            ],
            tags: ["UK", "tax", "Christmas"],
            reportStatus: "pending"
        }
    ],

    // Statistics will be calculated dynamically
    getStats: function() {
        const verdictCounts = {};
        const categoryCounts = {};
        let totalInitialSources = 0;

        this.lies.forEach(lie => {
            verdictCounts[lie.verdict] = (verdictCounts[lie.verdict] || 0) + 1;
            categoryCounts[lie.category] = (categoryCounts[lie.category] || 0) + 1;
            totalInitialSources += lie.initialSources.length;
        });

        return {
            total: this.lies.length,
            byVerdict: verdictCounts,
            byCategory: categoryCounts,
            initialSourceCount: totalInitialSources,
            targetSourceCount: this.lies.length * 15 // 15+ sources per report target
        };
    }
};

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YEAR_OF_LIES_2025_DATA;
}
