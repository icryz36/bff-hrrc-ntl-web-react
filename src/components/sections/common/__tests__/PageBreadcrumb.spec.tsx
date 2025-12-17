import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import PageBreadcrumb from '../PageBreadcrumb';

vi.mock('react-router', () => ({
  Link: ({ children, to, ...props }: { children: React.ReactNode; to?: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe('<PageBreadcrumb />', () => {
  const mockItems = [
    { label: 'Home', url: '/home' },
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Current Page', active: true },
  ];

  it('should render PageBreadcrumb with items', () => {
    render(<PageBreadcrumb items={mockItems} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('should render active item without link', () => {
    render(<PageBreadcrumb items={mockItems} />);

    const activeItem = screen.getByText('Current Page');
    expect(activeItem).toHaveAttribute('aria-current', 'page');
  });

  it('should render with sx prop', () => {
    const { container } = render(<PageBreadcrumb items={mockItems} sx={{ mb: 2 }} />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
