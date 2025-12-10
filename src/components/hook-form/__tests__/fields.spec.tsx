import { describe, expect, it } from 'vitest';
import { Field } from '../fields';

describe('Field', () => {
  it('should have all field components', () => {
    expect(Field.Text).toBeDefined();
    expect(Field.Select).toBeDefined();
    expect(Field.Editor).toBeDefined();
    expect(Field.RadioGroup).toBeDefined();
    expect(Field.DatePicker).toBeDefined();
    expect(Field.TimePicker).toBeDefined();
    expect(Field.MultiSelect).toBeDefined();
    expect(Field.UploadAvatar).toBeDefined();
    expect(Field.Autocomplete).toBeDefined();
    expect(Field.DateTimePicker).toBeDefined();
    expect(Field.Checkbox).toBeDefined();
    expect(Field.MultiCheckbox).toBeDefined();
    expect(Field.Upload).toBeDefined();
  });

  it('should export all components as functions', () => {
    expect(typeof Field.Text).toBe('function');
    expect(typeof Field.Select).toBe('function');
    expect(typeof Field.Editor).toBe('function');
    expect(typeof Field.RadioGroup).toBe('function');
    expect(typeof Field.DatePicker).toBe('function');
    expect(typeof Field.TimePicker).toBe('function');
    expect(typeof Field.MultiSelect).toBe('function');
    expect(typeof Field.UploadAvatar).toBe('function');
    expect(typeof Field.Autocomplete).toBe('function');
    expect(typeof Field.DateTimePicker).toBe('function');
    expect(typeof Field.Checkbox).toBe('function');
    expect(typeof Field.MultiCheckbox).toBe('function');
    expect(typeof Field.Upload).toBe('function');
  });
});

