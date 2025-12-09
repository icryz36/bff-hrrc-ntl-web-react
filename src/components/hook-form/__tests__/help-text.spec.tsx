import { render, screen } from 'test-utils';
import { HelperText } from '../help-text';

describe('<HelperText />', () => {
  it('should render HelperText with helperText', () => {
    render(<HelperText helperText="This is helper text" />);

    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('should render HelperText with errorMessage', () => {
    render(<HelperText errorMessage="This is an error" />);

    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('should not render when no message provided', () => {
    const { container } = render(<HelperText />);

    expect(container.firstChild).toBeNull();
  });

  it('should prioritize errorMessage over helperText', () => {
    render(<HelperText helperText="Helper text" errorMessage="Error message" />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  it('should render with disableGutters', () => {
    render(<HelperText helperText="Helper text" disableGutters />);

    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });
});


