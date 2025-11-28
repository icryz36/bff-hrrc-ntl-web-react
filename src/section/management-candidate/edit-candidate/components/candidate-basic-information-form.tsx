import { Grid, MenuItem, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { OPTION_GENDER, OPTION_VEHICLE } from 'constant/enum';
import { useMasterDataQuery } from 'services/master-data/query';
import { Field } from 'components/hook-form/fields';

// ----------------------------------------------------------------------

export const CandidateBasicInformationForm = () => {
  const { data: provinceList = [] } = useQuery(useMasterDataQuery.province());

  //const { data: degreeList = [] } = useQuery(useMasterDataQuery.degree());

  // value ---------------------------------------------------------------

  const optionProvince = provinceList?.map((item) => ({
    provinceId: item.provinceId || '',
    provinceName: item.provinceNameTh || '',
  }));

  // ----------------------------------------------------------------------

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Select name="gender" label="Gender" required>
          {OPTION_GENDER.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Field.Select>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Text name="age" label="Age" required type="number" />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Text name="contactNo" label="Contact No." required />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Text name="email" label="Email" required />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Text name="desiredLocation" label="Desired Location" required />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Autocomplete
          fullWidth
          required
          multiple
          disableCloseOnSelect
          name="desiredProvince"
          label="Desired Province"
          options={optionProvince}
          getOptionLabel={(option) => option?.provinceName}
          isOptionEqualToValue={(option, value) => option?.provinceId === value?.provinceId}
        />
      </Grid>

      {/* <Grid size={{ xs: 12, md: 6 }}>
        <Field.Select name="highestEducation" label="Highest Education">
          {degreeList?.map((option) => (
            <MenuItem key={option.degreeId} value={option.degreeId}>
              {option.degreeNameTh}
            </MenuItem>
          ))}
        </Field.Select>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Text name="workExperience" label="Work Experience" required />
      </Grid> */}

      <Grid size={{ xs: 12 }}>
        <Stack spacing={1.5} direction="column">
          <Typography variant="subtitle2_bold">Motorcycle Driving?</Typography>
          <Field.RadioGroup
            row
            sx={{ gap: 1 }}
            name="motorcycleDriving"
            options={OPTION_VEHICLE.map((option) => option)}
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
            options={OPTION_VEHICLE.map((option) => option)}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
