#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$ROOT_DIR"

echo "=== Webpack 5 smoke test ==="
npx webpack --config tests/bundler/webpack5.config.js
echo "Webpack 5: OK"

echo ""
echo "=== Vite smoke test ==="
npx vite build --config tests/bundler/vite.config.js
echo "Vite: OK"

# Cleanup
rm -rf tests/bundler/dist-webpack tests/bundler/dist-vite

echo ""
echo "All bundler smoke tests passed."
