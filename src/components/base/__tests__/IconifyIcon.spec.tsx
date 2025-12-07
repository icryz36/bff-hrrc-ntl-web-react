import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import IconifyIcon from '../IconifyIcon';

vi.mock('@iconify/react', () => ({
  Icon: ({ icon, ...props }: any) => <span data-testid="iconify-icon" data-icon={icon} {...props} />,
}));

describe('<IconifyIcon />', () => {
  it('should render icon with icon prop', () => {
    render(<IconifyIcon icon="material-symbols:home" />);

    const icon = screen.getByTestId('iconify-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-icon', 'material-symbols:home');
  });

  it('should apply custom sx styles', () => {
    render(<IconifyIcon icon="material-symbols:home" sx={{ color: 'primary.main', fontSize: 24 }} />);

    const icon = screen.getByTestId('iconify-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should handle flipOnRTL prop when true', () => {
    render(<IconifyIcon icon="material-symbols:arrow-forward" flipOnRTL />);

    const icon = screen.getByTestId('iconify-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should handle flipOnRTL prop when false', () => {
    render(<IconifyIcon icon="material-symbols:arrow-forward" flipOnRTL={false} />);

    const icon = screen.getByTestId('iconify-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should handle sx as array', () => {
    render(<IconifyIcon icon="material-symbols:home" sx={[{ color: 'primary.main' }, { fontSize: 24 }]} />);

    const icon = screen.getByTestId('iconify-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should handle sx as object', () => {
    render(<IconifyIcon icon="material-symbols:home" sx={{ color: 'primary.main' }} />);

    const icon = screen.getByTestId('iconify-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should handle sx as undefined', () => {
    render(<IconifyIcon icon="material-symbols:home" />);

    const icon = screen.getByTestId('iconify-icon');
    expect(icon).toBeInTheDocument();
  });
});

