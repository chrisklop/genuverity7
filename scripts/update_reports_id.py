import re
import json
import sys

# New report to insert
new_report = {
    "id": 0,
    "title": "The Silicon Sleeper Cells: Laptop Farms & The New Digital Front",
    "slug": "localreports/laptop-farms.html",
    "category": "State-Sponsored Fraud",
    "tagClass": "tag-red",
    "catClass": "cat-cyber",
    "icon": "cpu",
    "date": "Dec 23, 2025",
    "sources": "28 Sources",
    "readTime": "22 min",
    "excerpt": "The 'Laptop Farm' has mutated from ad fraud into critical espionage infrastructure. How DPRK and Russian operatives influence US elections from American living rooms.",
    "chart": {
        "type": "line",
        "color": "#ef4444",
        "data": [65, 81, 125, 172, 185, 200]
    }
}

file_path = 'js/reports-data.js'

with open(file_path, 'r') as f:
    content = f.read()

# Start after standard header
start_marker = "const REPORTS_DATA = ["
end_marker = "];"
start_idx = content.find(start_marker)
end_idx = content.rfind(end_marker)

if start_idx == -1: sys.exit(1)

array_content = content[start_idx + len(start_marker):end_idx]

# Increment IDs regex
def increment_ids(text):
    return re.sub(r'id:\s*(\d+)', lambda m: f"id: {int(m.group(1)) + 1}", text)

updated_array_content = increment_ids(array_content)

new_block = f"""
    {{
        id: 0,
        title: "{new_report['title']}",
        slug: "{new_report['slug']}",
        category: "{new_report['category']}",
        tagClass: "{new_report['tagClass']}",
        catClass: "{new_report['catClass']}",
        icon: "{new_report['icon']}",
        date: "{new_report['date']}",
        sources: "{new_report['sources']}",
        readTime: "{new_report['readTime']}",
        excerpt: "{new_report['excerpt']}",
        chart: {{
            type: "{new_report['chart']['type']}",
            color: "{new_report['chart']['color']}",
            data: {new_report['chart']['data']}
        }}
    }},"""

new_content = content[:start_idx + len(start_marker)] + new_block + updated_array_content + content[end_idx:]

with open(file_path, 'w') as f:
    f.write(new_content)
