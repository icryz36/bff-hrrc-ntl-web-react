import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import CustomConfirmDialog, { CustomConfirmDialogProps } from '../CustomDialog';

describe('CustomConfirmDialog', () => {
  const setup = ({ open = true, description, onClose }: Partial<CustomConfirmDialogProps>) => {
    const mockOnClose = onClose || vi.fn();
    const mockTitle = 'mock-title';
    const mockAction = <button>confirm-btn</button>;

    const args = render(
      <CustomConfirmDialog
        open={open}
        title={mockTitle}
        action={mockAction}
        onClose={mockOnClose}
        description={description}
      />,
    );

    return { ...args, mockOnClose };
  };

  it('should render CustomConfirmDialog', () => {
    setup({});

    expect(screen.getByText('mock-title')).toBeInTheDocument();
    expect(screen.getByText('confirm-btn')).toBeInTheDocument();
  });

  it('should render description when provided', () => {
    setup({ description: 'description-test' });

    expect(screen.getByText('mock-title')).toBeInTheDocument();
    expect(screen.getByText('confirm-btn')).toBeInTheDocument();
    expect(screen.getByText('description-test')).toBeInTheDocument();
  });

  it('should not render description when not provided', () => {
    setup({});

    expect(screen.getByText('mock-title')).toBeInTheDocument();
    expect(screen.getByText('confirm-btn')).toBeInTheDocument();
    expect(screen.queryByText('description-test')).not.toBeInTheDocument();
  });

  it('should not render CustomConfirmDialog when open is false', () => {
    setup({ open: false });

    expect(screen.queryByText('mock-title')).not.toBeInTheDocument();
    expect(screen.queryByText('confirm-btn')).not.toBeInTheDocument();
  });

  it('should call onClose when dialog is closed', () => {
    const mockOnClose = vi.fn();
    setup({ onClose: mockOnClose });

    expect(screen.getByText('mock-title')).toBeInTheDocument();
  });

  it('should render description as ReactNode', () => {
    const descriptionNode = <div data-testid="custom-description">Custom Description Node</div>;
    render(
      <CustomConfirmDialog
        open={true}
        title="Test Title"
        action={<button>confirm-btn</button>}
        onClose={vi.fn()}
        description={descriptionNode}
      />,
    );

    expect(screen.getByTestId('custom-description')).toBeInTheDocument();
  });
});
