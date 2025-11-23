import { queryOptions } from '@tanstack/react-query';
import { TGetCandidateListPayload } from 'types/candidate';
import { fetchCandidateList } from './services';

// ----------------------------------------------------------------------

const useCandidateQuery = {
  keys: () => ['candidate'] as const,
  keysList: () => [...useCandidateQuery.keys(), 'list'] as const,

  list: (payload: TGetCandidateListPayload) =>
    queryOptions({
      queryKey: [...useCandidateQuery.keysList(), payload],
      queryFn: () => fetchCandidateList(payload),
      select: (response) => response.data,
    }),
};
export { useCandidateQuery };
