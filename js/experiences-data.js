// Shared experiences data - Single source of truth for Labs page
// When adding a new experience, add it here and it will update everywhere

const EXPERIENCES_DATA = [
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
    },
    {
        id: 1,
        title: "The Protocols: Anatomy of a Fabrication",
        subtitle: "History's Most Destructive Forgery",
        slug: "localreports/protocols-elders-zion.html",
        category: "Deep Dive Report",
        tagClass: "tag-red",
        catClass: "cat-report",
        icon: "book-x",
        date: "Dec 2025",
        events: "8 Key Moments",
        duration: "35 min read",
        excerpt: "From Tsarist Russia to TikTok—trace how a plagiarized 1903 forgery became infrastructure for genocide and continues to fuel antisemitism today.",
        features: ["Timeline Charts", "Plagiarism Evidence", "Modern Spread Analysis"],
        preview: {
            type: "timeline",
            color: "#ef4444",
            data: [5, 15, 35, 65, 80, 95, 85, 75]
        },
        status: "live"
    }
];

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EXPERIENCES_DATA;
}
