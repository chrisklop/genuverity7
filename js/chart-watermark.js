/**
 * GenuVerity Chart.js Watermark Plugin
 * Auto-registers with Chart.js to add GenuVerity branding to all charts
 *
 * Usage: Just add <script src="../js/chart-watermark.js"></script> after Chart.js
 */

(function () {
    'use strict';

    // Wait for Chart.js to be available
    if (typeof Chart === 'undefined') {
        console.warn('[GenuVerity] Chart.js not found. Watermark plugin not registered.');
        return;
    }

    // STRICT STYLE GUIDE ENFORCEMENT
    // User Requirement: Use "Inter" for all data visualizations. No "playful" system fonts.
    Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    Chart.defaults.color = '#94a3b8'; // Matches var(--text-muted)
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)'; // Subtle borders

    const genuVerityWatermark = {
        id: 'genuVerityWatermark',
        afterDraw: (chart) => {
            const ctx = chart.ctx;
            const { width, height } = chart;

            ctx.save();

            // Position: bottom-right corner (standard watermark placement)
            // This avoids overlapping chart data which is typically in center/top
            const x = width - 10;
            const y = height - 10;

            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom';
            ctx.font = 'bold 10px Inter, -apple-system, sans-serif';

            // "Genu" in white
            const genuText = 'Genu';
            const verityText = 'Verity';
            const verityWidth = ctx.measureText(verityText).width;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fillText(genuText, x - verityWidth, y);

            // "Verity" in blue
            ctx.fillStyle = 'rgba(59, 130, 246, 0.7)';
            ctx.fillText(verityText, x, y);

            ctx.restore();
        }
    };

    // Register globally
    Chart.register(genuVerityWatermark);
    console.log('[GenuVerity] Chart watermark plugin registered.');
})();
