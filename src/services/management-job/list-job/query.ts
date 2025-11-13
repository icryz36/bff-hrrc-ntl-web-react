import { queryOptions } from '@tanstack/react-query';
import { endpoint } from 'constant/endpoint';
import { TGetJobPostListPayload } from 'types/jobpost';
import { fetchListJobPost } from './services';

const useListJobDataQuery = {
  keys: () => ['list-job'] as const,

  getListJob: (payload: TGetJobPostListPayload) =>
    queryOptions({
      queryKey: [...useListJobDataQuery.keys(), endpoint.jobpost.list],
      queryFn: () => fetchListJobPost(payload),
      select: (response) => response.data,
    }),
};

export { useListJobDataQuery };
