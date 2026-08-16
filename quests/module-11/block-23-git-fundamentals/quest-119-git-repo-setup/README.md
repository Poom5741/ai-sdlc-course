# Quest 23.1: Git Repo Setup

**Block**: 23 - Git Fundamentals | **Difficulty**: 🟢 Easy | **Time**: 15 minutes

## 🎯 Learning Objectives

- Initialize a git repository with proper configuration.
- **Set up properly before you code** — configure user.name and user.email before committing; skip it and you get "unknown" author.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-11/block-23-git-fundamentals/quest-119-git-repo-setup my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool (GitHub Copilot, Claude Code, etc.).
3. **Implement `validateCommitSequence(commits, config)`** that validates a series of commits form a proper git history with correct user config.
4. **Verify**:
   ```bash
   node test.js
   ```
5. **Stuck?** Peek at `_solution/solution.js` — but try first.

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function:
- Validates commit parent chains are correct.
- Validates user config name and email are present.
- Rejects commits with empty hashes or messages.

## 💡 Hints

- Naive AI validates commit hashes but forgets to check user config name/email — that's the edge case.
- The first commit must have `parent: null` (root commit).
- Subsequent commits must reference the previous commit's hash as their parent.
