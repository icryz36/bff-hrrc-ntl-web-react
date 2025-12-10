import { fireEvent, render, screen } from 'test-utils';
import { vi } from 'vitest';
import ProfileMenu from '../common/ProfileMenu';

vi.mock('react-router', () => ({
  useNavigate: vi.fn(() => vi.fn()),
}));

vi.mock('providers/AuthProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/AuthProvider')>();
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      sessionUser: null,
      signout: vi.fn(),
    })),
  };
});

vi.mock('providers/BreakpointsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/BreakpointsProvider')>();
  return {
    ...actual,
    useBreakpoints: vi.fn(() => ({
      up: vi.fn(() => true),
    })),
  };
});

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

vi.mock('components/base/StatusAvatar', () => ({
  default: ({ alt }: { alt: string }) => <div data-testid="avatar">{alt}</div>,
}));

describe('<ProfileMenu />', () => {
  it('should render ProfileMenu', () => {
    render(<ProfileMenu />);

    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('should open menu when button is clicked', () => {
    render(<ProfileMenu />);

    const button = screen.getByTestId('avatar').closest('button');
    if (button) {
      fireEvent.click(button);
      expect(screen.getByText('Sign Out')).toBeInTheDocument();
    }
  });
});
