import { useMemo, useState } from 'react';
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
import { useCandidateQuery } from 'services/candidate/query';
import { TGetCandidateListPayload } from 'types/candidate';
import { JobApplicationApplyCandidateFilter } from './job-application-apply-candidate-filter';
import { JobApplicationApplyCandidateTable } from './job-application-apply-candidate-table';

// ----------------------------------------------------------------------

type JobApplicationApplyCandidateDialogProps = {
  open: boolean;
  onClose: VoidFunction;
};

export type TFilter = {
  searchName?: string;
  searchSurname?: string;
};

export const JobApplicationApplyCandidateDialog = ({
  open,
  onClose,
}: JobApplicationApplyCandidateDialogProps) => {
  const [filter, setFilter] = useState<TFilter>({
    searchName: '',
    searchSurname: '',
  });

  console.log('filter', filter);

  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });

  const [selectedCandidate, setSelectedCandidate] = useState<GridRowSelectionModel>({
    type: 'include',
    ids: new Set(),
  });

  // api
  if (selectedCandidate.ids instanceof Set) {
    console.log('sdsdsds', Array.from(selectedCandidate.ids));
  }

  const queryPayload: TGetCandidateListPayload = useMemo(
    () => ({
      pageNo: pagination.page + 1,
      pageSize: pagination.pageSize,
      status: ['Active', 'Inactive'],
    }),
    [pagination.page],
  );

  // api ---------------------------------------------------------------

  const { data: candidateList, isPending: isLoading } = useQuery({
    ...useCandidateQuery.list(queryPayload),
    placeholderData: keepPreviousData,
  });

  const tableData = candidateList?.items || [];
  const totalData = candidateList?.pagination?.totalRecords || 0; // NOTE: why BE not return in  totalRecords  ?

  // ----------------------------------------------------------------------

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
          <Button variant="soft" color="neutral" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained">Confirm</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
