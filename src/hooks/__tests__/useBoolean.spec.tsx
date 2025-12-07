import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useBoolean } from '../useBoolean';

describe('useBoolean', () => {
  it('should return initial value as false when no default value provided', () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current.value).toBe(false);
  });

  it('should return initial value as true when default value is true', () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current.value).toBe(true);
  });

  it('should return initial value as false when default value is false', () => {
    const { result } = renderHook(() => useBoolean(false));
    expect(result.current.value).toBe(false);
  });

  it('should have all required methods', () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current).toHaveProperty('value');
    expect(result.current).toHaveProperty('onTrue');
    expect(result.current).toHaveProperty('onFalse');
    expect(result.current).toHaveProperty('onToggle');
    expect(result.current).toHaveProperty('setValue');
    expect(typeof result.current.onTrue).toBe('function');
    expect(typeof result.current.onFalse).toBe('function');
    expect(typeof result.current.onToggle).toBe('function');
    expect(typeof result.current.setValue).toBe('function');
  });

  it('should set value to true when onTrue is called', () => {
    const { result } = renderHook(() => useBoolean(false));
    expect(result.current.value).toBe(false);

    act(() => {
      result.current.onTrue();
    });

    expect(result.current.value).toBe(true);
  });

  it('should set value to false when onFalse is called', () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.onFalse();
    });

    expect(result.current.value).toBe(false);
  });

  it('should toggle value when onToggle is called', () => {
    const { result } = renderHook(() => useBoolean(false));
    expect(result.current.value).toBe(false);

    act(() => {
      result.current.onToggle();
    });

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.onToggle();
    });

    expect(result.current.value).toBe(false);
  });

  it('should update value when setValue is called', () => {
    const { result } = renderHook(() => useBoolean(false));
    expect(result.current.value).toBe(false);

    act(() => {
      result.current.setValue(true);
    });

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.setValue(false);
    });

    expect(result.current.value).toBe(false);
  });
});

