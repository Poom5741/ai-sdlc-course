/**
 * Quest 5.2: Full System Design — design-doc validator
 *
 * Tool skill: architect a complete system (components + interfaces + data flow).
 * Engineering habit: SPECIFY INTERFACES BEFORE IMPLEMENTING — decide the
 * component contracts and the data flow before writing any logic.
 *
 * This is NOT a code test. It validates that a design document
 * (`system-design.md`) exists at the quest root and contains the required
 * sections/keywords.
 *
 * Required in system-design.md:
 *   1. component diagram  (a fenced ``` code block containing
 *      "→" | "-->" | "graph")
 *   2. interface contracts ("interface" | "contract" | "API")
 *   3. data flow          ("data flow" | "dataflow" | "flow:")
 *   4. named components    (>= 3 distinct component names)
 *   5. at least 500 characters of substance
 *
 * Run: node test.js
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'system-design.md');

let passed = 0;
let failed = 0;

console.log('Quest 5.2: Full System Design — design-doc validator\n');

function check(label, condition) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    failed++;
  }
}

check('system-design.md exists', existsSync(DOC_PATH));

if (!existsSync(DOC_PATH)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  console.log('\nHint: create system-design.md describing your system architecture.');
  process.exit(1);
}

const content = readFileSync(DOC_PATH, 'utf-8');

// 1. Component diagram: a fenced code block containing an arrow or graph.
const fencedBlocks = content.match(/```[\s\S]*?```/g) || [];
const hasDiagram = fencedBlocks.some((block) => /(→|-->)|graph/i.test(block));
check('component diagram (fenced block with → or --> or graph)', hasDiagram);

// 2. Interface contracts.
check('interface contracts (interface|contract|API)', /(interface|contract|api)/i.test(content));

// 3. Data flow.
check('data flow (data flow|dataflow|flow:)', /(data flow|dataflow|flow:)/i.test(content));

// 4. At least 3 distinct named components (Capitalized words of length >= 3
//    that look like component names, deduped). We use a simple Title Case
//    heuristic and require >= 3 distinct.
const candidates = (content.match(/\b([A-Z][a-zA-Z]{2,})\b/g) || []);
const distinct = new Set(candidates);
check('at least 3 distinct named components', distinct.size >= 3);

// 5. Substance.
check('at least 500 characters of substance', content.length >= 500);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 5.2 complete. You specified interfaces before implementing them.');
  process.exit(0);
}

console.log('\nHint: system-design.md must include a diagram, interface contracts, data flow, and >= 3 named components.');
process.exit(1);