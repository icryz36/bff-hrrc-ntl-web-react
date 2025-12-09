import { render, screen, fireEvent } from 'test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NavItem from '../NavItem';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useLocation: vi.fn(() => ({
      pathname: '/',
    })),
    NavLink: ({ children, to, ...props }: { children: React.ReactNode; to: string; [key: string]: any }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
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

vi.mock('layouts/main-layout/NavProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('layouts/main-layout/NavProvider')>();
  return {
    ...actual,
    useNavContext: vi.fn(() => ({
      setOpenItems: vi.fn(),
      openItems: [],
      isNestedItemOpen: vi.fn(() => false),
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
        sidenavType: 'default',
        navColor: 'default',
        openNavbarDrawer: false,
        locale: 'en-US',
      },
      configDispatch: vi.fn(),
      handleDrawerToggle: vi.fn(),
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

vi.mock('./NavItemPopper', () => ({
  default: () => <div data-testid="nav-item-popper">NavItemPopper</div>,
}));

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

const mockItem = {
  pathName: 'test-item',
  name: 'Test Item',
  key: 'test-item',
  path: '/test',
  active: true,
  items: [], // Add empty items to use div instead of NavLink
} as any;

describe('<NavItem />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render NavItem', () => {
    // When item has items (even empty), it uses div instead of NavLink
    render(<NavItem item={mockItem} level={0} />);
    // Just check that the component renders
    expect(screen.getByText('test-item')).toBeInTheDocument();
  });

  it('should render with icon', () => {
    const itemWithIcon = {
      ...mockItem,
      icon: 'test-icon',
    };

    render(<NavItem item={itemWithIcon} level={0} />);
    expect(screen.getAllByTestId('icon').length).toBeGreaterThan(0);
  });
});

