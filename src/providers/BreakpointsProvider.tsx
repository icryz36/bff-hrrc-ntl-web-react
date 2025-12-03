import { PropsWithChildren, createContext, use, useMemo } from 'react';
import { Breakpoint, useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

interface BreakpointContextInterface {
  currentBreakpoint: Breakpoint;
  up: (key: Breakpoint | number) => boolean;
  down: (key: Breakpoint | number) => boolean;
  only: (key: Breakpoint) => boolean;
  between: (start: Breakpoint | number, end: Breakpoint | number) => boolean;
}

export const BreakpointContext = createContext({} as BreakpointContextInterface);

const BreakpointsProvider = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  const isXsUp = useMediaQuery(theme.breakpoints.up('xs'));
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isXlUp = useMediaQuery(theme.breakpoints.up('xl'));

  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const isXlDown = useMediaQuery(theme.breakpoints.down('xl'));

  const isXsOnly = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmOnly = useMediaQuery(theme.breakpoints.only('sm'));
  const isMdOnly = useMediaQuery(theme.breakpoints.only('md'));
  const isLgOnly = useMediaQuery(theme.breakpoints.only('lg'));
  const isXlOnly = useMediaQuery(theme.breakpoints.only('xl'));

  const currentBreakpoint: Breakpoint = useMemo(() => {
    if (isXlOnly) return 'xl';
    if (isLgOnly) return 'lg';
    if (isMdOnly) return 'md';
    if (isSmOnly) return 'sm';
    return 'xs';
  }, [isXsOnly, isSmOnly, isMdOnly, isLgOnly, isXlOnly]);

  const up = (key: Breakpoint | number): boolean => {
    if (typeof key === 'number') {
      return window.matchMedia(`(min-width:${key}px)`).matches;
    }
    const breakpointMap: Record<Breakpoint, boolean> = {
      xs: isXsUp,
      sm: isSmUp,
      md: isMdUp,
      lg: isLgUp,
      xl: isXlUp,
    };
    return breakpointMap[key] ?? false;
  };

  const down = (key: Breakpoint | number): boolean => {
    if (typeof key === 'number') {
      return window.matchMedia(`(max-width:${key}px)`).matches;
    }
    const breakpointMap: Record<Breakpoint, boolean> = {
      xs: isXsDown,
      sm: isSmDown,
      md: isMdDown,
      lg: isLgDown,
      xl: isXlDown,
    };
    return breakpointMap[key] ?? false;
  };

  const only = (key: Breakpoint): boolean => {
    const breakpointMap: Record<Breakpoint, boolean> = {
      xs: isXsOnly,
      sm: isSmOnly,
      md: isMdOnly,
      lg: isLgOnly,
      xl: isXlOnly,
    };
    return breakpointMap[key] ?? false;
  };

  const between = (start: Breakpoint | number, end: Breakpoint | number): boolean => {
    return up(start) && down(end);
  };

  const value = useMemo(
    () => ({ currentBreakpoint, up, down, only, between }),
    [
      currentBreakpoint,
      isXsUp,
      isSmUp,
      isMdUp,
      isLgUp,
      isXlUp,
      isXsDown,
      isSmDown,
      isMdDown,
      isLgDown,
      isXlDown,
    ],
  );

  return <BreakpointContext value={value}>{children}</BreakpointContext>;
};

export const useBreakpoints = () => use(BreakpointContext);

export default BreakpointsProvider;
