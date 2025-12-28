#!/usr/bin/env python3
"""
strip-internal-nav-css.py
Automatically removes internal navbar/footer CSS and JS from report HTML files
"""

import re
import sys
from pathlib import Path

def strip_internal_overrides(file_path):
    """Remove internal navbar/footer CSS and JS from an HTML file."""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes_made = []
    
    # Pattern 1: Remove entire <style> blocks that ONLY contain navbar/footer
    style_pattern = r'<style[^>]*>(.*?)</style>'
    
    def check_style_block(match):
        style_content = match.group(1)
        
        # Check if this style block has ONLY navbar/footer/search-progress related CSS
        nav_keywords = ['.navbar', '.footer', 'scroll-progress', '.search-container', 
                       '.navbar-search', '.ss-nav', '.ss-footer', '.navbar-logo',
                       '.navbar-brand', '.hamburger', '.mobile-menu']
        
        # Remove comments for analysis
        cleaned = re.sub(r'/\*.*?\*/', '', style_content, flags=re.DOTALL)
        
        # Count total CSS rules
        total_rules = len(re.findall(r'\{[^}]+\}', cleaned))
        
        # Count navbar/footer rules
        nav_rules = sum(1 for keyword in nav_keywords if keyword in cleaned)
        
        # If more than 80% of rules are navbar/footer, remove entire block
        if total_rules > 0 and nav_rules / total_rules > 0.8:
            changes_made.append("Removed <style> block ({} rules, {} nav/footer)".format(total_rules, nav_rules))
            return ''  # Remove entire block
        
        # Otherwise, selectively remove nav/footer rules
        modified = False
        for keyword in nav_keywords:
            # Remove CSS rules for this keyword
            pattern = r'{keyword}[^{{]*\{{[^}}]*\}}'.format(keyword=re.escape(keyword))
            if re.search(pattern, style_content):
                style_content = re.sub(pattern, '', style_content, flags=re.MULTILINE)
                changes_made.append("Removed {} CSS rules".format(keyword))
                modified = True
        
        # If style block is now mostly empty, remove it
        remaining_content = re.sub(r'\s+', '', style_content)
        if len(remaining_content) < 50:
            changes_made.append("Removed now-empty <style> block")
            return ''
        
        if modified:
            return match.group(0).replace(match.group(1), style_content)
        return match.group(0)
    
    content = re.sub(style_pattern, check_style_block, content, flags=re.DOTALL)
    
    # Pattern 2: Remove scroll event listeners
    script_pattern = r'<script[^>]*>(.*?)</script>'
    
    def check_script_block(match):
        script_content = match.group(1)
        
        # Check if script has scroll-progress logic
        if 'scroll-progress' in script_content or "addEventListener('scroll'" in script_content:
            # Check if it's ONLY scroll-progress (not other important logic)
            if 'scroll-progress' in script_content and len(script_content.strip()) < 1000:
                changes_made.append("Removed scroll-progress script")
                return ''
        
        return match.group(0)
    
    content = re.sub(script_pattern, check_script_block, content, flags=re.DOTALL)
    
    # Only write if changes were made
    if content != original_content:
        with open(file_path, 'w', encoding=' utf-8') as f:
            f.write(content)
        return True, changes_made
    
    return False, []

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 strip-internal-nav-css.py <file1.html> [file2.html] ...")
        sys.exit(1)
    
    total_files = 0
    modified_files = 0
    
    for file_arg in sys.argv[1:]:
        file_path = Path(file_arg)
        
        if not file_path.exists():
            print("File not found: {}".format(file_path))
            continue
        
        total_files += 1
        print("\nProcessing: {}".format(file_path.name))
        
        modified, changes = strip_internal_overrides(file_path)
        
        if modified:
            modified_files += 1
            print("Modified - Changes made:")
            for change in changes:
                print("   - {}".format(change))
        else:
            print("No changes needed")
    
    print("\n" + "="*60)
    print("Summary: {}/{} files modified".format(modified_files, total_files))
    print("="*60)

if __name__ == "__main__":
    main()
