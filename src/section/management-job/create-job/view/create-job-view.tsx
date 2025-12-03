import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { useBoolean } from 'hooks/useBoolean';
import { pathsNavigate } from 'routes/paths';
import { useCreateJobpostMutation } from 'services/jobpost/mutation';
import IconifyIcon from 'components/base/IconifyIcon';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';
import { CreateJobForm } from '../components/create-job-form';
import { convertCreateEditJobPostPayload } from '../helper';
import { CreateJobSchemaType } from '../schema';

// ---------------------------------------------------------------------

const CreateJobView = () => {
  const navigate = useNavigate();
  const [jobNo, setJobNo] = useState<string>('');
  const [formKey, setFormKey] = useState<number>(0);

  const isSubmitSuccess = useBoolean();
  const isOpenCreateJobFailedDialog = useBoolean();
  const isOpenCreateJobSuccessDialog = useBoolean();

  // api ----------------------------------------------------------------

  const { mutate: createJobPost, isPending: isLoadingCreateJobPost } = useCreateJobpostMutation();

  // func ---------------------------------------------------------------

  const onSubmit = (data: CreateJobSchemaType) => {
    const payload = convertCreateEditJobPostPayload(data);

    createJobPost(payload, {
      onSuccess: (response) => {
        if (response.status) {
          setJobNo(response.data.jobPostNo);
          isOpenCreateJobSuccessDialog.onTrue();
          isSubmitSuccess.onTrue();
          return;
        }

        isOpenCreateJobFailedDialog.onTrue();
      },
      onError: () => {
        isOpenCreateJobFailedDialog.onTrue();
      },
    });
  };

  const handleCopyJobNo = () => {
    if (jobNo) {
      // TODO: show toast
      navigator.clipboard.writeText(jobNo);
    }
  };

  const handleCreateNewJob = () => {
    isOpenCreateJobSuccessDialog.onFalse();
    setFormKey((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --------------------------------------------------------------------

  return (
    <>
      <CreateJobForm
        key={formKey}
        onSubmit={onSubmit}
        isLoading={isLoadingCreateJobPost}
        isSubmitSuccess={isSubmitSuccess.value}
      />

      {/* Dialog */}

      <CustomConfirmDialog
        title="เกิดข้อผิดพลาด"
        open={isOpenCreateJobFailedDialog.value}
        onClose={isOpenCreateJobFailedDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenCreateJobFailedDialog.onFalse}>
            Close
          </Button>
        }
      />

      <CustomConfirmDialog
        title="สร้าง Job สำเร็จ"
        open={isOpenCreateJobSuccessDialog.value}
        onClose={isOpenCreateJobSuccessDialog.onFalse}
        description={
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="subtitle1" color="text.secondary">
              เลข Job ID. คือ{' '}
            </Typography>
            <Typography variant="subtitle1_bold">{jobNo}</Typography>
            <IconButton onClick={handleCopyJobNo}>
              <IconifyIcon
                icon="material-symbols-light:content-copy-outline"
                color="text.primary"
              />
            </IconButton>
          </Stack>
        }
        action={
          <Stack spacing={1}>
            <Button variant="outlined" color="neutral" onClick={handleCreateNewJob}>
              Create new Job
            </Button>
            <Button variant="contained" onClick={() => navigate(pathsNavigate.jobPost.listJob)}>
              Go to List Job Post
            </Button>
          </Stack>
        }
      />
    </>
  );
};

export default CreateJobView;
