# Quest 15.2: Code Smell Detector

**Block**: 15 - AI Code Review | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Detect common code smells programmatically.
- **Name it to tame it** — recognizing code smells by name makes them easier to fix.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-7/block-15-code-review/quest-84-code-smell-detector my-quest
cd my-quest
```

1. Read the contract in `problem.js`: implement `detectSmells(code)` that returns an array of smells.
2. Prompt the AI for the implementation.
3. Verify: `node test.js`

## ✅ Verification

`node test.js` asserts detection of long functions, deep nesting, god objects, and magic strings. The stub returns `[]` → fails.

## 💡 Hints

- A 50-line function containing a 5-line helper should flag the outer function, NOT the helper.
- God objects need >10 methods.
- Magic strings are string literals inside if/else-if conditions.
