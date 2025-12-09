import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import NavProvider, { useNavContext } from '../NavProvider';

vi.mock('react-router', () => ({
  useLocation: vi.fn(() => ({
    pathname: '/',
  })),
}));

vi.mock('providers/BreakpointsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/BreakpointsProvider')>();
  return {
    ...actual,
    useBreakpoints: vi.fn(() => ({
      currentBreakpoint: 'lg',
      down: vi.fn(() => false),
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
        sidenavCollapsed: false,
        navigationMenuType: 'sidenav',
        topnavType: 'default',
        sidenavType: 'default',
      },
      setConfig: vi.fn(),
      configDispatch: vi.fn(),
    })),
  };
});

const TestComponent = () => {
  const { openItems, setOpenItems } = useNavContext();
  return (
    <div>
      <div data-testid="open-items">{openItems.length}</div>
      <button onClick={() => setOpenItems(['test'])}>Set Items</button>
    </div>
  );
};

describe('<NavProvider />', () => {
  it('should render NavProvider with children', () => {
    render(
      <NavProvider>
        <div>Test Content</div>
      </NavProvider>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should provide nav context', () => {
    render(
      <NavProvider>
        <TestComponent />
      </NavProvider>,
    );

    expect(screen.getByTestId('open-items')).toBeInTheDocument();
  });
});


