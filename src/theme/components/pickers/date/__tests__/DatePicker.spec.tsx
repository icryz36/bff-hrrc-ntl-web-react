import { describe, expect, it } from 'vitest';
import DatePicker from '../DatePicker';

describe('DatePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(DatePicker.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(DatePicker.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(DatePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(DatePicker.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof DatePicker.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have slotProps defined', () => {
    expect(DatePicker.defaultProps?.slotProps).toBeDefined();
  });

  it('should have textField in slotProps', () => {
    expect(DatePicker.defaultProps?.slotProps?.textField).toBeDefined();
  });

  it('should have desktopPaper in slotProps', () => {
    expect(DatePicker.defaultProps?.slotProps?.desktopPaper).toBeDefined();
    expect(DatePicker.defaultProps?.slotProps?.desktopPaper?.variant).toBe('elevation');
    expect(DatePicker.defaultProps?.slotProps?.desktopPaper?.elevation).toBe(3);
  });
});

