import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const SCAFFOLD_DIR = join(__dirname, '..', '..', '..', 'quests', '_scaffold');

const AI_INSTRUCTION_KEYWORDS = ['_solution', 'do not', "don't", 'problem.js'];

describe('local-runnable quest scaffold (issue #63 spec)', () => {
  it('quests/_scaffold/ exists', () => {
    expect(existsSync(SCAFFOLD_DIR)).toBe(true);
  });

  it('has problem.js (learner-edited starter)', () => {
    expect(existsSync(join(SCAFFOLD_DIR, 'problem.js'))).toBe(true);
  });

  it('has _solution/solution.js (reference)', () => {
    expect(existsSync(join(SCAFFOLD_DIR, '_solution', 'solution.js'))).toBe(true);
  });

  it('test.js requires ./problem.js (not ./index.js)', () => {
    const testFile = join(SCAFFOLD_DIR, 'test.js');
    expect(existsSync(testFile)).toBe(true);
    const src = readFileSync(testFile, 'utf-8');
    expect(src).toMatch(/require\(['"]\.\/problem\.js['"]\)/);
    expect(src).not.toMatch(/require\(['"]\.\/index\.js['"]\)/);
  });

  it('has README.md describing the pattern', () => {
    expect(existsSync(join(SCAFFOLD_DIR, 'README.md'))).toBe(true);
  });

  it('has package.json', () => {
    expect(existsSync(join(SCAFFOLD_DIR, 'package.json'))).toBe(true);
  });

  it('problem.js embeds AI boundary instructions', () => {
    const problem = readFileSync(join(SCAFFOLD_DIR, 'problem.js'), 'utf-8').toLowerCase();
    const hits = AI_INSTRUCTION_KEYWORDS.filter((k) => problem.includes(k));
    expect(hits.length).toBeGreaterThan(0);
  });

  it('problem.js ships an empty/stub function (no filled solution)', () => {
    const problem = readFileSync(join(SCAFFOLD_DIR, 'problem.js'), 'utf-8');
    expect(problem).toMatch(/function|=>|module\.exports/);
    expect(problem).not.toMatch(/return\s+\w+\s*\*\s*factorial/);
  });
});