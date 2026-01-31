# Strange Attractor

> Cyclic symmetry in three dimensions — one parameter governs chaos and order.

## concept

001 and 002 are stochastic — particles surrendering to noise, tracing fields that could have been otherwise. This piece asks the opposite question: what happens when every point is predetermined?

The Thomas attractor is a cyclically symmetric system in 3D. Three equations, one parameter. The damping coefficient b controls the boundary between chaotic wandering and orderly spirals. Near b = 0.208186, the system sits at the edge — neither fully chaotic nor fully periodic. The trajectory never repeats but never escapes.

## algorithm

Thomas attractor:
```
dx/dt = sin(y) - b * x
dy/dt = sin(z) - b * y
dz/dt = sin(x) - b * z
```

Each variable feeds into the next in a cycle (x -> z -> y -> x through the sin terms). The damping term b*x pulls each dimension toward zero. Integration produces a continuous trajectory through 3D space that traces the attractor's structure over time.

## aesthetic intent

A luminous thread weaving through dark space, tracing paths that fold back on themselves without ever closing. The 3D structure reveals itself as you orbit the camera — what looks like noise from one angle resolves into clear channels from another. Color shifts along the trajectory create depth and direction.

## lineage

New root. Contrasts the noise-driven particle work of 001/002 with pure deterministic iteration. Where 001 and 002 use many independent particles exploring a field, 003 follows a single trajectory through phase space.

## parameters

- **b (damping)** — the single parameter that defines the attractor's character. Lower values = more chaotic. Higher values = tighter spirals that decay. The classic value 0.208186 sits at the edge.
- **dt (time step)** — integration step size. Smaller = more accurate but slower to fill the attractor.
- **scale** — spatial scaling of the attractor in the viewport.
- **pts/frame** — how many integration steps per animation frame.
- **color shift** — rotates the hue mapping along the trajectory.
- **trail length** — how much of the trajectory is visible at once.

## open questions

- What if two trajectories with different initial conditions traced the same attractor simultaneously?
- Could the damping parameter b be modulated by audio input?
- What happens at the transition between different attractor basins?
