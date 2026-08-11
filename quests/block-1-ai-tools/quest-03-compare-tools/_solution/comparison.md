# Compare Tools — reference comparison (do NOT copy; write your own)

> This is a REFERENCE shape for `comparison.md`. The learner writes their own
> from a real head-to-head run. Do not ship this to learners; it lives in
> `_solution/` to keep the validator green for maintainers.

## Tool

Compared GitHub Copilot (VS Code) and Claude Code (terminal) on the same
prompt: "Write a JavaScript sortByKey(array, key, ascending) function that
returns a new sorted array without mutating the input."

## Output

- **Copilot** produced a compact comparator using `aVal - bVal` for numbers and
  `localeCompare` for strings, with an `ascending ? cmp : -cmp` flip. About 12
  lines, no edge-case handling for `undefined` values.
- **Claude Code** produced a longer version with explicit `undefined` guards
  (push missing-key entries to the end) and the same ascending/descending flip.
  About 18 lines, more defensive.

## Better

For this workshop, **Claude Code** was the better tool for this prompt.

## Why

The naive Copilot output silently sorted `undefined` values as NaN, which
breaks on messy data. Claude Code defended against it up front. The trade-off
is verbosity — for a quick prototype, Copilot's shorter output is fine; for
production code that must survive bad data, the defensive version wins. The
lesson: calibrate which tool fits which job, rather than defaulting to one.