import { render, screen, fireEvent } from 'test-utils';
import { vi } from 'vitest';
import DashboardMenu from '../DashboardMenu';

vi.mock('components/base/IconifyIcon.tsx', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="menu-icon">{icon}</span>,
}));

vi.mock('components/icons/EllipsisHorizontalIcon', () => ({
  default: () => <span data-testid="ellipsis-icon">...</span>,
}));

describe('<DashboardMenu />', () => {
  const mockMenuItems = [
    { label: 'Edit', icon: 'edit', onClick: vi.fn() },
    { label: 'Delete', icon: 'delete', onClick: vi.fn() },
  ];

  it('should render DashboardMenu', () => {
    render(<DashboardMenu menuItems={mockMenuItems} />);

    expect(screen.getByLabelText('more')).toBeInTheDocument();
  });

  it('should open menu when button is clicked', () => {
    render(<DashboardMenu menuItems={mockMenuItems} />);

    const button = screen.getByLabelText('more');
    fireEvent.click(button);

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should call onClick when menu item is clicked', () => {
    const mockOnClick = vi.fn();
    const items = [{ label: 'Test', onClick: mockOnClick }];

    render(<DashboardMenu menuItems={items} />);

    const button = screen.getByLabelText('more');
    fireEvent.click(button);

    const menuItem = screen.getByText('Test');
    fireEvent.click(menuItem);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should render with default icon', () => {
    render(<DashboardMenu menuItems={mockMenuItems} />);

    expect(screen.getByTestId('ellipsis-icon')).toBeInTheDocument();
  });

  it('should render menu items with icons', () => {
    render(<DashboardMenu menuItems={mockMenuItems} />);

    const button = screen.getByLabelText('more');
    fireEvent.click(button);

    const icons = screen.getAllByTestId('menu-icon');
    expect(icons.length).toBe(2);
  });
});

