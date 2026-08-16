/**
 * Quest 18.2: Database Migration Assistant — test suite
 */

const { generateMigration } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 18.2: Database Migration Assistant\n');

function check(label, cond, detail) {
  if (cond) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    if (detail) console.log(`   ${detail}`);
    failed++;
  }
}

const changes = [
  { type: 'add_column', table: 'users', column: 'email', dataType: 'VARCHAR(255)' },
  { type: 'drop_column', table: 'users', column: 'legacy_id' },
  { type: 'rename_column', table: 'users', column: 'name', newColumn: 'full_name' },
];

const result = generateMigration(changes);

// Test 1: Has up SQL
check('has up migration', typeof result.up === 'string' && result.up.length > 0);

// Test 2: Has down SQL (rollback)
check('has down migration (rollback)', typeof result.down === 'string' && result.down.length > 0,
  `down: "${result.down}" — every migration MUST have a rollback`);

// Test 3: add_column in up SQL
check('add_column in up SQL', /ALTER\s+TABLE.*ADD/i.test(result.up) || /ADD\s+COLUMN/i.test(result.up),
  `up: ${result.up.substring(0, 200)}`);

// Test 4: EDGE CASE — down SQL not empty
check('down SQL is not empty for each change', result.down.length > 10,
  `down: "${result.down}" — naive AI leaves rollback empty`);

// Test 5: rename_column handled
check('rename handled in up', /RENAME/i.test(result.up) || /full_name/i.test(result.up),
  `up: ${result.up.substring(0, 200)}`);

// Test 6: Table name present
check('table name "users" present', result.up.includes('users'));

// Test 7: Empty changes
const empty = generateMigration([]);
check('empty changes produces valid output', typeof empty.up === 'string' && typeof empty.down === 'string');

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 18.2 complete. You generate forward AND rollback migrations.');
  process.exit(0);
}
console.log('\nHint: every migration MUST have a rollback (down) SQL. Check if down is empty.');
process.exit(1);
