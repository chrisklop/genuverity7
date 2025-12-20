"""
Report Renderer - Converts ReportData JSON to branded HTML.

The AI generates content as JSON.
This renderer adds ALL branding, layout, and structure.
Branding is NEVER the AI's responsibility.
"""

import json
from datetime import date
from typing import Optional
from .report_schema import ReportData, Verdict, TagColor, ChartData, Section


# GenuVerity color palette
COLORS = {
    "bg_primary": "#050A14",
    "bg_secondary": "#0a0f1a",
    "bg_card": "#111827",
    "accent_blue": "#3b82f6",
    "accent_cyan": "#06b6d4",
    "accent_green": "#10b981",
    "accent_amber": "#f59e0b",
    "accent_red": "#ef4444",
    "text_primary": "#ffffff",
    "text_secondary": "#a0aec0",
    "text_muted": "#64748b",
}

TAG_COLORS = {
    TagColor.RED: ("rgba(239, 68, 68, 0.15)", "#ef4444"),
    TagColor.AMBER: ("rgba(245, 158, 11, 0.15)", "#f59e0b"),
    TagColor.GREEN: ("rgba(16, 185, 129, 0.15)", "#10b981"),
    TagColor.BLUE: ("rgba(59, 130, 246, 0.15)", "#3b82f6"),
    TagColor.RUSSIA: ("rgba(0, 57, 166, 0.15)", "#4a7dcc"),
    TagColor.CHINA: ("rgba(222, 41, 16, 0.15)", "#ef6b5b"),
}

VERDICT_COLORS = {
    Verdict.TRUE: "#10b981",
    Verdict.FALSE: "#ef4444",
    Verdict.MOSTLY_TRUE: "#10b981",
    Verdict.MOSTLY_FALSE: "#ef4444",
    Verdict.MIXED: "#f59e0b",
    Verdict.UNVERIFIABLE: "#64748b",
    Verdict.NEEDS_CONTEXT: "#f59e0b",
}


def render_report(data: ReportData) -> str:
    """
    Render a complete HTML report from ReportData.

    ALL branding is handled here - the AI never touches it.
    """

    tag_bg, tag_color = TAG_COLORS.get(data.tag_color, TAG_COLORS[TagColor.BLUE])
    verdict_color = VERDICT_COLORS.get(data.verdict, COLORS["accent_cyan"]) if data.verdict else None

    # Sort sources by trust score
    sources_sorted = sorted(data.sources, key=lambda s: s.trust_score, reverse=True)

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{data.title} | GenuVerity</title>
    <meta name="description" content="{data.executive_summary.reality[:160]}">
    <meta property="og:title" content="{data.title}">
    <meta property="og:description" content="{data.executive_summary.reality[:160]}">
    <meta property="og:type" content="article">
    <meta name="theme-color" content="#0a0a12">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.min.js"></script>
    {_render_styles()}
</head>
<body>
    <div class="bg-grid"></div>
    <div class="bg-glow"></div>

    {_render_navbar()}

    {_render_mobile_notice()}

    {_render_sources_banner(sources_sorted)}

    <main class="main-content">
        <article class="report-article">
            {_render_header(data, tag_bg, tag_color, verdict_color)}

            {_render_executive_summary(data)}

            {_render_sections(data.sections)}

            {_render_bottom_line(data.bottom_line)}

            {_render_sources_grid(sources_sorted)}

            {_render_feedback_form(data.slug)}
        </article>
    </main>

    {_render_footer()}

    {_render_share_modal()}

    {_render_scripts(data)}
</body>
</html>"""

    return html


def _render_styles() -> str:
    """Render the CSS styles - ALL branding lives here."""
    return """
    <style>
        :root {
            --bg-primary: #050A14;
            --bg-secondary: #0a0f1a;
            --bg-tertiary: #0d1424;
            --bg-card: #111827;
            --border-color: rgba(59, 130, 246, 0.15);
            --border-glow: rgba(59, 130, 246, 0.4);
            --text-primary: #ffffff;
            --text-secondary: #a0aec0;
            --text-muted: #64748b;
            --accent-blue: #3b82f6;
            --accent-cyan: #06b6d4;
            --accent-green: #10b981;
            --accent-amber: #f59e0b;
            --accent-red: #ef4444;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.7;
            min-height: 100vh;
        }

        .bg-grid {
            position: fixed;
            inset: 0;
            background-image: linear-gradient(rgba(59, 130, 246, 0.02) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59, 130, 246, 0.02) 1px, transparent 1px);
            background-size: 60px 60px;
            pointer-events: none;
            z-index: 0;
        }

        .bg-glow {
            position: fixed;
            top: -300px;
            left: 50%;
            transform: translateX(-50%);
            width: 1200px;
            height: 1200px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, rgba(6, 182, 212, 0.03) 30%, transparent 60%);
            pointer-events: none;
            z-index: 0;
        }

        /* Navbar */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 64px;
            background: rgba(5, 10, 20, 0.9);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-color);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
        }

        .navbar-brand {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
        }

        .navbar-logo { font-size: 1.5rem; font-weight: 700; }
        .logo-genu { color: #ffffff; }
        .logo-verity { color: var(--accent-blue); }

        .navbar-badge {
            padding: 4px 10px;
            background: rgba(6, 182, 212, 0.1);
            border: 1px solid rgba(6, 182, 212, 0.3);
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 600;
            color: var(--accent-cyan);
        }

        /* Mobile Notice */
        .mobile-notice {
            display: none;
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            padding: 16px;
            background: rgba(17, 24, 39, 0.95);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            z-index: 999;
        }

        @media (max-width: 768px) {
            .mobile-notice:not(.dismissed) { display: block; }
        }

        /* Sources Banner - pushes content down when expanded */
        .sources-banner {
            position: sticky;
            top: 64px;
            background: rgba(5, 10, 20, 0.98);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            margin: 0 auto 24px;
            max-width: 900px;
            z-index: 100;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .sources-banner.collapsed {
            max-height: 52px;
        }

        .sources-banner:not(.collapsed) {
            max-height: 400px;
            overflow-y: auto;
        }

        .sources-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 40px;
            cursor: pointer;
            border-bottom: 1px solid var(--border-color);
        }

        .sources-toggle h3 {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--accent-cyan);
        }

        .sources-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 12px;
            padding: 16px 40px;
        }

        .source-chip {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 14px;
            background: rgba(17, 24, 39, 0.6);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.2s;
        }

        .source-chip:hover {
            border-color: var(--accent-cyan);
            background: rgba(6, 182, 212, 0.05);
        }

        .source-score {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            font-weight: 600;
            padding: 4px 8px;
            border-radius: 6px;
        }

        .source-score.tier1 { background: rgba(16, 185, 129, 0.2); color: var(--accent-green); }
        .source-score.tier2 { background: rgba(59, 130, 246, 0.2); color: var(--accent-blue); }
        .source-score.tier3 { background: rgba(245, 158, 11, 0.2); color: var(--accent-amber); }

        .source-name { color: var(--text-primary); font-weight: 500; font-size: 0.85rem; }
        .source-domain { color: var(--text-muted); font-size: 0.75rem; }

        /* Main Content */
        .main-content {
            position: relative;
            z-index: 1;
            padding-top: 140px;
            max-width: 900px;
            margin: 0 auto;
            padding-left: 40px;
            padding-right: 40px;
        }

        .report-article { padding-bottom: 60px; }

        /* Header */
        .report-header { margin-bottom: 40px; }

        .report-tag {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: 16px;
        }

        .report-title {
            font-size: 2.5rem;
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 16px;
        }

        .report-subtitle {
            font-size: 1.2rem;
            color: var(--text-secondary);
            margin-bottom: 20px;
        }

        .report-meta {
            display: flex;
            align-items: center;
            gap: 20px;
            color: var(--text-muted);
            font-size: 0.9rem;
        }

        .verdict-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 1rem;
        }

        /* Executive Summary */
        .exec-summary {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(6, 182, 212, 0.05));
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 32px;
            margin-bottom: 40px;
        }

        .exec-summary h2 {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--accent-cyan);
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .claim-reality-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 24px;
        }

        @media (max-width: 768px) {
            .claim-reality-grid { grid-template-columns: 1fr; }
        }

        .claim-box, .reality-box {
            padding: 20px;
            border-radius: 12px;
        }

        .claim-box {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .reality-box {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .box-label {
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 8px;
        }

        .claim-box .box-label { color: var(--accent-red); }
        .reality-box .box-label { color: var(--accent-green); }

        .key-points {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .key-points li {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            color: var(--text-secondary);
        }

        .key-points li::before {
            content: '';
            width: 6px;
            height: 6px;
            background: var(--accent-cyan);
            border-radius: 50%;
            margin-top: 8px;
            flex-shrink: 0;
        }

        /* Content Sections */
        .prose-h2 {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 40px 0 20px;
            padding-bottom: 12px;
            border-bottom: 1px solid var(--border-color);
        }

        .prose-text {
            color: var(--text-secondary);
            font-size: 1.05rem;
            line-height: 1.8;
            margin-bottom: 20px;
        }

        /* Float Figures */
        .float-figure {
            width: 48%;
            margin-bottom: 20px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 20px;
        }

        .float-figure.right { float: right; margin-left: 30px; }
        .float-figure.left { float: left; margin-right: 30px; }

        @media (max-width: 768px) {
            .float-figure { width: 100%; float: none; margin: 20px 0; }
        }

        .chart-title {
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 16px;
            text-align: center;
        }

        /* Quote Box */
        .quote-box {
            background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.05));
            border-left: 4px solid var(--accent-cyan);
            padding: 24px;
            margin: 30px 0;
            border-radius: 0 12px 12px 0;
        }

        .quote-text {
            font-size: 1.1rem;
            font-style: italic;
            color: var(--text-primary);
            margin-bottom: 12px;
        }

        .quote-attribution {
            color: var(--text-muted);
            font-size: 0.9rem;
        }

        /* Timeline */
        .timeline {
            position: relative;
            padding-left: 30px;
            margin: 30px 0;
        }

        .timeline::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: var(--border-color);
        }

        .timeline-event {
            position: relative;
            padding-bottom: 24px;
        }

        .timeline-event::before {
            content: '';
            position: absolute;
            left: -34px;
            top: 6px;
            width: 10px;
            height: 10px;
            background: var(--accent-cyan);
            border-radius: 50%;
        }

        .timeline-event.key::before {
            width: 14px;
            height: 14px;
            left: -36px;
            box-shadow: 0 0 10px var(--accent-cyan);
        }

        .timeline-date {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            color: var(--accent-cyan);
            margin-bottom: 4px;
        }

        .timeline-title {
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 4px;
        }

        .timeline-desc {
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        /* Bottom Line */
        .bottom-line {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.05));
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 16px;
            padding: 32px;
            margin: 40px 0;
        }

        .bottom-line h2 {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--accent-green);
            margin-bottom: 16px;
        }

        .bottom-line p {
            color: var(--text-secondary);
            font-size: 1.05rem;
            line-height: 1.8;
        }

        /* Sources Grid */
        .sources-section {
            margin: 40px 0;
        }

        .sources-section h2 {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .sources-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 16px;
        }

        .source-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 16px;
            text-decoration: none;
            transition: all 0.2s;
        }

        .source-card:hover {
            border-color: var(--accent-cyan);
            transform: translateY(-2px);
        }

        .source-card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
        }

        .source-card-name {
            font-weight: 600;
            color: var(--text-primary);
        }

        .source-card-domain {
            color: var(--text-muted);
            font-size: 0.8rem;
        }

        /* Feedback Form */
        .feedback-section {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 32px;
            margin: 40px 0;
        }

        .feedback-section h2 {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .feedback-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .feedback-input, .feedback-textarea {
            padding: 14px;
            background: rgba(17, 24, 39, 0.6);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            color: var(--text-primary);
            font-size: 0.95rem;
            font-family: inherit;
        }

        .feedback-input:focus, .feedback-textarea:focus {
            outline: none;
            border-color: var(--accent-blue);
        }

        .feedback-textarea { min-height: 100px; resize: vertical; }

        .feedback-btn {
            padding: 14px 24px;
            background: linear-gradient(135deg, var(--accent-blue), var(--accent-cyan));
            border: none;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .feedback-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
        }

        /* Footer */
        .footer {
            position: relative;
            z-index: 1;
            text-align: center;
            padding: 40px;
            border-top: 1px solid var(--border-color);
        }

        .footer-brand {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .footer p { color: var(--text-muted); font-size: 0.85rem; }

        /* Clearfix */
        .clearfix::after {
            content: '';
            display: table;
            clear: both;
        }

        /* Copy/Share Buttons */
        .copyable-component {
            position: relative;
        }

        .component-actions {
            position: absolute;
            top: 12px;
            right: 12px;
            display: flex;
            gap: 6px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s;
            z-index: 100;
        }

        .copyable-component:hover .component-actions {
            opacity: 1;
            visibility: visible;
        }

        .component-action-btn {
            width: 34px;
            height: 34px;
            background: rgba(59, 130, 246, 0.15);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: var(--accent-cyan);
            transition: all 0.2s;
        }

        .component-action-btn:hover {
            background: rgba(59, 130, 246, 0.25);
            transform: scale(1.05);
        }

        .component-action-btn.success {
            background: rgba(16, 185, 129, 0.2);
            border-color: rgba(16, 185, 129, 0.4);
            color: var(--accent-green);
        }

        .copyable-component.capturing {
            box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.5);
        }

        /* Mobile: always visible but smaller */
        @media (hover: none) {
            .component-actions {
                opacity: 0.7;
                visibility: visible;
            }
        }

        /* Share Modal */
        .share-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(4px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s;
        }

        .share-modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .share-modal {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }

        .share-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .share-modal-header h3 {
            font-size: 1.1rem;
            font-weight: 600;
        }

        .share-modal-close {
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            padding: 4px;
        }

        .share-preview {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 8px;
            margin-bottom: 20px;
        }

        .share-preview img {
            width: 100%;
            border-radius: 4px;
        }

        .share-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .share-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 10px;
            background: rgba(17, 24, 39, 0.6);
            color: var(--text-primary);
            font-size: 0.95rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
        }

        .share-btn:hover {
            border-color: var(--accent-cyan);
            background: rgba(6, 182, 212, 0.1);
        }

        .share-btn.primary {
            background: linear-gradient(135deg, var(--accent-blue), var(--accent-cyan));
            border: none;
        }
    </style>
    """


def _render_navbar() -> str:
    """Render the navigation bar with GenuVerity branding."""
    return """
    <nav class="navbar">
        <a href="/" class="navbar-brand">
            <span class="navbar-logo">
                <span class="logo-genu">Genu</span><span class="logo-verity">Verity</span>
            </span>
            <span class="navbar-badge">COMING SOON</span>
        </a>
        <div style="display:flex;gap:12px;">
            <a href="reports.html" style="color:var(--text-secondary);text-decoration:none;font-size:0.9rem;display:flex;align-items:center;gap:6px;">
                <i data-lucide="file-text" style="width:16px;height:16px;"></i> Reports
            </a>
        </div>
    </nav>
    """


def _render_mobile_notice() -> str:
    """Render the mobile notice banner."""
    return """
    <div class="mobile-notice" id="mobileNotice">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;">
            <span style="font-weight:600;">Best on Desktop</span>
            <button onclick="document.getElementById('mobileNotice').classList.add('dismissed')"
                    style="background:none;border:none;color:var(--text-muted);cursor:pointer;">
                <i data-lucide="x" style="width:18px;height:18px;"></i>
            </button>
        </div>
        <p style="color:var(--text-secondary);font-size:0.85rem;">
            This report includes interactive charts and detailed analysis best viewed on a larger screen.
        </p>
    </div>
    """


def _render_sources_banner(sources: list) -> str:
    """Render the collapsible sources banner."""
    source_chips = ""
    for src in sources[:8]:  # Show top 8 in banner
        tier = "tier1" if src.trust_score >= 90 else "tier2" if src.trust_score >= 80 else "tier3"
        source_chips += f"""
        <a href="{src.url}" target="_blank" rel="noopener" class="source-chip">
            <span class="source-score {tier}">{src.trust_score}</span>
            <div>
                <div class="source-name">{src.name}</div>
                <div class="source-domain">{src.domain}</div>
            </div>
        </a>
        """

    return f"""
    <div class="sources-banner" id="sourcesBanner">
        <div class="sources-toggle" onclick="toggleSourcesBanner()">
            <h3>
                <i data-lucide="shield-check" style="width:18px;height:18px;"></i>
                Sources First: {len(sources)} Verified Sources
            </h3>
            <i data-lucide="chevron-down" id="sourcesChevron" style="width:18px;height:18px;color:var(--text-muted);"></i>
        </div>
        <div class="sources-list">
            {source_chips}
        </div>
    </div>
    """


def _render_header(data: ReportData, tag_bg: str, tag_color: str, verdict_color: Optional[str]) -> str:
    """Render the report header."""
    verdict_html = ""
    if data.verdict:
        verdict_html = f"""
        <div class="verdict-badge" style="background: {verdict_color}20; color: {verdict_color};">
            <i data-lucide="check-circle" style="width:20px;height:20px;"></i>
            {data.verdict.value}
        </div>
        """

    return f"""
    <header class="report-header">
        <span class="report-tag" style="background: {tag_bg}; color: {tag_color};">
            <i data-lucide="tag" style="width:14px;height:14px;"></i>
            {data.tag_label}
        </span>
        <h1 class="report-title">{data.title}</h1>
        {f'<p class="report-subtitle">{data.subtitle}</p>' if data.subtitle else ''}
        <div class="report-meta">
            <span><i data-lucide="calendar" style="width:16px;height:16px;"></i> {data.publish_date.strftime('%B %d, %Y')}</span>
            <span><i data-lucide="link" style="width:16px;height:16px;"></i> {len(data.sources)} Sources</span>
            {verdict_html}
        </div>
    </header>
    """


def _render_executive_summary(data: ReportData) -> str:
    """Render the executive summary section."""
    key_points_html = "\n".join([f"<li>{point}</li>" for point in data.executive_summary.key_points])

    return f"""
    <section class="exec-summary">
        <h2>
            <i data-lucide="clipboard-list" style="width:20px;height:20px;"></i>
            Executive Summary
        </h2>
        <div class="claim-reality-grid">
            <div class="claim-box">
                <div class="box-label">The Claim</div>
                <p style="color:var(--text-primary);">{data.executive_summary.claim}</p>
            </div>
            <div class="reality-box">
                <div class="box-label">The Reality</div>
                <p style="color:var(--text-primary);">{data.executive_summary.reality}</p>
            </div>
        </div>
        <ul class="key-points">
            {key_points_html}
        </ul>
    </section>
    """


def _render_sections(sections: list[Section]) -> str:
    """Render content sections."""
    html = '<div class="clearfix">'

    for i, section in enumerate(sections):
        # Chart if present
        chart_html = ""
        if section.chart:
            float_class = f"float-figure {section.float_position or 'right'}"
            chart_html = f"""
            <figure class="{float_class}">
                <div class="chart-title">{section.chart.title}</div>
                <canvas id="chart_{i}"></canvas>
            </figure>
            """

        # Quote if present
        quote_html = ""
        if section.quote:
            quote_html = f"""
            <div class="quote-box">
                <p class="quote-text">"{section.quote.text}"</p>
                <p class="quote-attribution">— {section.quote.attribution}</p>
            </div>
            """

        # Timeline if present
        timeline_html = ""
        if section.timeline:
            events = ""
            for event in section.timeline:
                key_class = "key" if event.is_key else ""
                events += f"""
                <div class="timeline-event {key_class}">
                    <div class="timeline-date">{event.date}</div>
                    <div class="timeline-title">{event.title}</div>
                    <div class="timeline-desc">{event.description}</div>
                </div>
                """
            timeline_html = f'<div class="timeline">{events}</div>'

        html += f"""
        <h2 class="prose-h2">{section.heading}</h2>
        {chart_html}
        <p class="prose-text">{section.content}</p>
        {quote_html}
        {timeline_html}
        """

    html += '</div>'
    return html


def _render_bottom_line(text: str) -> str:
    """Render the bottom line section."""
    return f"""
    <section class="bottom-line">
        <h2>
            <i data-lucide="check-circle" style="width:20px;height:20px;"></i>
            The Bottom Line
        </h2>
        <p>{text}</p>
    </section>
    """


def _render_sources_grid(sources: list) -> str:
    """Render the sources grid section."""
    cards = ""
    for src in sources:
        tier = "tier1" if src.trust_score >= 90 else "tier2" if src.trust_score >= 80 else "tier3"
        cards += f"""
        <a href="{src.url}" target="_blank" rel="noopener" class="source-card">
            <div class="source-card-header">
                <span class="source-card-name">{src.name}</span>
                <span class="source-score {tier}">{src.trust_score}</span>
            </div>
            <div class="source-card-domain">{src.domain}</div>
        </a>
        """

    return f"""
    <section class="sources-section">
        <h2>
            <i data-lucide="book-open" style="width:20px;height:20px;color:var(--accent-cyan);"></i>
            Sources First
        </h2>
        <div class="sources-grid">
            {cards}
        </div>
    </section>
    """


def _render_feedback_form(slug: str) -> str:
    """Render the feedback form."""
    return f"""
    <section class="feedback-section">
        <h2>
            <i data-lucide="message-square" style="width:20px;height:20px;color:var(--accent-cyan);"></i>
            Report Feedback
        </h2>
        <form class="feedback-form" id="feedbackForm" onsubmit="submitFeedback(event, '{slug}')">
            <input type="email" class="feedback-input" placeholder="Your email (optional)" id="feedbackEmail">
            <textarea class="feedback-textarea" placeholder="Found an error? Have additional sources? Let us know..." id="feedbackText" required></textarea>
            <button type="submit" class="feedback-btn">
                <i data-lucide="send" style="width:16px;height:16px;"></i>
                Submit Feedback
            </button>
        </form>
    </section>
    """


def _render_footer() -> str:
    """Render the footer with GenuVerity branding."""
    return """
    <footer class="footer">
        <div class="footer-brand">
            <span class="logo-genu">Genu</span><span class="logo-verity">Verity</span>
        </div>
        <p>AI-Powered Investigative Journalism</p>
    </footer>
    """


def _render_share_modal() -> str:
    """Render the share modal HTML."""
    return """
    <div class="share-modal-overlay" id="shareModalOverlay" onclick="closeShareModal(event)">
        <div class="share-modal" onclick="event.stopPropagation()">
            <div class="share-modal-header">
                <h3>Share this content</h3>
                <button class="share-modal-close" onclick="closeShareModal()">
                    <i data-lucide="x" style="width:20px;height:20px;"></i>
                </button>
            </div>
            <div class="share-preview">
                <img id="sharePreviewImg" src="" alt="Preview">
            </div>
            <div class="share-actions">
                <button class="share-btn primary" onclick="downloadShareImage()">
                    <i data-lucide="download" style="width:18px;height:18px;"></i>
                    Download Image
                </button>
                <button class="share-btn" onclick="copyReportLink()">
                    <i data-lucide="link" style="width:18px;height:18px;"></i>
                    Copy Report Link
                </button>
                <a class="share-btn" id="shareTwitter" href="#" target="_blank" rel="noopener">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Share on X
                </a>
                <a class="share-btn" id="shareLinkedIn" href="#" target="_blank" rel="noopener">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    Share on LinkedIn
                </a>
            </div>
        </div>
    </div>
    """


def _render_scripts(data: ReportData) -> str:
    """Render JavaScript including Chart.js with watermark."""
    chart_configs = []

    for i, section in enumerate(data.sections):
        if section.chart:
            config = {
                "type": section.chart.chart_type,
                "data": {
                    "labels": section.chart.labels,
                    "datasets": section.chart.datasets
                },
                "options": section.chart.options or {}
            }
            chart_configs.append((i, config))

    chart_init = ""
    for i, config in chart_configs:
        chart_init += f"""
        new Chart(document.getElementById('chart_{i}'), {json.dumps(config)});
        """

    return f"""
    <script>
        // Initialize Lucide icons and copy/share functionality
        document.addEventListener('DOMContentLoaded', () => {{
            lucide.createIcons();
            initCharts();
            initCopyShare();
        }});

        // Chart.js GenuVerity watermark plugin
        const watermarkPlugin = {{
            id: 'genuverityWatermark',
            afterDraw: (chart) => {{
                const ctx = chart.ctx;
                ctx.save();
                ctx.font = '12px Inter';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'bottom';
                const x = chart.width - 10;
                const y = chart.height - 10;
                ctx.fillStyle = '#ffffff';
                ctx.fillText('Genu', x - 35, y);
                ctx.fillStyle = '#3b82f6';
                ctx.fillText('Verity', x, y);
                ctx.restore();
            }}
        }};

        Chart.register(watermarkPlugin);

        function initCharts() {{
            Chart.defaults.color = '#a0aec0';
            Chart.defaults.borderColor = 'rgba(59, 130, 246, 0.1)';
            {chart_init}
        }}

        // Sources banner toggle
        let bannerCollapsed = false;
        function toggleSourcesBanner() {{
            const banner = document.getElementById('sourcesBanner');
            const chevron = document.getElementById('sourcesChevron');
            bannerCollapsed = !bannerCollapsed;
            banner.classList.toggle('collapsed', bannerCollapsed);
            chevron.style.transform = bannerCollapsed ? 'rotate(-90deg)' : '';
        }}

        // Feedback form
        async function submitFeedback(e, slug) {{
            e.preventDefault();
            const email = document.getElementById('feedbackEmail').value;
            const text = document.getElementById('feedbackText').value;

            try {{
                await fetch('/api/feedback', {{
                    method: 'POST',
                    headers: {{ 'Content-Type': 'application/json' }},
                    body: JSON.stringify({{ slug, email, text }})
                }});
                alert('Thank you for your feedback!');
                document.getElementById('feedbackForm').reset();
            }} catch (err) {{
                alert('Error submitting feedback. Please try again.');
            }}
        }}

        // ============================================
        // Copy/Share as Image Functionality
        // ============================================
        const COPYABLE_SELECTORS = [
            '.exec-summary',
            '.bottom-line',
            '.float-figure',
            '.quote-box',
            '.timeline',
            '.source-card',
            '.claim-box',
            '.reality-box',
            '.verdict-badge'
        ];

        let currentShareBlob = null;
        let currentShareUrl = null;

        function initCopyShare() {{
            COPYABLE_SELECTORS.forEach(selector => {{
                document.querySelectorAll(selector).forEach(el => {{
                    // Skip if already initialized
                    if (el.classList.contains('copyable-component')) return;

                    el.classList.add('copyable-component');

                    // Create action buttons container
                    const actions = document.createElement('div');
                    actions.className = 'component-actions';
                    actions.innerHTML = `
                        <button class="component-action-btn copy-btn" title="Copy as image">
                            <i data-lucide="copy" style="width:16px;height:16px;"></i>
                        </button>
                        <button class="component-action-btn share-btn" title="Share">
                            <i data-lucide="share-2" style="width:16px;height:16px;"></i>
                        </button>
                    `;

                    el.appendChild(actions);

                    // Add click handlers
                    actions.querySelector('.copy-btn').addEventListener('click', (e) => {{
                        e.stopPropagation();
                        copyComponentAsImage(el, actions.querySelector('.copy-btn'));
                    }});

                    actions.querySelector('.share-btn').addEventListener('click', (e) => {{
                        e.stopPropagation();
                        shareComponent(el);
                    }});
                }});
            }});

            // Re-initialize lucide icons for new buttons
            lucide.createIcons();
        }}

        async function captureComponent(element) {{
            // Add capturing state
            element.classList.add('capturing');

            // Hide action buttons during capture
            const actions = element.querySelector('.component-actions');
            if (actions) actions.style.display = 'none';

            try {{
                // Wait for any animations
                await new Promise(r => setTimeout(r, 100));

                // Capture with html-to-image
                const dataUrl = await htmlToImage.toPng(element, {{
                    pixelRatio: 2,
                    backgroundColor: '#0a0f1a',
                    style: {{
                        transform: 'none',
                        borderRadius: '12px'
                    }}
                }});

                // Add GenuVerity watermark
                const watermarkedUrl = await addWatermark(dataUrl);
                return watermarkedUrl;

            }} finally {{
                element.classList.remove('capturing');
                if (actions) actions.style.display = '';
            }}
        }}

        function addWatermark(dataUrl) {{
            return new Promise((resolve) => {{
                const img = new Image();
                img.onload = () => {{
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');

                    // Draw original image
                    ctx.drawImage(img, 0, 0);

                    // Add watermark background pill
                    const padding = 12;
                    const text = 'GenuVerity';
                    ctx.font = 'bold 24px Inter, sans-serif';
                    const textWidth = ctx.measureText(text).width;
                    const pillWidth = textWidth + padding * 2;
                    const pillHeight = 36;
                    const pillX = canvas.width - pillWidth - 16;
                    const pillY = canvas.height - pillHeight - 16;

                    // Draw pill background
                    ctx.fillStyle = 'rgba(5, 10, 20, 0.85)';
                    ctx.beginPath();
                    ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 8);
                    ctx.fill();

                    // Draw text
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'left';
                    const textY = pillY + pillHeight / 2;

                    // "Genu" in white
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText('Genu', pillX + padding, textY);

                    // "Verity" in blue
                    const genuWidth = ctx.measureText('Genu').width;
                    ctx.fillStyle = '#3b82f6';
                    ctx.fillText('Verity', pillX + padding + genuWidth, textY);

                    resolve(canvas.toDataURL('image/png'));
                }};
                img.src = dataUrl;
            }});
        }}

        async function copyComponentAsImage(element, button) {{
            try {{
                const dataUrl = await captureComponent(element);

                // Convert to blob
                const response = await fetch(dataUrl);
                const blob = await response.blob();

                // Try clipboard API
                if (navigator.clipboard && navigator.clipboard.write) {{
                    await navigator.clipboard.write([
                        new ClipboardItem({{ 'image/png': blob }})
                    ]);

                    // Success feedback
                    button.classList.add('success');
                    button.innerHTML = '<i data-lucide="check" style="width:16px;height:16px;"></i>';
                    lucide.createIcons();

                    setTimeout(() => {{
                        button.classList.remove('success');
                        button.innerHTML = '<i data-lucide="copy" style="width:16px;height:16px;"></i>';
                        lucide.createIcons();
                    }}, 2000);
                }} else {{
                    // Fallback - open share modal with download option
                    showShareModal(dataUrl, blob);
                }}
            }} catch (err) {{
                console.error('Copy failed:', err);
                alert('Could not copy to clipboard. Try the share button instead.');
            }}
        }}

        async function shareComponent(element) {{
            try {{
                const dataUrl = await captureComponent(element);
                const response = await fetch(dataUrl);
                const blob = await response.blob();

                // Try Web Share API with file
                if (navigator.share && navigator.canShare) {{
                    const file = new File([blob], 'genuverity-share.png', {{ type: 'image/png' }});
                    const shareData = {{
                        files: [file],
                        title: document.title,
                        url: window.location.href
                    }};

                    if (navigator.canShare(shareData)) {{
                        await navigator.share(shareData);
                        return;
                    }}
                }}

                // Fallback to modal
                showShareModal(dataUrl, blob);
            }} catch (err) {{
                if (err.name !== 'AbortError') {{
                    console.error('Share failed:', err);
                }}
            }}
        }}

        function showShareModal(dataUrl, blob) {{
            currentShareBlob = blob;
            currentShareUrl = dataUrl;

            // Set preview image
            document.getElementById('sharePreviewImg').src = dataUrl;

            // Set share links
            const pageUrl = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);

            document.getElementById('shareTwitter').href =
                `https://twitter.com/intent/tweet?text=${{title}}&url=${{pageUrl}}`;
            document.getElementById('shareLinkedIn').href =
                `https://www.linkedin.com/sharing/share-offsite/?url=${{pageUrl}}`;

            // Show modal
            document.getElementById('shareModalOverlay').classList.add('active');
            lucide.createIcons();
        }}

        function closeShareModal(event) {{
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('shareModalOverlay').classList.remove('active');
            currentShareBlob = null;
            currentShareUrl = null;
        }}

        function downloadShareImage() {{
            if (!currentShareUrl) return;

            const link = document.createElement('a');
            link.href = currentShareUrl;
            link.download = 'genuverity-' + Date.now() + '.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }}

        async function copyReportLink() {{
            try {{
                await navigator.clipboard.writeText(window.location.href);
                alert('Report link copied!');
            }} catch (err) {{
                // Fallback
                const input = document.createElement('input');
                input.value = window.location.href;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
                alert('Report link copied!');
            }}
        }}
    </script>
    """


def render_to_file(data: ReportData, output_path: str) -> None:
    """Render report and save to file."""
    html = render_report(data)
    with open(output_path, 'w') as f:
        f.write(html)
