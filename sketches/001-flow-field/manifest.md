# Flow field

> Particles surrendering to an invisible current, tracing the topology of noise space.

## concept

A flow field is one of generative art's fundamental forms — a vector field derived from noise, made visible by particles that follow it. This piece explores the tension between order and chaos: the noise function defines a deterministic landscape, but the cumulative path of thousands of particles creates emergent texture that feels organic and alive.

The question: what does noise look like when you let it accumulate over time?

## algorithm

1. A 2D Perlin noise field defines a direction at every point in space
2. Particles are born at random positions (seeded)
3. Each frame, particles move in the direction the noise field prescribes at their location
4. Particles draw semi-transparent lines as they move, building up density over time
5. Noise is offset by time, so the field slowly evolves — the currents shift
6. Domain warping (noise-of-noise) adds a second layer of organic distortion

## aesthetic intent

Dark background. Thin, luminous trails that build into dense rivers and empty voids. The palette should feel like bioluminescence — bright traces against deep black. The overall impression should be of watching currents in deep water, or wind patterns made visible.

Density matters: the image should reward patience. Early frames show sparse trails; given time, the structure of the underlying field reveals itself.

## lineage

This is the root. Sketch 001. The origin of the project's evolutionary tree. Flow fields are chosen as the starting point because they're a generative primitive — nearly every other technique can be understood as a mutation of field-driven particle movement.

## parameters

- **noise scale** — controls the frequency of the flow field. Low values = large, sweeping currents. High values = turbulent, detailed flow
- **particle count** — how many particles trace the field simultaneously. More = faster density buildup, denser texture
- **speed** — how fast particles move through the field. Affects trail length and visual rhythm
- **fade rate** — how quickly the background fades. Low = long persistence, ghostly trails. High = only recent paths visible
- **warp intensity** — strength of domain warping. Zero = pure noise field. High = heavily distorted, almost biological forms

## open questions

- What happens when the noise field is derived from curl noise instead of raw Perlin? (preserves flow continuity)
- Could particles carry color that changes based on their velocity or the local noise gradient?
- What if particles had different lifespans, creating a birth/death cycle?
