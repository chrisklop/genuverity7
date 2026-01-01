/**
 * Timeline Data - Single Source of Truth
 *
 * This file powers the interactive timeline experience.
 * Structure is designed to be:
 * - Expandable (add events anytime)
 * - Template-ready (reusable for other timelines)
 * - Network-graph compatible (connections between events)
 * - Audio-enabled (per-era soundscapes)
 *
 * @version 1.0
 * @see /localreports/american-disinformation-timeline.html (full report)
 */

const TIMELINE_DATA = {
    meta: {
        title: "The Architecture of Perception",
        subtitle: "130 Years of Manufactured Reality",
        slug: "american-disinformation-timeline",
        author: "GenuVerity Intelligence",
        publishDate: "2025-12-30",
        readTime: "7 min experience",
        totalEvents: 18,
        expandedEvents: 50, // Future: comprehensive version
        version: "1.0",
        linkedReport: "/american-disinformation-timeline"
    },

    // Visual theme configuration
    theme: {
        primary: "#3b82f6",      // Blue
        secondary: "#06b6d4",    // Cyan
        danger: "#ef4444",       // Red
        warning: "#f59e0b",      // Amber
        success: "#10b981",      // Green
        background: "#050A14",
        card: "#111827",
        text: "#e4e4e7",
        muted: "#64748b"
    },

    // Era definitions with visual/audio properties
    eras: [
        {
            id: "yellow-journalism",
            name: "Yellow Journalism",
            shortName: "Yellow Press",
            years: "1890s–1910s",
            yearStart: 1890,
            yearEnd: 1920,
            color: "#ef4444",
            colorAlpha: "rgba(239, 68, 68, 0.2)",
            mood: "sepia-dramatic",
            visualStyle: "Sepia tones, bold red headlines, newspaper textures",
            audio: {
                ambient: "printing-press-loop.mp3",
                transition: "newspaper-rustle.mp3"
            },
            summary: "Private media barons discovered that sensationalism sells—and can start wars.",
            keyFigures: ["William Randolph Hearst", "Joseph Pulitzer"],
            events: [
                {
                    id: "yellow-press-wars",
                    year: 1895,
                    title: "The Circulation Wars Begin",
                    summary: "Hearst's New York Journal and Pulitzer's New York World compete for readers through increasingly sensational stories, establishing 'Yellow Journalism.'",
                    impact: "Created template for profit-driven sensationalism",
                    scale: "millions of readers",
                    connections: ["uss-maine"],
                    sourceIds: ["source-1", "source-2"],
                    visualHint: "newspaper-stack"
                },
                {
                    id: "uss-maine",
                    year: 1898,
                    title: "USS Maine: 'You Furnish the Pictures'",
                    summary: "When the USS Maine exploded in Havana Harbor, Hearst's Journal blamed Spain without evidence. The famous (possibly apocryphal) telegram: 'You furnish the pictures, I'll furnish the war.'",
                    impact: "Spanish-American War declared",
                    scale: "National foreign policy hijacked",
                    connections: ["creel-committee"],
                    sourceIds: ["source-3", "source-5"],
                    highlight: true,
                    visualHint: "explosion-headline"
                }
            ]
        },
        {
            id: "wwi-propaganda",
            name: "The State Enters the Fray",
            shortName: "WWI Propaganda",
            years: "1917–1920s",
            yearStart: 1917,
            yearEnd: 1929,
            color: "#f59e0b",
            colorAlpha: "rgba(245, 158, 11, 0.2)",
            mood: "poster-bold",
            visualStyle: "WWI poster colors, bold typography, Uncle Sam imagery",
            audio: {
                ambient: "crowd-murmur-artillery.mp3",
                transition: "marching-drums.mp3"
            },
            summary: "World War I nationalized propaganda. The government learned to manufacture consent—then privatized the techniques.",
            keyFigures: ["George Creel", "Edward Bernays", "Woodrow Wilson"],
            events: [
                {
                    id: "creel-committee",
                    year: 1917,
                    title: "Committee on Public Information",
                    summary: "Wilson creates the CPI (Creel Committee) to sell the war. 75,000 'Four Minute Men' deliver pro-war speeches in movie theaters nationwide.",
                    impact: "First systematic US government propaganda",
                    scale: "75,000 volunteer speakers",
                    connections: ["bernays-pr", "smith-mundt"],
                    sourceIds: ["source-7", "source-8"],
                    highlight: true,
                    visualHint: "uncle-sam"
                },
                {
                    id: "bernays-pr",
                    year: 1929,
                    title: "Torches of Freedom",
                    summary: "Edward Bernays, CPI veteran and Freud's nephew, stages a 'protest' with women smoking cigarettes as 'torches of freedom'—inventing modern PR.",
                    impact: "Birth of psychological manipulation in advertising",
                    scale: "Doubled female smoking market",
                    connections: ["tobacco-doubt"],
                    sourceIds: ["source-10", "source-11", "source-13"],
                    visualHint: "cigarette-parade"
                }
            ]
        },
        {
            id: "cold-war",
            name: "The Cold War Consensus",
            shortName: "Cold War",
            years: "1948–1980s",
            yearStart: 1948,
            yearEnd: 1987,
            color: "#3b82f6",
            colorAlpha: "rgba(59, 130, 246, 0.2)",
            mood: "split-screen-grainy",
            visualStyle: "TV static, split US/USSR, broadcast tower imagery",
            audio: {
                ambient: "radio-static-typing.mp3",
                transition: "tv-channel-change.mp3"
            },
            summary: "A firewall was built: propaganda for them, 'objective' news for us. But the CIA operated in shadows.",
            keyFigures: ["Frank Wisner", "Allen Dulles", "Carl Bernstein"],
            events: [
                {
                    id: "smith-mundt",
                    year: 1948,
                    title: "Smith-Mundt Act: The Firewall",
                    summary: "Congress authorizes Voice of America but bans domestic dissemination. US propaganda is for foreign audiences only—creating two realities.",
                    impact: "Legal separation of foreign/domestic information",
                    scale: "60+ years of policy",
                    connections: ["smith-mundt-modern"],
                    sourceIds: ["source-15", "source-16", "source-17"],
                    highlight: true,
                    visualHint: "wall-divide"
                },
                {
                    id: "mockingbird",
                    year: 1950,
                    title: "Operation Mockingbird",
                    summary: "CIA recruits 400+ American journalists as intelligence assets. Major outlets including NYT, Time, and CBS provide cover and suppress stories.",
                    impact: "Covert capture of 'free press'",
                    scale: "400+ journalists recruited",
                    connections: ["church-committee"],
                    sourceIds: ["source-18", "source-21", "source-22"],
                    highlight: true,
                    visualHint: "bird-wires"
                },
                {
                    id: "fairness-doctrine",
                    year: 1949,
                    title: "Fairness Doctrine Enacted",
                    summary: "FCC requires broadcasters to present contrasting viewpoints on controversial issues. Creates centrist, balanced media landscape.",
                    impact: "Prevented one-sided broadcasting for 38 years",
                    scale: "All broadcast media",
                    connections: ["fairness-repeal"],
                    sourceIds: ["source-23", "source-24"],
                    visualHint: "balance-scale"
                },
                {
                    id: "church-committee",
                    year: 1975,
                    title: "Church Committee Revelations",
                    summary: "Senate investigation exposes CIA domestic spying, Mockingbird, and assassination plots. Trust in intelligence community collapses.",
                    impact: "FISA created, but seeds 'Deep State' narratives",
                    scale: "Decades of covert ops exposed",
                    connections: ["cisa-complex"],
                    sourceIds: ["source-26", "source-28"],
                    visualHint: "senate-hearing"
                }
            ]
        },
        {
            id: "deregulation",
            name: "The Corporate Pivot",
            shortName: "Deregulation",
            years: "1987–2000s",
            yearStart: 1987,
            yearEnd: 2010,
            color: "#f59e0b",
            colorAlpha: "rgba(245, 158, 11, 0.2)",
            mood: "neon-cable-static",
            visualStyle: "Neon colors, cable TV static, talk radio waves",
            audio: {
                ambient: "talk-radio-chatter.mp3",
                transition: "channel-surf.mp3"
            },
            summary: "The guardrails came off. Fairness Doctrine died, talk radio exploded, and 'doubt' became a product.",
            keyFigures: ["Roger Ailes", "Rush Limbaugh", "Rupert Murdoch"],
            events: [
                {
                    id: "fairness-repeal",
                    year: 1987,
                    title: "Fairness Doctrine Repealed",
                    summary: "Reagan's FCC eliminates balance requirements. Rush Limbaugh goes national in 1988. Partisan broadcasting becomes profitable.",
                    impact: "Birth of one-sided talk radio/cable news",
                    scale: "Entire broadcast landscape transformed",
                    connections: ["fox-news"],
                    sourceIds: ["source-23", "source-25"],
                    highlight: true,
                    visualHint: "radio-tower"
                },
                {
                    id: "tobacco-doubt",
                    year: 1990,
                    title: "Merchants of Doubt",
                    summary: "'Doubt is our product.' Tobacco industry perfects strategy of funding contrary research to delay regulation. Same playbook later used for climate denial.",
                    impact: "Created template for corporate disinformation",
                    scale: "Decades of delayed regulation",
                    connections: ["cambridge-analytica"],
                    sourceIds: ["source-34", "source-35", "source-36"],
                    visualHint: "smoke-doubt"
                },
                {
                    id: "fox-news",
                    year: 1996,
                    title: "Fox News & Section 230",
                    summary: "Roger Ailes launches Fox News (realizing his 1970 memo). Same year: Section 230 grants platforms immunity from user content.",
                    impact: "Partisan cable + unaccountable platforms",
                    scale: "Millions of viewers in closed ecosystem",
                    connections: ["cambridge-analytica", "ira-campaign"],
                    sourceIds: ["source-29", "source-30", "source-40"],
                    highlight: true,
                    visualHint: "tv-split"
                }
            ]
        },
        {
            id: "digital-age",
            name: "Digital Disinformation",
            shortName: "Digital Age",
            years: "2012–2020",
            yearStart: 2012,
            yearEnd: 2020,
            color: "#ef4444",
            colorAlpha: "rgba(239, 68, 68, 0.2)",
            mood: "blue-glow-data",
            visualStyle: "Social media blue, data streams, profile grids",
            audio: {
                ambient: "notification-pings-datacenter.mp3",
                transition: "digital-whoosh.mp3"
            },
            summary: "The firewall fell. Psychographic targeting arrived. Foreign actors weaponized American platforms against Americans.",
            keyFigures: ["Alexander Nix", "Yevgeny Prigozhin", "Mark Zuckerberg"],
            events: [
                {
                    id: "smith-mundt-modern",
                    year: 2012,
                    title: "Smith-Mundt Modernization",
                    summary: "The 1948 firewall is dismantled. State Department propaganda can now legally reach domestic audiences.",
                    impact: "Government propaganda legal domestically",
                    scale: "Overturned 64 years of policy",
                    connections: ["cisa-complex"],
                    sourceIds: ["source-42", "source-44", "source-46"],
                    visualHint: "wall-crumble"
                },
                {
                    id: "cambridge-analytica",
                    year: 2016,
                    title: "Cambridge Analytica",
                    summary: "87 million Facebook profiles harvested. Psychographic targeting delivers personalized disinformation. 'Narrowcasting' makes lies invisible to fact-checkers.",
                    impact: "Micro-targeted political manipulation at scale",
                    scale: "87 million profiles harvested",
                    connections: ["ira-campaign", "twitter-files"],
                    sourceIds: ["source-48", "source-49"],
                    highlight: true,
                    visualHint: "profile-grid"
                },
                {
                    id: "ira-campaign",
                    year: 2016,
                    title: "Internet Research Agency",
                    summary: "Russian troll farm reaches 126 million Americans on Facebook. Fake accounts organize real protests. Both sides amplified to maximize division.",
                    impact: "Foreign power weaponizes US social media",
                    scale: "126 million Americans reached",
                    connections: ["cisa-complex"],
                    sourceIds: ["source-50", "source-51", "source-52"],
                    highlight: true,
                    visualHint: "troll-factory"
                }
            ]
        },
        {
            id: "censorship-complex",
            name: "The Censorship Complex",
            shortName: "Censorship Era",
            years: "2020–Present",
            yearStart: 2020,
            yearEnd: 2025,
            color: "#f59e0b",
            colorAlpha: "rgba(245, 158, 11, 0.2)",
            mood: "amber-warning-glitch",
            visualStyle: "Warning amber, redaction bars, system alerts",
            audio: {
                ambient: "system-alerts-typing.mp3",
                transition: "access-denied.mp3"
            },
            summary: "In response to 2016, a vast infrastructure emerged. Critics call it the 'Censorship Industrial Complex.'",
            keyFigures: ["Nina Jankowicz", "Renee DiResta", "Elon Musk"],
            events: [
                {
                    id: "cisa-complex",
                    year: 2020,
                    title: "CISA & 'Cognitive Infrastructure'",
                    summary: "CISA expands from cybersecurity to 'mis/dis/malinformation.' The American mind becomes 'cognitive infrastructure' requiring protection.",
                    impact: "Government-adjacent content moderation",
                    scale: "Entire information environment",
                    connections: ["twitter-files", "dgb-collapse"],
                    sourceIds: ["source-54", "source-55"],
                    visualHint: "shield-mind"
                },
                {
                    id: "twitter-files",
                    year: 2022,
                    title: "The Twitter Files",
                    summary: "Internal documents reveal FBI sending account lists to Twitter, regular meetings with government officials, and suppression of Hunter Biden laptop story.",
                    impact: "Exposed government-platform coordination",
                    scale: "Millions of moderation decisions",
                    connections: ["murthy-missouri"],
                    sourceIds: ["source-60"],
                    highlight: true,
                    visualHint: "document-leak"
                },
                {
                    id: "murthy-missouri",
                    year: 2024,
                    title: "Murthy v. Missouri",
                    summary: "Supreme Court dismisses on standing, but 5th Circuit had found likely First Amendment violations. Core question of 'jawboning' remains unresolved.",
                    impact: "Legal question punted, not resolved",
                    scale: "Constitutional precedent unclear",
                    connections: ["ai-deepfakes"],
                    sourceIds: ["source-62", "source-63", "source-64"],
                    visualHint: "gavel"
                }
            ]
        },
        {
            id: "synthetic-future",
            name: "Synthetic Reality",
            shortName: "AI Era",
            years: "2024–Future",
            yearStart: 2024,
            yearEnd: 2030,
            color: "#06b6d4",
            colorAlpha: "rgba(6, 182, 212, 0.2)",
            mood: "glitch-uncanny",
            visualStyle: "Glitch effects, face morphing, neural network patterns",
            audio: {
                ambient: "synthetic-voice-fragments.mp3",
                transition: "glitch-static.mp3"
            },
            summary: "AI collapses the cost of deception. Deepfakes create 'liar's dividend.' The line between real and synthetic may vanish permanently.",
            keyFigures: ["Sam Altman", "Alex Jones (Infowars sold)"],
            events: [
                {
                    id: "ai-deepfakes",
                    year: 2024,
                    title: "AI Deepfakes & Liar's Dividend",
                    summary: "Biden robocall deepfake hits New Hampshire. Politicians can now dismiss real footage as 'AI-generated.' Evidentiary truth itself under threat.",
                    impact: "Plausible deniability for any recording",
                    scale: "Entire concept of evidence threatened",
                    connections: [],
                    sourceIds: ["source-71", "source-72"],
                    highlight: true,
                    visualHint: "face-glitch"
                },
                {
                    id: "infowars-end",
                    year: 2024,
                    title: "The End of Infowars",
                    summary: "Alex Jones's empire auctioned after $1.5B Sandy Hook judgment. The Onion, backed by victims' families, buys it. Rare accountability for disinformation.",
                    impact: "Legal system imposes consequences",
                    scale: "$1.5 billion judgment",
                    connections: [],
                    sourceIds: ["source-76", "source-77"],
                    visualHint: "auction-gavel"
                }
            ]
        }
    ],

    // Connections for network graph (supplementary to per-event connections)
    networkConnections: [
        { from: "bernays-pr", to: "tobacco-doubt", type: "technique-transfer", label: "PR techniques applied to science denial" },
        { from: "tobacco-doubt", to: "cambridge-analytica", type: "technique-transfer", label: "Doubt manufacturing goes digital" },
        { from: "creel-committee", to: "bernays-pr", type: "personnel", label: "Bernays was CPI veteran" },
        { from: "mockingbird", to: "church-committee", type: "exposure", label: "Church Committee exposed Mockingbird" },
        { from: "church-committee", to: "cisa-complex", type: "reaction", label: "Distrust enables 'Deep State' narratives" },
        { from: "fairness-repeal", to: "fox-news", type: "enablement", label: "Repeal enabled partisan cable" },
        { from: "fox-news", to: "ira-campaign", type: "ecosystem", label: "Partisan ecosystem exploited by IRA" }
    ],

    // Statistics for visualization
    statistics: {
        journalistsRecruited: 400,
        fourMinuteMen: 75000,
        cambridgeProfiles: 87000000,
        iraReach: 126000000,
        infowarsDamages: 1500000000,
        trustDecline: { 1976: 72, 2024: 31 }
    },

    // ═══════════════════════════════════════════════════════════════
    // GLOSSARY - Hover context for 70+ topics
    // ═══════════════════════════════════════════════════════════════
    glossary: {
        // ─────────────────────────────────────────────────────────────
        // PEOPLE
        // ─────────────────────────────────────────────────────────────
        "william-randolph-hearst": {
            term: "William Randolph Hearst",
            category: "person",
            era: "yellow-journalism",
            years: "1863–1951",
            summary: "American newspaper publisher who built the nation's largest media chain. His sensationalist 'yellow journalism' helped push the United States into the Spanish-American War. The phrase 'You furnish the pictures, I'll furnish the war' is attributed to him, though its authenticity is disputed.",
            significance: "Established the template for profit-driven media manipulation that persists today.",
            reportSlug: "william-randolph-hearst"
        },
        "joseph-pulitzer": {
            term: "Joseph Pulitzer",
            category: "person",
            era: "yellow-journalism",
            years: "1847–1911",
            summary: "Hungarian-American newspaper publisher whose New York World competed fiercely with Hearst's Journal. Ironically, his name now adorns journalism's most prestigious prize. His circulation wars with Hearst gave birth to 'yellow journalism.'",
            significance: "The Pulitzer Prize rewards excellence in journalism, yet Pulitzer himself pioneered sensationalism.",
            reportSlug: null
        },
        "george-creel": {
            term: "George Creel",
            category: "person",
            era: "wwi-propaganda",
            years: "1876–1953",
            summary: "American investigative journalist who headed the Committee on Public Information (CPI) during WWI. Organized 75,000 'Four Minute Men' volunteer speakers and pioneered systematic government propaganda in America.",
            significance: "Created the blueprint for US government propaganda that influenced tactics for the next century.",
            reportSlug: "committee-public-information"
        },
        "edward-bernays": {
            term: "Edward Bernays",
            category: "person",
            era: "wwi-propaganda",
            years: "1891–1995",
            summary: "Sigmund Freud's nephew and the 'Father of Public Relations.' After working for the CPI in WWI, he privatized propaganda techniques into 'public relations.' His 1929 'Torches of Freedom' campaign convinced women that smoking was feminist liberation.",
            significance: "Invented modern PR and demonstrated how psychology could manipulate public behavior at scale.",
            reportSlug: "edward-bernays-propaganda"
        },
        "woodrow-wilson": {
            term: "Woodrow Wilson",
            category: "person",
            era: "wwi-propaganda",
            years: "1856–1924",
            summary: "28th President of the United States who created the Committee on Public Information to sell WWI to a reluctant American public. His administration pioneered government propaganda while simultaneously championing 'self-determination' abroad.",
            significance: "First US president to deploy systematic domestic propaganda.",
            reportSlug: null
        },
        "frank-wisner": {
            term: "Frank Wisner",
            category: "person",
            era: "cold-war",
            years: "1909–1965",
            summary: "CIA officer who directed the Office of Policy Coordination and ran Operation Mockingbird. Called his network of journalist assets his 'Mighty Wurlitzer'—an organ he could play to produce any propaganda tune needed.",
            significance: "Architect of CIA media infiltration that compromised major American news outlets.",
            reportSlug: "operation-mockingbird-cia"
        },
        "allen-dulles": {
            term: "Allen Dulles",
            category: "person",
            era: "cold-war",
            years: "1893–1969",
            summary: "Longest-serving CIA Director (1953–1961), oversaw expansion of Operation Mockingbird and numerous covert operations. Fired by Kennedy after Bay of Pigs, later served on Warren Commission investigating Kennedy's assassination.",
            significance: "Expanded CIA's covert influence over American media and politics.",
            reportSlug: "allen-dulles-cia"
        },
        "carl-bernstein": {
            term: "Carl Bernstein",
            category: "person",
            era: "cold-war",
            years: "1944–present",
            summary: "Journalist famous for Watergate reporting with Bob Woodward. In 1977, published 'The CIA and the Media' in Rolling Stone, exposing Operation Mockingbird and documenting over 400 American journalists who had worked with the CIA.",
            significance: "His 1977 exposé brought Operation Mockingbird into public knowledge.",
            reportSlug: null
        },
        "roger-ailes": {
            term: "Roger Ailes",
            category: "person",
            era: "deregulation",
            years: "1940–2017",
            summary: "Media consultant who wrote a 1970 memo proposing a 'GOP TV' network to bypass mainstream media. 26 years later, launched Fox News with Rupert Murdoch, creating the first successful 24-hour partisan cable news network.",
            significance: "Realized his vision of partisan media and transformed American political discourse.",
            reportSlug: "fox-news-origins"
        },
        "rush-limbaugh": {
            term: "Rush Limbaugh",
            category: "person",
            era: "deregulation",
            years: "1951–2021",
            summary: "Conservative radio host whose show went national in 1988, one year after the Fairness Doctrine was repealed. At his peak, reached 15+ million weekly listeners and pioneered the confrontational style that now dominates talk radio and cable news.",
            significance: "Proved partisan media could be massively profitable without balance requirements.",
            reportSlug: "rush-limbaugh-talk-radio"
        },
        "rupert-murdoch": {
            term: "Rupert Murdoch",
            category: "person",
            era: "deregulation",
            years: "1931–present",
            summary: "Australian-American media mogul who built a global empire including Fox News, The Wall Street Journal, and Sky News. His outlets have been accused of promoting climate denial, political partisanship, and tabloid sensationalism across three continents.",
            significance: "Created a transnational conservative media ecosystem with unprecedented political influence.",
            reportSlug: "rupert-murdoch-media-empire"
        },
        "alexander-nix": {
            term: "Alexander Nix",
            category: "person",
            era: "digital-age",
            years: "1975–present",
            summary: "Former CEO of Cambridge Analytica who oversaw the harvesting of 87 million Facebook profiles. Secretly recorded boasting about using honey traps, bribery, and 'beautiful Ukrainian girls' to entrap political opponents.",
            significance: "Face of the psychographic targeting scandal that revealed social media's vulnerability.",
            reportSlug: "cambridge-analytica-2016"
        },
        "yevgeny-prigozhin": {
            term: "Yevgeny Prigozhin",
            category: "person",
            era: "digital-age",
            years: "1961–2023",
            summary: "Russian oligarch known as 'Putin's Chef' who funded the Internet Research Agency troll farm. The IRA reached 126 million Americans on Facebook during the 2016 election. Died in a suspicious plane crash in 2023.",
            significance: "Bankrolled the most successful foreign influence operation against American social media.",
            reportSlug: "internet-research-agency-2016"
        },
        "mark-zuckerberg": {
            term: "Mark Zuckerberg",
            category: "person",
            era: "digital-age",
            years: "1984–present",
            summary: "Facebook/Meta CEO whose platform enabled both Cambridge Analytica's data harvesting and the IRA's influence operation. Testified before Congress that he was 'sorry' but largely escaped regulatory consequences under Section 230 protections.",
            significance: "Embodies the tension between platform growth and information integrity.",
            reportSlug: "zuckerberg-facebook-disinformation"
        },
        "nina-jankowicz": {
            term: "Nina Jankowicz",
            category: "person",
            era: "censorship-complex",
            years: "1989–present",
            summary: "Disinformation researcher appointed to lead DHS's short-lived Disinformation Governance Board in 2022. Resigned after three weeks amid controversy. Critics called her the 'Minister of Truth'; supporters said she was unfairly targeted.",
            significance: "Her brief tenure symbolized the political toxicity of government anti-disinformation efforts.",
            reportSlug: null
        },
        "renee-diresta": {
            term: "Renée DiResta",
            category: "person",
            era: "censorship-complex",
            years: "1983–present",
            summary: "Research manager at Stanford Internet Observatory who studied online disinformation. The Twitter Files revealed her communications with platforms about content moderation. Critics accuse her of being part of the 'censorship industrial complex.'",
            significance: "Central figure in debates over academic-government-platform coordination.",
            reportSlug: null
        },
        "elon-musk": {
            term: "Elon Musk",
            category: "person",
            era: "censorship-complex",
            years: "1971–present",
            summary: "Acquired Twitter in 2022 and released the 'Twitter Files'—internal documents showing FBI and government coordination with the platform on content moderation. Renamed it X and dramatically changed moderation policies.",
            significance: "Exposed government-platform coordination while becoming a controversial content moderator himself.",
            reportSlug: "twitter-files"
        },
        "sam-altman": {
            term: "Sam Altman",
            category: "person",
            era: "synthetic-future",
            years: "1985–present",
            summary: "CEO of OpenAI, the company behind ChatGPT and DALL-E. These AI systems can generate convincing text and images at scale, potentially revolutionizing—or weaponizing—disinformation. Has called for AI regulation while racing to deploy ever more powerful models.",
            significance: "Leading the AI revolution that may make synthetic disinformation undetectable.",
            reportSlug: "sam-altman-openai-disinformation"
        },
        "alex-jones": {
            term: "Alex Jones",
            category: "person",
            era: "synthetic-future",
            years: "1974–present",
            summary: "Conspiracy theorist and Infowars founder who falsely claimed the Sandy Hook massacre was a 'false flag.' Courts ordered him to pay $1.5 billion to victims' families. His empire was auctioned off in 2024, purchased by The Onion.",
            significance: "Rare case of legal accountability for disinformation, potentially setting precedent.",
            reportSlug: "infowars-judgment"
        },

        // ─────────────────────────────────────────────────────────────
        // ORGANIZATIONS & AGENCIES
        // ─────────────────────────────────────────────────────────────
        "cia": {
            term: "CIA",
            fullName: "Central Intelligence Agency",
            category: "agency",
            era: "cold-war",
            founded: 1947,
            summary: "America's foreign intelligence service, created from the wartime OSS. During the Cold War, ran Operation Mockingbird to influence domestic media and numerous covert operations abroad. The Church Committee exposed many of its abuses in 1975.",
            significance: "The revelation that the CIA infiltrated American media created lasting distrust of institutions.",
            reportSlug: "operation-mockingbird-cia"
        },
        "fbi": {
            term: "FBI",
            fullName: "Federal Bureau of Investigation",
            category: "agency",
            era: "censorship-complex",
            founded: 1908,
            summary: "America's domestic intelligence and law enforcement agency. The Twitter Files revealed the FBI regularly sent lists of accounts to Twitter for review and held regular meetings with social media platforms about content moderation.",
            significance: "FBI-platform coordination raised First Amendment concerns about government pressure on speech.",
            reportSlug: "twitter-files"
        },
        "fcc": {
            term: "FCC",
            fullName: "Federal Communications Commission",
            category: "agency",
            era: "cold-war",
            founded: 1934,
            summary: "Independent agency regulating communications by radio, television, wire, satellite, and cable. Implemented the Fairness Doctrine in 1949 requiring balanced coverage, then eliminated it in 1987 under Reagan.",
            significance: "The FCC's policy reversal enabled the rise of partisan broadcasting.",
            reportSlug: null
        },
        "cisa": {
            term: "CISA",
            fullName: "Cybersecurity and Infrastructure Security Agency",
            category: "agency",
            era: "censorship-complex",
            founded: 2018,
            summary: "DHS agency originally focused on protecting critical infrastructure from cyberattacks. Expanded in 2020 to address 'mis-, dis-, and malinformation' as threats to 'cognitive infrastructure.' Critics call this an Orwellian overreach.",
            significance: "Represents government expansion from protecting computers to 'protecting' what people think.",
            reportSlug: "cisa-cognitive-infrastructure"
        },
        "cpi": {
            term: "CPI",
            fullName: "Committee on Public Information",
            category: "agency",
            era: "wwi-propaganda",
            founded: 1917,
            summary: "America's first propaganda agency, created by Wilson to sell WWI. Also called the Creel Committee after its chairman. Deployed 75,000 'Four Minute Men' speakers, produced films, posters, and news releases, and pioneered modern propaganda techniques.",
            significance: "Template for all subsequent US government propaganda efforts.",
            reportSlug: "committee-public-information"
        },
        "voa": {
            term: "VOA",
            fullName: "Voice of America",
            category: "agency",
            era: "cold-war",
            founded: 1942,
            summary: "US government-funded international broadcaster. The Smith-Mundt Act authorized VOA to broadcast abroad but banned domestic dissemination—a firewall that stood for 64 years until the 2012 modernization.",
            significance: "The original vehicle for legal US propaganda, explicitly foreign-only.",
            reportSlug: null
        },
        "ira": {
            term: "IRA",
            fullName: "Internet Research Agency",
            category: "organization",
            era: "digital-age",
            founded: 2013,
            summary: "Russian 'troll farm' based in St. Petersburg, funded by Yevgeny Prigozhin. Employed hundreds of people to create fake American personas, organize real protests on both political sides, and spread divisive content. Reached 126 million Americans on Facebook alone.",
            significance: "Demonstrated that a small operation could weaponize American social media against itself.",
            reportSlug: "internet-research-agency-2016"
        },
        "cambridge-analytica": {
            term: "Cambridge Analytica",
            fullName: "Cambridge Analytica",
            category: "organization",
            era: "digital-age",
            founded: 2013,
            summary: "British political consulting firm that harvested 87 million Facebook profiles through a personality quiz app. Used psychographic profiling to deliver micro-targeted political ads. Went bankrupt in 2018 after whistleblower exposé.",
            significance: "Revealed how personal data could be weaponized for invisible political manipulation.",
            reportSlug: "cambridge-analytica-2016"
        },
        "facebook": {
            term: "Facebook/Meta",
            fullName: "Meta Platforms Inc.",
            category: "organization",
            era: "digital-age",
            founded: 2004,
            summary: "World's largest social network where both Cambridge Analytica and the IRA conducted their operations. Platform design prioritized engagement over accuracy, algorithmically amplifying divisive content. Renamed to Meta in 2021.",
            significance: "The primary battlefield where modern disinformation campaigns are waged.",
            reportSlug: "zuckerberg-facebook-disinformation"
        },
        "twitter": {
            term: "Twitter/X",
            fullName: "X Corp (formerly Twitter)",
            category: "organization",
            era: "censorship-complex",
            founded: 2006,
            summary: "Microblogging platform acquired by Elon Musk in 2022. The 'Twitter Files' release exposed years of government-platform coordination on content moderation. Renamed to X and dramatically loosened content policies.",
            significance: "Ground zero for debates about platform moderation and government influence.",
            reportSlug: "twitter-files"
        },
        "fox-news": {
            term: "Fox News",
            fullName: "Fox News Channel",
            category: "organization",
            era: "deregulation",
            founded: 1996,
            summary: "24-hour cable news network founded by Roger Ailes and Rupert Murdoch. Launched the same year as Section 230. Created the first successful partisan cable news model, spawning imitators across the political spectrum.",
            significance: "Proved that openly partisan news could dominate cable ratings.",
            reportSlug: "fox-news-origins"
        },
        "infowars": {
            term: "Infowars",
            fullName: "Infowars",
            category: "organization",
            era: "synthetic-future",
            founded: 1999,
            summary: "Conspiracy theory media empire founded by Alex Jones. Promoted claims that Sandy Hook was a hoax, leading to $1.5 billion in defamation judgments. Auctioned off in 2024 and purchased by The Onion with backing from Sandy Hook families.",
            significance: "Its destruction represents rare legal accountability for disinformation.",
            reportSlug: "infowars-judgment"
        },
        "stanford-internet-observatory": {
            term: "Stanford Internet Observatory",
            fullName: "Stanford Internet Observatory",
            category: "organization",
            era: "censorship-complex",
            founded: 2019,
            summary: "Stanford research center studying abuse of information technology. Led the Election Integrity Partnership that flagged social media content for platforms. Critics call it part of the 'censorship industrial complex.'",
            significance: "Represents the controversial academic-government-platform nexus.",
            reportSlug: "stanford-internet-observatory"
        },
        "new-york-journal": {
            term: "New York Journal",
            fullName: "New York Journal",
            category: "organization",
            era: "yellow-journalism",
            founded: 1895,
            summary: "William Randolph Hearst's flagship newspaper that competed with Pulitzer's World. Its sensationalized coverage of the USS Maine explosion and Cuba helped push America into the Spanish-American War.",
            significance: "The original engine of 'yellow journalism' and media-manufactured war.",
            reportSlug: "william-randolph-hearst"
        },
        "new-york-times": {
            term: "New York Times",
            fullName: "The New York Times",
            category: "organization",
            era: "cold-war",
            founded: 1851,
            summary: "America's 'paper of record.' Carl Bernstein's 1977 exposé revealed multiple NYT journalists had worked with the CIA during Operation Mockingbird. The paper has since won numerous Pulitzer Prizes and remains highly influential.",
            significance: "Even the most prestigious outlets were compromised during the Cold War.",
            reportSlug: null
        },

        // ─────────────────────────────────────────────────────────────
        // LAWS & LEGAL
        // ─────────────────────────────────────────────────────────────
        "smith-mundt-act": {
            term: "Smith-Mundt Act",
            fullName: "United States Information and Educational Exchange Act of 1948",
            category: "law",
            era: "cold-war",
            year: 1948,
            summary: "Authorized Voice of America to broadcast propaganda abroad but explicitly banned domestic dissemination. Created a legal 'firewall' between foreign propaganda and the American public that stood for 64 years.",
            significance: "The original separation between 'propaganda for them' and 'news for us.'",
            reportSlug: "smith-mundt-history"
        },
        "smith-mundt-modernization": {
            term: "Smith-Mundt Modernization Act",
            fullName: "Smith-Mundt Modernization Act of 2012",
            category: "law",
            era: "digital-age",
            year: 2012,
            summary: "Amended the original Smith-Mundt Act to allow domestic dissemination of State Department and Broadcasting Board of Governors content. Eliminated the 64-year firewall against domestic propaganda.",
            significance: "Made government propaganda legal for domestic consumption for the first time since 1948.",
            reportSlug: "smith-mundt-history"
        },
        "fairness-doctrine": {
            term: "Fairness Doctrine",
            fullName: "FCC Fairness Doctrine",
            category: "law",
            era: "cold-war",
            year: 1949,
            summary: "FCC policy requiring broadcast licensees to present contrasting viewpoints on controversial issues of public importance. Created a centrist, 'both sides' media environment for 38 years until its repeal in 1987.",
            significance: "Its repeal enabled the rise of partisan talk radio and cable news.",
            reportSlug: "fairness-doctrine-history"
        },
        "section-230": {
            term: "Section 230",
            fullName: "Section 230 of the Communications Decency Act",
            category: "law",
            era: "deregulation",
            year: 1996,
            summary: "Twenty-six words that created the internet: 'No provider or user of an interactive computer service shall be treated as the publisher or speaker of any information provided by another.' Shields platforms from liability for user content.",
            significance: "Without Section 230, social media as we know it could not exist—nor could its problems.",
            reportSlug: "section-230-explained"
        },
        "fisa": {
            term: "FISA",
            fullName: "Foreign Intelligence Surveillance Act",
            category: "law",
            era: "cold-war",
            year: 1978,
            summary: "Passed in response to Church Committee revelations about warrantless surveillance. Created the secret FISA Court to oversee intelligence gathering on US soil. Later expanded by the PATRIOT Act.",
            significance: "An attempt to constrain intelligence agencies that critics say has been undermined over time.",
            reportSlug: null
        },
        "first-amendment": {
            term: "First Amendment",
            fullName: "First Amendment to the United States Constitution",
            category: "law",
            era: "cold-war",
            year: 1791,
            summary: "Prohibits Congress from making laws 'abridging the freedom of speech, or of the press.' Central to debates about government pressure on platforms—is 'jawboning' (informal pressure) a violation?",
            significance: "The constitutional backdrop against which all censorship debates play out.",
            reportSlug: null
        },
        "murthy-v-missouri": {
            term: "Murthy v. Missouri",
            fullName: "Murthy v. Missouri (2024)",
            category: "legal-case",
            era: "censorship-complex",
            year: 2024,
            summary: "Supreme Court case challenging government communication with social media platforms about content moderation. The 5th Circuit found likely First Amendment violations, but SCOTUS dismissed on standing. Core questions remain unresolved.",
            significance: "The legal question of government-platform coordination remains open.",
            reportSlug: "murthy-v-missouri"
        },
        "sandy-hook-judgment": {
            term: "Sandy Hook Judgment",
            fullName: "Sandy Hook Defamation Lawsuits",
            category: "legal-case",
            era: "synthetic-future",
            year: 2022,
            summary: "Alex Jones was ordered to pay $1.5 billion to Sandy Hook families for falsely claiming the 2012 massacre was a hoax. The largest defamation judgment against an individual in US history, leading to the bankruptcy and sale of Infowars.",
            significance: "Demonstrated that legal accountability for disinformation is possible, if difficult.",
            reportSlug: "infowars-judgment"
        },

        // ─────────────────────────────────────────────────────────────
        // CONCEPTS & TERMS
        // ─────────────────────────────────────────────────────────────
        "yellow-journalism": {
            term: "Yellow Journalism",
            category: "concept",
            era: "yellow-journalism",
            summary: "Sensationalist newspaper reporting that emphasizes exaggeration, scandal, and emotional appeals over factual accuracy. Named for the 'Yellow Kid' comic strip fought over by Hearst and Pulitzer. Prioritizes circulation over truth.",
            significance: "The original template for profit-driven media manipulation.",
            reportSlug: "william-randolph-hearst"
        },
        "four-minute-men": {
            term: "Four Minute Men",
            category: "concept",
            era: "wwi-propaganda",
            summary: "Network of 75,000 volunteer speakers organized by the CPI during WWI. Delivered four-minute pro-war speeches in movie theaters during reel changes. The first mass mobilization of citizen propagandists in American history.",
            significance: "Pioneered using ordinary citizens as propaganda vectors—a technique now scaled by social media.",
            reportSlug: "four-minute-men-wwi"
        },
        "manufacture-consent": {
            term: "Manufacturing Consent",
            category: "concept",
            era: "wwi-propaganda",
            summary: "Phrase coined by Walter Lippmann and later used by Chomsky/Herman. Describes how elites shape public opinion through media control rather than force. Bernays explicitly sought to 'engineer consent' through PR.",
            significance: "The theoretical framework for understanding institutional propaganda.",
            reportSlug: null
        },
        "operation-mockingbird": {
            term: "Operation Mockingbird",
            category: "concept",
            era: "cold-war",
            summary: "CIA program that recruited 400+ American journalists as intelligence assets during the Cold War. Major outlets including NYT, Time, CBS, and others provided cover and suppressed stories. Exposed by the Church Committee and Carl Bernstein.",
            significance: "Proved that the 'free press' was secretly coordinating with intelligence services.",
            reportSlug: "operation-mockingbird-cia"
        },
        "psychographic-targeting": {
            term: "Psychographic Targeting",
            category: "concept",
            era: "digital-age",
            summary: "Marketing technique that targets audiences based on psychological characteristics—personality, values, attitudes, interests—rather than just demographics. Cambridge Analytica used Facebook data to build psychographic profiles of 87 million Americans.",
            significance: "Enables invisible, personalized manipulation at unprecedented scale.",
            reportSlug: "cambridge-analytica-2016"
        },
        "narrowcasting": {
            term: "Narrowcasting",
            category: "concept",
            era: "digital-age",
            summary: "Delivering tailored messages to specific audience segments rather than broadcasting to everyone. In disinformation context, means micro-targeted lies that never appear in opponents' feeds, making them invisible to fact-checkers.",
            significance: "Traditional fact-checking cannot counter messages you never see.",
            reportSlug: null
        },
        "mdm": {
            term: "MDM Framework",
            fullName: "Mis-, Dis-, and Malinformation",
            category: "concept",
            era: "censorship-complex",
            summary: "CISA's taxonomy for problematic information: Misinformation (false, shared without intent to harm), Disinformation (deliberately false), Malinformation (true but shared to cause harm). Critics note 'malinformation' can mean censoring true information.",
            significance: "The framework used to justify government involvement in 'cognitive security.'",
            reportSlug: "cisa-cognitive-infrastructure"
        },
        "cognitive-infrastructure": {
            term: "Cognitive Infrastructure",
            category: "concept",
            era: "censorship-complex",
            summary: "CISA's term for the information environment that shapes public thought. By designating the American mind as 'infrastructure,' the agency justified expanding from cybersecurity to content moderation coordination.",
            significance: "Orwellian framing that treats human thought as government infrastructure to protect.",
            reportSlug: "cisa-cognitive-infrastructure"
        },
        "jawboning": {
            term: "Jawboning",
            category: "concept",
            era: "censorship-complex",
            summary: "Informal government pressure on private entities to achieve policy goals without formal regulation. In the platform context, government officials urging or pressuring social media companies to remove content, potentially violating the First Amendment.",
            significance: "The unresolved legal question at the heart of Murthy v. Missouri.",
            reportSlug: "murthy-v-missouri"
        },
        "liars-dividend": {
            term: "Liar's Dividend",
            category: "concept",
            era: "synthetic-future",
            summary: "The ability to dismiss authentic evidence as AI-generated. As deepfakes proliferate, any real video or audio can be waved away as fake. Politicians can now deny genuine recordings by claiming they're AI fabrications.",
            significance: "AI doesn't just enable fake content—it undermines trust in all content.",
            reportSlug: "ai-deepfakes-liars-dividend"
        },
        "deepfakes": {
            term: "Deepfakes",
            category: "concept",
            era: "synthetic-future",
            summary: "AI-generated synthetic media that replaces one person's likeness with another's. Named from 'deep learning' + 'fake.' Used for everything from non-consensual pornography to political disinformation like the Biden robocall in New Hampshire.",
            significance: "Collapses the cost of creating convincing false evidence to near zero.",
            reportSlug: "ai-deepfakes-liars-dividend"
        },
        "censorship-industrial-complex": {
            term: "Censorship Industrial Complex",
            category: "concept",
            era: "censorship-complex",
            summary: "Term coined by critics to describe the network of government agencies, academic institutions, NGOs, and platforms coordinating on content moderation. Includes CISA, Stanford Internet Observatory, and various 'disinformation' research centers.",
            significance: "Whether this represents necessary coordination or unconstitutional censorship is the core debate.",
            reportSlug: "censorship-industrial-complex"
        },
        "merchants-of-doubt": {
            term: "Merchants of Doubt",
            category: "concept",
            era: "deregulation",
            summary: "Corporate strategy of funding contrary research to manufacture uncertainty about settled science. Perfected by tobacco companies ('Doubt is our product'), later applied to climate change, lead paint, and other public health issues.",
            significance: "Template for using 'both sides' framing to delay regulation indefinitely.",
            reportSlug: "merchants-of-doubt"
        },
        "torches-of-freedom": {
            term: "Torches of Freedom",
            category: "concept",
            era: "wwi-propaganda",
            summary: "Edward Bernays' 1929 PR campaign for American Tobacco. Hired women to smoke cigarettes in the Easter Sunday Parade as an act of feminist liberation. Successfully rebranded a health hazard as empowerment.",
            significance: "Textbook case of manufacturing desire through psychological manipulation.",
            reportSlug: "edward-bernays-propaganda"
        },
        "church-committee": {
            term: "Church Committee",
            fullName: "Senate Select Committee to Study Governmental Operations with Respect to Intelligence Activities",
            category: "concept",
            era: "cold-war",
            year: 1975,
            summary: "Senate committee led by Frank Church that investigated CIA, FBI, and NSA abuses. Exposed Operation Mockingbird, COINTELPRO, assassination plots, and mass surveillance. Led to FISA and intelligence oversight reforms.",
            significance: "The last comprehensive investigation of intelligence community abuses.",
            reportSlug: "church-committee-revelations"
        },
        "twitter-files": {
            term: "Twitter Files",
            category: "concept",
            era: "censorship-complex",
            year: 2022,
            summary: "Internal Twitter documents released by Elon Musk showing government-platform coordination on content moderation. Revealed FBI regularly sent account lists, DHS meetings about censorship, and suppression of the Hunter Biden laptop story.",
            significance: "Documentary evidence of government involvement in platform moderation decisions.",
            reportSlug: "twitter-files"
        },

        // ─────────────────────────────────────────────────────────────
        // EVENTS
        // ─────────────────────────────────────────────────────────────
        "uss-maine": {
            term: "USS Maine Explosion",
            category: "event",
            era: "yellow-journalism",
            year: 1898,
            summary: "US Navy ship that exploded in Havana Harbor, killing 266 sailors. Hearst's Journal immediately blamed Spain with the headline 'Remember the Maine!' Modern analysis suggests an internal coal fire, not a Spanish mine.",
            significance: "First major example of American media manufacturing a war.",
            reportSlug: "uss-maine-media-war"
        },
        "spanish-american-war": {
            term: "Spanish-American War",
            category: "event",
            era: "yellow-journalism",
            year: 1898,
            summary: "War between the US and Spain triggered largely by yellow journalism coverage of the USS Maine explosion and conditions in Cuba. Resulted in US acquisition of Puerto Rico, Guam, and the Philippines.",
            significance: "Demonstrated media's power to drive foreign policy and start wars.",
            reportSlug: "uss-maine-media-war"
        },
        "biden-robocall": {
            term: "Biden Robocall Deepfake",
            category: "event",
            era: "synthetic-future",
            year: 2024,
            summary: "AI-generated voice clone of President Biden used in robocalls to New Hampshire voters, telling Democrats not to vote in the primary. Created by a political consultant using commercial AI tools for under $1.",
            significance: "First major AI deepfake deployed in a US election.",
            reportSlug: "ai-deepfakes-liars-dividend"
        },
        "hunter-biden-laptop": {
            term: "Hunter Biden Laptop",
            category: "event",
            era: "censorship-complex",
            year: 2020,
            summary: "New York Post story about Hunter Biden's laptop was suppressed by Twitter and Facebook before the 2020 election, with platforms citing 'hacked materials' policy. Twitter Files later revealed FBI had warned platforms about 'Russian disinformation' before the story broke.",
            significance: "The suppression became central evidence for claims of platform-government coordination.",
            reportSlug: "twitter-files"
        },

        // ─────────────────────────────────────────────────────────────
        // PROTOCOLS OF THE ELDERS OF ZION - Related entries
        // ─────────────────────────────────────────────────────────────
        "protocols-elders-zion": {
            term: "Protocols of the Elders of Zion",
            category: "document",
            era: "yellow-journalism",
            year: 1903,
            summary: "Fabricated antisemitic text purporting to document a Jewish conspiracy for world domination. Created by Russian secret police (Okhrana) around 1903, plagiarized from Maurice Joly's 1864 satire. First exposed as a forgery in 1921 by The Times of London, yet continues to circulate globally.",
            significance: "The most destructive piece of disinformation in history—used to justify pogroms, the Holocaust, and ongoing antisemitic violence.",
            reportSlug: "protocols-elders-zion"
        },
        "henry-ford": {
            term: "Henry Ford",
            category: "person",
            era: "wwi-propaganda",
            years: "1863–1947",
            summary: "American industrialist who published 'The International Jew' series in his Dearborn Independent newspaper (1920–1927), distributing 500,000 copies and amplifying the Protocols to mainstream American audiences. Later apologized in 1927 but received Nazi Germany's Grand Cross of the German Eagle in 1938.",
            significance: "Demonstrated how elite amplification could mainstream antisemitic conspiracy theories in America.",
            reportSlug: "protocols-elders-zion"
        },
        "dearborn-independent": {
            term: "Dearborn Independent",
            fullName: "The Dearborn Independent",
            category: "organization",
            era: "wwi-propaganda",
            founded: 1901,
            summary: "Henry Ford's personal newspaper that published 'The International Jew' series from 1920–1927. Ford dealerships were required to sell subscriptions, reaching peak circulation of 900,000. The series drew heavily from the Protocols and was later translated into German, influencing Nazi ideology.",
            significance: "Vehicle for mainstreaming antisemitic content in American society through industrial distribution networks.",
            reportSlug: "protocols-elders-zion"
        },
        "okhrana": {
            term: "Okhrana",
            fullName: "Russian Secret Police",
            category: "agency",
            era: "yellow-journalism",
            founded: 1881,
            summary: "The secret police of the Russian Empire, responsible for protecting the Tsar and suppressing revolutionary movements. Widely credited with fabricating or commissioning the Protocols around 1903 to deflect blame for Russia's problems onto Jewish populations.",
            significance: "Pioneer of state-sponsored disinformation that would influence intelligence operations for the next century.",
            reportSlug: "protocols-elders-zion"
        },
        "maurice-joly": {
            term: "Maurice Joly",
            category: "person",
            era: "yellow-journalism",
            years: "1829–1878",
            summary: "French satirist who wrote 'Dialogue in Hell Between Machiavelli and Montesquieu' (1864), a critique of Napoleon III. The Protocols plagiarized substantial portions of this work, as Philip Graves demonstrated in The Times in 1921.",
            significance: "His satirical work was twisted into the foundation of the world's most destructive antisemitic forgery.",
            reportSlug: "protocols-elders-zion"
        },
        "bern-trial": {
            term: "Bern Trial (1934–1935)",
            category: "legal-case",
            era: "wwi-propaganda",
            year: 1935,
            summary: "Swiss court case where Jewish organizations sued Nazi-aligned groups for distributing the Protocols. Expert witnesses proved the text was a forgery plagiarized from Maurice Joly's work. The court ruled the Protocols were 'ridiculous nonsense' and 'obvious forgeries.'",
            significance: "First judicial determination that the Protocols were fabricated, creating legal precedent.",
            reportSlug: "protocols-elders-zion"
        },
        "philip-graves": {
            term: "Philip Graves",
            category: "person",
            era: "wwi-propaganda",
            years: "1876–1953",
            summary: "Times of London correspondent who exposed the Protocols as a forgery in August 1921. With help from a Russian émigré who provided Joly's original text, Graves published side-by-side comparisons proving the Protocols were plagiarized.",
            significance: "First journalist to definitively prove the Protocols were fabricated, though the truth arrived too late to stop their spread.",
            reportSlug: "protocols-elders-zion"
        },
        "alfred-rosenberg": {
            term: "Alfred Rosenberg",
            category: "person",
            era: "wwi-propaganda",
            years: "1893–1946",
            summary: "Nazi ideologue who brought the Protocols from Russia to Germany and published a German edition in 1923. His promotion of the text heavily influenced Nazi ideology. Executed at Nuremberg for crimes against humanity.",
            significance: "Key figure in weaponizing the Protocols for the Nazi genocide machine.",
            reportSlug: "protocols-elders-zion"
        }
    }
};

// Export for use in timeline and network graph
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TIMELINE_DATA;
}
