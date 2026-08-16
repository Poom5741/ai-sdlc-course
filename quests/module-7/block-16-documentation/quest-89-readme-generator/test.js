/**
 * Quest 16.2: README Generator — test suite
 */

const { generateReadme } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 16.2: README Generator\n');

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

const files = [
  { name: 'src', path: 'src', type: 'dir' },
  { name: 'index.js', path: 'src/index.js', type: 'file', description: 'Entry point' },
  { name: 'utils.js', path: 'src/utils.js', type: 'file', description: 'Utility functions' },
  { name: 'test', path: 'test', type: 'dir' },
  { name: 'test.js', path: 'test/test.js', type: 'file' },
  { name: 'package.json', path: 'package.json', type: 'file' },
  { name: 'README.md', path: 'README.md', type: 'file' },
];

const readme = generateReadme(files);

// Test 1: Has title
check('has title (#)', /^# .+/m.test(readme), `got: ${readme.substring(0, 100)}`);

// Test 2: Has overview section
check('has ## Overview', /##\s+Overview/i.test(readme), `missing Overview section`);

// Test 3: Has project structure section
check('has ## Project Structure', /##\s+Project Structure/i.test(readme), `missing Project Structure`);

// Test 4: Has getting started
check('has ## Getting Started', /##\s+Getting Started/i.test(readme), `missing Getting Started`);

// Test 5: Has license
check('has ## License', /##\s+License/i.test(readme), `missing License`);

// Test 6: Lists files from input
check('includes file names', readme.includes('index.js') && readme.includes('utils.js'));

// Test 7: EDGE CASE — nested files show hierarchy (indentation)
check('nested files have indentation', /(\s{2,}|\t).*index\.js/.test(readme) || /\-.*index\.js/.test(readme),
  `nested files should be indented or prefixed with tree chars`);

// Test 8: Empty input
const emptyReadme = generateReadme([]);
check('empty input still generates valid markdown', /^# /m.test(emptyReadme));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 16.2 complete. You generate READMEs from codebase structure.');
  process.exit(0);
}
console.log('\nHint: check if nested files show hierarchy via indentation or tree characters.');
process.exit(1);
