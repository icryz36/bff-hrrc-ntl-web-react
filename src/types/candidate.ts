import { TStatusResponse } from './common';

export type TGetCandidateListPayload = {
  status: ['Active', 'Inactive'];
  pageNo: number;
  pageSize: number;
};

export type TCandidateListItems = {
  candidateId: string;
  titleNameTh: string;
  nameTh: string;
  surnameTh: string;
  email: string;
  mobileNo: string;
  status: string;
  updatedDate: string;
  isBlacklist: boolean;
  countJobApplication: number;
};

export type TGetCandidateListData = {
  items: TCandidateListItems[];
  pagination: TGetCandidateListPagination;
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

export type TCandidate = {
  candidateId: string;
  idNo: string;
  title: TTitle;
  nameTh: string;
  nameEn: string;
  surnameTh: string;
  surnameEn: string;
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
  ducumentId: string;
  filePath: string;
  ducumentType: TDocumentType;
};

export type TDocumentType = {
  documentTypeId: string;
  docTypeNameTh: string;
  docTypeNameEn: string;
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

export type TCandidateData = {
  candidate: TCandidate;
  ducuments: TDocumentItem[];
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
  candidatId: string;
  status: 'Active' | 'Inactive';
};

export type TCandidateUpdateStatusResponse = TStatusResponse & {
  data: { candidatId: string };
};

export type TCandidateBlacklistPayload = {
  candidatId: string;
  isBlacklist: boolean;
  blcklistReason: string;
};

export type TCandidateBlacklistResponse = TStatusResponse & {
  data: { candidatId: string };
};
