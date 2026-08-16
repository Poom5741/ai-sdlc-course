# Quest 5.2: Tool Registry System

**Block**: 11 - Agentic Workflows | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Implement dynamic tool loading and dispatch.
- **Tools are pluggable** — agents discover and use tools at runtime, not hardcode them.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-5/block-11-agentic/quest-64-tool-registry my-quest
cd my-quest
```

Implement `createToolRegistry()` with `register`, `execute` (with arg validation), `listTools`, and `findTools`.

## ✅ Verification

`node test.js` checks registration, execution, listing, search, argument validation, unknown tool handling, and duplicate rejection.
