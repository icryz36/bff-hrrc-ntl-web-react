import { describe, expect, it } from 'vitest';
import TimePicker from '../TimePicker';

describe('TimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(TimePicker.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(TimePicker.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(TimePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have popper slot', () => {
    expect(TimePicker.defaultProps?.slots?.popper).toBeDefined();
    expect(typeof TimePicker.defaultProps?.slots?.popper).toBe('function');
  });

  it('should have openPickerButton slot', () => {
    expect(TimePicker.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof TimePicker.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have slotProps defined', () => {
    expect(TimePicker.defaultProps?.slotProps).toBeDefined();
  });

  it('should have textField in slotProps', () => {
    expect(TimePicker.defaultProps?.slotProps?.textField).toBeDefined();
  });

  it('should have desktopPaper in slotProps', () => {
    expect(TimePicker.defaultProps?.slotProps?.desktopPaper).toBeDefined();
    expect(TimePicker.defaultProps?.slotProps?.desktopPaper?.variant).toBe('elevation');
    expect(TimePicker.defaultProps?.slotProps?.desktopPaper?.elevation).toBe(3);
  });
});

