# Quest 4.3: Multi-Agent Pipeline

**Block**: 4 - Agentic Workflows | **Difficulty**: 🔴 Hard | **Time**: 25 minutes

## 🎯 Learning Objectives

- Orchestrate multi-role agents (code writer, test writer, test runner).
- **Anti-bamboozle architecture** — the agent that writes the tests must be a DIFFERENT function object than the agent that runs them; otherwise the tests aren't independent and a sloppy implementation passes its own tests.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/block-4-agentic-workflows/quest-12-multi-agent my-quest
cd my-quest
```

1. Read the contract in `problem.js`: `buildPipeline({ codeWriter, testWriter, testRunner })` returns a pipeline with `writeCode`, `writeTests`, `runTests` stages plus the three role functions referenced.
2. Prompt the AI for `buildPipeline`. Explicitly instruct: `testWriter` and `testRunner` must remain distinct objects — never collapse them into one reference.
3. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts: `pipeline.testWriter !== pipeline.testRunner` (anti-bamboozle), that the three stages are functions wired to the role functions the caller passed in (same references — no substitute agents), and that an end-to-end run (`writeCode → writeTests → runTests`) produces the expected object kinds. The stub collapses `testWriter` and `testRunner` into one reference → fails.

## 💡 Hints

- Naive AI often assigns `testRunner = testWriter` "for simplicity" — that's the exact failure mode this quest teaches you to detect.
- Also check: the pipeline must expose the role functions it wired in, so callers (and tests) can verify no agent was silently substituted with a fake that always passes.
- The reference-equality checks (`pipeline.codeWriter === codeWriter`) catch a pipeline that ships its own "always-pass" agents.