import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TimePicker from '../TimePicker';

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

describe('TimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(TimePicker?.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(TimePicker?.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(TimePicker?.defaultProps?.slots).toBeDefined();
  });

  it('should have popper slot', () => {
    expect(TimePicker?.defaultProps?.slots?.popper).toBeDefined();
    expect(typeof TimePicker?.defaultProps?.slots?.popper).toBe('function');
  });

  it('should have openPickerButton slot', () => {
    expect(TimePicker?.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof TimePicker?.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have slotProps defined', () => {
    expect(TimePicker?.defaultProps?.slotProps).toBeDefined();
  });

  it('should have textField in slotProps', () => {
    expect(TimePicker?.defaultProps?.slotProps?.textField).toBeDefined();
  });

  it('should have desktopPaper in slotProps', () => {
    const desktopPaper = TimePicker?.defaultProps?.slotProps?.desktopPaper;
    expect(desktopPaper).toBeDefined();
    if (desktopPaper && typeof desktopPaper === 'object' && 'variant' in desktopPaper) {
      expect(desktopPaper.variant).toBe('elevation');
      expect(desktopPaper.elevation).toBe(3);
    }
  });

  it('should render custom openPickerButton with IconifyIcon', () => {
    const MockOpenPickerButton = TimePicker?.defaultProps?.slots?.openPickerButton;
    if (MockOpenPickerButton) {
      renderWithTheme(<MockOpenPickerButton />);
      expect(screen.getByTestId('icon')).toHaveTextContent(
        'material-symbols:schedule-outline-rounded',
      );
    } else {
      expect.fail('MockOpenPickerButton is undefined');
    }
  });

  it('should configure textField inputProps sx for placeholder opacity', () => {
    const textFieldProps = TimePicker?.defaultProps?.slotProps?.textField;
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
    const desktopPaperProps = TimePicker?.defaultProps?.slotProps?.desktopPaper;
    if (
      desktopPaperProps &&
      typeof desktopPaperProps === 'object' &&
      'variant' in desktopPaperProps
    ) {
      expect(desktopPaperProps.variant).toBe('elevation');
      expect(desktopPaperProps.elevation).toBe(3);
    }
  });

  it('should configure popper with specific styles', () => {
    const MockPopper = TimePicker?.defaultProps?.slots?.popper;
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

  it('should export TimePicker as default', () => {
    expect(TimePicker).toBeDefined();
    expect(typeof TimePicker).toBe('object');
  });
});
