import { render, screen } from 'test-utils';
import CheckBoxCheckedIcon from '../CheckBoxCheckedIcon';

describe('<CheckBoxCheckedIcon />', () => {
  it('should render CheckBoxCheckedIcon', () => {
    render(<CheckBoxCheckedIcon data-testid="checkbox-checked-icon" />);

    const icon = screen.getByTestId('checkbox-checked-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should apply custom props', () => {
    render(
      <CheckBoxCheckedIcon sx={{ color: 'primary.main' }} data-testid="checkbox-checked-icon" />,
    );

    const icon = screen.getByTestId('checkbox-checked-icon');
    expect(icon).toBeInTheDocument();
  });
});
