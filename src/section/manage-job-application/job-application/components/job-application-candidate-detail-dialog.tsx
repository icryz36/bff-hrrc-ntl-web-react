import { forwardRef } from 'react';
import { Dialog, IconButton, Stack } from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { CandidateDetail } from 'section/management-candidate/candidate-detail/components/candidate-detail';
import IconifyIcon from 'components/base/IconifyIcon';

// ----------------------------------------------------------------------

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<unknown> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type JobApplicationCandidateDetailDialogProps = {
  open: boolean;
  onClose: VoidFunction;
  candidateId: string;
};

export const JobApplicationCandidateDetailDialog = ({
  open,
  onClose,
  candidateId,
}: JobApplicationCandidateDetailDialogProps) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      slots={{ transition: Transition }}
      slotProps={{ paper: { sx: { borderRadius: 0 } } }}
    >
      <Stack justifyContent="end" p={3}>
        <IconButton onClick={onClose}>
          <IconifyIcon icon="iconoir:cancel" color="black" />
        </IconButton>
      </Stack>
      <CandidateDetail candidateId={candidateId} />;
    </Dialog>
  );
};
