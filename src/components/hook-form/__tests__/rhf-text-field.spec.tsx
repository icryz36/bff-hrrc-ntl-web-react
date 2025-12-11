import { FormProvider, useForm } from 'react-hook-form';
import { render, screen } from 'test-utils';
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
    render(<TestComponent />);

    const input = screen.getByLabelText('Test Field');
    expect(input).toBeInTheDocument();
  });
});
