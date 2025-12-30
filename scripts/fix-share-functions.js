/**
 * Fix missing share functions in reports
 * Adds the JavaScript functions after highlightSource function
 */

const fs = require('fs');
const path = require('path');

const REPORTS_DIR = path.join(__dirname, '../localreports');

const SHARE_FUNCTIONS = `

        // Social Sharing Functions
        function shareToTwitter() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(document.title);
            window.open('https://twitter.com/intent/tweet?url=' + url + '&text=' + text, '_blank', 'width=600,height=400');
        }

        function shareToFacebook() {
            const url = encodeURIComponent(window.location.href);
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank', 'width=600,height=400');
        }

        function shareToLinkedIn() {
            const url = encodeURIComponent(window.location.href);
            window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + url, '_blank', 'width=600,height=600');
        }

        function copyShareLink() {
            navigator.clipboard.writeText(window.location.href).then(function() {
                var btn = document.getElementById('copyLinkBtn');
                var originalHTML = btn.innerHTML;
                btn.innerHTML = '<i data-lucide="check"></i> Copied!';
                btn.classList.add('copied');
                if (typeof lucide !== 'undefined') lucide.createIcons();
                setTimeout(function() {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('copied');
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }, 2000);
            });
        }
`;

function fixReport(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if functions already exist
    if (content.includes('function shareToTwitter')) {
        return false;
    }

    // Skip if no share buttons
    if (!content.includes('shareToTwitter()')) {
        return false;
    }

    // Find the end of highlightSource function and insert after it
    // Pattern: closing brace of highlightSource, then newline(s), then either comment or new Chart
    const pattern = /(function highlightSource[\s\S]*?element\.classList\.add\('highlight'\);\s*\}\s*\})/;

    if (pattern.test(content)) {
        content = content.replace(pattern, '$1' + SHARE_FUNCTIONS);
        fs.writeFileSync(filePath, content);
        return true;
    }

    // Fallback: insert before </script>
    if (content.includes('</script>')) {
        content = content.replace('</script>', SHARE_FUNCTIONS + '\n    </script>');
        fs.writeFileSync(filePath, content);
        return true;
    }

    return false;
}

function main() {
    console.log('🔧 Fixing missing share functions...\n');

    const files = fs.readdirSync(REPORTS_DIR)
        .filter(f => f.endsWith('.html'))
        .map(f => path.join(REPORTS_DIR, f));

    let fixed = 0;
    let skipped = 0;

    for (const file of files) {
        const fileName = path.basename(file);
        if (fixReport(file)) {
            console.log(`✅ Fixed: ${fileName}`);
            fixed++;
        } else {
            skipped++;
        }
    }

    console.log(`\n📊 Summary: Fixed ${fixed}, Skipped ${skipped}`);
}

main();
