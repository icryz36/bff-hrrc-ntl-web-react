import { describe, it, expect, vi, beforeEach } from 'vitest';
import createPalette from '../index';

vi.mock('../darkPalette', () => ({
  darkPalette: {
    mode: 'dark',
    primary: { main: '#000000' },
  },
}));

vi.mock('../lightPalette', () => ({
  lightPalette: {
    mode: 'light',
    primary: { main: '#ffffff' },
  },
}));

describe('createPalette', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return darkPalette when mode is dark', () => {
    const palette = createPalette('dark');
    expect(palette.mode).toBe('dark');
  });

  it('should return lightPalette when mode is light', () => {
    const palette = createPalette('light');
    expect(palette.mode).toBe('light');
  });

  it('should have primary color defined', () => {
    const darkPalette = createPalette('dark');
    expect(darkPalette.primary).toBeDefined();

    const lightPalette = createPalette('light');
    expect(lightPalette.primary).toBeDefined();
  });
});


