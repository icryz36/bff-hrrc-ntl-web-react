import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { pathsNavigate } from 'routes/paths';
import { useJobpostQuery } from 'services/jobpost/query';
import { TGetJobPostListPayload } from 'types/jobpost';
import JobApplicationListTable from '../components/job-application-list-table';

// ----------------------------------------------------------------------

const JobApplicationListView = () => {
  const navigate = useNavigate();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const queryPayload: TGetJobPostListPayload = useMemo(
    () => ({
      pageNo: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      ownerUserId: 'e8f9a0b1-c2d3-4e5f-9a6b-7c8d9e0f1a2b',
      recruiterUserId: 'e8f9a0b1-c2d3-4e5f-9a6b-7c8d9e0f1a2b',
    }),
    [paginationModel.page],
  );

  // api ---------------------------------------------------------------

  const { data: listJobData, isPending: isLoading } = useQuery({
    ...useJobpostQuery.list(queryPayload),
    placeholderData: keepPreviousData,
  });

  // ---------------------------------------------------------------------

  const tableData = listJobData?.items || [];
  const totalData = listJobData?.total || 0;

  // ----------------------------------------------------------------------

  return (
    <>
      <Stack justifyContent="end" mb={3}>
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
