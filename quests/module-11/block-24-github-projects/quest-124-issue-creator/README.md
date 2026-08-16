# Quest 24.1: Issue Creator

**Block**: 24 - GitHub Project Management | **Difficulty**: 🟢 Easy | **Time**: 15 minutes

## 🎯 Learning Objectives

- Generate GitHub issue JSON with proper labels and structure.
- **Template your issues** — every issue needs reproduction steps; naive AI omits them and issues become unactionable.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-11/block-24-github-projects/quest-124-issue-creator my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `createIssue(title, description, type, priority)`** that returns a GitHub issue JSON object.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function:
- Maps type to label (bug→bug, feature→enhancement, task→chore).
- Maps priority to label (high→P0, medium→P1, low→P2).
- Includes "Reproduction Steps" and "Expected Behavior" sections in body.

## 💡 Hints

- Naive AI skips "Reproduction Steps" in the body — that's the edge case.
- The body should be a markdown string with sections.
- Labels are an array of strings derived from type and priority.
