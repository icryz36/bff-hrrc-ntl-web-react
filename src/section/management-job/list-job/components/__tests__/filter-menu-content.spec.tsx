import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FilterMenuContent from '../filter-menu-content';

vi.mock('@mui/x-date-pickers', () => ({
  DatePicker: ({ label }: any) => <div>{label}</div>,
}));

describe('FilterMenuContent', () => {
  let onCloseMock: any;
  let setFiltersMock: any;
  let onResetFiltersMock: any;

  const mockFilters = {
    jobTitle: '',
    department: [],
    region: '',
    province: '',
    district: '',
    jobStatus: '',
    owner: '',
    startDate: null,
    activeDay: '',
  };

  beforeEach(() => {
    onCloseMock = vi.fn();
    setFiltersMock = vi.fn();
    onResetFiltersMock = vi.fn();
  });

  const setup = () =>
    render(
      <MemoryRouter>
        <FilterMenuContent
          onClose={onCloseMock}
          filters={mockFilters}
          setFilters={setFiltersMock}
          onResetFilters={onResetFiltersMock}
        />
      </MemoryRouter>,
    );

  it('renders Filter UI correctly', () => {
    setup();

    expect(screen.getByText('Filter')).toBeDefined();
    expect(
      screen.getByText('Easily find the List Job Post you’re looking for using filters.'),
    ).toBeDefined();

    expect(screen.getByLabelText('Job Title')).toBeDefined();
    expect(screen.getByLabelText('Department')).toBeDefined();
    expect(screen.getByLabelText('NTL Regional')).toBeDefined();
    expect(screen.getByLabelText('Province')).toBeDefined();
    expect(screen.getByLabelText('District')).toBeDefined();
    expect(screen.getByLabelText('Job Status')).toBeDefined();
    expect(screen.getByLabelText('Owner')).toBeDefined();
    expect(screen.getByLabelText('Active Day')).toBeDefined();
    expect(screen.getByText('Start Date')).toBeDefined();
  });

  it('updates state when typing Job Title', () => {
    setup();

    const input = screen.getByLabelText('Job Title') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Engineer' } });

    expect(input.value).toBe('Engineer');
  });

  it('resets filters when clicking Reset', () => {
    setup();

    const input = screen.getByLabelText('Job Title') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Engineer' } });
    expect(input.value).toBe('Engineer');

    fireEvent.click(screen.getByText('Reset'));

    expect(onResetFiltersMock).toHaveBeenCalled();
  });

  it('calls apiRef.setFilterModel and setFilters when Apply is clicked', () => {
    setup();

    const jobTitleInput = screen.getByLabelText('Job Title') as HTMLInputElement;
    fireEvent.change(jobTitleInput, { target: { value: 'Developer' } });

    fireEvent.click(screen.getByText('Apply'));

    expect(setFiltersMock).toHaveBeenCalled();
  });

  it('calls onClose after Apply', () => {
    setup();

    fireEvent.click(screen.getByText('Apply'));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls onClose when clicking close icon', () => {
    setup();

    const closeIcon = screen.getByLabelText('close');
    fireEvent.click(closeIcon);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
