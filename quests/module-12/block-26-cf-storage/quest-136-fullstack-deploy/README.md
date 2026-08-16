# Quest 26.4: Full Stack Deploy

**Block**: 26 - Cloudflare Storage & Advanced | **Difficulty**: 🔴 Hard | **Time**: 40 minutes

## 🎯 Learning Objectives

- Generate complete Cloudflare deployment: wrangler.toml + Pages Functions + D1 migration + KV bindings + R2 bucket.
- **Separate environments** — naive AI mixes preview and production IDs; always use different bindings for each environment.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-12/block-26-cf-storage/quest-136-fullstack-deploy my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `generateFullStackConfig(projectConfig)`** that returns complete deployment files.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function:
- Generates wrangler.toml with all required sections.
- Creates D1 migration SQL files.
- Lists all bindings (KV, D1, R2).
- Uses different IDs for preview and production.

## 💡 Hints

- Naive AI mixes preview and production IDs — that's the edge case.
- Use environment suffix in binding names: `${name}-${environment}`.
- D1 needs migration SQL for table creation.
