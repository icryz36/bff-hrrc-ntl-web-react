import { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Chip, Menu, MenuItem, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import { useBoolean } from 'hooks/useBoolean';
import paths from 'routes/paths';
import { JobApplicationChangeJobStatusDialog } from 'section/manage-job-application/job-application/components/job-application-change-job-status-dialog';
import { getStatusJpbBadgeColor } from 'section/manage-job-application/job-application/helper';
import JobApplicationDetailView from 'section/manage-job-application/job-application/view/job-application-detail-view';
import { queryClient } from 'services/client';
import { useJobApplicationQuery } from 'services/job-application/query';
import { useUpdateJobpostStatusMutation } from 'services/jobpost/mutation';
import { useMasterDataQuery } from 'services/master-data/query';
import { TUpdateJobPostStatusPayload } from 'types/jobpost';
import IconifyIcon from 'components/base/IconifyIcon';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';
import DefaultLoader from 'components/loading/DefaultLoader';
import PageHeader from 'components/page-header/page-header';

// ----------------------------------------------------------------------

const jobDeleteStatusId = '10265555-dc7c-4c12-8e02-e6b5c751e9ae';

// NOTE: for warning when user change job status to "Cancel" or "Close"
const jobStatusIdWarningList = [
  'b12afa1e-527b-4578-b114-685ef4cad0ff',
  '58761e87-845f-4f9c-aa81-0d0e9a442356',
];

const ListJobPage = () => {
  const { id = '' } = useParams();
  const isOpenApplyCandidateDialog = useBoolean();
  const isOpenChangeJobStatusDialog = useBoolean();
  const isOpenChangeJobStatusFailedDialog = useBoolean();
  const isOpenChangeJobStatusSuccessDialog = useBoolean();

  const [selectedStatusId, setSelectedStatusId] = useState<string>('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // api ---------------------------------------------------------------

  const { data: boardData, isLoading: isLoadingBoardData } = useQuery(
    useJobApplicationQuery.board({ jobPostId: id }),
  );

  const { data: postStatusList = [] } = useQuery(useMasterDataQuery.postStatus());

  const { mutate: updateJobPostStatus, isPending: isLoadingChangeJobStatus } =
    useUpdateJobpostStatusMutation();

  // func ---------------------------------------------------------------

  const handleClose = () => setAnchorEl(null);

  const handleClickStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectStatus = (statusId: string) => {
    setSelectedStatusId(statusId);
    isOpenChangeJobStatusDialog.onTrue();
    handleClose();
  };

  const handleConfirmChangeStatus = () => {
    const payload: TUpdateJobPostStatusPayload = {
      jobPostId: id,
      statusId: selectedStatusId,
    };

    updateJobPostStatus(payload, {
      onSuccess: (response) => {
        if (response.status) {
          isOpenChangeJobStatusSuccessDialog.onTrue();
          queryClient.invalidateQueries({ queryKey: useJobApplicationQuery.keys() });
          return;
        }

        isOpenChangeJobStatusFailedDialog.onTrue();
      },
      onError: () => {
        isOpenChangeJobStatusFailedDialog.onTrue();
      },
      onSettled: () => {
        isOpenChangeJobStatusDialog.onFalse();
      },
    });
  };

  // --------------------------------------------------------------------

  const isWarningChangeJobStatus = jobStatusIdWarningList.includes(selectedStatusId);

  const postStatusWithoutDelete = useMemo(
    () => postStatusList.filter((item) => item.statusId !== jobDeleteStatusId),
    [postStatusList, jobDeleteStatusId],
  );

  // ----------------------------------------------------------------------
  if (isLoadingBoardData) {
    return <DefaultLoader />;
  }

  return (
    <>
      <Grid container>
        <Grid size={12}>
          <PageHeader
            title="Job Application"
            breadcrumb={[
              { label: 'Home', url: '/' },
              { label: 'List Job Application', url: paths.listJobApplication },
              { label: 'Job Application', active: true },
            ]}
            actionComponent={
              <Stack spacing={2} alignItems="center">
                <Button
                  variant="soft"
                  color="neutral"
                  onClick={isOpenApplyCandidateDialog.onTrue}
                  startIcon={<IconifyIcon icon="mdi:user-outline" width={20} height={20} />}
                >
                  Apply Candidate
                </Button>

                <Stack spacing={1.5} alignItems="center">
                  <Typography variant="subtitle2_semibold">Job Status:</Typography>

                  <Chip
                    variant="soft"
                    component="button"
                    onClick={handleClickStatus}
                    color={getStatusJpbBadgeColor(boardData?.jobPost?.statusName || '')}
                    sx={{ textTransform: 'capitalize', py: 2, px: 1, cursor: 'pointer' }}
                    label={
                      <Stack alignItems="center" spacing={0.5}>
                        <Typography variant="body2_semibold">
                          {boardData?.jobPost?.statusName}
                        </Typography>
                        <IconifyIcon icon="icon-park-outline:down" width={20} height={20} />
                      </Stack>
                    }
                  />
                  <Menu open={open} sx={{ mt: 0.5 }} anchorEl={anchorEl} onClose={handleClose}>
                    {postStatusWithoutDelete?.map((item) => (
                      <MenuItem
                        key={item.statusId}
                        onClick={() => handleSelectStatus(item.statusId)}
                        selected={boardData?.jobPost.statusId === item.statusId}
                      >
                        {item.statusNameEn}
                      </MenuItem>
                    ))}
                  </Menu>
                </Stack>
              </Stack>
            }
          />
        </Grid>
        <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
          <JobApplicationDetailView isOpenApplyCandidateDialog={isOpenApplyCandidateDialog} />
        </Grid>
      </Grid>

      {/* Dialog */}

      <JobApplicationChangeJobStatusDialog
        isLoading={isLoadingChangeJobStatus}
        onConfirm={handleConfirmChangeStatus}
        open={isOpenChangeJobStatusDialog.value}
        onClose={isOpenChangeJobStatusDialog.onFalse}
        isWarningChangeJobStatus={isWarningChangeJobStatus}
      />

      <CustomConfirmDialog
        title="ปรับสถานะของงานสำเร็จ"
        open={isOpenChangeJobStatusSuccessDialog.value}
        onClose={isOpenChangeJobStatusSuccessDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1_regular">
            สถานะของงานนี้ถูกอัปเดตเรียบร้อยแล้ว
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenChangeJobStatusSuccessDialog.onFalse}>
            Close
          </Button>
        }
      />

      <CustomConfirmDialog
        title="เกิดข้อผิดพลาด"
        open={isOpenChangeJobStatusFailedDialog.value}
        onClose={isOpenChangeJobStatusFailedDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1_regular">
            ไม่สามารถดำเนินการได้ กรุณาลองใหม่อีกครั้ง
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenChangeJobStatusFailedDialog.onFalse}>
            Close
          </Button>
        }
      />
    </>
  );
};

export default ListJobPage;
