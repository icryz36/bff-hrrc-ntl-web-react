import { DropzoneOptions } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';
import type { SxProps, Theme } from '@mui/material/styles';
import FileDropZone from 'components/base/FileDropZone';

// ----------------------------------------------------------------------

type RHFUploadProps = {
  name: string;
  sx?: SxProps<Theme>;
  hideInputIfHaveValue?: boolean;
} & Omit<DropzoneOptions, 'onDrop'>;

// ----------------------------------------------------------------------

export function RHFUpload({ name, sx, hideInputIfHaveValue, ...other }: RHFUploadProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, formState: { errors } }) => {
        const filesValue = (value ?? []) as File[];

        return (
          <FileDropZone
            sx={sx}
            {...other}
            defaultFiles={filesValue}
            error={errors.root?.message}
            onDrop={(acceptedFiles) => {
              onChange(acceptedFiles);
            }}
            hideInputIfHaveValue={hideInputIfHaveValue}
            onRemove={(index) => {
              const newFiles = filesValue.filter((_, i) => i !== index);
              onChange(newFiles);
            }}
          />
        );
      }}
    />
  );
}
