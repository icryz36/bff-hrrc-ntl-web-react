import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MobileDatePicker from '../MobileDatePicker';

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

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

describe('MobileDatePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(MobileDatePicker?.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(MobileDatePicker?.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(MobileDatePicker?.defaultProps?.slots).toBeDefined();
  });

  it('should have toolbar slot', () => {
    expect(MobileDatePicker?.defaultProps?.slots?.toolbar).toBeDefined();
  });

  it('should have actionBar slot', () => {
    expect(MobileDatePicker?.defaultProps?.slots?.actionBar).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(MobileDatePicker?.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof MobileDatePicker?.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have slotProps defined', () => {
    expect(MobileDatePicker?.defaultProps?.slotProps).toBeDefined();
  });

  it('should have mobilePaper in slotProps', () => {
    expect(MobileDatePicker?.defaultProps?.slotProps?.mobilePaper).toBeDefined();
    expect(MobileDatePicker?.defaultProps?.slotProps?.mobilePaper?.variant).toBe('elevation');
    expect(MobileDatePicker?.defaultProps?.slotProps?.mobilePaper?.elevation).toBe(3);
  });

  it('should render custom toolbar', () => {
    const MockToolbar = MobileDatePicker?.defaultProps?.slots?.toolbar;
    if (MockToolbar) {
      renderWithTheme(<MockToolbar />);
      expect(screen.getByTestId('date-pickers-toolbar')).toBeInTheDocument();
    } else {
      expect.fail('MockToolbar is undefined');
    }
  });

  it('should render custom actionBar', () => {
    const MockActionBar = MobileDatePicker?.defaultProps?.slots?.actionBar;
    if (MockActionBar) {
      renderWithTheme(<MockActionBar />);
      expect(screen.getByTestId('action-bar')).toBeInTheDocument();
    } else {
      expect.fail('MockActionBar is undefined');
    }
  });

  it('should render custom openPickerButton with IconifyIcon', () => {
    const MockOpenPickerButton = MobileDatePicker?.defaultProps?.slots?.openPickerButton;
    if (MockOpenPickerButton) {
      renderWithTheme(<MockOpenPickerButton />);
      expect(screen.getByTestId('icon')).toHaveTextContent(
        'material-symbols:calendar-today-outline-rounded',
      );
    } else {
      expect.fail('MockOpenPickerButton is undefined');
    }
  });

  it('should export MobileDatePicker as default', () => {
    expect(MobileDatePicker).toBeDefined();
    expect(typeof MobileDatePicker).toBe('object');
  });
});
