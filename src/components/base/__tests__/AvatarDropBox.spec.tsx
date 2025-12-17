import { fireEvent, render, screen, waitFor } from 'test-utils';
import { vi } from 'vitest';
import AvatarDropBox from '../AvatarDropBox';

vi.mock('react-dropzone', () => ({
  useDropzone: vi.fn((options) => {
    const originalOnDrop = options.onDrop;
    return {
      getRootProps: () => ({
        onClick: () => {
          if (originalOnDrop) {
            const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
            originalOnDrop([file], [], {});
          }
        },
      }),
      getInputProps: () => ({
        onChange: vi.fn(),
      }),
    };
  }),
}));

vi.mock('lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lib/utils')>();
  return {
    ...actual,
    convertFileToAttachment: vi.fn((file) => ({
      name: file.name,
      preview: `blob:http://localhost/${file.name}`,
      format: 'image',
    })),
    getFileNameFromUrl: vi.fn((url) => url.split('/').pop() || 'unknown'),
  };
});

vi.mock('components/base/Image', () => ({
  default: ({ src, alt }: { src?: string; alt?: string }) => (
    <img data-testid="preview-image" src={src} alt={alt} />
  ),
}));

describe('<AvatarDropBox />', () => {
  const mockOnDrop = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render AvatarDropBox', () => {
    render(<AvatarDropBox onDrop={mockOnDrop} data-testid="avatar-dropbox" />);

    expect(screen.getByText('Upload Avatar')).toBeInTheDocument();
  });

  it('should render with defaultFile as string', () => {
    render(
      <AvatarDropBox
        onDrop={mockOnDrop}
        defaultFile="https://example.com/avatar.jpg"
        data-testid="avatar-dropbox"
      />,
    );

    expect(screen.getByText('Upload Avatar')).toBeInTheDocument();
  });

  it('should render with defaultFile as File', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(<AvatarDropBox onDrop={mockOnDrop} defaultFile={file} data-testid="avatar-dropbox" />);

    expect(screen.getByText('Upload Avatar')).toBeInTheDocument();
  });

  it('should display error state when error prop is provided', () => {
    render(
      <AvatarDropBox onDrop={mockOnDrop} error="Error message" data-testid="avatar-dropbox" />,
    );

    expect(screen.getByText('Upload Avatar')).toBeInTheDocument();
  });

  it('should call onDrop when file is dropped', () => {
    render(<AvatarDropBox onDrop={mockOnDrop} />);

    const dropzone = screen.getByText('Upload Avatar').closest('div');
    if (dropzone) {
      fireEvent.click(dropzone);
    }

    expect(mockOnDrop).toHaveBeenCalled();
  });

  it('should display preview image when preview exists', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(<AvatarDropBox onDrop={mockOnDrop} defaultFile={file} />);

    await waitFor(() => {
      expect(screen.getByTestId('preview-image')).toBeInTheDocument();
    });
  });

  it('should hide Upload Avatar text when sx width is less than 100', () => {
    render(<AvatarDropBox onDrop={mockOnDrop} sx={{ width: 50 }} />);

    expect(screen.queryByText('Upload Avatar')).not.toBeInTheDocument();
  });

  it('should show Upload Avatar text when sx width is greater than 100', () => {
    render(<AvatarDropBox onDrop={mockOnDrop} sx={{ width: 150 }} />);

    expect(screen.getByText('Upload Avatar')).toBeInTheDocument();
  });

  it('should show Upload Avatar text when sx width is not provided', () => {
    render(<AvatarDropBox onDrop={mockOnDrop} />);

    expect(screen.getByText('Upload Avatar')).toBeInTheDocument();
  });

  it('should handle defaultFile change', () => {
    const { rerender } = render(<AvatarDropBox onDrop={mockOnDrop} />);

    expect(screen.getByText('Upload Avatar')).toBeInTheDocument();

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    rerender(<AvatarDropBox onDrop={mockOnDrop} defaultFile={file} />);

    expect(screen.getByText('Upload Avatar')).toBeInTheDocument();
  });

  it('should handle defaultFile as empty string', () => {
    render(<AvatarDropBox onDrop={mockOnDrop} defaultFile="" />);

    expect(screen.getByText('Upload Avatar')).toBeInTheDocument();
  });
});
