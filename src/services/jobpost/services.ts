import { endpoint } from 'constant/endpoint';
import { axiosJobPostInstance } from 'services/axios/axiosInstance';
import {
  TCreateJobPostPayload,
  TCreateJobPostResponse,
  TGetJobPostDetailPayload,
  TGetJobPostDetailResponse,
  TGetJobPostListPayload,
  TGetJobPostListResponse,
  TUpdateJobPostStatusPayload,
  TUpdateJobPostStatusResponse,
} from 'types/jobpost';

// query ---------------------------------------------------------------

export const fetchJobpostList = async (
  payload: TGetJobPostListPayload,
): Promise<TGetJobPostListResponse> => {
  const { data } = await axiosJobPostInstance({
    method: 'POST',
    url: endpoint.jobpost.list,
    data: payload,
  });

  return data;
};

export const fetchJobpostDetail = async (
  payload: TGetJobPostDetailPayload,
): Promise<TGetJobPostDetailResponse> => {
  const { data } = await axiosJobPostInstance({
    method: 'POST',
    url: endpoint.jobpost.detail,
    data: payload,
  });

  return data;
};

// Mutation -------------------------------------------------------------

export const postCreateJob = async (
  payload: TCreateJobPostPayload,
): Promise<TCreateJobPostResponse> => {
  const { data } = await axiosJobPostInstance({
    method: 'POST',
    url: endpoint.jobpost.create,
    data: payload,
  });

  return data;
};

export const updateJobStatus = async (
  payload: TUpdateJobPostStatusPayload,
): Promise<TUpdateJobPostStatusResponse> => {
  const { data } = await axiosJobPostInstance({
    method: 'POST',
    url: endpoint.jobpost.updateStatus,
    data: payload,
  });

  return data;
};
