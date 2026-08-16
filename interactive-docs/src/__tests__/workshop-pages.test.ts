import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const DOCS_DIR = join(__dirname, '..', '..', 'src', 'content', 'docs');

describe('Workshop MDX content files', () => {
  const pages = [
    'overview.mdx',
    'block-1-ai-tools.mdx',
    'block-2-prompting.mdx',
    'block-3-security.mdx',
    'block-4-loops.mdx',
    'block-5-architecture.mdx',
    'block-6-ai-pipeline.mdx',
  ];

  for (const file of pages) {
    it(`${file} exists in content/docs/en/workshop/`, () => {
      expect(existsSync(join(DOCS_DIR, 'en', 'workshop', file))).toBe(true);
    });

    it(`${file} has valid frontmatter with title`, () => {
      const content = readFileSync(join(DOCS_DIR, 'en', 'workshop', file), 'utf-8');
      expect(content).toMatch(/^---[\s\S]*?title:/m);
    });

    it(`${file} uses Starlight component imports (not custom)`, () => {
      const content = readFileSync(join(DOCS_DIR, 'en', 'workshop', file), 'utf-8');
      // Should NOT import from ../../components/ for Card, Badge, Steps, CardGrid
      expect(content).not.toMatch(/from '\.\.\/\.\.\/components\/(Card|Badge|Steps|CardGrid)/);
    });
  }
});
