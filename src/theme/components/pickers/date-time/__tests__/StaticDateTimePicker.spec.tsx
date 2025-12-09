import { describe, expect, it } from 'vitest';
import StaticDateTimePicker from '../StaticDateTimePicker';

describe('StaticDateTimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(StaticDateTimePicker.defaultProps).toBeDefined();
  });

  it('should have slots defined', () => {
    expect(StaticDateTimePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have toolbar slot', () => {
    expect(StaticDateTimePicker.defaultProps?.slots?.toolbar).toBeDefined();
  });

  it('should have actionBar slot', () => {
    expect(StaticDateTimePicker.defaultProps?.slots?.actionBar).toBeDefined();
  });

  it('should have styleOverrides defined', () => {
    expect(StaticDateTimePicker.styleOverrides).toBeDefined();
  });

  it('should have root styleOverride', () => {
    expect(StaticDateTimePicker.styleOverrides?.root).toBeDefined();
    expect(StaticDateTimePicker.styleOverrides?.root?.width).toBe(536);
  });
});

