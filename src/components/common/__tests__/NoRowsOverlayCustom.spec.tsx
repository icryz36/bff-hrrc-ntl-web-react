import { render, screen } from 'test-utils';
import NoRowsOverlayCustom from '../NoRowsOverlayCustom';

describe('<NoRowsOverlayCustom />', () => {
  it('should render NoRowsOverlayCustom with message', () => {
    render(<NoRowsOverlayCustom message="No data available" />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should render with custom message', () => {
    render(<NoRowsOverlayCustom message="Custom message" />);

    expect(screen.getByText('Custom message')).toBeInTheDocument();
  });
});



