#!/usr/bin/env python3
"""
Fix chart height issues in report HTML files.
Wraps canvas elements in height-constrained divs.

Pattern to fix:
  <canvas id="someChart" height="220"></canvas>

Fixed to:
  <div style="height: 280px; position: relative;">
      <canvas id="someChart"></canvas>
  </div>
"""

import re
import sys
from pathlib import Path

def fix_chart_heights(filepath):
    """Fix canvas elements to be wrapped in height-constrained divs."""
    content = Path(filepath).read_text()
    original = content

    # Pattern: <canvas id="XChart" height="N"></canvas>
    # where it's NOT already inside a height-constrained div
    pattern = r'(<canvas\s+id="([^"]+Chart)")\s+height="(\d+)"(></canvas>)'

    def replace_canvas(match):
        canvas_start = match.group(1)  # <canvas id="XChart"
        chart_id = match.group(2)      # XChart
        height = match.group(3)        # 220
        canvas_end = match.group(4)    # ></canvas>

        # Use 280px as standard height (or original if larger)
        new_height = max(int(height), 280)

        return f'<div style="height: {new_height}px; position: relative;">\n                            {canvas_start}{canvas_end}\n                        </div>'

    content = re.sub(pattern, replace_canvas, content)

    if content != original:
        Path(filepath).write_text(content)
        return True
    return False

def main():
    if len(sys.argv) < 2:
        print("Usage: fix-chart-heights.py <file1.html> [file2.html ...]")
        sys.exit(1)

    fixed_count = 0
    for filepath in sys.argv[1:]:
        if fix_chart_heights(filepath):
            print(f"Fixed: {filepath}")
            fixed_count += 1

    print(f"\nTotal fixed: {fixed_count} files")

if __name__ == "__main__":
    main()
