/**
 * Quest 21.1: End-to-End AI Dev Pipeline — test suite
 */

const { createPipeline } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 21.1: End-to-End AI Dev Pipeline\n');

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

const stages = [
  { name: 'plan', type: 'plan', aiEnhanced: true },
  { name: 'code', type: 'code', aiEnhanced: true },
  { name: 'test', type: 'test', aiEnhanced: false },
  { name: 'review', type: 'review', aiEnhanced: true },
  { name: 'deploy', type: 'deploy', aiEnhanced: false },
];

const pipeline = createPipeline(stages);

// Test 1: Returns object with execute, stages, report
check('has execute function', typeof pipeline.execute === 'function');
check('has stages array', Array.isArray(pipeline.stages));
check('has report function', typeof pipeline.report === 'function');

// Test 2: Execute returns results
const results = pipeline.execute();
check('execute returns array of results', Array.isArray(results) && results.length > 0,
  `got ${results.length} results`);

// Test 3: Each result has required fields
check('results have stage, status, aiUsed', results.every(r => r.stage && r.status && typeof r.aiUsed === 'boolean'),
  `got ${JSON.stringify(results[0])}`);

// Test 4: Sequential execution order
check('stages executed in order', results.map(r => r.stage).join(',') === 'plan,code,test,review,deploy',
  `got order: ${results.map(r => r.stage).join(',')}`);

// Test 5: EDGE CASE — test comes after code (not parallel)
const codeIdx = results.findIndex(r => r.stage === 'code');
const testIdx = results.findIndex(r => r.stage === 'test');
check('test runs after code (sequential)', testIdx > codeIdx,
  `code at ${codeIdx}, test at ${testIdx}`);

// Test 6: Report generates summary
const report = pipeline.report();
check('report returns string', typeof report === 'string' && report.length > 0);

// Test 7: Empty pipeline
const emptyPipeline = createPipeline([]);
const emptyResults = emptyPipeline.execute();
check('empty pipeline returns empty results', emptyResults.length === 0);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 21.1 complete. You orchestrate AI across the full SDLC.');
  process.exit(0);
}
console.log('\nHint: check if stages run sequentially — test MUST come after code.');
process.exit(1);
