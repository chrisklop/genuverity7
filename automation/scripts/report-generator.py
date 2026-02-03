#!/usr/bin/env python3
"""
GenuVerity Report Generator - PASS 2 ONLY

Transforms structured JSON into final HTML reports using golden template.
PASS 1 (JSON extraction) is handled by claude-pass1.py via browser automation.

Usage:
    # Generate HTML from JSON
    python3 report-generator.py --json automation/output/slug.json

    # List completed research ready for processing
    python3 report-generator.py --list

    # Auto-commit after generation
    python3 report-generator.py --json automation/output/slug.json --commit
"""

import argparse
import json
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

GENUVERITY_ROOT = Path.home() / "GenuVerity7"
AUTOMATION_DIR = GENUVERITY_ROOT / "automation"
OUTPUT_DIR = AUTOMATION_DIR / "output"
DOCS_DIR = GENUVERITY_ROOT / "docs"
LOCALREPORTS_DIR = GENUVERITY_ROOT / "localreports"
JS_DIR = GENUVERITY_ROOT / "js"
TEMPLATE_FILE = DOCS_DIR / "report-template-2025.html"
REPORTS_DATA_FILE = JS_DIR / "reports-data.js"


def log(msg: str):
    """Log with timestamp."""
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"[{timestamp}] {msg}")


def list_completed_research():
    """List all completed research ready for report generation."""
    log("Completed research ready for processing:")
    log("-" * 50)

    found = False
    for job_file in OUTPUT_DIR.glob("*-job.json"):
        try:
            job = json.loads(job_file.read_text())
            status = job.get("status", "unknown")
            topic = job.get("topic", "Unknown")
            slug = job.get("slug", "")
            chars = job.get("chars", 0)
            report_gen = job.get("report_generated", False)

            if status == "completed" and not report_gen:
                found = True
                log(f"  • {topic[:50]}")
                log(f"    Slug: {slug}")
                log(f"    Chars: {chars:,}")
                log(f"    Output: {OUTPUT_DIR / f'{slug}.md'}")
                log("")
        except:
            continue

    if not found:
        log("  No completed research found.")
        log("  Run daily-runner.py to start new research.")


def load_research_output(slug: str) -> dict:
    """Load research output files for a given slug."""
    md_file = OUTPUT_DIR / f"{slug}.md"
    job_file = OUTPUT_DIR / f"{slug}-job.json"
    sources_file = OUTPUT_DIR / f"{slug}-sources.json"

    if not md_file.exists():
        log(f"ERROR: Research output not found: {md_file}")
        return None

    result = {
        "slug": slug,
        "content": md_file.read_text(),
        "job": json.loads(job_file.read_text()) if job_file.exists() else {},
        "sources": json.loads(sources_file.read_text()) if sources_file.exists() else {}
    }

    return result


def validate_json_schema(data: dict) -> list:
    """Validate JSON matches expected schema."""
    errors = []

    required_fields = ["meta", "verdict", "sections", "sources"]
    for field in required_fields:
        if field not in data:
            errors.append(f"Missing required field: {field}")

    if "meta" in data:
        meta_fields = ["title", "slug", "category"]
        for field in meta_fields:
            if field not in data["meta"]:
                errors.append(f"Missing meta.{field}")

    if "verdict" in data:
        if data["verdict"].get("label") not in ["TRUE", "FALSE", "MIXED", "UNVERIFIED", "MISLEADING"]:
            errors.append("Invalid verdict.label")

    if "sources" in data:
        if not isinstance(data["sources"], list):
            errors.append("sources must be an array")
        elif len(data["sources"]) == 0:
            errors.append("sources array is empty")

    return errors


def generate_html_from_json(json_data: dict) -> str:
    """PASS 2: Transform JSON into HTML using golden template."""
    if not TEMPLATE_FILE.exists():
        log(f"ERROR: Template not found: {TEMPLATE_FILE}")
        return None

    template = TEMPLATE_FILE.read_text()
    meta = json_data.get("meta", {})
    verdict = json_data.get("verdict", {})

    # Basic placeholder replacements
    replacements = {
        "{{TITLE}}": meta.get("title", "Untitled Report"),
        "{{SLUG}}": meta.get("slug", "untitled"),
        "{{META_DESCRIPTION}}": meta.get("subtitle", ""),
        "{{CATEGORY}}": meta.get("category", "ANALYSIS"),
        "{{SUBCATEGORY}}": meta.get("subcategory", "FORENSIC AUDIT"),
        "{{READ_TIME}}": str(meta.get("read_time", 10)),
        "{{PUBLISH_DATE}}": datetime.now().strftime("%Y-%m-%d"),
        "{{KEYWORDS}}": ", ".join([meta.get("title", ""), "fact check", "analysis"]),
        "{{VERDICT_LABEL}}": verdict.get("label", "UNVERIFIED"),
        "{{VERDICT_CLASS}}": verdict.get("class", "mixed"),
        "{{EXECUTIVE_SUMMARY}}": json_data.get("executive_summary", ""),
    }

    html = template
    for placeholder, value in replacements.items():
        html = html.replace(placeholder, str(value))

    # Generate sections HTML
    sections_html = generate_sections_html(json_data.get("sections", []))

    # Generate sources HTML
    sources_html = generate_sources_html(json_data.get("sources", []))
    source_count = len(json_data.get("sources", []))

    # Replace section and source placeholders
    html = html.replace("{{SECTIONS}}", sections_html)
    html = html.replace("{{SOURCES}}", sources_html)
    html = html.replace("{{SOURCE_COUNT}}", str(source_count))

    return html


def generate_sections_html(sections: list) -> str:
    """Generate HTML for report sections."""
    html_parts = []

    for section in sections:
        section_html = f"""
        <section class="report-section">
            <h2>{section.get('number', '')}. {section.get('title', '')}</h2>
        """

        for content in section.get("content", []):
            content_type = content.get("type", "paragraph")

            if content_type == "paragraph":
                section_html += f"<p>{content.get('text', '')}</p>"

            elif content_type == "list":
                section_html += "<ul>"
                for item in content.get("items", []):
                    section_html += f"<li><strong>{item.get('title', '')}</strong>: {item.get('text', '')}</li>"
                section_html += "</ul>"

            elif content_type == "table":
                section_html += "<table><thead><tr>"
                for header in content.get("headers", []):
                    section_html += f"<th>{header}</th>"
                section_html += "</tr></thead><tbody>"
                for row in content.get("rows", []):
                    section_html += "<tr>"
                    for cell in row:
                        section_html += f"<td>{cell}</td>"
                    section_html += "</tr>"
                section_html += "</tbody></table>"

            elif content_type == "alert":
                color = content.get("color", "blue")
                section_html += f"""
                <div class="alert alert-{color}">
                    <strong>{content.get('title', '')}</strong>
                    <p>{content.get('text', '')}</p>
                </div>
                """

        section_html += "</section>"
        html_parts.append(section_html)

    return "\n".join(html_parts)


def generate_sources_html(sources: list) -> str:
    """Generate HTML for sources sidebar."""
    html_parts = []

    for source in sources:
        source_type = source.get("type", "secondary")
        html_parts.append(f"""
        <div class="source-card source-{source_type}">
            <span class="source-number">[{source.get('n', '')}]</span>
            <div class="source-content">
                <a href="{source.get('url', '#')}" target="_blank" rel="noopener">
                    {source.get('title', 'Source')}
                </a>
                <span class="source-publisher">{source.get('publisher', '')}</span>
            </div>
        </div>
        """)

    return "\n".join(html_parts)


def update_reports_data(json_data: dict) -> bool:
    """Update js/reports-data.js with new report entry - AUTOMATED."""
    if not REPORTS_DATA_FILE.exists():
        log(f"WARNING: reports-data.js not found: {REPORTS_DATA_FILE}")
        return False

    meta = json_data.get("meta", {})
    verdict = json_data.get("verdict", {})
    slug = meta.get("slug", "")

    # Read current file
    content = REPORTS_DATA_FILE.read_text()

    # Check if this report already exists
    if f'slug: "{slug}"' in content or f"slug: '{slug}'" in content:
        log(f"Report {slug} already exists in reports-data.js")
        return True

    # Escape quotes for JS
    title_escaped = meta.get('title', '').replace('"', '\\"')
    summary_escaped = json_data.get('executive_summary', '')[:200].replace('"', '\\"')

    new_entry = f'''{{
    id: 0,
    title: "{title_escaped}",
    slug: "{slug}",
    category: "{meta.get('category', 'ANALYSIS')}",
    subcategory: "{meta.get('subcategory', '')}",
    date: "{datetime.now().strftime('%Y-%m-%d')}",
    readTime: "{meta.get('read_time', 10)} min",
    verdict: "{verdict.get('label', 'UNVERIFIED')}",
    verdictClass: "{verdict.get('class', 'mixed')}",
    summary: "{summary_escaped}",
    chart: {{
        type: "bar",
        color: "#3b82f6",
        data: [20, 40, 60, 80]
    }}
}}'''

    # Find REPORTS_DATA array and insert at top
    # Pattern: const REPORTS_DATA = [
    pattern = r'(const\s+REPORTS_DATA\s*=\s*\[)'

    if not re.search(pattern, content):
        log("ERROR: Could not find REPORTS_DATA array")
        return False

    # Insert new entry after opening bracket
    new_content = re.sub(pattern, f'\\1\n{new_entry},', content)

    # Increment all existing IDs
    def increment_id(match):
        old_id = int(match.group(1))
        return f'id: {old_id + 1}'

    # Only increment IDs that come after our new entry (id: 0)
    # Split at our new entry and only modify the rest
    parts = new_content.split(new_entry, 1)
    if len(parts) == 2:
        rest = re.sub(r'id:\s*(\d+)', increment_id, parts[1])
        new_content = parts[0] + new_entry + rest

    REPORTS_DATA_FILE.write_text(new_content)
    log(f"Updated reports-data.js with new entry (id: 0)")
    return True


def save_report(html: str, slug: str):
    """Save generated report to localreports folder."""
    LOCALREPORTS_DIR.mkdir(parents=True, exist_ok=True)
    output_file = LOCALREPORTS_DIR / f"{slug}.html"
    output_file.write_text(html)
    log(f"Report saved: {output_file}")
    return output_file


def mark_report_generated(slug: str):
    """Mark job file as report generated."""
    job_file = OUTPUT_DIR / f"{slug}-job.json"
    if job_file.exists():
        job = json.loads(job_file.read_text())
        job["report_generated"] = True
        job["report_date"] = datetime.now().isoformat()
        job_file.write_text(json.dumps(job, indent=2))


def git_commit_report(slug: str, title: str) -> bool:
    """Commit the generated report to a feature branch."""
    import os
    os.chdir(GENUVERITY_ROOT)

    try:
        # Create feature branch name
        today = datetime.now().strftime("%Y-%m-%d")
        branch_name = f"report/{slug}"

        # Check current branch
        result = subprocess.run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            capture_output=True, text=True
        )
        current_branch = result.stdout.strip()
        log(f"Current branch: {current_branch}")

        # Create and checkout feature branch (or switch if exists)
        subprocess.run(["git", "checkout", "-B", branch_name], capture_output=True)
        log(f"Switched to branch: {branch_name}")

        # Stage only allowed files
        report_file = LOCALREPORTS_DIR / f"{slug}.html"
        if report_file.exists():
            subprocess.run(["git", "add", str(report_file)], capture_output=True)

        subprocess.run(["git", "add", str(REPORTS_DATA_FILE)], capture_output=True)

        # Check if there are changes to commit
        result = subprocess.run(
            ["git", "diff", "--cached", "--quiet"],
            capture_output=True
        )

        if result.returncode == 0:
            log("No changes to commit")
            return True

        # Commit with descriptive message
        commit_msg = f"Add report: {title}\n\nAutomated report generation for: {slug}\nGenerated: {datetime.now().isoformat()}"
        subprocess.run(
            ["git", "commit", "-m", commit_msg],
            capture_output=True
        )
        log(f"Committed changes to {branch_name}")

        return True

    except Exception as e:
        log(f"Git commit error: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description="GenuVerity Report Generator - PASS 2")
    parser.add_argument("--json", help="Process from JSON file")
    parser.add_argument("--slug", help="Process by slug (looks for {slug}.json)")
    parser.add_argument("--list", action="store_true", help="List completed research")
    parser.add_argument("--commit", action="store_true", help="Auto-commit to feature branch")

    args = parser.parse_args()

    if args.list:
        list_completed_research()
        return

    # Determine JSON file path
    json_file = None
    if args.json:
        json_file = Path(args.json)
    elif args.slug:
        json_file = OUTPUT_DIR / f"{args.slug}.json"

    if not json_file:
        parser.print_help()
        return

    if not json_file.exists():
        log(f"ERROR: JSON file not found: {json_file}")
        log("Run claude-pass1.py first to generate JSON from research.")
        sys.exit(1)

    log(f"Loading JSON: {json_file}")
    json_data = json.loads(json_file.read_text())

    # Validate
    errors = validate_json_schema(json_data)
    if errors:
        log("JSON validation errors:")
        for err in errors:
            log(f"  • {err}")
        sys.exit(1)

    log("JSON validated successfully")

    # Generate HTML
    log("Generating HTML from template...")
    html = generate_html_from_json(json_data)

    if not html:
        log("ERROR: HTML generation failed")
        sys.exit(1)

    slug = json_data.get("meta", {}).get("slug", "report")
    title = json_data.get("meta", {}).get("title", "Untitled Report")

    output_file = save_report(html, slug)
    update_reports_data(json_data)
    mark_report_generated(slug)

    log("")
    log("=" * 50)
    log("PASS 2 COMPLETE - HTML Generated")
    log("=" * 50)
    log(f"HTML: {output_file}")

    # Auto-commit if requested
    if args.commit:
        log("")
        log("Committing to feature branch...")
        if git_commit_report(slug, title):
            log("✓ Report committed successfully")
            log(f"  Branch: report/{slug}")
        else:
            log("✗ Git commit failed")
            sys.exit(1)
    else:
        log("")
        log("To commit manually:")
        log(f"  git checkout -B report/{slug}")
        log(f"  git add localreports/{slug}.html js/reports-data.js")
        log(f"  git commit -m 'Add report: {title}'")


if __name__ == "__main__":
    main()
