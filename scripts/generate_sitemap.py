import os
import datetime
from pathlib import Path

BASE_URL = "https://genuverity.org"
ROOT_DIR = Path(__file__).parent.parent
REPORTS_DIR = ROOT_DIR / "localreports"
OUTPUT_FILE = ROOT_DIR / "sitemap.xml"

def generate_sitemap():
    urls = []
    
    # Add Homepage (High Priority)
    urls.append({
        "loc": f"{BASE_URL}/",
        "lastmod": datetime.date.today().isoformat(),
        "changefreq": "daily",
        "priority": "1.0"
    })

    # Add Local Reports
    if REPORTS_DIR.exists():
        for file in REPORTS_DIR.glob("*.html"):
            if file.name.startswith("."): continue
            mtime = os.path.getmtime(file)
            lastmod = datetime.date.fromtimestamp(mtime).isoformat()
            urls.append({
                "loc": f"{BASE_URL}/localreports/{file.name}",
                "lastmod": lastmod,
                "changefreq": "weekly",
                "priority": "0.8"
            })

    # Add Root Reports (Legacy/Direct)
    ROOT_REPORTS = [
        "warrior-dividend-analysis.html", "fda-vaccine-memo-fact-check.html",
        "boat-strike-investigation.html", "trump-speech-factcheck.html",
        "mangione-trial-analysis.html", "tiktok-sale-analysis.html",
        "cdc-vaccine-autism.html", "marijuana-rescheduling.html",
        "treasury-leverage.html", "inflation-methodology.html",
        "doppelganger-analysis.html", "network-analysis.html",
        "plaque-fact-check.html"
    ]
    for slug in ROOT_REPORTS:
        file = ROOT_DIR / slug
        if file.exists():
            mtime = os.path.getmtime(file)
            lastmod = datetime.date.fromtimestamp(mtime).isoformat()
            urls.append({
                "loc": f"{BASE_URL}/{slug}",
                "lastmod": lastmod,
                "changefreq": "weekly",
                "priority": "0.7"
            })

    # Generate XML
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]

    for url in urls:
        xml_lines.append('  <url>')
        xml_lines.append(f'    <loc>{url["loc"]}</loc>')
        xml_lines.append(f'    <lastmod>{url["lastmod"]}</lastmod>')
        xml_lines.append(f'    <changefreq>{url["changefreq"]}</changefreq>')
        xml_lines.append(f'    <priority>{url["priority"]}</priority>')
        xml_lines.append('  </url>')

    xml_lines.append('</urlset>')

    with open(OUTPUT_FILE, "w") as f:
        f.write("\n".join(xml_lines))
    
    print(f"✅ Generated sitemap.xml with {len(urls)} URLs")

if __name__ == "__main__":
    generate_sitemap()
