import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FilterMenuContent from '../filter-menu-content';

vi.mock('@mui/x-date-pickers', () => ({
  DatePicker: ({ label }: any) => <div>{label}</div>,
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn((queryOptions: any) => {
    if (queryOptions?.queryKey?.includes('department')) {
      return {
        data: [
          { departmentId: 'dept1', departmentNameTh: 'แผนก IT', departmentNameEn: 'IT Department' },
        ],
      };
    }
    if (queryOptions?.queryKey?.includes('ntlRegion')) {
      return {
        data: [{ regionId: 'region1', regionNameTh: 'ภาคเหนือ', regionNameEn: 'North' }],
      };
    }
    if (queryOptions?.queryKey?.includes('province')) {
      return {
        data: [{ provinceId: 'province1', provinceNameTh: 'กรุงเทพ', provinceNameEn: 'Bangkok' }],
      };
    }
    if (queryOptions?.queryKey?.includes('district')) {
      return {
        data: [{ districtId: 'district1', districtNameTh: 'เขต 1', districtNameEn: 'District 1' }],
      };
    }
    if (queryOptions?.queryKey?.includes('postStatus')) {
      return {
        data: [{ statusId: 'status1', statusNameTh: 'เปิด', statusNameEn: 'Open' }],
      };
    }
    if (queryOptions?.queryKey?.includes('users')) {
      return {
        data: [{ userId: 'user1', name: 'John', surname: 'Doe' }],
      };
    }
    return { data: [] };
  }),
}));

vi.mock('services/master-data/query', () => ({
  useMasterDataQuery: {
    department: () => ({ queryKey: ['department'] }),
    ntlRegion: () => ({ queryKey: ['ntlRegion'] }),
    province: () => ({ queryKey: ['province'] }),
    district: (params: any) => ({ queryKey: ['district', params] }),
    postStatus: () => ({ queryKey: ['postStatus'] }),
    users: () => ({ queryKey: ['users'] }),
  },
}));

describe('FilterMenuContent', () => {
  let onCloseMock: any;
  let setFiltersMock: any;

  const mockFilters = {
    jobTitle: '',
    department: [],
    region: '',
    province: '',
    district: '',
    jobStatus: '',
    owner: '',
    startDate: null,
    activeDay: '',
  };

  beforeEach(() => {
    onCloseMock = vi.fn();
    setFiltersMock = vi.fn();
  });

  const setup = () =>
    render(
      <MemoryRouter>
        <FilterMenuContent
          onClose={onCloseMock}
          filters={mockFilters}
          setFilters={setFiltersMock}
        />
      </MemoryRouter>,
    );

  it('renders Filter UI correctly', () => {
    setup();

    expect(screen.getByText('Filter')).toBeDefined();
    expect(
      screen.getByText('Easily find the List Job Post you’re looking for using filters.'),
    ).toBeDefined();

    expect(screen.getByLabelText('Job Title')).toBeDefined();
    expect(screen.getByLabelText('Department')).toBeDefined();
    expect(screen.getByLabelText('NTL Regional')).toBeDefined();
    expect(screen.getByLabelText('Province')).toBeDefined();
    expect(screen.getByLabelText('District')).toBeDefined();
    expect(screen.getByLabelText('Job Status')).toBeDefined();
    expect(screen.getByLabelText('Owner')).toBeDefined();
    expect(screen.getByLabelText('Active Day')).toBeDefined();
    expect(screen.getByText('Start Date')).toBeDefined();
  });

  it('updates state when typing Job Title', () => {
    setup();

    const input = screen.getByLabelText('Job Title') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Engineer' } });

    expect(input.value).toBe('Engineer');
  });

  it('resets local filters when clicking Reset but does not call setFilters', () => {
    setup();

    const jobTitleInput = screen.getByLabelText('Job Title') as HTMLInputElement;
    fireEvent.change(jobTitleInput, { target: { value: 'Engineer' } });
    expect(jobTitleInput.value).toBe('Engineer');

    fireEvent.click(screen.getByText('Reset'));

    expect(jobTitleInput.value).toBe('');

    expect(setFiltersMock).not.toHaveBeenCalled();

    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('calls setFilters when Apply is clicked', () => {
    setup();

    const jobTitleInput = screen.getByLabelText('Job Title') as HTMLInputElement;
    fireEvent.change(jobTitleInput, { target: { value: 'Developer' } });

    fireEvent.click(screen.getByText('Apply'));

    expect(setFiltersMock).toHaveBeenCalled();
  });

  it('calls onClose after Apply', () => {
    setup();

    fireEvent.click(screen.getByText('Apply'));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls onClose when clicking close icon', () => {
    setup();

    const closeIcon = screen.getByLabelText('close');
    fireEvent.click(closeIcon);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
