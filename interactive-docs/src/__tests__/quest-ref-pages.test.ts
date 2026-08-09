import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const QUESTS_DIR = join(__dirname, '..', 'pages', 'quests');
const REF_DIR = join(__dirname, '..', 'pages', 'reference');

describe('Quest pages', () => {
  const quests = [
    'quest-1-first-code.astro',
    'quest-2-prompts.astro',
    'quest-3-security.astro',
    'quest-4-loops.astro',
    'quest-5-project.astro',
  ];

  for (const page of quests) {
    it(`${page} exists`, () => {
      expect(existsSync(join(QUESTS_DIR, page))).toBe(true);
    });

    it(`${page} imports from local components`, () => {
      const content = readFileSync(join(QUESTS_DIR, page), 'utf-8');
      expect(content).not.toMatch(/@astrojs\/starlight/);
    });

    it(`${page} uses DocLayout`, () => {
      const content = readFileSync(join(QUESTS_DIR, page), 'utf-8');
      expect(content).toMatch(/DocLayout/);
    });
  }
});

describe('Reference pages', () => {
  const refs = [
    'github-copilot.astro',
  ];

  for (const page of refs) {
    it(`${page} exists`, () => {
      expect(existsSync(join(REF_DIR, page))).toBe(true);
    });

    it(`${page} imports from local components`, () => {
      const content = readFileSync(join(REF_DIR, page), 'utf-8');
      expect(content).not.toMatch(/@astrojs\/starlight/);
    });

    it(`${page} uses DocLayout`, () => {
      const content = readFileSync(join(REF_DIR, page), 'utf-8');
      expect(content).toMatch(/DocLayout/);
    });
  }
});
