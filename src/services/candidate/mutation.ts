import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/client';
import { TCandidateBlacklistPayload, TCandidateUpdateStatusPayload } from 'types/candidate';
import { useCandidateQuery } from './query';
import { updateCandidateBlacklist, updateCandidateStatus } from './services';

export const useCandidateUpdateStatusMutation = () =>
  useMutation({
    mutationFn: (payload: TCandidateUpdateStatusPayload) => updateCandidateStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useCandidateQuery.keysList(),
      });
    },
  });

export const useCandidateUpdateBlacklistMutation = () =>
  useMutation({
    mutationFn: (payload: TCandidateBlacklistPayload) => updateCandidateBlacklist(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useCandidateQuery.keysList(),
      });
    },
  });
