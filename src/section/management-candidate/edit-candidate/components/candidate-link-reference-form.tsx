import { Grid } from '@mui/material';
import { Field } from 'components/hook-form/fields';

// ----------------------------------------------------------------------

export const CandidateLinkReferenceForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Field.Text name="link" label="Link" required />
      </Grid>
    </Grid>
  );
};
