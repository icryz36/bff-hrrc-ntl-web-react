import { FormProvider, useForm } from 'react-hook-form';
import { render, screen } from 'test-utils';
import { RHFRadioGroup } from '../rhf-radio-group';

const TestComponent = () => {
  const methods = useForm({
    defaultValues: {
      test: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <RHFRadioGroup
        name="test"
        label="Test Radio Group"
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ]}
      />
    </FormProvider>
  );
};

describe('<RHFRadioGroup />', () => {
  it('should render RHFRadioGroup', () => {
    render(<TestComponent />);

    expect(screen.getByText('Test Radio Group')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
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
          <RHFRadioGroup
            name="test"
            label="Test Radio Group"
            options={[{ label: 'Option 1', value: '1' }]}
            helperText="Helper text"
          />
        </FormProvider>
      );
    };

    render(<TestComponentWithHelper />);

    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });
});
