import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/client';
import { TCreateJobPostPayload, TUpdateJobPostPayload } from 'types/jobpost';
import { useJobpostQuery } from './query';
import { postCreateJob, postUpdateJob } from './services';

// ----------------------------------------------------------------------

export const useCreateJobpostMutation = () =>
  useMutation({
    mutationFn: (payload: TCreateJobPostPayload) => postCreateJob(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useJobpostQuery.keys() });
    },
  });

export const useUpdateJobpostMutation = () =>
  useMutation({
    mutationFn: (payload: TUpdateJobPostPayload) => postUpdateJob(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useJobpostQuery.keys() });
    },
  });
