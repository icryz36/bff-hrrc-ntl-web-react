import { render, screen } from 'test-utils';
import { RadioBlankIcon, RadioCheckedIcon } from '../RadioIcon';

describe('<RadioIcon />', () => {
  describe('RadioCheckedIcon', () => {
    it('should render RadioCheckedIcon', () => {
      render(<RadioCheckedIcon data-testid="radio-checked-icon" />);

      const icon = screen.getByTestId('radio-checked-icon');
      expect(icon).toBeInTheDocument();
    });

    it('should apply custom props', () => {
      render(<RadioCheckedIcon sx={{ color: 'primary.main' }} data-testid="radio-checked-icon" />);

      const icon = screen.getByTestId('radio-checked-icon');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('RadioBlankIcon', () => {
    it('should render RadioBlankIcon', () => {
      render(<RadioBlankIcon data-testid="radio-blank-icon" />);

      const icon = screen.getByTestId('radio-blank-icon');
      expect(icon).toBeInTheDocument();
    });

    it('should apply custom sx styles', () => {
      render(<RadioBlankIcon sx={{ color: 'primary.main' }} data-testid="radio-blank-icon" />);

      const icon = screen.getByTestId('radio-blank-icon');
      expect(icon).toBeInTheDocument();
    });
  });
});



