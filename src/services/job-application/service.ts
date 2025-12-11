import { endpoint } from 'constant/endpoint';
import axiosInstance, { axiosJobPostInstance } from 'services/axios/axiosInstance';
import {
  TApplyJobPayload,
  TApplyJobResponse,
  TChangeJobResponse,
  TChangeJobStatus,
  TCreateJobApplicationPayload,
  TCreateJobApplicationResponse,
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

export const postCreateJobApplication = async (
  payload: TCreateJobApplicationPayload,
): Promise<TCreateJobApplicationResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    url: endpoint.jobApplication.create,
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
