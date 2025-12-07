import { render, screen, fireEvent } from 'test-utils';
import { vi } from 'vitest';
import SnackbarCloseButton from '../SnackbarCloseButton';

const mockCloseSnackbar = vi.fn();

vi.mock('notistack', async (importOriginal) => {
  const actual = await importOriginal<typeof import('notistack')>();
  return {
    ...actual,
    useSnackbar: vi.fn(() => ({
      closeSnackbar: mockCloseSnackbar,
    })),
  };
});

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

describe('<SnackbarCloseButton />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render SnackbarCloseButton', () => {
    render(<SnackbarCloseButton snackbarKey="test-key" />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should call closeSnackbar when button is clicked', () => {
    render(<SnackbarCloseButton snackbarKey="test-key" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockCloseSnackbar).toHaveBeenCalledWith('test-key');
  });

  it('should call closeSnackbar with number key', () => {
    render(<SnackbarCloseButton snackbarKey={123} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockCloseSnackbar).toHaveBeenCalledWith(123);
  });
});

