import { render, screen } from 'test-utils';
import SimpleBar from '../SimpleBar';

describe('<SimpleBar />', () => {
  it('should render SimpleBar with children', () => {
    render(
      <SimpleBar data-testid="simplebar">
        <div>Test Content</div>
      </SimpleBar>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render SimpleBar with multiple children', () => {
    render(
      <SimpleBar data-testid="simplebar">
        <div>Item 1</div>
        <div>Item 2</div>
      </SimpleBar>,
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should handle disableHorizontal prop', () => {
    render(
      <SimpleBar disableHorizontal data-testid="simplebar">
        <div>Content</div>
      </SimpleBar>,
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});


