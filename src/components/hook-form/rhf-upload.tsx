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

export type RemoteFile = {
  id: string;
  url: string;
  name: string;
  fromServer: true;
};

export type UploadFile = File | RemoteFile;

// ----------------------------------------------------------------------

export function RHFUpload({ name, sx, hideInputIfHaveValue, ...other }: RHFUploadProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const filesValue = (value ?? []) as UploadFile[];

        return (
          <FileDropZone
            sx={sx}
            {...other}
            defaultFiles={filesValue}
            error={error?.message || undefined}
            // onDrop={(acceptedFiles) => {
            //   onChange(acceptedFiles);
            // }}

            onDrop={(acceptedFiles) => {
              const newFiles: UploadFile[] = [...filesValue, ...acceptedFiles];
              onChange(newFiles);
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
