import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Stack, Typography } from '@mui/material';
import { QUSETIONS } from 'data/question';
import { Field } from 'components/hook-form/fields';
import { TEditCandidate } from '../schema';
import { StyledBackgroundForm } from '../styles';

// ----------------------------------------------------------------------

export const OtherInformationForm = () => {
  // form context -------------------------------------------------------

  const { control } = useFormContext<TEditCandidate>();

  const { fields, replace } = useFieldArray({
    control,
    name: 'questions',
  });

  // hook ---------------------------------------------------------------

  // set default value field
  useEffect(() => {
    if (QUSETIONS?.length > 0 && fields?.length === 0) {
      const defaultQuestion = QUSETIONS?.map((question) => ({
        answerText: '',
        answerOptionId: '',
        questionId: question.questionId,
      }));

      replace(defaultQuestion);
    }
  }, [fields?.length, replace, QUSETIONS]);

  // --------------------------------------------------------------------

  return (
    <StyledBackgroundForm>
      <Stack spacing={2} direction="column">
        {fields.map((field, index) => {
          const question = QUSETIONS[index];
          if (!question) return null;

          return (
            <Stack direction="column" spacing={1.5} key={field.id}>
              <Typography variant="subtitle2_bold">{question.questionTextTh}</Typography>
              <Field.RadioGroup
                row
                disabled
                sx={{ gap: 1 }}
                name={`questions.${index}.answerOptionId`}
                options={question.questionOptions?.map((option) => ({
                  value: option.optionId,
                  label: option.optionTextTh,
                }))}
              />
            </Stack>
          );
        })}
      </Stack>
    </StyledBackgroundForm>
  );
};
