# Quest 5.8: Prompt Version Manager

**Block**: 12 - Production Patterns | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- A/B test and version prompts.
- **Version your prompts** — prompts are code. They need versioning and rollback.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-5/block-12-production/quest-70-prompt-versioning my-quest
cd my-quest
```

Implement `createPromptManager()` with `create`, `deploy`, `abTest`, `getMetrics`, and `rollback`.

## ✅ Verification

`node test.js` checks versioning, deployment, A/B testing with winner selection, metrics, and rollback.
