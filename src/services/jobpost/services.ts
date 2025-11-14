import { endpoint } from 'constant/endpoint';
import { axiosJobPostInstance } from 'services/axios/axiosInstance';
import {
  TCreateJobPostPayload,
  TCreateJobPostResponse,
  TGetJobPostByIdPayload,
  TGetJobPostByIdResponse,
  TGetJobPostListPayload,
  TGetJobPostListResponse,
  TUpdateJobPostPayload,
  TUpdateJobPostResponse,
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

export const fetchJobpostById = async (
  payload: TGetJobPostByIdPayload,
): Promise<TGetJobPostByIdResponse> => {
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

export const postUpdateJob = async (
  payload: TUpdateJobPostPayload,
): Promise<TUpdateJobPostResponse> => {
  const { data } = await axiosJobPostInstance({
    method: 'POST',
    url: endpoint.jobpost.update,
    data: payload,
  });

  return data;
};
