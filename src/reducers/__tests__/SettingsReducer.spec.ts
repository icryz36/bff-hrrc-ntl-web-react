import { initialConfig } from 'config';
import { mainDrawerWidth } from 'lib/constants';
import { setItemToStore } from 'lib/utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ACTIONTYPE,
  COLLAPSE_NAVBAR,
  EXPAND_NAVBAR,
  REFRESH,
  RESET,
  SET_CONFIG,
  SET_LOCALE,
  SET_NAVIGATION_MENU_TYPE,
  SET_NAV_COLOR,
  SET_SIDENAV_SHAPE,
  settingsReducer,
} from '../SettingsReducer';

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
    const action: ACTIONTYPE = {
      type: SET_CONFIG,
      payload: { navColor: 'vibrant' },
    };
    const result = settingsReducer(mockState, action);
    expect(result.navColor).toBe('vibrant');
    expect(setItemToStore).toHaveBeenCalled();
  });

  it('should handle COLLAPSE_NAVBAR action', () => {
    const action: ACTIONTYPE = { type: COLLAPSE_NAVBAR };
    const result = settingsReducer(mockState, action);
    expect(result.sidenavCollapsed).toBe(true);
    expect(result.drawerWidth).toBe(mainDrawerWidth.collapsed);
  });

  it('should handle COLLAPSE_NAVBAR action with stacked sidenav', () => {
    const stateWithStacked = { ...mockState, sidenavType: 'stacked' as const };
    const action: ACTIONTYPE = { type: COLLAPSE_NAVBAR };
    const result = settingsReducer(stateWithStacked, action);
    expect(result.sidenavCollapsed).toBe(true);
    expect(result.drawerWidth).toBe(mainDrawerWidth.stackedNavCollapsed);
  });

  it('should handle EXPAND_NAVBAR action', () => {
    const action: ACTIONTYPE = { type: EXPAND_NAVBAR };
    const result = settingsReducer(mockState, action);
    expect(result.sidenavCollapsed).toBe(false);
    expect(result.drawerWidth).toBe(mainDrawerWidth.full);
  });

  it('should handle SET_LOCALE action', () => {
    const action: ACTIONTYPE = { type: SET_LOCALE, payload: 'en-US' };
    const result = settingsReducer(mockState, action);
    expect(result.locale).toBe('en-US');
    expect(result.textDirection).toBe('ltr');
  });

  it('should handle SET_LOCALE action with RTL locale', () => {
    const action: ACTIONTYPE = { type: SET_LOCALE, payload: 'ar-SA' };
    const result = settingsReducer(mockState, action);
    expect(result.locale).toBe('ar-SA');
    expect(result.textDirection).toBe('rtl');
  });

  it('should handle SET_NAVIGATION_MENU_TYPE action with sidenav', () => {
    const action: ACTIONTYPE = { type: SET_NAVIGATION_MENU_TYPE, payload: 'sidenav' };
    const result = settingsReducer(mockState, action);
    expect(result.navigationMenuType).toBe('sidenav');
    expect(result.drawerWidth).toBe(mainDrawerWidth.full);
  });

  it('should handle SET_NAVIGATION_MENU_TYPE action with topnav', () => {
    const action: ACTIONTYPE = { type: SET_NAVIGATION_MENU_TYPE, payload: 'topnav' };
    const result = settingsReducer(mockState, action);
    expect(result.navigationMenuType).toBe('topnav');
    expect(result.sidenavCollapsed).toBe(false);
    expect(result.drawerWidth).toBe(mainDrawerWidth.full);
  });

  it('should handle SET_NAVIGATION_MENU_TYPE action with combo', () => {
    const action: ACTIONTYPE = { type: SET_NAVIGATION_MENU_TYPE, payload: 'combo' };
    const result = settingsReducer(mockState, action);
    expect(result.navigationMenuType).toBe('combo');
    expect(result.sidenavCollapsed).toBe(false);
    expect(result.drawerWidth).toBe(mainDrawerWidth.full);
  });

  it('should handle SET_SIDENAV_SHAPE action with default', () => {
    const action: ACTIONTYPE = { type: SET_SIDENAV_SHAPE, payload: 'default' };
    const result = settingsReducer(mockState, action);
    expect(result.sidenavType).toBe('default');
    expect(result.sidenavCollapsed).toBe(false);
    expect(result.drawerWidth).toBe(mainDrawerWidth.full);
  });

  it('should handle SET_SIDENAV_SHAPE action with slim', () => {
    const action: ACTIONTYPE = { type: SET_SIDENAV_SHAPE, payload: 'slim' };
    const result = settingsReducer(mockState, action);
    expect(result.sidenavType).toBe('slim');
    expect(result.sidenavCollapsed).toBe(false);
    expect(result.drawerWidth).toBe(mainDrawerWidth.slim);
  });

  it('should handle SET_SIDENAV_SHAPE action with stacked', () => {
    const action: ACTIONTYPE = { type: SET_SIDENAV_SHAPE, payload: 'stacked' };
    const result = settingsReducer(mockState, action);
    expect(result.sidenavType).toBe('stacked');
    expect(result.sidenavCollapsed).toBe(false);
    expect(result.drawerWidth).toBe(mainDrawerWidth.full);
  });

  it('should handle SET_NAV_COLOR action', () => {
    const action: ACTIONTYPE = { type: SET_NAV_COLOR, payload: 'vibrant' };
    const result = settingsReducer(mockState, action);
    expect(result.navColor).toBe('vibrant');
  });

  it('should handle RESET action', () => {
    const modifiedState = { ...mockState, navColor: 'vibrant' as const };
    const action: ACTIONTYPE = { type: RESET };
    const result = settingsReducer(modifiedState, action);
    expect(result).toEqual(expect.objectContaining(initialConfig));
  });

  it('should handle REFRESH action', () => {
    const action: ACTIONTYPE = { type: REFRESH };
    const result = settingsReducer(mockState, action);
    expect(result).toEqual(mockState);
  });

  it('should return state unchanged for unknown action', () => {
    const action = { type: 'UNKNOWN' as any };
    const result = settingsReducer(mockState, action);
    expect(result).toEqual(mockState);
  });
});
