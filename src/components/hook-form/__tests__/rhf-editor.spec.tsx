import { FormProvider, useForm } from 'react-hook-form';
import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import { RHFEditor } from '../rhf-editor';

vi.mock('components/base/Editor', () => ({
  default: ({ value, onChange, onBlur }: any) => (
    <div data-testid="editor">
      <input data-testid="editor-input" value={value} onChange={onChange} onBlur={onBlur} />
    </div>
  ),
}));

const TestComponent = () => {
  const methods = useForm({
    defaultValues: {
      test: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <RHFEditor name="test" />
    </FormProvider>
  );
};

describe('<RHFEditor />', () => {
  it('should render RHFEditor', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('editor')).toBeInTheDocument();
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
          <RHFEditor name="test" helperText="Helper text" />
        </FormProvider>
      );
    };

    render(<TestComponentWithHelper />);

    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });
});
