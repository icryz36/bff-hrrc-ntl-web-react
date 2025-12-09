import { render, screen } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TopNavStacked from '../TopNavStacked';

vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  return {
    ...actual,
    useSettingsContext: vi.fn(() => ({
      config: {
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
  default: ({ sx }: { sx?: any }) => <div data-testid="appbar-action-items">AppbarActionItems</div>,
}));

vi.mock('layouts/main-layout/common/ProfileMenu', () => ({
  default: () => <div data-testid="profile-menu">ProfileMenu</div>,
}));

vi.mock('layouts/main-layout/common/NotificationMenu', () => ({
  default: () => <div data-testid="notification-menu">NotificationMenu</div>,
}));

vi.mock('../common/search-box/SearchBox', () => ({
  default: () => <div data-testid="search-box">SearchBox</div>,
}));

vi.mock('components/common/Logo', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('components/common/VibrantBackground', () => ({
  default: () => <div data-testid="vibrant-background">VibrantBackground</div>,
}));

describe('<TopNavStacked />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render TopNavStacked', () => {
    render(<TopNavStacked />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
