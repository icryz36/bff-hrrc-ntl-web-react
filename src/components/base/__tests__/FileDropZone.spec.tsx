import { fireEvent, render, screen } from 'test-utils';
import { vi } from 'vitest';
import FileDropZone from '../FileDropZone';

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
  };
});

vi.mock('components/common/FilePreview', () => ({
  default: ({ preview }: { preview: any }) => <div data-testid="file-preview">{preview.name}</div>,
}));

describe('<FileDropZone />', () => {
  const mockOnDrop = vi.fn();
  const mockOnRemove = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render FileDropZone', () => {
    render(<FileDropZone onDrop={mockOnDrop} />);

    expect(screen.getByText(/Drag & Drop files here/i)).toBeInTheDocument();
    expect(screen.getByText(/browse from device/i)).toBeInTheDocument();
  });

  it('should display error message when error prop is provided', () => {
    render(<FileDropZone onDrop={mockOnDrop} error="File error" />);

    expect(screen.getByText('File error')).toBeInTheDocument();
  });

  it('should not display error message when error prop is not provided', () => {
    render(<FileDropZone onDrop={mockOnDrop} />);

    expect(screen.queryByText('File error')).not.toBeInTheDocument();
  });

  it('should render with defaultFiles', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(<FileDropZone onDrop={mockOnDrop} defaultFiles={[file]} />);

    expect(screen.getByText(/Drag & Drop files here/i)).toBeInTheDocument();
  });

  it('should hide input when hideInputIfHaveValue is true and files exist', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(<FileDropZone onDrop={mockOnDrop} defaultFiles={[file]} hideInputIfHaveValue />);

    expect(screen.queryByText(/Drag & Drop files here/i)).not.toBeInTheDocument();
  });

  it('should show input when hideInputIfHaveValue is false and files exist', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(<FileDropZone onDrop={mockOnDrop} defaultFiles={[file]} hideInputIfHaveValue={false} />);

    expect(screen.getByText(/Drag & Drop files here/i)).toBeInTheDocument();
  });

  it('should show input when hideInputIfHaveValue is true but no files exist', () => {
    render(<FileDropZone onDrop={mockOnDrop} hideInputIfHaveValue />);

    expect(screen.getByText(/Drag & Drop files here/i)).toBeInTheDocument();
  });

  it('should render with previewType list', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(<FileDropZone onDrop={mockOnDrop} defaultFiles={[file]} previewType="list" />);

    expect(screen.getByTestId('file-preview')).toBeInTheDocument();
  });

  it('should render with previewType thumbnail', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(<FileDropZone onDrop={mockOnDrop} defaultFiles={[file]} previewType="thumbnail" />);

    expect(screen.getByTestId('file-preview')).toBeInTheDocument();
  });

  it('should call onDrop when files are dropped', () => {
    render(<FileDropZone onDrop={mockOnDrop} />);

    const dropzone = screen.getByText(/Drag & Drop files here/i).closest('div');
    if (dropzone) {
      fireEvent.click(dropzone);
    }

    expect(mockOnDrop).toHaveBeenCalled();
  });

  it('should handle file removal', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(
      <FileDropZone
        onDrop={mockOnDrop}
        defaultFiles={[file]}
        onRemove={mockOnRemove}
        previewType="list"
      />,
    );

    const removeButton = screen.getByLabelText('delete');
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith(0);
  });

  it('should handle file removal without onRemove callback', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(<FileDropZone onDrop={mockOnDrop} defaultFiles={[file]} previewType="list" />);

    const removeButton = screen.getByLabelText('delete');
    fireEvent.click(removeButton);

    expect(screen.queryByTestId('file-preview')).not.toBeInTheDocument();
  });

  it('should handle getFileNameParts with extension', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(<FileDropZone onDrop={mockOnDrop} defaultFiles={[file]} previewType="list" />);

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('.jpg')).toBeInTheDocument();
  });

  it('should handle defaultFiles change', () => {
    const { rerender } = render(<FileDropZone onDrop={mockOnDrop} />);

    expect(screen.getByText(/Drag & Drop files here/i)).toBeInTheDocument();

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    rerender(<FileDropZone onDrop={mockOnDrop} defaultFiles={[file]} />);

    expect(screen.getByTestId('file-preview')).toBeInTheDocument();
  });

  it('should handle empty defaultFiles', () => {
    render(<FileDropZone onDrop={mockOnDrop} defaultFiles={[]} />);

    expect(screen.getByText(/Drag & Drop files here/i)).toBeInTheDocument();
    expect(screen.queryByTestId('file-preview')).not.toBeInTheDocument();
  });

  it('should handle thumbnail preview removal', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(
      <FileDropZone
        onDrop={mockOnDrop}
        defaultFiles={[file]}
        onRemove={mockOnRemove}
        previewType="thumbnail"
      />,
    );

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith(0);
  });
});
