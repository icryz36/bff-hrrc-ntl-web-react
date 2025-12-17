import { render, screen } from 'test-utils';
import AccordionCustom from '../AccordionCustom';

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

describe('<AccordionCustom />', () => {
  it('should render AccordionCustom with title', () => {
    render(
      <AccordionCustom title="Test Title" panelId="test-panel">
        <div>Test Content</div>
      </AccordionCustom>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render with icon', () => {
    render(
      <AccordionCustom title="Test Title" panelId="test-panel" icon="material-symbols:home">
        <div>Test Content</div>
      </AccordionCustom>,
    );

    const icons = screen.getAllByTestId('icon');
    expect(icons.length).toBeGreaterThan(0);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render without icon', () => {
    render(
      <AccordionCustom title="Test Title" panelId="test-panel">
        <div>Test Content</div>
      </AccordionCustom>,
    );

    // Only expand icon should be present, not custom icon
    const icons = screen.getAllByTestId('icon');
    expect(icons.length).toBe(1); // Only expand icon
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render with defaultExpanded true', () => {
    render(
      <AccordionCustom title="Test Title" panelId="test-panel" defaultExpanded>
        <div>Test Content</div>
      </AccordionCustom>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
