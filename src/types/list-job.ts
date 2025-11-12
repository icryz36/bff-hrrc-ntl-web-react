export type TGetJobPostListPayload = {
  ownerUserId: string;
  recruiterUserId: string;
  pageNo: number;
  pageSize: number;
};

export type TGetJobPostListResponse = {
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
