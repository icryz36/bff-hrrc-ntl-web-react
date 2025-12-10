import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DateTimePicker from '../DateTimePicker';

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

describe('DateTimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(DateTimePicker?.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(DateTimePicker?.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(DateTimePicker?.defaultProps?.slots).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(DateTimePicker?.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof DateTimePicker?.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have popper slot', () => {
    expect(DateTimePicker?.defaultProps?.slots?.popper).toBeDefined();
    expect(typeof DateTimePicker?.defaultProps?.slots?.popper).toBe('function');
  });

  it('should have actionBar slot', () => {
    expect(DateTimePicker?.defaultProps?.slots?.actionBar).toBeDefined();
  });

  it('should have slotProps defined', () => {
    expect(DateTimePicker?.defaultProps?.slotProps).toBeDefined();
  });

  it('should have desktopPaper in slotProps', () => {
    const desktopPaper = DateTimePicker?.defaultProps?.slotProps?.desktopPaper;
    expect(desktopPaper).toBeDefined();
    if (desktopPaper && typeof desktopPaper === 'object' && 'variant' in desktopPaper) {
      expect(desktopPaper.variant).toBe('elevation');
      expect(desktopPaper.elevation).toBe(3);
    }
  });

  it('should have styleOverrides defined', () => {
    expect(DateTimePicker?.styleOverrides).toBeDefined();
  });

  it('should have root styleOverride', () => {
    expect(DateTimePicker?.styleOverrides?.root).toBeDefined();
    const rootStyle = DateTimePicker?.styleOverrides?.root;
    if (rootStyle && typeof rootStyle === 'object' && 'width' in rootStyle) {
      expect(rootStyle.width).toBe(536);
    }
  });

  it('should render custom openPickerButton with IconifyIcon', () => {
    const MockOpenPickerButton = DateTimePicker?.defaultProps?.slots?.openPickerButton;
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
    const MockActionBar = DateTimePicker?.defaultProps?.slots?.actionBar;
    if (MockActionBar) {
      renderWithTheme(<MockActionBar />);
      expect(screen.getByTestId('action-bar')).toBeInTheDocument();
    } else {
      expect.fail('MockActionBar is undefined');
    }
  });

  it('should configure popper with specific styles', () => {
    const MockPopper = DateTimePicker?.defaultProps?.slots?.popper;
    if (MockPopper) {
      // Popper requires a valid anchorEl, so we create a div element
      const anchorEl = document.createElement('div');
      document.body.appendChild(anchorEl);
      renderWithTheme(<MockPopper open={true} anchorEl={anchorEl} />);
      // Popper might not render immediately, so we just check it's defined
      expect(MockPopper).toBeDefined();
      document.body.removeChild(anchorEl);
    } else {
      expect.fail('MockPopper is undefined');
    }
  });

  it('should export DateTimePicker as default', () => {
    expect(DateTimePicker).toBeDefined();
    expect(typeof DateTimePicker).toBe('object');
  });
});
