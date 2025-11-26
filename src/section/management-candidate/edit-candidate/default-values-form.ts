import { TEditCandidate } from './schema';

// ----------------------------------------------------------------------

export const defaultValues: TEditCandidate = {
  // info
  title: '',
  name: '',
  surName: '',
  nickName: '',
  candidateId: '',
  profile: null,

  // basic information
  gender: '',
  age: null,
  contactNo: '',
  email: '',
  desiredLocation: '',
  desiredProvince: [],
  highestEducation: null,
  workExperience: '',
  motorcycleDriving: '',
  carDriving: '',

  // application documents
  documents: {},
  files: null,

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

  questions: [],
};
