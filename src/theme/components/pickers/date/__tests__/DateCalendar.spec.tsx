import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { describe, expect, it, vi } from 'vitest';
import DateCalendar from '../DateCalendar';

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{ui}</LocalizationProvider>
    </ThemeProvider>,
  );
};

describe('DateCalendar component config', () => {
  it('should have defaultProps defined', () => {
    expect(DateCalendar.defaultProps).toBeDefined();
  });

  it('should have slots defined in defaultProps', () => {
    expect(DateCalendar.defaultProps?.slots).toBeDefined();
  });

  it('should have calendarHeader slot', () => {
    expect(DateCalendar.defaultProps?.slots?.calendarHeader).toBeDefined();
    expect(typeof DateCalendar.defaultProps?.slots?.calendarHeader).toBe('function');
  });

  it('should have day slot', () => {
    expect(DateCalendar.defaultProps?.slots?.day).toBeDefined();
    expect(typeof DateCalendar.defaultProps?.slots?.day).toBe('function');
  });

  it('should have styleOverrides defined', () => {
    expect(DateCalendar.styleOverrides).toBeDefined();
  });

  it('should have root styleOverride', () => {
    expect(DateCalendar.styleOverrides?.root).toBeDefined();
    expect(typeof DateCalendar.styleOverrides?.root).toBe('function');
  });

  it('should render custom calendarHeader with month and year', () => {
    const MockCalendarHeader = DateCalendar.defaultProps?.slots?.calendarHeader;
    if (MockCalendarHeader) {
      const mockCurrentMonth = dayjs('2024-03-15');
      const mockOnMonthChange = vi.fn();
      const mockOnViewChange = vi.fn();

      renderWithTheme(
        <MockCalendarHeader
          currentMonth={mockCurrentMonth}
          onMonthChange={mockOnMonthChange}
          onViewChange={mockOnViewChange}
          view="day"
        />,
      );

      expect(screen.getByText('March 2024')).toBeInTheDocument();
      expect(screen.getAllByTestId('icon').length).toBeGreaterThanOrEqual(2);
    } else {
      expect.fail('MockCalendarHeader is undefined');
    }
  });

  it('should call onMonthChange when previous month button is clicked', () => {
    const MockCalendarHeader = DateCalendar.defaultProps?.slots?.calendarHeader;
    if (MockCalendarHeader) {
      const mockCurrentMonth = dayjs('2024-03-15');
      const mockOnMonthChange = vi.fn();
      const mockOnViewChange = vi.fn();

      renderWithTheme(
        <MockCalendarHeader
          currentMonth={mockCurrentMonth}
          onMonthChange={mockOnMonthChange}
          onViewChange={mockOnViewChange}
          view="day"
        />,
      );

      const prevButton = screen.getAllByTestId('icon')[0].closest('button');
      if (prevButton) {
        fireEvent.click(prevButton);
        expect(mockOnMonthChange).toHaveBeenCalled();
      }
    } else {
      expect.fail('MockCalendarHeader is undefined');
    }
  });

  it('should call onMonthChange when next month button is clicked', () => {
    const MockCalendarHeader = DateCalendar.defaultProps?.slots?.calendarHeader;
    if (MockCalendarHeader) {
      const mockCurrentMonth = dayjs('2024-03-15');
      const mockOnMonthChange = vi.fn();
      const mockOnViewChange = vi.fn();

      renderWithTheme(
        <MockCalendarHeader
          currentMonth={mockCurrentMonth}
          onMonthChange={mockOnMonthChange}
          onViewChange={mockOnViewChange}
          view="day"
        />,
      );

      const nextButton = screen.getAllByTestId('icon')[1].closest('button');
      if (nextButton) {
        fireEvent.click(nextButton);
        expect(mockOnMonthChange).toHaveBeenCalled();
      }
    } else {
      expect.fail('MockCalendarHeader is undefined');
    }
  });

  it('should call onViewChange when month/year button is clicked', () => {
    const MockCalendarHeader = DateCalendar.defaultProps?.slots?.calendarHeader;
    if (MockCalendarHeader) {
      const mockCurrentMonth = dayjs('2024-03-15');
      const mockOnMonthChange = vi.fn();
      const mockOnViewChange = vi.fn();

      renderWithTheme(
        <MockCalendarHeader
          currentMonth={mockCurrentMonth}
          onMonthChange={mockOnMonthChange}
          onViewChange={mockOnViewChange}
          view="day"
        />,
      );

      const monthYearButton = screen.getByText('March 2024');
      fireEvent.click(monthYearButton);
      expect(mockOnViewChange).toHaveBeenCalledWith('year');
    } else {
      expect.fail('MockCalendarHeader is undefined');
    }
  });

  it('should toggle view from year to day when month/year button is clicked', () => {
    const MockCalendarHeader = DateCalendar.defaultProps?.slots?.calendarHeader;
    if (MockCalendarHeader) {
      const mockCurrentMonth = dayjs('2024-03-15');
      const mockOnMonthChange = vi.fn();
      const mockOnViewChange = vi.fn();

      renderWithTheme(
        <MockCalendarHeader
          currentMonth={mockCurrentMonth}
          onMonthChange={mockOnMonthChange}
          onViewChange={mockOnViewChange}
          view="year"
        />,
      );

      const monthYearButton = screen.getByText('March 2024');
      fireEvent.click(monthYearButton);
      expect(mockOnViewChange).toHaveBeenCalledWith('day');
    } else {
      expect.fail('MockCalendarHeader is undefined');
    }
  });

  it('should render day slot with PickersDay component', () => {
    const MockDay = DateCalendar.defaultProps?.slots?.day;
    if (MockDay) {
      const { container } = renderWithTheme(
        <MockDay
          day={dayjs('2024-03-15')}
          selected={false}
          outsideCurrentMonth={false}
          focused={undefined}
        />,
      );
      expect(container.firstChild).toBeInTheDocument();
    } else {
      expect.fail('MockDay is undefined');
    }
  });

  it('should apply root styleOverrides correctly', () => {
    const rootStyle = DateCalendar.styleOverrides?.root;
    if (rootStyle && typeof rootStyle === 'function') {
      // Create a mock theme with vars.palette to avoid errors
      const mockTheme = {
        ...theme,
        vars: {
          palette: {
            background: {
              elevation2: 'rgba(0, 0, 0, 0.05)',
            },
            text: {
              disabled: 'rgba(0, 0, 0, 0.38)',
            },
          },
        },
      };
      const result = rootStyle({ theme: mockTheme as any });
      expect(result).toBeDefined();
      expect(result.padding).toBe(theme.spacing(3));
      expect(result.width).toBe(352);
    } else {
      expect.fail('root styleOverride is not a function');
    }
  });
});
