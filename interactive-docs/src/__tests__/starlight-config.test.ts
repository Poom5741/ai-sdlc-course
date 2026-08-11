import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const CONFIG_PATH = join(__dirname, '..', '..', 'astro.config.mjs');
const CONTENT_CONFIG_PATH = join(__dirname, '..', '..', 'src', 'content.config.ts');

describe('Starlight integration', () => {
  it('astro.config.mjs imports starlight', () => {
    expect(existsSync(CONFIG_PATH)).toBe(true);
    const config = readFileSync(CONFIG_PATH, 'utf-8');
    expect(config).toMatch(/@astrojs\/starlight/);
  });

  it('astro.config.mjs has starlight() in integrations', () => {
    const config = readFileSync(CONFIG_PATH, 'utf-8');
    expect(config).toMatch(/starlight\(\{/);
  });

  it('astro.config.mjs has a title', () => {
    const config = readFileSync(CONFIG_PATH, 'utf-8');
    expect(config).toMatch(/title:\s*['"]/);
  });

  it('astro.config.mjs has sidebar config', () => {
    const config = readFileSync(CONFIG_PATH, 'utf-8');
    expect(config).toMatch(/sidebar:\s*\[/);
  });
});

describe('Content configuration', () => {
  it('src/content.config.ts exists', () => {
    expect(existsSync(CONTENT_CONFIG_PATH)).toBe(true);
  });

  it('exports docs collection with docsLoader', () => {
    const config = readFileSync(CONTENT_CONFIG_PATH, 'utf-8');
    expect(config).toMatch(/docsLoader/);
    expect(config).toMatch(/docsSchema/);
  });
});
