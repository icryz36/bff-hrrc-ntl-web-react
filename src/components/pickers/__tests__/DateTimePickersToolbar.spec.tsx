import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import DateTimePickersToolbar from '../DateTimePickersToolbar';

vi.mock('@mui/x-date-pickers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mui/x-date-pickers')>();
  return {
    ...actual,
    DateTimePickerToolbar: ({ children }: { children?: React.ReactNode }) => (
      <div data-testid="datetime-picker-toolbar">{children}</div>
    ),
  };
});

describe('<DateTimePickersToolbar />', () => {
  it('should render DateTimePickersToolbar', () => {
    render(<DateTimePickersToolbar />);

    expect(screen.getByTestId('datetime-picker-toolbar')).toBeInTheDocument();
  });
});

