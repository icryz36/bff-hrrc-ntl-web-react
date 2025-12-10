import { render, screen } from 'test-utils';
import CheckBoxBlankIcon from '../CheckBoxBlankIcon';

describe('<CheckBoxBlankIcon />', () => {
  it('should render CheckBoxBlankIcon', () => {
    render(<CheckBoxBlankIcon data-testid="checkbox-blank-icon" />);

    const icon = screen.getByTestId('checkbox-blank-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should apply custom sx styles', () => {
    render(<CheckBoxBlankIcon sx={{ color: 'primary.main' }} data-testid="checkbox-blank-icon" />);

    const icon = screen.getByTestId('checkbox-blank-icon');
    expect(icon).toBeInTheDocument();
  });
});




