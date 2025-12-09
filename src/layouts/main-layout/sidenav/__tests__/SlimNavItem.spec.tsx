import { render, screen } from 'test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SlimNavItem from '../SlimNavItem';

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
        navColor: 'default',
      },
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
  path: '/test',
  active: true,
  items: [], // Add empty items to use button instead of NavLink
} as any;

describe('<SlimNavItem />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render SlimNavItem', () => {
    render(<SlimNavItem item={mockItem} level={0} />);
    // When item has items (even empty), it uses button
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render with nested items', () => {
    const itemWithNested = {
      ...mockItem,
      items: [
        {
          pathName: 'nested-item',
          name: 'Nested Item',
          path: '/test/nested',
          active: true,
        },
      ],
    };

    // When item has nested items, it uses button instead of NavLink
    render(<SlimNavItem item={itemWithNested} level={0} />);
    // Just check that the component renders without crashing
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

