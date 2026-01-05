/**
 * Unified Search and 3D Carousel Logic for GenuVerity Landing Page
 *
 * IMPORTANT: Chart generation is handled by ChartPreviews (js/chart-previews.js)
 * This ensures a single source of truth for all chart thumbnail rendering.
 * Do NOT add chart generator functions here - update chart-previews.js instead.
 */

// Delegate to ChartPreviews for chart generation (single source of truth)
function generateChartForReport(report) {
    // ChartPreviews is loaded before this file (see index.html script order)
    if (typeof ChartPreviews !== 'undefined' && ChartPreviews.generateChart) {
        return ChartPreviews.generateChart(report);
    }
    // Fallback if ChartPreviews not loaded (shouldn't happen in production)
    console.warn('ChartPreviews not loaded, using fallback');
    return '<div class="chart-container"><div class="chart-bars"></div></div>';
}


class UnifiedSearch {
    constructor() {
        this.reports = typeof REPORTS_DATA !== 'undefined' ? REPORTS_DATA : [];
        this.filteredReports = [...this.reports];
        this.currentCardIndex = 0;

        // Physics state
        this.dragOffset = 0;         // Current drag distance in pixels
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.wasDragging = false;    // Distinguish click vs drag

        this.init();
    }

    // Dynamic CARD_WIDTH to match CSS widths
    getCardWidth() {
        // Matches CSS: Desktop = 360px, Mobile (<=768px) = 300px
        return window.innerWidth <= 768 ? 300 : 360;
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.initCarousel();
        this.updateStats();
    }

    cacheDOM() {
        this.searchOverlay = document.getElementById('searchOverlay');
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        this.carouselTrack = document.getElementById('carouselTrack');
        this.carouselDots = document.getElementById('carouselDots');
        this.currentIndexDisplay = document.getElementById('currentIndex');
        this.totalCountDisplay = document.getElementById('totalCount');
        this.carouselContainer = document.querySelector('.carousel-container');

        // Stats elements
        this.reportCountEl = document.getElementById('reportCount');
        this.sourceCountEl = document.getElementById('sourceCount');
        this.verifiedCountEl = document.getElementById('verifiedCount');

        // View Toggles
        this.viewToggleBtn = document.getElementById('viewToggleBtn');
        this.listView = document.getElementById('listView');
        this.carouselSection = document.getElementById('carouselSection');
    }

    bindEvents() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Global Input Sync (Hero + Navbar)
        document.querySelectorAll('.search-sync-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const val = e.target.value;
                this.toggleSearchOverlay(true);

                // Sync all other inputs
                document.querySelectorAll('.search-sync-input').forEach(other => {
                    if (other !== e.target) other.value = val;
                });
                if (this.searchInput) this.searchInput.value = val;

                this.handleSearch(val);
            });

            // Focus handler to open overlay
            input.addEventListener('focus', () => {
                this.toggleSearchOverlay(true);
            });
        });

        // Global keyboard interactions
        document.addEventListener('keydown', (e) => {
            // Search shortcut
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.toggleSearchOverlay(true);
            }
            // Close search
            if (e.key === 'Escape') {
                this.toggleSearchOverlay(false);
            }

            // Carousel Navigation (only if search is closed)
            const isSearchOpen = this.searchOverlay && this.searchOverlay.classList.contains('active');
            if (!isSearchOpen) {
                if (e.key === 'ArrowLeft') {
                    this.navigateCarousel(-1);
                } else if (e.key === 'ArrowRight') {
                    this.navigateCarousel(1);
                }
            }
        });

        // Click outside search to close
        if (this.searchOverlay) {
            this.searchOverlay.addEventListener('click', (e) => {
                if (e.target === this.searchOverlay) this.toggleSearchOverlay(false);
            });
        }

        // View Toggle
        if (this.viewToggleBtn) {
            this.viewToggleBtn.addEventListener('click', () => this.toggleViewMode());
        }
    }

    toggleSearchOverlay(show) {
        if (!this.searchOverlay) return;
        this.searchOverlay.classList.toggle('active', show);
        if (show) this.searchInput.focus();
    }

    handleSearch(query) {
        const q = query.toLowerCase().trim();
        if (!q) {
            this.filteredReports = [...this.reports];
        } else {
            this.filteredReports = this.reports.filter(r =>
                r.title.toLowerCase().includes(q) ||
                r.category.toLowerCase().includes(q) ||
                r.excerpt.toLowerCase().includes(q)
            );
        }

        this.currentCardIndex = 0;
        this.renderCarousel();
        this.renderListView();
        this.renderSearchResults();
        this.updateStats();
    }

    toggleViewMode() {
        this.isListView = !this.isListView;
        const icon = this.viewToggleBtn.querySelector('i');

        if (this.isListView) {
            this.carouselSection.style.display = 'none';
            this.listView.style.display = 'block';
            this.listView.classList.add('active');
            this.viewToggleBtn.classList.add('active');
            if (icon) icon.setAttribute('data-lucide', 'layers');
            this.renderListView();
        } else {
            this.carouselSection.style.display = 'block';
            this.listView.style.display = 'none';
            this.listView.classList.remove('active');
            this.viewToggleBtn.classList.remove('active');
            if (icon) icon.setAttribute('data-lucide', 'list');
            this.renderCarousel();
        }

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    renderListView() {
        if (!this.listView) return;
        this.listView.innerHTML = '';

        if (this.filteredReports.length === 0) {
            this.listView.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-muted);">No reports found matching your criteria.</div>';
            return;
        }

        this.filteredReports.forEach((report, index) => {
            const item = document.createElement('div');
            item.className = 'list-item';
            // Stagger animation
            item.style.animationDelay = `${index * 50}ms`;

            item.innerHTML = `
                <div class="list-item-icon">
                    <i data-lucide="${report.icon || 'file-text'}" style="width:24px;height:24px;"></i>
                </div>
                <div class="list-item-content">
                    <div class="list-item-meta">
                        <span>${report.category}</span>
                        <span>•</span>
                        <span>${report.date}</span>
                        <span>•</span>
                        <span>${report.readTime}</span>
                    </div>
                    <div class="list-item-title">${report.title}</div>
                    <div class="list-item-excerpt">${report.excerpt}</div>
                </div>
                <div class="list-item-action">
                    <i data-lucide="arrow-right" style="color:var(--accent-cyan);"></i>
                </div>
            `;

            item.addEventListener('click', () => window.location.href = '/' + report.slug);
            this.listView.appendChild(item);
        });

        if (typeof lucide !== 'undefined') lucide.createIcons({ root: this.listView });
    }

    renderSearchResults() {
        if (!this.searchResults) return;
        this.searchResults.innerHTML = '';

        if (this.filteredReports.length === 0) {
            this.searchResults.innerHTML = '<div style="color:var(--text-secondary); text-align:center; padding:20px; font-family:var(--font-mono);">No reports found.</div>';
            return;
        }

        const list = document.createElement('div');
        Object.assign(list.style, {
            display: 'flex', flexDirection: 'column', gap: '12px',
            maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px'
        });

        this.filteredReports.forEach(report => {
            const item = document.createElement('div');
            // Simplified inline styles
            Object.assign(item.style, {
                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                borderRadius: '12px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s'
            });

            item.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:8px;">
                    <h4 style="color:var(--text-primary); margin:0; font-size:1rem; font-weight:600;">${report.title}</h4>
                    <span style="font-size:0.75rem; color:var(--accent-cyan); background:rgba(6,182,212,0.1); padding:4px 8px; border-radius:6px; white-space:nowrap; margin-left:12px;">${report.date}</span>
                </div>
                <p style="color:var(--text-secondary); font-size:0.85rem; margin:0; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; line-height:1.5;">${report.excerpt}</p>
                <div style="display:flex; gap:8px; margin-top:12px; font-size:0.75rem; color:var(--text-muted);">
                    <span style="display:flex; align-items:center; gap:4px;"><i data-lucide="${report.icon || 'file-text'}" style="width:12px;height:12px;"></i> ${report.category}</span>
                    <span style="color:var(--border-color);">|</span>
                    <span>${report.readTime || '5 min'} read</span>
                </div>
            `;

            item.onmouseenter = () => { item.style.borderColor = 'var(--accent-cyan)'; item.style.background = 'var(--bg-tertiary)'; };
            item.onmouseleave = () => { item.style.borderColor = 'var(--border-color)'; item.style.background = 'var(--bg-card)'; };
            item.onclick = () => window.location.href = '/' + report.slug;

            list.appendChild(item);
        });

        this.searchResults.appendChild(list);
        if (typeof lucide !== 'undefined') lucide.createIcons({ root: this.searchResults });
    }

    updateStats() {
        const reportCount = this.filteredReports.length;
        let totalSources = 0;
        this.filteredReports.forEach(report => {
            const match = report.sources.match(/(\d+)/);
            if (match) totalSources += parseInt(match[1], 10);
        });

        this.animateValue(this.reportCountEl, reportCount, '');
        this.animateValue(this.sourceCountEl, totalSources, '+');
        this.animateValue(this.verifiedCountEl, 100, '%');

        if (this.totalCountDisplay) {
            this.totalCountDisplay.textContent = reportCount;
        }
    }

    animateValue(element, end, suffix) {
        if (!element) return;
        const start = parseInt(element.textContent) || 0;
        const duration = 1000;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString() + suffix;
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    // --- CAROUSEL PHYSICS ENGINE (REBUILT FOR MOBILE) ---

    initCarousel() {
        this.renderCarousel();
        if (!this.carouselContainer) return;

        // STATE MACHINE: idle | dragging | settling
        let state = 'idle';
        let startX = 0;
        let startY = 0;
        let isHorizontalSwipe = null; // null = undetermined, true/false after threshold
        let isEdgeSwipe = false; // iOS reserves screen edges for back/forward gestures

        // iOS edge detection - first 40px from screen edges are reserved for iOS gestures
        const EDGE_THRESHOLD = 40;
        const isNearEdge = (x) => x < EDGE_THRESHOLD || x > window.innerWidth - EDGE_THRESHOLD;

        // TOUCH START
        this.carouselContainer.addEventListener('touchstart', (e) => {
            if (state !== 'idle') return;

            const touchX = e.touches[0].clientX;

            // Let iOS handle edge swipes (back/forward navigation)
            if (isNearEdge(touchX)) {
                isEdgeSwipe = true;
                return; // Don't start carousel drag
            }
            isEdgeSwipe = false;

            state = 'dragging';
            startX = touchX;
            startY = e.touches[0].clientY;
            isHorizontalSwipe = null;
            this.startX = startX;
            this.dragOffset = 0;
            this.wasDragging = false;

            // Disable card transitions for 1:1 drag feel
            this.carouselContainer.querySelectorAll('.carousel-card').forEach(c => {
                c.style.transition = 'none';
            });
        }, { passive: true });

        // TOUCH MOVE
        this.carouselContainer.addEventListener('touchmove', (e) => {
            if (state !== 'dragging' || isEdgeSwipe) return;

            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = currentX - startX;
            const diffY = currentY - startY;

            // Determine swipe direction on first significant movement
            if (isHorizontalSwipe === null && (Math.abs(diffX) > 10 || Math.abs(diffY) > 10)) {
                isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);
            }

            // Only handle horizontal swipes (not edge swipes)
            if (isHorizontalSwipe === true) {
                // Don't preventDefault - let browser handle it naturally with touch-action CSS
                this.wasDragging = true;

                // Apply resistance at edges
                if ((this.currentCardIndex === 0 && diffX > 0) ||
                    (this.currentCardIndex === this.filteredReports.length - 1 && diffX < 0)) {
                    this.dragOffset = diffX * 0.3;
                } else {
                    this.dragOffset = diffX;
                }

                this.updateCarousel();
            }
        }, { passive: true }); // Passive for better performance and iOS compatibility

        // TOUCH END
        this.carouselContainer.addEventListener('touchend', (e) => {
            if (state !== 'dragging') return;

            state = 'settling';

            // Re-enable transitions for snap animation
            this.carouselContainer.querySelectorAll('.carousel-card').forEach(c => {
                c.style.transition = 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
            });

            // Snap logic - 30% threshold for card change
            const threshold = this.getCardWidth() * 0.3;
            if (this.dragOffset > threshold && this.currentCardIndex > 0) {
                this.currentCardIndex--;
            } else if (this.dragOffset < -threshold && this.currentCardIndex < this.filteredReports.length - 1) {
                this.currentCardIndex++;
            }

            this.dragOffset = 0;
            this.updateCarousel();

            // Brief delay before allowing clicks again
            setTimeout(() => {
                state = 'idle';
                this.wasDragging = false;
            }, 100);
        }, { passive: true });

        // TOUCH CANCEL (e.g., incoming call)
        this.carouselContainer.addEventListener('touchcancel', () => {
            state = 'idle';
            this.dragOffset = 0;
            this.wasDragging = false;
            this.updateCarousel();
        }, { passive: true });

        // MOUSE SUPPORT (Desktop)
        let mouseActive = false;

        this.carouselContainer.addEventListener('mousedown', (e) => {
            if (state !== 'idle') return;
            mouseActive = true;
            state = 'dragging';
            startX = e.clientX;
            this.startX = startX;
            this.dragOffset = 0;
            this.wasDragging = false;
            this.carouselContainer.style.cursor = 'grabbing';

            this.carouselContainer.querySelectorAll('.carousel-card').forEach(c => {
                c.style.transition = 'none';
            });
        });

        window.addEventListener('mousemove', (e) => {
            if (!mouseActive || state !== 'dragging') return;

            const diffX = e.clientX - startX;
            if (Math.abs(diffX) > 5) {
                this.wasDragging = true;
                e.preventDefault();
            }

            if ((this.currentCardIndex === 0 && diffX > 0) ||
                (this.currentCardIndex === this.filteredReports.length - 1 && diffX < 0)) {
                this.dragOffset = diffX * 0.3;
            } else {
                this.dragOffset = diffX;
            }

            this.updateCarousel();
        });

        window.addEventListener('mouseup', () => {
            if (!mouseActive || state !== 'dragging') return;
            mouseActive = false;
            state = 'settling';
            this.carouselContainer.style.cursor = 'grab';

            this.carouselContainer.querySelectorAll('.carousel-card').forEach(c => {
                c.style.transition = 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
            });

            const threshold = this.getCardWidth() * 0.3;
            if (this.dragOffset > threshold && this.currentCardIndex > 0) {
                this.currentCardIndex--;
            } else if (this.dragOffset < -threshold && this.currentCardIndex < this.filteredReports.length - 1) {
                this.currentCardIndex++;
            }

            this.dragOffset = 0;
            this.updateCarousel();

            setTimeout(() => {
                state = 'idle';
                this.wasDragging = false;
            }, 100);
        });
    }

    renderCarousel() {
        if (!this.carouselTrack) return;
        this.carouselTrack.innerHTML = '';
        if (this.carouselDots) this.carouselDots.innerHTML = '';

        this.filteredReports.forEach((report, index) => {
            const card = document.createElement('div');
            card.className = 'carousel-card';
            card.dataset.index = index;

            // USE DYNAMIC CHART GENERATOR (Fallback)
            const chartHTML = generateChartForReport(report);
            const slugBase = report.slug.split('/').pop().replace('.html', '');
            const thumbPath = `images/thumbnails/${slugBase}.webp?v=1766960197`; // Cache bust thumbnails too

            card.innerHTML = `
                <div class="card-preview">
                    <img src="${thumbPath}" 
                         alt="Chart Preview"
                         class="card-preview-img"
                         loading="lazy"
                         onerror="this.style.display='none'; this.parentElement.querySelector('.chart-container-wrapper').style.display='block';"
                         style="width:100%; height:100%; object-fit:cover; display:block;"
                    >
                    <div class="chart-container-wrapper" style="display:none; width:100%; height:100%;">
                        ${chartHTML}
                    </div>
                </div>
                <div class="card-content">
                    <span class="card-tag ${report.tagClass || 'tag-blue'}">
                        <i data-lucide="${report.icon || 'file-text'}" style="width:12px;height:12px;"></i>
                        ${report.category}
                    </span>
                    <h3 class="card-title">${report.title}</h3>
                    <p class="card-excerpt">${report.excerpt}</p>
                    <div class="card-footer">
                        <div class="card-meta">
                            <span><i data-lucide="calendar" style="width:12px;height:12px;"></i> ${report.date}</span>
                        </div>
                        <a href="/${report.slug}" class="card-cta">Read</a>
                    </div>
                </div>
            `;

            // Direct onclick to bypass potential listener conflicts
            card.onclick = (e) => {
                if (this.wasDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }

                // Click to center functionality
                if (index !== this.currentCardIndex) {
                    e.preventDefault();
                    this.goToCard(index);
                } else {
                    // It's the center card, allow navigation if clicking content
                    // The main card click will bubble up if we don't handle it
                    if (e.target.closest('.card-cta') || e.target.closest('.card-content') || e.target.closest('.carousel-card')) {
                        window.location.href = '/' + report.slug;
                    }
                }
            };

            // Block anchor clicks during drag (mobile touch synthesis fix)
            const anchor = card.querySelector('.card-cta');
            if (anchor) {
                anchor.addEventListener('click', (e) => {
                    if (this.wasDragging) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }, { capture: true }); // Capture phase to run before bubbling
            }

            this.carouselTrack.appendChild(card);

            if (this.carouselDots) {
                const dot = document.createElement('div');
                dot.className = 'carousel-dot';
                dot.addEventListener('click', () => this.goToCard(index));
                this.carouselDots.appendChild(dot);
            }
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();
        this.updateCarousel();
    }

    updateCarousel() {
        const cards = document.querySelectorAll('.carousel-card');
        const dots = document.querySelectorAll('.carousel-dot');
        const dragShift = this.dragOffset; // Pixels to shift

        cards.forEach((card, index) => {
            // Calculate distance including drag offset
            // Standard offset: index - currentIndex (e.g., -1, 0, 1)
            // Convert pixels to index-units for transform calculation
            const dragIndexShift = dragShift / this.getCardWidth();
            const offset = (index - this.currentCardIndex) + dragIndexShift;

            const absOffset = Math.abs(offset);

            const translateX = offset * this.getCardWidth();
            const translateZ = -150 - (absOffset * 50); // Base Z pushback
            const rotateY = offset * -25;

            // Custom scale logic to keep center large
            const scale = Math.max(0.7, 1 - (absOffset * 0.15));
            const opacity = Math.max(0.3, 1 - (absOffset * 0.25));
            // Strict Z-Index Layering to prevent overlap hijacking
            let zIndex = 50;
            if (absOffset < 0.5) zIndex = 100; // Center (Active)
            else if (absOffset < 1.5) zIndex = 90; // Immediate neighbors
            else zIndex = 100 - Math.round(absOffset * 10); // Others

            // Special handling for the "center" card (approximate)
            if (absOffset < 0.5) {
                card.classList.add('active');
                card.style.zIndex = zIndex;
                card.style.transform = `translateX(${translateX}px) translateZ(${Math.abs(offset) * -100}px) rotateY(${rotateY}deg) scale(${scale})`;
            } else {
                card.classList.remove('active');
                card.style.zIndex = zIndex;
                card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
            }

            card.style.opacity = opacity > 0 ? opacity : 0;
            // Enable pointer events for click-to-center on visible side cards
            card.style.pointerEvents = opacity > 0.3 ? 'auto' : 'none';
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentCardIndex);
        });

        if (this.currentIndexDisplay) {
            this.currentIndexDisplay.textContent = this.currentCardIndex + 1;
        }
    }

    navigateCarousel(direction) {
        const newIndex = this.currentCardIndex + direction;
        if (newIndex >= 0 && newIndex < this.filteredReports.length) {
            this.currentCardIndex = newIndex;
            this.updateCarousel();
        }
    }

    goToCard(index) {
        this.currentCardIndex = index;
        this.updateCarousel();
    }
}

// Global toggle functions for buttons
function toggleUnifiedSearch() {
    if (window.unifiedSearch) {
        window.unifiedSearch.toggleSearchOverlay(true);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.unifiedSearch = new UnifiedSearch();

    // Legacy global functions for HTML onclick handlers
    window.navigateCarousel = (dir) => window.unifiedSearch.navigateCarousel(dir);
});
