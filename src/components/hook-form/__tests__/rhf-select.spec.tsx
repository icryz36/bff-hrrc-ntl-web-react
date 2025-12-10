import { FormProvider, useForm } from 'react-hook-form';
import { render, screen } from 'test-utils';
import { RHFMultiSelect } from '../rhf-select';

const TestMultiSelectComponent = () => {
  const methods = useForm({
    defaultValues: {
      test: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <RHFMultiSelect
        name="test"
        label="Test Multi Select"
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ]}
      />
    </FormProvider>
  );
};

describe('<RHFMultiSelect />', () => {
  it('should render RHFMultiSelect', () => {
    render(<TestMultiSelectComponent />);

    expect(screen.getByText('Test Multi Select')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    const TestComponentWithPlaceholder = () => {
      const methods = useForm({
        defaultValues: {
          test: [],
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFMultiSelect
            name="test"
            label="Test Multi Select"
            placeholder="Select options"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </FormProvider>
      );
    };

    render(<TestComponentWithPlaceholder />);

    expect(screen.getByText('Test Multi Select')).toBeInTheDocument();
  });
});
