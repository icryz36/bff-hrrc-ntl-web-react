import { TStatusResponse } from './common';

export type TGetCandidateListPayload = {
  status: ('Active' | 'Inactive')[];
  name?: string;
  surname?: string;
  email?: string;
  mobile?: string;
  stage?: string;
  jobPostId?: string;
  pageNo: number;
  pageSize: number;
  maxJobApplication?: number;
};

export type TCandidateListItems = {
  candidateId: string;
  titleNameTh: string;
  nameTh: string;
  surnameTh: string;
  titleNameEn: string;
  nameEn: string;
  surnameEn: string;
  email: string;
  mobileNo: string;
  status: string;
  updatedDate: string;
  isBlacklist: boolean;
  countJobApplication: number;
};

export type TGetCandidateListData = {
  items: TCandidateListItems[];
  page: number;
  total: number;
  // pagination: TGetCandidateListPagination;
};

export type TGetCandidateListResponse = TStatusResponse & {
  data: TGetCandidateListData;
};

export type TGetCandidateListPagination = {
  pageNo: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
};

export type TGetCandidateByIdPayload = {
  candidateId: string;
};
export type TGetCandidateDocumentByIdPayload = {
  filePath: string;
};
export type TCandidateDocumentsItem = {
  documentId?: string | null;
  operation: 'insert' | 'update' | 'delete';
  fileName: string;
  docTypeKey: string;
};

// ----------------------------------------------------------------------

export type TUpdateCandidatePayload = {
  payload: {
    candidateId: string;
    idNo: string;
    titleId: string;
    nameTh: string;
    surnameTh: string;
    nickname: string;
    gender: string;
    age: number;
    email: string;
    desiredLocation: string;
    mobileNo: string;
    maritalStatus?: string;
    militaryStatus?: string;
    canDriveCar: string;
    hasCarLicense?: string;
    canDriveMotorcycle: string;
    hasMotorcycleLicense?: string;
    desiredProvinces: Array<{
      provinceId: string;
      desiredLocation: string;
    }>;
    linkReference: string;
    note: string;
    workExperience: string;
    candidateDocuments?: Array<TCandidateDocumentsItem> | [];
  };
} & {
  [key: string]: File | any;
};
export type TCandidate = {
  candidateId: string;
  idNo: string;
  title: TTitle;
  nameTh: string;
  nameEn: string;
  surnameTh: string;
  surnameEn: string;
  mobileNo: string;
  nickname: string;
  gender: string;
  age: number;
  email: string;
  desiredProvinces: TProvince[];
  desiredLocation: string;
  maritalStatus: string;
  militaryStatus: string;
  candriveCar: string;
  hascarLicense: string;
  candriveMotorcycle: string;
  hasmotorcycleLicense: string;
  linkReference: string;
  workExperience: string;
  address: string;
  note: string;
  height: string;
  weight: string;
  nationality: string;
  religion: string;
  bloodGroup: string;
  placeofBirth: TProvince;
  cardissuedDate: string;
  cardexpiredDate: string;
  cardissuedProvince: TProvince;
  lineId: string;
  status: string;
  isBlacklist: boolean;
  blacklistReason: string;
  highestdegreeId: string;
  isRead: string;
  canDriveMotorcycle: string;
  canDriveCar: string;
};

export type TTitle = {
  titleId: string;
  titleNameTh: string;
  titleNameEn: string;
};

export type TProvince = {
  provinceId: string;
  provinceName: string;
};

export type TDocumentItem = {
  documentId: string;
  fileName: string;
  filePath: string;
  documentType: TDocumentType;
};

export type TDocumentType = {
  documentTypeId: string;
  documentTypeNameTh: string;
  documentTypeNameEn: string;
  documentTypeKey: string;
};

export type TFamily = {
  relationship: string;
  name: string;
  age: number;
  mobileNo: string;
  occupation: string;
  workplace: string;
  isEmergency: boolean;
};

export type TEducation = {
  candidateEducationId: string;
  degree: TDegree;
  startYear: string;
  endYear: string;
  institutionName: string;
  major: string;
  gpa: string;
};

export type TDegree = {
  degreeId: string;
  degreeNameEn: string;
  degreeNameTh: string;
  degreeCode: string;
  degreeLevel: string;
};

export type TReferencePerson = {
  referencePersonId: string;
  name: string;
  position: string;
  relation: string;
  workplace: string;
  mobileNo: string;
};

export type TSkill = {
  skillId: string;
  skillNameTh: string;
  skillNameEn: string;
  skillCategory: string;
  skillOptionType: string;
  isSkillFreeText: string | boolean;
  skillOptions: TSkillOption[];
  skillText: string;
  selectedOptionId: string;
};

export type TSkillOption = {
  skilOptionId: string;
  skillTextTh: string;
  skillTextEn: string;
};

export type TWorkHistory = {
  workHistoryId: string;
  companyName: string;
  officePhoneNo: string;
  startDate: string;
  endDate: string;
  businessType: string;
  lastPosition: string;
  responsibilities: string;
  salary: number;
  otherIncome: number;
  leavingReason: string;
};

export type TRecommender = {
  recommenderId: string;
  name: string;
  relation: string;
  position: string;
  mobileNo: string;
};

export type TQuestionWrapper = {
  questionCategory: TQuestionCategory;
};

export type TQuestionCategory = {
  questionId: string;
  questionTextTh: string;
  questionTextEn: string;
  isRequired: boolean;
  answerText: string;
  answerOptionId: string;
  questionOptionType: string;
  answerOptions: TAnswerOption[];
};

export type TAnswerOption = {
  optionId: string;
  optionTextTh: string;
  optionTextEn: string;
  optionScore: string;
};

export type TJobApplications = {
  jobAppId: string;
  jobTitle: string;
  ownerName: string;
  jobStatus: {
    jobAppStatusMasterId: string;
    statusNameTh: string;
    statusNameEn: string;
  };
  applicationDate: string;
  updatedDate: string;
};

export type TCandidateData = {
  candidate: TCandidate;
  documents: TDocumentItem[];
  jobApplications: TJobApplications[];
  familys: TFamily[];
  educations: TEducation[];
  referencePersons: TReferencePerson[];
  skills: TSkill[];
  nlInsBrokerLicenseNo: string;
  nlInsAgentLicenseNo: string;
  lInsBrokerLicenseNo: string;
  lInsAgentLicenseNo: string;
  workHistorys: TWorkHistory[];
  recommender: TRecommender;
  questions: TQuestionWrapper[];
};

export type TUpdateCandidateResponse = TStatusResponse & {
  data: string;
};

// ----------------------------------------------------------------------

export type TGetCandidateByIdResponse = TStatusResponse & {
  data: TCandidateData;
};

export type TCandidateTableRow = {
  candidateId: string;
  isBlacklist: boolean;
  titleNameTh: string;
  nameTh: string;
  surnameTh: string;
  email: string;
  mobileNo: string;
  updatedDate: string | Date;
  startDate: string | Date;
  countJobApplication: number;
  status: 'Active' | 'Inactive' | 'Blacklist' | string;
};

export type TCandidateUpdateStatusPayload = {
  candidateId: string;
  status: 'Active' | 'Inactive';
};

export type TCandidateUpdateStatusResponse = TStatusResponse & {
  data: { candidateId: string };
};

export type TCandidateBlacklistPayload = {
  candidateId: string;
  isBlacklist: boolean;
  blcklistReason: string;
};

export type TCandidateBlacklistResponse = TStatusResponse & {
  data: { candidateId: string };
};
export type TCandidateNotePayload = {
  candidateId: string;
  note: string;
};
export type TCandidateDocumentResponse = TStatusResponse & {
  data: { binaryBase64: string };
};

export type TImportCandidatePayload = {
  file: File | undefined;
};

export type TErrorMsgItem = {
  field: string;
  errorMsg: string;
};

export type ITImportCandidateItem = {
  validateStatus: 'success' | 'fail';
  errorMsg: TErrorMsgItem[] | string[];
  title: string;
  nameTh: string;
  surnameTh: string;
  nameEn?: string;
  surnameEn?: string;
  gender?: string;
  age: number;
  mobileNo: string;
  email: string;
  desiredLocation: string;
  desiredProvince: string;
  source?: string;
  highestDegree: string;
  workExperience: string;
  canDriveMotorcycle: string;
  canDriveCar: string;
  jobPostNo: string | null;
  applicationSource: string;
  applicationDate: string;
};

export type TCandidateListData = {
  items: ITImportCandidateItem[];
  pagination: TGetCandidateListPagination;
};

export type TImportCandidateResponse = TStatusResponse & {
  data: TCandidateListData;
};

export type TImportCandidatesPayload = {
  candidates: ITImportCandidateItem[];
};

export type TImportCandidatesResponse = TStatusResponse & {
  data: {
    batchId: string;
  };
  error?: {
    code: string;
    message: string;
    path: string;
    description: string;
    type: string;
    technicalError: string;
  };
};

// ---------------------------------

export type TGetBatchStatusListPayload = {
  createdById: string;
  pageNo: number;
  pageSize: number;
};

export type TGetBatchStatusListResponse = TStatusResponse & {
  batchId: string;
  batchType: string;
  fileName: string;
  status: string;
  totalRecords: number;
  successCount: number;
  failCount: number;
  finishedDate: string;
  createdDate: string;
  owner?: {
    id: string;
    name: string;
    surname: string;
  };
};
