import { useState } from 'react';
import { Button, Popover, paperClasses } from '@mui/material';
import { useSettingsContext } from 'providers/SettingsProvider';
import IconifyIcon from 'components/base/IconifyIcon';

interface NotificationMenuProps {
  type?: 'default' | 'slim';
}

const NotificationMenu = ({ type = 'default' }: NotificationMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const {
    config: { textDirection },
  } = useSettingsContext();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="neutral"
        variant={type === 'default' ? 'soft' : 'text'}
        shape="circle"
        size={type === 'slim' ? 'small' : 'medium'}
        onClick={handleClick}
        disabled
      >
        <IconifyIcon
          icon={
            type === 'slim'
              ? 'material-symbols:notifications-outline-rounded'
              : 'material-symbols-light:notifications-outline-rounded'
          }
          sx={{ fontSize: type === 'slim' ? 18 : 22 }}
        />
      </Button>
      <Popover
        anchorEl={anchorEl}
        id="notification-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{
          horizontal: textDirection === 'rtl' ? 'left' : 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: textDirection === 'rtl' ? 'left' : 'right',
          vertical: 'bottom',
        }}
        sx={{
          [`& .${paperClasses.root}`]: {
            width: 400,
            height: 650,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      ></Popover>
    </>
  );
};

export default NotificationMenu;
