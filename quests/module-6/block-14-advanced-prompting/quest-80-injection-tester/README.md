# Quest 6.8: Prompt Injection Tester

**Block**: 14 - Advanced Prompting | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Run offensive security tests against prompt defenses.
- **Test your defenses** — you can't protect against attacks you haven't tried.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-6/block-14-advanced-prompting/quest-80-injection-tester my-quest
cd my-quest
```

Implement `testInjectionResistance(systemPrompt, defenses)` with a comprehensive attack suite including encoded and nested attacks.

## ✅ Verification

`node test.js` checks attack coverage (obvious, encoded, nested), bypass detection, and defense matching.
