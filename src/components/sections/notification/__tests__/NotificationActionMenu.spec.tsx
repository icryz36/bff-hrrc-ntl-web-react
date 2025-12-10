import { fireEvent, render, screen, waitFor } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NotificationActionMenu from '../NotificationActionMenu';

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

describe('<NotificationActionMenu />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render NotificationActionMenu', () => {
    render(<NotificationActionMenu />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should open menu when button is clicked', async () => {
    render(<NotificationActionMenu />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Remove Notification')).toBeInTheDocument();
      expect(screen.getByText('Report issue')).toBeInTheDocument();
    });
  });

  it('should close menu when menu item is clicked', async () => {
    render(<NotificationActionMenu />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Remove Notification')).toBeInTheDocument();
    });

    const removeItem = screen.getByText('Remove Notification');
    fireEvent.click(removeItem);

    await waitFor(() => {
      expect(screen.queryByText('Remove Notification')).not.toBeInTheDocument();
    });
  });
});

