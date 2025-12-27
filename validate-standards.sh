#!/bin/bash
# GenuVerity Report Standards Validation Script
# Validates that a report meets all architectural standards

set -e

FILE="$1"

if [ -z "$FILE" ]; then
    echo "Usage: ./validate-standards.sh <report-file.html>"
    exit 1
fi

if [ ! -f "$FILE" ]; then
    echo "❌ ERROR: File not found: $FILE"
    exit 1
fi

echo "🔍 Validating standards compliance for: $FILE"
echo ""

ERRORS=0

# Check 1: Footer placeholder exists
if ! grep -q 'id="footer-placeholder"' "$FILE"; then
    echo "❌ FAIL: Missing <div id=\"footer-placeholder\"></div>"
    ((ERRORS++))
else
    echo "✅ PASS: Footer placeholder present"
fi

# Check 2: Navbar placeholder exists
if ! grep -q 'id="navbar-placeholder"' "$FILE"; then
    echo "❌ FAIL: Missing <div id=\"navbar-placeholder\"></div>"
    ((ERRORS++))
else
    echo "✅ PASS: Navbar placeholder present"
fi

# Check 3: shared-components.js is loaded with defer
if ! grep -q 'shared-components.js.*defer' "$FILE"; then
    echo "❌ FAIL: shared-components.js missing or not deferred"
    ((ERRORS++))
else
    echo "✅ PASS: shared-components.js loaded correctly"
fi

# Check 4: shared-components.css is linked
if ! grep -q 'shared-components.css' "$FILE"; then
    echo "❌ FAIL: Missing shared-components.css stylesheet"
    ((ERRORS++))
else
    echo "✅ PASS: shared-components.css linked"
fi

# Check 5: Footer placeholder is in correct position (before </body>)
BODY_CLOSE_LINE=$(grep -n '</body>' "$FILE" | head -1 | cut -d: -f1)
FOOTER_LINE=$(grep -n 'footer-placeholder' "$FILE" | head -1 | cut -d: -f1)

if [ -n "$FOOTER_LINE" ] && [ -n "$BODY_CLOSE_LINE" ]; then
    if [ "$FOOTER_LINE" -ge "$BODY_CLOSE_LINE" ]; then
        echo "❌ FAIL: Footer placeholder must be BEFORE </body> tag"
        ((ERRORS++))
    else
        # Check it's not inside a script tag
        LAST_SCRIPT_CLOSE=$(grep -n '</script>' "$FILE" | tail -1 | cut -d: -f1)
        if [ "$FOOTER_LINE" -lt "$LAST_SCRIPT_CLOSE" ]; then
            echo "❌ FAIL: Footer placeholder appears to be inside <script> tags"
            ((ERRORS++))
        else
            echo "✅ PASS: Footer placeholder correctly positioned"
        fi
    fi
fi

echo ""
if [ $ERRORS -eq 0 ]; then
    echo "✅ ALL CHECKS PASSED: Report meets standards"
    exit 0
else
    echo "❌ VALIDATION FAILED: $ERRORS error(s) found"
    exit 1
fi
