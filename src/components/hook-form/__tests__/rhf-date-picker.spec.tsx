import { FormProvider, useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RHFDatePicker, RHFDateTimePicker, RHFTimePicker } from '../rhf-date-picker';

const TestDatePickerComponent = ({ name = 'date' }: { name?: string }) => {
  const methods = useForm({
    defaultValues: {
      [name]: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RHFDatePicker name={name} label="Date Field" />
      </LocalizationProvider>
    </FormProvider>
  );
};

const TestTimePickerComponent = ({ name = 'time' }: { name?: string }) => {
  const methods = useForm({
    defaultValues: {
      [name]: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RHFTimePicker name={name} label="Time Field" />
      </LocalizationProvider>
    </FormProvider>
  );
};

const TestDateTimePickerComponent = ({ name = 'datetime' }: { name?: string }) => {
  const methods = useForm({
    defaultValues: {
      [name]: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RHFDateTimePicker name={name} label="DateTime Field" />
      </LocalizationProvider>
    </FormProvider>
  );
};

describe('<RHFDatePicker />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render RHFDatePicker', () => {
    const { container } = render(<TestDatePickerComponent />);
    // DatePicker renders with input field
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('should render with required prop', () => {
    const TestComponent = () => {
      const methods = useForm({
        defaultValues: {
          date: null,
        },
      });

      return (
        <FormProvider {...methods}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RHFDatePicker name="date" label="Date Field" required />
          </LocalizationProvider>
        </FormProvider>
      );
    };

    const { container } = render(<TestComponent />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('should render with helperText', () => {
    const TestComponent = () => {
      const methods = useForm({
        defaultValues: {
          date: null,
        },
      });

      return (
        <FormProvider {...methods}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RHFDatePicker
              name="date"
              label="Date Field"
              slotProps={{
                textField: {
                  helperText: 'Helper text',
                },
              }}
            />
          </LocalizationProvider>
        </FormProvider>
      );
    };

    render(<TestComponent />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('should handle null value', () => {
    const { container } = render(<TestDatePickerComponent />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('should handle invalid date value', () => {
    const TestComponent = () => {
      const methods = useForm({
        defaultValues: {
          date: 'invalid-date',
        },
      });

      return (
        <FormProvider {...methods}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RHFDatePicker name="date" label="Date Field" />
          </LocalizationProvider>
        </FormProvider>
      );
    };

    const { container } = render(<TestComponent />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('should render with error state', () => {
    const TestComponent = () => {
      const methods = useForm({
        defaultValues: {
          date: null,
        },
      });

      return (
        <FormProvider {...methods}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RHFDatePicker
              name="date"
              label="Date Field"
              slotProps={{
                textField: {
                  error: true,
                  helperText: 'Error message',
                },
              }}
            />
          </LocalizationProvider>
        </FormProvider>
      );
    };

    render(<TestComponent />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});

describe('<RHFTimePicker />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render RHFTimePicker', () => {
    const { container } = render(<TestTimePickerComponent />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('should render with required prop', () => {
    const TestComponent = () => {
      const methods = useForm({
        defaultValues: {
          time: null,
        },
      });

      return (
        <FormProvider {...methods}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RHFTimePicker name="time" label="Time Field" required />
          </LocalizationProvider>
        </FormProvider>
      );
    };

    const { container } = render(<TestComponent />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('should render with helperText', () => {
    const TestComponent = () => {
      const methods = useForm({
        defaultValues: {
          time: null,
        },
      });

      return (
        <FormProvider {...methods}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RHFTimePicker
              name="time"
              label="Time Field"
              slotProps={{
                textField: {
                  helperText: 'Helper text',
                },
              }}
            />
          </LocalizationProvider>
        </FormProvider>
      );
    };

    render(<TestComponent />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('should handle null value', () => {
    const { container } = render(<TestTimePickerComponent />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('should render with error state', () => {
    const TestComponent = () => {
      const methods = useForm({
        defaultValues: {
          time: null,
        },
      });

      return (
        <FormProvider {...methods}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RHFTimePicker
              name="time"
              label="Time Field"
              slotProps={{
                textField: {
                  error: true,
                  helperText: 'Error message',
                },
              }}
            />
          </LocalizationProvider>
        </FormProvider>
      );
    };

    render(<TestComponent />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});

describe('<RHFDateTimePicker />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render RHFDateTimePicker', () => {
    const { container } = render(<TestDateTimePickerComponent />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('should render with required prop', () => {
    const TestComponent = () => {
      const methods = useForm({
        defaultValues: {
          datetime: null,
        },
      });

      return (
        <FormProvider {...methods}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RHFDateTimePicker name="datetime" label="DateTime Field" required />
          </LocalizationProvider>
        </FormProvider>
      );
    };

    const { container } = render(<TestComponent />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('should render with helperText', () => {
    const TestComponent = () => {
      const methods = useForm({
        defaultValues: {
          datetime: null,
        },
      });

      return (
        <FormProvider {...methods}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RHFDateTimePicker
              name="datetime"
              label="DateTime Field"
              slotProps={{
                textField: {
                  helperText: 'Helper text',
                },
              }}
            />
          </LocalizationProvider>
        </FormProvider>
      );
    };

    render(<TestComponent />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('should handle null value', () => {
    const { container } = render(<TestDateTimePickerComponent />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('should render with error state', () => {
    const TestComponent = () => {
      const methods = useForm({
        defaultValues: {
          datetime: null,
        },
      });

      return (
        <FormProvider {...methods}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RHFDateTimePicker
              name="datetime"
              label="DateTime Field"
              slotProps={{
                textField: {
                  error: true,
                  helperText: 'Error message',
                },
              }}
            />
          </LocalizationProvider>
        </FormProvider>
      );
    };

    render(<TestComponent />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});
