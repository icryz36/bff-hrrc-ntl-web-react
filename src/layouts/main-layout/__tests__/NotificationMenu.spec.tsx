import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import NotificationMenu from '../common/NotificationMenu';

vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  return {
    ...actual,
    useSettingsContext: vi.fn(() => ({
      config: {
        textDirection: 'ltr',
      },
    })),
  };
});

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

describe('<NotificationMenu />', () => {
  it('should render NotificationMenu', () => {
    render(<NotificationMenu />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should render with type prop', () => {
    render(<NotificationMenu type="slim" />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
