/**
 * Quest 26.2: D1 Database Schema Migrator — test suite
 *
 * Run: node test.js
 */

const { generateMigration } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 26.2: D1 Database Schema Migrator\n');

function check(label, condition, detail) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    if (detail) console.log(`   ${detail}`);
    failed++;
  }
}

// Test 1: create table
const r1 = generateMigration('create', 'users', { columns: ['id INTEGER PRIMARY KEY', 'name TEXT NOT NULL', 'email TEXT UNIQUE'] });
check('create migration is valid', r1.isValid === true, `got ${JSON.stringify(r1)}`);
check('up contains CREATE TABLE', /CREATE\s+TABLE/i.test(r1.up), `got "${r1.up.substring(0, 100)}..."`);
check('up contains table name', r1.up.includes('users'), `got "${r1.up.substring(0, 100)}..."`);

// Test 2: down migration undoes create
check('down contains DROP TABLE', /DROP\s+TABLE/i.test(r1.down), `got "${r1.down.substring(0, 100)}..."`);

// Test 3: alter table add column
const r2 = generateMigration('alter', 'users', { add: ['age INTEGER'] });
check('alter add contains ALTER TABLE', /ALTER\s+TABLE/i.test(r2.up), `got "${r2.up.substring(0, 100)}..."`);
check('alter add contains ADD COLUMN', /ADD\s+COLUMN/i.test(r2.up), `got "${r2.up.substring(0, 100)}..."`);

// Test 4: down for add column removes it
check('down for add contains DROP COLUMN', /DROP\s+COLUMN/i.test(r2.down), `got "${r2.down.substring(0, 100)}..."`);

// Test 5: EDGE CASE — naive AI drops column without data preservation
const r3 = generateMigration('alter', 'users', { drop: ['email'] });
check('drop column preserves data (creates backup table)', /CREATE\s+TABLE.*backup/i.test(r3.up) || /INSERT.*SELECT/i.test(r3.up), `got "${r3.up.substring(0, 150)}..."`);

// Test 6: drop table
const r4 = generateMigration('drop', 'users', {});
check('drop migration is valid', r4.isValid === true);
check('up contains DROP TABLE', /DROP\s+TABLE/i.test(r4.up));

// Test 7: errors for invalid action
const r5 = generateMigration('invalid', 'users', {});
check('invalid action returns error', r5.isValid === false, `got ${JSON.stringify(r5)}`);

// Test 8: errors for empty table name
const r6 = generateMigration('create', '', { columns: ['id INTEGER'] });
check('empty table name returns error', r6.isValid === false);

// Test 9: up and down are strings
check('up is a string', typeof r1.up === 'string');
check('down is a string', typeof r1.down === 'string');

// Test 10: EDGE CASE — naive AI drops without preserving data
check('drop column migration has data preservation in up', r3.up.length > 50, `got ${r3.up.length} chars`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 26.2 complete. You preserve data during schema migrations.');
  process.exit(0);
}
console.log('\nHint: naive AI drops columns without preserving data — create a backup table first.');
process.exit(1);
