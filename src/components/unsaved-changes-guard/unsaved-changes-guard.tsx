import { useFormContext, useFormState } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';

// ----------------------------------------------------------------------

type UnsavedChangesGuardProps = {
  isSubmitSuccess?: boolean;
};

export const UnsavedChangesGuard = ({ isSubmitSuccess }: UnsavedChangesGuardProps) => {
  const { control } = useFormContext();

  const { isDirty } = useFormState({ control });

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (isSubmitSuccess) return false;

    if (!isDirty) return false;

    return currentLocation.pathname !== nextLocation.pathname;
  });

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
