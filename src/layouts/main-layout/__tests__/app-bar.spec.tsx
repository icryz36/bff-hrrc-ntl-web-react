import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import AppBar from '../app-bar';

vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  return {
    ...actual,
    useSettingsContext: vi.fn(() => ({
      config: {
        drawerWidth: 300,
        sidenavType: 'default',
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
    })),
  };
});

vi.mock('components/common/Logo', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('components/common/VibrantBackground', () => ({
  default: () => <div data-testid="vibrant-background">VibrantBackground</div>,
}));

vi.mock('../common/AppbarActionItems', () => ({
  default: () => <div data-testid="appbar-action-items">AppbarActionItems</div>,
}));

describe('<AppBar />', () => {
  it('should render AppBar', () => {
    render(<AppBar />);

    expect(screen.getByTestId('appbar-action-items')).toBeInTheDocument();
  });
});



