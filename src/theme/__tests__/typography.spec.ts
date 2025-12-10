import { describe, expect, it } from 'vitest';
import typography from '../typography';

describe('typography', () => {
  it('should have fontFamily defined', () => {
    expect(typography.fontFamily).toBeDefined();
    expect(typography.fontFamily).toContain('Noto Sans Thai');
  });

  it('should have h1 variant', () => {
    expect(typography.h1).toBeDefined();
    expect(typography.h1?.fontSize).toBe('3rem');
    expect(typography.h1?.fontWeight).toBe(700);
  });

  it('should have h2 variant', () => {
    expect(typography.h2).toBeDefined();
    expect(typography.h2?.fontSize).toBe('2.625rem');
  });

  it('should have h3 variant', () => {
    expect(typography.h3).toBeDefined();
    expect(typography.h3?.fontSize).toBe('2rem');
  });

  it('should have body1 variant', () => {
    expect(typography.body1).toBeDefined();
    expect(typography.body1?.fontSize).toBe('1rem');
    expect(typography.body1?.fontWeight).toBe(400);
  });

  it('should have body2 variant', () => {
    expect(typography.body2).toBeDefined();
    expect(typography.body2?.fontSize).toBe('0.875rem');
  });

  it('should have button variant', () => {
    expect(typography.button).toBeDefined();
    expect(typography.button?.fontWeight).toBe(700);
    expect(typography.button?.textTransform).toBe('capitalize');
  });

  it('should have bold variants', () => {
    expect(typography.h1_bold).toBeDefined();
    expect(typography.h1_bold?.fontWeight).toBe(700);
  });

  it('should have semibold variants', () => {
    expect(typography.h1_semibold).toBeDefined();
    expect(typography.h1_semibold?.fontWeight).toBe(600);
  });

  it('should have medium variants', () => {
    expect(typography.h1_medium).toBeDefined();
    expect(typography.h1_medium?.fontWeight).toBe(500);
  });

  it('should have regular variants', () => {
    expect(typography.h1_regular).toBeDefined();
    expect(typography.h1_regular?.fontWeight).toBe(400);
  });

  it('should have light variants', () => {
    expect(typography.h1_light).toBeDefined();
    expect(typography.h1_light?.fontWeight).toBe(300);
  });
});

