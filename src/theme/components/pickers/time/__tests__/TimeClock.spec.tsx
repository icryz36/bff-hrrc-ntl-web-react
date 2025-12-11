import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TimeClock from '../TimeClock';

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

vi.mock('lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lib/utils')>();
  return {
    ...actual,
    cssVarRgba: vi.fn((color: string, alpha: number) => `rgba(${color} / ${alpha})`),
  };
});

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{ui}</LocalizationProvider>
    </ThemeProvider>,
  );
};

describe('TimeClock component config', () => {
  it('should have defaultProps defined', () => {
    expect(TimeClock?.defaultProps).toBeDefined();
  });

  it('should have slots defined', () => {
    expect(TimeClock?.defaultProps?.slots).toBeDefined();
  });

  it('should have nextIconButton slot', () => {
    expect(TimeClock?.defaultProps?.slots?.nextIconButton).toBeDefined();
    expect(typeof TimeClock?.defaultProps?.slots?.nextIconButton).toBe('function');
  });

  it('should have previousIconButton slot', () => {
    expect(TimeClock?.defaultProps?.slots?.previousIconButton).toBeDefined();
    expect(typeof TimeClock?.defaultProps?.slots?.previousIconButton).toBe('function');
  });

  it('should have styleOverrides defined', () => {
    expect(TimeClock?.styleOverrides).toBeDefined();
  });

  it('should have root styleOverride', () => {
    expect(TimeClock?.styleOverrides?.root).toBeDefined();
    expect(typeof TimeClock?.styleOverrides?.root).toBe('function');
  });

  it('should render custom nextIconButton with IconifyIcon', () => {
    const MockNextIconButton = TimeClock?.defaultProps?.slots?.nextIconButton;
    if (MockNextIconButton) {
      renderWithTheme(<MockNextIconButton />);
      expect(screen.getByTestId('icon')).toHaveTextContent(
        'material-symbols:chevron-right-rounded',
      );
    } else {
      expect.fail('MockNextIconButton is undefined');
    }
  });

  it('should render custom previousIconButton with IconifyIcon', () => {
    const MockPreviousIconButton = TimeClock?.defaultProps?.slots?.previousIconButton;
    if (MockPreviousIconButton) {
      renderWithTheme(<MockPreviousIconButton />);
      expect(screen.getByTestId('icon')).toHaveTextContent('material-symbols:chevron-left-rounded');
    } else {
      expect.fail('MockPreviousIconButton is undefined');
    }
  });

  it('should apply root styleOverrides correctly', () => {
    const rootStyle = TimeClock?.styleOverrides?.root;
    if (rootStyle && typeof rootStyle === 'function') {
      // Create a mock theme with vars.palette to avoid errors
      const mockTheme = {
        ...theme,
        vars: {
          palette: {
            background: {
              elevation1: 'rgba(0, 0, 0, 0.05)',
            },
            primary: {
              mainChannel: '25, 118, 210',
            },
          },
        },
      };
      const result = rootStyle({ theme: mockTheme as any, ownerState: {} });
      expect(result).toBeDefined();
    } else {
      expect.fail('root styleOverride is not a function');
    }
  });

  it('should export TimeClock as default', () => {
    expect(TimeClock).toBeDefined();
    expect(typeof TimeClock).toBe('object');
  });
});
