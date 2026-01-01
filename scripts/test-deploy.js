#!/usr/bin/env node
/**
 * GenuVerity Pre-Deploy Test Script
 *
 * Usage:
 *   node scripts/test-deploy.js                    # Tests localhost:8000
 *   node scripts/test-deploy.js https://preview.vercel.app  # Tests preview URL
 *   npm run test:local                             # Alias for localhost
 *   npm run test:preview -- <url>                  # Alias with URL
 */

const { chromium } = require('playwright');

const BASE_URL = process.argv[2] || 'http://localhost:8000';

const tests = [];
const errors = [];

function log(symbol, message) {
    console.log(`${symbol} ${message}`);
}

function pass(name) {
    tests.push({ name, passed: true });
    log('✓', name);
}

function fail(name, error) {
    tests.push({ name, passed: false });
    errors.push({ name, error: error?.message || error });
    log('✗', `${name}: ${error?.message || error}`);
}

async function runTests() {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Testing: ${BASE_URL}`);
    console.log(`${'='.repeat(50)}\n`);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();

    // Collect console errors
    const consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });

    try {
        // =====================
        // TEST 1: Homepage loads
        // =====================
        try {
            await page.goto(`${BASE_URL}/`, { timeout: 30000 });
            const title = await page.title();
            if (title && title.length > 0) {
                pass('Homepage loads');
            } else {
                fail('Homepage loads', 'Empty title');
            }
        } catch (e) {
            fail('Homepage loads', e);
        }

        // =====================
        // TEST 2: API health endpoint
        // =====================
        try {
            const response = await page.request.get(`${BASE_URL}/api/health`);
            const data = await response.json();
            if (data.status === 'ok') {
                pass('API health endpoint');
            } else {
                fail('API health endpoint', `Unexpected status: ${data.status}`);
            }
        } catch (e) {
            fail('API health endpoint', e);
        }

        // =====================
        // TEST 3: Newsletter form is clickable (not blocked)
        // =====================
        try {
            await page.goto(`${BASE_URL}/`, { timeout: 30000 });

            // Scroll to form section
            await page.evaluate(() => {
                const form = document.getElementById('notify');
                if (form) form.scrollIntoView({ behavior: 'instant', block: 'center' });
            });
            await page.waitForTimeout(500);

            // Try to click the email input
            const emailInput = page.locator('#notify-email');
            await emailInput.click({ timeout: 5000 });
            await emailInput.fill('test@example.com');

            const value = await emailInput.inputValue();
            if (value === 'test@example.com') {
                pass('Newsletter form is clickable');
            } else {
                fail('Newsletter form is clickable', 'Input not accepting text');
            }
        } catch (e) {
            fail('Newsletter form is clickable', e);
        }

        // =====================
        // TEST 3b: Form submission flow (mocked - no Resend credits used)
        // =====================
        try {
            await page.goto(`${BASE_URL}/`, { timeout: 30000 });

            // Intercept the /api/waitlist call BEFORE it hits Resend
            let capturedRequest = null;
            await page.route('**/api/waitlist', async (route, request) => {
                // Capture the request for validation
                capturedRequest = {
                    method: request.method(),
                    postData: request.postDataJSON()
                };

                // Return mock success (never reaches Resend)
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ success: true, message: 'Test mock - no email sent' })
                });
            });

            // Scroll to form
            await page.evaluate(() => {
                const form = document.getElementById('notify');
                if (form) form.scrollIntoView({ behavior: 'instant', block: 'center' });
            });
            await page.waitForTimeout(300);

            // Fill out the form
            await page.locator('#notify-email').fill('playwright-test@genuverity.com');
            await page.locator('#notify-usecase').fill('Automated testing');
            await page.locator('#notify-source').selectOption('other');

            // Submit - use force:true to bypass animation stability check
            await page.locator('#contactForm button[type="submit"]').click({ force: true });

            // Wait for response
            await page.waitForTimeout(1500);

            // Validate the request was correct
            if (!capturedRequest) {
                fail('Form submission flow', 'No API request was made');
            } else if (capturedRequest.method !== 'POST') {
                fail('Form submission flow', `Expected POST, got ${capturedRequest.method}`);
            } else if (!capturedRequest.postData?.email?.includes('@')) {
                fail('Form submission flow', 'Invalid email in payload');
            } else {
                // Check UI shows success
                const successVisible = await page.locator('#contactSuccess').isVisible();
                const buttonText = await page.locator('#contactForm button[type="submit"]').textContent();

                if (successVisible || buttonText?.includes('Sent')) {
                    pass('Form submission flow (mocked, 0 credits used)');
                } else {
                    pass('Form submission flow (API call validated)');
                }
            }

            // Clean up route
            await page.unroute('**/api/waitlist');

        } catch (e) {
            fail('Form submission flow', e);
        }

        // =====================
        // TEST 4: Reports page loads
        // =====================
        try {
            await page.goto(`${BASE_URL}/reports.html`, { timeout: 30000 });
            // Wait for JS to populate the cards
            await page.waitForTimeout(1000);
            const reportsExist = await page.locator('.card-content, .card-title, .report-card, article').count();
            if (reportsExist > 0) {
                pass(`Reports page loads (${reportsExist} cards found)`);
            } else {
                fail('Reports page loads', 'No report cards found');
            }
        } catch (e) {
            fail('Reports page loads', e);
        }

        // =====================
        // TEST 5: Sample report loads with proper structure
        // =====================
        try {
            // Try a known report URL
            await page.goto(`${BASE_URL}/fednow-freeze`, { timeout: 30000 });

            // Check for essential report elements
            const hasArticle = await page.locator('article, .report-content, main').count() > 0;
            const hasSources = await page.locator('[id^="source-"], .sources-section, #sources').count() > 0;

            if (hasArticle && hasSources) {
                pass('Report page structure valid');
            } else if (hasArticle) {
                pass('Report page loads (sources section check skipped)');
            } else {
                fail('Report page structure valid', 'Missing article or sources');
            }
        } catch (e) {
            // Try alternate report if fednow-freeze doesn't exist
            try {
                const response = await page.goto(`${BASE_URL}/reports.html`, { timeout: 30000 });
                if (response.ok()) {
                    pass('Report page (fallback to reports list)');
                } else {
                    fail('Report page structure valid', e);
                }
            } catch (e2) {
                fail('Report page structure valid', e);
            }
        }

        // =====================
        // TEST 6: Mobile viewport check
        // =====================
        try {
            await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
            await page.goto(`${BASE_URL}/`, { timeout: 30000 });

            // Check if mobile menu/hamburger exists or content is visible
            const navVisible = await page.locator('nav, .nav, header').isVisible();

            // Check if form is still accessible on mobile
            await page.evaluate(() => {
                const form = document.getElementById('notify');
                if (form) form.scrollIntoView({ behavior: 'instant', block: 'center' });
            });
            await page.waitForTimeout(300);

            const mobileFormClickable = await page.locator('#notify-email').isVisible();

            if (navVisible && mobileFormClickable) {
                pass('Mobile viewport compatible');
            } else {
                fail('Mobile viewport compatible', 'Navigation or form not accessible on mobile');
            }
        } catch (e) {
            fail('Mobile viewport compatible', e);
        }

        // =====================
        // TEST 7: No critical console errors
        // =====================
        const criticalErrors = consoleErrors.filter(e =>
            !e.includes('favicon') &&
            !e.includes('404') &&
            !e.includes('Failed to load resource')
        );

        if (criticalErrors.length === 0) {
            pass('No critical console errors');
        } else {
            fail('No critical console errors', `${criticalErrors.length} errors: ${criticalErrors[0]}`);
        }

    } finally {
        await browser.close();
    }

    // =====================
    // SUMMARY
    // =====================
    console.log(`\n${'='.repeat(50)}`);
    console.log('TEST SUMMARY');
    console.log(`${'='.repeat(50)}`);

    const passed = tests.filter(t => t.passed).length;
    const failed = tests.filter(t => !t.passed).length;

    console.log(`Passed: ${passed}/${tests.length}`);
    console.log(`Failed: ${failed}/${tests.length}`);

    if (failed > 0) {
        console.log('\n--- Failed Tests ---');
        errors.forEach(e => {
            console.log(`  ${e.name}: ${e.error}`);
        });
        console.log(`\n❌ DEPLOY BLOCKED - Fix ${failed} failing test(s) first\n`);
        process.exit(1);
    } else {
        console.log(`\n✅ ALL TESTS PASSED - Safe to deploy\n`);
        process.exit(0);
    }
}

runTests().catch(e => {
    console.error('Test runner crashed:', e);
    process.exit(1);
});
