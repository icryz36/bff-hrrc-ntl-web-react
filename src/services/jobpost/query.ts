import { queryOptions } from '@tanstack/react-query';
import { endpoint } from 'constant/endpoint';
import { TGetJobPostByIdPayload, TGetJobPostListPayload } from 'types/jobpost';
import { fetchJobpostById, fetchJobpostList } from './services';

// ----------------------------------------------------------------------

const useJobpostQuery = {
  keys: () => ['jobpost'] as const,

  list: (payload: TGetJobPostListPayload) =>
    queryOptions({
      queryKey: [...useJobpostQuery.keys(), endpoint.jobpost.list, payload],
      queryFn: () => fetchJobpostList(payload),
      select: (response) => response.data,
    }),

  detail: (payload: TGetJobPostByIdPayload) =>
    queryOptions({
      queryKey: [...useJobpostQuery.keys(), endpoint.jobpost.detail, payload],
      queryFn: () => fetchJobpostById(payload),
    }),
};

export { useJobpostQuery };
