import { render, screen } from 'test-utils';
import CheckBoxIndeterminateIcon from '../CheckBoxIndeterminateIcon';

describe('<CheckBoxIndeterminateIcon />', () => {
  it('should render CheckBoxIndeterminateIcon', () => {
    render(<CheckBoxIndeterminateIcon data-testid="checkbox-indeterminate-icon" />);

    const icon = screen.getByTestId('checkbox-indeterminate-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should apply custom props', () => {
    render(
      <CheckBoxIndeterminateIcon
        sx={{ color: 'primary.main' }}
        data-testid="checkbox-indeterminate-icon"
      />,
    );

    const icon = screen.getByTestId('checkbox-indeterminate-icon');
    expect(icon).toBeInTheDocument();
  });
});



