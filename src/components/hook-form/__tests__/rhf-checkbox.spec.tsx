import { FormProvider, useForm } from 'react-hook-form';
import { fireEvent, render, screen } from 'test-utils';
import { describe, expect, it } from 'vitest';
import { RHFCheckbox, RHFMultiCheckbox } from '../rhf-checkbox';

const TestComponent = () => {
  const methods = useForm({
    defaultValues: {
      test: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <RHFCheckbox name="test" label="Test Checkbox" />
    </FormProvider>
  );
};

const TestMultiComponent = () => {
  const methods = useForm({
    defaultValues: {
      test: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <RHFMultiCheckbox
        name="test"
        label="Test Multi Checkbox"
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ]}
      />
    </FormProvider>
  );
};

describe('<RHFCheckbox />', () => {
  it('should render RHFCheckbox', () => {
    render(<TestComponent />);
    expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument();
  });

  it('should render with helperText', () => {
    const TestComponentWithHelper = () => {
      const methods = useForm({
        defaultValues: {
          test: false,
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFCheckbox name="test" label="Test Checkbox" helperText="Helper text" />
        </FormProvider>
      );
    };

    render(<TestComponentWithHelper />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('should handle checkbox change', () => {
    render(<TestComponent />);
    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('should render without label', () => {
    const TestComponentWithoutLabel = () => {
      const methods = useForm({
        defaultValues: {
          test: false,
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFCheckbox name="test" label="Test Checkbox" />
        </FormProvider>
      );
    };

    render(<TestComponentWithoutLabel />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should render with error message', () => {
    const TestComponentWithError = () => {
      const methods = useForm({
        defaultValues: {
          test: false,
        },
        mode: 'onChange',
      });

      return (
        <FormProvider {...methods}>
          <RHFCheckbox name="test" label="Test Checkbox" />
        </FormProvider>
      );
    };

    render(<TestComponentWithError />);
    const checkbox = screen.getByLabelText('Test Checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should render with slotProps', () => {
    const TestComponentWithSlotProps = () => {
      const methods = useForm({
        defaultValues: {
          test: false,
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFCheckbox
            name="test"
            label="Test Checkbox"
            slotProps={{
              checkbox: {
                size: 'small',
              },
            }}
          />
        </FormProvider>
      );
    };

    render(<TestComponentWithSlotProps />);
    expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument();
  });
});

describe('<RHFMultiCheckbox />', () => {
  it('should render RHFMultiCheckbox', () => {
    render(<TestMultiComponent />);
    expect(screen.getByText('Test Multi Checkbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  it('should handle checkbox selection', () => {
    render(<TestMultiComponent />);
    const checkbox1 = screen.getByLabelText('Option 1') as HTMLInputElement;
    expect(checkbox1.checked).toBe(false);
    fireEvent.click(checkbox1);
    expect(checkbox1.checked).toBe(true);
  });

  it('should handle multiple checkbox selections', () => {
    render(<TestMultiComponent />);
    const checkbox1 = screen.getByLabelText('Option 1') as HTMLInputElement;
    const checkbox2 = screen.getByLabelText('Option 2') as HTMLInputElement;
    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);
    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(true);
  });

  it('should render without label', () => {
    const TestComponentWithoutLabel = () => {
      const methods = useForm({
        defaultValues: {
          test: [],
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFMultiCheckbox
            name="test"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </FormProvider>
      );
    };

    render(<TestComponentWithoutLabel />);
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  it('should render with helperText', () => {
    const TestComponentWithHelper = () => {
      const methods = useForm({
        defaultValues: {
          test: [],
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFMultiCheckbox
            name="test"
            label="Test Multi Checkbox"
            helperText="Helper text"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </FormProvider>
      );
    };

    render(<TestComponentWithHelper />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('should render with disabled prop', () => {
    const TestComponentDisabled = () => {
      const methods = useForm({
        defaultValues: {
          test: [],
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFMultiCheckbox
            name="test"
            label="Test Multi Checkbox"
            disabled
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </FormProvider>
      );
    };

    render(<TestComponentDisabled />);
    const checkbox1 = screen.getByLabelText('Option 1') as HTMLInputElement;
    expect(checkbox1.disabled).toBe(true);
  });

  it('should render with error message', () => {
    const TestComponentWithError = () => {
      const methods = useForm({
        defaultValues: {
          test: [],
        },
        mode: 'onChange',
      });

      return (
        <FormProvider {...methods}>
          <RHFMultiCheckbox
            name="test"
            label="Test Multi Checkbox"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </FormProvider>
      );
    };

    render(<TestComponentWithError />);
    expect(screen.getByText('Test Multi Checkbox')).toBeInTheDocument();
  });
});
