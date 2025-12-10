import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CandidateListPage from '../CandidateListPage';

vi.mock('section/management-candidate/list-candidate/view/list-candidate-view', () => ({
  default: () => <div data-testid="list-candidate-view">ListCandidateView</div>,
}));

vi.mock('components/page-header/page-header', () => ({
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));

describe('<CandidateListPage />', () => {
  it('should render CandidateListPage', () => {
    render(<CandidateListPage />);
    expect(screen.getByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByText('List Candidate')).toBeInTheDocument();
    expect(screen.getByTestId('list-candidate-view')).toBeInTheDocument();
  });
});


