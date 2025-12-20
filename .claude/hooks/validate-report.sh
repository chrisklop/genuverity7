#!/bin/bash
# GenuVerity Report Validation Script
# Checks for common issues in report HTML files

FILE_PATH="$1"
ERRORS=0
WARNINGS=0

# Skip if not a report file (exclude index.html, reports.html, etc.)
BASENAME=$(basename "$FILE_PATH")
if [[ "$BASENAME" == "index.html" ]] || [[ "$BASENAME" == "reports.html" ]] || [[ "$BASENAME" == "methods.html" ]] || [[ "$BASENAME" == "comparison.html" ]]; then
    exit 0
fi

echo "Validating: $FILE_PATH"

# Check for purple colors (forbidden)
if grep -qi "#8b5cf6\|purple" "$FILE_PATH"; then
    echo "ERROR: Purple color detected (#8b5cf6) - this is forbidden"
    ERRORS=$((ERRORS + 1))
fi

# Check for Wikipedia links (forbidden)
if grep -qi "wikipedia.org" "$FILE_PATH"; then
    echo "ERROR: Wikipedia link detected - use primary sources instead"
    ERRORS=$((ERRORS + 1))
fi

# Check for inline citations (must have target="_blank")
LINKS=$(grep -c 'href="http' "$FILE_PATH" || echo "0")
if [[ "$LINKS" -lt 5 ]]; then
    echo "WARNING: Only $LINKS external links found - reports should have 8+ sources with inline citations"
    WARNINGS=$((WARNINGS + 1))
fi

# Check for Chart.js (most reports should have visualizations)
if ! grep -q "Chart\|chart.js" "$FILE_PATH"; then
    echo "INFO: No Chart.js detected - consider adding visualizations"
fi

# Check for GenuVerity branding
if ! grep -qi "GenuVerity\|genuverity" "$FILE_PATH"; then
    echo "WARNING: No GenuVerity branding detected"
    WARNINGS=$((WARNINGS + 1))
fi

# Summary
echo "---"
echo "Validation complete: $ERRORS errors, $WARNINGS warnings"

if [[ "$ERRORS" -gt 0 ]]; then
    echo "REMINDER: Fix errors before deploying"
    exit 1
fi

exit 0
