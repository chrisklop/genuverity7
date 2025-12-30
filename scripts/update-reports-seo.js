/**
 * GenuVerity Report SEO Updater
 * Updates existing reports with:
 * - Fixed OG/Twitter image URLs (pointing to thumbnails)
 * - Social sharing buttons
 * - Share functions JavaScript
 */

const fs = require('fs');
const path = require('path');

const REPORTS_DIR = path.join(__dirname, '../localreports');

// Patterns to find and replace
const REPLACEMENTS = [
    // Fix OG image to use thumbnails
    {
        find: /content="https:\/\/www\.genuverity\.com\/images\/share-card-([^"]+)\.jpg"/g,
        replace: (match, slug) => `content="https://www.genuverity.com/images/thumbnails/${slug}.webp"`
    },
    // Alternative: Fix any og:image that doesn't use thumbnails
    {
        find: /<meta property="og:image" content="(?!https:\/\/www\.genuverity\.com\/images\/thumbnails)([^"]+)">/g,
        replace: (match, url) => {
            // Extract slug from URL if possible
            const slugMatch = url.match(/([a-z0-9-]+)\.(jpg|png|webp)/i);
            if (slugMatch) {
                return `<meta property="og:image" content="https://www.genuverity.com/images/thumbnails/${slugMatch[1]}.webp">`;
            }
            return match; // Keep original if can't parse
        }
    },
    // Fix Twitter image similarly
    {
        find: /<meta property="twitter:image" content="(?!https:\/\/www\.genuverity\.com\/images\/thumbnails)([^"]+)">/g,
        replace: (match, url) => {
            const slugMatch = url.match(/([a-z0-9-]+)\.(jpg|png|webp)/i);
            if (slugMatch) {
                return `<meta property="twitter:image" content="https://www.genuverity.com/images/thumbnails/${slugMatch[1]}.webp">`;
            }
            return match;
        }
    }
];

// Social sharing HTML to add
const SHARE_HTML = `
                <!-- Social Sharing Buttons -->
                <div class="share-section">
                    <h4 class="share-heading">Share this report</h4>
                    <div class="share-buttons">
                        <button onclick="shareToTwitter()" class="share-btn share-twitter">
                            <i data-lucide="twitter"></i> Share on X
                        </button>
                        <button onclick="shareToLinkedIn()" class="share-btn share-linkedin">
                            <i data-lucide="linkedin"></i> LinkedIn
                        </button>
                        <button onclick="copyShareLink()" class="share-btn share-copy" id="copyLinkBtn">
                            <i data-lucide="link"></i> Copy Link
                        </button>
                    </div>
                </div>
`;

// JavaScript to add for sharing
const SHARE_JS = `
        // Social Sharing Functions
        function shareToTwitter() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(document.title);
            window.open(\`https://twitter.com/intent/tweet?url=\${url}&text=\${text}\`, '_blank', 'width=600,height=400');
        }

        function shareToLinkedIn() {
            const url = encodeURIComponent(window.location.href);
            window.open(\`https://www.linkedin.com/sharing/share-offsite/?url=\${url}\`, '_blank', 'width=600,height=600');
        }

        function copyShareLink() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                const btn = document.getElementById('copyLinkBtn');
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i data-lucide="check"></i> Copied!';
                btn.classList.add('copied');
                lucide.createIcons({ nodes: [btn] });
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('copied');
                    lucide.createIcons({ nodes: [btn] });
                }, 2000);
            });
        }
`;

function updateReport(filePath) {
    const fileName = path.basename(filePath);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Apply URL replacements
    for (const { find, replace } of REPLACEMENTS) {
        const newContent = content.replace(find, replace);
        if (newContent !== content) {
            content = newContent;
            modified = true;
        }
    }

    // Add share buttons if not present
    if (!content.includes('share-section')) {
        // Try to insert before </article>
        if (content.includes('</article>')) {
            content = content.replace('</article>', SHARE_HTML + '\n            </article>');
            modified = true;
        }
    }

    // Add share JS if not present
    if (!content.includes('shareToTwitter')) {
        // Try to insert before closing </script> after highlightSource or before chart configs
        const insertPoints = [
            /(function highlightSource[^}]+})\s*(\n)/,
            /(<script>[\s\S]*?)(\/\/ (?:CHART|Initialize))/
        ];

        for (const pattern of insertPoints) {
            if (pattern.test(content)) {
                content = content.replace(pattern, `$1${SHARE_JS}\n\n        $2`);
                modified = true;
                break;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
        return true;
    }
    return false;
}

function main() {
    console.log('🔄 GenuVerity Report SEO Updater\n');

    const files = fs.readdirSync(REPORTS_DIR)
        .filter(f => f.endsWith('.html'))
        .map(f => path.join(REPORTS_DIR, f));

    console.log(`📋 Found ${files.length} reports to process.\n`);

    let updated = 0;
    let skipped = 0;

    for (const file of files) {
        const fileName = path.basename(file);
        try {
            if (updateReport(file)) {
                console.log(`✅ Updated: ${fileName}`);
                updated++;
            } else {
                skipped++;
            }
        } catch (e) {
            console.error(`❌ Failed: ${fileName} - ${e.message}`);
        }
    }

    console.log('\n📊 Summary:');
    console.log(`   ✅ Updated: ${updated}`);
    console.log(`   ⏭️  Already up-to-date: ${skipped}`);
    console.log('\n🎉 Done!');
}

main();
