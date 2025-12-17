import React from 'react';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import FilterSection from '../filter-section';

vi.mock('providers/BreakpointsProvider', () => ({
  useBreakpoints: () => ({
    up: () => true,
  }),
}));

vi.mock('section/management-job/list-job/components/filter-menu-content', () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="filter-menu-content">
      Mock Filter Menu
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe('<FilterSection />', () => {
  const apiRef = React.createRef<GridApiCommunity>();
  const handleToggleFilterPanel = vi.fn();
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
  const setFiltersMock = vi.fn();
  const onResetFiltersMock = vi.fn();

  const defaultProps = {
    apiRef,
    handleToggleFilterPanel,
    filters: mockFilters,
    setFilters: setFiltersMock,
    onResetFilters: onResetFiltersMock,
  };

  it('renders Filters button', () => {
    render(<FilterSection {...defaultProps} />);

    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('opens popover when button is clicked', () => {
    render(<FilterSection {...defaultProps} />);

    fireEvent.click(screen.getByText('Filters'));

    expect(screen.getByTestId('filter-menu-content')).toBeInTheDocument();
  });

  it('closes popover when onClose is called', () => {
    render(<FilterSection {...defaultProps} />);

    fireEvent.click(screen.getByText('Filters'));

    const menu = screen.getByTestId('filter-menu-content');
    expect(menu).toBeVisible();

    fireEvent.click(screen.getByText('Close'));

    expect(menu).not.toBeVisible();
  });
});
