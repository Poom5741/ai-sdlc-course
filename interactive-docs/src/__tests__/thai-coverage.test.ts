import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const DOCS_DIR = join(__dirname, '..', '..', 'src', 'content', 'docs');
const EN_DIR = join(DOCS_DIR, 'en');
const TH_DIR = join(DOCS_DIR, 'th');

/** Recursively find all .md/.mdx files under a directory. */
function findContentFiles(dir: string, base = ''): string[] {
  if (!existsSync(dir)) return [];
  const entries = readdirSync(dir);
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    const rel = base ? `${base}/${entry}` : entry;
    if (statSync(full).isDirectory()) {
      files.push(...findContentFiles(full, rel));
    } else if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
      files.push(rel);
    }
  }
  return files;
}

const HAS_THAI = /[\u0E00-\u0E7F]/;
const enFiles = findContentFiles(EN_DIR);

describe('Thai content coverage — every EN file has a TH counterpart', () => {
  it(`discovers ${enFiles.length} English content files`, () => {
    expect(enFiles.length).toBeGreaterThan(0);
  });

  for (const relPath of enFiles) {
    it(`${relPath} has Thai counterpart`, () => {
      const thPath = join(TH_DIR, relPath);
      expect(existsSync(thPath), `${relPath} missing in th/`).toBe(true);
    });
  }
});

describe('Thai content quality — Thai files contain Thai text', () => {
  const thFiles = findContentFiles(TH_DIR);

  for (const relPath of thFiles) {
    it(`${relPath} contains Thai characters`, () => {
      const content = readFileSync(join(TH_DIR, relPath), 'utf-8');
      expect(content).toMatch(HAS_THAI);
    });

    it(`${relPath} has valid frontmatter with title`, () => {
      const content = readFileSync(join(TH_DIR, relPath), 'utf-8');
      expect(content).toMatch(/^---[\s\S]*?title:/m);
    });

    it(`${relPath} has valid frontmatter with description`, () => {
      const content = readFileSync(join(TH_DIR, relPath), 'utf-8');
      expect(content).toMatch(/^---[\s\S]*?description:/m);
    });
  }
});
