import { render, screen } from 'test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SidenavDrawerContent from '../SidenavDrawerContent';

vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  return {
    ...actual,
    useSettingsContext: vi.fn(() => ({
      config: {
        sidenavCollapsed: false,
        openNavbarDrawer: false,
        navigationMenuType: 'sidenav',
      },
      setConfig: vi.fn(),
    })),
  };
});

vi.mock('layouts/main-layout/NavProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('layouts/main-layout/NavProvider')>();
  return {
    ...actual,
    useNavContext: vi.fn(() => ({
      sidenavAppbarVariant: 'dense',
    })),
  };
});

vi.mock('./NavItem', () => ({
  default: () => <div data-testid="nav-item">NavItem</div>,
}));

vi.mock('./SidenavSimpleBar', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidenav-simple-bar">{children}</div>
  ),
}));

vi.mock('components/common/Logo', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

describe('<SidenavDrawerContent />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render SidenavDrawerContent', () => {
    render(<SidenavDrawerContent />);
    expect(screen.getByTestId('sidenav-simple-bar')).toBeInTheDocument();
  });

  it('should render with variant temporary', () => {
    render(<SidenavDrawerContent variant="temporary" />);
    expect(screen.getByTestId('sidenav-simple-bar')).toBeInTheDocument();
  });
});

