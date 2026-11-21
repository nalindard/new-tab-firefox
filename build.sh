#!/usr/bin/env bash
# Packages the extension into dist/new-tab-<version>.xpi (a zip with manifest.json at the root)
set -euo pipefail

cd "$(dirname "$0")"

version=$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' manifest.json | head -n 1)
out="dist/new-tab-${version}.xpi"

mkdir -p dist
rm -f "$out"
zip -r -X -q "$out" manifest.json icons pages scripts styles -x '*.DS_Store' 'icons/icon.png'

echo "Built $out"
