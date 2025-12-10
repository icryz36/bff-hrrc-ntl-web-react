import { render, screen } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Sidenav from '../index';

vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  return {
    ...actual,
    useSettingsContext: vi.fn(() => ({
      config: {
        sidenavCollapsed: false,
        drawerWidth: 280,
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

vi.mock('layouts/main-layout/sidenav/SidenavCollapse', () => ({
  default: () => <div data-testid="sidenav-collapse">SidenavCollapse</div>,
}));

vi.mock('layouts/main-layout/sidenav/SidenavDrawerContent', () => ({
  default: ({ variant }: { variant?: string }) => (
    <div data-testid="sidenav-drawer-content">SidenavDrawerContent {variant}</div>
  ),
}));

vi.mock('components/common/VibrantBackground', () => ({
  default: () => <div data-testid="vibrant-background">VibrantBackground</div>,
}));

describe('<Sidenav />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Sidenav', () => {
    render(<Sidenav />);
    expect(screen.getByTestId('sidenav-drawer-content')).toBeInTheDocument();
    expect(screen.getByTestId('sidenav-collapse')).toBeInTheDocument();
  });
});
