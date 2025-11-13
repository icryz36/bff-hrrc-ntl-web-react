import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/client';
import { TCreateJobPostPayload, TUpdateJobPostStatusPayload } from 'types/jobpost';
import { useJobpostQuery } from './query';
import { postCreateJob, updateJobStatus } from './services';

// ----------------------------------------------------------------------

export const useCreateJobpostMutation = () =>
  useMutation({
    mutationFn: (payload: TCreateJobPostPayload) => postCreateJob(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useJobpostQuery.keys() });
    },
  });

export const useUpdateJobpostStatusMutation = () =>
  useMutation({
    mutationFn: (payload: TUpdateJobPostStatusPayload) => updateJobStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useJobpostQuery.keys() });
    },
  });
