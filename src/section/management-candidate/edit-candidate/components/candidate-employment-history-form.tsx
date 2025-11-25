import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { OPTION_CONFIRM, OPTION_HAS_EXPERIENCE } from 'constant/enum';
import IconifyIcon from 'components/base/IconifyIcon';
import { Field } from 'components/hook-form/fields';
import { TEditCandidate } from '../schema';
import { StyledBackgroundForm } from '../styles';

// ----------------------------------------------------------------------

export const CandidateEmploymentHistoryForm = () => {
  // form context -------------------------------------------------------

  const { control } = useFormContext<TEditCandidate>();

  const { fields, append, remove } = useFieldArray({ control, name: 'workHistorys' });

  const isWorkedBefore = useWatch<TEditCandidate>({
    control,
    name: 'isWorkedBefore',
  });

  const isAnyoneRecommend = useWatch<TEditCandidate>({
    control,
    name: 'isAnyoneRecommend',
  });

  // func -----------------------------------------------------------------

  const handleAddNewField = () => {
    append({
      companyName: '',
      officePhoneNo: '',
      startDate: '',
      endDate: '',
      businessType: '',
      lastPosition: '',
      responsibilities: '',
      salary: '',
      otherIncome: '',
      leavingReason: '',
    });
  };

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  // value ----------------------------------------------------------------

  const isDisabledAddButton = fields?.length === 1;

  // ----------------------------------------------------------------------

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="column" spacing={1.5}>
        <Typography variant="subtitle1_bold">Have you ever worked before ?:</Typography>

        <Grid container spacing={2}>
          <Grid size={12}>
            <Field.RadioGroup
              row
              disabled
              sx={{ gap: 1 }}
              name="isWorkedBefore"
              options={OPTION_HAS_EXPERIENCE.map((option) => option)}
            />
          </Grid>

          {isWorkedBefore === 'YES' && (
            <>
              {fields.map((field, index) => (
                <Grid size={12} key={field.id}>
                  <StyledBackgroundForm>
                    <Typography variant="subtitle1_bold">Employment Detail</Typography>

                    <Grid container spacing={2} alignItems="center" mt={1.5}>
                      <Grid size={11}>
                        <Grid container spacing={2}>
                          <Grid size={12}>
                            <Field.Text
                              disabled
                              label="Company Name/Address"
                              name={`workHistorys[${index}].companyName`}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <Field.Text
                              disabled
                              label="Phone Number"
                              name={`workHistorys[${index}].officePhoneNo`}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <Field.DatePicker
                              disabled
                              label="Employment Period Start"
                              name={`workHistorys[${index}].startDate`}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <Field.DatePicker
                              disabled
                              label="Employment Period End"
                              name={`workHistorys[${index}].endDate`}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <Field.Text
                              disabled
                              label="Type of Business"
                              name={`workHistorys[${index}].businessType`}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <Field.Text
                              disabled
                              label="Job Title"
                              name={`workHistorys[${index}].lastPosition`}
                            />
                          </Grid>
                          <Grid size={12}>
                            <Field.Text
                              disabled
                              label="Job Responsibilities"
                              name={`workHistorys[${index}].responsibilities`}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <Field.Text
                              disabled
                              label="Basic Salary (Baht)"
                              name={`workHistorys[${index}].salary`}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <Field.Text
                              disabled
                              label="Other Income (Baht)"
                              name={`workHistorys[${index}].otherIncome`}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <Field.Text
                              disabled
                              label="Reason for Leaving"
                              name={`workHistorys[${index}].leavingReason`}
                            />
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
                Add Employment
              </Button>
            </>
          )}
        </Grid>
      </Stack>

      <Stack direction="column" spacing={1.5}>
        <Typography variant="subtitle1_bold">
          Did anyone recommend you to apply for the Job at Ngern Tid Lor?
        </Typography>

        <Field.RadioGroup
          row
          disabled
          sx={{ gap: 1 }}
          name="isAnyoneRecommend"
          options={OPTION_CONFIRM.map((option) => option)}
        />

        {isAnyoneRecommend === 'YES' && (
          <StyledBackgroundForm>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Field.Text label="Name" name="recommender.name" disabled />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Field.Text label="Relation" name="recommender.relation" disabled />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Field.Text label="Position" name="recommender.position" disabled />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Field.Text label="Phone Number" name="recommender.mobileNo" disabled />
              </Grid>
            </Grid>
          </StyledBackgroundForm>
        )}
      </Stack>
    </Stack>
  );
};
