import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import TimePickersToolbar from '../TimePickersToolbar';

vi.mock('@mui/x-date-pickers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mui/x-date-pickers')>();
  return {
    ...actual,
    TimePickerToolbar: ({ children }: { children?: React.ReactNode }) => (
      <div data-testid="time-picker-toolbar">{children}</div>
    ),
  };
});

describe('<TimePickersToolbar />', () => {
  it('should render TimePickersToolbar', () => {
    render(<TimePickersToolbar />);

    expect(screen.getByText('Pick Time')).toBeInTheDocument();
    expect(screen.getByTestId('time-picker-toolbar')).toBeInTheDocument();
  });

  it('should render with className', () => {
    const { container } = render(<TimePickersToolbar className="test-class" />);

    expect(container.querySelector('.test-class')).toBeInTheDocument();
  });
});
