import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTypographyLine = styled(Typography)(({ line = 1 }: { line?: number }) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: line,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
}));
