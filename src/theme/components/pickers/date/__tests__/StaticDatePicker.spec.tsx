import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import StaticDatePicker from '../StaticDatePicker';

vi.mock('components/pickers/ActionBar', () => ({
  default: () => <div data-testid="action-bar">ActionBar</div>,
}));

vi.mock('components/pickers/DatePickersToolbar', () => ({
  default: () => <div data-testid="date-pickers-toolbar">DatePickersToolbar</div>,
}));

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{ui}</LocalizationProvider>
    </ThemeProvider>,
  );
};

describe('StaticDatePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(StaticDatePicker.defaultProps).toBeDefined();
  });

  it('should have slots defined', () => {
    expect(StaticDatePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have toolbar slot', () => {
    expect(StaticDatePicker.defaultProps?.slots?.toolbar).toBeDefined();
  });

  it('should have actionBar slot', () => {
    expect(StaticDatePicker.defaultProps?.slots?.actionBar).toBeDefined();
  });

  it('should render custom toolbar', () => {
    const MockToolbar = StaticDatePicker.defaultProps?.slots?.toolbar;
    if (MockToolbar) {
      renderWithTheme(<MockToolbar />);
      expect(screen.getByTestId('date-pickers-toolbar')).toBeInTheDocument();
    } else {
      expect.fail('MockToolbar is undefined');
    }
  });

  it('should render custom actionBar', () => {
    const MockActionBar = StaticDatePicker.defaultProps?.slots?.actionBar;
    if (MockActionBar) {
      renderWithTheme(<MockActionBar />);
      expect(screen.getByTestId('action-bar')).toBeInTheDocument();
    } else {
      expect.fail('MockActionBar is undefined');
    }
  });

  it('should export StaticDatePicker as default', () => {
    expect(StaticDatePicker).toBeDefined();
    expect(typeof StaticDatePicker).toBe('object');
  });
});
