import { ChipOwnProps } from '@mui/material';

// ----------------------------------------------------------------------

export const getStatusJpbBadgeColor = (val: string): ChipOwnProps['color'] => {
  switch (val?.toLocaleLowerCase()) {
    case 'open':
      return 'success';
    case 'closed':
      return 'neutral';
    case 'hold':
      return 'warning';
    case 'cancel':
      return 'error';
    default:
      return 'primary';
  }
};
