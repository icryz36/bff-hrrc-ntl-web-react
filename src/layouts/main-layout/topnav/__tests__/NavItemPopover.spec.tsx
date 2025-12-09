import { render, screen } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NavitemPopover from '../NavItemPopover';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useLocation: vi.fn(() => ({
      pathname: '/',
    })),
    Link: ({ children, href }: { children: React.ReactNode; href?: string }) => (
      <a href={href}>{children}</a>
    ),
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

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

const mockItems = [
  {
    pathName: 'item1',
    name: 'Item 1',
    path: '/item1',
    active: true,
  },
  {
    pathName: 'item2',
    name: 'Item 2',
    path: '/item2',
    active: true,
    items: [
      {
        pathName: 'item2-1',
        name: 'Item 2-1',
        path: '/item2/item2-1',
        active: true,
      },
    ],
  },
] as any;

describe('<NavitemPopover />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render NavitemPopover when open', () => {
    const mockAnchorEl = document.createElement('button');
    const mockHandleClose = vi.fn();

    render(
      <NavitemPopover
        anchorEl={mockAnchorEl}
        open={true}
        handleClose={mockHandleClose}
        items={mockItems}
        level={0}
      />,
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should not render when open is false', () => {
    const mockAnchorEl = document.createElement('button');
    const mockHandleClose = vi.fn();

    render(
      <NavitemPopover
        anchorEl={mockAnchorEl}
        open={false}
        handleClose={mockHandleClose}
        items={mockItems}
        level={0}
      />,
    );

    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('should render nested items when item has items', () => {
    const mockAnchorEl = document.createElement('button');
    const mockHandleClose = vi.fn();

    render(
      <NavitemPopover
        anchorEl={mockAnchorEl}
        open={true}
        handleClose={mockHandleClose}
        items={mockItems}
        level={0}
      />,
    );

    const item2 = screen.getByText('Item 2');
    expect(item2).toBeInTheDocument();
    expect(screen.getAllByTestId('icon').length).toBeGreaterThan(0);
  });
});
