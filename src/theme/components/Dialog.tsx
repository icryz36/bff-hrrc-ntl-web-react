import { Theme } from '@mui/material';
import { Components, alpha } from '@mui/material/styles';

const Dialog: Components<Omit<Theme, 'components'>>['MuiDialog'] = {
  defaultProps: {
    slotProps: {
      paper: {
        variant: 'elevation',
        elevation: 6,
        sx: { borderRadius: '24px' },
      },
      backdrop: {
        sx: {
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          backgroundColor: (theme) => alpha(theme.palette.common.black, 0.2),
        },
      },
    },
  },
};

export default Dialog;
