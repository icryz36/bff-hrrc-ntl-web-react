import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { Field } from 'components/hook-form/fields';
import { TEditCandidate } from '../schema';
import { StyledBackgroundForm } from '../styles';

// ----------------------------------------------------------------------

export const CandidateLanguageForm = () => {
  const { control } = useFormContext<TEditCandidate>();

  const { fields, append, remove } = useFieldArray({ control, name: 'languages' });

  // func -----------------------------------------------------------------

  const handleAddNewField = () => {
    append({
      language: null,
      speaking: '',
      reading: '',
      writing: '',
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
      {fields.map((field, index) => (
        <Grid size={12} key={field.id}>
          <StyledBackgroundForm>
            <Grid container spacing={2} alignItems="center">
              <Grid size={11}>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Field.Autocomplete
                      fullWidth
                      disabled
                      label="Language"
                      options={MOCK_OPTION}
                      name={`languages[${index}].language`}
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Stack spacing={1.5} alignItems="center">
                      <Typography variant="subtitle2_bold" sx={{ width: 80 }}>
                        Speaking:
                      </Typography>
                      <Field.RadioGroup
                        row
                        disabled
                        sx={{ gap: 1 }}
                        name={`languages[${index}].speaking`}
                        options={[
                          { label: 'ดีมาก', value: 'radio-1' },
                          { label: 'ดี', value: 'radio-2' },
                          { label: 'พอใช้', value: 'radio-3' },
                          { label: 'ปรับปรุง', value: 'radio-4' },
                        ]}
                      />
                    </Stack>
                  </Grid>
                  <Grid size={12}>
                    <Stack spacing={1.5} alignItems="center">
                      <Typography variant="subtitle2_bold" sx={{ width: 80 }}>
                        Reading:
                      </Typography>
                      <Field.RadioGroup
                        row
                        disabled
                        sx={{ gap: 1 }}
                        name={`languages[${index}].reading`}
                        options={[
                          { label: 'ดีมาก', value: 'radio-1' },
                          { label: 'ดี', value: 'radio-2' },
                          { label: 'พอใช้', value: 'radio-3' },
                          { label: 'ปรับปรุง', value: 'radio-4' },
                        ]}
                      />
                    </Stack>
                  </Grid>
                  <Grid size={12}>
                    <Stack spacing={1.5} alignItems="center">
                      <Typography variant="subtitle2_bold" sx={{ width: 80 }}>
                        Writing:
                      </Typography>
                      <Field.RadioGroup
                        row
                        disabled
                        sx={{ gap: 1 }}
                        name={`languages[${index}].writing`}
                        options={[
                          { label: 'ดีมาก', value: 'radio-1' },
                          { label: 'ดี', value: 'radio-2' },
                          { label: 'พอใช้', value: 'radio-3' },
                          { label: 'ปรับปรุง', value: 'radio-4' },
                        ]}
                      />
                    </Stack>
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
        disabled
        color="primary"
        variant="outlined"
        onClick={handleAddNewField}
        startIcon={<IconifyIcon icon="material-symbols:add-rounded" />}
      >
        Add Language
      </Button>
    </Grid>
  );
};

const MOCK_OPTION = [
  { label: 'option 1', value: 'option1' },
  { label: 'option 2', value: 'option2' },
];
