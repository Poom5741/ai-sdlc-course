import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const STEPS_PATH = join(__dirname, '..', 'Steps.astro');

describe('Steps component', () => {
  it('exists', () => {
    expect(existsSync(STEPS_PATH)).toBe(true);
  });

  it('renders an ordered list', () => {
    const content = readFileSync(STEPS_PATH, 'utf-8');
    expect(content).toMatch(/<ol/);
  });

  it('has step styling classes', () => {
    const content = readFileSync(STEPS_PATH, 'utf-8');
    expect(content).toMatch(/step|counter|numbered/);
  });
});
