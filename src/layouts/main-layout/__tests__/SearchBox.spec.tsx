import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import SearchBox, { SearchBoxButton } from '../common/search-box/SearchBox';

vi.mock('../common/search-box/SearchTextField', () => ({
  default: ({ slotProps }: any) => (
    <input
      data-testid="search-textfield"
      onClick={slotProps?.input?.onClick}
      disabled={slotProps?.input?.disabled}
    />
  ),
}));

vi.mock('../common/search-box/SearchPopover', () => ({
  default: ({ anchorEl }: { anchorEl: any }) => (
    <div data-testid="search-popover">{anchorEl ? 'Open' : 'Closed'}</div>
  ),
}));

vi.mock('../common/search-box/SearchDialog', () => ({
  default: ({ anchorEl }: { anchorEl: any }) => (
    <div data-testid="search-dialog">{anchorEl ? 'Open' : 'Closed'}</div>
  ),
}));

const mockUp = vi.fn(() => true);

vi.mock('providers/BreakpointsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/BreakpointsProvider')>();
  return {
    ...actual,
    useBreakpoints: vi.fn(() => ({
      up: mockUp,
    })),
  };
});

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

describe('<SearchBox />', () => {
  it('should render SearchBox', () => {
    render(<SearchBox />);

    expect(screen.getByTestId('search-textfield')).toBeInTheDocument();
  });
});

describe('<SearchBoxButton />', () => {
  it('should render SearchBoxButton', () => {
    mockUp.mockReturnValue(false);
    render(<SearchBoxButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render with type prop', () => {
    mockUp.mockReturnValue(true);
    render(<SearchBoxButton type="slim" />);

    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
