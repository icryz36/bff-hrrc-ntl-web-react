import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { Field } from 'components/hook-form/fields';
import { TEditCandidate } from '../schema';
import { StyledBackgroundForm } from '../styles';

// -----------------------------------------------------------------------

export const CandidatePersonalReferencesForm = () => {
  const { control } = useFormContext<TEditCandidate>();

  const { fields, append, remove } = useFieldArray({ control, name: 'referencePersons' });

  // func -----------------------------------------------------------------

  const handleAddNewField = () => {
    append({
      name: '',
      position: '',
      relation: '',
      workplace: '',
      mobileNo: '',
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
        <Typography variant="subtitle1_bold">
          Please give supervisor’s name who can refer your reference and behavior
        </Typography>
      </Grid>

      {fields.map((field, index) => (
        <Grid size={12} key={field.id}>
          <StyledBackgroundForm>
            <Grid container spacing={2} alignItems="center">
              <Grid size={11}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Field.Text name={`referencePersons[${index}].name`} label="Name" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Field.Text name={`referencePersons[${index}].position`} label="Position" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Field.Text name={`referencePersons[${index}].relation`} label="Relation" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Field.Text name={`referencePersons[${index}].workplace`} label="Workplace" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Field.Text name={`referencePersons[${index}].mobileNo`} label="Phone Number" />
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
        Add References
      </Button>
    </Grid>
  );
};
