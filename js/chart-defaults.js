/**
 * GenuVerity Chart Defaults v4.0
 * Centralized Chart.js configuration for all reports
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
        grid: '#1e293b',       // Dark grid lines
        text: '#cbd5e1',       // Light text
        muted: '#64748b',      // Muted text
        background: '#111827'  // Card background
    },

    // Typography
    fontFamily: "'Inter', system-ui, sans-serif",

    // Standard options applied to all charts
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: {
                    color: '#cbd5e1',
                    font: {
                        family: "'Inter', system-ui, sans-serif",
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#ffffff',
                bodyColor: '#cbd5e1',
                borderColor: '#3b82f6',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                titleFont: {
                    family: "'Inter', system-ui, sans-serif",
                    weight: 600
                },
                bodyFont: {
                    family: "'Inter', system-ui, sans-serif"
                }
            },
            watermark: {
                text: "GenuVerity"
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#1e293b'
                },
                ticks: {
                    color: '#cbd5e1',
                    font: {
                        family: "'Inter', system-ui, sans-serif",
                        size: 11
                    }
                }
            },
            x: {
                grid: {
                    color: '#1e293b',
                    display: false
                },
                ticks: {
                    color: '#cbd5e1',
                    font: {
                        family: "'Inter', system-ui, sans-serif",
                        size: 11
                    }
                }
            }
        }
    }
};

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
    if (ctx instanceof HTMLCanvasElement) {
        ctx = ctx.getContext('2d');
    }

    // Deep merge options
    const mergedOptions = deepMerge(
        JSON.parse(JSON.stringify(GV_CHART_DEFAULTS.options)),
        customOptions
    );

    // Apply default styling to datasets if not specified
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

            return {
                borderWidth: 2,
                tension: 0.4,
                ...dataset,
                borderColor: dataset.borderColor || color,
                backgroundColor: dataset.backgroundColor || (type === 'line' ? hexToRgba(color, 0.1) : color)
            };
        });
    }

    return new Chart(ctx, {
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
    module.exports = { GV_CHART_DEFAULTS, createGVChart };
}
