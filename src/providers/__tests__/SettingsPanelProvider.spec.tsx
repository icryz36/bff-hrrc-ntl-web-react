import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import SettingsPanelProvider, { useSettingsPanelContext } from '../SettingsPanelProvider';
import { PropsWithChildren } from 'react';

describe('SettingsPanelProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: PropsWithChildren) => (
    <SettingsPanelProvider>{children}</SettingsPanelProvider>
  );

  it('should provide settings panel context', () => {
    const { result } = renderHook(() => useSettingsPanelContext(), { wrapper });
    expect(result.current).toBeDefined();
    expect(result.current.settingsPanelConfig).toBeDefined();
    expect(typeof result.current.setSettingsPanelConfig).toBe('function');
  });

  it('should have default settings panel config', () => {
    const { result } = renderHook(() => useSettingsPanelContext(), { wrapper });
    expect(result.current.settingsPanelConfig.showSettingPanelButton).toBe(true);
    expect(result.current.settingsPanelConfig.openSettingPanel).toBe(false);
    expect(result.current.settingsPanelConfig.disableNavigationMenuSection).toBe(false);
    expect(result.current.settingsPanelConfig.disableSidenavShapeSection).toBe(false);
    expect(result.current.settingsPanelConfig.disableTopShapeSection).toBe(false);
    expect(result.current.settingsPanelConfig.disableNavColorSection).toBe(false);
  });

  it('should update settings panel config', () => {
    const { result } = renderHook(() => useSettingsPanelContext(), { wrapper });
    expect(result.current.settingsPanelConfig.openSettingPanel).toBe(false);

    act(() => {
      result.current.setSettingsPanelConfig({ openSettingPanel: true });
    });

    expect(result.current.settingsPanelConfig.openSettingPanel).toBe(true);
  });

  it('should update multiple settings panel config properties', () => {
    const { result } = renderHook(() => useSettingsPanelContext(), { wrapper });

    act(() => {
      result.current.setSettingsPanelConfig({
        openSettingPanel: true,
        disableNavigationMenuSection: true,
      });
    });

    expect(result.current.settingsPanelConfig.openSettingPanel).toBe(true);
    expect(result.current.settingsPanelConfig.disableNavigationMenuSection).toBe(true);
    expect(result.current.settingsPanelConfig.showSettingPanelButton).toBe(true); // Should remain unchanged
  });

  it('should preserve existing config when updating', () => {
    const { result } = renderHook(() => useSettingsPanelContext(), { wrapper });

    act(() => {
      result.current.setSettingsPanelConfig({ openSettingPanel: true });
    });

    expect(result.current.settingsPanelConfig.openSettingPanel).toBe(true);
    expect(result.current.settingsPanelConfig.showSettingPanelButton).toBe(true);
    expect(result.current.settingsPanelConfig.disableNavigationMenuSection).toBe(false);
  });
});


