/**
 * Quest 18.4: Monolith Splitter — test suite
 */

const { analyzeMonolith } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 18.4: Monolith Splitter\n');

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

const modules = [
  { name: 'auth', dependencies: ['users-db'], routes: ['/login', '/register'] },
  { name: 'users', dependencies: ['users-db'], routes: ['/users'] },
  { name: 'orders', dependencies: ['orders-db', 'inventory-db'], routes: ['/orders'] },
  { name: 'inventory', dependencies: ['inventory-db'], routes: ['/inventory'] },
];

const services = analyzeMonolith(modules);

// Test 1: Returns array
check('returns array of services', Array.isArray(services) && services.length > 0,
  `got ${services.length} services`);

// Test 2: Each service has required fields
check('services have service, modules, reason',
  services.every(s => s.service && Array.isArray(s.modules) && s.reason),
  `got ${JSON.stringify(services)}`);

// Test 3: Shared dependencies grouped
const authService = services.find(s => s.modules.includes('auth'));
const usersService = services.find(s => s.modules.includes('users'));
check('auth and users potentially grouped (shared users-db)',
  !authService || !usersService || authService === usersService || authService.modules.includes('users'),
  `auth: ${JSON.stringify(authService?.modules)}, users: ${JSON.stringify(usersService?.modules)}`);

// Test 4: EDGE CASE — not every module is its own service
check('not every module is separate service', services.length < modules.length,
  `got ${services.length} services for ${modules.length} modules — some should be grouped`);

// Test 5: All modules accounted for
const allModules = services.flatMap(s => s.modules);
check('all modules accounted for', modules.every(m => allModules.includes(m.name)),
  `missing: ${modules.filter(m => !allModules.includes(m.name)).map(m => m.name)}`);

// Test 6: Empty input
const empty = analyzeMonolith([]);
check('empty input returns empty', Array.isArray(empty) && empty.length === 0);

// Test 7: Services have domain reason
check('reasons are non-empty strings', services.every(s => typeof s.reason === 'string' && s.reason.length > 0));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 18.4 complete. You identify microservice boundaries correctly.');
  process.exit(0);
}
console.log('\nHint: modules with shared dependencies should be grouped, not split into separate services.');
process.exit(1);
