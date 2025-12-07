import { render, screen, fireEvent } from 'test-utils';
import { vi } from 'vitest';
import CustomTablePaginationAction from '../CustomTablePaginationAction';

vi.mock('providers/BreakpointsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/BreakpointsProvider')>();
  return {
    ...actual,
    useBreakpoints: vi.fn(() => ({
      up: vi.fn(() => true),
    })),
  };
});

vi.mock('react-router', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

describe('<CustomTablePaginationAction />', () => {
  const defaultProps = {
    page: 0,
    rowsPerPage: 10,
    count: 100,
    onPageChange: vi.fn(),
  };

  it('should render CustomTablePaginationAction', () => {
    render(<CustomTablePaginationAction {...defaultProps} />);

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('should call onPrevClick when Previous button is clicked', () => {
    const onPrevClick = vi.fn();
    render(<CustomTablePaginationAction {...defaultProps} page={1} onPrevClick={onPrevClick} />);

    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);

    expect(onPrevClick).toHaveBeenCalled();
  });

  it('should call onNextClick when Next button is clicked', () => {
    const onNextClick = vi.fn();
    render(<CustomTablePaginationAction {...defaultProps} onNextClick={onNextClick} />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(onNextClick).toHaveBeenCalled();
  });

  it('should disable Previous button when page is 0', () => {
    render(<CustomTablePaginationAction {...defaultProps} page={0} />);

    const prevButton = screen.getByText('Previous');
    expect(prevButton.closest('button')).toBeDisabled();
  });

  it('should disable Next button when on last page', () => {
    render(<CustomTablePaginationAction {...defaultProps} page={9} rowsPerPage={10} count={100} />);

    const nextButton = screen.getByText('Next');
    expect(nextButton.closest('button')).toBeDisabled();
  });

  it('should render full pagination when showFullPagination is true', () => {
    const { container } = render(
      <CustomTablePaginationAction {...defaultProps} showFullPagination={true} />,
    );

    const pagination = container.querySelector('.MuiPagination-root');
    expect(pagination).toBeInTheDocument();
  });
});

