/**
 * Quest 4.14: Dockerfile Generator — test suite
 * Requires ./problem.js exporting { generateDockerfile }. Run: node test.js
 */

const { generateDockerfile } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.14: Dockerfile Generator\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const result = generateDockerfile({ language: 'node', framework: 'express', port: 3000, hasDB: true, hasRedis: false });

check('returns a string', typeof result === 'string');
check('has multi-stage build (FROM ... AS builder)', /FROM\s+\S+\s+AS\s+builder/i.test(result),
  `naive AI generates single-stage — got: ${result.slice(0, 100)}`);
check('has production stage', /FROM\s+\S+\s*$|FROM\s+\S+\s*\n(?!.*AS)/im.test(result) && /AS\s+builder/i.test(result));
check('has non-root user', /USER\s+(?!root)\w+/i.test(result),
  `naive AI runs as root — no USER instruction`);
check('has EXPOSE', /EXPOSE\s+\d+/.test(result));
check('has HEALTHCHECK', /HEALTHCHECK/i.test(result));
check('EXPOSE matches port 3000', /EXPOSE\s+3000/.test(result));

const result2 = generateDockerfile({ language: 'python', framework: 'flask', port: 5000, hasDB: false, hasRedis: true });
check('adapts to Python', /python/i.test(result2));
check('adapts port to 5000', /EXPOSE\s+5000/.test(result2));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.14 complete. You generate optimized containers — multi-stage, non-root.');
  process.exit(0);
}
console.log('\nHint: check for multi-stage builds and non-root USER. Naive AI generates single-stage root containers.');
process.exit(1);
