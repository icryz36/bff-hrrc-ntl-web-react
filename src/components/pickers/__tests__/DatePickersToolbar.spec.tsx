import dayjs from 'dayjs';
import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import DatePickersToolbar from '../DatePickersToolbar';

const mockValue = dayjs('2024-01-15');

vi.mock('@mui/x-date-pickers/hooks', () => ({
  usePickerContext: vi.fn(() => ({
    value: mockValue,
  })),
}));

vi.mock('@mui/x-date-pickers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mui/x-date-pickers')>();
  return {
    ...actual,
    DatePickerToolbar: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="date-picker-toolbar">{children}</div>
    ),
  };
});

describe('<DatePickersToolbar />', () => {
  it('should render DatePickersToolbar', () => {
    render(<DatePickersToolbar />);

    expect(screen.getByText('Select Date')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('should render with className', () => {
    const { container } = render(<DatePickersToolbar className="test-class" />);

    expect(container.querySelector('.test-class')).toBeInTheDocument();
  });
});
