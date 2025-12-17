import { render, screen } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Topnav from '../index';

vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  return {
    ...actual,
    useSettingsContext: vi.fn(() => ({
      config: {
        navigationMenuType: 'topnav',
        navColor: 'default',
      },
      handleDrawerToggle: vi.fn(),
    })),
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
  default: ({ searchComponent }: { searchComponent?: React.ReactNode }) => (
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

describe('<Topnav />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Topnav', () => {
    render(<Topnav />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
