import { useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { MenuItem, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { OPTION_TRANSMISSION_TYPE, OPTION_YES_NO } from 'constant/enum';
import { SKILLS } from 'data/skills';
import { useMasterDataQuery } from 'services/master-data/query';
import { Field } from 'components/hook-form/fields';
import { TEditCandidate } from '../schema';
import { StyledBackgroundForm } from '../styles';

// ----------------------------------------------------------------------

export const CandidateSkillSpecialAbilityForm = () => {
  // api ----------------------------------------------------------------

  const { data: skillList } = useQuery(useMasterDataQuery.skill());
  console.log('skillList', skillList);

  // form context -------------------------------------------------------

  const { control } = useFormContext<TEditCandidate>();

  const hasNlInsBrokerLicenseNo = useWatch<TEditCandidate>({
    control,
    name: 'hasNlInsBrokerLicenseNo',
  });

  const hasNlInsAgentLicenseNo = useWatch<TEditCandidate>({
    control,
    name: 'hasNlInsAgentLicenseNo',
  });

  const hasLInsBrokerLicenseNo = useWatch<TEditCandidate>({
    control,
    name: 'hasLInsBrokerLicenseNo',
  });

  const hasLInsAgentLicenseNo = useWatch<TEditCandidate>({
    control,
    name: 'hasLInsAgentLicenseNo',
  });

  const { fields, replace } = useFieldArray({
    control,
    name: 'skills',
  });

  // hook ---------------------------------------------------------------

  // set default value field
  useEffect(() => {
    if (SKILLS && SKILLS?.length > 0 && fields?.length === 0) {
      const defaultSkills = SKILLS?.map((skill) => ({
        skillText: '',
        selectedOptionId: [],
        skillId: skill.skillId,
      }));

      replace(defaultSkills);
    }
  }, [fields?.length, replace, SKILLS]);

  // ---------------------------------------------------------------------

  return (
    <Stack spacing={2} direction="column">
      <Stack direction="column" spacing={2}>
        <Typography variant="subtitle1_bold">Computer & Programming Skills</Typography>

        <StyledBackgroundForm>
          <Stack spacing={2} direction="column">
            {fields.map((field, index) => {
              const skill = SKILLS[index];
              if (!skill) return null;

              return (
                <Stack direction="column" spacing={1.5} key={field.id}>
                  <Typography variant="subtitle2_bold">{skill.skillNameTh}</Typography>

                  {skill.skillOptionType === 'Checkbox' && (
                    <Field.MultiCheckbox
                      row
                      name={`skills.${index}.selectedOptionId`}
                      options={skill.skillOptions?.map((option) => ({
                        label: option.skillTextTh,
                        value: option.skillOptionId,
                      }))}
                    />
                  )}

                  {skill.skillOptionType === 'Dropdown' && (
                    <Field.Select
                      name={`skills.${index}.selectedOptionId.0`}
                      label={skill.skillNameTh}
                    >
                      {skill.skillOptions?.map((option) => (
                        <MenuItem key={option.skillOptionId} value={option.skillOptionId}>
                          {option.skillTextTh}
                        </MenuItem>
                      ))}
                    </Field.Select>
                  )}

                  {skill.skillOptionType === 'Radio' && (
                    <Field.RadioGroup
                      row
                      sx={{ gap: 1 }}
                      name={`skills.${index}.selectedOptionId.0`}
                      options={skill.skillOptions?.map((option) => ({
                        value: option.skillOptionId,
                        label: option.skillTextTh,
                      }))}
                    />
                  )}

                  {skill.isSkillFreeText && (
                    <Field.Text name={`skills.${index}.skillText`} label="อื่นๆ โปรดระบุ *" />
                  )}
                </Stack>
              );
            })}
          </Stack>
        </StyledBackgroundForm>
      </Stack>

      {/* Insurance License */}

      <Stack spacing={2} direction="column">
        <Typography variant="subtitle1_bold">Insurance License</Typography>

        <StyledBackgroundForm>
          <Stack spacing={2} direction="column">
            <Stack spacing={1.5} direction="column">
              <Typography variant="subtitle2_bold">Non-Life Insurance Broker License:</Typography>
              <Field.RadioGroup
                row
                sx={{ gap: 1 }}
                name="hasNlInsBrokerLicenseNo"
                options={OPTION_YES_NO.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
              />

              {hasNlInsBrokerLicenseNo === 'YES' && (
                <Field.Text name="nlInsBrokerLicenseNo" label="License No." />
              )}
            </Stack>

            <Stack spacing={1.5} direction="column">
              <Typography variant="subtitle2_bold">Non-Life Insurance Agent License:</Typography>
              <Field.RadioGroup
                row
                sx={{ gap: 1 }}
                name="hasNlInsAgentLicenseNo"
                options={OPTION_YES_NO.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
              />

              {hasNlInsAgentLicenseNo === 'YES' && (
                <Field.Text name="nlInsAgentLicenseNo" label="License No." />
              )}
            </Stack>

            <Stack spacing={1.5} direction="column">
              <Typography variant="subtitle2_bold">Life Insurance Broker License:</Typography>
              <Field.RadioGroup
                row
                sx={{ gap: 1 }}
                name="hasLInsBrokerLicenseNo"
                options={OPTION_YES_NO.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
              />

              {hasLInsBrokerLicenseNo === 'YES' && (
                <Field.Text name="lInsBrokerLicenseNo" label="License No." />
              )}
            </Stack>

            <Stack spacing={1.5} direction="column">
              <Typography variant="subtitle2_bold">Life Insurance Agent License:</Typography>
              <Field.RadioGroup
                row
                sx={{ gap: 1 }}
                name="hasLInsAgentLicenseNo"
                options={OPTION_YES_NO.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
              />

              {hasLInsAgentLicenseNo === 'YES' && (
                <Field.Text name="lInsAgentLicenseNo" label="License No." />
              )}
            </Stack>
          </Stack>
        </StyledBackgroundForm>
      </Stack>

      {/* Car Owner */}

      <Stack spacing={2} direction="column">
        <Typography variant="subtitle1_bold">Car Owner</Typography>

        <StyledBackgroundForm>
          <Stack spacing={2} direction="column">
            <Stack spacing={1.5} direction="column">
              <Typography variant="subtitle2_bold">Transmission Type:</Typography>
              <Field.MultiCheckbox
                row
                name="transmissionTypeCar"
                options={OPTION_TRANSMISSION_TYPE.map((option) => option)}
              />
            </Stack>
            <Stack spacing={1.5} direction="column">
              <Typography variant="subtitle2_bold">Own Car:</Typography>
              <Field.RadioGroup
                row
                name="ownCar"
                sx={{ gap: 1 }}
                options={OPTION_YES_NO.map((option) => option)}
              />
            </Stack>
          </Stack>
        </StyledBackgroundForm>
      </Stack>

      {/* Motorcycle Owner */}

      <Stack spacing={2} direction="column">
        <Typography variant="subtitle1_bold">Motorcycle Owner</Typography>

        <StyledBackgroundForm>
          <Stack spacing={2} direction="column">
            <Stack spacing={1.5} direction="column">
              <Typography variant="subtitle2_bold">Transmission Type:</Typography>
              <Field.MultiCheckbox
                row
                name="transmissionTypeMotorcycle"
                options={OPTION_TRANSMISSION_TYPE.map((option) => option)}
              />
            </Stack>
            <Stack spacing={1.5} direction="column">
              <Typography variant="subtitle2_bold">Own Motorcycle:</Typography>
              <Field.RadioGroup
                row
                sx={{ gap: 1 }}
                name="ownMotorcycle"
                options={OPTION_YES_NO.map((option) => option)}
              />
            </Stack>
          </Stack>
        </StyledBackgroundForm>
      </Stack>
    </Stack>
  );
};
