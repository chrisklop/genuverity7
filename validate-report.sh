#!/bin/bash

# GenuVerity Report Validator
# Usage: ./validate-report.sh localreports/your-report.html

FILE=$1

if [ -z "$FILE" ]; then
    echo "❌ Usage: ./validate-report.sh <path-to-html-file>"
    exit 1
fi

if [ ! -f "$FILE" ]; then
    echo "❌ File not found: $FILE"
    exit 1
fi

# Pre-validation checks for critical architectural components
# These checks cause immediate exit if failed, as they indicate fundamental structural issues.

# Check for Google Fonts (Crimson Pro as a representative standard font)
if ! grep -q "family=Crimson+Pro" "$FILE"; then
    echo "❌ FAIL: Missing Standard Font Pack (e.g., Crimson Pro) in $FILE"
    echo "   Must include: <link href='...family=Crimson+Pro...' rel='stylesheet'>"
    exit 1
fi

# Check for standard navigation header
if ! grep -qE 'class="navbar"|class="nav-header"' "$FILE"; then
    echo "❌ FAIL: Invalid Header Structure in $FILE"
    echo "   Must use standard <nav class='navbar'> or <nav class='nav-header'> component."
    exit 1
fi

echo "🔍 Validating $FILE..."
ERRORS=0

# 1. Check for Interactive Citations ID format (id="source-N")
if ! grep -q 'id="source-1"' "$FILE"; then
    echo "❌ FAIL: Missing 'source-1' ID. Sources must use id=\"source-N\" format."
    ((ERRORS++))
fi

# 2. Check for Citation Links (highlightSource function)
if ! grep -q "highlightSource(" "$FILE"; then
    echo "❌ FAIL: Missing interactive citation calls (highlightSource)."
    ((ERRORS++))
fi

# 3. Check for Copy Image Class
if ! grep -q "copyable-section" "$FILE"; then
    echo "❌ FAIL: Missing 'copyable-section' class. Executive Summary/Charts must be copyable."
    ((ERRORS++))
fi

# 4. Check for html2canvas dependency
if ! grep -q "html2canvas.min.js" "$FILE"; then
    echo "❌ FAIL: Missing html2canvas dependency."
    ((ERRORS++))
fi

# 5. Check for copyable-sections.js dependency
if ! grep -q "copyable-sections.js" "$FILE"; then
    echo "❌ FAIL: Missing copyable-sections.js dependency."
    ((ERRORS++))
fi

# 6. Check for Sources Sidebar
if ! grep -q "sources-sidebar" "$FILE"; then
    echo "❌ FAIL: Missing 'sources-sidebar' class."
    ((ERRORS++))
fi

# 7. Check for unique IDs (Basic check for duplicate source IDs)
DUPLICATES=$(grep -o 'id="source-[0-9]*"' "$FILE" | sort | uniq -d)
if [ ! -z "$DUPLICATES" ]; then
    echo "❌ FAIL: Duplicate source IDs found:"
    echo "$DUPLICATES"
    ((ERRORS++))
fi

if [ $ERRORS -eq 0 ]; then
    echo "✅ PASS: Report meets all architectural standards."
    exit 0
else
    echo "🚨 FAILED: $ERRORS critical errors found."
    exit 1
fi
