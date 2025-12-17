import { useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useCandidateQuery } from 'services/candidate/query';
import TrackingAndHistoryTableView from './tracking-and-history-table-view';

const TrackingAndHistoryView = () => {
  const apiRef = useGridApiRef();

  const { data: batchList, isPending: isLoading } = useQuery({
    ...useCandidateQuery.batchList({
      createdById: '550e8400-e29b-41d4-a716-446655440001',
      pageNo: 1,
      pageSize: 500,
    }),
  });

  const tableTotalRecords = batchList?.total || 0;
  const tableData = batchList?.items || [];

  return (
    <TrackingAndHistoryTableView
      apiRef={apiRef}
      tableData={tableData}
      onPageChange={() => {}}
      totalItem={tableTotalRecords}
      currentPage={1}
      loading={isLoading}
    />
  );
};

export default TrackingAndHistoryView;
