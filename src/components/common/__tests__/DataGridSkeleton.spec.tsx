import { render, screen } from 'test-utils';
import DataGridSkeleton from '../DataGridSkeleton';

describe('<DataGridSkeleton />', () => {
  it('should render DataGridSkeleton with default rows', () => {
    const { container } = render(<DataGridSkeleton />);

    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBe(3);
  });

  it('should render with custom rows', () => {
    const { container } = render(<DataGridSkeleton rows={5} />);

    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBe(5);
  });

  it('should render with message', () => {
    render(<DataGridSkeleton message="Loading data..." />);

    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('should not render message when not provided', () => {
    render(<DataGridSkeleton />);

    expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
  });
});
