import { render, screen } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SidenavDrawerContent from '../SidenavDrawerContent';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  const React = await import('react');
  return {
    ...actual,
    useLocation: vi.fn(() => ({
      pathname: '/',
    })),
    NavLink: React.forwardRef(
      (
        { children, to, ...props }: { children: React.ReactNode; to: string; [key: string]: any },
        ref: any,
      ) => (
        <a href={to} ref={ref} {...props}>
          {children}
        </a>
      ),
    ),
  };
});

vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  return {
    ...actual,
    useSettingsContext: vi.fn(() => ({
      config: {
        sidenavCollapsed: false,
        openNavbarDrawer: false,
        navigationMenuType: 'sidenav',
      },
      setConfig: vi.fn(),
    })),
  };
});

vi.mock('layouts/main-layout/NavProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('layouts/main-layout/NavProvider')>();
  return {
    ...actual,
    useNavContext: vi.fn(() => ({
      sidenavAppbarVariant: 'dense',
      setOpenItems: vi.fn(),
      openItems: [],
      isNestedItemOpen: vi.fn(() => false),
    })),
  };
});

vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-i18next')>();
  return {
    ...actual,
    useTranslation: vi.fn(() => ({
      t: (key: string) => key,
      i18n: {
        changeLanguage: vi.fn(),
      },
    })),
    initReactI18next: {
      type: '3rdParty',
      init: vi.fn(),
    },
  };
});

vi.mock('./NavItem', () => ({
  default: ({ item }: { item: any }) => <div data-testid="nav-item">NavItem {item.name}</div>,
}));

vi.mock('./SidenavSimpleBar', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidenav-simple-bar">{children}</div>
  ),
}));

vi.mock('components/common/Logo', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

describe('<SidenavDrawerContent />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render SidenavDrawerContent', () => {
    render(<SidenavDrawerContent />);
    // SidenavDrawerContent renders Logo and NavItem which are mocked
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('should render with variant temporary', () => {
    render(<SidenavDrawerContent variant="temporary" />);
    // SidenavDrawerContent renders Logo and NavItem which are mocked
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
