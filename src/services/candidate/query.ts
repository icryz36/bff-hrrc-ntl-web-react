import { queryOptions } from '@tanstack/react-query';
import { TGetCandidateByIdPayload, TGetCandidateListPayload } from 'types/candidate';
import { fetchCandidateById, fetchCandidateList } from './services';

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
  detail: (payload: TGetCandidateByIdPayload) =>
    queryOptions({
      queryKey: [...useCandidateQuery.keysDetail(), payload],
      queryFn: () => fetchCandidateById(payload),
      select: (response) => response.data,
    }),
};
export { useCandidateQuery };
