import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import FilePreview from '../FilePreview';

vi.mock('lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lib/utils')>();
  return {
    ...actual,
    getFileIcon: vi.fn((format) => `icon-${format}`),
  };
});

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="file-icon">{icon}</span>,
}));

describe('<FilePreview />', () => {
  it('should render FilePreview with preview', () => {
    const preview = {
      name: 'test.jpg',
      preview: 'blob:http://localhost/test.jpg',
      format: 'image',
    };

    render(<FilePreview preview={preview} />);

    expect(screen.getByTestId('file-icon')).toBeInTheDocument();
  });

  it('should render FilePreview without preview', () => {
    const preview = {
      name: 'test.pdf',
      format: 'pdf',
    };

    render(<FilePreview preview={preview} />);

    expect(screen.getByTestId('file-icon')).toBeInTheDocument();
  });
});


