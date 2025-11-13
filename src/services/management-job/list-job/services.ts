import { endpoint } from 'constant/endpoint';
import axiosInstance from 'services/axios/axiosInstance';
import { TGetJobPostListPayload, TGetJobPostListResponse } from 'types/list-job';

export const fetchListJobPost = async (
  payload: TGetJobPostListPayload,
): Promise<TGetJobPostListResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    url: endpoint.managementJob.listJob,
    data: payload,
  });

  return data;
};
