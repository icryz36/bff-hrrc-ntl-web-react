import { useFormContext, useFormState } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import { CreateJobSchemaType } from 'section/management-job/create-job/schema';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';

// ----------------------------------------------------------------------

export const DirtyFormLeaveGuardDialog = () => {
  // Form context -------------------------------------------------------

  const { control } = useFormContext<CreateJobSchemaType>();

  const { isDirty, isSubmitSuccessful, isSubmitting, isSubmitted } = useFormState({ control });

  // const blocker = useBlocker(({ currentLocation, nextLocation }) => {
  //   return isDirty && currentLocation.pathname !== nextLocation.pathname;
  // });

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (!isDirty) return false;

    if (isSubmitting) return false;

    if (isSubmitSuccessful) return false;

    if (isSubmitted) return false;

    return currentLocation.pathname !== nextLocation.pathname;
  });

  // --------------------------------------------------------------------

  return (
    <CustomConfirmDialog
      title="ยืนยันการออกจากหน้านี้"
      open={blocker.state === 'blocked'}
      onClose={blocker?.reset}
      description={
        <Typography color="text.secondary" variant="subtitle1" whiteSpace="pre-wrap">
          {'คุณต้องการออกจากหน้านี้หรือไม่\nหากยืนยัน ข้อมูลที่กรอกไว้จะไม่ถูกบันทึก'}
        </Typography>
      }
      action={
        <Stack spacing={1}>
          <Button variant="outlined" color="neutral" onClick={blocker.reset}>
            Cancel
          </Button>
          <Button variant="contained" onClick={blocker.proceed}>
            Confirm
          </Button>
        </Stack>
      }
    />
  );
};
