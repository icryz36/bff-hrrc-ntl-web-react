import { Box, styled } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledBackgroundForm = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  padding: '20px 24px',
  backgroundColor: theme.palette.grey[50],
}));
