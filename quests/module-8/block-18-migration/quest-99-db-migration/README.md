# Quest 18.2: Database Migration Assistant

**Block**: 18 - AI Migration | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Generate schema migration scripts.
- **Migrate forward** — every change needs a forward AND rollback.

## 💡 Hints

- Every migration MUST have a rollback (down) SQL — never leave it empty.
- add_column → DROP COLUMN in rollback.
- rename_column → reverse rename in rollback.
