import { render, screen } from 'test-utils';
import StyledTextField from '../StyledTextField';

describe('<StyledTextField />', () => {
  it('should render StyledTextField', () => {
    render(<StyledTextField label="Test Label" />);

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<StyledTextField label="Test Label" placeholder="Enter text" />);

    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should render with value', () => {
    render(<StyledTextField label="Test Label" value="Test Value" />);

    expect(screen.getByDisplayValue('Test Value')).toBeInTheDocument();
  });

  it('should render with disabledSpinButton prop', () => {
    render(<StyledTextField label="Test Label" type="number" disabledSpinButton />);

    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
  });

  it('should render with size prop', () => {
    render(<StyledTextField label="Test Label" size="small" />);

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should render with variant prop', () => {
    render(<StyledTextField label="Test Label" variant="outlined" />);

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });
});



