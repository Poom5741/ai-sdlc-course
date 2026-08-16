# Quest 2.10: Hallucination Prevention System

**Block**: 2 - Advanced Capabilities | **Difficulty**: 🔴 Hard | **Time**: 35 minutes

## 🎯 Learning Objectives

- Implement multi-layer hallucination prevention.
- **Defense in depth** — layer multiple strategies for robustness.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-2/block-b/quest-22-hallucination-prevention my-quest
cd my-quest
```

1. Implement `preventHallucination(prompt, context, options)` with layered strategies.
2. Verify: `node test.js`

## ✅ Verification

`node test.js` checks structure, temperature warnings, citation injection, sparse context detection, and multi-strategy application.

## 💡 Hints

- Layer: temperature reduction, context injection, citation requirement, confidence check
- Warn on high temperature (>0.7)
- Inject context directly into the enhanced prompt
- Require citations when enabled
