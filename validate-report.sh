#!/bin/bash
# GenuVerity Report Validation Script v2
# Reports Instance - Run before every commit

set -e

echo "🔍 GenuVerity Report Validation"
echo "================================"
echo ""

REPORT_FILE=$1

if [ -z "$REPORT_FILE" ]; then
    echo "❌ Usage: ./validate-report.sh localreports/your-report.html"
    exit 1
fi

if [ ! -f "$REPORT_FILE" ]; then
    echo "❌ Report file not found: $REPORT_FILE"
    exit 1
fi

ERRORS=0

# 1. Validate JavaScript syntax
echo "1️⃣  Validating js/reports-data.js syntax..."
if node -c js/reports-data.js 2>/dev/null; then
    echo "   ✅ JavaScript syntax valid"
else
    echo "   ❌ JavaScript syntax ERROR in reports-data.js"
    ERRORS=$((ERRORS + 1))
fi

# 2. Verify sequential IDs
echo "2️⃣  Checking sequential IDs..."
IDS=$(grep -n "^\s*id:" js/reports-data.js | head -45 | awk -F: '{print $3}' | tr -d ' ,')
EXPECTED=0
ID_ERROR=0
for ID in $IDS; do
    if [ "$ID" != "$EXPECTED" ]; then
        echo "   ❌ ID sequence broken: expected $EXPECTED, found $ID"
        ID_ERROR=1
        ERRORS=$((ERRORS + 1))
        break
    fi
    EXPECTED=$((EXPECTED + 1))
done
if [ $ID_ERROR -eq 0 ]; then
    echo "   ✅ IDs are sequential ($((EXPECTED)) reports)"
fi

# 3. Check for relative path errors
echo "3️⃣  Checking navbar paths..."
BAD_PATHS=$(grep -E 'href="(index\.html|reports\.html)"' "$REPORT_FILE" | wc -l | tr -d ' ')
if [ "$BAD_PATHS" -gt 0 ]; then
    echo "   ❌ Found $BAD_PATHS instances of href=\"index.html\" or href=\"reports.html\""
    echo "      Must use href=\"../index.html\" and href=\"../reports.html\""
    ERRORS=$((ERRORS + 1))
else
    echo "   ✅ All paths use ../ prefix"
fi

# 4. Check for manual copyable-section classes
echo "4️⃣  Checking copyable-section usage..."
MANUAL_COPYABLE=$(grep -E '<[^>]+class="[^"]*copyable-section' "$REPORT_FILE" | wc -l | tr -d ' ')
if [ "$MANUAL_COPYABLE" -gt 0 ]; then
    echo "   ❌ Found $MANUAL_COPYABLE manual copyable-section classes in HTML elements"
    echo "      Remove these - JavaScript auto-adds the class"
    ERRORS=$((ERRORS + 1))
else
    echo "   ✅ No manual copyable-section classes found"
fi

# 5. Check Chart.js syntax
echo "5️⃣  Checking Chart.js configuration..."
if grep -q "new Chart(" "$REPORT_FILE"; then
    if grep -q "ticks:\s*$" "$REPORT_FILE"; then
        echo "   ❌ Found 'ticks:' without opening brace"
        ERRORS=$((ERRORS + 1))
    elif grep -q "functio n" "$REPORT_FILE"; then
        echo "   ❌ Found typo: 'functio n' instead of 'function'"
        ERRORS=$((ERRORS + 1))
    else
        echo "   ✅ Chart.js configuration looks valid"
    fi
else
    echo "   ℹ️  No charts detected in report"
fi

# 6. Check for inline links
echo "6️⃣  Checking inline links to sources..."
INLINE_LINKS=$(grep -o 'href="https://[^"]*" target="_blank"' "$REPORT_FILE" | wc -l | tr -d ' ')
if [ "$INLINE_LINKS" -lt 8 ]; then
    echo "   ⚠️  Only $INLINE_LINKS inline links found (recommend 8+)"
else
    echo "   ✅ $INLINE_LINKS inline links found"
fi

# 7. CRITICAL: Verify source URLs are accessible
echo "7️⃣  🚨 VERIFYING SOURCE URLs (CRITICAL)..."
BROKEN_URLS=0
TOTAL_URLS=0

while IFS= read -r url; do
    TOTAL_URLS=$((TOTAL_URLS + 1))
    HTTP_CODE=$(curl -o /dev/null -s -w "%{http_code}" -L --max-time 5 "$url" 2>/dev/null || echo "000")
    
    if [ "$HTTP_CODE" != "200" ]; then
        echo "   ❌ BROKEN ($HTTP_CODE): $url"
        BROKEN_URLS=$((BROKEN_URLS + 1))
        ERRORS=$((ERRORS + 1))
    fi
done < <(grep -o 'href="https://[^"]*"' "$REPORT_FILE" | cut -d'"' -f2 | sort -u)

if [ $BROKEN_URLS -eq 0 ]; then
    echo "   ✅ All $TOTAL_URLS unique URLs accessible (HTTP 200)"
else
    echo "   ❌ $BROKEN_URLS of $TOTAL_URLS URLs are broken/inaccessible"
    echo "   🚨 FIX REQUIRED: Replace broken URLs with working primary sources"
fi

# 8. Check for sources banner chevron
echo "8️⃣  Checking sources banner chevron..."
if grep -q 'data-lucide="chevron-down"' "$REPORT_FILE"; then
    echo "   ✅ Chevron icon found in sources banner"
else
    echo "   ❌ Missing chevron icon in sources banner"
    ERRORS=$((ERRORS + 1))
fi

echo ""
echo "================================"
if [ $ERRORS -eq 0 ]; then
    echo "✅ All checks passed! Report is ready to commit."
    exit 0
else
    echo "❌ $ERRORS error(s) found. Fix before committing."
    echo ""
    echo "📌 REMINDER: EVERY source URL must resolve to accessible primary content"
    echo "   NO homepages, NO 404s. Use working news articles if primary source broken."
    exit 1
fi
