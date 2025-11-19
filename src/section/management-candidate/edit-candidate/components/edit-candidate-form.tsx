import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Stack } from '@mui/material';
import { Form } from 'components/hook-form';
import { EditCandidateSchema, TEditCandidateSchema } from '../schema';
import { CandidateApplicationDocumentsForm } from './candidate-application-documents-form';
import { CandidateAppliedJobForm } from './candidate-applied-job-form';
import { CandidateBasicInformationForm } from './candidate-basic-information-form';
import { CandidateInfoForm } from './candidate-info-form';
import { CandidateLinkReferenceForm } from './candidate-link-reference-form';
import { CandidateNoteForm } from './candidate-note-form';
import { CandidatePersonalDataForm } from './candidate-personal-data-form';

// ----------------------------------------------------------------------

const defaultValues: TEditCandidateSchema = {
  // info
  title: '',
  name: '',
  surName: '',
  nickName: '',
  candidateId: '',

  // basic information
  gender: '',
  age: '',
  contactNo: '',
  email: '',
  desiredLocation: null,
  desiredProvince: null,
  highestEducation: null,
  workExperience: '',
  motorcycleDriving: '',
  carDriving: '',

  // application documents
  documents: '',
  files: [],

  // link reference
  link: '',

  // note
  note: '',
};

// ----------------------------------------------------------------------

export const EditCandidateForm = () => {
  // form ---------------------------------------------------------------

  const methods = useForm({
    resolver: zodResolver(EditCandidateSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  // func ---------------------------------------------------------------

  const onSubmit = (data: TEditCandidateSchema) => {
    console.log('data', data);
  };

  // ---------------------------------------------------------------------

  return (
    <Container maxWidth="md">
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={4}>
          <CandidateInfoForm />

          {/* TODO: ทำต่อ */}
          <CandidateAppliedJobForm />

          <CandidateBasicInformationForm />

          {/* TODO: ทำต่อ */}
          <CandidateApplicationDocumentsForm />

          <CandidateLinkReferenceForm />

          <CandidateNoteForm />

          <CandidatePersonalDataForm />
        </Stack>
      </Form>
    </Container>
  );
};
