import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import StaticDateTimePicker from '../StaticDateTimePicker';

vi.mock('components/pickers/ActionBar', () => ({
  default: () => <div data-testid="action-bar">ActionBar</div>,
}));

vi.mock('components/pickers/DateTimePickersToolbar', () => ({
  default: () => <div data-testid="date-time-pickers-toolbar">DateTimePickersToolbar</div>,
}));

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{ui}</LocalizationProvider>
    </ThemeProvider>,
  );
};

describe('StaticDateTimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(StaticDateTimePicker.defaultProps).toBeDefined();
  });

  it('should have slots defined', () => {
    expect(StaticDateTimePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have toolbar slot', () => {
    expect(StaticDateTimePicker.defaultProps?.slots?.toolbar).toBeDefined();
  });

  it('should have actionBar slot', () => {
    expect(StaticDateTimePicker.defaultProps?.slots?.actionBar).toBeDefined();
  });

  it('should have styleOverrides defined', () => {
    expect(StaticDateTimePicker.styleOverrides).toBeDefined();
  });

  it('should have root styleOverride', () => {
    expect(StaticDateTimePicker.styleOverrides?.root).toBeDefined();
    expect(StaticDateTimePicker.styleOverrides?.root?.width).toBe(536);
  });

  it('should render custom toolbar', () => {
    const MockToolbar = StaticDateTimePicker.defaultProps?.slots?.toolbar;
    if (MockToolbar) {
      renderWithTheme(<MockToolbar />);
      expect(screen.getByTestId('date-time-pickers-toolbar')).toBeInTheDocument();
    } else {
      expect.fail('MockToolbar is undefined');
    }
  });

  it('should render custom actionBar', () => {
    const MockActionBar = StaticDateTimePicker.defaultProps?.slots?.actionBar;
    if (MockActionBar) {
      renderWithTheme(<MockActionBar />);
      expect(screen.getByTestId('action-bar')).toBeInTheDocument();
    } else {
      expect.fail('MockActionBar is undefined');
    }
  });

  it('should export StaticDateTimePicker as default', () => {
    expect(StaticDateTimePicker).toBeDefined();
    expect(typeof StaticDateTimePicker).toBe('object');
  });
});
