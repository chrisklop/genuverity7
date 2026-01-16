/**
 * Unified Chart Preview Module for GenuVerity v2.0
 * Clean Minimal Style - Matching chart-defaults.js v5.0
 *
 * This module generates mini-chart previews for report cards.
 * Used by: index.html, newsfeed.html, reports.html
 *
 * Design Philosophy:
 * - Clean, minimal aesthetic
 * - Generous border radius
 * - Smooth gradients and curves
 * - No clutter, just beautiful data
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

    // Bar chart (vertical bars) - Clean minimal style
    // Now supports grouped bars via datasets parameter
    function generateBarChart(color, data, datasets) {
        // If we have multiple datasets, render as grouped bar chart
        if (datasets && datasets.length > 1) {
            return generateGroupedBarChart(datasets);
        }

        const rawBars = data || Array.from({ length: 6 }, () => Math.random() * 80 + 20);
        const bars = normalizeData(rawBars, 20, 95);
        const singleColor = Array.isArray(color) ? color[0] : color;
        const barWidth = Math.min(12, 80 / bars.length);

        return `<div class="chart-container"><div class="chart-bars" style="gap: ${Math.max(4, 8 - bars.length)}px;">${bars.map((h) =>
            `<div class="bar" style="height: ${h}%; background: ${singleColor}; border-radius: 6px; min-width: ${barWidth}px;"></div>`
        ).join('')}</div></div>`;
    }

    // Grouped bar chart for multi-dataset comparisons
    function generateGroupedBarChart(datasets) {
        if (!datasets || datasets.length < 2) return generateBarChart('#3b82f6');

        const numGroups = datasets[0].data.length;
        const numSeries = datasets.length;

        // Find max across all datasets for normalization
        const allValues = datasets.flatMap(ds => ds.data);
        const maxVal = Math.max(...allValues);
        const minVal = Math.min(...allValues);

        // Generate grouped bars
        const groupGap = 8;
        const barGap = 2;
        const groupWidth = 100 / numGroups;

        let barsHTML = '';

        for (let g = 0; g < numGroups; g++) {
            const groupLeft = g * groupWidth;
            const barWidth = (groupWidth - groupGap) / numSeries - barGap;

            for (let s = 0; s < numSeries; s++) {
                const value = datasets[s].data[g];
                const normalizedHeight = 15 + ((value - minVal) / (maxVal - minVal)) * 80;
                const barLeft = groupLeft + (groupGap / 2) + s * (barWidth + barGap);
                const barColor = datasets[s].color || ['#3b82f6', '#ef4444', '#10b981'][s % 3];

                barsHTML += `<div class="bar" style="
                    position: absolute;
                    left: ${barLeft}%;
                    bottom: 0;
                    width: ${barWidth}%;
                    height: ${normalizedHeight}%;
                    background: ${barColor};
                    border-radius: 4px 4px 0 0;
                "></div>`;
            }
        }

        return `<div class="chart-container">
            <div class="chart-bars" style="position: relative; height: 100%; width: 100%;">
                ${barsHTML}
            </div>
        </div>`;
    }

    // Line chart with smooth gradient fill - Clean minimal style
    function generateLineChart(color, data) {
        const rawPoints = data || Array.from({ length: 6 }, () => 20 + Math.random() * 60);
        const pointsData = normalizeData(rawPoints, 15, 85);
        const step = 100 / (pointsData.length - 1);
        const points = pointsData.map((y, i) => ({ x: i * step, y }));

        // Generate smooth bezier curve path
        const pathD = generateSmoothPath(points);
        const areaD = pathD + ` L 100 100 L 0 100 Z`;
        const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

        return `<div class="chart-container"><div class="chart-line">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:${color};stop-opacity:0.4" />
                        <stop offset="50%" style="stop-color:${color};stop-opacity:0.15" />
                        <stop offset="100%" style="stop-color:${color};stop-opacity:0" />
                    </linearGradient>
                </defs>
                <path class="area" d="${areaD}" fill="url(#${gradientId})"/>
                <path d="${pathD}" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div></div>`;
    }

    // Generate smooth bezier curve path for line charts
    function generateSmoothPath(points) {
        if (points.length < 2) return '';

        let path = `M ${points[0].x} ${100 - points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[Math.max(0, i - 1)];
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = points[Math.min(points.length - 1, i + 2)];

            // Catmull-Rom to Bezier conversion
            const tension = 0.3;
            const cp1x = p1.x + (p2.x - p0.x) * tension;
            const cp1y = 100 - (p1.y + (p2.y - p0.y) * tension);
            const cp2x = p2.x - (p3.x - p1.x) * tension;
            const cp2y = 100 - (p2.y - (p3.y - p1.y) * tension);

            path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${100 - p2.y}`;
        }

        return path;
    }

    // Donut/Pie chart - Clean minimal style with larger cutout
    function generateDonutChart(data, color, colors) {
        const circumference = 2 * Math.PI * 38; // Slightly smaller radius for thicker ring appearance

        // Handle both single percentage (legacy) and array data
        if (typeof data === 'number') {
            // Legacy single-percentage mode
            const offset = circumference * (1 - data / 100);
            const bgColor = 'rgba(100, 116, 139, 0.15)';
            return `<div class="chart-container" style="justify-content: center; align-items: center;">
                <div class="chart-donut">
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" stroke="${bgColor}" stroke-width="14" fill="none"/>
                        <circle cx="50" cy="50" r="38" stroke="${color}"
                            stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
                            stroke-width="14" fill="none" stroke-linecap="round"
                            style="transform: rotate(-90deg); transform-origin: center;"/>
                    </svg>
                    <span class="donut-label">${data}%</span>
                </div>
            </div>`;
        }

        // Multi-segment donut chart
        const dataArray = Array.isArray(data) ? data : [50, 50];
        const total = dataArray.reduce((a, b) => a + b, 0);
        const defaultColors = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
        const segmentColors = colors && colors.length > 0 ? colors : defaultColors;

        // Generate SVG segments
        let segments = [];
        let currentAngle = -90;

        dataArray.forEach((value, i) => {
            const percentage = (value / total) * 100;
            const angle = (percentage / 100) * 360;
            const segmentColor = segmentColors[i % segmentColors.length];
            const segmentLength = (percentage / 100) * circumference;
            const segmentOffset = ((currentAngle + 90) / 360) * circumference;

            // Add small gap between segments for cleaner look
            const gap = 2;
            const adjustedLength = Math.max(0, segmentLength - gap);

            segments.push(`<circle cx="50" cy="50" r="38"
                stroke="${segmentColor}" stroke-width="14" fill="none"
                stroke-dasharray="${adjustedLength} ${circumference - adjustedLength}"
                stroke-dashoffset="${-segmentOffset - gap/2}"
                stroke-linecap="round"
                style="transform-origin: center;"/>`);

            currentAngle += angle;
        });

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

    // Network graph with nodes and connections - Refined style
    function generateNetworkChart(nodeColor, lineColor, data) {
        const count = (data && data.nodes) ? data.nodes : 10;
        const nodes = Array.from({ length: count }, () => ({
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80,
            size: 6 + Math.random() * 6
        }));

        const nodeColors = [nodeColor, `${nodeColor}dd`, `${nodeColor}bb`, `${nodeColor}99`];

        const nodesHTML = nodes.map((n, i) =>
            `<div class="node" style="left: ${n.x}%; top: ${n.y}%; width: ${n.size}px; height: ${n.size}px; background: ${nodeColors[i % nodeColors.length]}; box-shadow: 0 0 12px ${nodeColors[i % nodeColors.length]}; animation-delay: ${i * 0.15}s;"></div>`
        ).join('');

        const linesHTML = nodes.slice(0, Math.floor(count / 2)).map((n, i) => {
            const target = nodes[(i + 3) % nodes.length];
            const dx = target.x - n.x;
            const dy = target.y - n.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            return `<div class="line" style="left: ${n.x}%; top: ${n.y}%; width: ${length}%; transform: rotate(${angle}deg); background: linear-gradient(90deg, ${lineColor}40, ${lineColor}15); height: 2px; border-radius: 1px;"></div>`;
        }).join('');

        return `<div class="chart-container"><div class="chart-network">${linesHTML}${nodesHTML}</div></div>`;
    }

    // Horizontal bar chart - Clean minimal style
    function generateHBarChart(data, colors, labels) {
        const defaultColors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#06b6d4'];
        const barColors = colors && colors.length > 0 ? colors : defaultColors;

        // Normalize to percentage scale
        const maxVal = Math.max(...data.map(d => typeof d === 'object' ? d.value : d));
        const normalizedData = data.map((d, i) => {
            const value = typeof d === 'object' ? d.value : d;
            const label = typeof d === 'object' ? d.label : (labels && labels[i] ? labels[i] : '');
            return { label, value: Math.max(8, (value / maxVal) * 100) }; // Min 8% for visibility
        });

        const barHeight = Math.min(24, 70 / normalizedData.length);

        return `<div class="chart-container" style="align-items: center; padding: 8px 0;"><div class="chart-hbars" style="gap: ${Math.max(6, 12 - normalizedData.length * 2)}px;">${normalizedData.map((d, i) =>
            `<div class="hbar-row" style="height: ${barHeight}px;">
                <div class="hbar" style="width: ${d.value}%; background: ${barColors[i % barColors.length]}; border-radius: 6px; height: 100%;"></div>
            </div>`
        ).join('')}</div></div>`;
    }

    // Timeline chart with points - Refined style
    function generateTimelineChart(points, color) {
        const colors = [color, `${color}dd`, `${color}bb`, `${color}99`, `${color}77`];

        return `<div class="chart-container" style="align-items: center;"><div class="chart-timeline">
            <div class="timeline-line" style="background: linear-gradient(90deg, transparent 0%, ${color}30 10%, ${color}50 50%, ${color}30 90%, transparent 100%); height: 3px; border-radius: 2px;">
                ${points.map((p, i) => `<div class="timeline-point" style="left: ${p}%; background: ${colors[i % colors.length]}; box-shadow: 0 0 10px ${colors[i % colors.length]}; width: 10px; height: 10px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2);"></div>`).join('')}
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
        const color = c.color || c.colors?.[0] || '#3b82f6';

        switch (c.type) {
            case 'hbar':
                return generateHBarChart(c.data, c.colors || [color, '#f59e0b', '#3b82f6', '#10b981'], c.labels);
            case 'timeline':
                return generateTimelineChart(c.data, color);
            case 'bar':
                // Pass datasets for grouped bar chart support
                return generateBarChart(color, c.data, c.datasets);
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
        generateGroupedBarChart,
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
