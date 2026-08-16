/**
 * Quest 19.4: Accessibility Checker — test suite
 */

const { checkAccessibility } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 19.4: Accessibility Checker\n');

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

// Test 1: Image without alt
const html1 = '<img src="photo.jpg">';
const r1 = checkAccessibility(html1);
check('detects missing alt on image', r1.some(v => v.rule === 'img-alt'),
  `got ${JSON.stringify(r1)}`);

// Test 2: Image with alt is OK
const html2 = '<img src="photo.jpg" alt="A nice photo">';
const r2 = checkAccessibility(html2);
check('image with alt passes', !r2.some(v => v.rule === 'img-alt'),
  `got ${r2.length} violations`);

// Test 3: Input without label
const html3 = '<input type="text" name="email">';
const r3 = checkAccessibility(html3);
check('detects missing label on input', r3.some(v => v.rule === 'input-label'),
  `got ${JSON.stringify(r3)}`);

// Test 4: Button without text
const html4 = '<button></button>';
const r4 = checkAccessibility(html4);
check('detects empty button', r4.some(v => v.rule === 'button-text'),
  `got ${JSON.stringify(r4)}`);

// Test 5: EDGE CASE — decorative image NOT flagged
const html5 = '<img src="decorative.png" role="presentation">';
const r5 = checkAccessibility(html5);
check('decorative image (role=presentation) NOT flagged',
  !r5.some(v => v.rule === 'img-alt'),
  `got ${r5.length} violations for decorative image`);

// Test 6: Heading skip detection
const html6 = '<h1>Title</h1><h3>Subtitle</h3>';
const r6 = checkAccessibility(html6);
check('detects heading level skip', r6.some(v => v.rule === 'heading-skip'),
  `got ${JSON.stringify(r6)}`);

// Test 7: Clean HTML
const html7 = '<h1>Title</h1><p>Text</p><img src="x.png" alt="X"><label for="n">Name</label><input id="n">';
const r7 = checkAccessibility(html7);
check('clean HTML has no violations', r7.length === 0, `got ${r7.length}`);

// Test 8: Each violation has required fields
check('violations have rule, severity, line, message',
  r1.every(v => v.rule && v.severity && typeof v.line === 'number' && v.message));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 19.4 complete. You audit for accessibility violations.');
  process.exit(0);
}
console.log('\nHint: check if decorative images with role="presentation" are NOT flagged.');
process.exit(1);
