import { describe, expect, it } from 'vitest';
import DateTimePicker from '../DateTimePicker';

describe('DateTimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(DateTimePicker.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(DateTimePicker.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(DateTimePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(DateTimePicker.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof DateTimePicker.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have popper slot', () => {
    expect(DateTimePicker.defaultProps?.slots?.popper).toBeDefined();
    expect(typeof DateTimePicker.defaultProps?.slots?.popper).toBe('function');
  });

  it('should have actionBar slot', () => {
    expect(DateTimePicker.defaultProps?.slots?.actionBar).toBeDefined();
  });

  it('should have slotProps defined', () => {
    expect(DateTimePicker.defaultProps?.slotProps).toBeDefined();
  });

  it('should have desktopPaper in slotProps', () => {
    expect(DateTimePicker.defaultProps?.slotProps?.desktopPaper).toBeDefined();
    expect(DateTimePicker.defaultProps?.slotProps?.desktopPaper?.variant).toBe('elevation');
    expect(DateTimePicker.defaultProps?.slotProps?.desktopPaper?.elevation).toBe(3);
  });

  it('should have styleOverrides defined', () => {
    expect(DateTimePicker.styleOverrides).toBeDefined();
  });

  it('should have root styleOverride', () => {
    expect(DateTimePicker.styleOverrides?.root).toBeDefined();
    expect(DateTimePicker.styleOverrides?.root?.width).toBe(536);
  });
});

