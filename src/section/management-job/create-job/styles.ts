import { Box, styled } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledFormContainerBox = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  padding: '16px 24px',
  backgroundColor: theme.palette.grey[50],
}));
