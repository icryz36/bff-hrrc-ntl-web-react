import { render, screen } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NavItemPopper from '../NavItemPopper';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useLocation: vi.fn(() => ({
      pathname: '/',
    })),
  };
});

vi.mock('components/base/SimpleBar', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="simple-bar">{children}</div>
  ),
}));

describe('<NavItemPopper />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render NavItemPopper when open', () => {
    const mockAnchorEl = document.createElement('div');
    const mockHandleClose = vi.fn();

    render(
      <NavItemPopper anchorEl={mockAnchorEl} open={true} handleClose={mockHandleClose} level={0}>
        <div>Test Content</div>
      </NavItemPopper>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should not render when open is false', () => {
    const mockAnchorEl = document.createElement('div');
    const mockHandleClose = vi.fn();

    render(
      <NavItemPopper anchorEl={mockAnchorEl} open={false} handleClose={mockHandleClose} level={0}>
        <div>Test Content</div>
      </NavItemPopper>,
    );

    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });
});
