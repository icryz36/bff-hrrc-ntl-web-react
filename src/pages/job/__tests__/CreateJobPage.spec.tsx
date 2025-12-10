import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CreateJobPage from '../CreateJobPage';

vi.mock('section/management-job/create-job/view/create-job-view', () => ({
  default: () => <div data-testid="create-job-view">CreateJobView</div>,
}));

vi.mock('components/page-header/page-header', () => ({
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));

vi.mock('components/sections/common/PageContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-content">{children}</div>
  ),
}));

describe('<CreateJobPage />', () => {
  it('should render CreateJobPage', () => {
    render(<CreateJobPage />);
    expect(screen.getByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByText('Create Job')).toBeInTheDocument();
    expect(screen.getByTestId('create-job-view')).toBeInTheDocument();
  });
});
