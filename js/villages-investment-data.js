/**
 * The Villages Investment Analysis Data
 *
 * Strategic Investment Analysis: Short-Term Rental Acquisition
 * & Operational Framework in The Villages, FL
 *
 * "Florida's Friendliest Hometown" - An Investment Intelligence Dossier
 *
 * @version 1.0
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
        totalSections: 10,
        version: "1.0",
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

    // Key investment metrics
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

    // Market segments
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

    // Financial breakdown
    costStructure: {
        adValorem: {
            rate: "1.1% - 1.3%",
            description: "Based on purchase price (no Save Our Homes cap for investors)"
        },
        bondAssessment: {
            range: "$1,500 - $2,500/year",
            description: "Infrastructure debt service - VARIES by district age"
        },
        maintenanceAssessment: {
            range: "$300 - $800/year",
            description: "District common area upkeep - perpetual"
        },
        fireAssessment: {
            fixed: "~$125/year",
            description: "Fire service assessment"
        },
        amenityFee: {
            monthly: "$199 - $204",
            description: "Access to 'free' amenities - CPI adjusted annually"
        },
        insurance: {
            standard: "$1,500/year",
            strRated: "$2,500 - $4,000/year",
            description: "STR requires DP-3 policy, not standard HO-3"
        }
    },

    // Risk matrix
    riskFactors: [
        {
            id: "zoning-trap",
            name: "Jurisdictional Zoning Trap",
            severity: "critical",
            description: "Purchasing in unincorporated Lake County makes STR illegal",
            mitigation: "Dashboard filter: REJECT any Lake County parcel outside Lady Lake"
        },
        {
            id: "neighbor-enforcement",
            name: "Neighbors as Compliance Officers",
            severity: "high",
            description: "Community relies on resident reporting - demographic mismatch triggers complaints",
            mitigation: "Restrict primary bookers to 55+, clear house rules"
        },
        {
            id: "insurance-gap",
            name: "Insurance Volatility",
            severity: "high",
            description: "Citizens Insurance excludes STR activity - claims may be denied",
            mitigation: "Obtain DP-3 policy rated for short-term rentals"
        },
        {
            id: "age-restriction",
            name: "Under 19 Prohibition",
            severity: "medium",
            description: "Visitors under 19 limited to 30 days/year - limits family market",
            mitigation: "Position as adult-focused, not Orlando family base"
        },
        {
            id: "bond-debt",
            name: "Hidden Bond Debt",
            severity: "medium",
            description: "New homes carry $20,000-$40,000+ in CDD bonds assumed by buyer",
            mitigation: "Request bond amortization schedule, factor into offer"
        }
    ],

    // Dashboard logic gates
    logicGates: [
        {
            condition: "County = 'Lake' AND Municipality != 'Lady Lake'",
            action: "REJECT",
            reason: "STR Illegal - 30 day minimum"
        },
        {
            condition: "Roof Age > 15 Years",
            action: "FLAG",
            reason: "Uninsurable or requires immediate CapEx"
        },
        {
            condition: "Bond Balance > $30,000 AND Price > Market Average",
            action: "NEGOTIATE",
            reason: "Overpriced relative to debt load"
        }
    ],

    // Property selection criteria
    propertyFilters: [
        {
            attribute: "Home Type",
            preferred: "Courtyard Villa",
            reason: "Walled yard = Pet friendly = Snowbird premium"
        },
        {
            attribute: "Bond Status",
            preferred: "Paid Off",
            reason: "Lower carrying cost by $1,500-$2,000/year"
        },
        {
            attribute: "Location",
            preferred: "Sumter County (South of 466A)",
            reason: "Legal STR zone, newer homes, active lifestyle"
        },
        {
            attribute: "Roof Age",
            preferred: "< 10 Years",
            reason: "Insurable without immediate CapEx"
        }
    ],

    // Analysis sections (like eras in Jan & Dean)
    sections: [
        {
            id: "executive-summary",
            name: "Executive Intelligence",
            shortName: "Summary",
            icon: "briefcase",
            color: "#10b981",
            summary: "The Villages represents a distinct asset class that behaves differently from standard residential markets due to its master-planned nature and age-restricted governance.",
            keyInsight: "Counter-cyclical hedge against economic volatility due to fixed-income retiree demographic",
            stats: [
                { value: "95%+", label: "Q1 Occupancy" },
                { value: "60-70%", label: "Annual Costs from Winter" },
                { value: "3", label: "Counties Spanned" }
            ]
        },
        {
            id: "regulatory-matrix",
            name: "Regulatory Matrix",
            shortName: "Zoning",
            icon: "scale",
            color: "#ef4444",
            summary: "The community spans three counties with dramatically different STR regulations. Lake County prohibits, Sumter permits, Marion complicates.",
            keyInsight: "SB 280 veto means local bans remain in full force - no state preemption",
            stats: [
                { value: "30 Day", label: "Lake Co. Minimum" },
                { value: "4%", label: "Tourist Tax Rate" },
                { value: "1", label: "Safe County" }
            ]
        },
        {
            id: "cdd-structure",
            name: "CDD Ecosystem",
            shortName: "Districts",
            icon: "building-2",
            color: "#3b82f6",
            summary: "Community Development Districts are special-purpose local governments under Florida Statute 190. Buyers assume infrastructure bond debt.",
            keyInsight: "Older districts (North of 466) often have PAID bonds = lower carrying costs",
            stats: [
                { value: "$20-40K", label: "New Home Bond" },
                { value: "$0", label: "Paid-Off Districts" },
                { value: "190", label: "FL Statute" }
            ]
        },
        {
            id: "age-compliance",
            name: "Age & Behavior Rules",
            shortName: "55+ Rules",
            icon: "users",
            color: "#f59e0b",
            summary: "HOPA 80/20 rule requires 80% of units to have 55+ residents. Under 19 visitors limited to 30 days/year.",
            keyInsight: "Orlando family market is weakest link - distance, age rules, and neighbor intolerance",
            stats: [
                { value: "80%", label: "Required 55+" },
                { value: "30 Days", label: "Under 19 Limit" },
                { value: "19", label: "Age Threshold" }
            ]
        },
        {
            id: "market-segments",
            name: "Demand Drivers",
            shortName: "Tenants",
            icon: "trending-up",
            color: "#06b6d4",
            summary: "Three distinct tenant demographics with seasonal optimization: Snowbirds (Q1), Travel Nurses (Q2-Q4), and Lifestyle Previews (opportunistic).",
            keyInsight: "Pet-friendly policy is the single highest-ROI operational decision",
            stats: [
                { value: "$6K/mo", label: "Peak Snowbird" },
                { value: "$2.6K/mo", label: "Nurse Rate" },
                { value: "13 Weeks", label: "Contract Length" }
            ]
        },
        {
            id: "financial-architecture",
            name: "Cost Architecture",
            shortName: "Costs",
            icon: "calculator",
            color: "#10b981",
            summary: "Total Cost of Ownership is obscured by CDD structure. Ad Valorem + Bond + Maintenance + Fire + Amenity Fee = True Monthly Cost.",
            keyInsight: "Amenity ID transfer costs $50/transaction - tenant typically reimburses",
            stats: [
                { value: "$199/mo", label: "Amenity Fee" },
                { value: "$50", label: "Transfer Fee" },
                { value: "1.5%", label: "Target ETR" }
            ]
        },
        {
            id: "asset-selection",
            name: "Property Criteria",
            shortName: "Buying",
            icon: "home",
            color: "#3b82f6",
            summary: "Not all Villages homes perform equally. Courtyard Villas with paid bonds in Sumter County represent the optimal investment profile.",
            keyInsight: "Coastal Modern aesthetic + WFH setup + mesh WiFi = premium positioning",
            stats: [
                { value: "Courtyard", label: "Best Type" },
                { value: "Sumter", label: "Best County" },
                { value: "< 10yr", label: "Roof Target" }
            ]
        },
        {
            id: "operations",
            name: "Operational Execution",
            shortName: "Ops",
            icon: "settings",
            color: "#f59e0b",
            summary: "Self-management with smart tech (Schlage, Ring, Ecobee) or 10-15% professional management. Guest ID logistics are a friction point.",
            keyInsight: "Gates are 'theatrical security' - red button usually grants access",
            stats: [
                { value: "10-15%", label: "Mgmt Fee" },
                { value: "$50/visit", label: "Homewatch" },
                { value: "1 Car", label: "Parking Limit" }
            ]
        }
    ],

    // Strategic recommendation
    recommendation: {
        summary: "Buy in Sumter County (South of 466A). Focus on Courtyard Villa with paid or low bond. Pet-friendly policy is essential.",
        calendar: [
            { quarter: "Q1", strategy: "Snowbird (3-month minimum)", revenue: "High ($13-18K)" },
            { quarter: "Q2-Q3", strategy: "Travel Nurses (3-month contracts)", revenue: "Moderate ($10-15K)" },
            { quarter: "Q4", strategy: "Personal use / Lifestyle Preview", revenue: "Variable" }
        ],
        dashboardPriorities: [
            "Filter heavily on Bond Status",
            "Reject Lake County (except Lady Lake)",
            "Flag properties with Roof Age > 15 years"
        ]
    },

    // Sources from the analysis
    sources: [
        { id: 1, title: "AirDNA - The Villages Vacation Rental Data", url: "https://www.airdna.co/vacation-rental-data/app/us/florida/the-villages/overview", trust: 90 },
        { id: 2, title: "AirROI - The Villages STR Market Analysis", url: "https://www.airroi.com/report/world/united-states/florida/the-villages", trust: 85 },
        { id: 3, title: "StayGainesville - Travel Nurse Housing", url: "https://www.staygainesville.com/travel-nurse-housing-in-gainesville-fl-comfort-convenience", trust: 80 },
        { id: 4, title: "Vivian - Travel Nurse Housing Florida", url: "https://www.vivian.com/community/travel-nursing/how-to-find-the-best-travel-nurse-housing-in-florida/", trust: 85 },
        { id: 5, title: "Inside the Bubble - Lifestyle Preview", url: "https://www.insidethebubble.net/the-villages-lifestyle-preview-plan/", trust: 85 },
        { id: 6, title: "The Villages - Official Lifestyle Preview", url: "https://www.thevillages.com/lifestyle-preview-plan/", trust: 95 },
        { id: 7, title: "Lake County - STR Prohibition", url: "https://www.lakecountyil.gov/4816/Short-Term-Rentals-Prohibition", trust: 95 },
        { id: 8, title: "Villages Deed Restrictions (YouTube)", url: "https://www.youtube.com/watch?v=koVwmgUyDwM", trust: 75 },
        { id: 9, title: "Villages News - Age Requirements", url: "https://www.villages-news.com/2025/07/14/age-requirements-should-be-enforced-in-the-villages/", trust: 80 },
        { id: 10, title: "Florida CDD Bonds Guide", url: "https://www.floridaforboomers.com/florida-cdd-bonds/", trust: 85 },
        { id: 11, title: "Robyn Cavallaro - Bond/CDD/Amenity Fees", url: "https://robyncavallaro.com/from-robyns-desk/bond-cdd-amenity-fee-the-villages-fl", trust: 85 },
        { id: 12, title: "The Villages Uncovered - Monthly Fees", url: "https://www.thevillagesuncovered.com/understandingfeesthevillages/", trust: 85 },
        { id: 13, title: "The Villages - Cost of Living", url: "https://www.thevillages.com/cost-of-living/", trust: 95 },
        { id: 14, title: "Lady Lake Rental Rules", url: "https://finchersellsfl.com/blog/rental-rules-in-lady-lake-short-term-vs-long-term", trust: 80 },
        { id: 15, title: "Lodge Compliance - Sumter County", url: "https://www.lodgecompliance.com/local-jurisdiction/sumter-county-fl", trust: 85 },
        { id: 16, title: "Marion County Tax Collector - STR", url: "https://www.mariontax.com/short-term-rentals", trust: 95 },
        { id: 17, title: "FunStay Florida - STR Laws 2025", url: "https://www.funstayflorida.com/blog/floridas-short-term-rental-laws-in-2025/", trust: 85 },
        { id: 18, title: "Villages News - 80/20 Rule", url: "https://www.villages-news.com/2024/07/19/floridas-80-20-rule-and-the-villages/", trust: 85 },
        { id: 19, title: "The Villages - FAQ", url: "https://www.thevillages.com/faq/", trust: 95 },
        { id: 20, title: "BringFido - Pet Friendly Rentals", url: "https://www.bringfido.com/lodging/rentals/city/the_villages_fl_us/", trust: 80 },
        { id: 21, title: "Ownwell - Sumter County Taxes", url: "https://www.ownwell.com/trends/florida/sumter-county/the-villages", trust: 85 },
        { id: 22, title: "District Gov - FAQs", url: "https://www.districtgov.org/how-to/faqs/", trust: 90 },
        { id: 23, title: "Villages News - Renter Amenity Fees", url: "https://www.villages-news.com/2019/04/09/the-real-story-on-renter-amenity-fees/", trust: 85 },
        { id: 24, title: "Awning - STR Insurance", url: "https://awning.com/post/short-term-rental-insurance", trust: 85 },
        { id: 25, title: "Mosaic - Property Management Fees", url: "https://mosaicsvc.com/articles/b/how-much-do-property-managers-charge-florida", trust: 80 }
    ]
};

// Export for use in experience page
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VILLAGES_INVESTMENT_DATA;
}
