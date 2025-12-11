import { useMutation } from '@tanstack/react-query';
import { useCandidateQuery } from 'services/candidate/query';
import { queryClient } from 'services/client';
import { TApplyJobPayload } from 'types/job-application';
import { postApplyJob } from './service';

export const useApplyJobMutation = () =>
  useMutation({
    mutationFn: (payload: TApplyJobPayload) => postApplyJob(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useCandidateQuery.keysList(),
      });
    },
  });

// export const useChangeJobStatusMutation = () =>
//   useMutation({
//     mutationFn: (payload: TChangeJobStatus) => postChangeJobStatus(payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: useJobpostQuery.keysDetail(),
//       });
//     },
//   });
