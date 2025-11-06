import { Box, Link, typographyClasses } from '@mui/material';
import { useSettingsContext } from 'providers/SettingsProvider';
import { rootPaths } from 'routes/paths';
import NTLLogoH from '../../assets/images/logo/logo-NTL-h.svg';
import NTLLogo from '../../assets/images/logo/logo-NTL.svg';

const Logo = () => {
  const {
    config: { sidenavCollapsed },
  } = useSettingsContext();

  return (
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
  );
};

export default Logo;
