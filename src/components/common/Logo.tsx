import { Box, Link, typographyClasses } from '@mui/material';
import { useSettingsContext } from 'providers/SettingsProvider';
import { rootPaths } from 'routes/paths';

const Logo = () => {
  const {
    config: { sidenavCollapsed },
  } = useSettingsContext();

  console.log('sidenavCollapsed', sidenavCollapsed);
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
        src={
          sidenavCollapsed
            ? 'src/assets/images/logo/logo-NTL-h.svg'
            : 'src/assets/images/logo/logo-NTL.svg'
        }
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
