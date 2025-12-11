import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { pathsNavigate } from 'routes/paths';
import FilterSection from 'section/management-job/list-job/components/filter-section';
import { FilterState } from 'section/management-job/list-job/components/type';
import { useJobpostQuery } from 'services/jobpost/query';
import { TGetJobPostListPayload } from 'types/jobpost';
import JobApplicationListTable from '../components/job-application-list-table';

// ----------------------------------------------------------------------

type FiltersListJobView = FilterState & {
  ownerUserId: string;
  recruiterUserId: string;
};

// ----------------------------------------------------------------------

const JobApplicationListView = () => {
  const navigate = useNavigate();

  const defaultUserId = 'e8f9a0b1-c2d3-4e5f-9a6b-7c8d9e0f1a2b';

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [filters, setFilters] = useState<FiltersListJobView>({
    jobTitle: '',
    department: [],
    region: '',
    province: '',
    district: '',
    jobStatus: '',
    owner: '',
    startDate: null,
    activeDay: '',
    ownerUserId: defaultUserId,
    recruiterUserId: defaultUserId,
  });

  const queryPayload: TGetJobPostListPayload = useMemo(
    () => ({
      pageNo: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      ownerUserId: filters.owner || filters.ownerUserId,
      ...(filters.jobTitle && { jobTitle: filters.jobTitle }),
      ...(filters.department.length > 0 && { departmentId: filters.department }),
      ...(filters.region && { regionId: [filters.region] }),
      ...(filters.province && { provinceId: [filters.province] }),
      ...(filters.district && { districtId: [filters.district] }),
      ...(filters.jobStatus && { statusId: [filters.jobStatus] }),
      ...(filters.startDate && { startDate: filters.startDate }),
      ...(filters.activeDay && { totalActiveDays: Number(filters.activeDay) }),
    }),
    [paginationModel.page, filters],
  );

  const filterFields: FilterState = {
    jobTitle: filters.jobTitle,
    department: filters.department,
    region: filters.region,
    province: filters.province,
    district: filters.district,
    jobStatus: filters.jobStatus,
    owner: filters.owner,
    startDate: filters.startDate,
    activeDay: filters.activeDay,
  };

  // api ---------------------------------------------------------------

  const { data: listJobData, isPending: isLoading } = useQuery({
    ...useJobpostQuery.list(queryPayload),
    placeholderData: keepPreviousData,
  });

  // func ---------------------------------------------------------------

  const handleSetFilterFields = (newFilters: FilterState) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setPaginationModel({
      page: 1,
      pageSize: 10,
    });
  };

  // ---------------------------------------------------------------------

  const tableData = listJobData?.items || [];
  const totalData = listJobData?.total || 0;

  // ----------------------------------------------------------------------

  return (
    <>
      <Stack justifyContent="end" mb={3} spacing={2}>
        <FilterSection filters={filterFields} setFilters={handleSetFilterFields} />

        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate(pathsNavigate.jobPost.createJob)}
        >
          Create Job
        </Button>
      </Stack>

      <JobApplicationListTable
        tableData={tableData}
        isLoading={isLoading}
        totalData={totalData}
        paginationModel={paginationModel}
        onChangePaginationModel={setPaginationModel}
      />
    </>
  );
};

export default JobApplicationListView;
