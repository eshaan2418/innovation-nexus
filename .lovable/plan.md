
# Academic Research Website — Circular Layered Diagram

## Hero Section — Interactive Concentric Diagram
A full-viewport dark background (#111111) with a large, centered SVG-based concentric circular diagram:

- **Center Circle** — Black (#000000) with "MTech Invite" in white, IBM Plex Sans SemiBold
- **Second Ring** — Red (#CC3333) with "Entrepreneurship" text curved along the ring
- **Third Ring** — Three equal segments with research domains:
  - Segment 1 (#B7AEA9): Advanced Materials, Biomaterials, Development, Modelling, Characterisation
  - Segment 2 (#D6CFCA): Additive Manufacturing, Medtronics, Aerospace, Machine Learning
  - Segment 3 (#686260): Sustainable Energy, Environmental Technologies
- **Outer Nodes** — 10 professor circles (#000000) evenly distributed around the perimeter

## Interactions
- Hovering a professor node shows a popover card with name, lab, and research interests
- Hovering a research segment slightly scales/highlights it with smooth 250ms ease transitions
- All animations are subtle and minimal

## Below the Diagram — Three Content Sections
1. **About the Program** — Description of the MTech Invite program
2. **Research Areas** — Cards or grid summarizing the research domains from the diagram
3. **Faculty Network** — Grid of professor cards with brief info

## Styling
- Font: IBM Plex Sans (imported from Google Fonts) — Light, Regular, Medium, SemiBold
- Buttons: #CC3333 background, white text, 6px rounded corners
- Dark background throughout hero, lighter sections below

## Responsive Behavior
- Diagram scales down proportionally on smaller screens
- Professor nodes reflow or appear in a scrollable layout on mobile
- Text wraps cleanly within segments

## Technical Approach
- SVG for the concentric rings and segments (precise arcs and positioning)
- React components for each layer, with hover state management
- Tailwind for layout and spacing; inline styles for SVG colors
- No backend needed — all content is static
