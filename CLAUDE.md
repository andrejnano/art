# Art — Recursive Generative Art Playground

A self-evolving system of algorithmic artworks where each piece has lineage, the collection has memory, and an AI agent participates as creative collaborator.

## Project structure

```
art/
├── sketches/NNN-name/     # Numbered, self-contained artworks
│   ├── manifest.md        # Philosophy/manifesto (written FIRST)
│   ├── sketch.html        # Standalone interactive artwork
│   └── meta.json          # Machine-readable metadata + lineage
├── lib/                   # Shared utilities (palette, noise, seed)
├── systems/               # Recursive infrastructure
│   ├── lineage.json       # Directed graph of sketch ancestry
│   ├── genome.json        # Evolving aesthetic parameters
│   ├── evolution-log.md   # Chronicle of development
│   └── agent/             # MCP server + creative prompts
├── templates/             # Sketch and manifest templates
└── tools/                 # Dev utilities (serve, scaffold, gallery)
```

## Workflow: creating a new sketch

**Manifesto-first. Always.**

1. Think about what you want to explore — concept, algorithm, aesthetic
2. Run `./tools/new-sketch.sh "Name"` to scaffold
3. Write `manifest.md` BEFORE touching code — articulate the philosophy
4. Implement `sketch.html` — self-contained, opens in any browser
5. Fill `meta.json` — seed, params, tags, lineage
6. Update `systems/lineage.json` if evolving from another sketch
7. Update `systems/genome.json` with successful parameters
8. Append to `systems/evolution-log.md`
9. Commit with message: `sketch NNN: name — one-line philosophy`

## Naming conventions

- Sketches: `NNN-kebab-case-name` (e.g., `001-organic-turbulence`)
- Numbering: zero-padded 3 digits, sequential
- Branches: `sketch/NNN-name` for work-in-progress

## Sketch requirements

Every sketch MUST:
- Be a single self-contained HTML file (no build step)
- Work when opened directly in a browser (file:// protocol OK)
- Include seed-based randomness (reproducible with same seed)
- Have sidebar controls: seed navigation (prev/next/random/input), parameter sliders
- Load p5.js from CDN
- Include the sketch name and seed in the UI

Every sketch SHOULD:
- Be interactive (mouse, keyboard, or both)
- Have at least 2 tunable parameters exposed in the sidebar
- Include a brief description visible in the UI

## meta.json schema

```json
{
  "id": "NNN",
  "name": "Human Readable Name",
  "created": "YYYY-MM-DD",
  "philosophy": "manifest.md",
  "libraries": ["p5.js"],
  "tags": ["tag1", "tag2"],
  "defaultSeed": 42,
  "params": {
    "paramName": { "default": 0.5, "min": 0, "max": 1, "step": 0.01 }
  },
  "recursion": {
    "level": 0,
    "ancestors": [],
    "mutations": ["what changed from parent"],
    "evolvesFrom": null
  }
}
```

## Recursion protocol

When creating a sketch that evolves from an existing one:

1. Set `recursion.evolvesFrom` to parent sketch ID
2. Add parent (and its ancestors) to `recursion.ancestors`
3. Increment `recursion.level`
4. Describe mutations in `recursion.mutations`
5. Add edge to `systems/lineage.json`
6. In the manifest, reference the parent and articulate what's changing and why

## Aesthetic identity

- Dark canvas backgrounds — the art provides the color
- UI is minimal, utilitarian, monospace — the frame doesn't compete with the art
- Typeface: JetBrains Mono (primary), serif accent for titles
- Gallery feel: clean walls, the work is the focus

## Technology

- JavaScript (not TypeScript) — creative coding is exploratory
- p5.js for rendering
- No build system — raw HTML files
- live-server for hot reload during dev
- Git history is project memory

## Agent role

Claude Code is a creative collaborator, not just an executor. When working on this project:

- Read the lineage graph before proposing new work
- Reference the genome for aesthetic parameters that have worked
- Write manifesto BEFORE implementation
- Critique your own work — what works? what could evolve?
- Propose evolutionary directions, not just execute instructions
- Append to evolution-log.md when making creative decisions

Use the MCP server tools to query project state programmatically.

## Commands

```bash
pnpm dev              # Start live-server with hot reload
./tools/new-sketch.sh "Name"  # Scaffold new sketch
./tools/build-gallery.sh      # Regenerate gallery from metadata
```

## Never

- Use Anthropic branding or default Claude styling
- Create sketches without a manifest
- Break standalone operation (every sketch.html must open alone)
- Commit without a descriptive message
- Skip lineage tracking for evolved sketches
