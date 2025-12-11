import { FormProvider, useForm } from 'react-hook-form';
import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import { RHFUploadAvatar } from '../rhf-upload-avatar';

vi.mock('components/base/AvatarDropBox', () => ({
  default: ({ defaultFile, onDrop }: any) => (
    <div data-testid="avatar-dropbox">
      {defaultFile && <div data-testid="default-file">{defaultFile.name}</div>}
      <button data-testid="drop-button" onClick={() => onDrop && onDrop([])}>
        Drop
      </button>
    </div>
  ),
}));

const TestComponent = () => {
  const methods = useForm({
    defaultValues: {
      test: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <RHFUploadAvatar name="test" />
    </FormProvider>
  );
};

describe('<RHFUploadAvatar />', () => {
  it('should render RHFUploadAvatar', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('avatar-dropbox')).toBeInTheDocument();
  });

  it('should render with defaultFile', () => {
    const TestComponentWithFile = () => {
      const methods = useForm({
        defaultValues: {
          test: {
            name: 'avatar.jpg',
            url: 'http://example.com/avatar.jpg',
            fromServer: true,
            id: '1',
          },
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFUploadAvatar name="test" />
        </FormProvider>
      );
    };

    render(<TestComponentWithFile />);

    expect(screen.getByTestId('avatar-dropbox')).toBeInTheDocument();
  });
});
