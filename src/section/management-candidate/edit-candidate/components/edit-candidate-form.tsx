import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Stack } from '@mui/material';
import { Form } from 'components/hook-form';
import { EditCandidateSchema, TEditCandidate } from '../schema';
import { CandidateApplicationDocumentsForm } from './candidate-application-documents-form';
import { CandidateAppliedJobForm } from './candidate-applied-job-form';
import { CandidateBasicInformationForm } from './candidate-basic-information-form';
import { CandidateEmploymentHistoryForm } from './candidate-employment-history-form';
import { CandidateInfoForm } from './candidate-info-form';
import { CandidateLanguageForm } from './candidate-language-form';
import { CandidateLinkReferenceForm } from './candidate-link-reference-form';
import { CandidateNoteForm } from './candidate-note-form';
import { CandidatePersonalDataForm } from './candidate-personal-data-form';
import { CandidatePersonalReferencesForm } from './candidate-personal-references-form';
import { CandidateSkillSpecialAbilityForm } from './candidate-skill-special-ability-form';
import { CondidateEducationForm } from './condidate-education-form';

// ----------------------------------------------------------------------

const defaultValues: TEditCandidate = {
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

  // personal data
  address: '',
  lineId: '',
  dateOfBirth: '',
  height: '',
  weight: '',
  nationality: '',
  religion: '',
  bloodGroup: '',
  placeofBirthId: '',
  idNo: '',
  cardissuedProvinceId: null,
  cardissuedDate: '',
  cardexpiredDate: '',
  militaryStatus: '',
  maritalStatus: '',
  familys: [{ name: '', age: 0, mobileNo: '', occupation: '', workplace: '' }],
  emergency: [{ relationship: '', name: '', mobileNo: '' }],

  // personal references
  referencePersons: [{ name: '', position: '', relation: '', workplace: '', mobileNo: '' }],

  // education
  educations: [
    {
      degreeId: '',
      institutionName: '',
      startYear: '',
      endYear: '',
      degreeConferred: '',
      major: '',
      gpa: '',
    },
  ],

  // language
  languages: [{ language: null, speaking: '', reading: '', writing: '' }],

  // skill
  skills: [],
  hasNlInsBrokerLicenseNo: '',
  nlInsBrokerLicenseNo: '',
  hasNlInsAgentLicenseNo: '',
  nlInsAgentLicenseNo: '',
  hasLInsBrokerLicenseNo: '',
  lInsBrokerLicenseNo: '',
  hasLInsAgentLicenseNo: '',
  lInsAgentLicenseNo: '',
  transmissionTypeCar: [],
  ownCar: '',
  transmissionTypeMotorcycle: [],
  ownMotorcycle: '',

  // employment history
  isWorkedBefore: 'YES',
  workHistorys: [
    {
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
    },
  ],
  isAnyoneRecommend: 'YES',
  recommender: {
    name: '',
    relation: '',
    position: '',
    mobileNo: '',
  },
};

// ----------------------------------------------------------------------

export const EditCandidateForm = () => {
  // form ---------------------------------------------------------------

  const methods = useForm<TEditCandidate>({
    resolver: zodResolver(EditCandidateSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

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

          {/* TODO: ทำต่อ */}
          <CandidateAppliedJobForm />

          <CandidateBasicInformationForm />

          {/* TODO: ทำต่อ */}
          <CandidateApplicationDocumentsForm />

          <CandidateLinkReferenceForm />

          <CandidateNoteForm />

          <CandidatePersonalDataForm />

          <CandidatePersonalReferencesForm />

          <CondidateEducationForm />

          <CandidateLanguageForm />

          <CandidateSkillSpecialAbilityForm />

          <CandidateEmploymentHistoryForm />
        </Stack>
      </Form>
    </Container>
  );
};
