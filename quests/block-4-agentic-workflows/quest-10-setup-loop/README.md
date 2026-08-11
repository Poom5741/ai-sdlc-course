# Quest 4.1: Set Up a Loop

**Block**: 4 - Agentic Workflows | **Difficulty**: 🟢 Easy | **Time**: 15 minutes

## 🎯 Learning Objectives

- Configure an automated dev loop (generate → verify → retry).
- **Automate the verify step** — the loop must call a deterministic check every iteration, not eyeball results.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/block-4-agentic-workflows/quest-10-setup-loop my-quest
cd my-quest
```

1. Read the contract in `problem.js`: `generate(iteration)` returns a draft number; the working `generate` returns `42` from iteration 3 onward (wrong before). `runLoop({ maxIterations })` must loop `generate` + `verify` and stop as soon as `verify` passes.
2. Prompt the AI for `generate` that varies by iteration.
3. Prompt the AI for `runLoop` that loops + auto-verifies + handles `maxIterations < 1`.
4. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` checks: `generate` is a function returning numbers, `runLoop({maxIterations:5})` converges within 3 iterations, `runLoop({maxIterations:2})` does NOT converge (too small), and `maxIterations < 1` is rejected without crashing.

## 💡 Hints

- A loop that calls `generate` once and calls it a day is not a loop — iterate.
- `maxIterations < 1` must return `{ converged:false }`, not throw (the test catches AI that forgets the guard).
- Stop iterating the moment `verify` passes; don't always run to the max.