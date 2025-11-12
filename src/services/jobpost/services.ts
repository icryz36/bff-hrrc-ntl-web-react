import { endpoint } from 'constant/endpoint';
import { axiosJobPostInstance } from 'services/axios/axiosInstance';
import { TCreateJobPostPayload, TCreateJobPostResponse } from 'types/jobpost';

// query ---------------------------------------------------------------

// ....

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
