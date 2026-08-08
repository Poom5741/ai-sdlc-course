import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const COMPONENT_PATH = join(__dirname, '..', 'StackBlitzEmbed.astro');

describe('StackBlitzEmbed component', () => {
  it('exists and has correct interface', () => {
    const content = readFileSync(COMPONENT_PATH, 'utf-8');
    
    // Has Props interface
    expect(content).toMatch(/interface Props/);
    expect(content).toMatch(/repo: string/);
    expect(content).toMatch(/file: string/);
    expect(content).toMatch(/branch\?: string/);
    expect(content).toMatch(/height\?: string/);
    expect(content).toMatch(/view\?:/);
  });

  it('has default values', () => {
    const content = readFileSync(COMPONENT_PATH, 'utf-8');
    
    expect(content).toMatch(/branch = 'main'/);
    expect(content).toMatch(/height = '500px'/);
    expect(content).toMatch(/view = 'split'/);
  });

  it('renders iframe with correct src', () => {
    const content = readFileSync(COMPONENT_PATH, 'utf-8');
    
    expect(content).toMatch(/<iframe/);
    expect(content).toMatch(/stackblitz\.com\/edit/);
    expect(content).toMatch(/embed=1/);
  });

  it('has cross-origin isolation', () => {
    const content = readFileSync(COMPONENT_PATH, 'utf-8');
    
    expect(content).toMatch(/cross-origin-isolation/);
  });
});
