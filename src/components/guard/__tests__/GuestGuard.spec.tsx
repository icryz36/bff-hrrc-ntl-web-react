import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import GuestGuard from '../GuestGurad';

const mockUseAuth = vi.fn();

vi.mock('providers/AuthProvider', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('react-router', () => ({
  Navigate: ({ to }: { to: string }) => <div data-testid="navigate" data-to={to} />,
}));

describe('<GuestGuard />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render children when sessionUser does not exist', () => {
    mockUseAuth.mockReturnValue({
      sessionUser: null,
    });

    render(
      <GuestGuard>
        <div>Guest Content</div>
      </GuestGuard>,
    );

    expect(screen.getByText('Guest Content')).toBeInTheDocument();
  });

  it('should navigate to home when sessionUser exists', () => {
    mockUseAuth.mockReturnValue({
      sessionUser: { id: '1', name: 'Test User' },
    });

    render(
      <GuestGuard>
        <div>Guest Content</div>
      </GuestGuard>,
    );

    const navigate = screen.getByTestId('navigate');
    expect(navigate).toBeInTheDocument();
    expect(navigate).toHaveAttribute('data-to', '/');
    expect(screen.queryByText('Guest Content')).not.toBeInTheDocument();
  });

  it('should navigate to home when sessionUser is defined', () => {
    mockUseAuth.mockReturnValue({
      sessionUser: { id: '1' },
    });

    render(
      <GuestGuard>
        <div>Guest Content</div>
      </GuestGuard>,
    );

    const navigate = screen.getByTestId('navigate');
    expect(navigate).toBeInTheDocument();
    expect(navigate).toHaveAttribute('data-to', '/');
  });
});
