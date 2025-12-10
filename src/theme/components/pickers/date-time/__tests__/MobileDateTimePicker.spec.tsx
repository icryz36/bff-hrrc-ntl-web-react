import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MobileDateTimePicker from '../MobileDateTimePicker';

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

vi.mock('components/pickers/ActionBar', () => ({
  default: () => <div data-testid="action-bar">ActionBar</div>,
}));

vi.mock('components/pickers/DateTimePickersToolbar', () => ({
  default: () => <div data-testid="date-time-pickers-toolbar">DateTimePickersToolbar</div>,
}));

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{ui}</LocalizationProvider>
    </ThemeProvider>,
  );
};

describe('MobileDateTimePicker component config', () => {
  it('should have defaultProps defined', () => {
    expect(MobileDateTimePicker?.defaultProps).toBeDefined();
  });

  it('should have enableAccessibleFieldDOMStructure set to false', () => {
    expect(MobileDateTimePicker?.defaultProps?.enableAccessibleFieldDOMStructure).toBe(false);
  });

  it('should have slots defined', () => {
    expect(MobileDateTimePicker?.defaultProps?.slots).toBeDefined();
  });

  it('should have toolbar slot', () => {
    expect(MobileDateTimePicker?.defaultProps?.slots?.toolbar).toBeDefined();
  });

  it('should have actionBar slot', () => {
    expect(MobileDateTimePicker?.defaultProps?.slots?.actionBar).toBeDefined();
  });

  it('should have openPickerButton slot', () => {
    expect(MobileDateTimePicker?.defaultProps?.slots?.openPickerButton).toBeDefined();
    expect(typeof MobileDateTimePicker?.defaultProps?.slots?.openPickerButton).toBe('function');
  });

  it('should have slotProps defined', () => {
    expect(MobileDateTimePicker?.defaultProps?.slotProps).toBeDefined();
  });

  it('should have mobilePaper in slotProps', () => {
    const mobilePaper = MobileDateTimePicker?.defaultProps?.slotProps?.mobilePaper;
    expect(mobilePaper).toBeDefined();
    if (mobilePaper && typeof mobilePaper === 'object' && 'variant' in mobilePaper) {
      expect(mobilePaper.variant).toBe('elevation');
      expect(mobilePaper.elevation).toBe(3);
    }
  });

  it('should have mobilePaper with margin 0 in sx', () => {
    const mobilePaper = MobileDateTimePicker?.defaultProps?.slotProps?.mobilePaper;
    if (mobilePaper && typeof mobilePaper === 'object' && 'sx' in mobilePaper) {
      const sx = mobilePaper.sx;
      if (sx && typeof sx === 'object' && 'margin' in sx) {
        expect(sx.margin).toBe(0);
      }
    }
  });

  it('should have styleOverrides defined', () => {
    expect(MobileDateTimePicker?.styleOverrides).toBeDefined();
  });

  it('should have root styleOverride', () => {
    expect(MobileDateTimePicker?.styleOverrides?.root).toBeDefined();
    const rootStyle = MobileDateTimePicker?.styleOverrides?.root;
    if (rootStyle && typeof rootStyle === 'object' && 'width' in rootStyle) {
      expect(rootStyle.width).toBe(536);
    }
  });

  it('should render custom toolbar', () => {
    const MockToolbar = MobileDateTimePicker?.defaultProps?.slots?.toolbar;
    if (MockToolbar) {
      renderWithTheme(<MockToolbar />);
      expect(screen.getByTestId('date-time-pickers-toolbar')).toBeInTheDocument();
    } else {
      expect.fail('MockToolbar is undefined');
    }
  });

  it('should render custom actionBar', () => {
    const MockActionBar = MobileDateTimePicker?.defaultProps?.slots?.actionBar;
    if (MockActionBar) {
      renderWithTheme(<MockActionBar />);
      expect(screen.getByTestId('action-bar')).toBeInTheDocument();
    } else {
      expect.fail('MockActionBar is undefined');
    }
  });

  it('should render custom openPickerButton with IconifyIcon', () => {
    const MockOpenPickerButton = MobileDateTimePicker?.defaultProps?.slots?.openPickerButton;
    if (MockOpenPickerButton) {
      renderWithTheme(<MockOpenPickerButton />);
      expect(screen.getByTestId('icon')).toHaveTextContent(
        'material-symbols:calendar-today-outline-rounded',
      );
    } else {
      expect.fail('MockOpenPickerButton is undefined');
    }
  });

  it('should export MobileDateTimePicker as default', () => {
    expect(MobileDateTimePicker).toBeDefined();
    expect(typeof MobileDateTimePicker).toBe('object');
  });
});
