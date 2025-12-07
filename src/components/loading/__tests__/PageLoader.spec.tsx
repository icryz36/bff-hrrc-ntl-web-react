import { render, screen } from 'test-utils';
import PageLoader from '../PageLoader';

describe('<PageLoader />', () => {
  it('should render PageLoader', () => {
    const { container } = render(<PageLoader />);

    const progress = container.querySelectorAll('.MuiCircularProgress-root');
    expect(progress.length).toBeGreaterThan(0);
  });

  it('should apply custom sx styles', () => {
    const { container } = render(<PageLoader sx={{ color: 'primary.main' }} />);

    const progress = container.querySelectorAll('.MuiCircularProgress-root');
    expect(progress.length).toBeGreaterThan(0);
  });
});

