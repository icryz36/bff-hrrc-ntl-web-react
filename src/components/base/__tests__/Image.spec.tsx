import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import Image from '../Image';

vi.mock('hooks/useThemeMode', () => ({
  useThemeMode: vi.fn(() => ({
    isDark: false,
    mode: 'light',
    systemMode: 'light',
    setThemeMode: vi.fn(),
    resetTheme: vi.fn(),
  })),
}));

describe('<Image />', () => {
  it('should render image with string src', () => {
    render(<Image src="https://example.com/image.jpg" alt="test image" data-testid="image" />);

    const image = screen.getByTestId('image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'test image');
  });

  it('should render image with theme-aware src in light mode', async () => {
    const { useThemeMode } = await import('hooks/useThemeMode');
    vi.mocked(useThemeMode).mockReturnValue({
      isDark: false,
      mode: 'light',
      systemMode: 'light',
      setThemeMode: vi.fn(),
      resetTheme: vi.fn(),
    });

    render(
      <Image
        src={{ light: 'https://example.com/light.jpg', dark: 'https://example.com/dark.jpg' }}
        alt="theme image"
        data-testid="image"
      />,
    );

    const image = screen.getByTestId('image');
    expect(image).toHaveAttribute('src', 'https://example.com/light.jpg');
  });

  it('should render image with theme-aware src in dark mode', async () => {
    const { useThemeMode } = await import('hooks/useThemeMode');
    vi.mocked(useThemeMode).mockReturnValue({
      isDark: true,
      mode: 'dark',
      systemMode: 'dark',
      setThemeMode: vi.fn(),
      resetTheme: vi.fn(),
    });

    render(
      <Image
        src={{ light: 'https://example.com/light.jpg', dark: 'https://example.com/dark.jpg' }}
        alt="theme image"
        data-testid="image"
      />,
    );

    const image = screen.getByTestId('image');
    expect(image).toHaveAttribute('src', 'https://example.com/dark.jpg');
  });

  it('should handle missing src', () => {
    render(<Image alt="no src" data-testid="image" />);

    const image = screen.getByTestId('image');
    expect(image).toBeInTheDocument();
    expect(image).not.toHaveAttribute('src');
  });
});



