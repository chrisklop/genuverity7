/**
 * GenuVerity Chart Defaults v5.0 - Clean Minimal Style
 * Centralized Chart.js configuration for all reports
 *
 * Design Philosophy:
 * - No gridlines or axis labels (data speaks for itself)
 * - Generous border radius (8px)
 * - No legends (rely on tooltips and context)
 * - Gradient fills for area/line charts
 * - Smooth curves and animations
 *
 * This script registers GLOBAL Chart.js defaults, so ALL charts
 * created with `new Chart()` will automatically use the clean style.
 *
 * Usage:
 *   <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
 *   <script src="../js/chart-defaults.js"></script>
 *   <!-- Now any new Chart() will use clean defaults -->
 */

const GV_CHART_DEFAULTS = {
    // Color palette
    colors: {
        primary: '#3b82f6',    // Blue
        secondary: '#06b6d4',  // Cyan
        success: '#10b981',    // Green
        warning: '#f59e0b',    // Amber
        danger: '#ef4444',     // Red
        muted: '#64748b',      // Muted text
        background: '#0f172a', // Card background
        tooltipBg: 'rgba(15, 23, 42, 0.95)'
    },

    // Typography
    fontFamily: "'Inter', system-ui, sans-serif"
};

/**
 * Register Chart.js global defaults
 * This makes ALL charts use the clean minimal style automatically
 */
function registerChartDefaults() {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded. GenuVerity defaults not applied.');
        return;
    }

    // Global font
    Chart.defaults.font.family = GV_CHART_DEFAULTS.fontFamily;
    Chart.defaults.font.size = 12;
    Chart.defaults.color = '#94a3b8';

    // Animation
    Chart.defaults.animation.duration = 750;
    Chart.defaults.animation.easing = 'easeOutQuart';

    // === PLUGINS ===

    // Legend - HIDDEN by default
    Chart.defaults.plugins.legend.display = false;

    // Datalabels plugin - HIDDEN by default (enabled during copy for donut/pie)
    // Only configure if plugin is loaded
    if (typeof ChartDataLabels !== 'undefined') {
        Chart.register(ChartDataLabels);
        Chart.defaults.plugins.datalabels = {
            display: false,  // Hidden by default
            color: '#e2e8f0',
            font: { weight: 'bold', size: 11 },
            anchor: 'center',
            align: 'center'
        };
    }

    // Tooltip - Clean dark style
    Chart.defaults.plugins.tooltip.enabled = true;
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(15, 23, 42, 0.95)';
    Chart.defaults.plugins.tooltip.titleColor = '#ffffff';
    Chart.defaults.plugins.tooltip.bodyColor = '#94a3b8';
    Chart.defaults.plugins.tooltip.borderColor = 'rgba(255, 255, 255, 0.1)';
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.padding = 12;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.plugins.tooltip.displayColors = true;
    Chart.defaults.plugins.tooltip.boxPadding = 4;
    Chart.defaults.plugins.tooltip.titleFont = { weight: 600, size: 13 };
    Chart.defaults.plugins.tooltip.bodyFont = { size: 12 };

    // === SCALES ===

    // Hide all scales by default (clean look)
    Chart.defaults.scales.linear.display = false;
    Chart.defaults.scales.linear.beginAtZero = true;
    Chart.defaults.scales.category.display = false;

    // If scales ARE shown (e.g., during copy), use dark theme styling
    Chart.defaults.scales.linear.grid = { display: false };
    Chart.defaults.scales.linear.ticks = {
        display: false,
        color: '#94a3b8',       // Muted text for axis labels
        font: { size: 11 }
    };
    Chart.defaults.scales.category.grid = { display: false };
    Chart.defaults.scales.category.ticks = {
        display: false,
        color: '#94a3b8',       // Muted text for axis labels
        font: { size: 11 }
    };

    // Legend styling for when enabled during copy
    Chart.defaults.plugins.legend.labels = {
        color: '#e2e8f0',       // Light text for legend
        font: { size: 12 },
        padding: 16,
        boxWidth: 16,
        boxHeight: 16,
        useBorderRadius: true,
        borderRadius: 4
    };

    // === ELEMENTS ===

    // Bar elements - rounded corners
    Chart.defaults.elements.bar.borderRadius = 8;
    Chart.defaults.elements.bar.borderSkipped = false;

    // Line elements - smooth curves, no points
    Chart.defaults.elements.line.tension = 0.4;
    Chart.defaults.elements.line.borderWidth = 3;
    Chart.defaults.elements.line.fill = true;

    // Point elements - hidden by default, show on hover
    Chart.defaults.elements.point.radius = 0;
    Chart.defaults.elements.point.hoverRadius = 6;
    Chart.defaults.elements.point.hoverBorderWidth = 2;
    Chart.defaults.elements.point.hoverBorderColor = '#ffffff';

    // Arc elements (donut/pie) - clean borders
    Chart.defaults.elements.arc.borderWidth = 3;
    Chart.defaults.elements.arc.borderColor = '#0a0a0f';
    Chart.defaults.elements.arc.hoverOffset = 8;

    // === TYPE-SPECIFIC DEFAULTS ===

    // Doughnut - larger cutout for ring look
    if (Chart.overrides && Chart.overrides.doughnut) {
        Chart.overrides.doughnut.cutout = '70%';
    }

    // Interaction - better hover behavior
    Chart.defaults.interaction.intersect = false;
    Chart.defaults.interaction.mode = 'index';

    // Responsive
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;

    console.log('GenuVerity Chart Defaults v5.0 applied');
}

/**
 * Plugin that tracks Chart.js instances on their canvas elements
 * This allows copyable-sections.js to access and modify charts when copying
 */
const GVInstanceTracker = {
    id: 'gvInstanceTracker',
    afterInit(chart) {
        // Store chart instance on canvas for copy system access
        chart.canvas.__chartInstance = chart;
    }
};

/**
 * Plugin that enforces clean style on ALL charts
 * This overrides any inline options that conflict with our design
 */
const GVCleanStylePlugin = {
    id: 'gvCleanStyle',
    beforeInit(chart) {
        // Force clean scale settings
        if (chart.config.options.scales) {
            Object.keys(chart.config.options.scales).forEach(scaleId => {
                const scale = chart.config.options.scales[scaleId];
                // Hide grid and ticks
                scale.grid = { display: false };
                scale.ticks = { display: false };
                scale.border = { display: false };
            });
        }

        // Force legend hidden (unless explicitly needed)
        if (chart.config.options.plugins?.legend) {
            // Only keep legend if it's a multi-dataset chart that really needs it
            const datasets = chart.config.data?.datasets || [];
            if (datasets.length <= 1) {
                chart.config.options.plugins.legend.display = false;
            }
        }
    },
    beforeUpdate(chart) {
        // Ensure bar elements have rounded corners
        if (chart.config.type === 'bar') {
            chart.config.data.datasets.forEach(dataset => {
                if (!dataset.borderRadius || dataset.borderRadius < 6) {
                    dataset.borderRadius = 8;
                }
            });
        }

        // Ensure doughnut has larger cutout
        if (chart.config.type === 'doughnut') {
            chart.config.options.cutout = chart.config.options.cutout || '70%';
        }
    }
};

// Register defaults and plugins immediately if Chart.js is loaded
if (typeof Chart !== 'undefined') {
    registerChartDefaults();
    Chart.register(GVInstanceTracker);
    Chart.register(GVCleanStylePlugin);
} else {
    // Wait for Chart.js to load
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof Chart !== 'undefined') {
            registerChartDefaults();
            Chart.register(GVInstanceTracker);
            Chart.register(GVCleanStylePlugin);
        }
    });
}

/**
 * Create a gradient for line/area charts
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {string} color - Base color (hex)
 * @param {number} height - Canvas height
 * @returns {CanvasGradient}
 */
function createGVGradient(ctx, color, height = 300) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, hexToRgba(color, 0.35));
    gradient.addColorStop(0.5, hexToRgba(color, 0.15));
    gradient.addColorStop(1, hexToRgba(color, 0));
    return gradient;
}

/**
 * Create a GenuVerity-styled chart (optional helper)
 * @param {CanvasRenderingContext2D|HTMLCanvasElement} ctx - Canvas context or element
 * @param {string} type - Chart type ('line', 'bar', 'doughnut', etc.)
 * @param {Object} data - Chart.js data object
 * @param {Object} customOptions - Optional custom options to merge
 * @returns {Chart} Chart.js instance
 */
function createGVChart(ctx, type, data, customOptions = {}) {
    // Get context if canvas element passed
    let canvasCtx = ctx;
    if (ctx instanceof HTMLCanvasElement) {
        canvasCtx = ctx.getContext('2d');
    }

    // With global defaults registered, we just create the chart
    // Custom options will override defaults as needed
    return new Chart(canvasCtx, {
        type,
        data,
        options: customOptions
    });
}

/**
 * Convert hex color to rgba
 */
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Export for use in modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GV_CHART_DEFAULTS, createGVChart, createGVGradient, hexToRgba, registerChartDefaults };
}
