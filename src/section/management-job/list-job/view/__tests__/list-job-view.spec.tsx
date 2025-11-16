import { useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { useBoolean } from 'hooks/useBoolean';
import { useJobpostQuery } from 'services/jobpost/query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ListJobView from '../list-job-view';

// ---------------------------
// MOCKS
// ---------------------------
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

vi.mock('@mui/x-data-grid', () => ({
  useGridApiRef: vi.fn(),
}));

vi.mock('services/jobpost/query', () => ({
  useJobpostQuery: {
    list: vi.fn(),
  },
}));

vi.mock('hooks/useBoolean', () => ({
  useBoolean: vi.fn(),
}));

vi.mock('section/management-job/list-job/components/filter-section', () => ({
  default: ({ handleToggleFilterPanel }: any) => (
    <button data-testid="filter-btn" onClick={handleToggleFilterPanel}>
      Filter
    </button>
  ),
}));

vi.mock('section/management-job/list-job/view/list-job-table-view', () => ({
  default: ({ onPageChange }: any) => (
    <div>
      <button data-testid="goto-page-2" onClick={() => onPageChange({ page: 1, pageSize: 10 })}>
        Next Page
      </button>
    </div>
  ),
}));

vi.mock('components/custom-confirm-dialog/CustomDialog', () => ({
  default: ({ open }: any) => (open ? <div data-testid="dialog">Dialog Open</div> : null),
}));

// ---------------------------
// TESTS
// ---------------------------
describe('ListJobView', () => {
  beforeEach(() => {
    // default mock apiRef
    (useGridApiRef as any).mockReturnValue({
      current: {
        showFilterPanel: vi.fn(),
        hideFilterPanel: vi.fn(),
      },
    });

    // default mock boolean hook
    (useBoolean as any).mockReturnValue({
      value: false,
      onFalse: vi.fn(),
      onTrue: vi.fn(),
    });

    // default mock list query
    (useJobpostQuery.list as any).mockReturnValue({
      queryKey: ['test-list'],
      queryFn: vi.fn(),
    });

    // default mock useQuery return
    (useQuery as any).mockReturnValue({
      data: {
        items: [{ id: 1, title: 'Job A' }],
        pagination: { totalRecords: 20 },
      },
      isLoading: false,
    });
  });

  it('should render create job button', () => {
    render(<ListJobView />);
    expect(screen.getByText('Create Job')).toBeInTheDocument();
  });

  it('should call showFilterPanel when clicking filter button', () => {
    const api = useGridApiRef();

    render(<ListJobView />);

    const btn = screen.getByTestId('filter-btn');
    fireEvent.click(btn);

    expect(api.current!.showFilterPanel).toHaveBeenCalled();
  });

  it('should change page when clicking next page', () => {
    render(<ListJobView />);

    fireEvent.click(screen.getByTestId('goto-page-2'));

    expect(screen.getByText('Create Job')).toBeInTheDocument();
  });

  it('should display confirm dialog when open=true', () => {
    (useBoolean as any).mockReturnValue({
      value: true,
      onFalse: vi.fn(),
      onTrue: vi.fn(),
    });

    render(<ListJobView />);

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
  });
});
