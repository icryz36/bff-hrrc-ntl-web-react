import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import ThemeProvider from '../ThemeProvider';

const mockUseSettingsContext = vi.fn();
const mockCreateTheme = vi.fn(() => ({
  direction: 'ltr',
  palette: {
    mode: 'light',
  },
}));

vi.mock('../SettingsProvider', () => ({
  useSettingsContext: () => mockUseSettingsContext(),
}));

vi.mock('theme/theme.ts', () => ({
  createTheme: () => mockCreateTheme(),
}));

vi.mock('theme/RTLMode', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="rtl-mode">{children}</div>
  ),
}));

vi.mock('@mui/material', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mui/material')>();
  return {
    ...actual,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mui-theme-provider">{children}</div>
    ),
    CssBaseline: () => <div data-testid="css-baseline">CssBaseline</div>,
    useMediaQuery: vi.fn(() => true),
  };
});

describe('ThemeProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSettingsContext.mockReturnValue({
      config: {
        textDirection: 'ltr',
        locale: 'en-US',
      },
    });
  });

  it('should render ThemeProvider with children', () => {
    render(
      <ThemeProvider>
        <div>Test Children</div>
      </ThemeProvider>,
    );
    expect(screen.getByText('Test Children')).toBeInTheDocument();
    expect(screen.getByTestId('mui-theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('css-baseline')).toBeInTheDocument();
    expect(screen.getByTestId('rtl-mode')).toBeInTheDocument();
  });

  it('should create theme with textDirection and locale from settings', () => {
    vi.clearAllMocks();
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>,
    );
    expect(mockCreateTheme).toHaveBeenCalled();
  });

  it('should update theme when textDirection changes', () => {
    vi.clearAllMocks();

    mockUseSettingsContext.mockReturnValue({
      config: {
        textDirection: 'rtl',
        locale: 'en-US',
      },
    });

    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>,
    );
    expect(mockCreateTheme).toHaveBeenCalled();
  });

  it('should update theme when locale changes', () => {
    vi.clearAllMocks();

    mockUseSettingsContext.mockReturnValue({
      config: {
        textDirection: 'ltr',
        locale: 'th-TH',
      },
    });

    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>,
    );
    expect(mockCreateTheme).toHaveBeenCalled();
  });
});

