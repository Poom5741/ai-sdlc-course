/**
 * Quest 4.10: Audit Trail System — test suite
 *
 * Requires ./problem.js exporting { createAuditLog }. Run: node test.js
 */

const { createAuditLog } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.10: Audit Trail System\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const logger = createAuditLog();

// Test 1: log returns entry with timestamp
const entry1 = logger.log('login', 'user-1', { ip: '127.0.0.1' });
check('log returns entry', entry1 && typeof entry1 === 'object');
check('entry has timestamp', entry1 && entry1.timestamp);
check('entry has action', entry1 && entry1.action === 'login');
check('entry has userId', entry1 && entry1.userId === 'user-1');

// Test 2: Multiple logs
logger.log('logout', 'user-1', {});
logger.log('login', 'user-2', {});
logger.log('delete', 'user-1', { target: 'doc-1' });

const all = logger.query({});
check('query({}) returns all entries', all.length === 4, `got ${all.length}`);

// Test 3: Query filter by userId (THE EDGE CASE)
const user1Entries = logger.query({ userId: 'user-1' });
check('query by userId filters correctly', user1Entries.length === 3,
  `naive AI ignores userId filter — got ${user1Entries.length}`);

// Test 4: Query filter by action
const loginEntries = logger.query({ action: 'login' });
check('query by action filters correctly', loginEntries.length === 2);

// Test 5: Query with multiple filters
const user1Deletes = logger.query({ userId: 'user-1', action: 'delete' });
check('query with multiple filters', user1Deletes.length === 1,
  `naive AI can't combine filters — got ${user1Deletes.length}`);

// Test 6: getStats
const stats = logger.getStats();
check('getStats.total is correct', stats.total === 4);
check('getStats.byAction has entries', Object.keys(stats.byAction).length > 0);
check('getStats.byUser has entries', Object.keys(stats.byUser).length > 0);

// Test 7: export returns JSON
const exported = logger.export();
check('export returns valid JSON', JSON.parse(exported).length === 4);

// Test 8: Query with time range
const ts = Date.now();
const logger2 = createAuditLog();
logger2.log('a', 'u1', {});
const entry = logger2.log('b', 'u2', {});
const future = logger2.log('c', 'u1', {});
const rangeResult = logger2.query({ from: entry.timestamp - 1, to: entry.timestamp + 1 });
check('query with time range works', rangeResult.length >= 1);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.10 complete. You audit everything — with multi-criteria filtering.');
  process.exit(0);
}
console.log('\nHint: check the multi-filter query tests. Naive AI implements log but not proper filtering.');
process.exit(1);
