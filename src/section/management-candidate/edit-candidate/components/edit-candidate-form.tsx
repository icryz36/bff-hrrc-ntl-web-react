import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, Stack } from '@mui/material';
import { Form } from 'components/hook-form';
import { defaultValues } from '../default-values-form';
import { EditCandidateSchema, TEditCandidate } from '../schema';
import { CandidateApplicationDocumentsForm } from './candidate-application-documents-form';
import { CandidateAppliedJobForm } from './candidate-applied-job-form';
import { CandidateBasicInformationForm } from './candidate-basic-information-form';
import { CandidateEmploymentHistoryForm } from './candidate-employment-history-form';
import { CandidateHobbyAndInterestForm } from './candidate-hobby-and-Interest-form';
import { CandidateInfoForm } from './candidate-info-form';
import { CandidateLanguageForm } from './candidate-language-form';
import { CandidateLinkReferenceForm } from './candidate-link-reference-form';
import { CandidateNoteForm } from './candidate-note-form';
import { CandidatePersonalDataForm } from './candidate-personal-data-form';
import { CandidatePersonalReferencesForm } from './candidate-personal-references-form';
import { CandidateSkillSpecialAbilityForm } from './candidate-skill-special-ability-form';
import { CondidateEducationForm } from './condidate-education-form';
import { OtherInformationForm } from './other-information-form';

// ----------------------------------------------------------------------

// const FORM_LIST = [
//   {
//     icon: 'mdi:account-outline',
//     title: 'Applied Job',
//     children: <CandidateAppliedJobForm />,
//   },
//   {
//     icon: 'mdi:account-outline',
//     title: 'Basic information',
//     children: <CandidateBasicInformationForm />,
//   },
//   {
//     icon: 'mdi:note-text-outline',
//     title: 'Application Documents',
//     children: <CandidateApplicationDocumentsForm />,
//   },
//   {
//     icon: 'mdi:note-text-outline',
//     title: 'Link Reference',
//     children: <CandidateLinkReferenceForm />,
//   },
//   {
//     icon: 'mdi:note-text-outline',
//     title: 'Note (Optional)',
//     children: <CandidateNoteForm />,
//   },
//   {
//     icon: 'mdi:account-outline',
//     title: 'Personal Data',
//     children: <CandidatePersonalDataForm />,
//   },
//   {
//     icon: 'mdi:account-box-outline',
//     title: 'Personal References',
//     children: <CandidatePersonalReferencesForm />,
//   },
//   {
//     icon: 'mdi:education-outline',
//     title: 'Education',
//     children: <CondidateEducationForm />,
//   },
//   {
//     icon: 'material-symbols:language',
//     title: 'Language',
//     children: <CandidateLanguageForm />,
//   },
//   {
//     icon: 'mdi:folder-outline',
//     title: 'Office Skill & Special Ability',
//     children: <CandidateSkillSpecialAbilityForm />,
//   },
//   {
//     icon: 'line-md:briefcase',
//     title: 'Employment History',
//     children: <CandidateEmploymentHistoryForm />,
//   },
//   {
//     icon: 'mdi:shape-outline',
//     title: 'Hobby And Interest',
//     children: <CandidateHobbyAndInterestForm />,
//   },
//   {
//     icon: 'mdi:list-box-outline',
//     title: 'Other Information',
//     children: <OtherInformationForm />,
//   },
// ];

// ----------------------------------------------------------------------

export const EditCandidateForm = () => {
  const methods = useForm<TEditCandidate>({
    resolver: zodResolver(EditCandidateSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  console.log('errors', errors);

  // func ---------------------------------------------------------------

  const onSubmit = (data: TEditCandidate) => {
    console.log('data', data);
  };

  // ---------------------------------------------------------------------

  return (
    <Container maxWidth="md">
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={4}>
          <CandidateInfoForm />

          {/* <Box mt={2}>
            {FORM_LIST.map((item, index) => (
              <AccordionCustom
                icon={item.icon}
                key={item.title}
                title={item.title}
                panelId={index}
                defaultExpanded
              >
                {item.children}
              </AccordionCustom>
            ))}
          </Box> */}

          <CandidateAppliedJobForm />
          <CandidateBasicInformationForm />
          <CandidateApplicationDocumentsForm />
          <CandidateLinkReferenceForm />
          <CandidateNoteForm />
          <CandidatePersonalDataForm />
          <CandidatePersonalReferencesForm />
          <CondidateEducationForm />
          <CandidateLanguageForm />
          <CandidateSkillSpecialAbilityForm />
          <CandidateEmploymentHistoryForm />
          <CandidateHobbyAndInterestForm />
          <OtherInformationForm />
        </Stack>

        <Button variant="contained" type="submit">
          Confirm
        </Button>
      </Form>
    </Container>
  );
};
