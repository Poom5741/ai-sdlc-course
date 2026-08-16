# Quest 15.1: Automated PR Reviewer

**Block**: 15 - AI Code Review | **Difficulty**: 🟢 Easy | **Time**: 20 minutes

## 🎯 Learning Objectives

- Automate detection of common code issues in diffs.
- **Automate the boring** — catch console.logs, magic numbers, and TODOs so human reviewers focus on design.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-7/block-15-code-review/quest-83-automated-pr-reviewer my-quest
cd my-quest
```

1. Read the contract in `problem.js`: implement `reviewDiff(diff)` that returns an array of review comments.
2. Prompt the AI for the implementation. Be explicit about what patterns to detect.
3. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts detection of console.log, TODO/FIXME, magic numbers (excluding 0, 1, -1), and long lines. The stub returns `[]` → fails.

## 💡 Hints

- Naive AI often flags ALL numbers as magic — 0, 1, and -1 are common and should NOT be flagged.
- Severity levels must be 'warning' or 'info'.
- Line numbers should be 1-indexed.
