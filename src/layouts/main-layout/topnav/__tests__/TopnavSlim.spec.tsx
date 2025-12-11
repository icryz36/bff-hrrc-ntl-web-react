import { render, screen } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TopnavSlim from '../TopnavSlim';

vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  const mockUseSettingsContext = vi.fn(() => ({
    config: {
      navColor: 'default',
      navigationMenuType: 'topnav',
    },
    handleDrawerToggle: vi.fn(),
  }));
  return {
    ...actual,
    useSettingsContext: mockUseSettingsContext,
  };
});

vi.mock('providers/BreakpointsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/BreakpointsProvider')>();
  return {
    ...actual,
    useBreakpoints: vi.fn(() => ({
      up: vi.fn(() => true),
      down: vi.fn(() => false),
    })),
  };
});

vi.mock('layouts/main-layout/topnav/TopnavItems', () => ({
  default: ({ type }: { type?: string }) => (
    <div data-testid="topnav-items">TopnavItems {type}</div>
  ),
}));

vi.mock('layouts/main-layout/common/AppbarActionItems', () => ({
  default: ({ searchComponent }: { searchComponent?: React.ReactNode; type?: string }) => (
    <div data-testid="appbar-action-items">
      AppbarActionItems
      {searchComponent}
    </div>
  ),
}));

vi.mock('layouts/main-layout/common/ProfileMenu', () => ({
  default: () => <div data-testid="profile-menu">ProfileMenu</div>,
}));

vi.mock('layouts/main-layout/common/NotificationMenu', () => ({
  default: () => <div data-testid="notification-menu">NotificationMenu</div>,
}));

vi.mock('../common/search-box/SearchBox', () => ({
  SearchBoxButton: () => <div data-testid="search-box-button">SearchBoxButton</div>,
}));

vi.mock('components/common/Logo', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('components/common/VibrantBackground', () => ({
  default: () => <div data-testid="vibrant-background">VibrantBackground</div>,
}));

describe('<TopnavSlim />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render TopnavSlim', () => {
    render(<TopnavSlim />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('appbar-action-items')).toBeInTheDocument();
  });

  it('should render TopnavItems when upLg is true', () => {
    render(<TopnavSlim />);
    expect(screen.getByTestId('topnav-items')).toBeInTheDocument();
    expect(screen.getByTestId('topnav-items')).toHaveTextContent('TopnavItems slim');
  });

  it('should render VibrantBackground when navColor is vibrant', async () => {
    const SettingsProvider = await import('providers/SettingsProvider');
    vi.mocked(SettingsProvider.useSettingsContext).mockReturnValue({
      config: {
        navColor: 'vibrant',
        navigationMenuType: 'topnav',
      },
      handleDrawerToggle: vi.fn(),
    } as any);

    render(<TopnavSlim />);
    expect(screen.getByTestId('vibrant-background')).toBeInTheDocument();
  });
});
