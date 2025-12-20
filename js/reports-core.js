/**
 * GenuVerity Reports - Core JavaScript
 *
 * Auto-initializes on DOMContentLoaded:
 * 1. Lucide icons
 * 2. Reading progress bar
 * 3. Copyable section overlays
 * 4. Sources toggle functionality
 *
 * Include after Lucide and html2canvas:
 * <script src="https://unpkg.com/lucide@latest"></script>
 * <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
 * <script src="js/reports-core.js"></script>  (or ../js/ from localreports)
 */

(function() {
    'use strict';

    // ========================================
    // 1. LUCIDE ICONS
    // ========================================
    function initLucideIcons() {
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    }

    // ========================================
    // 2. READING PROGRESS BAR
    // ========================================
    function initReadingProgress() {
        // Find navbar (supports both .navbar and .nav-header)
        const navbar = document.querySelector('.navbar') || document.querySelector('.nav-header');
        if (!navbar) return;

        // Check if progress bar already exists
        if (navbar.querySelector('.reading-progress')) return;

        // Create and inject progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        navbar.appendChild(progressBar);

        // Update progress on scroll
        function updateProgress() {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) {
                progressBar.style.width = '100%';
                return;
            }
            const scrolled = window.scrollY;
            const progress = Math.min((scrolled / docHeight) * 100, 100);
            progressBar.style.width = progress + '%';
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress(); // Initial call
    }

    // ========================================
    // 3. COPYABLE SECTIONS
    // ========================================
    function initCopyableSections() {
        // Check if html2canvas is available
        if (typeof html2canvas === 'undefined') {
            console.warn('[GenuVerity] html2canvas not found. Copyable sections disabled.');
            return;
        }

        // Find all copyable sections
        const sections = document.querySelectorAll('.copyable-section');

        sections.forEach((section, index) => {
            // Skip if already has overlay
            if (section.querySelector('.copy-overlay')) return;

            // Ensure section has an ID
            const id = section.id || `copyable-section-${index}`;
            section.id = id;

            // Create overlay with copy button
            const overlay = document.createElement('div');
            overlay.className = 'copy-overlay';
            overlay.innerHTML = `
                <button class="copy-btn" data-section="${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                    Copy Image
                </button>
            `;
            section.insertBefore(overlay, section.firstChild);

            // Add click handler
            const btn = overlay.querySelector('.copy-btn');
            btn.addEventListener('click', () => copySectionAsImage(id));
        });
    }

    // Copy section as image
    async function copySectionAsImage(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const button = section.querySelector('.copy-btn');
        if (!button) return;

        const originalText = button.innerHTML;

        // Show loading state
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            Capturing...
        `;
        button.disabled = true;

        try {
            // Hide overlay temporarily
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

            // Clean up
            section.removeChild(watermark);
            if (copyOverlay) copyOverlay.style.display = '';

            // Try to copy to clipboard
            let copied = false;
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

            if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
                try {
                    window.focus();
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);
                    copied = true;
                } catch (e) {
                    console.log('Clipboard write failed:', e);
                }
            }

            // Fallback: download
            if (!copied) {
                const link = document.createElement('a');
                link.download = `genuverity-${sectionId}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                copied = true;
            }

            // Show success
            if (copied) {
                button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Copied!
                `;
                button.classList.add('copied');
            }

            // Reset after 2 seconds
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('copied');
                button.disabled = false;
            }, 2000);

        } catch (error) {
            console.error('Capture failed:', error);
            button.innerHTML = originalText;
            button.disabled = false;
        }
    }

    // ========================================
    // 4. SOURCES TOGGLE
    // ========================================
    function initSourcesToggle() {
        // Global function for onclick handlers
        window.toggleSources = function() {
            const content = document.getElementById('sourcesContent');
            const chevron = document.getElementById('sourcesChevron');

            if (!content) return;

            if (content.classList.contains('expanded')) {
                content.classList.remove('expanded');
                if (chevron) chevron.style.transform = 'rotate(-90deg)';
            } else {
                content.classList.add('expanded');
                if (chevron) chevron.style.transform = 'rotate(0deg)';
            }
        };
    }

    // ========================================
    // 5. CHART.JS WATERMARK PLUGIN
    // ========================================
    function initChartWatermark() {
        if (typeof Chart === 'undefined') return;

        // Check if already registered
        if (Chart.registry.plugins.get('genuVerityWatermark')) return;

        const genuVerityWatermark = {
            id: 'genuVerityWatermark',
            afterDraw: (chart) => {
                const ctx = chart.ctx;
                const { width } = chart;

                ctx.save();

                // Position: top-right corner
                const x = width - 8;
                const y = 16;

                ctx.textAlign = 'right';
                ctx.textBaseline = 'top';
                ctx.font = 'bold 10px Inter, -apple-system, sans-serif';

                // "Genu" in white
                const genuText = 'Genu';
                const verityText = 'Verity';
                const verityWidth = ctx.measureText(verityText).width;

                ctx.fillStyle = '#ffffff';
                ctx.fillText(genuText, x - verityWidth, y);

                // "Verity" in blue
                ctx.fillStyle = '#3b82f6';
                ctx.fillText(verityText, x, y);

                ctx.restore();
            }
        };

        Chart.register(genuVerityWatermark);
    }

    // ========================================
    // SPIN ANIMATION (for loading states)
    // ========================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // INITIALIZE ALL
    // ========================================
    function init() {
        initLucideIcons();
        initReadingProgress();
        initCopyableSections();
        initSourcesToggle();
        initChartWatermark();
    }

    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for manual use
    window.GenuVerityReports = {
        initLucideIcons,
        initReadingProgress,
        initCopyableSections,
        initSourcesToggle,
        initChartWatermark,
        copySectionAsImage
    };

})();
