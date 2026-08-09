import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const LAYOUT_PATH = join(__dirname, '..', 'DocLayout.astro');

describe('DocLayout', () => {
  it('exists', () => {
    expect(existsSync(LAYOUT_PATH)).toBe(true);
  });

  it('imports BaseLayout', () => {
    const content = readFileSync(LAYOUT_PATH, 'utf-8');
    expect(content).toMatch(/import BaseLayout from/);
  });

  it('accepts title, description, and sidebar props', () => {
    const content = readFileSync(LAYOUT_PATH, 'utf-8');
    expect(content).toMatch(/interface Props/);
    expect(content).toMatch(/title: string/);
    expect(content).toMatch(/description\?:/);
    expect(content).toMatch(/sidebar\?:/);
  });

  it('renders sidebar navigation when sidebar prop is true', () => {
    const content = readFileSync(LAYOUT_PATH, 'utf-8');
    expect(content).toMatch(/sidebar/);
    expect(content).toMatch(/nav/);
  });

  it('renders content slot', () => {
    const content = readFileSync(LAYOUT_PATH, 'utf-8');
    expect(content).toMatch(/<slot/);
  });

  it('has previous/next navigation', () => {
    const content = readFileSync(LAYOUT_PATH, 'utf-8');
    expect(content).toMatch(/prev|previous|next/i);
  });
});
