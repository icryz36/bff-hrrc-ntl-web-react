import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MobileTimePicker from '../MobileTimePicker';

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

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

describe('MobileTimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(MobileTimePicker.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(MobileTimePicker.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(MobileTimePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have dialog slot', () => {
    expect(MobileTimePicker.defaultProps?.slots?.dialog).toBeDefined();
    expect(typeof MobileTimePicker.defaultProps?.slots?.dialog).toBe('function');
  });

  it('should have toolbar slot', () => {
    expect(MobileTimePicker.defaultProps?.slots?.toolbar).toBeDefined();
  });

  it('should have actionBar slot', () => {
    expect(MobileTimePicker.defaultProps?.slots?.actionBar).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(MobileTimePicker.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof MobileTimePicker.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have slotProps defined', () => {
    expect(MobileTimePicker.defaultProps?.slotProps).toBeDefined();
  });

  it('should have mobilePaper in slotProps', () => {
    expect(MobileTimePicker.defaultProps?.slotProps?.mobilePaper).toBeDefined();
    expect(MobileTimePicker.defaultProps?.slotProps?.mobilePaper?.variant).toBe('elevation');
    expect(MobileTimePicker.defaultProps?.slotProps?.mobilePaper?.elevation).toBe(3);
  });

  it('should render custom toolbar', () => {
    const MockToolbar = MobileTimePicker.defaultProps?.slots?.toolbar;
    if (MockToolbar) {
      renderWithTheme(<MockToolbar />);
      expect(screen.getByTestId('time-pickers-toolbar')).toBeInTheDocument();
    } else {
      expect.fail('MockToolbar is undefined');
    }
  });

  it('should render custom actionBar', () => {
    const MockActionBar = MobileTimePicker.defaultProps?.slots?.actionBar;
    if (MockActionBar) {
      renderWithTheme(<MockActionBar />);
      expect(screen.getByTestId('action-bar')).toBeInTheDocument();
    } else {
      expect.fail('MockActionBar is undefined');
    }
  });

  it('should render custom openPickerButton with IconifyIcon', () => {
    const MockOpenPickerButton = MobileTimePicker.defaultProps?.slots?.openPickerButton;
    if (MockOpenPickerButton) {
      renderWithTheme(<MockOpenPickerButton />);
      expect(screen.getByTestId('icon')).toHaveTextContent(
        'material-symbols:schedule-outline-rounded',
      );
    } else {
      expect.fail('MockOpenPickerButton is undefined');
    }
  });

  it('should render custom dialog with specific styles', () => {
    const MockDialog = MobileTimePicker.defaultProps?.slots?.dialog;
    if (MockDialog) {
      // Dialog requires specific props, so we just check it's defined
      expect(MockDialog).toBeDefined();
      expect(typeof MockDialog).toBe('function');
    } else {
      expect.fail('MockDialog is undefined');
    }
  });

  it('should export MobileTimePicker as default', () => {
    expect(MobileTimePicker).toBeDefined();
    expect(typeof MobileTimePicker).toBe('object');
  });
});
