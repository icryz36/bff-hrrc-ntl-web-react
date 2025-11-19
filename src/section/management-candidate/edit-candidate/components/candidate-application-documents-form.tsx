import { Grid, MenuItem, Typography } from '@mui/material';
import { Field } from 'components/hook-form/fields';

// ----------------------------------------------------------------------

export const CandidateApplicationDocumentsForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="body2_regular" color="text.secondary">
          Supporting documents such as resume, transcript, or certificates.
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Field.Select name="documents" label="Documents" required>
          {MOCK_OPTION.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Field.Select>
      </Grid>
      {/* <Grid size={{ xs: 12 }}>
        <Field.Upload name="files" />
      </Grid> */}
    </Grid>
  );
};

const MOCK_OPTION = [
  { label: 'option 1', value: 'option1' },
  { label: 'option 2', value: 'option2' },
];
