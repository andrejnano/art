# Curl erosion

> What if the current couldn't cross itself — and the constraint carved landscapes?

## concept

Flow Field (001) let particles follow raw noise gradients, producing trails that cross and overlap freely. Curl Erosion asks: what happens when we replace that with curl noise — a divergence-free field where flow lines never intersect?

The result is fundamentally different. Instead of overlapping rivers, you get erosion patterns — channels that carve deeper over time, creating ridges and valleys. Particles become water. The canvas becomes terrain. Time becomes geological.

## algorithm

1. Curl noise field: compute the curl of the 2D noise function, producing a divergence-free vector field (particles follow contour lines of the noise, never crossing)
2. Particles deposit "erosion" — they darken or lighten the canvas where they travel, building up topographic texture
3. Particles have limited lifespans: they're born, carve their channel, and die. New particles spawn to continue the process
4. Over time, high-traffic areas accumulate more erosion, creating visible drainage patterns
5. Noise evolves slowly, so the erosion shifts — old channels dry up, new ones form

## aesthetic intent

Monochromatic or near-monochromatic. Think aerial photography of river deltas, or electron microscope images of eroded surfaces. The beauty should be in the texture, not the color. Subtle warm/cool temperature shifts to indicate erosion depth.

## lineage

Direct mutation from 001 (Flow Field). Core change: raw noise gradient → curl noise. This is the simplest meaningful evolution — a single algorithmic substitution that produces fundamentally different emergent behavior.

**What carries forward**: particle system, noise-driven flow, trail accumulation, seed-based reproducibility
**What mutates**: flow field type (gradient → curl), visual language (luminous trails → carved texture), particle lifecycle (immortal → mortal)

## parameters

- **curl scale** — frequency of the underlying noise field. Controls the grain of the erosion
- **erosion strength** — how much each particle darkens/lightens the canvas per frame
- **lifespan** — how many frames a particle lives before respawning
- **particle count** — density of erosion agents
- **evolution rate** — how fast the noise field shifts over time

## open questions

- Could the erosion depth be used as a height map for 3D rendering?
- What if particles left actual color deposits — a geological strata of previous flows?
- Could two competing curl fields (different scales) create interference erosion patterns?
