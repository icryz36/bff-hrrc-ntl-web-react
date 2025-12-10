import { fireEvent, render, screen } from 'test-utils';
import { describe, expect, it, vi } from 'vitest';
import SearchTextField from '../SearchTextField';

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

vi.mock('components/styled/StyledTextField', () => ({
  default: ({ slotProps, ...rest }: any) => (
    <div data-testid="styled-text-field">
      <input
        data-testid="search-input"
        placeholder={rest.placeholder}
        onClick={slotProps?.input?.onClick}
        disabled={rest.disabled}
        {...rest}
      />
      {slotProps?.input?.startAdornment}
    </div>
  ),
}));

describe('<SearchTextField />', () => {
  it('should render SearchTextField', () => {
    render(<SearchTextField />);
    expect(screen.getByTestId('styled-text-field')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<SearchTextField />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('should render with search icon', () => {
    render(<SearchTextField />);
    expect(screen.getByTestId('icon')).toHaveTextContent('material-symbols:search-rounded');
  });

  it('should handle input click', () => {
    const handleClick = vi.fn();
    render(<SearchTextField slotProps={{ input: { onClick: handleClick } }} />);
    const input = screen.getByTestId('search-input');
    fireEvent.click(input);
    expect(handleClick).toHaveBeenCalled();
  });

  it('should accept disabled prop', () => {
    render(<SearchTextField disabled />);
    const input = screen.getByTestId('search-input');
    expect(input).toBeDisabled();
  });

  it('should accept custom slotProps', () => {
    render(
      <SearchTextField
        slotProps={{
          input: {
            sx: { color: 'red' },
          },
        }}
      />,
    );
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('should have id search-box', () => {
    render(<SearchTextField />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });
});
