import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useJobApplicationQuery } from 'services/job-application/query';
import IconifyIcon from 'components/base/IconifyIcon';

// ----------------------------------------------------------------------

type JobApplicationChangeJobStatusDialogProps = {
  open: boolean;
  isLoading: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  isWarningChangeJobStatus: boolean;
  onChangeJobStatusNote: Dispatch<SetStateAction<string>>;
};

export const JobApplicationChangeJobStatusDialog = ({
  open,
  onClose,
  onConfirm,
  isLoading,
  onChangeJobStatusNote,
  isWarningChangeJobStatus,
}: JobApplicationChangeJobStatusDialogProps) => {
  const MAX_LENGTH_NOTE = 250;
  const theme = useTheme();
  const { id = '' } = useParams();

  // api ---------------------------------------------------------------

  const { data: countJobApplication } = useQuery(useJobApplicationQuery.count({ jobPostId: id }));

  // -------------------------------------------------------------------

  const hasNoProcess = Object.values(countJobApplication?.data || {})?.every(
    (value) => value === 0,
  );

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { maxWidth: 463, width: '100%', borderRadius: '24px' } } }}
    >
      <DialogTitle mt={1} sx={{ paddingBottom: 1 }}>
        {!hasNoProcess && isWarningChangeJobStatus && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography
              lineHeight={1}
              whiteSpace="pre-wrap"
              variant="subtitle2_regular"
              color={theme.palette.error.main}
            >
              {`มีผู้สมัครที่กำลังอยู่ในขั้นการดำเนินการอยู่ใน Job นี้\nหากคุณปรับสถานะผู้สมัครทั้งหมดจะถูกปรับสถานะเป็นไม่ผ่าน`}
            </Typography>
          </Alert>
        )}

        <Stack justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Add Note (optional)</Typography>
          <IconButton onClick={onClose}>
            <IconifyIcon icon="iconoir:cancel" color="black" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack direction="column" spacing={2}>
          <Typography variant="subtitle1_regular" color="text.secondary">
            เพิ่มหมายเหตุ (ถ้ามี) เพื่ออธิบายการแก้ไขหรือเปลี่ยนสถานะ (Maximum 250 characters)
          </Typography>
          <TextField
            multiline
            rows={3}
            fullWidth
            label="write a Note"
            onChange={(e) => onChangeJobStatusNote(e.target.value)}
            slotProps={{ htmlInput: { maxLength: MAX_LENGTH_NOTE } }}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack spacing={1} px={2} py={1}>
          <Button variant="soft" color="neutral" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onConfirm} loading={isLoading}>
            Confirm
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
