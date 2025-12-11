import { queryOptions } from '@tanstack/react-query';
import { TGetCountApplicationPayload } from 'types/job-application';
import { fetchCountJobApplication } from './service';

// ----------------------------------------------------------------------

const useJobApplicationQuery = {
  keys: () => ['jobApplication'],

  count: (payload: TGetCountApplicationPayload) =>
    queryOptions({
      queryKey: [...useJobApplicationQuery.keys(), payload],
      queryFn: () => fetchCountJobApplication(payload),
    }),
};
export { useJobApplicationQuery };
