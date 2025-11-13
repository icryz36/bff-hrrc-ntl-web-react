import { queryOptions } from '@tanstack/react-query';
import { endpoint } from 'constant/endpoint';
import { TGetJobPostListPayload } from 'types/jobpost';
import { fetchJobpostList } from './services';

// ----------------------------------------------------------------------

const useJobpostQuery = {
  keys: () => ['jobpost'] as const,

  list: (payload: TGetJobPostListPayload) =>
    queryOptions({
      queryKey: [...useJobpostQuery.keys(), endpoint.jobpost.list, payload],
      queryFn: () => fetchJobpostList(payload),
      select: (response) => response.data,
    }),
};

export { useJobpostQuery };
