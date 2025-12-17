import { queryOptions } from '@tanstack/react-query';
import { endpoint } from 'constant/endpoint';
import {
  TGetCheckJobaplicationStatusPayload,
  TGetJobapplicationBoardPayload,
  TGetJobapplicationListPayload,
} from 'types/job-application';
import {
  fetchCheckJobaplicationStatus,
  fetchJobApplicationBoard,
  fetchJobApplicationList,
} from './service';

// ----------------------------------------------------------------------

const useJobApplicationQuery = {
  keys: () => ['job-application'],

  list: (payload: TGetJobapplicationListPayload) =>
    queryOptions({
      queryKey: [...useJobApplicationQuery.keys(), payload, endpoint.jobApplication.list],
      queryFn: () => fetchJobApplicationList(payload),
      select: (response) => response.data,
    }),

  board: (payload: TGetJobapplicationBoardPayload) =>
    queryOptions({
      queryKey: [...useJobApplicationQuery.keys(), payload, endpoint.jobApplication.board],
      queryFn: () => fetchJobApplicationBoard(payload),
      select: (response) => response.data,
    }),

  checkStatus: (payload: TGetCheckJobaplicationStatusPayload) =>
    queryOptions({
      queryKey: [...useJobApplicationQuery.keys(), payload, endpoint.jobApplication.checkStatus],
      queryFn: () => fetchCheckJobaplicationStatus(payload),
      select: (response) => response.data,
    }),
};
export { useJobApplicationQuery };
