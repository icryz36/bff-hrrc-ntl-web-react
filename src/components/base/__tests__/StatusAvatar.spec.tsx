import { render, screen } from 'test-utils';
import StatusAvatar from '../StatusAvatar';

describe('<StatusAvatar />', () => {
  it('should render avatar with status prop', () => {
    render(<StatusAvatar status="online" data-testid="avatar" />);

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('should render avatar with offline status', () => {
    render(<StatusAvatar status="offline" data-testid="avatar" />);

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('should render avatar with children', () => {
    render(
      <StatusAvatar status="online" data-testid="avatar">
        JD
      </StatusAvatar>,
    );

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});



