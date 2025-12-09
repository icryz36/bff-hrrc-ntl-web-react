import { describe, expect, it } from 'vitest';
import MultiSectionDigitalClock from '../MultiSectionDigitalClock';

describe('MultiSectionDigitalClock component config', () => {
  it('should have defaultProps defined', () => {
    expect(MultiSectionDigitalClock.defaultProps).toBeDefined();
  });

  it('should have slots defined', () => {
    expect(MultiSectionDigitalClock.defaultProps?.slots).toBeDefined();
  });

  it('should have digitalClockSectionItem slot', () => {
    expect(MultiSectionDigitalClock.defaultProps?.slots?.digitalClockSectionItem).toBeDefined();
    expect(typeof MultiSectionDigitalClock.defaultProps?.slots?.digitalClockSectionItem).toBe('function');
  });

  it('should have styleOverrides defined', () => {
    expect(MultiSectionDigitalClock.styleOverrides).toBeDefined();
  });

  it('should have root styleOverride', () => {
    expect(MultiSectionDigitalClock.styleOverrides?.root).toBeDefined();
    expect(MultiSectionDigitalClock.styleOverrides?.root?.border).toBe('none');
  });
});

