import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import NavItem from '../sidenav/NavItem';

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

vi.mock('react-router', () => ({
  useLocation: vi.fn(() => ({
    pathname: '/',
  })),
  NavLink: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

vi.mock('../NavProvider', () => ({
  useNavContext: vi.fn(() => ({
    openItems: [],
    setOpenItems: vi.fn(),
    isNestedItemOpen: vi.fn(() => false),
  })),
}));

vi.mock('providers/BreakpointsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/BreakpointsProvider')>();
  return {
    ...actual,
    useBreakpoints: vi.fn(() => ({
      currentBreakpoint: 'lg',
      up: vi.fn(() => true),
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

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

vi.mock('./NavItemPopper', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="nav-item-popper">{children}</div>
  ),
}));

const mockItem = {
  pathName: 'test',
  name: 'Test Item',
  path: '/test',
  icon: 'material-symbols:home',
};

describe('<NavItem />', () => {
  it('should render NavItem', () => {
    render(<NavItem item={mockItem} level={0} />);

    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('should render with icon', () => {
    render(<NavItem item={mockItem} level={0} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
