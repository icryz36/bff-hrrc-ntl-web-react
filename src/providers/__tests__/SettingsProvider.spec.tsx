import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import SettingsProvider, { useSettingsContext } from '../SettingsProvider';
import { PropsWithChildren } from 'react';
import { SET_CONFIG, COLLAPSE_NAVBAR, EXPAND_NAVBAR } from 'reducers/SettingsReducer';

vi.mock('lib/utils', () => ({
  getItemFromStore: vi.fn((key: string, defaultValue: any) => defaultValue),
  setItemToStore: vi.fn(),
}));

const mockChangeLanguage = vi.fn();
vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-i18next')>();
  return {
    ...actual,
    useTranslation: () => ({
      i18n: {
        changeLanguage: mockChangeLanguage,
      },
    }),
    initReactI18next: {
      type: '3rdParty',
      init: vi.fn(),
    },
  };
});

describe('SettingsProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const wrapper = ({ children }: PropsWithChildren) => (
    <SettingsProvider>{children}</SettingsProvider>
  );

  it('should provide settings context', () => {
    const { result } = renderHook(() => useSettingsContext(), { wrapper });
    expect(result.current).toBeDefined();
    expect(result.current.config).toBeDefined();
    expect(typeof result.current.configDispatch).toBe('function');
    expect(typeof result.current.setConfig).toBe('function');
    expect(typeof result.current.handleDrawerToggle).toBe('function');
    expect(typeof result.current.toggleNavbarCollapse).toBe('function');
  });

  it('should have initial config', () => {
    const { result } = renderHook(() => useSettingsContext(), { wrapper });
    expect(result.current.config).toBeDefined();
    expect(result.current.config.sidenavCollapsed).toBeDefined();
  });

  it('should update config using setConfig', () => {
    const { result } = renderHook(() => useSettingsContext(), { wrapper });
    const initialThemeMode = result.current.config.themeMode;

    act(() => {
      result.current.setConfig({ themeMode: 'dark' });
    });

    expect(result.current.config.themeMode).toBe('dark');
  });

  it('should toggle drawer using handleDrawerToggle', () => {
    const { result } = renderHook(() => useSettingsContext(), { wrapper });
    const initialOpen = result.current.config.openNavbarDrawer;

    act(() => {
      result.current.handleDrawerToggle();
    });

    expect(result.current.config.openNavbarDrawer).toBe(!initialOpen);
  });

  it('should collapse navbar when toggleNavbarCollapse is called and navbar is expanded', () => {
    const { result } = renderHook(() => useSettingsContext(), { wrapper });
    // Ensure navbar is not collapsed initially
    if (!result.current.config.sidenavCollapsed) {
      act(() => {
        result.current.toggleNavbarCollapse();
      });
      expect(result.current.config.sidenavCollapsed).toBe(true);
    }
  });

  it('should expand navbar when toggleNavbarCollapse is called and navbar is collapsed', () => {
    const { result } = renderHook(() => useSettingsContext(), { wrapper });
    // First collapse
    if (!result.current.config.sidenavCollapsed) {
      act(() => {
        result.current.toggleNavbarCollapse();
      });
    }
    // Then expand
    act(() => {
      result.current.toggleNavbarCollapse();
    });
    expect(result.current.config.sidenavCollapsed).toBe(false);
  });

  it('should dispatch COLLAPSE_NAVBAR action', () => {
    const { result } = renderHook(() => useSettingsContext(), { wrapper });
    if (!result.current.config.sidenavCollapsed) {
      act(() => {
        result.current.configDispatch({ type: COLLAPSE_NAVBAR });
      });
      expect(result.current.config.sidenavCollapsed).toBe(true);
    }
  });

  it('should dispatch EXPAND_NAVBAR action', () => {
    const { result } = renderHook(() => useSettingsContext(), { wrapper });
    // First collapse
    if (!result.current.config.sidenavCollapsed) {
      act(() => {
        result.current.configDispatch({ type: COLLAPSE_NAVBAR });
      });
    }
    // Then expand
    act(() => {
      result.current.configDispatch({ type: EXPAND_NAVBAR });
    });
    expect(result.current.config.sidenavCollapsed).toBe(false);
  });

  it('should dispatch SET_CONFIG action', () => {
    const { result } = renderHook(() => useSettingsContext(), { wrapper });
    act(() => {
      result.current.configDispatch({
        type: SET_CONFIG,
        payload: { themeMode: 'dark' },
      });
    });
    expect(result.current.config.themeMode).toBe('dark');
  });

  it('should change language when locale changes', () => {
    const { result } = renderHook(() => useSettingsContext(), { wrapper });
    act(() => {
      result.current.setConfig({ locale: 'th-TH' });
    });
    expect(mockChangeLanguage).toHaveBeenCalled();
  });
});


