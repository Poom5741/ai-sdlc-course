# Quest 4.17: Monitoring Dashboard Builder

**Block**: 10 - DevOps & Deployment | **Difficulty**: 🔴 Hard | **Time**: 35 minutes

## 🎯 Learning Objectives

- Build a monitoring data aggregator with percentiles and anomaly detection.
- **Observe before optimize** — aggregate metrics, detect anomalies, alert on thresholds.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-10-devops/quest-59-monitoring-dashboard my-quest
cd my-quest
```

Implement `buildDashboard(metrics)` with summary (avg, min, max, p95, count), alerts, and trends.

## ✅ Verification

`node test.js` checks summary stats, p95 calculation, threshold alerts, anomaly detection, and trend analysis.
