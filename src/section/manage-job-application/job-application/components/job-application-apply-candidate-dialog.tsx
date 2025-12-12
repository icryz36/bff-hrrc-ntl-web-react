import { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCandidateQuery } from 'services/candidate/query';
import { useCreateJobApplicationBulkMutation } from 'services/job-application/mutation';
import { TGetCandidateListPayload } from 'types/candidate';
import { TCreateJobApplicationBulkPayload } from 'types/job-application';
import { JobApplicationApplyCandidateFilter } from './job-application-apply-candidate-filter';
import { JobApplicationApplyCandidateTable } from './job-application-apply-candidate-table';

// ----------------------------------------------------------------------

type JobApplicationApplyCandidateDialogProps = {
  open: boolean;
  onClose: VoidFunction;
  onApplySuccess: VoidFunction;
  onApplyError: VoidFunction;
};

export type TFilter = {
  searchName?: string;
  searchSurname?: string;
};

export const JobApplicationApplyCandidateDialog = ({
  open,
  onClose,
  onApplySuccess,
  onApplyError,
}: JobApplicationApplyCandidateDialogProps) => {
  const { id = '' } = useParams();

  const [filter, setFilter] = useState<TFilter>({
    searchName: '',
    searchSurname: '',
  });

  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });

  const [selectedCandidate, setSelectedCandidate] = useState<GridRowSelectionModel>({
    type: 'include',
    ids: new Set(),
  });

  const queryPayload: TGetCandidateListPayload = useMemo(
    () => ({
      status: ['Active'],
      pageNo: pagination.page + 1,
      pageSize: pagination.pageSize,
      maxJobApplication: 10,
      ...(filter.searchName && { name: filter.searchName }),
      ...(filter.searchSurname && { surname: filter.searchSurname }),
      ...{ containFieldName: ['name', 'surname'] },
    }),
    [pagination.page, filter.searchName, filter.searchSurname],
  );

  // api ---------------------------------------------------------------

  const { mutate: createJobApplicationBulk, isPending: isLoadingApplyJob } =
    useCreateJobApplicationBulkMutation();

  const { data: candidateList, isPending: isLoading } = useQuery({
    ...useCandidateQuery.list(queryPayload),
    placeholderData: keepPreviousData,
  });

  const tableData = candidateList?.items || [];
  const totalData = candidateList?.total || 0;

  // ----------------------------------------------------------------------

  const handleSubmitApplyJob = () => {
    const candidates = Array.from(selectedCandidate.ids)?.map((id) => String(id));

    const payload: TCreateJobApplicationBulkPayload[] = candidates.map((candidateId) => ({
      candidateId,
      jobPostId: id,
      stageId: '57d87642-6c7d-4c51-b0eb-b76aa6976b8c', // NOTE: fix for sprint 3 only !
      statusId: 'a733f94c-59c5-40fa-903d-074c253b6820', // NOTE: fix for sprint 3 only !
      applicationDate: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS ZZ'),
    }));

    createJobApplicationBulk(payload, {
      onSuccess: (response) => {
        if (response.status) {
          onApplySuccess();
          return;
        }

        onApplyError();
      },
      onError: () => {
        onApplyError();
      },
      onSettled: () => {
        handleClose();
      },
    });
  };

  const handleClose = () => {
    setSelectedCandidate({ type: 'include', ids: new Set() });
    onClose();
  };

  // ----------------------------------------------------------------------

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle mt={3}>Apply Candidate</DialogTitle>

      <DialogContent>
        <Stack direction="column" spacing={2}>
          <Typography variant="subtitle1_regular" color="text.secondary">
            เพิ่มผู้สมัครที่คุณต้องการเข้าตำแหน่งงานนี้
          </Typography>

          <JobApplicationApplyCandidateFilter onSetFilter={setFilter} />

          <JobApplicationApplyCandidateTable
            tableData={tableData}
            isLoading={isLoading}
            totalData={totalData}
            paginationModel={pagination}
            onChangePaginationModel={setPagination}
            selectedCandidate={selectedCandidate}
            onSetSelectedCandidate={setSelectedCandidate}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack spacing={1} px={2} py={1}>
          <Button variant="soft" color="neutral" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            loading={isLoadingApplyJob}
            onClick={handleSubmitApplyJob}
            disabled={selectedCandidate.ids.size === 0}
          >
            Confirm
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
