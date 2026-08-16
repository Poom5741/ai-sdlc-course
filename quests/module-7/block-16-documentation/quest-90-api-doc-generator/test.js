/**
 * Quest 16.3: API Doc Generator — test suite
 */

const { generateOpenApi } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 16.3: API Doc Generator\n');

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

const routes = [
  { method: 'GET', path: '/users', description: 'List all users' },
  { method: 'POST', path: '/users', description: 'Create a user' },
  { method: 'GET', path: '/users/:id', description: 'Get user by ID', params: ['id'] },
  { method: 'DELETE', path: '/users/:id', description: 'Delete user' },
];

const spec = generateOpenApi(routes);

// Test 1: Has OpenAPI version
check('has openapi version', spec.openapi === '3.0.0', `got ${spec.openapi}`);

// Test 2: Has info
check('has info.title', spec.info && spec.info.title && spec.info.title.length > 0);
check('has info.version', spec.info && spec.info.version && spec.info.version.length > 0);

// Test 3: Has paths
check('has paths object', spec.paths && typeof spec.paths === 'object');
check('has /users path', spec.paths['/users'], `paths: ${Object.keys(spec.paths || {})}`);
check('has /users/:id path', spec.paths['/users/:id']);

// Test 4: Methods are correct
check('GET method on /users', spec.paths['/users'].get, `methods: ${Object.keys(spec.paths['/users'] || {})}`);
check('POST method on /users', spec.paths['/users'].post);
check('DELETE method on /users/:id', spec.paths['/users/:id'].delete);

// Test 5: EDGE CASE — DELETE stays uppercase
check('DELETE is not lowercased', spec.paths['/users/:id'].delete !== undefined,
  `got methods: ${Object.keys(spec.paths['/users/:id'] || {})}`);

// Test 6: Parameters from route
const getParams = spec.paths['/users/:id'].get.parameters;
check('parameters extracted', Array.isArray(getParams) && getParams.length > 0,
  `got ${JSON.stringify(getParams)}`);

// Test 7: Response included
check('has 200 response', spec.paths['/users'].get.responses && spec.paths['/users'].get.responses['200']);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 16.3 complete. You generate OpenAPI specs from route definitions.');
  process.exit(0);
}
console.log('\nHint: check if DELETE stays uppercase — it is an HTTP method, not a variable.');
process.exit(1);
