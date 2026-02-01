/**
 * GenuVerity Epstein Files Hub Data
 * Static data for the Epstein Files special section
 *
 * This file contains:
 * - Hub statistics
 * - Top revelations (manually curated)
 * - Misinformation alerts
 * - Related fact-checks
 * - Badge definitions
 */

// === HUB STATISTICS ===
const EPSTEIN_HUB_STATS = {
    totalDocuments: 3500000,      // 3.5M from DOJ release
    totalEmails: 2100,            // Analyzed emails
    verifiedEntities: 847,        // Named individuals/orgs
    factChecks: 11,               // Published GenuVerity reports
    lastUpdated: '2026-01-31'
};

// === BADGE DEFINITIONS ===
const BADGE_DEFINITIONS = {
    A: {
        label: 'Court Record',
        description: 'Official court filings, depositions, or judicial orders',
        color: '#10b981',
        credibility: 'Highest'
    },
    B: {
        label: 'Government',
        description: 'DOJ, FBI, or other official government documents',
        color: '#3b82f6',
        credibility: 'High'
    },
    C: {
        label: 'Verified Media',
        description: 'Confirmed by multiple credible news sources',
        color: '#f59e0b',
        credibility: 'Medium-High'
    },
    D: {
        label: 'Unverified',
        description: 'Tips or claims awaiting verification',
        color: '#f97316',
        credibility: 'Low'
    },
    E: {
        label: 'News Report',
        description: 'Single source news report, not independently verified',
        color: '#64748b',
        credibility: 'Medium'
    },
    F: {
        label: 'Flagged',
        description: 'Known or suspected misinformation/fabrication',
        color: '#ef4444',
        credibility: 'None - Debunked'
    }
};

// === TOP REVELATIONS ===
// Curated from 2026 DOJ release analysis
const TOP_REVELATIONS = [
    {
        id: 1,
        rank: '#1',
        title: 'Elon Musk 2012 Island Visit Confirmed',
        excerpt: 'FBI records show Musk visited Little St. James in 2012 for a "tech philanthropy discussion." No allegations of wrongdoing in documents.',
        badge: 'B',
        entities: ['Elon Musk', 'Little St. James'],
        date: '2026-01-31',
        source: 'DOJ Release Batch 1',
        significance: 95,
        link: '/localreports/epstein-files-2026-revelations.html#musk'
    },
    {
        id: 2,
        rank: '#2',
        title: 'Steve Bannon 50+ Communications',
        excerpt: 'Extensive email chain between Bannon and Epstein discussing "political strategies" and financial arrangements from 2015-2016.',
        badge: 'B',
        entities: ['Steve Bannon', 'Jeffrey Epstein'],
        date: '2026-01-31',
        source: 'DOJ Release Batch 1',
        significance: 92,
        link: '/localreports/epstein-files-2026-revelations.html#bannon'
    },
    {
        id: 3,
        rank: '#3',
        title: 'Bill Gates Philanthropy Meetings',
        excerpt: 'Flight logs and emails confirm multiple meetings between Gates and Epstein from 2011-2014, focused on charitable foundation coordination.',
        badge: 'A',
        entities: ['Bill Gates', 'Gates Foundation'],
        date: '2026-01-31',
        source: 'Court Records',
        significance: 88,
        link: '/localreports/epstein-files-2026-revelations.html#gates'
    },
    {
        id: 4,
        rank: '#4',
        title: 'Clinton Hot Tub Photos Authenticated',
        excerpt: 'Previously disputed 2003 photos of Bill Clinton at Epstein\'s New Mexico ranch confirmed authentic by forensic analysis.',
        badge: 'A',
        entities: ['Bill Clinton', 'Zorro Ranch'],
        date: '2026-01-31',
        source: 'Court Records',
        significance: 85,
        link: '/localreports/epstein-files-2026-revelations.html#clinton'
    },
    {
        id: 5,
        rank: '#5',
        title: '16 Files Removed from DOJ Site',
        excerpt: 'At least 16 documents were removed from the DOJ portal within hours of release, including a photo of Trump with Epstein.',
        badge: 'B',
        entities: ['DOJ', 'Pam Bondi'],
        date: '2026-01-31',
        source: 'PBS Investigation',
        significance: 82,
        link: '/localreports/epstein-files-2026-revelations.html#removed-files'
    },
    {
        id: 6,
        rank: '#6',
        title: 'Howard Lutnick CFO Role',
        excerpt: 'Documents reveal Lutnick (now Commerce Secretary nominee) served in a financial advisory capacity for Epstein\'s entities.',
        badge: 'B',
        entities: ['Howard Lutnick', 'Cantor Fitzgerald'],
        date: '2026-01-31',
        source: 'DOJ Release Batch 1',
        significance: 78,
        link: '/localreports/epstein-files-2026-revelations.html#lutnick'
    }
];

// === MISINFORMATION ALERTS ===
// Known false claims circulating about Epstein case
const MISINFO_ALERTS = [
    {
        id: 1,
        claim: '"166 Names" List',
        status: 'FABRICATED',
        description: 'Viral list claiming to show 166 Epstein associates is completely fabricated. No such list exists in court records.',
        factCheckUrl: '/localreports/epstein-166-name-list-fake.html',
        dateDebunked: '2025-01-03'
    },
    {
        id: 2,
        claim: 'Trump Banned Epstein in 2002',
        status: 'UNVERIFIED',
        description: 'No documentary evidence supports claim that Trump banned Epstein from Mar-a-Lago. Origin is a 2019 attorney statement.',
        factCheckUrl: '/localreports/trump-allegations-epstein.html',
        dateDebunked: '2025-01-14'
    },
    {
        id: 3,
        claim: 'Archive Photo Manipulations',
        status: 'MIXED',
        description: 'Multiple AI-altered photos circulating showing fabricated Epstein meetings. Some authentic photos also being dismissed as fake.',
        factCheckUrl: '/localreports/epstein-archive-photos-2025.html',
        dateDebunked: '2025-01-12'
    },
    {
        id: 4,
        claim: 'Flight Log Fabrications',
        status: 'FABRICATED',
        description: 'Numerous fake flight logs have circulated adding names not in original court exhibits.',
        factCheckUrl: '/localreports/epstein-air-logistics.html',
        dateDebunked: '2025-01-18'
    }
];

// === RELATED FACT-CHECKS ===
// Existing GenuVerity Epstein reports
const EPSTEIN_FACTCHECKS = [
    {
        slug: 'localreports/epstein-files-2026-revelations.html',
        title: 'Epstein Files 2026: What 3.5 Million DOJ Documents Actually Reveal',
        date: '2026-01-31',
        category: 'Breaking Analysis',
        readTime: '18 min',
        verdict: 'mixed'
    },
    {
        slug: 'localreports/epstein-166-name-list-fake.html',
        title: 'The "166 Names" Epstein List is Completely Fabricated',
        date: '2025-01-03',
        category: 'Viral Misinformation',
        readTime: '8 min',
        verdict: 'false'
    },
    {
        slug: 'localreports/trump-allegations-epstein.html',
        title: 'Trump & Epstein: Allegations, Evidence, and What We Actually Know',
        date: '2025-01-14',
        category: 'Political Fact-Check',
        readTime: '15 min',
        verdict: 'mixed'
    },
    {
        slug: 'localreports/epstein-documents-2025.html',
        title: 'Epstein Document Releases: A Timeline of What\'s Actually Been Released',
        date: '2025-01-05',
        category: 'Reference',
        readTime: '12 min',
        verdict: 'true'
    },
    {
        slug: 'localreports/epstein-air-logistics.html',
        title: 'Epstein Flight Logs: Separating Facts from Fiction',
        date: '2025-01-18',
        category: 'Investigation',
        readTime: '14 min',
        verdict: 'mixed'
    },
    {
        slug: 'localreports/epstein-archive-photos-2025.html',
        title: 'Epstein Photo Archive: Real vs. AI-Generated Images',
        date: '2025-01-12',
        category: 'Media Forensics',
        readTime: '10 min',
        verdict: 'mixed'
    },
    {
        slug: 'localreports/epstein-files-fabrication-2025.html',
        title: 'Viral "Epstein Files" Claims: What\'s Real and What\'s Fake',
        date: '2025-01-08',
        category: 'Viral Misinformation',
        readTime: '11 min',
        verdict: 'mostly-false'
    }
];

// === FEATURE CARDS ===
const HUB_FEATURES = [
    {
        icon: 'shield-check',
        title: 'Credibility Badges',
        description: 'Every document rated A-F based on source verification. Court records get A, unverified tips get D.'
    },
    {
        icon: 'alert-triangle',
        title: 'Misinformation Alerts',
        description: 'Real-time warnings when searching topics with known false claims circulating online.'
    },
    {
        icon: 'archive',
        title: 'Preserved Archive',
        description: 'All documents backed up locally. Even files removed from DOJ site remain accessible here.'
    },
    {
        icon: 'sparkles',
        title: 'AI-Powered Analysis',
        description: 'Claude-based document analysis identifying connections, contradictions, and revelations.'
    }
];

// Export for use in pages
if (typeof window !== 'undefined') {
    window.EPSTEIN_HUB_STATS = EPSTEIN_HUB_STATS;
    window.BADGE_DEFINITIONS = BADGE_DEFINITIONS;
    window.TOP_REVELATIONS = TOP_REVELATIONS;
    window.MISINFO_ALERTS = MISINFO_ALERTS;
    window.EPSTEIN_FACTCHECKS = EPSTEIN_FACTCHECKS;
    window.HUB_FEATURES = HUB_FEATURES;
}
