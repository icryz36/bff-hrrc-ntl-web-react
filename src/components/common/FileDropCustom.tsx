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
import { UploadFile } from 'components/hook-form';

interface FileDropZoneProps extends DropzoneOptions {
  error?: string;
  onRemove?: (index: number) => void;
  defaultFiles?: UploadFile[];
  previewType?: 'list' | 'thumbnail';
  hideInputIfHaveValue?: boolean;
  sx?: BoxProps['sx'];
  children?: any;
  buttonDelete?: boolean;
}

const FileDropCustom = ({
  onDrop,
  error,
  onRemove,
  defaultFiles,
  previewType = 'list',
  hideInputIfHaveValue,
  sx,
  children,
  buttonDelete,
  ...rest
}: FileDropZoneProps) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
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
      {!(hideInputIfHaveValue && files?.length > 0) && (
        <Box
          {...getRootProps()}
          sx={{
            p: 2,
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
          {children ? (
            children
          ) : (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              flexWrap="wrap"
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <IconifyIcon
                icon="material-symbols:add-photo-alternate-outline-rounded"
                sx={{
                  fontSize: { xs: 40, sm: 20 },
                  color: 'text.primary',
                }}
              />
              <Typography variant="caption" component="p" sx={{ alignSelf: 'center' }}>
                Drag & Drop files here{' '}
                <Box
                  component="span"
                  sx={{
                    color: 'text.disabled',
                    mx: 1,
                  }}
                >
                  or
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: 'primary.main',
                  }}
                >
                  browse from device
                </Box>
              </Typography>
            </Stack>
          )}
        </Box>
      )}

      {error && <FormHelperText sx={{ color: 'error.main' }}>{error}</FormHelperText>}

      {previews.length > 0 && previewType === 'list' && (
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {previews.map((preview, index) => {
            const { name, ext } = getFileNameParts(preview.name);
            return (
              <ListItem
                key={`${preview.preview}`}
                secondaryAction={
                  <>
                    {buttonDelete ? (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <Stack alignItems={'center'}>
                          <IconifyIcon
                            icon="material-symbols:delete-outline-rounded"
                            sx={{
                              fontSize: { xs: 40, sm: 20 },
                              color: 'error',
                            }}
                          />
                          <Typography variant="subtitle1_semibold" color="error">
                            Delete
                          </Typography>
                        </Stack>
                      </Button>
                    ) : (
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
                    )}
                  </>
                }
                sx={(theme) => ({
                  pl: 1,
                  gap: 2,
                  bgcolor: error
                    ? theme.palette.error.lighter
                    : theme.vars.palette.background.elevation1,
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
                  disableTypography
                  primary={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        variant="subtitle2_regular"
                        sx={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          minWidth: 0,
                        }}
                      >
                        {name}
                      </Typography>
                      <Typography variant="subtitle2_regular" sx={{ flexShrink: 0 }}>
                        {ext}
                      </Typography>
                    </Box>
                  }
                  // secondary={preview.size}
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

export default FileDropCustom;
