# Backlog: future directions

---

## 1. Interactive particle physics

Make the particle systems respond to user input and to each other.

### User interaction (start here)

- Raycast from mouse/touch into 3D scene
- Spherical influence zone around cursor position
- Interaction modes: attract, repel, stir, spawn
- Swipe/drag creates directional force (wind)
- Click to place persistent gravity wells or repellers
- Scroll wheel controls influence radius

### Inter-particle physics (harder)

- **Spatial hashing** for efficient neighbor lookup — partition 3D space into grid cells, only check neighbors in adjacent cells. O(n) instead of O(n²)
- Repulsion forces between nearby particles (prevents clumping)
- Flocking behavior (boids): alignment, cohesion, separation
- Spring/constraint systems between particles within a distance threshold
- Particle mass and momentum — heavier particles pull lighter ones

### Performance considerations

- 1M point collision detection is infeasible on CPU even with spatial hashing
- Two viable paths:
  - **Reduce interactive subset**: only 1k-10k "active" particles have physics, rest are passive trail points
  - **GPU compute**: WebGPU compute shaders for massively parallel spatial hashing + force calculation. Three.js r170+ has `WebGPURenderer` but it's experimental. Alternatively, use transform feedback in WebGL2 for position updates
- Start simple: user interaction only (no inter-particle), just a force field influence from cursor. This is cheap — one raycast per frame, apply force falloff to all particles within radius

### Starting point for a sketch

- Fork 003 Strange Attractor
- Add mouse raycasting via `THREE.Raycaster` on a plane at z=0 (or project onto attractor center)
- Cursor creates a temporary force that perturbs attractor trajectories
- The attractor tries to pull particles back to its natural orbit, cursor fights it
- Visual: you can "stir" the nebula and watch it re-form

---

## 2. AI agents in generative simulation environments

Put autonomous agents into the rendering systems. Agents perceive, decide, act, and communicate within the particle world.

### What an agent is

- Has state: position (x,y,z), energy, memory, goals
- Perceives: local particle density, nearby agents, field values, distance to attractor cores
- Decides: where to move, what to emit, who to communicate with
- Acts: moves through space, leaves trails, modifies local force fields, sends messages
- Rendered as: distinct glowing entity within the particle cloud (larger point, different color, halo)

### Architecture tiers (increasing complexity)

**Tier 1 — Rule-based agents (pure JS, no API)**

- Finite state machines or behavior trees
- Rules like: "if energy low, move toward high-density region" / "if near another agent, share position data"
- Fast, runs in animation loop, thousands of agents feasible
- Emergent behavior from simple rules (ant colony, slime mold, flocking)
- This alone could be a fascinating sketch — watch rule-based agents self-organize within an attractor field

**Tier 2 — Neuroevolution (in-browser neural nets)**

- Small feedforward nets (10-50 weights) controlling each agent
- Inputs: local sensor readings (density, gradient, neighbor positions)
- Outputs: movement direction, action selection
- Train via genetic algorithm: spawn population, evaluate fitness, breed winners
- Libraries: TensorFlow.js for net execution, custom GA for evolution
- Could evolve agents that "learn" to navigate the attractor efficiently or form stable patterns

**Tier 3 — LLM-powered agents (API calls)**

- Each agent periodically calls an LLM to make high-level decisions
- Prompt includes: agent state, local observations, message history, goal
- Response: next action, message to broadcast, strategy update
- Expensive and slow — maybe 1 decision per agent per 5-10 seconds
- **Hybrid approach**: LLM sets strategy/goals infrequently, neural net handles frame-by-frame movement
- Interesting experiment: can LLM agents develop emergent communication protocols?

### The "map" / environment

- **Option A**: The attractor IS the map — agents navigate phase space, the attractor's orbit structure creates natural pathways and basins
- **Option B**: 2D/3D terrain generated from noise — more traditional game-like map with regions, resources, obstacles
- **Option C**: Network/graph — agents on nodes, connections are edges, communication over the graph
- **Option D**: The particle field itself — agents influence and are influenced by the flow. Stigmergy: agents modify the environment (deposit "pheromones" as field perturbations), others sense changes

### Communication mechanisms

- **Pheromone trails**: agent modifies local noise field values, creates gradients others can follow. Decays over time. (Ant colony)
- **Direct messaging**: agents within proximity radius can exchange structured data
- **Broadcast signals**: agent emits a pulse that modifies a global parameter temporarily
- **Stigmergy**: modify the environment, let others read it. No direct communication needed — just shared medium
- **Visual**: communication events rendered as brief light pulses or connecting lines between agents

### What makes this hard

- LLM latency vs real-time rendering (60fps). Can't block the render loop for API calls
- Async decision pipeline: queue decisions, apply when ready, interpolate movement between decisions
- Cost: even cheap models add up with many agents making frequent calls
- State management: serializing agent memory/context efficiently
- Determinism: seeded simulations become non-deterministic with LLM calls (different responses each time)

### Pragmatic starting point

1. Start with Tier 1 (rule-based) as a new sketch
2. 20-50 agents navigating within the Thomas attractor field
3. Simple rules: seek energy (high-density regions), avoid crowding, leave fading trails
4. Agents rendered as larger bright points with halos
5. Watch emergence: do they cluster? form convoys? oscillate between attractor lobes?
6. Add communication later: pheromone-like field modifications
7. LLM integration as a separate experiment after the rule-based version works
