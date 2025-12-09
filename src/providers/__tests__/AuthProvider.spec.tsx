import { render, screen } from 'test-utils';
import { describe, expect, it, vi } from 'vitest';
import AuthProvider, { useAuth } from '../AuthProvider';

vi.mock('../auth-provider/AuthJwtProvider', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-jwt-provider">{children}</div>
  ),
  AuthJwtContext: {
    Provider: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="auth-jwt-context">{children}</div>
    ),
  },
}));

describe('AuthProvider', () => {
  it('should render AuthProvider with children', () => {
    render(
      <AuthProvider>
        <div>Test Children</div>
      </AuthProvider>,
    );
    expect(screen.getByText('Test Children')).toBeInTheDocument();
    expect(screen.getByTestId('auth-jwt-provider')).toBeInTheDocument();
  });

  it('should export useAuth function', () => {
    expect(typeof useAuth).toBe('function');
  });
});

