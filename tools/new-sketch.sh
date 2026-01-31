#!/usr/bin/env bash
set -euo pipefail

# Scaffold a new sketch directory from templates.
# Usage: ./tools/new-sketch.sh "Sketch Name" [--from NNN]

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"

if [ -z "${1:-}" ]; then
  echo "Usage: $0 \"Sketch Name\" [--from NNN]"
  exit 1
fi

NAME="$1"
EVOLVES_FROM=""

# Parse optional --from flag
if [ "${2:-}" = "--from" ] && [ -n "${3:-}" ]; then
  EVOLVES_FROM="$3"
fi

# Determine next sketch number
LAST_DIR=$(ls -d "$ROOT/sketches/"[0-9][0-9][0-9]-* 2>/dev/null | sort | tail -1 || echo "")
if [ -n "$LAST_DIR" ]; then
  LAST=$(basename "$LAST_DIR" | cut -c1-3)
else
  LAST="000"
fi
NEXT=$(printf "%03d" $((10#$LAST + 1)))

# Kebab-case the name
KEBAB=$(echo "$NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')

DIR="$ROOT/sketches/${NEXT}-${KEBAB}"
mkdir -p "$DIR"

# Copy and fill templates
sed \
  -e "s/{{ID}}/${NEXT}/g" \
  -e "s/{{NAME}}/${NAME}/g" \
  -e "s/{{DESCRIPTION}}/TODO/g" \
  "$ROOT/templates/sketch-template.html" > "$DIR/sketch.html"

sed \
  -e "s/{{NAME}}/${NAME}/g" \
  -e "s/{{ONE_LINE_PHILOSOPHY}}/TODO/g" \
  "$ROOT/templates/manifest-template.md" > "$DIR/manifest.md"

# Build meta.json
ANCESTORS="[]"
LEVEL=0
MUTATIONS="[]"

if [ -n "$EVOLVES_FROM" ]; then
  PARENT_DIR=$(ls -d "$ROOT/sketches/${EVOLVES_FROM}-"* 2>/dev/null | head -1)
  if [ -n "$PARENT_DIR" ] && [ -f "$PARENT_DIR/meta.json" ]; then
    # Inherit ancestors from parent + parent itself
    PARENT_ANCESTORS=$(sed -n 's/.*"ancestors"[[:space:]]*:[[:space:]]*\(\[[^]]*\]\).*/\1/p' "$PARENT_DIR/meta.json" || echo "[]")
    PARENT_LEVEL=$(sed -n 's/.*"level"[[:space:]]*:[[:space:]]*\([0-9]*\).*/\1/p' "$PARENT_DIR/meta.json" || echo "0")
    LEVEL=$((PARENT_LEVEL + 1))
    # Merge parent into ancestors list
    ANCESTORS=$(echo "$PARENT_ANCESTORS" | sed "s/\]/, \"${EVOLVES_FROM}\"]/" | sed 's/\[, /[/')
  fi
fi

cat > "$DIR/meta.json" << EOF
{
  "id": "${NEXT}",
  "name": "${NAME}",
  "created": "$(date +%Y-%m-%d)",
  "philosophy": "manifest.md",
  "libraries": ["p5.js"],
  "tags": [],
  "defaultSeed": 42,
  "params": {},
  "recursion": {
    "level": ${LEVEL},
    "ancestors": ${ANCESTORS},
    "mutations": ${MUTATIONS},
    "evolvesFrom": $([ -n "$EVOLVES_FROM" ] && echo "\"${EVOLVES_FROM}\"" || echo "null")
  }
}
EOF

echo "Created sketch: $DIR"
echo "  1. Write manifest.md (philosophy first)"
echo "  2. Implement sketch.html"
echo "  3. Update meta.json with tags and params"
