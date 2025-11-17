import { Controller, useFormContext } from 'react-hook-form';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import type { PickersTextFieldProps } from '@mui/x-date-pickers/PickersTextField';
import type { TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

// ----------------------------------------------------------------------

type DateInput = Dayjs | Date | string | number | null | undefined;

function normalizeDateValue(value: DateInput): Dayjs | null {
  if (dayjs.isDayjs(value)) return value;

  const parsed = value ? dayjs(value) : null;
  return parsed?.isValid() ? parsed : null;
}

// ----------------------------------------------------------------------

type PickerProps<T extends DatePickerProps | TimePickerProps | DateTimePickerProps> = T & {
  name: string;
  slotProps?: T['slotProps'] & {
    textField?: Partial<PickersTextFieldProps>;
  };
};

type RHFDatePickerProps = PickerProps<DatePickerProps> & {
  required?: boolean;
};

type RHFTimePickerProps = PickerProps<TimePickerProps> & {
  required?: boolean;
};

type RHFDateTimePickerProps = PickerProps<DateTimePickerProps> & {
  required?: boolean;
};

// function DatePickerIcon() {
//   return <img src="/assets/icon/ic-c.svg" alt="Date picker opening icon" width={32} />;
// }

export function RHFDatePicker({ name, slotProps, required, ...other }: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          value={normalizeDateValue(field.value)}
          onChange={(newValue) => {
            if (!newValue) {
              field.onChange(null);
              return;
            }

            const parsedValue = dayjs(newValue);
            field.onChange(parsedValue.isValid() ? parsedValue.format() : newValue);
          }}
          // slots={{ openPickerIcon: DatePickerIcon }}
          slotProps={{
            ...slotProps,
            textField: {
              ...slotProps?.textField,
              required,
              error: !!error,
              helperText: error?.message ?? slotProps?.textField?.helperText,
              fullWidth: true,
              onClick: (e) => {
                e.currentTarget.querySelector('button')?.click();
              },
              InputProps: {
                readOnly: true,
                ...slotProps?.textField?.InputProps,
              },
              sx: {
                cursor: 'pointer',
                '& input': { cursor: 'pointer' },
                ...slotProps?.textField?.sx,
              },
            },
          }}
          {...other}
        />
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFTimePicker({ name, slotProps, required, ...other }: RHFTimePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TimePicker
          {...field}
          value={normalizeDateValue(field.value)}
          onChange={(newValue) => {
            if (!newValue) {
              field.onChange(null);
              return;
            }

            const parsedValue = dayjs(newValue);
            field.onChange(parsedValue.isValid() ? parsedValue.format() : newValue);
          }}
          slotProps={{
            ...slotProps,
            textField: {
              ...slotProps?.textField,
              required,
              error: !!error,
              helperText: error?.message ?? slotProps?.textField?.helperText,
            },
          }}
          {...other}
        />
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFDateTimePicker({ name, slotProps, required, ...other }: RHFDateTimePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DateTimePicker
          {...field}
          value={normalizeDateValue(field.value)}
          onChange={(newValue) => {
            if (!newValue) {
              field.onChange(null);
              return;
            }

            const parsedValue = dayjs(newValue);
            field.onChange(parsedValue.isValid() ? parsedValue.format() : newValue);
          }}
          slotProps={{
            ...slotProps,
            textField: {
              ...slotProps?.textField,
              required,
              error: !!error,
              helperText: error?.message ?? slotProps?.textField?.helperText,
            },
          }}
          {...other}
        />
      )}
    />
  );
}
