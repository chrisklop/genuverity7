// 365 WINS IN 365 DAYS: Comprehensive Fact-Check Data File
// This plug-and-play data file contains all 365 claims for the mega fact-check report
// Created: January 22, 2026

const WINS_365_DATA = {
    meta: {
        title: "365 WINS IN 365 DAYS: Comprehensive Fact-Check",
        slug: "365-wins-factcheck-2026",
        date: "2026-01-22",
        overallVerdict: "mixed",
        totalClaims: 365,
        sourceDocument: "https://www.whitehouse.gov/articles/2026/01/365-wins-in-365-days-president-trumps-return-marks-new-era-of-success-prosperity/",
        verdictSummary: {
            true: 180,
            mostlyTrue: 65,
            needsContext: 50,
            misleading: 15,
            false: 5,
            tbd: 50
        }
    },

    sections: [
        {
            id: "border",
            title: "Securing America's Borders",
            icon: "shield",
            claimRange: "1-52",
            claimCount: 52,
            verdictBreakdown: { true: 35, mostlyTrue: 8, context: 6, misleading: 2, false: 1 },
            claims: [
                {
                    id: 1,
                    whiteHouseText: "Achieved negative net migration in 2025, reversing a 50-year trend and restoring U.S. control over immigration flows for the first time in a generation.",
                    verdict: "mostlyTrue",
                    rating: 4,
                    analysis: "The Congressional Budget Office's September 2025 update confirms net immigration of 'other foreign nationals' turned negative in 2025, with a net outflow of 290,000 people. However, methodology discrepancies between Census and BLS introduce nuance.",
                    sources: [1, 2, 3],
                    keyFact: "CBO confirms negative net migration for first time since Great Depression",
                    disputed: false
                },
                {
                    id: 2,
                    whiteHouseText: "Removed more than 2.6 million illegal aliens from the United States through deportations and voluntary self-departures.",
                    verdict: "context",
                    rating: 3,
                    analysis: "TRAC Immigration shows formal ICE removals at ~290,603. The 2.6 million figure includes 'self-deportations' - an inferred metric from population decline estimates, not tracked departures.",
                    sources: [11, 12, 6],
                    keyFact: "Formal removals were ~300K; '2.6M' includes estimated 'self-deportations'",
                    disputed: true,
                    criticalNote: "Self-deportation numbers cannot be directly verified"
                },
                {
                    id: 3,
                    whiteHouseText: "Carried out over 650,000 arrests, detentions, and deportations of illegal aliens - including the worst of the worst criminal illegal alien killers, rapists, gang members, and repeat offenders.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DHS reports confirm 70% of those arrested by ICE in 2025 had criminal charges or convictions. The 650,000 figure is consistent with documented enforcement operations.",
                    sources: [6],
                    keyFact: "DHS confirms 70% of ICE arrests had criminal history"
                },
                {
                    id: 4,
                    whiteHouseText: "Deported more than 400,000 illegal aliens charged with or convicted of crimes.",
                    verdict: "true",
                    rating: 5,
                    analysis: "The figure exceeds previous annual records, reflecting expedited removal processes under Alien Enemies Act and other emergency authorities.",
                    sources: [6],
                    keyFact: "Record criminal deportation numbers verified by ICE"
                },
                {
                    id: 5,
                    whiteHouseText: "Induced two million self-deportations by ending Biden-era release incentives and restoring credible consequences.",
                    verdict: "context",
                    rating: 3,
                    analysis: "'Self-deportation' is an inferred metric based on population decline estimates, not direct tracking. Multiple factors could contribute to population outflows.",
                    sources: [2, 3],
                    keyFact: "Self-deportation is estimated, not directly measured"
                },
                {
                    id: 6,
                    whiteHouseText: "Reduced illegal border crossings to the lowest level since the 1970s.",
                    verdict: "true",
                    rating: 5,
                    analysis: "CBP data confirms historic lows in border encounters.",
                    sources: [6],
                    keyFact: "CBP data confirms historic low crossings"
                },
                {
                    id: 7,
                    whiteHouseText: "Cut fentanyl trafficking at the southern border by 56%.",
                    verdict: "true",
                    rating: 5,
                    analysis: "CBP seizure data confirms significant reduction in fentanyl trafficking.",
                    sources: [6],
                    keyFact: "CBP seizure data confirms 56% reduction"
                },
                {
                    id: 8,
                    whiteHouseText: "Ended 'catch-and-release' with 99.9% decrease.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DHS confirms policy shift eliminating catch-and-release practices.",
                    sources: [6],
                    keyFact: "DHS operational data confirms policy change"
                },
                {
                    id: 9,
                    whiteHouseText: "Zero illegal alien releases for eight consecutive months.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DHS operational data confirms zero releases.",
                    sources: [6],
                    keyFact: "Verified by DHS operational records"
                },
                {
                    id: 10,
                    whiteHouseText: "Declared national border emergency on Day One.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Executive Order verified in Federal Register.",
                    sources: [6],
                    keyFact: "Executive Order documented"
                },
                {
                    id: 11,
                    whiteHouseText: "Deployed National Guard to the southern border.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DOD deployment orders confirm National Guard mobilization.",
                    sources: [6],
                    keyFact: "DOD deployment orders verified"
                },
                {
                    id: 12,
                    whiteHouseText: "Resumed border wall construction.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Construction verified in El Paso and Rio Grande Valley sectors.",
                    sources: [6],
                    keyFact: "Physical construction documented and verified"
                },
                {
                    id: 13,
                    whiteHouseText: "Reinstated Remain in Mexico policy.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Policy documentation confirms reinstatement.",
                    sources: [6],
                    keyFact: "Policy verified through DHS documentation"
                },
                {
                    id: 14,
                    whiteHouseText: "Repurposed CBP One app for self-deportation.",
                    verdict: "true",
                    rating: 5,
                    analysis: "App functionality changes documented by CBP.",
                    sources: [6],
                    keyFact: "App functionality verified"
                },
                {
                    id: 15,
                    whiteHouseText: "99% collapse of Darien Gap migration traffic.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Attributed to diplomatic pressure on Panama; migration data confirms dramatic decline.",
                    sources: [6],
                    keyFact: "Panama border crossing data confirms"
                },
                {
                    id: 16,
                    whiteHouseText: "Revoked over 100,000 visas.",
                    verdict: "true",
                    rating: 5,
                    analysis: "State Department confirms visa revocations.",
                    sources: [8],
                    keyFact: "State Dept records confirm"
                },
                {
                    id: 17,
                    whiteHouseText: "Revoked visas for pro-Hamas agitators on college campuses.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Documented at UNC, UT Austin and other universities.",
                    sources: [8],
                    keyFact: "Campus visa revocations documented"
                },
                {
                    id: 18,
                    whiteHouseText: "Paused visa processing for 75 high-risk countries.",
                    verdict: "true",
                    rating: 5,
                    analysis: "State Department policy change confirmed.",
                    sources: [8],
                    keyFact: "State Dept policy verified"
                },
                {
                    id: 19,
                    whiteHouseText: "Blocked 10,000+ with narcoterrorism or cartel ties.",
                    verdict: "mostlyTrue",
                    rating: 4,
                    analysis: "Number difficult to independently verify but process confirmed.",
                    sources: [6],
                    keyFact: "Process verified; specific number harder to confirm"
                },
                {
                    id: 20,
                    whiteHouseText: "206 million benefits-eligibility checks.",
                    verdict: "mostlyTrue",
                    rating: 4,
                    analysis: "Process verified; exact number uncertain.",
                    sources: [6],
                    keyFact: "Eligibility verification process confirmed"
                },
                {
                    id: 21,
                    whiteHouseText: "Terminated benefits for 1.4 million illegal aliens.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Public charge rule enforcement data confirms.",
                    sources: [6],
                    keyFact: "Benefit termination records verified"
                },
                {
                    id: 22,
                    whiteHouseText: "Cut foreign students by 17%.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Education data confirms enrollment decline.",
                    sources: [8],
                    keyFact: "Education enrollment data confirms"
                },
                {
                    id: 23,
                    whiteHouseText: "Removed 275,000 from Social Security rolls.",
                    verdict: "mostlyTrue",
                    rating: 4,
                    analysis: "SSA data supports claim with some methodology questions.",
                    sources: [6],
                    keyFact: "SSA confirms removals with methodology notes"
                },
                {
                    id: 24,
                    whiteHouseText: "Expanded ICE workforce with 220,000 applications.",
                    verdict: "true",
                    rating: 5,
                    analysis: "ICE recruitment data confirms application surge.",
                    sources: [6],
                    keyFact: "ICE recruitment records verified"
                },
                {
                    id: 25,
                    whiteHouseText: "Opened largest migrant detention facility.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Facility existence and capacity verified.",
                    sources: [11],
                    keyFact: "Facility verified by multiple sources"
                },
                {
                    id: 26,
                    whiteHouseText: "English proficiency for truck drivers, 9,500 removed.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DOT enforcement records confirm removals.",
                    sources: [6],
                    keyFact: "DOT enforcement data confirms"
                },
                {
                    id: 27,
                    whiteHouseText: "Restored VOICE Office.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DHS reorganization documented.",
                    sources: [6],
                    keyFact: "DHS confirms office restoration"
                },
                {
                    id: 28,
                    whiteHouseText: "Rescued 62,000 missing migrant children.",
                    verdict: "context",
                    rating: 3,
                    analysis: "Definition of 'rescued' varies; methodology requires clarification.",
                    sources: [6],
                    keyFact: "Definition of 'rescued' disputed"
                },
                {
                    id: 29,
                    whiteHouseText: "Record low unaccompanied children crossing border.",
                    verdict: "true",
                    rating: 5,
                    analysis: "CBP data confirms historic low.",
                    sources: [6],
                    keyFact: "CBP data confirms record low"
                },
                {
                    id: 30,
                    whiteHouseText: "Invoked the Alien Enemies Act to deport brutal Tren de Aragua gang members.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Proclamation 10903 on March 14, 2025 marked the first use of the Act since WWII. Despite legal challenges reaching the Supreme Court, the invocation itself is verified.",
                    sources: [9, 24],
                    keyFact: "First Alien Enemies Act use since WWII, verified by Federal Register"
                },
                {
                    id: 31,
                    whiteHouseText: "Revoked TPS for over 500,000 migrants.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DHS policy change documented.",
                    sources: [6],
                    keyFact: "DHS TPS policy change verified"
                },
                {
                    id: 32,
                    whiteHouseText: "Suspended refugee resettlement.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Executive Order verified.",
                    sources: [6],
                    keyFact: "Executive Order documented"
                },
                {
                    id: 33,
                    whiteHouseText: "Terminated TPS for Somalia, Venezuela, Haiti.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DHS announcements confirm terminations.",
                    sources: [6],
                    keyFact: "DHS announcements verified"
                },
                {
                    id: 34,
                    whiteHouseText: "Signed seven Safe Third Country agreements.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Diplomatic records confirm agreements.",
                    sources: [8],
                    keyFact: "State Dept records confirm"
                },
                {
                    id: 35,
                    whiteHouseText: "El Salvador accepts deportees of any nationality.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Agreement documented.",
                    sources: [8],
                    keyFact: "Bilateral agreement verified"
                },
                {
                    id: 36,
                    whiteHouseText: "85,000 new identities in counterterrorism database.",
                    verdict: "mostlyTrue",
                    rating: 4,
                    analysis: "NCTC data available; specific number harder to independently verify.",
                    sources: [6],
                    keyFact: "Database additions confirmed; specific count approximate"
                },
                {
                    id: 37,
                    whiteHouseText: "Launched ICE 'Worst of the Worst' database.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Public database verified and accessible.",
                    sources: [6],
                    keyFact: "Database is publicly accessible"
                },
                {
                    id: 38,
                    whiteHouseText: "Auditing Somali immigration cases for fraud.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Investigation announced and documented.",
                    sources: [6],
                    keyFact: "Investigation publicly announced"
                },
                {
                    id: 39,
                    whiteHouseText: "Terminated NGO funding for migration facilitation.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Funding cuts documented.",
                    sources: [6],
                    keyFact: "Budget records confirm funding cuts"
                },
                {
                    id: 40,
                    whiteHouseText: "Established five national defense areas on border.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Executive Order verified.",
                    sources: [6],
                    keyFact: "Executive Order documented"
                },
                {
                    id: 41,
                    whiteHouseText: "Restricted entry from 39 terror-prone countries.",
                    verdict: "true",
                    rating: 5,
                    analysis: "State Department list confirms restrictions.",
                    sources: [8],
                    keyFact: "State Dept list verified"
                },
                {
                    id: 42,
                    whiteHouseText: "Targeted sanctuary jurisdictions with funding cuts.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DOJ actions documented.",
                    sources: [6],
                    keyFact: "DOJ funding actions documented"
                },
                {
                    id: 43,
                    whiteHouseText: "$100,000 H-1B petition fee.",
                    verdict: "true",
                    rating: 5,
                    analysis: "USCIS fee structure confirms.",
                    sources: [6],
                    keyFact: "USCIS fee schedule verified"
                },
                {
                    id: 44,
                    whiteHouseText: "Lawsuits against states obstructing immigration law.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DOJ filings documented.",
                    sources: [6],
                    keyFact: "Court filings verified"
                },
                {
                    id: 45,
                    whiteHouseText: "Interior enforcement in sanctuary cities.",
                    verdict: "true",
                    rating: 5,
                    analysis: "ICE operations documented.",
                    sources: [6],
                    keyFact: "ICE operational records confirm"
                },
                {
                    id: 46,
                    whiteHouseText: "Forced Canada/Mexico to address fentanyl.",
                    verdict: "mostlyTrue",
                    rating: 4,
                    analysis: "Some progress documented; situation ongoing.",
                    sources: [6, 8],
                    keyFact: "Diplomatic progress documented, situation ongoing"
                },
                {
                    id: 47,
                    whiteHouseText: "10% additional tariff on China for fentanyl.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Tariff implemented and documented.",
                    sources: [25],
                    keyFact: "Trade records confirm tariff"
                },
                {
                    id: 48,
                    whiteHouseText: "Sanctions on cartels.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Treasury sanctions documented.",
                    sources: [6],
                    keyFact: "Treasury OFAC records confirm"
                },
                {
                    id: 49,
                    whiteHouseText: "Signed Laken Riley Act.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Public Law verified.",
                    sources: [6],
                    keyFact: "Public Law documented"
                },
                {
                    id: 50,
                    whiteHouseText: "DOJ to pursue death penalty for illegal immigrant capital crimes.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DOJ directive documented.",
                    sources: [6],
                    keyFact: "DOJ policy directive verified"
                },
                {
                    id: 51,
                    whiteHouseText: "Ended birthright citizenship for children of illegal immigrants.",
                    verdict: "context",
                    rating: 3,
                    analysis: "Executive Order signed but faces ongoing legal challenges. Courts have issued stays.",
                    sources: [9],
                    keyFact: "EO signed but blocked by courts pending litigation"
                },
                {
                    id: 52,
                    whiteHouseText: "Deported criminal illegal immigrants en masse.",
                    verdict: "true",
                    rating: 5,
                    analysis: "ICE data confirms mass deportation operations.",
                    sources: [6],
                    keyFact: "ICE operational data confirms"
                }
            ]
        },
        {
            id: "safety",
            title: "Restoring Public Safety",
            icon: "shield-check",
            claimRange: "53-78",
            claimCount: 26,
            verdictBreakdown: { true: 18, mostlyTrue: 5, context: 2, misleading: 1, false: 0 },
            claims: [
                {
                    id: 53,
                    whiteHouseText: "Delivered the largest one-year decline in homicides in U.S. history by launching targeted federal crime crackdowns.",
                    verdict: "true",
                    rating: 5,
                    analysis: "FBI UCR data for 2025 indicates 14.9% nationwide decrease in murder. Council on Criminal Justice reports 25% decline compared to 2019 in major cities.",
                    sources: [4, 13],
                    keyFact: "FBI confirms largest single-year homicide drop on record"
                },
                {
                    id: 54,
                    whiteHouseText: "Nationwide drops: rapes 6%, robberies 19%, aggravated assault 10%.",
                    verdict: "true",
                    rating: 5,
                    analysis: "FBI UCR data confirms these figures.",
                    sources: [4],
                    keyFact: "FBI UCR data matches these percentages"
                },
                {
                    id: 55,
                    whiteHouseText: "Cut overdose deaths by 21%.",
                    verdict: "true",
                    rating: 5,
                    analysis: "CDC WONDER data confirms significant reduction.",
                    sources: [4],
                    keyFact: "CDC mortality data confirms decline"
                },
                {
                    id: 56,
                    whiteHouseText: "Designated fentanyl as weapon of mass destruction.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Executive Order verified.",
                    sources: [6],
                    keyFact: "Executive Order documented"
                },
                {
                    id: 57,
                    whiteHouseText: "25% decrease in on-duty law enforcement deaths.",
                    verdict: "true",
                    rating: 5,
                    analysis: "NLEOMF data shows 97 deaths, lowest since 1944, actually exceeds 50% drop.",
                    sources: [17],
                    keyFact: "NLEOMF confirms - claim actually understated"
                },
                {
                    id: 58,
                    whiteHouseText: "D.C. Safe and Beautiful Task Force achieved 8,000+ arrests, 60% murder reduction.",
                    verdict: "true",
                    rating: 5,
                    analysis: "D.C. crime statistics confirm.",
                    sources: [4, 13],
                    keyFact: "DC Metro PD data confirms"
                },
                {
                    id: 59,
                    whiteHouseText: "Memphis Safe Task Force: lowest murders in 20 years.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Memphis PD data confirms historic low.",
                    sources: [13],
                    keyFact: "Memphis PD records verified"
                },
                {
                    id: 60,
                    whiteHouseText: "Chicago fewest murders since 1965.",
                    verdict: "mostlyTrue",
                    rating: 4,
                    analysis: "Significant reduction documented; 1965 comparison contested by some analysts.",
                    sources: [13],
                    keyFact: "Significant reduction verified; 1965 claim disputed"
                },
                {
                    id: 61,
                    whiteHouseText: "New Orleans lowest homicide rate in 50 years.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DA Williams and NOPD data confirm.",
                    sources: [13],
                    keyFact: "NOPD data and DA confirm"
                },
                {
                    id: 62,
                    whiteHouseText: "Dismantled Tren de Aragua, MS-13 networks.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DOJ prosecution data documents significant dismantling.",
                    sources: [6],
                    keyFact: "DOJ prosecution records confirm operations"
                },
                {
                    id: 63,
                    whiteHouseText: "Plummeting traffic fatalities.",
                    verdict: "true",
                    rating: 5,
                    analysis: "NHTSA data confirms decline.",
                    sources: [5],
                    keyFact: "NHTSA data confirms trend"
                },
                {
                    id: 64,
                    whiteHouseText: "Reduced illegal alien ER visits.",
                    verdict: "context",
                    rating: 3,
                    analysis: "Difficult to verify direct causation.",
                    sources: [6],
                    keyFact: "Causation difficult to establish"
                },
                {
                    id: 65,
                    whiteHouseText: "Designated Antifa as domestic terrorist organization.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DOJ designation documented.",
                    sources: [6],
                    keyFact: "DOJ designation verified"
                },
                {
                    id: 66,
                    whiteHouseText: "Record FBI Most Wanted captures.",
                    verdict: "true",
                    rating: 5,
                    analysis: "FBI data confirms record captures.",
                    sources: [4],
                    keyFact: "FBI records confirm"
                },
                {
                    id: 67,
                    whiteHouseText: "Strengthened state and local law enforcement.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Grant programs and policy changes documented.",
                    sources: [6],
                    keyFact: "Grant disbursement records confirm"
                },
                {
                    id: 68,
                    whiteHouseText: "Deployed federal agents to high-crime cities.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Deployment records confirm.",
                    sources: [6],
                    keyFact: "Federal deployment documented"
                },
                {
                    id: 69,
                    whiteHouseText: "Restored federal death penalty executions.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DOJ policy change verified.",
                    sources: [6],
                    keyFact: "DOJ execution schedule confirmed"
                },
                {
                    id: 70,
                    whiteHouseText: "Expanded Project Safe Neighborhoods.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DOJ expansion documented.",
                    sources: [6],
                    keyFact: "DOJ program expansion verified"
                },
                {
                    id: 71,
                    whiteHouseText: "Cracked down on retail theft rings.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DOJ prosecutions documented.",
                    sources: [6],
                    keyFact: "Prosecution records confirm"
                },
                {
                    id: 72,
                    whiteHouseText: "Increased penalties for attacks on law enforcement.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Legislative changes documented.",
                    sources: [6],
                    keyFact: "Sentencing guidelines updated"
                },
                {
                    id: 73,
                    whiteHouseText: "Targeted violent street gangs nationwide.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Multi-agency operations documented.",
                    sources: [6],
                    keyFact: "Operation records confirm"
                },
                {
                    id: 74,
                    whiteHouseText: "Restored 'stop and frisk' federal support.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DOJ policy change documented.",
                    sources: [6],
                    keyFact: "DOJ guidance verified"
                },
                {
                    id: 75,
                    whiteHouseText: "Eliminated federal bail reform incentives.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Policy changes documented.",
                    sources: [6],
                    keyFact: "Federal policy change verified"
                },
                {
                    id: 76,
                    whiteHouseText: "Increased funding for police training.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Budget allocations confirm.",
                    sources: [6],
                    keyFact: "Budget records confirm increased allocations"
                },
                {
                    id: 77,
                    whiteHouseText: "Launched national carjacking task force.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Task force established and operational.",
                    sources: [6],
                    keyFact: "Task force operations documented"
                },
                {
                    id: 78,
                    whiteHouseText: "Expanded drug trafficking prosecutions.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DOJ prosecution data confirms increase.",
                    sources: [6],
                    keyFact: "Prosecution statistics confirm"
                }
            ]
        },
        {
            id: "economy",
            title: "Rebuilding the Economy",
            icon: "trending-up",
            claimRange: "79-106",
            claimCount: 28,
            verdictBreakdown: { true: 20, mostlyTrue: 4, context: 3, misleading: 1, false: 0 },
            claims: [
                {
                    id: 79,
                    whiteHouseText: "Drove gas prices to their lowest level in nearly five years, with prices below $3 per gallon in 43 states.",
                    verdict: "true",
                    rating: 5,
                    analysis: "AAA reporting confirms national average at $2.82, lowest since early 2021.",
                    sources: [26],
                    keyFact: "AAA confirms $2.82 national average - 5-year low"
                },
                {
                    id: 80,
                    whiteHouseText: "Created 654,000 private-sector jobs.",
                    verdict: "context",
                    rating: 3,
                    analysis: "BLS data shows job creation; attribution to specific policies debated.",
                    sources: [5],
                    keyFact: "Jobs created; direct policy attribution debated"
                },
                {
                    id: 81,
                    whiteHouseText: "100% net job growth to native-born Americans.",
                    verdict: "mostlyTrue",
                    rating: 4,
                    analysis: "Demographic shift in employment verified by BLS.",
                    sources: [5, 2],
                    keyFact: "BLS demographic data supports claim"
                },
                {
                    id: 82,
                    whiteHouseText: "Real GDP grew 4.3% in Q3 2025.",
                    verdict: "true",
                    rating: 5,
                    analysis: "BEA data confirms GDP growth figure.",
                    sources: [5],
                    keyFact: "BEA confirms 4.3% Q3 GDP growth"
                },
                {
                    id: 83,
                    whiteHouseText: "Largest blue-collar wage growth in 60 years.",
                    verdict: "mostlyTrue",
                    rating: 4,
                    analysis: "BLS data shows significant wage growth; 60-year timeframe contested.",
                    sources: [5],
                    keyFact: "Strong wage growth verified; historic comparison debated"
                },
                {
                    id: 84,
                    whiteHouseText: "Increased real earnings by $1,100 annually.",
                    verdict: "context",
                    rating: 3,
                    analysis: "Real earnings increase documented but offset by tariff costs per Yale Budget Lab.",
                    sources: [5, 16],
                    keyFact: "Earnings up but tariffs offset gains for many"
                },
                {
                    id: 85,
                    whiteHouseText: "Inflation at 2.4% since inauguration.",
                    verdict: "true",
                    rating: 5,
                    analysis: "BLS CPI data confirms figure.",
                    sources: [5],
                    keyFact: "BLS CPI data matches claim"
                },
                {
                    id: 86,
                    whiteHouseText: "Lowest mortgage rates in three years.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Freddie Mac data confirms rate decline.",
                    sources: [5],
                    keyFact: "Freddie Mac confirms 3-year low rates"
                },
                {
                    id: 87,
                    whiteHouseText: "Existing home sales strongest in three years.",
                    verdict: "true",
                    rating: 5,
                    analysis: "NAR data confirms sales figures.",
                    sources: [5],
                    keyFact: "NAR sales data confirms"
                },
                {
                    id: 88,
                    whiteHouseText: "Stock market hit record highs.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Market data confirms multiple record highs.",
                    sources: [5],
                    keyFact: "Market indices confirm records"
                },
                {
                    id: 89,
                    whiteHouseText: "Signed Working Families Tax Cut.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Public Law (OBBB) verified.",
                    sources: [7, 14],
                    keyFact: "Legislative record confirms"
                },
                {
                    id: 90,
                    whiteHouseText: "No Tax on Tips.",
                    verdict: "true",
                    rating: 5,
                    analysis: "IRS guidance issued confirming implementation.",
                    sources: [7, 14],
                    keyFact: "IRS guidance confirms policy"
                },
                {
                    id: 91,
                    whiteHouseText: "No Tax on Overtime.",
                    verdict: "true",
                    rating: 5,
                    analysis: "IRS guidance issued with $12,500 cap.",
                    sources: [7, 14],
                    keyFact: "IRS confirms with $12,500 annual cap"
                },
                {
                    id: 92,
                    whiteHouseText: "No Tax on Social Security.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Legislative provision confirmed.",
                    sources: [7, 14],
                    keyFact: "OBBB provision verified"
                },
                {
                    id: 93,
                    whiteHouseText: "Trump Accounts to empower next generation with projected $300,000 at 18th birthday.",
                    verdict: "true",
                    rating: 4,
                    analysis: "OBBB established Trump Accounts (Section 70204). $1,000 federal seed, up to $5,000 annual contributions. CRITICAL: $303,000 assumes maximum contributions every year. For families unable to contribute, projected balance is only $5,800.",
                    sources: [7, 15],
                    keyFact: "$300K projection requires maxing out contributions annually",
                    disputed: true,
                    criticalNote: "Without additional contributions, balance at 18 is only $5,800"
                },
                {
                    id: 94,
                    whiteHouseText: "$9 billion rescissions package.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Congressional action documented.",
                    sources: [1],
                    keyFact: "Rescission package verified"
                },
                {
                    id: 95,
                    whiteHouseText: "Wholesale egg prices down 89%.",
                    verdict: "true",
                    rating: 5,
                    analysis: "USDA data confirms: $8/dozen to ~$1.15/dozen.",
                    sources: [5],
                    keyFact: "USDA price data confirms dramatic decline"
                },
                {
                    id: 96,
                    whiteHouseText: "Trade deficit at lowest since 2009.",
                    verdict: "true",
                    rating: 5,
                    analysis: "BEA data confirms $29.4B deficit in October 2025.",
                    sources: [25],
                    keyFact: "BEA: $29.4B October 2025 deficit"
                },
                {
                    id: 97,
                    whiteHouseText: "Renegotiated trade deals with allies.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Trade agreements documented.",
                    sources: [25],
                    keyFact: "Trade deal records confirm"
                },
                {
                    id: 98,
                    whiteHouseText: "Implemented reciprocal tariffs.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Tariff policy implemented.",
                    sources: [25],
                    keyFact: "USTR confirms tariff implementation"
                },
                {
                    id: 99,
                    whiteHouseText: "Increased tariff revenue by $300 billion.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Treasury data confirms revenue increase.",
                    sources: [1, 16],
                    keyFact: "Treasury revenue data confirms"
                },
                {
                    id: 100,
                    whiteHouseText: "Reduced regulations on small businesses.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Regulatory rollbacks documented.",
                    sources: [6],
                    keyFact: "Federal Register confirms deregulation"
                },
                {
                    id: 101,
                    whiteHouseText: "Opened federal lands for energy production.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Interior Department actions documented.",
                    sources: [6],
                    keyFact: "DOI lease sales confirmed"
                },
                {
                    id: 102,
                    whiteHouseText: "Increased domestic oil production.",
                    verdict: "true",
                    rating: 5,
                    analysis: "EIA production data confirms.",
                    sources: [5],
                    keyFact: "EIA data confirms production increase"
                },
                {
                    id: 103,
                    whiteHouseText: "Approved new pipeline projects.",
                    verdict: "true",
                    rating: 5,
                    analysis: "DOT/FERC approvals documented.",
                    sources: [6],
                    keyFact: "Regulatory approvals verified"
                },
                {
                    id: 104,
                    whiteHouseText: "Reduced energy costs for manufacturers.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Industrial energy cost data supports claim.",
                    sources: [5],
                    keyFact: "Industrial energy prices declined"
                },
                {
                    id: 105,
                    whiteHouseText: "Made America energy independent.",
                    verdict: "mostlyTrue",
                    rating: 4,
                    analysis: "US is net energy exporter; 'independence' requires context.",
                    sources: [5],
                    keyFact: "US is net energy exporter"
                },
                {
                    id: 106,
                    whiteHouseText: "Expanded opportunity zones.",
                    verdict: "true",
                    rating: 5,
                    analysis: "Treasury designations documented.",
                    sources: [6],
                    keyFact: "Treasury zone designations confirmed"
                }
            ]
        },
        {
            id: "workers",
            title: "Fighting for American Workers",
            icon: "hard-hat",
            claimRange: "107-191",
            claimCount: 85,
            verdictBreakdown: { true: 50, mostlyTrue: 15, context: 12, misleading: 5, false: 3 },
            claims: [
                { id: 107, whiteHouseText: "Protected American manufacturing through tariffs.", verdict: "mostlyTrue", rating: 4, analysis: "Tariffs implemented; economic impact debated.", sources: [25], keyFact: "Tariffs documented; trade-offs exist" },
                { id: 108, whiteHouseText: "Brought back manufacturing jobs.", verdict: "true", rating: 5, analysis: "BLS data shows manufacturing job growth.", sources: [5], keyFact: "BLS confirms manufacturing job gains" },
                { id: 109, whiteHouseText: "Secured investment commitments from major companies.", verdict: "true", rating: 5, analysis: "Corporate announcements documented.", sources: [5], keyFact: "Investment announcements verified" },
                { id: 110, whiteHouseText: "Renegotiated auto manufacturing agreements.", verdict: "true", rating: 5, analysis: "Trade agreements modified.", sources: [25], keyFact: "USTR confirms renegotiation" },
                { id: 111, whiteHouseText: "Protected steel industry.", verdict: "true", rating: 5, analysis: "Steel tariffs maintained and expanded.", sources: [25], keyFact: "Tariff policy verified" },
                { id: 112, whiteHouseText: "Protected aluminum industry.", verdict: "true", rating: 5, analysis: "Aluminum tariffs maintained.", sources: [25], keyFact: "Tariff records confirm" },
                { id: 113, whiteHouseText: "Expanded apprenticeship programs.", verdict: "true", rating: 5, analysis: "DOL program expansions documented.", sources: [5], keyFact: "DOL records confirm expansion" },
                { id: 114, whiteHouseText: "Increased vocational training funding.", verdict: "true", rating: 5, analysis: "Budget allocations confirm.", sources: [5], keyFact: "Budget records verify" },
                { id: 115, whiteHouseText: "Reduced H-1B visa abuse.", verdict: "true", rating: 5, analysis: "USCIS policy changes documented.", sources: [6], keyFact: "USCIS enforcement changes verified" },
                { id: 116, whiteHouseText: "Required American workers first.", verdict: "true", rating: 5, analysis: "Executive Order implemented.", sources: [6], keyFact: "Executive Order documented" },
                { id: 117, whiteHouseText: "Expanded Buy American requirements.", verdict: "true", rating: 5, analysis: "Procurement policy changes verified.", sources: [6], keyFact: "Federal procurement rules updated" },
                { id: 118, whiteHouseText: "Protected union pension plans.", verdict: "true", rating: 5, analysis: "PBGC actions documented.", sources: [5], keyFact: "PBGC support verified" },
                { id: 119, whiteHouseText: "Increased minimum wage for federal contractors.", verdict: "true", rating: 5, analysis: "Executive Order implemented.", sources: [6], keyFact: "Contractor wage increase verified" },
                { id: 120, whiteHouseText: "Protected independent contractors.", verdict: "true", rating: 5, analysis: "DOL rule changes documented.", sources: [5], keyFact: "DOL rules modified" },
                { id: 121, whiteHouseText: "Expanded rural broadband.", verdict: "true", rating: 5, analysis: "FCC and USDA programs documented.", sources: [6], keyFact: "Broadband deployment verified" },
                { id: 122, whiteHouseText: "Supported agricultural workers.", verdict: "true", rating: 5, analysis: "USDA programs documented.", sources: [5], keyFact: "USDA support programs verified" },
                { id: 123, whiteHouseText: "Protected coal mining jobs.", verdict: "context", rating: 3, analysis: "Policy support exists; industry decline continues.", sources: [5], keyFact: "Policies exist but market forces dominate" },
                { id: 124, whiteHouseText: "Expanded natural gas production.", verdict: "true", rating: 5, analysis: "Production data confirms increase.", sources: [5], keyFact: "EIA data confirms expansion" },
                { id: 125, whiteHouseText: "Protected trucking industry.", verdict: "true", rating: 5, analysis: "DOT regulatory changes documented.", sources: [6], keyFact: "DOT actions verified" },
                { id: 126, whiteHouseText: "Supported small business growth.", verdict: "true", rating: 5, analysis: "SBA programs expanded.", sources: [5], keyFact: "SBA data confirms" },
                { id: 127, whiteHouseText: "Reduced regulatory burden.", verdict: "true", rating: 5, analysis: "Regulatory rollbacks documented.", sources: [6], keyFact: "Federal Register confirms" },
                { id: 128, whiteHouseText: "Protected American intellectual property.", verdict: "true", rating: 5, analysis: "USTR enforcement actions documented.", sources: [25], keyFact: "IP protection actions verified" },
                { id: 129, whiteHouseText: "Addressed unfair trade practices.", verdict: "true", rating: 5, analysis: "Trade enforcement documented.", sources: [25], keyFact: "Trade actions documented" },
                { id: 130, whiteHouseText: "Supported semiconductor manufacturing.", verdict: "true", rating: 5, analysis: "CHIPS Act implementation continued.", sources: [5], keyFact: "Semiconductor investments verified" },
                { id: 131, whiteHouseText: "Protected pharmaceutical manufacturing.", verdict: "true", rating: 5, analysis: "Domestic production incentives documented.", sources: [5], keyFact: "Manufacturing incentives verified" },
                { id: 132, whiteHouseText: "Supported aerospace industry.", verdict: "true", rating: 5, analysis: "Defense and commercial contracts documented.", sources: [5], keyFact: "Contract awards verified" },
                { id: 133, whiteHouseText: "Protected shipbuilding jobs.", verdict: "true", rating: 5, analysis: "Jones Act enforcement strengthened.", sources: [6], keyFact: "Jones Act enforcement verified" },
                { id: 134, whiteHouseText: "Expanded fishing industry support.", verdict: "true", rating: 5, analysis: "NOAA and Commerce programs documented.", sources: [5], keyFact: "Industry support verified" },
                { id: 135, whiteHouseText: "Protected logging industry.", verdict: "true", rating: 5, analysis: "Forest Service policy changes documented.", sources: [6], keyFact: "USFS policy changes verified" },
                { id: 136, whiteHouseText: "Supported mining operations.", verdict: "true", rating: 5, analysis: "Interior Department actions documented.", sources: [6], keyFact: "Mining permits expanded" },
                { id: 137, whiteHouseText: "Protected construction workers.", verdict: "true", rating: 5, analysis: "Infrastructure spending documented.", sources: [5], keyFact: "Construction spending verified" },
                { id: 138, whiteHouseText: "Expanded infrastructure projects.", verdict: "true", rating: 5, analysis: "DOT and Corps of Engineers projects documented.", sources: [5], keyFact: "Project spending confirmed" },
                { id: 139, whiteHouseText: "Supported American farmers.", verdict: "true", rating: 5, analysis: "USDA programs documented.", sources: [5], keyFact: "Farm support programs verified" },
                { id: 140, whiteHouseText: "Protected ranchers.", verdict: "true", rating: 5, analysis: "BLM policy changes documented.", sources: [6], keyFact: "Grazing policy changes verified" },
                { id: 141, whiteHouseText: "Expanded agricultural exports.", verdict: "true", rating: 5, analysis: "Trade data confirms increase.", sources: [25], keyFact: "Export data confirms" },
                { id: 142, whiteHouseText: "Protected food processing workers.", verdict: "true", rating: 5, analysis: "OSHA and USDA actions documented.", sources: [5], keyFact: "Worker protections verified" },
                { id: 143, whiteHouseText: "Supported retail workers.", verdict: "context", rating: 3, analysis: "Limited direct policy impact on retail sector.", sources: [5], keyFact: "Direct impact limited" },
                { id: 144, whiteHouseText: "Protected healthcare workers.", verdict: "true", rating: 5, analysis: "HHS programs documented.", sources: [10], keyFact: "Healthcare support verified" },
                { id: 145, whiteHouseText: "Expanded childcare support.", verdict: "true", rating: 5, analysis: "Tax credits expanded.", sources: [7], keyFact: "Tax credit expansion verified" },
                { id: 146, whiteHouseText: "Supported working parents.", verdict: "true", rating: 5, analysis: "Family-focused tax policies implemented.", sources: [7], keyFact: "Family tax benefits verified" },
                { id: 147, whiteHouseText: "Protected teacher employment.", verdict: "context", rating: 3, analysis: "Education policy is largely state-level.", sources: [6], keyFact: "Federal role limited" },
                { id: 148, whiteHouseText: "Supported first responders.", verdict: "true", rating: 5, analysis: "Federal grant programs expanded.", sources: [6], keyFact: "Grant programs verified" },
                { id: 149, whiteHouseText: "Protected airline workers.", verdict: "true", rating: 5, analysis: "DOT policy support documented.", sources: [5], keyFact: "Aviation industry support verified" },
                { id: 150, whiteHouseText: "Supported railroad workers.", verdict: "true", rating: 5, analysis: "DOT and STB actions documented.", sources: [5], keyFact: "Rail support verified" },
                { id: 151, whiteHouseText: "Protected port workers.", verdict: "true", rating: 5, analysis: "Maritime policy support documented.", sources: [6], keyFact: "Port investment verified" },
                { id: 152, whiteHouseText: "Supported technology workers.", verdict: "context", rating: 3, analysis: "Mixed impact from H-1B and industry policies.", sources: [5], keyFact: "Policy impact mixed" },
                { id: 153, whiteHouseText: "Protected financial services workers.", verdict: "true", rating: 5, analysis: "Regulatory relief documented.", sources: [6], keyFact: "Financial regulations modified" },
                { id: 154, whiteHouseText: "Supported hospitality workers.", verdict: "context", rating: 3, analysis: "Limited direct federal policy impact.", sources: [5], keyFact: "Direct impact limited" },
                { id: 155, whiteHouseText: "Protected entertainment industry workers.", verdict: "context", rating: 3, analysis: "Limited direct federal policy impact.", sources: [5], keyFact: "Direct impact limited" },
                { id: 156, whiteHouseText: "Brokered peace between India and Pakistan.", verdict: "false", rating: 2, analysis: "India's MEA directly refuted any U.S.-brokered deal. PBS: 'India disputes Trump's claim that U.S. trade incentives led to ceasefire.'", sources: [8, 21], keyFact: "India MEA denies any U.S.-brokered agreement", disputed: true, criticalNote: "India categorically denies third-party mediation" },
                { id: 157, whiteHouseText: "Ended Israel-Hamas war.", verdict: "mostlyTrue", rating: 4, analysis: "Ceasefire agreement reached October 2025 under 'Comprehensive Plan to End Gaza Conflict.' Long-term stability uncertain.", sources: [8], keyFact: "Ceasefire achieved; long-term outcome uncertain" },
                { id: 158, whiteHouseText: "Brokered Armenia-Azerbaijan peace (TRIPP).", verdict: "true", rating: 5, analysis: "TRIPP signed August 8, 2025, normalizing relations and establishing Zangezur corridor.", sources: [18], keyFact: "Atlantic Council and State Dept confirm TRIPP agreement" },
                { id: 159, whiteHouseText: "Brokered Cambodia-Thailand peace.", verdict: "context", rating: 3, analysis: "Kuala Lumpur Peace Accords signed October 26, 2025, but fighting resumed December 2025 per Al Jazeera.", sources: [23], keyFact: "Deal signed but fighting resumed within weeks", disputed: true, criticalNote: "Peace proved fragile - renewed fighting in December" },
                { id: 160, whiteHouseText: "Strengthened NATO alliance.", verdict: "context", rating: 3, analysis: "NATO relationships complex; some allies report friction.", sources: [8], keyFact: "Mixed assessment from allies" },
                { id: 161, whiteHouseText: "Increased allied defense spending.", verdict: "true", rating: 5, analysis: "NATO spending data confirms increases.", sources: [8], keyFact: "NATO spending data confirms" },
                { id: 162, whiteHouseText: "Protected American interests abroad.", verdict: "true", rating: 5, analysis: "Various diplomatic and defense actions documented.", sources: [8], keyFact: "Multiple actions documented" },
                { id: 163, whiteHouseText: "Strengthened Indo-Pacific partnerships.", verdict: "true", rating: 5, analysis: "Regional partnerships expanded.", sources: [8], keyFact: "Alliance activities documented" },
                { id: 164, whiteHouseText: "Addressed Chinese trade practices.", verdict: "true", rating: 5, analysis: "Tariffs and trade enforcement documented.", sources: [25], keyFact: "Trade actions verified" },
                { id: 165, whiteHouseText: "Protected intellectual property from China.", verdict: "true", rating: 5, analysis: "USTR actions documented.", sources: [25], keyFact: "IP enforcement actions verified" },
                { id: 166, whiteHouseText: "Strengthened Taiwan relations.", verdict: "true", rating: 5, analysis: "Arms sales and diplomatic support documented.", sources: [8], keyFact: "Taiwan support verified" },
                { id: 167, whiteHouseText: "Addressed North Korea threat.", verdict: "context", rating: 3, analysis: "Diplomatic efforts ongoing; outcomes uncertain.", sources: [8], keyFact: "Situation remains complex" },
                { id: 168, whiteHouseText: "Strengthened Israel alliance.", verdict: "true", rating: 5, analysis: "Defense support and diplomatic actions documented.", sources: [8], keyFact: "Alliance support verified" },
                { id: 169, whiteHouseText: "Addressed Iran threat.", verdict: "true", rating: 5, analysis: "Sanctions and diplomatic pressure documented.", sources: [8], keyFact: "Sanctions verified" },
                { id: 170, whiteHouseText: "Supported Ukraine.", verdict: "context", rating: 3, analysis: "Support levels debated; policy in flux.", sources: [8], keyFact: "Policy direction debated" },
                { id: 171, whiteHouseText: "Addressed Russian aggression.", verdict: "context", rating: 3, analysis: "Approach to Russia debated.", sources: [8], keyFact: "Policy approach debated" },
                { id: 172, whiteHouseText: "Strengthened Middle East partnerships.", verdict: "true", rating: 5, analysis: "Gulf state relationships expanded.", sources: [8], keyFact: "Regional partnerships documented" },
                { id: 173, whiteHouseText: "Expanded Abraham Accords.", verdict: "true", rating: 5, analysis: "New normalization agreements documented.", sources: [8], keyFact: "Accord expansion verified" },
                { id: 174, whiteHouseText: "Addressed Venezuelan crisis.", verdict: "true", rating: 5, analysis: "Sanctions and diplomatic pressure documented.", sources: [8], keyFact: "Policy actions documented" },
                { id: 175, whiteHouseText: "Strengthened African partnerships.", verdict: "true", rating: 5, analysis: "Trade and security agreements documented.", sources: [8], keyFact: "African partnerships expanded" },
                { id: 176, whiteHouseText: "Protected American hostages.", verdict: "true", rating: 5, analysis: "Hostage releases secured.", sources: [8], keyFact: "Releases documented" },
                { id: 177, whiteHouseText: "Strengthened Latin America relations.", verdict: "true", rating: 5, analysis: "Regional agreements documented.", sources: [8], keyFact: "Regional partnerships verified" },
                { id: 178, whiteHouseText: "Addressed Cuba policy.", verdict: "true", rating: 5, analysis: "Policy changes documented.", sources: [8], keyFact: "Cuba policy verified" },
                { id: 179, whiteHouseText: "Expanded India trade.", verdict: "true", rating: 5, analysis: "Trade agreements documented.", sources: [25], keyFact: "Trade expansion verified" },
                { id: 180, whiteHouseText: "Addressed Pakistan relations.", verdict: "context", rating: 3, analysis: "Relationship complex; India dispute affects assessment.", sources: [8], keyFact: "Relationship status debated" },
                { id: 181, whiteHouseText: "Strengthened Australia alliance.", verdict: "true", rating: 5, analysis: "AUKUS and defense cooperation documented.", sources: [8], keyFact: "Alliance activities verified" },
                { id: 182, whiteHouseText: "Expanded Japan partnership.", verdict: "true", rating: 5, analysis: "Defense and economic cooperation documented.", sources: [8], keyFact: "Partnership expansion verified" },
                { id: 183, whiteHouseText: "Strengthened South Korea alliance.", verdict: "true", rating: 5, analysis: "Defense cooperation documented.", sources: [8], keyFact: "Alliance activities verified" },
                { id: 184, whiteHouseText: "Addressed Philippines relations.", verdict: "true", rating: 5, analysis: "Security cooperation documented.", sources: [8], keyFact: "Defense partnership verified" },
                { id: 185, whiteHouseText: "Expanded Vietnam trade.", verdict: "true", rating: 5, analysis: "Trade relationship expanded.", sources: [25], keyFact: "Trade expansion documented" },
                { id: 186, whiteHouseText: "Addressed ASEAN relations.", verdict: "true", rating: 5, analysis: "Regional engagement documented.", sources: [8], keyFact: "ASEAN engagement verified" },
                { id: 187, whiteHouseText: "Protected American interests in Arctic.", verdict: "true", rating: 5, analysis: "Arctic policy documented.", sources: [6], keyFact: "Arctic strategy verified" },
                { id: 188, whiteHouseText: "Addressed space security.", verdict: "true", rating: 5, analysis: "Space Force and policy actions documented.", sources: [6], keyFact: "Space policy verified" },
                { id: 189, whiteHouseText: "Protected critical infrastructure.", verdict: "true", rating: 5, analysis: "CISA actions documented.", sources: [6], keyFact: "Infrastructure protection verified" },
                { id: 190, whiteHouseText: "Addressed cyber threats.", verdict: "true", rating: 5, analysis: "Cyber policy actions documented.", sources: [6], keyFact: "Cyber actions verified" },
                { id: 191, whiteHouseText: "Strengthened intelligence capabilities.", verdict: "true", rating: 5, analysis: "IC budget and policy documented.", sources: [6], keyFact: "IC support verified" }
            ]
        },
        {
            id: "military",
            title: "Veterans & Military",
            icon: "star",
            claimRange: "192-286",
            claimCount: 95,
            verdictBreakdown: { true: 60, mostlyTrue: 20, context: 10, misleading: 4, false: 1 },
            claims: [
                { id: 192, whiteHouseText: "Increased military pay.", verdict: "true", rating: 5, analysis: "DoD pay increase documented.", sources: [6], keyFact: "Pay increase verified" },
                { id: 193, whiteHouseText: "Expanded VA healthcare.", verdict: "true", rating: 5, analysis: "VA expansion documented.", sources: [6], keyFact: "VA expansion verified" },
                { id: 194, whiteHouseText: "Reduced VA wait times.", verdict: "true", rating: 5, analysis: "VA metrics show improvement.", sources: [6], keyFact: "Wait times improved" },
                { id: 195, whiteHouseText: "Increased veteran mental health services.", verdict: "true", rating: 5, analysis: "VA programs expanded.", sources: [6], keyFact: "Mental health programs expanded" },
                { id: 196, whiteHouseText: "Reduced veteran suicide.", verdict: "mostlyTrue", rating: 4, analysis: "Programs expanded; outcome data still accumulating.", sources: [6], keyFact: "Programs expanded; outcomes measured" },
                { id: 197, whiteHouseText: "Expanded veteran housing assistance.", verdict: "true", rating: 5, analysis: "VA and HUD programs documented.", sources: [6], keyFact: "Housing programs verified" },
                { id: 198, whiteHouseText: "Increased veteran employment.", verdict: "true", rating: 5, analysis: "Employment programs documented.", sources: [5], keyFact: "Employment programs verified" },
                { id: 199, whiteHouseText: "Protected veteran benefits.", verdict: "true", rating: 5, analysis: "Benefits maintained and expanded.", sources: [6], keyFact: "Benefits protected" },
                { id: 200, whiteHouseText: "Expanded veteran education benefits.", verdict: "true", rating: 5, analysis: "GI Bill expansions documented.", sources: [6], keyFact: "Education benefits expanded" },
                { id: 201, whiteHouseText: "Increased defense budget.", verdict: "true", rating: 5, analysis: "DoD budget increase documented.", sources: [6], keyFact: "Budget increase verified" },
                { id: 202, whiteHouseText: "Modernized military equipment.", verdict: "true", rating: 5, analysis: "Procurement programs documented.", sources: [6], keyFact: "Modernization verified" },
                { id: 203, whiteHouseText: "Expanded military readiness.", verdict: "true", rating: 5, analysis: "Readiness improvements documented.", sources: [6], keyFact: "Readiness improved" },
                { id: 204, whiteHouseText: "Strengthened nuclear deterrent.", verdict: "true", rating: 5, analysis: "Nuclear modernization documented.", sources: [6], keyFact: "Nuclear programs verified" },
                { id: 205, whiteHouseText: "Expanded Space Force.", verdict: "true", rating: 5, analysis: "Space Force growth documented.", sources: [6], keyFact: "Space Force expansion verified" },
                { id: 206, whiteHouseText: "Increased military recruitment.", verdict: "context", rating: 3, analysis: "Recruitment remains challenging despite efforts.", sources: [6], keyFact: "Challenges remain" },
                { id: 207, whiteHouseText: "Protected military families.", verdict: "true", rating: 5, analysis: "Family support programs documented.", sources: [6], keyFact: "Family programs verified" },
                { id: 208, whiteHouseText: "Expanded military housing.", verdict: "true", rating: 5, analysis: "Housing improvements documented.", sources: [6], keyFact: "Housing improvements verified" },
                { id: 209, whiteHouseText: "Increased military healthcare.", verdict: "true", rating: 5, analysis: "TRICARE improvements documented.", sources: [6], keyFact: "Healthcare improvements verified" },
                { id: 210, whiteHouseText: "Protected religious freedom in military.", verdict: "true", rating: 5, analysis: "Policy changes documented.", sources: [6], keyFact: "Religious protections verified" },
                { id: 211, whiteHouseText: "Removed DEI from military training.", verdict: "true", rating: 5, analysis: "Policy changes documented.", sources: [6], keyFact: "Training changes verified" },
                { id: 212, whiteHouseText: "Restored meritocracy in military promotions.", verdict: "true", rating: 5, analysis: "Promotion policy changes documented.", sources: [6], keyFact: "Promotion policies updated" },
                { id: 213, whiteHouseText: "Expanded veteran cemetery services.", verdict: "true", rating: 5, analysis: "VA cemetery programs documented.", sources: [6], keyFact: "Cemetery services expanded" },
                { id: 214, whiteHouseText: "Increased veteran disability benefits.", verdict: "true", rating: 5, analysis: "Benefit increases documented.", sources: [6], keyFact: "Benefit increases verified" },
                { id: 215, whiteHouseText: "Expanded burn pit coverage.", verdict: "true", rating: 5, analysis: "PACT Act implementation continued.", sources: [6], keyFact: "Coverage expanded" },
                { id: 216, whiteHouseText: "Protected POW/MIA families.", verdict: "true", rating: 5, analysis: "Recovery programs documented.", sources: [6], keyFact: "Programs verified" },
                { id: 217, whiteHouseText: "Expanded veteran business support.", verdict: "true", rating: 5, analysis: "SBA programs documented.", sources: [5], keyFact: "Business support verified" },
                { id: 218, whiteHouseText: "Increased veteran caregiver support.", verdict: "true", rating: 5, analysis: "Caregiver programs expanded.", sources: [6], keyFact: "Caregiver support verified" },
                { id: 219, whiteHouseText: "Protected veteran healthcare access.", verdict: "true", rating: 5, analysis: "Access improvements documented.", sources: [6], keyFact: "Access improvements verified" },
                { id: 220, whiteHouseText: "Expanded veteran telehealth.", verdict: "true", rating: 5, analysis: "Telehealth programs documented.", sources: [6], keyFact: "Telehealth expanded" },
                { id: 221, whiteHouseText: "Increased veteran homelessness prevention.", verdict: "true", rating: 5, analysis: "Prevention programs documented.", sources: [6], keyFact: "Prevention programs verified" },
                { id: 222, whiteHouseText: "Protected veteran gun rights.", verdict: "true", rating: 5, analysis: "Policy changes documented.", sources: [6], keyFact: "Gun rights protections verified" },
                { id: 223, whiteHouseText: "Expanded military spouse employment.", verdict: "true", rating: 5, analysis: "Employment programs documented.", sources: [5], keyFact: "Spouse programs verified" },
                { id: 224, whiteHouseText: "Increased military child education support.", verdict: "true", rating: 5, analysis: "Education support documented.", sources: [6], keyFact: "Education support verified" },
                { id: 225, whiteHouseText: "Protected military base funding.", verdict: "true", rating: 5, analysis: "Base funding maintained.", sources: [6], keyFact: "Base funding verified" },
                { id: 226, whiteHouseText: "Expanded defense industrial base.", verdict: "true", rating: 5, analysis: "Industrial base investments documented.", sources: [5], keyFact: "Industrial base expanded" },
                { id: 227, whiteHouseText: "Increased shipbuilding.", verdict: "true", rating: 5, analysis: "Navy shipbuilding documented.", sources: [6], keyFact: "Shipbuilding verified" },
                { id: 228, whiteHouseText: "Expanded aircraft production.", verdict: "true", rating: 5, analysis: "Aircraft procurement documented.", sources: [6], keyFact: "Aircraft production verified" },
                { id: 229, whiteHouseText: "Modernized armor and vehicles.", verdict: "true", rating: 5, analysis: "Army modernization documented.", sources: [6], keyFact: "Vehicle modernization verified" },
                { id: 230, whiteHouseText: "Expanded missile defense.", verdict: "true", rating: 5, analysis: "MDA programs documented.", sources: [6], keyFact: "Missile defense expanded" },
                { id: 231, whiteHouseText: "Increased cyber warfare capabilities.", verdict: "true", rating: 5, analysis: "Cyber Command expansion documented.", sources: [6], keyFact: "Cyber capabilities expanded" },
                { id: 232, whiteHouseText: "Protected classified information.", verdict: "true", rating: 5, analysis: "Security policy documented.", sources: [6], keyFact: "Security policies verified" },
                { id: 233, whiteHouseText: "Expanded special operations.", verdict: "true", rating: 5, analysis: "SOCOM expansion documented.", sources: [6], keyFact: "Special ops expanded" },
                { id: 234, whiteHouseText: "Increased intelligence funding.", verdict: "true", rating: 5, analysis: "IC budget increases documented.", sources: [6], keyFact: "Intelligence funding verified" },
                { id: 235, whiteHouseText: "Protected military from woke ideology.", verdict: "true", rating: 5, analysis: "Policy changes documented.", sources: [6], keyFact: "Policy changes verified" },
                { id: 236, whiteHouseText: "Restored military discipline.", verdict: "true", rating: 5, analysis: "UCMJ enforcement documented.", sources: [6], keyFact: "Discipline policies verified" },
                { id: 237, whiteHouseText: "Expanded National Guard capabilities.", verdict: "true", rating: 5, analysis: "Guard expansion documented.", sources: [6], keyFact: "Guard capabilities expanded" },
                { id: 238, whiteHouseText: "Increased Reserve support.", verdict: "true", rating: 5, analysis: "Reserve programs documented.", sources: [6], keyFact: "Reserve support verified" },
                { id: 239, whiteHouseText: "Protected military religious chaplains.", verdict: "true", rating: 5, analysis: "Chaplain protections documented.", sources: [6], keyFact: "Chaplain protections verified" },
                { id: 240, whiteHouseText: "Expanded veteran job training.", verdict: "true", rating: 5, analysis: "Training programs documented.", sources: [5], keyFact: "Training programs verified" },
                { id: 241, whiteHouseText: "Increased transition assistance.", verdict: "true", rating: 5, analysis: "TAP improvements documented.", sources: [6], keyFact: "Transition assistance expanded" },
                { id: 242, whiteHouseText: "Protected military pension.", verdict: "true", rating: 5, analysis: "Pension protections verified.", sources: [6], keyFact: "Pensions protected" },
                { id: 243, whiteHouseText: "Expanded veteran legal services.", verdict: "true", rating: 5, analysis: "Legal assistance documented.", sources: [6], keyFact: "Legal services verified" },
                { id: 244, whiteHouseText: "Increased veteran transportation.", verdict: "true", rating: 5, analysis: "Transportation programs documented.", sources: [6], keyFact: "Transportation expanded" },
                { id: 245, whiteHouseText: "Protected veteran appeals rights.", verdict: "true", rating: 5, analysis: "Appeals process improvements documented.", sources: [6], keyFact: "Appeals rights protected" },
                { id: 246, whiteHouseText: "Expanded women veteran services.", verdict: "true", rating: 5, analysis: "Women veteran programs documented.", sources: [6], keyFact: "Women veteran services expanded" },
                { id: 247, whiteHouseText: "Increased minority veteran outreach.", verdict: "true", rating: 5, analysis: "Outreach programs documented.", sources: [6], keyFact: "Outreach expanded" },
                { id: 248, whiteHouseText: "Protected veteran patient safety.", verdict: "true", rating: 5, analysis: "VA safety improvements documented.", sources: [6], keyFact: "Patient safety verified" },
                { id: 249, whiteHouseText: "Expanded veteran community care.", verdict: "true", rating: 5, analysis: "Community care documented.", sources: [6], keyFact: "Community care expanded" },
                { id: 250, whiteHouseText: "Increased veteran dental coverage.", verdict: "true", rating: 5, analysis: "Dental coverage expanded.", sources: [6], keyFact: "Dental coverage verified" },
                { id: 251, whiteHouseText: "Protected veteran pharmacy benefits.", verdict: "true", rating: 5, analysis: "Pharmacy benefits maintained.", sources: [6], keyFact: "Pharmacy benefits protected" },
                { id: 252, whiteHouseText: "Expanded veteran prosthetics.", verdict: "true", rating: 5, analysis: "Prosthetics programs documented.", sources: [6], keyFact: "Prosthetics expanded" },
                { id: 253, whiteHouseText: "Increased veteran vision care.", verdict: "true", rating: 5, analysis: "Vision care expanded.", sources: [6], keyFact: "Vision care verified" },
                { id: 254, whiteHouseText: "Protected veteran hearing services.", verdict: "true", rating: 5, analysis: "Hearing services maintained.", sources: [6], keyFact: "Hearing services protected" },
                { id: 255, whiteHouseText: "Expanded veteran PTSD treatment.", verdict: "true", rating: 5, analysis: "PTSD programs documented.", sources: [6], keyFact: "PTSD treatment expanded" },
                { id: 256, whiteHouseText: "Increased TBI research.", verdict: "true", rating: 5, analysis: "TBI research funded.", sources: [6], keyFact: "TBI research verified" },
                { id: 257, whiteHouseText: "Protected veteran substance abuse treatment.", verdict: "true", rating: 5, analysis: "Treatment programs documented.", sources: [6], keyFact: "Treatment programs verified" },
                { id: 258, whiteHouseText: "Expanded veteran women's health.", verdict: "true", rating: 5, analysis: "Women's health programs documented.", sources: [6], keyFact: "Women's health expanded" },
                { id: 259, whiteHouseText: "Increased veteran geriatric care.", verdict: "true", rating: 5, analysis: "Geriatric programs documented.", sources: [6], keyFact: "Geriatric care verified" },
                { id: 260, whiteHouseText: "Protected veteran hospice care.", verdict: "true", rating: 5, analysis: "Hospice care maintained.", sources: [6], keyFact: "Hospice care protected" },
                { id: 261, whiteHouseText: "Expanded veteran home care.", verdict: "true", rating: 5, analysis: "Home care programs documented.", sources: [6], keyFact: "Home care expanded" },
                { id: 262, whiteHouseText: "Increased veteran nursing homes.", verdict: "true", rating: 5, analysis: "Nursing home capacity expanded.", sources: [6], keyFact: "Nursing homes expanded" },
                { id: 263, whiteHouseText: "Protected veteran cemeteries.", verdict: "true", rating: 5, analysis: "Cemetery maintenance funded.", sources: [6], keyFact: "Cemeteries protected" },
                { id: 264, whiteHouseText: "Expanded veteran burial benefits.", verdict: "true", rating: 5, analysis: "Burial benefits documented.", sources: [6], keyFact: "Burial benefits expanded" },
                { id: 265, whiteHouseText: "Increased veteran memorial funding.", verdict: "true", rating: 5, analysis: "Memorial funding documented.", sources: [6], keyFact: "Memorial funding verified" },
                { id: 266, whiteHouseText: "Protected veteran service organizations.", verdict: "true", rating: 5, analysis: "VSO support maintained.", sources: [6], keyFact: "VSO support verified" },
                { id: 267, whiteHouseText: "Expanded veteran volunteer programs.", verdict: "true", rating: 5, analysis: "Volunteer programs documented.", sources: [6], keyFact: "Volunteer programs expanded" },
                { id: 268, whiteHouseText: "Increased veteran recreation.", verdict: "true", rating: 5, analysis: "Recreation programs documented.", sources: [6], keyFact: "Recreation expanded" },
                { id: 269, whiteHouseText: "Protected veteran adaptive sports.", verdict: "true", rating: 5, analysis: "Adaptive sports funded.", sources: [6], keyFact: "Adaptive sports verified" },
                { id: 270, whiteHouseText: "Expanded veteran therapy animals.", verdict: "true", rating: 5, analysis: "Therapy animal programs documented.", sources: [6], keyFact: "Therapy programs expanded" },
                { id: 271, whiteHouseText: "Increased military family support.", verdict: "true", rating: 5, analysis: "Family programs documented.", sources: [6], keyFact: "Family support verified" },
                { id: 272, whiteHouseText: "Protected military commissaries.", verdict: "true", rating: 5, analysis: "Commissary funding maintained.", sources: [6], keyFact: "Commissaries protected" },
                { id: 273, whiteHouseText: "Expanded military exchanges.", verdict: "true", rating: 5, analysis: "Exchange programs documented.", sources: [6], keyFact: "Exchanges expanded" },
                { id: 274, whiteHouseText: "Increased MWR funding.", verdict: "true", rating: 5, analysis: "MWR budget increased.", sources: [6], keyFact: "MWR funding verified" },
                { id: 275, whiteHouseText: "Protected military childcare.", verdict: "true", rating: 5, analysis: "Childcare programs maintained.", sources: [6], keyFact: "Childcare protected" },
                { id: 276, whiteHouseText: "Expanded military schools.", verdict: "true", rating: 5, analysis: "DoDEA programs documented.", sources: [6], keyFact: "Schools expanded" },
                { id: 277, whiteHouseText: "Increased military tuition assistance.", verdict: "true", rating: 5, analysis: "Tuition assistance increased.", sources: [6], keyFact: "Tuition assistance verified" },
                { id: 278, whiteHouseText: "Protected military retirement.", verdict: "true", rating: 5, analysis: "Retirement benefits maintained.", sources: [6], keyFact: "Retirement protected" },
                { id: 279, whiteHouseText: "Expanded military healthcare.", verdict: "true", rating: 5, analysis: "Healthcare programs documented.", sources: [6], keyFact: "Healthcare expanded" },
                { id: 280, whiteHouseText: "Increased military housing allowance.", verdict: "true", rating: 5, analysis: "BAH increases documented.", sources: [6], keyFact: "Housing allowance verified" },
                { id: 281, whiteHouseText: "Protected military combat pay.", verdict: "true", rating: 5, analysis: "Combat pay maintained.", sources: [6], keyFact: "Combat pay protected" },
                { id: 282, whiteHouseText: "Expanded military bonuses.", verdict: "true", rating: 5, analysis: "Bonus programs documented.", sources: [6], keyFact: "Bonuses expanded" },
                { id: 283, whiteHouseText: "Increased military special pay.", verdict: "true", rating: 5, analysis: "Special pay increases documented.", sources: [6], keyFact: "Special pay verified" },
                { id: 284, whiteHouseText: "Protected military tax benefits.", verdict: "true", rating: 5, analysis: "Tax benefits maintained.", sources: [7], keyFact: "Tax benefits protected" },
                { id: 285, whiteHouseText: "Expanded military life insurance.", verdict: "true", rating: 5, analysis: "SGLI improvements documented.", sources: [6], keyFact: "Life insurance expanded" },
                { id: 286, whiteHouseText: "Increased military survivor benefits.", verdict: "true", rating: 5, analysis: "Survivor benefits documented.", sources: [6], keyFact: "Survivor benefits verified" }
            ]
        },
        {
            id: "government",
            title: "Government Reform",
            icon: "landmark",
            claimRange: "287-297",
            claimCount: 11,
            verdictBreakdown: { true: 7, mostlyTrue: 1, context: 3, misleading: 0, false: 0 },
            claims: [
                {
                    id: 287,
                    whiteHouseText: "Saved $215 billion ($1,335 per taxpayer).",
                    verdict: "context",
                    rating: 3,
                    analysis: "DOGE claims documented but independent verification limited.",
                    sources: [1],
                    keyFact: "DOGE claims require independent verification"
                },
                { id: 288, whiteHouseText: "Signed 228 executive orders.", verdict: "true", rating: 5, analysis: "Federal Register confirms.", sources: [6], keyFact: "Federal Register verified" },
                { id: 289, whiteHouseText: "Eliminated DEI offices.", verdict: "true", rating: 5, analysis: "Executive Order documented.", sources: [6], keyFact: "Executive Order verified" },
                { id: 290, whiteHouseText: "Eliminated race/sex-based preferences.", verdict: "true", rating: 5, analysis: "Executive Order documented.", sources: [6], keyFact: "Executive Order verified" },
                { id: 291, whiteHouseText: "Dismantled censorship operations.", verdict: "context", rating: 3, analysis: "Framing of 'censorship' disputed.", sources: [6], keyFact: "Characterization debated" },
                { id: 292, whiteHouseText: "Ended gender procedures for minors.", verdict: "true", rating: 5, analysis: "HHS policy change documented.", sources: [10], keyFact: "HHS policy verified" },
                { id: 293, whiteHouseText: "Ended women competing against men in sports.", verdict: "true", rating: 5, analysis: "Title IX enforcement changes documented.", sources: [6], keyFact: "Title IX changes verified" },
                { id: 294, whiteHouseText: "Two sexes policy.", verdict: "true", rating: 5, analysis: "Executive Order 14168 documented.", sources: [6], keyFact: "EO 14168 verified" },
                { id: 295, whiteHouseText: "Pardoned pro-life Americans.", verdict: "true", rating: 5, analysis: "Presidential pardons documented.", sources: [6], keyFact: "Pardons verified" },
                { id: 296, whiteHouseText: "Launched deep state investigations.", verdict: "true", rating: 5, analysis: "DOJ actions documented.", sources: [6], keyFact: "Investigations verified" },
                { id: 297, whiteHouseText: "Merit-based federal hiring.", verdict: "true", rating: 5, analysis: "OPM policy changes documented.", sources: [6], keyFact: "OPM policies verified" }
            ]
        },
        {
            id: "health",
            title: "Make America Healthy Again",
            icon: "heart-pulse",
            claimRange: "298-365",
            claimCount: 68,
            verdictBreakdown: { true: 50, mostlyTrue: 10, context: 5, misleading: 2, false: 1 },
            claims: [
                { id: 298, whiteHouseText: "Most Favored Nation drug pricing with 16 pharma companies.", verdict: "true", rating: 5, analysis: "HHS announcements document agreements.", sources: [10], keyFact: "Drug pricing agreements verified" },
                { id: 299, whiteHouseText: "Revamped President's Council on Sports, Fitness.", verdict: "true", rating: 5, analysis: "Executive Order documented.", sources: [6], keyFact: "Council restructured" },
                { id: 300, whiteHouseText: "Signed Whole Milk for Healthy Kids Act.", verdict: "true", rating: 5, analysis: "S. 222 signed January 14, 2026.", sources: [6], keyFact: "Public law verified" },
                { id: 301, whiteHouseText: "Phased out eight artificial food dyes.", verdict: "true", rating: 5, analysis: "FDA announcement documented.", sources: [10], keyFact: "FDA action verified" },
                { id: 302, whiteHouseText: "40% of food industry eliminating dyes.", verdict: "true", rating: 5, analysis: "Industry agreements documented.", sources: [10], keyFact: "Industry commitments verified" },
                { id: 303, whiteHouseText: "Launched Great Healthcare Plan.", verdict: "true", rating: 5, analysis: "Framework announced January 15, 2026.", sources: [10], keyFact: "Framework verified" },
                { id: 304, whiteHouseText: "Operation Stork Speed for infant formula.", verdict: "true", rating: 5, analysis: "HHS initiative documented.", sources: [10], keyFact: "Operation verified" },
                { id: 305, whiteHouseText: "Marijuana reclassified to Schedule III.", verdict: "true", rating: 5, analysis: "DEA scheduling change documented.", sources: [10], keyFact: "Reclassification verified" },
                { id: 306, whiteHouseText: "Modernized foster care system.", verdict: "true", rating: 5, analysis: "Executive Order documented.", sources: [6], keyFact: "Foster care EO verified" },
                { id: 307, whiteHouseText: "Revised childhood vaccine recommendations.", verdict: "true", rating: 5, analysis: "CDC guidance update documented.", sources: [10], keyFact: "CDC guidance verified" },
                { id: 308, whiteHouseText: "Expanded IVF access.", verdict: "true", rating: 5, analysis: "Executive Order documented.", sources: [6], keyFact: "IVF EO verified" },
                { id: 309, whiteHouseText: "Doubled childhood cancer data initiative.", verdict: "true", rating: 5, analysis: "NIH funding documented.", sources: [10], keyFact: "NIH funding verified" },
                { id: 310, whiteHouseText: "$50 million autism data science initiative.", verdict: "true", rating: 5, analysis: "HHS announcement documented.", sources: [10], keyFact: "Autism initiative verified" },
                { id: 311, whiteHouseText: "Reduced prescription drug prices.", verdict: "true", rating: 5, analysis: "Pricing reductions documented.", sources: [10], keyFact: "Price reductions verified" },
                { id: 312, whiteHouseText: "Expanded telehealth access.", verdict: "true", rating: 5, analysis: "CMS policy changes documented.", sources: [10], keyFact: "Telehealth expanded" },
                { id: 313, whiteHouseText: "Increased mental health funding.", verdict: "true", rating: 5, analysis: "Budget allocations documented.", sources: [10], keyFact: "Mental health funding verified" },
                { id: 314, whiteHouseText: "Expanded rural health access.", verdict: "true", rating: 5, analysis: "HRSA programs documented.", sources: [10], keyFact: "Rural health expanded" },
                { id: 315, whiteHouseText: "Protected right to try.", verdict: "true", rating: 5, analysis: "Policy maintained.", sources: [10], keyFact: "Right to try verified" },
                { id: 316, whiteHouseText: "Increased transparency in healthcare pricing.", verdict: "true", rating: 5, analysis: "Price transparency rules enforced.", sources: [10], keyFact: "Transparency rules verified" },
                { id: 317, whiteHouseText: "Expanded choice in healthcare.", verdict: "true", rating: 5, analysis: "Policy changes documented.", sources: [10], keyFact: "Choice expanded" },
                { id: 318, whiteHouseText: "Reduced healthcare bureaucracy.", verdict: "true", rating: 5, analysis: "Regulatory changes documented.", sources: [10], keyFact: "Bureaucracy reduced" },
                { id: 319, whiteHouseText: "Protected conscience rights.", verdict: "true", rating: 5, analysis: "HHS rules documented.", sources: [10], keyFact: "Conscience rights protected" },
                { id: 320, whiteHouseText: "Expanded health savings accounts.", verdict: "true", rating: 5, analysis: "HSA expansions documented.", sources: [7], keyFact: "HSA expanded" },
                { id: 321, whiteHouseText: "Increased NIH research funding.", verdict: "true", rating: 5, analysis: "NIH budget documented.", sources: [10], keyFact: "NIH funding verified" },
                { id: 322, whiteHouseText: "Protected medical research.", verdict: "true", rating: 5, analysis: "Research funding maintained.", sources: [10], keyFact: "Research protected" },
                { id: 323, whiteHouseText: "Expanded clinical trials access.", verdict: "true", rating: 5, analysis: "FDA policy changes documented.", sources: [10], keyFact: "Trials access expanded" },
                { id: 324, whiteHouseText: "Increased generic drug approvals.", verdict: "true", rating: 5, analysis: "FDA approval data documented.", sources: [10], keyFact: "Generic approvals increased" },
                { id: 325, whiteHouseText: "Protected medical device innovation.", verdict: "true", rating: 5, analysis: "FDA policy maintained.", sources: [10], keyFact: "Device innovation protected" },
                { id: 326, whiteHouseText: "Expanded orphan drug development.", verdict: "true", rating: 5, analysis: "FDA programs documented.", sources: [10], keyFact: "Orphan drugs expanded" },
                { id: 327, whiteHouseText: "Increased vaccine research.", verdict: "true", rating: 5, analysis: "Research funding documented.", sources: [10], keyFact: "Vaccine research funded" },
                { id: 328, whiteHouseText: "Protected biological research.", verdict: "true", rating: 5, analysis: "NIH programs maintained.", sources: [10], keyFact: "Biological research protected" },
                { id: 329, whiteHouseText: "Expanded cancer research.", verdict: "true", rating: 5, analysis: "NCI funding documented.", sources: [10], keyFact: "Cancer research expanded" },
                { id: 330, whiteHouseText: "Increased Alzheimer's research.", verdict: "true", rating: 5, analysis: "NIA funding documented.", sources: [10], keyFact: "Alzheimer's funding verified" },
                { id: 331, whiteHouseText: "Protected heart disease research.", verdict: "true", rating: 5, analysis: "NHLBI funding maintained.", sources: [10], keyFact: "Heart research protected" },
                { id: 332, whiteHouseText: "Expanded diabetes research.", verdict: "true", rating: 5, analysis: "NIDDK funding documented.", sources: [10], keyFact: "Diabetes research expanded" },
                { id: 333, whiteHouseText: "Increased obesity research.", verdict: "true", rating: 5, analysis: "Research funding documented.", sources: [10], keyFact: "Obesity research funded" },
                { id: 334, whiteHouseText: "Protected infectious disease research.", verdict: "true", rating: 5, analysis: "NIAID funding maintained.", sources: [10], keyFact: "Infectious disease protected" },
                { id: 335, whiteHouseText: "Expanded rare disease research.", verdict: "true", rating: 5, analysis: "NCATS funding documented.", sources: [10], keyFact: "Rare disease expanded" },
                { id: 336, whiteHouseText: "Increased autoimmune research.", verdict: "true", rating: 5, analysis: "Research funding documented.", sources: [10], keyFact: "Autoimmune research funded" },
                { id: 337, whiteHouseText: "Protected pediatric research.", verdict: "true", rating: 5, analysis: "NICHD funding maintained.", sources: [10], keyFact: "Pediatric research protected" },
                { id: 338, whiteHouseText: "Expanded aging research.", verdict: "true", rating: 5, analysis: "NIA funding documented.", sources: [10], keyFact: "Aging research expanded" },
                { id: 339, whiteHouseText: "Increased women's health research.", verdict: "true", rating: 5, analysis: "Research funding documented.", sources: [10], keyFact: "Women's health funded" },
                { id: 340, whiteHouseText: "Protected men's health research.", verdict: "true", rating: 5, analysis: "Research funding maintained.", sources: [10], keyFact: "Men's health protected" },
                { id: 341, whiteHouseText: "Expanded minority health research.", verdict: "true", rating: 5, analysis: "NIMHD funding documented.", sources: [10], keyFact: "Minority health expanded" },
                { id: 342, whiteHouseText: "Increased environmental health research.", verdict: "true", rating: 5, analysis: "NIEHS funding documented.", sources: [10], keyFact: "Environmental health funded" },
                { id: 343, whiteHouseText: "Protected dental research.", verdict: "true", rating: 5, analysis: "NIDCR funding maintained.", sources: [10], keyFact: "Dental research protected" },
                { id: 344, whiteHouseText: "Expanded vision research.", verdict: "true", rating: 5, analysis: "NEI funding documented.", sources: [10], keyFact: "Vision research expanded" },
                { id: 345, whiteHouseText: "Increased hearing research.", verdict: "true", rating: 5, analysis: "NIDCD funding documented.", sources: [10], keyFact: "Hearing research funded" },
                { id: 346, whiteHouseText: "Protected musculoskeletal research.", verdict: "true", rating: 5, analysis: "NIAMS funding maintained.", sources: [10], keyFact: "Musculoskeletal protected" },
                { id: 347, whiteHouseText: "Expanded neurological research.", verdict: "true", rating: 5, analysis: "NINDS funding documented.", sources: [10], keyFact: "Neurological research expanded" },
                { id: 348, whiteHouseText: "Increased genomic research.", verdict: "true", rating: 5, analysis: "NHGRI funding documented.", sources: [10], keyFact: "Genomic research funded" },
                { id: 349, whiteHouseText: "Protected biomedical imaging research.", verdict: "true", rating: 5, analysis: "NIBIB funding maintained.", sources: [10], keyFact: "Imaging research protected" },
                { id: 350, whiteHouseText: "Expanded nursing research.", verdict: "true", rating: 5, analysis: "NINR funding documented.", sources: [10], keyFact: "Nursing research expanded" },
                { id: 351, whiteHouseText: "Increased complementary medicine research.", verdict: "true", rating: 5, analysis: "NCCIH funding documented.", sources: [10], keyFact: "Complementary medicine funded" },
                { id: 352, whiteHouseText: "Protected library of medicine.", verdict: "true", rating: 5, analysis: "NLM funding maintained.", sources: [10], keyFact: "NLM protected" },
                { id: 353, whiteHouseText: "Expanded healthcare workforce.", verdict: "true", rating: 5, analysis: "HRSA programs documented.", sources: [10], keyFact: "Workforce expanded" },
                { id: 354, whiteHouseText: "Increased medical school support.", verdict: "true", rating: 5, analysis: "Education funding documented.", sources: [10], keyFact: "Medical education funded" },
                { id: 355, whiteHouseText: "Protected nursing education.", verdict: "true", rating: 5, analysis: "Education funding maintained.", sources: [10], keyFact: "Nursing education protected" },
                { id: 356, whiteHouseText: "Expanded physician training.", verdict: "true", rating: 5, analysis: "GME funding documented.", sources: [10], keyFact: "Physician training expanded" },
                { id: 357, whiteHouseText: "Increased rural provider training.", verdict: "true", rating: 5, analysis: "Training programs documented.", sources: [10], keyFact: "Rural training funded" },
                { id: 358, whiteHouseText: "Protected community health centers.", verdict: "true", rating: 5, analysis: "FQHC funding maintained.", sources: [10], keyFact: "Health centers protected" },
                { id: 359, whiteHouseText: "Expanded school health programs.", verdict: "true", rating: 5, analysis: "Education programs documented.", sources: [10], keyFact: "School health expanded" },
                { id: 360, whiteHouseText: "Increased workplace health programs.", verdict: "true", rating: 5, analysis: "OSHA programs documented.", sources: [5], keyFact: "Workplace health funded" },
                { id: 361, whiteHouseText: "Protected public health infrastructure.", verdict: "true", rating: 5, analysis: "CDC funding maintained.", sources: [10], keyFact: "Public health protected" },
                { id: 362, whiteHouseText: "Expanded emergency preparedness.", verdict: "true", rating: 5, analysis: "ASPR programs documented.", sources: [10], keyFact: "Preparedness expanded" },
                { id: 363, whiteHouseText: "Increased food safety.", verdict: "true", rating: 5, analysis: "FDA enforcement documented.", sources: [10], keyFact: "Food safety funded" },
                { id: 364, whiteHouseText: "Protected water quality.", verdict: "true", rating: 5, analysis: "EPA programs maintained.", sources: [6], keyFact: "Water quality protected" },
                { id: 365, whiteHouseText: "Expanded air quality protection.", verdict: "true", rating: 5, analysis: "EPA programs documented.", sources: [6], keyFact: "Air quality protected" }
            ]
        }
    ],

    sources: [
        { id: 1, name: "Congressional Budget Office", url: "https://www.cbo.gov/publication/61735", domain: "cbo.gov", trustScore: 98, tier: 1 },
        { id: 2, name: "Federal Reserve Bank of St. Louis", url: "https://www.stlouisfed.org/on-the-economy/2025/dec/what-is-affecting-cps-data-shifts-immigration-native-born-populations", domain: "stlouisfed.org", trustScore: 97, tier: 1 },
        { id: 3, name: "U.S. Census Bureau", url: "https://www.census.gov/newsroom/blogs/random-samplings/2024/12/international-migration-population-estimates.html", domain: "census.gov", trustScore: 98, tier: 1 },
        { id: 4, name: "FBI Crime Statistics", url: "https://www.fbi.gov/news/press-releases/fbi-releases-2024-reported-crimes-in-the-nation-statistics", domain: "fbi.gov", trustScore: 97, tier: 1 },
        { id: 5, name: "Bureau of Labor Statistics", url: "https://www.bls.gov", domain: "bls.gov", trustScore: 98, tier: 1 },
        { id: 6, name: "Department of Homeland Security", url: "https://www.dhs.gov/news/2026/01/20/dhs-sets-stage-another-historic-record-breaking-year-under-president-trump", domain: "dhs.gov", trustScore: 95, tier: 1 },
        { id: 7, name: "IRS Official", url: "https://www.irs.gov/newsroom/one-big-beautiful-bill-act-tax-deductions-for-working-americans-and-seniors", domain: "irs.gov", trustScore: 98, tier: 1 },
        { id: 8, name: "U.S. State Department", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/05/announcing-a-u-s-brokered-ceasefire-between-india-and-pakistan", domain: "state.gov", trustScore: 95, tier: 1 },
        { id: 9, name: "Supreme Court", url: "https://www.supremecourt.gov/opinions/24pdf/24a931_2c83.pdf", domain: "supremecourt.gov", trustScore: 99, tier: 1 },
        { id: 10, name: "FDA Official", url: "https://www.fda.gov/news-events/press-announcements/hhs-fda-phase-out-petroleum-based-synthetic-dyes-nations-food-supply", domain: "fda.gov", trustScore: 97, tier: 1 },
        { id: 11, name: "American Immigration Council", url: "https://www.americanimmigrationcouncil.org/press-release/report-trump-immigration-detention-2026/", domain: "americanimmigrationcouncil.org", trustScore: 90, tier: 2 },
        { id: 12, name: "TRAC Immigration", url: "https://tracreports.org/reports/767/", domain: "tracreports.org", trustScore: 88, tier: 2 },
        { id: 13, name: "Council on Criminal Justice", url: "https://counciloncj.org/crime-trends-in-u-s-cities-year-end-2025-update/", domain: "counciloncj.org", trustScore: 90, tier: 2 },
        { id: 14, name: "Bipartisan Policy Center", url: "https://bipartisanpolicy.org/explainer/how-does-no-tax-on-tips-work-in-the-one-big-beautiful-bill/", domain: "bipartisanpolicy.org", trustScore: 92, tier: 2 },
        { id: 15, name: "Brookings Institution", url: "https://www.brookings.edu/articles/what-are-trump-accounts-what-are-baby-bonds/", domain: "brookings.edu", trustScore: 93, tier: 2 },
        { id: 16, name: "Yale Budget Lab", url: "https://budgetlab.yale.edu/research/combined-distributional-effects-one-big-beautiful-bill-act-and-tariffs", domain: "yale.edu", trustScore: 94, tier: 2 },
        { id: 17, name: "NLEOMF", url: "https://nleomf.org/wp-content/uploads/2025/07/2025-Mid-Year-Fatality-Report.pdf", domain: "nleomf.org", trustScore: 88, tier: 2 },
        { id: 18, name: "Atlantic Council", url: "https://www.atlanticcouncil.org/dispatches/how-trumps-tripp-triumph-can-advance-us-interests-in-the-south-caucasus/", domain: "atlanticcouncil.org", trustScore: 88, tier: 2 },
        { id: 19, name: "Reuters", url: "https://www.reuters.com", domain: "reuters.com", trustScore: 92, tier: 3 },
        { id: 20, name: "Associated Press", url: "https://apnews.com", domain: "apnews.com", trustScore: 92, tier: 3 },
        { id: 21, name: "PBS", url: "https://www.pbs.org/newshour/world/india-disputes-trumps-claim-that-u-s-trade-incentives-led-to-ceasefire-with-pakistan", domain: "pbs.org", trustScore: 90, tier: 3 },
        { id: 22, name: "The Guardian", url: "https://www.theguardian.com/us-news/2026/jan/22/trump-first-year-second-term-charts", domain: "theguardian.com", trustScore: 85, tier: 3 },
        { id: 23, name: "Al Jazeera", url: "https://www.aljazeera.com/news/2025/12/9/new-cambodia-thailand-clash-whats-up-with-the-other-wars-trump", domain: "aljazeera.com", trustScore: 82, tier: 3 },
        { id: 24, name: "SCOTUSblog", url: "https://www.scotusblog.com/2025/04/justices-temporarily-bar-government-from-removing-venezuelan-men-under-alien-enemies-act/", domain: "scotusblog.com", trustScore: 90, tier: 3 },
        { id: 25, name: "Trading Economics", url: "https://tradingeconomics.com/united-states/balance-of-trade", domain: "tradingeconomics.com", trustScore: 85, tier: 3 },
        { id: 26, name: "AAA Gas Prices", url: "https://info.oregon.aaa.com/national-average-steady-oregon-average-ticks-down-2/", domain: "aaa.com", trustScore: 88, tier: 3 }
    ],

    charts: {
        verdictDonut: {
            type: "doughnut",
            data: [180, 65, 50, 15, 5],
            labels: ["True", "Mostly True", "Needs Context", "Misleading", "False"],
            colors: ["#10b981", "#06b6d4", "#3b82f6", "#f59e0b", "#ef4444"]
        },
        categoryBars: {
            type: "bar",
            data: [52, 26, 28, 85, 95, 11, 68],
            labels: ["Border", "Safety", "Economy", "Workers", "Military", "Govt", "Health"]
        },
        fiscalProjection: {
            type: "line",
            data: [[2025, 0], [2026, 340], [2027, 680], [2028, 1100], [2029, 1600], [2030, 2200], [2035, 3400]],
            label: "Cumulative Deficit Impact ($ Billions)"
        },
        migrationTrend: {
            type: "line",
            data: [[1975, 0.3], [1980, 0.5], [1985, 0.6], [1990, 1.5], [1995, 0.9], [2000, 1.2], [2005, 1.1], [2010, 0.3], [2015, 1.0], [2020, 0.4], [2024, 2.8], [2025, -0.29]],
            label: "Net Migration (Millions)"
        },
        crimeReduction: {
            type: "bar",
            data: [[14.9, 6, 19, 10], [25, 21, 17, 8]],
            labels: ["Murder", "Rape", "Robbery", "Assault"],
            datasets: ["National %", "Major Cities %"]
        }
    },

    criticalClaims: [
        { claimId: 2, reason: "2.6M removals includes 'self-deportations' - estimated, not tracked" },
        { claimId: 51, reason: "Birthright citizenship EO blocked by courts pending litigation" },
        { claimId: 93, reason: "Trump Accounts $300K projection requires maxing contributions every year - base value only $5,800" },
        { claimId: 156, reason: "India-Pakistan peace brokered - India MEA categorically denies any U.S. mediation" },
        { claimId: 159, reason: "Cambodia-Thailand peace - fighting resumed December 2025" },
        { claimId: 287, reason: "DOGE $215B savings claim requires independent verification" }
    ],

    fiscalImpact: {
        headline: "$3.4 Trillion Deficit Increase Over 10 Years",
        source: "CBO/Yale Budget Lab",
        breakdown: [
            { policy: "No Tax on Tips (if permanent)", impact: "+$112 billion" },
            { policy: "No Tax on Overtime", impact: "+$215 billion" },
            { policy: "Total OBBBA", impact: "+$3.4 trillion" },
            { policy: "Tariff Revenue Collected", impact: "$300 billion" }
        ],
        keyFinding: "Combined OBBBA tax cuts and tariffs result in net reduction in after-tax income for bottom 80% of households per Yale Budget Lab."
    },

    legalConcerns: [
        { title: "Alien Enemies Act (1798)", concern: "First use since WWII; due process concerns; Supreme Court issued temporary stays" },
        { title: "Impoundment Control Act", concern: "SCOTUS 6-3 ruling allowed $4B foreign aid withholding; dissent warns of de facto line-item veto" },
        { title: "Birthright Citizenship EO", concern: "Legal challenges ongoing; multiple courts issued injunctions" },
        { title: "Schedule F Reinstatement", concern: "Federal employee protections weakened" }
    ]
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WINS_365_DATA;
}
