/**
 * Unified Search and 3D Carousel Logic for GenuVerity Landing Page
 */

class UnifiedSearch {
    constructor() {
        this.reports = typeof REPORTS_DATA !== 'undefined' ? REPORTS_DATA : [];
        this.filteredReports = [...this.reports];
        this.currentCardIndex = 0;
        this.isSearching = false;

        this.init();
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

        // Stats elements
        this.reportCountEl = document.getElementById('reportCount');
        this.sourceCountEl = document.getElementById('sourceCount');
        this.verifiedCountEl = document.getElementById('verifiedCount');
    }

    bindEvents() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Global keyboard shortcut for search (Cmd/Ctrl + K)
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.toggleSearchOverlay(true);
            }
            if (e.key === 'Escape') {
                this.toggleSearchOverlay(false);
            }
        });

        // Click outside search to close
        if (this.searchOverlay) {
            this.searchOverlay.addEventListener('click', (e) => {
                if (e.target === this.searchOverlay) {
                    this.toggleSearchOverlay(false);
                }
            });
        }
    }

    toggleSearchOverlay(show) {
        if (!this.searchOverlay) return;
        this.searchOverlay.classList.toggle('active', show);
        if (show) {
            this.searchInput.focus();
        }
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
        this.updateStats();
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

    initCarousel() {
        this.renderCarousel();

        // Swipe and Wheel gestures (ported from reports.html)
        const container = document.querySelector('.carousel-container');
        if (!container) return;

        let startX = 0;
        let isDragging = false;
        let lastWheelTime = 0;

        container.addEventListener('wheel', (e) => {
            const now = Date.now();
            if (now - lastWheelTime < 150) return;
            lastWheelTime = now;
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            if (delta > 10) this.navigateCarousel(1);
            else if (delta < -10) this.navigateCarousel(-1);
        }, { passive: false });

        container.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
        });

        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const diff = startX - e.clientX;
            if (Math.abs(diff) > 50) {
                this.navigateCarousel(diff > 0 ? 1 : -1);
            }
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

            // Simplified chart placeholder logic for now
            const chartColor = index % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-cyan)';

            card.innerHTML = `
                <div class="card-preview">
                    <div class="chart-container">
                        <div class="chart-bars">
                            ${Array.from({ length: 8 }, () => `<div class="bar" style="height: ${Math.random() * 60 + 20}%; background: ${chartColor}; width: 8px; border-radius: 4px;"></div>`).join('')}
                        </div>
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
                        <a href="${report.slug}" class="card-cta">Read</a>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                if (index === this.currentCardIndex) {
                    window.location.href = report.slug;
                } else {
                    this.goToCard(index);
                }
            });

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

        cards.forEach((card, index) => {
            const offset = index - this.currentCardIndex;
            const absOffset = Math.abs(offset);

            const translateX = offset * 280;
            const translateZ = absOffset === 0 ? 0 : -150 - (absOffset * 50);
            const rotateY = offset * -25;
            const scale = absOffset === 0 ? 1 : Math.max(0.7, 1 - (absOffset * 0.15));
            const opacity = absOffset > 3 ? 0 : Math.max(0.3, 1 - (absOffset * 0.25));

            card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = absOffset === 0 ? 100 : Math.max(10, 90 - (absOffset * 5));
            card.style.pointerEvents = opacity > 0 ? 'auto' : 'none';
            card.classList.toggle('active', absOffset === 0);
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
});
