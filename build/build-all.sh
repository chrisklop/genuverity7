#!/bin/bash
# Build all reports in /localreports/src/ to /localreports/dist/

set -e

echo "🔨 Building all reports..."
echo ""

# Check if src directory exists
if [ ! -d "localreports/src" ]; then
    echo "❌ Error: localreports/src/ directory not found"
    exit 1
fi

# Count reports
REPORT_COUNT=$(find localreports/src -name "*.html" | wc -l | tr -d ' ')

if [ "$REPORT_COUNT" -eq 0 ]; then
    echo "⚠️  No reports found in localreports/src/"
    exit 0
fi

echo "Found $REPORT_COUNT report(s) to build"
echo ""

# Build each report
for src in localreports/src/*.html; do
    if [ -f "$src" ]; then
        filename=$(basename "$src")
        dest="localreports/dist/$filename"
        
        echo "Building: $filename"
        node build/build-report.js "$src" "$dest" --validate
        echo ""
    fi
done

echo "✅ All reports built successfully"
