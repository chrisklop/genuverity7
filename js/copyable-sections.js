// GenuVerity Copyable Sections Feature
// Include html2canvas before this script

(function () {
    'use strict';

    // CSS for copyable sections (injected dynamically)
    const copyableStyles = `
        .copyable-section {
            position: relative;
            transition: all 0.3s ease;
        }
        .copyable-section:hover {
            outline: 2px solid rgba(6, 182, 212, 0.5);
            outline-offset: 8px;
            border-radius: 12px;
        }
        .copy-overlay {
            position: absolute;
            top: 8px;
            right: 8px;
            opacity: 0;
            transition: opacity 0.2s ease;
            z-index: 100;
        }
        .copyable-section:hover > .copy-overlay {
            opacity: 1;
        }
        .copy-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 12px;
            background: rgba(10, 15, 26, 0.95);
            border: 1px solid #06b6d4;
            border-radius: 8px;
            color: #06b6d4;
            font-size: 0.75rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: 'JetBrains Mono', monospace;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .copy-btn:hover {
            background: #06b6d4;
            color: #050A14;
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
        }
        .copy-btn.copied {
            background: #10b981;
            border-color: #10b981;
            color: white;
        }
        .copy-btn svg {
            width: 14px;
            height: 14px;
        }
        .capture-watermark {
            position: absolute;
            bottom: 16px;
            right: 16px;
            padding: 8px 16px;
            background: rgba(10, 15, 26, 0.9);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 8px;
            font-size: 12px;
            font-weight: 700;
            z-index: 1000;
        }
        .capture-watermark .genu { color: #ffffff; }
        .capture-watermark .verity { color: #3b82f6; }
    `;

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = copyableStyles;
    document.head.appendChild(styleSheet);

    // Copy section as image function
    window.copySectionAsImage = async function (sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) {
            console.error('[Copy] Section not found:', sectionId);
            return;
        }

        const button = section.querySelector('.copy-btn');
        if (!button) return;

        const originalText = button.innerHTML;
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Capturing...';
        button.disabled = true;

        try {
            // Hide overlay during capture
            const copyOverlay = section.querySelector('.copy-overlay');
            if (copyOverlay) copyOverlay.style.display = 'none';

            // Add watermark
            const watermark = document.createElement('div');
            watermark.className = 'capture-watermark';
            watermark.innerHTML = '<span class="genu">Genu</span><span class="verity">Verity</span>';
            section.appendChild(watermark);

            // Capture
            const canvas = await html2canvas(section, {
                backgroundColor: '#050A14',
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true
            });

            section.removeChild(watermark);
            if (copyOverlay) copyOverlay.style.display = '';

            // Try clipboard
            let copied = false;
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

            if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
                try {
                    window.focus();
                    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                    copied = true;
                } catch (e) {
                    console.log('[Copy] Clipboard failed:', e.message);
                }
            }

            if (copied) {
                button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
                button.classList.add('copied');
            } else {
                // Fallback: download
                const link = document.createElement('a');
                link.download = 'genuverity-' + sectionId + '.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
                button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Downloaded!';
                button.classList.add('copied');
            }

            setTimeout(function () {
                button.innerHTML = originalText;
                button.classList.remove('copied');
                button.disabled = false;
            }, 2000);

        } catch (error) {
            console.error('[Copy] Capture failed:', error);
            button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Error';
            setTimeout(function () {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        }
    };

    // Auto-initialize all sections with specific classes
    function initCopyableSections() {
        var selectors = [
            '.content-section',
            '.executive-summary',
            '.insight-card',
            '.float-figure',
            '.live-data-panel',
            '.copyable-section' // Add this to handle manual class additions too
        ];

        var index = 0;
        var processedElements = new Set();

        selectors.forEach(function (selector) {
            document.querySelectorAll(selector).forEach(function (section) {
                // Skip if already processed in this loop or already has a button
                if (processedElements.has(section) || section.querySelector('.copy-btn')) return;

                // Mark as processed
                processedElements.add(section);

                section.classList.add('copyable-section');
                var id = section.id || ('copyable-' + index++);
                section.id = id;

                var overlay = document.createElement('div');
                overlay.className = 'copy-overlay';
                overlay.innerHTML = '<button class="copy-btn" onclick="copySectionAsImage(\'' + id + '\')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Copy Image</button>';
                section.insertBefore(overlay, section.firstChild);
            });
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCopyableSections);
    } else {
        initCopyableSections();
    }

    // Add spin animation
    var spinAnimation = document.createElement('style');
    spinAnimation.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
    document.head.appendChild(spinAnimation);
})();
