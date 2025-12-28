import os
import re
import glob

REPORTS_DIR = "localreports"
SHARED_ASSETS_snippet = """
    <script src="../js/shared-components.js" defer></script>
    <link rel="stylesheet" href="../css/shared-components.css">
"""

NAVBAR_PLACEHOLDER = """
    <!-- Shared Navbar Placeholder -->
    <div id="navbar-placeholder" data-page-type="report"></div>
"""

FOOTER_PLACEHOLDER = """
    <!-- Shared Footer Placeholder -->
    <div id="footer-placeholder"></div>
"""

def migrate_report(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # create backup
    with open(filepath + ".bak_v2", 'w', encoding='utf-8') as f:
        f.write(content)

    new_content = content
    
    # 1. Inject Shared Assets
    # Try to find a good injection point in <head>
    if "shared-components.js" not in new_content:
        # Inject after Lucide script if present, otherwise before </head>
        if '<script src="https://unpkg.com/lucide@latest"></script>' in new_content:
            new_content = new_content.replace(
                '<script src="https://unpkg.com/lucide@latest"></script>',
                '<script src="https://unpkg.com/lucide@latest"></script>' + SHARED_ASSETS_snippet
            )
        else:
            new_content = new_content.replace('</head>', SHARED_ASSETS_snippet + '\n</head>')

    # 2. Replace Navbar
    # Regex for <nav class="navbar" ... > ... </nav>
    # or <nav class="report-navbar" ...> ... </nav>
    # We use DOTALL to match across lines
    
    navbar_pattern = re.compile(r'<nav class="(navbar|report-navbar)".*?</nav>', re.DOTALL | re.IGNORECASE)
    
    # Check for duplicates
    nav_matches = navbar_pattern.findall(new_content)
    if len(nav_matches) > 1:
        print(f"WARNING: Multiple navbars found in {filepath}. Replacing ALL with placeholder (check manually!).")
    
    if nav_matches:
        new_content = navbar_pattern.sub(NAVBAR_PLACEHOLDER, new_content)
    else:
        print(f"WARNING: No navbar found in {filepath}")

    # 3. Replace Footer
    # Regex for <footer class="footer" ... > ... </footer>
    # or <footer class="report-footer" ... > ... </footer>
    footer_pattern = re.compile(r'<footer class="(footer|report-footer)".*?</footer>', re.DOTALL | re.IGNORECASE)
    
    if footer_pattern.search(new_content):
        new_content = footer_pattern.sub(FOOTER_PLACEHOLDER, new_content)
    else:
        print(f"WARNING: No footer found in {filepath}")

    # 4. Update Lucide Init
    # Look for lucide.createIcons(); inside <script> tags and wrap it
    # We want to avoid double wrapping if running multiple times (though we shouldn't)
    
    # Simple replace for standalone call
    # Note: Regex allows for whitespace around it
    lucide_pattern = re.compile(r'(?<!gv:componentsReady\', \(\) => \{\s\s\s\s\s\s\s\s\s\s\s\s)lucide\.createIcons\(\);')
    
    # Only replace if not already wrapped (heuristic check)
    if "gv:componentsReady" not in new_content:
        new_content = lucide_pattern.sub("window.addEventListener('gv:componentsReady', () => { lucide.createIcons(); });", new_content)


    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Migrated {filepath}")

def main():
    files = glob.glob(os.path.join(REPORTS_DIR, "*.html"))
    print(f"Found {len(files)} reports to migrate.")
    for f in files:
        try:
            migrate_report(f)
        except Exception as e:
            print(f"ERROR migrating {f}: {e}")

if __name__ == "__main__":
    main()
