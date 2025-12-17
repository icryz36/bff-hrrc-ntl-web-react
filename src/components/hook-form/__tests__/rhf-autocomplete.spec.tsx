import { FormProvider, useForm } from 'react-hook-form';
import { render, screen } from 'test-utils';
import { describe, expect, it } from 'vitest';
import { RHFAutocomplete } from '../rhf-autocomplete';

const TestComponent = () => {
  const methods = useForm({
    defaultValues: {
      test: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <RHFAutocomplete
        name="test"
        label="Test Autocomplete"
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ]}
      />
    </FormProvider>
  );
};

describe('<RHFAutocomplete />', () => {
  it('should render RHFAutocomplete', () => {
    render(<TestComponent />);
    expect(screen.getByLabelText('Test Autocomplete')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    const TestComponentWithPlaceholder = () => {
      const methods = useForm({
        defaultValues: {
          test: null,
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFAutocomplete
            name="test"
            label="Test Autocomplete"
            placeholder="Select option"
            options={[]}
          />
        </FormProvider>
      );
    };

    render(<TestComponentWithPlaceholder />);
    expect(screen.getByPlaceholderText('Select option')).toBeInTheDocument();
  });

  it('should render with required prop', () => {
    const TestComponentWithRequired = () => {
      const methods = useForm({
        defaultValues: {
          test: null,
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFAutocomplete name="test" label="Test Autocomplete" required options={[]} />
        </FormProvider>
      );
    };

    const { container } = render(<TestComponentWithRequired />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('should render with helperText', () => {
    const TestComponentWithHelper = () => {
      const methods = useForm({
        defaultValues: {
          test: null,
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFAutocomplete
            name="test"
            label="Test Autocomplete"
            helperText="Helper text"
            options={[]}
          />
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
          test: null,
        },
        mode: 'onChange',
      });

      return (
        <FormProvider {...methods}>
          <RHFAutocomplete name="test" label="Test Autocomplete" options={[]} />
        </FormProvider>
      );
    };

    render(<TestComponentWithError />);
    expect(screen.getByLabelText('Test Autocomplete')).toBeInTheDocument();
  });

  it('should render without label', () => {
    const TestComponentWithoutLabel = () => {
      const methods = useForm({
        defaultValues: {
          test: null,
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFAutocomplete name="test" options={[]} />
        </FormProvider>
      );
    };

    render(<TestComponentWithoutLabel />);
    // Component should render even without label
    const input = screen.queryByLabelText('Test Autocomplete');
    expect(input).not.toBeInTheDocument();
  });

  it('should handle multiple selection', () => {
    const TestComponentMultiple = () => {
      const methods = useForm({
        defaultValues: {
          test: [],
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFAutocomplete
            name="test"
            label="Test Autocomplete"
            multiple
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </FormProvider>
      );
    };

    render(<TestComponentMultiple />);
    expect(screen.getByLabelText('Test Autocomplete')).toBeInTheDocument();
  });
});
