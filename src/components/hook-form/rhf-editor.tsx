// RHFEditor.tsx
import * as React from 'react';
import type { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Editor from 'components/base/Editor';

type RHFEditorProps = Omit<React.ComponentProps<typeof Editor>, 'value' | 'onChange' | 'onBlur'> & {
  name: string;
  helperText?: ReactNode;
};

export function RHFEditor({ name, helperText, ...other }: RHFEditorProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'' as any}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <Editor
            value={field.value ?? ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            isValid={!error}
            {...other}
          />
          <FormHelperText>{error?.message ?? helperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
