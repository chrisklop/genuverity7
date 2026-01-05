// Shared experiences data - Single source of truth for Labs page
// When adding a new experience, add it here and it will update everywhere

const EXPERIENCES_DATA = [
    {
        id: 3,
        title: "The Architecture of the California Sound",
        subtitle: "A Comprehensive Historiography of Jan and Dean",
        slug: "jan-and-dean-california-sound.html",
        category: "Special Report",
        tagClass: "tag-amber",
        catClass: "cat-experience",
        icon: "music",
        date: "Jan 2026",
        events: "25+ Events",
        duration: "10-15 min",
        excerpt: "Two guys for every tune. Journey through the rise, tragic crash, and triumphant legacy of the duo who helped architect the California Sound—from Surf City to Dead Man's Curve and beyond.",
        features: ["5 Eras", "Chart Performance", "Easter Eggs", "Full Historiography"],
        preview: {
            type: "line",
            color: "#f59e0b",
            data: [10, 8, 1, 3, 8, 11, 25]
        },
        status: "live"
    },
    {
        id: 2,
        title: "2025: The Year of the Lie",
        subtitle: "100 Debunked Claims That Defined a Year",
        slug: "year-of-lies-2025.html",
        category: "Annual Compendium",
        tagClass: "tag-red",
        catClass: "cat-experience",
        icon: "calendar-x",
        date: "Jan 2026",
        events: "100 Claims",
        duration: "30-60 min",
        excerpt: "PolitiFact called 2025 'The Year of the Lie.' We fact-checked all 100 major misinformation campaigns, deepfakes, and viral hoaxes that defined the year—from AI election interference to health conspiracies.",
        features: ["100 Fact-Checks", "Category Filtering", "Verdict Breakdown", "Source Links"],
        preview: {
            type: "donut",
            color: "#ef4444",
            data: [35, 28, 22, 15]
        },
        status: "live"
    },
    {
        id: 1,
        title: "Disinformation Flow Explorer",
        subtitle: "Trace Narratives from Fringe to Policy",
        slug: "flow-explorer.html",
        category: "Interactive Network",
        tagClass: "tag-red",
        catClass: "cat-experience",
        icon: "git-branch",
        date: "Dec 2025",
        events: "13 Sources",
        duration: "5-15 min",
        excerpt: "Follow how false narratives flow from troll farms and fake news sites through amplifiers to mainstream media and eventually shape real policy. Click any node to see the full GenuVerity report.",
        features: ["5-Stage Flow", "Report Deep-Dives", "Animated Particles", "Connection Tracing"],
        preview: {
            type: "network",
            color: "#ef4444",
            nodeCount: 13
        },
        status: "live"
    },
    {
        id: 0,
        title: "The Architecture of Perception",
        subtitle: "130 Years of Manufactured Reality",
        slug: "timeline.html",
        category: "Immersive Timeline",
        tagClass: "tag-cyan",
        catClass: "cat-experience",
        icon: "network",
        date: "Dec 2025",
        events: "52+ Events",
        duration: "15-30 min",
        excerpt: "Journey through 7 eras of American disinformation—from Yellow Journalism to AI deepfakes. Interactive 3D network visualization reveals how techniques evolve and connect across history.",
        features: ["3D Force Graph", "7 Historical Eras", "Interactive Timeline", "Glossary Overlay"],
        preview: {
            type: "network",
            color: "#3b82f6",
            nodeCount: 18
        },
        status: "live"
    }
];

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EXPERIENCES_DATA;
}
