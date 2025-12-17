import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/client';
import {
  TCandidateBlacklistPayload,
  TCandidateNotePayload,
  TCandidateUpdateStatusPayload,
  TGetCandidateDocumentByIdPayload,
  TGetCandidateFailDocumentByIdPayload,
  TImportCandidatePayload,
  TImportCandidatesPayload,
} from 'types/candidate';
import { useCandidateQuery } from './query';
import {
  downloadCandidateFail,
  downloadCandidateTemplate,
  fetchImportCandidate,
  importCandidates,
  postUpdateCandidateDocument,
  postUpdateCandidateInfo,
  postUpdateCandidateNote,
  updateCandidateBlacklist,
  updateCandidateStatus,
} from './services';

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

export const useUpdateCandidateMutation = () =>
  useMutation({
    mutationFn: (payload: FormData) => postUpdateCandidateInfo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useCandidateQuery.keysList(),
      });
    },
  });
export const useUpdateCandidate์NoteMutation = () =>
  useMutation({
    mutationFn: (payload: TCandidateNotePayload) => postUpdateCandidateNote(payload),
  });
export const useDownloadCandidateDocumentMutation = () =>
  useMutation({
    mutationFn: (payload: TGetCandidateDocumentByIdPayload) => postUpdateCandidateDocument(payload),
  });

export const useDownloadCandidateTemplateMutation = () =>
  useMutation({
    mutationFn: (payload: TGetCandidateDocumentByIdPayload) => downloadCandidateTemplate(payload),
  });

export const useDownloadCandidateFailMutation = () =>
  useMutation({
    mutationFn: (payload: TGetCandidateFailDocumentByIdPayload) => downloadCandidateFail(payload),
  });

export const useValidateCandidatesMutation = () =>
  useMutation({
    mutationFn: (payload: TImportCandidatePayload) => fetchImportCandidate(payload),
  });

export const useImportCandidatesMutation = () =>
  useMutation({
    mutationFn: (payload: TImportCandidatesPayload) => importCandidates(payload),
  });
