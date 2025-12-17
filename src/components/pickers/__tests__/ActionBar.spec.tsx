import { fireEvent, render, screen } from 'test-utils';
import { vi } from 'vitest';
import ActionBar from '../ActionBar';

const mockCancelValueChanges = vi.fn();
const mockAcceptValueChanges = vi.fn();

vi.mock('@mui/x-date-pickers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mui/x-date-pickers')>();
  return {
    ...actual,
    usePickerActionsContext: vi.fn(() => ({
      cancelValueChanges: mockCancelValueChanges,
      acceptValueChanges: mockAcceptValueChanges,
    })),
  };
});

describe('<ActionBar />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render ActionBar with Cancel and Confirm buttons', () => {
    render(<ActionBar />);

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('should call cancelValueChanges when Cancel button is clicked', () => {
    render(<ActionBar />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockCancelValueChanges).toHaveBeenCalledTimes(1);
  });

  it('should call acceptValueChanges when Confirm button is clicked', () => {
    render(<ActionBar />);

    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(mockAcceptValueChanges).toHaveBeenCalledTimes(1);
  });
});
