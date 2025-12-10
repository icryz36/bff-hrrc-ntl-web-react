import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DatePicker from '../DatePicker';

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

describe('DatePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(DatePicker?.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(DatePicker?.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(DatePicker?.defaultProps?.slots).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(DatePicker?.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof DatePicker?.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have slotProps defined', () => {
    expect(DatePicker?.defaultProps?.slotProps).toBeDefined();
  });

  it('should have textField in slotProps', () => {
    expect(DatePicker?.defaultProps?.slotProps?.textField).toBeDefined();
  });

  it('should have desktopPaper in slotProps', () => {
    expect(DatePicker?.defaultProps?.slotProps?.desktopPaper).toBeDefined();
    expect(DatePicker?.defaultProps?.slotProps?.desktopPaper?.variant).toBe('elevation');
    expect(DatePicker?.defaultProps?.slotProps?.desktopPaper?.elevation).toBe(3);
  });

  it('should render custom openPickerButton with IconifyIcon', () => {
    const MockOpenPickerButton = DatePicker?.defaultProps?.slots?.openPickerButton;
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
    const textFieldProps = DatePicker?.defaultProps?.slotProps?.textField;
    expect(textFieldProps?.inputProps?.sx).toBeDefined();
    expect(textFieldProps?.inputProps?.sx?.['&::-webkit-input-placeholder']).toEqual({
      opacity: '0 !important',
    });
    expect(textFieldProps?.inputProps?.sx?.['&::-moz-placeholder']).toEqual({
      opacity: '0 !important',
    });
  });

  it('should configure desktopPaper with elevation 3', () => {
    const desktopPaperProps = DatePicker?.defaultProps?.slotProps?.desktopPaper;
    expect(desktopPaperProps?.variant).toBe('elevation');
    expect(desktopPaperProps?.elevation).toBe(3);
  });

  it('should export DatePicker as default', () => {
    expect(DatePicker).toBeDefined();
    expect(typeof DatePicker).toBe('object');
  });
});
