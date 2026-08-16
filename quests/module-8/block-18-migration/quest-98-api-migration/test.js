/**
 * Quest 18.1: API Migration Tool — test suite
 */

const { restToGraphQL } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 18.1: API Migration Tool\n');

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
  { method: 'GET', path: '/users', name: 'getUsers', params: [] },
  { method: 'GET', path: '/users/:id', name: 'getUser', params: ['id'] },
  { method: 'POST', path: '/users', name: 'createUser', params: ['name', 'email'] },
];

const result = restToGraphQL(routes);

// Test 1: Has schema string
check('has schema string', typeof result.schema === 'string' && result.schema.length > 0);

// Test 2: Has resolvers object
check('has resolvers object', typeof result.resolvers === 'object' && result.resolvers !== null);

// Test 3: GET routes become Query
check('schema has type Query', /type\s+Query/i.test(result.schema), `schema: ${result.schema.substring(0, 200)}`);

// Test 4: POST routes become Mutation
check('schema has type Mutation', /type\s+Mutation/i.test(result.schema),
  `schema: ${result.schema.substring(0, 200)} — POST routes must become Mutations`);

// Test 5: Resolvers have Query key
check('resolvers have Query', result.resolvers.Query !== undefined || result.resolvers.query !== undefined,
  `resolvers: ${JSON.stringify(Object.keys(result.resolvers))}`);

// Test 6: Resolvers have Mutation key
check('resolvers have Mutation', result.resolvers.Mutation !== undefined || result.resolvers.mutation !== undefined,
  `resolvers: ${JSON.stringify(Object.keys(result.resolvers))}`);

// Test 7: EDGE CASE — POST NOT in Query
const queryStr = JSON.stringify(result.resolvers.Query || result.resolvers.query || {});
check('createUser not in Query', !queryStr.includes('createUser'),
  `createUser should be in Mutation, not Query`);

// Test 8: Route names present in schema
check('getUser in schema', result.schema.includes('getUser'));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 18.1 complete. You migrate REST to GraphQL correctly.');
  process.exit(0);
}
console.log('\nHint: POST routes must become Mutations, not Queries.');
process.exit(1);
