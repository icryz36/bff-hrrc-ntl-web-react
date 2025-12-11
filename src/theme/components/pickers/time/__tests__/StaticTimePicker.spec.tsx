import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import StaticTimePicker from '../StaticTimePicker';

vi.mock('components/pickers/ActionBar', () => ({
  default: () => <div data-testid="action-bar">ActionBar</div>,
}));

vi.mock('components/pickers/TimePickersToolbar', () => ({
  default: () => <div data-testid="time-pickers-toolbar">TimePickersToolbar</div>,
}));

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{ui}</LocalizationProvider>
    </ThemeProvider>,
  );
};

describe('StaticTimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(StaticTimePicker?.defaultProps).toBeDefined();
  });

  it('should have slots defined', () => {
    expect(StaticTimePicker?.defaultProps?.slots).toBeDefined();
  });

  it('should have toolbar slot', () => {
    expect(StaticTimePicker?.defaultProps?.slots?.toolbar).toBeDefined();
  });

  it('should have actionBar slot', () => {
    expect(StaticTimePicker?.defaultProps?.slots?.actionBar).toBeDefined();
  });

  it('should render custom toolbar', () => {
    const MockToolbar = StaticTimePicker?.defaultProps?.slots?.toolbar;
    if (MockToolbar) {
      renderWithTheme(<MockToolbar />);
      expect(screen.getByTestId('time-pickers-toolbar')).toBeInTheDocument();
    } else {
      expect.fail('MockToolbar is undefined');
    }
  });

  it('should render custom actionBar', () => {
    const MockActionBar = StaticTimePicker?.defaultProps?.slots?.actionBar;
    if (MockActionBar) {
      renderWithTheme(<MockActionBar />);
      expect(screen.getByTestId('action-bar')).toBeInTheDocument();
    } else {
      expect.fail('MockActionBar is undefined');
    }
  });

  it('should export StaticTimePicker as default', () => {
    expect(StaticTimePicker).toBeDefined();
    expect(typeof StaticTimePicker).toBe('object');
  });
});
