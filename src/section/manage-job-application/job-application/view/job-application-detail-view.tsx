import { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Stack, Typography } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { UseBooleanReturn, useBoolean } from 'hooks/useBoolean';
import { useCandidateQuery } from 'services/candidate/query';
import { useJobApplicationQuery } from 'services/job-application/query';
import { TGetCandidateListPayload } from 'types/candidate';
import CustomArrowStepper from 'components/custom-arrow-stepper/CustomArrowStepper';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';
import { JobApplicationApplyCandidateDialog } from '../components/job-application-apply-candidate-dialog';
import { JobApplicationCandidateDetailDialog } from '../components/job-application-candidate-detail-dialog';
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
  const { id = '' } = useParams();

  const isOpenApplyJobFailedDialog = useBoolean();
  const isOpenApplyJobSuccessDialog = useBoolean();
  const isOpenCandidateDetailDialog = useBoolean();

  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('');
  const [activeStep, setActiveStep] = useState<string>('new');
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });

  const queryPayload: TGetCandidateListPayload = useMemo(
    () => ({
      // jobPostId: id, // TODO: ส่งไปแล้ว error 400
      status: ['Active'],
      pageNo: pagination.page + 1,
      pageSize: pagination.pageSize,
    }),
    [pagination.page, id],
  );

  // api ---------------------------------------------------------------

  const { data: candidateList, isPending: isLoading } = useQuery({
    ...useCandidateQuery.list(queryPayload),
    placeholderData: keepPreviousData,
  });

  const { data: countJobApplication } = useQuery(useJobApplicationQuery.count({ jobPostId: id }));

  const tableData = candidateList?.items || [];
  const totalData = candidateList?.total || 0;

  console.log('countJobApplication', countJobApplication);

  // -------------------------------------------------------------------

  const handleChangeStep = (id: string) => {
    setActiveStep(id);
  };

  const handleViewCandidateDetail = (id: string) => {
    setSelectedCandidateId(id);
    isOpenCandidateDetailDialog.onTrue();
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
        onViewCandidateDetail={handleViewCandidateDetail}
      />

      {/* Dialog */}

      <JobApplicationApplyCandidateDialog
        open={isOpenApplyCandidateDialog.value}
        onClose={isOpenApplyCandidateDialog.onFalse}
        onApplySuccess={() => isOpenApplyJobSuccessDialog.onTrue()}
        onApplyError={() => isOpenApplyJobFailedDialog.onTrue()}
      />

      <JobApplicationCandidateDetailDialog
        candidateId={selectedCandidateId}
        open={isOpenCandidateDetailDialog.value}
        onClose={isOpenCandidateDetailDialog.onFalse}
      />

      <CustomConfirmDialog
        title="เพิ่มผู้สมัครสำเร็จ"
        open={isOpenApplyJobSuccessDialog.value}
        onClose={isOpenApplyJobSuccessDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1_regular">
            ผู้สมัครถูกเพิ่มเข้าตำแหน่งงานแล้ว
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenApplyJobSuccessDialog.onFalse}>
            Close
          </Button>
        }
      />

      <CustomConfirmDialog
        title="เกิดข้อผิดพลาด"
        open={isOpenApplyJobFailedDialog.value}
        onClose={isOpenApplyJobFailedDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1_regular">
            ไม่สามารถดำเนินการได้ กรุณาลองใหม่อีกครั้ง
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenApplyJobFailedDialog.onFalse}>
            Close
          </Button>
        }
      />
    </Stack>
  );
};

export default JobApplicationDetailView;
