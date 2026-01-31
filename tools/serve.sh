#!/usr/bin/env bash
set -euo pipefail

# Start dev server with live reload.
# Usage: ./tools/serve.sh [port]

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"
PORT="${1:-3333}"

cd "$ROOT"

if command -v pnpm &>/dev/null; then
  exec pnpm exec live-server --port="$PORT" --no-browser
elif [ -x "$ROOT/node_modules/.bin/live-server" ]; then
  exec "$ROOT/node_modules/.bin/live-server" --port="$PORT" --no-browser
else
  echo "live-server not found. Run: pnpm install"
  exit 1
fi
