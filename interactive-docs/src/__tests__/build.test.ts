import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..', '..');

describe('Astro project scaffold', () => {
  it('has valid astro.config.mjs', () => {
    const configPath = join(ROOT, 'astro.config.mjs');
    expect(existsSync(configPath)).toBe(true);
    
    const config = readFileSync(configPath, 'utf-8');
    // Social should be an object, not an array
    expect(config).not.toMatch(/social:\s*\[/);
    expect(config).toMatch(/social:\s*\{/);
  });

  it('has Starlight configured with Thai locale', () => {
    const configPath = join(ROOT, 'astro.config.mjs');
    const config = readFileSync(configPath, 'utf-8');
    expect(config).toMatch(/lang:\s*'th'/);
    expect(config).toMatch(/label:\s*'Thai'/);
  });

  it('has required directory structure', () => {
    const dirs = [
      'src/content/docs/workshop',
      'src/content/docs/quests',
      'src/content/docs/reference',
      'src/components',
      'src/layouts',
    ];
    
    for (const dir of dirs) {
      expect(existsSync(join(ROOT, dir))).toBe(true);
    }
  });

  it('builds without errors', () => {
    const result = execSync('npm run build', {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: 'pipe',
      timeout: 60000,
    });
    expect(result).toContain('Completed');
  }, 60000);
});
