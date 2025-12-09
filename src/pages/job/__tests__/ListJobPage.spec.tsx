import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ListJobPage from '../ListJobPage';

vi.mock('section/management-job/list-job/view/list-job-view', () => ({
  default: () => <div data-testid="list-job-view">ListJobView</div>,
}));

vi.mock('components/page-header/page-header', () => ({
  default: ({ title }: { title: string }) => <div data-testid="page-header">{title}</div>,
}));

describe('<ListJobPage />', () => {
  it('should render ListJobPage', () => {
    render(<ListJobPage />);
    expect(screen.getByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByText('List Job Post')).toBeInTheDocument();
    expect(screen.getByTestId('list-job-view')).toBeInTheDocument();
  });
});

