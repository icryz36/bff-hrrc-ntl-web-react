import { Box, useTheme } from '@mui/material';

interface VibrantBackgroundProps {
  position?: 'top' | 'side';
}

const VibrantBackground = ({ position }: VibrantBackgroundProps) => {
  const theme = useTheme();

  console.log('theme.direction', theme.palette.primary.main);

  return (
    <Box
      sx={[
        {
          backgroundPositionX: theme.direction === 'rtl' ? 'right' : 'left',
          backgroundPositionY: 'top',
          top: 0,
          position: 'absolute',
          transform: theme.direction === 'rtl' ? 'scaleX(-1)' : 'none',
          height: '100%',
          width: '100%',
          bgcolor: theme.palette.primary.main,
        },
        position === 'top' && {
          bgcolor: theme.palette.primary.main,
        },
        position === 'side' && {
          bgcolor: theme.palette.primary.main,
        },
      ]}
    />
  );
};

export default VibrantBackground;
