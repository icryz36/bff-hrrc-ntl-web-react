import { Box, Skeleton, Stack, Typography } from '@mui/material';

const DataGridSkeleton = ({ rows = 3, message }: { rows?: number; message?: string }) => (
  <Box p={2}>
    {message && (
      <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
        {message}
      </Typography>
    )}
    <Stack direction={'column'} spacing={1} sx={{ width: '100%' }}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" sx={{ width: '100%' }} animation="wave" />
      ))}
    </Stack>
  </Box>
);

export default DataGridSkeleton;
