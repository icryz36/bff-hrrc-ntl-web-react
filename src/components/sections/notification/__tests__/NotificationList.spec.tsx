import { render, screen } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NotificationList from '../NotificationList';

vi.mock('react-router', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('dayjs', () => {
  const mockDayjs = () => {
    const instance = {
      fromNow: vi.fn(() => '2 hours ago'),
      diff: vi.fn(() => 0),
    };
    return instance;
  };

  mockDayjs.extend = vi.fn(() => mockDayjs);
  return { default: mockDayjs };
});

vi.mock('../NotificationActionMenu', () => ({
  default: () => <div data-testid="action-menu">Action Menu</div>,
}));

vi.mock('../NotificationListItemAvatar', () => ({
  default: () => <div data-testid="avatar">Avatar</div>,
}));

vi.mock('components/base/Image', () => ({
  default: ({ src }: { src: string }) => <img src={src} alt="notification" data-testid="image" />,
}));

const mockNotifications = [
  {
    id: '1',
    type: 'comment',
    user: [
      {
        id: '1',
        name: 'User 1',
        avatar: 'https://example.com/avatar1.jpg',
      },
    ],
    detail: 'Test notification 1',
    createdAt: new Date().toISOString(),
    readAt: null,
  },
  {
    id: '2',
    type: 'reaction_smile',
    user: [
      {
        id: '2',
        name: 'User 2',
        avatar: 'https://example.com/avatar2.jpg',
      },
    ],
    detail: 'Test notification 2',
    createdAt: new Date().toISOString(),
    readAt: new Date().toISOString(),
  },
] as any;

describe('<NotificationList />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render NotificationList with notifications', () => {
    render(<NotificationList title="Today" notifications={mockNotifications} />);
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Test notification 1')).toBeInTheDocument();
    expect(screen.getByText('Test notification 2')).toBeInTheDocument();
  });

  it('should not render when notifications is empty', () => {
    const { container } = render(<NotificationList title="Today" notifications={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render with small variant', () => {
    render(<NotificationList title="Today" notifications={mockNotifications} variant="small" />);
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('should render with images', () => {
    const notificationsWithImages = [
      {
        ...mockNotifications[0],
        images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
      },
    ];

    render(<NotificationList title="Today" notifications={notificationsWithImages} />);
    expect(screen.getAllByTestId('image').length).toBeGreaterThan(0);
  });

  it('should render action buttons for friend_request type', () => {
    const friendRequestNotification = [
      {
        ...mockNotifications[0],
        type: 'friend_request',
      },
    ];

    render(<NotificationList title="Today" notifications={friendRequestNotification} />);
    expect(screen.getByText('Accept')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should accept onItemClick prop', () => {
    const mockOnItemClick = vi.fn();
    render(
      <NotificationList
        title="Today"
        notifications={mockNotifications}
        onItemClick={mockOnItemClick}
      />,
    );

    expect(screen.getByText('Test notification 1')).toBeInTheDocument();
  });
});
