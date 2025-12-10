import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useThemeMode } from '../useThemeMode';

const mockSetMode = vi.fn();
const mockUseColorScheme = vi.fn(() => ({
  mode: 'light',
  systemMode: 'light',
  setMode: mockSetMode,
}));

vi.mock('@mui/material', () => ({
  useColorScheme: () => mockUseColorScheme(),
}));

describe('useThemeMode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseColorScheme.mockReturnValue({
      mode: 'light',
      systemMode: 'light',
      setMode: mockSetMode,
    });
  });

  it('should return all required properties', () => {
    const { result } = renderHook(() => useThemeMode());
    expect(result.current).toHaveProperty('mode');
    expect(result.current).toHaveProperty('resetTheme');
    expect(result.current).toHaveProperty('isDark');
    expect(result.current).toHaveProperty('systemMode');
    expect(result.current).toHaveProperty('setThemeMode');
    expect(typeof result.current.resetTheme).toBe('function');
    expect(typeof result.current.setThemeMode).toBe('function');
  });

  it('should return isDark as false when mode is light', () => {
    mockUseColorScheme.mockReturnValue({
      mode: 'light',
      systemMode: 'light',
      setMode: mockSetMode,
    });

    const { result } = renderHook(() => useThemeMode());
    expect(result.current.isDark).toBe(false);
  });

  it('should return isDark as true when mode is dark', () => {
    mockUseColorScheme.mockReturnValue({
      mode: 'dark',
      systemMode: 'dark',
      setMode: mockSetMode,
    });

    const { result } = renderHook(() => useThemeMode());
    expect(result.current.isDark).toBe(true);
  });

  it('should return isDark based on systemMode when mode is system', () => {
    mockUseColorScheme.mockReturnValue({
      mode: 'system',
      systemMode: 'dark',
      setMode: mockSetMode,
    });

    const { result } = renderHook(() => useThemeMode());
    expect(result.current.isDark).toBe(true);
  });

  it('should call setMode when setThemeMode is called with theme mode', () => {
    const { result } = renderHook(() => useThemeMode());

    act(() => {
      result.current.setThemeMode('dark');
    });

    expect(mockSetMode).toHaveBeenCalledWith('dark');
  });

  it('should toggle theme when setThemeMode is called without argument', () => {
    mockUseColorScheme.mockReturnValue({
      mode: 'light',
      systemMode: 'light',
      setMode: mockSetMode,
    });

    const { result } = renderHook(() => useThemeMode());

    act(() => {
      result.current.setThemeMode();
    });

    expect(mockSetMode).toHaveBeenCalledWith('dark');
  });

  it('should toggle theme from dark to light when setThemeMode is called without argument', () => {
    mockUseColorScheme.mockReturnValue({
      mode: 'dark',
      systemMode: 'dark',
      setMode: mockSetMode,
    });

    const { result } = renderHook(() => useThemeMode());

    act(() => {
      result.current.setThemeMode();
    });

    expect(mockSetMode).toHaveBeenCalledWith('light');
  });

  it('should call setMode with null when resetTheme is called', () => {
    const { result } = renderHook(() => useThemeMode());

    act(() => {
      result.current.resetTheme();
    });

    expect(mockSetMode).toHaveBeenCalledWith(null);
  });
});




