import { queryOptions } from '@tanstack/react-query';
import { TGetJobPostByIdPayload, TGetJobPostListPayload } from 'types/jobpost';
import { fetchJobpostById, fetchJobpostList } from './services';

// ----------------------------------------------------------------------

const useJobpostQuery = {
  keys: () => ['jobpost'] as const,
  keysList: () => [...useJobpostQuery.keys(), 'list'] as const,
  keysDetail: () => [...useJobpostQuery.keys(), 'detail'] as const,

  list: (payload: TGetJobPostListPayload) =>
    queryOptions({
      queryKey: [...useJobpostQuery.keysList(), payload],
      queryFn: () => fetchJobpostList(payload),
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
