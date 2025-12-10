import { FormProvider, useForm } from 'react-hook-form';
import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import { RHFUpload } from '../rhf-upload';

vi.mock('components/base/FileDropZone', () => ({
  default: ({ defaultFiles, onDrop, onRemove, error }: any) => (
    <div data-testid="file-dropzone">
      {defaultFiles?.length > 0 && <div data-testid="files-count">{defaultFiles.length}</div>}
      {error && <div data-testid="error">{error}</div>}
      <button data-testid="drop-button" onClick={() => onDrop && onDrop([])}>
        Drop
      </button>
      <button data-testid="remove-button" onClick={() => onRemove && onRemove(0)}>
        Remove
      </button>
    </div>
  ),
}));

const TestComponent = () => {
  const methods = useForm({
    defaultValues: {
      test: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <RHFUpload name="test" />
    </FormProvider>
  );
};

describe('<RHFUpload />', () => {
  it('should render RHFUpload', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('file-dropzone')).toBeInTheDocument();
  });

  it('should render with defaultFiles', () => {
    const TestComponentWithFiles = () => {
      const methods = useForm({
        defaultValues: {
          test: [
            { name: 'file1.jpg', url: 'http://example.com/file1.jpg', fromServer: true, id: '1' },
          ],
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFUpload name="test" />
        </FormProvider>
      );
    };

    render(<TestComponentWithFiles />);

    expect(screen.getByTestId('file-dropzone')).toBeInTheDocument();
  });
});
