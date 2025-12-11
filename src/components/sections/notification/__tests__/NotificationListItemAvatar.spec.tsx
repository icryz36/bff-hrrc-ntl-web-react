import { render, screen } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NotificationListItemAvatar from '../NotificationListItemAvatar';

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

const mockNotification = {
  id: '1',
  type: 'reaction_smile',
  user: [
    {
      id: '1',
      name: 'User 1',
      avatar: 'https://example.com/avatar1.jpg',
    },
  ],
  detail: 'Test notification',
  createdAt: new Date().toISOString(),
} as any;

describe('<NotificationListItemAvatar />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render NotificationListItemAvatar', () => {
    render(<NotificationListItemAvatar notification={mockNotification} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should render with small variant', () => {
    render(<NotificationListItemAvatar notification={mockNotification} variant="small" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should render with multiple users', () => {
    const notificationWithMultipleUsers = {
      ...mockNotification,
      user: [
        {
          id: '1',
          name: 'User 1',
          avatar: 'https://example.com/avatar1.jpg',
        },
        {
          id: '2',
          name: 'User 2',
          avatar: 'https://example.com/avatar2.jpg',
        },
      ],
    };

    render(<NotificationListItemAvatar notification={notificationWithMultipleUsers} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should render with non-reaction type', () => {
    const notificationWithOtherType = {
      ...mockNotification,
      type: 'comment',
    };

    render(<NotificationListItemAvatar notification={notificationWithOtherType} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
