#!/bin/bash
# validate-navbar-consistency.sh
# Validates that a report uses pure shared components without internal overrides

FILE="$1"

if [ -z "$FILE" ]; then
    echo "Usage: $0 <report-file.html>"
    exit 1
fi

if [ ! -f "$FILE" ]; then
    echo "❌ ERROR: File not found: $FILE"
    exit 1
fi

ERRORS=0
WARNINGS=0

# Check for internal navbar CSS
if grep -q "\.navbar\s*{" "$FILE" || grep -q "\.navbar\s*::" "$FILE"; then
    echo "❌ FAIL: $FILE has internal .navbar CSS"
    ERRORS=$((ERRORS + 1))
fi

# Check for scroll-progress code
if grep -q "scroll-progress" "$FILE"; then
    echo "⚠️  WARN: $FILE has internal scroll-progress code (may be OK if commented)"
    WARNINGS=$((WARNINGS + 1))
fi

# Check for footer CSS
if grep -q "\.footer\s*{" "$FILE"; then
    echo "❌ FAIL: $FILE has internal .footer CSS"
    ERRORS=$((ERRORS + 1))
fi

# Check for search container overrides
if grep -q "\.navbar-search-container\s*{" "$FILE"; then
    echo "❌ FAIL: $FILE has internal .navbar-search-container CSS"
    ERRORS=$((ERRORS + 1))
fi

# Check if navbar-placeholder exists
if ! grep -q 'id="navbar-placeholder"' "$FILE"; then
    echo "❌ FAIL: $FILE missing navbar-placeholder"
    ERRORS=$((ERRORS + 1))
fi

# Check if footer-placeholder exists
if ! grep -q 'id="footer-placeholder"' "$FILE"; then
    echo "❌ FAIL: $FILE missing footer-placeholder"
    ERRORS=$((ERRORS + 1))
fi

# Check if shared-components.css is linked
if ! grep -q 'href.*shared-components.css' "$FILE"; then
    echo "❌ FAIL: $FILE not loading shared-components.css"
    ERRORS=$((ERRORS + 1))
fi

# Check if shared-components.js is linked
if ! grep -q 'src.*shared-components.js' "$FILE"; then
    echo "❌ FAIL: $FILE not loading shared-components.js"
    ERRORS=$((ERRORS + 1))
fi

# Report results
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "✅ PASS: $FILE uses pure shared components"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo "⚠️  PASS (with warnings): $FILE"
    exit 0
else
    echo "❌ FAIL: $FILE has $ERRORS error(s) and $WARNINGS warning(s)"
    exit 1
fi
