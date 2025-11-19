import { Grid, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export const CandidateNoteForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        {/* <Field.Text name="note" variant="outlined" /> */}

        <Typography variant="subtitle2_regular" color="text.secondary">
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Typography>
      </Grid>
    </Grid>
  );
};
