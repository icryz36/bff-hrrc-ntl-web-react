import { Box, ButtonBase } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledStepperContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const StyledStepperItemContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
});

export const StyledStepperButtonBase = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'index',
})<{ isActive: boolean; index: number }>(({ theme, isActive, index }) => {
  const baseClipPath =
    index === 0
      ? 'polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%, 0 50%)'
      : 'polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%, 15px 50%)';

  return {
    textAlign: 'left',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 95,
    padding: '10px 6px 0px 30px',
    minWidth: 120,
    flex: 1,
    transition: 'all 0.3s',
    cursor: 'pointer',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    clipPath: baseClipPath,
    marginLeft: index === 0 ? 0 : '-8px',
    borderTopLeftRadius: index === 0 ? 5 : 0,
    borderBottomLeftRadius: index === 0 ? 5 : 0,
    backgroundColor: theme.palette.primary.main,
    color: isActive ? theme.palette.common.white : theme.palette.primary.main,

    '&::before': {
      content: '""',
      transition: 'all 0.3s',
      position: 'absolute',
      borderTopLeftRadius: index === 0 ? 5 : 0,
      borderBottomLeftRadius: index === 0 ? 5 : 0,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      inset: isActive ? 0 : 1,
      backgroundColor: isActive ? theme.palette.primary.main : theme.palette.primary.lighter,
      clipPath: baseClipPath,
      zIndex: 0,
    },

    '& > *': {
      position: 'relative',
      zIndex: 1,
    },

    '&:hover': {
      backgroundColor: isActive
        ? theme.palette.primary.main
        : alpha(theme.palette.primary.main, 0.2),
    },

    '&:hover::before': {
      backgroundColor: isActive
        ? theme.palette.primary.main
        : alpha(theme.palette.primary.main, 0.15),
    },
  };
});
