import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button, Grid, IconButton, MenuItem, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMasterDataQuery } from 'services/master-data/query';
import IconifyIcon from 'components/base/IconifyIcon';
import { Field } from 'components/hook-form/fields';
import { TEditCandidate } from '../schema';
import { StyledBackgroundForm } from '../styles';

// -----------------------------------------------------------------------

export const CandidatePersonalDataForm = () => {
  // form context --------------------------------------------------------

  const { control } = useFormContext<TEditCandidate>();

  const {
    fields: fieldsFamilys,
    append: appendFamilys,
    remove: removeFamilys,
  } = useFieldArray({ control, name: 'familys' });

  const {
    fields: fieldsEmergency,
    append: appendEmergency,
    remove: removeEmergency,
  } = useFieldArray({ control, name: 'emergency' });

  // api -----------------------------------------------------------------

  const { data: provinceList = [] } = useQuery(useMasterDataQuery.province());

  // func ----------------------------------------------------------------

  const handleAddFamilys = () => {
    appendFamilys({
      relationship: '',
      name: '',
      age: 0,
      mobileNo: '',
      occupation: '',
      workplace: '',
    });
  };

  const handleAddEmergency = () => {
    appendEmergency({
      relationship: '',
      name: '',
      mobileNo: '',
    });
  };

  const handleRemoveFamilys = (index: number) => {
    removeFamilys(index);
  };

  const handleRemoveEmergency = (index: number) => {
    removeEmergency(index);
  };

  // value ----------------------------------------------------------------

  const isDisabledAddFamilysButton = fieldsFamilys?.length === 1;
  const isDisabledAddEmergencyButton = fieldsEmergency?.length === 1;

  // ----------------------------------------------------------------------

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Field.Text name="address" label="Present Address" disabled />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Field.Text name="lineId" label="Line ID" disabled />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Field.DatePicker name="dateOfBirth" label="Date of Birth" disabled />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Field.Text name="height" label="Height (cm.)" disabled />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Field.Text name="weight" label="Weight (kg.)" disabled />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Field.Text name="nationality" label="Nationality" disabled />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Field.DatePicker name="religion" label="Religion" disabled />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Field.Select name="bloodGroup" label="Blood Group" disabled>
            {MOCK_OPTION.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Field.DatePicker name="placeofBirthId" label="Place of Birth" disabled />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Field.DatePicker name="idNo" label="ID Card No." disabled />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Field.Autocomplete
            disabled
            fullWidth
            options={provinceList}
            label="Issued by Province"
            name="cardissuedProvinceId"
            getOptionLabel={(option) => option.provinceNameTh}
            isOptionEqualToValue={(option, value) => option.provinceId === value.provinceId}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Field.DatePicker name="cardissuedDate" label="Issued Date" disabled />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Field.DatePicker name="cardexpiredDate" label="Expired Date" disabled />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Stack spacing={1.5} direction="column">
            <Typography variant="subtitle2_bold">Military Service:</Typography>
            <Field.RadioGroup
              row
              sx={{ gap: 1 }}
              disabled
              name="militaryStatus"
              options={[
                { label: 'เกณฑ์แล้ว', value: 'radio-1' },
                { label: 'ได้รับการยกเว้น', value: 'radio-2' },
                { label: 'ยังไม่ได้เกณฑ์', value: 'radio-3' },
                { label: 'อื่นๆ', value: 'radio-4' },
              ]}
            />
          </Stack>
        </Grid>
      </Grid>

      {/* Family Details */}

      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="subtitle1_bold">Family Details</Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Stack spacing={1.5} direction="column">
            <Typography variant="subtitle2_bold">Marital Status:</Typography>
            <Field.RadioGroup
              row
              sx={{ gap: 1 }}
              disabled
              name="maritalStatus"
              options={[
                { label: 'โสด', value: 'radio-1' },
                { label: 'สมรส - จดทะเบียน', value: 'radio-2' },
                { label: 'สมรส - ไม่จดทะเบียน', value: 'radio-3' },
                { label: 'สมรสเท่าเทียม - จดทะเบียน', value: 'radio-4' },
                { label: 'สมรสเท่าเทียม - ไม่จดทะเบียน', value: 'radio-5' },
                { label: 'หย่า', value: 'radio-6' },
                { label: 'หม้าย', value: 'radio-7' },
              ]}
            />
          </Stack>
        </Grid>

        {fieldsFamilys.map((field, index) => (
          <Grid size={12} key={field.id}>
            <StyledBackgroundForm>
              <Grid container spacing={2} alignItems="center">
                <Grid size={11}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Field.Select
                        name={`familys[${index}].relationship`}
                        label="Relation"
                        disabled
                      >
                        {MOCK_OPTION.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field.Select>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Field.Text name={`familys[${index}].name`} label="Name" disabled />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Field.Text
                        name={`familys[${index}].age`}
                        label="Age"
                        type="number"
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Field.Text
                        name={`familys[${index}].mobileNo`}
                        label="Phone Number"
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Field.Text
                        name={`familys[${index}].occupation`}
                        label="Occupation"
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Field.Text name={`familys[${index}].workplace`} label="Workplace" disabled />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid size={1}>
                  <IconButton
                    color="error"
                    disabled={isDisabledAddFamilysButton}
                    onClick={() => handleRemoveFamilys(index)}
                  >
                    <IconifyIcon
                      icon="material-symbols-light:delete-outline-rounded"
                      sx={{ color: isDisabledAddFamilysButton ? 'text.disabled' : 'error.main' }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </StyledBackgroundForm>
          </Grid>
        ))}

        <Button
          disabled
          color="primary"
          variant="outlined"
          onClick={handleAddFamilys}
          startIcon={<IconifyIcon icon="material-symbols:add-rounded" />}
        >
          Add Member
        </Button>
      </Grid>

      {/* Contact in case emergency */}

      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="subtitle1_bold">Contact in case emergency</Typography>
        </Grid>

        {fieldsEmergency.map((field, index) => (
          <Grid size={12} key={field.id}>
            <StyledBackgroundForm>
              <Grid container spacing={2} alignItems="center">
                <Grid size={11}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Field.Select
                        name={`emergency[${index}].relationship`}
                        label="Relation"
                        disabled
                      >
                        {MOCK_OPTION.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field.Select>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Field.Text name={`emergency[${index}].name`} label="Name" disabled />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Field.Text
                        name={`emergency[${index}].mobileNo`}
                        label="Phone Number"
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid size={1}>
                  <IconButton
                    color="error"
                    disabled={isDisabledAddEmergencyButton}
                    onClick={() => handleRemoveEmergency(index)}
                  >
                    <IconifyIcon
                      icon="material-symbols-light:delete-outline-rounded"
                      sx={{ color: isDisabledAddEmergencyButton ? 'text.disabled' : 'error.main' }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </StyledBackgroundForm>
          </Grid>
        ))}

        <Button
          disabled
          color="primary"
          variant="outlined"
          onClick={handleAddEmergency}
          startIcon={<IconifyIcon icon="material-symbols:add-rounded" />}
        >
          Add Contact
        </Button>
      </Grid>
    </>
  );
};

const MOCK_OPTION = [
  { label: 'option 1', value: 'option1' },
  { label: 'option 2', value: 'option2' },
];
