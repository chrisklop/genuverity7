/**
 * GenuVerity Chart.js Watermark Plugin
 * Auto-registers with Chart.js to add GenuVerity branding to all charts
 *
 * Usage: Just add <script src="../js/chart-watermark.js"></script> after Chart.js
 */

(function() {
    'use strict';

    // Wait for Chart.js to be available
    if (typeof Chart === 'undefined') {
        console.warn('[GenuVerity] Chart.js not found. Watermark plugin not registered.');
        return;
    }

    const genuVerityWatermark = {
        id: 'genuVerityWatermark',
        afterDraw: (chart) => {
            const ctx = chart.ctx;
            const { width } = chart;

            ctx.save();

            // Position: top-right corner
            const x = width - 8;
            const y = 16;

            ctx.textAlign = 'right';
            ctx.textBaseline = 'top';
            ctx.font = 'bold 10px Inter, -apple-system, sans-serif';

            // "Genu" in white
            const genuText = 'Genu';
            const verityText = 'Verity';
            const verityWidth = ctx.measureText(verityText).width;

            ctx.fillStyle = '#ffffff';
            ctx.fillText(genuText, x - verityWidth, y);

            // "Verity" in blue
            ctx.fillStyle = '#3b82f6';
            ctx.fillText(verityText, x, y);

            ctx.restore();
        }
    };

    // Register globally
    Chart.register(genuVerityWatermark);
    console.log('[GenuVerity] Chart watermark plugin registered.');
})();
