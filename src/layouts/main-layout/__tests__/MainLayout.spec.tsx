import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import MainLayout from '../MainLayout';

vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  return {
    ...actual,
    useSettingsContext: vi.fn(() => ({
      config: {
        drawerWidth: 300,
        sidenavType: 'default',
        navigationMenuType: 'sidenav',
        topnavType: 'default',
        openNavbarDrawer: false,
        navColor: 'default',
      },
      setConfig: vi.fn(),
    })),
  };
});

vi.mock('layouts/main-layout/app-bar', () => ({
  default: () => <div data-testid="app-bar">AppBar</div>,
}));

vi.mock('layouts/main-layout/sidenav', () => ({
  default: () => <div data-testid="sidenav">Sidenav</div>,
}));

vi.mock('layouts/main-layout/footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock('layouts/main-layout/NavProvider', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useNavContext: vi.fn(() => ({
    openItems: [],
    setOpenItems: vi.fn(),
    isNestedItemOpen: vi.fn(() => false),
  })),
}));

vi.mock('layouts/main-layout/sidenav/SidenavDrawerContent', () => ({
  default: () => <div data-testid="sidenav-drawer-content">SidenavDrawerContent</div>,
}));

vi.mock('layouts/main-layout/sidenav/SlimSidenav', () => ({
  default: () => <div data-testid="slim-sidenav">SlimSidenav</div>,
}));

vi.mock('layouts/main-layout/sidenav/StackedSidenav', () => ({
  default: () => <div data-testid="stacked-sidenav">StackedSidenav</div>,
}));

vi.mock('layouts/main-layout/topnav', () => ({
  default: () => <div data-testid="topnav">Topnav</div>,
}));

vi.mock('layouts/main-layout/topnav/TopNavStacked', () => ({
  default: () => <div data-testid="topnav-stacked">TopNavStacked</div>,
}));

vi.mock('layouts/main-layout/topnav/TopnavSlim', () => ({
  default: () => <div data-testid="topnav-slim">TopnavSlim</div>,
}));

vi.mock('components/common/VibrantBackground', () => ({
  default: () => <div data-testid="vibrant-background">VibrantBackground</div>,
}));

describe('<MainLayout />', () => {
  it('should render MainLayout with children', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
