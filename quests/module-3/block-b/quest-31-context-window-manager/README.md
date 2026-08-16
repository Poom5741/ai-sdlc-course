# Quest 3.9: Context Window Manager

**Block**: 3 - Development with AI | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Manage context window by prioritizing relevant files.
- **Prioritize context** — not all files are equally relevant.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-3/block-b/quest-31-context-window-manager my-quest
cd my-quest
```

1. Implement `prioritizeFiles(files, task, maxTokens)` to select relevant files.
2. Verify: `node test.js`

## ✅ Verification

`node test.js` checks token budget respect, relevance-based selection, and proper ordering.
