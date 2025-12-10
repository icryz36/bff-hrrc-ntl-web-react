import { render, screen } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SlimSidenav from '../SlimSidenav';

vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  return {
    ...actual,
    useSettingsContext: vi.fn(() => ({
      config: {
        sidenavCollapsed: false,
        drawerWidth: 280,
        navColor: 'default',
        navigationMenuType: 'sidenav',
      },
    })),
  };
});

vi.mock('../../NavProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../NavProvider')>();
  return {
    ...actual,
    useNavContext: vi.fn(() => ({
      sidenavAppbarVariant: 'dense',
    })),
  };
});

vi.mock('layouts/main-layout/sidenav/SidenavSimpleBar', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidenav-simple-bar">{children}</div>
  ),
}));

vi.mock('layouts/main-layout/sidenav/SlimNavItem', () => ({
  default: () => <div data-testid="slim-nav-item">SlimNavItem</div>,
}));

vi.mock('components/common/Logo', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('components/common/VibrantBackground', () => ({
  default: () => <div data-testid="vibrant-background">VibrantBackground</div>,
}));

describe('<SlimSidenav />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render SlimSidenav', () => {
    render(<SlimSidenav />);
    expect(screen.getByTestId('sidenav-simple-bar')).toBeInTheDocument();
  });
});
