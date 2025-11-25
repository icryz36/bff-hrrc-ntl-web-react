import { Grid, MenuItem, Typography } from '@mui/material';
import { DOCUMENT_TYPES } from 'data/document';
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
          {DOCUMENT_TYPES.map((option) => (
            <MenuItem key={option.documentTypeId} value={option.documentTypeId}>
              {option.documentTypeNameTh}
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
