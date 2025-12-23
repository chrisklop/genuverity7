// Shared reports data - Single source of truth for all pages
// When adding a new report, add it here and it will update everywhere

const REPORTS_DATA = [
    {
        id: 0,
        title: "The December 2025 Financial Disinformation Complex",
        slug: "localreports/irs-social-security-payment-hoax-2025.html",
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
        id: 1,
        title: "The 2025 Farm Crisis: Did Treasury Prioritize Argentina Over US Farmers?",
        slug: "localreports/us-argentina-farm-crisis-2025.html",
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
        id: 2,
        title: "German Christmas Markets: Flood of Far-Right Fake News",
        slug: "localreports/german-christmas-market-disinfo.html",
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
        id: 3,
        title: "Rob Reiner Death: Separating Fact from Fiction",
        slug: "localreports/rob-reiner-misinformation-2025.html",
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
        id: 4,
        title: "Post-Assad Syria: The Disinformation War",
        slug: "localreports/syria-disinformation-2024.html",
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
        id: 5,
        title: "CDC Drops Universal Hepatitis B Vaccine for Newborns",
        slug: "localreports/cdc-hepatitis-b-vaccine-2025.html",
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
        id: 6,
        title: "Pete Hegseth 'Double-Tap' Strike: What We Know",
        slug: "localreports/hegseth-boat-strike.html",
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
        id: 7,
        title: "US Inflation: A Decade of Price Changes (2015-2025)",
        slug: "localreports/us-inflation-10-year-analysis.html",
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
        id: 8,
        title: "Epstein Files: What December 2025 Release Actually Shows",
        slug: "localreports/epstein-documents-2025.html",
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
        id: 9,
        title: "Ruby Bradley 'Loser' Quote: Viral Military Misquote Debunked",
        slug: "localreports/ruby-bradley-quote.html",
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
        id: 10,
        title: "Paid Protesters Hoax: The Craigslist Ad Myth That Won't Die",
        slug: "localreports/paid-protesters-hoax.html",
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
        id: 11,
        title: "AI-Generated Deportation Videos: The Sora Deepfake Crisis",
        slug: "localreports/ai-deportation-videos.html",
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
        id: 12,
        title: "The Great Reset: WEF Conspiracy Theory Fact Check",
        slug: "localreports/great-reset-wef.html",
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
        id: 13,
        title: "Chemtrails in 2025: TikTok's Resurgent Conspiracy Theory",
        slug: "localreports/chemtrails-2025.html",
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
        id: 14,
        title: "BlueAnon: Can Starlink Satellites Manipulate Elections?",
        slug: "localreports/blueanon-starlink.html",
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
        id: 15,
        title: "HAARP Weather Control Conspiracy: Science vs Fiction",
        slug: "localreports/haarp-weather-control.html",
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
        id: 16,
        title: "Tommy Robinson 'Death' in Guadeloupe: False Claims Debunked",
        slug: "localreports/tommy-robinson-guadeloupe.html",
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
        id: 17,
        title: "Elon Musk vs EU: Claims Fact-Checked",
        slug: "localreports/musk-eu-claims.html",
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
        id: 18,
        title: "IRS $2,000 Stimulus Check Hoax: December 2025",
        slug: "localreports/irs-stimulus-hoax.html",
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
        id: 19,
        title: "New Jersey Drone Sightings: Conspiracy Theories Debunked",
        slug: "localreports/nj-drone-conspiracy.html",
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
        id: 20,
        title: "MAGA Accounts: Foreign Location Reveal",
        slug: "localreports/maga-accounts-foreign.html",
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
        id: 21,
        title: "Immigration Crime Wave: Claims vs Data",
        slug: "localreports/immigration-crime-claims.html",
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
        id: 22,
        title: "Hamas 51% Youth Support Claim",
        slug: "localreports/hamas-youth-support.html",
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
        id: 23,
        title: "Trump's Grocery Prices Claim: Fact Check",
        slug: "localreports/grocery-prices-claim.html",
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
        id: 24,
        title: "The 2025 AI Deepfake Crisis",
        slug: "localreports/ai-deepfakes-2025.html",
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
        id: 25,
        title: "Climate Skeptics Misuse Ice Age Research",
        slug: "localreports/climate-ice-age-study.html",
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
        id: 26,
        title: "Bondi Beach Attack: Viral Misinformation Wave",
        slug: "localreports/bondi-beach-misinfo.html",
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
        id: 27,
        title: "Did Elon Musk's DOGE Save $2 Trillion?",
        slug: "localreports/doge-savings-claims.html",
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
        id: 28,
        title: "Trump's '25 Million Migrants' Claim",
        slug: "localreports/trump-25m-migrants.html",
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
        id: 29,
        title: "The $1,776 'Warrior Dividend': What It Really Is",
        slug: "warrior-dividend-analysis.html",
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
        id: 30,
        title: "Fact Check: FDA Memo Claims COVID Vaccines Killed 10 Children",
        slug: "fda-vaccine-memo-fact-check.html",
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
        id: 31,
        title: "Gaza Boat Strikes: Pattern of Civilian Targeting?",
        slug: "boat-strike-investigation.html",
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
        id: 32,
        title: "Trump's Dec 17 Speech: Claims vs Reality",
        slug: "trump-speech-factcheck.html",
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
        id: 33,
        title: "Luigi Mangione Trial: Evidence and Legal Strategy",
        slug: "mangione-trial-analysis.html",
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
        id: 34,
        title: "TikTok US Sale: What the Deal Actually Contains",
        slug: "tiktok-sale-analysis.html",
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
        id: 35,
        title: "CDC Website Changes: Vaccine-Autism Claims Analyzed",
        slug: "cdc-vaccine-autism.html",
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
        id: 36,
        title: "Marijuana Rescheduling: From Schedule I to Schedule III",
        slug: "marijuana-rescheduling.html",
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
        id: 37,
        title: "Dollar Dominance: Treasury Bonds as Trade War Leverage",
        slug: "treasury-leverage.html",
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
        id: 38,
        title: "US Inflation Data: Accurate Numbers, Compromised Collection",
        slug: "inflation-methodology.html",
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
        id: 39,
        title: "Mirror Maze: Doppelganger Network Analysis",
        slug: "doppelganger-analysis.html",
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
        id: 40,
        title: "Spamouflage Network Analysis",
        slug: "network-analysis.html",
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
        id: 41,
        title: "Is 'FedNow Phase 2' Freezing Accounts?",
        slug: "fednow-freeze.html",
        category: "Misinformation",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "alert-triangle",
        date: "Dec 17, 2025",
        sources: "Live Data",
        readTime: "11 min",
        excerpt: "Debunking viral claims about Project Hamilton 'Phase 2' freezing 15,000 accounts. Includes live FRED data showing Fed operations are normal."
    },
    {
        id: 42,
        title: "Fact Check: Biden White House Plaque Claims",
        slug: "plaque-fact-check.html",
        category: "72% False or Misleading",
        tagClass: "tag-red",
        catClass: "cat-factcheck",
        icon: "alert-triangle",
        date: "Dec 17, 2025",
        sources: "18 Claims",
        readTime: "15 min",
        excerpt: "Comprehensive analysis of 18 claims on partisan plaques installed beneath Biden's portrait in the White House."
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
