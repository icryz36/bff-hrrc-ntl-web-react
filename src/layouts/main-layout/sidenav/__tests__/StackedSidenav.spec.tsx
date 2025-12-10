import { render, screen } from 'test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import StackedSidenav from '../StackedSidenav';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useLocation: vi.fn(() => ({
      pathname: '/',
    })),
  };
});

vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  return {
    ...actual,
    useSettingsContext: vi.fn(() => ({
      config: {
        sidenavCollapsed: false,
        drawerWidth: 280,
        navigationMenuType: 'sidenav',
        navColor: 'default',
      },
      toggleNavbarCollapse: vi.fn(),
    })),
  };
});

vi.mock('providers/BreakpointsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/BreakpointsProvider')>();
  return {
    ...actual,
    useBreakpoints: vi.fn(() => ({
      currentBreakpoint: 'lg',
      up: vi.fn(() => true),
      down: vi.fn(() => false),
    })),
  };
});

vi.mock('hooks/useThemeMode', () => ({
  useThemeMode: vi.fn(() => ({
    isDark: false,
  })),
}));

vi.mock('providers/AuthProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/AuthProvider')>();
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      sessionUser: null,
    })),
  };
});

vi.mock('layouts/main-layout/NavProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('layouts/main-layout/NavProvider')>();
  return {
    ...actual,
    useNavContext: vi.fn(() => ({
      sidenavAppbarVariant: 'dense',
    })),
  };
});

vi.mock('./NavItem', () => ({
  default: () => <div data-testid="nav-item">NavItem</div>,
}));

vi.mock('components/common/Logo', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('components/common/VibrantBackground', () => ({
  default: () => <div data-testid="vibrant-background">VibrantBackground</div>,
}));

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

vi.mock('components/base/StatusAvatar', () => ({
  default: () => <div data-testid="status-avatar">StatusAvatar</div>,
}));

describe('<StackedSidenav />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render StackedSidenav', () => {
    render(<StackedSidenav />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});


