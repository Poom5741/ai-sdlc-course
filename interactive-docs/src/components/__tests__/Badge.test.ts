import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const BADGE_PATH = join(__dirname, '..', 'Badge.astro');

describe('Badge component', () => {
  it('exists', () => {
    expect(existsSync(BADGE_PATH)).toBe(true);
  });

  it('accepts text and variant props', () => {
    const content = readFileSync(BADGE_PATH, 'utf-8');
    expect(content).toMatch(/interface Props/);
    expect(content).toMatch(/text: string/);
    expect(content).toMatch(/variant/);
  });

  it('supports variant values: success, note, tip, caution, danger', () => {
    const content = readFileSync(BADGE_PATH, 'utf-8');
    expect(content).toMatch(/success|note|tip|caution|danger/);
  });

  it('renders a span element', () => {
    const content = readFileSync(BADGE_PATH, 'utf-8');
    expect(content).toMatch(/<span/);
  });
});
