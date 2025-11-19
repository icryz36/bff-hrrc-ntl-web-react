// import Box from '@mui/material/Box';
// import type { IconButtonProps } from '@mui/material/IconButton';
// import IconButton from '@mui/material/IconButton';
// import IconifyIcon from 'components/base/IconifyIcon';
// import type { SingleFilePreviewProps } from '../types';
// // ----------------------------------------------------------------------
// export function SingleFilePreview({ file }: SingleFilePreviewProps) {
//   if (!file) return null;
//   const fileName = typeof file === 'string' ? file : file.name;
//   const previewUrl = typeof file === 'string' ? file : URL?.createObjectURL(file);
//   return (
//     <Box
//       sx={{
//         p: 1,
//         top: 0,
//         left: 0,
//         width: 1,
//         height: 1,
//         position: 'absolute',
//       }}
//     >
//       <Box
//         component="img"
//         alt={fileName}
//         src={previewUrl}
//         sx={{
//           width: 1,
//           height: 1,
//           borderRadius: 1,
//           objectFit: 'cover',
//         }}
//       />
//     </Box>
//   );
// }
// // ----------------------------------------------------------------------
// export function DeleteButton({ sx, ...other }: IconButtonProps) {
//   return (
//     <IconButton
//       size="small"
//       sx={{
//         top: 16,
//         right: 16,
//         zIndex: 9,
//         position: 'absolute',
//         color: (theme) => alpha(theme.vars.palette.common.whiteChannel, 0.8),
//         bgcolor: (theme) => alpha(theme.vars.palette.grey['900Channel'], 0.72),
//         '&:hover': { bgcolor: (theme) => alpha(theme.vars.palette.grey['900Channel'], 0.48) },
//         ...sx,
//       }}
//       {...other}
//     >
//       <IconifyIcon icon="mingcute:close-line" width={18} />
//     </IconButton>
//   );
// }
import { useEffect, useState } from 'react';
import { Box, IconButton, IconButtonProps } from '@mui/material';
// import { alpha } from '@mui/material/styles';
import IconifyIcon from 'components/base/IconifyIcon';
import { SingleFilePreviewProps } from '../types';

export function SingleFilePreview({ file }: SingleFilePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [fileName, setFileName] = useState<string>('file');

  useEffect(() => {
    if (!file) {
      setPreviewUrl(undefined);
      return;
    }

    if (typeof file === 'string') {
      setPreviewUrl(file);
      setFileName(file);
      return;
    }

    if (file instanceof Blob) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFileName((file as File).name ?? 'file');

      return () => {
        URL.revokeObjectURL(url);
      };
    }

    console.warn('SingleFilePreview: unsupported file type', file);
    setPreviewUrl(undefined);
  }, [file]);

  if (!previewUrl) return null;

  return (
    <Box
      sx={{
        p: 1,
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    >
      <Box
        component="img"
        alt={fileName}
        src={previewUrl}
        sx={{
          width: 1,
          height: 1,
          borderRadius: 1,
          objectFit: 'cover',
        }}
      />
    </Box>
  );
}

export function DeleteButton({ sx, ...other }: IconButtonProps) {
  return (
    <IconButton
      size="small"
      sx={{
        top: 16,
        right: 16,
        zIndex: 9,
        position: 'absolute',
        color: (theme) => theme.vars.palette.common.whiteChannel,
        bgcolor: (theme) => theme.vars.palette.grey[900],
        '&:hover': { bgcolor: (theme) => theme.vars.palette.grey[900] },
        ...sx,
      }}
      {...other}
    >
      <IconifyIcon icon="mingcute:close-line" width={18} />
    </IconButton>
  );
}
