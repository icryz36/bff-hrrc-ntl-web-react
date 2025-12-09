import { render, screen } from 'test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SidenavSimpleBar from '../SidenavSimpleBar';

vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  return {
    ...actual,
    useSettingsContext: vi.fn(() => ({
      config: {
        navColor: 'default',
      },
    })),
  };
});

vi.mock('hooks/useThemeMode', () => ({
  useThemeMode: vi.fn(() => ({
    isDark: false,
  })),
}));

vi.mock('components/base/SimpleBar', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="simple-bar">{children}</div>
  ),
}));

describe('<SidenavSimpleBar />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render SidenavSimpleBar with children', () => {
    render(
      <SidenavSimpleBar>
        <div>Test Content</div>
      </SidenavSimpleBar>,
    );
    expect(screen.getByTestId('simple-bar')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});

