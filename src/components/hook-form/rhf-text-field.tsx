import { Controller, useFormContext } from 'react-hook-form';
import { Typography } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  maxLength?: number;
};

export function RHFTextField({ name, helperText, maxLength, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={<Typography variant="caption">{error?.message ?? helperText}</Typography>}
          inputProps={{
            autoComplete: 'off',
            ...(maxLength && {
              maxLength,
            }),
          }}
          {...other}
        />
      )}
    />
  );
}
