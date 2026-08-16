# Quest: Monitoring Dashboard

**Block**: 7 - Observability | **Difficulty**: 🔴 Hard | **Time**: 25 minutes

## 🎯 Learning Objectives

- Design LLM monitoring dashboard configurations.
- Apply observability-driven development.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/block-7-observability/quest-145-monitoring-dashboard my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool (GitHub Copilot, Claude Code, etc.).
3. **Follow the contract** in `problem.js` — implement createDashboard.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` asserts that createDashboard() generates dashboard configs with metrics, alerts (with thresholds and actions), and visualizations, returning { metrics, alerts, widgets }.

## 💡 Hints

- Each alert should have a threshold and a corresponding action.
- Configs should cover both metrics and visualization widgets.
