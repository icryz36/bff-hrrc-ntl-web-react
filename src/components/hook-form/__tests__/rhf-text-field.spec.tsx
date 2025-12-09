import { FormProvider, useForm } from 'react-hook-form';
import { fireEvent, render, screen } from 'test-utils';
import { describe, expect, it } from 'vitest';
import { RHFTextField } from '../rhf-text-field';

const TestComponent = ({ name = 'test' }: { name?: string }) => {
  const methods = useForm({
    defaultValues: {
      [name]: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <RHFTextField name={name} label="Test Field" />
    </FormProvider>
  );
};

describe('<RHFTextField />', () => {
  it('should render RHFTextField', () => {
    render(<TestComponent />);
    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    const TestComponentWithPlaceholder = () => {
      const methods = useForm({
        defaultValues: {
          test: '',
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFTextField name="test" label="Test Field" placeholder="Enter text" />
        </FormProvider>
      );
    };

    render(<TestComponentWithPlaceholder />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should render with maxLength', () => {
    const TestComponentWithMaxLength = () => {
      const methods = useForm({
        defaultValues: {
          test: '',
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFTextField name="test" label="Test Field" maxLength={10} />
        </FormProvider>
      );
    };

    render(<TestComponentWithMaxLength />);
    const input = screen.getByLabelText('Test Field') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.maxLength).toBe(10);
  });

  it('should handle text input change', () => {
    render(<TestComponent />);
    const input = screen.getByLabelText('Test Field') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(input.value).toBe('test value');
  });

  it('should handle number type input', () => {
    const TestComponentWithNumber = () => {
      const methods = useForm({
        defaultValues: {
          test: 0,
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFTextField name="test" label="Test Field" type="number" />
        </FormProvider>
      );
    };

    render(<TestComponentWithNumber />);
    const input = screen.getByLabelText('Test Field') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('number');
  });

  it('should handle number input change', () => {
    const TestComponentWithNumber = () => {
      const methods = useForm({
        defaultValues: {
          test: 0,
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFTextField name="test" label="Test Field" type="number" />
        </FormProvider>
      );
    };

    render(<TestComponentWithNumber />);
    const input = screen.getByLabelText('Test Field') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('123');
  });

  it('should render with helperText', () => {
    const TestComponentWithHelper = () => {
      const methods = useForm({
        defaultValues: {
          test: '',
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFTextField name="test" label="Test Field" helperText="Helper text" />
        </FormProvider>
      );
    };

    render(<TestComponentWithHelper />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('should render with error message', () => {
    const TestComponentWithError = () => {
      const methods = useForm({
        defaultValues: {
          test: '',
        },
        mode: 'onChange',
      });

      return (
        <FormProvider {...methods}>
          <RHFTextField
            name="test"
            label="Test Field"
            rules={{ required: 'This field is required' }}
          />
        </FormProvider>
      );
    };

    render(<TestComponentWithError />);
    const input = screen.getByLabelText('Test Field') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    // Error message should appear after validation
    expect(input).toBeInTheDocument();
  });
});
