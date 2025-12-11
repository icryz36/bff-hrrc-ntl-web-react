import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Stack, Typography } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { UseBooleanReturn, useBoolean } from 'hooks/useBoolean';
import { useJobApplicationQuery } from 'services/job-application/query';
import { TGetJobapplicationListPayload } from 'types/job-application';
import CustomArrowStepper from 'components/custom-arrow-stepper/CustomArrowStepper';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';
import { JobApplicationApplyCandidateDialog } from '../components/job-application-apply-candidate-dialog';
import { JobApplicationCandidateDetailDialog } from '../components/job-application-candidate-detail-dialog';
import { JobApplicationCandidateTable } from '../components/job-application-candidate-table';
import JobApplicationDetailSection from '../components/job-application-detail-section';

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
  const [activeStep, setActiveStep] = useState<string>('');
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });

  const queryPayload: TGetJobapplicationListPayload = useMemo(
    () => ({
      jobPostId: id,
      pageNo: pagination.page + 1,
      pageSize: pagination.pageSize,
      stageId: activeStep,
    }),
    [pagination.page, id, activeStep],
  );

  // api ---------------------------------------------------------------

  const { data: boardData } = useQuery(useJobApplicationQuery.board({ jobPostId: id }));

  const { data: candidateList, isFetching: isLoading } = useQuery({
    ...useJobApplicationQuery.list(queryPayload),
    placeholderData: keepPreviousData,
    enabled: !!activeStep,
  });

  const tableData = candidateList?.items || [];
  const totalData = candidateList?.total || 0;

  // -------------------------------------------------------------------

  const handleChangeStep = (id: string) => {
    setActiveStep(id);
  };

  const handleViewCandidateDetail = (id: string) => {
    setSelectedCandidateId(id);
    isOpenCandidateDetailDialog.onTrue();
  };

  // ----------------------------------------------------------------------

  // NOTE: set default stageId
  useEffect(() => {
    if (boardData) {
      setActiveStep(boardData?.stageSummary[0]?.stageId);
    }
  }, [boardData?.stageSummary]);

  // ----------------------------------------------------------------------

  return (
    <Stack direction="column" spacing={4}>
      <JobApplicationDetailSection />

      <CustomArrowStepper
        activeStep={activeStep}
        onChangeStep={handleChangeStep}
        steps={boardData?.stageSummary || []}
      />

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
