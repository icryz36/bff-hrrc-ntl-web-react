import { queryOptions } from '@tanstack/react-query';
import { TGetCandidateListPayload } from 'types/candidate';
import { fetchCandidateList } from './services';

// ----------------------------------------------------------------------

const useCandidateQuery = {
  keys: () => ['candidate'] as const,
  keysList: () => [...useCandidateQuery.keys(), 'list'] as const,
  keysDetail: () => [...useCandidateQuery.keys(), 'detail'] as const,

  list: (payload: TGetCandidateListPayload) =>
    queryOptions({
      queryKey: [...useCandidateQuery.keysList(), payload],
      queryFn: () => fetchCandidateList(payload),
      select: (response) => response.data,
    }),
  detail: (payload: TGetCandidateListPayload) =>
    queryOptions({
      queryKey: [...useCandidateQuery.keysDetail(), payload],
      queryFn: () => fetchCandidateList(payload),
      select: (response) => response.data,
    }),
};
export { useCandidateQuery };
