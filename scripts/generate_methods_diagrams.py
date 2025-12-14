#!/usr/bin/env python3
"""
Generate Midnight Tech style diagrams for the GenuVerity Methods page.

This script uses Gemini 3 Pro Image Preview to generate professional
flow diagrams in the GenuVerity "Midnight Tech" visual style.

Run with: python3 scripts/generate_methods_diagrams.py
Requires: GEMINI_API_KEY environment variable
"""

import os
import sys
import json
import base64
import requests
from datetime import datetime

# Gemini API configuration with multiple keys for rate limit handling
GEMINI_API_KEYS = [
    k.strip() for k in [
        os.getenv("GEMINI_API_KEY", "").replace("\\n", ""),
        os.getenv("GEMINI_API_KEY_2", "").replace("\\n", ""),
        os.getenv("GEMINI_API_KEY_3", "").replace("\\n", ""),
    ] if k.strip()
]
GEMINI_API_KEY = GEMINI_API_KEYS[0] if GEMINI_API_KEYS else None
GEMINI_IMAGE_MODEL = "gemini-3-pro-image-preview"
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models"
_current_key_index = 0

# Output directory for generated diagrams
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "infographics", "methods")

# GenuVerity "Midnight Tech" Style
INFOGRAPHIC_STYLE = """
VISUAL STYLE: "MIDNIGHT TECH"
- Background: Deep gradient from #050505 (near black) to #0a0a1a (dark blue-black)
- Primary accent: Electric blue (#3b82f6) for key data elements
- Secondary accents: Cyan (#06b6d4), Teal (#14b8a6)
- Grid/lines: Very subtle dark blue (#1a1a3e) with slight glow
- Text: Crisp white (#ffffff) for values, light gray (#a0a0b0) for labels
- Effects: Subtle blue glow on key elements, sleek futuristic feel
- Chart style: Clean geometric shapes, glowing edges, tech-forward
- Overall mood: High-tech data dashboard, investigative journalism

BRANDING REQUIREMENT (MANDATORY):
In the bottom-left corner of the image, include the text logo "GenuVerity" where:
- "Genu" is rendered in WHITE (#FFFFFF)
- "Verity" is rendered in ELECTRIC BLUE (#3b82f6)
- Use a clean, modern sans-serif font (like Inter or similar)
- Size: Medium-small, professional watermark style
- Position: Bottom-left corner with subtle padding
"""

# Diagrams to generate
DIAGRAMS = [
    {
        "id": "investigation_pipeline",
        "title": "Investigation Pipeline",
        "prompt": """Create a horizontal flow diagram showing the GenuVerity Investigation Pipeline.

The flow should show these steps connected by glowing arrows:
1. "User Query" (starting box)
2. "Web Search" (blue accent box) - searches for real sources
3. "Source Verification" (regular box) - verifies URLs exist
4. "Trust Scoring" (regular box) - assigns credibility scores
5. "AI Analysis" (blue accent box) - generates article
6. "Data Visualization" (green accent box) - creates infographics
7. "Final Report" (ending box with glow)

Layout: Two rows of boxes with vertical arrow between rows.
Row 1: User Query → Web Search → Source Verification
Row 2: Trust Scoring → AI Analysis → Data Visualization → Final Report

Use glowing connectors between boxes. Each box should have subtle tech styling with rounded corners and faint glow."""
    },
    {
        "id": "fact_check_pipeline",
        "title": "Fact Check Pipeline",
        "prompt": """Create a horizontal flow diagram showing the GenuVerity Fact Check Pipeline.

The flow should show these steps:
1. "Claim Input" (starting box)
2. "Prior Fact Checks" (teal accent box) - finds existing fact checks
3. "Professional Reviews" (regular box) - results from fact-checking organizations
4. "Web Search" (regular box) - fresh source search
5. "AI Analysis" (teal accent box) - verdict determination
6. "Evidence Compilation" (regular box)
7. "Verdict + Evidence" (ending box with glow)

Layout: Two rows connected by vertical arrow.
Use TEAL (#14b8a6) as accent color for this diagram instead of blue.
Show the verdict options (TRUE, MOSTLY TRUE, MIXED, MOSTLY FALSE, FALSE) as small badges near the final box."""
    },
    {
        "id": "fractal_research_flow",
        "title": "Fractal Trigger Flow",
        "prompt": """Create a conceptual flow diagram showing GenuVerity's Fractal Trigger research system.

Show a main article box at top with multiple "fractal trigger" terms highlighted within it.
Draw lines from these triggers down to smaller research boxes below.
Each smaller box can have its own triggers leading to even smaller boxes (fractal pattern).

Key elements:
1. Main "Parent Article" box at top (large, prominent)
2. 3-4 "Fractal Trigger" terms highlighted in yellow/gold
3. Arrows pointing down to "Child Articles" (medium boxes)
4. Some child articles have their own triggers pointing to more "Fractal Articles" boxes (small)

Use GREEN (#30a46c) as the accent color for this diagram.
Show the parent-child relationship clearly with connecting lines that glow.
Add a small queue indicator showing "5 concurrent generations" somewhere."""
    },
    {
        "id": "trust_scoring_tiers",
        "title": "Source Trust Scoring Tiers",
        "prompt": """Create a visual representation of GenuVerity's 3-tier source trust scoring system.

Design as three horizontal bars or sections:

TIER 1 (85-100): HIGH TRUST
- Color: Green gradient (#10b981 to #22c55e)
- Examples: Reuters, AP, NYT, WSJ, .gov, .edu
- Show as the top/most prominent tier

TIER 2 (70-84): MEDIUM TRUST
- Color: Amber/Yellow gradient (#f59e0b to #fbbf24)
- Examples: CNN, Forbes, BBC, ProPublica
- Show as middle tier

TIER 3 (<70): LOWER TRUST
- Color: Red gradient (#ef4444 to #f87171)
- Examples: Blogs, Opinion Sites, Unverified
- Show as bottom tier with caution styling

Add score numbers prominently. Show example source logos or names in each tier.
Use the Midnight Tech dark background with glowing tier separators."""
    },
    {
        "id": "technology_stack",
        "title": "Technology Stack",
        "prompt": """Create a technology stack visualization showing the 3 main AI systems powering GenuVerity.

Design as three connected hexagons or tech-styled boxes:

1. TEXT AI
   - Icon: Brain or text symbol
   - Color: Warm orange/amber (#d97706)
   - Label: "Article Generation & Analysis"

2. IMAGE AI
   - Icon: Image/chart symbol
   - Color: Google blue/green (#4285f4 / #34a853)
   - Label: "Infographic Generation"

3. SEARCH API
   - Icon: Search/magnifying glass
   - Color: Cyan/teal (#06b6d4)
   - Label: "Real-Time Source Verification"

Connect them with glowing data flow lines showing:
- User query → Text AI → Article
- Text AI → Image AI → Infographics
- Search → Text AI (sources)

Use tech-forward styling with subtle grid background."""
    },
    {
        "id": "three_panel_layout",
        "title": "Three-Panel Article Layout",
        "prompt": """Create a UI wireframe diagram showing GenuVerity's three-panel article reading layout.

Show a browser-like frame with:

LEFT PANEL (240px width):
- Header: "Research"
- Sections: Stash (3 items), Pipelines, Generating
- Color accent: Blue

CENTER PANEL (flexible width):
- Header: Article title area
- Sources drawer at top (collapsible)
- Main article content area
- Charts/infographics placeholders

RIGHT PANEL (240px width):
- Header: "Discovery"
- Sections: Related Content, Recently Viewed, Quick Query
- Color accent: Teal

Show keyboard shortcuts as small labels:
- [ = toggle left
- ] = toggle right
- S = stash
- F = focus mode

Use the Midnight Tech dark theme. Make it look like a sleek app interface."""
    }
]


def generate_diagram(diagram: dict) -> bytes:
    """Generate a single diagram using Gemini API with key rotation and retries."""
    global _current_key_index
    import time

    if not GEMINI_API_KEYS:
        print("ERROR: No GEMINI_API_KEYS configured")
        return None

    prompt = f"""Generate a professional diagram/infographic for documentation purposes.

{INFOGRAPHIC_STYLE}

DIAGRAM SPECIFICATIONS:
Title: "{diagram['title']}"

{diagram['prompt']}

MANDATORY REQUIREMENTS:
1. BACKGROUND MUST BE: Deep gradient from #050505 (near black) to #0a0a1a (dark blue-black) - NO WHITE OR LIGHT BACKGROUNDS
2. Use the specified accent colors for visual hierarchy
3. Include the "GenuVerity" watermark in bottom-left corner (Genu=white, Verity=blue)
4. Create clean, professional diagram suitable for documentation
5. Use crisp white (#ffffff) for primary text, light gray (#a0a0b0) for secondary
6. Add subtle glow effects on key elements
7. Size: 900x500 pixels (wide format for documentation)

THIS IS A DARK THEME DIAGRAM. The background MUST be nearly black (#050505 to #0a0a1a).
Do NOT use white, light gray, or any light-colored backgrounds.

Generate the Midnight Tech style diagram now."""

    # Try each key with retries
    max_retries = len(GEMINI_API_KEYS) * 3
    retry_delay = 10  # seconds between retries

    for attempt in range(max_retries):
        current_key = GEMINI_API_KEYS[_current_key_index % len(GEMINI_API_KEYS)]
        key_index = _current_key_index % len(GEMINI_API_KEYS)

        try:
            print(f"  Attempt {attempt + 1}/{max_retries} with key {key_index + 1}...", end=" ", flush=True)

            response = requests.post(
                f"{GEMINI_API_URL}/{GEMINI_IMAGE_MODEL}:generateContent?key={current_key}",
                headers={"Content-Type": "application/json"},
                json={
                    "contents": [{
                        "role": "user",
                        "parts": [{"text": prompt}]
                    }],
                    "generationConfig": {
                        "responseModalities": ["TEXT", "IMAGE"],
                        "temperature": 0.2
                    }
                },
                timeout=180
            )

            if response.status_code == 200:
                result = response.json()
                candidates = result.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    for part in parts:
                        if "inlineData" in part:
                            image_data = part["inlineData"].get("data")
                            if image_data:
                                print("SUCCESS")
                                return base64.b64decode(image_data)
                print("No image in response")
            elif response.status_code == 429:
                print(f"Rate limited, rotating key and waiting {retry_delay}s...")
                _current_key_index += 1
                time.sleep(retry_delay)
                continue
            else:
                print(f"Error {response.status_code}")
                _current_key_index += 1

        except Exception as e:
            print(f"Exception: {e}")
            _current_key_index += 1

        time.sleep(2)

    return None


def main():
    print("=" * 60)
    print("GenuVerity Methods Page Diagram Generator")
    print("=" * 60)

    if not GEMINI_API_KEY:
        print("\nERROR: GEMINI_API_KEY environment variable not set")
        print("Run: source .env.local")
        sys.exit(1)

    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"\nOutput directory: {OUTPUT_DIR}")

    print(f"\nGenerating {len(DIAGRAMS)} diagrams...")

    success_count = 0
    for i, diagram in enumerate(DIAGRAMS, 1):
        print(f"\n[{i}/{len(DIAGRAMS)}] Generating: {diagram['title']}...")

        image_data = generate_diagram(diagram)

        if image_data:
            output_path = os.path.join(OUTPUT_DIR, f"{diagram['id']}.png")
            with open(output_path, "wb") as f:
                f.write(image_data)
            print(f"  Saved: {output_path} ({len(image_data):,} bytes)")
            success_count += 1
        else:
            print(f"  FAILED: Could not generate diagram")

    print("\n" + "=" * 60)
    print(f"Complete: {success_count}/{len(DIAGRAMS)} diagrams generated")
    print("=" * 60)

    if success_count > 0:
        print("\nNext steps:")
        print("1. Review diagrams in infographics/methods/")
        print("2. Update methods.html to use generated images")
        print("3. Deploy: vercel --prod")


if __name__ == "__main__":
    main()
