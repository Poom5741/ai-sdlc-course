# Quest 6.2: Few-Shot Template Builder

**Block**: 13 - Prompt Patterns | **Difficulty**: 🟢 Easy | **Time**: 20 minutes

## 🎯 Learning Objectives

- Build few-shot prompt templates with examples.
- **Examples beat instructions** — showing 2-3 examples is more effective than describing the task.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-6/block-13-prompt-patterns/quest-74-few-shot my-quest
cd my-quest
```

Implement `buildFewShotTemplate(examples, task, input)` that constructs a prompt with task, examples in order, and new input.

## ✅ Verification

`node test.js` checks task inclusion, all examples, correct ordering, and new input placement.
