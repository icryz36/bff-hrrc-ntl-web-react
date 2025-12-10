import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import AppbarActionItems from '../common/AppbarActionItems';

vi.mock('../common/NotificationMenu', () => ({
  default: () => <div data-testid="notification-menu">NotificationMenu</div>,
}));

vi.mock('../common/ProfileMenu', () => ({
  default: () => <div data-testid="profile-menu">ProfileMenu</div>,
}));

describe('<AppbarActionItems />', () => {
  it('should render AppbarActionItems', () => {
    render(<AppbarActionItems />);

    expect(screen.getByTestId('notification-menu')).toBeInTheDocument();
    expect(screen.getByTestId('profile-menu')).toBeInTheDocument();
  });

  it('should render with type prop', () => {
    render(<AppbarActionItems type="slim" />);

    expect(screen.getByTestId('notification-menu')).toBeInTheDocument();
    expect(screen.getByTestId('profile-menu')).toBeInTheDocument();
  });
});
