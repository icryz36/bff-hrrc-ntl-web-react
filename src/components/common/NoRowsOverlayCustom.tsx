import { Stack, Typography, useTheme } from '@mui/material';

type TNoRowsOverlayCustom = {
  message: string;
};

const NoRowsOverlayCustom = ({ message }: TNoRowsOverlayCustom) => {
  const theme = useTheme();
  return (
    <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
      <Typography variant="body2_regular" color={theme.palette.grey[600]}>
        {message}
      </Typography>
    </Stack>
  );
};

export default NoRowsOverlayCustom;
