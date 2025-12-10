import { describe, expect, it } from 'vitest';
import sxConfig from '../sxConfig';

describe('sxConfig', () => {
  it('should have lineClamp defined', () => {
    expect(sxConfig.lineClamp).toBeDefined();
  });

  it('should have lineClamp style function', () => {
    expect(typeof sxConfig.lineClamp.style).toBe('function');
  });

  it('should return correct styles for lineClamp', () => {
    const result = sxConfig.lineClamp.style({ lineClamp: 3 });
    expect(result.display).toBe('-webkit-box');
    expect(result.WebkitLineClamp).toBe('3');
    expect(result.WebkitBoxOrient).toBe('vertical');
    expect(result.overflow).toBe('hidden');
  });

  it('should handle different lineClamp values', () => {
    const result1 = sxConfig.lineClamp.style({ lineClamp: 1 });
    expect(result1.WebkitLineClamp).toBe('1');

    const result2 = sxConfig.lineClamp.style({ lineClamp: 5 });
    expect(result2.WebkitLineClamp).toBe('5');
  });
});
