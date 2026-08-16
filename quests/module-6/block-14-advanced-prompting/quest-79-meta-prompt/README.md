# Quest 6.7: Meta-Prompt Generator

**Block**: 14 - Advanced Prompting | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Build prompts that generate prompts with validation.
- **Automate prompt creation** — for recurring tasks, meta-prompts generate task-specific prompts.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-6/block-14-advanced-prompting/quest-79-meta-prompt my-quest
cd my-quest
```

Implement `createMetaPrompt(template)` with `generate`, `validate`, and `improve` methods.

## ✅ Verification

`node test.js` checks generation, validation, improvement, and the edge case: generated prompts must be validated for completeness.
