import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const CARD_PATH = join(__dirname, '..', 'Card.astro');
const CARDGRID_PATH = join(__dirname, '..', 'CardGrid.astro');

describe('Card component', () => {
  it('exists', () => {
    expect(existsSync(CARD_PATH)).toBe(true);
  });

  it('accepts title and icon props', () => {
    const content = readFileSync(CARD_PATH, 'utf-8');
    expect(content).toMatch(/interface Props/);
    expect(content).toMatch(/title: string/);
    expect(content).toMatch(/icon/);
  });

  it('renders a card-like container', () => {
    const content = readFileSync(CARD_PATH, 'utf-8');
    expect(content).toMatch(/<div|<article/);
  });
});

describe('CardGrid component', () => {
  it('exists', () => {
    expect(existsSync(CARDGRID_PATH)).toBe(true);
  });

  it('renders a grid container', () => {
    const content = readFileSync(CARDGRID_PATH, 'utf-8');
    expect(content).toMatch(/grid/);
  });

  it('has a slot for cards', () => {
    const content = readFileSync(CARDGRID_PATH, 'utf-8');
    expect(content).toMatch(/<slot/);
  });
});
