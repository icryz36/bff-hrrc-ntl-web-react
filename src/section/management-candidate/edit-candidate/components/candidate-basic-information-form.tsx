import { useFormContext } from 'react-hook-form';
import { Grid, MenuItem, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { OPTION_GENDER, OPTION_VEHICLE } from 'constant/enum';
import { useMasterDataQuery } from 'services/master-data/query';
import { Field } from 'components/hook-form/fields';

// ----------------------------------------------------------------------

export const CandidateBasicInformationForm = () => {
  const { setValue } = useFormContext();
  const { data: provinceList = [] } = useQuery(useMasterDataQuery.province());

  //const { data: degreeList = [] } = useQuery(useMasterDataQuery.degree());

  // value ---------------------------------------------------------------

  const optionProvince = provinceList?.map((item) => ({
    provinceId: item.provinceId || '',
    provinceName: item.provinceNameTh || '',
  }));

  // handler ---------------------------------------------------------------

  const handleAgeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const currentValue = target.value;

    const isNavigationKey = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Home',
      'End',
    ].includes(e.key);
    const isModifierKey = e.ctrlKey || e.metaKey || e.altKey;
    if (currentValue.length >= 2 && !isNavigationKey && !isModifierKey && /[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleAgeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if (value) {
      const numericValue = Number(value);
      if (!isNaN(numericValue)) {
        if (numericValue > 99) {
          target.value = '99';
          setValue('age', 99, { shouldDirty: true, shouldValidate: true });
        } else if (numericValue < 0) {
          target.value = '0';
          setValue('age', 0, { shouldDirty: true, shouldValidate: true });
        }
      }
    }
  };

  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, '');

    const limitedNumbers = numbers.slice(0, 10);

    if (limitedNumbers.length <= 3) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 6) {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
    } else {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 6)}-${limitedNumbers.slice(6)}`;
    }
  };

  const handleContactNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhoneNumber(value);
    setValue('contactNo', formatted, { shouldDirty: true, shouldValidate: true });
  };

  const handleContactNoKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumber = /[0-9]/.test(e.key);
    const isNavigationKey = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Home',
      'End',
    ].includes(e.key);
    const isModifierKey = e.ctrlKey || e.metaKey || e.altKey;

    if (!isNumber && !isNavigationKey && !isModifierKey) {
      e.preventDefault();
    }
  };

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
        <Field.Text
          name="age"
          label="Age"
          required
          type="number"
          slotProps={{
            input: {
              inputProps: {
                min: 0,
                max: 99,
                onKeyPress: handleAgeKeyPress,
                onInput: handleAgeInput,
              },
            },
          }}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Field.Text
          name="contactNo"
          label="Contact No."
          required
          onChange={handleContactNoChange}
          slotProps={{
            input: {
              inputProps: {
                inputMode: 'numeric',
                pattern: '[0-9]*',
                maxLength: 12, // 099-999-9999 = 12 characters
                onKeyPress: handleContactNoKeyPress,
              },
            },
          }}
        />
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
