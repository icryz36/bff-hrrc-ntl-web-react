import { render, screen } from 'test-utils';
import { vi } from 'vitest';
import PageHeader from '../page-header';

vi.mock('providers/BreakpointsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/BreakpointsProvider')>();
  return {
    ...actual,
    useBreakpoints: vi.fn(() => ({
      down: vi.fn(() => false),
      up: vi.fn(() => true),
    })),
  };
});

vi.mock('components/sections/common/PageBreadcrumb', () => ({
  default: ({ items }: { items: any[] }) => (
    <div data-testid="breadcrumb">{items.map((item) => item.label).join(' > ')}</div>
  ),
}));

vi.mock('components/sections/common/PageContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="page-content">{children}</div>,
}));

describe('<PageHeader />', () => {
  it('should render PageHeader with title', () => {
    render(<PageHeader title="Test Title" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render with breadcrumb', () => {
    const breadcrumb = [
      { label: 'Home', url: '/' },
      { label: 'Page', active: true },
    ];

    render(<PageHeader title="Test Title" breadcrumb={breadcrumb} />);

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render with actionComponent', () => {
    const actionComponent = <button>Action Button</button>;

    render(<PageHeader title="Test Title" actionComponent={actionComponent} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });

  it('should render without breadcrumb', () => {
    render(<PageHeader title="Test Title" />);

    expect(screen.queryByTestId('breadcrumb')).not.toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});

