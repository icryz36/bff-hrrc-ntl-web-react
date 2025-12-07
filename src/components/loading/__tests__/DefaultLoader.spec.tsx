import { render, screen } from 'test-utils';
import DefaultLoader from '../DefaultLoader';

describe('<DefaultLoader />', () => {
  it('should render DefaultLoader', () => {
    const { container } = render(<DefaultLoader />);

    const progress = container.querySelector('.MuiCircularProgress-root');
    expect(progress).toBeInTheDocument();
  });
});

