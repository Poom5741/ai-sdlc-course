import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const PAGES_DIR = join(__dirname, '..', 'pages', 'workshop');

describe('Workshop pages', () => {
  const pages = [
    'overview.astro',
    'block-1-ai-tools.astro',
    'block-2-prompting.astro',
    'block-3-security.astro',
    'block-4-loops.astro',
    'block-5-architecture.astro',
  ];

  for (const page of pages) {
    it(`${page} exists`, () => {
      expect(existsSync(join(PAGES_DIR, page))).toBe(true);
    });

    it(`${page} imports from local components, not Starlight`, () => {
      const content = readFileSync(join(PAGES_DIR, page), 'utf-8');
      expect(content).not.toMatch(/@astrojs\/starlight/);
      expect(content).toMatch(/import.*from.*\.\.\/\.\.\/components/);
    });

    it(`${page} uses DocLayout`, () => {
      const content = readFileSync(join(PAGES_DIR, page), 'utf-8');
      expect(content).toMatch(/DocLayout/);
    });
  }
});
