import re
import sys

file_path = 'js/reports-data.js'
with open(file_path, 'r') as f:
    content = f.read()

# Pattern to find each object in the array
# We look for { ... id: ... } blocks
pattern = re.compile(r'\{[^{}]*id:\s*\d+.*?\}', re.DOTALL)
matches = pattern.findall(content)

cleaned_matches = []
seen_titles = set()
count = 0

for match in matches:
    # Extract title to check for duplicates
    title_match = re.search(r'title:\s*"(.*?)"', match)
    if title_match:
        title = title_match.group(1)
        if title in seen_titles:
            continue
        seen_titles.add(title)
    
    # Replace id: N with id: count
    new_match = re.sub(r'id:\s*\d+', f'id: {count}', match)
    cleaned_matches.append(new_match)
    count += 1

# Reconstruct the array content
new_array_content = 'const REPORTS_DATA = [\n    ' + ',\n    '.join(cleaned_matches) + '\n];'

# Replace the original array in the content
# We look for const REPORTS_DATA = [ ... ];
final_content = re.sub(r'const REPORTS_DATA = \[.*?\];', new_array_content, content, flags=re.DOTALL)

with open(file_path, 'w') as f:
    f.write(final_content)

print(f"✅ Fixed {count} report entries. Sequential IDs applied.")
