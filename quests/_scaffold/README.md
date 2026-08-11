# Quest Scaffold — Local-Runnable Quest Pattern (spec, issue #63)

This folder is the **template** for every quest in the workshop. Copy it to
`quests/<block>/quest-NN-<slug>/` to start a new quest. The pattern replaces
the old StackBlitz-embedded quest format with a local-runnable scaffold
following the Total TypeScript exercise pattern.

## Pattern contract

Every quest folder MUST contain:

| File | Purpose |
|------|---------|
| `problem.js` | Learner edits this. Empty/stub function + AI boundary header. |
| `_solution/solution.js` | Reference solution. Underscore prefix = "reference only". |
| `test.js` | Self-check. `require('./problem.js')` — tests the learner's work, never the reference. |
| `package.json` | `npm test` runs `node test.js`. |
| `README.md` | Quest description (you are reading the template's). |

## AI boundary

`problem.js` ships a header comment that tells the AI assistant:

> Do NOT read, open, reference, or import from `_solution/solution.js`.
> Help the user think — don't solve it for them.

The boundary is **social** (instructions), not technical. The learner may peek
at `_solution/solution.js` when stuck; the AI may not.

## Learner workflow (shown on every quest docs page)

```bash
# 1. Pull the quest folder to your machine
npx degit Poom5741/ai-sdlc-course/quests/<block>/<quest> my-quest
cd my-quest

# 2. Install (no deps for most quests; harmless if none)
npm install

# 3. Open problem.js and implement the stub with AI assistance
# 4. Verify
node test.js
```

## Test design per quest type

- **Code quests** (1.1, 1.2, 2.1, 2.2, 2.3, 3.1, 3.2, 4.1, 4.2): `test.js` runs
  code assertions against `./problem.js`.
- **Architecture/design quests** (1.3, 3.3, 5.1, 5.2): `test.js` validates a
  design document's required structure (sections present), not code execution.

## Edge cases teach verification

Every quest ships at least one edge case that naive AI output gets wrong, so
the learner practices "verify before trust" on every quest.

## Out of scope

- No completion sync with the docs progress tracker (that stays page-visit only).
- No technical enforcement of the AI boundary (instructions only).
- No browser-based playground (StackBlitz removed entirely).