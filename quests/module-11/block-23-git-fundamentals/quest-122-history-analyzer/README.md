# Quest 23.4: Git History Analyzer

**Block**: 23 - Git Fundamentals | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Parse git log output and detect problematic patterns.
- **Detect bad patterns early** — force pushes and reset commits rewrite history and break collaboration; naive AI misses them.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-11/block-23-git-fundamentals/quest-122-history-analyzer my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `analyzeGitHistory(logs)`** that parses commit logs and detects bad patterns.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 9 tests pass when your function:
- Counts commits per contributor.
- Detects force pushes via parent hash mismatch.
- Detects reverts, squashes, and merge commits.
- Computes date range and stats.

## 💡 Hints

- Naive AI checks message text for "force push" but misses parent hash mismatches — that's the real indicator.
- Track the last hash per author; if a new commit's parent doesn't match, it's a force push.
- Use regex to detect revert/squash/merge patterns in messages.
