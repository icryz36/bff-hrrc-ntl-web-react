import { describe, expect, it } from 'vitest';
import StaticDatePicker from '../StaticDatePicker';

describe('StaticDatePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(StaticDatePicker.defaultProps).toBeDefined();
  });

  it('should have slots defined', () => {
    expect(StaticDatePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have toolbar slot', () => {
    expect(StaticDatePicker.defaultProps?.slots?.toolbar).toBeDefined();
  });

  it('should have actionBar slot', () => {
    expect(StaticDatePicker.defaultProps?.slots?.actionBar).toBeDefined();
  });
});

