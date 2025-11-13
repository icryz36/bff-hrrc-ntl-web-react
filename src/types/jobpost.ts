import { TStatusResponse } from './common';

// get jobpost list -------------------------------------------------------------

export type TGetJobPostListPayload = {
  ownerUserId: string;
  recruiterUserId: string;
  pageNo: number;
  pageSize: number;
};

export type TGetJobPostListResponse = TStatusResponse & {
  data: TGetJobPostListData;
};

export type TGetJobPostListData = {
  items: TJobPost[];
  pagination: TGetJobPostListPagination;
};

export type TJobPost = {
  jobPostId: string;
  jobPostNo: string;
  jobTitle: string;
  departmentName: string;
  regionName: string;
  provinceName: string;
  districtName: string;
  startDate: string;
  totalActiveDays: number;
  headcount: number;
  ownerUserName: string;
  statusName: string;
};

export type TGetJobPostListPagination = {
  pageNo: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
};

// create jobpost ---------------------------------------------------------------

export type TCreateJobPostPayload = {
  jobTitle: string;
  statusId: string;
  groupLocation: string;
  regionId: string;
  headCount: number;
  prNo: string;
  levelId: string;
  degreeId: string;
  employeeTypeId: string;
  startDate: string;
  endDate: string;
  acknowledgeDate: string;
  jobDescription: string;
  jobSpecification: string;
  jobBenefit: string;
  ownerUserId: string;
  position: TCreateJobPostPosition[];
  districtId: string[];
  recruiterUserId: string[];
  departmentId: string;
};

export type TCreateJobPostPosition = {
  positionId: string;
  vacancy: string;
  srcOfRecruitment: string;
};

export type TCreateJobPostResponse = TStatusResponse & {
  data: {
    jobPostId: string;
    jobPostNo: string;
  };
};

// get jobpost list -------------------------------------------------------------

export type TJobPostPositionData = {
  positionId: string;
  positionName: string;
  vacancy: string;
  srcOfRecruitment: string;
};

export type TWorkLocationData = {
  districtName: string;
  provinceName: string;
  areaName: string;
};

export type TJobPostData = {
  jobPostId: string;
  jobPostNo: string;
  prNo: string;
  jobTitle: string;
  headCount: number;
  acknowledgeDate: string;
  jobDescription: string;
  jobSpecification: string;
  jobBenefit: string;
  statusId: string;
  statusName: string;
  departmentId: string;
  departmentName: string;
  sectionId: string | null;
  sectionName: string;
  levelId: string;
  levelName: string;
  degreeId: string;
  degreeName: string;
  employeeTypeId: string;
  employeeTypeName: string;
  regionName: string;
  startDate: string;
  endDate: string;
  name: string;
  surname: string;
  groupLocation: string;
  jobPostPositions: TJobPostPositionData[];
  workLocations: TWorkLocationData[];
};

export type TGetJobPostDetailPayload = {
  jobPostId: string;
};

export type TGetJobPostDetailResponse = {
  transactionNo: string;
  timestamp: string;
  status: boolean;
  data: TJobPostData;
};

// ----------------------------------------------------------------------
