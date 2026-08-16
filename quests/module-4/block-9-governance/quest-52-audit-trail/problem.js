/**
 * Quest 4.10: Audit Trail System — problem.js (learner edits this)
 *
 * Block: 9 - Governance & Compliance | Difficulty: 🔴 Hard | Time: 30 minutes
 *
 * Tool skill: implement an audit logging system.
 * Engineering habit: AUDIT EVERYTHING — when something goes wrong, the
 * audit trail is how you figure out what happened and who did it.
 *
 * Goal: write an audit logging system with these functions:
 *
 *   createAuditLog() → logger object
 *   logger.log(action, userId, details) → entry with timestamp
 *   logger.query({ userId, action, from, to }) → filtered entries
 *   logger.getStats() → { total, byAction, byUser }
 *   logger.export() → JSON string of all entries
 *
 * Edge case: naive AI often implements log but not query filtering.
 * The query MUST support filtering by multiple criteria simultaneously.
 */

// TODO: implement createAuditLog.
function createAuditLog() {
  return {
    log: () => null,
    query: () => [],
    getStats: () => ({ total: 0, byAction: {}, byUser: {} }),
    export: () => '[]',
  };
}

module.exports = { createAuditLog };
