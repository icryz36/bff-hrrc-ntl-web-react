import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import NTLLogoH from './../assets/images/logo/logo-NTL-hh.svg';

const Welcome = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      <Stack direction={'column'} spacing={4} alignItems="center">
        <Box
          component={'img'}
          src={NTLLogoH}
          alt="Logo"
          sx={{
            width: { sm: 595, xs: 300 },
            overflow: 'hidden',
            mr: 1,
          }}
        />
        <Stack direction={'column'} spacing={1} alignItems="center">
          <Stack direction={{ sm: 'row', xs: 'column' }}>
            <Typography variant="h3">👋 Welcome,</Typography>
            <Typography color="primary" variant="h3">
              Kuln Kunnalawanich
            </Typography>
          </Stack>
          <Typography variant="h5">To Recruitment Lead Management System</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Welcome;
