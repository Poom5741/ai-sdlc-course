# Quest 23.2: Branching Strategy

**Block**: 23 - Git Fundamentals | **Difficulty**: 🟢 Easy | **Time**: 20 minutes

## 🎯 Learning Objectives

- Create branches, merge, and resolve conflicts.
- **Merge intentionally** — understand fast-forward vs merge commits; naive AI creates merge commits when fast-forward is possible.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-11/block-23-git-fundamentals/quest-120-branching-strategy my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `planMergeStrategy(source, target, history)`** that decides the correct merge strategy.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 7 tests pass when your function correctly identifies:
- Fast-forward when source base matches target tip.
- Merge when branches diverged with conflicts.
- Rebase when branches diverged without conflicts.

## 💡 Hints

- Naive AI always returns 'merge' — check if fast-forward is possible first.
- The source base is `source.commits[0]`, the target tip is `target.commits[target.commits.length - 1]`.
- Check for file conflicts when both branches modify the same file.
