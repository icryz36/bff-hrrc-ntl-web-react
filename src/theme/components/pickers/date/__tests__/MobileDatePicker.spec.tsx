import { describe, expect, it } from 'vitest';
import MobileDatePicker from '../MobileDatePicker';

describe('MobileDatePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(MobileDatePicker.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(MobileDatePicker.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(MobileDatePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have toolbar slot', () => {
    expect(MobileDatePicker.defaultProps?.slots?.toolbar).toBeDefined();
  });

  it('should have actionBar slot', () => {
    expect(MobileDatePicker.defaultProps?.slots?.actionBar).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(MobileDatePicker.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof MobileDatePicker.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have slotProps defined', () => {
    expect(MobileDatePicker.defaultProps?.slotProps).toBeDefined();
  });

  it('should have mobilePaper in slotProps', () => {
    expect(MobileDatePicker.defaultProps?.slotProps?.mobilePaper).toBeDefined();
    expect(MobileDatePicker.defaultProps?.slotProps?.mobilePaper?.variant).toBe('elevation');
    expect(MobileDatePicker.defaultProps?.slotProps?.mobilePaper?.elevation).toBe(3);
  });
});

