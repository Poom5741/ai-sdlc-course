# Quest 24.4: Code Review Simulator

**Block**: 24 - GitHub Project Management | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Generate review comments identifying bugs, style issues, suggestions from a diff.
- **Review edge cases** — naive AI approves code that looks correct but misses off-by-one errors, null checks, and race conditions.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-11/block-24-github-projects/quest-127-code-review-sim my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `reviewDiff(diff)`** that analyzes a code diff and generates review comments.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function:
- Detects hardcoded secrets (error).
- Detects off-by-one errors (error).
- Detects missing null checks (error).
- Detects console.log, TODOs, missing error handling (warnings/info).
- Sets `approved: false` when errors are found.

## 💡 Hints

- Naive AI approves code without checking null guards and off-by-one errors.
- Check added lines (starting with `+`) for issues.
- Severity levels: 'error' blocks approval, 'warning' and 'info' don't.
