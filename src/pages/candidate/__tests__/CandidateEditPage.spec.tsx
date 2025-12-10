import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CandidateEditPage from '../CandidateEditPage';

const mockNavigate = vi.fn();

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('section/management-candidate/edit-candidate/view/edit-candidate-view', () => ({
  EditCandidateView: () => <div data-testid="edit-candidate-view">EditCandidateView</div>,
}));

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>,
}));

vi.mock('components/page-header/page-header', () => ({
  default: ({ title, actionComponent }: { title: string; actionComponent?: React.ReactNode }) => (
    <div data-testid="page-header">
      {title}
      {actionComponent}
    </div>
  ),
}));

vi.mock('components/sections/common/PageContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-content">{children}</div>
  ),
}));

describe('<CandidateEditPage />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render CandidateEditPage', () => {
    render(
      <MemoryRouter>
        <CandidateEditPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Edit Candidate Detail')).toBeInTheDocument();
    expect(screen.getByTestId('edit-candidate-view')).toBeInTheDocument();
  });

  it('should call navigate(-1) when back button is clicked', () => {
    render(
      <MemoryRouter>
        <CandidateEditPage />
      </MemoryRouter>,
    );
    const backButton = screen.getByLabelText('back');
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
