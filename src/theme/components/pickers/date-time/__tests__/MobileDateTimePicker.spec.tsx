import { describe, expect, it } from 'vitest';
import MobileDateTimePicker from '../MobileDateTimePicker';

describe('MobileDateTimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(MobileDateTimePicker.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(MobileDateTimePicker.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(MobileDateTimePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have toolbar slot', () => {
    expect(MobileDateTimePicker.defaultProps?.slots?.toolbar).toBeDefined();
  });

  it('should have actionBar slot', () => {
    expect(MobileDateTimePicker.defaultProps?.slots?.actionBar).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(MobileDateTimePicker.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof MobileDateTimePicker.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have slotProps defined', () => {
    expect(MobileDateTimePicker.defaultProps?.slotProps).toBeDefined();
  });

  it('should have mobilePaper in slotProps', () => {
    expect(MobileDateTimePicker.defaultProps?.slotProps?.mobilePaper).toBeDefined();
    expect(MobileDateTimePicker.defaultProps?.slotProps?.mobilePaper?.variant).toBe('elevation');
    expect(MobileDateTimePicker.defaultProps?.slotProps?.mobilePaper?.elevation).toBe(3);
  });

  it('should have styleOverrides defined', () => {
    expect(MobileDateTimePicker.styleOverrides).toBeDefined();
  });

  it('should have root styleOverride', () => {
    expect(MobileDateTimePicker.styleOverrides?.root).toBeDefined();
    expect(MobileDateTimePicker.styleOverrides?.root?.width).toBe(536);
  });
});

