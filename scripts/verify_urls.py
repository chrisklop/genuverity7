#!/usr/bin/env python3
"""
URL Verification Script using Playwright

This script verifies that source URLs are accessible by using a real browser,
which bypasses many bot protection systems (Akamai, Cloudflare, etc.) that
block simple HTTP requests.

Usage:
    python scripts/verify_urls.py [URL]           # Test single URL
    python scripts/verify_urls.py --file FILE     # Test URLs from file (one per line)
    python scripts/verify_urls.py --report FILE   # Scan HTML file for source links

Examples:
    python scripts/verify_urls.py https://www.justice.gov/some-page
    python scripts/verify_urls.py --report doppelganger-analysis.html
"""

import sys
import re
import argparse
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout


def extract_urls_from_html(filepath):
    """Extract all external URLs from an HTML file's source links."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all href attributes in anchor tags
    url_pattern = r'href=["\']?(https?://[^"\'>\s]+)["\']?'
    urls = re.findall(url_pattern, content)

    # Filter to unique URLs, excluding internal links
    unique_urls = list(set(urls))
    # Filter out obvious non-content URLs (fonts, CDNs, etc.)
    filtered = [u for u in unique_urls if not any(x in u for x in [
        'fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.',
        'unpkg.com', 'd3js.org', 'lucide.', 'jsdelivr'
    ])]

    return sorted(filtered)


def verify_url(page, url, timeout=15000):
    """
    Verify a single URL is accessible using Playwright.

    Returns:
        dict: {url, status, title, error}
    """
    result = {
        'url': url,
        'status': None,
        'title': None,
        'error': None,
        'accessible': False
    }

    try:
        response = page.goto(url, timeout=timeout, wait_until='domcontentloaded')

        if response:
            result['status'] = response.status

            # Wait a bit for JS to execute
            page.wait_for_timeout(1000)

            # Get page title
            try:
                result['title'] = page.title()
            except:
                result['title'] = '[Could not get title]'

            # Check for common error indicators
            content = page.content().lower()

            if response.status == 200:
                # Check for soft 404s or error pages
                error_indicators = [
                    'page not found', '404', 'not found',
                    'access denied', 'forbidden', 'error'
                ]
                title_lower = (result['title'] or '').lower()

                if any(ind in title_lower for ind in ['404', 'not found', 'error']):
                    result['error'] = 'Soft 404 detected in title'
                else:
                    result['accessible'] = True
            elif response.status in [301, 302, 303, 307, 308]:
                result['accessible'] = True
                result['error'] = f'Redirect (final page loaded)'
            else:
                result['error'] = f'HTTP {response.status}'

        else:
            result['error'] = 'No response received'

    except PlaywrightTimeout:
        result['error'] = 'Timeout'
    except Exception as e:
        result['error'] = str(e)[:100]

    return result


def main():
    parser = argparse.ArgumentParser(
        description='Verify URLs are accessible using Playwright browser'
    )
    parser.add_argument('url', nargs='?', help='Single URL to verify')
    parser.add_argument('--file', '-f', help='File containing URLs (one per line)')
    parser.add_argument('--report', '-r', help='HTML report file to scan for URLs')
    parser.add_argument('--timeout', '-t', type=int, default=15000,
                        help='Timeout per URL in ms (default: 15000)')

    args = parser.parse_args()

    # Collect URLs to test
    urls = []

    if args.url:
        urls = [args.url]
    elif args.file:
        with open(args.file, 'r') as f:
            urls = [line.strip() for line in f if line.strip() and line.startswith('http')]
    elif args.report:
        urls = extract_urls_from_html(args.report)
        print(f"\nFound {len(urls)} URLs in {args.report}\n")
    else:
        parser.print_help()
        sys.exit(1)

    if not urls:
        print("No URLs to verify")
        sys.exit(1)

    # Verify URLs using Playwright
    print("=" * 60)
    print("URL VERIFICATION REPORT")
    print("=" * 60)

    accessible = []
    failed = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        page = context.new_page()

        for i, url in enumerate(urls, 1):
            print(f"\n[{i}/{len(urls)}] Testing: {url[:70]}...")
            result = verify_url(page, url, args.timeout)

            if result['accessible']:
                status = f"OK ({result['status']})"
                accessible.append(result)
                print(f"  Status: {status}")
                if result['title']:
                    print(f"  Title: {result['title'][:50]}")
            else:
                status = f"FAILED: {result['error']}"
                failed.append(result)
                print(f"  Status: {status}")

        browser.close()

    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Total URLs tested: {len(urls)}")
    print(f"Accessible: {len(accessible)}")
    print(f"Failed: {len(failed)}")

    if failed:
        print("\nFAILED URLs:")
        for r in failed:
            print(f"  - {r['url']}")
            print(f"    Error: {r['error']}")

    # Return exit code based on results
    sys.exit(0 if not failed else 1)


if __name__ == '__main__':
    main()
