/**
 * Unified Search and 3D Carousel Logic for GenuVerity Landing Page
 */

// Chart Generators (Ported from reports.html/index.html)
function generateBarChart(baseColor, rawData) {
    let data = [];

    // Normalize Data
    if (rawData && Array.isArray(rawData)) {
        if (typeof rawData[0] === 'number') {
            // Legacy: simple array of numbers
            data = rawData.map(v => ({ value: v, label: '', color: baseColor }));
        } else {
            // Rich Data: Objects with { label, value, color }
            data = rawData.map(d => ({
                value: d.value,
                label: d.label || '',
                color: d.color || baseColor
            }));
        }
    } else {
        // Fallback: Random bars
        const randoms = Array.from({ length: 10 }, () => Math.random() * 80 + 20);
        data = randoms.map(v => ({ value: v, label: '', color: baseColor }));
    }

    // Determine scale
    const maxValue = Math.max(...data.map(d => d.value), 1);

    const count = data.length;
    const totalGap = 30;
    const barWidth = (180 - totalGap) / count;
    const gap = totalGap / (count - 1 || 1);

    const bars = data.map((d, i) => {
        const height = (d.value / maxValue) * 80; // Reserve bottom 20% for labels? No, let's say 85 height
        // If we have labels, shrink bars to make room
        const hasLabels = data.some(item => item.label);
        const graphHeight = hasLabels ? 80 : 100;
        const normalizedHeight = (d.value / maxValue) * graphHeight;

        const x = i * (barWidth + gap);
        const y = graphHeight - normalizedHeight;

        let el = `<rect x="${x}" y="${y}" width="${barWidth}" height="${normalizedHeight}" fill="${d.color}" rx="2" opacity="0.9" />`;

        if (hasLabels && d.label) {
            // Center text under bar
            const textX = x + (barWidth / 2);
            el += `<text x="${textX}" y="95" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="sans-serif" style="pointer-events:none;">${d.label}</text>`;
        }
        return el;
    }).join('');

    return `<div class="chart-container">
        <div class="chart-bars" style="width:100%; height:100%;">
            <svg viewBox="0 0 180 100" preserveAspectRatio="xMidYMid meet" style="width:100%; height:100%; overflow:visible;">
                ${bars}
            </svg>
        </div>
    </div>`;
}

function generateLineChart(color, data) {
    let points;
    if (data && Array.isArray(data)) {
        points = data.map((val, i) => ({
            x: i * (180 / (data.length - 1)),
            y: val
        }));
    } else {
        points = Array.from({ length: 8 }, (_, i) => ({
            x: i * (180 / 7),
            y: 20 + Math.random() * 60
        }));
    }

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${100 - p.y}`).join(' ');
    const areaD = pathD + ` L 180 100 L 0 100 Z`;
    return `<div class="chart-container"><div class="chart-line">
        <svg viewBox="0 0 180 100" preserveAspectRatio="xMidYMid meet">
            <path class="area" d="${areaD}" fill="${color}"/>
            <path d="${pathD}" stroke="${color}"/>
        </svg>
    </div></div>`;
}

function generateDonutChart(percent, color) {
    const circumference = 2 * Math.PI * 40;
    const offset = circumference * (1 - percent / 100);
    return `<div class="chart-container" style="justify-content: center; align-items: center;">
        <div class="chart-donut">
            <svg viewBox="0 0 180 100" preserveAspectRatio="xMidYMid meet">
                <circle cx="90" cy="50" r="40" stroke="var(--border-color)"/>
                <circle cx="90" cy="50" r="40" stroke="${color}"
                    stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>
            </svg>
            <span class="donut-label">${percent}%</span>
        </div>
    </div>`;
}

function generateNetworkChart(nodeColor, lineColor) {
    const nodes = Array.from({ length: 15 }, () => ({
        x: 10 + Math.random() * 160,
        y: 10 + Math.random() * 80,
        r: 3 + Math.random() * 2
    }));

    // Generate connections
    const links = [];
    nodes.forEach((node, i) => {
        // Connect to 2-3 nearest neighbors to form a nicer graph
        const neighbors = nodes
            .map((n, idx) => ({ idx, dist: Math.hypot(n.x - node.x, n.y - node.y) }))
            .filter(n => n.idx !== i)
            .sort((a, b) => a.dist - b.dist)
            .slice(0, Math.random() > 0.5 ? 2 : 3);

        neighbors.forEach(n => {
            // Avoid duplicates (only connect if i < n.idx)
            if (i < n.idx) {
                links.push({ source: node, target: nodes[n.idx] });
            }
        });
    });

    const linesHTML = links.map(link =>
        `<line x1="${link.source.x}" y1="${link.source.y}" x2="${link.target.x}" y2="${link.target.y}" stroke="${lineColor}" stroke-width="0.5" opacity="0.4" />`
    ).join('');

    const nodesHTML = nodes.map((n, i) =>
        `<circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${nodeColor}" style="animation: pulse 3s ease-in-out infinite; animation-delay: ${i * 0.2}s; transform-box: fill-box; transform-origin: center;" />`
    ).join('');

    return `<div class="chart-container">
        <div class="chart-network" style="width:100%; height:100%;">
            <svg viewBox="0 0 180 100" preserveAspectRatio="xMidYMid slice" style="width:100%; height:100%; overflow:visible;">
                ${linesHTML}
                ${nodesHTML}
            </svg>
        </div>
    </div>`;
}

function generateHBarChart(data, colors) {
    // data is array of {label, value}
    const rowHeight = 100 / (data.length || 1);
    const barHeight = rowHeight * 0.4;

    const content = data.map((d, i) => {
        const yCenter = i * rowHeight + rowHeight / 2;
        const yBar = yCenter - barHeight / 2;
        const color = colors[i % colors.length];

        return `
            <!-- Label -->
            <text x="0" y="${yCenter}" dominant-baseline="middle" fill="#94a3b8" font-size="10" font-family="sans-serif" style="text-anchor: start;">${d.label}</text>
            <!-- Bar Background -->
            <rect x="50" y="${yBar}" width="130" height="${barHeight}" fill="${color}" opacity="0.1" rx="2" />
            <!-- Value Bar -->
            <rect x="50" y="${yBar}" width="${d.value * 1.3}" height="${barHeight}" fill="${color}" rx="2" />
        `;
    }).join('');

    return `<div class="chart-container">
        <div class="chart-hbars" style="width:100%; height:100%;">
            <svg viewBox="0 0 180 100" preserveAspectRatio="xMidYMid meet" style="width:100%; height:100%; overflow:visible;">
                ${content}
            </svg>
        </div>
    </div>`;
}

function generateTimelineChart(points, color) {
    // points is array of percentages 0-100
    const dots = points.map(p =>
        `<circle cx="${p * 1.8}" cy="50" r="4" fill="${color}" stroke="#111827" stroke-width="2" />`
    ).join('');

    return `<div class="chart-container">
        <div class="chart-timeline" style="width:100%; height:100%;">
             <svg viewBox="0 0 180 100" preserveAspectRatio="xMidYMid meet" style="width:100%; height:100%; overflow:visible;">
                <line x1="0" y1="50" x2="180" y2="50" stroke="rgba(255,255,255,0.1)" stroke-width="2" />
                ${dots}
            </svg>
        </div>
    </div>`;
}

// Chart Dispatcher
// Chart Dispatcher
function generateChartForReport(report) {
    let config = report.chart;

    // Deterministic fallback if no chart data
    if (!config) {
        // Simple hash of title to seed random selection
        let hash = 0;
        const str = report.title || "default";
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        const seed = Math.abs(hash);

        const types = ['bar', 'line', 'donut', 'network', 'timeline'];
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

        config = {
            type: types[seed % types.length],
            color: colors[(seed >> 2) % colors.length],
            data: null // Generators usually have their own random data fallback
        };

        // Specific data tweaks for types that need arrays
        if (config.type === 'timeline') config.data = [10, 30, 50, 70, 90].map(v => v + (seed % 10));
        if (config.type === 'donut') config.data = 60 + (seed % 35);
        if (config.type === 'hbar') {
            config.data = [
                { label: 'A', value: 80 + (seed % 20) },
                { label: 'B', value: 50 + (seed % 40) }
            ];
        }
    }

    switch (config.type) {
        case 'line':
            return generateLineChart(config.color, config.data);
        case 'bar':
            // Ensure bar chart has random data if none provided
            return generateBarChart(config.color, config.data);
        case 'donut':
            return generateDonutChart(config.data || 75, config.color);
        case 'network':
            return generateNetworkChart(config.color, config.color);
        case 'hbar':
            return generateHBarChart(config.data, [config.color, '#64748b', '#475569']);
        case 'timeline':
            return generateTimelineChart(config.data, config.color);
        default:
            return generateBarChart(config.color);
    }
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
        this.CARD_WIDTH = 280;       // Spacing between cards

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

        // Hero Search Input Sync
        const heroInput = document.querySelector('.hero-search-input');
        if (heroInput) {
            heroInput.addEventListener('input', (e) => {
                const val = e.target.value;
                this.toggleSearchOverlay(true);
                if (this.searchInput) {
                    this.searchInput.value = val;
                    this.searchInput.focus();
                }
                this.handleSearch(val);
            });
        }

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
            this.carouselSection.classList.add('hidden');
            this.listView.classList.add('active');
            this.viewToggleBtn.classList.add('active');
            if (icon) icon.setAttribute('data-lucide', 'gallery-horizontal');
            this.renderListView();
        } else {
            this.carouselSection.classList.remove('hidden');
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

            item.addEventListener('click', () => window.location.href = report.slug);
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
            item.onclick = () => window.location.href = report.slug;

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

    // --- CAROUSEL PHYSICS ENGINE ---

    initCarousel() {
        this.renderCarousel();
        if (!this.carouselContainer) return;

        // Unified Pointer Events (Mouse + Touch)
        const startDrag = (x) => {
            this.isDragging = true;
            this.startX = x;
            this.currentX = x;
            this.dragOffset = 0;
            this.wasDragging = false;
            this.carouselContainer.style.cursor = 'grabbing';
            // Disable transitions during drag for 1:1 feel
            const cards = this.carouselContainer.querySelectorAll('.carousel-card');
            cards.forEach(c => c.style.transition = 'none');
        };

        const moveDrag = (x) => {
            if (!this.isDragging) return;
            const diff = x - this.startX;
            // Resistance at edges
            if ((this.currentCardIndex === 0 && diff > 0) ||
                (this.currentCardIndex === this.filteredReports.length - 1 && diff < 0)) {
                this.dragOffset = diff * 0.4;
            } else {
                this.dragOffset = diff;
            }

            if (Math.abs(diff) > 10) this.wasDragging = true;
            this.updateCarousel(); // Real-time update
        };

        const endDrag = (x) => {
            if (!this.isDragging) return;
            this.isDragging = false;
            this.carouselContainer.style.cursor = 'grab';

            // Re-enable transitions
            const cards = this.carouselContainer.querySelectorAll('.carousel-card');
            cards.forEach(c => c.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)');

            // Snap logic
            const threshold = this.CARD_WIDTH * 0.2; // 20% swipe to change
            if (this.dragOffset > threshold && this.currentCardIndex > 0) {
                this.currentCardIndex--;
            } else if (this.dragOffset < -threshold && this.currentCardIndex < this.filteredReports.length - 1) {
                this.currentCardIndex++;
            }

            this.dragOffset = 0;
            this.updateCarousel();
        };

        // Touch Listeners
        this.carouselContainer.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX), { passive: true });
        this.carouselContainer.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX), { passive: true });
        this.carouselContainer.addEventListener('touchend', (e) => endDrag(e.changedTouches[0].clientX), { passive: true });

        // Mouse Listeners
        this.carouselContainer.addEventListener('mousedown', (e) => startDrag(e.clientX));
        window.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                e.preventDefault(); // Prevent selection
                moveDrag(e.clientX);
            }
        });
        window.addEventListener('mouseup', (e) => {
            if (this.isDragging) endDrag(e.clientX);
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

            // USE DYNAMIC CHART GENERATOR
            const chartHTML = generateChartForReport(report);

            card.innerHTML = `
                <div class="card-preview">
                    ${chartHTML}
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

            // Click Handler
            card.addEventListener('click', (e) => {
                if (this.wasDragging) return; // Ignore if it was a drag

                // Click to center functionality
                if (index !== this.currentCardIndex) {
                    this.goToCard(index);
                } else {
                    // It's the center card, allow navigation
                    if (e.target.closest('.card-cta') || e.target.closest('.card-content')) {
                        window.location.href = report.slug;
                    }
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
        const dragShift = this.dragOffset; // Pixels to shift

        cards.forEach((card, index) => {
            // Calculate distance including drag offset
            // Standard offset: index - currentIndex (e.g., -1, 0, 1)
            // Convert pixels to index-units for transform calculation
            const dragIndexShift = dragShift / this.CARD_WIDTH;
            const offset = (index - this.currentCardIndex) + dragIndexShift;

            const absOffset = Math.abs(offset);

            const translateX = offset * this.CARD_WIDTH;
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
