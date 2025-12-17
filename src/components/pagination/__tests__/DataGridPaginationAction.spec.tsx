import { fireEvent, render, screen } from 'test-utils';
import { vi } from 'vitest';
import DataGridPaginationAction from '../DataGridPaginationAction';

const mockApiRef = {
  current: {
    setPage: vi.fn(),
    setPageSize: vi.fn(),
  },
};

vi.mock('@mui/x-data-grid', () => ({
  useGridApiContext: vi.fn(() => mockApiRef),
  useGridRootProps: vi.fn(() => ({
    initialState: {
      pagination: {
        paginationModel: {
          pageSize: 10,
        },
      },
    },
  })),
}));

vi.mock('react-router', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('providers/BreakpointsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/BreakpointsProvider')>();
  return {
    ...actual,
    useBreakpoints: vi.fn(() => ({
      up: vi.fn(() => true),
    })),
  };
});

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

describe('<DataGridPaginationAction />', () => {
  const defaultProps = {
    page: 0,
    rowsPerPage: 10,
    count: 100,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render DataGridPaginationAction', () => {
    render(<DataGridPaginationAction {...defaultProps} />);

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('should call setPage when Next is clicked', () => {
    render(<DataGridPaginationAction {...defaultProps} />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockApiRef.current.setPage).toHaveBeenCalledWith(1);
  });

  it('should call setPage when Previous is clicked', () => {
    render(<DataGridPaginationAction {...defaultProps} page={1} />);

    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);

    expect(mockApiRef.current.setPage).toHaveBeenCalledWith(0);
  });
});
