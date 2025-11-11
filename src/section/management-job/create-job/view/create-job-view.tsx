import { Button, IconButton, Stack, Typography } from '@mui/material';
import { useBoolean } from 'hooks/useBoolean';
import IconifyIcon from 'components/base/IconifyIcon';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';
import { CreateJobForm } from '../components/create-job-form';
import { CreateJobSchemaType } from '../schema';

// ----------------------------------------------------------------------

const CreateJobView = () => {
  const isOpenCreateJobFailedDialog = useBoolean();
  const isOpenCreateJobSuccessDialog = useBoolean();
  const isOpenConfirmLeavePageDialog = useBoolean();

  // Func ---------------------------------------------------------------

  const onSubmit = (data: CreateJobSchemaType) => {
    console.log('data', data);
  };

  // --------------------------------------------------------------------

  return (
    <>
      {/* Example dialog 🚀 */}

      <Stack spacing={2} mb={4}>
        <Button variant="contained" onClick={isOpenCreateJobSuccessDialog.onTrue}>
          สร้าง Job สำเร็จ Dialog
        </Button>

        <Button variant="contained" onClick={isOpenCreateJobFailedDialog.onTrue}>
          สร้าง Job ไม่สำเร็จ Dialog
        </Button>

        <Button variant="contained" onClick={isOpenConfirmLeavePageDialog.onTrue}>
          ยืนยันการออกจากหน้า Dialog
        </Button>
      </Stack>

      <CreateJobForm onSubmit={onSubmit} />

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
        title="ยืนยันการออกจากหน้านี้"
        open={isOpenConfirmLeavePageDialog.value}
        onClose={isOpenConfirmLeavePageDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1" whiteSpace="pre-wrap">
            {'คุณต้องการออกจากหน้านี้หรือไม่\nหากยืนยัน ข้อมูลที่กรอกไว้จะไม่ถูกบันทึก'}
          </Typography>
        }
        action={
          <Stack spacing={1}>
            <Button variant="outlined" color="neutral">
              Cancel
            </Button>
            <Button variant="contained">Confirm</Button>
          </Stack>
        }
      />

      <CustomConfirmDialog
        title="สร้าง Job สำเร็จ"
        open={isOpenCreateJobSuccessDialog.value}
        onClose={isOpenCreateJobSuccessDialog.onFalse}
        description={
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="subtitle1" color="text.secondary">
              เลข Job No. คือ{' '}
            </Typography>
            <Typography variant="subtitle1_bold">H202510-0000010</Typography>
            <IconButton>
              <IconifyIcon
                icon="material-symbols-light:content-copy-outline"
                color="text.primary"
              />
            </IconButton>
          </Stack>
        }
        action={
          <Stack spacing={1}>
            <Button variant="outlined" color="neutral">
              Create new Job
            </Button>
            <Button variant="contained">Go to List Job Post</Button>
          </Stack>
        }
      />
    </>
  );
};

export default CreateJobView;
