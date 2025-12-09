import { render, screen } from 'test-utils';
import TableLabelDisplayedRows from '../TableLabelDisplayedRows';

describe('<TableLabelDisplayedRows />', () => {
  it('should render TableLabelDisplayedRows', () => {
    render(<TableLabelDisplayedRows from={1} to={10} count={100} />);

    expect(screen.getByText(/1-10 out of 100/i)).toBeInTheDocument();
  });

  it('should render with different values', () => {
    render(<TableLabelDisplayedRows from={11} to={20} count={50} />);

    expect(screen.getByText(/11-20 out of 50/i)).toBeInTheDocument();
  });

  it('should render with showing text on larger screens', () => {
    render(<TableLabelDisplayedRows from={1} to={10} count={100} />);

    expect(screen.getByText(/1-10 out of 100/i)).toBeInTheDocument();
  });
});



