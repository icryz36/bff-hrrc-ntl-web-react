import { queryOptions } from '@tanstack/react-query';
import { TGetBatchByIdPayload } from 'types/batch';
import { fetchBatchById } from './service';

const useBatchQuery = {
  keys: () => ['batch'] as const,
  keysDetail: () => [...useBatchQuery.keys(), 'detail'] as const,

  detail: (payload: TGetBatchByIdPayload) =>
    queryOptions({
      queryKey: [...useBatchQuery.keysDetail(), payload],
      queryFn: () => fetchBatchById(payload),
      select: (response) => response,
      gcTime: 0,
      staleTime: 0,
    }),
};
export { useBatchQuery };
