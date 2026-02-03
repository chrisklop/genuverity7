#!/usr/bin/env python3
"""
GenuVerity Report Generator

Transforms research output into final HTML reports using the two-pass system:
- PASS 1: Raw research → Structured JSON
- PASS 2: JSON → HTML using golden template

Usage:
    # Process research output (manual JSON extraction)
    python3 report-generator.py --slug flat-earth-resurgence-feb-2026

    # Process with pre-generated JSON (PASS 2 only)
    python3 report-generator.py --json report-data.json

    # List completed research ready for processing
    python3 report-generator.py --list
"""

import argparse
import json
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from shutil import copy2

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


def generate_pass1_instructions(research: dict) -> str:
    """Generate instructions for PASS 1 (Claude extracts JSON)."""
    content = research.get("content", "")
    job = research.get("job", {})
    topic = job.get("topic", "Unknown Topic")

    instructions = f"""
================================================================================
PASS 1: Extract Structured JSON from Research
================================================================================

TOPIC: {topic}
SLUG: {research['slug']}
CONTENT LENGTH: {len(content):,} characters

INSTRUCTIONS:
1. Copy the research content below
2. Paste into Claude with this prompt:

---BEGIN PROMPT---
You are doing PASS 1 of the GenuVerity report pipeline.

Convert this research into the structured JSON format. Output ONLY valid JSON.

RESEARCH CONTENT:
{content[:50000]}  {"[TRUNCATED]" if len(content) > 50000 else ""}
---END PROMPT---

3. Save Claude's JSON output to: automation/output/{research['slug']}.json
4. Then run: python3 report-generator.py --json automation/output/{research['slug']}.json

================================================================================
"""
    return instructions


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


def update_reports_data(json_data: dict):
    """Update js/reports-data.js with new report entry."""
    if not REPORTS_DATA_FILE.exists():
        log(f"WARNING: reports-data.js not found: {REPORTS_DATA_FILE}")
        return

    meta = json_data.get("meta", {})
    verdict = json_data.get("verdict", {})

    new_entry = {
        "id": 0,
        "title": meta.get("title", ""),
        "slug": meta.get("slug", ""),
        "category": meta.get("category", "ANALYSIS"),
        "subcategory": meta.get("subcategory", ""),
        "date": datetime.now().strftime("%Y-%m-%d"),
        "readTime": f"{meta.get('read_time', 10)} min",
        "verdict": verdict.get("label", "UNVERIFIED"),
        "verdictClass": verdict.get("class", "mixed"),
        "summary": json_data.get("executive_summary", "")[:200],
        "chart": {
            "type": "bar",
            "color": "#3b82f6",
            "data": [20, 40, 60, 80]
        }
    }

    log(f"New reports-data.js entry prepared:")
    log(json.dumps(new_entry, indent=2))
    log("")
    log("MANUAL STEP REQUIRED:")
    log(f"1. Open {REPORTS_DATA_FILE}")
    log("2. Add entry above to TOP of REPORTS_DATA array")
    log("3. Increment ALL existing IDs by +1")


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


def main():
    parser = argparse.ArgumentParser(description="GenuVerity Report Generator")
    parser.add_argument("--slug", help="Process research by slug")
    parser.add_argument("--json", help="Process from JSON file (PASS 2 only)")
    parser.add_argument("--list", action="store_true", help="List completed research")

    args = parser.parse_args()

    if args.list:
        list_completed_research()
        return

    if args.json:
        # PASS 2 only - JSON to HTML
        json_file = Path(args.json)
        if not json_file.exists():
            log(f"ERROR: JSON file not found: {json_file}")
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

        if html:
            slug = json_data.get("meta", {}).get("slug", "report")
            output_file = save_report(html, slug)
            update_reports_data(json_data)
            mark_report_generated(slug)

            log("")
            log("=" * 50)
            log("REPORT GENERATION COMPLETE")
            log("=" * 50)
            log(f"HTML: {output_file}")
            log("")
            log("NEXT STEPS:")
            log("1. Review the generated HTML")
            log("2. Update js/reports-data.js (see above)")
            log("3. Commit changes:")
            log(f"   git add localreports/{slug}.html js/reports-data.js")
            log("   git commit -m 'Add report: {title}'")

        return

    if args.slug:
        # Full pipeline - load research and show PASS 1 instructions
        research = load_research_output(args.slug)
        if not research:
            sys.exit(1)

        log(f"Loaded research for: {args.slug}")
        log(f"Content: {len(research['content']):,} characters")
        log("")

        # Check if JSON already exists
        json_file = OUTPUT_DIR / f"{args.slug}.json"
        if json_file.exists():
            log(f"Found existing JSON: {json_file}")
            log("Running PASS 2 (JSON → HTML)...")
            # Rerun with JSON
            subprocess.run([sys.executable, __file__, "--json", str(json_file)])
        else:
            # Show PASS 1 instructions
            instructions = generate_pass1_instructions(research)
            print(instructions)

        return

    # No args - show help
    parser.print_help()


if __name__ == "__main__":
    main()
