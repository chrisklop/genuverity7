/**
 * The Villages Investment Analysis Data
 *
 * Strategic Investment Analysis: Short-Term Rental Acquisition
 * & Operational Framework in The Villages, FL
 *
 * "Florida's Friendliest Hometown" - An Investment Intelligence Dossier
 *
 * Structure mirrors jan-and-dean-data.js with era-based narratives
 *
 * @version 2.0
 */

const VILLAGES_INVESTMENT_DATA = {
    meta: {
        title: "Strategic Investment Analysis",
        subtitle: "Short-Term Rental Acquisition in The Villages, FL",
        tagline: "Florida's Friendliest Hometown",
        slug: "villages-investment-analysis",
        author: "GenuVerity Investment Intelligence",
        publishDate: "2026-01-06",
        readTime: "15 min analysis",
        totalSections: 6,
        version: "2.0",
        dedication: "For Laura — your next chapter starts with the right foundation.",
        dedicationSubtitle: "Smart investing is the art of finding opportunity where others see complexity."
    },

    // Visual theme - Florida Investment vibes
    theme: {
        primary: "#10b981",      // Emerald - Money/Growth
        secondary: "#06b6d4",    // Cyan - Florida waters
        accent1: "#f59e0b",      // Amber - Sunshine State
        accent2: "#3b82f6",      // Blue - Trust/Stability
        danger: "#ef4444",       // Red - Risk indicators
        background: "#0a0a14",
        card: "#1a1a2e",
        text: "#f0f0f0",
        muted: "#94a3b8",
        gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #f59e0b 100%)"
    },

    // Era-based sections (like Jan & Dean's eras)
    eras: [
        {
            id: "executive-intelligence",
            name: "The Villages Phenomenon",
            shortName: "Overview",
            years: "Est. 1983",
            yearStart: 1983,
            yearEnd: 2026,
            color: "#10b981",
            colorAlpha: "rgba(16, 185, 129, 0.2)",
            icon: "briefcase",
            summary: "The Villages isn't just a retirement community—it's a 40-square-mile experiment in master-planned living that has fundamentally altered the economics of central Florida. Understanding this asset class requires abandoning traditional residential investment frameworks and embracing its unique operational realities.",
            tagline: "Where the 55+ demographic becomes your built-in tenant base",
            easterEgg: "The Villages sells more golf carts per capita than anywhere else on Earth",
            stats: [
                { value: "140K+", label: "Residents" },
                { value: "95%+", label: "Q1 Occupancy" },
                { value: "3", label: "Counties" }
            ],
            events: [
                {
                    year: 2026,
                    title: "The Counter-Cyclical Asset",
                    summary: "What makes The Villages remarkable as an investment vehicle is its counter-cyclical behavior. When economic uncertainty rises, fixed-income retirees don't suddenly lose their pensions or Social Security—they keep spending. The demographic that fuels this community operates on a fundamentally different financial rhythm than the broader economy. During the 2008 financial crisis, while Florida's housing market collapsed, The Villages continued expanding. This isn't speculation; it's documented in property records and population growth data. The community added over 20,000 new residents between 2008 and 2012 while the rest of Florida bled homeowners to foreclosure. For the strategic investor, this represents a rare opportunity: an asset class that zigs when the market zags.",
                    impact: "Recession-resistant demand profile",
                    highlight: true,
                    sourceRefs: [1, 2]
                },
                {
                    year: 2026,
                    title: "The Snowbird Cover Ratio",
                    summary: "The single most important metric for evaluating a Villages STR investment is what we call the Snowbird Cover Ratio (SCR): the percentage of annual operating expenses covered by Q1 (January-March) revenue alone. A well-positioned property should achieve an SCR above 0.8, meaning that winter snowbird rentals alone cover 80% or more of the entire year's costs. This isn't aspirational—it's achievable. The data from AirDNA and AirROI consistently shows Q1 occupancy rates exceeding 95% in properly positioned properties. The remaining nine months become gravy: travel nurse contracts, lifestyle preview guests, and occasional Airbnb bookings that push annual returns into attractive territory.",
                    impact: "Primary KPI for property selection",
                    sourceRefs: [1, 2, 3]
                },
                {
                    year: 2026,
                    title: "The Three-Legged Revenue Stool",
                    summary: "Successful Villages STR operators don't rely on a single tenant demographic. Instead, they build what we call the Three-Legged Revenue Stool: Snowbirds (Q1), Travel Nurses (Q2-Q4), and Lifestyle Previews (opportunistic year-round). Each leg serves a distinct purpose. Snowbirds provide the predictable, high-margin foundation—these are 90-day commitments booked 6-12 months in advance at $4,500-$6,000 per month. Travel nurses fill the off-season with 13-week medical contracts at $2,000-$2,600 monthly—less per month, but more total revenue over nine months than chasing nightly Airbnb bookings. Lifestyle preview guests—potential buyers exploring retirement in The Villages—provide opportunistic fills at premium nightly rates. Remove any leg, and the stool wobbles.",
                    impact: "Revenue diversification strategy",
                    sourceRefs: [3, 4, 5, 6]
                }
            ]
        },
        {
            id: "regulatory-matrix",
            name: "The Jurisdiction Puzzle",
            shortName: "Zoning",
            years: "Three Counties, Three Realities",
            yearStart: 2020,
            yearEnd: 2026,
            color: "#ef4444",
            colorAlpha: "rgba(239, 68, 68, 0.2)",
            icon: "scale",
            summary: "Here's where most amateur investors stumble—and where your careful due diligence pays dividends. The Villages spans three Florida counties: Sumter, Lake, and Marion. Each has dramatically different short-term rental regulations. Buy in the wrong jurisdiction, and your Airbnb dreams become an expensive compliance nightmare.",
            tagline: "The invisible line that separates legal profits from illegal operations",
            easterEgg: "Governor DeSantis vetoed SB 280 in 2023, preserving local STR authority",
            stats: [
                { value: "30 Day", label: "Lake Co. Minimum" },
                { value: "4%", label: "Tourist Tax" },
                { value: "1", label: "Safe County" }
            ],
            events: [
                {
                    year: 2026,
                    title: "Sumter County: The Investor's Safe Harbor",
                    summary: "Sumter County is where you want to be. Period. No minimum rental period requirements. A straightforward 4% Tourist Development Tax that Airbnb collects automatically. No special licensing beyond standard business registration. The county's official stance, documented in Lodge Compliance filings and confirmed through county ordinances, is permissive toward short-term rentals in residential zones. This isn't a gray area or a loophole—it's explicit policy. Most of The Villages south of County Road 466A falls within Sumter County jurisdiction. When you see 'The Villages, FL' addresses, verify the county carefully. A single street can be the dividing line between a legal STR and an uninsurable liability.",
                    impact: "PRIMARY TARGET ZONE",
                    highlight: true,
                    sourceRefs: [15, 17]
                },
                {
                    year: 2026,
                    title: "Lake County: The Prohibition Zone",
                    summary: "Lake County's unincorporated areas are a minefield. The county classifies short-term rentals as commercial 'resort' use—explicitly prohibited in residential zoning districts. This isn't a matter of getting a variance or a special permit; it's a fundamental zoning classification that would require rezoning the property to operate legally. The 30-day minimum rental requirement effectively eliminates the Airbnb/VRBO model entirely. Worse, enforcement is complaint-driven, meaning your neighbors—many of whom are permanent residents who specifically chose The Villages for its quiet, age-restricted community feel—become your compliance officers. One complaint triggers investigation. Multiple complaints trigger fines. Persistent violations can result in daily penalties that compound into financial ruin.",
                    impact: "AVOID - Illegal for Airbnb",
                    tragedy: true,
                    sourceRefs: [7, 17]
                },
                {
                    year: 2026,
                    title: "Lady Lake: The Exception Within the Exception",
                    summary: "The Town of Lady Lake sits within Lake County but operates under its own municipal code—and that code permits short-term rentals. This creates a narrow corridor of opportunity in an otherwise restricted jurisdiction. The catch? You need a local business tax receipt, and the boundaries are highly specific. Properties on opposite sides of the same street can fall under different jurisdictions. Before making any offer on a Lady Lake property, obtain written confirmation from the town clerk's office that your specific parcel falls within incorporated Lady Lake limits and is eligible for STR operation. Verbal assurances from real estate agents are worthless; written municipal confirmation is essential.",
                    impact: "VIABLE with registration",
                    sourceRefs: [14]
                },
                {
                    year: 2026,
                    title: "Marion County: The Compliance Labyrinth",
                    summary: "Marion County permits short-term rentals but imposes a bureaucratic burden that many investors find prohibitive. The 4% Tourist Development Tax exists, but unlike Sumter County, Marion requires manual self-reporting. You're responsible for calculating, filing, and remitting taxes monthly—and the county audits. The paperwork isn't impossible, but it adds administrative overhead that compounds over time. More concerning: Marion County's enforcement apparatus is more developed than Sumter's. They actively monitor listing platforms and cross-reference against tax registrations. If you choose Marion County, budget for professional property management or prepare to become intimately familiar with Form DR-15—Florida's sales and use tax return.",
                    impact: "VIABLE but administrative burden",
                    sourceRefs: [16]
                }
            ]
        },
        {
            id: "cdd-ecosystem",
            name: "The CDD Labyrinth",
            shortName: "Districts",
            years: "Florida Statute 190",
            yearStart: 1980,
            yearEnd: 2026,
            color: "#3b82f6",
            colorAlpha: "rgba(59, 130, 246, 0.2)",
            icon: "building-2",
            summary: "If jurisdictional zoning is the first trap, Community Development Districts are the second. CDDs are special-purpose local governments created under Florida Statute 190 to finance and maintain community infrastructure. When you buy in The Villages, you're not just buying a house—you're assuming a share of district debt.",
            tagline: "The hidden cost structure that separates sophisticated investors from the surprised",
            easterEgg: "Some older CDDs have fully paid bonds—instant $1,500+ annual savings",
            stats: [
                { value: "$20-40K", label: "New Home Bond" },
                { value: "$0", label: "Paid Districts" },
                { value: "190", label: "FL Statute" }
            ],
            events: [
                {
                    year: 2026,
                    title: "Understanding Bond Debt",
                    summary: "Every new home in The Villages carries infrastructure bond debt—typically $20,000 to $40,000 or more depending on the district and construction date. This debt doesn't show up on your mortgage; it appears as an annual assessment on your property tax bill, typically $1,500 to $2,500 per year until the bonds mature (usually 20-30 years from original issuance). Here's the critical insight: when you buy a resale home, you assume the remaining bond balance at its current payoff amount, not the original face value. A 15-year-old home might have only $8,000 remaining on bonds that started at $30,000. This creates an arbitrage opportunity: older homes in established districts often have lower total cost of ownership than newer construction, despite similar purchase prices.",
                    impact: "Critical due diligence item",
                    highlight: true,
                    sourceRefs: [10, 11]
                },
                {
                    year: 2026,
                    title: "The Paid-Off District Advantage",
                    summary: "The most sophisticated Villages investors specifically target properties in districts where bonds have been fully paid off. These districts—primarily located north of County Road 466 in the original development phases—carry no bond assessment whatsoever. Your annual tax bill drops by $1,500-$2,500 compared to properties in newer districts with active bonds. The trade-off? These homes tend to be smaller, older, and less updated than newer construction. But for STR investors, the math often favors the paid-off district: lower carrying costs mean higher cash-on-cash returns, even if gross rental income is slightly lower due to older amenities. Run the numbers on a $300,000 home with zero bond debt versus a $350,000 home with $2,000 annual bond payments—the older home often wins.",
                    impact: "Maximize cash-on-cash returns",
                    sourceRefs: [10, 11, 22]
                },
                {
                    year: 2026,
                    title: "Maintenance Assessments: The Perpetual Cost",
                    summary: "Beyond bonds, every CDD levies an annual maintenance assessment—typically $300 to $800 per year—to fund ongoing district operations: road maintenance, drainage systems, common area landscaping, and administrative overhead. Unlike bonds, maintenance assessments never pay off. They're perpetual operating costs that adjust annually based on district budgets. Worse, they're immune to Save Our Homes cap protections that limit ad valorem tax increases for homesteaded properties. As an investor (non-homesteaded), you're exposed to the full impact of any assessment increases. Budget conservatively: assume 3-5% annual increases in maintenance assessments when projecting long-term cash flows.",
                    impact: "Perpetual carrying cost",
                    sourceRefs: [12, 22]
                }
            ]
        },
        {
            id: "age-compliance",
            name: "The 55+ Framework",
            shortName: "Rules",
            years: "HOPA 80/20 Rule",
            yearStart: 1995,
            yearEnd: 2026,
            color: "#f59e0b",
            colorAlpha: "rgba(245, 158, 11, 0.2)",
            icon: "users",
            summary: "The Villages operates under the Housing for Older Persons Act (HOPA), which allows age-restricted communities to legally discriminate based on age. This isn't just a marketing preference—it's enforceable federal law that shapes who can rent your property and for how long.",
            tagline: "Federal law that makes your target market your only market",
            easterEgg: "The 'Orlando family base' strategy fails spectacularly here",
            stats: [
                { value: "80%", label: "Required 55+" },
                { value: "30 Days", label: "Under 19 Limit" },
                { value: "19", label: "Age Threshold" }
            ],
            events: [
                {
                    year: 2026,
                    title: "The 80/20 Rule Explained",
                    summary: "Under HOPA, at least 80% of occupied units in The Villages must have at least one resident aged 55 or older. The remaining 20% can house younger residents—but this doesn't mean 20% of units are available for under-55 occupancy. It means the community maintains an overall demographic balance. When you rent to guests, you're operating within this framework. Your listing must comply with the community's age verification requirements, and your rental agreements must include age attestations. Violating HOPA compliance doesn't just affect your individual property—it threatens the entire community's age-restricted status. The Villages takes this seriously, and neighbors will report violations.",
                    impact: "Legal framework for age restriction",
                    sourceRefs: [18, 9]
                },
                {
                    year: 2026,
                    title: "The Under-19 Limitation",
                    summary: "Here's where the 'Orlando family base' investment thesis dies: visitors under 19 years old are limited to 30 cumulative days per calendar year per property. This isn't per visit—it's per year, tracked cumulatively. A family with children can't rent your property for a summer vacation. A grandparent visiting with grandchildren burns through their allocation quickly. This limitation fundamentally reshapes your target market. The Villages STR is not—and cannot be—positioned as a family vacation alternative to Orlando hotels. Your guests are adults: snowbirds, travel nurses, and retirement lifestyle previews. Design your property, your marketing, and your operational systems around adult-only occupancy.",
                    impact: "Eliminates family market segment",
                    highlight: true,
                    sourceRefs: [9, 19]
                },
                {
                    year: 2026,
                    title: "Neighbors as Compliance Officers",
                    summary: "This cannot be overstated: your neighbors will monitor your rental operations. The Villages attracts a specific demographic—permanent retirees who chose this community for its predictability, its quiet evenings, and its freedom from children and transient visitors. When your Airbnb guests arrive in a car full of college students for a golf weekend, when your renters throw a late-night party, when your property becomes a revolving door of strangers with out-of-state plates, your neighbors notice. And they report. The community relies on resident complaints to enforce deed restrictions and age requirements. One complaint triggers a warning. Pattern complaints trigger escalating enforcement. The path to a profitable Villages STR runs directly through your neighbors' goodwill.",
                    impact: "Social enforcement mechanism",
                    sourceRefs: [8, 9]
                }
            ]
        },
        {
            id: "market-segments",
            name: "The Tenant Playbook",
            shortName: "Tenants",
            years: "Seasonal Optimization",
            yearStart: 2026,
            yearEnd: 2026,
            color: "#06b6d4",
            colorAlpha: "rgba(6, 182, 212, 0.2)",
            icon: "trending-up",
            summary: "Understanding your three primary tenant segments—and optimizing your property for each—separates profitable Villages STRs from properties that struggle to cover costs. Each segment has distinct needs, booking patterns, and margin profiles.",
            tagline: "Different guests, different needs, different margins—same property",
            easterEgg: "Pet-friendly policy is the single highest-ROI operational decision",
            stats: [
                { value: "$6K/mo", label: "Peak Snowbird" },
                { value: "$2.6K/mo", label: "Nurse Rate" },
                { value: "13 Weeks", label: "Contract Length" }
            ],
            events: [
                {
                    year: 2026,
                    title: "Snowbirds: The Foundation (Q1)",
                    summary: "Seasonal snowbirds—retirees from the Midwest and Northeast escaping winter—are your highest-margin, most predictable tenant segment. They book 6-12 months in advance, stay 90+ days, and pay $4,500-$6,000 per month for the privilege of swapping Minnesota ice for Florida sunshine. These guests aren't tourists; they're temporary residents. They want everything a permanent resident wants: a golf cart (essential—budget for one), amenity access (you'll need to facilitate Amenity ID transfers at $50 per transaction), pet-friendly policies (a significant majority travel with dogs), and a home that feels like home, not a hotel. A single Q1 snowbird booking at $15,000+ can cover 60-70% of your annual operating costs. This is your foundation.",
                    impact: "Primary revenue driver",
                    highlight: true,
                    sourceRefs: [1, 2, 5, 20]
                },
                {
                    year: 2026,
                    title: "Travel Nurses: The Off-Season Filler (Q2-Q4)",
                    summary: "The Villages is home to two major hospital systems, generating steady demand for travel nurse housing. These medical professionals sign 13-week contracts, need furnished housing near their facility, and will pay $2,000-$2,600 per month—less than snowbirds, but consistent through the off-season months when tourist demand evaporates. Travel nurses have specific needs that differ from snowbirds: blackout curtains (they work night shifts), quiet locations (they sleep during the day), in-unit washer/dryer (mandatory after 12-hour hospital shifts), and reliable WiFi (they chart from home). The key insight: over nine months (April-December), three consecutive 13-week nurse contracts at $2,300/month generate $20,700—more than most STR operators capture chasing nightly Airbnb bookings at 40% occupancy.",
                    impact: "Off-season revenue stability",
                    sourceRefs: [3, 4]
                },
                {
                    year: 2026,
                    title: "Lifestyle Previews: The Premium Fill",
                    summary: "The Villages operates an official Lifestyle Preview Program—potential buyers can rent homes to 'test drive' the community before committing to purchase. These guests pay premium nightly rates ($150-200+), stay 1-4 weeks, and represent an opportunistic fill during shoulder seasons. While you won't build a business model on lifestyle previews alone, they provide valuable gap-filling income between longer-term bookings. Position your property listing to attract these guests: emphasize proximity to amenities, highlight the community's active lifestyle, and make your photos showcase The Villages experience, not just your property. A lifestyle preview guest who falls in love with the community becomes a permanent resident—and your neighbor.",
                    impact: "Opportunistic premium revenue",
                    sourceRefs: [5, 6]
                }
            ]
        },
        {
            id: "financial-architecture",
            name: "The True Cost Equation",
            shortName: "Costs",
            years: "Beyond the Mortgage",
            yearStart: 2026,
            yearEnd: 2026,
            color: "#10b981",
            colorAlpha: "rgba(16, 185, 129, 0.2)",
            icon: "calculator",
            summary: "The Villages' cost structure is deliberately opaque. Your real estate agent won't explain CDD bonds. The MLS listing won't itemize assessment fees. The developer's marketing materials certainly won't highlight the total cost of ownership. Here's the reality check.",
            tagline: "What the listing doesn't tell you—and the spreadsheet must",
            easterEgg: "The $199/month amenity fee is CPI-adjusted annually—budget for increases",
            stats: [
                { value: "1.5%", label: "Target ETR" },
                { value: "$199/mo", label: "Amenity Fee" },
                { value: "$4K/yr", label: "STR Insurance" }
            ],
            events: [
                {
                    year: 2026,
                    title: "The Effective Tax Rate (ETR)",
                    summary: "The Effective Tax Rate is your single number for comparing properties across districts. Calculate it as: (Ad Valorem Tax + Bond Assessment + Maintenance Assessment + Fire Assessment) / Purchase Price. Target ETR below 1.5%. Properties in paid-off bond districts with low maintenance assessments can achieve ETRs below 1.2%. New construction in active bond districts often exceeds 1.8%. This single metric captures more useful information than any MLS listing will provide. When evaluating properties, request the most recent property tax bill—not the assessed value, the actual bill with all line items visible. Sum the non-mortgage costs and calculate your ETR before making an offer.",
                    impact: "Primary comparison metric",
                    highlight: true,
                    sourceRefs: [11, 21]
                },
                {
                    year: 2026,
                    title: "The Amenity Fee Reality",
                    summary: "Every Villages property owner pays a monthly amenity fee—currently $199-$204 per month, CPI-adjusted annually—for access to the community's 'free' amenities: golf courses, recreation centers, pools, pickleball courts, and the ecosystem of activities that makes The Villages attractive to residents. This fee is non-negotiable and increases every year. For STR investors, there's an additional wrinkle: guest amenity access. Your tenants can obtain temporary Amenity IDs through your ownership account, but each transfer costs $50. For a 90-day snowbird, this is trivial. For weekly Airbnb guests, it adds up quickly. Most successful operators either include amenity access in their rental rate (absorbing the transfer fee) or explicitly exclude it (guests access amenities as day visitors for per-use fees).",
                    impact: "Perpetual operating cost",
                    sourceRefs: [12, 13, 23]
                },
                {
                    year: 2026,
                    title: "Insurance: The Hidden Landmine",
                    summary: "Standard homeowners insurance (HO-3 policies) typically excludes short-term rental activity. If a guest is injured in your property and you're operating on a standard HO-3, your claim may be denied. Worse, Florida's state-backed insurer of last resort, Citizens Insurance, explicitly excludes STR operations. You need a dwelling fire policy (DP-3) specifically rated for short-term rental use. These policies cost more—$2,500 to $4,000 annually versus $1,500 for standard coverage—and fewer carriers write them. Budget for this from day one. Add your insurance agent to your due diligence team before closing. A single denied claim can exceed a decade of premium savings.",
                    impact: "Critical risk mitigation",
                    sourceRefs: [24]
                },
                {
                    year: 2026,
                    title: "The No-Homestead Reality",
                    summary: "As an investor, you cannot claim Florida's Homestead Exemption on your Villages property. This means you receive no Save Our Homes cap on annual assessment increases. Your ad valorem taxes are calculated on the full assessed value—which Florida law requires to be reassessed at purchase price. When you buy a property, your tax basis resets to your acquisition cost, even if the previous owner was paying taxes on a much lower homesteaded assessment. This reset can increase annual property taxes by $2,000 or more overnight. Factor this into your pro forma: use the full purchase price at current millage rates, not the seller's historical tax bill.",
                    impact: "Tax basis reset at purchase",
                    sourceRefs: [21]
                }
            ]
        }
    ],

    // Key investment metrics (for dashboard display)
    keyMetrics: [
        {
            id: "scr",
            name: "Snowbird Cover Ratio",
            formula: "(Jan + Feb + Mar Revenue) / Annual Operating Expenses",
            target: "> 0.8",
            description: "Measures how much of annual costs are covered by Q1 winter rentals",
            icon: "snowflake"
        },
        {
            id: "etr",
            name: "Effective Tax Rate",
            formula: "(Ad Valorem + Bond + Maintenance + Fire) / Purchase Price",
            target: "< 1.5%",
            description: "True cost of ownership including all CDD assessments",
            icon: "receipt"
        },
        {
            id: "nyg",
            name: "Nurse Yield Gap",
            formula: "(Nurse Rate × 9mo) - (Long Term Rate × 9mo)",
            target: "> $5,000",
            description: "Premium earned from travel nurse rentals vs standard leases",
            icon: "stethoscope"
        }
    ],

    // Jurisdictional zones with rental legality
    jurisdictions: [
        {
            id: "sumter",
            name: "Sumter County",
            status: "legal",
            color: "#10b981",
            minRental: "None",
            taxRate: "4% TDT",
            notes: "Investor's Safe Harbor - Most permissive stance on STRs",
            recommendation: "PRIMARY TARGET ZONE"
        },
        {
            id: "lake-unincorp",
            name: "Unincorporated Lake County",
            status: "prohibited",
            color: "#ef4444",
            minRental: "30 days",
            taxRate: "N/A",
            notes: "STRs classified as commercial 'resort' use - PROHIBITED in residential zones",
            recommendation: "AVOID - Illegal for Airbnb"
        },
        {
            id: "lady-lake",
            name: "Town of Lady Lake",
            status: "legal",
            color: "#f59e0b",
            minRental: "None",
            taxRate: "Business Tax Required",
            notes: "Exception within Lake County - requires business tax receipt",
            recommendation: "VIABLE with registration"
        },
        {
            id: "marion",
            name: "Marion County",
            status: "legal-complex",
            color: "#f59e0b",
            minRental: "None",
            taxRate: "4% TDT (self-report)",
            notes: "Legal but HIGH compliance load - manual tax reporting required",
            recommendation: "VIABLE but administrative burden"
        }
    ],

    // Market segments (for tenant cards)
    tenantSegments: [
        {
            id: "snowbird",
            name: "Seasonal Snowbirds",
            season: "Q1 (Jan-Mar)",
            demographic: "Retirees 65+ from Midwest/Northeast",
            avgStay: "90 days",
            monthlyRate: "$4,500 - $6,000",
            annualPotential: "$13,500 - $18,000",
            bookingLead: "6-12 months",
            requirements: ["Pet Friendly", "Golf Cart", "Amenity ID Transfer"],
            icon: "sun",
            color: "#f59e0b"
        },
        {
            id: "nurse",
            name: "Travel Nurses",
            season: "Q2-Q4 (Apr-Dec)",
            demographic: "Medical staff on 13-week contracts",
            avgStay: "13 weeks",
            monthlyRate: "$2,000 - $2,600",
            annualPotential: "$18,000 - $23,400 (9 months)",
            bookingLead: "2-4 weeks",
            requirements: ["Blackout Curtains", "Quiet Location", "Washer/Dryer"],
            icon: "heart-pulse",
            color: "#ef4444"
        },
        {
            id: "preview",
            name: "Lifestyle Preview",
            season: "Year-round",
            demographic: "Potential buyers exploring retirement",
            avgStay: "1-4 weeks",
            monthlyRate: "$3,000 - $4,000",
            annualPotential: "Opportunistic",
            bookingLead: "1-3 months",
            requirements: ["Pet Friendly", "Extended Stays", "Neighborhood Variety"],
            icon: "home",
            color: "#06b6d4"
        }
    ],

    // Risk matrix
    riskFactors: [
        {
            id: "zoning-trap",
            name: "Jurisdictional Zoning Trap",
            severity: "critical",
            description: "Purchasing in unincorporated Lake County makes STR operation illegal. There is no variance process—it's a fundamental zoning prohibition.",
            mitigation: "Dashboard filter: REJECT any Lake County parcel outside Lady Lake municipal limits"
        },
        {
            id: "neighbor-enforcement",
            name: "Neighbors as Compliance Officers",
            severity: "high",
            description: "The Villages community relies on resident reporting for deed restriction enforcement. Demographic mismatch between your guests and permanent residents triggers complaints.",
            mitigation: "Restrict primary bookers to 55+, implement clear house rules, maintain property appearance"
        },
        {
            id: "insurance-gap",
            name: "Insurance Coverage Gap",
            severity: "high",
            description: "Standard HO-3 policies exclude STR activity. Citizens Insurance (Florida's insurer of last resort) explicitly excludes short-term rentals.",
            mitigation: "Obtain DP-3 policy specifically rated for short-term rental operations before first guest"
        },
        {
            id: "age-restriction",
            name: "Under 19 Prohibition",
            severity: "medium",
            description: "Visitors under 19 are limited to 30 cumulative days per year per property. This eliminates the 'Orlando family base' investment thesis.",
            mitigation: "Position property as adult-focused—this is a feature, not a bug"
        },
        {
            id: "bond-debt",
            name: "Hidden Bond Debt",
            severity: "medium",
            description: "New construction carries $20,000-$40,000+ in CDD bonds that transfer to buyer. This debt appears as annual assessments, not in purchase price.",
            mitigation: "Request bond amortization schedule, calculate remaining balance, factor into offer price"
        }
    ],

    // Strategic recommendation
    recommendation: {
        summary: "Buy in Sumter County (South of 466A). Target Courtyard Villa with paid or low bond balance. Pet-friendly policy is non-negotiable. Position for adult guests only.",
        calendar: [
            { quarter: "Q1", strategy: "Snowbird (90-day minimum)", revenue: "High ($13-18K)" },
            { quarter: "Q2-Q3", strategy: "Travel Nurses (13-week contracts)", revenue: "Moderate ($10-15K)" },
            { quarter: "Q4", strategy: "Lifestyle Preview / Personal Use", revenue: "Variable" }
        ],
        dashboardPriorities: [
            "Filter heavily on Bond Status",
            "Reject Lake County (except Lady Lake)",
            "Flag properties with Roof Age > 15 years"
        ]
    },

    // Sources from the analysis
    sources: [
        { id: 1, category: "Market Data", title: "AirDNA - The Villages Vacation Rental Data", url: "https://www.airdna.co/vacation-rental-data/app/us/florida/the-villages/overview", trust: 90, description: "Real-time STR market analytics and occupancy rates" },
        { id: 2, category: "Market Data", title: "AirROI - The Villages STR Market Analysis", url: "https://www.airroi.com/report/world/united-states/florida/the-villages", trust: 85, description: "Investment return projections and market benchmarks" },
        { id: 3, category: "Travel Nurse", title: "StayGainesville - Travel Nurse Housing", url: "https://www.staygainesville.com/travel-nurse-housing-in-gainesville-fl-comfort-convenience", trust: 80, description: "Healthcare housing market insights" },
        { id: 4, category: "Travel Nurse", title: "Vivian - Travel Nurse Housing Florida", url: "https://www.vivian.com/community/travel-nursing/how-to-find-the-best-travel-nurse-housing-in-florida/", trust: 85, description: "Nurse housing preferences and contract patterns" },
        { id: 5, category: "Official", title: "Inside the Bubble - Lifestyle Preview", url: "https://www.insidethebubble.net/the-villages-lifestyle-preview-plan/", trust: 85, description: "Detailed preview program analysis" },
        { id: 6, category: "Official", title: "The Villages - Official Lifestyle Preview", url: "https://www.thevillages.com/lifestyle-preview-plan/", trust: 95, description: "Developer's official preview program terms" },
        { id: 7, category: "Regulatory", title: "Lake County - STR Prohibition", url: "https://www.lakecountyil.gov/4816/Short-Term-Rentals-Prohibition", trust: 95, description: "Official county prohibition documentation" },
        { id: 8, category: "Community", title: "Villages Deed Restrictions (YouTube)", url: "https://www.youtube.com/watch?v=koVwmgUyDwM", trust: 75, description: "Community enforcement discussion" },
        { id: 9, category: "Community", title: "Villages News - Age Requirements", url: "https://www.villages-news.com/2025/07/14/age-requirements-should-be-enforced-in-the-villages/", trust: 80, description: "Age enforcement community perspective" },
        { id: 10, category: "Financial", title: "Florida CDD Bonds Guide", url: "https://www.floridaforboomers.com/florida-cdd-bonds/", trust: 85, description: "Comprehensive CDD bond explanation" },
        { id: 11, category: "Financial", title: "Robyn Cavallaro - Bond/CDD/Amenity Fees", url: "https://robyncavallaro.com/from-robyns-desk/bond-cdd-amenity-fee-the-villages-fl", trust: 85, description: "Local realtor's fee breakdown" },
        { id: 12, category: "Financial", title: "The Villages Uncovered - Monthly Fees", url: "https://www.thevillagesuncovered.com/understandingfeesthevillages/", trust: 85, description: "Independent fee analysis" },
        { id: 13, category: "Official", title: "The Villages - Cost of Living", url: "https://www.thevillages.com/cost-of-living/", trust: 95, description: "Developer's official cost breakdown" },
        { id: 14, category: "Regulatory", title: "Lady Lake Rental Rules", url: "https://finchersellsfl.com/blog/rental-rules-in-lady-lake-short-term-vs-long-term", trust: 80, description: "Lady Lake-specific rental regulations" },
        { id: 15, category: "Regulatory", title: "Lodge Compliance - Sumter County", url: "https://www.lodgecompliance.com/local-jurisdiction/sumter-county-fl", trust: 85, description: "Sumter County STR compliance guide" },
        { id: 16, category: "Regulatory", title: "Marion County Tax Collector - STR", url: "https://www.mariontax.com/short-term-rentals", trust: 95, description: "Official Marion County STR tax requirements" },
        { id: 17, category: "Regulatory", title: "FunStay Florida - STR Laws 2025", url: "https://www.funstayflorida.com/blog/floridas-short-term-rental-laws-in-2025/", trust: 85, description: "Statewide STR regulatory overview" },
        { id: 18, category: "Legal", title: "Villages News - 80/20 Rule", url: "https://www.villages-news.com/2024/07/19/floridas-80-20-rule-and-the-villages/", trust: 85, description: "HOPA compliance analysis" },
        { id: 19, category: "Official", title: "The Villages - FAQ", url: "https://www.thevillages.com/faq/", trust: 95, description: "Developer's official FAQ" },
        { id: 20, category: "Pet Policy", title: "BringFido - Pet Friendly Rentals", url: "https://www.bringfido.com/lodging/rentals/city/the_villages_fl_us/", trust: 80, description: "Pet-friendly rental market data" },
        { id: 21, category: "Financial", title: "Ownwell - Sumter County Taxes", url: "https://www.ownwell.com/trends/florida/sumter-county/the-villages", trust: 85, description: "Property tax trend analysis" },
        { id: 22, category: "Official", title: "District Gov - FAQs", url: "https://www.districtgov.org/how-to/faqs/", trust: 90, description: "Official CDD governance information" },
        { id: 23, category: "Financial", title: "Villages News - Renter Amenity Fees", url: "https://www.villages-news.com/2019/04/09/the-real-story-on-renter-amenity-fees/", trust: 85, description: "Amenity fee structure for renters" },
        { id: 24, category: "Insurance", title: "Awning - STR Insurance", url: "https://awning.com/post/short-term-rental-insurance", trust: 85, description: "STR insurance requirements guide" },
        { id: 25, category: "Operations", title: "Mosaic - Property Management Fees", url: "https://mosaicsvc.com/articles/b/how-much-do-property-managers-charge-florida", trust: 80, description: "Property management cost benchmarks" }
    ]
};

// Export for use in experience page
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VILLAGES_INVESTMENT_DATA;
}
