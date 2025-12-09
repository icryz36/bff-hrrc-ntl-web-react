import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DuplicateJobPage from '../DuplicateJobPage';

vi.mock('section/management-job/duplicate-job/view/duplicate-job-view', () => ({
  default: () => <div data-testid="duplicate-job-view">DuplicateJobView</div>,
}));

vi.mock('components/page-header/page-header', () => ({
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));

vi.mock('components/sections/common/PageContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-content">{children}</div>
  ),
}));

describe('<DuplicateJobPage />', () => {
  it('should render DuplicateJobPage', () => {
    render(<DuplicateJobPage />);
    expect(screen.getByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByText('Create Job')).toBeInTheDocument();
    expect(screen.getByTestId('duplicate-job-view')).toBeInTheDocument();
  });
});

