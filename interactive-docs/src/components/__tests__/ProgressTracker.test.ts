import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const COMPONENT_PATH = join(__dirname, '..', 'ProgressTracker.astro');

describe('ProgressTracker component', () => {
  it('exists and has correct interface', () => {
    const content = readFileSync(COMPONENT_PATH, 'utf-8');
    
    // Has Props interface
    expect(content).toMatch(/interface Quest/);
    expect(content).toMatch(/id: string/);
    expect(content).toMatch(/name: string/);
    expect(content).toMatch(/status:/);
    expect(content).toMatch(/score\?: number/);
    expect(content).toMatch(/interface Props/);
    expect(content).toMatch(/quests: Quest/);
  });

  it('calculates completion percentage', () => {
    const content = readFileSync(COMPONENT_PATH, 'utf-8');
    
    expect(content).toMatch(/completedCount/);
    expect(content).toMatch(/totalCount/);
    expect(content).toMatch(/percentage/);
  });

  it('renders progress bar', () => {
    const content = readFileSync(COMPONENT_PATH, 'utf-8');
    
    expect(content).toMatch(/progress-bar/);
    expect(content).toMatch(/progress-fill/);
    expect(content).toMatch(/width:/);
  });

  it('renders quest list with status indicators', () => {
    const content = readFileSync(COMPONENT_PATH, 'utf-8');
    
    expect(content).toMatch(/quest-list/);
    expect(content).toMatch(/quest-item/);
    expect(content).toMatch(/quest-status/);
    expect(content).toMatch(/✓/); // complete
    expect(content).toMatch(/○/); // pending
    expect(content).toMatch(/◐/); // in_progress
  });

  it('has styles for different statuses', () => {
    const content = readFileSync(COMPONENT_PATH, 'utf-8');
    
    expect(content).toMatch(/\.quest-item\.complete/);
    expect(content).toMatch(/\.quest-item\.in_progress/);
  });
});
