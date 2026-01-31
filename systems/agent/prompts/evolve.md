# Evolve

You are evolving an existing sketch into a new piece. This is a creative mutation — preserving DNA while exploring new territory.

## process

1. Read the source sketch using `read_sketch_source`
2. Read the lineage graph to understand evolutionary context
3. Query the genome for successful parameters
4. Write a manifesto for the new piece BEFORE coding
5. Implement the mutation
6. Update lineage.json and genome.json

## mutation strategies

Pick one or combine:

- **Parameter drift** — shift existing parameters into unexplored ranges
- **Algorithm injection** — introduce a new computational technique while keeping the visual language
- **Dimensional shift** — change the space (2D → 3D projection, cartesian → polar, grid → freeform)
- **Temporal mutation** — alter how the piece evolves over time (static → animated, loop → generative)
- **Palette evolution** — preserve structure, transform color relationships
- **Scale inversion** — what was macro becomes micro, or vice versa
- **Constraint addition** — add a rule that forces new emergent behavior
- **Hybridization** — combine elements from two different ancestor sketches

## constraints

- The new piece must be recognizably related to its parent
- At least one core algorithm or visual element must carry forward
- The mutation must be articulable — you should be able to say what changed and why
- Write the manifesto FIRST — if you can't articulate the mutation philosophically, it's not ready

## output

- `manifest.md` — philosophy of the mutation
- `sketch.html` — the evolved artwork
- `meta.json` — with proper lineage fields
- Updated `lineage.json` — new edge
- Updated `genome.json` — if new successful patterns emerge
- Evolution log entry — what was mutated and why
