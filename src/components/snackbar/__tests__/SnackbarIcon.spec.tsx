import { render, screen } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SnackbarIcon from '../SnackbarIcon';

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

vi.mock('lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lib/utils')>();
  return {
    ...actual,
    cssVarRgba: vi.fn((color: string, alpha: number) => `rgba(${color} / ${alpha})`),
  };
});

describe('<SnackbarIcon />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render SnackbarIcon with default variant', () => {
    render(<SnackbarIcon variant="default" icon="material-symbols:check-circle" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveTextContent('material-symbols:check-circle');
  });

  it('should render SnackbarIcon with success variant', () => {
    render(<SnackbarIcon variant="success" icon="material-symbols:check-circle" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveTextContent('material-symbols:check-circle');
  });

  it('should render SnackbarIcon with error variant', () => {
    render(<SnackbarIcon variant="error" icon="material-symbols:error" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveTextContent('material-symbols:error');
  });

  it('should render SnackbarIcon with warning variant', () => {
    render(<SnackbarIcon variant="warning" icon="material-symbols:warning" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveTextContent('material-symbols:warning');
  });

  it('should render SnackbarIcon with info variant', () => {
    render(<SnackbarIcon variant="info" icon="material-symbols:info" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveTextContent('material-symbols:info');
  });

  it('should have correct className', () => {
    const { container } = render(
      <SnackbarIcon variant="default" icon="material-symbols:check-circle" />,
    );
    const stack = container.querySelector('.notistack-Icon');
    expect(stack).toBeInTheDocument();
  });

  it('should render with different icons', () => {
    render(<SnackbarIcon variant="success" icon="material-symbols:done" />);
    expect(screen.getByTestId('icon')).toHaveTextContent('material-symbols:done');
  });
});
