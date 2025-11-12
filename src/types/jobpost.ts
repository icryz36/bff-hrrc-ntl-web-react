import { TStatusResponse } from './common';

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
  vacancy: number;
  srcOfRecruitment: string;
};

export type TCreateJobPostResponse = TStatusResponse & {
  data: {
    jobPostId: string;
    jobPostNo: string;
  };
};

// ----------------------------------------------------------------------
