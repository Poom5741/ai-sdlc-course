# Quest 6.10: Cross-Model Prompt Porter

**Block**: 14 - Advanced Prompting | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Adapt prompts between different LLMs with model-specific changes.
- **Prompts are not portable** — GPT-4, Claude, and Gemini respond differently.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-6/block-14-advanced-prompting/quest-82-prompt-porter my-quest
cd my-quest
```

Implement `portPrompt(prompt, fromModel, toModel)` with model-specific adaptations, change tracking, and warnings.

## ✅ Verification

`node test.js` checks Claude adaptations, Gemini simplification, same-model passthrough, unknown model warnings, and the edge case: each model must get different adaptations.
