const { createMCPClient } = require('./problem.js');
let passed = 0, failed = 0;
console.log('Quest 3.10: MCP Client Builder\n');
function check(l, c, d) { if (c) { console.log(`PASS ${l}`); passed++; } else { console.log(`FAIL ${l}`); if (d) console.log(`   ${d}`); failed++; } }
const client = createMCPClient([]);
check('returns registerTool function', typeof client.registerTool === 'function');
check('returns getTools function', typeof client.getTools === 'function');
check('returns executeTool function', typeof client.executeTool === 'function');
client.registerTool({ name: 'test', handler: () => 'ok' });
check('registerTool adds tool', client.getTools().length >= 1);
check('executeTool runs handler', client.executeTool('test') === 'ok');
console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 3.10 complete.'); process.exit(0); }
process.exit(1);
