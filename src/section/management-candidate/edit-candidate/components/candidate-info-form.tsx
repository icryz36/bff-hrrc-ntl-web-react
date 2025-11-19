import { Grid, MenuItem } from '@mui/material';
import { Field } from 'components/hook-form/fields';

// ----------------------------------------------------------------------

export const CandidateInfoForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}>
        <Field.Select name="title" label="Title" required>
          {MOCK_OPTION.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Field.Select>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Field.Text name="name" label="Name" required />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Field.Text name="surName" label="Surname" required />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Field.Text name="nickName" label="Nickname" required />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Text name="candidateId" label="Candidate ID" disabled />
      </Grid>
    </Grid>
  );
};

const MOCK_OPTION = [
  { label: 'option 1', value: 'option1' },
  { label: 'option 2', value: 'option2' },
];
