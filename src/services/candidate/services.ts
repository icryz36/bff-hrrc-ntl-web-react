import { endpoint } from 'constant/endpoint';
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
  TUpdateCandidateResponse,
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
  const { data } = await axiosCandidateInstance({
    method: 'POST',
    url: endpoint.candidate.detail,
    data: payload,
  });

  return data;
};

export const updateCandidateStatus = async (
  payload: TCandidateUpdateStatusPayload,
): Promise<TCandidateUpdateStatusResponse> => {
  const { data } = await axiosCandidateInstance({
    method: 'POST',
    url: endpoint.candidate.updateStatus,
    data: payload,
  });

  return data;
};

export const updateCandidateBlacklist = async (
  payload: TCandidateBlacklistPayload,
): Promise<TCandidateBlacklistResponse> => {
  const { data } = await axiosCandidateInstance({
    method: 'POST',
    url: endpoint.candidate.updateBlacklist,
    data: payload,
  });

  return data;
};

// Mutation -------------------------------------------------------------

export const postUpdateCandidateInfo = async (
  payload: FormData,
): Promise<TUpdateCandidateResponse> => {
  const { data } = await axiosCandidateInstance({
    method: 'POST',
    data: payload,
    url: endpoint.candidate.updateInfo,
  });

  return data;
};
