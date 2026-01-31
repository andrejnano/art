# Propose

Based on the project's current state, propose the next sketch direction.

## process

1. List all existing sketches with `list_sketches`
2. Read the lineage graph — where are the evolutionary branches?
3. Query the genome — what has worked? What's unexplored?
4. Read the evolution log for recent trajectory
5. Propose 2-3 directions with clear rationale

## considerations

- **Coverage** — what algorithmic territories are unexplored? (e.g., if all sketches use flow fields, propose something structural)
- **Depth** — which existing sketches have untapped evolution potential?
- **Contrast** — sometimes the best next piece is the opposite of recent work
- **Technique** — what computational techniques haven't been used yet?
- **Lineage gaps** — are there branches that dead-ended too early?

## proposal format

For each direction:

```
### direction: [name]

**concept**: one sentence
**technique**: what algorithm/approach
**evolves from**: which sketch (or "new root" for a fresh lineage)
**why now**: what makes this the right next move
**risk**: what could go wrong or be uninteresting
```

## anti-patterns

- Don't propose variations so minor they're not worth a new sketch
- Don't propose techniques just because they're trendy — they should serve the project's evolution
- Don't ignore the lineage — the project has memory, use it
- Don't only propose safe extensions — at least one proposal should be a risk
