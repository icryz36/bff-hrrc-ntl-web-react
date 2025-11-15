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

// get jobpost by id -----------------------------------------------------------

export type TGetJobPostByIdPayload = {
  jobPostId: string;
};

export type TGetJobPostByIdResponse = TStatusResponse & {
  data: TJobPostById;
};

export type TJobPostById = {
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
  sectionId: any;
  sectionName: string;
  levelId: string;
  levelName: string;
  degreeId: string;
  degreeName: string;
  employeeTypeId: string;
  employeeTypeName: string;
  regionId: string;
  regionName: string;
  startDate: string;
  endDate: string;
  name: string;
  surname: string;
  groupLocation: string;
  jobPostPositions: TJobPostByIdPosition[];
  workLocations: TJobPostByIdWorkLocation[];
  recruiterUserId: string[];
};

export type TJobPostByIdPosition = {
  positionId: string;
  positionName: string;
  vacancy: string;
  srcOfRecruitment: string;
};

export type TJobPostByIdWorkLocation = {
  provinceId: string;
  provinceName: string;
  areaName: string;
  district: TJobPostByIdWorkLocationDistrict[];
};

export type TJobPostByIdWorkLocationDistrict = {
  districtId: string;
  districtName: string;
};

// create jobpost -------------------------------------------------------------

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
  sectionId: string | null;
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

export type TGetJobPostDetailResponse = TStatusResponse & {
  transactionNo: string;
  timestamp: string;
  status: boolean;
  data: TJobPostData;
};

// update status jobpost ---------------------------------------------------------------

export type TUpdateJobPostStatusPayload = {
  jobPostId: string;
  statusId: string;
};

export type TUpdateJobPostStatusResponse = TStatusResponse & {
  data: {
    jobPostId: string;
    statusId: string;
  };
};

// ----------------------------------------------------------------------
// update jobpost -----------------------------------------------------------

export type TUpdateJobPostPayload = TCreateJobPostPayload & {
  jobPostId: string;
};

export type TUpdateJobPostResponse = TStatusResponse & {
  data: {
    jobPostId: string;
    jobPostNo: string;
  };
};
