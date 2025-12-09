import { describe, expect, it } from 'vitest';
import StaticTimePicker from '../StaticTimePicker';

describe('StaticTimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(StaticTimePicker.defaultProps).toBeDefined();
  });

  it('should have slots defined', () => {
    expect(StaticTimePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have toolbar slot', () => {
    expect(StaticTimePicker.defaultProps?.slots?.toolbar).toBeDefined();
  });

  it('should have actionBar slot', () => {
    expect(StaticTimePicker.defaultProps?.slots?.actionBar).toBeDefined();
  });
});

