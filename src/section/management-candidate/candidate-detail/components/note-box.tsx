import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useBoolean } from 'hooks/useBoolean';
import { useUpdateCandidate์NoteMutation } from 'services/candidate/mutation';
import { TCandidateNotePayload } from 'types/candidate';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';

interface NoteBoxProps {
  data?: string;
  candidateId: string;
}

const NoteBox = ({ data, candidateId }: NoteBoxProps) => {
  const isOpenUpdateFailedDialog = useBoolean();
  const isOpenUpdateSuccessDialog = useBoolean();
  const [note, setNote] = useState(data || '');
  const { mutate: updateCandidate, isPending: isLoadingUpdateCandidate } =
    useUpdateCandidate์NoteMutation();

  const handleAddNote = () => {
    updateCandidate({ note, candidateId } as TCandidateNotePayload, {
      onSuccess: (response) => {
        if (response.status) {
          isOpenUpdateSuccessDialog.onToggle();
          return;
        }
        isOpenUpdateFailedDialog.onToggle();
      },
      onError: () => {
        isOpenUpdateFailedDialog.onToggle();
      },
    });
  };
  return (
    <Box>
      <TextField
        label="write a Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        multiline
        rows={3}
        fullWidth
        inputProps={{ maxLength: 250 }}
      />
      <Stack pt={1} position={'absolute'} right={0} gap={'4px'}>
        <Typography variant="caption_semibold">{note.length}</Typography>
        <Typography variant="caption_regular">/ 250</Typography>
      </Stack>
      <LoadingButton
        disabled={note.length === 0}
        size="medium"
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleAddNote}
        loading={isLoadingUpdateCandidate}
      >
        Add note
      </LoadingButton>
      <CustomConfirmDialog
        title="บันทึกโน้ตสำเร็จ"
        open={isOpenUpdateSuccessDialog.value}
        onClose={isOpenUpdateSuccessDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ระบบได้บันทึกข้อมูลโน้ตเรียบร้อยแล้ว
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenUpdateSuccessDialog.onFalse}>
            Close
          </Button>
        }
      />
      <CustomConfirmDialog
        title="เกิดข้อผิดพลาด"
        open={isOpenUpdateFailedDialog.value}
        onClose={isOpenUpdateFailedDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ไม่สามารถแก้ไขข้อมูลได้ กรุณาลองใหม่อีกครั้ง
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenUpdateFailedDialog.onFalse}>
            Close
          </Button>
        }
      />
    </Box>
  );
};

export default NoteBox;
