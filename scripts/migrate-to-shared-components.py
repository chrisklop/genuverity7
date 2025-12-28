#!/usr/bin/env python3
"""
migrate-to-shared-components.py
Migrates legacy reports to use shared components by:
1. Adding placeholders for navbar/footer
2. Adding shared component links
3. Removing hardcoded navbar/footer HTML
"""

import re
import sys
from pathlib import Path

def migrate_report(file_path):
    """Migrate a legacy report to use shared components."""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes = []
    
    # Step 1: Add shared component CSS if missing
    if 'shared-components.css' not in content:
        # Find the </head> tag and add link before it
        head_close = content.find('</head>')
        if head_close != -1:
            css_link = '    <link rel="stylesheet" href="../css/shared-components.css?v=3.0">\n'
            content = content[:head_close] + css_link + content[head_close:]
            changes.append("Added shared-components.css link")
    
    # Step 2: Add shared component JS if missing
    if 'shared-components.js' not in content:
        # Find the </body> tag and add script before it
        body_close = content.rfind('</body>')
        if body_close != -1:
            js_script = '    <script src="../js/shared-components.js?v=3.0"></script>\n'
            content = content[:body_close] + js_script + content[body_close:]
            changes.append("Added shared-components.js script")
    
    # Step 3: Replace hardcoded navbar with placeholder
    if 'navbar-placeholder' not in content:
        # Find the navbar element
        navbar_pattern = r'<nav[^>]*class="navbar"[^>]*>.*?</nav>'
        navbar_match = re.search(navbar_pattern, content, re.DOTALL)
        
        if navbar_match:
            placeholder = '<div id="navbar-placeholder"></div>'
            content = content[:navbar_match.start()] + placeholder + content[navbar_match.end():]
            changes.append("Replaced hardcoded navbar with placeholder")
    
    # Step 4: Replace hardcoded footer with placeholder  
    if 'footer-placeholder' not in content:
        # Find the footer element
        footer_pattern = r'<footer[^>]*class="footer"[^>]*>.*?</footer>'
        footer_match = re.search(footer_pattern, content, re.DOTALL)
        
        if footer_match:
            placeholder = '<div id="footer-placeholder"></div>'
            content = content[:footer_match.start()] + placeholder + content[footer_match.end():]
            changes.append("Replaced hardcoded footer with placeholder")
    
    # Only write if changes were made
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes
    
    return False, []

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 migrate-to-shared-components.py <file1.html> [file2.html] ...")
        sys.exit(1)
    
    total_files = 0
    migrated_files = 0
    
    for file_arg in sys.argv[1:]:
        file_path = Path(file_arg)
        
        if not file_path.exists():
            print("File not found: {}".format(file_path))
            continue
        
        total_files += 1
        print("\nMigrating: {}".format(file_path.name))
        
        migrated, changes = migrate_report(file_path)
        
        if migrated:
            migrated_files += 1
            print("Migrated successfully:")
            for change in changes:
                print("   - {}".format(change))
        else:
            print("Already using shared components")
    
    print("\n" + "="*60)
    print("Summary: {}/{} files migrated".format(migrated_files, total_files))
    print("="*60)

if __name__ == "__main__":
    main()
