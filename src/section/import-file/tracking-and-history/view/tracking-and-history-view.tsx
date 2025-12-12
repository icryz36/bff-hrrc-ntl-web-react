import { useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useCandidateQuery } from 'services/candidate/query';
import TrackingAndHistoryTableView from './tracking-and-history-table-view';

const TrackingAndHistoryView = () => {
  const apiRef = useGridApiRef();

  const { data: batchList, isPending: isLoading } = useQuery({
    ...useCandidateQuery.batchList({
      createdById: '8131df34-7068-443b-9919-c5ccb116d6ee',
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
