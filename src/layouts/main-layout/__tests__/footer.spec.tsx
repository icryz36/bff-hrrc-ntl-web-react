import { render, screen } from 'test-utils';
import Footer from '../footer';

describe('<Footer />', () => {
  it('should render Footer', () => {
    render(<Footer />);

    expect(
      screen.getByText(/© NTL - Recruitment Lead Management System 2025/),
    ).toBeInTheDocument();
  });
});
