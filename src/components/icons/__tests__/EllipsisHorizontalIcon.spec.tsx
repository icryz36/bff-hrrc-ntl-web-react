import { render, screen } from 'test-utils';
import EllipsisHorizontalIcon from '../EllipsisHorizontalIcon';

describe('<EllipsisHorizontalIcon />', () => {
  it('should render EllipsisHorizontalIcon', () => {
    render(<EllipsisHorizontalIcon data-testid="ellipsis-icon" />);

    const icon = screen.getByTestId('ellipsis-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should apply custom props', () => {
    render(<EllipsisHorizontalIcon sx={{ color: 'primary.main' }} data-testid="ellipsis-icon" />);

    const icon = screen.getByTestId('ellipsis-icon');
    expect(icon).toBeInTheDocument();
  });
});
