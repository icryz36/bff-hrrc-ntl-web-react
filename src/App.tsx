import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import useIcons from 'hooks/useIcons';
import { useThemeMode } from 'hooks/useThemeMode';
import AuthProvider from 'providers/AuthProvider';
import { useSettingsContext } from 'providers/SettingsProvider';
import { REFRESH } from 'reducers/SettingsReducer';
import { NetworkModal } from 'components/common/NetworkModal';

const App = () => {
  const { pathname } = useLocation();
  const { mode } = useThemeMode();
  const { configDispatch } = useSettingsContext();
  useIcons();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useLayoutEffect(() => {
    configDispatch({ type: REFRESH });
  }, [mode]);

  return (
    <AuthProvider>
      <NetworkModal />
      <Outlet />
    </AuthProvider>
  );
};

export default App;
