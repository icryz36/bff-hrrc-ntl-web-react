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
  TImportCandidatePayload,
  TImportCandidateResponse,
  TImportCandidatesPayload,
  TImportCandidatesResponse,
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

export const fetchImportCandidate = async (
  payload: TImportCandidatePayload,
): Promise<TImportCandidateResponse> => {
  const formData = new FormData();
  if (payload.file) {
    formData.append('file', payload.file);
  }

  const { data } = await axiosInstance({
    method: 'POST',
    url: endpoint.candidate.validate,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (Array.isArray(data)) {
    return {
      transactionNo: '',
      timestamp: '',
      status: true,
      data: {
        items: data,
        pagination: {
          pageNo: 1,
          pageSize: data.length,
          totalRecords: data.length,
          totalPages: 1,
        },
      },
    };
  }

  if (data?.data?.items) {
    return data;
  }

  return {
    transactionNo: data?.transactionNo || '',
    timestamp: data?.timestamp || '',
    status: data?.status ?? true,
    data: {
      items: Array.isArray(data?.data) ? data.data : data?.items || [],
      pagination: {
        pageNo: 1,
        pageSize: Array.isArray(data?.data) ? data.data.length : data?.items?.length || 0,
        totalRecords: Array.isArray(data?.data) ? data.data.length : data?.items?.length || 0,
        totalPages: 1,
      },
    },
  };
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

export const downloadCandidateTemplate = async (
  payload: TGetCandidateDocumentByIdPayload,
): Promise<TCandidateDocumentResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    data: payload,
    url: endpoint.candidate.downloadTemplate,
  });

  return data;
};

export const importCandidates = async (
  payload: TImportCandidatesPayload,
): Promise<TImportCandidatesResponse> => {
  const { data } = await axiosInstance({
    method: 'POST',
    data: payload,
    url: endpoint.candidate.import,
  });

  return data;
};
