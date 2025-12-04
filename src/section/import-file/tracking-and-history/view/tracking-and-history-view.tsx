import { useState } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import TrackingAndHistoryTableView from './tracking-and-history-table-view';

const TrackingAndHistoryView = () => {
  const apiRef = useGridApiRef();
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const tableData: any[] = [
    {
      id: '1',
      batchId: '001',
      fileName: 'File Name 001',
      record: 10,
      success: 9,
      fail: 1,
      importDate: '13/11/2568',
      owner: 'Akkharaphon Wattanapong',
    },
  ];
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
