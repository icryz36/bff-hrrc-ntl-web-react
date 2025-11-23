import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button, Grid, IconButton, MenuItem, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { Field } from 'components/hook-form/fields';
import { TEditCandidate } from '../schema';
import { StyledBackgroundForm } from '../styles';

// ----------------------------------------------------------------------

export const CondidateEducationForm = () => {
  const { control } = useFormContext<TEditCandidate>();

  const { fields, append, remove } = useFieldArray({ control, name: 'educations' });

  // func -----------------------------------------------------------------

  const handleAddNewField = () => {
    append({
      degreeId: '',
      institutionName: '',
      startYear: '',
      endYear: '',
      degreeConferred: '',
      major: '',
      gpa: '',
    });
  };

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  // value ----------------------------------------------------------------

  const isDisabledAddButton = fields?.length === 1;

  // ----------------------------------------------------------------------

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="subtitle1_bold">Education Background</Typography>
      </Grid>

      {fields.map((field, index) => (
        <Grid size={12} key={field.id}>
          <StyledBackgroundForm>
            <Grid container spacing={2} alignItems="center">
              <Grid size={11}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Field.Select name={`educations[${index}].degreeId`} label="Education level">
                      {MOCK_OPTION.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field.Select>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Field.Text
                      label="Name Of Institute"
                      name={`educations[${index}].institutionName`}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 2 }}>
                    <Field.DatePicker
                      label="Started Year"
                      name={`educations[${index}].startYear`}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 2 }}>
                    <Field.DatePicker name={`educations[${index}].endYear`} label="Ended Year" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Field.Text
                      label="Degree Conferred"
                      name={`educations[${index}].degreeConferred`}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Field.Text label="Major Subject" name={`educations[${index}].major`} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Field.Text label="GPA" name={`educations[${index}].gpa`} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={1}>
                <IconButton
                  color="error"
                  disabled={isDisabledAddButton}
                  onClick={() => handleRemoveField(index)}
                >
                  <IconifyIcon
                    icon="material-symbols-light:delete-outline-rounded"
                    sx={{ color: isDisabledAddButton ? 'text.disabled' : 'error.main' }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </StyledBackgroundForm>
        </Grid>
      ))}

      <Button
        color="primary"
        variant="outlined"
        onClick={handleAddNewField}
        startIcon={<IconifyIcon icon="material-symbols:add-rounded" />}
      >
        Add Education
      </Button>
    </Grid>
  );
};

const MOCK_OPTION = [
  { label: 'option 1', value: 'option1' },
  { label: 'option 2', value: 'option2' },
];
