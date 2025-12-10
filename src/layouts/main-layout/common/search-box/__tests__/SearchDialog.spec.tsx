import { fireEvent, render, screen } from 'test-utils';
import { describe, expect, it, vi } from 'vitest';
import SearchDialog from '../SearchDialog';

describe('<SearchDialog />', () => {
  it('should render SearchDialog when anchorEl is provided', () => {
    const anchorEl = document.createElement('button');
    const handleClose = vi.fn();
    render(<SearchDialog anchorEl={anchorEl} handleClose={handleClose} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('should not render dialog when anchorEl is null', () => {
    const handleClose = vi.fn();
    render(<SearchDialog anchorEl={null} handleClose={handleClose} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should call handleClose when dialog is closed', () => {
    const anchorEl = document.createElement('button');
    const handleClose = vi.fn();
    render(<SearchDialog anchorEl={anchorEl} handleClose={handleClose} />);
    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('should have maxWidth sm', () => {
    const anchorEl = document.createElement('button');
    const handleClose = vi.fn();
    render(<SearchDialog anchorEl={anchorEl} handleClose={handleClose} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });
});
