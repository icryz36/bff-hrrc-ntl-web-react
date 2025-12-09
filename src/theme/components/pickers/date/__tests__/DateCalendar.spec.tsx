import { describe, expect, it } from 'vitest';
import DateCalendar from '../DateCalendar';

describe('DateCalendar component config', () => {
  it('should have defaultProps defined', () => {
    expect(DateCalendar.defaultProps).toBeDefined();
  });

  it('should have slots defined in defaultProps', () => {
    expect(DateCalendar.defaultProps?.slots).toBeDefined();
  });

  it('should have calendarHeader slot', () => {
    expect(DateCalendar.defaultProps?.slots?.calendarHeader).toBeDefined();
    expect(typeof DateCalendar.defaultProps?.slots?.calendarHeader).toBe('function');
  });

  it('should have day slot', () => {
    expect(DateCalendar.defaultProps?.slots?.day).toBeDefined();
    expect(typeof DateCalendar.defaultProps?.slots?.day).toBe('function');
  });

  it('should have styleOverrides defined', () => {
    expect(DateCalendar.styleOverrides).toBeDefined();
  });

  it('should have root styleOverride', () => {
    expect(DateCalendar.styleOverrides?.root).toBeDefined();
    expect(typeof DateCalendar.styleOverrides?.root).toBe('function');
  });
});

