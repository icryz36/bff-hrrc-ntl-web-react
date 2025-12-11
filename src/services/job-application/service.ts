import { endpoint } from 'constant/endpoint';
import axiosInstance from 'services/axios/axiosInstance';
import {
  TCreateJobApplicationBulkPayload,
  TCreateJobApplicationBulkResponse,
  TGetCheckJobaplicationStatusPayload,
  TGetCheckJobaplicationStatusResponse,
  TGetJobapplicationBoardPayload,
  TGetJobapplicationBoardResponse,
  TGetJobapplicationListPayload,
  TGetJobapplicationListResponse,
} from 'types/job-application';

// query ---------------------------------------------------------------

export const fetchJobApplicationBoard = async (
  payload: TGetJobapplicationBoardPayload,
): Promise<TGetJobapplicationBoardResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    url: endpoint.jobApplication.board,
    data: payload,
  });

  return data;
};

export const fetchJobApplicationList = async (
  payload: TGetJobapplicationListPayload,
): Promise<TGetJobapplicationListResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    url: endpoint.jobApplication.list,
    data: payload,
  });

  return data;
};

export const fetchCheckJobaplicationStatus = async (
  payload: TGetCheckJobaplicationStatusPayload,
): Promise<TGetCheckJobaplicationStatusResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    url: endpoint.jobApplication.checkStatus,
    data: payload,
  });

  return data;
};

// mutation ---------------------------------------------------------------

export const postCreateJobApplicationBulk = async (
  payload: TCreateJobApplicationBulkPayload[],
): Promise<TCreateJobApplicationBulkResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    url: endpoint.jobApplication.createJobBulk,
    data: payload,
  });

  return data;
};
