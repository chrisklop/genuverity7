/**
 * GenuVerity Shared Components
 * Centralizes the Navigation Bar and Footer for site-wide consistency.
 */

const SHARED_NAV_HTML = `
    <nav class="navbar">
        <a href="/" class="navbar-brand">
            <div class="navbar-logo">
                <div class="navbar-logo-wrapper">
                    <div class="ss-nav"></div>
                    <div class="g-icon-nav">G</div>
                </div>
                <span class="logo-text"><span class="logo-genu">Genu</span><span class="logo-verity">Verity</span></span>
            </div>
        </a>
        <div class="navbar-center">
            <div class="navbar-search-container" id="navSearchContainer">
                <i data-lucide="search" style="width:16px; color:var(--accent-cyan);"></i>
                <input type="text" class="navbar-search-input search-sync-input" placeholder="Search Intelligence..." id="navSearchInput">
            </div>
        </div>
        <div class="navbar-right" id="shared-nav-right">
            <!-- Populated by JS -->
        </div>
        <button class="navbar-hamburger" onclick="window.toggleMobileMenu()">
            <i data-lucide="menu" id="hamburger-icon"></i>
        </button>
    </nav>
    <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-header">
            <div class="navbar-logo">
                <div class="navbar-logo-wrapper">
                    <div class="ss-nav"></div>
                    <div class="g-icon-nav">G</div>
                </div>
                <span class="logo-text"><span class="logo-genu">Genu</span><span class="logo-verity">Verity</span></span>
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
            <a href="/reports.html" style="color:var(--text-muted); text-decoration:none; transition:color 0.2s;">Intelligence Nexus</a>
        </div>
        <p style="margin-top:40px; color:var(--text-muted); font-size:0.8rem; font-family:var(--font-mono);">
            &copy; 2025 GenuVerity. All Verification Traced to Primary Sources.
        </p>
    </footer>
`;

function injectSharedComponents() {
    const navPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (navPlaceholder) {
        navPlaceholder.innerHTML = SHARED_NAV_HTML;

        const navbar = navPlaceholder.querySelector('.navbar');
        const handleScroll = () => {
            const scrolled = window.scrollY > 20;
            if (navbar) navbar.classList.toggle('navbar-scrolled', scrolled);

            const searchContainer = document.getElementById('navSearchContainer');
            const placeholder = document.getElementById('navbar-placeholder');

            if (searchContainer && placeholder) {
                const isHomePage = document.querySelector('.hero-compact') !== null;
                const isMobile = window.innerWidth <= 768;
                const alwaysShow = placeholder.dataset.searchAlways === 'true';

                if (isHomePage && !alwaysShow && !isMobile) {
                    const heroSearch = document.querySelector('.hero-search');
                    const threshold = heroSearch ? (heroSearch.getBoundingClientRect().top + window.scrollY + heroSearch.offsetHeight) : 300;
                    const shouldShow = window.scrollY > threshold;

                    searchContainer.style.opacity = shouldShow ? '1' : '0';
                    searchContainer.style.pointerEvents = shouldShow ? 'all' : 'none';
                    searchContainer.style.visibility = shouldShow ? 'visible' : 'hidden';
                } else {
                    searchContainer.style.opacity = '1';
                    searchContainer.style.pointerEvents = 'all';
                    searchContainer.style.visibility = 'visible';
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll();

        // Handle contextual nav-right
        const navRight = navPlaceholder.querySelector('#shared-nav-right');
        const mobileMenuLinks = navPlaceholder.querySelector('#mobileMenuLinks');
        const pageType = navPlaceholder.getAttribute('data-page-type');

        const reportLink = `
            <a href="/reports.html" class="nav-back-link" style="display:flex; align-items:center; gap:8px; color:var(--text-secondary); text-decoration:none;">
                <i data-lucide="file-text" style="width:16px;"></i>
                Intelligence Nexus
            </a>
        `;

        if (pageType === 'report') {
            if (navRight) navRight.innerHTML = reportLink;
            if (mobileMenuLinks) mobileMenuLinks.innerHTML = reportLink;
        } else {
            const standardLinks = `
                <a href="/reports.html" class="nav-link">Intelligence</a>
                <a href="/methodology.html" class="nav-link">Methodology</a>
                <a href="/contact.html" class="nav-link">Contact</a>
            `;
            if (navRight) navRight.innerHTML = standardLinks;
            if (mobileMenuLinks) mobileMenuLinks.innerHTML = standardLinks;
        }

        // Initialize Lucide for the newly injected content
        if (window.lucide) {
            window.lucide.createIcons();
        }

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
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = SHARED_FOOTER_HTML;
    }

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Run on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSharedComponents);
} else {
    injectSharedComponents();
}
