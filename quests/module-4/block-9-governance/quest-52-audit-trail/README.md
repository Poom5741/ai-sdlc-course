# Quest 4.10: Audit Trail System

**Block**: 9 - Governance & Compliance | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Implement an audit logging system with filtering and statistics.
- **Audit everything** — when something goes wrong, the audit trail is how you figure out what happened.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-9-governance/quest-52-audit-trail my-quest
cd my-quest
```

Implement `createAuditLog()` returning an object with `log`, `query`, `getStats`, and `export` methods.

## ✅ Verification

`node test.js` checks logging, multi-criteria filtering (userId + action + time range), stats aggregation, and JSON export.
