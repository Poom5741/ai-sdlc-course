# Quest 25.2: Pages Function Router

**Block**: 25 - Cloudflare Pages & Workers | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Implement a Pages Function that routes requests to different handlers.
- **Handle CORS preflight** — naive AI forgets OPTIONS requests and browsers block cross-origin calls.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-12/block-25-cf-pages-workers/quest-130-function-router my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `routeRequest(method, path, corsEnabled)`** that returns handler configuration.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function:
- Maps methods to handlers (GET→list, POST→create, PUT→update, DELETE→delete).
- Handles OPTIONS for CORS preflight.
- Returns CORS headers when enabled.

## 💡 Hints

- Naive AI forgets OPTIONS for CORS preflight — that's the edge case.
- OPTIONS should return 204 (No Content) with CORS headers.
- CORS headers include Access-Control-Allow-Origin, Allow-Methods, Allow-Headers.
