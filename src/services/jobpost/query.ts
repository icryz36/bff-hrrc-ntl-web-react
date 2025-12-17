import { queryOptions } from '@tanstack/react-query';
import {
  TGetAllJobPostListPayload,
  TGetJobPostByIdPayload,
  TGetJobPostListPayload,
} from 'types/jobpost';
import { fetchAllJobpostList, fetchJobpostById, fetchJobpostList } from './services';

// ----------------------------------------------------------------------

const useJobpostQuery = {
  keys: () => ['jobpost'] as const,
  keysList: () => [...useJobpostQuery.keys(), 'list'] as const,
  keysListAll: () => [...useJobpostQuery.keys(), 'listAll'] as const,
  keysDetail: () => [...useJobpostQuery.keys(), 'detail'] as const,

  list: (payload: TGetJobPostListPayload) =>
    queryOptions({
      queryKey: [...useJobpostQuery.keysList(), payload],
      queryFn: () => fetchJobpostList(payload),
      select: (response) => response.data,
    }),

  listAll: (payload: TGetAllJobPostListPayload) =>
    queryOptions({
      queryKey: [...useJobpostQuery.keysListAll(), payload],
      queryFn: () => fetchAllJobpostList(payload),
      select: (response) => response.data,
    }),

  detail: (payload: TGetJobPostByIdPayload) =>
    queryOptions({
      queryKey: [...useJobpostQuery.keysDetail(), payload],
      queryFn: () => fetchJobpostById(payload),
      gcTime: 0,
      staleTime: 0,
    }),
};
export { useJobpostQuery };
