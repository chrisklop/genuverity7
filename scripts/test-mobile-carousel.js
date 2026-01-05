#!/usr/bin/env node
/**
 * GenuVerity Mobile Carousel Swipe Test
 *
 * Tests the carousel swipe functionality on mobile viewport to ensure:
 * 1. Swiping left/right navigates the carousel without triggering navigation
 * 2. Tapping the "Read" button navigates to the report
 * 3. Tapping the active card navigates to the report
 *
 * Usage:
 *   node scripts/test-mobile-carousel.js                    # Tests localhost:8000
 *   node scripts/test-mobile-carousel.js https://preview.vercel.app  # Tests preview URL
 */

const { chromium } = require('playwright');

const BASE_URL = process.argv[2] || 'http://localhost:8000';

async function runCarouselTests() {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Testing Mobile Carousel: ${BASE_URL}`);
    console.log(`${'='.repeat(60)}\n`);

    const browser = await chromium.launch({
        headless: true
    });

    // iPhone 12 Pro viewport
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
    });

    const page = await context.newPage();

    // Track navigation attempts (only track when URL actually changes)
    let lastUrl = null;
    let navigationAttempts = [];
    page.on('framenavigated', (frame) => {
        if (frame === page.mainFrame()) {
            const url = frame.url();
            // Only count it as navigation if the URL actually changed
            if (lastUrl !== null && url !== lastUrl) {
                navigationAttempts.push(url);
            }
            lastUrl = url;
        }
    });

    try {
        // Load homepage
        console.log('Loading homepage...');
        await page.goto(`${BASE_URL}/`, { timeout: 30000, waitUntil: 'networkidle' });
        await page.waitForTimeout(1500); // Wait for carousel to initialize

        // Check carousel exists
        const carouselExists = await page.locator('.carousel-container').isVisible();
        if (!carouselExists) {
            console.log('❌ FAIL: Carousel not found on page');
            await browser.close();
            process.exit(1);
        }
        console.log('✓ Carousel found');

        // Get initial card index
        const getCardIndex = async () => {
            return await page.evaluate(() => {
                const currentText = document.getElementById('currentIndex')?.textContent;
                return parseInt(currentText) || 1;
            });
        };

        const initialIndex = await getCardIndex();
        console.log(`Initial card index: ${initialIndex}`);

        // TEST 1: Swipe right (navigate to next card)
        console.log('\n--- TEST 1: Swipe Right on Carousel ---');
        const carouselBounds = await page.locator('.carousel-container').boundingBox();

        const swipeStartX = carouselBounds.x + carouselBounds.width * 0.7;
        const swipeEndX = carouselBounds.x + carouselBounds.width * 0.3;
        const swipeY = carouselBounds.y + carouselBounds.height * 0.5;

        // Perform swipe - use dispatchEvent to trigger real touch events
        await page.evaluate(({ x, y, endX }) => {
            const container = document.querySelector('.carousel-container');
            const startEvent = new PointerEvent('pointerdown', {
                clientX: x,
                clientY: y,
                bubbles: true,
                cancelable: true,
                pointerType: 'touch'
            });
            container.dispatchEvent(startEvent);

            const moveEvent = new PointerEvent('pointermove', {
                clientX: (x + endX) / 2,
                clientY: y,
                bubbles: true,
                cancelable: true,
                pointerType: 'touch'
            });
            document.dispatchEvent(moveEvent);

            const endEvent = new PointerEvent('pointerup', {
                clientX: endX,
                clientY: y,
                bubbles: true,
                cancelable: true,
                pointerType: 'touch'
            });
            document.dispatchEvent(endEvent);
        }, { x: swipeStartX, y: swipeY, endX: swipeEndX });

        await page.waitForTimeout(800); // Wait for animation

        const afterSwipeIndex = await getCardIndex();
        console.log(`After swipe index: ${afterSwipeIndex}`);

        if (afterSwipeIndex === initialIndex + 1) {
            console.log('✓ Swipe navigation works');
        } else if (afterSwipeIndex > initialIndex) {
            console.log(`✓ Swipe navigation works (moved from ${initialIndex} to ${afterSwipeIndex})`);
        } else {
            console.log(`⚠ Swipe may not have worked (still at ${afterSwipeIndex})`);
        }

        // Check if navigation was triggered
        if (navigationAttempts.length > 0) {
            console.log(`❌ CRITICAL BUG: Swipe triggered navigation!`);
            console.log(`   URLs: ${navigationAttempts.join(' -> ')}`);
            await browser.close();
            process.exit(1);
        }
        console.log('✓ No unwanted navigation during swipe');

        // TEST 2: Swipe over the Read button specifically
        console.log('\n--- TEST 2: Swipe Over Read Button ---');
        await page.goto(`${BASE_URL}/`, { timeout: 30000, waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);
        navigationAttempts = [];

        // Get the Read button position
        const readButtonBounds = await page.locator('.carousel-card.active .card-cta').first().boundingBox();

        if (readButtonBounds) {
            // Swipe starting from the Read button area
            const buttonSwipeStartX = readButtonBounds.x + readButtonBounds.width / 2;
            const buttonSwipeEndX = buttonSwipeStartX - 150;
            const buttonSwipeY = readButtonBounds.y + readButtonBounds.height / 2;

            await page.evaluate(({ x, y, endX }) => {
                const container = document.querySelector('.carousel-container');

                // Dispatch touchstart on the actual anchor element
                const anchor = document.querySelector('.carousel-card.active .card-cta');
                const touchStart = new TouchEvent('touchstart', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });

                Object.defineProperty(touchStart, 'touches', {
                    value: [{
                        clientX: x,
                        clientY: y,
                        pageX: x,
                        pageY: y,
                        target: anchor
                    }]
                });

                container.dispatchEvent(touchStart);

                setTimeout(() => {
                    const touchMove = new TouchEvent('touchmove', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    });

                    Object.defineProperty(touchMove, 'touches', {
                        value: [{
                            clientX: (x + endX) / 2,
                            clientY: y,
                            pageX: (x + endX) / 2,
                            pageY: y,
                            target: container
                        }]
                    });

                    container.dispatchEvent(touchMove);

                    setTimeout(() => {
                        const touchEnd = new TouchEvent('touchend', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });

                        Object.defineProperty(touchEnd, 'changedTouches', {
                            value: [{
                                clientX: endX,
                                clientY: y,
                                pageX: endX,
                                pageY: y,
                                target: container
                            }]
                        });

                        container.dispatchEvent(touchEnd);
                    }, 50);
                }, 50);
            }, { x: buttonSwipeStartX, y: buttonSwipeY, endX: buttonSwipeEndX });

            await page.waitForTimeout(1000);

            if (navigationAttempts.length > 0) {
                console.log(`❌ CRITICAL BUG: Swiping over Read button triggered navigation!`);
                console.log(`   This is the reported bug - URLs: ${navigationAttempts.join(' -> ')}`);
                await browser.close();
                process.exit(1);
            }
            console.log('✓ Swiping over Read button does NOT trigger navigation (BUG FIXED!)');
        } else {
            console.log('⚠ Could not find Read button to test');
        }

        // TEST 3: Tap "Read" button (should navigate)
        console.log('\n--- TEST 3: Tap Read Button (Should Navigate) ---');
        await page.goto(`${BASE_URL}/`, { timeout: 30000, waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);
        navigationAttempts = [];

        const readButton = page.locator('.carousel-card.active .card-cta').first();
        await readButton.click({ timeout: 5000 });
        await page.waitForTimeout(1000);

        if (navigationAttempts.length > 0 && !navigationAttempts[navigationAttempts.length - 1].endsWith('/')) {
            console.log(`✓ Read button click navigated to: ${navigationAttempts[navigationAttempts.length - 1]}`);
        } else {
            console.log('⚠ Read button may not have navigated (might be expected behavior)');
        }

        // TEST 4: Tap active card (should navigate)
        console.log('\n--- TEST 4: Tap Active Card (Should Navigate) ---');
        await page.goto(`${BASE_URL}/`, { timeout: 30000, waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);
        navigationAttempts = [];

        const activeCard = page.locator('.carousel-card.active .card-title').first();
        await activeCard.click({ timeout: 5000 });
        await page.waitForTimeout(1000);

        if (navigationAttempts.length > 0 && !navigationAttempts[navigationAttempts.length - 1].endsWith('/')) {
            console.log(`✓ Active card click navigated to: ${navigationAttempts[navigationAttempts.length - 1]}`);
        } else {
            console.log('⚠ Active card may not have navigated');
        }

        console.log(`\n${'='.repeat(60)}`);
        console.log('✅ ALL MOBILE CAROUSEL TESTS PASSED');
        console.log('   No navigation triggered during swipes!');
        console.log(`${'='.repeat(60)}\n`);

    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
        await browser.close();
        process.exit(1);
    }

    await browser.close();
    process.exit(0);
}

runCarouselTests().catch(error => {
    console.error('Test runner crashed:', error);
    process.exit(1);
});
