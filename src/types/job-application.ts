import { TStatusResponse } from './common';

// job application board ---------------------------------------------------

export type TGetJobapplicationBoardPayload = {
  jobPostId: string;
};

export type TGetJobapplicationBoardResponse = TStatusResponse & {
  data: TJobapplicationBoardData;
};

export type TJobapplicationBoardData = {
  jobPost: TJobPost;
  stageSummary: TStageSummary[];
};

export type TStageSummary = {
  stageId: string;
  stageNameTh: string;
  stageNameEn: string;
  jobApplicationCount: number;
};

export type TJobPost = {
  jobPostId: string;
  jobPostNo: string;
  statusId: string;
  departmentId: string;
  sectionId: string;
  levelId: string;
  jobTitle: string;
  groupLocation: 'ho' | 'branch';
  prNo: string;
  headCount: number;
  startDate: string;
  endDate: string;
  acknowledgeDate: string;
  jobDescription: string;
  jobSpecification: string;
  jobBenefit: string;
  statusName: string;
  departmentName: string;
  sectionName: string;
  positionId: string;
  positionName: string;
  vacancy: string;
  srcOfRecruitment: string;
  name: string;
  surname: string;
  districtName: string;
  provinceName: string;
  areaName: string;
  regionName: string;
  levelName: string;
  degreeName: string;
  employeetype: string;
};

// job application list ----------------------------------------------------

export type TGetJobapplicationListPayload = {
  jobPostId: string;
  stageId: string;
  pageNo: number;
  pageSize: number;
  isCheckOtherJobApp?: boolean;
};

export type TGetJobapplicationListResponse = TStatusResponse & {
  data: TJobapplicationListData;
};

export type TJobapplicationListData = {
  total: number;
  page: number;
  items: TJobApplicationItem[];
};

export type TJobApplicationItem = {
  jobAppId: string;
  candidateId: string;
  jobPostId: string;
  branchId: string;
  applicationDate: string;
  applicationSourceId: string;
  stageNameTh: string;
  stageNameEn: string;
  stageOrder: string;
  statusNameTh: string;
  statusNameEn: string;
  reasonNameTh: string;
  reasonNameEn: string;
  titleNameTh: string;
  titleNameEn: string;
  name: string;
  surname: string;
  email: string;
  mobileNo: string;
  createdDate: string;
  updatedDate: string;
  hasOtherJobAppInProgress: boolean;
};

// check job application status --------------------------------------------

export type TGetCheckJobaplicationStatusPayload = {
  jobPostId: string;
};

export type TGetCheckJobaplicationStatusResponse = TStatusResponse & {
  data: TCheckJobaplicationStatusData;
};

export type TCheckJobaplicationStatusData = {
  totalCount: number;
  newCount: number;
  completedCount: number;
  inProgressCount: number;
};

// apply job ---------------------------------------------------------------

export type TCreateJobApplicationBulkPayload = {
  candidateId: string;
  jobPostId: string;
  applicationDate: string;
  stageId: string;
  statusId: string;
};

export type TCreateJobApplicationBulkResponse = TStatusResponse & {
  data: TCreateJobApplicationBulkData[];
};

export type TCreateJobApplicationBulkData = {
  jobAppId: string;
  jobPostId: string;
  candidateId: string;
};
