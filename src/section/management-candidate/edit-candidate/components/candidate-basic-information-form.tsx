import { Grid, MenuItem, Stack, Typography } from '@mui/material';
import { Field } from 'components/hook-form/fields';

// ----------------------------------------------------------------------

export const CandidateBasicInformationForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Select name="gender" label="Gender" required>
          {MOCK_OPTION.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Field.Select>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Text name="age" label="Age" required />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Text name="contactNo" label="Contact No." required />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Text name="email" label="Email" required />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Autocomplete
          fullWidth
          required
          name="desiredLocation"
          label="Desired Location"
          options={MOCK_OPTION}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Autocomplete
          fullWidth
          required
          name="desiredProvince"
          label="Desired Province"
          options={MOCK_OPTION}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Autocomplete
          fullWidth
          required
          name="highestEducation"
          label="Highest Education"
          options={MOCK_OPTION}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Text name="workExperience" label="Work Experience" required />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Stack spacing={1.5} direction="column">
          <Typography variant="subtitle2_bold">Motorcycle Driving?</Typography>
          <Field.RadioGroup
            row
            sx={{ gap: 1 }}
            name="motorcycleDriving"
            options={[
              { label: 'ได้ มีใบขับขี่', value: 'radio-1' },
              { label: 'ได้ ไม่มีใบขับขี่', value: 'radio-2' },
              { label: 'ไม่ได้', value: 'radio-3' },
            ]}
          />
        </Stack>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Stack spacing={1.5} direction="column">
          <Typography variant="subtitle2_bold">Car Driving</Typography>
          <Field.RadioGroup
            row
            sx={{ gap: 1 }}
            name="carDriving"
            options={[
              { label: 'ได้ มีใบขับขี่', value: 'radio-1' },
              { label: 'ได้ ไม่มีใบขับขี่', value: 'radio-2' },
              { label: 'ไม่ได้', value: 'radio-3' },
            ]}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

const MOCK_OPTION = [
  { label: 'option 1', value: 'option1' },
  { label: 'option 2', value: 'option2' },
];
