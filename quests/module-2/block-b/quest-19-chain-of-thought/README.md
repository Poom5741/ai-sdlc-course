# Quest 2.7: Chain-of-Thought Prompter

**Block**: 2 - Advanced Capabilities | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Structure prompts to elicit step-by-step reasoning.
- **Reasoning chains** — break complex problems into verifiable steps.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-2/block-b/quest-19-chain-of-thought my-quest
cd my-quest
```

1. Implement `buildCoTPrompt(problem, steps)` with structured reasoning.
2. Verify: `node test.js`

## ✅ Verification

`node test.js` checks prompt structure, step inclusion, and non-trivial formatting.

## 💡 Hints

- Include "Let's think step by step" or similar framing
- Number the reasoning steps
- If no steps provided, create default steps
