import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EditJobPage from '../EditJobPage';

vi.mock('section/management-job/edit-job/view/edit-job-view', () => ({
  default: () => <div data-testid="edit-job-view">EditJobView</div>,
}));

vi.mock('components/page-header/page-header', () => ({
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));

vi.mock('components/sections/common/PageContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-content">{children}</div>
  ),
}));

describe('<EditJobPage />', () => {
  it('should render EditJobPage', () => {
    render(<EditJobPage />);
    expect(screen.getByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByText('Edit Job')).toBeInTheDocument();
    expect(screen.getByTestId('edit-job-view')).toBeInTheDocument();
  });
});

