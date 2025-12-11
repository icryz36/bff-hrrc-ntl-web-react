import { TabContext } from '@mui/lab';
import { render, screen } from 'test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NotificationTabPanel from '../NotificationTabPanel';

vi.mock('dayjs', () => {
  const todayDate = new Date('2024-01-15T10:00:00Z');

  const createMockInstance = (date?: string) => {
    const instanceDate = date ? new Date(date) : todayDate;
    const instanceDateStr = instanceDate.toISOString().split('T')[0];
    const todayDateStr = todayDate.toISOString().split('T')[0];

    return {
      diff: vi.fn((other: any) => {
        if (other && typeof other === 'object' && other._dateStr) {
          return other._dateStr === todayDateStr ? 0 : 1;
        }

        return instanceDateStr === todayDateStr ? 0 : 1;
      }),
      fromNow: vi.fn(() => '2 hours ago'),
      _date: instanceDate,
      _dateStr: instanceDateStr,
    };
  };

  const mockDayjs = vi.fn((date?: string) => {
    return createMockInstance(date);
  });

  const defaultInstance = createMockInstance();
  Object.assign(mockDayjs, defaultInstance);

  return { default: mockDayjs };
});

vi.mock('../NotificationList', () => ({
  default: ({ title, notifications }: { title: string; notifications: any[] }) => (
    <div data-testid="notification-list">
      <div data-testid="list-title">{title}</div>
      <div data-testid="list-count">{notifications.length}</div>
    </div>
  ),
}));

const mockNotifications = [
  {
    id: '1',
    type: 'comment',
    user: [{ id: '1', name: 'User 1', avatar: 'https://example.com/avatar1.jpg' }],
    detail: 'Today notification',
    createdAt: '2024-01-15T10:00:00Z',
    readAt: null,
  },
  {
    id: '2',
    type: 'reaction_smile',
    user: [{ id: '2', name: 'User 2', avatar: 'https://example.com/avatar2.jpg' }],
    detail: 'Older notification',
    createdAt: '2024-01-14T10:00:00Z',
    readAt: null,
  },
] as any;

describe('<NotificationTabPanel />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render NotificationTabPanel', () => {
    render(
      <TabContext value="all">
        <NotificationTabPanel value="all" notificationsData={mockNotifications} />
      </TabContext>,
    );
    expect(screen.getAllByTestId('notification-list').length).toBeGreaterThan(0);
  });

  it('should separate notifications into today and older', () => {
    render(
      <TabContext value="all">
        <NotificationTabPanel value="all" notificationsData={mockNotifications} />
      </TabContext>,
    );
    const lists = screen.getAllByTestId('notification-list');
    expect(lists.length).toBeGreaterThan(0);
  });

  it('should render Load more button when notifications length > 10', () => {
    const manyNotifications = Array.from({ length: 11 }, (_, i) => ({
      ...mockNotifications[0],
      id: String(i + 1),
    }));

    render(
      <TabContext value="all">
        <NotificationTabPanel value="all" notificationsData={manyNotifications} />
      </TabContext>,
    );
    expect(screen.getByText('Load more notifications')).toBeInTheDocument();
  });

  it('should not render Load more button when notifications length <= 10', () => {
    render(
      <TabContext value="all">
        <NotificationTabPanel value="all" notificationsData={mockNotifications} />
      </TabContext>,
    );
    expect(screen.queryByText('Load more notifications')).not.toBeInTheDocument();
  });
});
