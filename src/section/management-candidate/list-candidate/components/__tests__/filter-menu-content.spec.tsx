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

  it('resets all filter fields when clicking Reset', () => {
    setup();

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    const surnameInput = screen.getByLabelText('Surname') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const mobileInput = screen.getByLabelText('Mobile Number') as HTMLInputElement;
    const statusSelect = screen.getByLabelText('Status') as HTMLSelectElement;

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(mobileInput, { target: { value: '1234567890' } });
    fireEvent.change(statusSelect, { target: { value: 'Active' } });

    expect(nameInput.value).toBe('John');
    expect(surnameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(mobileInput.value).toBe('1234567890');
    expect(statusSelect.value).toBe('Active');

    fireEvent.click(screen.getByText('Reset'));

    expect(nameInput.value).toBe('');
    expect(surnameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(mobileInput.value).toBe('');
    expect(statusSelect.value).toBe('');

    expect(setFiltersMock).not.toHaveBeenCalled();
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
