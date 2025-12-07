import { useMemo, useState } from 'react';
import { Stack } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { UseBooleanReturn } from 'hooks/useBoolean';
import { useCandidateQuery } from 'services/candidate/query';
import { TGetCandidateListPayload } from 'types/candidate';
import CustomArrowStepper from 'components/custom-arrow-stepper/CustomArrowStepper';
import { JobApplicationApplyCandidateDialog } from '../components/job-application-apply-candidate-dialog';
import { JobApplicationCandidateTable } from '../components/job-application-candidate-table';
import JobApplicationDetailSection from '../components/job-application-detail-section';

// ----------------------------------------------------------------------

const STEPS = [
  { label: 'New', count: 10, id: 'new' },
  { label: `CV Submit /\nPrescreen`, count: 12, id: 'cvSubmit' },
  { label: `Show up / Short\nList`, count: 10, id: 'showUp' },
  { label: 'First Interview', count: 8, id: 'firstInterview' },
  { label: 'Second Interview', count: 8, id: 'secondInterview' },
  { label: 'Final Interview', count: 8, id: 'finalInterview' },
  { label: 'Offer', count: 2, id: 'offer' },
  { label: 'Sign Contract', count: 3, id: 'signContract' },
  { label: 'On Board', count: 4, id: 'onBoard' },
];

// ----------------------------------------------------------------------

type JobApplicationDetailViewProps = {
  isOpenApplyCandidateDialog: UseBooleanReturn;
};

const JobApplicationDetailView = ({
  isOpenApplyCandidateDialog,
}: JobApplicationDetailViewProps) => {
  const [activeStep, setActiveStep] = useState<string>('new');
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });

  const queryPayload: TGetCandidateListPayload = useMemo(
    () => ({
      pageNo: pagination.page + 1,
      pageSize: pagination.pageSize,
      status: ['Active', 'Inactive'],
    }),
    [pagination.page],
  );

  // api ---------------------------------------------------------------

  const { data: candidateList, isPending: isLoading } = useQuery({
    ...useCandidateQuery.list(queryPayload),
    placeholderData: keepPreviousData,
  });

  const tableData = candidateList?.items || [];
  const totalData = candidateList?.pagination?.totalRecords || 0; // NOTE: why BE not return in  totalRecords  ?

  // -------------------------------------------------------------------

  const handleChangeStep = (id: string) => {
    setActiveStep(id);
  };

  return (
    <Stack direction="column" spacing={4}>
      <JobApplicationDetailSection />

      <CustomArrowStepper steps={STEPS} activeStep={activeStep} onChangeStep={handleChangeStep} />

      <JobApplicationCandidateTable
        tableData={tableData}
        isLoading={isLoading}
        totalData={totalData}
        paginationModel={pagination}
        onChangePaginationModel={setPagination}
      />

      {/* Dialog */}

      <JobApplicationApplyCandidateDialog
        open={isOpenApplyCandidateDialog.value}
        onClose={isOpenApplyCandidateDialog.onFalse}
      />
    </Stack>
  );
};

export default JobApplicationDetailView;
