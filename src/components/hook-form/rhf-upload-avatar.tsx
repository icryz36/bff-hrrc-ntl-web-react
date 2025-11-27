import { Controller, useFormContext } from 'react-hook-form';
import type { SxProps, Theme } from '@mui/material/styles';
import AvatarDropBox from 'components/base/AvatarDropBox';

// ----------------------------------------------------------------------

type RHFUploadAvatarProps = {
  name: string;
  sx?: SxProps<Theme>;
};

// ----------------------------------------------------------------------

export function RHFUploadAvatar({ name, ...other }: RHFUploadAvatarProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <AvatarDropBox
            defaultFile={value}
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length > 0) {
                onChange(acceptedFiles[0]);
              }
            }}
            // error={errors.root?.message ?? 'Invalid avatar'}
            {...other}
          />
        );
      }}
    />
  );
}
