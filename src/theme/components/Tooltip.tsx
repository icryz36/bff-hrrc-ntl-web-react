import { Theme, tooltipClasses } from '@mui/material';
import { Components } from '@mui/material/styles';

const generateArrowStyles = (
  borderRadiusProperty: string,
  clipPath?: string,
  positions?: object,
): object => {
  if (!clipPath && !positions) {
    return {
      [`.${tooltipClasses.tooltip}`]: {
        [`.${tooltipClasses.arrow}::before`]: {
          [borderRadiusProperty]: 2,
        },
      },
    };
  }
  return {
    [`.${tooltipClasses.tooltip}`]: {
      [borderRadiusProperty]: 0,
      [`.${tooltipClasses.arrow}`]: {
        transform: 'translate3d(0,0,0) !important',
        ...positions,
        '&::before': {
          transform: 'rotate(0deg)',
          clipPath,
          [borderRadiusProperty]: 2,
        },
      },
    },
  };
};

const getBorderRadiusForTop = (isRTL: boolean, position: 'start' | 'end' | 'center') => {
  if (position === 'start') return isRTL ? 'borderBottomRightRadius' : 'borderBottomLeftRadius';
  return isRTL ? 'borderBottomLeftRadius' : 'borderBottomRightRadius';
};

const getBorderRadiusForBottom = (isRTL: boolean, position: 'start' | 'end' | 'center') => {
  if (position === 'start') return isRTL ? 'borderTopRightRadius' : 'borderTopLeftRadius';
  if (position === 'end') return isRTL ? 'borderTopLeftRadius' : 'borderTopRightRadius';
  return isRTL ? 'borderTopRightRadius' : 'borderTopLeftRadius';
};

const getBorderRadiusForLeft = (isRTL: boolean, position: 'start' | 'end' | 'center') => {
  if (position === 'start') return isRTL ? 'borderTopLeftRadius' : 'borderTopRightRadius';
  if (position === 'end') return isRTL ? 'borderBottomLeftRadius' : 'borderBottomRightRadius';
  return isRTL ? 'borderTopLeftRadius' : 'borderTopRightRadius';
};

const getBorderRadiusForRight = (isRTL: boolean, position: 'start' | 'end' | 'center') => {
  if (position === 'start') return isRTL ? 'borderTopRightRadius' : 'borderTopLeftRadius';
  return isRTL ? 'borderBottomRightRadius' : 'borderBottomLeftRadius';
};

const getHorizontalPosition = (isRTL: boolean, side: 'left' | 'right') => {
  if (side === 'left') {
    return {
      right: isRTL ? 'unset !important' : '0px !important',
      left: isRTL ? 0 : 'unset !important',
    };
  }
  return {
    left: isRTL ? 'unset' : 3,
  };
};

const placements = (theme: Theme) => {
  const isRTL = theme.direction === 'rtl';

  return [
    {
      placement: 'top-start',
      borderRadiusProperty: getBorderRadiusForTop(isRTL, 'start'),
      clipPath: 'polygon(0 0, 100% 0, 17% 100%, 0% 100%)',
      positions: { bottom: 3 },
    },
    {
      placement: 'top',
      borderRadiusProperty: getBorderRadiusForTop(isRTL, 'center'),
    },
    {
      placement: 'top-end',
      borderRadiusProperty: getBorderRadiusForTop(isRTL, 'end'),
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 83% 100%)',
      positions: {
        bottom: 3,
        ...getHorizontalPosition(isRTL, 'left'),
      },
    },
    {
      placement: 'bottom-start',
      borderRadiusProperty: getBorderRadiusForBottom(isRTL, 'start'),
      clipPath: 'polygon(0 0, 17% 0, 100% 100%, 0 100%)',
      positions: { top: 3 },
    },
    {
      placement: 'bottom',
      borderRadiusProperty: getBorderRadiusForBottom(isRTL, 'center'),
    },
    {
      placement: 'bottom-end',
      borderRadiusProperty: getBorderRadiusForBottom(isRTL, 'end'),
      clipPath: 'polygon(87% 0, 100% 0, 100% 100%, 0 100%)',
      positions: { top: 3, right: '0px !important', left: isRTL ? 0 : 'unset !important' },
    },
    {
      placement: 'left-start',
      borderRadiusProperty: getBorderRadiusForLeft(isRTL, 'start'),
      clipPath: 'polygon(100% 0, 100% 17%, 0 100%, 0 0)',
      positions: { right: 3 },
    },
    {
      placement: 'left-end',
      borderRadiusProperty: getBorderRadiusForLeft(isRTL, 'end'),
      clipPath: 'polygon(0 0, 100% 87%, 100% 100%, 0 100%)',
      positions: { top: 'unset !important', bottom: 0, right: 3 },
    },
    {
      placement: 'left',
      borderRadiusProperty: getBorderRadiusForLeft(isRTL, 'center'),
    },
    {
      placement: 'right-start',
      borderRadiusProperty: getBorderRadiusForRight(isRTL, 'start'),
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 17%)',
      positions: getHorizontalPosition(isRTL, 'right'),
    },
    {
      placement: 'right',
      borderRadiusProperty: getBorderRadiusForRight(isRTL, 'center'),
    },
    {
      placement: 'right-end',
      borderRadiusProperty: getBorderRadiusForRight(isRTL, 'end'),
      clipPath: 'polygon(0 83%, 100% 0, 100% 100%, 0 100%)',
      positions: {
        top: 'unset !important',
        bottom: 0,
        ...getHorizontalPosition(isRTL, 'right'),
      },
    },
  ];
};

const Tooltip: Components<Omit<Theme, 'components'>>['MuiTooltip'] = {
  defaultProps: {
    arrow: true,
    placement: 'top',
    enterTouchDelay: 0,
  },
  styleOverrides: {
    popper: ({ theme }) =>
      placements(theme).reduce(
        (styles, { placement, borderRadiusProperty, clipPath, positions }) => {
          return {
            ...styles,
            [`&[data-popper-placement="${placement}"]`]: generateArrowStyles(
              borderRadiusProperty,
              clipPath,
              positions,
            ),
          };
        },
        {},
      ),
    tooltip: ({ theme }) => ({
      backgroundColor: theme.vars.palette.grey[800],
      ...theme.typography.caption,
      padding: '8px 10px',
    }),
    arrow: ({ theme }) => ({
      color: theme.vars.palette.grey[800],
    }),
  },
};

export default Tooltip;
