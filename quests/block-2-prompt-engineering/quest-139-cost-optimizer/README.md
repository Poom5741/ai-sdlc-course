# Quest: Cost Optimizer

**Block**: 2 - Prompt Engineering | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Recommend the cheapest model for a given task by balancing cost and quality.
- Build cost-aware AI development habits.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/block-2-prompt-engineering/quest-139-cost-optimizer my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool (GitHub Copilot, Claude Code, etc.).
3. **Follow the contract** in `problem.js` — implement selectModel, MODELS.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts that selectModel() balances accuracy, complexity, and speed to pick an appropriate model and returns { model, estimatedCost, reasoning }.

## 💡 Hints

- 'Must be accurate' should prefer larger (more expensive) models.
- Trade-offs should be explained in the reasoning field.
