// GenuVerity Unified Copy System
// Replaces cluttered buttons with a sleek, context-aware dropdown
// Dependencies: html2canvas, Lucide Icons

(function () {
    'use strict';

    // 1. DYNAMIC STYLES
    const styles = `
        .copy-wrapper {
            position: absolute;
            top: 12px;
            right: 12px;
            z-index: 50;
            opacity: 0;
            transition: opacity 0.2s ease;
        }

        /* Show on hover of parent section */
        .copyable-section:hover > .copy-wrapper,
        .copy-wrapper.active {
            opacity: 1;
        }

        /* Trigger Button (The Icon) */
        .copy-trigger {
            width: 32px;
            height: 32px;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: #94a3b8;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .copy-trigger:hover, .copy-wrapper.active .copy-trigger {
            background: rgba(59, 130, 246, 0.15);
            border-color: #3b82f6;
            color: white;
            transform: translateY(-1px);
        }

        .copy-trigger svg {
            width: 16px;
            height: 16px;
        }

        /* Dropdown Menu */
        .copy-menu {
            position: absolute;
            top: 100%;
            right: 0;
            margin-top: 6px;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            width: 140px;
            padding: 4px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
            
            /* Animation States */
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
            pointer-events: none;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            transform-origin: top right;
        }

        .copy-wrapper.active .copy-menu {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: all;
        }

        /* Menu Items */
        .copy-item {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            padding: 8px 10px;
            border: none;
            background: transparent;
            color: #cbd5e1;
            font-size: 0.8rem;
            font-family: inherit;
            text-align: left;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.15s;
        }

        .copy-item:hover {
            background: rgba(59, 130, 246, 0.15);
            color: white;
        }

        .copy-item svg {
            width: 14px;
            height: 14px;
            opacity: 0.7;
        }
        
        .copy-item:hover svg {
            opacity: 1;
            color: #3b82f6;
        }

        /* Success State */
        .copy-trigger.success {
            background: rgba(16, 185, 129, 0.2);
            border-color: #10b981;
            color: #10b981;
        }

        /* Capture Watermark (Hidden mostly) */
        .capture-watermark {
            position: absolute;
            bottom: 16px;
            right: 16px;
            padding: 6px 12px;
            background: #050A14;
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            z-index: 9999;
            pointer-events: none;
            display: flex;
            gap: 2px;
        }
        .capture-watermark .genu { color: white; }
        .capture-watermark .verity { color: #3b82f6; }
    `;

    // Inject Styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);


    // 2. CORE LOGIC

    // --> Copy Text
    async function copyText(element, btn) {
        // Close menu immediately
        const wrapper = btn.closest('.copy-wrapper');
        if (wrapper) wrapper.classList.remove('active');

        try {
            // Get clean text (remove copy UI if captured by mistake, though selectors should avoid it)
            const clone = element.cloneNode(true);
            const ui = clone.querySelector('.copy-wrapper');
            if (ui) ui.remove();

            const text = clone.innerText.trim();
            await navigator.clipboard.writeText(text);
            showSuccess(wrapper ? wrapper.querySelector('.copy-trigger') : btn);
        } catch (err) {
            console.error('Copy Text Failed', err);
        }
    }

    // --> Copy Image (Canvas)
    async function copyImage(element, btn) {
        // Close menu immediately
        const parentWrapper = btn.closest('.copy-wrapper');
        if (parentWrapper) parentWrapper.classList.remove('active');

        const originalIcon = btn.innerHTML;
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-2 animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;

        try {
            // 1. Prepare DOM
            const wrapper = element.querySelector('.copy-wrapper');
            if (wrapper) wrapper.style.display = 'none'; // Hide UI for capture

            // Add temp watermark
            const watermark = document.createElement('div');
            watermark.className = 'capture-watermark';
            watermark.innerHTML = '<span class="genu">Genu</span><span class="verity">Verity</span>';
            element.appendChild(watermark);

            // 2. Render
            const canvas = await html2canvas(element, {
                backgroundColor: '#050A14', // Theme Deep BG
                scale: 2, // Retina quality
                logging: false,
                useCORS: true,
                allowTaint: true
            });

            // 3. Cleanup DOM
            watermark.remove();
            if (wrapper) wrapper.style.display = '';
            btn.innerHTML = originalIcon;

            // 4. Output
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

            // Try Clipboard
            if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
                await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                showSuccess(parentWrapper ? parentWrapper.querySelector('.copy-trigger') : btn);
            } else {
                // Fallback Download
                const link = document.createElement('a');
                link.download = `genuverity-${new Date().getTime()}.png`;
                link.href = canvas.toDataURL();
                link.click();
                showSuccess(parentWrapper ? parentWrapper.querySelector('.copy-trigger') : btn);
            }

        } catch (err) {
            console.error('Capture Failed', err);
            btn.innerHTML = originalIcon;
        }
    }

    // --> UI Helper: Success Flash
    function showSuccess(triggerBtn) {
        if (!triggerBtn) return;
        const original = triggerBtn.innerHTML;
        triggerBtn.classList.add('success');
        triggerBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>`;

        setTimeout(() => {
            triggerBtn.classList.remove('success');
            triggerBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
        }, 1500);
    }

    // 3. INITIALIZATION LOOP
    function init() {
        const selectors = [
            'section:not(.nav-header):not(.footer-container)',
            'article',
            '.info-box',
            '.chart-wrapper',
            '.float-figure',
            '.content-section',
            '.copyable-section'
        ];

        // Unique set of elements
        const elements = new Set();
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => elements.add(el));
        });

        elements.forEach(el => {
            // Avoid double init
            if (el.querySelector('.copy-wrapper')) return;
            if (el.tagName === 'NAV' || el.classList.contains('no-copy')) return;

            el.classList.add('copyable-section'); // For hover effect
            if (!el.style.position) el.style.position = 'relative';

            // Build UI
            const wrapper = document.createElement('div');
            wrapper.className = 'copy-wrapper';

            // Buttons
            let menuItems = '';

            // 1. Copy Image (Always available mainly)
            menuItems += `
                <button class="copy-item" data-action="image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    Copy Image
                </button>
            `;

            // 2. Copy Text (If substantial text exists)
            if (el.innerText.length > 20) {
                menuItems += `
                <button class="copy-item" data-action="text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                    Copy Text
                </button>
            `;
            }

            wrapper.innerHTML = `
                <button class="copy-trigger" title="Copy Options">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                </button>
                <div class="copy-menu">
                    ${menuItems}
                </div>
            `;

            // Event Handlers
            const trigger = wrapper.querySelector('.copy-trigger');
            const menu = wrapper.querySelector('.copy-menu');

            // Toggle Menu
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close others
                document.querySelectorAll('.copy-wrapper.active').forEach(w => {
                    if (w !== wrapper) w.classList.remove('active');
                });
                wrapper.classList.toggle('active');
            });

            // Menu Options
            menu.querySelectorAll('.copy-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const action = btn.dataset.action;
                    if (action === 'image') copyImage(el, btn);
                    if (action === 'text') copyText(el, trigger);
                });
            });

            el.appendChild(wrapper);
        });

        // Close on outside click
        document.addEventListener('click', () => {
            document.querySelectorAll('.copy-wrapper.active').forEach(w => w.classList.remove('active'));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
