/**
 * Unified Chart Preview Module for GenuVerity
 *
 * This module generates mini-chart previews for report cards.
 * Used by: index.html, newsfeed.html, reports.html
 *
 * Chart types: bar, line, donut, network, hbar, timeline
 */

const ChartPreviews = (function() {
    // Color palettes for variety
    const colorPalettes = {
        primary: ['#3b82f6', '#60a5fa', '#93c5fd', '#2563eb', '#1d4ed8'],
        warm: ['#ef4444', '#f59e0b', '#f97316', '#dc2626', '#ea580c'],
        cool: ['#06b6d4', '#0ea5e9', '#14b8a6', '#0891b2', '#0284c7'],
        success: ['#10b981', '#22c55e', '#34d399', '#059669', '#16a34a'],
        mixed: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#06b6d4']
    };

    // Normalize data to fit within min/max bounds
    function normalizeData(data, minHeight = 15, maxHeight = 95) {
        if (!data || data.length === 0) return data;
        const max = Math.max(...data);
        const min = Math.min(...data);
        if (max === min) return data.map(() => (minHeight + maxHeight) / 2);
        return data.map(v => minHeight + ((v - min) / (max - min)) * (maxHeight - minHeight));
    }

    // Get palette based on color
    function getPalette(color) {
        if (color === '#ef4444') return colorPalettes.warm;
        if (color === '#10b981') return colorPalettes.success;
        if (color === '#06b6d4') return colorPalettes.cool;
        return colorPalettes.primary;
    }

    // Bar chart (vertical bars)
    function generateBarChart(color, data) {
        const rawBars = data || Array.from({ length: 8 }, () => Math.random() * 80 + 20);
        const bars = normalizeData(rawBars, 20, 95);
        const colors = Array.isArray(color) ? color : getPalette(color);

        return `<div class="chart-container"><div class="chart-bars">${bars.map((h, i) =>
            `<div class="bar" style="height: ${h}%; background: ${colors[i % colors.length]};"></div>`
        ).join('')}</div></div>`;
    }

    // Line chart with gradient fill
    function generateLineChart(color, data) {
        const rawPoints = data || Array.from({ length: 6 }, () => 20 + Math.random() * 60);
        const pointsData = normalizeData(rawPoints, 15, 85);
        const step = 100 / (pointsData.length - 1);
        const points = pointsData.map((y, i) => ({ x: i * step, y }));
        const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${100 - p.y}`).join(' ');
        const areaD = pathD + ` L 100 100 L 0 100 Z`;
        const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

        return `<div class="chart-container"><div class="chart-line">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:${color};stop-opacity:0.4" />
                        <stop offset="100%" style="stop-color:${color};stop-opacity:0.05" />
                    </linearGradient>
                </defs>
                <path class="area" d="${areaD}" fill="url(#${gradientId})"/>
                <path d="${pathD}" stroke="${color}" stroke-width="3"/>
            </svg>
        </div></div>`;
    }

    // Donut/Pie chart - supports multi-segment data arrays
    function generateDonutChart(data, color, colors) {
        const circumference = 2 * Math.PI * 40;

        // Handle both single percentage (legacy) and array data
        if (typeof data === 'number') {
            // Legacy single-percentage mode
            const offset = circumference * (1 - data / 100);
            const bgColor = 'rgba(100, 116, 139, 0.2)';
            return `<div class="chart-container" style="justify-content: center; align-items: center;">
                <div class="chart-donut">
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="${bgColor}" stroke-width="12"/>
                        <circle cx="50" cy="50" r="40" stroke="${color}"
                            stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-width="12"/>
                    </svg>
                    <span class="donut-label">${data}%</span>
                </div>
            </div>`;
        }

        // Multi-segment donut chart
        const dataArray = Array.isArray(data) ? data : [50, 50];
        const total = dataArray.reduce((a, b) => a + b, 0);
        const defaultColors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#06b6d4'];
        const segmentColors = colors && colors.length > 0 ? colors : defaultColors;

        // Generate SVG path segments for pie/donut
        let segments = [];
        let currentAngle = -90; // Start from top

        dataArray.forEach((value, i) => {
            const percentage = (value / total) * 100;
            const angle = (percentage / 100) * 360;
            const segmentColor = segmentColors[i % segmentColors.length];

            // Calculate arc path
            const startAngle = currentAngle * (Math.PI / 180);
            const endAngle = (currentAngle + angle) * (Math.PI / 180);

            const x1 = 50 + 40 * Math.cos(startAngle);
            const y1 = 50 + 40 * Math.sin(startAngle);
            const x2 = 50 + 40 * Math.cos(endAngle);
            const y2 = 50 + 40 * Math.sin(endAngle);

            const largeArc = angle > 180 ? 1 : 0;

            // Create arc segment using stroke-dasharray trick for donut
            const segmentLength = (percentage / 100) * circumference;
            const segmentOffset = ((currentAngle + 90) / 360) * circumference;

            segments.push(`<circle cx="50" cy="50" r="40"
                stroke="${segmentColor}" stroke-width="12" fill="none"
                stroke-dasharray="${segmentLength} ${circumference - segmentLength}"
                stroke-dashoffset="${-segmentOffset}"
                style="transform-origin: center;"/>`);

            currentAngle += angle;
        });

        // Show largest segment percentage in center
        const maxValue = Math.max(...dataArray);
        const maxPercent = Math.round((maxValue / total) * 100);

        return `<div class="chart-container" style="justify-content: center; align-items: center;">
            <div class="chart-donut">
                <svg viewBox="0 0 100 100">
                    ${segments.join('\n                    ')}
                </svg>
                <span class="donut-label">${maxPercent}%</span>
            </div>
        </div>`;
    }

    // Network graph with nodes and connections
    function generateNetworkChart(nodeColor, lineColor, data) {
        const count = (data && data.nodes) ? data.nodes : 10;
        const nodes = Array.from({ length: count }, () => ({
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80,
            size: 5 + Math.random() * 8
        }));

        const nodeColors = [nodeColor, `${nodeColor}cc`, `${nodeColor}99`, `${nodeColor}66`];

        const nodesHTML = nodes.map((n, i) =>
            `<div class="node" style="left: ${n.x}%; top: ${n.y}%; width: ${n.size}px; height: ${n.size}px; background: ${nodeColors[i % nodeColors.length]}; animation-delay: ${i * 0.15}s;"></div>`
        ).join('');

        const linesHTML = nodes.slice(0, Math.floor(count / 2)).map((n, i) => {
            const target = nodes[(i + 3) % nodes.length];
            const dx = target.x - n.x;
            const dy = target.y - n.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            return `<div class="line" style="left: ${n.x}%; top: ${n.y}%; width: ${length}%; transform: rotate(${angle}deg); background: ${lineColor}; opacity: 0.2;"></div>`;
        }).join('');

        return `<div class="chart-container"><div class="chart-network">${linesHTML}${nodesHTML}</div></div>`;
    }

    // Horizontal bar chart with labels
    function generateHBarChart(data, colors, labels) {
        const defaultColors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#06b6d4'];
        const barColors = colors && colors.length > 0 ? colors : defaultColors;

        // Normalize to percentage scale - handle both object and array formats
        const maxVal = Math.max(...data.map(d => typeof d === 'object' ? d.value : d));
        const normalizedData = data.map((d, i) => {
            const value = typeof d === 'object' ? d.value : d;
            const label = typeof d === 'object' ? d.label : (labels && labels[i] ? labels[i] : '');
            return { label, value: (value / maxVal) * 100 };
        });

        return `<div class="chart-container" style="align-items: center;"><div class="chart-hbars">${normalizedData.map((d, i) =>
            `<div class="hbar-row">
                ${d.label ? `<span class="hbar-label">${d.label.replace('\\n', ' ')}</span>` : ''}
                <div class="hbar" style="width: ${d.value}%; background: ${barColors[i % barColors.length]};"></div>
            </div>`
        ).join('')}</div></div>`;
    }

    // Timeline chart with points
    function generateTimelineChart(points, color) {
        const colors = [color, `${color}dd`, `${color}bb`, `${color}99`, `${color}77`];

        return `<div class="chart-container" style="align-items: center;"><div class="chart-timeline">
            <div class="timeline-line" style="background: linear-gradient(90deg, ${color}22 0%, ${color} 50%, ${color}22 100%);">
                ${points.map((p, i) => `<div class="timeline-point" style="left: ${p}%; background: ${colors[i % colors.length]}; box-shadow: 0 0 8px ${colors[i % colors.length]};"></div>`).join('')}
            </div>
        </div></div>`;
    }

    /**
     * Main chart generation function
     * @param {Object} report - Report object from reports-data.js
     * @returns {string} HTML string for the chart preview
     */
    function generateChart(report) {
        if (!report.chart) return generateBarChart('#3b82f6');

        const c = report.chart;
        // Defensive fallback: ensure color exists
        const color = c.color || c.colors?.[0] || '#3b82f6';

        switch (c.type) {
            case 'hbar':
                return generateHBarChart(c.data, c.colors || [color, '#f59e0b', '#3b82f6', '#10b981'], c.labels);
            case 'timeline':
                return generateTimelineChart(c.data, color);
            case 'bar':
                return generateBarChart(color, c.data);
            case 'donut':
                return generateDonutChart(c.data, color, c.colors);
            case 'network':
                return generateNetworkChart(color, color, c.data);
            case 'line':
                return generateLineChart(color, c.data);
            default:
                return generateBarChart('#3b82f6');
        }
    }

    // Public API
    return {
        generateChart,
        generateBarChart,
        generateLineChart,
        generateDonutChart,
        generateNetworkChart,
        generateHBarChart,
        generateTimelineChart,
        colorPalettes,
        normalizeData
    };
})();

// Support CommonJS modules (for Node.js testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChartPreviews;
}
