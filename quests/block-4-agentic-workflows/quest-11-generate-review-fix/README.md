# Quest 4.2: Generate-Review-Fix

**Block**: 4 - Agentic Workflows | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Add a review step to the generate loop.
- **Separate generation from review** — a different "agent" must critique the generator's output; the generator must not grade itself.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/block-4-agentic-workflows/quest-11-generate-review-fix my-quest
cd my-quest
```

1. Read the contract in `problem.js`: `runGenerateOnly({generator, qualityTest, seed})` runs the generator once. `runGrfLoop({generator, reviewer, fixer, qualityTest, maxIterations, seed})` loops generate→review→fix until issues are empty.
2. Prompt the AI for `runGenerateOnly` (trivial).
3. Prompt the AI for `runGrfLoop` that genuinely calls `reviewer(draft)` and `fixer(draft, issues)`.
4. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts that `runGrfLoop(...).finalScore` is STRICTLY greater than `runGenerateOnly(...).finalScore`, that the GRF draft has no remaining defects, and that `maxIterations:0` does not crash. A pass-through stub (which returns the generator's raw draft) TIES generate-only → fails.

## 💡 Hints

- The reviewer and fixer are passed in by the test — your orchestrator only wires them together. Don't bake roles into the loop.
- Stop the loop the moment `reviewer` returns zero issues; don't always iterate to `maxIterations`.
- The test catches AI that returns the generator's draft unchanged in `runGrfLoop` (no separation of generation from review).