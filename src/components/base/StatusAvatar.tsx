import { Avatar, AvatarProps } from '@mui/material';

interface StatusAvatarProps extends AvatarProps {
  status: 'online' | 'offline';
}

const StatusAvatar = ({ ...rest }: StatusAvatarProps) => {
  return <Avatar {...rest} />;
};

export default StatusAvatar;
