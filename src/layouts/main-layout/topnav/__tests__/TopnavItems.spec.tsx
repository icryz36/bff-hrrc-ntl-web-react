import { render, screen } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TopnavItems from '../TopnavItems';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useLocation: vi.fn(() => ({
      pathname: '/',
    })),
  };
});

vi.mock('layouts/main-layout/NavProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('layouts/main-layout/NavProvider')>();
  return {
    ...actual,
    useNavContext: vi.fn(() => ({
      isNestedItemOpen: vi.fn(() => false),
    })),
  };
});

vi.mock('layouts/main-layout/topnav/NavItemPopover', () => ({
  default: () => <div data-testid="nav-item-popover">NavItemPopover</div>,
}));

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

describe('<TopnavItems />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render TopnavItems', () => {
    render(<TopnavItems />);
    // TopnavItems renders buttons from sitemap
    // NavItemPopover only renders when selectedMenu is set, so we just check the component renders
    expect(screen.getAllByTestId('icon').length).toBeGreaterThan(0);
  });
});
