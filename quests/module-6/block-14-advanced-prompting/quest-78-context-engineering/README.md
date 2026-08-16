# Quest 6.6: Context Engineering

**Block**: 14 - Advanced Prompting | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Select optimal context from available documents within a token budget.
- **Context is king** — more context ≠ better; relevant context = better.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-6/block-14-advanced-prompting/quest-78-context-engineering my-quest
cd my-quest
```

Implement `selectContext(query, documents, maxTokens)` that prioritizes by relevance within budget.

## ✅ Verification

`node test.js` checks budget compliance, relevance prioritization, dropped tracking, and the edge case: high-relevance docs must be selected even if lower-relevance docs would fit.
