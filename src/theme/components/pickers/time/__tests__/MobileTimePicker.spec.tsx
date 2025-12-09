import { describe, expect, it } from 'vitest';
import MobileTimePicker from '../MobileTimePicker';

describe('MobileTimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(MobileTimePicker.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(MobileTimePicker.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(MobileTimePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have dialog slot', () => {
    expect(MobileTimePicker.defaultProps?.slots?.dialog).toBeDefined();
    expect(typeof MobileTimePicker.defaultProps?.slots?.dialog).toBe('function');
  });

  it('should have toolbar slot', () => {
    expect(MobileTimePicker.defaultProps?.slots?.toolbar).toBeDefined();
  });

  it('should have actionBar slot', () => {
    expect(MobileTimePicker.defaultProps?.slots?.actionBar).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(MobileTimePicker.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof MobileTimePicker.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have slotProps defined', () => {
    expect(MobileTimePicker.defaultProps?.slotProps).toBeDefined();
  });

  it('should have mobilePaper in slotProps', () => {
    expect(MobileTimePicker.defaultProps?.slotProps?.mobilePaper).toBeDefined();
    expect(MobileTimePicker.defaultProps?.slotProps?.mobilePaper?.variant).toBe('elevation');
    expect(MobileTimePicker.defaultProps?.slotProps?.mobilePaper?.elevation).toBe(3);
  });
});

