import { endpoint } from 'constant/endpoint';
import { axiosJobPostInstance } from 'services/axios/axiosInstance';
import {
  TApplyJobPayload,
  TApplyJobResponse,
  TChangeJobResponse,
  TChangeJobStatus,
  TGetCountApplicationPayload,
  TGetCountApplicationResponse,
} from 'types/job-application';

export const postApplyJob = async (payload: TApplyJobPayload): Promise<TApplyJobResponse> => {
  const { data } = await axiosJobPostInstance({
    method: 'POST',
    url: endpoint.jobApplication.applyJob,
    data: payload,
  });

  return data;
};

export const postChangeJobStatus = async (
  payload: TChangeJobStatus,
): Promise<TChangeJobResponse> => {
  const { data } = await axiosJobPostInstance({
    method: 'POST',
    url: endpoint.jobApplication.changeJobStatus,
    data: payload,
  });

  return data;
};

export const fetchCountJobApplication = async (
  payload: TGetCountApplicationPayload,
): Promise<TGetCountApplicationResponse> => {
  const { data } = await axiosJobPostInstance({
    method: 'POST',
    url: endpoint.jobApplication.count,
    data: payload,
  });

  return data;
};
