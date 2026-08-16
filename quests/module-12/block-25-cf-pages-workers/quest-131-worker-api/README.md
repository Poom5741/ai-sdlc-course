# Quest 25.3: Worker API Builder

**Block**: 25 - Cloudflare Pages & Workers | **Difficulty**: 🔴 Hard | **Time**: 35 minutes

## 🎯 Learning Objectives

- Build a Cloudflare Worker with routing, KV reads, D1 queries.
- **Handle D1 errors** — naive AI doesn't handle "database not ready" in preview environments; every DB call needs error handling.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-12/block-25-cf-pages-workers/quest-131-worker-api my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `buildWorkerRoute(method, path, env)`** that returns handler configuration.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function:
- Routes /kv/* to KV storage, /d1/* to D1 storage.
- Adds error handling for D1 in preview mode.
- Handles all HTTP methods.

## 💡 Hints

- Naive AI doesn't handle "database not ready" in D1 preview — that's the edge case.
- Preview environments may not have D1 configured yet.
- All storage operations need error handling, not just D1.
