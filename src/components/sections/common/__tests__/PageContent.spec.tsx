import { render, screen } from 'test-utils';
import PageContent from '../PageContent';

describe('<PageContent />', () => {
  it('should render PageContent with children', () => {
    render(
      <PageContent>
        <div>Test Content</div>
      </PageContent>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render multiple children', () => {
    render(
      <PageContent>
        <div>First</div>
        <div>Second</div>
      </PageContent>,
    );

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });
});
