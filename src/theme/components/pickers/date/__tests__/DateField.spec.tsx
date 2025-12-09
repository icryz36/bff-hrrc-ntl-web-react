import { describe, expect, it } from 'vitest';
import DateField from '../DateField';

describe('DateField component config', () => {
  it('should have defaultProps defined', () => {
    expect(DateField.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(DateField.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });
});

