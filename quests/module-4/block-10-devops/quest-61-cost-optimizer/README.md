# Quest 4.19: Cost Optimizer

**Block**: 10 - DevOps & Deployment | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Implement token budget routing between LLM models.
- **Optimize cost without sacrificing quality** — route simple tasks to cheap models, complex tasks to powerful ones.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-10-devops/quest-61-cost-optimizer my-quest
cd my-quest
```

Implement `routeRequest(request, budget)` that selects the best model based on complexity and budget constraints.

## ✅ Verification

`node test.js` checks cost estimation, budget compliance, complexity-respecting quality selection, and the edge case: high-complexity tasks must use quality models.
