"""
Report Validator - Checks reports before deployment.

Validates:
1. All required elements present
2. No Wikipedia links
3. No purple colors
4. All URLs accessible
5. Sources have valid trust scores
"""

import re
import asyncio
import aiohttp
from typing import NamedTuple
from .report_schema import ReportData


class ValidationError(NamedTuple):
    """A validation error."""
    category: str
    message: str
    severity: str  # "error" or "warning"


async def check_url(session: aiohttp.ClientSession, url: str) -> tuple[str, bool, str]:
    """Check if a URL is accessible."""
    try:
        async with session.head(url, timeout=aiohttp.ClientTimeout(total=10), allow_redirects=True) as response:
            if response.status < 400:
                return (url, True, "OK")
            else:
                return (url, False, f"HTTP {response.status}")
    except asyncio.TimeoutError:
        return (url, False, "Timeout")
    except Exception as e:
        return (url, False, str(e)[:50])


async def validate_urls(urls: list[str]) -> list[tuple[str, bool, str]]:
    """Validate multiple URLs in parallel."""
    async with aiohttp.ClientSession() as session:
        tasks = [check_url(session, url) for url in urls]
        return await asyncio.gather(*tasks)


def validate_report(data: ReportData, check_urls: bool = True) -> list[ValidationError]:
    """
    Validate a report before deployment.

    Returns a list of ValidationErrors. Empty list = ready to deploy.
    """
    errors: list[ValidationError] = []

    # === STRUCTURE CHECKS ===

    # Must have at least 3 sources
    if len(data.sources) < 3:
        errors.append(ValidationError(
            "sources",
            f"Only {len(data.sources)} sources. Minimum 3 required.",
            "error"
        ))

    # Must have at least 2 sections
    if len(data.sections) < 2:
        errors.append(ValidationError(
            "content",
            f"Only {len(data.sections)} sections. Minimum 2 required.",
            "error"
        ))

    # Executive summary must have key points
    if len(data.executive_summary.key_points) < 2:
        errors.append(ValidationError(
            "content",
            "Executive summary needs at least 2 key points.",
            "error"
        ))

    # === SOURCE CHECKS ===

    for src in data.sources:
        # No Wikipedia
        if "wikipedia.org" in str(src.url).lower():
            errors.append(ValidationError(
                "sources",
                f"Wikipedia link detected: {src.name}. Use primary sources.",
                "error"
            ))

        # Trust score sanity check
        if src.trust_score > 100 or src.trust_score < 0:
            errors.append(ValidationError(
                "sources",
                f"Invalid trust score {src.trust_score} for {src.name}.",
                "error"
            ))

        # High trust scores only for reputable domains
        reputable_domains = [
            ".gov", ".edu", "reuters.com", "apnews.com", "bbc.com", "bbc.co.uk",
            "nytimes.com", "wsj.com", "washingtonpost.com", "nature.com", "science.org"
        ]
        if src.trust_score >= 95:
            if not any(domain in str(src.url).lower() for domain in reputable_domains):
                errors.append(ValidationError(
                    "sources",
                    f"Trust score {src.trust_score} for {src.domain} seems too high. Reserve 95+ for .gov/.edu/major wire services.",
                    "warning"
                ))

    # === CONTENT CHECKS ===

    # Check for purple colors (FORBIDDEN)
    purple_patterns = [
        r"#8b5cf6",
        r"#7c3aed",
        r"#6d28d9",
        r"rgb\s*\(\s*139\s*,\s*92\s*,\s*246\s*\)",
        r"purple",
    ]

    all_content = str(data.model_dump())
    for pattern in purple_patterns:
        if re.search(pattern, all_content, re.IGNORECASE):
            errors.append(ValidationError(
                "style",
                f"Purple color detected ({pattern}). Purple is forbidden.",
                "error"
            ))

    # Check bottom line is substantial
    if len(data.bottom_line) < 100:
        errors.append(ValidationError(
            "content",
            f"Bottom line is only {len(data.bottom_line)} chars. Should be at least 100.",
            "warning"
        ))

    # Check title length
    if len(data.title) > 100:
        errors.append(ValidationError(
            "metadata",
            f"Title is {len(data.title)} chars. Consider shortening for display.",
            "warning"
        ))

    # === URL ACCESSIBILITY CHECKS ===

    if check_urls:
        urls = [str(src.url) for src in data.sources]
        try:
            results = asyncio.run(validate_urls(urls))
            for url, accessible, reason in results:
                if not accessible:
                    errors.append(ValidationError(
                        "links",
                        f"URL not accessible: {url[:50]}... ({reason})",
                        "error"
                    ))
        except Exception as e:
            errors.append(ValidationError(
                "links",
                f"Could not validate URLs: {e}",
                "warning"
            ))

    # === VERDICT CHECKS (for fact-checks) ===

    if data.verdict:
        if not data.verdict_summary:
            errors.append(ValidationError(
                "verdict",
                "Verdict provided but no verdict_summary.",
                "error"
            ))

        if data.confidence is None:
            errors.append(ValidationError(
                "verdict",
                "Verdict provided but no confidence score.",
                "warning"
            ))

        if data.claims and len(data.claims) == 0:
            errors.append(ValidationError(
                "claims",
                "Fact-check has verdict but no individual claims analyzed.",
                "warning"
            ))

    return errors


def validation_summary(errors: list[ValidationError]) -> str:
    """Generate a human-readable validation summary."""
    if not errors:
        return "Validation PASSED. Report is ready to deploy."

    error_count = sum(1 for e in errors if e.severity == "error")
    warning_count = sum(1 for e in errors if e.severity == "warning")

    lines = [f"Validation FAILED: {error_count} errors, {warning_count} warnings\n"]

    # Group by category
    by_category: dict[str, list[ValidationError]] = {}
    for e in errors:
        by_category.setdefault(e.category, []).append(e)

    for category, errs in by_category.items():
        lines.append(f"\n[{category.upper()}]")
        for e in errs:
            icon = "X" if e.severity == "error" else "!"
            lines.append(f"  {icon} {e.message}")

    return "\n".join(lines)


def is_deployable(errors: list[ValidationError]) -> bool:
    """Check if report can be deployed (no errors, warnings OK)."""
    return not any(e.severity == "error" for e in errors)
