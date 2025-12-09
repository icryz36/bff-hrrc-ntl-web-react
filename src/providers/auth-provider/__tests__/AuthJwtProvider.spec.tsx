import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuthJwtProvider, { useAuth, demoUser } from '../AuthJwtProvider';
import { removeItemFromStore } from 'lib/utils';

vi.mock('lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lib/utils')>();
  return {
    ...actual,
    removeItemFromStore: vi.fn(),
  };
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <AuthJwtProvider>{children}</AuthJwtProvider>;
};

describe('AuthJwtProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should provide auth context', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    expect(result.current).toHaveProperty('sessionUser');
    expect(result.current).toHaveProperty('setSessionUser');
    expect(result.current).toHaveProperty('setSession');
    expect(result.current).toHaveProperty('signout');
  });

  it('should have null sessionUser initially', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    expect(result.current.sessionUser).toBeNull();
  });

  it('should set session user with setSession', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    const mockUser = {
      id: 1,
      email: 'test@mail.com',
      name: 'Test User',
      avatar: 'avatar.jpg',
    };

    act(() => {
      result.current.setSession(mockUser, 'test-token');
    });

    expect(result.current.sessionUser).toEqual(mockUser);
    expect(localStorage.getItem('auth_token')).toBe('test-token');
  });

  it('should set session user without token', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    const mockUser = {
      id: 1,
      email: 'test@mail.com',
      name: 'Test User',
      avatar: 'avatar.jpg',
    };

    act(() => {
      result.current.setSession(mockUser);
    });

    expect(result.current.sessionUser).toEqual(mockUser);
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('should signout and clear session', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    const mockUser = {
      id: 1,
      email: 'test@mail.com',
      name: 'Test User',
      avatar: 'avatar.jpg',
    };

    act(() => {
      result.current.setSession(mockUser, 'test-token');
    });

    expect(result.current.sessionUser).toEqual(mockUser);

    act(() => {
      result.current.signout();
    });

    expect(result.current.sessionUser).toBeNull();
    expect(removeItemFromStore).toHaveBeenCalledWith('session_user');
    expect(removeItemFromStore).toHaveBeenCalledWith('auth_token');
  });

  it('should set session user with setSessionUser', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    const mockUser = {
      id: 1,
      email: 'test@mail.com',
      name: 'Test User',
      avatar: 'avatar.jpg',
    };

    act(() => {
      result.current.setSessionUser(mockUser);
    });

    expect(result.current.sessionUser).toEqual(mockUser);
  });
});

describe('demoUser', () => {
  it('should have demoUser export', () => {
    expect(demoUser).toBeDefined();
    expect(demoUser.id).toBe(0);
    expect(demoUser.email).toBe('guest@mail.com');
    expect(demoUser.name).toBe('Guest');
  });
});



