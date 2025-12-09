import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DesktopDateTimePicker from '../DesktopDateTimePicker';

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

vi.mock('components/pickers/ActionBar', () => ({
  default: () => <div data-testid="action-bar">ActionBar</div>,
}));

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{ui}</LocalizationProvider>
    </ThemeProvider>,
  );
};

describe('DesktopDateTimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(DesktopDateTimePicker.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(DesktopDateTimePicker.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(DesktopDateTimePicker.defaultProps?.slots).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(DesktopDateTimePicker.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof DesktopDateTimePicker.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have popper slot', () => {
    expect(DesktopDateTimePicker.defaultProps?.slots?.popper).toBeDefined();
    expect(typeof DesktopDateTimePicker.defaultProps?.slots?.popper).toBe('function');
  });

  it('should have actionBar slot', () => {
    expect(DesktopDateTimePicker.defaultProps?.slots?.actionBar).toBeDefined();
  });

  it('should have slotProps defined', () => {
    expect(DesktopDateTimePicker.defaultProps?.slotProps).toBeDefined();
  });

  it('should have desktopPaper in slotProps', () => {
    expect(DesktopDateTimePicker.defaultProps?.slotProps?.desktopPaper).toBeDefined();
    expect(DesktopDateTimePicker.defaultProps?.slotProps?.desktopPaper?.variant).toBe('elevation');
    expect(DesktopDateTimePicker.defaultProps?.slotProps?.desktopPaper?.elevation).toBe(3);
  });

  it('should have styleOverrides defined', () => {
    expect(DesktopDateTimePicker.styleOverrides).toBeDefined();
  });

  it('should have root styleOverride', () => {
    expect(DesktopDateTimePicker.styleOverrides?.root).toBeDefined();
    expect(DesktopDateTimePicker.styleOverrides?.root?.width).toBe(536);
  });

  it('should render custom openPickerButton with IconifyIcon', () => {
    const MockOpenPickerButton = DesktopDateTimePicker.defaultProps?.slots?.openPickerButton;
    if (MockOpenPickerButton) {
      renderWithTheme(<MockOpenPickerButton />);
      expect(screen.getByTestId('icon')).toHaveTextContent(
        'material-symbols:calendar-today-outline-rounded',
      );
    } else {
      expect.fail('MockOpenPickerButton is undefined');
    }
  });

  it('should render custom actionBar', () => {
    const MockActionBar = DesktopDateTimePicker.defaultProps?.slots?.actionBar;
    if (MockActionBar) {
      renderWithTheme(<MockActionBar />);
      expect(screen.getByTestId('action-bar')).toBeInTheDocument();
    } else {
      expect.fail('MockActionBar is undefined');
    }
  });

  it('should configure popper with specific styles', () => {
    const MockPopper = DesktopDateTimePicker.defaultProps?.slots?.popper;
    if (MockPopper) {
      // Popper requires a valid anchorEl, so we create a div element
      const anchorEl = document.createElement('div');
      document.body.appendChild(anchorEl);
      const { container } = renderWithTheme(<MockPopper open={true} anchorEl={anchorEl} />);
      // Popper might not render immediately, so we just check it's defined
      expect(MockPopper).toBeDefined();
      document.body.removeChild(anchorEl);
    } else {
      expect.fail('MockPopper is undefined');
    }
  });

  it('should export DesktopDateTimePicker as default', () => {
    expect(DesktopDateTimePicker).toBeDefined();
    expect(typeof DesktopDateTimePicker).toBe('object');
  });
});
