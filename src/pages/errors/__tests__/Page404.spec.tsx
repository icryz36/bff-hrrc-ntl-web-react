import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Page404 from '../Page404';

vi.mock('hooks/useThemeMode', () => ({
  useThemeMode: vi.fn(() => ({
    isDark: false,
  })),
}));

vi.mock('lottie-react', () => ({
  default: ({ animationData }: { animationData: any }) => (
    <div data-testid="lottie-animation">{JSON.stringify(animationData)}</div>
  ),
}));

describe('<Page404 />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Page404 component', () => {
    render(<Page404 />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText(/while our bear is searching everywhere/)).toBeInTheDocument();
    expect(screen.getByText('Go Back Home')).toBeInTheDocument();
  });

  it('should render Lottie animation', () => {
    render(<Page404 />);
    expect(screen.getByTestId('lottie-animation')).toBeInTheDocument();
  });

  it('should render Go Back Home button with href', () => {
    render(<Page404 />);
    const button = screen.getByText('Go Back Home');
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/');
  });
});
