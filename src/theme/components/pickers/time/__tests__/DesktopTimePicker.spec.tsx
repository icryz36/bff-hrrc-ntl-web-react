import { describe, expect, it } from 'vitest';
import DesktopTimePicker from '../DesktopTimePicker';

describe('DesktopTimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(DesktopTimePicker.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(DesktopTimePicker.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(DesktopTimePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(DesktopTimePicker.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof DesktopTimePicker.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have slotProps defined', () => {
    expect(DesktopTimePicker.defaultProps?.slotProps).toBeDefined();
  });

  it('should have desktopPaper in slotProps', () => {
    expect(DesktopTimePicker.defaultProps?.slotProps?.desktopPaper).toBeDefined();
    expect(DesktopTimePicker.defaultProps?.slotProps?.desktopPaper?.variant).toBe('elevation');
    expect(DesktopTimePicker.defaultProps?.slotProps?.desktopPaper?.elevation).toBe(3);
  });
});

