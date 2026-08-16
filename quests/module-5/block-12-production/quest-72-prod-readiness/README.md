# Quest 5.10: Production Readiness Checker

**Block**: 12 - Production Patterns | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Audit production readiness with weighted severity checks.
- **Ship with confidence** — run a checklist before deploying. Missing critical items = incidents.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-5/block-12-production/quest-72-prod-readiness my-quest
cd my-quest
```

Implement `checkReadiness(config)` with severity-weighted checklist and critical-failure gating.

## ✅ Verification

`node test.js` checks full readiness, critical failure blocking, score calculation, and the edge case: missing auth must prevent deployment regardless of other scores.
