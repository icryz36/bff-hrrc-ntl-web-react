import { FormProvider, useForm } from 'react-hook-form';
import { render, screen } from 'test-utils';
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
});

