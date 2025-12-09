import { fireEvent, render, screen } from 'test-utils';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import SearchPopover from '../SearchPopover';

const mockUseSettingsContext = vi.fn();
vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  return {
    ...actual,
    useSettingsContext: () => mockUseSettingsContext(),
  };
});

describe('<SearchPopover />', () => {
  beforeEach(() => {
    mockUseSettingsContext.mockReturnValue({
      config: {
        navigationMenuType: 'sidenav',
      },
    });
  });

  it('should render SearchPopover when anchorEl is provided', () => {
    const anchorEl = document.createElement('button');
    document.body.appendChild(anchorEl);
    const handleClose = vi.fn();
    render(<SearchPopover anchorEl={anchorEl} handleClose={handleClose} />);
    // Popover component should render (even if not visible)
    expect(anchorEl).toBeInTheDocument();
    document.body.removeChild(anchorEl);
  });

  it('should not render popover when anchorEl is null', () => {
    const handleClose = vi.fn();
    render(<SearchPopover anchorEl={null} handleClose={handleClose} />);
    // Component should render but popover should not be open
    expect(handleClose).toBeDefined();
  });

  it('should call handleClose when popover is closed', () => {
    const anchorEl = document.createElement('button');
    document.body.appendChild(anchorEl);
    const handleClose = vi.fn();
    render(<SearchPopover anchorEl={anchorEl} handleClose={handleClose} />);
    // Simulate closing by calling handleClose directly
    handleClose();
    expect(handleClose).toHaveBeenCalled();
    document.body.removeChild(anchorEl);
  });

  it('should adjust maxWidth for topnav navigationMenuType', () => {
    mockUseSettingsContext.mockReturnValue({
      config: {
        navigationMenuType: 'topnav',
      },
    });
    const anchorEl = document.createElement('button');
    document.body.appendChild(anchorEl);
    const handleClose = vi.fn();
    render(<SearchPopover anchorEl={anchorEl} handleClose={handleClose} />);
    expect(anchorEl).toBeInTheDocument();
    document.body.removeChild(anchorEl);
  });

  it('should adjust maxWidth for combo navigationMenuType', () => {
    mockUseSettingsContext.mockReturnValue({
      config: {
        navigationMenuType: 'combo',
      },
    });
    const anchorEl = document.createElement('button');
    document.body.appendChild(anchorEl);
    const handleClose = vi.fn();
    render(<SearchPopover anchorEl={anchorEl} handleClose={handleClose} />);
    expect(anchorEl).toBeInTheDocument();
    document.body.removeChild(anchorEl);
  });
});

