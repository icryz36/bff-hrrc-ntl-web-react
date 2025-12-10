import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CandidateImportPage from '../CandidateImportPage';

vi.mock('section/management-candidate/view/import-candidate-view', () => ({
  default: () => <div data-testid="import-candidate-view">ImportCandidateView</div>,
}));

vi.mock('components/page-header/page-header', () => ({
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));

describe('<CandidateImportPage />', () => {
  it('should render CandidateImportPage', () => {
    render(<CandidateImportPage />);
    expect(screen.getByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByText('Import Candidate')).toBeInTheDocument();
    expect(screen.getByTestId('import-candidate-view')).toBeInTheDocument();
  });
});


