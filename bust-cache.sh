#!/bin/bash

# CACHE BUSTER 3000
# Updates version query strings for critical JS files to break CDN caching
# Targets: reports-data.js, unified-search.js

# Generate new Build ID (Timestamp)
BUILD_ID=$(date +%s)
echo "🚀 Initiate Cache Busting sequence. Target Build ID: $BUILD_ID"

# Define files to scan
# 1. Root HTML files
# 2. Local Reports
# 3. JavaScript files that might dynamic inject (shared-components.js)
TARGET_FILES="index.html reports.html localreports/*.html js/shared-components.js"

# 1. Update references to reports-data.js
# Pattern: reports-data.js?v=ANYTHING up to literal " or '
echo "  - Updating reports-data.js references..."
sed -i '' "s/reports-data\.js?v=[0-9]*/reports-data.js?v=$BUILD_ID/g" $TARGET_FILES

# 2. Update references to unified-search.js
echo "  - Updating unified-search.js references..."
sed -i '' "s/unified-search\.js?v=[0-9]*/unified-search.js?v=$BUILD_ID/g" $TARGET_FILES

# 3. Update references to shared-components.css and reports.css (Optional but good)
echo "  - Updating CSS references..."
sed -i '' "s/shared-components\.css?v=[0-9]*/shared-components.css?v=$BUILD_ID/g" $TARGET_FILES
sed -i '' "s/reports\.css?v=[0-9]*/reports.css?v=$BUILD_ID/g" $TARGET_FILES

echo "✅ Cache Busting Complete. New Version: $BUILD_ID"
echo "   Files updated. Commit these changes to trigger a fresh deployment."
