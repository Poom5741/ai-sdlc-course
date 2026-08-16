/**
 * Quest 4.1: SQL Injection Spotter — test suite
 *
 * Tool skill: identify SQL injection vulnerabilities in code.
 * Engineering habit: TRUST BUT VERIFY — AI-generated code may look safe
 * but still be vulnerable to injection.
 *
 * Requires ./problem.js exporting { findSQLInjection }. Run: node test.js
 */

const { findSQLInjection } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.1: SQL Injection Spotter\n');

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

// Test 1: Direct template literal injection — HIGH
const code1 = 'const q = `SELECT * FROM users WHERE id = ${userId}`;';
const r1 = findSQLInjection(code1);
check('detects template literal in SQL', r1.length >= 1, `got ${r1.length} vulnerabilities`);
check('template literal injection is high severity', r1.some(v => v.severity === 'high'), `got ${JSON.stringify(r1)}`);

// Test 2: String concatenation with user input — HIGH
const code2 = "const q = 'SELECT * FROM users WHERE name = ' + userName;";
const r2 = findSQLInjection(code2);
check('detects string concat in SQL', r2.length >= 1, `got ${r2.length} vulnerabilities`);
check('string concat injection is high severity', r2.some(v => v.severity === 'high'), `got ${JSON.stringify(r2)}`);

// Test 3: Multiple vulnerabilities in one file
const code3 = `const q1 = \`SELECT * FROM orders WHERE id = \${orderId}\`;
const q2 = 'DELETE FROM accounts WHERE id = ' + acctId;`;
const r3 = findSQLInjection(code3);
check('detects multiple vulnerabilities', r3.length >= 2, `got ${r3.length} vulnerabilities`);

// Test 4: Safe code — no injection
const code4 = "const q = 'SELECT * FROM users WHERE id = ?';";
const r4 = findSQLInjection(code4);
check('safe parameterized query returns empty', r4.length === 0, `got ${r4.length} vulnerabilities`);

// Test 5: Edge case — string concat NOT in SQL context (naive AI flags this wrongly)
const code5 = "const msg = 'Hello ' + name + ', welcome!';";
const r5 = findSQLInjection(code5);
check('does NOT flag non-SQL string concatenation', r5.length === 0,
  `got ${r5.length} vulnerabilities for non-SQL string — naive AI over-flags`);

// Test 6: No code at all
const r6 = findSQLInjection('');
check('empty string returns empty array', r6.length === 0);

// Test 7: SQL keywords but no interpolation (safe)
const code7 = "const q = 'SELECT id, name FROM users WHERE active = 1';";
const r7 = findSQLInjection(code7);
check('SQL without interpolation is safe', r7.length === 0, `got ${r7.length}`);

// Test 8: Line number accuracy
const code8 = "const a = 1;\nconst b = 2;\nconst q = `SELECT * FROM t WHERE x = ${val}`;";
const r8 = findSQLInjection(code8);
check('reports correct line number', r8.some(v => v.line === 3),
  `expected line 3, got ${JSON.stringify(r8.map(v => v.line))}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.1 complete. You spot SQL injection — and avoid over-flagging.');
  process.exit(0);
}
console.log('\nHint: check the non-SQL string concat edge case. Naive AI flags ALL concatenation as injection.');
process.exit(1);
