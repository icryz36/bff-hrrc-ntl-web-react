import { useState } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import TrackingAndHistoryTableView from './tracking-and-history-table-view';

const TrackingAndHistoryView = () => {
  const apiRef = useGridApiRef();
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const tableData: any[] = [];
  const tableTotalRecords = 0;

  const handlePageChange = ({ page, pageSize }: { page: number; pageSize: number }) => {
    setPagination({
      pageNo: page + 1,
      pageSize,
    });
  };

  return (
    <TrackingAndHistoryTableView
      apiRef={apiRef}
      tableData={tableData}
      onPageChange={handlePageChange}
      totalItem={tableTotalRecords}
      currentPage={pagination.pageNo}
      loading={false}
    />
  );
};

export default TrackingAndHistoryView;
