import { queryOptions } from '@tanstack/react-query';
import { TGetJobPostByIdPayload, TGetJobPostListPayload } from 'types/jobpost';
import { fetchJobpostById, fetchJobpostList } from './services';

// ----------------------------------------------------------------------

const useJobpostQuery = {
  keys: {
    root: ['jobpost'] as const,
    list: ['jobpost', 'list'] as const,
    detail: ['jobpost', 'detail'] as const,
  },

  list: (payload: TGetJobPostListPayload) =>
    queryOptions({
      queryKey: [...useJobpostQuery.keys.list, payload],
      queryFn: () => fetchJobpostList(payload),
      select: (response) => response.data,
    }),

  detail: (payload: TGetJobPostByIdPayload) =>
    queryOptions({
      queryKey: [...useJobpostQuery.keys.detail, payload],
      queryFn: () => fetchJobpostById(payload),
    }),
};
export { useJobpostQuery };
