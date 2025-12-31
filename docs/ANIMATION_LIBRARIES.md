# Animation Libraries for GenuVerity

## Current Stack
- **GSAP + ScrollTrigger** - Timeline animations, scroll-driven effects
- **Three.js** - 3D WebGL rendering (network graph)
- **D3.js** - Data visualization, force-directed graphs
- **Canvas 2D** - Particle effects, custom animations

## Recommended Additions

### Tier 1: High Impact, Worth Adding

| Library | Use Case | Why |
|---------|----------|-----|
| **[Pts.js](https://ptsjs.org/)** | Creative coding, generative art | Lightweight, expressive API for particles, physics, and procedural graphics. Already used in experiments. |
| **[Anime.js](https://animejs.com/)** | UI micro-interactions | Cleaner syntax than GSAP for simple animations, great for hover effects and transitions. |
| **[tsParticles](https://particles.js.org/)** | Particle backgrounds | Production-ready particle system, React/Vue wrappers available. |

### Tier 2: Specialized, Consider for Specific Features

| Library | Use Case | Why |
|---------|----------|-----|
| **[Theatre.js](https://www.theatrejs.com/)** | Animation sequencing | Visual editor for complex timelines, good for narrative experiences. |
| **[mo.js](https://mojs.github.io/)** | Motion graphics | Declarative motion graphics, great for icons and UI feedback. |
| **[Matter.js](https://brm.io/matter-js/)** | Physics simulations | 2D physics engine for realistic interactions. |
| **[Rough.js](https://roughjs.com/)** | Hand-drawn aesthetics | Sketchy, hand-drawn style graphics for more organic feel. |

### Tier 3: Future Consideration

| Library | Use Case | Notes |
|---------|----------|-------|
| **[PixiJS](https://pixijs.com/)** | High-performance 2D | WebGL 2D renderer, overkill unless we need 60fps with thousands of elements |
| **[p5.js](https://p5js.org/)** | Generative art | Great for creative coding, but adds 1MB+ to bundle |
| **[Zdog](https://zzz.dog/)** | Pseudo-3D illustration | Cool for icons, but limited use case |

## Experimental Mockups Created

I created 7 experimental visualizations in `experiments/web-of-lies-mockups.html`:

### 1. Viral Spread Particle System
**Tech:** Canvas 2D, Custom Particle Class
- Exponential spread visualization
- Mutation tracking (color changes)
- Fact-check intervention effect
- Real-time stats overlay

### 2. Narrative Mutation Tree
**Tech:** D3.js Hierarchical Tree
- Shows how claims evolve as they spread
- Mutation type labels (escalation, inversion, addition)
- Example: "5G causes COVID" branching into variants

### 3. Echo Chamber Visualization
**Tech:** Pts.js Physics
- Particles bouncing within isolated bubbles
- Connection lines between nearby particles
- Shows information trapped in closed communities

### 4. Bot Network Grid
**Tech:** SVG + D3.js
- Grid of "accounts"
- Coordinated wave patterns reveal bot activity
- Organic vs coordinated activity comparison
- Real-time coordination score

### 5. Trust Erosion
**Tech:** GSAP + CSS
- Interactive trust bars for Media, Science, Gov, Elections
- "Inject Disinformation" degrades trust
- "Deploy Fact-Check" partially restores
- Event log tracks incidents

### 6. Source Laundering Flow (Sankey-style)
**Tech:** D3.js Paths
- Shows journey from fringe to mainstream
- Origin → Amplification → Mainstream → Legitimized
- Flow thickness indicates narrative strength

### 7. Web of Lies Network
**Tech:** D3.js Force Graph
- Interconnected conspiracy theory nodes
- Drag to explore connections
- Color-coded by category
- Shows how seemingly unrelated theories link

## Implementation Recommendations

### For Next Timeline/Experience:

1. **Add Pts.js** for organic particle effects
   - Already works well (tested in Echo Chamber mockup)
   - Minimal bundle size (~50KB)
   - Great for atmospheric effects

2. **Use D3.js Sankey** for source laundering visualizations
   - Shows information flow beautifully
   - Interactive highlighting on hover

3. **Consider Theatre.js** for complex narrative sequences
   - Would help with timing of multi-part animations
   - Visual editor speeds up iteration

### Quick Wins:

- The **Viral Spread** particle system could be added to disinformation reports
- The **Trust Erosion** widget could be a standalone interactive
- The **Bot Network** grid could visualize real Meta/Twitter takedown data

## Performance Notes

- Current stack (GSAP + Three.js + D3) is already heavy
- Add libraries incrementally, not all at once
- Pts.js and Anime.js have minimal overhead
- Avoid PixiJS unless we need extreme performance

## File Locations

- Experiments: `/experiments/web-of-lies-mockups.html`
- Timeline: `/timeline.html`
- Sound system: Built into timeline.html (lines 3500-3850)

---

*Generated during overnight research session - Dec 31, 2025*
