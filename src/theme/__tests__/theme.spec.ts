import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTheme } from '../theme';

vi.mock('theme/palette', () => ({
  default: vi.fn(() => ({
    primary: { main: '#1976d2' },
  })),
}));

describe('createTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create theme with default direction and locale', () => {
    const theme = createTheme();
    expect(theme).toBeDefined();
    expect(theme.direction).toBe('ltr');
  });

  it('should create theme with ltr direction', () => {
    const theme = createTheme('ltr');
    expect(theme.direction).toBe('ltr');
  });

  it('should create theme with rtl direction', () => {
    const theme = createTheme('rtl');
    expect(theme.direction).toBe('rtl');
  });

  it('should create theme with en-US locale', () => {
    const theme = createTheme('ltr', 'en-US');
    expect(theme).toBeDefined();
  });

  it('should have typography configuration', () => {
    const theme = createTheme();
    expect(theme.typography).toBeDefined();
  });

  it('should have mixins configuration', () => {
    const theme = createTheme();
    expect(theme.mixins).toBeDefined();
  });

  it('should have colorSchemes with light and dark', () => {
    const theme = createTheme();
    expect(theme.colorSchemes).toBeDefined();
    expect(theme.colorSchemes?.light).toBeDefined();
    expect(theme.colorSchemes?.dark).toBeDefined();
  });

  it('should have components configuration', () => {
    const theme = createTheme();
    expect(theme.components).toBeDefined();
  });
});

