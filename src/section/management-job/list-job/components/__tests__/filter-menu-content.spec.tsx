import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FilterMenuContent from '../filter-menu-content';

// Mock DatePicker (ไม่ต้อง render ของจริง)
vi.mock('@mui/x-date-pickers', () => ({
  DatePicker: ({ label }: any) => <div>{label}</div>,
}));

describe('FilterMenuContent', () => {
  let apiRef: any;
  let onCloseMock: any;

  beforeEach(() => {
    apiRef = { current: { setFilterModel: vi.fn() } };
    onCloseMock = vi.fn();
  });

  const setup = () =>
    render(
      <MemoryRouter>
        <FilterMenuContent apiRef={apiRef} onClose={onCloseMock} />
      </MemoryRouter>,
    );

  // ------------------------------------------------------------

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

  // ------------------------------------------------------------

  it('updates state when typing Job Title', () => {
    setup();

    const input = screen.getByLabelText('Job Title') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Engineer' } });

    expect(input.value).toBe('Engineer');
  });

  // ------------------------------------------------------------

  it('resets filters when clicking Reset', () => {
    setup();

    // Set job title
    const input = screen.getByLabelText('Job Title') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Engineer' } });
    expect(input.value).toBe('Engineer');

    // Reset
    fireEvent.click(screen.getByText('Reset'));

    expect((screen.getByLabelText('Job Title') as HTMLInputElement).value).toBe('');
  });

  // ------------------------------------------------------------

  it('calls apiRef.setFilterModel when Apply is clicked', () => {
    setup();

    // Put value
    const jobTitleInput = screen.getByLabelText('Job Title') as HTMLInputElement;
    fireEvent.change(jobTitleInput, { target: { value: 'Developer' } });

    fireEvent.click(screen.getByText('Apply'));

    expect(apiRef.current.setFilterModel).toHaveBeenCalledWith({
      items: [
        {
          columnField: 'jobTitle',
          operatorValue: 'contains',
          value: 'Developer',
        },
      ],
    });
  });

  // ------------------------------------------------------------

  it('calls onClose after Apply', () => {
    setup();

    fireEvent.click(screen.getByText('Apply'));

    expect(onCloseMock).toHaveBeenCalled();
  });

  // ------------------------------------------------------------

  it('calls onClose when clicking close icon', () => {
    setup();

    const closeIcon = screen.getByLabelText('close');
    fireEvent.click(closeIcon);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
