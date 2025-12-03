import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  use,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router';
import { Breakpoint, ToolbarOwnProps, useTheme } from '@mui/material';
import { mainDrawerWidth } from 'lib/constants';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { useSettingsContext } from 'providers/SettingsProvider';
import { COLLAPSE_NAVBAR, EXPAND_NAVBAR } from 'reducers/SettingsReducer';
import { SubMenuItem } from 'routes/sitemap';

interface NavContextInterface {
  openItems: string[];
  setOpenItems: Dispatch<SetStateAction<string[]>>;
  isNestedItemOpen: (items?: SubMenuItem[]) => boolean;
  sidenavAppbarVariant: ToolbarOwnProps['variant'];
  topbarHeight: Partial<Record<Breakpoint, number>>;
  sidenavCollapsed: boolean;
}

const NavContext = createContext({} as NavContextInterface);

// ✅ Helper function แยกออกมาเพื่อลด complexity
const shouldCollapseOnInit = (
  navigationMenuType: string,
  sidenavType: string,
  sidenavCollapsed: boolean,
): boolean => {
  const isNavTypeSidenavOrCombo =
    navigationMenuType === 'sidenav' || navigationMenuType === 'combo';

  return isNavTypeSidenavOrCombo && sidenavType !== 'slim' && sidenavCollapsed;
};

// ✅ Helper function สำหรับการจัดการ responsive collapse
const shouldCollapseResponsive = (
  navigationMenuType: string,
  sidenavType: string,
  currentBreakpoint: string,
): boolean => {
  const isNavTypeSidenavOrCombo =
    navigationMenuType === 'sidenav' || navigationMenuType === 'combo';

  return isNavTypeSidenavOrCombo && sidenavType !== 'slim' && currentBreakpoint === 'md';
};

// ✅ Helper function สำหรับการตั้งค่า drawer width
const shouldSetSlimDrawerWidth = (navigationMenuType: string, sidenavType: string): boolean => {
  const isNavTypeSidenavOrCombo =
    navigationMenuType === 'sidenav' || navigationMenuType === 'combo';

  return isNavTypeSidenavOrCombo && sidenavType === 'slim';
};

const NavProvider = ({ children }: PropsWithChildren) => {
  const [openItems, setOpenItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [responsievSidenavCollapsed, setResponsiveSidenavCollapsed] = useState(false);
  const { pathname } = useLocation();

  const { currentBreakpoint, down } = useBreakpoints();

  const theme = useTheme();
  const downMd = down('md');

  const {
    config: { sidenavCollapsed, navigationMenuType, topnavType, sidenavType },
    setConfig,
    configDispatch,
  } = useSettingsContext();

  const isNestedItemOpen = (items: SubMenuItem[] = []) => {
    const checkLink = (children: SubMenuItem) => {
      if (
        `${children.path}` === pathname ||
        (children.selectionPrefix && pathname!.includes(children.selectionPrefix))
      ) {
        return true;
      }
      return children.items && children.items.some(checkLink);
    };
    return items.some(checkLink);
  };

  const sidenavAppbarVariant: ToolbarOwnProps['variant'] = useMemo(() => {
    if (navigationMenuType === 'sidenav') {
      return 'appbar';
    }
    if (navigationMenuType === 'combo') {
      switch (topnavType) {
        case 'default': {
          return 'appbar';
        }
        case 'slim': {
          return 'appbarSlim';
        }
        case 'stacked': {
          return downMd ? 'appbar' : 'appbarStacked';
        }
      }
    }
  }, [navigationMenuType, topnavType, downMd]);

  const topbarHeight = useMemo(() => {
    if (navigationMenuType === 'sidenav') {
      return theme.mixins.topbar.default;
    } else {
      return theme.mixins.topbar[topnavType];
    }
  }, [navigationMenuType, topnavType]);

  // ✅ REFACTORED: ลด complexity จาก 16 → ~10
  useEffect(() => {
    // Handle initial collapse
    if (shouldCollapseOnInit(navigationMenuType, sidenavType, sidenavCollapsed)) {
      configDispatch({ type: COLLAPSE_NAVBAR });
    }

    // Handle responsive collapse at md breakpoint
    if (shouldCollapseResponsive(navigationMenuType, sidenavType, currentBreakpoint)) {
      configDispatch({ type: COLLAPSE_NAVBAR });
      setResponsiveSidenavCollapsed(true);
    }

    // Handle expand on mobile
    const isNavTypeSidenavOrCombo =
      navigationMenuType === 'sidenav' || navigationMenuType === 'combo';

    if (isNavTypeSidenavOrCombo && sidenavType !== 'slim' && downMd) {
      configDispatch({ type: EXPAND_NAVBAR });
    }

    // Handle slim drawer width
    if (shouldSetSlimDrawerWidth(navigationMenuType, sidenavType)) {
      setConfig({ drawerWidth: mainDrawerWidth.slim });
    }

    // Close drawer at md breakpoint
    if (currentBreakpoint === 'md') {
      setConfig({ openNavbarDrawer: false });
    }

    // Mark as loaded
    if (!loaded) {
      setLoaded(true);
    }
  }, [currentBreakpoint, navigationMenuType, downMd]);

  useEffect(() => {
    if (currentBreakpoint !== 'md' && responsievSidenavCollapsed) {
      setResponsiveSidenavCollapsed(false);
      configDispatch({ type: EXPAND_NAVBAR });
    }
  }, [currentBreakpoint]);

  return (
    <NavContext
      value={{
        openItems,
        setOpenItems,
        isNestedItemOpen,
        sidenavAppbarVariant,
        topbarHeight,
        sidenavCollapsed,
      }}
    >
      {loaded && children}
    </NavContext>
  );
};

export const useNavContext = () => use(NavContext);

export default NavProvider;
