import { Box, styled } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledBackgroundForm = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  padding: '20px 24px',
  backgroundColor: theme.palette.grey[50],
}));

export const StyledSubmitBtnContainer = styled(Box)(({ theme }) => ({
  right: 0,
  left: 0,
  bottom: 0,
  position: 'fixed',
  padding: '16px 40px',
  zIndex: theme.zIndex.appBar - 1,
  backgroundColor: theme.palette.grey[50],
  borderTop: `1px solid ${theme.palette.grey[300]}`,
}));
