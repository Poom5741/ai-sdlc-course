# Quest 23.5: Interactive Rebase Simulator

**Block**: 23 - Git Fundamentals | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Simulate an interactive rebase (reorder, squash, edit commits).
- **Preserve intent during rebase** — naive AI drops commits or loses messages when squashing; every commit must be accounted for.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-11/block-23-git-fundamentals/quest-123-rebase-simulator my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `simulateRebase(commits, operations)`** that applies rebase operations to a commit list.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function:
- Preserves all commits (no drops) during reordering.
- Squashes commits by combining messages with " + ".
- Marks edited commits with "[edited] " prefix.
- Handles multiple operations in sequence.

## 💡 Hints

- Naive AI drops commits during rebase — result.length must equal expected count.
- Deep copy the input array to avoid mutating the original.
- For squash: combine messages, then splice out the squashed commit.
- For reorder: remove from old position, insert at new position.
