import { render, screen } from 'test-utils';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import NotistackProvider from '../NotistackProvider';

vi.mock('components/snackbar/SnackbarCloseButton', () => ({
  default: ({ snackbarKey }: { snackbarKey: string | number }) => (
    <div data-testid="snackbar-close-button">{snackbarKey}</div>
  ),
}));

vi.mock('components/snackbar/SnackbarIcon', () => ({
  default: ({ variant, icon }: { variant: string; icon: string }) => (
    <div data-testid={`snackbar-icon-${variant}`}>{icon}</div>
  ),
}));

vi.mock('notistack', () => ({
  SnackbarProvider: ({ children, maxSnack, anchorOrigin, iconVariant, action }: any) => (
    <div data-testid="snackbar-provider">
      <div data-testid="max-snack">{maxSnack}</div>
      <div data-testid="anchor-origin">{JSON.stringify(anchorOrigin)}</div>
      <div data-testid="icon-variant">{Object.keys(iconVariant).join(',')}</div>
      <div data-testid="action">{typeof action === 'function' ? 'function' : 'not-function'}</div>
      {children}
    </div>
  ),
}));

const mockUseTheme = vi.fn();
vi.mock('@mui/material', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mui/material')>();
  return {
    ...actual,
    useTheme: () => mockUseTheme(),
    useMediaQuery: vi.fn(() => true),
  };
});

describe('NotistackProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTheme.mockReturnValue({
      direction: 'ltr',
      breakpoints: {
        up: vi.fn(() => ''),
        down: vi.fn(() => ''),
        only: vi.fn(() => ''),
      },
    });
  });

  it('should render NotistackProvider with children', () => {
    const { container } = render(
      <NotistackProvider>
        <div>Test Children</div>
      </NotistackProvider>,
    );
    expect(screen.getByText('Test Children')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="snackbar-provider"]')).toBeInTheDocument();
  });

  it('should configure maxSnack to 10', () => {
    const { container } = render(
      <NotistackProvider>
        <div>Test</div>
      </NotistackProvider>,
    );
    const maxSnack = container.querySelector('[data-testid="max-snack"]');
    expect(maxSnack?.textContent).toBe('10');
  });

  it('should configure anchorOrigin for ltr direction', () => {
    mockUseTheme.mockReturnValue({
      direction: 'ltr',
      breakpoints: {
        up: vi.fn(() => ''),
        down: vi.fn(() => ''),
        only: vi.fn(() => ''),
      },
    });

    const { container } = render(
      <NotistackProvider>
        <div>Test</div>
      </NotistackProvider>,
    );
    const anchorOrigin = container.querySelector('[data-testid="anchor-origin"]');
    expect(anchorOrigin?.textContent).toContain('right');
    expect(anchorOrigin?.textContent).toContain('top');
  });

  it('should configure anchorOrigin for rtl direction', () => {
    mockUseTheme.mockReturnValue({
      direction: 'rtl',
      breakpoints: {
        up: vi.fn(() => ''),
        down: vi.fn(() => ''),
        only: vi.fn(() => ''),
      },
    });

    const { container } = render(
      <NotistackProvider>
        <div>Test</div>
      </NotistackProvider>,
    );
    const anchorOrigin = container.querySelector('[data-testid="anchor-origin"]');
    expect(anchorOrigin?.textContent).toContain('left');
    expect(anchorOrigin?.textContent).toContain('top');
  });

  it('should configure iconVariant for all variants', () => {
    const { container } = render(
      <NotistackProvider>
        <div>Test</div>
      </NotistackProvider>,
    );
    const iconVariant = container.querySelector('[data-testid="icon-variant"]');
    expect(iconVariant?.textContent).toContain('default');
    expect(iconVariant?.textContent).toContain('success');
    expect(iconVariant?.textContent).toContain('error');
    expect(iconVariant?.textContent).toContain('warning');
    expect(iconVariant?.textContent).toContain('info');
  });

  it('should configure action as function', () => {
    const { container } = render(
      <NotistackProvider>
        <div>Test</div>
      </NotistackProvider>,
    );
    const action = container.querySelector('[data-testid="action"]');
    expect(action).toBeInTheDocument();
    expect(action?.textContent).toContain('function');
  });
});

