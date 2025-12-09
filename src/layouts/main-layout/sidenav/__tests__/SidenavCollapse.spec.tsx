import { render, screen, fireEvent } from 'test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SidenavCollapse from '../SidenavCollapse';

vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  return {
    ...actual,
    useSettingsContext: vi.fn(() => ({
      config: {
        sidenavCollapsed: false,
        textDirection: 'ltr',
      },
      toggleNavbarCollapse: vi.fn(),
    })),
  };
});

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((callback: () => void) => {
    callback();
  }),
}));

vi.mock('gsap', async (importOriginal) => {
  const actual = await importOriginal<typeof import('gsap')>();
  return {
    ...actual,
    default: {
      ...actual.default,
      to: vi.fn(),
      registerPlugin: vi.fn(),
    },
  };
});

vi.mock('gsap/MorphSVGPlugin', () => ({
  MorphSVGPlugin: {},
  default: {},
}));

describe('<SidenavCollapse />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render SidenavCollapse', () => {
    render(<SidenavCollapse />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should call toggleNavbarCollapse when clicked', async () => {
    const mockToggleNavbarCollapse = vi.fn();
    const SettingsProvider = await import('providers/SettingsProvider');
    vi.mocked(SettingsProvider.useSettingsContext).mockReturnValue({
      config: {
        sidenavCollapsed: false,
        textDirection: 'ltr',
      },
      toggleNavbarCollapse: mockToggleNavbarCollapse,
    } as any);

    render(<SidenavCollapse />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockToggleNavbarCollapse).toHaveBeenCalled();
  });
});

