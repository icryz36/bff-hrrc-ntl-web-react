import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ListJobDetailComponent from '../list-job-detail';

// ---- Mock useJobpostQuery.detail ---- //
const mockJobData = {
  jobPostNo: 'JP-001',
  jobTitle: 'Software Engineer',
  groupLocation: 'HQ',
  regionName: 'North',
  headCount: 3,
  prNo: 'PR-001',
  jobPostId: '1',
  statusName: 'Open',
  jobPostPositions: [
    { positionId: 'p1', positionName: 'Dev', vacancy: '2', srcOfRecruitment: 'Internal' },
  ],
  workLocations: [{ provinceName: 'Bangkok', district: [{ districtName: 'District A' }] }],
  departmentName: 'IT',
  sectionName: 'Development',
  levelName: 'L2',
  degreeName: 'Bachelor',
  employeeTypeName: 'Full-time',
  startDate: '2025-01-01',
  endDate: '2025-12-31',
  acknowledgeDate: '2025-01-05',
  jobDescription: '<p>Job Desc</p>',
  jobSpecification: '<p>Job Spec</p>',
  jobBenefit: '<p>Benefit</p>',
};

vi.mock('services/jobpost/query', () => ({
  useJobpostQuery: {
    detail: vi.fn(() => ({
      queryKey: ['jobPostDetail', '1'],
      queryFn: vi.fn(() => ({ data: { data: mockJobData } })),
    })),
  },
}));

vi.mock('@tanstack/react-query', async () => {
  const actual = (await vi.importActual('@tanstack/react-query')) as any;
  return {
    ...actual,
    useQuery: () => ({ data: { data: mockJobData } }),
  };
});

// ---- Mock IconifyIcon ---- //
vi.mock('components/base/IconifyIcon', () => ({
  default: (props: any) => <div data-testid="iconify-icon" {...props} />,
}));

describe('<ListJobDetailComponent />', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders Drawer and job post details', () => {
    render(<ListJobDetailComponent open={true} onClose={onClose} jobPostId="1" />);

    // Drawer title
    expect(screen.getByText(/Job Post Detail : JP-001/)).toBeInTheDocument();

    // Job title info
    expect(screen.getByText('Job Title :')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();

    // Department
    expect(screen.getByText('Department :')).toBeInTheDocument();
    expect(screen.getByText('IT')).toBeInTheDocument();

    // Position section
    expect(screen.getByText('Position')).toBeInTheDocument();
    expect(screen.getByText('Dev')).toBeInTheDocument();

    // Job Description
    expect(screen.getByText('Job Desc')).toBeInTheDocument();
  });

  it('calls onClose when close icon is clicked', () => {
    render(<ListJobDetailComponent open={true} onClose={onClose} jobPostId="1" />);

    const closeIcon = screen.getByTestId('iconify-icon');
    fireEvent.click(closeIcon);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
