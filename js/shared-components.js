/**
 * GenuVerity Shared Components
 * Centralized Navigation and Footer logic
 */

const SHARED_NAV_HTML = `
    <nav class="navbar">
        <a href="/" class="navbar-logo">
            <div class="navbar-logo-wrapper">
                <div class="ss-nav"></div>
                <span class="g-icon-nav">G</span>
            </div>
        </a>

        <!-- Navbar Search (Persistent and Synced) -->
        <div class="navbar-center" id="navSearchContainer">
            <div class="navbar-search-container">
                <i data-lucide="search" style="width:16px; color:var(--accent-cyan);"></i>
                <input type="text" class="navbar-search-input" placeholder="Search Intelligence..." id="navSearchInput">
                <!-- Dropdown for autocomplete -->
                <div class="nexus-dropdown" id="navSearchDropdown"></div>
            </div>
        </div>

        <div class="navbar-right" id="shared-nav-right">
            <!-- Populated by JS -->
        </div>

        <button class="navbar-hamburger" onclick="window.toggleMobileMenu()">
            <i data-lucide="menu" id="hamburger-icon"></i>
        </button>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-header">
            <div class="navbar-logo">
                <div class="navbar-logo-wrapper">
                    <div class="ss-nav"></div>
                    <div class="g-icon-nav">G</div>
                </div>
                <!-- Text removed per user request -->
            </div>
            <button class="menu-close" onclick="window.toggleMobileMenu()">
                <i data-lucide="x"></i>
            </button>
        </div>
        <div class="mobile-menu-links" id="mobileMenuLinks">
            <!-- Populated by JS -->
        </div>
    </div>

    <!-- Search Overlay -->
    <div class="search-overlay" id="searchOverlay">
        <div class="search-container">
            <div class="search-input-wrapper">
                <i data-lucide="search" style="width:24px;height:24px;"></i>
                <input type="text" id="searchInput" class="search-input-large"
                    placeholder="Search investigative reports..." autocomplete="off">
            </div>
            <div id="searchResults"></div>
        </div>
    </div>
`;

const SHARED_FOOTER_HTML = `
    <footer class="footer" style="margin-top:80px; padding:60px 0; text-align:center; border-top:1px solid var(--border-color); background:rgba(5,10,20,0.8); position:relative; z-index:10;">
        <div class="footer-logo-wrapper">
            <div class="ss-footer"></div>
            <span class="logo-genu" style="font-size:1.5rem; font-weight:700; color:#fff;">Genu</span><span class="logo-verity" style="font-size:1.5rem; font-weight:700; color:var(--accent-blue);">Verity</span>
        </div>
        <p style="color:var(--text-secondary); margin-bottom:24px;">AI-Powered Investigative Journalism</p>
        <div class="footer-links" style="display:flex; justify-content:center; gap:32px; flex-wrap:wrap;">
            <a href="mailto:hello@genuverity.com" style="color:var(--text-muted); text-decoration:none; transition:color 0.2s;">Contact</a>
            <a href="/" style="color:var(--text-muted); text-decoration:none; transition:color 0.2s;">Home</a>
            <a href="/methodology.html" style="color:var(--text-muted); text-decoration:none; transition:color 0.2s;">Methodology</a>
            <a href="/limitations.html" style="color:var(--text-muted); text-decoration:none; transition:color 0.2s;">Limitations</a>
            <a href="/reports.html" style="color:var(--text-muted); text-decoration:none; transition:color 0.2s;">Reports</a>
        </div>
        <p style="margin-top:40px; color:var(--text-muted); font-size:0.8rem; font-family:var(--font-mono);">
            &copy; 2025 GenuVerity. All Verification Traced to Primary Sources.
        </p>
    </footer>
`;

/**
 * Initialize search autocomplete functionality
 * Separated to handle async REPORTS_DATA loading
 */
function initializeSearchAutocomplete() {
    const navSearchInput = document.getElementById('navSearchInput');
    const navSearchDropdown = document.getElementById('navSearchDropdown');

    if (!navSearchInput || !navSearchDropdown) {
        console.warn('[GV Search] Search elements not found');
        return;
    }

    // Get reports data
    const reports = typeof REPORTS_DATA !== 'undefined' ? REPORTS_DATA : [];

    if (reports.length === 0) {
        console.warn('[GV Search] No reports data available');
        return;
    }

    console.log(`[GV Search] ✅ Initialized autocomplete with ${reports.length} reports`);

    navSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (!query) {
            navSearchDropdown.classList.remove('open');
            navSearchDropdown.innerHTML = '';
            return;
        }

        // Filter reports
        const filtered = reports.filter(r =>
            r.title.toLowerCase().includes(query) ||
            r.category.toLowerCase().includes(query) ||
            r.excerpt.toLowerCase().includes(query)
        ).slice(0, 5); // Limit to 5 results

        if (filtered.length === 0) {
            navSearchDropdown.innerHTML = '<div style="color:var(--text-secondary); text-align:center; padding:20px;">No reports found.</div>';
            navSearchDropdown.classList.add('open');
            return;
        }

        // Render results
        navSearchDropdown.innerHTML = filtered.map(report => `
            <div class="search-result-item" onclick="window.location.href='/${report.slug}'" style="
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                padding: 16px;
                margin-bottom: 12px;
                cursor: pointer;
                transition: all 0.2s;
            " onmouseenter="this.style.borderColor='var(--accent-cyan)'; this.style.background='var(--bg-tertiary)';" 
               onmouseleave="this.style.borderColor='var(--border-color)'; this.style.background='var(--bg-card)';">
                <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:8px;">
                    <h4 style="color:var(--text-primary); margin:0; font-size:1rem; font-weight:600;">${report.title}</h4>
                    <span style="font-size:0.75rem; color:var(--accent-cyan); background:rgba(6,182,212,0.1); padding:4px 8px; border-radius:6px; white-space:nowrap; margin-left:12px;">${report.date}</span>
                </div>
                <p style="color:var(--text-secondary); font-size:0.85rem; margin:0; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; line-height:1.5;">${report.excerpt}</p>
                <div style="display:flex; gap:8px; margin-top:12px; font-size:0.75rem; color:var(--text-muted);">
                    <span>${report.category}</span>
                    <span style="color:var(--border-color);">|</span>
                    <span>${report.readTime || '5 min'} read</span>
                </div>
            </div>
        `).join('');

        navSearchDropdown.classList.add('open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!navSearchInput.contains(e.target) && !navSearchDropdown.contains(e.target)) {
            navSearchDropdown.classList.remove('open');
        }
    });

    // Close on Escape
    navSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navSearchDropdown.classList.remove('open');
            navSearchInput.blur();
        }
    });
}

function injectSharedComponents() {
    const navPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // Inject reports data script if not already loaded
    if (typeof REPORTS_DATA === 'undefined' && !document.querySelector('script[src*="reports-data.js"]')) {
        const script = document.createElement('script');
        script.src = '../js/reports-data.js?v=' + Date.now();
        script.onload = () => initializeSearchAutocomplete();
        document.head.appendChild(script);
    }

    if (navPlaceholder) {
        navPlaceholder.innerHTML = SHARED_NAV_HTML;

        // === 2. NAVBAR LOGIC ===
        const navSearch = document.getElementById('navSearchContainer');
        const pageType = navPlaceholder.getAttribute('data-page-type');

        // On landing page (no page-type), hide search initially (hero has search)
        // On other pages (reports, etc.), always show search
        const isLandingPage = !pageType || pageType === 'landing';

        if (navSearch) {
            if (!isLandingPage) {
                // Always visible on reports/other pages - add scrolled class immediately
                navSearch.classList.add('scrolled');
            }
            // Landing page: CSS keeps it hidden, scroll listener will add/remove 'scrolled' class
        }

        // Initialize search if REPORTS_DATA already loaded
        if (typeof REPORTS_DATA !== 'undefined') {
            initializeSearchAutocomplete();
        }

        // Dynamic Nav Links (Right Side)
        const navRight = navPlaceholder.querySelector('#shared-nav-right');
        const mobileLinks = navPlaceholder.querySelector('#mobileMenuLinks');

        // Standard "Get Early Access" button for ALL pages
        if (navRight) {
            navRight.innerHTML = `
                <a href="#" class="btn-premium-glass pulsing-cta">
                    <i data-lucide="zap" style="width:16px;"></i>
                    Get Early Access
                </a>
            `;
        }

        if (mobileLinks) {
            mobileLinks.innerHTML = `
                <a href="/reports.html"><i data-lucide="file-text" style="width:20px;"></i> Reports</a>
                <a href="#"><i data-lucide="bell" style="width:20px;"></i> Get Early Access</a>
            `;
        }

        // Initialize Lucide
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Mobile Menu Toggle
        const mobileMenu = navPlaceholder.querySelector('#mobileMenu');
        const hamburgerIcon = navPlaceholder.querySelector('#hamburger-icon');

        window.toggleMobileMenu = () => {
            if (mobileMenu) {
                const isActive = mobileMenu.classList.toggle('active');
                if (hamburgerIcon && window.lucide) {
                    hamburgerIcon.setAttribute('data-lucide', isActive ? 'x' : 'menu');
                    window.lucide.createIcons();
                }
                document.body.style.overflow = isActive ? 'hidden' : '';
            }
        };

        // === SCROLL-BASED NAVBAR SEARCH VISIBILITY (Landing Page Only) ===
        if (isLandingPage && navSearch) {
            const SCROLL_THRESHOLD = 200; // Show search after scrolling 200px

            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                if (scrollTop > SCROLL_THRESHOLD) {
                    navSearch.classList.add('scrolled');
                } else {
                    navSearch.classList.remove('scrolled');
                }
            }, { passive: true });
        }
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = SHARED_FOOTER_HTML;
    }

    // === SCROLL PROGRESS BAR ===
    // Update progress bar as user scrolls through the page
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        const nav = document.querySelector('.navbar');
        if (nav) {
            nav.style.setProperty('--scroll-progress', `${scrollPercent}%`);
        }
    });

    // Ensure report layout structure (retroactive fix for legacy reports)
    ensureReportLayout();

    // Final Lucide pass
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Dispatch "Ready" event for local scripts
    window.gvComponentsReady = true;  // Set flag for late-loading scripts
    window.dispatchEvent(new CustomEvent('gv:componentsReady'));
}

/**
 * Ensures reports have correct layout structure
 * Fixes legacy reports missing content-grid wrapper
 * This enables "one change fixes all" architecture
 */
function ensureReportLayout() {
    // Only run on report pages
    const isReportPage = document.querySelector('[data-page-type="report"]');
    if (!isReportPage) return;

    const container = document.querySelector('.container');
    if (!container) return;

    const sidebar = container.querySelector('.sources-sidebar');
    const article = container.querySelector('.article-content') || container.querySelector('article');

    // Skip if already wrapped correctly
    if (container.querySelector('.content-grid')) {
        console.log('[GV Layout] content-grid already present');
        return;
    }

    // Skip if missing critical elements
    if (!sidebar || !article) {
        console.warn('[GV Layout] Missing sidebar or article - skipping layout fix');
        return;
    }

    // Create content-grid wrapper
    const grid = document.createElement('div');
    grid.className = 'content-grid';

    // Clone positions - must move elements carefully
    // First, remove from current parent
    sidebar.parentNode.removeChild(sidebar);
    article.parentNode.removeChild(article);

    // Add to grid
    grid.appendChild(sidebar);
    grid.appendChild(article);

    // Insert grid at start of container (after any scripts that might be there)
    container.insertBefore(grid, container.firstChild);

    // Ensure article has correct class
    if (article.classList.contains('article-main')) {
        article.classList.remove('article-main');
        article.classList.add('article-content');
    }

    console.log('[GV Layout] ✅ Applied content-grid wrapper (retroactive fix)');
}

// Boot
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSharedComponents);
} else {
    injectSharedComponents();
}

