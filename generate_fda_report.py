#!/usr/bin/env python3
"""
Generate FDA Vaccine Memo Fact-Check Report using the GenuVerity pipeline.
"""

import sys
sys.path.insert(0, '/Users/klop/GenuVerity7')

from datetime import date
from lib import (
    ReportData,
    Source,
    Section,
    ExecutiveSummary,
    Claim,
    ChartData,
    QuoteBox,
    TimelineEvent,
    Verdict,
    ReportCategory,
    TagColor,
    render_to_file,
    validate_report,
)
from lib.report_validator import validation_summary, is_deployable

# Create the report data
data = ReportData(
    slug="fda-vaccine-memo-fact-check",
    title="Fact Check: FDA Memo Claims COVID Vaccines Killed 10 Children",
    subtitle="An extraordinary claim without the extraordinary evidence",
    category=ReportCategory.PUBLIC_HEALTH,
    tag_label="Public Health",
    tag_color=TagColor.RED,
    publish_date=date(2025, 12, 19),

    # Verdict
    verdict=Verdict.UNVERIFIABLE,
    verdict_summary="The FDA memo claims 'at least 10 children' died from COVID-19 vaccines, but provides no ages, medical histories, timelines, vaccine types, or methodology. Without this data, the claim cannot be independently verified or peer-reviewed. Meanwhile, established safety monitoring systems have not detected such a signal.",
    confidence=0.75,

    # Executive Summary
    executive_summary=ExecutiveSummary(
        claim="FDA's top vaccine official Dr. Vinay Prasad issued a memo stating that agency staff determined 'no fewer than 10' of 96 child deaths reported to VAERS between 2021-2024 were 'related' to COVID-19 vaccination.",
        reality="The memo provides no supporting evidence—no ages, medical histories, vaccine types, timelines, or methodology. VAERS data explicitly cannot determine causation, only temporal correlation. Multiple vaccine safety experts have called the claims 'factually incorrect,' 'misleading,' and 'disingenuous' without peer review or published data.",
        key_points=[
            "No case details were provided: no ages, causes of death, vaccine types, or timelines",
            "VAERS is a passive reporting system that cannot establish causation—only correlation",
            "Former FDA vaccine chief Dr. Peter Marks called this 'right out of the anti-vaccine playbook'",
            "Multiple experts demand peer review before such extraordinary claims are published",
            "Over 1,000 children have died FROM COVID-19 itself; vaccines prevented many more deaths"
        ]
    ),

    # Individual claims
    claims=[
        Claim(
            id="claim_1",
            text="At least 10 children died from COVID-19 vaccines based on VAERS data analysis",
            verdict=Verdict.UNVERIFIABLE,
            evidence="No supporting data has been released. The memo references 96 VAERS death reports between 2021-2024 and claims 10 were 'related' to vaccination, but provides no methodology, patient details, or causal analysis.",
            source_ids=["stat", "factcheck", "npr"]
        ),
        Claim(
            id="claim_2",
            text="VAERS data proves vaccines caused these deaths",
            verdict=Verdict.FALSE,
            evidence="VAERS explicitly states: 'For any reported event, no cause-and-effect relationship has been established.' VAERS accepts unverified reports from anyone and cannot determine causation—only that an event occurred sometime after vaccination.",
            source_ids=["vaers_guide", "cdc"]
        ),
        Claim(
            id="claim_3",
            text="The FDA has confirmed vaccine-related pediatric deaths",
            verdict=Verdict.NEEDS_CONTEXT,
            evidence="The memo was issued by Dr. Vinay Prasad, CBER Director, not through official FDA channels. It was leaked rather than published through standard scientific processes. The FDA has not issued official guidance confirming these findings.",
            source_ids=["abc", "npr"]
        )
    ],

    # Main content sections
    sections=[
        Section(
            heading="The Black Friday Memo",
            content="On November 28, 2025, Dr. Vinay Prasad, director of the FDA's Center for Biologics Evaluation and Research (CBER), sent a 3,000-word memo to staff that was subsequently leaked to the press. The memo claimed that analysis of 96 deaths reported to the Vaccine Adverse Event Reporting System (VAERS) between 2021 and 2024 determined that 'no fewer than 10' were 'related' to COVID-19 vaccination. Prasad also suggested the 'real number is higher.' The memo did not include patient ages, medical histories, vaccine manufacturers, timelines, or any methodology for how causation was determined—information scientists say is essential for peer review.",
            timeline=[
                TimelineEvent(
                    date="March 28, 2025",
                    title="Peter Marks Forced Out",
                    description="FDA's longtime vaccine chief resigns, citing RFK Jr.'s 'misinformation and lies'",
                    is_key=True
                ),
                TimelineEvent(
                    date="April 2025",
                    title="Prasad Appointed CBER Director",
                    description="FDA Commissioner Marty Makary appoints Vinay Prasad to replace Marks",
                    is_key=False
                ),
                TimelineEvent(
                    date="July 29, 2025",
                    title="Prasad Briefly Departs",
                    description="Prasad exits FDA after Duchenne muscular dystrophy drug controversy",
                    is_key=False
                ),
                TimelineEvent(
                    date="August 2025",
                    title="Prasad Returns",
                    description="Prasad convinced to return; resumes dual role as CBER Director and Chief Medical Officer",
                    is_key=False
                ),
                TimelineEvent(
                    date="November 28, 2025",
                    title="The Memo Leaks",
                    description="Prasad's memo claiming 10 vaccine-related child deaths is leaked to press",
                    is_key=True
                )
            ]
        ),
        Section(
            heading="Why VAERS Cannot Prove Causation",
            content="The Vaccine Adverse Event Reporting System is a passive surveillance system co-managed by the CDC and FDA. Anyone—doctors, patients, family members—can submit a report. The system's own guidance explicitly states: 'For any reported event, no cause-and-effect relationship has been established.' A VAERS report confirms only that an adverse event occurred sometime after vaccination, not that the vaccine caused it. The system is designed to detect potential safety signals that warrant further investigation through more rigorous systems like the Vaccine Safety Datalink (VSD). Using VAERS data alone to claim causation is what the Global Vaccine Data Network has called 'the zombie practice that keeps coming back.'",
            chart=ChartData(
                chart_type="bar",
                title="COVID-19 Impact on Children (2020-2024)",
                labels=["Deaths FROM COVID-19", "Claimed vaccine deaths", "COVID hospitalizations (thousands)"],
                datasets=[{
                    "label": "Count",
                    "data": [1300, 10, 32],
                    "backgroundColor": ["#ef4444", "#f59e0b", "#3b82f6"]
                }],
                options={
                    "indexAxis": "y",
                    "plugins": {"legend": {"display": False}},
                    "scales": {"x": {"beginAtZero": True}}
                }
            ),
            float_position="right"
        ),
        Section(
            heading="Expert Pushback",
            content="The memo drew immediate criticism from vaccine safety experts across the scientific community. Dr. Anna Durbin, a vaccine researcher, called the memo 'factually incorrect, misleading and disingenuous,' noting that Prasad 'has not provided any evidence' while claiming certainty about causation. Dr. Kathryn Edwards emphasized that 'it is impossible to tell' whether cases have been 'comprehensively reviewed and other causes excluded.' Dr. Paul Offit of the University of Pennsylvania questioned why Prasad is asking people to trust assertions about serious matters without data transparency. Dr. Amesh Adalja of Johns Hopkins warned the statement would 'increase anti-vaccine sentiment and further politicize an issue.'",
            quote=QuoteBox(
                text="It is impossible to tell from this memo whether [cases] have been comprehensively reviewed and other causes excluded.",
                attribution="Dr. Kathryn Edwards, Vaccine Safety Expert",
                source_id="stat"
            )
        ),
        Section(
            heading="The Policy Implications",
            content="Beyond the death claims, the memo proposes sweeping changes to FDA vaccine approval processes. Prasad calls for eliminating the use of antibody data as a proxy for efficacy, requiring manufacturers to demonstrate actual disease reduction for new vaccines. He questions the practice of simultaneous vaccination with multiple shots. Former FDA commissioners warned these changes would 'slow' vaccine updates, 'increase prices,' and 'delay arrival of better-matched vaccines.' The memo was reportedly written with the expectation it would be leaked, according to experts who spoke with STAT News.",
            quote=QuoteBox(
                text="In forcing Peter Marks to resign, RFK Jr. is now the wolf guarding the hen house.",
                attribution="Dr. Paul Offit, University of Pennsylvania",
                source_id="cnbc"
            )
        ),
        Section(
            heading="Context: Pediatric COVID Deaths vs. Vaccine Safety",
            content="To put the claimed 10 deaths in context: CDC data shows over 1,300 children aged 0-19 have died from COVID-19 itself (as the underlying cause) through 2024. A peer-reviewed American Academy of Pediatrics study found COVID-19 killed an estimated 1,086 children ages 1-17 between 2020-2022, making it the seventh leading cause of death in that age group. Meanwhile, comprehensive safety monitoring through systems like the Vaccine Safety Datalink—which can actually assess causation—has consistently shown COVID vaccines are remarkably safe for children. A Korean study of 44 million vaccinated people identified only 21 vaccine-related myocarditis deaths across all ages, with CDC follow-up showing 83% of myocarditis cases fully recovered within three months."
        ),
        Section(
            heading="What Would Proper Evidence Look Like?",
            content="For such extraordinary claims to be credible, scientists would expect: (1) Individual case reports with patient ages, medical histories, and underlying conditions; (2) Clear methodology for how causation was determined versus correlation; (3) Identification of vaccine types and manufacturers involved; (4) Timeline data showing proximity of deaths to vaccination; (5) Peer review and publication in a scientific journal; (6) Comparison to background mortality rates in unvaccinated populations. None of this was provided. Without it, the scientific community cannot independently verify or replicate the claimed findings—a fundamental requirement of evidence-based medicine."
        )
    ],

    # Sources
    sources=[
        Source(
            name="STAT News",
            url="https://www.statnews.com/2025/11/29/covid-vaccine-deaths-fda-memo-vinay-prasad/",
            trust_score=88,
            domain="statnews.com",
            accessed_date=date(2025, 12, 19),
            quote="Experts told STAT they are skeptical of the memo's 'extraordinary' claim because it was not presented with detailed data."
        ),
        Source(
            name="FactCheck.org",
            url="https://www.factcheck.org/2025/12/unpacking-the-fdas-black-friday-vaccine-memo/",
            trust_score=92,
            domain="factcheck.org",
            accessed_date=date(2025, 12, 19),
            quote="Prasad provided no case details—no ages, causes of death, or vaccine types."
        ),
        Source(
            name="NPR",
            url="https://www.npr.org/sections/shots-health-news/2025/11/29/nx-s1-5624998/fda-vaccines-covid-children-safety",
            trust_score=90,
            domain="npr.org",
            accessed_date=date(2025, 12, 19),
            quote="The FDA emphasizes VAERS reports establish no definitive cause-and-effect relationships."
        ),
        Source(
            name="ABC News",
            url="https://abcnews.go.com/US/fda-links-10-childrens-deaths-covid-19-vaccines/story?id=127985834",
            trust_score=88,
            domain="abcnews.go.com",
            accessed_date=date(2025, 12, 19)
        ),
        Source(
            name="VAERS Data Guide",
            url="https://vaers.hhs.gov/data/dataguide.html",
            trust_score=98,
            domain="vaers.hhs.gov",
            accessed_date=date(2025, 12, 19),
            quote="For any reported event, no cause-and-effect relationship has been established."
        ),
        Source(
            name="CNBC",
            url="https://www.cnbc.com/2025/03/28/fda-vaccine-official-peter-marks-resigns-in-opposition-to-rfk-jr-.html",
            trust_score=85,
            domain="cnbc.com",
            accessed_date=date(2025, 12, 19)
        ),
        Source(
            name="CDC Provisional COVID Deaths",
            url="https://data.cdc.gov/National-Center-for-Health-Statistics/Provisional-COVID-19-Deaths-Focus-on-Ages-0-18-Yea/nr4s-juj3",
            trust_score=98,
            domain="data.cdc.gov",
            accessed_date=date(2025, 12, 19)
        ),
        Source(
            name="American Academy of Pediatrics",
            url="https://publications.aap.org/pediatrics/article/154/Supplement%203/e2024067043K/199735/Characteristics-of-Children-Ages-1-17-Who-Died-of",
            trust_score=95,
            domain="publications.aap.org",
            accessed_date=date(2025, 12, 19)
        ),
        Source(
            name="FDA - Vinay Prasad Bio",
            url="https://www.fda.gov/about-fda/fda-organization/vinay-prasad",
            trust_score=98,
            domain="fda.gov",
            accessed_date=date(2025, 12, 19)
        )
    ],

    # Bottom line
    bottom_line="Dr. Vinay Prasad's memo claiming COVID vaccines killed at least 10 children is an extraordinary claim presented without extraordinary evidence—or indeed, any verifiable evidence at all. No patient details, no methodology, no peer review. VAERS data, by its own explicit guidelines, cannot establish causation. Until the FDA releases the underlying data for independent scientific review, this claim remains unverifiable. Meanwhile, over 1,000 children have verifiably died from COVID-19 itself, and comprehensive safety monitoring continues to show vaccines are remarkably safe. The scientific community is right to demand transparency: if the data exists, publish it. If it doesn't, retract the claim."
)

# Validate the report
print("Validating report...")
errors = validate_report(data, check_urls=False)  # Skip URL check for speed
print(validation_summary(errors))

if is_deployable(errors):
    # Render to file
    output_path = "/Users/klop/GenuVerity7/fda-vaccine-memo-fact-check.html"
    render_to_file(data, output_path)
    print(f"\n✓ Report generated: {output_path}")
else:
    print("\n✗ Report failed validation - not generated")
    sys.exit(1)
