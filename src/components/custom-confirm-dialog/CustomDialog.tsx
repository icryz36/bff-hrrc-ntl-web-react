import { ReactNode } from 'react';
import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material';

// ----------------------------------------------------------------------

export type CustomConfirmDialogProps = DialogProps & {
  open: boolean;
  action: ReactNode;
  onClose?: VoidFunction;
  title: string | ReactNode;
  description?: string | ReactNode;
};

// ----------------------------------------------------------------------

const CustomConfirmDialog = ({
  open,
  onClose,
  title,
  description,
  action,
}: CustomConfirmDialogProps) => {
  // Func ---------------------------------------------------------------

  const handleClose: DialogProps['onClose'] = (_, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return;
    }
    onClose?.();
  };

  // ---------------------------------------------------------------------

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="xs"
      onClose={handleClose}
      slotProps={{ paper: { sx: { minWidth: 460, p: 1, borderRadius: '24px' } } }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions sx={{ pb: 2, pr: 2 }}>{action}</DialogActions>
    </Dialog>
  );
};

export default CustomConfirmDialog;
