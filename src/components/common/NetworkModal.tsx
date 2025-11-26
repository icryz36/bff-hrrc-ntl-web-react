// components/NetworkModal.tsx
import { useEffect, useState } from 'react';
import { Modal, Paper, Stack, Typography } from '@mui/material';

export function NetworkModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOffline = () => {
      setIsOpen(true);
    };

    const handleOnline = () => {
      setIsOpen(false);
    };

    // Listen to custom event from axios
    window.addEventListener('network-offline', handleOffline);

    // Listen to native browser events
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('network-offline', handleOffline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
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
        <Typography id="modal-modal-title" variant="h6">
          No internet
        </Typography>
        <Stack direction={'column'}>
          <Typography sx={{ mt: 2 }}>Try:</Typography>
          <Typography sx={{ pl: 3 }} variant="body2_light">
            Checking the network cables, modem, and router
          </Typography>
          <Typography sx={{ pl: 3 }} variant="body2_light">
            Reconnecting to Wi-Fi
          </Typography>
        </Stack>
      </Paper>
    </Modal>
  );
}
