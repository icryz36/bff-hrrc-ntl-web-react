import { queryOptions } from '@tanstack/react-query';
import {
  TGetBatchStatusListPayload,
  TGetCandidateByIdPayload,
  TGetCandidateDocumentByIdPayload,
  TGetCandidateListPayload,
  TImportCandidatePayload,
} from 'types/candidate';
import {
  fetchBatchStatusList,
  fetchCandidateById,
  fetchCandidateDocumentById,
  fetchCandidateList,
  fetchImportCandidate,
} from './services';

// ----------------------------------------------------------------------

const useCandidateQuery = {
  keys: () => ['candidate'] as const,
  keysList: () => [...useCandidateQuery.keys(), 'list'] as const,
  keysDetail: () => [...useCandidateQuery.keys(), 'detail'] as const,
  keysDocument: () => [...useCandidateQuery.keys(), 'document'] as const,
  keysValidate: () => [...useCandidateQuery.keys(), 'validate'] as const,
  keysBatchList: () => [...useCandidateQuery.keys(), 'batch-list'] as const,

  list: (payload: TGetCandidateListPayload) =>
    queryOptions({
      queryKey: [...useCandidateQuery.keysList(), payload],
      queryFn: () => fetchCandidateList(payload),
      select: (response) => response.data,
    }),
  detail: (payload: TGetCandidateByIdPayload) =>
    queryOptions({
      queryKey: [...useCandidateQuery.keysDetail(), payload],
      queryFn: () => fetchCandidateById(payload),
      select: (response) => response.data,
      gcTime: 0,
      staleTime: 0,
    }),
  document: (payload: TGetCandidateDocumentByIdPayload) =>
    queryOptions({
      queryKey: [...useCandidateQuery.keysDocument(), payload],
      queryFn: () => fetchCandidateDocumentById(payload),
      select: (response) => response.data,
      gcTime: 0,
      staleTime: 0,
    }),
  validate: (payload: TImportCandidatePayload) =>
    queryOptions({
      queryKey: [...useCandidateQuery.keysValidate(), payload],
      queryFn: () => fetchImportCandidate(payload),
      select: (response) => response.data,
      gcTime: 0,
      staleTime: 0,
    }),
  batchList: (payload: TGetBatchStatusListPayload) =>
    queryOptions({
      queryKey: [...useCandidateQuery.keysBatchList(), payload],
      queryFn: () => fetchBatchStatusList(payload),
      select: (response) => response.data,
      gcTime: 0,
      staleTime: 0,
    }),
};
export { useCandidateQuery };
