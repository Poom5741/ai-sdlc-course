const { defineFunction } = require('./problem.js');
let passed = 0, failed = 0;
console.log('Quest 3.11: Function Calling Implementer\n');
function check(l, c, d) { if (c) { console.log(`PASS ${l}`); passed++; } else { console.log(`FAIL ${l}`); if (d) console.log(`   ${d}`); failed++; } }
const fn = defineFunction('get_weather', 'Get weather for location', { location: { type: 'string', required: true } });
check('returns name', fn.name === 'get_weather');
check('returns description', fn.description.length > 0);
check('returns parameters', typeof fn.parameters === 'object');
check('validate is function', typeof fn.validate === 'function');
check('validate accepts valid args', fn.validate({ location: 'NYC' }) === true);
check('validate rejects missing required', fn.validate({}) === false);
console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 3.11 complete.'); process.exit(0); }
process.exit(1);
