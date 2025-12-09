import { describe, expect, it } from 'vitest';
import DesktopDateTimePicker from '../DesktopDateTimePicker';

describe('DesktopDateTimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(DesktopDateTimePicker.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(DesktopDateTimePicker.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(DesktopDateTimePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(DesktopDateTimePicker.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof DesktopDateTimePicker.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have popper slot', () => {
    expect(DesktopDateTimePicker.defaultProps?.slots?.popper).toBeDefined();
    expect(typeof DesktopDateTimePicker.defaultProps?.slots?.popper).toBe('function');
  });

  it('should have actionBar slot', () => {
    expect(DesktopDateTimePicker.defaultProps?.slots?.actionBar).toBeDefined();
  });

  it('should have slotProps defined', () => {
    expect(DesktopDateTimePicker.defaultProps?.slotProps).toBeDefined();
  });

  it('should have desktopPaper in slotProps', () => {
    expect(DesktopDateTimePicker.defaultProps?.slotProps?.desktopPaper).toBeDefined();
    expect(DesktopDateTimePicker.defaultProps?.slotProps?.desktopPaper?.variant).toBe('elevation');
    expect(DesktopDateTimePicker.defaultProps?.slotProps?.desktopPaper?.elevation).toBe(3);
  });

  it('should have styleOverrides defined', () => {
    expect(DesktopDateTimePicker.styleOverrides).toBeDefined();
  });

  it('should have root styleOverride', () => {
    expect(DesktopDateTimePicker.styleOverrides?.root).toBeDefined();
    expect(DesktopDateTimePicker.styleOverrides?.root?.width).toBe(536);
  });
});

