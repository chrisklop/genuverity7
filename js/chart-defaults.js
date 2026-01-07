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
 * Usage:
 *   <script src="../js/chart-defaults.js"></script>
 *   const chart = createGVChart(ctx, 'line', data, customOptions);
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
    fontFamily: "'Inter', system-ui, sans-serif",

    // Clean minimal options - NO gridlines, NO axes, NO legend
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 750,
            easing: 'easeOutQuart'
        },
        plugins: {
            legend: {
                display: false  // No legends - rely on tooltips
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                titleColor: '#ffffff',
                bodyColor: '#94a3b8',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                displayColors: true,
                boxPadding: 4,
                titleFont: {
                    family: "'Inter', system-ui, sans-serif",
                    weight: 600,
                    size: 13
                },
                bodyFont: {
                    family: "'Inter', system-ui, sans-serif",
                    size: 12
                }
            },
            watermark: {
                text: "GenuVerity"
            }
        },
        scales: {
            y: {
                display: false,  // Hide Y axis entirely
                beginAtZero: true
            },
            x: {
                display: false   // Hide X axis entirely
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    },

    // Type-specific defaults
    typeDefaults: {
        bar: {
            borderRadius: 8,
            barThickness: 'flex',
            maxBarThickness: 50,
            borderSkipped: false
        },
        doughnut: {
            cutout: '70%',
            borderWidth: 3,
            hoverOffset: 8,
            borderColor: '#0a0a0f'
        },
        line: {
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: '#ffffff',
            fill: true
        },
        pie: {
            borderWidth: 3,
            hoverOffset: 8,
            borderColor: '#0a0a0f'
        }
    }
};

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
 * Create a GenuVerity-styled chart
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

    // Start with base options
    const baseOptions = JSON.parse(JSON.stringify(GV_CHART_DEFAULTS.options));

    // Add type-specific defaults
    const typeDefaults = GV_CHART_DEFAULTS.typeDefaults[type] || {};

    // Deep merge options
    const mergedOptions = deepMerge(baseOptions, customOptions);

    // Apply default styling to datasets
    if (data.datasets) {
        data.datasets = data.datasets.map((dataset, index) => {
            const defaultColors = [
                GV_CHART_DEFAULTS.colors.primary,
                GV_CHART_DEFAULTS.colors.secondary,
                GV_CHART_DEFAULTS.colors.success,
                GV_CHART_DEFAULTS.colors.warning,
                GV_CHART_DEFAULTS.colors.danger
            ];

            const color = dataset.borderColor || dataset.backgroundColor || defaultColors[index % defaultColors.length];

            // Build dataset with type defaults
            const styledDataset = {
                ...typeDefaults,
                ...dataset
            };

            // Line charts get gradient fill
            if (type === 'line' && !dataset.backgroundColor) {
                styledDataset.backgroundColor = createGVGradient(canvasCtx, color);
                styledDataset.borderColor = color;
                styledDataset.pointHoverBackgroundColor = color;
            }
            // Bar charts get consistent styling
            else if (type === 'bar') {
                styledDataset.borderRadius = dataset.borderRadius || 8;
                styledDataset.backgroundColor = dataset.backgroundColor || color;
            }
            // Doughnut/Pie get proper border
            else if (type === 'doughnut' || type === 'pie') {
                styledDataset.borderColor = dataset.borderColor || '#0a0a0f';
                styledDataset.borderWidth = dataset.borderWidth || 3;
            }

            return styledDataset;
        });
    }

    return new Chart(canvasCtx, {
        type,
        data,
        options: mergedOptions
    });
}

/**
 * Deep merge two objects
 */
function deepMerge(target, source) {
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
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
    module.exports = { GV_CHART_DEFAULTS, createGVChart, createGVGradient, hexToRgba };
}
