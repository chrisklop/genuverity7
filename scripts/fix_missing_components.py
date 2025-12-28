import os
import re
import glob

REPORTS_DIR = "localreports"

NAVBAR_PLACEHOLDER = """
    <!-- Shared Navbar Placeholder -->
    <div id="navbar-placeholder" data-page-type="report"></div>
"""

FOOTER_PLACEHOLDER = """
    <!-- Shared Footer Placeholder -->
    <div id="footer-placeholder"></div>
"""

def fix_report(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    modified = False

    # Check/Fix Navbar
    if 'id="navbar-placeholder"' not in new_content:
        # Inject after <body>
        # Regex for <body ...> or <body>
        body_pattern = re.compile(r'(<body[^>]*>)')
        match = body_pattern.search(new_content)
        if match:
            print(f"Injecting Navbar into {filepath}")
            new_content = new_content.replace(match.group(0), match.group(0) + "\n" + NAVBAR_PLACEHOLDER)
            modified = True
        else:
            print(f"CRITICAL: Could not find <body> in {filepath}")

    # Check/Fix Footer
    if 'id="footer-placeholder"' not in new_content:
        # Inject before </body>
        if '</body>' in new_content:
            print(f"Injecting Footer into {filepath}")
            new_content = new_content.replace('</body>', FOOTER_PLACEHOLDER + "\n</body>")
            modified = True
        else:
             print(f"CRITICAL: Could not find </body> in {filepath}")

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {filepath}")

def main():
    files = glob.glob(os.path.join(REPORTS_DIR, "*.html"))
    print(f"Scanning {len(files)} reports for missing placeholders.")
    for f in files:
        fix_report(f)

if __name__ == "__main__":
    main()
