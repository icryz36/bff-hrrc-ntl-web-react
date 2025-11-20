import { Box, Skeleton, Typography } from '@mui/material';

const DataGridSkeleton = ({ rows = 10, message }: { rows?: number; message?: string }) => (
  <Box p={2}>
    {message && (
      <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
        {message}
      </Typography>
    )}

    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton
        key={i}
        variant="rectangular"
        height={50}
        animation="wave"
        sx={{ mb: 1, borderRadius: 1 }}
      />
    ))}
  </Box>
);

export default DataGridSkeleton;
