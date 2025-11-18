import { useEffect, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import {
  Box,
  BoxProps,
  Button,
  FormHelperText,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { convertFileToAttachment } from 'lib/utils';
import { FileAttachment } from 'types/common';
import IconifyIcon from 'components/base/IconifyIcon';
import FilePreview from 'components/common/FilePreview';

interface FileDropZoneProps extends DropzoneOptions {
  error?: string;
  onRemove?: (index: number) => void;
  defaultFiles?: File[];
  previewType?: 'list' | 'thumbnail';
  sx?: BoxProps['sx'];
  description?: string;
}

const FileDropZone = ({
  onDrop,
  error,
  onRemove,
  defaultFiles,
  previewType = 'list',
  sx,
  description,
  ...rest
}: FileDropZoneProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<FileAttachment[]>([]);

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((file, ind) => index !== ind));
    setPreviews(previews.filter((file, ind) => index !== ind));
    if (onRemove) {
      onRemove(index);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (...args) => {
      console.log({ args });

      const [acceptedFiles] = args;
      setFiles(acceptedFiles);
      setPreviews(acceptedFiles.map((file) => convertFileToAttachment(file)));
      if (onDrop) {
        onDrop(...args);
      }
    },
    ...rest,
  });

  const getFileNameParts = (filename: string) => {
    const lastDot = filename.lastIndexOf('.');
    if (lastDot === -1) return { name: filename, ext: '' };
    return { name: filename.substring(0, lastDot), ext: filename.substring(lastDot) };
  };

  useEffect(() => {
    if (defaultFiles) {
      setFiles(defaultFiles);
      setPreviews(defaultFiles.map((file) => convertFileToAttachment(file)));
    }
  }, [defaultFiles]);

  return (
    <Stack direction="column" sx={{ rowGap: 3 }}>
      <Box
        {...getRootProps()}
        sx={{
          p: 2,
          py: 10,
          bgcolor: error ? 'error.lighter' : 'background.elevation2',
          height: 100,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: error ? 'error.main' : 'divider',
          borderStyle: 'dashed',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          transition: ({ transitions }) =>
            transitions.create(['background-color'], {
              duration: transitions.duration.enteringScreen,
              easing: transitions.easing.easeInOut,
            }),
          '&:hover': {
            bgcolor: 'background.elevation3',
          },
          ...sx,
        }}
      >
        <input {...getInputProps()} />
        <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
          <IconifyIcon
            icon="uil:export"
            sx={{
              fontSize: 40,
              color: 'primary.main',
            }}
          />
          <Typography variant="body1_regular" color="primary.main">
            browse from device
          </Typography>
          {description && <Typography variant="caption">{description}</Typography>}
        </Stack>
      </Box>
      {error && <FormHelperText>{error}</FormHelperText>}

      {previews.length > 0 && previewType === 'list' && (
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {previews.map((preview, index) => {
            const { name, ext } = getFileNameParts(preview.name);
            return (
              <ListItem
                key={`${preview.preview}`}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <IconifyIcon
                      icon="material-symbols:close-small-rounded"
                      fontSize={20}
                      sx={{ color: 'text.primary' }}
                    />
                  </IconButton>
                }
                sx={(theme) => ({
                  pl: 1,
                  gap: 2,
                  bgcolor: theme.vars.palette.background.elevation1,
                  borderRadius: 2,
                  ...theme.applyStyles('dark', {
                    bgcolor: theme.vars.palette.background.elevation2,
                  }),
                })}
              >
                <ListItemAvatar>
                  <FilePreview preview={preview} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          minWidth: 0,
                        }}
                      >
                        {name}
                      </Typography>
                      <Typography variant="body2" sx={{ flexShrink: 0 }}>
                        {ext}
                      </Typography>
                    </Box>
                  }
                  secondary={preview.size}
                  slotProps={{
                    primary: {
                      variant: 'body2',
                      sx: {
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      },
                    },
                    secondary: { variant: 'caption' },
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      )}

      {previews.length > 0 && previewType === 'thumbnail' && (
        <Stack
          spacing={1}
          sx={{
            flexWrap: 'wrap',
          }}
        >
          {previews.map((preview, index) => (
            <Box
              key={`${preview.preview}`}
              sx={{
                position: 'relative',
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: 'background.paper',
              }}
            >
              <FilePreview preview={preview} />
              <Button
                onClick={() => handleRemoveFile(index)}
                sx={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  height: 12,
                  minWidth: 12,
                }}
                variant="contained"
                color="neutral"
                shape="circle"
                size="small"
              >
                <IconifyIcon icon="material-symbols:close-small-rounded" fontSize={10} />
              </Button>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default FileDropZone;
