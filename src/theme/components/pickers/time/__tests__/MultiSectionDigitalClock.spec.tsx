import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MultiSectionDigitalClock from '../MultiSectionDigitalClock';

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{ui}</LocalizationProvider>
    </ThemeProvider>,
  );
};

describe('MultiSectionDigitalClock component config', () => {
  it('should have defaultProps defined', () => {
    expect(MultiSectionDigitalClock.defaultProps).toBeDefined();
  });

  it('should have slots defined', () => {
    expect(MultiSectionDigitalClock.defaultProps?.slots).toBeDefined();
  });

  it('should have digitalClockSectionItem slot', () => {
    expect(MultiSectionDigitalClock.defaultProps?.slots?.digitalClockSectionItem).toBeDefined();
    expect(typeof MultiSectionDigitalClock.defaultProps?.slots?.digitalClockSectionItem).toBe(
      'function',
    );
  });

  it('should have styleOverrides defined', () => {
    expect(MultiSectionDigitalClock.styleOverrides).toBeDefined();
  });

  it('should have root styleOverride', () => {
    expect(MultiSectionDigitalClock.styleOverrides?.root).toBeDefined();
    expect(MultiSectionDigitalClock.styleOverrides?.root?.border).toBe('none');
  });

  it('should have digitalClockSectionItem slot as function', () => {
    const MockDigitalClockSectionItem =
      MultiSectionDigitalClock.defaultProps?.slots?.digitalClockSectionItem;
    expect(MockDigitalClockSectionItem).toBeDefined();
    expect(typeof MockDigitalClockSectionItem).toBe('function');
  });

  it('should export MultiSectionDigitalClock as default', () => {
    expect(MultiSectionDigitalClock).toBeDefined();
    expect(typeof MultiSectionDigitalClock).toBe('object');
  });
});
