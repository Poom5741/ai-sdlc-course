# Quest 26.2: D1 Database Schema Migrator

**Block**: 26 - Cloudflare Storage & Advanced | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Generate SQL migration files (up/down) with proper structure.
- **Preserve data** — naive AI drops columns without data migration; every schema change must consider existing data.

## 📋 Instructions

1. **Get the quest on your machine** (one command):
   ```bash
   npx degit Poom5741/ai-sdlc-course/quests/module-12/block-26-cf-storage/quest-134-d1-migrator my-quest
   cd my-quest
   ```
2. **Open `problem.js`** in your editor with your AI tool.
3. **Implement `generateMigration(action, table, changes)`** that returns SQL migration files.
4. **Verify**:
   ```bash
   node test.js
   ```

## ✅ Verification

```bash
node test.js
```

All 10 tests pass when your function:
- Generates CREATE TABLE with columns for 'create' action.
- Generates ALTER TABLE with ADD/DROP for 'alter' action.
- Preserves data when dropping columns (backup table).
- Down migration undoes up migration.

## 💡 Hints

- Naive AI drops columns without preserving data — that's the edge case.
- Create a backup table before dropping columns.
- Down migration should restore from backup.
