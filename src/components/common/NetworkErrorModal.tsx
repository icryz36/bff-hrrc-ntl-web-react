// components/NetworkModal.tsx
import { useEffect, useState } from 'react';
import { Button, Modal, Paper, Stack, Typography } from '@mui/material';

export function NetworkErrorModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOffline = () => {
      setIsOpen(true);
    };

    const handleOnline = () => {
      setIsOpen(false);
    };

    // Listen to custom event from axios
    window.addEventListener('network-error', handleOffline);

    // Listen to native browser events
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('network-error', handleOffline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title-error"
      aria-describedby="modal-modal-description"
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 300, sm: 400 },
          borderRadius: 4,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title-error" variant="h6">
          เกิดข้อผิดพลาด
        </Typography>
        <Stack direction={'column'}>
          <Typography sx={{ pl: 3 }} variant="body2_light">
            ไม่สามารถดำเนินการได้ กรุณาลองใหม่อีกครั้ง
          </Typography>
        </Stack>
        <Stack justifyContent="flex-end">
          <Button onClick={() => setIsOpen(false)} variant="contained" size="small" color="primary">
            Close
          </Button>
        </Stack>
      </Paper>
    </Modal>
  );
}
