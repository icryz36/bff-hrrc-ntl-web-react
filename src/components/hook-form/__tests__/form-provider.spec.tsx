import { useForm } from 'react-hook-form';
import { render, screen } from 'test-utils';
import { Form } from '../form-provider';

const TestComponent = () => {
  const methods = useForm({
    defaultValues: {
      test: '',
    },
  });

  return (
    <Form methods={methods} onSubmit={() => {}}>
      <input name="test" data-testid="test-input" />
    </Form>
  );
};

describe('<Form />', () => {
  it('should render Form with children', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('should render form element', () => {
    const { container } = render(<TestComponent />);

    expect(container.querySelector('form')).toBeInTheDocument();
  });
});


