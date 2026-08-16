# Quest: Token Budgeter

**Block**: 2 - Prompt Engineering | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Track and limit token usage per user with daily and monthly budgets.
- Build budget-aware AI development habits.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/block-2-prompt-engineering/quest-140-token-budgeter my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool (GitHub Copilot, Claude Code, etc.).
3. **Follow the contract** in `problem.js` — implement TokenBudgeter.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts that the TokenBudgeter class tracks usage per user, enforces daily/monthly limits, and returns budget status and alerts.

## 💡 Hints

- Monthly limits should reset correctly on the right boundary.
- Alerts should fire when a user approaches or exceeds a limit.
