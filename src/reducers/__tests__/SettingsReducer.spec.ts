import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  settingsReducer,
  SET_CONFIG,
  COLLAPSE_NAVBAR,
  EXPAND_NAVBAR,
  SET_LOCALE,
  SET_NAVIGATION_MENU_TYPE,
  SET_SIDENAV_SHAPE,
  SET_NAV_COLOR,
  RESET,
  REFRESH,
} from '../SettingsReducer';
import { initialConfig } from 'config';
import { mainDrawerWidth } from 'lib/constants';
import { setItemToStore } from 'lib/utils';

vi.mock('lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lib/utils')>();
  return {
    ...actual,
    setItemToStore: vi.fn(),
  };
});

describe('settingsReducer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockState = {
    ...initialConfig,
    sidenavType: 'default' as const,
    navigationMenuType: 'sidenav' as const,
  };

  it('should handle SET_CONFIG action', () => {
    const action = {
      type: SET_CONFIG,
      payload: { themeMode: 'dark' },
    };
    const result = settingsReducer(mockState, action);
    expect(result.themeMode).toBe('dark');
    expect(setItemToStore).toHaveBeenCalled();
  });

  it('should handle COLLAPSE_NAVBAR action', () => {
    const action = { type: COLLAPSE_NAVBAR };
    const result = settingsReducer(mockState, action);
    expect(result.sidenavCollapsed).toBe(true);
    expect(result.drawerWidth).toBe(mainDrawerWidth.collapsed);
  });

  it('should handle COLLAPSE_NAVBAR action with stacked sidenav', () => {
    const stateWithStacked = { ...mockState, sidenavType: 'stacked' as const };
    const action = { type: COLLAPSE_NAVBAR };
    const result = settingsReducer(stateWithStacked, action);
    expect(result.sidenavCollapsed).toBe(true);
    expect(result.drawerWidth).toBe(mainDrawerWidth.stackedNavCollapsed);
  });

  it('should handle EXPAND_NAVBAR action', () => {
    const action = { type: EXPAND_NAVBAR };
    const result = settingsReducer(mockState, action);
    expect(result.sidenavCollapsed).toBe(false);
    expect(result.drawerWidth).toBe(mainDrawerWidth.full);
  });

  it('should handle SET_LOCALE action', () => {
    const action = { type: SET_LOCALE, payload: 'en-US' as const };
    const result = settingsReducer(mockState, action);
    expect(result.locale).toBe('en-US');
    expect(result.textDirection).toBe('ltr');
  });

  it('should handle SET_LOCALE action with RTL locale', () => {
    const action = { type: SET_LOCALE, payload: 'ar-SA' as const };
    const result = settingsReducer(mockState, action);
    expect(result.locale).toBe('ar-SA');
    expect(result.textDirection).toBe('rtl');
  });

  it('should handle SET_NAVIGATION_MENU_TYPE action with sidenav', () => {
    const action = { type: SET_NAVIGATION_MENU_TYPE, payload: 'sidenav' as const };
    const result = settingsReducer(mockState, action);
    expect(result.navigationMenuType).toBe('sidenav');
    expect(result.drawerWidth).toBe(mainDrawerWidth.full);
  });

  it('should handle SET_NAVIGATION_MENU_TYPE action with topnav', () => {
    const action = { type: SET_NAVIGATION_MENU_TYPE, payload: 'topnav' as const };
    const result = settingsReducer(mockState, action);
    expect(result.navigationMenuType).toBe('topnav');
    expect(result.sidenavCollapsed).toBe(false);
    expect(result.drawerWidth).toBe(mainDrawerWidth.full);
  });

  it('should handle SET_NAVIGATION_MENU_TYPE action with combo', () => {
    const action = { type: SET_NAVIGATION_MENU_TYPE, payload: 'combo' as const };
    const result = settingsReducer(mockState, action);
    expect(result.navigationMenuType).toBe('combo');
    expect(result.sidenavCollapsed).toBe(false);
    expect(result.drawerWidth).toBe(mainDrawerWidth.full);
  });

  it('should handle SET_SIDENAV_SHAPE action with default', () => {
    const action = { type: SET_SIDENAV_SHAPE, payload: 'default' as const };
    const result = settingsReducer(mockState, action);
    expect(result.sidenavType).toBe('default');
    expect(result.sidenavCollapsed).toBe(false);
    expect(result.drawerWidth).toBe(mainDrawerWidth.full);
  });

  it('should handle SET_SIDENAV_SHAPE action with slim', () => {
    const action = { type: SET_SIDENAV_SHAPE, payload: 'slim' as const };
    const result = settingsReducer(mockState, action);
    expect(result.sidenavType).toBe('slim');
    expect(result.sidenavCollapsed).toBe(false);
    expect(result.drawerWidth).toBe(mainDrawerWidth.slim);
  });

  it('should handle SET_SIDENAV_SHAPE action with stacked', () => {
    const action = { type: SET_SIDENAV_SHAPE, payload: 'stacked' as const };
    const result = settingsReducer(mockState, action);
    expect(result.sidenavType).toBe('stacked');
    expect(result.sidenavCollapsed).toBe(false);
    expect(result.drawerWidth).toBe(mainDrawerWidth.full);
  });

  it('should handle SET_NAV_COLOR action', () => {
    const action = { type: SET_NAV_COLOR, payload: 'vibrant' as const };
    const result = settingsReducer(mockState, action);
    expect(result.navColor).toBe('vibrant');
  });

  it('should handle RESET action', () => {
    const modifiedState = { ...mockState, themeMode: 'dark' as const };
    const action = { type: RESET };
    const result = settingsReducer(modifiedState, action);
    expect(result).toEqual(expect.objectContaining(initialConfig));
  });

  it('should handle REFRESH action', () => {
    const action = { type: REFRESH };
    const result = settingsReducer(mockState, action);
    expect(result).toEqual(mockState);
  });

  it('should return state unchanged for unknown action', () => {
    const action = { type: 'UNKNOWN' as any };
    const result = settingsReducer(mockState, action);
    expect(result).toEqual(mockState);
  });
});




