import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CandidateDatailPage from '../CandidateDetailPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('hooks/useBoolean', () => ({
  useBoolean: vi.fn(() => ({
    value: false,
    onTrue: vi.fn(),
    onFalse: vi.fn(),
  })),
}));

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

vi.mock('section/management-candidate/candidate-detail/components/apply-to-other-job-dialog', () => ({
  default: ({ open, onClose }: { open: boolean; onClose: () => void }) => (
    <div data-testid="apply-dialog">
      {open ? 'Dialog Open' : 'Dialog Closed'}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

vi.mock('section/management-candidate/candidate-detail/view/candidate-detail-view', () => ({
  default: () => <div data-testid="candidate-detail-view">CandidateDetailView</div>,
}));

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

vi.mock('components/sections/common/PageContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-content">{children}</div>
  ),
}));

describe('<CandidateDatailPage />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render CandidateDatailPage', () => {
    render(
      <MemoryRouter>
        <CandidateDatailPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Candidate Detail')).toBeInTheDocument();
    expect(screen.getByText('Applied Job')).toBeInTheDocument();
    expect(screen.getByTestId('candidate-detail-view')).toBeInTheDocument();
  });

  it('should call navigate(-1) when back button is clicked', () => {
    render(
      <MemoryRouter>
        <CandidateDatailPage />
      </MemoryRouter>,
    );
    const backButton = screen.getByLabelText('back');
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});


