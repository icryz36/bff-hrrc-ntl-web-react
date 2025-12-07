import { render } from 'test-utils';
import { vi } from 'vitest';
import Splash from '../Splash';

vi.mock('lottie-react', () => ({
  default: ({ animationData }: { animationData: any }) => (
    <div data-testid="lottie-animation">{JSON.stringify(animationData)}</div>
  ),
}));

describe('<Splash />', () => {
  it('should render Splash', () => {
    const { container } = render(<Splash />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply custom sx styles', () => {
    const { container } = render(<Splash sx={{ color: 'primary.main' }} />);

    expect(container.firstChild).toBeInTheDocument();
  });
});

