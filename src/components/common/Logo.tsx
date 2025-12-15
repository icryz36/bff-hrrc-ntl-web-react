import { Box, Link, Stack, typographyClasses } from '@mui/material';
import { useSettingsContext } from 'providers/SettingsProvider';
import { rootPaths } from 'routes/paths';
import IconLeft from '../../assets/images/icons/left_panel_close.svg';
import IconRight from '../../assets/images/icons/right_panel_open.svg';
import NTLLogoH from '../../assets/images/logo/logo-NTL-h.svg';
import NTLLogo from '../../assets/images/logo/logo-NTL.svg';

const Logo = () => {
  const {
    config: { sidenavCollapsed },
    toggleNavbarCollapse,
  } = useSettingsContext();

  return (
    <Stack
      direction={sidenavCollapsed ? 'column' : 'row'}
      alignItems="center"
      spacing={sidenavCollapsed ? 2 : 1}
      sx={{ p: 2 }}
    >
      <Link
        href={rootPaths.root}
        underline="none"
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            [`& .${typographyClasses.root}`]: {
              backgroundPosition: ({ direction }) => (direction === 'rtl' ? 'right' : 'left'),
            },
          },
        }}
      >
        <Box
          component={'img'}
          src={sidenavCollapsed ? NTLLogoH : NTLLogo}
          alt="Logo"
          sx={{
            width: sidenavCollapsed ? 56 : 172,
            overflow: 'hidden',
            mr: 1,
          }}
        />
      </Link>
      <Link
        onClick={toggleNavbarCollapse}
        underline="none"
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <Box
          component={'img'}
          src={sidenavCollapsed ? IconRight : IconLeft}
          alt="Logo"
          sx={{
            width: sidenavCollapsed ? 20 : 20,
            overflow: 'hidden',
            mr: 1,
          }}
        />
      </Link>
    </Stack>
  );
};

export default Logo;
