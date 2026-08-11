import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const DOCS_DIR = join(__dirname, '..', '..', 'src', 'content', 'docs');

describe('Quest MDX content files', () => {
  const quests = [
    'quest-1-first-code.mdx',
    'quest-2-prompts.mdx',
    'quest-3-security.mdx',
    'quest-4-loops.mdx',
    'quest-5-project.mdx',
  ];

  for (const file of quests) {
    it(`${file} exists in content/docs/quests/`, () => {
      expect(existsSync(join(DOCS_DIR, 'quests', file))).toBe(true);
    });

    it(`${file} has valid frontmatter with title`, () => {
      const content = readFileSync(join(DOCS_DIR, 'quests', file), 'utf-8');
      expect(content).toMatch(/^---[\s\S]*?title:/m);
    });
  }
});

describe('Reference MDX content files', () => {
  const refs = [
    'github-copilot.mdx',
    'claude-code.mdx',
    'code-rabbit.mdx',
    'setup-guide.mdx',
    'matt-skills.mdx',
    'execution-skills.mdx',
    'goal-system.mdx',
  ];

  for (const file of refs) {
    it(`${file} exists in content/docs/reference/`, () => {
      expect(existsSync(join(DOCS_DIR, 'reference', file))).toBe(true);
    });

    it(`${file} uses Starlight component imports`, () => {
      const content = readFileSync(join(DOCS_DIR, 'reference', file), 'utf-8');
      // Should NOT import from ../../components/
      expect(content).not.toMatch(/from '\.\.\/\.\.\/components\//);
    });
  }
});
