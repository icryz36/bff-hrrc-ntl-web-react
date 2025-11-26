import { endpoint } from 'constant/endpoint';
import { CANDIDATE_DETIAL } from 'data/candidate-detail';
import { axiosCandidateInstance } from 'services/axios/axiosInstance';
import {
  TCandidateBlacklistPayload,
  TCandidateBlacklistResponse,
  TCandidateUpdateStatusPayload,
  TCandidateUpdateStatusResponse,
  TGetCandidateByIdPayload,
  TGetCandidateByIdResponse,
  TGetCandidateListPayload,
  TGetCandidateListResponse,
} from 'types/candidate';

export const fetchCandidateList = async (
  payload: TGetCandidateListPayload,
): Promise<TGetCandidateListResponse> => {
  const { data } = await axiosCandidateInstance({
    method: 'POST',
    url: endpoint.candidate.list,
    data: payload,
  });

  return data;
};

export const fetchCandidateById = async (
  payload: TGetCandidateByIdPayload,
): Promise<TGetCandidateByIdResponse> => {
  //   const { data } = await axiosJobPostInstance({
  //     method: 'POST',
  //     url: endpoint.jobpost.list,
  //     data: payload,
  //   });

  console.log('payload ==> ', payload);

  const data = {
    data: CANDIDATE_DETIAL,
    transactionNo: 'string',
    timestamp: 'string',
    status: true,
  };

  return data;
};

export const updateCandidateStatus = async (
  payload: TCandidateUpdateStatusPayload,
): Promise<TCandidateUpdateStatusResponse> => {
  //   const { data } = await axiosJobPostInstance({
  //     method: 'POST',
  //     url: endpoint.jobpost.list,
  //     data: payload,
  //   });

  console.log('payload ==> ', payload);

  const data = {
    data: {
      candidatId: 'xxxx',
    },
    transactionNo: 'string',
    timestamp: 'string',
    status: true,
  };

  return data;
};

export const updateCandidateBlacklist = async (
  payload: TCandidateBlacklistPayload,
): Promise<TCandidateBlacklistResponse> => {
  //   const { data } = await axiosJobPostInstance({
  //     method: 'POST',
  //     url: endpoint.jobpost.list,
  //     data: payload,
  //   });

  console.log('payload ==> ', payload);

  const data = {
    data: {
      candidatId: 'xxxx',
    },
    transactionNo: 'string',
    timestamp: 'string',
    status: true,
  };

  return data;
};
