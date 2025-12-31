/**
 * GenuVerity Content Registry
 *
 * Unified source of truth connecting:
 * - Reports (fact-checks in localreports/)
 * - Experience nodes (timeline events)
 * - Cross-references and relationships
 *
 * This enables the "web of information" architecture where
 * all content is interconnected.
 */

const CONTENT_REGISTRY = {
    // Version for cache-busting
    version: '1.0.0',
    lastUpdated: '2024-12-30',

    /**
     * Topic Tags - Used for auto-linking related content
     * When a report or node has matching tags, they're connected
     */
    tags: {
        // Eras
        'era:yellow-press': { label: 'Yellow Press Era', color: '#ef4444' },
        'era:wwi': { label: 'WWI Propaganda', color: '#f59e0b' },
        'era:cold-war': { label: 'Cold War', color: '#3b82f6' },
        'era:digital': { label: 'Digital Age', color: '#06b6d4' },
        'era:ai': { label: 'AI Era', color: '#10b981' },

        // Actors
        'actor:russia': { label: 'Russian Operations', color: '#ef4444' },
        'actor:china': { label: 'Chinese Operations', color: '#f59e0b' },
        'actor:iran': { label: 'Iranian Operations', color: '#10b981' },
        'actor:domestic': { label: 'Domestic Actors', color: '#3b82f6' },
        'actor:corporate': { label: 'Corporate Actors', color: '#06b6d4' },

        // Techniques
        'technique:astroturf': { label: 'Astroturfing', color: '#8b5cf6' },
        'technique:deepfake': { label: 'Deepfakes', color: '#ec4899' },
        'technique:hack-leak': { label: 'Hack & Leak', color: '#ef4444' },
        'technique:amplification': { label: 'Amplification', color: '#f59e0b' },
        'technique:narrative-laundering': { label: 'Narrative Laundering', color: '#06b6d4' },

        // Platforms
        'platform:facebook': { label: 'Facebook/Meta', color: '#3b82f6' },
        'platform:twitter': { label: 'Twitter/X', color: '#06b6d4' },
        'platform:youtube': { label: 'YouTube', color: '#ef4444' },
        'platform:tiktok': { label: 'TikTok', color: '#000000' },
        'platform:telegram': { label: 'Telegram', color: '#0088cc' },
        'platform:whatsapp': { label: 'WhatsApp', color: '#25d366' },

        // Topics
        'topic:election': { label: 'Election Integrity', color: '#3b82f6' },
        'topic:health': { label: 'Health Misinfo', color: '#10b981' },
        'topic:climate': { label: 'Climate Denial', color: '#06b6d4' },
        'topic:conspiracy': { label: 'Conspiracy Theories', color: '#f59e0b' },
        'topic:foreign-influence': { label: 'Foreign Influence', color: '#ef4444' },

        // Figures
        'figure:bannon': { label: 'Steve Bannon', color: '#ef4444' },
        'figure:jones': { label: 'Alex Jones', color: '#f59e0b' },
        'figure:musk': { label: 'Elon Musk', color: '#3b82f6' },
        'figure:trump': { label: 'Donald Trump', color: '#ef4444' },
        'figure:putin': { label: 'Vladimir Putin', color: '#06b6d4' }
    },

    /**
     * Content Nodes - Every piece of content in the GenuVerity ecosystem
     *
     * Structure:
     * - id: Unique identifier (slug-based)
     * - type: 'report' | 'experience-node' | 'glossary'
     * - title: Display title
     * - tags: Array of tag IDs for auto-linking
     * - url: Path to content (relative to root)
     * - connections: Explicit connections to other content IDs
     * - year: For timeline placement (optional)
     * - era: Era ID for experience nodes
     */
    nodes: {
        // === REPORTS (from localreports/) ===
        // These are auto-generated from reports-data.js but can have additional metadata

        'protocols-elders-zion': {
            id: 'protocols-elders-zion',
            type: 'report',
            title: 'The Protocols of the Elders of Zion: Anatomy of a Fabrication',
            tags: ['era:yellow-press', 'era:wwi', 'era:cold-war', 'era:digital', 'topic:conspiracy', 'technique:narrative-laundering', 'actor:russia'],
            url: '/localreports/protocols-elders-zion.html',
            connections: ['qanon-network-analysis', 'russian-ira-2016', 'yellow-journalism-1898', 'cpi-1917'],
            year: 1903,
            era: 'yellow-press'
        },

        'qanon-network-analysis': {
            id: 'qanon-network-analysis',
            type: 'report',
            title: 'QAnon Network Analysis',
            tags: ['topic:conspiracy', 'platform:facebook', 'platform:twitter', 'era:digital'],
            url: '/localreports/qanon-network-analysis.html',
            connections: ['internet-research-agency', 'january-6-disinfo', 'protocols-elders-zion'],
            year: 2017
        },

        'russian-ira-2016': {
            id: 'russian-ira-2016',
            type: 'report',
            title: 'Russian IRA: 2016 Election Interference',
            tags: ['actor:russia', 'topic:election', 'topic:foreign-influence', 'era:digital'],
            url: '/localreports/russian-ira-2016.html',
            connections: ['gru-hack-leak', 'facebook-myanmar', 'protocols-elders-zion'],
            year: 2016
        },

        // === EXPERIENCE NODES (from timeline-data.js) ===
        // These map to events in the immersive experience

        'yellow-journalism-1898': {
            id: 'yellow-journalism-1898',
            type: 'experience-node',
            title: 'Yellow Journalism & Spanish-American War',
            tags: ['era:yellow-press', 'technique:amplification'],
            url: '/timeline.html#yellow-journalism',
            connections: ['cpi-1917', 'propaganda-techniques', 'protocols-elders-zion'],
            year: 1898,
            era: 'yellow-press'
        },

        'cpi-1917': {
            id: 'cpi-1917',
            type: 'experience-node',
            title: 'Committee on Public Information',
            tags: ['era:wwi', 'actor:domestic', 'technique:amplification'],
            url: '/timeline.html#cpi',
            connections: ['yellow-journalism-1898', 'nazi-propaganda', 'protocols-elders-zion'],
            year: 1917,
            era: 'wwi'
        },

        'internet-research-agency': {
            id: 'internet-research-agency',
            type: 'experience-node',
            title: 'Internet Research Agency',
            tags: ['actor:russia', 'topic:foreign-influence', 'era:digital', 'platform:facebook', 'platform:twitter'],
            url: '/timeline.html#ira',
            connections: ['russian-ira-2016', 'gru-hack-leak', 'facebook-2016'],
            year: 2013,
            era: 'digital'
        }

        // More nodes are dynamically merged from reports-data.js and timeline-data.js
    },

    /**
     * Connection Types - How content relates to each other
     */
    connectionTypes: {
        'technique': {
            label: 'Technique Transfer',
            color: '#06b6d4',
            description: 'One event\'s tactics inspired or were adopted by another'
        },
        'personnel': {
            label: 'Personnel Movement',
            color: '#f59e0b',
            description: 'Key figures moved between organizations/operations'
        },
        'exposure': {
            label: 'Exposure/Revelation',
            color: '#ef4444',
            description: 'One event exposed or revealed another'
        },
        'reaction': {
            label: 'Reaction/Backlash',
            color: '#10b981',
            description: 'One event was a direct response to another'
        },
        'legal': {
            label: 'Legal Enablement',
            color: '#3b82f6',
            description: 'Legal/regulatory connection'
        },
        'evolution': {
            label: 'Evolution',
            color: '#8b5cf6',
            description: 'Concept or technique evolved into another'
        },
        'related': {
            label: 'Related Topic',
            color: '#64748b',
            description: 'Topically related content'
        }
    }
};

/**
 * Helper Functions
 */

// Get all content with a specific tag
function getContentByTag(tagId) {
    return Object.values(CONTENT_REGISTRY.nodes)
        .filter(node => node.tags && node.tags.includes(tagId));
}

// Get all connections for a piece of content
function getConnections(contentId) {
    const node = CONTENT_REGISTRY.nodes[contentId];
    if (!node || !node.connections) return [];

    return node.connections
        .map(connId => CONTENT_REGISTRY.nodes[connId])
        .filter(Boolean);
}

// Find related content by shared tags
function getRelatedContent(contentId, limit = 5) {
    const node = CONTENT_REGISTRY.nodes[contentId];
    if (!node || !node.tags) return [];

    const scored = Object.values(CONTENT_REGISTRY.nodes)
        .filter(n => n.id !== contentId)
        .map(n => ({
            node: n,
            score: n.tags ? n.tags.filter(t => node.tags.includes(t)).length : 0
        }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

    return scored.map(item => item.node);
}

// Get all content for network graph visualization
function getNetworkGraphData() {
    const nodes = Object.values(CONTENT_REGISTRY.nodes).map(node => ({
        id: node.id,
        name: node.title,
        type: node.type,
        year: node.year,
        era: node.era,
        tags: node.tags,
        url: node.url,
        color: node.era ? CONTENT_REGISTRY.tags[`era:${node.era}`]?.color : '#3b82f6'
    }));

    const links = [];
    Object.values(CONTENT_REGISTRY.nodes).forEach(node => {
        if (node.connections) {
            node.connections.forEach(targetId => {
                if (CONTENT_REGISTRY.nodes[targetId]) {
                    links.push({
                        source: node.id,
                        target: targetId,
                        type: 'related'
                    });
                }
            });
        }
    });

    return { nodes, links };
}

// Generate "Related Articles" HTML for a report
function generateRelatedArticlesHTML(contentId) {
    const related = getRelatedContent(contentId, 4);
    if (related.length === 0) return '';

    return `
        <div class="related-articles">
            <h3>Related Content</h3>
            <div class="related-grid">
                ${related.map(node => `
                    <a href="${node.url}" class="related-card">
                        <span class="related-type ${node.type}">${node.type === 'report' ? '📄' : '🗺️'}</span>
                        <span class="related-title">${node.title}</span>
                        ${node.year ? `<span class="related-year">${node.year}</span>` : ''}
                    </a>
                `).join('')}
            </div>
        </div>
    `;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONTENT_REGISTRY,
        getContentByTag,
        getConnections,
        getRelatedContent,
        getNetworkGraphData,
        generateRelatedArticlesHTML
    };
}
