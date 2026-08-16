# Quest 4.20: Rollback Strategist

**Block**: 10 - DevOps & Deployment | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Implement deployment safety checks with rollback support.
- **Always have a rollback plan** — every deployment must be reversible.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-10-devops/quest-62-rollback-strategist my-quest
cd my-quest
```

Implement `deploymentManager()` with `deploy`, `promote` (sequential only), `rollback`, and `getStatus`.

## ✅ Verification

`node test.js` checks deploy, sequential promotion, rollback with version tracking, and the edge case: skipping environment stages must fail.
