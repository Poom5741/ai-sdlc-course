# Quest 26.1: KV Store Manager

**Block**: 26 - Cloudflare Storage & Advanced | **Difficulty**: 🟢 Easy | **Time**: 15 minutes

## 🎯 Learning Objectives

- Implement CRUD operations on Cloudflare KV with proper key namespacing.
- **Namespace your keys** — naive AI doesn't namespace keys causing collisions; always prefix keys with a domain separator.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-12/block-26-cf-storage/quest-133-kv-manager my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `buildKVKey(namespace, entity, id, action)`** that returns properly namespaced KV keys.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function:
- Generates keys in `namespace:entity:id` format.
- Sets correct TTL (read=0, write=3600, delete=0).
- Returns errors for invalid inputs.

## 💡 Hints

- Naive AI doesn't namespace keys — use `namespace:entity:id` format.
- Different namespaces should produce different keys for the same ID.
- Always validate inputs before generating keys.
