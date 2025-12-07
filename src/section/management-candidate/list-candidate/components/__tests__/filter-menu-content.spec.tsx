import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FilterMenuContent from '../filter-menu-content';

describe('FilterMenuContent', () => {
  let onCloseMock: any;
  let setFiltersMock: any;

  const mockFilters = {
    status: '',
    name: '',
    surname: '',
    email: '',
    mobileNumber: '',
  };

  beforeEach(() => {
    onCloseMock = vi.fn();
    setFiltersMock = vi.fn();
  });

  const setup = () =>
    render(
      <MemoryRouter>
        <FilterMenuContent
          onClose={onCloseMock}
          filters={mockFilters}
          setFilters={setFiltersMock}
        />
      </MemoryRouter>,
    );

  it('renders Filter UI correctly', () => {
    setup();

    expect(screen.getByText('Filter')).toBeDefined();
    expect(screen.getByLabelText('Status')).toBeDefined();
    expect(screen.getByLabelText('Name')).toBeDefined();
    expect(screen.getByLabelText('Surname')).toBeDefined();
    expect(screen.getByLabelText('Email')).toBeDefined();
    expect(screen.getByLabelText('Mobile Number')).toBeDefined();
  });

  it('updates state when typing Name', () => {
    setup();

    const input = screen.getByLabelText('Name') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'John' } });

    expect(input.value).toBe('John');
  });

  it('resets local filters when clicking Reset but does not call setFilters', () => {
    setup();

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'John' } });
    expect(nameInput.value).toBe('John');

    fireEvent.click(screen.getByText('Reset'));

    expect(nameInput.value).toBe('');

    expect(setFiltersMock).not.toHaveBeenCalled();

    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('calls setFilters when Apply is clicked', () => {
    setup();

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'John' } });

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
