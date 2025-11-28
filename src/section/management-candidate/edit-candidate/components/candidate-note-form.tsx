import { useFormContext, useWatch } from 'react-hook-form';
import { Grid, Stack, Typography } from '@mui/material';
import { Field } from 'components/hook-form/fields';
import { TEditCandidate } from '../schema';

// ----------------------------------------------------------------------

const MAX_LENGTH_NOTE = 250;

// ----------------------------------------------------------------------

export const CandidateNoteForm = () => {
  const { control } = useFormContext<TEditCandidate>();

  const selectedNote = useWatch<TEditCandidate>({
    control,
    name: 'note',
  });

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Field.Text name="note" multiline rows={3} placeholder="Note" maxLength={MAX_LENGTH_NOTE} />
        <Stack spacing={0.4} justifyContent="end">
          <Typography variant="caption_semibold">{selectedNote?.length || 0}</Typography>
          <Typography variant="caption_regular">/ {MAX_LENGTH_NOTE}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};
