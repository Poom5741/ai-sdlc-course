#!/usr/bin/env bash
# Verifies the local-runnable quest system WITHOUT modifying shipped starters.
#
# For every quest directory (quests/block-*/quest-*/) two checks run:
#   1. STRUCTURE — the required files exist: problem.js (empty learner starter),
#      _solution/solution.js (reference), test.js (validator), README.md.
#   2. SOLUTION — the reference solution actually passes its own test.js. This
#      is done in a throwaway temp copy so the shipped problem.js starter is
#      never touched. Design-doc quests also copy their _solution/*.md reference.
#
# Exit 0 only if every quest passes both checks.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REQUIRED="problem.js _solution/solution.js test.js README.md"
failed=""

for d in quests/block-*/quest-*/; do
  name="$(basename "$d")"
  for f in $REQUIRED; do
    if [ ! -f "$d/$f" ]; then
      echo "MISSING STRUCTURE: $name/$f"
      failed="$failed $name"
    fi
  done

  tmp="$(mktemp -d)"
  cp -r "$d"/. "$tmp"/
  cp "$tmp/_solution/solution.js" "$tmp/problem.js"
  # Design-doc quests (1.3, 3.3, 5.1, 5.2) validate a learner-written .md; copy
  # the reference into the temp quest root so their test.js can find it.
  cp "$tmp/_solution/"*.md "$tmp"/ 2>/dev/null || true

  if ! (cd "$tmp" && node test.js >/dev/null 2>&1); then
    echo "SOLUTION FAIL: $name"
    failed="$failed $name"
  fi
  rm -rf "$tmp"
done

if [ -n "$failed" ]; then
  echo "FAILED quests:$failed"
  exit 1
fi

echo "All quests: structure + solution PASS"