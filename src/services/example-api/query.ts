import { queryOptions } from '@tanstack/react-query';
import { fetchExampleApi } from './services';

// ----------------------------------------------------------------------

const useExampleQuery = {
  keys: () => ['example-key'] as const,

  detail: (id: string) =>
    queryOptions({
      queryKey: [...useExampleQuery.keys(), id],
      queryFn: () => fetchExampleApi(id),
    }),

  //  etc api ...
};

export { useExampleQuery };
