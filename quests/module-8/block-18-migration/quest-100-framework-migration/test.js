/**
 * Quest 18.3: Framework Migration — test suite
 */

const { expressToFastify } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 18.3: Framework Migration\n');

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

// Test 1: app.get → fastify.get
const code1 = "app.get('/users', (req, res) => { res.send('ok'); });";
const r1 = expressToFastify(code1);
check('converts app.get to fastify.get', r1.includes('fastify.get'),
  `got: ${r1}`);

// Test 2: req.body → request.body
const code2 = "app.post('/data', (req, res) => { const d = req.body; res.send(d); });";
const r2 = expressToFastify(code2);
check('converts req.body to request.body', r2.includes('request.body'),
  `got: ${r2}`);

// Test 3: res.send → reply.send
check('converts res.send to reply.send', r2.includes('reply.send'),
  `got: ${r2}`);

// Test 4: EDGE CASE — res.status(N).send() → reply.code(N).send()
const code4 = "app.get('/test', (req, res) => { res.status(200).send('ok'); });";
const r4 = expressToFastify(code4);
check('converts res.status().send() to reply.code().send()',
  r4.includes('reply.code(200)') || r4.includes('reply.code(200).send'),
  `got: ${r4} — status codes must be converted`);

// Test 5: Empty input
const r5 = expressToFastify('');
check('empty input returns empty', r5 === '');

// Test 6: Preserves route path
const code6 = "app.get('/api/v1/users', handler);";
const r6 = expressToFastify(code6);
check('preserves route path', r6.includes('/api/v1/users'));

// Test 7: Multiple routes
const code7 = "app.get('/a', h1);\napp.post('/b', h2);";
const r7 = expressToFastify(code7);
check('converts multiple routes', r7.includes('fastify.get') && r7.includes('fastify.post'));

// Test 8: Handler params updated
const code8 = "app.get('/x', (req, res) => { res.send('hi'); });";
const r8 = expressToFastify(code8);
check('handler uses request/reply', r8.includes('request') || r8.includes('reply'));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 18.3 complete. You migrate Express to Fastify correctly.');
  process.exit(0);
}
console.log('\nHint: check if res.status(N).send() is converted to reply.code(N).send().');
process.exit(1);
