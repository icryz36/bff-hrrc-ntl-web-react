import { useQuery } from '@tanstack/react-query';
import { endpoint } from 'constant/endpoint';
import { TGetJobPostListPayload } from 'types/list-job';
import { fetchListJobPost } from './services';

const useListJobDataQuery = {
  keys: () => ['list-job'] as const,

  getListJob: (payload: TGetJobPostListPayload) =>
    useQuery({
      queryKey: [...useListJobDataQuery.keys(), endpoint.managementJob.listJob],
      queryFn: () => fetchListJobPost(payload),
    }),
};

export { useListJobDataQuery };
