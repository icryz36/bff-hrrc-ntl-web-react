import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import AuthGuard from '../AuthGuard';

const mockUseAuth = vi.fn();

vi.mock('providers/AuthProvider', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('react-router', () => ({
  Navigate: ({ to }: { to: string }) => <div data-testid="navigate" data-to={to} />,
}));

describe('<AuthGuard />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render children when sessionUser exists', () => {
    mockUseAuth.mockReturnValue({
      sessionUser: { id: '1', name: 'Test User' },
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>,
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should navigate to login when sessionUser does not exist', () => {
    mockUseAuth.mockReturnValue({
      sessionUser: null,
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>,
    );

    const navigate = screen.getByTestId('navigate');
    expect(navigate).toBeInTheDocument();
    expect(navigate).toHaveAttribute('data-to', '/pages/authentication/jwt/login');
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should navigate to login when sessionUser is undefined', () => {
    mockUseAuth.mockReturnValue({
      sessionUser: undefined,
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>,
    );

    const navigate = screen.getByTestId('navigate');
    expect(navigate).toBeInTheDocument();
    expect(navigate).toHaveAttribute('data-to', '/pages/authentication/jwt/login');
  });
});
