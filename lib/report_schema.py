"""
Report Schema - JSON structure for all GenuVerity reports.

This module defines the data structure that the AI generates.
The renderer takes this JSON and produces branded HTML.
The AI NEVER touches branding/layout - only content.
"""

from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, Literal
from datetime import date
from enum import Enum


class Verdict(str, Enum):
    TRUE = "TRUE"
    FALSE = "FALSE"
    MOSTLY_TRUE = "MOSTLY_TRUE"
    MOSTLY_FALSE = "MOSTLY_FALSE"
    MIXED = "MIXED"
    UNVERIFIABLE = "UNVERIFIABLE"
    NEEDS_CONTEXT = "NEEDS_CONTEXT"


class ReportCategory(str, Enum):
    FACT_CHECK = "fact_check"
    POLICY_ANALYSIS = "policy_analysis"
    FINANCIAL_ANALYSIS = "financial_analysis"
    INVESTIGATION = "investigation"
    NETWORK_ANALYSIS = "network_analysis"
    DATA_QUALITY = "data_quality"
    PUBLIC_HEALTH = "public_health"
    MILITARY = "military"
    TECH_POLICY = "tech_policy"
    CRIMINAL_JUSTICE = "criminal_justice"


class TagColor(str, Enum):
    RED = "red"
    AMBER = "amber"
    GREEN = "green"
    BLUE = "blue"
    RUSSIA = "russia"
    CHINA = "china"


class Source(BaseModel):
    """A verified source with trust score."""
    name: str = Field(..., description="Display name (e.g., 'CDC', 'Reuters')")
    url: HttpUrl = Field(..., description="Direct URL to source (no Wikipedia)")
    trust_score: int = Field(..., ge=0, le=100, description="Trust score 0-100")
    domain: str = Field(..., description="Domain (e.g., 'cdc.gov', 'reuters.com')")
    accessed_date: date = Field(..., description="When the source was verified")
    quote: Optional[str] = Field(None, description="Key quote from this source")


class Claim(BaseModel):
    """A single claim being evaluated."""
    id: str = Field(..., description="Unique claim ID (e.g., 'claim_1')")
    text: str = Field(..., description="The claim text")
    verdict: Verdict = Field(..., description="Verdict for this specific claim")
    evidence: str = Field(..., description="Evidence supporting the verdict")
    source_ids: list[str] = Field(..., description="IDs of sources supporting this")


class ChartData(BaseModel):
    """Data for a Chart.js visualization."""
    chart_type: Literal["bar", "line", "doughnut", "pie", "radar"] = Field(...)
    title: str = Field(..., description="Chart title")
    labels: list[str] = Field(..., description="X-axis labels or pie segments")
    datasets: list[dict] = Field(..., description="Chart.js dataset objects")
    options: Optional[dict] = Field(None, description="Chart.js options override")


class QuoteBox(BaseModel):
    """A highlighted quote from a source."""
    text: str = Field(..., description="The quote text")
    attribution: str = Field(..., description="Who said it")
    source_id: str = Field(..., description="ID of the source")


class TimelineEvent(BaseModel):
    """An event in a timeline."""
    date: str = Field(..., description="Date string (e.g., 'Dec 17, 2025')")
    title: str = Field(..., description="Event title")
    description: str = Field(..., description="Event description")
    is_key: bool = Field(False, description="Highlight as key event")


class Section(BaseModel):
    """A content section in the report."""
    heading: str = Field(..., description="Section heading (H2)")
    content: str = Field(..., description="Paragraph content (markdown allowed)")
    chart: Optional[ChartData] = Field(None, description="Optional chart for this section")
    quote: Optional[QuoteBox] = Field(None, description="Optional highlighted quote")
    timeline: Optional[list[TimelineEvent]] = Field(None, description="Optional timeline")
    float_position: Optional[Literal["left", "right"]] = Field(None, description="Float chart position")


class ExecutiveSummary(BaseModel):
    """The claim vs reality executive summary."""
    claim: str = Field(..., description="What's being claimed")
    reality: str = Field(..., description="What the evidence shows")
    key_points: list[str] = Field(..., description="3-5 bullet points")


class ReportData(BaseModel):
    """
    Complete report data structure.

    The AI generates this JSON. The renderer adds:
    - GenuVerity branding
    - Navbar
    - Sources banner
    - Footer
    - Feedback form
    - Mobile notice
    - Chart.js watermark plugin
    """

    # Metadata
    slug: str = Field(..., description="URL slug (e.g., 'cdc-vaccine-autism')")
    title: str = Field(..., description="Full report title")
    subtitle: Optional[str] = Field(None, description="Optional subtitle")
    category: ReportCategory = Field(...)
    tag_label: str = Field(..., description="Short tag label (e.g., 'Public Health')")
    tag_color: TagColor = Field(...)
    publish_date: date = Field(...)

    # Verdict (for fact-checks)
    verdict: Optional[Verdict] = Field(None, description="Overall verdict if fact-check")
    verdict_summary: Optional[str] = Field(None, description="2-3 sentence verdict explanation")
    confidence: Optional[float] = Field(None, ge=0, le=1, description="Confidence score 0-1")

    # Executive summary
    executive_summary: ExecutiveSummary = Field(...)

    # Main content
    sections: list[Section] = Field(..., min_length=1)

    # Claims (for fact-checks)
    claims: Optional[list[Claim]] = Field(None, description="Individual claims if fact-check")

    # Sources (REQUIRED)
    sources: list[Source] = Field(..., min_length=1, description="All sources cited")

    # Bottom line
    bottom_line: str = Field(..., description="Final takeaway paragraph")

    class Config:
        json_schema_extra = {
            "example": {
                "slug": "example-report",
                "title": "Example Report Title",
                "category": "fact_check",
                "tag_label": "Example Tag",
                "tag_color": "blue",
                "publish_date": "2025-12-19",
                "verdict": "MIXED",
                "verdict_summary": "The claim is partially accurate but missing crucial context.",
                "confidence": 0.85,
                "executive_summary": {
                    "claim": "The claim being evaluated",
                    "reality": "What the evidence actually shows",
                    "key_points": ["Point 1", "Point 2", "Point 3"]
                },
                "sections": [
                    {
                        "heading": "Background",
                        "content": "Context and background information..."
                    }
                ],
                "sources": [
                    {
                        "name": "CDC",
                        "url": "https://www.cdc.gov/example",
                        "trust_score": 95,
                        "domain": "cdc.gov",
                        "accessed_date": "2025-12-19"
                    }
                ],
                "bottom_line": "The final takeaway for readers."
            }
        }


# Prompt template for AI generation
REPORT_GENERATION_PROMPT = """
Generate a GenuVerity report as JSON following this exact schema.

TOPIC: {topic}

REQUIREMENTS:
1. Research the topic thoroughly using web search
2. Find 5-10 PRIMARY sources (NO Wikipedia)
3. Verify all URLs are accessible
4. Include trust scores for each source:
   - .gov, .edu, Reuters, AP, BBC: 95-100
   - Major news (CNN, NYT, WSJ): 88-92
   - Tech/specialized (Wired, Ars): 80-85
   - Other credible sources: 70-80
5. For fact-checks, evaluate each claim separately
6. Include at least one chart with real data
7. Provide executive summary with claim vs reality
8. Write a clear bottom line takeaway

OUTPUT FORMAT:
Return ONLY valid JSON matching the ReportData schema.
Do NOT include any branding, HTML, or layout.
The renderer will add all branding automatically.

FORBIDDEN:
- Wikipedia links
- Purple colors (#8b5cf6)
- Unverified URLs
- Made-up statistics
- Speculation presented as fact

JSON OUTPUT:
"""
