import { describe, expect, it } from 'vitest';
import { REQUIRED_MESSAGE } from '../error-message';

describe('error-message', () => {
  it('should have REQUIRED_MESSAGE constant', () => {
    expect(REQUIRED_MESSAGE).toBe('This field is required');
  });

  it('should be a string', () => {
    expect(typeof REQUIRED_MESSAGE).toBe('string');
  });
});
