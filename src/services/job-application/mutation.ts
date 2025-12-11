import { useMutation } from '@tanstack/react-query';
import { useCandidateQuery } from 'services/candidate/query';
import { queryClient } from 'services/client';
import { useJobpostQuery } from 'services/jobpost/query';
import {
  TApplyJobPayload,
  TChangeJobStatus,
  TCreateJobApplicationPayload,
} from 'types/job-application';
import { postApplyJob, postChangeJobStatus, postCreateJobApplication } from './service';

export const useApplyJobMutation = () =>
  useMutation({
    mutationFn: (payload: TApplyJobPayload) => postApplyJob(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useCandidateQuery.keysList(),
      });
    },
  });

export const useChangeJobStatusMutation = () =>
  useMutation({
    mutationFn: (payload: TChangeJobStatus) => postChangeJobStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useJobpostQuery.keysDetail(),
      });
    },
  });

export const useCreateJobApplicationMutation = () =>
  useMutation({
    mutationFn: (payload: TCreateJobApplicationPayload) => postCreateJobApplication(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useCandidateQuery.keysList(),
      });
      queryClient.invalidateQueries({
        queryKey: useCandidateQuery.keysDetail(),
      });
    },
  });
