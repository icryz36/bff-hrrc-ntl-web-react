import { describe, expect, it } from 'vitest';
import shadows, { darkShadows } from '../shadows';

describe('shadows', () => {
  it('should export shadows array', () => {
    expect(Array.isArray(shadows)).toBe(true);
  });

  it('should have shadows defined', () => {
    expect(shadows.length).toBeGreaterThan(0);
  });

  it('should have shadow values as strings', () => {
    shadows.forEach((shadow) => {
      expect(typeof shadow).toBe('string');
    });
  });

  it('should have first shadow defined', () => {
    expect(shadows[0]).toBeDefined();
    expect(shadows[0]).toContain('rgba');
  });
});

describe('darkShadows', () => {
  it('should export darkShadows array', () => {
    expect(Array.isArray(darkShadows)).toBe(true);
  });

  it('should have darkShadows defined', () => {
    expect(darkShadows.length).toBeGreaterThan(0);
  });

  it('should have dark shadow values as strings', () => {
    darkShadows.forEach((shadow) => {
      expect(typeof shadow).toBe('string');
    });
  });

  it('should have first dark shadow defined', () => {
    expect(darkShadows[0]).toBeDefined();
    expect(darkShadows[0]).toContain('rgba');
  });
});

