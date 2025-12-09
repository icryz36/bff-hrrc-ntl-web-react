import { describe, expect, it } from 'vitest';
import TimeClock from '../TimeClock';

describe('TimeClock component config', () => {
  it('should have defaultProps defined', () => {
    expect(TimeClock.defaultProps).toBeDefined();
  });

  it('should have slots defined', () => {
    expect(TimeClock.defaultProps?.slots).toBeDefined();
  });

  it('should have nextIconButton slot', () => {
    expect(TimeClock.defaultProps?.slots?.nextIconButton).toBeDefined();
    expect(typeof TimeClock.defaultProps?.slots?.nextIconButton).toBe('function');
  });

  it('should have previousIconButton slot', () => {
    expect(TimeClock.defaultProps?.slots?.previousIconButton).toBeDefined();
    expect(typeof TimeClock.defaultProps?.slots?.previousIconButton).toBe('function');
  });

  it('should have styleOverrides defined', () => {
    expect(TimeClock.styleOverrides).toBeDefined();
  });

  it('should have root styleOverride', () => {
    expect(TimeClock.styleOverrides?.root).toBeDefined();
    expect(typeof TimeClock.styleOverrides?.root).toBe('function');
  });
});

