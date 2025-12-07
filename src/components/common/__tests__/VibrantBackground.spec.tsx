import { render } from 'test-utils';
import VibrantBackground from '../VibrantBackground';

describe('<VibrantBackground />', () => {
  it('should render VibrantBackground', () => {
    const { container } = render(<VibrantBackground />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render with position top', () => {
    const { container } = render(<VibrantBackground position="top" />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render with position side', () => {
    const { container } = render(<VibrantBackground position="side" />);

    expect(container.firstChild).toBeInTheDocument();
  });
});

