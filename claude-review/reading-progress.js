/**
 * GenuVerity Reading Progress Bar
 * Auto-injects into any page with a .nav-header element
 *
 * Usage: Just add <script src="../js/reading-progress.js"></script> to the page
 */

(function() {
    'use strict';

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = `
        .nav-header,
        .navbar {
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .reading-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            background: linear-gradient(90deg, #3b82f6, #06b6d4);
            width: 0%;
            transition: width 0.1s ease-out;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    // Wait for DOM
    document.addEventListener('DOMContentLoaded', function() {
        // Support both .nav-header (reports) and .navbar (landing page)
        const navHeader = document.querySelector('.nav-header') || document.querySelector('.navbar');
        if (!navHeader) return;

        // Create and inject progress bar element
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        navHeader.appendChild(progressBar);

        // Update on scroll
        function updateProgress() {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) {
                progressBar.style.width = '100%';
                return;
            }
            const scrolled = window.scrollY;
            const progress = Math.min((scrolled / docHeight) * 100, 100);
            progressBar.style.width = progress + '%';
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress(); // Initial call
    });
})();
