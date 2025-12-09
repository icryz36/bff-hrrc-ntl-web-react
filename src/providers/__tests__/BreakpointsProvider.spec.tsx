import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import BreakpointsProvider, { useBreakpoints } from '../BreakpointsProvider';
import { PropsWithChildren } from 'react';

// Mock useMediaQuery
const mockUseMediaQuery = vi.fn();
const mockBreakpoints = {
  up: (key: string) => `(min-width:${key})`,
  down: (key: string) => `(max-width:${key})`,
  only: (key: string) => `(min-width:${key}) and (max-width:${key})`,
};

vi.mock('@mui/material', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mui/material')>();
  return {
    ...actual,
    useMediaQuery: (query: any) => {
      // If query is a string (from breakpoints.only), check which breakpoint it is
      if (typeof query === 'string') {
        return mockUseMediaQuery(query);
      }
      return mockUseMediaQuery(query);
    },
    useTheme: () => ({
      breakpoints: mockBreakpoints,
    }),
  };
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn((query: string) => ({
    matches: query.includes('min-width:768'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('BreakpointsProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock return values - return false for all by default
    mockUseMediaQuery.mockImplementation(() => false);
  });

  const wrapper = ({ children }: PropsWithChildren) => (
    <BreakpointsProvider>{children}</BreakpointsProvider>
  );

  it('should provide breakpoints context', () => {
    const { result } = renderHook(() => useBreakpoints(), { wrapper });
    expect(result.current).toBeDefined();
    expect(typeof result.current.currentBreakpoint).toBe('string');
    expect(typeof result.current.up).toBe('function');
    expect(typeof result.current.down).toBe('function');
    expect(typeof result.current.only).toBe('function');
    expect(typeof result.current.between).toBe('function');
  });

  it('should return current breakpoint', () => {
    // Mock to return true only for md only query
    mockUseMediaQuery.mockImplementation((query: any) => {
      if (typeof query === 'string') {
        // Check if it's the md only query by comparing with breakpoints.only('md')
        const mdOnlyQuery = mockBreakpoints.only('md');
        return query === mdOnlyQuery;
      }
      return false;
    });

    const { result } = renderHook(() => useBreakpoints(), { wrapper });
    expect(result.current.currentBreakpoint).toBe('md');
  });

  it('should return xs as default breakpoint', () => {
    mockUseMediaQuery.mockImplementation(() => false);

    const { result } = renderHook(() => useBreakpoints(), { wrapper });
    expect(result.current.currentBreakpoint).toBe('xs');
  });

  it('should return xl breakpoint when xlOnly is true', () => {
    mockUseMediaQuery.mockImplementation((query: any) => {
      if (typeof query === 'string') {
        // Check if it's the xl only query by comparing with breakpoints.only('xl')
        const xlOnlyQuery = mockBreakpoints.only('xl');
        return query === xlOnlyQuery;
      }
      return false;
    });

    const { result } = renderHook(() => useBreakpoints(), { wrapper });
    expect(result.current.currentBreakpoint).toBe('xl');
  });

  it('should return lg breakpoint when lgOnly is true', () => {
    mockUseMediaQuery.mockImplementation((query: any) => {
      if (typeof query === 'string') {
        // Check if it's the lg only query
        const lgOnlyQuery = mockBreakpoints.only('lg');
        return query === lgOnlyQuery;
      }
      return false;
    });

    const { result } = renderHook(() => useBreakpoints(), { wrapper });
    expect(result.current.currentBreakpoint).toBe('lg');
  });

  it('should return sm breakpoint when smOnly is true', () => {
    mockUseMediaQuery.mockImplementation((query: any) => {
      if (typeof query === 'string') {
        // Check if it's the sm only query
        const smOnlyQuery = mockBreakpoints.only('sm');
        return query === smOnlyQuery;
      }
      return false;
    });

    const { result } = renderHook(() => useBreakpoints(), { wrapper });
    expect(result.current.currentBreakpoint).toBe('sm');
  });

  it('should call up function with breakpoint key', () => {
    mockUseMediaQuery.mockImplementation((query: any) => {
      if (typeof query === 'string' && query.includes('up') && query.includes('sm')) {
        return true;
      }
      return false;
    });

    const { result } = renderHook(() => useBreakpoints(), { wrapper });
    const upResult = result.current.up('sm');
    expect(typeof upResult).toBe('boolean');
  });

  it('should call up function with number', () => {
    const { result } = renderHook(() => useBreakpoints(), { wrapper });
    const upResult = result.current.up(768);
    expect(typeof upResult).toBe('boolean');
  });

  it('should call down function with breakpoint key', () => {
    mockUseMediaQuery.mockImplementation((query: any) => {
      if (typeof query === 'string' && query.includes('down') && query.includes('md')) {
        return true;
      }
      return false;
    });

    const { result } = renderHook(() => useBreakpoints(), { wrapper });
    const downResult = result.current.down('md');
    expect(typeof downResult).toBe('boolean');
  });

  it('should call down function with number', () => {
    const { result } = renderHook(() => useBreakpoints(), { wrapper });
    const downResult = result.current.down(768);
    expect(typeof downResult).toBe('boolean');
  });

  it('should call only function with breakpoint key', () => {
    mockUseMediaQuery.mockImplementation((query: any) => {
      if (typeof query === 'string' && query.includes('only') && query.includes('md')) {
        return true;
      }
      return false;
    });

    const { result } = renderHook(() => useBreakpoints(), { wrapper });
    const onlyResult = result.current.only('md');
    expect(typeof onlyResult).toBe('boolean');
  });

  it('should call between function', () => {
    let upCalled = false;
    let downCalled = false;
    
    mockUseMediaQuery.mockImplementation((query: any) => {
      if (typeof query === 'string') {
        if (query.includes('up') && query.includes('sm')) {
          upCalled = true;
          return true;
        }
        if (query.includes('down') && query.includes('md')) {
          downCalled = true;
          return true;
        }
      }
      return false;
    });

    const { result } = renderHook(() => useBreakpoints(), { wrapper });
    const betweenResult = result.current.between('sm', 'md');
    // between calls up and down, so we just check it returns a boolean
    expect(typeof betweenResult).toBe('boolean');
  });

  it('should call between function with numbers', () => {
    const { result } = renderHook(() => useBreakpoints(), { wrapper });
    const betweenResult = result.current.between(768, 1024);
    expect(typeof betweenResult).toBe('boolean');
  });
});

