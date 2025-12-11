import { endpoint } from 'constant/endpoint';
import axiosInstance from 'services/axios/axiosInstance';
import {
  TCandidateBlacklistPayload,
  TCandidateBlacklistResponse,
  TCandidateDocumentResponse,
  TCandidateNotePayload,
  TCandidateUpdateStatusPayload,
  TCandidateUpdateStatusResponse,
  TGetCandidateByIdPayload,
  TGetCandidateByIdResponse,
  TGetCandidateDocumentByIdPayload,
  TGetCandidateListPayload,
  TGetCandidateListResponse,
  TUpdateCandidateResponse,
} from 'types/candidate';

export const fetchCandidateList = async (
  payload: TGetCandidateListPayload,
): Promise<TGetCandidateListResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    url: endpoint.candidate.list,
    data: payload,
  });

  return data;
};

export const fetchCandidateById = async (
  payload: TGetCandidateByIdPayload,
): Promise<TGetCandidateByIdResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    url: endpoint.candidate.detail,
    data: payload,
  });

  return data;
};
export const fetchCandidateDocumentById = async (
  payload: TGetCandidateDocumentByIdPayload,
): Promise<TCandidateDocumentResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    url: endpoint.candidate.document,
    data: payload,
  });

  return data;
};

export const updateCandidateStatus = async (
  payload: TCandidateUpdateStatusPayload,
): Promise<TCandidateUpdateStatusResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    url: endpoint.candidate.updateStatus,
    data: payload,
  });

  return data;
};

export const updateCandidateBlacklist = async (
  payload: TCandidateBlacklistPayload,
): Promise<TCandidateBlacklistResponse> => {
  const { data } = await axiosInstance({
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
  const { data } = await axiosInstance({
    method: 'POST',
    data: payload,
    url: endpoint.candidate.updateInfo,
  });

  return data;
};

export const postUpdateCandidateNote = async (
  payload: TCandidateNotePayload,
): Promise<TUpdateCandidateResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    data: payload,
    url: endpoint.candidate.updateNote,
  });

  return data;
};
export const postUpdateCandidateDocument = async (
  payload: TGetCandidateDocumentByIdPayload,
): Promise<TCandidateDocumentResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    data: payload,
    url: endpoint.candidate.document,
  });

  return data;
};
