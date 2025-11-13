import { endpoint } from 'constant/endpoint';
import { axiosJobPostInstance } from 'services/axios/axiosInstance';
import {
  TCreateJobPostPayload,
  TCreateJobPostResponse,
  TGetJobPostListPayload,
  TGetJobPostListResponse,
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
