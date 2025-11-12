import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/client';
import { TCreateJobPostPayload } from 'types/jobpost';
import { useJobpostQuery } from './query';
import { postCreateJob } from './services';

// ----------------------------------------------------------------------

export const useCreateJobpostMutation = () =>
  useMutation({
    mutationFn: (payload: TCreateJobPostPayload) => postCreateJob(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useJobpostQuery.keys() });
    },
  });
