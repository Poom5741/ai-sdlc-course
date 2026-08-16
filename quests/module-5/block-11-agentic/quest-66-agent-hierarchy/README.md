# Quest 5.4: Hierarchical Agent Team

**Block**: 11 - Agentic Workflows | **Difficulty**: 🔴 Hard | **Time**: 45 minutes

## 🎯 Learning Objectives

- Build a manager-worker agent hierarchy with result validation.
- **Hierarchy enables scale** — manager decomposes, workers execute, manager validates.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-5/block-11-agentic/quest-66-agent-hierarchy my-quest
cd my-quest
```

Implement `createTeam(manager, workers)` where the manager decomposes tasks, assigns to workers, and validates results.

## ✅ Verification

`node test.js` checks decomposition, assignment, execution, result validation, and rejection of bad outputs.
