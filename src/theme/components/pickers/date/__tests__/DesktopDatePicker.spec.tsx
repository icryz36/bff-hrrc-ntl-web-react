import { describe, expect, it } from 'vitest';
import DesktopDatePicker from '../DesktopDatePicker';

describe('DesktopDatePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(DesktopDatePicker.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(DesktopDatePicker.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(DesktopDatePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(DesktopDatePicker.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof DesktopDatePicker.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have slotProps defined', () => {
    expect(DesktopDatePicker.defaultProps?.slotProps).toBeDefined();
  });

  it('should have textField in slotProps', () => {
    expect(DesktopDatePicker.defaultProps?.slotProps?.textField).toBeDefined();
  });

  it('should have desktopPaper in slotProps', () => {
    expect(DesktopDatePicker.defaultProps?.slotProps?.desktopPaper).toBeDefined();
    expect(DesktopDatePicker.defaultProps?.slotProps?.desktopPaper?.variant).toBe('elevation');
    expect(DesktopDatePicker.defaultProps?.slotProps?.desktopPaper?.elevation).toBe(3);
  });
});

