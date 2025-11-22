import { Box, Button, Stack, TextField, Typography } from '@mui/material';

const NoteBox = () => {
  return (
    <Box>
      <TextField label="write a Note" multiline rows={4} fullWidth />
      <Stack pt={1} position={'absolute'} right={0} gap={'4px'}>
        <Typography variant="caption_semibold">100</Typography>
        <Typography variant="caption_regular">/ 255</Typography>
      </Stack>
      <Button size="medium" variant="contained" sx={{ mt: 3 }}>
        Add note
      </Button>
    </Box>
  );
};

export default NoteBox;
