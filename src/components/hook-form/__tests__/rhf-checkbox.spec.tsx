import { FormProvider, useForm } from 'react-hook-form';
import { render, screen } from 'test-utils';
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
});

describe('<RHFMultiCheckbox />', () => {
  it('should render RHFMultiCheckbox', () => {
    render(<TestMultiComponent />);

    expect(screen.getByText('Test Multi Checkbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });
});
