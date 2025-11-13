import { queryOptions } from '@tanstack/react-query';
import { endpoint } from 'constant/endpoint';
import { TGetJobPostDetailPayload, TGetJobPostListPayload } from 'types/jobpost';
import { fetchJobpostDetail, fetchJobpostList } from './services';

// ----------------------------------------------------------------------

const useJobpostQuery = {
  keys: () => ['jobpost'] as const,

  list: (payload: TGetJobPostListPayload) =>
    queryOptions({
      queryKey: [...useJobpostQuery.keys(), endpoint.jobpost.list, payload],
      queryFn: () => fetchJobpostList(payload),
      select: (response) => response.data,
    }),
  detail: (payload: TGetJobPostDetailPayload) =>
    queryOptions({
      queryKey: [...useJobpostQuery.keys(), endpoint.jobpost.detail, payload],
      queryFn: () => fetchJobpostDetail(payload),
      select: (response) => response.data,
    }),
};

export { useJobpostQuery };
