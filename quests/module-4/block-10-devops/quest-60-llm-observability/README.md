# Quest 4.18: LLM Observability System

**Block**: 10 - DevOps & Deployment | **Difficulty**: 🔴 Hard | **Time**: 35 minutes

## 🎯 Learning Objectives

- Build tracing and metrics for LLM calls with cost tracking.
- **LLM observability** — trace every call: latency, tokens, cost, model, success.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-10-devops/quest-60-llm-observability my-quest
cd my-quest
```

Implement `createTracer()` with `trace`, `getTrace`, `getMetrics` (including cost!), and `getSlowQueries`.

## ✅ Verification

`node test.js` checks trace recording, cost calculation, model breakdown, and slow query detection.
