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
