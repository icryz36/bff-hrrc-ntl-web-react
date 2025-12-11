import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DesktopTimePicker from '../DesktopTimePicker';

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{ui}</LocalizationProvider>
    </ThemeProvider>,
  );
};

describe('DesktopTimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(DesktopTimePicker?.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(DesktopTimePicker?.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(DesktopTimePicker?.defaultProps?.slots).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(DesktopTimePicker?.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof DesktopTimePicker?.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have slotProps defined', () => {
    expect(DesktopTimePicker?.defaultProps?.slotProps).toBeDefined();
  });

  it('should have desktopPaper in slotProps', () => {
    const desktopPaper = DesktopTimePicker?.defaultProps?.slotProps?.desktopPaper;
    expect(desktopPaper).toBeDefined();
    if (desktopPaper && typeof desktopPaper === 'object' && 'variant' in desktopPaper) {
      expect(desktopPaper.variant).toBe('elevation');
      expect(desktopPaper.elevation).toBe(3);
    }
  });

  it('should render custom openPickerButton with IconifyIcon', () => {
    const MockOpenPickerButton = DesktopTimePicker?.defaultProps?.slots?.openPickerButton;
    if (MockOpenPickerButton) {
      renderWithTheme(<MockOpenPickerButton />);
      expect(screen.getByTestId('icon')).toHaveTextContent(
        'material-symbols:schedule-outline-rounded',
      );
    } else {
      expect.fail('MockOpenPickerButton is undefined');
    }
  });

  it('should export DesktopTimePicker as default', () => {
    expect(DesktopTimePicker).toBeDefined();
    expect(typeof DesktopTimePicker).toBe('object');
  });
});
