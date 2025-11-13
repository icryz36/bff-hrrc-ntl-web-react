import { endpoint } from 'constant/endpoint';
import { axiosJobPostInstance } from 'services/axios/axiosInstance';
import { TGetJobPostListPayload, TGetJobPostListResponse } from 'types/jobpost';

export const fetchListJobPost = async (
  payload: TGetJobPostListPayload,
): Promise<TGetJobPostListResponse> => {
  const { data } = await axiosJobPostInstance({
    method: 'POST',
    url: endpoint.jobpost.list,
    data: payload,
  });

  return data;
};
