"""
GenuVerity Report Generation Library

This module provides the pipeline for generating reports:
1. AI generates JSON using report_schema
2. report_renderer converts JSON to branded HTML
3. report_validator checks requirements before deployment
"""

from .report_schema import (
    ReportData,
    Verdict,
    ReportCategory,
    TagColor,
    Source,
    Claim,
    ChartData,
    Section,
    ExecutiveSummary,
    QuoteBox,
    TimelineEvent,
    REPORT_GENERATION_PROMPT,
)

from .report_renderer import (
    render_report,
    render_to_file,
)

from .report_validator import (
    validate_report,
    ValidationError,
)

__all__ = [
    # Schema
    "ReportData",
    "Verdict",
    "ReportCategory",
    "TagColor",
    "Source",
    "Claim",
    "ChartData",
    "Section",
    "ExecutiveSummary",
    "QuoteBox",
    "TimelineEvent",
    "REPORT_GENERATION_PROMPT",
    # Renderer
    "render_report",
    "render_to_file",
    # Validator
    "validate_report",
    "ValidationError",
]
