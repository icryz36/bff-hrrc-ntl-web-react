import { useMutation } from '@tanstack/react-query';
import { useCandidateQuery } from 'services/candidate/query';
import { queryClient } from 'services/client';
import { TCreateJobApplicationBulkPayload } from 'types/job-application';
import { useJobApplicationQuery } from './query';
import { postCreateJobApplicationBulk } from './service';

export const useCreateJobApplicationBulkMutation = () =>
  useMutation({
    mutationFn: (payload: TCreateJobApplicationBulkPayload[]) =>
      postCreateJobApplicationBulk(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useCandidateQuery.keysList() });
      queryClient.invalidateQueries({ queryKey: useJobApplicationQuery.keys() });
    },
  });
