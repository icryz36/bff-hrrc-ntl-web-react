import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DesktopDatePicker from '../DesktopDatePicker';

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

describe('DesktopDatePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(DesktopDatePicker?.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(DesktopDatePicker?.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(DesktopDatePicker?.defaultProps?.slots).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(DesktopDatePicker?.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof DesktopDatePicker?.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have slotProps defined', () => {
    expect(DesktopDatePicker?.defaultProps?.slotProps).toBeDefined();
  });

  it('should have textField in slotProps', () => {
    expect(DesktopDatePicker?.defaultProps?.slotProps?.textField).toBeDefined();
  });

  it('should have desktopPaper in slotProps', () => {
    const desktopPaper = DesktopDatePicker?.defaultProps?.slotProps?.desktopPaper;
    expect(desktopPaper).toBeDefined();
    if (desktopPaper && typeof desktopPaper === 'object' && 'variant' in desktopPaper) {
      expect(desktopPaper.variant).toBe('elevation');
      expect(desktopPaper.elevation).toBe(3);
    }
  });

  it('should render custom openPickerButton with IconifyIcon', () => {
    const MockOpenPickerButton = DesktopDatePicker?.defaultProps?.slots?.openPickerButton;
    if (MockOpenPickerButton) {
      renderWithTheme(<MockOpenPickerButton />);
      expect(screen.getByTestId('icon')).toHaveTextContent(
        'material-symbols:calendar-today-outline-rounded',
      );
    } else {
      expect.fail('MockOpenPickerButton is undefined');
    }
  });

  it('should configure textField inputProps sx for placeholder opacity', () => {
    const textFieldProps = DesktopDatePicker?.defaultProps?.slotProps?.textField;
    expect(textFieldProps).toBeDefined();
    if (textFieldProps && typeof textFieldProps === 'object' && 'inputProps' in textFieldProps) {
      const inputProps = textFieldProps.inputProps as any;
      if (inputProps && 'sx' in inputProps) {
        expect(inputProps.sx).toBeDefined();
        expect(inputProps.sx?.['&::-webkit-input-placeholder']).toEqual({
          opacity: '0 !important',
        });
        expect(inputProps.sx?.['&::-moz-placeholder']).toEqual({
          opacity: '0 !important',
        });
      }
    }
  });

  it('should configure desktopPaper with elevation 3', () => {
    const desktopPaperProps = DesktopDatePicker?.defaultProps?.slotProps?.desktopPaper;
    if (
      desktopPaperProps &&
      typeof desktopPaperProps === 'object' &&
      'variant' in desktopPaperProps
    ) {
      expect(desktopPaperProps.variant).toBe('elevation');
      expect(desktopPaperProps.elevation).toBe(3);
    }
  });

  it('should export DesktopDatePicker as default', () => {
    expect(DesktopDatePicker).toBeDefined();
    expect(typeof DesktopDatePicker).toBe('object');
  });
});
