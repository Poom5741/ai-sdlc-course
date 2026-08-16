/**
 * Quest 4.10: Audit Trail System — REFERENCE solution (do NOT import or read during the exercise)
 */

function createAuditLog() {
  const entries = [];

  function log(action, userId, details = {}) {
    const entry = { timestamp: Date.now(), action, userId, details };
    entries.push(entry);
    return entry;
  }

  function query(filters = {}) {
    return entries.filter(e => {
      if (filters.userId && e.userId !== filters.userId) return false;
      if (filters.action && e.action !== filters.action) return false;
      if (filters.from && e.timestamp < filters.from) return false;
      if (filters.to && e.timestamp > filters.to) return false;
      return true;
    });
  }

  function getStats() {
    const byAction = {};
    const byUser = {};
    for (const e of entries) {
      byAction[e.action] = (byAction[e.action] || 0) + 1;
      byUser[e.userId] = (byUser[e.userId] || 0) + 1;
    }
    return { total: entries.length, byAction, byUser };
  }

  function exportLog() {
    return JSON.stringify(entries);
  }

  return { log, query, getStats, export: exportLog };
}

module.exports = { createAuditLog };
