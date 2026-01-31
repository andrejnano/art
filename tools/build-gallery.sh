#!/usr/bin/env bash
set -euo pipefail

# Regenerate gallery data from sketch metadata.
# The gallery (index.html) reads this at runtime via fetch.
# Usage: ./tools/build-gallery.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"

echo "["
FIRST=true
for dir in "$ROOT/sketches/"[0-9][0-9][0-9]-*/; do
  if [ -f "$dir/meta.json" ]; then
    if [ "$FIRST" = true ]; then
      FIRST=false
    else
      echo ","
    fi
    cat "$dir/meta.json"
  fi
done
echo "]"
